<template>
  <div class="albumPage">
    <div
      class="album-page-content"
      v-for="i in SingerAlbumList"
      :key="'album' + i.resId"
      @click="goToSingerAlbumSongs(i.resId)"
    >
      <div class="album-page-content-img">
        <img :src="i.img" alt="" />
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

  methods:{
    goToSingerAlbumSongs(id){
        this.$router.push({
            name: 'albumSongs',
            params:{
                id
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.albumPage {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 2vh;
}
.album-page-content {
  height: 25vh;
  width: calc(90vw/3);
  padding-left: calc(10vw/4);

  .album-page-content-img {
    height: 14vh;
    img {
      height: 100%;
      border-radius: 10px;
    }
  }

  .album-name{
    font-weight: 600;
    font-size: 14px;
    padding: 2vh 0 1vh 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .album-singer-name{
    font-size: 14px;
  }
}
</style>