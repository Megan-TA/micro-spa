/*
 * @Author: chen_huang
 * @Date: 2020-02-29 14:36:31
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-03-02 10:09:10
 * @Description:
 */
import Router from "vue-router";
import Vue from "vue";

// 读取配置文件 获取子模块的host等信息
import config from "../config/index";

Vue.use(Router);

const router = new Router({
  routes: [
    // {
    //   path: "*"
    // },
    {
      path: "/test",
      name: "$MicroBiz"
    },
    {
      path: "/yyy",
      component: () => import("../components/Y.vue")
    }
  ]
});

window.router = router;

router.beforeEach((to, from, next) => {
  // 需要去处理模块切换的启动与销毁逻辑 可以在store中处理 demo目前省略
  // TODO

  if (document.getElementById("router-moduleA")) {
    return next();
  }

  if (to.name === "$MicroBiz") {
    fetch(`${config.moduleA.dev}/manifest.json`, {
      mode: "cors"
    })
      .then(res => res.json())
      .then(res => {
        const $script = document.createElement("script");
        $script.id = `router-moduleA`;
        $script.src = `${config.moduleA.dev}${res["routes.js"]}`;
        $script.onload = () => {
          const customRoutes = window.mp[`moduleA_routes`]();
          router.addRoutes(customRoutes);
          return next();
        };
        document.body.appendChild($script);
      });
  }

  return next();
});

export default router;
