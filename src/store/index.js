import Vue from 'vue'
import Vuex from 'vuex'
import playbar from './playbar'
import playList from './playList'
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
    playList
  }
})
