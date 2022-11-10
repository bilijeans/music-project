<template>
  <div class="albumPage">
    <div
      class="album-page-content"
      v-for="i in SingerAlbumList"
      :key="'album' + i.resId"
      @click="goToSingerAlbumSongs(i.resId, i.resType)"
    >
      <div class="album-page-content-img">
        <img :src="i.img" />
      </div>
      <p class="album-name">{{ i.txt }}</p>
      <p class="album-singer-name">{{ i.txt2 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    SingerAlbumList: Array,
  },

  methods: {
    goToSingerAlbumSongs(id, type) {
      this.$router.push({
        name: "albumSongs",
        params: {
          id,
          type,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.albumPage {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-top: 2vh;
  height: 76vh;
  overflow: auto;
}
.album-page-content {
  width: calc(90vw / 3);
  margin-left: calc(10vw / 4);
  margin-bottom: 1vh;
  .album-page-content-img {
    width: calc(90vw / 3);
    background-image: url(@/assets/Album.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: calc(7vw / 2) 0;

    img {
      width: calc(80vw / 3);
      border-radius: 10px;
    }
  }

  .album-name {
    font-weight: 600;
    font-size: 14px;
    padding: 2vh 0 1vh 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .album-singer-name {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>