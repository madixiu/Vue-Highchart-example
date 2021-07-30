<template>
  <div id="app"><chart></chart></div>
</template>

<script>
import Chart from "./components/Chart";

export default {
  name: "app",
  components: {
    chart: Chart,
  },
  methods: {
    handler() {
      var args = arguments;
      for (var arg of args) {
        if (arg instanceof Function) {
          arg();
        }
      }
    },
  },
};
</script>
<style>
@import "./fonts/mainFont.css";
</style>
