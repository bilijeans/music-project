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
    this.$axios({
        methods: "GET",
        url: `/MIGUM2.0/strategy/listen-url/v2.4?resourceType=2&songId=54714&toneFlag=SQ`,
        headers: {
          channel: "0146921",
          aversionid:
            "DF94878D95A2A88B64928AA5D0ADC975C497B590C29DD38A939884A18AAD996E9B99868D8ED4A68962948E9E86ACCBA29ADFD0D3C5A8A28C6495899EB7829FA5C498848DDDECEE8968978CA389829E759C9A8A87",
          timestamp: Date.parse(new Date()),
        },
      })
      .then((data) => {
        console.log(data);
      });

    if (window.location.pathname == "/") {
      this.$router.push({ path: "/home" });
    }
    // console.log(this.$store);
    this.getAxios(this.$axios);
  },
  methods: {
    ...mapMutations(["getAxios"]),
  },
};
</script>
<style>
</style>
