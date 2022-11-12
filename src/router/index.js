import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageView from "../views/home/HomePageView.vue";
import RankPageView from "../views/rank/rankPageView.vue";
import SingerListView from "../views/singer/SingerListView.vue";
import SingerPageView from "../views/singer/SingerPageView.vue";
import SingerAlbumSongsView from '../views/singer/SingerAlbumSongsView.vue'
import RankScreamsGroup from "../views/rank/RankScreamsGroup.vue";
import RankCharacteristicsGroup from "../views/rank/RankCharacteristicsGroup.vue";
import SearchPageView from '../views/search/SearchPageView.vue';
import SongListView from '../views/songList/songlistView.vue';
import SongsListOnlyView from '../views/songList/SongsListOnlyView.vue'
import SearchResultView from '../views/search/SearchResultView.vue'
import RadioStation from '../views/station/StationIndex.vue'
import RadioDetail from '../views/station/StationDetail.vue'
import UserIndexView from '../views/user/UserIndexView.vue'
import UserLatelyPlay from "../views/user/UserLatelyPlay.vue"
import VideoPageView from '../views/video/VideoPageView.vue'
import MoreFuncComment from '../views/comment/MoreFuncComment.vue'
import CharacteristicsGroup from '../views/rank/CharacteristicsGroup.vue'
import PeopleIndex from '../views/people/PeopleIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomePageView,
    meta: {
      index: 0
    }
  },
  {
    path: '/scene-radio',
    name: 'scene-radio',
    component: RadioStation,
    meta: {
      index: 1
    }
  },

  {
    path: '/radio-detail',
    name: 'radio-detail',
    component: RadioDetail,
    meta:{
      index:2
    }
  },

  {
    path: '/rank',
    name: 'rank',
    component: RankPageView,
    meta: {
      index: 1
    }
  },
  {
    path: '/browser',
    name: 'browser',
    component: SingerListView,
    meta: {
      index: 1
    }
  },
  {
    path: '/SingerPage/:id&:type',
    name: 'SingerPage',
    component: SingerPageView,
    meta: {
      index: 2,
    }
  },
  {
    path: '/albumSongs/:id&:type',
    name: 'albumSongs',
    component: SingerAlbumSongsView,
    meta: {
      index: 3
    }
  },

  {
    path: '/rankScreams',
    name: 'screams',
    component: RankScreamsGroup,
    props: true,
    meta: {
      index: 2
    }
  },
  {
    path: '/rankCharacteristics',
    name: 'characteristics',
    component: RankCharacteristicsGroup,
    meta:{
      index:2
    }
  },
  {
    path: '/characteristics-group',
    name: 'characteristics-group',
    component: CharacteristicsGroup,
    meta:{
      index:2
    }
  },
  {
    path: '/songList',
    name: 'songList',
    component: SongListView,
    meta: {
      index: 1
    }
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPageView,
    meta: {
      index: 1
    }
  },
  {
    path: '/song-lists',
    name: 'song-lists',
    component: SongListView,
    meta: {
      index: 1
    }
  },
  {
    path: '/songListOnly/:id',
    name: 'songListOnly',
    component: SongsListOnlyView,
    meta: {
      index: 2
    }
  },
  {
    path: '/search-result',
    name: 'search-result',
    component: SearchResultView,
    meta: {
      index: 2,
      keepAlive: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: UserIndexView,
    meta: {
      index: 1
    }
  },
  {
    path: '/user-lately-play',
    name: 'user-lately-play',
    component: UserLatelyPlay,
    meta: {
      index: 5
    }
  },
  {
    path: '/user/user-collect',
    name: 'user-collect',
    component: () => import("../views/user/UserCollect.vue"),
    meta: {
      index: 5
    }
  },
  {
    path: '/user/user-fav-song',
    name: 'user-fav-song',
    component: () => import("../views/user/UserFavSong.vue"),
    meta: {
      index: 5
    }
  },
  {
    path: '/user/user-follow',
    name: 'user-follow',
    component: () => import("../views/user/UserFollow.vue"),
    meta: {
      index: 5
    }
  },
  {

    path: '/video',
    name: 'video',
    component: VideoPageView,
    meta:{
      index:10
    }
  },

  {

    path: '/morefunc-comment',
    name: 'morefunc-comment',
    component: MoreFuncComment,
    meta:{
      index:20
    }
  },
  {

    path: '/other-user',
    name: 'other-user',
    component: PeopleIndex,
    meta:{
      index:20
    }
  },
  {

    path: '/other-user/fav',
    name: 'other-user-fav',
    component: () => import('../views/people/PeopleFavSong.vue'),
    meta:{
      index:21
    }
  },
  {

    path: '/other-user/lately',
    name: 'other-user-lately',
    component: () => import('../views/people/PeopleLatelySong.vue'),
    meta:{
      index:21
    }
  },
  {

    path: '/user/songlist',
    name: 'user-songlist',
    component: () => import('../views/user/UserSonglist.vue'),
    meta:{
      index:5
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
