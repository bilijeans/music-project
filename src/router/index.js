import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageView from "../views/home/HomePageView.vue";
import RankPageView from "../views/rank/RankPageView.vue";
import SingerListView from "../views/singer/SingerListView.vue";
import SingerPageView from "../views/singer/SingerPageView.vue";
import SingerAlbumSongsView from '../views/singer/SingerAlbumSongsView.vue'
import RankScreamsGroup from "../views/rank/RankScreamsGroup.vue";
import RankCharacteristicsGroup from "../views/rank/RankCharacteristicsGroup.vue";
import SearchPageView from '../views/search/SearchPageView.vue';
import SongListView from '../views/songList/SongListView.vue';
import SongsListOnlyView from '../views/songList/SongsListOnlyView.vue'
import SearchResultView from '../views/search/SearchResultView.vue'
import RadioStation from '../views/station/StationIndex.vue'
import RadioDetail from '../views/station/StationDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePageView,
  },
  {
    path: '/scene-radio',
    name: 'scene-radio',
    component: RadioStation,
  },

  {
    path: '/radio-detail',
    name: 'radio-detail',
    component: RadioDetail
  },

  {
    path: '/rank',
    name: 'rank',
    component: RankPageView,
  },
  {
    path: '/browser',
    name: 'browser',
    component: SingerListView,

  },
  {
    path: '/singerPage/:id&:type',
    name: 'singerPage',
    component: SingerPageView,

  },
  {
    path: '/albumSongs/:id&:type',
    name: 'albumSongs',
    component: SingerAlbumSongsView,
  },

  {
    path: '/rankScreams',
    name: 'screams',
    component: RankScreamsGroup,
    props: true,
  },
  {
    path: '/rankCharacteristics',
    name: 'characteristics',
    component: RankCharacteristicsGroup,
  },
  {
    path: '/songList',
    name: 'songList',
    component: SongListView,
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPageView,
  },
  {
    path: '/song-lists',
    name: 'song-lists',
    component: SongListView,
  },
  {
    path: '/songListOnly/:id',
    name: 'songListOnly',
    component: SongsListOnlyView,
  },
  {
    path: '/search-result',
    name: 'search-result',
    component: SearchResultView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
