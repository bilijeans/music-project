<template>
  <div class="music-station">
    <div class="music-container">
      <header>
        <i class="back wd-icon-thin-arrow-left" @click="backToHome"></i>
        <div class="title">{{ title }}</div>
        <i
          class="search wd-icon-search"
          @click.stop="searchShow = !searchShow"
        ></i>
        <div
          class="search-input"
          :style="{
            width: searchShow ? '50%' : 0,
            border: searchShow ? '1px solid #ccc' : 'none',
          }"
        >
          <input type="text" placeholder="请输入搜索内容" />
        </div>
      </header>
      <main @click="searchShow = false">
        <div class="special-radio">
          <div class="radio-button-s"></div>
          <div class="radio-gab-s"></div>
          <div class="radio-station-s">
            <div class="private-station">
              <div class="sp-title">私人FM</div>
              <div class="sp-desc">Private station</div>
            </div>
            <div class="other-station">
              <div class="other-station-r">
                <div class="sp-title">上瘾电台</div>
                <div class="sp-desc">一秒上瘾</div>
              </div>
              <div class="other-station-r">
                <div class="sp-title">听见不同</div>
                <div class="sp-desc">发现惊喜</div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-title" v-if="timeStation">
          {{ timeStation.title.txt }}
        </div>
        <div class="time-recommend" v-if="timeStation">
          <div class="contents">
            <div
              class="content"
              v-for="(item, index) in timeStation.data"
              :key="index"
              @click="playByStation(item)"
            >
              <div class="content-cover">
                <img :src="item.img" />
                <div class="content-cover-mask"></div>
              </div>
              <div class="content-name">{{ item.txt }}</div>
            </div>
          </div>
        </div>
        <div class="title-navs">
          <div
            class="station-nav-title"
            :class="{ active: highLightIndex == index }"
            v-for="(i, index) in stationNav"
            :key="i.viewId"
            @click="moveTo(index)"
          >
            <div class="nav-title-value">{{ i.contents[0].txt }}</div>
          </div>
        </div>
        <div class="station-navs" ref="nav">
          <div class="station-items">
            <div
              class="station-item-page"
              ref="page"
              v-for="item in stationNav"
              :key="item.viewId"
              :style="{ width: `${Math.ceil(item.list.length / 2) * 100}px` }"
            >
              <div
                class="station-item"
                v-for="i in item.list"
                :key="i.viewId"
                @click="playByStation(i)"
              >
                <div class="station-cover">
                  <img :src="i.img" />
                  <div class="station-mask"></div>
                </div>
                <div class="station-name">{{ i.txt }}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="station-recommend"
            v-for="i in stationRecommend"
            :key="i.viewId"
          >
            <div class="station-recommend-title">
              <div class="recommend-title">{{ i.contents[0].txt }}</div>
            </div>
            <div class="station-list">
              <div
                class="station-recommend-item"
                v-for="item in i.data"
                :key="item.resId"
              >
                <div class="station-img">
                  <img :src="item.img" />
                  <div class="station-mask"></div>
                </div>
                <div class="station-info" @click="turnToDetail(item.resId)">
                  <div class="station-info-name">{{ item.txt }}</div>
                  <div class="station-info-from">{{ item.txt2 }}</div>
                  <div class="station-info-desc">{{ item.txt3 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import stationStaticData from "@/assets/radioData.json";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title: null,
      searchShow: false,
      specialStation: null,
      timeStation: null,
      stationNav: null,
      stationRecommend: null,
      pageWidthArr: [],
      highLightIndex: 0,
    };
  },
  mounted() {
    console.log(this.$refs);
    console.log(this.$refs.nav);
    this.$refs.nav.addEventListener("scroll", this.getPageIndex);
  },
  created() {
    this.$axios
      .get(`/bmw/page-data/music-radio/v1.0?templateVersion=1`)
      .then(({ data }) => {
        this.dealWithData(data.data);
      });
  },
  methods: {
    dealWithData(data) {
      console.log(data);
      this.title = data.header.title.slice(2);
      this.specialStation = data.contents[0].contents;
      this.timeStation = {
        title: data.contents[1].contents[0],
        data: data.contents[2].contents,
      };
      this.getStationNavData(data.contents[3].contents);
      this.getRecommandData(data.contents.slice(4));
      // console.log(data.contents.slice(4));
    },
    playByStation(item) {
      stationStaticData.forEach((el) => {
        if (el.id == item.resId) {
          this.playList(el.data.songItems);
        }
      });
    },
    getStationNavData(data) {
      let navTitle = data.filter((e) => {
        return e.view == "ZJ-Title";
      });
      let num = 0;
      for (let i = 0; i < data.length / 2; i++) {
        navTitle[i].list = data[i * 2 + 1].contents;
        let long =
          navTitle[i].list.length % 2 == 0
            ? navTitle[i].list.length
            : navTitle[i].list.length + 1;
        num += (long / 2) * 100;
        this.pageWidthArr.push(num);
      }
      this.stationNav = navTitle;
    },
    getPageIndex() {
      for (let i = 0; i < this.pageWidthArr.length; i++) {
        if (this.pageWidthArr[i] > this.$refs.nav.scrollLeft + 100) {
          this.highLightIndex = i;
          break;
        }
      }
    },
    getRecommandData(data) {
      // console.log(dat);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        if (i % 2 != 0) {
          arr[(i - 1) / 2].data = data[i].contents;
        } else {
          arr.push(data[i]);
        }
      }
      this.stationRecommend = arr;
    },
    moveTo(index) {
      if (index > 0) {
        this.$refs.nav.scrollLeft = this.pageWidthArr[index - 1];
      } else {
        this.$refs.nav.scrollLeft = 0;
      }
    },
    turnToDetail(id) {
      this.$router.push({ path: "radio-detail", query: { radioId: id } });
    },
    backToHome() {
      this.$router.push({ path: "home" });
    },
    ...mapActions(["playList"]),
  },
  beforeDestroy() {
    this.$refs.nav.removeEventListener("scroll", this.getPageIndex);
  },
};
</script>
<style lang="scss">
.music-station {
  padding: 40px 0 60px 0;
  header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    z-index: 10;
    // border-bottom: 1px solid #999;
    .title {
      font-size: 16px;
      line-height: 50px;
      margin-left: 35px;
    }
    .search {
      position: absolute;
      top: 0px;
      right: 20px;
      line-height: 50px;
    }
    .search-input {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 10px;
      right: 50px;
      height: 30px;
      transition: width 0.3s ease;
      border: 1px solid #ccc;
      border-radius: 999px;
      padding: 5px;
      input {
        width: 90%;
        // height: 100%;
        border: none;
        outline: none;
        font-size: 12px;
      }
      input::placeholder {
        font-size: 12px;
      }
    }
  }
  .back {
    position: absolute;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
}
.special-radio {
  position: relative;
  width: 90vw;
  height: 20vh;
  background: rgb(88, 86, 108);
  background: linear-gradient(
    0deg,
    rgba(88, 86, 108, 1) 0%,
    rgba(125, 98, 105, 1) 100%
  );
  margin: 20px auto;
  border-radius: 10px;
  .radio-button-s {
    position: absolute;
    top: 20px;
    left: 30px;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 999px;
    box-shadow: 0 0 10px 1px rgb(88, 86, 108);
  }
  .radio-gab-s {
    position: absolute;
    top: 12px;
    right: 25px;
    width: 75%;
    height: 25px;
    background: url("@/assets/Dot.svg");
  }
  .radio-station-s {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    width: 95%;
    height: 65%;
    margin: 0 auto;
    color: #fff;
    // text-align: center;
    .private-station {
      width: 49%;
      height: 100%;
      background-color: rgba(228, 228, 228, 0.1);
      border-radius: 5px;
      padding: 20px 0 0 10px;
    }
    .other-station {
      width: 49%;
      height: 100%;
      // background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .other-station-r {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 47%;
      background-color: rgba(228, 228, 228, 0.1);
      border-radius: 5px;
      .sp-title {
        padding: 0 0 0 8px;
        font-size: 17px;
        font-weight: bold;
      }
      .sp-desc {
        font-size: 12px;
        opacity: 0.6;
        margin-top: 5px;
        transform: scale(0.9);
      }
    }
    .sp-title {
      font-size: 20px;
      font-weight: bold;
    }
    .sp-desc {
      font-size: 12px;
      opacity: 0.6;
      margin-top: 8px;
    }
  }
}
.content-title {
  font-size: 18px;
  font-weight: 600;
  padding: 0 20px;
}
.time-recommend {
  width: 100vw;
  padding: 0 10px;
  overflow: auto;
  margin-top: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  .contents {
    display: flex;
    flex-shrink: 0;
    margin-top: 10px;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      width: 80px;
      margin-right: 10px;
      // overflow: hidden;
      img {
        display: block;
        width: 100%;
        border-radius: 999px;
      }
      .content-name {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 14px;
        margin-top: 10px;
      }
    }
    .content-cover {
      position: relative;
      width: 70px;
      height: 70px;
    }
    .content-cover-mask {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(24, 24, 24, 0.2);
      border-radius: 999px;
    }
    .content-cover-mask::after {
      content: "";
      display: block;
      width: 15px;
      height: 15px;
      background-image: url("@/assets/PlayCircle.svg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .content:last-child {
      width: 90px;
      padding-right: 10px;
    }
  }
}
.station-navs {
  margin-top: 10px;
  width: 100vw;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.title-navs {
  display: flex;
  justify-content: space-around;
  // margin-top: 20px;
  margin-top: 40px;

  .station-nav-title {
    // width: 60px;
    height: 20px;
    font-size: 14px;
    // line-height: 30px;
    text-align: center;
    color: #999;
    // flex-shrink: 0;
    // margin-right: 20px;
  }
  .station-nav-title.active {
    position: relative;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      display: block;
      width: 18px;
      height: 3px;
      background-color: red;
      border-radius: 999px;
      margin: 0 auto;
    }
  }
}
.station-items {
  display: flex;
  padding: 10px;
  .station-item-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    flex-shrink: 0;
    height: 240px;
    // border-left: 1px solid rgba(153, 153, 153, 0.2);
    .station-item {
      flex-shrink: 0;
      width: 80px;
      height: 100px;
      margin-bottom: 20px;
      img {
        display: block;
        width: 100%;
        border-radius: 10px;
      }
    }
    .station-cover {
      position: relative;
    }
    .station-mask {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
    .station-mask::after {
      content: "";
      display: block;
      position: absolute;
      width: 15px;
      height: 15px;
      background-image: url("@/assets/PlayCircle.svg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .station-name {
      margin-top: 8px;
      text-align: center;
      font-size: 12px;
    }
  }
  .station-item-page:first-child {
    border-left: none;
  }
}
.station-recommend {
  margin-top: 20px;
  .station-recommend-title {
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .station-img {
    position: relative;
    width: 80px;
    flex-shrink: 0;
    img {
      display: block;
      width: 100%;
      border-radius: 10px;
    }
    .station-mask {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
    .station-mask::after {
      content: "";
      display: block;
      position: absolute;
      width: 15px;
      height: 15px;
      background-image: url("@/assets/PlayCircle.svg");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .station-recommend-item {
    display: flex;
    padding: 10px 15px;
    .station-info {
      margin-left: 10px;
      padding-right: 40px;
      overflow: hidden;
      color: #999;
    }
    .station-info-name {
      font-size: 16px;
      padding-top: 10px;
      color: #000;
    }
    .station-info-from {
      font-size: 14px;
      padding-top: 8px;
    }
    .station-info-desc {
      // width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      padding-top: 10px;
    }
  }
}
</style>