<template>
  <div>
    <header>
      <div class="search-head">
        <i class="wd-icon-thin-arrow-left" @click="goBack()"></i>
        <div class="search">
          <i class="wd-icon-search"></i>
          <input
            type="search"
            :placeholder="searchDiscover ? searchDiscover[0].word : ''"
            maxlength="25"
            v-model="lenovoAndResultText"
          />
        </div>
      </div>
      <div class="search-history">
        <div class="search-history-head">
          <span>搜索历史</span>
          <wd-icon name="delete-thin" color="#999"></wd-icon>
        </div>
        <div class="search-history-content">
          <span>周杰伦</span>
          <span>周杰</span>
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
              <span>{{ i.word }}</span>
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
      <div class="search-lenovo">
        <div class="lenovo"></div>
      </div>
    </header>
  </div>
</template>


<script>
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
    };
  },
  computed: {
    lenovoUrl() {
      return `/music_search/v2/suggest?pageSize=${this.lenovoPageSize}&text=${this.lenovoText}`;
    },
  },
  created() {
    this.getSearchDetail();
  },
  watch: {
    lenovoUrl() {
      this.getSearchLenovo();
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
      this.$axios({
        methods: "GET",
        url: this.lenovoUrl,
        headers: {
          ms: "668351B94A56152D0CDAB0EF8838F970",
          sign: "35292efcb16c82bc246e3e35ff0dc380",
          uiversion: "A_music_3.12.3",
          timestamp: "1665307673609",
        },
      }).then(({ data }) => {
        console.log(data);
      });
    },
    getSearchResult() {},
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-head {
  padding: 8px 0;
  display: flex;
  align-items: center;
  .wd-icon-thin-arrow-left {
    padding: 0 10px;
    font-size: 14px;
  }
  .search {
    padding: 5px 20px 5px 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
    border-bottom: 2px solid #ccc;
    .wd-icon-search {
      color: #999;
    }
    input {
      width: 260px;
      outline: none;
      border: none;
    }
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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      display: inline-block;
      font-size: 12px;
      margin: 10px 6px 0 0;
      padding: 10px 20px;
      border-radius: 20px;
      background-color: #f4f4f4;
      transform: scale(0.9);
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
        display: inline-block;
        white-space: nowrap;
        font-size: 12px;
        margin: 10px 6px 0 0;
        padding: 10px 20px;
        background-color: #f4f4f4;
        border-radius: 20px;
        transform: scale(0.9);
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
    .num {
      width: 30px;
      text-align: center;
    }
  }
  .songs-list:nth-of-type(-n + 4) .num {
    color: #da4165;
  }
}
.search-vedio {
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
    display: flex;
    .songs-img {
      width: 150px;
      height: 100px;
      background-color: pink;
      img {
        width: 100%;
      }
    }
    span {
    }
  }
}
</style>