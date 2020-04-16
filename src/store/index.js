import Vue from "vue";
import Vuex from "vuex";
import theme from "./modules/theme";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activePath: '',//当前被激活的/home/?的路径
  },
  mutations: {
    changeActivePath(state, data){
      state.activePath = data;
    }
  },
  actions: {},
  modules: {
    theme
  }
});
