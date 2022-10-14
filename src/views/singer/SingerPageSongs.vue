<template>
  <div class="singerSongList">
    <header>
      <div class="playAll">
        <div class="playImg">
          <img src="@/svg/play.svg" alt="" />
          <span>播放全部</span>
        </div>
        <div class="playAllDownloadAndList">
          <img src="@/svg/download.svg" alt="" />
          <img src="@/svg/songList.svg" alt="" />
        </div>
      </div>
    </header>

    <main>
      <div
        class="songContent"
        v-for="(item, index) in singerSongList"
        :key="item.resId"
        @click="getSongUrl(item.action)"
      >
        <div class="song-content-left">
          <p class="song-list-num">{{ index + 1 }}</p>
          <div class="song-list-name">
            <p class="song-list-first-name">{{ item.txt }}</p>
            <p class="song-list-second-name">
              <span class="vip">{{
                item.showTag[0] ? item.showTag[0] : ""
              }}</span>
              <span class="threeD">{{ item.showTag[3] ? "3D" : "" }}</span>
              <span class="second-name">{{ item.txt3 }}·{{ item.txt2 }}</span>
            </p>
          </div>
        </div>

        <div class="song-content-right">
          <img src="@/svg/songListPlay.svg" alt="" />
          <img src="@/svg/songListMore.svg" alt="" @click="changeIsShowMore" />
        </div>
      </div>

      
    </main>
  </div>
</template>

<script>
export default {
  props: {
    singerSongList: Array,
  },
  methods: {
    changeIsShowMore(){
      this.$emit('changeIsShowMore', true)
    },
    getSongUrl(value){
      console.log('音乐Url ==>', value)
    },
  },
};
</script>

<style lang="scss" scoped>
.playAll {
  height: 5vh;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;

  .playImg {
    width: 35vw;
    height: 100%;
    background-color: #f4f4f5;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playAllDownloadAndList {
    width: 18vw;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.songContent {
  height: 7vh;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .song-content-left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .song-list-num {
      color: #999;
      width: 7vw;
      text-align: center;
    }

    .song-list-name {
      padding-left: 10px;
    }
  }

  .song-content-right {
    display: flex;
    justify-content: space-between;
    width: 15vw;
  }

  .song-list-first-name {
    width: 50vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .song-list-second-name {
    display: flex;
    align-items: center;
    margin-top: 8px;
    span {
      font-weight: 100;
      font-size: 12px;
      margin-right: 5px;
    }
    .vip {
      color: rgb(189, 161, 1);
      border: 1px solid rgb(189, 161, 1);
      padding: 0 2px;
    }
    .threeD {
      font-weight: 300;
      color: white;
      border-radius: 2px;
      background-color: #95a7ec;
    }
    .second-name {
      display: inline-block;
      height: 2vh;
      width: 50vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 2vh;
    }
  }
}


</style>