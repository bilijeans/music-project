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
      <div ref="cover" class="play-cover" :style="{animationPlayState:playbar.status?'running':'paused'}">
        <img
          :src="
            playbar.songData ? playbar.songData.albumItem.imgItems[0].img : ''
          "
        />
      </div>
      <div class="title"></div>
      <div class="play" @click="togglePlay">
        <img
          class="play-btn"
          v-show="!playbar.status"
          src="@/assets/play.svg"
        />
        <img
          class="pause-btn"
          v-show="playbar.status"
          src="@/assets/Pause.svg"
        />
        <van-circle
          v-model="currentRate"
          :rate="currentRate"
          :speed="100"
          color="rgb(255, 70, 70)"
          layer-color="rgba(176, 176, 176, 0.4)"
          size="30"
          stroke-width="70"
        />
      </div>
      <div class="song-list">
        <img class="song-list-btn" src="@/assets/PlayListMusic4.svg" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      duration: 0,
      currentTime: 0,
      playStatus: false,
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
    ...mapState(["playbar", "playbar.status", "playbar.songData"]),
  },
  methods: {
    getPlayData() {
      this.duration = this.$refs.play.duration;
      this.$refs.play.addEventListener("timeupdate", this.getPlayTime);
    },
    getPlayTime() {
      this.currentTime = this.$refs.play.currentTime;
    },
    togglePlay() {
      this.playbar.status ? this.$refs.play.pause() : this.$refs.play.play();
      this.toggleStatus();
    },
    ...mapMutations(["toggleStatus"]),
  },
};
</script>
<style lang="scss">
.playbar {
  position: fixed;
  bottom: 0px;
  width: 100vw;
  height: 8vh;
  background-color: rgb(242, 254, 74);
  .play-cover {
    width: 50px;
    height: 50px;
    border-radius: 999px;
    overflow: hidden;
    background-image: url('@/assets/album.png');
    background-size: cover;
    background-repeat: no-repeat;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}
.play {
  position: absolute;
  right: 50px;
  top: calc((8vh - 30px) / 2);
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
  top: calc((8vh - 20px) / 2);
  right: 10px;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
<style>
.play-cover {
  animation: move 20s linear infinite;
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