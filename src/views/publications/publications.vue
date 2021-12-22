<template>
  <div class="publications_warp">
    <page-header-block
        :title="pageHeaderBlockTitle"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <div class="group">
        <div class="group-title">
          教师
        </div>
        <div class="group-content">
          <div class="group-item" v-for="(item, index) in 10" :key="'group-item' + index">
            123123
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
export default {
  name: "publications",
  components: {PageHeaderBlock},
  data() {
    return {
      pageHeaderBlockTitle: '成果',
      breadcrumbList: [
        {
          title: '首页',
          to: '/Home',
        },
        {
          title: '成果',
        }
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.publications_warp {
  width: 100%;
  .content {
    width: 100%;
    padding: 0 130px;
    box-sizing: border-box;
    .group {
      width: 100%;
      .group-title {
        width: 100%;
      }
      .group-content {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;

        .group-item {
          width: 30%;
          margin: 0 10px 20px 10px;
        }
      }
    }
  }
}
</style>