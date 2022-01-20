<template>
  <div :class="'researchDetailsPage_warp ' + customPageClassName" v-loading="dataLoading">
    <page-header-block
        :title="researchData['title_' + currLang]"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <mavon-editor v-model="researchData['content_' + currLang]"
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
import {GetResearchResearchDetailApi} from "@/request/api";
import mixins from "@/mixins/mixins";
export default {
  name: "researchDetailsPage",
  mixins: [mixins],
  components: {PageHeaderBlock},
  data() {
    return {
      dataLoading: false,
      id: '',
      breadcrumbList: [],
      researchData: {},
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
    parentList.forEach((item, index) => {
      this.breadcrumbList.push(item)
    })
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.dataLoading = true
      const res = await GetResearchResearchDetailApi({
        research_id: this.id
      })
      if (res) {
        this.researchData = res.research_info
      }
      this.dataLoading = false
    },
  }
}
</script>

<style lang="scss" scoped>
.researchDetailsPage_warp {
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
      font-size: 18px;
      & /deep/ .v-show-content {
        padding: 0;
        background-color: #ffffff !important;
      }
    }
  }
}
.customPage_warp-sm, .customPage_warp-xs {
  .content {
    .markdown-warp {
      font-size: 16px;
    }
  }
}
</style>