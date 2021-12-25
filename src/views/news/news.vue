<template>
  <div class="news_warp">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content">
      <el-row class="row" :gutter="20" v-for="(item, index) in newNewsList" :key="'row' + index">
        <el-col :span="24/colNum" v-for="(item2, index2) in item" :key="'col' + index2">
          <image-text-card></image-text-card>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          @current-change="currentPageChange"
          :page-count="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
import ImageTextCard from "@/components/imageTextCard/imageTextCard";
export default {
  name: "news",
  components: {ImageTextCard, PageHeaderBlock},
  data() {
    return {
      breadcrumbList: [
        {
          title: '首页',
          to: '/home',
        },
        {
          title: '新闻',
        }
      ],
      /**
       * 新闻列表
       * */
      newsList: [1,2,3,4,5,6,7,8,9,10],
      newNewsList: [],
      colNum: 3,

      currentPage: 2,
      pageCount: 20,
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1].title
    }
  },
  created() {
    this.initList(this.colNum)
  },
  methods: {
    /**
    * 初始化层级列表
    * */
    initList(num) {
      if (num > 1) {
        this.newsList.forEach((item, index) => {
          let i = parseInt(index/num)
          if (this.newNewsList[i] && this.newNewsList[i].length) {
            this.newNewsList[i].push(item)
          }else {
            this.newNewsList[i] = []
            this.newNewsList[i].push(item)
          }
        })
      }else {
        this.newNewsList = this.newsList
      }
      console.log('newNewsList', this.newNewsList)
    },
    /**
    * 当前页码切换时触发
    * */
    currentPageChange() {
      console.log('currentPage', this.currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.news_warp {
  width: 100%;
  .header {
    max-width: 1600px;
    margin: 0 auto;
  }
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 50px;
    box-sizing: border-box;
    .row {
      width: 100%;
      margin-bottom: 60px;
    }
    .content-item {
    }
  }
  .footer {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    text-align: center;
  }
}
</style>