<template>
  <div class="model-card">
    <button @click="display = !display">more info {{ display ? '🔽' : '▶️' }} </button>
    <div v-if="display" class="container has-text-justified">
      <template v-for="item in details" :key="item.id">
        <p>
          <strong>{{ item.name }}</strong>
          {{ cardContent(item.id) }}
        </p>
      </template>
      <div v-if="hasImage">
        <img :src="image" alt="Image justifying model fit" width="500" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.tabs ul {
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
}

.tabs li {
  width: 50%;
}

.model-card {
  margin-bottom: 6rem;
}
</style>

<script>
export default {
  name: "ModelCard",
  props: {
    url: String,
  },
  data() {
    return {
      display: false,
      hasImage: false,
      image: null,
      index: "title",
      card: null,
      title: "",
      details: [
        { id: "details", name: "Model Details" },
        { id: "use", name: "Intended Use" },
        { id: "factors", name: "Factors" },
        { id: "metrics", name: "Metrics" },
        { id: "evaluation", name: "Evaluation Data" },
        { id: "training", name: "Training Data" },
        { id: "ethics", name: "Ethical Considerations" },
        { id: "caveats", name: "Caveats" },
      ],
      content: null,
    };
  },
  mounted: function () {
    fetch(this.url)
      .then((res) => res.json())
      .then((out) => {
        this.card = out;
        this.title = this.card["title"];
        this.content = this.card[this.details[0].id];
        if (this.card["image"]) {
          this.hasImage = true;
          this.image = this.card["image"];
        }
      });
  },
  methods: {
    cardContent(id) {
      if (this.card && id in this.card) {
        return this.card[id];
      }
      return "";
    },
  },
};
</script>
