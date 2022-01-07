<template>
  <div class="research_warp" v-loading="dataLoading">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content">
      <el-row class="row" :gutter="20" v-for="(item, index) in newResearchDirectionList" :key="'row' + index">
        <el-col :span="24/colNum" v-for="(item2, index2) in item" :key="'col' + index2">
          <image-text-card
              :image-url="item2.cover_image"
              :description="item2['title_' + currLang]"
              @handleClick="toDetails(item2)"
          ></image-text-card>
        </el-col>
      </el-row>
    </div>
    <div class="footer" v-if="researchDirectionList && researchDirectionList.length > 0">
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
import mixins from "@/mixins/mixins";
import {GetResearchTesearchListApi} from '@/request/api'
export default {
  name: "research",
  mixins: [mixins],
  components: {ImageTextCard, PageHeaderBlock},
  data() {
    return {
      dataLoading: false,
      breadcrumbList: [
        {
          title: '首页',
          to: '/home',
        },
        {
          title: '研究方向',
        }
      ],
      /**
      * 研究方向列表
      * */
      researchDirectionList: [],
      newResearchDirectionList: [],
      colNum: 3,


      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1].title
    },
    currLang() {
      return this.$store.state.currLang
    },
  },
  mounted() {
    this.loadData()
  },
  methods: {
    /**
     * 获取数据
     * */
    async loadData() {
      this.dataLoading = true
      const res = await GetResearchTesearchListApi({
        page_num: this.currentPage,
        page_size: this.pageSize,
      })
      console.log(res)
      if (res) {
        this.researchDirectionList = res.research_info_list
        this.pageCount = res.num_of_pages
      }

      this.initList(this.colNum)

      this.dataLoading = false
    },
    /**
     * 初始化层级列表
     * */
    initList(num) {
      let arr = [...this.newResearchDirectionList]
      if (num > 1) {
        this.researchDirectionList.forEach((item, index) => {
          let i = parseInt(index/num)
          if (arr[i] && arr[i].length) {
            arr[i].push(item)
          }else {
            arr[i] = []
            arr[i].push(item)
          }
        })
      }else {
        arr = [...this.researchDirectionList]
      }
      this.newResearchDirectionList = [...arr]
      console.log('newResearchDirectionList', this.newResearchDirectionList)
    },
    /**
     * 当前页码切换时触发
     * */
    currentPageChange() {
      console.log('currentPage', this.currentPage)
      this.loadData()
    },
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
            title_cn: '研究方向',
            title_en: 'Research',
            to: '/research',
          }
        ]
      }
      console.log(data)
      this.$router.push({
        path: 'researchDetailsPage?data=' +encodeURIComponent(JSON.stringify(params)),
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.research_warp {
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