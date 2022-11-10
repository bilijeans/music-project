<template>
  <div class="lately-play">
    <header>
      <i class="back wd-icon-thin-arrow-left" @click="goBack"></i>
      <i class="search wd-icon-search"></i>
    </header>
    <main>
      <wd-tabs
        v-model="tab"
        :animated="true"
        :swipeable="true"
        :lazy-render="true"
        :sticky="true"
        :offset-top="50"
      >
        <wd-tab
          v-for="item in tabList"
          :key="item.key"
          :title="`${item.title}`"
        >
          <div class="col-items-mv" v-if="item.key == 'mv'"></div>
          <div class="col-items-album" v-if="item.key == 'album'">
            <div class="album-item" v-for="i in item.data" :key="i.albumId">
              <div class="album-img">
                <img :src="i.cover" />
                <img class="Album-img" src="@/assets/Album.png" />
              </div>
              <div class="album-msg">
                <div class="album-name">{{ i.title }}</div>
                <div class="album-pro">
                  <div class="album-singer">{{ i.singer }}</div>
                  <div class="album-time">{{ i.publishDate }}</div>
                </div>
              </div>
              <i class="wd-icon-arrow-right"></i>
            </div>
          </div>
        </wd-tab>
      </wd-tabs>
    </main>
    <!-- <songs-more-func
      :name="songName"
      :id="songId"
      :moretab="moretab"
      @cancelmorefunc="cancelmorefunc"
    ></songs-more-func> -->
  </div>
</template>
<script>
// import SongsMoreFunc from "@/components/SongsMoreFunc.vue";
import { mapState } from "vuex";
export default {
  //   components: { SongsMoreFunc },
  data() {
    return {
      latelyData: [],
      showHeader: 0,
      tab: 0,
      tabList: [
        {
          title: "专辑",
          key: "album",
          data: [],
        },
        {
          title: "视频",
          key: "mv",
          data: [],
        },
      ],
      songName: "",
      songId: "",
      moretab: false,
    };
  },
  created() {
    // localStorage.getItem();
    this.collectData = this.user.userCollect;
    this.tabList.forEach((e) => {
      e.data = this.user.userCollect[e.key];
    });
  },
  computed: {
    ...mapState(["user"]),
    ...mapState({
      mv: (state) => state.user.userCollect.mv,
      album: (state) => state.user.userCollect.album,
    }),
  },
  watch: {
    mv() {
      this.tabList[1].data = this.mv;
    },
    album() {
      this.tabList[0].data = this.album;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss">
.lately-play {
  header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;

    z-index: 100;
    background-color: #fff;
    .back {
      position: absolute;
      left: 20px;
      line-height: 50px;
    }
    .search {
      position: absolute;
      right: 20px;
      line-height: 50px;
    }
  }
  main {
    padding: 50px 0;
    .lately-items-song {
      width: 100%;
    }
    .wd-tab {
      min-height: calc(100vh - 144px);
    }
  }
}
</style>