<template>
  <div class="pageHeaderBlock_warp">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item class="breadcrumb-item" v-for="(item, index) in breadcrumbList" :key="'breadcrumbList' + index">
        <a class="breadcrumb-item-a" v-if="item.to" :href="item.to">{{item.title}}</a>
        <span class="breadcrumb-item-span" v-else>{{item.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: "pageHeaderBlock",
  props: {
    /**
    * 标题
    * */
    title: {
      type: String,
      default: '',
    },
    breadcrumbList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.pageHeaderBlock_warp {
  width: 100%;
  height: 160px;
  background-image: linear-gradient(-226deg, #003b4c 0%, #005851 100%);
  //padding-left: 50px;
  //padding-right: 50px;
  padding: 30px 130px;
  box-sizing: border-box;
  margin-bottom: 30px;
  & /deep/ .breadcrumb {
    font-size: 14px;
    padding-bottom: 15px;
    box-sizing: border-box;
    .breadcrumb-item {
      .breadcrumb-item-a {
        color: #ffffff;
        &:hover {
          color: #D14900;
        }
      }
      .breadcrumb-item-span {
        color: #aaa99f;
      }
    }
  }
  .title {
    color: #ffffff;
    font-size: 50px;
  }
}
</style>