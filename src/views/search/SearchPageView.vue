<template>
  <div>
    <header>
      <div class="search-head">
        <div class="search">
          <wd-icon name="search" color="#ccc"></wd-icon>
          <input type="search" placeholder="可一可再" />
        </div>
        <span @click="goBack">取消</span>
      </div>

      <div class="search-history">
        <div class="search-history-head">
          <span>搜索历史</span>
          <wd-icon name="delete-thin" color="#999"></wd-icon>
        </div>
        <div class="search-history-content">
          <span>周杰伦</span>
        </div>
      </div>

      <div class="search-found">
        <p>搜索发现</p>
        <div class="search-found-contents">
          <div class="search-found-content1">
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
            <span>平凡的颜色</span>
          </div>

          <div class="search-found-content2">

          </div>
        </div>
      </div>
    </header>
  </div>
</template>


<script>
export default {
  methods: {
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-head {
  height: 8vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .search {
    height: 4vh;
    width: 80vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
    background-color: #f4f4f6;

    input {
      height: 100%;
      width: 67vw;
      outline: none;
      border: none;
      background-color: #f4f4f6;
    }
  }
  span {
    font-size: 16px;
    font-weight: 600;
  }
}

.search-history {
  .search-history-head {
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;

    span {
      font-size: 14px;
      font-weight: 600;
    }
  }

  .search-history-content {
    height: 10vh;
    width: 100vw;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      padding: 10px 20px;
      background-color: #f4f4f4;
      border-radius: 25px;
      margin-left: 2vw;
    }
  }
}

.search-found {
  p {
    font-size: 14px;
    font-weight: 600;
    margin-left: 5vw;
  }

  .search-found-contents {
    margin-top: 2vh;

    .search-found-content1 {
      display: flex;
      overflow: auto;

      span {
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        padding: 10px 20px;
        white-space: nowrap;
        background-color: #f4f4f4;
        border-radius: 25px;
        margin-left: 2vw;
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>