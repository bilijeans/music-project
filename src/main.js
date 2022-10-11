import Vue from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
import VueAxiosPlugin from 'vue-axios-plugin'


=======
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import wotUI from './wotui'
Vue.use(wotUI)
>>>>>>> c535fc53c31bf1942f55f54d2443d2d341b04f82
Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
<<<<<<< HEAD
})
=======
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
>>>>>>> c535fc53c31bf1942f55f54d2443d2d341b04f82
