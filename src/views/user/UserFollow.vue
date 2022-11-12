<template>
  <div class="user-follow">
    <header>
      <i class="back wd-icon-thin-arrow-left" @click="goBack"></i>
      <i class="search wd-icon-search" @click="goToSearch"></i>
      <div class="page-title">我的关注</div>
    </header>
    <main>
      <wd-tabs
        v-model="tab"
        :animated="true"
        :swipeable="true"
        :lazy-render="true"
        :sticky="true"
        :offset-top="50"
      >
        <wd-tab
          v-for="item in tabList"
          :key="item.key"
          :title="`${item.title}`"
        >
          <div class="fol-items-singer" v-if="item.key == 'singer'">
            <div
              class="fol-item"
              v-for="i in item.data"
              :key="i.singerId"
              @click="turnToSingerPage(i.singerId, i.type)"
            >
              <div class="cover">
                <img :src="i.cover" />
              </div>
              <div class="singer-name">{{ i.singerName }}</div>
            </div>
          </div>
          <div class="fol-items-people" v-if="item.key == 'user'">
            <div
              class="fol-item"
              v-for="i in item.data"
              :key="i.userId"
              @click="turnToUserPage(i.userId)"
            >
              <div class="cover">
                <img :src="i.cover" />
              </div>
              <div class="singer-name">{{ i.userName }}</div>
            </div>
          </div>
        </wd-tab>
      </wd-tabs>
    </main>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  //   components: { SongsMoreFunc },
  data() {
    return {
      latelyData: [],
      showHeader: 0,
      tab: 0,
      tabList: [
        {
          title: "歌手",
          key: "singer",
          data: [],
        },
        {
          title: "用户",
          key: "user",
          data: [],
        },
      ],
      songName: "",
      songId: "",
      moretab: false,
    };
  },
  created() {
    this.collectData = this.user.userCollect;
    this.tabList.forEach((e) => {
      e.data = this.user.fav[e.key];
    });
  },
  computed: {
    ...mapState(["user"]),
    ...mapState({
      mv: (state) => state.user.userCollect.mv,
      album: (state) => state.user.userCollect.album,
    }),
  },
  watch: {
    mv() {
      this.tabList[1].data = this.mv;
    },
    album() {
      this.tabList[0].data = this.album;
    },
  },
  methods: {
    goToSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    turnToSingerPage(id, type) {
      this.$router.push({
        name: "SingerPage",
        params: {
          id,
          type,
        },
      });
    },
    turnToUserPage(id) {
      this.$router.push({
        path: "/other-user",
        query: { userId: id },
      });
    },
  },
};
</script>
<style lang="scss">
.user-follow {
  header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;

    z-index: 100;
    background-color: #fff;
    .back {
      position: absolute;
      left: 20px;
      line-height: 50px;
    }
    .search {
      position: absolute;
      right: 20px;
      line-height: 50px;
    }
    .page-title {
      text-align: center;
      line-height: 50px;
    }
  }
  main {
    padding: 50px 0;
    .lately-items-song {
      width: 100%;
    }
    .wd-tab {
      height: calc(100vh - 144px);
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .fol-item {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      .cover {
        width: 50px;
        img {
          display: block;
          width: 100%;
          border-radius: 999px;
        }
      }
      .singer-name {
        margin-left: 10px;
      }
    }
  }
}
</style>