import Vue from "vue";
import VueRouter from "vue-router";
import Login  from "../components/page/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
   path:"/login",
   component:Login,
   name:"Login"
  },
  {
    path:"/",
    redirect:'/login'
   },
];

const router = new VueRouter({
  routes
});

export default router;
