<template>
  <div class="people_warp">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content">
      <div class="group" v-for="(item, index) in newPeopleList" :key="'group' + index">
        <div class="group-title">
          {{item.groupTitle}}
        </div>
        <div class="group-content">
          <el-row class="row" :gutter="20" v-for="(item2, index2) in item.data" :key="'row' + index2">
            <el-col :span="24/colNum" v-for="(item3, index3) in item2" :key="'col' + index3">
              <people-card></people-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
import PeopleCard from "@/components/peopleCard/peopleCard";
import {GetMemberMemberListApi} from "@/request/api";
export default {
  name: "people",
  components: {PeopleCard, PageHeaderBlock},
  data() {
    return {
      breadcrumbList: [
        {
          title: '首页',
          to: '/home',
        },
        {
          title: '成员',
        }
      ],
      /**
      * 人们列表
      * */
      peopleList2: [
        {
          groupTitle: '老师',
          data: [
            {
              imageUrl: '',
              introduction: '',
            },
            {
              imageUrl: '',
              introduction: '',
            },
            {
              imageUrl: '',
              introduction: '',
            },
            {
              imageUrl: '',
              introduction: '',
            },
          ]
        },
        {
          groupTitle: '学生',
          data: [
            {
              imageUrl: '',
              introduction: '',
            },
            {
              imageUrl: '',
              introduction: '',
            },
            {
              imageUrl: '',
              introduction: '',
            },
            {
              imageUrl: '',
              introduction: '',
            },
          ]
        }
      ],
      peopleList: [],
      newPeopleList: [],
      colNum: 3,
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1].title
    },
    menuList() {
      return this.$store.state.menuList
    }
  },
  created() {

  },
  mounted() {
    console.log(this.$route.query)
    if (this.$route.query && this.$route.query.search) {
      let search = this.$route.query.search
      this.menuList.forEach((item, index) => {
        if (item.router === '/people') {
          item.children.forEach((item2, index2) => {
            if (item2.router.indexOf(search) !== -1) {
              this.breadcrumbList[1].to = '/people'
              this.breadcrumbList.push({
                title: item2.title_cn
              })
            }
          })
        }
      })
    }
    this.loadData()
  },
  methods: {
    /**
     * 获取数据
     * */
    async loadData() {
      this.dataLoading = true
      const res = await GetMemberMemberListApi({
        page_num: this.currentPage,
        page_size: this.pageSize,
      })
      console.log(res)
      if (res) {
        this.peopleList = res.member_info_list
        this.pageCount = res.num_of_pages
      }

      this.initList(this.colNum)

      this.dataLoading = false
    },
    /**
     * 初始化层级列表
     * */
    initList(num) {
      let peopleList = JSON.parse(JSON.stringify(this.peopleList))
      peopleList.forEach((item, index) => {
        let arr = []
        item.data.forEach((item2, index2) => {
          let i = parseInt(index2/num)
          if (arr[i] && arr[i].length) {
            arr[i].push(item2)
          }else {
            arr[i] = []
            arr[i].push(item2)
          }
        })
        peopleList[index].data = arr
      })
      this.newPeopleList = peopleList
      console.log('newPeopleList', this.newPeopleList)
    },
  }
}
</script>

<style lang="scss" scoped>
.people_warp {
  width: 100%;
  .header {
    max-width: 1600px;
    margin: 0 auto;
  }
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    .group {
      width: 100%;
      padding: 0 50px;
      box-sizing: border-box;
      border-bottom: 6px double #f0f0f0;
      margin-bottom: 20px;

      &:last-child {
        border-bottom: 0;
      }

      .group-title {
        width: 100%;
        font-size: 27px;
        color: #000000;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .group-content {
        width: 100%;

        .row {
          width: 100%;
          margin-bottom: 40px;
        }
        .group-item {
        }
      }
    }
  }
}
</style>