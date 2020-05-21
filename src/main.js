import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/iconfont/font-awesome/css/font-awesome.min.css";

Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
