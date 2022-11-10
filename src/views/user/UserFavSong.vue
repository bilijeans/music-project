<template>
  <div class="user-fav-song">
    <header>
      <i class="back wd-icon-thin-arrow-left" @click="goBack"></i>
      <i class="search wd-icon-search"></i>
    </header>
    <main>
      <div class="fav-items-song">
        <div class="fav-item" v-for="i in user.fav.song" :key="i.songId">
          <div class="song-msg" @click="getPlayURL(i.songId)">
            <div class="songname">{{ i.songName }}</div>
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
    </main>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
    ...mapActions(["getPlayURL"]),
  },
};
</script>
<style lang="scss">
.user-fav-song {
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
    .fav-item {
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