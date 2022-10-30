<template>
  <div>
    <audio
      ref="play"
      Loadstart
      @play="getPlayData"
      @ended="witchNext"
      autoplay
      :src="playbar.playURL"
    ></audio>
    <div class="playbar">
      <div
        ref="cover"
        class="play-cover"
        @click="showSongInfo"
        :style="{ animationPlayState: playbar.status ? 'running' : 'paused' }"
      >
        <img
          :src="
            playbar.songData
              ? 'http://d.musicapp.migu.cn' + playbar.songData.img2
              : ''
          "
        />
      </div>
      <transition name="info">
        <play-info-component
          v-show="playInfoShow"
          :currentRate="currentRate"
          :currentTime="currentTime"
          :duration="duration"
          :playStatus="playStatus"
          :loop="loop"
          @packUpPlayInfo="pickUpInfo"
          @togglePlay="togglePlay"
          @changeLoop="changeLoop"
          @stopPlay="stopPlay"
        ></play-info-component>
      </transition>
      <div class="play-title" ref="title" v-show="playbar.playURL">
        <div class="span-container" ref="spanTitle">
          <div ref="firstSpan" class="first-span">
            <span class="song-name">
              {{ playbar.songData ? playbar.songData.songName : "" }}
            </span>
            <span>-</span>
            <span class="singer-name">
              {{
                playbar.songData
                  ? dealWithSingerName(playbar.songData.singerList)
                  : ""
              }}
            </span>
          </div>
          <div class="second-span" v-if="titleShow">
            <span class="song-name">
              {{ playbar.songData ? playbar.songData.songName : "" }}
            </span>
            <span>-</span>
            <span class="singer-name">
              {{
                playbar.songData
                  ? dealWithSingerName(playbar.songData.singerList)
                  : ""
              }}
            </span>
          </div>
        </div>
      </div>
      <div class="play" @click="togglePlay">
        <img
          class="play-btn"
          v-show="!playStatus"
          @click="togglePlay"
          src="@/assets/play.svg"
        />
        <img
          class="pause-btn"
          v-show="playStatus"
          @click="togglePlay"
          src="@/assets/Pause.svg"
        />
        <van-circle
          v-model="currentRate"
          :rate="currentRate"
          :speed="100"
          color="rgb(255, 70, 70)"
          layer-color="rgba(176, 176, 176, 0.7)"
          size="30"
          stroke-width="40"
        />
      </div>
      <div class="song-list" @click="playListShow = true">
        <img class="song-list-btn" src="@/assets/PlayListMusic4.svg" />
      </div>
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
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import PlayInfoComponent from "./PlayInfoComponent.vue";
import PlayListComponent from "./PlayListComponent.vue";
export default {
  components: { PlayListComponent, PlayInfoComponent },
  data() {
    return {
      duration: 0,
      currentTime: 0,
      playStatus: false,
      playListShow: false,
      titleShow: false,
      time: null,
      playInfoShow: false,
      loop: 0,
    };
  },
  computed: {
    currentRate: {
      get() {
        return this.duration
          ? parseInt((this.currentTime / this.duration) * 100)
          : 0;
      },
      set() {},
    },
    ...mapState(["playbar", "playList"]),
    ...mapState({
      listData: (state) => state.playList.listData,
      songId: (state) => state.playbar.playId,
    }),
  },
  watch: {
    playStatus() {
      if (this.playStatus) {
        this.$nextTick(() => {
          this.$refs.cover.style.animationPlayState = "running";
        });
      } else {
        this.$nextTick(() => {
          this.$refs.cover.style.animationPlayState = "paused";
        });
      }
    },
  },
  methods: {
    getPlayData() {
      this.duration = this.$refs.play.duration;
      this.playStatus = true;
      this.getTitleStyle();
      this.$refs.play.addEventListener("timeupdate", this.getPlayTime);
    },
    getPlayTime() {
      this.currentTime = this.$refs.play.currentTime
        ? this.$refs.play.currentTime
        : 0;
    },
    togglePlay() {
      if (this.$refs.play.src) {
        this.playStatus ? this.$refs.play.pause() : this.$refs.play.play();
        this.playStatus = !this.playStatus;
      } else {
        this.playStatus = false;
      }
    },
    dealWithSingerName(arr) {
      let str = "";
      arr.forEach((e) => {
        str = str + e.name + "/";
      });
      str = str.slice(0, -1);
      return str;
    },
    pickUpList() {
      this.playListShow = false;
    },
    showSongInfo() {
      if (this.playbar.songData) {
        this.playInfoShow = true;
      } else {
        this.playInfoShow = false;
      }
    },
    pickUpInfo() {
      this.playInfoShow = false;
    },
    getTitleStyle() {
      this.titleShow = false;
      clearInterval(this.time);
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
    witchNext() {
      if (this.loop == 0) {
        this.playSingleSong();
      } else if (this.loop == 1) {
        this.nextSong();
      } else {
        this.playRandomSong();
      }
    },
    playSingleSong() {
      this.playOnList({
        data: this.listData[this.playList.highLight],
        index: this.playList.highLight,
      });
      this.changeHighNum(this.playList.highLight);
    },
    nextSong() {
      let nextSongIndex = 0;
      this.listData.forEach((e, i) => {
        if (e.songId == this.songId) {
          nextSongIndex = i + 1;
        }
      });
      nextSongIndex = nextSongIndex % this.listData.length;
      this.playOnList({
        data: this.listData[nextSongIndex],
        index: nextSongIndex,
      });
      this.changeHighNum(nextSongIndex);
    },
    playRandomSong() {
      let maxNum = this.playList.listData.length;
      let randomNum = Math.floor(Math.random() * maxNum);
      this.playOnList({
        data: this.listData[randomNum],
        index: randomNum,
      });
      this.changeHighNum(randomNum);
    },
    changeLoop() {
      this.loop = (this.loop + 1) % 3;
    },
    stopPlay(){
      // console.log(11);
      this.playStatus = false
      this.$refs.play.pause()
    },
    ...mapMutations(["toggleStatus", "addToList", "changeHighNum"]),
    ...mapActions(["getPlayURL", "playOnList"]),
  },
  beforeDestroy() {
    this.$refs.play.removeEventListener("timeupdate", this.getPlayTime);
    clearInterval(this.time);
  },
};
</script>
<style lang="scss">
.playbar {
  position: fixed;
  bottom: -1px;
  width: 100vw;
  height: 6vh;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgba(123, 123, 123, 0.4);
  z-index: 200;
  .play-cover {
    position: absolute;
    top: calc(((6vh - 50px) / 2) - 10px);
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 999px;
    overflow: hidden;
    background-image: url("@/assets/SpecialAlbum.svg");
    background-size: cover;
    background-repeat: no-repeat;
    img {
      position: absolute;
      top: 10px;
      left: 10px;
      display: block;
      width: 30px;
      height: auto;
      border-radius: 999px;
    }
  }
  .play-title {
    position: absolute;
    top: calc((6vh - 30px) / 2);
    left: 80px;
    width: 50vw;
    overflow: hidden;
    white-space: nowrap;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    .span-container {
      display: flex;
    }
    .second-span {
      margin-left: 50px;
    }
  }
  .info-enter {
    height: 0px;
  }

  .info-leave {
    height: 60vh;
  }
  .info-leave-to {
    height: 0;
  }
  .info-enter-active,
  .info-leave-active {
    transition: all 0.2s ease-in;
  }
}
.play {
  position: absolute;
  right: 50px;
  top: calc((6vh - 30px) / 2);
  width: 30px;
  height: 30px;
  img {
    display: block;
    position: absolute;
    top: 7px;
    width: 15px;
    height: 15px;
    font-size: 1;
  }
  .play-btn {
    left: 9px;
  }
  .pause-btn {
    left: 7.5px;
  }
}
.song-list {
  position: absolute;
  top: calc((6vh - 20px) / 2);
  right: 10px;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
<style>
.play-cover {
  animation: move 30s linear infinite;
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