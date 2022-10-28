<template>
  <div class="singerList">
    <header>
      <div class="singer-back" @click="goBack">
        <wd-icon name="thin-arrow-left" tag="div" size="10px"></wd-icon>
      </div>
      <span>歌手</span>
      <div class="singer-search" @click="goToSearch">
        <wd-icon name="search" tag="div" size="20px"></wd-icon>
      </div>
    </header>

    <nav>
      <wd-tabs class="nav-box" v-model="tab" animated @click="getlanguage">
        <wd-tab
          v-for="item in navContent.languages"
          :key="item.name"
          :title="`${item.name}`"
        ></wd-tab>
      </wd-tabs>

      <div class="nav-select">
        <span
          class="sex-or-team"
          v-for="item in navContent.sex"
          :key="item.value"
          :class="{ active: sex == item.value }"
          @click="getSex(item.value)"
          >{{ item.name }}</span
        >
      </div>
    </nav>

    <main>
      <div class="singerListContent">
        <div class="word-nav">
          <ul>
            <li
              v-for="item in singerList"
              :key="'nav' + item.keyword"
            >
              <a :href="'#' + item.keyword">{{ item.keyword }}</a>
            </li>
          </ul>
        </div>
        <div
          class="word-to-select"
          v-for="item in singerList"
          :id="item.keyword"
          :key="item.keyword"
        >
          <div class="word">{{ item.keyword }}</div>

          <div
            class="word-list"
            v-for="(i, index) in item.value"
            :key="item.keyword + index"
            @click="gotoSingerPage(i.resId, i.resType)"
          >
            <div class="word-list-left">
              <img :src="i.img" />
              <span>{{ i.txt }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      navContent: {
        languages: [
          { name: "华语", value: "huayu" },
          { name: "欧美", value: "oumei" },
          { name: "日韩", value: "rihan" },
        ],
        sex: [
          {
            name: "男",
            value: "nan",
          },
          {
            name: "女",
            value: "nv",
          },
          {
            name: "组合",
            value: "group",
          },
        ],
      },
      language: "huayu",
      sex: "nan",
      singerList: [],
    };
  },
  created() {
    if (sessionStorage.getItem("singerList")) {
      let h = JSON.parse(sessionStorage.getItem("singerList"));
      this.tab = h.tab;
      this.language = h.language;
      this.sex = h.sex;
      // console.log(this.sex);
      this.getData();
    } else {
      this.getData();
    }
  },
  methods: {
    getData() {
      this.$axios
        .get(
          `/MIGUM2.0/bmw/singer-index/list/v1.0?tab=${this.language}-${this.sex}`
        )
        .then(({ data }) => {
          this.dealwithData(data.data.contents);
          // console.log(this.singerList);
        });
    },
    dealwithData(data) {
      let title = "热";
      let newArr = [];
      let result = [];
      let arr = [];
      data.forEach((el, index) => {
        if (el.txt3 == title) {
          arr.push(el);
          if (index == data.length - 1) {
            result.push({
              keyword: title,
              value: arr,
            });
            newArr.push(arr);
            title = el.txt3;
            arr = [];
          }
        } else {
          result.push({
            keyword: title,
            value: arr,
          });
          newArr.push(arr);
          title = el.txt3;
          arr = [];
        }
      });
      this.singerList = result;
    },
    getlanguage(e) {
      if (e == 0) {
        this.language = "huayu";
      } else if (e == 1) {
        this.language = "oumei";
      } else {
        this.language = "rihan";
      }

      this.getData();
      let singerListLanguage = {
        tab: this.tab,
        language: this.language,
        sex: this.sex,
      };
      sessionStorage.setItem("singerList", JSON.stringify(singerListLanguage));
    },

    getSex(value) {
      this.sex = value;
      this.getData();
      let singerListLanguage = {
        tab: this.tab,
        language: this.language,
        sex: this.sex,
      };
      sessionStorage.setItem("singerList", JSON.stringify(singerListLanguage));
    },

    goBack() {
      this.$router.push({
        path: "/home",
      });
    },
    gotoSingerPage(id, type) {
      this.$router.push({
        name: "singerPage",
        params: {
          id,
          type,
        },
      });
    },
    goToSearch(){
      this.$router.push({path:'/search'})
    }
  },
};
</script>


<style lang="scss" scoped>
header {
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(235, 235, 235);

  .singer-back {
    font-weight: 550;
    font-size: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    transform: translateX(100%);
  }

  span {
    transform: translateX(-400%);
  }

  .singer-search {
    transform: translateX(-100%);
  }
}

nav {
  height: 14vh;
  width: 100vw;

  .nav-box {
    width: 100%;
    height: 6vh;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: -1px 5px 5px 0px rgb(242, 242, 242);
    margin-top: 10px;
    .wd-tabs__nav-item {
      color: red;

      &.is-active {
        font-weight: 600;
        font-size: 20px;
      }
    }
  }

  .nav-select {
    width: 100vw;
    height: 8vh;
    display: flex;
    align-items: center;
  }
}

.sex-or-team {
  display: inline-block;
  font-size: 14px;
  width: 17vw;
  height: 4vh;
  text-align: center;
  line-height: 4vh;
  background-color: #f4f4f4;
  border-radius: 20px;
  margin-left: 4vw;

  &.active {
    background-color: #fce0e5;
    color: #de1e4e;
  }
}

.singerListContent {
  height: calc(100vh - 171px);
  width: 100%;
  overflow: auto;

  .word-to-select {
    width: 100vw;

    .word {
      height: 3vh;
      line-height: 3vh;
      color: #999;
      font-size: 12px;
      padding-left: 20px;
      background-color: #f4f4f4;
    }
    .word-list {
      height: 8vh;
      padding: 0 10px;

      .word-list-left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 70vw;
        img {
          height: 7vh;
          border-radius: 999px;
        }

        span {
          width: 50vw;
        }
      }
    }
  }
}

.word-nav {
  position: fixed;
  top: 25vh;
  right: 0%;

  ul {
    height: 68vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    
      a {
        color: #999;
        padding: 5px;
      }
    
  }
}
</style>