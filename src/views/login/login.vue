<template>
  <div class="login_warp">
    <div class="content">
      <div class="card">
        <div class="title">
          {{$t('index.LogIn')}}
        </div>
        <el-form ref="loginFormRef" :rules="rules" :model="loginForm" label-width="0px">
          <el-form-item label="" prop="username">
            <el-input size="" v-model="loginForm.username"
                      :placeholder="$t('index.Username')"
            >
              <div class="icon" slot="prefix">
                <img src="../../assets/icon/username.png">
              </div>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="loginForm.password"
                      :placeholder="$t('index.Password')"
                      type="password"
            >
              <div class="icon" slot="prefix">
                <img src="../../assets/icon/password.png">
              </div>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" :loading="btnLoading" @click="submitForm">{{$t('index.LogIn')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {PostUserLoginApi} from '@/request/api'
export default {
  name: "login",
  data() {
    return {
      btnLoading: false,
      loginForm: {
        // username: 'admin',
        // password: 'admin',
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    ...mapMutations(['login']),
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          const res = await PostUserLoginApi({
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          if (res) {
            this.login({
              token: res.token,
              userInfo: {
                name_cn: res.user_info.name_cn,  // 中文名
                name_en: res.user_info.name_en,  // 英文名
                gender: res.user_info.gender,  // 1：男  0：女
                contact_cn: res.user_info.contact_cn,  // 联系方式中文
                contact_en: res.user_info.contact_en,  // 联系方式英文
              },
            })
            this.$message.success('登录成功')
            await this.$router.push('/home')
          }
          this.btnLoading = false
        }
      });
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.login_warp {
  width: 100vw;
  height: 100vh;
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    .card {
      width: 100%;
      margin: 0 auto;
      max-width: 400px;
      padding: 30px 40px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius: 20px;

      .title {
        color: #333333;
        width: 100%;
        font-size: 36px;
        margin-bottom: 36px;
      }

      & /deep/ .el-form {
        width: 100%;
        .el-form-item {
          .el-form-item__label {
            color: #ffffff;
          }

          .icon {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>