<template>
  <div class="tf-prediction">
    <tf-result title="sol" description="Prediction of solubility" v-bind:predictions="predictions"
      v-bind:ready="predictionReady" :adjective="adjective" />
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
      predictionReady: false,
      predictions: Array(this.modelNumber + 1).fill({ name: '', mu: 0, var: 0, low: 0, high: 0 }),
    };
  },
  created: function () {
    this.debouncedPredict = debounce(this.predict, 1000);
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
      this.predictionReady = false;
      this.debouncedPredict(new_value);
    },
  },
  methods: {
    predict: async function (str) {
      if (str.length >= 1) {
        this.predictions.shift();
        const x = seq2vec(str);
        for (let i = 0; i < this.rnn.length; i++) {
          const yhat = await this.rnn[i].predict(x);
          console.log(yhat);
          if (yhat) {
            const r = await parseResult(yhat);
            const new_p = {
              name: 'Model ' + (i + 1),
              mu: r.mu,
              var: r.var,
            };
            this.predictions.shift();
            this.predictions.push(new_p);
          } else {
            return;
          }
        }
        x.dispose();
        // now compute overall uncertainty/mean and convert units
        const overall_p = {
          name: 'Overall',
          mu: 0,
          var: 0,
        };
        overall_p.mu = this.predictions.reduce((a, b) => a + b.mu, 0) / this.modelNumber;
        overall_p.var =
          this.predictions.reduce(
            (a, b) => a + b.var + b.mu * b.mu, 0) / this.modelNumber
          - overall_p.mu * overall_p.mu;
        this.predictions.unshift(overall_p);
        this.predictions.map((p) => {
          p.low = Math.pow(10, p.mu - Math.sqrt(p.var));
          p.high = Math.pow(10, p.mu + Math.sqrt(p.var));
        });
        this.predictionReady = true;
      }
    },
  },
};
</script>




