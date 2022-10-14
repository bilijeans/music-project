<template>
  <div>
    <audio
      ref="play"
      Loadstart
      @play="getPlayData"
      controls
      :src="playbar.playURL"
    ></audio>
    <!-- <audio controls src="http://freetyst.nf.migu.cn/public/product8th/product40/2020/05/1815/2019%E5%B9%B406%E6%9C%8826%E6%97%A519%E7%82%B933%E5%88%86%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E7%BA%B396%E9%A6%96598376/%E6%AD%8C%E6%9B%B2%E4%B8%8B%E8%BD%BD/flac_24bit/6005751VNPA155230.flac?channelid=02&msisdn=f069b282-eb92-4aa9-a151-c65a273ddb1b&Tim=1665659835932&Key=3e42b66398ea1a51"></audio>
    <audio controls src="http://freetyst.nf.migu.cn/public/product8th/product40/2020/05/1815/2019%E5%B9%B406%E6%9C%8826%E6%97%A519%E7%82%B933%E5%88%86%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E7%BA%B396%E9%A6%96598376/%E6%A0%87%E6%B8%85%E9%AB%98%E6%B8%85/MP3_128_16_Stero/6005751VNPA155230.mp3?channelid=02&msisdn=0bbce277-ad4c-4910-8aaa-78aa285dc183&Tim=1665659932368&Key=2d500d0d4f5a896b"></audio> -->
    <div class="playbar">
      <button @click="togglePlay">
        {{ playbar.status ? "暂停" : "播放" }}
      </button>
      <div class="progress"></div>
      <van-circle
        v-model="currentRate"
        :rate="currentRate"
        :speed="1"
        color="red"
        layer-color="white"
        size="30"
        stroke-width="40"
      />
    </div>
    <button @click="getPlayData">click me</button>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      currentRate: 10,
      duration: 0,
      currentTime: 0,
    };
  },
  computed: {
    ...mapState(["playbar"]),
  },
  created() {},
  mounted() {
    this.getPlaybarDom(this.$refs.play);
  },
  watch: {
    playbar: {
      playURL() {
        console.log(this.$refs.playbar.duration);
      },
    },
  },
  methods: {
    getPlayData() {
      console.log(this.$refs.play.duration);
      this.duration = this.$refs.play.duration;
      this.$refs.play.addEventListener("timeupdate", this.getPlayTime);
    },
    getPlayTime() {
      console.log(this.$refs.play.currentTime);
      this.currentTime = this.$refs.play.currentTime;
    },
    togglePlay() {
      // this.$refs.play.play()
      console.log(this.playbar);
      this.playbar.status ? this.$refs.play.pause() : this.$refs.play.play();
      this.toggleStatus();
    },
    ...mapMutations(["toggleStatus", "getPlaybarDom"]),
  },
};
</script>
<style lang="scss">
.playbar {
  position: fixed;
  bottom: 0px;
  width: 100vw;
  height: 8vh;
  background-color: rgba(255, 235, 205, 0.8);
  .progress {
    width: 30px;
    height: 30px;
    border: orange solid 2px;
    border-radius: 50%;
    position: absolute;
    // 上方裁剪大小，剩余宽度，剩余高度，左方裁剪大小
    clip: rect(0, 34px, 34px, 0px);
  }
}
</style>