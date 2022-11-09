<template>
  <div class="characteristic-group">
    <div v-if="name == '来电新声榜' || name == '来电唱作榜'" class="new-voices">
      <div class="head">
        <i class="wd-icon-arrow-left" @click="back()"></i>
        <div>{{ name }}</div>
      </div>
      <div v-if="name == '来电新声榜'" class="title-new-voices"></div>
      <div v-if="name == '来电唱作榜'" class="title-sing-compose"></div>
      <div class="week-list">周榜</div>
      <div class="update-time">
        每10分钟刷新，每周一上午10点清算数据更新排名
      </div>
      <div class="list-one">
        <div class="one-img">
          <img :src="contentData[0]?.img" />
        </div>
        <div class="song-msg">
          <div class="msg-img">
            <img src="@/assets/crown.png" />
          </div>
          <div class="msg-name">{{ contentData[0]?.txt }}</div>
          <div class="msg-rank">
            <span>1</span>
            <svg
              t="1667817552947"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2561"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="16"
              height="16"
            >
              <path
                d="M128 469.333333a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 42.666666a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 42.666666a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z"
                fill="#fff"
                p-id="2562"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="list-two-three">
        <div class="list-line"></div>
        <div class="list-two">
          <div class="song-img">
            <img :src="contentData[1]?.img" />
            <span>2</span>
          </div>
          <div class="song-msg">
            <span>{{ contentData[1]?.txt }}</span>
            <svg
              t="1667817552947"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2561"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="16"
              height="16"
            >
              <path
                d="M128 469.333333a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 42.666666a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 42.666666a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z"
                fill="#fff"
                p-id="2562"
              ></path>
            </svg>
          </div>
        </div>
        <div class="list-three">
          <div class="song-img">
            <img :src="contentData[2]?.img" />
            <span>3</span>
          </div>
          <div class="song-msg">
            <span>{{ contentData[2]?.txt }}</span>
            <svg
              t="1667817552947"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2561"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="16"
              height="16"
            >
              <path
                d="M128 469.333333a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 42.666666a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 42.666666a42.666667 42.666667 0 1 1-42.666667 42.666667 42.713333 42.713333 0 0 1 42.666667-42.666667m0-42.666666a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z"
                fill="#fff"
                p-id="2562"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="lists">
        <div class="list-item" v-for="(i, index) in contents" :key="i.resId">
          <span>{{ index + 4 }}</span>
          <div class="item-img">
            <img :src="i?.img" />
          </div>
          <div class="item-msg">
            <div class="item-msg-song">{{ i.txt }}</div>
            <div class="item-msg-singer">{{ i.txt2 }}</div>
          </div>
          <span>></span>
        </div>
      </div>
    </div>
    <div v-if="name == 'MV榜'" class="music-video">
      <div class="head" style="background: #fff; color: black">
        <i class="wd-icon-arrow-left" @click="back()"></i>
        <div>{{ name }}</div>
      </div>
      <div class="mv-updata-time">
        更新时间：{{ mvData?.topBar?.updateTime }}
      </div>
      <div class="mv-list">
        <div class="mv-item" v-for="(i, index) in mvList" :key="i.copyrightId">
          <img :src="i.imgItems[0].img" />
          <span>{{ index + 1 }}</span>
          <div class="mv-item-title">
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
            <div>{{ i.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="name == '新专辑榜'" class="new-ablum">
      <div class="head">
        <i class="wd-icon-arrow-left" @click="back()"></i>
        <div>{{ name }}</div>
      </div>
      <div class="new-ablum-bg">
        <img :src="newAblumData?.header?.style?.backgroundImageUrl" />
        <img class="new-ablum-titlebg" src="@/assets/NewAblumBg.gif" />
        <div class="new-ablum-update">
          <span>{{ newAblumData?.topBar?.updateTime }} 更新</span>
          <span>{{ newAblumData?.topBar?.updateCycle }}</span>
        </div>
      </div>
      <div class="new-ablum-list">
        <div
          class="new-ablum-item"
          v-for="(i, index) in newAblumList"
          :key="i.contentId"
        >
          <span>{{ index + 1 }}</span>
          <div class="new-item-img">
            <img :src="i.imageUrl" />
            <img class="new-item-bg" src="@/assets/Album.png" />
          </div>
          <div class="new-item-msg">
            <div class="new-item-name">{{ i.title }}</div>
            <div class="new-item-singer">{{ i.subTitle }}</div>
          </div>
          <i class="wd-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      week: 0,
      type: 101,
      pageNo: 1,
      name: "",
      contentData: [],
      contents: [],
      mvData: [],
      mvList: [],
      newAblumData: [],
      newAblumList: [],
    };
  },
  computed: {
    characteristicsGroupUrl() {
      return `/bmw/popularity-week-rank/h5/v1.0?week=${this.week}&type=${this.type}&pageNo=${this.pageNo}`;
    },
    mvUrl() {
      return `/MIGUM3.0/v1.0/template/GetMvBillboardByColumnId?count=20&needAll=-1&start=1&templateVersion=3`;
    },
    newAblumUrl() {
      return `/MIGUM3.0/v1.0/template/GetNewAlbumBillboardByColumnId?count=5&needAll=1&start=1`;
    },
  },
  // watch: {},
  created() {
    this.contentData = [];
    this.contents = [];
    this.name = this.$route.query.name;
    if (this.name == "来电新声榜") {
      this.type = "101";
      this.getCharacteristicsGroupData();
    } else if (this.name == "来电唱作榜") {
      this.type = "102";
      this.getCharacteristicsGroupData();
    } else if (this.name == "MV榜") {
      this.getMvData();
    } else {
      this.getNewAblumData();
    }
  },
  methods: {
    getCharacteristicsGroupData() {
      this.$axios.get(this.characteristicsGroupUrl).then(({ data }) => {
        this.contentData = data.data.contents;
        this.contents = this.contentData.slice(3);
        // console.log(this.contents);
      });
    },
    getMvData() {
      this.$axios.get(this.mvUrl).then(({ data }) => {
        this.mvData = data.data;
        this.mvList = this.mvData.contentItemList[3]?.itemList;
        // console.log(this.mvList);
      });
    },
    getNewAblumData() {
      this.$axios.get(this.newAblumUrl).then(({ data }) => {
        // console.log(data.data);
        this.newAblumData = data.data;
        // newAblumData.header.style.backgroundImageUrl;
        this.newAblumList = this.newAblumData.contentItemList[0].itemList;
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  color: #fff;
  position: relative;
  top: 0;
  width: 100vw;
  i {
    position: absolute;
    top: 14px;
    left: 12px;
    font-size: 20px;
  }
  div {
    margin: 0 0 0 35px;
    padding: 15px;
    font-size: 16px;
  }
}
.new-voices {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/characteristics101.png);
  background-size: cover;
  background-position: center center;
  overflow: auto;
  .title-new-voices {
    width: 300px;
    height: 75px;
    margin: 50px auto;
    background-image: url(@/assets/characteristics-title101.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
  .title-sing-compose {
    width: 300px;
    height: 75px;
    margin: 50px auto;
    background-image: url(@/assets/characteristics-title102.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
  .week-list {
    width: 40px;
    height: 30px;
    margin: 0 auto;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: #fff;
    &::after {
      content: "";
      display: block;
      width: 20px;
      height: 5px;
      margin: 0 auto;
      border-radius: 6px;
      background-color: #cd29f9;
    }
  }
  .update-time {
    position: relative;
    width: 300px;
    height: 20px;
    margin: 20px auto;
    font-size: 13px;
    text-align: center;
    color: #9f9dab;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: 50%;
      left: -8px;
      width: 10px;
      height: 3px;
      margin-top: -5px;
      background: linear-gradient(
        270deg,
        hsla(0, 0%, 100%, 0.65),
        hsla(0, 0%, 100%, 0)
      );
    }
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 50%;
      right: -8px;
      width: 10px;
      height: 3px;
      margin-top: -5px;
      background: linear-gradient(
        270deg,
        hsla(0, 0%, 100%, 0),
        hsla(0, 0%, 100%, 0.65)
      );
    }
  }
  .list-one {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    background-color: #272731;
    background-image: url(@/assets/list-one-bg.png);
    background-size: cover;
    .one-img {
      img {
        display: block;
        width: 40vw;
      }
    }
    .song-msg {
      width: 50vw;
      display: flex;
      flex-direction: column;
      .msg-img {
        margin: 0 0 0 10px;
        padding: 10px;
        img {
          display: block;
          width: 8vw;
        }
      }
      .msg-name {
        margin: 0 0 0 10px;
        padding: 10px;
        color: #fff;
        font-size: 22px;
        font-weight: bold;
      }
      .msg-rank {
        margin: 20px 0 0 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 28px;
          font-weight: bold;
          color: #e4c4b8;
        }
      }
    }
  }
  .list-two-three {
    position: relative;
    width: 90vw;
    margin: 20px auto;
    display: flex;
    background: linear-gradient(#272731, #27273100);
    .list-line {
      position: absolute;
      left: 0;
      right: 0;
      top: 20%;
      width: 1.5px;
      height: 60%;
      margin: 0 auto;
      background: linear-gradient(
        hsla(0, 0%, 100%, 0),
        hsla(0, 0%, 100%, 0.4),
        hsla(0, 0%, 100%, 0)
      );
    }
    .list-two,
    .list-three {
      width: 50%;
      padding: 20px;
      .song-img {
        display: flex;
        img {
          display: block;
          width: 25vw;
        }
        span {
          margin: 0 0 0 10px;
          font-size: 28px;
          font-weight: bold;
          color: #fff;
        }
      }
      .song-msg {
        padding: 15px 20px 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 18px;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
  .lists {
    width: 90vw;
    margin: 0 auto;
    padding: 0 0 55px 0;
    background: linear-gradient(#272731, #27273100);
    .list-item {
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 6%;
        text-align: center;
        color: #9f9dab;
      }
      .item-img {
        padding: 0 10px;
        img {
          display: block;
          width: 16vw;
        }
      }
      .item-msg {
        width: 62%;
        display: flex;
        flex-direction: column;
        .item-msg-song {
          padding: 2px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-msg-singer {
          font-size: 13px;
          padding: 2px;
          color: #9f9dab;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.music-video {
  .mv-updata-time {
    width: 90%;
    margin: 10px auto;
    font-size: 14px;
  }
  .mv-list {
    width: 90%;
    margin: 10px auto;
    padding: 0 0 40px 0;
    .mv-item {
      position: relative;
      margin: 0 0 15px 0;
      img {
        display: block;
        width: 90vw;
        border-radius: 6px;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-top-left-radius: 6px;
        border-bottom-right-radius: 6px;
        color: #fff;
        background-color: #6f6e76;
      }
      .mv-item-title {
        position: absolute;
        bottom: 6px;
        left: 10px;
        width: 95%;
        height: 20px;
        display: flex;
        align-items: center;
        color: #fff;
        z-index: 1;
        div {
          width: 90%;
          margin: 0 0 0 3px;
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        display: block;
        width: 100%;
        height: 200px;
        border-radius: 6px;
        background: rgb(0, 0, 0);
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(125, 98, 98, 0) 25%
        );
      }
    }
    .mv-item:nth-child(-n + 3) span {
      font-weight: bold;
      background-color: #df9d7b;
    }
  }
}
.new-ablum {
  .head {
    position: fixed;
    top: 0;
  }
  .new-ablum-bg {
    position: fixed;
    top: 0;
    z-index: -1;
    img {
      display: block;
      width: 100vw;
    }
    .new-ablum-titlebg {
      position: absolute;
      top: 45px;
      left: 0;
      width: 115vw;
      z-index: 1;
    }
    .new-ablum-update {
      position: absolute;
      bottom: 140px;
      right: 10px;
      width: 90px;
      height: 28px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 12px;
        color: #fff;
      }
    }
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vw;
      background-color: rgba(51, 51, 51, 0.5);
    }
  }
  .new-ablum-list {
    position: sticky;
    top: 100px;
    width: 100%;
    height: calc(100vh - 46px);
    overflow: auto;
    margin: 260px 0 0 0;
    padding: 20px 0 55px 0;
    border-top-left-radius: 20px;
    background-color: #fff;
    .new-ablum-item {
      padding: 6px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: block;
        width: 6%;
        color: #98989a;
      }
      .new-item-img {
        position: relative;
        width: 20vw;
        margin: 0 10px 0 0;
        img {
          position: relative;
          display: block;
          width: 20vw;
          border-radius: 6px;
          z-index: 2;
        }
        .new-item-bg {
          position: absolute;
          top: 0;
          right: -13px;
          z-index: 1;
        }
      }
      .new-item-msg {
        width: 60%;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .new-item-name {
          font-size: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .new-item-singer {
          font-size: 12px;
          color: #98989a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .new-ablum-item:nth-child(-n + 3) span {
      color: #e74263;
    }
  }
}
</style>