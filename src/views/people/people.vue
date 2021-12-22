<template>
  <div class="people_warp">

  </div>
</template>

<script>
export default {
  name: "people",
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
.people_warp {

}
</style>