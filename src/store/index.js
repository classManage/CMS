import Vue from "vue";
import Vuex from "vuex";
import theme from "./modules/theme";
import {
  changeMaxMoney,
  changeSurplusMoney,
  studentPayMoney
} from "@/utils/ajax";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activePath: "", //当前被激活的/home/?的路径
    userInfo: {}, //用户信息
    classes: [], //所有班级集合
    currentClass: {} //当前操作的班级
  },
  mutations: {
    changeActivePath(state, data) {
      //改变当前路径
      state.activePath = data;
    },
    changeUserInfo(state, data) {
      //改变用户信息
      state.userInfo = data;
    },
    addClasses(state, data) {
      //添加班级
      state.classes.push(data);
    },
    changeCurrentClass(state, data) {
      //改变现在操作的班级
      state.currentClass = data;
    },
    addMaxMoney(state, data) {
      //添加应缴班费
      state.currentClass.classFee.max = data;
    },
    changeSurplusMoney(state, data) {
      //改变剩余班费
      state.currentClass.classFee.surplus = data;
    },
    pushMoneyMessage(state, data) {
      //追加资产记录
      state.currentClass.classFee.record.push(data);
    },
    mapSuccessPayId(state, data) {
      //遍历缴费成功的id并修改金额
      data.map(v => {
        state.currentClass.students.some(i => {
          if (i._id === v.id) return (i.classFee.success = v.money);
        });
      });
    },
    changeReceiveMoney(state, data) {
      //改变收到的金额
      state.currentClass.classFee.receive = data;
    }
  },
  actions: {
    hadleMaxMoney(store, { num, record, done }) {
      //处理添加应缴班费的操作
      changeMaxMoney(store.state.currentClass.class, { num, record })
        .then(res => {
          store.commit("addMaxMoney", num);
          store.commit("pushMoneyMessage", res);
          done(true);
        })
        .catch(() => {
          done(false);
        });
    },
    hadleSurplusMoney(store, data) {
      //处理剩余班费的改变
      changeSurplusMoney(store.state.currentClass.class, data)
        .then(res => {
          store.commit("changeSurplusMoney", data.num);
          data.done(true);
          store.commit("pushMoneyMessage", res);
        })
        .catch(() => {
          data.done(false);
        });
    },
    handleStudentPay(store, data) {
      console.log(data);
      //处理学生缴费
      studentPayMoney(store.state.currentClass.class, data)
        .then(res => {
          store.commit("mapSuccessPayId", res.successArr);
          store.commit("changeReceiveMoney", res.receive);
          store.commit("pushMoneyMessage", res.message);
          store.commit("changeSurplusMoney", res.surplus);
          data.done(true);
        })
        .catch(() => {
          data.done(false);
        });
    }
  },
  modules: {
    theme
  }
});
