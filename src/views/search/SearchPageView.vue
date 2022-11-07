<template>
  <div class="search">
    <div class="search-head">
      <i class="wd-icon-thin-arrow-left" @click="goBackHome()"></i>
      <div class="search-input">
        <input
          @keydown.enter="goSearchResult(lenovoAndResultText)"
          type="search"
          :placeholder="searchDiscover ? searchDiscover[0].word : ''"
          maxlength="25"
          v-model="lenovoAndResultText"
        />
      </div>
      <svg
        @click="goSearchResult(lenovoAndResultText)"
        t="1666577477754"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="12700"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="20"
        height="20"
      >
        <path
          d="M906.666667 170.666667a32 32 0 0 1 32 32v277.333333A160 160 0 0 1 778.666667 640H195.669333l158.72 158.72a32 32 0 0 1 3.072 41.642667l-3.114666 3.584a32 32 0 0 1-41.642667 3.114666l-3.584-3.114666-213.333333-213.333334a32 32 0 0 1-3.114667-41.642666l3.114667-3.584 213.333333-213.333334a32 32 0 0 1 48.341333 41.642667l-3.114666 3.584-158.72 158.72H778.666667a96 96 0 0 0 95.786666-89.429333l0.213334-6.570667v-277.333333a32 32 0 0 1 32-32z"
          fill="#5C5C66"
          p-id="12701"
        ></path>
      </svg>
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
        <span
          @click="goSearchResult(i)"
          v-for="(i, index) in searchHistoryData"
          :key="index"
          >{{ i }}</span
        >
      </div>
    </div>
    <div class="search-found">
      <p>搜索发现</p>
      <div class="search-found-contents">
        <div class="search-found-content" v-if="searchDiscover">
          <span
            @click="goSearchResult(i.word)"
            v-for="(i, index) in searchDiscover"
            :key="index"
            >{{ i.word }}</span
          >
        </div>
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
            <span @click="goSearchResult(i.word)">{{ i.word }}</span>
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
            <span class="name" @click="goSearchResult(i.word)">{{
              i.word
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <search-lenovo-compontents
      :lenovoAndResultText="lenovoAndResultText"
    ></search-lenovo-compontents>
  </div>
</template>

<script>
import SearchLenovoCompontents from "@/components/SearchLenovoCompontents.vue";
export default {
  components: { SearchLenovoCompontents },
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
      searchHistoryData: null,
      show: false,
    };
  },
  created() {
    this.getSearchDetail();
    this.searchHistoryData =
      JSON.parse(localStorage.getItem("search_history")) || [];
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
    goSearchResult(str) {
      this.lenovoAndResultText = str;
      if (this.lenovoAndResultText == "") {
        this.lenovoAndResultText = this.searchDiscover[0].word;
      }
      this.searchHistoryData.unshift(this.lenovoAndResultText);

      // console.log(this.searchHistoryData);
      this.$router.push({
        path: "/search-result",
        query: { word: this.lenovoAndResultText },
      });
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
    goBackHome() {
      this.$router.push({
        path: "/home",
      });
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
    input {
      width: 260px;
      outline: none;
      border: none;
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
  }
  svg {
    margin: 0 0 0 15px;
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
      }
    }
    &::-webkit-scrollbar {
      display: none;
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
    &::after {
      display: block;
      content: "";
      clear: both;
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
</style>