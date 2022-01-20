<template>
  <div :class="'home_warp ' + homeClassName" v-loading="dataLoading">

    <div class="content">

      <div class="home-left">
        <mavon-editor class="markdown-warp" v-model="homePaperValue['value_' + currLang]"
                      :language="'zh-CN'"
                      :editable="false"
                      :toolbars-flag="false"
                      :subfield="false"
                      :default-open="'preview'"
        ></mavon-editor>
      </div>

      <div class="home-right">
        <div class="picture-introduction">
          <el-carousel height="400px" indicator-position="none">
            <el-carousel-item v-for="(item, index) in newsList" :key="'news' + index">

              <div class="image-warp" @click="toNewsDetails(item)">
<!--                <el-image-->
<!--                    class="image"-->
<!--                    :src="item.cover_image"-->
<!--                ></el-image>-->
                <img class="image" :src="item.cover_image" />
                <div class="image-msg" v-if="item.cover_image">
                  {{item['title_' + currLang]}}
                </div>
              </div>

            </el-carousel-item>
          </el-carousel>

        </div>

        <div class="research-list">

          <div class="research-list-header">
            <div class="research-list-header-title">
              {{$t('index.Research')}}
            </div>
            <span class="link" @click="toResearch" :underline="false">{{$t('home.AllResearch')}} <i class="el-icon-arrow-right"></i></span>
          </div>

          <div class="news-content">
            <div class="new-item" v-for="(item, index) in researchList" :key="'research' + index">

              <image-text-card
                  :image-url="item.cover_image"
                  :date="item.date"
                  :description="item['title_' + currLang]"
                  :have-details="true"
                  @handleClick="toResearchDetails(item)"
              ></image-text-card>

            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import {GetIndexIndexInfoApi, GetNewsNewsListApi, GetResearchTesearchListApi} from "@/request/api";
import {file_before_url} from "@/config/baseURL";
import ImageTextCard from "@/components/imageTextCard/imageTextCard";
import {mapMutations} from "vuex";

export default {
  name: "home",
  mixins: [mixins],
  components: {ImageTextCard},
  data () {
    return {
      dataLoading: false,
      fileBeforeUrl: file_before_url,
      homePaperValue: {
        value_cn: '',
        value_en: '',
      },
      homeImageForm: {
        // describe_cn: '',
        // describe_en: '',
        imageUrl: '',
        // groupName_cn: '',
        // groupName_en: '',
        contactAddress_cn: '',
        contactAddress_en: '',
      },
      newsList: [],
      researchList: [],
    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    },
    // homeImageUrl() {
    //   if (this.homeImageForm.imageUrl) {
    //     return this.fileBeforeUrl + '' + this.homeImageForm.imageUrl
    //   }else {
    //     return ''
    //   }
    // }
  },
  created() {
    this.setCurrRouteKey({
      currRouteKey: '1'
    })
  },
  mounted() {
    this.loadHomeData()
  },
  methods: {
    ...mapMutations(['setGroupInfo', 'setCurrRouteKey']),
    /**
     * 获取首页数据
     * */
    async loadHomeData() {
      this.dataLoading = true
      const res = await GetIndexIndexInfoApi()
      console.log(res)
      if (res) {
        // this.homeImageForm.groupName_cn = res.index_info.group_name_cn
        // this.homeImageForm.groupName_en = res.index_info.group_name_en
        this.homeImageForm.contactAddress_cn = res.index_info.contact_address_cn
        this.homeImageForm.contactAddress_en = res.index_info.contact_address_en

        this.homePaperValue.value_cn = res.index_info.home_article_cn
        this.homePaperValue.value_en = res.index_info.home_article_en
        this.homeImageForm.imageUrl = res.index_info.home_image
        // this.homeImageForm.describe_cn = res.index_info.home_image_description_cn
        // this.homeImageForm.describe_en = res.index_info.home_image_description_en

        this.setGroupInfo({
          groupInfo: {
            // name_cn: this.homeImageForm.groupName_cn,
            // name_en: this.homeImageForm.groupName_en,
            icon: this.homeImageForm.imageUrl,
            contactAddress_cn: this.homeImageForm.contactAddress_cn,
            contactAddress_en: this.homeImageForm.contactAddress_en,
          }
        })
      }
      await this.loadNewsData()
      await this.loadResearchListData()
      this.dataLoading = false
    },

    /**
    * 获取新闻列表
    * */
    async loadNewsData() {
      const res = await GetNewsNewsListApi({
        page_num: 1,
        page_size: 3
      })
      console.log(res)
      if (res) {
        this.newsList = res.news_info_list
      }
    },

    /**
     * 获取研究列表
     * */
    async loadResearchListData() {
      const res = await GetResearchTesearchListApi({
        page_num: 1,
        page_size: 3
      })
      console.log(res)
      if (res) {
        this.researchList = res.research_info_list
      }
    },

    /**
     * 去研究方向页
     * */
    toResearch() {
      this.$router.push('/research')
    },
    /**
     * 去新闻详情页
     * */
    toNewsDetails(data) {
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
    },
    /**
     * 去研究方向详情页
     * */
    toResearchDetails(data) {
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
.home_warp {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  .content {
    width: 100%;
    padding: 0 50px;

    .home-left {
      margin-right: 20px;
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
    .home-right {
      margin-left: 20px;

      .picture-introduction {
        width: 100%;
        margin-bottom: 30px;

        .image-warp {
          width: 100%;
          cursor: pointer;

          position: relative;
          .image {
            min-height: 100%;
          }
          .image-msg {
            width: 100%;
            position: absolute;
            bottom: 4px;
            left: 0;
            padding: 16px 18px;
            box-sizing: border-box;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.54);
          }
        }

      }

      .research-list-header {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 30px;

        .research-list-header-title {
          color: #000000;
          font-size: 40px;
        }
        .link {
          color: #003b4c;
          font-size: 14px;
          height: 32px;
          cursor: pointer;
          &:hover {
            color: #D14900;
          }
          .el-icon-arrow-right {
            color: #D14900;
            font-weight: bold;
          }
        }
      }

      .news-content {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        .new-item {
          flex: 1;
          &:first-child {
            margin-right: 10px;
          }
          &:last-child {
            margin-left: 10px;
          }

        }

      }

    }
  }

}

.home_warp-lg, .home_warp-md, .home_warp-sm {
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .home-left {
      flex: 1;
    }
    .home-right {
      flex: 1;
    }
  }
}

.home_warp-sm {
  .content {
    padding: 0 20px;
    .home-left {
      .markdown-warp {
        font-size: 18px;
      }
    }
    .home-right {
      .picture-introduction {
        .image-msg {
          font-size: 14px;
        }
      }
      .research-list-header {
        .research-list-header-title {
          font-size: 28px;
        }
        .link {
          height: 26px
        }
      }
    }
  }
}

.home_warp-xs {
  .content {
    display: block;
    padding: 0 20px;
    .home-left {
      margin-left: 0;
      .markdown-warp {
        font-size: 18px;
      }
    }
    .home-right {
      margin-left: 0;
      .picture-introduction {
        .image-msg {
          font-size: 12px;
        }
      }
      .research-list-header {
        .research-list-header-title {
          font-size: 28px;
        }
        .link {
          height: 26px
        }
      }
    }
  }
}
</style>