<template>
  <div :class="'imageTextCard_warp ' + imageTextCardClassName" :style="haveDetails?'cursor: pointer;':''" @click="handleClick">
    <div class="image-description">
      <el-image
          class="image"
          :src="imageUrl"
          fit="contain"
      ></el-image>
      <div class="line"></div>
    </div>
    <div class="date" v-if="date">
      <i class="el-icon-menu"></i>
      <span>{{date}}</span>
    </div>
    <div class="description">
      {{description}}
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";

export default {
  name: "imageTextCard",
  mixins: [mixins],
  props: {
    /**
     * 图片地址
     * */
    imageUrl: {
      type: String,
      default: '',
    },
    /**
     * 日期
     * */
    date: {
      type: String,
      default: ''
    },
    /**
     * 描述
     * */
    description: {
      type: String,
      default: '',
    },
    /**
     * 是否有详情页
     * */
    haveDetails: {
      type: Boolean,
      default: false
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
      width: 100%;
      //max-height: 300px;
      margin-bottom: -6px;
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

.imageTextCard_warp-sm, .imageTextCard_warp-xs {
  .description {
    font-size: 18px;
  }
}
</style>