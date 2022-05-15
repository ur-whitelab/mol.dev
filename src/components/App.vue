<template>
  <div>
    <section class="hero is-primary is-bold" v-if="screen.width > 760">
      <div class="hero-body" style="padding: 0px">
        <div class="container">
          <div class="floating-hero">
            <span class="title">mol dashboard</span><br />
            <span class="subtitle"> v{{ version }} </span>
          </div>
          <div class="container"></div>
        </div>
      </div>
    </section>
    <section>
      <version :version="version"></version>
    </section>
    <section>
      <div class="container">
        <div class="columns is-centered">
          <div ref="sequencecontainer" class="column">
            <sequence-input v-on:sequence-update="sequence = $event" v-on:sequence-push="pushSequence"
              :ready="resultsReady">
            </sequence-input>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="columns">
          <div class="column card">
            <div class="card-content">
              <h3 class="title is-size-4">Hemolytic Prediction</h3>
              <h4 class="subtitle is-size-6">
                Predicted ability for peptide to lyse red blood cells
              </h4>
              <tf-prediction url="https://raw.githubusercontent.com/ur-whitelab/exmol.io/master/models/hemo-rnn/"
                :sequence="sequence" adjective="hemolytic" v-on:hemolytic-update="hemolytic = $event"></tf-prediction>
              <div class="ref-footer">
                <reference reflink="https://pubs.acs.org/doi/10.1021/acs.jcim.0c00946"
                  reftitle="Investigating Active Learning and Meta-Learning for Iterative Peptide Design"
                  journal="J. Chem. Inf. Model." year="2021"></reference>
                <br />
                <reference reflink="https://doi.org/10.1093/nar/gkaa991"
                  reftitle="DBAASP v3: database of antimicrobial/cytotoxic activity and structure of peptides as a resource for development of new therapeutics"
                  journal="Nucleic Acids Research" year="2020"></reference>
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
import SequenceInput from "./SequenceInput";
import TfPrediction from "./results/TfPrediction";
import Reference from "./Reference";
import pjson from "../../package.json";

export default {
  name: "App",
  components: {
    TfPrediction,
    SequenceInput,
    Reference,
    Version,
  },
  data() {
    return {
      sequence: "",
      viewWidth: 800,
      selectedIndex: -1,
      version: pjson["version"],
      past: [],
    };
  },
  computed: {
    screen() {
      return screen;
    },
  },
  methods: {
    pushSequence() {
      if (this.resultsReady) {
        this.past.push({
          sequence: this.sequence,
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
