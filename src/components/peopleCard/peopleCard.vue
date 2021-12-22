<template>
  <div class="peopleCard_warp">
    <div class="image-description">
      <el-image
          class="image"
          :src="imageUrl"
          fit="contain"
      ></el-image>
    </div>
    <div class="introduction">
      {{introduction}}
    </div>
  </div>
</template>

<script>
export default {
  name: "peopleCard",
  props: {
    /**
     * 图片地址
     * */
    imageUrl: {
      type: String,
      default: 'https://caltechsites-prod.s3.amazonaws.com/root/images/Lasers.2e16d0ba.fill-710x400-c100.jpg',
    },
    /**
     * 描述
     * */
    introduction: {
      type: String,
      default: '光学微梳装置可能会改善电信、传感器、时钟',
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.peopleCard_warp {
  width: 100%;

  .image-description {
    width: 100%;
    margin-bottom: 20px;
    .image {
      width: 100%;
    }
  }

  .description {
    font-size: 22px;
    color: #000000;
    font-weight: bold;
  }
}
</style>