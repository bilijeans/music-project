<template>
  <div class="play-info" v-if="playbar.songData" @touchStart.stop>
    <header>
      <i class="wd-icon-arrow-down" @click="pickUp"></i>
      <div class="title">
        <p class="song-name" ref="spanTitle">
          <span class="name" ref="firstSpan">
            {{ playbar.songData ? playbar.songData.songName : "" }}
          </span>
          <span class="name" style="margin-left: 50px" v-if="titleShow">
            {{ playbar.songData ? playbar.songData.songName : "" }}
          </span>
        </p>
        <p class="singer">
          {{
            playbar.songData
              ? dealWithSingerList(playbar.songData.singerList)
              : ""
          }}
        </p>
      </div>
    </header>
    <main @click="lrcToggle = !lrcToggle">
      <div
        class="album"
        :style="{ animationPlayState: playStatus ? 'running' : 'paused' }"
        v-show="!lrcToggle"
      >
        <div class="cover">
          <img
            :src="
              playbar.songData
                ? 'http://d.musicapp.migu.cn' + playbar.songData.img1
                : ''
            "
          />
        </div>
      </div>
      <div class="song-lrc" v-show="lrcToggle">
        <div ref="lrc" class="lrc-container" v-if="playbar.lrcData">
          <ul>
            <li
              ref="lrcItem"
              class="lrc-item"
              :class="{ active: highLightLrcIndex == index }"
              v-for="(item, index) in playbar.lrcData"
              :key="index"
            >
              {{ item.value }}
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer>
      <div class="nav">
        <div
          class="nav-item like"
          @click="toggleLike"
          :style="{
            backgroundImage: likeStatus
              ? `url(${require('@/assets/ActiveHeart.svg')})`
              : `url(${require('@/assets/ActiveHeartWhite.svg')})`,
          }"
        ></div>
        <div class="nav-item comment"></div>
        <div class="nav-item tone-flag"></div>
        <div class="nav-item more"></div>
      </div>
      <div class="play-control">
        <div class="progress-container">
          <div class="time">{{ dealWithTime(currentTime) }}</div>
          <div class="end-time">{{ dealWithTime(duration) }}</div>
          <wd-progress
            class="progress"
            :percentage="moveTo || currentRate"
            hide-text
            color="#fc0fc0"
            @mousedown.native.stop="moveProgress($event)"
          />
          <div
            class="point"
            :style="{ left: `${moveTo || currentRate - 1}%` }"
          ></div>
        </div>
        <div class="play-btn">
          <div
            class="co-loop btn"
            :class="{
              'single-loop': loop == 0,
              'turn-loop': loop == 1,
              'random-loop': loop == 2,
            }"
            @click="changeLoop"
          ></div>
          <div class="co-pre btn" @click="preSong"></div>
          <div class="co-play btn" @click="togglePlayChange">
            <svg
              v-show="!playStatus"
              class="icon"
              width="32px"
              height="32px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M224 938.713333a53.58 53.58 0 0 1-53.333333-53.433333V138.72a53.333333 53.333333 0 0 1 80.886666-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046667-810.666666a10.98 10.98 0 0 0-5.333334 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446666-1.586667z"
              />
            </svg>
            <svg
              v-show="playStatus"
              class="icon"
              width="32px"
              height="32px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#ffffff"
                d="M320 938.666667a21.333333 21.333333 0 0 1-21.333333-21.333334V106.666667a21.333333 21.333333 0 0 1 42.666666 0v810.666666a21.333333 21.333333 0 0 1-21.333333 21.333334z m405.333333-21.333334V106.666667a21.333333 21.333333 0 0 0-42.666666 0v810.666666a21.333333 21.333333 0 0 0 42.666666 0z"
              />
            </svg>
          </div>
          <div class="co-next btn" @click="nextSong"></div>
          <div class="co-list btn" @click="playListShow = true"></div>
        </div>
      </div>
    </footer>
    <transition name="list">
      <play-list-component
        v-show="playListShow"
        :status="playListShow"
        :loop="loop"
        @packUp="pickUpList"
        @changeLoop="changeLoop"
        @stopPlay="stopPlay"
      ></play-list-component>
    </transition>
    <div
      class="glass"
      :style="{
        backgroundImage: `url(${
          'http://d.musicapp.migu.cn' + playbar.songData.img2
        })`,
      }"
    ></div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    currentRate: Number,
    currentTime: Number,
    duration: Number,
    playStatus: Boolean,
    loop: Number,
  },
  data() {
    return {
      moveTo: null,
      lrcToggle: false,
      preLrcIndex: 0,
      lrcTime: null,
      playListShow: false,
      time: null,
      titleShow: false,
      likeStatus: false,
    };
  },
  created() {
    this.getTitleStyle = debounce(this.getTitleStyle, 2000);
    this.hasLike();
  },
  computed: {
    highLightLrcIndex() {
      if (this.playbar.lrcData) {
        // this.moveLrc()
        for (let i = 0; i < this.playbar.lrcData.length; i++) {
          if (this.playbar.lrcData[i].time > this.currentTime) {
            // this.moveLrc(i - 1);
            return i - 1;
          }
        }
      }
      return 0;
    },
    ...mapState(["playbar", "playList", "user"]),
    ...mapState({
      songId: (state) => state.playbar.playId,
    }),
  },
  watch: {
    currentTime() {
      if (this.currentTime < 1) {
        if (this.$refs.lrc) {
          this.$refs.lrc.scrollTop = 0;
          this.titleShow = false;
          this.getTitleStyle();
        } else {
          return false;
        }
      }
    },
    highLightLrcIndex() {
      this.moveLrc();
    },
    lrcToggle() {
      this.moveLrc();
    },
    songId() {
      console.log(this.playbar);
      this.hasLike();
    },
  },
  methods: {
    moveLrc() {
      if (!this.$refs.lrcItem) {
        return false;
      }
      let height = 0;
      for (let i = 0; i < this.highLightLrcIndex - 6; i++) {
        height += this.$refs.lrcItem[i]?.offsetHeight;
      }
      if (this.$refs.lrc) {
        this.$refs.lrc.scrollTop = height;
      } else {
        return false;
      }
    },
    pickUp() {
      this.$emit("packUpPlayInfo");
    },
    pickUpList() {
      this.playListShow = false;
    },
    getTitleStyle() {
      this.titleShow = false;
      clearInterval(this.time);
      // console.log(this.$refs.firstSpan);
      if (!this.$refs.firstSpan) {
        return false;
      }
      let windowWidth = document.documentElement.clientWidth;
      let titleWidth = parseInt(
        window.getComputedStyle(this.$refs.firstSpan).width
      );
      this.$nextTick(() => {
        this.$refs.spanTitle.style.transform = "translateX(0px)";
        if (titleWidth > windowWidth / 2) {
          this.titleShow = true;
          let transformWidth = 0;
          this.time = setInterval(() => {
            if (transformWidth == titleWidth + 50) {
              this.$nextTick(() => {
                this.$refs.spanTitle.style.transform = "translateX(0px)";
              });
              clearInterval(this.time);
            }
            transformWidth++;
            this.$refs.spanTitle.setAttribute(
              "style",
              `transform:translateX(-${transformWidth}px)`
            );
          }, 30);
        } else {
          this.titleShow = false;
        }
      });
    },
    dealWithSingerList(arr) {
      let str = "";
      arr.forEach((e) => {
        str = str + e.name + "/";
      });
      str = str.slice(0, -1);
      return str;
    },
    dealWithTime(num) {
      if (num != num) {
        return "00:00";
      }
      num = parseInt(num);
      let min = parseInt(num / 60) % 60;
      let hour = parseInt(min / 60);
      let sec = num % 60;
      sec = sec < 10 ? "0" + sec : sec;
      min = min < 10 ? "0" + min : min;
      hour = hour > 0 ? hour + ":" : "";
      return hour + min + ":" + sec;
    },
    togglePlayChange() {
      this.$emit("togglePlay");
    },
    hasLike() {
      this.likeStatus = false;
      this.user.fav.song.forEach((e) => {
        if (e.songId == this.songId) {
          this.likeStatus = true;
          return;
        }
      });
    },
    toggleLike() {
      if (this.likeStatus) {
        this.delFavSong(this.songId);
        this.likeStatus = false;
      } else {
        this.addFavSong({
          songId: this.songId,
          cover: this.playbar.songData.img1,
          songName: this.playbar.songData.songName,
          singerList: this.playbar.songData.singerList,
          albumId: this.playbar.songData.albumId,
          album: this.playbar.songData.album,
          toneFlag:this.playList.listData[this.playList.highLight].toneFlag
        });
        this.likeStatus = true;
      }
    },
    moveProgress(e) {
      console.log(e.offsetX);
    },
    nextSong() {
      let nextSongIndex = this.playList.highLight + 1;
      nextSongIndex = nextSongIndex % this.playList.listData.length;
      this.playOnList({
        data: this.playList.listData[nextSongIndex],
        index: nextSongIndex,
      });
      this.changeHighNum(nextSongIndex);
    },
    preSong() {
      let preSongIndex = this.playList.highLight - 1;
      preSongIndex =
        preSongIndex < 0 ? this.playList.listData.length - 1 : preSongIndex;
      this.playOnList({
        data: this.playList.listData[preSongIndex],
        index: preSongIndex,
      });
      this.changeHighNum(preSongIndex);
    },
    stopPlay() {
      this.$emit("stopPlay");
    },
    changeLoop() {
      this.$emit("changeLoop");
    },
    ...mapMutations(["changeHighNum", "addFavSong", "delFavSong"]),
    ...mapActions(["playOnList"]),
  },
};
</script>
<style lang="scss">
.play-info {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 500;
  overflow: hidden;
  header {
    position: relative;
    width: 100vw;
    height: 8vh;
    // text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    i {
      position: absolute;
      left: 20px;
      // top: calc((8vh - 25px) / 2);
      bottom: 10px;
      font-size: 25px;
      color: white;
    }
    .title {
      width: 60vw;
      text-align: center;
      margin: 0 auto;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: 4px;
      .song-name {
        width: 100%;
      }
      .name {
        display: inline-block;
        letter-spacing: 1px;
        font-size: 16px;
        color: white;
        // margin-right: 50px;
        flex-grow: 1;
      }
      .singer {
        margin-top: 5px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  main {
    width: 100vw;
    height: 72vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .album {
      width: 300px;
      height: 300px;
      border-radius: 999px;
      background-image: url("@/assets/SpecialAlbum.svg");
      background-size: cover;
      background-repeat: no-repeat;
      img {
        position: absolute;
        top: 50px;
        left: 50px;
        display: block;
        width: 200px;
        height: auto;
        // border: 5px solid rgba(128, 128, 128, 0.5);
        border-radius: 999px;
        // transform: scale(.6);
      }
    }

    .lrc-container {
      width: 100vw;
      text-align: center;
      height: 52vh;
      overflow: auto;
      transition: all 1s linear;
      &::-webkit-scrollbar {
        display: none;
      }
      .lrc-item {
        min-height: 4vh;
        line-height: 4vh;
        width: 80vw;
        margin: 0 auto;
        color: #aaa;
      }
      .active {
        color: #fff;
      }
    }
  }
  footer {
    height: 20vh;
    .nav {
      display: flex;
      justify-content: space-evenly;
      .nav-item {
        width: 25px;
        height: 25px;
        // background-color: aquamarine;
        // background: url("@/assets/MoreFunction.svg") no-repeat;
        // background: url("@/assets/Comment.svg") no-repeat;
        background: url("@/assets/Comment.svg") no-repeat;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        transform: scale(0.9);
      }
      .like {
        background-image: url("@/assets/ActiveHeart.svg");
      }
      .comment {
        background-image: url("@/assets/Comment.svg");
      }
      .tone-flag {
        background-image: url("@/assets/Album_Empty.svg");
      }
      .more {
        background-image: url("@/assets/MoreFunctionWhite.svg");
      }
    }
    .play-control {
      margin-top: 30px;
      .progress-container {
        width: 70%;
        position: relative;
        margin: 0 auto;
        .time {
          position: absolute;
          left: -40px;
          top: 4px;
          font-size: 10px;
          color: #fff;
        }
        .end-time {
          position: absolute;
          top: 4px;
          right: -40px;
          font-size: 10px;
          color: #fff;
        }
        .progress {
          width: 100%;
          height: 2px;
          opacity: 0.6;
          margin: 0 auto;
          padding: 8px 0 8px;
          // transform: scaleY(0.5);
        }
        .point {
          position: absolute;
          top: 5px;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background-color: white;
        }
      }
      .play-btn {
        height: calc(20vh - 72px);
        // margin-top: 30px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .btn {
          width: 25px;
          height: 25px;
          // background-color: red;
          // background: url("@/assets/RandomPlay.svg") no-repeat;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        // .co-singer {
        //   background-image: url("@/assets/SingleTuneCirculation.svg");
        // }
        .single-loop {
          background-image: url("@/assets/SingleTuneCirculationWhite.svg");
        }
        .turn-loop {
          background-image: url("@/assets/SequentialplayWhite.svg");
        }
        .random-loop {
          background-image: url("@/assets/RandomPlayWhite.svg");
        }
        .co-random {
          background-image: url("@/assets/RandomPlay.svg");
        }
        .co-pre {
          background-image: url("@/assets/Previous.svg");
        }
        .co-play {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border-radius: 999px;
          border: 1px solid #ffffff;
          svg:first-child {
            display: block;
            position: relative;
            left: 2px;
          }
        }
        .co-pause {
          width: 40px;
          height: 40px;
          background-image: url("@/assets/Pause.svg");
        }
        .co-next {
          background-image: url("@/assets/Next.svg");
        }
        .co-list {
          background-image: url("@/assets/PlayListMusic5.svg");
        }
      }
    }
  }
  .glass {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    transform: scale(2);
    filter: blur(30px);
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 1) 50%,
        rgba(0, 0, 0, 1) 100%
      );
      // background-size: cover;
      // background-position: center center;
      opacity: 0.4;
    }
  }
}
.list-enter {
  height: 0px;
}

.list-leave {
  height: 60vh;
}
.list-leave-to {
  height: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-in;
}
</style>
<style>
.album {
  animation: move 50s linear infinite;
}
@keyframes move {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>