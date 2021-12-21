<template>
  <div class="manage_warp">
    <page-header-block :title="pageHeaderBlockTitle" :breadcrumb-list="breadcrumbList"></page-header-block>
    <div class="content">

      <div class="sidebar">
        <el-menu
            class="menu"
            :default-active="menuDefaultActive"
            text-color="#000000"
            active-text-color="#ffd04b"
            @select="handleMenuSelect"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单栏管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">页面内容管理</span>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="main">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";

export default {
  name: "manage",
  components: {PageHeaderBlock},
  data() {
    return {
      menuDefaultActive: '1',

      pageHeaderBlockTitle: '管理',
      breadcrumbList: [
        {
          title: '首页',
          to: '/Home',
        },
        {
          title: '管理',
        }
      ],

    }
  },
  created() {
    let url = this.$route.path
    if (url === '/pageHeaderMenuManage') {
      this.menuDefaultActive = '1'
    }
    if (url === '/pageContentManage') {
      this.menuDefaultActive = '2'
    }
  },
  methods: {
    /**
    * 切换侧边菜单栏
    * */
    handleMenuSelect(key, keyPath) {
      if (key === '1') {
        this.menuDefaultActive = key
        this.$router.push('/pageHeaderMenuManage')
      }
      if (key === '2') {
        this.menuDefaultActive = key
        this.$router.push('/pageContentManage')
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.manage_warp {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .sidebar {
      margin-right: 30px;
    }

    .main {
      flex: 1;
    }
  }
}
</style>