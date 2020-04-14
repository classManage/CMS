import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/page/Login.vue";
import Home from "../components/page/Home.vue";
import Basic from "../components/page/Basic.vue";
import HomTeacher from "../components/page/HomTeacher.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
    redirect: "/basic",
    children: [
      { path: "/basic", component: Basic },
      { path: "/homTeacher", component: HomTeacher }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
