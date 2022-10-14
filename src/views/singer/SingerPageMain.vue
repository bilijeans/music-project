<template>
  <div class="page-main">
    <div class="singer-mes">
      <p>歌手简介</p>
      <div class="singer-mes-more wd-icon-arrow-right" @click="showMes"></div>
    </div>

    <div class="singer-mes-main">{{ singerPageData.summary }}</div>

    <div class="otherSinger">
      <p>相似歌手</p>
      <div class="other-singer-list">
        <div
          class="similarSingerItem"
          v-for="item in similarSinger"
          :key="item.txt4"
          @click="goToSimilarPage(item.resId, item.resType)"
        >
          <div class="similarSingerImg">
            <img :src="item.img" alt="" />
          </div>
          <p class="similarSingerName">{{ item.txt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerPageData: Object,
    maskShow: Boolean,
    similarSinger: Array,
  },
  methods: {
    showMes() {
      this.$emit("changeShowMask", true);
    },
    goToSimilarPage(id, type) {
      this.$router.push({
        path: "/browser"
      });
      this.$router.push({
        name: "singerPage",
        params: {
          id,
          type,
        },
      });
      this.$router.go(0);
    },
  },
};
</script>


<style lang="scss" scoped>
.page-main {
  height: 81vh;

  .singer-mes {
    height: 6vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    p {
      font-size: 19px;
      font-weight: 600;
    }

    .singer-mes-more {
      width: 30px;
      height: 20px;
      background-color: #f4f4f4;
      text-align: center;
      line-height: 20px;
      border-radius: 5px;
    }
  }

  .singer-mes-main {
    padding: 0 10px;
    height: 12vh;
    font-size: 12px;
    line-height: 3vh;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #777;
  }
}

.otherSinger {
  p {
    font-size: 19px;
    font-weight: 600;
    padding: 30px 0 0 20px;
  }
}

.other-singer-list {
  height: 35vh;
  width: 100vw;
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .similarSingerItem {
    width: 22vw;
    height: 10vh;

    .similarSingerImg {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 999px;
      }
    }

    .similarSingerName {
      font-size: 14px;
      font-weight: 300;
      padding: 20px 0 0 0;
      text-align: center;
    }
  }
}
</style>