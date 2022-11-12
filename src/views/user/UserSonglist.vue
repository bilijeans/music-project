<template>
  <div class="user-songlist-page">
    <header :style="{ backgroundColor: `rgba(255, 255, 255,${showHeader})` }">
      <i
        class="back wd-icon-thin-arrow-left"
        :style="{ color: showHeader == 1 ? '#000' : '#fff' }"
        @click="goBack"
      ></i>
      <i
        class="search wd-icon-search"
        :style="{ color: showHeader == 1 ? '#000' : '#fff' }"
      ></i>
    </header>
    <div class="bg-cover">
      <div
        class="bg-child"
        :style="{
          backgroundImage: `url(http://d.musicapp.migu.cn${songlistData.list[0].cover})`,
        }"
      ></div>
    </div>
    <div class="bg-mask"></div>
    <main>
      <div class="songlist-info">
        <div class="cover">
          <img
            :src="`http://d.musicapp.migu.cn${songlistData.list[0].cover}`"
          />
        </div>
        <div class="user">
          <div class="title">{{ songlistData.title }}</div>
          <div class="user-info">
            <div class="user-pic">
              <img src="@/assets/user4.svg" />
            </div>
            <div class="user-name">猪蛋蛋</div>
            <i class="wd-icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="cro-card">
        <div class="collect">
          <svg
            class="icon"
            width="16px"
            height="16.00px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#2c2c2c"
              d="M970.666667 213.333333H546.586667a10.573333 10.573333 0 0 1-7.54-3.126666L429.793333 100.953333A52.986667 52.986667 0 0 0 392.08 85.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333334v704a53.393333 53.393333 0 0 0 53.333333 53.333333h874.666667a53.393333 53.393333 0 0 0 53.333333-53.333333V266.666667a53.393333 53.393333 0 0 0-53.333333-53.333334z m10.666666 629.333334a10.666667 10.666667 0 0 1-10.666666 10.666666H96a10.666667 10.666667 0 0 1-10.666667-10.666666V138.666667a10.666667 10.666667 0 0 1 10.666667-10.666667h296.08a10.573333 10.573333 0 0 1 7.54 3.126667l109.253333 109.253333A52.986667 52.986667 0 0 0 546.586667 256H970.666667a10.666667 10.666667 0 0 1 10.666666 10.666667z m-298.666666-309.333334a21.333333 21.333333 0 0 1-21.333334 21.333334H554.666667v106.666666a21.333333 21.333333 0 0 1-42.666667 0V554.666667H405.333333a21.333333 21.333333 0 0 1 0-42.666667h106.666667V405.333333a21.333333 21.333333 0 0 1 42.666667 0v106.666667h106.666666a21.333333 21.333333 0 0 1 21.333334 21.333333z"
            />
          </svg>
          收藏
        </div>
        <div class="comment">
          <svg
            class="icon"
            width="16px"
            height="16.00px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#2c2c2c"
              d="M149.333333 938.666667a21.333333 21.333333 0 0 1-21.333333-21.333334v-106.666666a85.426667 85.426667 0 0 1-85.333333-85.333334V213.333333a85.426667 85.426667 0 0 1 85.333333-85.333333h768a85.426667 85.426667 0 0 1 85.333333 85.333333v512a85.426667 85.426667 0 0 1-85.333333 85.333334H286.166667l-121.746667 121.753333A21.333333 21.333333 0 0 1 149.333333 938.666667zM128 170.666667a42.713333 42.713333 0 0 0-42.666667 42.666666v512a42.713333 42.713333 0 0 0 42.666667 42.666667h21.333333a21.333333 21.333333 0 0 1 21.333334 21.333333v76.5l91.58-91.586666A21.333333 21.333333 0 0 1 277.333333 768h618.666667a42.713333 42.713333 0 0 0 42.666667-42.666667V213.333333a42.713333 42.713333 0 0 0-42.666667-42.666666z"
            /></svg
          >评论
        </div>
        <div class="share">分享</div>
      </div>
      <div class="play-head" ref="playHead">
        <div class="play-all" @click="playAll">
          <svg
            class="icon"
            width="16px"
            height="16.00px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#2c2c2c"
              d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
            />
          </svg>
          <span>播放全部 {{ songlistData.list.length }} </span>
        </div>
      </div>

      <div class="col-items-song">
        <div class="col-item" v-for="i in songlistData.list" :key="i.songId">
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
        <songs-more-func
          :name="songName"
          :id="songId"
          :moretab="moretab"
          @cancelmorefunc="cancelmorefunc"
        ></songs-more-func>
      </div>
    </main>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: null,
      songlistData: {},
      songName: "",
      moretab: false,
      songId: "",
      showHeader: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.getTop);
  },
  created() {
    this.id = this.$route.query.id;
    this.user.mySongList.forEach((e) => {
      if (e.playlistId == this.id) {
        this.songlistData = e;
      }
    });
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getTop() {
      let top = this.$refs.playHead.getBoundingClientRect().top;
      if (top == 50) {
        this.showHeader = 1;
      }
      if (top >= 80) {
        this.showHeader = 0;
      }
      if (top < 60) {
        if (this.showHeader < 1) {
          this.showHeader += 0.2;
        }
      } else {
        if (this.showHeader > 0) {
          this.showHeader -= 0.2;
        }
      }
      console.log(top);
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
    playAll() {
      this.playList(this.songlistData.list);
    },
    ...mapActions(["playList"]),
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.getTop);
  },
};
</script>
<style lang="scss">
.user-songlist-page {
  header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;

    z-index: 100;
    // background-color: #fff;
    .back {
      position: absolute;
      left: 20px;
      line-height: 50px;
      color: #fff;
    }
    .search {
      position: absolute;
      right: 20px;
      line-height: 50px;
      color: #fff;
    }
    .page-title {
      text-align: center;
      line-height: 50px;
    }
  }
  .bg-cover {
    position: absolute;
    width: 100vw;
    height: 280px;
    z-index: -3;
    overflow: hidden;
    .bg-child {
      width: 180%;
      height: 400px;
      position: absolute;
      left: -40%;
      top: 0;
      z-index: -2;
      content: "";
      border-radius: 0 0 50% 50%;
      background-size: 1000vw 2000px;
      filter: blur(30px);
      background-repeat: no-repeat;
      overflow: hidden;
      &::after {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background-color: rgba(0, 0, 0, 0.3);
        z-index: -1;
      }
    }
  }
  .bg-mask {
  }
  main {
    position: relative;
    // padding: 50px 20px;
    .songlist-info {
      padding: 80px 20px 0 20px;
      display: flex;
      .cover {
        width: 130px;
        img {
          display: block;
          width: 100%;
          border-radius: 10px;
        }
      }
      .user {
        width: 150px;
        margin-left: 10px;
        color: #fff;
        .title {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 18px;
          margin-top: 10px;
        }
        .user-pic {
          width: 30px;
          margin-right: 5px;
          img {
            display: block;
            width: 100%;
            border-radius: 999px;
          }
        }
        .user-info {
          display: flex;
          align-items: center;
          margin-top: 50px;
          font-size: 12px;
          color: #ccc;
        }
      }
    }
    .cro-card {
      display: flex;
      align-items: center;
      width: 80vw;
      height: 50px;
      border-radius: 999px;
      background-color: #fff;
      margin: 0 auto;
      box-shadow: 0px 3px 5px #ccc;
      margin-top: 40px;
      div {
        // line-height: 50px;
        height: 20px;
        flex-grow: 1;
        text-align: center;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid #ccc;
      }
      div:first-child {
        border: none;
      }
    }
    .play-head {
      position: sticky;
      top: 50px;
      background-color: #fff;
      margin-top: 30px;
    }
    .play-all {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 130px;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 20px;
      color: #666;
      background-color: #fafafa;
      margin-left: 20px;
      svg {
        width: 15px;
        height: 15px;
      }
    }
    .col-items-song {
      padding-bottom: 50px;
    }
    .col-item {
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
  }
}
</style>