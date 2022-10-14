<template>
  <div class="homepage">
    <banner-component></banner-component>
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
    <div class="container">
      <ul class="recommend-song-list">
        <li class="item" v-for="(i, index) in recommendSongList" :key="i.resId">
          <div class="cover">
            <div
              class="glass"
              :style="{
                background: 'url(' + i.img + ') no-repeat',
                'background-size': 'container',
              }"
            ></div>
            <img :src="i.img" />
            <span class="num">{{
              recommendNum[index]
                ? recommendNum[index].opNumItem.playNumDesc
                : ""
            }}</span>
          </div>
          <div class="name">{{ i.txt }}</div>
        </li>
      </ul>
      <ul class="recommend-tag-list"></ul>
    </div>
  </div>
</template>
<script>
import HomePageData from "@/assets/HomePageData.json";
import BannerComponent from "@/components/BannerComponent.vue";
export default {
  components: {
    BannerComponent,
  },
  data() {
    return {
      homePageData: {},
      bannerData: {},
      subData: [],
      recommendSongListTitle: {},
      recommendSongList: [],
      recommendNum: [],
    };
  },
  created() {
    this.homePageData = HomePageData.data.contents;
    this.bannerData = HomePageData.data.contents[1];
    this.subData = HomePageData.data.contents[2].contents;
    this.recommendSongListTitle = HomePageData.data.contents[4].contents[0];
    this.recommendSongList = HomePageData.data.contents[5].contents;
    this.getNumItem(this.recommendSongList);
    console.log(this.homePageData);
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
      console.log(action);
      this.$router.push({path:action})
    },
    getNumItem(data) {
      let idArr = [];
      let reArr = [];
      data.forEach((e) => {
        idArr.push(e.resId);
        reArr.push(e.resType);
      });
      console.log(idArr, reArr);
      this.$axios
        .get(
          `/MIGUM3.0/v1.0/content/queryOPNumItemsAction.do?id=${idArr.join(
            "|"
          )}&resourceType=${reArr.join("|")}`
        )
        .then(({ data }) => {
          console.log(data.userOpNums);
          this.recommendNum = data.userOpNums;
        });
    },
  },
};
</script>
<style lang="scss">
.sub-container {
  display: flex;
}
.container {
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
    width: 100%;
  }
}
.recommend-song-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 840px;
  .item {
    width: 15%;
    // margin-right: 15px;
  }
  .cover {
    position: relative;
    width: 100%;
    height: calc(840px / 6);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: none;
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
      width: 80%;
      // height: 80%;
      border-radius: 10px;
    }
    .num {
      position: absolute;
      left: 10px;
      bottom: 5px;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>