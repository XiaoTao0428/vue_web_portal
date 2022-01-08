<template>
  <div class="peopleDetailsPage_warp" v-loading="dataLoading">
    <page-header-block
        :title="peopleData['name_' + currLang]"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <mavon-editor v-model="peopleData['detail_' + currLang]"
                    class="markdown-warp"
                    :language="'zh-CN'"
                    :editable="false"
                    :toolbars-flag="false"
                    :subfield="false"
                    :default-open="'preview'"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
import {GetMemberMemberDetailApi} from "@/request/api";
export default {
  name: "peopleDetailsPage",
  components: {PageHeaderBlock},
  data() {
    return {
      dataLoading: false,
      id: '',
      breadcrumbList: [],
      peopleData: {},
    }
  },
  computed: {
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
    console.log('breadcrumbList', this.breadcrumbList)
  },
  methods: {
    async loadData() {
      this.dataLoading = true
      const res = await GetMemberMemberDetailApi({
        member_id: this.id
      })
      console.log(res)
      if (res) {
        this.peopleData = res.member_info
      }
      this.dataLoading = false
    },
  }
}
</script>

<style lang="scss" scoped>
.peopleDetailsPage_warp {
  width: 100%;
  .content {
    width: 100%;
    max-width: 1040px;
    padding: 0 20px;
    margin: 0 auto;
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
</style>