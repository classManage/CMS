import Vue from "vue";
import VueRouter from "vue-router";
import { Login, Home, Basic, HomTeacher, Setting } from "@/utils/components";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
    children: [
      {
        path: "basic",
        component: Basic
      },
      {
        path: "homTeacher",
        component: HomTeacher
      },
      {
        path: "Setting",
        component: Setting
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
