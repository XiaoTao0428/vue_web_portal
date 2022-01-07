<template>
  <div class="researchDetailsPage_warp">
    <page-header-block
        :title="newData['title_' + currLang]"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <mavon-editor v-model="newData['content_' + currLang]"
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
export default {
  name: "researchDetailsPage",
  components: {PageHeaderBlock},
  data() {
    return {
      dataLoading: false,
      id: '',
      breadcrumbList: [],
      newData: {},
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
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.researchDetailsPage_warp {
  width: 100%;
  .content {
    width: 100%;
    padding: 0 130px;
    box-sizing: border-box;
  }
}
</style>