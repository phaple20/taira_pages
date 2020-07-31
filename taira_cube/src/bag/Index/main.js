import Vue from "vue";
import App from "../App.vue";
import router from "./router";
//import store from '../../store'

/* 全局公共方法封装 */
//import public_methods from "../../assets/js/Public-Methods";

//Vue.prototype.PUBLIC_METHODS = public_methods;

//Vue.config.productionTip = false;

new Vue({
  router,
  //store,
  render: h => h(App)
}).$mount("#app");
