import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageView from "../views/home/HomePageView.vue";
import RankPageView from "../views/rank/RankPageView.vue";
import RankScreamsGroup from "../views/rank/RankScreamsGroup.vue";
import RankCharacteristicsGroup from "../views/rank/RankCharacteristicsGroup.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePageView,
  },
  {
    path: '/rank',
    name: 'rank',
    component: RankPageView,
  },
  {
    path: '/rankScreams', 
    name: 'screams', 
    component: RankScreamsGroup,
    props:true,
  },
  {
    path: '/rankCharacteristics', 
    name: 'characteristics', 
    component: RankCharacteristicsGroup,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
