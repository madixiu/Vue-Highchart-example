import Vue from "vue";
import App from "./App.vue";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";

import axios from "axios";
import VueAxios from "vue-axios";
import moment from "vue-jalali-moment";
Vue.use(VueAxios, axios);

Vue.use(moment);
// Vue.use(Highcharts)
Stock(Highcharts);
Vue.use(HighchartsVue);

new Vue({
  el: "#app",
  render: (h) => h(App)
});
