<template>
  <div :class="'publications_warp ' + publicationsClassName" v-loading="dataLoading">
<!--    <div class="header">-->
<!--      <page-header-block-->
<!--          :title="pageHeaderBlockTitle['title_' + currLang]"-->
<!--          :breadcrumb-list="breadcrumbList"-->
<!--      ></page-header-block>-->
<!--    </div>-->
    <div class="content">
      <div class="group" v-for="(item, index) in newPublicationList" :key="'group' + index">
        <div class="group-title">
          {{item['groupTitle_' + currLang]}}
        </div>
        <div class="group-content">
          <div class="content-item" v-for="(item2, index2) in item.data" :key="'group-item' + index2">
            <div class="participant">
              <i>{{item2['authors_' + currLang]}}</i>
            </div>
            <div class="content-item-title">
              <b>"{{item2['title_' + currLang]}}"</b>
            </div>
            <div class="link" @click="toDetails(item2)">{{item2.issn}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="publicationList && publicationList.length > 0">
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
import {GetPublicationPublicationListApi} from "@/request/api";
import mixins from "@/mixins/mixins";
import {mapMutations} from "vuex";
export default {
  name: "publications",
  mixins: [mixins],
  components: {PageHeaderBlock},
  data() {
    return {
      breadcrumbList: [
        {
          title_cn: '首页',
          title_en: 'Home',
          to: '/home',
        },
        {
          title_cn: '出版物',
          title_en: 'Publications',
        }
      ],
      dataLoading: false,

      currentPage: 1,
      pageSize: 20,
      pageCount: 0,

      publicationList: [],
      newPublicationList: [],
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
  created() {
    this.setCurrRouteKey({
      currRouteKey: '4'
    })
  },
  mounted() {
    this.loadData()
  },
  methods: {
    ...mapMutations(['setCurrRouteKey']),
    /**
     * 获取数据
     * */
    async loadData() {
      this.dataLoading = true
      const res = await GetPublicationPublicationListApi({
        page_num: this.currentPage,
        page_size: this.pageSize,
      })
      if (res) {
        this.publicationList = res.publication_info_list
        this.pageCount = res.num_of_pages
      }
      this.initList()
      this.dataLoading = false
    },
    initList() {
      let arr = [...this.publicationList]
      let newArr = []
      let year = ''
      arr.forEach((item, index) => {
        let newYear = item.publish_date.split('-')[0]
        if (newYear === year) {
          newArr[newArr.length - 1].data.push(item)
        }else {
          year = newYear
          let obj = {
            groupTitle_cn: newYear + ' 年出版物',
            groupTitle_en: newYear + ' Publications',
            data: []
          }
          obj.data.push(item)
          newArr.push(obj)
        }
      })
      this.newPublicationList = [...newArr]
    },
    /**
     * 当前页码切换时触发
     * */
    currentPageChange() {
      this.loadData()
    },
    toDetails(data) {
      window.location.href = 'https://' + data.publish_link
    }
  }
}
</script>

<style lang="scss" scoped>
.publications_warp {
  width: 100%;
  .header {
  }
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 50px;
    box-sizing: border-box;
    .group {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .group-title {
        width: 300px;
        padding-right: 20px;
        font-size: 22px;
        color: #333333;
      }
      .group-content {
        flex: 1;
        padding-left: 20px;

        .content-item {
          width: 100%;
          margin: 0 10px 20px 10px;
          color: #333333;
          font-size: 18px;
          line-height: 28px;

          .participant {
          }

          .content-item-title {
          }

          .link {
            cursor: pointer;
            color: #9B0000;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    text-align: center;
  }
}

.publications_warp-sm {
  .content {
    padding: 0 20px;
    .group {
      .group-content {
        .content-item {
          font-size: 16px;
        }
      }
    }
  }
}

.publications_warp-xs {
  .content {
    padding: 0 20px;
    .group {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 40px;

      .group-title {
        width: 100%;
        font-size: 22px;
        color: #333333;
        margin-bottom: 20px;
      }

      .group-content {
        width: 100%;
        padding-left: 0px;
        .content-item {
          width: 100%;
          margin: 0 0 20px 0;
          color: #333333;
          font-size: 16px;
          line-height: 28px;

          .participant {
          }

          .content-item-title {
          }

          .link {
            cursor: pointer;
            color: #9B0000;
          }
        }
      }

    }
  }
}
</style>