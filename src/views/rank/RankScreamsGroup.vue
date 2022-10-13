<template>
  <div class="screamsList">
    <div class="s-head">
      <i class="wd-icon-arrow-left" @click="back()"></i>
      <div>{{ title }}</div>
    </div>
    <div class="s-img">
      <img :src="songPic" />
      <img class="columnTittlePic" :src="columnTittlePic" />
      <div class="s-update">
        <span>{{ updateDate }}</span>
        <div>
          <span>实时榜</span>
          <i class="wd-icon-fill-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="s-list">
      <songs-component :songsData="rankData"></songs-component>
    </div>
  </div>
</template>

<script>
import SongsComponent from "@/components/SongsComponent.vue";
export default {
  data() {
    return {
      id: "",
      needAll: 0,
      resourceType: 2009,
      templateVersion: 3,
      rankData: {},
      title: "尖叫新歌榜",
      songPic: "",
      columnTittlePic: "",
      updateDate: "",
    };
  },
  components: {
    SongsComponent,
  },
  computed: {
    url() {
      return `https://app.c.nf.migu.cn/MIGUM3.0/v1.0/template/rank-detail?columnId=${this.id}&id=${this.id}&needAll=${this.needAll}&resourceType=${this.resourceType}&templateVersion=${this.templateVersion}`;
    },
  },
  watch: {
    url() {
      this.getRankScreamsData();
    },
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    getRankScreamsData() {
      this.$axios.get(this.url).then(({ data }) => {
        console.log(data.data);
        this.rankData = data.data.columnInfo;
        this.title = this.rankData.title;
        this.songPic = this.rankData.songPic;
        this.columnTittlePic = this.rankData.columnTittlePic;
        this.updateDate = this.rankData.updateDate;
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
.screamsList {
  position: relative;
  .s-head {
    color: #fff;
    // position: relative;
    position: fixed;
    top: 0;
    background-color: #858591;
    z-index: 999;
    width: 100vw;
    i {
      position: absolute;
      top: 14px;
      left: 12px;
      font-size: 20px;
    }
    div {
      margin: 0 0 0 35px;
      padding: 15px;
      font-size: 16px;
    }
  }
  .s-img {
    position: fixed;
    top: 0;
    z-index: -1;
    img {
      width: 100%;
    }
    .columnTittlePic {
      width: 50%;
      position: absolute;
      bottom: 180px;
      left: 0;
      z-index: 1;
    }
    .s-update {
      position: absolute;
      bottom: 190px;
      right: 10px;
      width: 130px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      div {
        padding: 6px 8px;
        border-radius: 999px;
        background-color: rgba($color: #858591, $alpha: 0.5);
      }
    }
  }
  .s-list {
    // position: sticky;
    // top: 40px;
    // overflow: hidden;
  }
}
</style>