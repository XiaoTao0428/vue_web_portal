<template>
  <div class="home_warp" v-loading="dataLoading">

    <div :class="contentClassName">

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
          <el-image
              class="image"
              :src="homeImageUrl"
          ></el-image>
          <div class="image-msg">
            {{homeImageForm['describe_' + currLang]}}
          </div>
        </div>

        <div class="news">

          <div class="news-header">
            <div class="news-header-title">
              {{$t('index.News')}}
            </div>
            <span class="link" @click="toNews" :underline="false">{{$t('home.AllNews')}} <i class="el-icon-arrow-right"></i></span>
          </div>

          <div class="news-content">
            <div class="new-item" v-for="(item, index) in newsList" :key="'new' + index">

              <image-text-card
                  :image-url="item.cover_image"
                  :date="item.news_date"
                  :description="item['title_' + currLang]"
                  :have-details="true"
                  @handleClick="toDetails(item)"
              ></image-text-card>


<!--              <div class="image-description">-->
<!--                <el-image-->
<!--                    class="image"-->
<!--                    :src="item.cover_image"-->
<!--                ></el-image>-->
<!--                <div class="line"></div>-->
<!--              </div>-->
<!--              <div class="date">-->
<!--                <i class="el-icon-menu"></i> 2020 年 6 月 18 日-->
<!--              </div>-->
<!--              <div class="description" v-if="currLang === 'en'">-->
<!--                Optical Microcomb Device May Result in Improved Telecommunications, Sensors, Clocks-->
<!--              </div>-->
<!--              <div class="description" v-if="currLang === 'cn'">-->
<!--                光学微梳装置可能会改善电信、传感器、时钟-->
<!--              </div>-->

            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
import {GetIndexIndexInfoApi, GetNewsNewsListApi} from "@/request/api";
import {file_before_url} from "@/config/baseURL";
import ImageTextCard from "@/components/imageTextCard/imageTextCard";
import {mapMutations} from "vuex";

export default {
  name: "home",
  components: {ImageTextCard},
  mixins: [mixins],
  data () {
    return {
      dataLoading: false,
      fileBeforeUrl: file_before_url,
      homePaperValue: {
        value_cn: '',
        value_en: '',
      },
      homeImageForm: {
        describe_cn: '',
        describe_en: '',
        imageUrl: '',
        groupName_cn: '',
        groupName_en: '',
        contactAddress_cn: '',
        contactAddress_en: '',
      },
      newsList: [],
    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    },
    homeImageUrl() {
      if (this.homeImageForm.imageUrl) {
        return this.fileBeforeUrl + '' + this.homeImageForm.imageUrl
      }else {
        return ''
      }
    }
  },
  created() {
  },
  mounted() {
    this.loadHomeData()
  },
  methods: {
    ...mapMutations(['setGroupInfo']),
    /**
     * 获取首页数据
     * */
    async loadHomeData() {
      this.dataLoading = true
      const res = await GetIndexIndexInfoApi()
      console.log(res)
      if (res) {
        this.homeImageForm.groupName_cn = res.index_info.group_name_cn
        this.homeImageForm.groupName_en = res.index_info.group_name_en
        this.homeImageForm.contactAddress_cn = res.index_info.contact_address_cn
        this.homeImageForm.contactAddress_en = res.index_info.contact_address_en

        this.homePaperValue.value_cn = res.index_info.home_article_cn
        this.homePaperValue.value_en = res.index_info.home_article_en
        this.homeImageForm.imageUrl = res.index_info.home_image
        this.homeImageForm.describe_cn = res.index_info.home_image_description_cn
        this.homeImageForm.describe_en = res.index_info.home_image_description_en

        this.setGroupInfo({
          groupInfo: {
            name_cn: this.homeImageForm.groupName_cn,
            name_en: this.homeImageForm.groupName_en,
            contactAddress_cn: this.homeImageForm.contactAddress_cn,
            contactAddress_en: this.homeImageForm.contactAddress_en,
          }
        })
      }
      await this.loadNewsData()
      this.dataLoading = false
    },

    /**
    * 获取新闻列表
    * */
    async loadNewsData() {
      const res = await GetNewsNewsListApi({
        page_num: 1,
        page_size: 2
      })
      console.log(res)
      if (res) {
        this.newsList = res.news_info_list
      }
    },

    toNews() {
      this.$router.push('/news')
    },
    /**
     * 去详情页
     * */
    toDetails(data) {
      console.log(data)
      let params = {
        id: data.id,
        parent: [
          {
            title_cn: '首页',
            title_en: 'Home',
            to: '/home',
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
.home_warp {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;


  .content-md,.content-lg {
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .home-left {
      flex: 1;
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
      flex: 1;
      margin-left: 20px;

      .picture-introduction {
        width: 100%;
        margin-bottom: 30px;
        position: relative;
        .image {
          max-width: 100%;
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

      .news-header {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 30px;

        .news-header-title {
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

  .content-sm,.content-xs {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .home-left {
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
      .picture-introduction {
        width: 100%;
        margin-bottom: 30px;
        position: relative;
        .image {
          max-width: 100%;
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

      .news-header {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 30px;

        .news-header-title {
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

  .content-xs {
    .image-msg {
      font-size: 12px;
    }
  }
}
</style>