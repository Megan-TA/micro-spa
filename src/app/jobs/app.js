/*
 * @Author: chen_huang
 * @Date: 2020-02-29 14:27:36
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-02-29 19:10:35
 * @Description:
 */
import Vue from "vue";
import router from "./router";
import Main from "../components/Main.vue";

window.mp = {
  Vue: Vue
};

new Vue({
  router,
  render: h => h(Main)
}).$mount("#app");
