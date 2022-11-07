import Vue from 'vue'
import Vuex from 'vuex'
import playbar from './playbar'
import playList from './playList'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    playbar,
    playList,
    user
  }
})
