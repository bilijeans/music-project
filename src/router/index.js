import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageView from "../views/home/HomePageView.vue";
import RankPageView from "../views/rank/rankPageView.vue";
import SingerListView from "../views/singer/SingerListView.vue";
import SingerPageView from "../views/singer/SingerPageView.vue";
import SingerAlbumSongsView from '../views/singer/SingerAlbumSongsView.vue'
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
    path: '/singer',
    name: 'singer',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
