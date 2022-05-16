<template>
    <canvas ref="smilesCanvas" width="960" height="200"> </canvas>
</template>

<script>
import SmilesDrawer from 'smiles-drawer';
import { debounce } from "lodash-es";
export default {
    name: "SmilesViewer",
    props: {
        smiles: String,
        viewWidth: Number,
        palette: {
            type: String,
            default: 'light'
        }
    },
    data() {
        return {
            drawer: null,
        };
    },
    mounted: function () {
        this.renewDrawer();
    },
    watch: {
        smiles: debounce(function () {
            this.updateSmiles(this.smiles);
        }, 500),
        viewWidth: function () {
            this.$refs.smilesCanvas.width = this.viewWidth;
            this.renewDrawer();
        },
    },
    methods: {
        updateSmiles: function (s) {
            if (this.drawer && s.length > 0) {
                SmilesDrawer.parse(s, (tree) => {
                    this.drawer.draw(tree, this.$refs.smilesCanvas, this.palette);
                }, (err) => {
                    console.log(err);
                });
            }
        },
        renewDrawer: function () {
            // set to current width of canvas
            const options = { width: this.$refs.smilesCanvas.width, height: this.$refs.smilesCanvas.height };
            this.drawer = new SmilesDrawer.Drawer(options);
            this.updateSmiles(this.smiles);
        },
    }
}
</script>

<style lang="scss">
</style>
