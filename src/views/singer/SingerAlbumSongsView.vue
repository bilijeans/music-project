<template>
  <div class="album-songs-page">
    <div class="album-songs-page-bg">
      <img
        :src="
          AblumMes.imgItems
            ? AblumMes.imgItems[2].img
            : AblumMes.imgItem
            ? AblumMes.imgItem[2].img
            : ''
        "
        alt=""
      />
      <div class="album-songs-page-bg-mask"></div>
    </div>

    <div class="album-songs-page-content">
      <div class="album-songs-page-head">
        <div class="head-back-box">
          <div class="head-back-box-left">
            <img src="@/assets/svg/back.svg" @click="back" />
            <span>数字专辑</span>
          </div>
          <div class="head-back-box-right">
            <img src="@/assets/MoreFunctionWhite.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="album-songs-page-content-main">
        <div class="album-songs-page-content-main-singer">
          <div class="main-singer-left" @click="goToSingerPage()">
            <div class="main-singer-left-img">
              <img
                :src="
                  AblumMes.imgItems
                    ? AblumMes.imgItems[2].img
                    : AblumMes.imgItem
                    ? AblumMes.imgItem[2].img
                    : ''
                "
              />
            </div>
            <span class="ab-singer">{{ AblumMes.singer }}</span>
            <img class="r-arrow" src="@/assets/svg/rightArrow.svg" alt="" />
          </div>
          <div class="main-singer-right">
            <div>
              <img src="@/assets/svg/albumComments.svg" @click="goToComment" />
              <span>{{
                AblumMes.opNumItem ? AblumMes.opNumItem.commentNum : "0"
              }}</span>
            </div>
            <div>
              <img src="@/assets/svg/ear.svg" />
              <span>{{
                AblumMes.opNumItem ? AblumMes.opNumItem.playNumDesc : "0"
              }}</span>
            </div>
            <div>
              <img src="@/assets/svg/heart.svg" />
              <span>
                {{
                  AblumMes.opNumItem
                    ? AblumMes.opNumItem.keepNumDesc.indexOf("万") == -1
                      ? Number(AblumMes.opNumItem.keepNumDesc) +
                        (hasCollectStatus ? 1 : 0)
                      : AblumMes.opNumItem.keepNumDesc
                    : 0 + (hasCollectStatus ? 1 : 0)
                }}
              </span>
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
      albumType: "",
      songsData: {},
      AblumMes: {},
      updateData: {},
      hasCollectStatus: false,
    };
  },
  created() {
    this.albumId = this.$route.params.id;
    this.albumType = this.$route.params.type;
    this.getAblumSongsList();
    this.getAblumMes();
    this.hasCollect();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getAblumSongsList() {
      if (this.albumType == "1") {
        this.$axios
          .get(`/MIGUM3.0/resource/dalbum/song/v2.0?dAlbumId=${this.albumId}`)
          .then(({ data }) => {
            let dataList = data.data.songList;
            this.songsData = {
              dataList,
              totalCount: data.data.totalCount,
            };
            // console.log(this.songsData);
          });
      } else {
        this.$axios
          .get(`/MIGUM3.0/resource/album/song/v2.0?albumId=${this.albumId}`)
          .then(({ data }) => {
            let dataList = data.data.songList;
            this.songsData = {
              dataList,
              totalCount: data.data.totalCount,
            };
          });
      }
    },
    getUpdateData(data) {
      console.log(data);
      this.updateData.albumId = data.albumId ? data.albumId : data.contentId;
      this.updateData.cover = data.imgItem
        ? data.imgItem[0].img
        : data.imgItems[0].img;
      this.updateData.count = data.totalCount;
      this.updateData.singer = data.singer;
      this.updateData.singerId = data.singerId;
      this.updateData.opNumItem = data.opNumItem;
      this.updateData.title = data.title;
      this.updateData.tags = data.tags || data.tagItems || [];
      this.updateData.publishDate = data.publishDate;
      this.updateData.type = this.albumType;
    },
    getAblumMes() {
      if (this.albumType == "1") {
        this.$axios
          .get(`/MIGUM3.0/resource/dalbum/v2.0?dAlbumId=${this.albumId}`)
          .then(({ data }) => {
            this.AblumMes = data.data;
            // console.log(this.AblumMes)
            this.getUpdateData(data.data);
          });
      } else {
        this.$axios
          .get(`/MIGUM3.0/resource/album/v2.0?albumId=${this.albumId}`)
          .then(({ data }) => {
            this.AblumMes = data.data;
            // console.log(this.AblumMes)
            this.getUpdateData(data.data);
          });
      }
    },
    goToSingerPage() {
      console.log(this.AblumMes);
      this.$router.push({
        name: "SingerPage",
        params: {
          id: this.AblumMes.singerId,
          type: "2002",
        },
      });
      location.reload();
    },
    hasCollect() {
      this.hasCollectStatus = false;
      this.user.userCollect.album.forEach((el) => {
        if (el.albumId == this.albumId) {
          this.hasCollectStatus = true;
          return;
        }
      });
    },
    toggleCollect() {
      if (this.hasCollectStatus) {
        this.delCollectAlbum(this.albumId);
      } else {
        this.addCollectAlbum({
          albumId: this.AblumMes.albumId
            ? this.AblumMes.albumId
            : this.AblumMes.contentId,
          cover: this.AblumMes.imgItem
            ? this.AblumMes.imgItem[0].img
            : this.AblumMes.imgItems[0].img,
          count: this.AblumMes.totalCount,
          singer: this.AblumMes.singer,
          singerId: this.AblumMes.singerId,
          opNumItem: this.AblumMes.opNumItem,
          title: this.AblumMes.title,
          tags: this.AblumMes.tags || this.AblumMes.tagItems || [],
          publishDate: this.AblumMes.publishDate,
          type: this.albumType,
        });
      }
      this.hasCollectStatus = !this.hasCollectStatus;
    },
    goToComment() {
      let type;
      if (this.albumType == 1) {
        type = 5;
      } else {
        type = 2003;
      }
      this.$router.push({
        path: "/morefunc-comment",
        query: { id: this.albumId, type },
      });
    },
    back() {
      this.$router.go(-1);
    },
    ...mapMutations(["addCollectAlbum", "delCollectAlbum"]),
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
  width: 60vw;
  display: flex;
  justify-content: flex-end;

  div {
    display: flex;
    align-items: center;
    margin-left: 3vw;
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
    line-height: 4vh;
    font-size: 18px;
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