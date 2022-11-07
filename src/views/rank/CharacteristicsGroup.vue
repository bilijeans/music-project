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
        <div class="mv-item" v-for="i in mvList" :key="i.copyrightId">
          <img :src="i.imgItems[0].img" />
        </div>
      </div>
    </div>
    <div v-if="name == '新专辑榜'" class="new-ablum">
      <div class="head">
        <i class="wd-icon-arrow-left" @click="back()"></i>
        <div>{{ name }}</div>
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
    };
  },
  computed: {
    characteristicsGroupUrl() {
      return `/bmw/popularity-week-rank/h5/v1.0?week=${this.week}&type=${this.type}&pageNo=${this.pageNo}`;
    },
    mvUrl() {
      return `/MIGUM3.0/v1.0/template/GetMvBillboardByColumnId?count=20&needAll=-1&start=1&templateVersion=3`;
    },
  },
  watch: {},
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
        console.log(this.mvList);
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
    margin: 0 auto;
    font-size: 14px;
  }
}
</style>