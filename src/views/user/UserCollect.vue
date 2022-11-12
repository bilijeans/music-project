<template>
  <div class="lately-play">
    <header>
      <i class="back wd-icon-thin-arrow-left" @click="goBack"></i>
      <i class="search wd-icon-search"></i>
      <div class="page-title">我的收藏</div>
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
          <div class="col-items-mv" v-if="item.key == 'mv'">
            <div
              class="mvSong-item"
              v-for="(i, index) in item.data"
              :key="i.resId"
              @click="trunToVideoPage(index)"
            >
              <div class="mvSong-img">
                <img
                  v-lazy="i.img"
                  loading="require('defaultSonglistCover.jpg')"
                />
              </div>
              <div class="mvSong-playNum">
                <svg
                  t="1666840943343"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="23732"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="16"
                  height="16"
                >
                  <path
                    d="M586.666667 213.333333H53.333333a53.393333 53.393333 0 0 0-53.333333 53.333334v490.666666a53.393333 53.393333 0 0 0 53.333333 53.333334h533.333334a53.393333 53.393333 0 0 0 53.333333-53.333334V266.666667a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666666 544a10.666667 10.666667 0 0 1-10.666666 10.666667H53.333333a10.666667 10.666667 0 0 1-10.666666-10.666667V266.666667a10.666667 10.666667 0 0 1 10.666666-10.666667h533.333334a10.666667 10.666667 0 0 1 10.666666 10.666667z m399.72-536.8a52.746667 52.746667 0 0 0-53.613333 0.493334l-192 114a53.553333 53.553333 0 0 0-26.106667 45.853333v262.24a53.54 53.54 0 0 0 26.106667 45.853333l192 114a53.333333 53.333333 0 0 0 80.56-45.853333V266.88a52.746667 52.746667 0 0 0-26.946667-46.346667zM981.333333 757.12a10.666667 10.666667 0 0 1-16.113333 9.166667l-192-114a10.706667 10.706667 0 0 1-5.22-9.166667V380.88a10.706667 10.706667 0 0 1 5.22-9.166667l192-114a10.4 10.4 0 0 1 5.386667-1.54 11.006667 11.006667 0 0 1 5.333333 1.44 10.466667 10.466667 0 0 1 5.386667 9.266667z"
                    fill="#fff"
                    p-id="23733"
                  ></path>
                </svg>
                <span>{{ i.txt3 }}</span>
              </div>
              <div class="mvSong-msg">
                <div class="mvSong-name">
                  <span>{{ i.txt }}</span>
                </div>
                <div class="mvSong-singer">
                  <svg
                    t="1666840583066"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="21256"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M807.538 408.872l-99.22 231.336c-5.233 12.162-16.68 19.405-28.892 19.837a86.04 86.04 0 0 1-2.907 0c-12.311-0.416-23.858-7.66-29.108-19.837L561.499 441.17v185.847c0 18.359-14.87 33.228-33.228 33.228s-33.23-14.87-33.23-33.228V527.93l-66.755 115.618c-6.396 11.081-18.208 16.93-30.154 16.448-11.43 0.482-22.745-5.367-28.86-16.448l-73.601-133.28v116.749c0 18.359-14.87 33.228-33.229 33.228s-33.229-14.87-33.229-33.228V394.418c0-18.36 14.87-33.229 33.23-33.229 14.104 0 26.067 8.822 30.902 21.2 4.719 2.824 104.786 180.48 104.786 180.48l96.91-167.853s14.87-33.827 33.229-33.827c10.051 0 18.94 4.553 25.037 11.597 3.09-3.538 6.895-6.53 11.414-8.573 16.83-7.642 36.435-0.016 43.778 17.013l69.447 160.908 69.015-160.908c7.31-17.03 26.799-24.656 43.53-17.013 16.714 7.626 24.357 27.63 17.047 44.66z"
                      fill="#D81E06"
                      p-id="21257"
                    ></path>
                    <path
                      d="M927.011 294.733c0-82.573-66.939-149.528-149.528-149.528H245.83c-82.59 0-149.528 66.955-149.528 149.528v431.969c0 82.589 66.939 149.527 149.528 149.527h531.653c82.59 0 149.528-66.938 149.528-149.527v-431.97zM794.097 942.686H229.214c-110.102 0-199.37-89.268-199.37-199.37V278.117c0-110.102 89.268-199.37 199.37-199.37h564.883c110.102 0 199.37 89.268 199.37 199.37v465.197c0 110.103-89.268 199.371-199.37 199.371z"
                      fill="#D81E06"
                      p-id="21258"
                    ></path>
                  </svg>
                  <span>{{ i.txt2 }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-items-album" v-if="item.key == 'album'">
            <div
              class="album-item"
              v-for="i in item.data"
              :key="i.albumId"
              @click="turnToAlbum(i.albumId, i.type)"
            >
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
    turnToAlbum(id, type) {
      this.$router.push({
        name: "albumSongs",
        params: {
          id,
          type,
        },
      });
    },
    trunToVideoPage(index) {
      let jsonData = JSON.stringify({ data: this.user.userCollect.mv });
      this.$router.push({
        path: "/video",
        query: {
          videoList: jsonData,
          index,
        },
      });
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
    .page-title {
      text-align: center;
      line-height: 50px;
    }
  }
  main {
    padding: 50px 0;
    .lately-items-song {
      width: 100%;
    }
    .wd-tab {
      height: calc(100vh - 144px);
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .col-items-mv {
      width: 95%;
      margin: 10px auto 0;
    }
    .mvSong-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 10px 0;
      .mvSong-img {
        position: relative;
        width: 45vw;
        height: calc(4500 / 175) - (100 / 8) vh;
        img {
          display: block;
          width: 45vw;
          border-radius: 6px;
        }
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: "";
          display: block;
          width: 100%;
          height: 100px;
          border-radius: 6px;
          background: rgb(0, 0, 0);
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(125, 98, 98, 0) 25%
          );
        }
      }
      .mvSong-playNum {
        position: absolute;
        display: flex;
        align-items: center;
        left: 5px;
        bottom: 12px;
        font-size: 12px;
        color: #fff;
        svg {
          padding: 0 2px 0 0;
        }
      }
      .mvSong-msg {
        width: 45%;
        margin: 0 0 0 10px;
        .mvSong-name {
          font-size: 15px;
          padding: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mvSong-singer {
          display: flex;
          align-items: center;
          font-size: 13px;
          padding: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #999;
          svg {
            padding: 0 5px 0 0;
          }
        }
      }
    }
  }
}
</style>