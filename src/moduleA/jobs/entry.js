/*
 * @Author: chen_huang
 * @Date: 2020-02-29 14:41:41
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-03-01 19:05:14
 * @Description:
 */
import Vue from "vue";
import Main from "../pages/Main.vue";
import { router } from "../routes";

const appName = "demo";

if (window.mp) {
  window.mp[`render_moduleA_${appName}`] = containerId => {
    let moduleA;
    let APP = {
      startAPP() {
        // 这边初始化vue

        moduleA = new Vue({
          router,
          render: h => h(Main)
        }).$mount(containerId);
      },

      destoryApp() {
        moduleA.$destory();
      }
    };

    APP.startAPP();
  };
}

// new Vue({
//   el: "#app",
//   router,
//   render: h => h(Main)
// });
