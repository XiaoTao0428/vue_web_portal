<template>
  <div class="customPage_warp">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle['title_' + currLang]"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content" v-loading="dataLoading">
      <mavon-editor v-model="mavonEditorValue['content_' + currLang]"
                    class="markdown-warp"
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
import {GetTabTabDetailApi} from '@/request/api'
export default {
  name: "customPage",
  components: {PageHeaderBlock},
  data() {
    return {
      dataLoading: false,
      currPageName: '',
      breadcrumbList: [
        {
          title_cn: '首页',
          title_en: 'Home',
          to: '/home',
        },
        {
          title_cn: '',
          title_en: '',
        }
      ],

      mavonEditorValue: {
        content_cn: '',
        content_en: '',
      },
    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    },
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1]
    },
    menuList() {
      return this.$store.state.menuList
    }
  },
  created() {
  },
  mounted() {
    this.currPageName = this.$route.query.pageName
    this.initPageHeaderBlock()
  },
  methods: {
    /**
     * 初始化页面头部卡片
     * */
    async initPageHeaderBlock() {
      let id = ''
      this.menuList.forEach((item, index) => {
        let newPageName = this.getUrlParam(item.router, 'pageName')
        if (newPageName === this.currPageName) {
          this.breadcrumbList[1].title_cn = item.title_cn
          this.breadcrumbList[1].title_en = item.title_en
          id = item.id
        }
      })
      await this.loadData(id)
    },
    /**
    * 获取url链接中的指定参数
    * */
    getUrlParam(url, name){
      let param = ''

      if (url.indexOf('?') !== -1) {
        let allParamsStr = url.split('?')[1]
        let allParams = allParamsStr.split('&')
        allParams.forEach((item, index) => {
          let paramArr = item.split('=')
          if (paramArr[0] === name) {
            param = paramArr[1]
          }
        })
      }

      return param
    },
    /**
    * 获取数据
    * */
    async loadData(id) {
      this.dataLoading = true
      const res = await GetTabTabDetailApi({
        tab_id: id
      })
      console.log('GetTabTabDetailApi', res)
      if (res) {
        this.mavonEditorValue.content_cn = res.tab_info.tab_content.content_cn
        this.mavonEditorValue.content_en = res.tab_info.tab_content.content_en
        console.log(this.mavonEditorValue)
      }
      this.dataLoading = false
    },
  }
}
</script>

<style lang="scss" scoped>
.customPage_warp {
  .header {
    max-width: 1600px;
    margin: 0 auto;
  }
  .content {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
    .markdown-warp {
      box-shadow: none !important;
      z-index: 1;
      font-size: 20px;
      & /deep/ .v-show-content {
        padding: 0;
        background-color: #ffffff !important;
      }
    }
  }
}
</style>