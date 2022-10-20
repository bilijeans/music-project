<template>
    <div>
        <div class="search" @click="goToSearch">搜索框</div>
    </div>
</template>

<script>
export default {
    methods:{
        goToSearch(){
          this.$router.push({path:'/search'})
        }
    }
}
</script>

<style lang="scss" scoped>
.search{
    height: 4vh;
    width: 40vw;
    border: 1px solid #ccc;
    border-radius: 20px;
    line-height: 4vh;
}
</style>

