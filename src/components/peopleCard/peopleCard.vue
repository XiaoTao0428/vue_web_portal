<template>
  <div :class="'peopleCard_warp ' + peopleCardClassName">
    <div class="image-description">
      <el-image
          class="image"
          :src="imageUrl"
          fit="contain"
      ></el-image>
    </div>
    <div class="introduction" v-if="introduction">
      {{introduction}}
    </div>
    <div class="contact" v-if="contact">
      {{contact}}
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";

export default {
  name: "peopleCard",
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
     * 描述
     * */
    introduction: {
      type: String,
      default: '',
    },
    /**
     * 联系方式
     * */
    contact: {
      type: String,
      default: '',
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
    .image {
      //max-height: 400px;
      width: 100%;
    }
  }

  .introduction {
    font-size: 20px;
    color: #000000;
    font-weight: bold;
    margin-top: 10px;
  }

  .contact {
    font-size: 18px;
    color: #000000;
    margin-top: 10px;
  }
}

.peopleCard_warp-sm {
  .introduction {
    font-size: 18px;
  }
  .contact {
    font-size: 16px;
  }
}

.peopleCard_warp-xs {
  .introduction {
    font-size: 18px;
  }
  .contact {
    font-size: 16px;
  }
}
</style>