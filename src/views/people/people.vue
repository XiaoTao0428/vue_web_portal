<template>
  <div :class="'people_warp ' + peopleClassName">
<!--    <div class="header">-->
<!--      <page-header-block-->
<!--          :title="pageHeaderBlockTitle['title_' + currLang]"-->
<!--          :breadcrumb-list="breadcrumbList"-->
<!--      ></page-header-block>-->
<!--    </div>-->
    <div class="content">
      <div class="group" v-for="(item, index) in newPeopleList" :key="'group' + index">
        <div class="group-teacher" v-if="item.groupTitle === 'teacher'">
          <div class="group-title">
            {{getPeopleTypeOptionLabel(item.groupTitle)['label_' + currLang]}}
          </div>
          <div class="group-content">
            <div class="row" style="cursor: pointer;" v-for="(item2, index2) in item.data" :key="'row' + index2" @click="toDetails(item2)">
              <div class="card">
                <people-card
                    :image-url="item2.photo"
                ></people-card>
              </div>
              <div class="introduction">
                <div class="name">
                  {{item2['name_' + currLang]}}
                </div>
                <div class="contact">
                  {{item2['contact_' + currLang]}}
                </div>
                <p>{{item2['introduction_' + currLang]}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="group-other" v-if="item.groupTitle !== 'teacher'">
          <div class="group-title">
            {{getPeopleTypeOptionLabel(item.groupTitle)['label_' + currLang]}}
          </div>
          <div class="group-content">
            <!--          <el-row class="row" :gutter="20" v-for="(item2, index2) in item.data" :key="'row' + index2">-->
            <!--            <el-col :span="24/colNum" v-for="(item3, index3) in item2" :key="'col' + index3">-->
            <!--              <people-card></people-card>-->
            <!--            </el-col>-->
            <!--          </el-row>-->

            <div class="card" v-for="(item2, index2) in item.data" :key="'card' + index2" @click="toDetails(item2)">
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
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
import PeopleCard from "@/components/peopleCard/peopleCard";
import {GetMemberMemberListApi} from "@/request/api";
import mixins from "@/mixins/mixins";
import {mapMutations} from "vuex";
export default {
  name: "people",
  mixins: [mixins],
  components: {PeopleCard, PageHeaderBlock},
  data() {
    return {

      breadcrumbList: [
        {
          title_cn: '首页',
          title_en: 'Home',
          to: '/home',
        },
        {
          title_cn: '成员',
          title_en: 'People',
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
      return this.breadcrumbList[this.breadcrumbList.length - 1]
    },
    menuList() {
      return this.$store.state.menuList
    },
    currLang() {
      return this.$store.state.currLang
    },
  },
  async mounted() {
    if (this.$route.query && this.$route.query.search) {
      this.search = this.$route.query.search

      let key = ''
      this.menuList.forEach((item, index) => {
        if (item.router === '/people') {
          item.children.forEach((item2, index2) => {
            if (item2.router.indexOf(this.search) !== -1) {
              this.breadcrumbList[1].to = '/people'
              this.breadcrumbList.push({
                title_cn: item2.title_cn,
                title_en: item2.title_en
              })
              key = item2.key
            }
          })
        }
      })
      if (key) {
        this.setCurrRouteKey({
          currRouteKey: key
        })
      }else {
        this.setCurrRouteKey({
          currRouteKey: '5'
        })
      }
    }else {
      this.setCurrRouteKey({
        currRouteKey: '5'
      })
    }
    this.initPeopleTypeOption()

    await this.loadData()
  },
  methods: {
    ...mapMutations(['setCurrRouteKey']),
    /**
     * 获取数据
     * */
    async loadData() {
      this.dataLoading = true
      const res = await GetMemberMemberListApi({
        type: this.search
      })
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
      let obj = null
      newPeopleList.forEach((item, index) => {
        if (item.groupTitle === 'teacher') {
          obj = item
          newPeopleList.splice(index, 1)
        }
      })
      if (obj !== null) {
        newPeopleList.unshift(obj)
      }
      this.newPeopleList = [...newPeopleList]
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
      if (data.type === 'teacher') {
        let params = {
          id: data.id,
          parent: [
            {
              title_cn: '首页',
              title_en: 'Home',
              to: '/home',
            },
            {
              title_cn: '成员',
              title_en: 'People',
              to: '/people',
            }
          ]
        }
        this.$router.push({
          path: 'peopleDetailsPage?data=' +encodeURIComponent(JSON.stringify(params))
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.people_warp {
  width: 100%;
  .header {
  }
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    .group {
      width: 100%;
      padding: 0 50px;
      border-bottom: 6px double #f0f0f0;
      margin-bottom: 20px;

      &:last-child {
        border-bottom: 0;
      }

      .group-teacher {
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
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 40px;

            .card {
              max-width: 400px;
              margin: 0 40px 0 0;
            }

            .introduction {
              flex: 1;
              .name {
                font-size: 20px;
                margin-bottom: 20px;
                font-weight: bold;
                color: #333333;
              }
              .contact {
                font-size: 18px;
                color: #333333;
                margin-bottom: 20px;
              }
              p {
                white-space: pre-wrap;
                font-size: 18px;
                line-height: 28px;
                color: #333333;
              }
            }
          }

        }
      }

      .group-other {
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
            max-width: 400px;
            margin: 0 40px 40px 0;
          }
        }
      }

    }
  }
}

.people_warp-lg, .people_warp-md {

  .content {
    .group {

      .group-teacher {
        .group-title {
        }
        .group-content {
          .row {
            .card {
            }
            .introduction {
              flex: 1;
              .name {
                font-size: 20px;
              }
              .contact {
                font-size: 18px;
              }
              p {
                font-size: 18px;
              }
            }
          }

        }
      }

      .group-other {
        .group-title {
        }
        .group-content {
          .card {
          }
        }
      }
    }
  }
}

.people_warp-sm {

  .content {
    .group {
      padding: 0 20px;
      .group-teacher {
        .group-title {
        }
        .group-content {
          .row {
            .card {
              width: 40%;
            }
            .introduction {
              flex: 1;
              .name {
                font-size: 18px;
              }
              .contact {
                font-size: 16px;;
              }
              p {
                font-size: 16px;;
              }
            }
          }

        }
      }

      .group-other {
        .group-title {
        }
        .group-content {
          .card {
            width: 40%;
          }
        }
      }
    }
  }
}

.people_warp-xs {

  .content {
    .group {
      padding: 0 20px;
      .group-teacher {
        .group-title {
          font-size: 22px;
        }
        .group-content {
          .row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            .card {
              width: 100%;
              margin: 0 0 10px 0;
            }
            .introduction {
              .name {
                font-size: 18px;
                margin-bottom: 10px;
              }
              .contact {
                font-size: 16px;;
              }
              p {
                font-size: 16px;;
              }
            }
          }

        }
      }

      .group-other {
        .group-title {
        }
        .group-content {
          .card {
            width: 100%;
            margin: 0;
          }
        }
      }
    }
  }
}

</style>