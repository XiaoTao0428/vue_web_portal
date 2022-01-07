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
          {{getPeopleTypeOptionLabel(item.groupTitle)['label_' + currLang]}}
        </div>
        <div class="group-content">
<!--          <el-row class="row" :gutter="20" v-for="(item2, index2) in item.data" :key="'row' + index2">-->
<!--            <el-col :span="24/colNum" v-for="(item3, index3) in item2" :key="'col' + index3">-->
<!--              <people-card></people-card>-->
<!--            </el-col>-->
<!--          </el-row>-->

          <div class="card" :style="item.groupTitle === 'teacher'?'cursor: pointer;':''" v-for="(item2, index2) in item.data" :key="'card' + index2" @click="toDetails(item2)">
            <people-card
                :image-url="item2.photo"
                :introduction="item2['name_' + currLang]"
                :contact="item2['contact_' + currLang]"
            ></people-card>
          </div>

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
      peopleList: [],
      newPeopleList: [],
      colNum: 3,
      search: '',
      peopleTypeOption: [],
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1].title
    },
    menuList() {
      return this.$store.state.menuList
    },
    currLang() {
      return this.$store.state.currLang
    },
  },
  created() {

  },
  async mounted() {
    console.log(this.$route.query)
    if (this.$route.query && this.$route.query.search) {
      this.search = this.$route.query.search
      this.menuList.forEach((item, index) => {
        if (item.router === '/people') {
          item.children.forEach((item2, index2) => {
            if (item2.router.indexOf(this.search) !== -1) {
              this.breadcrumbList[1].to = '/people'
              this.breadcrumbList.push({
                title: item2.title_cn
              })
            }
          })
        }
      })
    }
    this.initPeopleTypeOption()
    await this.loadData()
  },
  methods: {
    /**
     * 获取数据
     * */
    async loadData() {
      this.dataLoading = true
      const res = await GetMemberMemberListApi({
        type: this.search
      })
      console.log(res)
      if (res) {
        this.peopleList = res.member_info_list
      }

      this.initList(this.colNum)

      this.dataLoading = false
    },
    /**
     * 初始化层级列表
     * */
    initList(num) {
      let peopleList = [...this.peopleList]
      let newPeopleList = []
      peopleList.forEach((item, index) => {
        let state = false
        newPeopleList.forEach((item2, index2) => {
          if (item2.groupTitle === item.type) {
            item2.data.push(item)
            state = true
          }
        })
        if (state === false) {
          let obj = {
            groupTitle: item.type,
            data: []
          }
          obj.data.push(item)
          newPeopleList.push(obj)
        }
      })
      this.newPeopleList = [...newPeopleList]
      console.log('newPeopleList', this.newPeopleList)
    },
    /**
    * 初始化
    * */
    initPeopleTypeOption() {
      this.menuList.forEach((item, index) => {
        if (item.key === '5') {
          if (item.children && item.children.length > 0) {
            item.children.forEach((item2, index2) => {
              let obj2 = {
                ...item2,
                label_cn: item2.title_cn,
                label_en: item2.title_en,
                value: this.getUrlParam(item2.router, 'search'),
              }
              this.peopleTypeOption.push(obj2)
            })
          }
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
    /**
     * 获取人员可选项列表中对应的label值
     * */
    getPeopleTypeOptionLabel(value) {
      let obj = {
        label_cn: '',
        label_en: '',
      }
      this.peopleTypeOption.forEach((item, index) => {
        if (item.value === value) {
          obj.label_cn = item.label_cn
          obj.label_en = item.label_en
        }
      })
      return obj
    },

    /**
    * 去详情页
    * */
    toDetails(data) {
      console.log(data)
    }
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
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;

        .card {
          width: 400px;
          margin: 0 40px 40px 0;
        }

        //.row {
        //  width: 100%;
        //  margin-bottom: 40px;
        //}
        //.group-item {
        //}
      }
    }
  }
}
</style>