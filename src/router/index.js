import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageView from "../views/home/HomePageView.vue";
import RankPageView from "../views/rank/RankPageView.vue";
import SingerListView from "../views/singer/SingerListView.vue";
import SingerPageView from "../views/singer/SingerPageView.vue";
import SingerAlbumSongsView from '../views/singer/SingerAlbumSongsView.vue'
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
    path: '/browser',
    name: 'browser',
    component : SingerListView,

  },
  {
    path: '/singerPage/:id&:type',
    name: 'singerPage',
    component : SingerPageView,

  },
  {
    path: '/albumSongs/:id',
    name: 'albumSongs',
    component : SingerAlbumSongsView,
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
