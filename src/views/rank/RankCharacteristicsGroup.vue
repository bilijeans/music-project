<template>
  <div class="characteristicsList">
    <div class="s-head">
      <i class="wd-icon-arrow-left" @click="back()"></i>
      <div>{{ title }}</div>
    </div>
    <div class="s-img">
      <img :src="songPic" />
      <img class="columnTittlePic" :src="columnTittlePic" />
      <div class="s-update">
        <span>{{ updateDate }}</span>
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
      // week: 0,
      // type: 101,
      // pageNo: 1,
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
    incomngUrl() {
      return `/bmw/popularity-week-rank/h5/v1.0?week=${this.week}&type=${this.type}&pageNo=${this.pageNo}`;
    },
  },
  watch: {
    url() {
      this.getRankCharacteristicsData();
    },
  },
  created() {
    this.id = this.$route.query.id;
    // this.getRankCharacteristicsData();
  },
  methods: {
    getRankCharacteristicsData() {
      this.$axios.get(this.url).then(({ data }) => {
        console.log(data.data.columnInfo);
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

<style lang="scss" scoped>
.s-head {
  color: #fff;
  position: fixed;
  top: 0;
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
    bottom: 180px;
    right: 10px;
    width: 80px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
  }
}
</style>