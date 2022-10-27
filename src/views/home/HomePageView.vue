<template>
  <div class="homepage">
    <search-compontents></search-compontents>
    <van-swipe
      class="banner-container"
      :autoplay="3000"
      indicator-color="#cd3021"
    >
      <van-swipe-item
        v-for="i in bannerData"
        :key="i.viewId"
        class="banner-item"
        :loop="true"
        :width="351"
      >
        <img :src="i.img" />
        <!-- <div style="text-align:center">{{index}}</div> -->
      </van-swipe-item>
    </van-swipe>
    <div class="sub-container">
      <div
        class="sub-item"
        v-for="i in subData"
        :key="i.viewId"
        @click="turnTo(i.action)"
      >
        <img :src="i.img" />
        <div class="sub-title">{{ i.txt }}</div>
      </div>
    </div>
    <div class="recommend-title">
      <div class="title">{{ recommendSongListTitle.txt }}</div>
      <div class="more" @click="turnTo(recommendSongListTitle.action)">
        {{ recommendSongListTitle.txt2 }}
      </div>
    </div>
    <div class="recommend-item">
      <div class="container">
        <ul class="recommend-song-list">
          <li
            class="item"
            v-for="(i, index) in recommendSongList"
            :key="i.resId"
          >
            <div class="cover">
              <div
                class="glass"
                :style="{
                  background: 'url(' + i.img + ') no-repeat',
                  'background-size': 'container',
                }"
              ></div>
              <img :src="i.img" />
              <span class="num">
                <svg
                  class="icon"
                  width="16px"
                  height="16.00px"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ffffff"
                    d="M577.948672 39.648256 442.712064 39.648256c-226.089984 0-409.99936 183.904256-409.99936 409.99936l0 490.211328c0 8.854528 8.231936 16.101376 17.091584 16.101376L196.0448 955.96032c37.082112 0 67.233792-30.15168 67.233792-67.279872L263.278592 657.354752c0-37.087232-30.15168-67.238912-67.233792-67.238912L64.746496 590.11584 64.746496 449.64864c0-208.421888 169.54368-377.969664 377.965568-377.969664l135.237632 0c208.375808 0 377.924608 169.547776 377.924608 377.969664l0 140.468224L817.328128 590.116864c-37.087232 0-67.238912 30.15168-67.238912 67.238912l0 231.32672c0 37.128192 30.15168 67.279872 67.238912 67.279872l154.737664-0.08704c8.767488-0.091136 15.83616-7.246848 15.83616-16.01536L987.901952 449.64864C987.902976 223.553536 803.9936 39.648256 577.948672 39.648256z"
                  />
                </svg>
                {{
                  recommendNum[index]
                    ? recommendNum[index].opNumItem.playNumDesc
                    : ""
                }}
              </span>
            </div>
            <div class="name">{{ i.txt }}</div>
          </li>
        </ul>
        <ul class="recommend-tag-list"></ul>
      </div>
    </div>
    <div class="classify-list">
      <div class="classify">
        <div class="classify-item" @click="goToSongList()">
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
              d="M352 85.333333H202.666667c-64.666667 0-117.333333 52.666667-117.333334 117.333334v149.333333c0 64.666667 52.633333 117.333333 117.333334 117.333333h213.333333a53.393333 53.393333 0 0 0 53.333333-53.333333V202.666667c0-64.666667-52.633333-117.333333-117.333333-117.333334z m74.666667 330.666667a10.666667 10.666667 0 0 1-10.666667 10.666667H202.666667a74.746667 74.746667 0 0 1-74.666667-74.666667V202.666667a74.746667 74.746667 0 0 1 74.666667-74.666667h149.333333a74.746667 74.746667 0 0 1 74.666667 74.666667z m394.666666-330.666667h-149.333333c-64.666667 0-117.333333 52.666667-117.333333 117.333334v213.333333a53.393333 53.393333 0 0 0 53.333333 53.333333h213.333333c64.666667 0 117.333333-52.666667 117.333334-117.333333V202.666667c0-64.666667-52.633333-117.333333-117.333334-117.333334z m74.666667 266.666667a74.746667 74.746667 0 0 1-74.666667 74.666667H608a10.666667 10.666667 0 0 1-10.666667-10.666667V202.666667a74.746667 74.746667 0 0 1 74.666667-74.666667h149.333333a74.746667 74.746667 0 0 1 74.666667 74.666667zM416 554.666667H202.666667c-64.7 0-117.333333 52.666667-117.333334 117.333333v149.333333c0 64.666667 52.633333 117.333333 117.333334 117.333334h149.333333c64.666667 0 117.333333-52.666667 117.333333-117.333334V608a53.393333 53.393333 0 0 0-53.333333-53.333333z m10.666667 266.666666a74.746667 74.746667 0 0 1-74.666667 74.666667H202.666667a74.746667 74.746667 0 0 1-74.666667-74.666667v-149.333333a74.746667 74.746667 0 0 1 74.666667-74.666667h213.333333a10.666667 10.666667 0 0 1 10.666667 10.666667z m394.666666-266.666666H608a53.393333 53.393333 0 0 0-53.333333 53.333333v213.333333c0 64.666667 52.666667 117.333333 117.333333 117.333334h149.333333c64.666667 0 117.333333-52.666667 117.333334-117.333334v-149.333333c0-64.666667-52.633333-117.333333-117.333334-117.333333z m74.666667 266.666666a74.746667 74.746667 0 0 1-74.666667 74.666667h-149.333333a74.746667 74.746667 0 0 1-74.666667-74.666667V608a10.666667 10.666667 0 0 1 10.666667-10.666667h213.333333a74.746667 74.746667 0 0 1 74.666667 74.666667z"
            />
          </svg>
          <span>全部</span>
        </div>
        <div class="classify-item" v-for="i in classifyData" :key="i.viewId">
          {{ i.txt }}
        </div>
      </div>
    </div>
    <div class="newsong">
      <div class="title">{{ newSongTitle[0].txt }}</div>
      <div class="more">{{ newSongTitle[0].txt2 }}</div>
    </div>
    <div class="home-songs-item">
      <div class="home-song-item">
        <div
          class="home-songs-list"
          v-for="(i, index) in newSongArr"
          :key="index"
        >
          <div
            class="home-song-list"
            v-for="n in newSongArr[index]"
            :key="n.resId"
          >
            <div class="home-songs-img">
              <img :src="n.img" />
            </div>
            <div class="home-songs-msg">
              <span class="song">{{ n.txt }}</span>
              <span class="singer-song">{{ n.txt2 }} - {{ n.txt3 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="roost-title">
      <div class="title">{{ roostTitle[0].txt }}</div>
      <div class="more">{{ roostTitle[0].txt2 }}</div>
    </div>
    <div class="roost-list">
      <div class="roost">
        <div class="roost-item" v-for="i in roostData" :key="i.viewId">
          <div class="roost-album">
            <img src="@/assets/Album.png" />
          </div>
          <div class="roost-album">
            <img src="@/assets/AlbumActive.png" />
          </div>
          <div class="roost-item-img">
            <img :src="i.img" />
          </div>
          <span>{{ i.txt }}</span>
          <span class="roost-item-singer" v-if="i.txt2">{{ i.txt2 }}</span>
        </div>
      </div>
    </div>
    <div class="maylike-title">
      <div class="title">{{ maylikeTitle.contents[0].txt }}</div>
    </div>
    <div class="home-songs-item">
      <div class="home-song-item">
        <div
          class="home-songs-list"
          v-for="(i, index) in maylikeArr"
          :key="index"
        >
          <div
            class="home-song-list"
            v-for="n in maylikeArr[index]"
            :key="n.resId"
          >
            <div class="home-songs-img">
              <img :src="n.img" />
            </div>
            <div class="home-songs-msg">
              <span class="song">{{ n.txt }}</span>
              <span class="singer-song">{{ n.txt2 }} - {{ n.txt3 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prefecture-title">
      <div class="title">{{ prefectureTitle.txt }}</div>
    </div>
    <div class="prefecture-item">
      <div class="prefecture-list">
        <div class="prefecture-img" v-for="i in prefectureData" :key="i.viewId">
          <img :src="i.img" />
        </div>
      </div>
    </div>
    <div class="screaming-title">
      <div class="title">{{ screamingArr[screamIndex].contents[0].txt }}</div>
      <div class="more">{{ screamingArr[screamIndex].contents[0].txt2 }}</div>
    </div>
    <div class="screaming">
      <div class="home-songs-item" ref="screamBanner">
        <div class="home-song-item">
          <div
            class="home-songs-list"
            v-for="(i, index) in screamingArr"
            :key="index"
          >
            <div
              class="home-song-list"
              v-for="n in screamingArr[index].value"
              :key="n.resId"
            >
              <div class="home-songs-img">
                <img :src="n.img" />
              </div>
              <div class="home-songs-msg">
                <span class="song">{{ n.txt }}</span>
                <span class="singer-song">{{ n.txt2 }} - {{ n.txt3 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomePageData from "@/assets/HomePageData.json";
// import BannerComponent from "@/components/BannerComponent.vue";
import SearchCompontents from "@/components/SearchCompontents.vue";
export default {
  components: {
    // BannerComponent,
    SearchCompontents,
  },
  data() {
    return {
      homePageData: {},
      bannerData: {},
      subData: [],
      recommendSongListTitle: {},
      recommendSongList: [],
      recommendNum: [],
      classifyData: [],
      newSongTitle: [],
      newSongData: [],
      newSongArr: [],
      roostTitle: [],
      roostData: [],
      maylikeTitle: [],
      maylikeData: [],
      maylikeArr: [],
      prefectureTitle: [],
      prefectureData: [],
      screamingData: [],
      screamingArr: [],
      screamIndex: 0,
    };
  },
  mounted() {
    // console.log(this.$refs.screamBanner);
    this.$refs.screamBanner.addEventListener(
      "scroll",
      this.getScreamScrollDistance
    );
  },
  created() {
    this.homePageData = HomePageData.data.contents;
    this.bannerData = HomePageData.data.contents[1].contents;
    this.subData = HomePageData.data.contents[2].contents;
    this.recommendSongListTitle = HomePageData.data.contents[4].contents[0];
    this.recommendSongList = HomePageData.data.contents[5].contents;
    this.classifyData = HomePageData.data.contents[6].contents;
    // console.log(this.classifyData, "aaa");
    this.newSongTitle = HomePageData.data.contents[7].contents;
    this.newSongData = HomePageData.data.contents[8].contents;
    this.roostTitle = HomePageData.data.contents[9].contents;
    this.roostData = HomePageData.data.contents[10].contents;
    this.maylikeTitle = HomePageData.data.contents[11].contents[0];
    this.maylikeData = HomePageData.data.contents[11].contents[1].contents;
    this.prefectureTitle = HomePageData.data.contents[12].contents[0];
    this.prefectureData = HomePageData.data.contents[13].contents;
    this.screamingData = HomePageData.data.contents[14].contents;
    this.getNumItem(this.recommendSongList);
    this.getNewSongsData(this.newSongData);
    this.getmaylikeData(this.maylikeData);
    this.getScreamingData(this.screamingData);
    // console.log(this.homePageData);
    // console.log(Date.parse(new Date()));
    // this.$axios({
    //   methods: "GET",
    //   url: "/MIGUM3.0/bmw/index-show/recommend-playlist/v2.0",
    //   headers: {
    //     recommendstatus: 1,
    //     aversionid:
    //       "DF948B8E93A7A2886998899ED082987894978C909AA1A68AAEDDD3D18C799B73979585BA9AA8D6B967918DE9D0C598779998898C99A5A789689A8D",
    //     timestamp: Date.parse(new Date()),
    //   },
    // }).then(({ data }) => {
    //   console.log(data.data);
    //   this.recommendSongList = data.data;
    //   this.getNumItem(data.data)
    // });
  },
  methods: {
    turnTo(action) {
      if (action.indexOf("?") != -1) {
        action = action.slice(10, action.indexOf("?"));
      } else {
        action = action.slice(10);
      }
      //   action = action.replace("-", "");
      action = "/" + action;
      // console.log(action);
      this.$router.push({ path: action });
    },
    getNumItem(data) {
      let idArr = [];
      let reArr = [];
      data.forEach((e) => {
        idArr.push(e.resId);
        reArr.push(e.resType);
      });
      // console.log(idArr, reArr);
      this.$axios
        .get(
          `/MIGUM3.0/v1.0/content/queryOPNumItemsAction.do?id=${idArr.join(
            "|"
          )}&resourceType=${reArr.join("|")}`
        )
        .then(({ data }) => {
          // console.log(data.userOpNums);
          this.recommendNum = data.userOpNums;
        });
    },
    getNewSongsData(data) {
      let oneArr = [];
      let secArr = [];
      let thrArr = [];
      data.forEach((e, i) => {
        if (i < 3) {
          oneArr.push(e);
        } else if (i < 6) {
          secArr.push(e);
        } else {
          thrArr.push(e);
        }
      });
      this.newSongArr = [oneArr, secArr, thrArr];
    },
    getmaylikeData(data) {
      let oneArr = [];
      let secArr = [];
      let thrArr = [];
      data.forEach((e, i) => {
        if (i < 3) {
          oneArr.push(e);
        } else if (i < 6) {
          secArr.push(e);
        } else {
          thrArr.push(e);
        }
      });
      this.maylikeArr = [oneArr, secArr, thrArr];
    },
    getScreamingData(data) {
      let firArr = data.filter((e, i) => {
        return i % 2 == 0;
      });
      // console.log(firArr);
      data.forEach((e, i) => {
        if (i == 1) {
          firArr[(i - 1) / 2].value = e.contents;
        } else if (i == 3) {
          firArr[(i - 1) / 2].value = e.contents;
        } else if (i == 5) {
          firArr[(i - 1) / 2].value = e.contents;
        }
      });
      this.screamingArr = firArr;
      // console.log(this.screamingArr);
    },
    getScreamScrollDistance() {
      let windowWidth = document.documentElement.clientWidth;
      this.screamIndex = parseInt(
        (this.$refs.screamBanner.scrollLeft + windowWidth * 0.4) /
          (windowWidth * 0.9)
      );
    },
    goToSongList() {
      this.$router.push({ path: "/song-lists" });
    },
  },
};
</script>
<style lang="scss">
.homepage {
  .sub-container {
    display: flex;
  }
  .banner-container {
    width: 90vw;
    border-radius: 10px;
    margin: 10px auto 30px;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .container,
  .recommend-item,
  .roost-list,
  .prefecture-item {
    width: 100vw;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .sub-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 40%;
    }
    .sub-title {
      font-size: 12px;
    }
  }
  .recommend-title,
  .newsong,
  .roost-title,
  .maylike-title,
  .prefecture-title,
  .screaming-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    .more {
      font-size: 13px;
      color: #999;
    }
  }
  .classify-list {
    width: 100%;
    height: 32px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .container {
    width: 720px;
    margin: 0 0 0 10px;
    .recommend-song-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .item {
        width: 100px;
        margin: 0 20px 15px 0;
      }
      .cover {
        position: relative;
        width: calc(660px / 6);
        height: calc(660px / 6);
        margin: 0 0 6px 0;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .glass {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          filter: blur(20px);
          z-index: -1;
        }
        img {
          width: 75%;
          height: 75%;
          border-radius: 6px;
        }
        .num {
          position: absolute;
          left: 0px;
          bottom: 0px;
          color: #fff;
          font-size: 12px;
          transform: scale(0.9);
          svg {
            width: 10px;
            height: 10px;
          }
        }
      }
      .name {
        font-size: 13px;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .classify {
    width: 680px;
    margin: 0 0 0 15px;
    display: flex;
    flex-direction: row;
    color: #555;
    .classify-item {
      width: 70px;
      margin: 0 15px 0 0;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      box-shadow: 2px 2px 3px #ccc;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: fff;
    }
  }
  .home-songs-item {
    width: 100vw;
    height: 220px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .home-song-item {
    display: flex;
    width: calc(280vw + 20px);
  }
  .home-songs-list {
    width: 90vw;
    margin: 0 0 0 10px;
    display: flex;
    flex-direction: column;
    .home-song-list {
      margin: 10px 0 0 0;
      display: flex;
      flex-direction: row;
      .home-songs-img {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          border-radius: 6px;
        }
      }
      .home-songs-msg {
        margin: 0 0 0 10px;
        width: 60vw;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .song {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .singer-song {
          font-size: 12px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .roost {
    margin: 0 0 0 10px;
    display: flex;
    width: 960px;
    flex-direction: row;
    .roost-item {
      position: relative;
      margin: 0 20px 0 0;
      display: flex;
      flex-direction: column;
      .roost-album {
        position: absolute;
        top: 0;
        right: -15px;
        width: 100px;
        z-index: -1;
        img {
          width: 100%;
        }
      }
      .roost-item-img {
        width: 100px;
        img {
          width: 100%;
          border-radius: 6px;
        }
      }
      span {
        display: block;
        width: 100px;
        padding: 3px 0;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .roost-item-singer {
        font-size: 12px;
        color: #ccc;
      }
    }
  }
  .prefecture-list {
    width: 1426.5px;
    margin: 0 0 0 10px;
    display: flex;
    flex-wrap: wrap;
    .prefecture-img {
      width: 148.5px;
      height: 81px;
      margin: 0 10px 10px 0;
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
  }
  .screaming {
    margin: 0 0 45px 0;
  }
}
</style>