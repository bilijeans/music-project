<template>
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
</template>

<script>
import { debounce } from "lodash-es";
export default {
  props: {
    lenovoAndResultText: String,
  },
  data() {
    return {
      lenovoData: [],
      searchLenovoData: [],
    };
  },
  created() {
    this.getSearchLenovo = debounce(this.getSearchLenovo, 1500);
  },
  computed: {
    lenovoUrl() {
      return `https://apis.netstart.cn/music/search/suggest?keywords=${this.lenovoAndResultText}&type=mobile&limit=10`;
    },
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
    // 处理搜索高亮
    dealWithLenovoData(data) {
      let arr = [];
      data.forEach((e) => {
        e.keyword = e.keyword.replaceAll(" ", "");
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
        str = str.slice(num + key.length);
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
  },
};
</script>

<style lang="scss" scoped>
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

