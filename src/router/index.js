import Vue from "vue";
import VueRouter from "vue-router";
import {
  Login,
  Register,
  Home,
  Basic,
  Setting,
  Photo,
  Base,
  ClasSchedule,
  OptionalCourse,
  Check,
  HistoryCheck,
  ClassFee,
  Activity,
  Schedule
} from "@/utils/components";
import { getLocalToken } from "@/utils/ajax";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: "登录",
    children: [
      {
        path: "register",
        component: Register,
        name: "Register"
      }
    ]
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
        path: "base",
        component: Base,
        meta: "基本情况"
      },
      {
        path: "check",
        component: Check,
        meta: "签到"
      },
      {
        path: "historyCheck",
        component: HistoryCheck,
        meta: "历史考勤"
      },
      {
        path: "classFee",
        component: ClassFee,
        meta: "班费"
      },
      {
        path: "activity",
        component: Activity,
        meta: "活动"
      },
      {
        path: "schedule",
        component: Schedule,
        meta: "课表",
        children: [
          {
            path: "classchedule",
            component: ClasSchedule
          }
        ]
      },
      {
        path: "optionalcourse",
        component: OptionalCourse,
        meta: "选修课"
      },
      {
        path: "photo",
        component: Photo,
        meta: "相册"
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
    redirect: "/home"
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  //只要不是去login界面，必须携带token
  if (to.path != "/login") {
    if (!getLocalToken()) {
      return next("/login");
    }
  }
  next();
});

export default router;
