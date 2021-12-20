<template>
  <div class="pageHeaderBlock_warp">
    <el-breadcrumb class="breadcrumb" separator="/">
      <template v-for="(item, index) in breadcrumbList" :key="'breadcrumbList' + index">
        <el-breadcrumb-item>
          <a v-if="item.to" :href="item.to">{{item.title}}</a>
          <span v-else>{{item.title}}</span>
        </el-breadcrumb-item>
      </template>
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
      type: Text,
      default: '标题',
    },
    breadcrumbList: {
      type: Array,
      default: () => [
        {
          title: '首页',
          to: '/Home',
        },
        {
          title: '研究',
          to: '/Research',
        },
        {
          title: '人们',
          to: '/People',
        }
      ]
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
  .breadcrumb {
    font-size: 14px;
    color: #ffffff;
  }
  .title {
    color: #ffffff;
    font-size: 50px;
  }
}
</style>