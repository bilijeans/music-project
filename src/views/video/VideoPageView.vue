<template>
  <div class="video-page">
    <van-swipe
      style="height: 100vh"
      vertical
      :touchable="vertical"
      @change="onChange"
      :show-indicators="false"
    >
      <van-swipe-item v-for="(i, index) in allVideo" :key="index">
        <div class="video-mask" @click="isPlayOrNot" v-show="!isLand"></div>

        <header>
          <div class="back-left-arrow" @click="goBack" v-show="!isLand">
            <wd-icon name="arrow-left" color="#fff"></wd-icon>
          </div>

          <div class="more" v-show="!isLand">
            <img src="@/assets/MoreFunctionWhite.svg" alt="" />
          </div>
        </header>

        <main :class="{ landActive: isLand }">
          <div class="video-box" ref="videoBox">
            <video ref="video" class="video-js video" :poster="i.img"></video>
          </div>

          <div class="land-scape" @click="setLand" v-show="!isLand">
            <img src="@/assets/landScape.svg" alt="" />
          </div>

          <div class="comment-list" v-show="!isLand">
            <div class="video-heart">
              <div
                :class="{ likeActive: isLike }"
                @click="isLike = !isLike"
              ></div>
            </div>

            <img src="@/assets/videoComment.svg" @click="goToComment" />

            <img src="@/assets/videoShare.svg" />
          </div>

          <div class="play-video" v-show="isPlay">
            <img src="@/assets/videoPlay.svg" />
          </div>
        </main>

        <footer v-show="!isLand">
          <div class="message-box">
            <p class="mv" v-show="!isSliding">MV</p>

            <p class="mes" v-show="!isSliding">
              {{ i.txt }}
            </p>

            <div class="singerName" v-show="!isSliding">
              <p>{{ i.txt2 }}</p>

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
                    >{{ i.txt }}
                  </span>
                </p>
              </div>
            </div>

            <div
              class="revolve-image"
              :class="{ active: isPlay }"
              v-show="!isSliding"
            >
              <img
                :src="
                  videoMessage.singers ? videoMessage.singers[0].avatar : ''
                "
              />
            </div>
          </div>
        </footer>

        <div class="landing-page" v-show="isLand">
          <!-- <div class="tips" v-show="showTip">已成功切换至{{ Definition }}</div> -->

          <div class="land-page-mask" @click.prevent="videoLandPlayOrNot"></div>

          <div class="land-footer" v-show="isShowLandControl">
            <div class="land-current-time">
              {{ time.currentTime.min }}:{{ time.currentTime.second }}
            </div>

            <div
              class="land-slide-mask"
              @touchmove="landMoveHandel"
              @touchstart.stop="landDownHandel"
            ></div>

            <div class="land-slide-box">
              <div class="land-slider">
                <div class="land-slider-active" ref="landSlideActive">
                  <i></i>
                </div>
              </div>
            </div>

            <div class="land-time">
              {{ time.duration.min }}:{{ time.duration.second }}
            </div>

            <div class="definition">
              <p class="default-definition" @click="showChooseDefinition">
                {{ Definition }}
              </p>

              <div class="select-definition" v-show="isChooseDefinition">
                <p
                  v-for="(item, index) in videoMessage.rateFormats"
                  :key="index"
                  @click="pickDefinition(item.formatDesc, item.formatType)"
                >
                  {{ item.formatDesc }}
                </p>
              </div>
            </div>
          </div>

          <div class="land-header" v-show="isShowLandControl">
            <div class="land-back-left-arrow" @click="cancelFullScreen">
              <wd-icon name="arrow-left" color="#fff"></wd-icon>
            </div>

            <div class="land-more">
              <img src="@/assets/MoreFunctionWhite.svg" alt="" />
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:'',
      index: 0,
      allVideo: [],
      videoPage: {},
      videoMessage: {},
      videoUrl: "",
      isPlay: false,
      isShorter: false,
      player: null,
      timer: null,
      vertical: true,
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
      getLandTime: null,
      isSliding: false,
      isLike: false,
      isLand: false,
      isChooseDefinition: false,
      Definition: "标清",
      DefinitionE: "PQ",
      isShowLandControl: true,
      showControlTime: null,
      showTip: false,
      keepCurrentTime: 0,
    };
  },
  created() {
    this.videoListHandel();
    this.getVideoMessage();
    this.getVideoPage();
  },
  mounted() {
    window.addEventListener("resize", this.renderResize, false);
  },
  methods: {
     renderResize() {
        // 判断横竖屏
        let width = document.documentElement.clientWidth
        let height = document.documentElement.clientHeight
        if(width > height) {
            console.log('横屏')
        }else{
          console.log('竖屏')
        }
  
    },
    videoListHandel() {
      let tapIndex = this.$route.query.index;
      let allVideoArr = this.$route.query.videoList;
      allVideoArr = JSON.parse(allVideoArr).data;
      let handelArrStart = [];
      let handelArrEnd = allVideoArr;
      if (tapIndex != 0) {
        handelArrStart = allVideoArr.slice(0, tapIndex);
        handelArrEnd = allVideoArr.slice(tapIndex);
        handelArrStart.forEach((i) => {
          handelArrEnd.push(i);
        });
      }

      this.allVideo = handelArrEnd;
    },
    getVideoMessage() {
      let id = this.allVideo[this.index].resId;
      this.$axios
        .get(
          `/MIGUM3.0/bmw/mv/by-contentId/v1.0?contentId=${id}&resourceType=D`
        )
        .then(({ data }) => {
          this.videoMessage = data.data;
        });
    },
    getVideoPage() {
      this.id = this.allVideo[this.index].resId;
      this.$axios({
        methods: "GET",
        url: `MIGUM3.0/strategy/mvplayinfo/by-priority/v1.0?canFallback=true&contentId=${this.id}&formatType=${this.DefinitionE}`,
        headers: {
          channel: "0146921",
        },
      }).then(({ data }) => {
        this.videoPage = data.data;
        this.videoUrl = this.videoPage.playUrl.slice(31);
        this.$nextTick(() => {
          this.videoInit();
          this.player.currentTime(this.keepCurrentTime);
          if (!this.isLand) {
            this.scrollTitleHandel();
            this.playProgress();
          }
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
      if (
        this.$refs.scrollText[this.index].clientWidth >
        this.$refs.sText[this.index].offsetWidth
      ) {
        this.isShorter = true;
      }
    },

    playProgress() {
      if (this.isPlay) {
        clearInterval(this.timer);
        return;
      }
      this.timer = setInterval(() => {
        this.$refs.slideActive[this.index].style.width = `${
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
      let duration = parseInt(this.player.duration());
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
      let duration = parseInt(this.player.duration());
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

    onChange(index) {
      this.keepCurrentTime = 0;
      this.DefinitionE = "PQ";
      this.Definition = "标清";
      this.index = index;
      this.isPlay = false;
      clearInterval(this.timer);
      this.getVideoPage();
    },

    setLand() {
      this.vertical = false;
      this.isLand = !this.isLand;
      this.showControlTimeF();
      clearInterval(this.timer);

      this.timer = setInterval(() => {
        this.$refs.landSlideActive[this.index].style.height = `${
          (this.player.currentTime() / this.player.duration()) * 100
        }%`;
      }, 10);

      this.getLandTime = setInterval(() => {
        let current = parseInt(this.player.currentTime());
        let duration = parseInt(this.player.duration());
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
      });
    },

    cancelFullScreen() {
      this.vertical = true;
      clearInterval(this.getLandTime);
      clearInterval(this.timer);
      this.isLand = !this.isLand;
      this.playProgress();
    },

    videoLandPlayOrNot() {
      if (this.isShowLandControl) {
        this.isPlay = !this.isPlay;
        if (this.player.paused()) {
          this.player.play();
        } else {
          this.player.pause();
        }
      }
      this.isShowLandControl = true;
      this.showControlTimeF();
    },

    showControlTimeF() {
      if (this.showControlTime) {
        clearTimeout(this.showControlTime);
      }
      this.showControlTime = setTimeout(() => {
        this.isShowLandControl = false;
        clearTimeout(this.showControlTime);
        this.showControlTime = null;
      }, 5000);
    },

    pickDefinition(formatDesc, formatType) {
      this.keepCurrentTime = this.player.currentTime();
      this.showControlTimeF();
      this.Definition = formatDesc;
      this.isChooseDefinition = !this.isChooseDefinition;
      this.DefinitionE = formatType;
      this.isPlay = false;
      console.log(this.$refs.video[this.index]);
      this.$refs.video[this.index].removeAttribute("data-setup");
      this.getVideoPage();
    },

    landDownHandel(e) {
      this.showControlTimeF();
      if (this.player.paused()) {
        this.isPlay = false;
        this.player.play();
      }
      let sliderY =
        e.targetTouches[0].pageY - e.targetTouches[0].target.offsetTop;
      let sliderHeight = e.targetTouches[0].target.offsetHeight;
      let setTime = parseInt((sliderY * this.player.duration()) / sliderHeight);
      this.player.currentTime(setTime);
    },

    landMoveHandel(e) {
      this.showControlTimeF();
      if (this.player.paused()) {
        this.isPlay = false;
        this.player.play();
      }
      let sliderY =
        e.targetTouches[0].pageY - e.targetTouches[0].target.offsetTop;
      let sliderHeight = e.targetTouches[0].target.clientHeight;
      let setTime = parseInt((sliderY * this.player.duration()) / sliderHeight);
      this.player.currentTime(setTime);
    },

    showChooseDefinition() {
      this.isChooseDefinition = !this.isChooseDefinition;
      if (this.isChooseDefinition) {
        clearTimeout(this.showControlTime);
        this.isShowLandControl = true;
      } else {
        this.showControlTimeF();
      }
    },

    videoInit() {
      let video = this.$refs.video[this.index];
      video.setAttribute("data-setup", '{"aspectRatio":"3:2"}');
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
    },

    goToComment(){
      this.$router.push({
        path:'/morefunc-comment',
        query:{
          id: this.id,
          type: 'D'
        }
      })
    }
  },

  destroyed() {
    if (this.player) {
      this.player.dispose();
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.getLandTime) {
      clearInterval(this.getLandTime);
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
.video-page {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  z-index: 210;
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
  width: 100vw;
  height: 35vh;
  position: absolute;
  top: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .video-box {
    width: 100%;
  }

  &.landActive {
    left: -34vw;
    width: 167vw;
    height: 50vh;
    transform: rotateZ(90deg);
  }

  .land-scape {
    position: absolute;
    top: 14vh;
    left: 5vw;
    z-index: 30;
  }

  .comment-list {
    height: 20vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    right: 5vw;
    top: 30vh;
    z-index: 30;
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

.video-heart {
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    height: 32px;
    width: 32px;
    background-image: url(@/assets/videoHeart.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    &.likeActive {
      animation: like 0.2s linear;
      background-image: url(@/assets/videoRedHeart.svg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
    }

    @keyframes like {
      from {
        background-image: url(@/assets/videoHeart.svg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }

      25% {
        height: 35px;
        width: 35px;
        background-image: url(@/assets/videoRedHeart.svg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }

      50% {
        height: 27px;
        width: 27px;
        background-image: url(@/assets/videoRedHeart.svg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }

      75% {
        height: 35px;
        width: 35px;
        background-image: url(@/assets/videoRedHeart.svg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }

      to {
        height: 27px;
        width: 27px;
        background-image: url(@/assets/videoRedHeart.svg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }
    }
  }
}

.landing-page {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0%;
  display: flex;
  justify-content: space-between;

  .tips {
    position: absolute;
    top: 45vh;
    left: 40vw;
    font-size: 12px;
    color: #fff;
    transform: rotateZ(90deg);
  }

  .land-page-mask {
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0%;
    left: 0%;
    bottom: 0%;
    right: 0%;
  }

  .land-header {
    height: 100vh;
    width: 10vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    .land-back-left-arrow {
      transform: rotateZ(90deg);
      position: absolute;
      top: 1vh;
      right: 3vw;
    }
    .land-more {
      transform: rotateZ(90deg);
      position: absolute;
      bottom: 1vh;
      right: 3vw;
    }
  }

  .land-footer {
    height: 100vh;
    width: 10vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    position: relative;

    .land-play {
      height: 32px;
      width: 32px;
      background-image: url(@/assets/videoFullScreenPlay.svg);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      transform: rotateZ(90deg);
      position: absolute;
      top: 1vh;
      left: 1vw;

      &.landPause {
        background-image: url(@/assets/videoFullScreenPuase.svg);
      }
    }

    .definition {
      position: absolute;
      left: -2vw;
      bottom: 4vh;
      transform: rotateZ(90deg);
      .default-definition {
        color: #fff;
        width: 15vw;
        font-size: 13px;
        padding: 2px 0;
        text-align: center;
        border: 2px solid #fff;
        border-radius: 5px;
      }

      .select-definition {
        width: 20vw;
        background-color: #333;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 4vh;
        left: -3vw;

        p {
          font-size: 13px;
          color: #fff;
          padding: 1px 2px;
          margin: 5px 0;
          white-space: nowrap;
          border-radius: 5px;
          border: 2px solid #fff;
        }
      }
    }

    .land-time {
      color: #fff;
      font-size: 12px;
      height: 10vw;
      line-height: 8vw;
      transform: rotateZ(90deg);
      position: absolute;
      bottom: 10vh;
      left: 0vw;
    }

    .land-current-time {
      color: #fff;
      font-size: 12px;
      height: 10vw;
      line-height: 8vw;
      transform: rotateZ(90deg);
      position: absolute;
      top: 2vh;
      left: 0vw;
    }
  }
}
.land-slide-box {
  height: calc(80vh - 32px - 2vh);
  width: 10vw;
  position: absolute;
  top: calc(5vh + 32px);
  right: 0%;
  display: flex;
  justify-content: center;

  .land-slider {
    height: 100%;
    width: 1vw;
    background-color: #666;
    border-radius: 20px;

    .land-slider-active {
      width: 100%;
      height: 0%;
      background-color: #fff;
      border-radius: 20px;
      position: relative;

      i {
        display: inline-block;
        height: 10px;
        width: 10px;
        border-radius: 999px;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        right: -3px;
      }
    }
  }
}
.land-slide-mask {
  height: calc(80vh - 32px - 2vh);
  width: 10vw;
  position: absolute;
  top: calc(5vh + 32px);
  right: 0%;
  // background-color: #fff;
  z-index: 25;
}
</style>