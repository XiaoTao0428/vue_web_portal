<template>
  <div class="pageContentManage_warp">
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane class="tab-pane" label="首页" name="first">

        <div class="tab-pane-content">

          <modify-paper-content></modify-paper-content>

        </div>

      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        配置管理
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ModifyPaperContent from "@/components/modifyPaperContent/modifyPaperContent";
export default {
  name: "pageContentManage",
  components: {ModifyPaperContent},
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    handleTabClick(tab) {

    },
  }
}
</script>

<style lang="scss" scoped>
.pageContentManage_warp {
  width: 100%;

  .tabs {
    width: 100%;

    .tab-pane {
      width: 100%;

      .tab-pane-content {
        width: 100%;
      }
    }
  }
}
</style>