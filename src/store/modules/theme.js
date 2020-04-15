export default {
  namespaced: true,
  state: {
    themeText: {//文字
      color: "white"
    },
    themeHeader: {//头部
      backgroundColor: "#242f42"
    },
    themeSidebar: {//侧边栏
      backgroundColor: "#324157"
    }
  },
  mutations: {
    setThemeText(state, data){
      state.themeText = data
    },
    setThemeHeader(state, data){
      state.themeHeader = data
    },
    setThemeSidebar(state, data){
      state.themeSidebar = data
    },
  },
  actions: {}
};
