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
        <tr :class="{
          'has-background-primary': overall.name === 'Overall ',
          'has-background-warning': overall.name === 'Computing '
        }">
          <td class="has-text-left">{{ overall.name }}</td>
          <td class="has-text-centered"><span>{{ overall.low.toExponential(2) }} to {{
              overall.high.toExponential(2)
          }}</span>&nbsp;
          </td>
          <td class="has-text-centered"><span>{{ overall.mu.toFixed(2) }} ± {{
              Math.sqrt(overall.var).toFixed(2)
          }}</span>&nbsp;
          </td>
        </tr>
        <tr @click="display = !display">
          <td></td>
          <td style="text-align: center;">Expand {{ display ? '🔽' : '▶️' }}</td>
          <td></td>
        </tr>
        <template v-if="display" v-for="p in predictions">
          <tr :class="{
            'has-background-warning': p.name === 'Computing '
          }">
            <td class="has-text-left">{{ p.name }}</td>
            <td class="has-text-centered"><span>{{ p.low.toExponential(2) }} to {{
                p.high.toExponential(2)
            }}</span>&nbsp;
            </td>
            <td class="has-text-centered"><span>{{ p.mu.toFixed(2) }} ± {{
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
    overall: Object,
    ready: Boolean,
    title: String,
    adjective: String,
  },
  data() {
    return {
      display: false,
    };
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
