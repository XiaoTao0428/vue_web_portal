<template>
  <div class="customPage_warp">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content">
      <mavon-editor v-model="mavonEditorValue"
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
export default {
  name: "customPage",
  components: {PageHeaderBlock},
  data() {
    return {
      currPageName: '',
      breadcrumbList: [
        {
          title: '首页',
          to: '/home',
        },
        {
          title: '',
        }
      ],

      menuList: [
        {
          key: '1',
          title_cn: '首页',
          title_en: 'Home',
          router: '/home',
        },
        {
          key: '2',
          title_cn: '研究方向',
          title_en: 'Research',
          router: '/research',
        },
        {
          key: '3',
          title_cn: '新闻',
          title_en: 'News',
          router: '/news',
        },
        {
          key: '4',
          title_cn: '出版物',
          title_en: 'Publications',
          router: '/publications',
        },
        {
          key: '5',
          title_cn: '成员',
          title_en: 'People',
          router: '/people',
          children: [
            {
              key: '5-1',
              title_cn: '教师',
              title_en: 'Teacher',
              router: '/people?search=Teacher',
            },
            {
              key: '5-2',
              title_cn: '博士后',
              title_en: 'Postdoc',
              router: '/people?search=Postdoc',
            },
            {
              key: '5-3',
              title_cn: '博士',
              title_en: 'Doctor',
              router: '/people?search=Doctor',
            },
            {
              key: '5-4',
              title_cn: '硕士',
              title_en: 'Master',
              router: '/people?search=Master',
            },
            {
              key: '5-5',
              title_cn: '校友',
              title_en: 'Alumni',
              router: '/people?search=Alumni',
            }
          ]
        },
        {
          key: '6',
          router: '/customPage?pageName=test',
          title_cn: '测试',
          title_en: 'Test',
        },
        {
          key: '7',
          router: '/customPage?pageName=test2',
          title_cn: '测试2',
          title_en: 'Test2',
        }
      ],

      mavonEditorValue: '',
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1].title
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
    initPageHeaderBlock() {
      this.menuList.forEach((item, index) => {
        let newPageName = this.getUrlParam(item.router, 'pageName')
        if (newPageName === this.currPageName) {
          this.breadcrumbList[1].title = item.title_cn
        }
      })
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
    max-width: 1440px;
    margin: 0 auto;
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