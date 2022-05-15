<template>
  <div>
    <h1 class="is-size-4 is-spaced bd-anchor-title">Enter {{ mode }}</h1>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input id="sequence" class="input" spellcheck="false" autocorrect="off" type="text" :placeholder=mode
          v-model="internalSequence" autofocus @keyup.enter="finishSequence" />
      </div>
      <div class="control">
        <a class="button is-info" :class="{ 'is-loading': !ready && sequence.length > 0 }" @click="finishSequence">
          Save
        </a>
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
export default {
  name: "SequenceInput",
  props: {
    ready: false,
  },
  data() {
    return {
      sequence: "",
      mode: "SMILES",
      url: window.location.href
    };
  },
  mounted: function () {
    // convert pattern to list of integers
    const queryParam = new URLSearchParams(window.location.search).get("s");
    if (queryParam) {
      // clean it up
      this.internalSequence = queryParam;
    }
  },
  computed: {
    internalSequence: {
      get: function () {
        return this.sequence;
      },
      set: function (v) {
        this.sequence = v;
        this.$emit("sequence-update", v);
      },
    },
  },
  methods: {
    finishSequence: function () {
      this.$emit("sequence-push");
    },
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
