<template>
  <transition name="list">
    <div class="wait-song-play-list">
      <div class="list-container">
        <div class="header">
          <div class="title">
            <span class="listNum">当前播放</span>
            <span class="num">{{ "(" + listData.length + ")" }}</span>
          </div>
        </div>
        <div class="controls"></div>
        <ul class="items">
          <li
            class="item"
            ref="songItem"
            v-for="i in listData"
            :key="i.songId"
            @click="playSong(i.songId)"
          >
            <span class="name">{{ i.name }}</span>
            <span class="singer">{{
              " - " + dealWithSingerName(i.singer)
            }}</span>
          </li>
        </ul>
      </div>
      <div @click="packUpList" class="shadow"></div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      show: true,
    };
  },
  computed: {
    ...mapState({
      playId: (state) => state.playbar.playId,
    }),
    ...mapState(["playbar"]),
    ...mapState({
      listData: (state) => state.playList.listData,
    }),
  },
  watch: {
    playId() {
      console.log(this.listData);
      this.listData.forEach((e, i) => {
        if (e.songId == this.playId) {
          console.log(this.$refs.songItem[i]);
          this.$nextTick(() => {
            this.$refs.songItem[i].className = "item active";
          });
        } else {
          this.$nextTick(() => {
            this.$refs.songItem[i].className = "item";
          });
        }
      });
    },
  },
  created() {
    console.log(this.listData);
  },
  mounted() {
    console.log(this.listData);
  },
  methods: {
    dealWithSingerName(arr) {
      let str = "";
      arr.forEach((e) => {
        str = str + e.name + "/";
      });
      str = str.slice(0, -1);
      return str;
    },
    packUpList() {
      // this.show = !this.show
      this.$emit("packUp");
    },
    playSong(id) {
      this.listData.forEach((e, i) => {
        if (e.songId == id) {
          this.$nextTick(() => {
            this.$refs.songItem[i].className = "item active";
          });
        }
      });
      console.log(this.$refs.songItem);
      this.play(id);
    },
    ...mapActions({
      play: "getPlayURL",
    }),
  },
};
</script>
<style lang="scss">
.wait-song-play-list {
  position: fixed;
  bottom: 10px;
  left: 0px;
  right: 0px;
  width: 90vw;
  height: 60vh;
  background-color: rgb(255, 255, 255);
  // z-index: 999;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  .list-container {
    background-color: rgb(255, 255, 255);

    position: relative;
    width: 100%;
    margin: 0 auto;
  }
  .shadow {
    content: "";
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.192);
    z-index: -1;
  }
  .header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    .title{
      width: 90%;
      margin: 0 auto;
    }
  }
  .items {
    height: calc(60vh - 40px);
    background-color: #fff;
    .item {
      padding: 10px 20px;
      font-size: 14px;
      .singer {
        font-size: 12px;
        color: #999;
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
}
</style>