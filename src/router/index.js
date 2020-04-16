import Vue from "vue";
import VueRouter from "vue-router";
import { Login, Home, Basic, HomTeacher, Setting } from "@/utils/components";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: "登录"
  },
  {
    path: "/home",
    component: Home,
    meta: "主页",
    children: [
      {
        path: "basic",
        component: Basic,
        meta: "管理首页"
      },
      {
        path: "homTeacher",
        component: HomTeacher,
        meta: "老师"
      },
      {
        path: "Setting",
        component: Setting,
        meta: "系统设置"
      },
      {
        path: "",
        redirect: "basic"
      }
    ]
  },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  routes
});

export default router;
