<template>
  <div class="video-page">
    <div class="video-mask" @click="isPlayOrNot"></div>
    <header>
      <div class="back-left-arrow" @click="goBack">
        <wd-icon name="arrow-left" color="#fff"></wd-icon>
      </div>
      <div class="more">
        <img src="@/assets/MoreFunctionWhite.svg" alt="" />
      </div>
    </header>
    <main>
      <video
        ref="video"
        class="video-js video"
        :poster="videoPage ? videoPage.image : ''"
        data-setup="{}"
      ></video>

      <div class="play-video" v-show="isPlay">
        <img src="@/assets/videoPlay.svg" />
      </div>
    </main>
    <footer>
      <div class="message-box">
        <p class="mv" v-show="!isSliding">MV</p>
        <p class="mes" v-show="!isSliding">
          {{ videoPage ? videoPage.mes : "" }}
        </p>
        <div class="singerName" v-show="!isSliding">
          <p>{{ videoPage ? videoPage.singerName : "" }}</p>
          <wd-icon
            class="arrow-right"
            name="arrow-right"
            color="#fff"
            size="12px"
          ></wd-icon>
        </div>
      </div>

      <div
        class="slider-box"
        @touchstart="downHandel"
        @touchmove="moveHandel"
        @touchend="upHandel"
      >
        <div class="currentTime" v-show="isSliding">
          <span class="current-time"
            >{{ time.currentTime.min }}:{{ time.currentTime.second }}
          </span>
          <span> / {{ time.duration.min }}:{{ time.duration.second }}</span>
        </div>
        <div class="slide">
          <div class="silde-active" ref="slideActive">
            <i></i>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="scroll-name" v-show="!isSliding">
          <img src="/img/like.e498651b.svg" alt="" />
          <div class="scroll-text">
            <p ref="scrollText">
              <span
                class="s-text"
                ref="sText"
                :class="{ animationActive: isShorter }"
                >{{ videoPage ? videoPage.mes : "" }}</span
              >
            </p>
          </div>
        </div>
        <div
          class="revolve-image"
          :class="{ active: isPlay }"
          v-show="!isSliding"
        >
          <img :src="videoPage ? videoPage.image : ''" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      videoPage: {},
      videoUrl: "",
      isPlay: false,
      isShorter: false,
      player: null,
      timer: null,
      time: {
        currentTime: {
          min: "00",
          second: "00",
        },
        duration: {
          min: "00",
          second: "00",
        },
      },
      isSliding: false,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getVideoPage();
  },
  methods: {
    getVideoPage() {
      this.$axios({
        methods: "GET",
        url: `MIGUM3.0/strategy/mvplayinfo/by-priority/v1.0?canFallback=true&contentId=${this.id}&formatType=PQ`,
        headers: {
          channel: "0146921",
        },
      }).then(({ data }) => {
        this.videoPage = data.data;

        this.videoUrl = this.videoPage.playUrl.slice(31);

        let mes = this.$route.query.mes;

        let singerName = this.$route.query.singerName;

        let image = this.$route.query.image;

        this.videoPage = {
          ...this.videoPage,
          mes,
          singerName,
          image,
        };

        this.$nextTick(() => {
          let video = this.$refs.video;
          let url = "/apiV/" + this.videoUrl;
          this.player = this.$video(video, {
            controls: false,
            autoplay: true,
            muted: true,
            loop: true,
          });
          this.player.src([
            {
              src: url,
              type: "application/x-mpegURL",
            },
          ]);

          this.scrollTitleHandel();
          this.playProgress();
        });
      });
    },
    goBack() {
      this.$router.go(-1);
    },

    isPlayOrNot() {
      this.isPlay = !this.isPlay;
      if (this.player.paused()) {
        this.player.play();
      } else {
        this.player.pause();
      }
      this.playProgress();
    },

    scrollTitleHandel() {
      if (this.$refs.scrollText.clientWidth > this.$refs.sText.offsetWidth) {
        this.isShorter = true;
      }
    },

    playProgress() {
      if (this.isPlay) {
        clearInterval(this.timer);
        return;
      }
      this.timer = setInterval(() => {
        this.$refs.slideActive.style.width = `${
          (this.player.currentTime() / this.player.duration()) * 100
        }%`;
      }, 10);
    },

    downHandel(e) {
      if (this.player.paused()) {
        this.isPlay = false;
        this.player.play();
        this.playProgress();
      }
      this.isSliding = true;
      let pageX = e.targetTouches[0].pageX;
      let windowX = window.innerWidth;
      let setTime = parseInt((pageX * this.player.duration()) / windowX);
      this.player.currentTime(setTime);
      let current = parseInt(this.player.currentTime());
      let duration = this.player.duration();
      let currentMin = 0;
      let currentSecond = current;
      let min = 0;
      let second = duration;
      if (current > 60) {
        currentMin = parseInt(current / 60);
        currentSecond = current % 60;
      }
      if (duration > 60) {
        min = parseInt(duration / 60);
        second = duration % 60;
      }

      this.time = {
        currentTime: {
          min: currentMin > 9 ? currentMin : "0" + currentMin,
          second: currentSecond > 9 ? currentSecond : "0" + currentSecond,
        },
        duration: {
          min: min > 9 ? min : "0" + min,
          second: second > 9 ? second : "0" + second,
        },
      };
    },

    moveHandel(e) {
      let pageX = e.targetTouches[0].pageX;
      let windowX = window.innerWidth;
      let setTime = parseInt((pageX * this.player.duration()) / windowX);
      this.player.currentTime(setTime);
      let current = parseInt(this.player.currentTime());
      let duration = this.player.duration();
      let currentMin = 0;
      let currentSecond = current;
      let min = 0;
      let second = duration;
      if (current > 60) {
        currentMin = parseInt(current / 60);
        currentSecond = current % 60;
      }
      if (duration > 60) {
        min = parseInt(duration / 60);
        second = duration % 60;
      }

      this.time = {
        currentTime: {
          min: currentMin > 9 ? currentMin : "0" + currentMin,
          second: currentSecond > 9 ? currentSecond : "0" + currentSecond,
        },
        duration: {
          min: min > 9 ? min : "0" + min,
          second: second > 9 ? second : "0" + second,
        },
      };
    },

    upHandel() {
      this.isSliding = false;
    },
  },

  destroyed() {
    this.player.dispose();
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="scss" scoped>
.video-mask {
  height: 70vh;
  width: 100vw;
  position: absolute;
  top: 7vh;
  z-index: 22;
}
.video {
  height: 30vh;
  width: 100vw;
}
.video-page {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  z-index: 21;
}
.back-left-arrow {
  position: absolute;
  top: 3vh;
  left: 3vw;
}
.more {
  position: absolute;
  top: 3vh;
  right: 3vw;
}
main {
  height: 30vh;
  width: 100vw;
  position: absolute;
  top: 25vh;

  .play-video {
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 20px);

    img {
      color: rgb(0, 0, 0, 0.5);
    }
  }
}
footer {
  width: 100vw;
  color: #fff;
  position: absolute;
  bottom: 0;

  .message-box {
    height: 12vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .mv {
      width: 30px;
      height: 20px;
      font-size: 12px;
      text-align: center;
      line-height: 15px;
      border: 2px solid #fff;
      border-radius: 6px;
      margin-left: 10px;
    }
    .mes {
      margin: 5px 0 0 10px;
      width: 70vw;
      line-height: calc(5vh / 2);
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .singerName {
      margin: 0 0 0 10px;
      height: 3vh;
      font-size: 12px;
      display: flex;
      align-items: center;
      p {
        width: 12vw;
        height: 2vh;
        line-height: 2vh;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .footer-bottom {
    height: 6vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4vw;
    margin: 0 0 3vh 0;
    .scroll-name {
      height: 4vh;
      width: 50vw;
      border-radius: 10px;
      background-color: #141414;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 3vw;
      .scroll-text {
        white-space: nowrap;
        width: 80%;
        overflow: hidden;
        font-size: 12px;

        .s-text {
          display: inline-block;
          animation: scrollText 10s linear infinite;

          &.animationActive {
            animation: none;
          }

          @keyframes scrollText {
            from {
              transform: translateX(40vw);
            }

            to {
              transform: translateX(-100%);
            }
          }
        }
      }
    }

    .revolve-image {
      height: 40px;
      width: 40px;
      border-radius: 999px;
      border: 3px solid #aaa;
      animation: move 20s steps(200) infinite;

      &.active {
        animation-play-state: paused;
      }
      img {
        height: 100%;
        width: 100%;
        border-radius: 999px;
      }

      @keyframes move {
        from {
          transform: rotateZ(0deg);
        }

        to {
          transform: rotateZ(360deg);
        }
      }
    }
  }
}

.slider-box {
  height: 5vh;
  display: flex;
  align-items: center;
  position: relative;

  .currentTime {
    text-align: center;
    width: 30vw;
    font-size: 16px;
    position: absolute;
    top: -2vh;
    left: 35vw;

    .current-time {
      color: #aaa;
    }
  }

  .slide {
    height: 2px;
    width: 100%;
    background-color: #666;
    margin: 1vh 0 1vh 0;

    .silde-active {
      height: 100%;
      width: 1%;
      background-color: #fff;
      position: relative;
      i {
        display: inline-block;
        height: 6px;
        width: 6px;
        border-radius: 999px;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: -80%;
      }
    }
  }
}
</style>