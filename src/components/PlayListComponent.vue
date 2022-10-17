<template>
  <transition name="list">
    <div class="wait-song-play-list">
      <div class="header">
        <span @click="packUpList">收起</span>
      </div>
      <ul class="items">
        <li
          class="item"
          ref="songItem"
          v-for="i in listData"
          :key="i.songId"
          @click="playSong(i.songId)"
        >
          <span class="name">{{ i.name }}</span>
          <span class="singer">{{ " - " + dealWithSingerName(i.singer) }}</span>
        </li>
      </ul>
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
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 60vh;
  background-color: rgba(255, 255, 255);
  .header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: red;
    span {
      position: absolute;
      right: 20px;
    }
  }
  .items {
    .item {
      padding: 10px 20px;
      font-size: 14px;
      .singer {
        font-size: 12px;
        color: #999;
      }
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
</style>