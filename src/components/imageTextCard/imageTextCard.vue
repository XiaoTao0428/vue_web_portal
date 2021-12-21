<template>
  <div class="imageTextCard_warp" @click="handleClick">
    <div class="image-description">
      <img class="image" :src="imageUrl">
      <div class="line"></div>
    </div>
    <div class="date">
      <i class="el-icon-menu"></i>
      <span>{{date}}</span>
    </div>
    <div class="description">
      {{description}}
    </div>
  </div>
</template>

<script>
export default {
  name: "imageTextCard",
  props: {
    /**
     * 图片地址
     * */
    imageUrl: {
      type: String,
      default: 'https://caltechsites-prod.s3.amazonaws.com/root/images/Lasers.2e16d0ba.fill-710x400-c100.jpg',
    },
    /**
     * 日期
     * */
    date: {
      type: String,
      default: '2020年6月18日'
    },
    /**
     * 描述
     * */
    description: {
      type: String,
      default: '光学微梳装置可能会改善电信、传感器、时钟',
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClick() {
      this.$emit('handleClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.imageTextCard_warp {
  width: 100%;

  .image-description {
    width: 100%;
    margin-bottom: 20px;
    .image {
      max-width: 100%;
      margin-bottom: -4px;
      object-fit: contain;
    }
    .line {
      width: 100%;
      height: 4px;
      background-image: linear-gradient(90deg, #f9be01 0%, #c75000 100%);
    }
  }

  .date {
    font-size: 12px;
    color: #D14900;
    font-weight: bold;
    margin-bottom: 10px;

    .el-icon-menu {
      font-size: 16px;
      color: #AAA99F;
      margin-right: 5px;
    }
  }

  .description {
    font-size: 22px;
    color: #000000;
    font-weight: bold;
  }
}
</style>