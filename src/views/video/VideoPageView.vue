<template>
  <div class="video-page" @click="isPlayOrNot">
    <header>
      <div class="back-left-arrow" @click="goBack">
        <wd-icon name="arrow-left" color="#fff"></wd-icon>
      </div>
      <div class="more">
        <img src="@/assets/MoreFunctionWhite.svg" alt="" />
      </div>
    </header>
    <main>
      <video id="myVideo" class="video-js vjs-default-skin" preload="auto">
        <source
          :src="videoPage ? videoPage.playUrl : ''"
          type="application/x-mpegURL"
        />
      </video>

      <div class="play-video" v-show="isPlay">
        <img src="@/assets/videoPlay.svg" />
      </div>
    </main>
    <footer>
      <p class="mv">MV</p>
      <p class="mes">{{ videoPage ? videoPage.mes : "" }}</p>
      <div class="singerName">
        <p>{{ videoPage ? videoPage.singerName : "" }}</p>
        <wd-icon
          class="arrow-right"
          name="arrow-right"
          color="#fff"
          size="12px"
        ></wd-icon>
      </div>

      <div class="slide">
        <div class="silde-active">
          <i></i>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="scroll-name">
          <img src="/img/like.e498651b.svg" alt="" />
          <div class="scroll-text">
            <p ref="scrollText">
              <span class="s-text" ref="sText" :class="{ active: isShorter }">{{
                videoPage ? videoPage.mes : ""
              }}</span>
            </p>
          </div>
        </div>
        <div class="revolve-image" :class="{ active: isPlay }">
          <img :src="videoPage ? videoPage.image : ''" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import videojs from "video.js";
import "videojs-contrib-hls";
export default {
  data() {
    return {
      id: null,
      videoPage: {},
      isPlay: false,
      isShorter: false,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getVideoPage();
  },
  mounted() {
      this.getvideo();
  },
  destroyed() {},
  methods: {
    getvideo() {
      videojs(
        "myVideo",
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true,
        },
        function () {
          this.play();
        }
      );
    },
    getVideoPage() {
      this.$axios({
        methods: "GET",
        url: `MIGUM3.0/strategy/mvplayinfo/by-priority/v1.0?canFallback=true&contentId=${this.id}&formatType=PQ`,
        headers: {
          channel: "0146921",
        },
      }).then(({ data }) => {
        this.videoPage = data.data;

        const mes = this.$route.query.mes;

        const singerName = this.$route.query.singerName;

        const image = this.$route.query.image;

        this.videoPage = {
          ...this.videoPage,
          mes,
          singerName,
          image,
        };

        console.log(this.videoPage);

        this.$nextTick(() => {
          this.scrollTitleHandel();
        });
      });
    },
    goBack() {
      this.$router.go(-1);
    },

    isPlayOrNot() {
      this.isPlay = !this.isPlay;
    },

    scrollTitleHandel() {
      if (this.$refs.scrollText.clientWidth > this.$refs.sText.clientWidth) {
        this.isShorter = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
  height: 25vh;
  width: 100vw;
  position: absolute;
  top: 30vh;

  video {
    height: 100%;
    width: 100%;
  }

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
  // height: 25vh;
  width: 100vw;
  color: #fff;
  position: absolute;
  bottom: 0;

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

  .slide {
    height: 2px;
    width: 100vw;
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

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4vw;
    margin: 2vh 0 3vh 0;
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

          &.active {
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
</style>