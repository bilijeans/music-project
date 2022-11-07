<template>
  <div class="songslist">
    <div class="songs-play">
      <div class="play-all">
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
        <span @click="playList(songsData.dataList)"
          >播放全部 {{ songsData.dataList ? songsData.dataList.length : 0 }}
        </span>
      </div>
      <div class="download-list">
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
            d="M928 938.666667H138.666667a53.393333 53.393333 0 0 1-53.333334-53.333334v-181.333333a21.333333 21.333333 0 0 1 42.666667 0v181.333333a10.666667 10.666667 0 0 0 10.666667 10.666667h789.333333a10.666667 10.666667 0 0 0 10.666667-10.666667v-181.333333a21.333333 21.333333 0 0 1 42.666666 0v181.333333a53.393333 53.393333 0 0 1-53.333333 53.333334z m-394.666667-213.333334a21.266667 21.266667 0 0 1-15.086666-6.246666l-170.666667-170.666667a21.333333 21.333333 0 0 1 30.173333-30.173333L512 652.5V106.666667a21.333333 21.333333 0 0 1 42.666667 0v545.833333l134.246666-134.253333a21.333333 21.333333 0 1 1 30.173334 30.173333l-170.666667 170.666667A21.266667 21.266667 0 0 1 533.333333 725.333333z"
          />
        </svg>
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
            d="M149.333333 938.666667a21.266667 21.266667 0 0 1-15.086666-6.246667l-42.666667-42.666667a21.333333 21.333333 0 0 1 30.173333-30.173333l27.58 27.586667 112.913334-112.92a21.333333 21.333333 0 0 1 30.173333 30.173333l-128 128A21.266667 21.266667 0 0 1 149.333333 938.666667z m768-42.666667H405.333333a21.333333 21.333333 0 0 1 0-42.666667h512a21.333333 21.333333 0 0 1 0 42.666667zM149.333333 618.666667a21.266667 21.266667 0 0 1-15.086666-6.246667l-42.666667-42.666667a21.333333 21.333333 0 0 1 30.173333-30.173333L149.333333 567.166667l112.913334-112.92a21.333333 21.333333 0 0 1 30.173333 30.173333l-128 128A21.266667 21.266667 0 0 1 149.333333 618.666667z m768-64H405.333333a21.333333 21.333333 0 0 1 0-42.666667h512a21.333333 21.333333 0 0 1 0 42.666667zM149.333333 256a21.266667 21.266667 0 0 1-15.086666-6.246667l-42.666667-42.666666a21.333333 21.333333 0 0 1 30.173333-30.173334L149.333333 204.5l112.913334-112.92a21.333333 21.333333 0 0 1 30.173333 30.173333l-128 128A21.266667 21.266667 0 0 1 149.333333 256z m768-42.666667H405.333333a21.333333 21.333333 0 0 1 0-42.666666h512a21.333333 21.333333 0 0 1 0 42.666666z"
          />
        </svg>
      </div>
    </div>
    <div class="songs">
      <div
        class="songs-item"
        v-for="(i, index) in songsData.dataList"
        :key="i.songId"
      >
        <span>{{ index + 1 }}</span>
        <div class="song-msg" @click="getPlayURL(i.songId)">
          <div class="songname">{{ i.songName }}</div>
          <div class="song-album" v-if="i.singerList">
            <div
              class="toneflag"
              :style="{
                backgroundPosition: toneflagChoose(i),
                width: toneflagWidth(i),
              }"
              v-if="
                i.audioFormats[i.audioFormats.length - 1]?.formatType != 'PQ' &&
                i.audioFormats[i.audioFormats.length - 1]?.formatType != 'Z3D'
              "
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
          @click="moreFunc(i.songName, i.songId)"
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
    </div>
    <songs-more-func
      :name="name"
      :id="id"
      :moretab="moretab"
      @cancelmorefunc="cancelmorefunc"
    ></songs-more-func>
  </div>
</template>

<script>
import SongsMoreFunc from "@/components/SongsMoreFunc";
import { mapActions, mapMutations } from "vuex";
export default {
  props: { songsData: Object },
  data() {
    return {
      moretab: false,
      name: "",
      id: "",
    };
  },
  components: {
    SongsMoreFunc,
  },
  created() {
    this.songsListData = this.songsData;
    console.log(this.songsData,1);
  },
  mounted(){
    console.log(this.songsData);
  },
  methods: {
    moreFunc(name, id) {
      this.moretab = true;
      this.name = name;
      this.id = id;
      // console.log(id);
    },
    cancelmorefunc() {
      this.moretab = false;
    },
    dealWithSingerName(arr) {
      let str = "";
      arr.forEach((e) => {
        str = str + e.name + "/";
      });
      str = str.slice(0, -1);
      return str;
    },
    // 歌曲音质图片
    toneflagChoose(i) {
      let toneflag = i.audioFormats[i.audioFormats.length - 1].formatType;
      if (toneflag == "ZQ24") {
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
      let toneflag = i.audioFormats[i.audioFormats.length - 1].formatType;
      if (toneflag == "ZQ24") {
        return "32px";
      } else {
        return "20px";
      }
    },
    ...mapActions(["getPlayURL"]),
    ...mapActions(["playList"]),
    ...mapMutations(["changeHighNum"]),
  },
};
</script>

<style lang="scss" scoped>
.songslist {
  position: relative;
  width: 100%;
  margin: 220px 0 51px 0;
  border-top-left-radius: 20px;
  .songs-play {
    position: sticky;
    top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-top-left-radius: 20px;
    background-color: #fff;
    svg {
      width: 20px;
      height: 20px;
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
      svg {
        width: 15px;
        height: 15px;
      }
    }
    .download-list {
      width: 55px;
      display: flex;
      justify-content: space-between;
    }
  }
  .songs {
    background-color: #fff;
    height: calc(100vh - 108px);
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
    .songs-item:nth-of-type(-n + 3) span {
      color: #da4165;
    }
    .songs-item {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      span {
        display: block;
        font-size: 14px;
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
        .song-album {
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
}
</style>