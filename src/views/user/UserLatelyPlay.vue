<template>
  <div class="lately-play">
    <header>
      <i class="back wd-icon-thin-arrow-left" @click="goBack"></i>
      <i class="search wd-icon-search" @click="goToSearch"></i>
      <div class="page-title">最近在听</div>
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
          <div class="lately-items-song" v-if="item.key == 'songs'">
            <div
              class="lately-item"
              v-for="(i, index) in item.data"
              :key="index"
            >
              <div class="song-msg" @click="getPlayURL(i.songId)">
                <div class="songname">{{ i.name }}</div>
                <div class="song-singer">
                  <div
                    class="toneflag"
                    :style="{
                      backgroundPosition: toneflagChoose(i),
                      width: toneflagWidth(i),
                    }"
                  ></div>
                  <div>
                    {{
                      i.singerList[0].name.trim()
                        ? dealWithSingerName(i.singerList)
                        : i.album
                    }}
                  </div>
                </div>
              </div>
              <svg
                @click="moreFunc(i.name, i.songId)"
                class="icon"
                width="16px"
                height="16.00px"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2c2c2c"
                  d="M469.333333 896a42.666667 42.666667 0 1 1 42.666667 42.666667 42.713333 42.713333 0 0 1-42.666667-42.666667m-42.666666 0a85.333333 85.333333 0 1 0 85.333333-85.333333 85.333333 85.333333 0 0 0-85.333333 85.333333z m42.666666-384a42.666667 42.666667 0 1 1 42.666667 42.666667 42.713333 42.713333 0 0 1-42.666667-42.666667m-42.666666 0a85.333333 85.333333 0 1 0 85.333333-85.333333 85.333333 85.333333 0 0 0-85.333333 85.333333z m42.666666-384a42.666667 42.666667 0 1 1 42.666667 42.666667 42.713333 42.713333 0 0 1-42.666667-42.666667m-42.666666 0A85.333333 85.333333 0 1 0 512 42.666667a85.333333 85.333333 0 0 0-85.333333 85.333333z"
                />
              </svg>
            </div>
            <!-- <songs-more-func
              :name="songName"
              :id="songId"
              :moretab="moretab"
              @cancelmorefunc="cancelmorefunc"
            ></songs-more-func> -->
          </div>
          <div class="lately-items-songlist" v-if="item.key == 'playlist'">
            <div
              class="songList-item"
              v-for="i in item.data"
              :key="i.playlistId"
              @click="goToOnlySongsList(i.playlistId)"
            >
              <div class="songList-img">
                <img :src="i.cover" />
              </div>
              <div class="songList-msg">
                <div class="songList-title">{{ i.title }}</div>
                <div class="songList-times">
                  <svg
                    t="1666947494755"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="12298"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M770.051533 313.11157869H254.83220512c-24.00821911 0-43.59774757 19.58952848-43.59774758 43.59774759v494.15690252c0 24.00821911 19.58952848 43.59774757 43.59774758 43.59774759h515.21932788c24.00821911 0 43.59774757-19.58952848 43.59774761-43.59774759V356.85661596c0-24.15550879-19.58952848-43.74503728-43.59774761-43.74503727z m15.7599966 537.75465011c0 8.69009158-7.06990501 15.75999659-15.7599966 15.75999659H254.83220512c-8.69009158 0-15.75999659-7.06990501-15.7599966-15.75999659V356.85661596c0-8.69009158 7.06990501-15.75999659 15.7599966-15.75999661h515.21932788c8.69009158 0 15.75999659 7.06990501 15.7599966 15.75999661v494.00961284zM277.22023765 255.52131075h470.29597313c7.65906378 0 13.99252034-6.1861669 13.99252032-13.99252032s-6.1861669-13.99252034-13.99252032-13.99252037H277.22023765c-7.65906378 0-13.99252034 6.1861669-13.99252034 13.99252037s6.33345658 13.99252034 13.99252034 13.99252032zM321.84901307 168.62039497h381.03842231c6.92261532 0 12.51962347-5.59700814 12.51962346-12.51962348s-5.59700814-12.51962347-12.51962346-12.51962346H321.84901307c-6.92261532 0-12.51962347 5.59700814-12.51962347 12.51962346s5.59700814 12.51962347 12.51962347 12.51962348z"
                      fill="#FF2C2C"
                      p-id="12299"
                    ></path>
                    <path
                      d="M634.10315118 451.71117489l-194.56967758 31.96186226c-3.38766283 0.58915875-5.89158752 3.5349525-5.89158751 6.92261531v173.94912129c0 13.40336159-9.72111939 24.74466755-22.9771913 26.6594335l-19.00036972 2.79850407c-16.20186565 2.35663501-28.13233036 16.34915535-28.13233037 32.55102099v3.38766281c0 20.17868721 17.96934191 35.64410444 37.85344978 32.55102102l24.89195723-3.68224219c22.97719129-3.38766283 39.9155054-23.12448098 39.91550538-46.39625166V563.35675824c0-3.5349525 2.50392469-6.48074626 5.89158751-6.92261533l129.61492527-21.20971503c4.27140094-0.73644845 8.24822251 2.65121438 8.24822251 6.92261531v94.55997958c0 13.40336159-9.72111939 24.74466755-22.97719129 26.65943349l-19.00036975 2.79850406c-16.20186565 2.35663501-28.13233036 16.34915535-28.13233035 32.55102101v3.3876628c0 20.17868721 17.96934191 35.64410444 37.85344976 32.55102103l24.89195723-3.68224221c22.97719129-3.38766283 39.9155054-23.12448098 39.9155054-46.39625166V458.63379022c-0.1472897-4.41869063-4.12411126-7.65906378-8.3955122-6.92261533z"
                      fill="#FF2C2C"
                      p-id="12300"
                    ></path>
                  </svg>
                  <span> {{ i.count }}首 播放{{ i.playNumDesc }}次 </span>
                </div>
                <div class="songList-ts">
                  {{ dealWithSongListTags(i.tags) }}
                </div>
              </div>
              <i class="wd-icon-arrow-right"></i>
            </div>
          </div>
          <div class="lately-items-mv" v-if="item.key == 'mv'">
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
          <div class="lately-items-album" v-if="item.key == 'album'">
            <div
              class="album-item"
              v-for="i in item.data"
              :key="i.albumId"
              @click="goToSingerAlbumSongs(i.albumId, i.Type)"
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
    <songs-more-func
      :name="songName"
      :id="songId"
      :moretab="moretab"
      @cancelmorefunc="cancelmorefunc"
    ></songs-more-func>
  </div>
