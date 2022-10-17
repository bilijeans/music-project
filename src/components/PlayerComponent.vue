<template>
  <div>
    <audio
      ref="play"
      Loadstart
      @play="getPlayData"
      autoplay
      :src="playbar.playURL"
    ></audio>
    <div class="playbar">
      <div
        ref="cover"
        class="play-cover"
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
      <div class="title" ref="title" v-show="playbar.playURL">
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
      <play-list-component
        v-show="playListShow"
        :status="playListShow"
        @packUp="pickUpList"
      ></play-list-component>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import PlayListComponent from "./PlayListComponent.vue";
export default {
  components: { PlayListComponent },
  data() {
    return {
      duration: 0,
      currentTime: 0,
      playStatus: false,
      playListShow: false,
      titleShow: false,
      time: null,
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
    ...mapState(["playbar"]),
  },
  watch: {
    playStatus() {
      console.log(this.playStatus);
      if (this.playStatus) {
        console.log(1);
        this.$nextTick(() => {
          console.log(this.$refs.cover.style.animationPlayState);
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
      // console.log(1);
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
    getTitleStyle() {
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
    ...mapMutations(["toggleStatus", "addToList"]),
  },
  beforeDestroy() {
    this.$refs.play.removeEventListener("timeupdate", this.getPlayTime);
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
  .play-cover {
    position: absolute;
    top: calc(((6vh - 50px) / 2) - 10px);
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 999px;
    overflow: hidden;
    background-image: url('@/assets/Album.png');

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
  .title {
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