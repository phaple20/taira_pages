import axios from "axios";

const module_sh = {
  state: {
    city_sh: []
  },
  mutations: {
    sh_area_get(state, obj) {
      state.city_sh = obj;
    }
  },
  actions: {
    Sh_area_get({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            "http://api.k780.com/?app=weather.city&cou=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json"
          )
          .then(function(res) {
            let city_json = res.data.result.datas;
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
            resolve();
          })
          .catch(function(err) {
            console.log(err);
          });
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
