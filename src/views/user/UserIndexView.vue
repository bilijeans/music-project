<template>
  <div class="user-index" ref="userPage">
    <header :style="{ backgroundColor: `rgba(255, 255, 255,${showHeader})` }">
      <i class="back wd-icon-thin-arrow-left" @click="backToHome"></i>
      <i class="search wd-icon-search" @click="goToSearch"></i>
      <transition name="user">
        <div class="user-profile" v-show="showHeader == 1">
          <div class="user-pic">
            <img src="@/assets/user4.svg" />
          </div>
          <div class="user-name">{{ user.config.nickName }}</div>
        </div>
      </transition>
    </header>
    <main ref="main">
      <div class="user-info-container card" :style="{ opacity: userInfoShow }">
        <div class="user-info-card">
          <div class="user-pic">
            <img src="@/assets/user4.svg" />
          </div>
          <div class="user-name">{{ user.config.nickName }}</div>
          <div class="user-status">
            <span class="follow"
              >{{ user.fav.singer.length + user.fav.user.length }} 关注</span
            >
            | <span class="fans">0 粉丝</span> |
            <span class="level">Lv 1</span>
          </div>
        </div>
      </div>
      <div class="user-play-info card">
        <div class="user-play-item" @click="turnToLatelyPlay">
          <div class="user-play-icon">
            <img src="@/assets/user-play.png" />
          </div>
          <span class="user-play-title">最近播放</span>
        </div>
        <div class="user-play-item" @click="turnToCollectPage">
          <div class="user-play-icon">
            <img src="@/assets/user-fav.png" />
          </div>
          <span class="user-play-title">我的收藏</span>
        </div>
        <div class="user-play-item" @click="turnToFollowPage">
          <div class="user-play-icon">
            <img src="@/assets/user-follow.png" />
          </div>
          <span class="user-play-title">我的关注</span>
        </div>
        <div class="user-play-item">
          <div class="user-play-icon">
            <img src="@/assets/user-setting.svg" />
          </div>
          <span class="user-play-title">设置</span>
        </div>
      </div>
      <div class="user-fav-list card" @click="turnToFavSong">
        <div class="fav-cover">
          <img
            :src="
              user.fav.song[0]
                ? '	http://d.musicapp.migu.cn' + user.fav.song[0].cover
                : require('@/assets/defaultSonglistCover.jpg')
            "
          />
          <div class="mask"></div>
        </div>
        <div class="fav-msg">
          <div class="fav-title">我喜欢的音乐</div>
          <div class="fav-list-num">{{ user.fav.song.length }}首</div>
        </div>
      </div>
      <div class="user-song-list">
        <div
          class="user-song-list-nav"
          :style="{ backgroundColor: `rgba(255, 255, 255,${navShow})` }"
        >
          <div class="nav-item" :class="{ active: navIndex == 0 }">
            我的歌单
          </div>
          <div class="nav-item" :class="{ active: navIndex == 1 }">
            收藏歌单
          </div>
        </div>
        <div class="song-list-page card">
          <div class="page-title">
            <div class="title-name">
              我的歌单({{ user.mySongList.length }}个)
            </div>
            <div class="page-controls">
              <i class="wd-icon-add btn-add" @click="addStatus = true"></i>
              <i class="wd-icon-more btn-more"></i>
            </div>
            <div class="add-song-list" v-if="addStatus">
              <div class="pop-up-card">
                <div class="pop-up-title">
                  <p>新建歌单</p>
                </div>
                <div class="pop-up-i-box">
                  <input
                    type="text"
                    v-model="addSongListName"
                    placeholder="请输入歌单名字"
                  />
                </div>
                <div class="btn-choose">
                  <span style="color: #aef" @click="createMySongList"
                    >完成</span
                  >
                  <span @click="addStatus = false">取消</span>
                </div>
              </div>
            </div>
          </div>
          <div class="u-s-list" v-if="user.mySongList[0]">
            <div
              class="u-l-item"
              v-for="item in user.mySongList"
              :key="item.playlistId"
              @click="turnToMySonglist(item.playlistId)"
            >
              <div class="l-i-cover">
                <img
                  :src="
                    item.list[0]
                      ? 'http://d.musicapp.migu.cn' + item.list[0].cover
                      : require('@/assets/defaultSonglistCover.jpg')
                  "
                />
                <div class="folder"></div>
              </div>
              <div class="l-i-msg">
                <div class="l-i-title">{{ item.title }}</div>
                <div class="l-i-list-num">{{ item.list.length }}首</div>
              </div>
              <div class="more" @click="showSonglistCro(item.playlistId)">
                <i class="wd-icon-more btn-more"></i>
              </div>
            </div>
          </div>

          <div class="empty-list" v-else>
            <p class="empty-desc">空空如也</p>
            <p class="empty-desc">快去创建你的专属歌单吧</p>
          </div>
          <wd-popup
            v-model="songlistStatus"
            class="s-l-cro"
            position="bottom"
            :teleport="{ disabled: true }"
            :style="{ height: '120px' }"
          >
            <div class="title">歌单：{{ croTitle }}</div>
            <div class="rename" @click="rename">
              <i class="wd-icon-lenovo"></i> 重命名
            </div>
            <div class="delete" @click="delSonglist">
              <i class="wd-icon-delete"></i> 删除
            </div>
            <div class="add-song-list" v-if="renameStatus">
              <div class="pop-up-card">
                <div class="pop-up-title">
                  <p>歌单名称</p>
                </div>
                <div class="pop-up-i-box">
                  <input
                    type="text"
                    v-model="newTitle"
                    :placeholder="croTitle"
                  />
                </div>
                <div class="btn-choose">
                  <span style="color: #aef" @click="renameCompeleted"
                    >完成</span
                  >
                  <span @click="renameStatus = false">取消</span>
                </div>
              </div>
            </div>
          </wd-popup>
        </div>
        <div ref="collectItem" class="song-list-page card">
          <div class="page-title">
            <div class="title-name">
              收藏歌单({{ user.collectSongList.length }}个)
            </div>
            <div class="page-controls">
              <i class="wd-icon-more btn-more"></i>
            </div>
          </div>
          <div class="u-s-list" v-if="user.collectSongList[0]">
            <div
              class="u-l-item"
              v-for="item in user.collectSongList"
              :key="item.playlistId"
              @click="goToOnlySongsList(item.playlistId)"
            >
              <div class="l-i-cover">
                <img :src="item.cover" />
                <div class="folder"></div>
              </div>
              <div class="l-i-msg">
                <div class="l-i-title">{{ item.title }}</div>
                <div class="l-i-list-num">
                  {{ item.count }}首, <span>by {{ item.ownerName }}</span>
                </div>
              </div>
              <div class="more" @click="showColSonglistMore(item.playlistId)">
                <i class="wd-icon-more btn-more"></i>
              </div>
            </div>
          </div>
          <div class="empty-list" v-else>
            <p class="empty-desc">空空如也</p>
            <p class="empty-desc">快去寻找喜欢的歌单吧</p>
          </div>
          <wd-popup
            v-model="colSonglistStatus"
            class="s-l-cro"
            position="bottom"
            :teleport="{ disabled: true }"
            :style="{ height: '120px' }"
          >
            <div class="title">歌单：{{ croTitle }}</div>
            <div class="rename" @click="rename">
              <i class="wd-icon-lenovo"></i> 重命名
            </div>
            <div class="delete" @click="delSonglist">
              <i class="wd-icon-delete"></i> 删除
            </div>
            <div class="add-song-list" v-if="renameStatus">
              <div class="pop-up-card">
                <div class="pop-up-title">
                  <p>歌单名称</p>
                </div>
                <div class="pop-up-i-box">
                  <input
                    type="text"
                    v-model="newTitle"
                    :placeholder="croTitle"
                  />
                </div>
                <div class="btn-choose">
                  <span style="color: #aef" @click="renameCompeleted"
                    >完成</span
                  >
                  <span @click="renameStatus = false">取消</span>
                </div>
              </div>
            </div>
          </wd-popup>
        </div>
      </div>
    </main>
    <footer>
      <div class="footer-title">为你推荐</div>
      <div class="user-commend-songlist">
        <div
          class="commend-item"
          v-for="item in commendSongList"
          :key="item.actionUrl"
          @click="goToOnlySongsList(item.actionUrl)"
        >
          <div class="songlist-cover">
            <img :src="item.imageUrl" />
          </div>
          <div class="songlist-title">{{ item.title }}</div>
          <div class="play-num">
            <svg
              class="icon"
              width="12px"
              height="12px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M224 938.713333a53.58 53.58 0 0 1-53.333333-53.433333V138.72a53.333333 53.333333 0 0 1 80.886666-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046667-810.666666a10.98 10.98 0 0 0-5.333334 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446666-1.586667z"
              /></svg
            >{{ item.subTitle }}
          </div>
        </div>
      </div>
      <div class="turn-song-list" @click="turnToSongList">去广场看看更多</div>
    </footer>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      addStatus: false,
      addSongListName: "",
      commendSongList: [],
      showHeader: 0,
      userInfoShow: 1,
      userShow: false,
      navShow: 0,
      navIndex: 0,
      songlistStatus: false,
      colSonglistStatus: false,
      croTitle: "",
      newTitle: "",
      renameStatus: false,
      itemData: {},
    };
  },
  created() {
    this.getCommendData();
  },
  mounted() {
    // console.log(this.$refs.userPage.scrollTop);
    this.$refs.userPage.addEventListener("scroll", () => {
      // console.log(this.$refs.collectItem.getBoundingClientRect().top);
      if (this.$refs.userPage.scrollTop >= 130) {
        if (this.showHeader < 1) {
          this.showHeader = this.showHeader + 0.2;
        }
      } else {
        if (this.showHeader > 0) {
          this.showHeader = this.showHeader - 0.2;
        }
      }
      if (this.$refs.userPage.scrollTop < 100) {
        this.showHeader = this.showHeader = 0;
        this.userInfoShow = 1;
      }
      if (this.$refs.userPage.scrollTop >= 110) {
        if (this.userInfoShow > 0) {
          this.userInfoShow = this.userInfoShow - 0.2;
        }
      } else {
        if (this.userInfoShow < 1) {
          this.userInfoShow = this.userInfoShow + 0.2;
        }
      }
      if (this.$refs.userPage.scrollTop >= 410) {
        this.navShow = 1;
      } else {
        this.navShow = 0;
      }
      if (this.$refs.collectItem.getBoundingClientRect().top <= 86) {
        this.$nextTick(() => {
          this.navIndex = 1;
        });
      } else {
        this.$nextTick(() => {
          this.navIndex = 0;
        });
      }
    });
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // closePopUp() {
    //   this.songlistStatus = false;
    // },
    goToSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    rename() {
      this.renameStatus = true;
      // this.songlistStatus = false
      console.log(this.itemData);
    },
    renameCompeleted() {
      this.itemData.title = this.newTitle;
      this.renameMySongList(this.itemData);
      this.renameStatus = false;
      this.songlistStatus = false;
      this.newTitle = "";
    },
    delSonglist() {
      // this.renameStatus = false
      this.songlistStatus = false;
      // setTimeout(() => {
      this.delMySongList(this.itemData.playlistId);
      // }, 300);
    },
    createMySongList() {
      if (this.addSongListName.trim()) {
        this.addMySongList(this.addSongListName);
        this.addSongListName = "";
        this.addStatus = false;
      }
    },
    turnToSongList() {
      this.$router.push({
        path: "/song-lists",
      });
    },
    getCommendData() {
      this.$axios
        .get(
          "https://app.c.nf.migu.cn/MIGUM3.0/v1.0/template/musiclistplaza-header"
        )
        .then(({ data }) => {
          console.log(data.data);
          this.commendSongList = data.data.contentItemList;
        });
    },
    showSonglistCro(id) {
      console.log(id);
      this.songlistStatus = true;
      this.user.mySongList.forEach((e) => {
        if (e.playlistId == id) {
          this.croTitle = e.title;
          this.itemData = e;
        }
      });
    },
    showColSonglistMore(id) {
      this.colSonglistStatus = true;
      this.user.collectSongList.forEach((e) => {
        if (e.playlistId == id) {
          this.croTitle = e.title;
          this.itemData = e;
        }
      });
    },
    backToHome() {
      this.$router.go(-1);
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
    turnToLatelyPlay() {
      this.$router.push({
        path: "/user-lately-play",
      });
    },
    turnToCollectPage() {
      this.$router.push({
        path: "/user/user-collect",
      });
    },
    turnToFavSong() {
      this.$router.push({
        path: "/user/user-fav-song",
      });
    },
    turnToFollowPage() {
      this.$router.push({
        path: "/user/user-follow",
      });
    },
    turnToMySonglist(id) {
      this.$router.push({
        path: "/user/songlist",
        query: {
          id: id,
        },
      });
    },

    ...mapMutations(["addMySongList", "renameMySongList", "delMySongList"]),
  },
  beforeDestroy() {},
};
</script>
<style lang="scss">
.user-index {
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 80px;
  overflow: auto;
  // background-image: linear-gradient(
  //   rgba(233, 225, 230, 0.7),
  //   rgba(245, 235, 235, 0.5)
  // );
  background-color: rgb(245, 250, 250);
  &::-webkit-scrollbar {
    display: none;
  }
  header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;

    z-index: 100;
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
    .user-profile {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      .user-pic {
        width: 30px;
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .user-enter {
      height: 0px;
    }

    .user-leave {
      height: 20px;
    }
    .user-leave-to {
      height: 0;
    }
    .user-enter-active,
    .user-leave-active {
      transition: all 0.2s ease-in;
    }
  }
  main {
    .card {
      width: 90vw;
      border-radius: 10px;
      background-color: #fff;
      margin: 20px auto;
    }
    .user-info-container {
      // height: 100px;
      margin-top: 30px;
      padding-top: 10px;
      padding-bottom: 30px;
    }
    .user-info-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
    }
    .user-pic {
      // position: relative;
      // top: -60px;
      width: 80px;
      margin-top: -60px;
      img {
        display: block;
        width: 100%;
        border: 1px solid #eee;
        border-radius: 999px;
      }
    }
    .user-name {
      font-size: 20px;
      margin-top: 10px;
      letter-spacing: 1px;
      font-weight: bold;
    }
    .user-status {
      margin-top: 15px;
      // padding-bottom: 30px;
      font-size: 12px;
      span {
        padding: 2px 10px;
        color: #999;
      }
    }
    .user-play-info {
      display: flex;
      justify-content: space-around;
      padding: 20px 10px;
      .user-play-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .user-play-icon {
        width: 10vw;
        img {
          display: block;
          width: 100%;
        }
      }
      .user-play-title {
        font-size: 12px;
        margin-top: 10px;
        letter-spacing: 1px;
        transform: scale(0.9);
        color: #666;
      }
    }
    .user-fav-list {
      display: flex;
      align-items: center;
      padding: 20px;
      .fav-cover {
        position: relative;
        width: 60px;
        img {
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 10px;
        }
      }
      .mask {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(24, 24, 24, 0.5);
        border-radius: 10px;
        &::after {
          content: "";
          display: block;
          width: 30px;
          height: 30px;
          background-image: url("@/assets/ActiveHeartWhite.svg");
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
      .fav-msg {
        margin-left: 15px;
        .fav-title {
          font-size: 13px;
          letter-spacing: 1px;
        }
        .fav-list-num {
          font-size: 12px;
          margin-top: 8px;
          color: #999;
        }
      }
    }
    // .user-song-list {
    // }
    .user-song-list-nav {
      position: sticky;
      top: 0px;
      display: flex;
      justify-content: space-around;
      padding: 10px 20px;
      // background-color: #fff;
      z-index: 10;
      .nav-item {
        width: 33%;
        text-align: center;
        flex-grow: 1;
        letter-spacing: 1px;
        color: #777;
        border-left: 1px solid rgba(204, 204, 204, 0.5);
        &:first-child {
          border: none;
        }
      }
      .active {
        position: relative;
        color: #000;
        font-weight: bold;
        z-index: 2;
        &::after {
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 0;
          content: "";
          display: block;
          width: 75px;
          height: 8px;
          border-radius: 999px;
          background-color: #fd3c39c2;
          margin: 0 auto;
          z-index: -1;
        }
      }
    }
    .song-list-page {
      // padding: 20px;
      .page-title {
        position: relative;
        .title-name {
          padding: 20px;
          font-size: 12px;
          color: #999;
        }
        .page-controls {
          position: absolute;
          top: 20px;
          right: 20px;
          i {
            margin-left: 15px;
            color: #999;
          }
        }
      }
      .u-s-list {
        padding: 10px 0;
      }
      .u-l-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0px 20px;
        margin-bottom: 10px;
      }
      .l-i-cover {
        position: relative;
        width: 60px;
        z-index: 2;
        img {
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 10px;
        }
      }
      .folder {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -3px;
        left: 0;
        right: 0;
        width: 90%;
        height: 100%;
        background-color: rgb(201, 201, 201);
        border-radius: 10px;
        margin: 0 auto;
        z-index: -1;
      }
      .l-i-msg {
        margin-left: 15px;
        padding: 5px 0;
        .l-i-title {
          width: 50vw;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          letter-spacing: 1px;
          white-space: nowrap;
          padding: 5px 0;
        }
        .l-i-list-num {
          font-size: 12px;
          margin-top: 8px;
          color: #999;
        }
      }
      .more {
        position: absolute;
        right: 20px;
        color: #999;
      }
      .s-l-cro {
        .title {
          font-size: 14px;
          padding: 10px 20px 5px 10px;
        }
        .rename {
          display: flex;
          align-items: center;
          margin-top: 5px;
          padding: 10px 20px;
        }
        .delete {
          display: flex;
          align-items: center;
          padding: 10px 20px;
        }
        i {
          color: #999;
          margin-right: 10px;
        }
      }
    }
    .empty-list {
      padding: 50px 0 80px 0;
    }
    .empty-desc {
      padding: 10px 30px;
      text-align: center;
      font-size: 12px;
    }
    .add-song-list {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 10;
      .pop-up-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 70vw;
        min-width: 130px;
        height: 160px;
        background-color: #fff;
        border-radius: 10px;
        .pop-up-title {
          padding: 10px;
          text-align: center;
          letter-spacing: 2px;
        }
      }
      .pop-up-i-box {
        width: 80%;
        margin: 0 auto;
        // border: 1px solid #bbb;
        // border-radius: 20px;
        border-bottom: 1px solid #aaa;
        padding: 5px 10px;
        margin-top: -10px;
        input {
          width: 80%;
          border: none;
          outline: none;
          &::placeholder {
            font-size: 14px;
          }
        }
      }
      .btn-choose {
        width: 100%;
        display: flex;
        justify-content: space-between;
        // border-top: 1px solid #666;
        span {
          padding: 10px 0;
          flex-grow: 1;
          text-align: center;
        }
      }
    }
  }
  footer {
    .footer-title {
      padding: 20px;
      font-size: 13;
    }
    .user-commend-songlist {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 20px;
    }
    .commend-item {
      position: relative;
      width: 27vw;
      margin-bottom: 20px;
      .songlist-cover {
        width: 100%;
        img {
          display: block;
          width: 28vw;
          height: 28vw;
          border-radius: 10px;
        }
      }
      .songlist-title {
        width: 100%;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: auto;
        margin-top: 10px;
      }
      .play-num {
        position: absolute;
        top: 3px;
        right: -5px;
        display: flex;
        align-items: center;
        padding: 3px 5px;
        font-size: 12px;
        color: #fff;
        background-color: rgba(119, 119, 119, 0.5);
        border-radius: 999px;
        transform: scale(0.8);
        svg {
          margin-right: 2px;
        }
      }
    }
    .turn-song-list {
      width: 140px;
      padding: 10px 20px;
      font-size: 14px;
      text-align: center;
      border: 1px solid rgb(134, 134, 134);
      border-radius: 999px;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
}
</style>