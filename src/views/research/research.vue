<template>
  <div class="research_warp">
    <page-header-block
        :title="pageHeaderBlockTitle"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <div class="content-item" v-for="(item, index) in 10" :key="'content-item' + index">
        <image-text-card></image-text-card>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
import ImageTextCard from "@/components/imageTextCard/imageTextCard";
export default {
  name: "research",
  components: {ImageTextCard, PageHeaderBlock},
  data() {
    return {
      pageHeaderBlockTitle: '研究方向',
      breadcrumbList: [
        {
          title: '首页',
          to: '/Home',
        },
        {
          title: '研究方向',
        }
      ],
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.research_warp {
  width: 100%;
  .content {
    width: 100%;
    padding: 0 130px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    .content-item {
      width: 30%;
      margin: 0 10px 20px 10px;
    }
  }
}
</style>