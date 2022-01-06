<template>
  <div class="publications_warp" v-loading="dataLoading">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content">
      <div class="group" v-for="(item, index) in newPublicationList" :key="'group' + index">
        <div class="group-title">
          {{item.groupTitle}}
        </div>
        <div class="group-content">
          <div class="content-item" v-for="(item2, index2) in item.data" :key="'group-item' + index2">
            <div class="participant">
              <i>{{item2['authors_' + currLang]}}</i>
            </div>
            <div class="content-item-title">
              <b>"{{item2['title_' + currLang]}}"</b>
            </div>
            <div class="link">{{item2.issn}}</div>
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
export default {
  name: "publications",
  components: {PageHeaderBlock},
  data() {
    return {
      breadcrumbList: [
        {
          title: '首页',
          to: '/home',
        },
        {
          title: '成果',
        }
      ],
      dataLoading: false,

      currentPage: 1,
      pageSize: 20,
      pageCount: 0,

      publicationList: [],
      newPublicationList: [],

      /**
      * 论文列表
      * */
      paperList: [
        {
          groupTitle: '2021 Publications',
          data: [
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            },
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            }
          ]
        },
        {
          groupTitle: '2021 Publications',
          data: [
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            },
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            }
          ]
        }
      ],
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
      const res = await GetPublicationPublicationListApi({
        page_num: this.currentPage,
        page_size: this.pageSize,
      })
      console.log(res)
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
            groupTitle: newYear + ' Publications',
            data: []
          }
          obj.data.push(item)
          newArr.push(obj)
        }
      })
      this.newPublicationList = [...newArr]
      console.log('newPublicationList', this.newPublicationList)
    },
    /**
     * 当前页码切换时触发
     * */
    currentPageChange() {
      this.loadData()
    }
  }
}
</script>

<style lang="scss" scoped>
.publications_warp {
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
            color: #D14900;
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
</style>