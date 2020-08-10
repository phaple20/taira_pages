import { cube_get } from "../../api/cube_axios";

const module_sh = {
  state: {
    city_sh: [],
    loading: true
  },
  mutations: {
    sh_area_get(state, obj) {
      if (obj) {
        state.loading = false;
        state.city_sh = obj;
      }
    }
  },
  actions: {
    Sh_area_get({ commit }) {
      cube_get(
        "http://api.k780.com/?app=weather.city&cou=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json"
      ).then(res => {
        let city_json = res.result.datas;
        let city_arr = [],
          sh_arr = [];
        for (var i in city_json) {
          city_arr.push(city_json[i]);
        }
        let city_filter = city_arr.filter(item => {
          return item.area_1 === "上海";
        });
        city_filter.forEach((item, index) => {
          //item.text = item.citynm;
          //item.value = index;
          sh_arr[index] = {};
          sh_arr[index]["text"] = item.citynm;
          sh_arr[index]["value"] = index;
        });
        //console.log(Array.from(new Set([1, 3, 4, 4, 4, 4, 4, 32, 54, 5])));
        commit("sh_area_get", sh_arr);
      });
    }
  },
  getters: {
    sh_area: function(state) {
      return state.city_sh;
    }
  }
};
export default module_sh;
