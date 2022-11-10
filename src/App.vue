<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <footer>
      <play-component></play-component>
    </footer>
  </div>
</template>
<script>
import PlayComponent from "./components/PlayerComponent.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    PlayComponent,
  },
  data() {
    return {
      transitionName: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // console.log(to, "to");
      // console.log(from, "from");
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
  },
  created() {
    // localStorage.setItem("moyuM-user", JSON.stringify(this.user));
    // this.initUserState()
    if (window.location.pathname == "/") {
      this.$router.push({ path: "/home" });
    }
    this.getAxios(this.$axios);
    let initUserData = {
      collectSongList: [],
      latelyListen: {
        songs: [],
        playlist: [],
        mv: [],
        album: [],
      },
      config: {
        themeColor: "#888",
      },
    };
    let userData = localStorage.getItem("moyuM-user")
      ? JSON.parse(localStorage.getItem("moyuM-user"))
      : initUserData;
    this.initUserState(userData);
    // console.log(this.user);
    localStorage.setItem("moyuM-user", JSON.stringify(this.user));
    this.initPlaylist();
    this.getVue(this);
  },
  methods: {
    ...mapMutations(["getAxios", "initUserState", "initPlaylist", "getVue"]),
  },
  beforeDestroy() {
    // console.log(this.user);
  },
};
</script>
<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  /* will-change: transform; */
  transition: all 0.5s;
  /* position: absolute; */
}
.slide-right-enter {
  /* opacity: 0; */
  transform: translateX(-100vw);
}

.slide-right-leave-active {
  /* opacity: 0; */
  transform: translateX(100vw);
}
.slide-right-enter-to {
  /* opacity: 1; */
  transform: translateX(0);
}
.slide-left-enter {
  /* opacity: 0; */
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  /* opacity: 0; */
  transform: translate3d(-100%, 0, 0);
}
.slide-right-enter-to {
  /* opacity: 1; */
  transform: translate3d(0, 0, 0);
}
</style>
