<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.initRefreshStore()
  },
  methods: {
    /**
     * h5 端刷新页面时不丢失 vuex 中的数据
     * */
    initRefreshStore() {
      if (sessionStorage.getItem("store")) {

        this.$store.replaceState(
            Object.assign(
                {},
                this.$store.state,
                JSON.parse(sessionStorage.getItem("store"))
            )
        )
        sessionStorage.removeItem("store")
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    },
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
