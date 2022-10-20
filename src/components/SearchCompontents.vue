<template>
  <div>
    <div class="search-nav">
      <div class="title">摸鱼音乐</div>
      <div class="search" @click="goToSearch">
        <i class="wd-icon-search"></i>
        <span>搜索框</span>
      </div>
      <svg
        t="1665822765464"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="19704"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="16"
        height="16"
      >
        <path
          d="M917.333333 981.333333a21.333333 21.333333 0 0 1-21.333333-21.333333v-64c0-94.106667-76.56-170.666667-170.666667-170.666667H298.666667c-94.106667 0-170.666667 76.56-170.666667 170.666667v64a21.333333 21.333333 0 0 1-42.666667 0v-64a213.333333 213.333333 0 0 1 213.333334-213.333333h426.666666a213.333333 213.333333 0 0 1 213.333334 213.333333v64a21.333333 21.333333 0 0 1-21.333334 21.333333zM768 298.666667c0-141.386667-114.613333-256-256-256S256 157.28 256 298.666667s114.613333 256 256 256 256-114.613333 256-256zM512 512c-117.82 0-213.333333-95.513333-213.333333-213.333333s95.513333-213.333333 213.333333-213.333334 213.333333 95.513333 213.333333 213.333334-95.513333 213.333333-213.333333 213.333333z"
          fill="#fff"
          p-id="19705"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToSearch() {
      this.$router.push({ path: "/search" });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-nav {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: #cd3021;
  .title {
    font-size: 18px;
  }
  .search {
    padding: 8px 60px;
    font-size: 13px;
    display: flex;
    border-radius: 20px;
    color: rgba(238, 238, 238, 0.7);
    background-color: #d13b2c;
    i {
      margin: 0 5px 0 0;
    }
  }
  svg {
    width: 20px;
    height: 20px;
  }
}
</style>

