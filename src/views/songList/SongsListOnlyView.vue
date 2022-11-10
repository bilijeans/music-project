<template>
  <div class="album-songs-page">
    <div class="album-songs-page-bg">
      <img :src="AblumMes.imgItem ? AblumMes.imgItem.img : ''" />
      <div class="album-songs-page-bg-mask"></div>
    </div>

    <div class="album-songs-page-content">
      <div class="album-songs-page-head">
        <div class="head-back-box">
          <div class="head-back-box-left">
            <img src="@/assets/svg/back.svg" @click="back" />
            <span>歌单</span>
          </div>
          <div class="head-back-box-right">
            <img src="@/assets/MoreFunctionWhite.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="album-songs-page-content-main">
        <div class="album-songs-page-content-main-singer">
          <div
            class="main-singer-left"
            @click="turnToPeoplePage(AblumMes.ownerId)"
          >
            <div class="main-singer-left-img">
              <img :src="AblumMes.ownerPic ? AblumMes.ownerPic : ''" />
            </div>
            <span class="ab-singer">{{ AblumMes.ownerName }}</span>
            <img class="r-arrow" src="@/assets/svg/rightArrow.svg" alt="" />
          </div>
          <div class="main-singer-right">
            <div>
              <img
                src="@/assets/svg/albumComments.svg"
                @click="goToComment(AblumMes.musicListId)"
              />
              <span>{{ AblumMes?.opNumItem?.commentNum }}</span>
            </div>
            <div>
              <img src="@/assets/svg/ear.svg" />
              <span>{{
                AblumMes.opNumItem ? AblumMes.opNumItem.playNumDesc : ""
              }}</span>
            </div>
            <div>
              <img src="@/assets/svg/heart.svg" />
              <span>{{
              AblumMes.opNumItem ? (AblumMes.opNumItem.keepNumDesc.indexOf('万') == -1? Number(AblumMes.opNumItem.keepNumDesc) +(hasCollectStatus ? 1 : 0) : AblumMes.opNumItem.keepNumDesc) : (0 + (hasCollectStatus ? 1 : 0))
              }}</span>
            </div>
          </div>
        </div>

        <div class="album-songs-page-album">
          <p class="page-album-name">{{ AblumMes.title }}</p>
          <div class="collect" @click="toggleCollect">
            <img
              :src="
                hasCollectStatus
                  ? require('@/assets/ActiveHeartRed.svg')
                  : require('@/assets/HeartRed.svg')
              "
            />
            <p>{{ hasCollectStatus ? "已" : "" }}收藏</p>
          </div>
        </div>

        <songs-component
          :songsData="songsData"
          :updateData="updateData"
        ></songs-component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SongsComponent from "@/components/SongsComponent.vue";
export default {
  components: { SongsComponent },
  data() {
    return {
      albumId: "",
      songsData: {},
      AblumMes: {},
      updateData: {},
      hasCollectStatus: false,
    };
  },
  created() {
    this.albumId = this.$route.params.id;
    this.getOnlySongsList(this.albumId);
    this.getAblumMes(this.albumId);
    this.hasCollect();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getOnlySongsList(id) {
      this.$axios
        .get(
          `/MIGUM3.0/resource/playlist/song/v2.0?pageNo=1&pageSize=50&playlistId=${id}`
        )
        .then(({ data }) => {
          let dataList = data.data.songList;
          this.songsData = {
            dataList,
            totalCount: data.data.totalCount,
          };
        });
    },
    getAblumMes(id) {
      this.$axios
        .get(`/MIGUM3.0/resource/playlist/v2.0?playlistId=${id}`)
        .then(({ data }) => {
          this.AblumMes = data.data;
          this.updateData.playlistId = id;
          this.updateData.cover = data.data.imgItem.img;
          this.updateData.count = data.data.musicNum;
          this.updateData.ownerName = data.data.ownerName;
          this.updateData.ownerId = data.data.ownerId;
          this.updateData.opNumItem = data.data.opNumItem;
          this.updateData.title = data.data.title;
          this.updateData.tags = data.data.tags;
          // console.log(this.songsData)
        });
    },

    hasCollect() {
      this.hasCollectStatus = false;
      this.user.collectSongList.forEach((el) => {
        if (el.playlistId == this.albumId) {
          this.hasCollectStatus = true;
          return;
        }
      });
    },
    toggleCollect() {
      if (this.hasCollectStatus) {
        this.delCollectSongList(this.albumId);
      } else {
        this.addCollectSongList({
          playlistId: this.albumId,
          cover: this.AblumMes.imgItem.img,
          count: this.AblumMes.musicNum,
          ownerName: this.AblumMes.ownerName,
          ownerId: this.AblumMes.ownerId,
          opNumItem: this.AblumMes.opNumItem,
          title: this.AblumMes.title,
          tags: this.tags,
        });
      }
      this.hasCollectStatus = !this.hasCollectStatus;
    },
    goToComment(id) {
      this.$router.push({
        path: "/morefunc-comment",
        query: { id: id, type: 2021 },
      });
    },
    turnToPeoplePage(id) {
      this.$router.push({
        path: "/other-user",
        query: { userId: id },
      });
    },
    back() {
      this.$router.go(-1);
    },
    ...mapMutations(["addCollectSongList", "delCollectSongList"]),
  },
};
</script>

<style lang="scss" scoped>
.album-songs-page {
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
.album-songs-page-bg {
  width: 100vw;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: -1;
  img {
    width: 100%;
  }
  .album-songs-page-bg-mask {
    height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0, 0.6);
    position: absolute;
    top: 0%;
    left: 0%;
    bottom: 0%;
    right: 0%;
  }
}

.album-songs-page-head {
  height: 18vh;
  .head-back-box {
    height: 10vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4vw;
    position: sticky;
    top: 4vh;
    left: 0%;
  }

  .head-back-box-left {
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 20px;
      margin-left: 3vw;
    }
  }
}

.album-songs-page-content-main {
  width: 100vw;
  border-top-left-radius: 20px;
  background-color: #fff;
  .album-songs-page-content-main-singer {
    height: 8vh;
    border-top-left-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 3vw;

    .main-singer-left {
      width: 40vw;
      height: 100%;
      border-top-left-radius: 20px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .main-singer-left-img {
        height: 30px;
        width: 30px;

        img {
          height: 100%;
          width: 100%;
          border-radius: 999px;
        }
      }

      .ab-singer {
        font-size: 15px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 12vw;
        height: 2vh;
      }
    }
  }
}

.main-singer-right {
  width: 46vw;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  span {
    font-size: 14px;
    color: #999;
  }
}

.album-songs-page-album {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vw;

  .page-album-name {
    width: 65vw;
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .collect {
    width: 22vw;
    height: 22vw;
    border-radius: 999px;
    box-shadow: 0 0 6px 0 #ccc;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    img {
      height: 20px;
      width: 20px;
      margin-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: #999;
    }
  }
}

.songslist {
  margin: 2vh 0 0 0;
}
</style>