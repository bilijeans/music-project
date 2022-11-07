<template>
  <div class="rank">
    <div class="rank-head">
      <i class="wd-icon-arrow-left" @click="back()"></i>
      <div>排行榜</div>
    </div>
    <div class="rank-scream">
      <span>咪咕尖叫榜</span>
      <span class="hourupdate">每小时更新</span>
    </div>
    <div
      class="screams"
      @click="toScreamsList(i.screamsId)"
      v-for="i in screamsList[screamsTitle]"
      :key="i.screamsId"
    >
      <div class="scream-item">
        <div class="scream-title">
          <div class="scream-title-head">
            {{ i.screamsName }}
          </div>
          <div
            class="scream-song"
            v-for="(n, index) in i.songList"
            :key="index"
          >
            <div class="song-name">{{ index + 1 }}</div>
            <span>{{ n.name }}</span>
          </div>
        </div>
        <div class="scream-img">
          <img :src="i.screamsImg" />
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
              d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="rank-characteristic">咪咕特色榜</div>
    <div class="characteristics">
      <div
        class="characteristics-item"
        @click="
          toCharacteristicsList(
            i.displayLogId.param.rankId,
            i.displayLogId.param.rankName
          )
        "
        v-for="i in characteristicsList"
        :key="i.displayLogId.param.rankId"
      >
        <img :src="i.imageUrl" />
        <div class="characteristicsList-updatetime">
          <span>{{ i.barList[0].title }}</span>
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
              d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
            />
          </svg>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screamsTitle: "",
      characteristicsTitle: "",
      screamsList: {},
      characteristicsList: {},
    };
  },
  computed: {
    url() {
      return `https://app.c.nf.migu.cn/MIGUM3.0/v1.0/template/rank-list/release`;
    },
  },
  created() {
    this.getRankData();
  },
  methods: {
    getRankData() {
      this.$axios.get(this.url).then(({ data }) => {
        // console.log(data.data);
        this.dealwithScreamsData(data.data.contentItemList[1].itemList);
        this.dealwithCharacteristicsData(data.data.contentItemList[3].itemList);
      });
    },
    dealwithScreamsData(data) {
      let groupTitle = data[0].title;
      this.screamsTitle = groupTitle;
      data = data.slice(2);
      let newObj = {};
      newObj[groupTitle] = [];
      data = data.filter((e) => {
        return e.template == "row1";
      });
      // console.log(data);
      data.forEach((e) => {
        newObj[groupTitle].push({
          screamsName: e.displayLogId.param.rankName,
          screamsId: e.displayLogId.param.rankId,
          screamsImg: e.imageUrl,
          songList: [
            {
              name: e.title.slice(2, e.title.indexOf("<")),
            },
            {
              name: e.subTitle.slice(2, e.subTitle.indexOf("<")),
            },
            {
              name: e.subTitle1.slice(2, e.subTitle1.indexOf("<")),
            },
          ],
        });
      });
      this.screamsList = newObj;
      // console.log(this.screamsList);
    },
    dealwithCharacteristicsData(data) {
      // this.characteristicsTitle = groupTitle;
      data = data.filter((e) => {
        return e.template == "grid1";
      });
      this.characteristicsList = data;
      // console.log(this.characteristicsList);
    },
    toScreamsList(id) {
      this.$router.push({ path: "/rankScreams", query: { id: id } });
    },
    toCharacteristicsList(id, name) {
      if (
        name == "来电新声榜" ||
        name == "来电唱作榜" ||
        name == "MV榜" ||
        name == "新专辑榜"
      ) {
        this.$router.push({
          path: "/characteristics-group",
          query: { name: name },
        });
      } else {
        this.$router.push({ path: "/rankCharacteristics", query: { id: id } });
      }
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.rank {
  padding: 0 0 60px 0;
}
.rank-head {
  position: relative;
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
.rank-scream {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
    display: block;
    padding: 30px 0 20px;
  }
  .hourupdate {
    font-size: 12px;
  }
}
.screams {
  width: 95%;
  margin: 0 auto 10px;
  border-radius: 6px;
  background: linear-gradient(90deg, #eaeaec, #fff);
  .scream-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .scream-title {
      .scream-title-head {
        font-weight: bold;
        font-style: italic;
      }
      .scream-song {
        width: 230px;
        padding: 13px 0 0;
        font-size: 12px;
        display: flex;
        align-items: center;
        div {
          padding: 0 5px 0 0;
        }
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .scream-song:nth-child(2) div {
        font-size: 18px;
        font-weight: bold;
        font-style: italic;
      }
    }
    .scream-img {
      position: relative;
      width: 95px;
      img {
        width: 100%;
        border-radius: 10px;
      }
      svg {
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 8px;
        right: 8px;
      }
    }
  }
}
.rank-characteristic {
  width: 95%;
  margin: 0 auto;
  font-size: 14px;
  padding: 30px 0 20px;
}
.characteristics {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .characteristics-item {
    position: relative;
    width: 31%;
    margin: 5px 0 0 0;
    &:last-child {
      margin-right: auto;
      margin-left: calc(7% / 2);
    }
    img {
      width: 100%;
      border-radius: 10px;
    }
    .characteristicsList-updatetime {
      width: 90%;
      position: absolute;
      bottom: 10px;
      left: 5px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      color: #fff;
      span {
        display: block;
      }
      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>