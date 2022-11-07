<template>
  <div>
    <header>
      <div class="song-back">
        <div class="song-back-arrow" @click="goBack">
          <wd-icon name="thin-arrow-left" tag="div" size="20px"></wd-icon>
        </div>
        <span>歌单精选</span>
      </div>
      <img src="@/assets/nav.svg" @click="isShowNav = !isShowNav" />
    </header>

    <nav>
      <banner-component :bannerList="bannerList"></banner-component>
    </nav>

    <main>
      <p class="songsListTitle" ref="songsListTitle"></p>
      <div class="songs-list-contents">
        <div
          class="songs-list"
          v-for="item in songList"
          :key="item.logEvent.contentId"
          @click="goToOnlySongsList(item.logEvent.contentId)"
        >
          <img :src="item.imageUrl" alt="" />
          <p class="songs-list-num">{{ item.playNum }}</p>
          <p>{{ item.title }}</p>
        </div>
      </div>
    </main>

    <transition name="showNav">
      <footer v-show="isShowNav">
        <div class="nav-content" v-for="(item, index) in nav" :key="index">
          <p class="nav-title">{{ item.header.title }}</p>
          <div class="nav-content-text">
            <p
              v-for="i in item.content"
              :key="i.texts[1]"
              @click="getSongsList(i.texts[1], i.texts[0])"
            >
              {{ i.texts[0] }}
            </p>
          </div>
        </div>
      </footer>
    </transition>
  </div>
</template>

<script>
// import BannerComponent from "@/components/BannerComponent.vue";
export default {
  data() {
    return {
      bannerList: [],
      nav: [],
      isShowNav: false,
      songList: [],
    };
  },
  components: {
    // BannerComponent,
  },
  created() {
    this.getHeaderBanner();
    this.getNav();
  },
  mounted() {
    this.getSongsList();
  },

  methods: {
    goBack() {
      this.$router.go(-1);
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
      this.$refs.songsListTitle.textContent = title || "经典老歌";
      id = id || 1000001635;
      this.isShowNav = false;
      this.$axios
        .get(
          `/MIGUM3.0/v1.0/template/musiclistplaza-listbytag?pageNumber=3&tagId=${id}`
        )
        .then(({ data }) => {
          this.songList = data.data.contentItemList.itemList;
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
  },
};
</script>


<style lang="scss" scoped>
header {
  padding: 0 5vw;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .song-back {
    width: 30vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 22px;
      font-weight: 700;
    }
  }
}

.songsListTitle {
  font-size: 20px;
  font-weight: 900;
  padding: 2vh 5vw;
}
.songs-list-contents {
  height: 60vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
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

footer {
  background-color: #fff;
  position: fixed;
  bottom: 6vh;
  left: 0%;
}

.nav-content {
  margin: 10px 5px;

  .nav-title {
    font-size: 18px;
    font-weight: 600;
  }
  .nav-content-text {
    margin-top: 1vh;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    p {
      font-size: 14px;
      padding: 1vh 3vw;
      border-radius: 15px;
    }
  }
}

.showNav-enter,
.showNav-leave-to {
  transform: translateY(100%);
}
.showNav-enter-active,
.showNav-leave-active {
  transition: all 0.5s;
}
.showNav-enter-to,
.showNav-leave {
  transform: translateY(0);
}
</style>