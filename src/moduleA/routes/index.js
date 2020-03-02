/*
 * @Author: chen_huang
 * @Date: 2020-02-29 14:32:04
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-02-29 19:55:59
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";
import Index from "../components/Index.vue";

Vue.use(Router);

const route = [
  {
    path: "/moduleA",
    component: Index
  }
];

const router = new Router({
  routes: route
});

export { router, route };
