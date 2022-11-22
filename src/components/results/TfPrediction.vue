<template>
  <div class="tf-prediction">
    <tf-result title="sol" description="Prediction of solubility" :predictions="predictions" :adjective="adjective"
      :overall="overall" />
    <br />
    <model-card :url="this.url + '/card.json'"> </model-card>
  </div>
</template>

<style>

</style>

<script>
import TfResult from "./TfResult";
import { loadModel, seq2vec, parseResult } from "../lib/tf-models";
import ModelCard from "./ModelCard.vue";
import { debounce } from "lodash-es";
export default {
  name: "TfPrediction",
  components: { TfResult, ModelCard },
  props: {
    sequence: String,
    url: String,
    adjective: String,
    modelNumber: Number,
    width: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      status: "loading",
      rnn: null,
      predictions: Array(this.modelNumber).fill({ name: 'Loading ', mu: 0, var: 0, high: 0, low: 0, weight: 0 }),
    };
  },
  created: function () {
    this.debouncedPredict = debounce(this.predict, 500);
  },
  mounted: async function () {
    this.rnn = [];
    for (let i = 0; i < this.modelNumber; i++) {
      const m = Object.freeze(await loadModel(this.url + "/" + i + "/model.json"));
      this.rnn.push(m);
    }
  },
  watch: {
    sequence: function (new_value) {
      this.debouncedPredict(new_value);
    },
  },
  computed: {
    overall: function () {
      const overall_p = {
        name: 'Waiting',
        mu: 0,
        var: 0,
        low: 0,
        high: 0,
      };
      const N = this.predictions.reduce((n, p) => n + p.weight, 0);
      if (N > 0) {
        if (N == this.modelNumber)
          overall_p.name = 'Overall ';
        else
          overall_p.name = 'Computing ';
        overall_p.mu = this.predictions.reduce((a, p) => a + p.mu * p.weight, 0) / N;
        overall_p.var =
          this.predictions.reduce(
            (a, p) => a + (p.var + p.mu * p.mu) * p.weight, 0) / N
          - overall_p.mu * overall_p.mu;
        overall_p.low = Math.pow(10, overall_p.mu - Math.sqrt(overall_p.var));
        overall_p.high = Math.pow(10, overall_p.mu + Math.sqrt(overall_p.var));
      }
      return overall_p;
    }
  },
  methods: {
    predict: async function (str) {
      if (str.length >= 1) {
        for (let i = 0; i < this.modelNumber; i++) {
          // spread in loading name
          this.predictions[i] = { ...this.predictions[i], ...{ name: 'Computing ', weight: 0 } };
        }
        const x = seq2vec(str);
        for (let i = 0; i < this.rnn.length; i++) {
          const yhat = await this.rnn[i].predict(x);
          if (yhat) {
            const r = await parseResult(yhat);
            const new_p = {
              name: 'Model ' + (i + 1),
              mu: r.mu,
              var: r.var,
              low: Math.pow(10, r.mu - Math.sqrt(r.var)),
              high: Math.pow(10, r.mu + Math.sqrt(r.var)),
              weight: 1
            };
            this.predictions[i] = new_p;
          }
        }
        x.dispose();
      }
    },
  },
};
</script>




