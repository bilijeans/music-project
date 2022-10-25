<template>
  <div class="play-info" v-if="playbar.songData">
    <header>
      <i class="wd-icon-arrow-down" @click="pickUp"></i>
      <div class="title">
        <p class="name">
          {{ playbar.songData ? playbar.songData.songName : "" }}
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
        <div class="lrc-container" v-if="playbar.lrcData">
          <p
            class="lrc-item"
            :class="{ active: highLightLrcIndex == index }"
            v-for="(item, index) in playbar.lrcData"
            :key="index"
          >
            {{ item.value }}
          </p>
        </div>
      </div>
    </main>
    <footer>
      <div class="nav">
        <div class="nav-item like"></div>
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
            :percentage="currentRate"
            hide-text
            color="#000000"
          />
          <div class="point" :style="{ left: `${currentRate - 1}%` }"></div>
        </div>
        <div class="play-btn">
          <div class="co-loop btn"></div>
          <div class="co-pre btn" @click="preSong"></div>
          <div
            class="btn"
            :class="{ 'co-play': !playStatus, 'co-pause': playStatus }"
            @click="togglePlayChange"
          ></div>
          <div class="co-next btn" @click="nextSong"></div>
          <div class="co-list btn"></div>
        </div>
      </div>
    </footer>
    <div
      class="glass"
      :style="{
        background: `url(${
          'http://d.musicapp.migu.cn' + playbar.songData.img2
        }) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        transform: 'scale(2)',
        filter: 'blur(0px)',
      }"
    ></div>
  </div>
  <!--        
    
  backdropFilter: 'blur(1000px)',
 -->
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    currentRate: Number,
    currentTime: Number,
    duration: Number,
    playStatus: Boolean,
  },
  data() {
    return {
      lrcToggle: false,
    };
  },
  computed: {
    highLightLrcIndex() {
      console.log(this.currentTime);
      if (this.playbar.lrcData) {
        console.log(1);
        for (let i = 0; i < this.playbar.lrcData.length; i++) {
          console.log(2);
          if (this.playbar.lrcData[i].time > this.currentTime) {
            console.log(3);
            return i - 1;
          }
        }
      }
      return 0;
    },
    ...mapState(["playbar", "playList"]),
  },
  methods: {
    pickUp() {
      this.$emit("packUpPlayInfo");
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
    ...mapMutations(["changeHighNum"]),
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
      text-align: center;
      margin-bottom: 4px;
      .name {
        letter-spacing: 1px;
        font-size: 16px;
        color: white;
      }
      .singer {
        margin-top: 5px;
        font-size: 12px;
        // transform: scale(0.9);
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
      height: 56vh;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .lrc-item {
        line-height: 4vh;
        color: #999;
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
        background-image: url("@/assets/AcousticFidelity.svg");
      }
      .more {
        background-image: url("@/assets/MoreFunction.svg");
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
        .co-singer {
          background-image: url("@/assets/SingleTuneCirculation.svg");
        }
        .co-loop {
          background-image: url("@/assets/Sequentialplay.svg");
        }
        .co-random {
          background-image: url("@/assets/RandomPlay.svg");
        }
        .co-pre {
          background-image: url("@/assets/Previous.svg");
        }
        .co-play {
          width: 40px;
          height: 40px;
          background-image: url("@/assets/play.svg");
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
          background-image: url("@/assets/PlayListMusic4.svg");
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
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      // background-image: linear-gradient(black, white, black);
      // opacity: 0.7;
    }
  }
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