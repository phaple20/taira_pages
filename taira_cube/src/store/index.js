import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const module_a = {
  state: {
    name: "vuex-state",
    count: 12
  },
  mutations: {
    increment(state, cn) {
      state.count += cn.n;
    }
  },
  actions: {
    Increment({ commit }, num) {
      commit("increment", num);
    }
  },
  getters: {
    countDouble: function(state) {
      return state.count * 2;
    }
  }
};

export default new Vuex.Store({
  modules: {
    a: module_a
  }
});
