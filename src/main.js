import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import wotUI from './wotui'
import vantUI from './vantui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import videojs from 'video.js'
Vue.prototype.$video = videojs
import 'video.js/dist/video-js.css'
Vue.use(VueAwesomeSwiper)
Vue.use(wotUI)
Vue.use(vantUI)
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
