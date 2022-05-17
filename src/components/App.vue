<template>
  <div>
    <!-- <section class="hero is-primary is-bold" v-if="screen.width > 760"> -->
    <section class="hero is-primary is-bold">
      <div class="hero-body" style="padding: 0px">
        <div class="container">
          <div class="floating-hero">
            <span class="title">mol dashboard</span><br />
            <span class="subtitle"> v{{ version }} </span>
          </div>
          <smiles-viewer :smiles="smiles" :view-width="viewWidth" v-on:selection-update="selectedIndex = $event">
          </smiles-viewer>
          <div class="container"></div>
        </div>
      </div>
    </section>
    <section>
      <version :version="version"></version>
    </section>
    <section>
      <div ref="inputcontainer" class="container">
        <div class="columns is-centered">
          <div class="column">
            <mol-input v-on:selfies-update="selfies = $event" v-on:smiles-update="smiles = $event"
              v-on:selfies-push="pushSelfies" :ready="resultsReady">
            </mol-input>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="columns">
          <div class="column card">
            <div class="card-content">
              <h3 class="title is-size-4">Solubility Prediction</h3>
              <h4 class="subtitle is-size-6">
                Predicted solubility in water
              </h4>
              <tf-prediction url="https://raw.githubusercontent.com/ur-whitelab/exmol.io/master/models" :modelNumber="4"
                :sequence="selfies" adjective="soluble" v-on:soluble-update="soluble = $event"></tf-prediction>
              <div class="ref-footer">
                Data: <reference reflink="https://www.nature.com/articles/s41597-019-0151-1"
                  reftitle="AqSolDB, a curated reference set of aqueous solubility and 2D descriptors for a diverse set of compounds"
                  journal="Sci. Data" year="2019"></reference>
                <br>
                SELFIES: <reference reflink="https://arxiv.org/abs/2204.00056"
                  reftitle="SELFIES and the future of molecular string representations" journal="arXiv" year="2022">
                </reference>
                <br>
                Model uncertainty: <reference reflink="https://arxiv.org/abs/1612.01474"
                  reftitle="Simple and scalable predictive uncertainty estimation using deep ensembles"
                  journal="NeurIPS" year="2017"></reference>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="columns">
          <div class="block column">
            <p>
              (c) <a href="https://twitter.com/andrewwhite01">Andrew White</a>,
              2022
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://thewhitelab.org">thewhitelab.org</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Version from "./Version.vue";
import MolInput from "./MolInput";
import TfPrediction from "./results/TfPrediction";
import Reference from "./Reference";
import pjson from "../../package.json";
import SmilesViewer from "./SmilesViewer.vue";

export default {
  name: "App",
  components: {
    TfPrediction,
    MolInput,
    Reference,
    Version,
    SmilesViewer
  },
  data() {
    return {
      selfies: "",
      smiles: "",
      viewWidth: 800,
      selectedIndex: -1,
      version: pjson["version"],
      past: [],
      resultsReady: false,
    };
  },
  mounted: function () {
    this.viewWidth = this.$refs.inputcontainer.clientWidth;
  },
  computed: {
    screen() {
      return screen;
    },
  },
  methods: {
    pushSelfies() {
      if (this.resultsReady) {
        this.past.push({
          selfies: this.selfies,
        });
      }
    }
  }
};
</script>

<style lang="scss">
.floating-hero {
  padding: 0.75rem;
}

.column {
  margin: 1rem;
}

section {
  margin-bottom: 1.5em;
}

.tile {
  padding: 0.38rem;
}

.ref-footer {
  padding-right: 1.5rem;
  text-align: justify;

  @media screen and (min-width: 1024px) {
    position: absolute;
    margin-bottom: 1rem;
    bottom: 0rem;
  }

  @media screen and (max-width: 1023px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
