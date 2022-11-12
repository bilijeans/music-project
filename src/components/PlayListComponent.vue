<template>
  <div
    class="wait-song-play-list"
    :style="{ height: showItSelf ? 'auto' : '0px' }"
    @touchStart.stop
  >
    <div class="list-container" v-show="showItSelf">
      <div class="header">
        <div class="title">
          <span class="listNum">当前播放</span>
          <span class="num">{{ "(" + listData.length + ")" }}</span>
        </div>
      </div>
      <div class="controls">
        <div class="loop-status">
          <div
            class="btn"
            :class="{ single: loop == 0, loop: loop == 1, random: loop == 2 }"
            @click="changeLoop"
          ></div>
          <span class="loop-str">{{ loopStatus(loop) }}</span>
        </div>
        <div class="list-controls">
          <div class="btn collect" @click="showAddPop"></div>
          <div class="btn clean" @click="cleanListBtn"></div>
        </div>
      </div>
      <ul class="items" ref="songItem">
        <li
          class="item"
          :class="{ active: index == playList.highLight }"
          v-for="(i, index) in playList.listData"
          :key="i.songId"
          @click="playOnList({ data: i, index: index })"
        >
          <span class="name">{{ i.name }}</span>
          <span v-if="i.singerList[0].name.trim()" class="singer">{{
            " - " + dealWithSingerName(i.singerList)
          }}</span>
          <div class="delete" @click.stop="deleteSong(i.songId)"></div>
        </li>
      </ul>
    </div>
    <popup-add-songlist
      v-show="addSonglistStatus"
      :songlist="listData"
      @pickUpPop="pickUpPop"
    ></popup-add-songlist>
    <div @click="packUpList" class="shadow"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import PopupAddSonglist from "./PopupAddSonglist.vue";
export default {
  components: { PopupAddSonglist },
  props: {
    loop: Number,
    status: Boolean,
  },
  data() {
    return {
      show: true,
      addSonglistStatus: false,
      showItSelf: true,
    };
  },
  watch: {
    status() {
      if (this.status) {
        this.$refs.songItem.scrollTop = this.playList.highLight * 35;
      }
    },
  },
  computed: {
    ...mapState({
      playId: (state) => state.playbar.playId,
    }),
    ...mapState(["playbar", "playList"]),
    ...mapState({
      listData: (state) => state.playList.listData,
      highLight: (state) => state.playList.highLight,
    }),
  },
  methods: {
    loopStatus(num) {
      if (num == 0) {
        return "单曲循环";
      } else if (num == 1) {
        return "列表循环";
      } else {
        return "随机播放";
      }
    },
    showAddPop() {
      this.addSonglistStatus = true;
      this.showItSelf = false;
    },
    changeLoop() {
      this.$emit("changeLoop");
    },
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
      // console.log(1);
      this.$emit("packUp");
    },
    cleanListBtn() {
      this.$emit("stopPlay");
      this.cleanList();
    },
    deleteSong(id) {
      if (this.playList.listData.length == 1) {
        this.cleanListBtn();
      } else {
        this.deleteSongOnList(id);
      }
    },
    pickUpPop() {
      this.addSonglistStatus = false;
      this.showItSelf = true;
    },
    ...mapActions({
      play: "getPlayURL",
    }),
    ...mapActions(["playOnList", "cleanList", "deleteSongOnList"]),
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
  border-radius: 10px;
  overflow: hidden;
  z-index: 999;
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
    padding-top: 10px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // border-bottom: 1px solid #ccc;
    .title {
      width: 90%;
      margin: 0 auto;
      .num {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    // background-color: #999;
    .btn {
      width: 22px;
      height: 22px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .loop-status {
      display: flex;
      align-items: center;
    }
    .loop-str {
      margin-left: 5px;
      font-size: 14px;
    }
    .list-controls {
      display: flex;
      justify-content: space-around;
      width: 80px;
    }
    .loop {
      background-image: url("@/assets/Sequentialplay.svg");
    }
    .single {
      background-image: url("@/assets/SingleTuneCirculation.svg");
    }
    .random {
      background-image: url("@/assets/RandomPlay.svg");
    }
    .collect {
      width: 18px;
      height: 18px;
      background-image: url("@/assets/JoinSongList.svg");
    }
    .clean {
      width: 18px;
      height: 18px;
      background-image: url("@/assets/CleaerAway.svg");
    }
  }
  .items {
    height: calc(60vh - 90px);
    background-color: #fff;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      font-size: 14px;
      // margin-bottom: 10px;
      .name {
        font-size: 15px;
        display: inline-block;
        max-width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .singer {
        margin-left: 5px;
        font-size: 12px;
        color: #999;
      }
      .delete {
        position: absolute;
        right: 10px;
        width: 15px;
        height: 15px;
        background-image: url("@/assets/Delete.svg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .item.active {
      color: red;
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