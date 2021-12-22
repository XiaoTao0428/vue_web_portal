<template>
  <div class="detailsPage_warp">
    <page-header-block
        :title="pageHeaderBlockTitle"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <mavon-editor v-model="mavonEditorValue"
                    :language="'zh-CN'"
                    :editable="false"
                    :toolbars-flag="false"
                    :subfield="false"
                    :default-open="'preview'"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
export default {
  name: "detailsPage",
  components: {PageHeaderBlock},
  data() {
    return {
      pageHeaderBlockTitle: '某某',
      breadcrumbList: [
        {
          title: '首页',
          to: '/Home',
        },
        {
          title: '老师',
          to: '/Teacher',
        },
        {
          title: '某某',
        }
      ],

      mavonEditorValue: '**二万人微软为*微软 微软++ 微软++***',

    }
  }
}
</script>

<style lang="scss" scoped>
.detailsPage_warp {
  width: 100%;
  .content {
    width: 100%;
    padding: 0 130px;
    box-sizing: border-box;
  }
}
</style>