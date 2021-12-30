<template>
  <div class="NotFound404_warp">
    <div class="content">
      <div class="left">

      </div>
      <div class="right">
        <div class="title">404</div>
        <div class="msg">
          真是抱歉，找不到页面
        </div>
        <div class="actions">
          <el-button @click="goBack">返回上一页</el-button>
          <el-button @click="goHome">返回首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound404",
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.NotFound404_warp {
  width: 100vw;
  height: 100vh;
  background-color: #585A67;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    .right {
      .title {
        font-size: 80px;
        font-weight: bold;
        color: #ffffff;
      }
      .msg {
        font-size: 20px;
        color: #ffffff;
        margin-top: 20px;
      }
      .actions {
        margin-top: 40px;
        color: #ffffff;
      }
    }
  }

}
</style>