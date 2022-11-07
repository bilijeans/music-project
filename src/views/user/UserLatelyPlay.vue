<template>
  <div class="lately-play">
    <header :style="{ backgroundColor: `rgba(255, 255, 255,${showHeader})` }">
      <i class="back wd-icon-thin-arrow-left"></i>
      <i class="search wd-icon-search"></i>
      <!-- <transition name="user">
        <div class="user-profile" v-show="showHeader == 1">
          <div class="user-pic">
            <img src="@/assets/user4.svg" />
          </div>
          <div class="user-name">小明</div>
        </div>
      </transition> -->
    </header>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      listData: [],
      showHeader: 0,
    };
  },
  created() {
    // localStorage.getItem();
    this.listData = this.user.latelyListen;
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<style lang="scss">
.lately-play {
  header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;

    z-index: 100;
    .back {
      position: absolute;
      left: 20px;
      line-height: 50px;
    }
    .search {
      position: absolute;
      right: 20px;
      line-height: 50px;
    }
  }
}
</style>