import Vue from "vue";
import Vuex from "vuex";

import module_a from "./module/module_a";
import module_sh from "./module/module_weather_shanghai";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    a: module_a,
    sh: module_sh
  }
});
