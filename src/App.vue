<template>
  <div id="app">
    <router-view></router-view>
    <footer>
      <play-component></play-component>
    </footer>
  </div>
</template>
<script>
import PlayComponent from "./components/PlayerComponent.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    PlayComponent,
  },
  created() {
    if (window.location.pathname == "/") {
      this.$router.push({ path: "/home" });
    }
    console.log(this.$store);
    this.getAxios(this.$axios);
  },
  methods: {
    ...mapMutations(["getAxios"]),
  },

};
</script>
<style>
</style>