</template>
<script>
import SongsMoreFunc from "@/components/SongsMoreFunc.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: { SongsMoreFunc },
  data() {
    return {
      latelyData: [],
      showHeader: 0,
      tab: 0,
      tabList: [
        {
          title: "歌曲",
          key: "songs",
          data: [],
        },
        {
          title: "歌单",
          key: "playlist",
          data: [],
        },
        {
          title: "视频",
          key: "mv",
          data: [],
        },
        {
          title: "专辑",
          key: "album",
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
    this.latelyData = this.user.latelyListen;
    this.tabList.forEach((e) => {
      e.data = this.user.latelyListen[e.key];
    });
  },
  computed: {
    ...mapState(["user"]),
    ...mapState({
      songs: (state) => state.user.latelyListen.songs,
      playlist: (state) => state.user.latelyListen.playlist,
      mv: (state) => state.user.latelyListen.mv,
      album: (state) => state.user.latelyListen.album,
    }),
  },
  watch: {
    songs() {
      this.tabList[0].data = this.songs;
    },
    playlist() {
      this.tabList[1].data = this.playlist;
    },
    mv() {
      this.tabList[2].data = this.mv;
    },
    album() {
      this.tabList[3].data = this.album;
    },
  },
  methods: {
        goToSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    dealWithSingerName(arr) {
      let str = "";
      arr.forEach((e) => {
        str = str + e.name + "/";
      });
      str = str.slice(0, -1);
      return str;
    },
    toneflagChoose(i) {
      console.log(i);
      let toneflag = i.toneFlag;
      if (toneflag == "ZQ24" || toneflag == "ZQ32") {
        return "-117px 0";
      } else if (toneflag == "SQ") {
        return "-25px 0";
      } else if (toneflag == "HQ") {
        return "-49px 0";
      } else {
        return "";
      }
    },
    // 歌曲音质图片宽度
    toneflagWidth(i) {
      let toneflag = i.toneFlag;
      if (toneflag == "ZQ24" || toneflag == "ZQ32") {
        return "32px";
      } else {
        return "20px";
      }
    },
    moreFunc(name, id) {
      this.moretab = true;
      this.songName = name;
      this.songId = id;
      // console.log(id);
    },
    cancelmorefunc() {
      this.moretab = false;
    },
    dealWithSongListTags(tags) {
      if (!tags) {
        return "";
      }
      let str = "";
      tags.forEach((e) => {
        str = str + e.tagName + ",";
      });
      str = str.slice(0, -1);
      return str;
    },
    goToOnlySongsList(id) {
      // console.log(id);
      this.$router.push({
        name: "songListOnly",
        params: {
          id,
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
    goToSingerAlbumSongs(id, type) {
      this.$router.push({
        name: "albumSongs",
        params: {
          id,
          type,
        },
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    ...mapActions(["getPlayURL"]),
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
    }
    .lately-item {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .song-msg {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 280px;
      height: 35px;
      font-size: 13px;
      .songname {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .song-singer {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .toneflag {
          background-image: url("@/assets/acousticfidelity.png");
          background-repeat: no-repeat;
          background-size: 148px 12px;
          height: 12px;
          margin: 0 5px 0 0;
        }
      }
    }
    .songList-item {
      display: flex;
      align-items: center;
      padding: 10px;
      .songList-img {
        img {
          display: block;
          width: 25vw;
          border-radius: 6px;
        }
      }
      .songList-msg {
        width: 65%;
        margin: -0 0 0 10px;
        .songList-title {
          padding: 2px;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .songList-times {
          display: flex;
          align-items: center;
          padding: 2px;
          font-size: 13px;
        }
        .songList-ts {
          margin: 20px 0 0;
          padding: 2px;
          font-size: 12px;
          color: #999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .album-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      .album-img {
        position: relative;
        img {
          position: relative;
          z-index: 2;
          display: block;
          width: 20vw;
          border-radius: 6px;
        }
        .Album-img {
          z-index: 1;
          position: absolute;
          top: 0;
          right: -13px;
        }
      }
      .album-msg {
        width: 65%;
        margin: -0 0 0 10px;
        .album-name {
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .album-pro {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 250px;
          height: 15px;
          margin: 6px 0;
          color: #999;
          .album-singer {
            font-size: 12px;
            height: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .album-time {
            font-size: 12px;
            width: 65px;
            height: 15px;
            margin: 0 0 0 10px;
            align-items: center;
            white-space: nowrap;
          }
        }
      }
    }
    .lately-items-mv {
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