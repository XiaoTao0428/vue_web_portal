<template>
  <div class="news_warp" v-loading="dataLoading">
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
    <div class="footer" v-if="newsList && newsList.length > 0">
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
import {GetNewsNewsListApi} from '@/request/api'
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
      dataLoading: false,
      /**
       * 新闻列表
       * */
      newsList: [],
      newNewsList: [],
      colNum: 3,

      currentPage: 1,
      pageCount: 20,
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1].title
    }
  },
  created() {
  },
  async mounted() {
    await this.loadData()
    this.initList(this.colNum)
  },
  methods: {
    /**
    * 获取数据
    * */
    async loadData() {
      this.dataLoading = true
      const res = await GetNewsNewsListApi({
        page_num: this.currentPage,
        page_size: this.pageCount,
      })
      console.log(res)
      if (res) {
        this.newsList = res.news_info_list
      }
      this.dataLoading = false
    },
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