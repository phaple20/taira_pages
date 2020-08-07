const module_a = {
  state: {
    name: [
      { text: "全部商品", value: 0 },
      { text: "新款商品", value: 1 },
      { text: "活动商品", value: 2 }
    ],
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
export default module_a;
