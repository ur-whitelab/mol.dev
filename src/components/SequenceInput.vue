<template>
  <div>
    <h1 class="is-size-4 is-spaced bd-anchor-title"> <span v-if="selfiesStatus">Enter Molecule</span> <span
        v-else>Loading Parser (wait 5-10 seconds)</span></h1>
    <div class="field has-addons">
      <div class="control is-expanded" :class="{ 'is-loading': !selfiesStatus }">
        <input id="smiles-input" :readonly="selfiesStatus ? null : true" aria-label="SMILES input" :class="{
          'input': true,
          'is-danger': parserError
        }" spellcheck="false" autocorrect="off" type="text"
          :placeholder="selfiesStatus ? 'SMILES' : 'loading parser...'" v-model="internalSMILES" autofocus
          @keyup.enter="updateSMILES" />
      </div>
      <div class="control">
        <a class="button is-info" :class="{ 'is-loading': !ready && sequence.length > 0 }" @click="finishSequence">
          Compute
        </a>
      </div>
    </div>
    <div class="field has-addons">
      <div class="control is-expanded" :class="{ 'is-loading': !selfiesStatus }">
        <input id="selfies-input" :readonly="selfiesStatus ? null : true" aria-label="SELFIES input" :class="{
          'input': true,
          'is-danger': parserError
        }" spellcheck="false" autocorrect="off" type="text"
          :placeholder="selfiesStatus ? 'SMILES' : 'loading parser...'" v-model="internalSELFIES" autofocus
          @keyup.enter="updateSELFIES" />
      </div>
    </div>
    <p id="seq-link" v-if="sequence.length > 0" class="help is-pulled-right">
      Shareable Link:
      <a :href="url + '?s=' + sequence" target="_blank">{{
          url + '?s=' + sequence
      }}</a>
    </p>
    <br />
  </div>
</template>

<script>
import selfies from './lib/selfies/selfies.js';
export default {
  name: "SequenceInput",
  props: {
    ready: false,
  },
  data() {
    return {
      sequence: "",
      smiles_str: "",
      selfies_str: "",
      edit_mode: "SMILES",
      view_mode: "SELFIES",
      url: window.location.href,
      selfiesStatus: false,
      error: false,
      parserError: false
    };
  },
  mounted: function () {
    // convert pattern to list of integers
    const queryParam = new URLSearchParams(window.location.search).get("s");
    if (queryParam) {
      // clean it up
      this.internalSequence = queryParam;
    }
    selfies.startSelfiesWorker();
    setTimeout(this.checkSelfies, 500);
  },
  computed: {
    internalSMILES: {
      get: function () {
        return this.smiles_str;
      },
      set: function (v) {
        v = v.trim();
        this.smiles_str = v
        selfies.encoder(v).then(res => {
          if (res) {
            this.selfies_str = res;
            this.$emit("sequence-update", this.selfies_str);
            this.parserError = false;
          } else {
            this.parserError = true;
          }
        });
      },
    },
    internalSELFIES: {
      get: function () {
        return this.selfies_str;
      },
      set: function (v) {
        v = v.trim();
        this.selfies_str = v
        selfies.decoder(v).then(res => {
          if (res) {
            this.smiles_str = res;
            this.parserError = false;
          } else {
            this.parserError = true;
          }
        });
        this.$emit("sequence-update", this.selfies_str);
      },
    },
  },
  methods: {
    finishSequence: function () {
      this.$emit("sequence-push");
    },
    discardKeys: function (evt) {
      evt.preventDefault();
    },
    checkSelfies: async function () {
      const s = await selfies.selfiesLoadStatus();
      console.log('CHECKING!!' + s.selfies);

      if (s.selfies === 'loaded') {
        console.log('DONE!');
        this.selfiesStatus = true;
      } else if (s.selfies === 'failed') {
        this.error = true;
      } else {
        setTimeout(this.checkSelfies, 500);
      }
    }
  },
};
</script>

<style lang="scss">
#sequence {}

#seq-link {
  max-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>
