import { cube_get } from "../../api/cube_axios";
import { weather_data } from "../methods/method_weather_shanghai";
//import qs from "qs";

const module_sh = {
  state: {
    city_weaid: null,
    city_sh: [],
    loading: true,
    city_list_no: null,
    sh_today: null,
    sh_today_day: null
  },
  mutations: {
    sh_area_get(state, sh) {
      if (sh) {
        state.city_sh = sh.sh_area_list;
        state.city_list_no = sh.sh_area_fst;
      }
    },
    sh_today_data(state, sh) {
      state.loading = false;
      state.sh_today = sh;
      state.city_weaid = sh.weaid;
    },
    sh_time_change(state, sh) {
      state.loading = false;
      state.sh_today_day = sh;
      state.city_weaid = sh.weaid;
    }
  },
  actions: {
    Sh_area_get({ commit }) {
      const city_list_result = async () => {
        const clr = await cube_get(
          "http://api.k780.com/?app=weather.city&cou=1&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json"
        );
        return clr;
      };
      city_list_result()
        .then(res => {
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
            sh_arr[index] = {};
            sh_arr[index]["text"] = item.citynm;
            sh_arr[index]["value"] = item.weaid;
          });
          let sh_arr_weaid = sh_arr[0].value;
          commit("sh_area_get", {
            sh_area_list: sh_arr,
            sh_area_fst: sh_arr_weaid
          });
          return (async () => {
            const sh_today = await weather_data(sh_arr_weaid, "today");
            return sh_today;
          })();
        })
        .then(res => {
          commit("sh_today_data", res.result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    Sh_area_change({ commit }, area_param) {
      const sh_area_data = async () => {
        return await weather_data(area_param.weaid, area_param.ag);
      };
      sh_area_data()
        .then(res => {
          commit("sh_today_data", res.result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    Sh_time_change({ commit }, area_param) {
      const sh_area_data = async () => {
        return await weather_data(area_param.weaid, area_param.ag);
      };
      sh_area_data()
        .then(res => {
          commit("sh_time_change", res.result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {
    sh_area: function(state) {
      return state.city_sh;
    },
    sh_today: function(state) {
      return state.sh_today;
    },
    city_weaid: function(state) {
      return state.city_weaid;
    },
    sh_today_day: function(state) {
      return state.sh_today_day;
    }
  }
};
export default module_sh;
