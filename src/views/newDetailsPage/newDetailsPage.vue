<template>
  <div :class="'newDetailsPage_warp ' + newDetailsPageClassName" v-loading="dataLoading">
<!--    <page-header-block-->
<!--        :title="pageHeaderBlockTitle"-->
<!--        :breadcrumb-list="breadcrumbList"-->
<!--    ></page-header-block>-->
    <div class="header">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item class="breadcrumb-item" v-for="(item, index) in breadcrumbList" :key="'breadcrumbList' + index">
          <span class="breadcrumb-item-a" v-if="item.to" @click="handleMenuListSelect(item)">{{item['title_' + currLang]}}</span>
          <span class="breadcrumb-item-span" v-else>{{item['title_' + currLang]}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">

      <div class="image-wrapper">
        <el-image
            class="image"
            :src="newData.cover_image"
            fit="contain"
        ></el-image>

        <div class="depiction">
          <div class="depiction-content">
            <div class="title">
              {{newData['title_' + currLang]}}
            </div>
            <div class="date">
              {{newData.news_date}}
            </div>
            <div class="preface">
              {{newData['preface_' + currLang]}}
            </div>
          </div>
        </div>
      </div>

      <div class="article">
        <mavon-editor v-model="newData['content_' + currLang]"
                      class="markdown-warp"
                      :language="'zh-CN'"
                      :editable="false"
                      :toolbars-flag="false"
                      :subfield="false"
                      :default-open="'preview'"
        ></mavon-editor>
      </div>

    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
import {GetNewsNewsDetailApi} from "@/request/api";
import {mapMutations} from "vuex";
import mixins from "@/mixins/mixins";
export default {
  name: "newDetailsPage",
  mixins: [mixins],
  components: {PageHeaderBlock},
  data() {
    return {
      dataLoading: false,
      id: '',
      pageHeaderBlockTitle: '某某',
      breadcrumbList: [],
      newData: {},
    }
  },
  computed: {
    currRoutePath() {
      return this.$store.state.currRoutePath
    },
    menuList() {
      return this.$store.state.menuList
    },
    currLang() {
      return this.$store.state.currLang
    },
  },
  async mounted() {
    let data = this.$route.query.data
    let param = JSON.parse(decodeURIComponent(data))
    this.id = param.id
    let parentList = param.parent
    console.log('parentList', parentList)
    parentList.forEach((item, index) => {
      this.breadcrumbList.push(item)
    })
    await this.loadData()
    this.breadcrumbList.push({
      title_cn: this.newData.title_cn,
      title_en: this.newData.title_en,
    })
    console.log('breadcrumbList', this.breadcrumbList)
    // this.menuList.forEach((item, index) => {
    //   if (item.id === this.id) {
    //     console.log(item)
    //     this.breadcrumbList.push({
    //       title_cn: item.title_cn,
    //       title_en: item.title_en,
    //       to: item.router,
    //     })
    //   }
    // })
  },
  methods: {
    ...mapMutations(['setCurrRoutePath']),
    async loadData() {
      this.dataLoading = true
      const res = await GetNewsNewsDetailApi({
        news_id: this.id
      })
      console.log(res)
      if (res) {
        this.newData = res.news_info
      }
      this.dataLoading = false
    },
    handleMenuListSelect(obj) {
      let path = obj.to.split('?')[0]
      if (this.currRoutePath === path) {
        this.$router.push(obj.to)
        this.$router.go(0)
      }else {
        this.setCurrRoutePath({
          currRoutePath: path
        })
        this.$router.push(obj.to)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.newDetailsPage_warp {
  width: 100%;
  .header {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    & /deep/ .breadcrumb {
      font-size: 14px;
      padding-bottom: 15px;
      box-sizing: border-box;
      .breadcrumb-item {
        .breadcrumb-item-a {
          color: #D14900;
          cursor: pointer;
          margin-bottom: 10px;
        }
        .breadcrumb-item-span {
          color: #aaa99f;
        }
      }
    }
  }
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    box-sizing: border-box;

    .image-wrapper {
      margin-bottom: 40px;
      position: relative;

      .image {
        width: 100%;
      }

      .depiction {
        width: 100%;
        background-color: unset;
        position: absolute;
        bottom: 0;
        box-sizing: border-box;

        .depiction-content {
          width: 100%;
          max-width: 1200px;
          padding: 0 50px;
          box-sizing: border-box;
          margin: 0 auto;

          .title {
            font-size: 50px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 20px;
          }

          .date {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #ffffff;
          }

          .preface {
            font-size: 22px;
            color: #ffffff;
            margin-bottom: 30px;
          }
        }

      }
    }

    .article {
      width: 100%;
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
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
}

.newDetailsPage_warp-xs {
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    box-sizing: border-box;

    .image-wrapper {
      margin-bottom: 40px;
      position: relative;

      .image {
        width: 100%;
      }

      .depiction {
        .depiction-content {
          padding: 0 20px;
          box-sizing: border-box;
          .title {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .date {
            font-size: 10px;
            margin-bottom: 10px;
          }

          .preface {
            font-size: 16px;
            margin-bottom: 10px;
          }
        }

      }
    }
  }
}
</style>