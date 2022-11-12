<template>
  <div class="add-songlist-pop">
    <div class="add-card">
      <div class="add-header">加入歌单</div>
      <div class="my-songlist">
        <div
          class="songlist-item"
          :class="{ active: i.playlistId == activePlaylistId }"
          v-for="i in user.mySongList"
          :key="i.playlistId"
          @click="activePlaylistId = i.playlistId"
        >
          {{ i.title }}
        </div>
        <div class="add-new-song-list" @click="addSongListStatus = true">
          <i class="wd-icon-add"></i>
          <span v-if="!addSongListStatus">新建歌单</span>
          <input
            type="text"
            v-model="newSonglistName"
            v-else
            placeholder="新建歌单"
            @keydown.enter="addNewSongList"
          />
        </div>
      </div>

      <div class="add-footer">
        <div class="completed" @click="addToSongList">完成</div>
        <div class="cancel" @click="pickup">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    songlist: Array,
  },
  data() {
    return {
      activePlaylistId: 0,
      addSongListStatus: false,
      newSonglistName: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    activePlaylistId() {},
  },
  methods: {
    addToSongList() {
      this.user.mySongList.forEach((el) => {
        if (el.playlistId == this.activePlaylistId) {
          this.addToMySongList({
            songlist: this.songlist,
            id: this.activePlaylistId,
          });
          this.$emit("pickUpPop");
        }
      });
    },
    addNewSongList() {
      this.addMySongList(this.newSonglistName);
      this.newSonglistName = "";
      this.addSongListStatus = false;
    },
    pickup() {
      this.$emit("pickUpPop");
    },
    ...mapMutations(["addToMySongList", "addMySongList"]),
  },
};
</script>
<style lang="scss">
.add-songlist-pop {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .add-card {
    position: relative;
    width: 60vw;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;

    .add-header {
      position: sticky;
      top: 0;
      padding: 10px 0;
      text-align: center;
      background-color: #fff;
    }
    .my-songlist {
      max-height: 200px;
      padding-bottom: 40px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .songlist-item {
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 10px 10px 10px 30px;
      font-size: 14px;
      // margin-left: 10px;
    }
    .active {
      color: red;
    }
    .add-new-song-list {
      display: flex;
      align-items: center;
      width: 80%;
      padding: 10px 10px 10px 30px;
      font-size: 12px;
      input {
        border: none;
      }
    }
    .add-footer {
      position: absolute;
      bottom: 0;
      display: flex;
      width: 100%;
      height: 40px;
      border-top: 1px solid #999;
      background-color: #fff;
      div {
        flex-grow: 1;
        text-align: center;
        line-height: 40px;
      }
      .completed {
        color: red;
        border-right: 1px solid #999;
      }
    }
  }
}
</style>