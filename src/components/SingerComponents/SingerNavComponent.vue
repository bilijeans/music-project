<template>
  <div class="singer-page-nav">
    <div class="singer-page-nav-content">
      <div v-for="(i,index) in tabName" @click="moveUnderLine(index + 1)" :key="index">
        <p :class="{ active: tab == index + 1 }">{{i.txt}}</p>
        <span>{{i.txt2 == 0? '':i.txt2}}</span>
      </div>
      
      <i ref="underLine"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabName: Array,
  },
  data() {
    return {
      tab: 2,
    };
  },
  created(){
    console.log(this.tabName,'aa')
  },
  methods: {
    moveUnderLine(left) {
      this.tab = left;
      this.$refs.underLine.style.left = `calc(${left}*25vw - 25vw/2 - 10vw/5)`;
      this.$emit("changeTab", this.tab);
    },
  },
};
</script>


<style lang="scss" scoped>
.singer-page-nav {
  width: 100vw;
   background-color: #fff;
  border-top-left-radius: 20px;

  .singer-page-nav-content {
    height: 7vh;
    display: flex;
    position: relative;
   

    div {
      width: 25vw;
      height: 7vh;
      font-size: 16px;
      color: #555;
      text-align: center;
      line-height: 7vh;
      display: flex;
      justify-content: center;
      position: relative;

      p {
        width: 10vw;

        &.active {
          font-size: 18px;
          font-weight: 700;
        }
      }

      span {
        display: inline-block;
        font-size: 12px;
        color: #999;
        position: absolute;
        top: calc(1vw / 2);
        left: calc(25vw / 2 + 9vw / 2);
        transform: scale(0.8);
      }
    }
    i {
      display: inline-block;
      height: 4px;
      width: 4vw;
      background-color: red;
      border-radius: 3px;
      position: absolute;
      bottom: 1vh;
      left: calc(2 * 25vw - 25vw / 2 - 10vw / 5);
      transition: all 0.5s;
    }
  }
}
</style>