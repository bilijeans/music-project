<template>
  <div id="app"><router-view></router-view></div>
</template>
<script>
export default {
  created() {
    if (window.location.pathname == "/") {
      this.$router.push({ path: "/home" });
    }
  },

};
</script>
<style>
</style>
