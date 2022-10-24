<template>
  <div>
    <header>
      <div class="song-back">
        <div class="song-back-arrow" @click="goBack">
          <wd-icon
            name="thin-arrow-left"
            tag="div"
            size="20px"
            color="#fff"
          ></wd-icon>
        </div>
        <span>歌单精选</span>
      </div>
      <img src="@/assets/nav.svg" @click="isShowNav = !isShowNav" />
    </header>

    <nav>
      <song-list-banner :bannerList="bannerList"></song-list-banner>
    </nav>

    <main>
      <div class="recommend">
        <span
          v-for="(i, index) in nav"
          :key="'recommend' + index"
          @click="getSongsList(i.content[0].texts[1], i.content[0].texts[0])"
          >{{ i.content[0].texts[0] }}</span
        >
      </div>
      <p class="songsListTitle">{{ title }}</p>
      <div class="songs-list-contents">
        <div
          class="songs-list"
          v-for="item in songList"
          :key="'songsList' + item.logEvent.contentId"
          @click="goToOnlySongsList(item.logEvent.contentId)"
        >
          <img :src="item.imageUrl" />
          <p class="songs-list-num">{{ item.playNum }}</p>
          <p>{{ item.title }}</p>
        </div>
      </div>
      <div class="has-not-song" v-show="songList.length == 0">没有啦 テ_デ</div>
    </main>

    <transition name="showNav">
      <footer v-show="isShowNav">
        <div class="nav-content-text" @scroll="showTitle($event)">
          <div
            class="nav-content-text-content"
            v-for="(item, index) in nav"
            :key="'text' + index"
            :id="item.header.title"
          >
            <p
              v-for="i in item.content"
              :key="'text' + i.texts[1]"
              ref="content"
              @click="getSongsList(i.texts[1], i.texts[0])"
            >
              {{ i.texts[0] }}
            </p>
          </div>
        </div>
        <div class="nav-content">
          <div
            class="nav-title"
            v-for="(item, index) in nav"
            :key="'title' + index"
          >
            <a
              :class="{ active: index == isShowTitle }"
              :href="'#' + item.header.title"
              >{{ item.header.title }}</a
            >
          </div>
        </div>
      </footer>
    </transition>
  </div>
</template>

<script>
import SongListBanner from "@/components/SongListBanner.vue";
export default {
  data() {
    return {
      bannerList: [],
      nav: [],
      isShowNav: false,
      songList: [],
      title: "经典老歌",
      isShowTitle: 0,
    };
  },
  components: {
    SongListBanner,
  },
  created() {
    this.getHeaderBanner();
    this.getNav();
    this.getSongsList();
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/home" });
    },
    getHeaderBanner() {
      this.$axios
        .get(
          "https://app.c.nf.migu.cn/MIGUM3.0/v1.0/template/musiclistplaza-header"
        )
        .then(({ data }) => {
          this.bannerList = data.data.contentItemList;
          // console.log(data.data.contentItemList);
        });
    },
    getNav() {
      this.$axios
        .get("/MIGUM3.0/v1.0/template/musiclistplaza-taglist")
        .then(({ data }) => {
          this.nav = data.data;
          // console.log(data.data);
        });
    },

    getSongsList(id, title) {
      this.title = title || "经典老歌";
      id = id || 1000001635;
      this.isShowNav = false;
      this.$axios
        .get(
          `/MIGUM3.0/v1.0/template/musiclistplaza-listbytag?pageNumber=3&tagId=${id}`
        )
        .then(({ data }) => {
          this.songList = data.data.contentItemList.itemList;
          // console.log(this.songList);
        });
    },

    goToOnlySongsList(id) {
      // console.log(id);
      this.$router.push({
        name: "songListOnly",
        params: {
          id,
        },
      });
    },

    showTitle(e) {
      console.log(e.target.scrollTop / this.$refs.content[0].offsetHeight);
      let m = this.$refs.content[0].offsetHeight;
      let n = e.target.scrollTop;
      if (n < 6 * m) {
        this.isShowTitle = 0;
      } else if (n < 16 * m) {
        this.isShowTitle = 1;
      } else if (n < 24 * m) {
        this.isShowTitle = 2;
      } else if (n < 43 * m) {
        this.isShowTitle = 3;
      } else if (n < 54 * m) {
        this.isShowTitle = 4;
      } else if (n < 55 * m) {
        this.isShowTitle = 5;
      } else {
        this.isShowTitle = 6;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
header {
  position: sticky;
  top: 0%;
  z-index: 3;
  padding: 0 5vw;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #cd3021;
  .song-back {
    width: 30vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 22px;
      font-weight: 700;
      color: #eee;
    }
  }
}

main {
  margin-bottom: 7vh;
}

.songsListTitle {
  font-size: 20px;
  font-weight: 900;
  padding: 2vh 5vw;
}
.songs-list-contents {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  // overflow: auto;
  .songs-list {
    height: 20vh;
    width: 30vw;
    margin-left: calc(9vw / 4);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    img {
      height: 15vh;
      width: 30vw;
      border-radius: 15px;
    }
    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .songs-list-num {
      position: absolute;
      top: 14vh;
      left: 3vw;
      color: #fff;
      font-size: 12px;
    }
  }
}

.recommend {
  margin: 2vh 0;
  display: flex;
  overflow: auto;

  span {
    white-space: nowrap;
    padding: 1vh 4vw;
    box-shadow: 3px 3px 6px 0px #ccc;
    border-radius: 10px;
    margin: 1vh 2vw;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

footer {
  height: 87vh;
  position: fixed;
  bottom: 6vh;
  right: 0%;
  display: flex;
  z-index: 2;
  .nav-content {
    background-color: #fff;
    height: 100%;
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .nav-title {
    a {
      color: #000;
      display: inline-block;
      width: 20vw;
      font-size: 18px;
      font-weight: 600;
      height: 5vh;
      line-height: 5vh;
      text-align: center;

      &.active {
        color: #fff;
        background-color: #cd3021;
      }
    }
  }

  .nav-content-text {
    background-color: rgb(255, 255, 255, 0.9);
    height: 100%;
    width: 30vw;
    overflow: auto;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      display: none;
    }

    .nav-content-text-content {
      display: flex;
      flex-wrap: wrap;

      p {
        height: 5vh;
        width: 30vw;
        text-align: center;
        line-height: 5vh;
      }
    }
  }
}

.has-not-song {
  position: fixed;
  bottom: 8vh;
  left: 39vw;
}

.showNav-enter,
.showNav-leave-to {
  transform: translateX(100%);
}
.showNav-enter-active,
.showNav-leave-active {
  transition: all 0.5s;
}
.showNav-enter-to,
.showNav-leave {
  transform: translateX(0);
}
</style>