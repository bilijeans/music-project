<template>
  <div class="search">
    <div class="search-head">
      <i class="wd-icon-thin-arrow-left" @click="goBack()"></i>
      <div class="search-input">
        <!-- <i class="wd-icon-search"></i> -->
        <input
          @keydown.enter="goSearchResult"
          type="search"
          :placeholder="searchDiscover ? searchDiscover[0].word : ''"
          maxlength="25"
          v-model="lenovoAndResultText"
        />
      </div>
      <svg
        @click="goSearchResult"
        t="1666577477754"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="12700"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="16"
        height="16"
      >
        <path
          d="M906.666667 170.666667a32 32 0 0 1 32 32v277.333333A160 160 0 0 1 778.666667 640H195.669333l158.72 158.72a32 32 0 0 1 3.072 41.642667l-3.114666 3.584a32 32 0 0 1-41.642667 3.114666l-3.584-3.114666-213.333333-213.333334a32 32 0 0 1-3.114667-41.642666l3.114667-3.584 213.333333-213.333334a32 32 0 0 1 48.341333 41.642667l-3.114666 3.584-158.72 158.72H778.666667a96 96 0 0 0 95.786666-89.429333l0.213334-6.570667v-277.333333a32 32 0 0 1 32-32z"
          fill="#5C5C66"
          p-id="12701"
        ></path>
      </svg>
      <!-- <svg
        @click="goSearchRuseltView"
          t="1666576865135"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3101"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="16"
          height="16"
        >
          <path
            d="M917.333333 256a21.333333 21.333333 0 0 0-21.333333 21.333333v224a10.666667 10.666667 0 0 1-10.666667 10.666667H158.166667l134.253333-134.246667a21.333333 21.333333 0 0 0-30.173333-30.173333l-170.666667 170.666667a21.333333 21.333333 0 0 0 0 30.173333l170.666667 170.666667a21.333333 21.333333 0 1 0 30.173333-30.173334L158.166667 554.666667H885.333333a53.393333 53.393333 0 0 0 53.333334-53.333334V277.333333a21.333333 21.333333 0 0 0-21.333334-21.333333z"
            fill="#5C5C66"
            p-id="3102"
          ></path>
        </svg> -->
    </div>
    <div class="search-history" v-if="searchHistoryData[0]">
      <div class="search-history-head">
        <span>搜索历史</span>
        <i class="wd-icon-delete-thin" @click="popChooseDel"></i>
        <wd-popup
          class="popup"
          v-model="show"
          position="bottom"
          :style="{ fontSize: '14px', padding: '30px 20px' }"
        >
          <div>确定清空全部历史记录？</div>
          <div
            class="choose-delete"
            style="display: flex; margin: 10px 0 0 160px"
          >
            <div
              @click="clearSearchResult"
              style="padding: 10px 20px; color: red"
            >
              是
            </div>
            <div @click="show = false" style="padding: 10px 20px">我再想想</div>
          </div>
        </wd-popup>
      </div>
      <div class="search-history-content">
        <span v-for="(i, index) in searchHistoryData" :key="index">{{
          i
        }}</span>
      </div>
    </div>
    <div class="search-found">
      <p>搜索发现</p>
      <div class="search-found-contents">
        <div class="search-found-content" v-if="searchDiscover">
          <span v-for="(i, index) in searchDiscover" :key="index">{{
            i.word
          }}</span>
        </div>
        <!-- <div class="search-found-content2"></div> -->
      </div>
    </div>
    <div class="search-quickEntryList">
      <div class="quickEntryList">
        <div v-for="i in searchQuickEntryList" :key="i.pageId">
          <img :src="i.icon" />
        </div>
      </div>
    </div>
    <div class="search-kind" v-if="searchHotwords">
      <div class="kind">
        <div class="search-hotwordList">
          <div class="title">{{ searchHotwords[0].type }}</div>
          <div
            class="songs-list"
            v-for="(i, index) in searchHotwords[0].hotwordList"
            :key="i.id"
          >
            <span class="num">{{ index + 1 }}</span>
            <span>{{ i.word }}</span>
          </div>
        </div>
        <div class="search-hotwordList">
          <div class="title">{{ searchHotwords[1].type }}</div>
          <div
            class="songs-list"
            v-for="(i, index) in searchHotwords[1].hotwordList"
            :key="i.id"
          >
            <span class="num">{{ index + 1 }}</span>
            <span class="name">{{ i.word }}</span>
          </div>
        </div>
        <!-- <div class="search-vedio">
            <div class="title">{{ searchHotwords[2].type }}</div>
            <div
              class="songs-list"
              v-for="(i, index) in searchHotwords[2].hotwordList"
              :key="i.id"
            >
              <div class="songs-img">
                <img src="" />
                <span class="num">{{ index + 1 }}</span>
                <div>
                  <svg></svg>
                  <span>1111111</span>
                </div>
              </div>
              <span>{{ i.word }}</span>
            </div>
          </div> -->
      </div>
    </div>
    <div class="search-lenovo" v-show="lenovoAndResultText">
      <div class="search-active">
        搜索"
        <span>{{ lenovoAndResultText }}</span>
        "
      </div>
      <div class="lenovo">
        <div
          class="lenovo-item"
          v-for="(item, index) in searchLenovoData"
          :key="index"
        >
          <i class="wd-icon-search"></i>
          <span
            v-for="(i, indexSec) in item"
            :key="indexSec"
            :class="{ lenovo_active: i.highLight }"
            >{{ i.word }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      searchData: [],
      searchDiscover: null,
      searchQuickEntryList: [],
      searchHotwords: null,
      lenovoPageSize: 10,
      lenovoAndResultText: "",
      resultPageNo: 1,
      resultPageSize: 10,
      lenovoData: [],
      searchLenovoData: [],
      searchHistoryData: null,
      show: false,
    };
  },
  computed: {
    lenovoUrl() {
      return `https://apis.netstart.cn/music/search/suggest?keywords=${this.lenovoAndResultText}&type=mobile&limit=10`;
    },
  },
  created() {
    this.getSearchDetail();
    this.getSearchLenovo = debounce(this.getSearchLenovo, 1500);
    this.searchHistoryData =
      JSON.parse(localStorage.getItem("search_history")) || [];
  },
  watch: {
    lenovoUrl() {
      if (this.lenovoAndResultText.trim()) {
        this.getSearchLenovo();
      } else {
        this.lenovoData = [];
      }
    },
  },
  methods: {
    getSearchDetail() {
      this.$axios({
        method: "GET",
        url: `/music_search/v4/search/hotword`,
        headers: {
          msisdn: "MTc3MjcwMDc3MjE==",
        },
      }).then(({ data }) => {
        this.searchData = data.data;
        // console.log(this.searchData);
        this.searchDiscover = this.searchData.discovery;
        this.searchQuickEntryList = this.searchData.quickEntryList;
        this.searchHotwords = this.searchData.hotwords;
        // console.log(this.searchHotwords);
      });
    },
    getSearchLenovo() {
      this.$axios.get(this.lenovoUrl).then(({ data }) => {
        this.lenovoData = data.result?.allMatch;
        // console.log(this.lenovoData);
        if (this.lenovoData) {
          this.dealWithLenovoData(this.lenovoData);
        } else {
          this.searchLenovoData = [];
        }
      });
    },
    dealWithLenovoData(data) {
      let arr = [];
      data.forEach((e) => {
        arr.push(this.dealWithWord(this.lenovoAndResultText, e.keyword));
      });
      this.searchLenovoData = arr;
      // console.log(this.searchLenovoData);
    },
    dealWithWord(key, str) {
      let arr = [];
      let num = str.indexOf(key);
      if (num != -1) {
        let preStr = str.slice(0, num);
        if (preStr) {
          arr.push({
            word: preStr,
            highLight: false,
          });
        }
        str = str.slice(num + 1);
        arr.push({
          word: key,
          highLight: true,
        });
        if (str.indexOf(key) != -1) {
          arr = [...arr, ...this.dealWithWord(key, str)];
        } else {
          if (str) {
            arr.push({
              word: str,
              highLight: false,
            });
          }
        }
      }
      return arr;
    },
    goSearchResult() {
      this.searchHistoryData.unshift(this.lenovoAndResultText);
      // console.log(this.searchHistoryData);
      this.$router.push({ path: "/search-result" });
    },
    popChooseDel() {
      this.show = true;
    },
    clearSearchResult() {
      this.searchHistoryData = [];
      localStorage.setItem(
        "search_history",
        JSON.stringify(this.searchHistoryData)
      );
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  beforeDestroy() {
    localStorage.setItem(
      "search_history",
      JSON.stringify(this.searchHistoryData)
    );
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
.search-head {
  padding: 8px 0;
  display: flex;
  align-items: center;
  .wd-icon-thin-arrow-left {
    padding: 0 10px;
    font-size: 14px;
  }
  .search-input {
    padding: 5px 25px 5px 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
    border-bottom: 2px solid #ccc;
    // .wd-icon-search {
    //   color: #999;
    // }
    input {
      width: 260px;
      outline: none;
      border: none;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin: 0 0 0 15px;
  }
  span {
    font-size: 16px;
    font-weight: 600;
  }
}
.search-history {
  padding: 10px 15px;
  .search-history-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 13px;
      font-weight: 600;
    }
  }
  .search-history-content {
    // display: flex;
    // align-items: center;
    // flex-wrap: wrap;
    span {
      float: left;
      display: block;
      font-size: 12px;
      margin: 10px 10px 0 0;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #f4f4f4;
      // transform: scale(0.9);
      // transform-origin: 10%;
    }
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
}
.search-found {
  padding: 10px 15px;
  p {
    font-size: 13px;
    font-weight: 600;
  }
  .search-found-contents {
    width: 95vw;
    overflow: auto;
    .search-found-content {
      display: flex;
      span {
        display: block;
        white-space: nowrap;
        font-size: 12px;
        margin: 10px 10px 0 0;
        padding: 10px 20px;
        background-color: #f4f4f4;
        border-radius: 20px;
        // transform: scale(0.9);
      }
    }
    &::-webkit-scrollbar {
      display: none;
      // width: 0;
      // height: 0;
    }
  }
}
.search-quickEntryList {
  width: 100vw;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .quickEntryList {
    width: 440px;
    margin: 10px 0 10px 15px;
    div {
      float: left;
      width: 100px;
      margin: 0 10px 0 0;
      img {
        width: 100%;
      }
    }
  }
}
.search-kind {
  margin: 0 0 30px 0;
  width: 100vw;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .kind {
    width: 500px;
    // width: 800px;
    margin: 15px 0 0 15px;
    display: flex;
  }
}
.search-hotwordList {
  width: 250px;
  margin: 0 15px 0 0;
  padding: 0 0 20px 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 1px dotted #ccc;
  border-bottom: 0;
  .title {
    font-size: 14px;
    font-weight: 600;
    padding: 20px 15px 10px 15px;
    border-radius: 6px;
    background-image: linear-gradient(#fcd7df, #fff);
  }
  .songs-list {
    font-size: 12px;
    padding: 10px 0;
    display: flex;
    span {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      display: block;
      width: 80%;
    }
    .num {
      width: 30px;
      text-align: center;
    }
  }
  .songs-list:nth-of-type(-n + 4) .num {
    color: #da4165;
  }
}
// .search-vedio {
//   width: 250px;
//   margin: 0 15px 0 0;
//   padding: 0 0 20px 0;
//   border-top-left-radius: 6px;
//   border-top-right-radius: 6px;
//   border: 1px dotted #ccc;
//   .title {
//     font-size: 14px;
//     font-weight: 600;
//     padding: 20px 15px 10px 15px;
//     border-radius: 6px;
//     background-image: linear-gradient(#fcd7df, #fff);
//   }
//   .songs-list {
//     display: flex;
//     .songs-img {
//       width: 150px;
//       height: 100px;
//       background-color: pink;
//       img {
//         width: 100%;
//       }
//     }
//     span {
//     }
//   }
// }
.search-lenovo {
  position: fixed;
  top: 55px;
  width: 100vw;
  height: calc(100vh - 45px - 40px);
  margin: 0 0 0 15px;
  background-color: #fff;
  .search-active {
    font-size: 14px;
    span {
      color: #da4165;
    }
  }
  .lenovo {
    .lenovo-item {
      display: flex;
      align-items: center;
      font-size: 13px;
      margin: 20px 0 0 0;
      span {
        margin: 0 0 0 4px;
      }
      .lenovo_active {
        color: #da4165;
      }
    }
  }
}
</style>