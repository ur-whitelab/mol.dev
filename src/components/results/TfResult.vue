<template>
  <div class="prediction-table">
    <table class="table" :class="{
      'has-background-white-ter': !ready,
    }">
      <tbody>
        <tr>
          <td class="has-text-left">Solubility</td>
          <td class="has-text-centered"> mol / l</td>
          <td class="has-text-centered"> logS</td>
        </tr>
        <template v-for="p in predictions">
          <tr :class="{
            'has-background-primary': p.name === 'Overall'
          }">
            <td class="has-text-left">{{ p.name }}</td>
            <td class="has-text-centered"><span v-if="ready">{{ p.low.toExponential(2) }} to {{
                p.high.toExponential(2)
            }}</span>&nbsp;
            </td>
            <td class="has-text-centered"><span v-if="ready">{{ p.mu.toFixed(2) }} ± {{
                Math.sqrt(p.var).toFixed(2)
            }}</span>&nbsp;
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TfResult",
  props: {
    predictions: Array,
    ready: Boolean,
    title: String,
    adjective: String,
  }
};
</script>

<style lang="scss">
.uppercase {
  text-transform: uppercase;
}

.prediction-table {
  overflow-x: auto;
}
</style>
