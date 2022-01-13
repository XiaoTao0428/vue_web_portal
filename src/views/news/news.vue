<template>
  <div :class="'news_warp ' + newsClassName" v-loading="dataLoading">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle['title_' + currLang]"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content">
      <el-row class="row" :gutter="20" v-for="(item, index) in newNewsList" :key="'row' + index">
        <el-col class="col" :span="24/colNum" v-for="(item2, index2) in item" :key="'col' + index2">
          <image-text-card
              :image-url="item2.cover_image"
              :date="item2.news_date"
              :description="item2['title_' + currLang]"
              :have-details="true"
              @handleClick="toDetails(item2)"
          ></image-text-card>
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
import mixins from "@/mixins/mixins";
export default {
  name: "news",
  mixins: [mixins],
  components: {ImageTextCard, PageHeaderBlock},
  data() {
    return {
      breadcrumbList: [
        {
          title_cn: '首页',
          title_en: 'Home',
          to: '/home',
        },
        {
          title_cn: '新闻',
          title_en: 'News',
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
      pageSize: 20,
      pageCount: 0,
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1]
    },
    currLang() {
      return this.$store.state.currLang
    },
  },
  watch: {
    currScreenSize() {
      if (this.currScreenSize === 'lg' || this.currScreenSize === 'md') {
        this.colNum = 3
      }else if (this.currScreenSize === 'sm') {
        this.colNum = 2
      }else {
        this.colNum = 1
      }
      this.initList(this.colNum)
    }
  },
  mounted() {
    if (this.currScreenSize === 'lg' || this.currScreenSize === 'md') {
      this.colNum = 3
    }else if (this.currScreenSize === 'sm') {
      this.colNum = 2
    }else {
      this.colNum = 1
    }
    this.loadData()
  },
  methods: {
    /**
    * 获取数据
    * */
    async loadData() {
      this.dataLoading = true
      const res = await GetNewsNewsListApi({
        page_num: this.currentPage,
        page_size: this.pageSize,
      })
      console.log(res)
      if (res) {
        this.newsList = res.news_info_list
        this.pageCount = res.num_of_pages
      }

      this.initList(this.colNum)

      this.dataLoading = false
    },
    /**
    * 初始化层级列表
    * */
    initList(num) {
      console.log('colNum', this.colNum)
      let arr = []
      this.newsList.forEach((item, index) => {
        let i = parseInt(index/num)
        if (arr[i] && arr[i].length) {
          arr[i].push(item)
        }else {
          arr[i] = []
          arr[i].push(item)
        }
      })
      this.newNewsList = [...arr]
      console.log('newResearchDirectionList', this.newResearchDirectionList)
    },
    /**
    * 当前页码切换时触发
    * */
    currentPageChange() {
      console.log('currentPage', this.currentPage)
      this.loadData()
    },
    /**
     * 去详情页
     * */
    toDetails(data) {
      let params = {
        id: data.id,
        parent: [
          {
            title_cn: '首页',
            title_en: 'Home',
            to: '/home',
          },
          {
            title_cn: '新闻',
            title_en: 'News',
            to: '/news',
          }
        ]
      }
      console.log(data)
      this.$router.push({
        path: 'newDetailsPage?data=' +encodeURIComponent(JSON.stringify(params)),
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.news_warp {
  width: 100%;
  .header {
  }
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
    box-sizing: border-box;
    .row {
      width: 100%;
      margin-bottom: 60px;
      margin-left: 0 !important;
      margin-right: 0 !important;
      .col {
      }
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

.news_warp-sm {
  .content {
    padding: 0 10px;
  }
}

.news_warp-xs {
  .content {
    padding: 0 10px;
  }
}
</style>