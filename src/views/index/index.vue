<template>
  <div class="index_warp">
    <div class="header">
      <div class="header-icon">
        <el-image
            class="icon"
            src="https://vahala.caltech.edu/static/core/img/caltech-new-logo.png"
        ></el-image>
        <el-divider class="divider" direction="vertical"></el-divider>
        <div class="title">
          Vahala Research Group
        </div>
      </div>
      <div class="actions">
        <el-select class="lang-change" size="mini" v-model="currLang" @change="langChange" placeholder="请选择">
          <el-option
              v-for="(item, index) in langOptions"
              :key="'langOptions' + index"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="menu_warp">
      <el-menu
          :default-active="menuActiveIndex"
          class="menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#ffffff"
          text-color="#4A4A4A"
          active-text-color="#D14900"
      >
        <el-menu-item index="1">
          <span class="text">Home</span>
        </el-menu-item>
        <el-submenu index="2" popper-class="header-submenu">
          <template slot="title">
            <span class="text">研究</span>
          </template>
          <el-menu-item index="2-1">
            <el-submenu index="2-2" popper-class="header-submenu">
              <template slot="title">
                <span class="text">研究1</span>
              </template>
              <el-menu-item index="2-2-1">
                <span class="text">选项1</span>
              </el-menu-item>
              <el-menu-item index="2-2-2">
                <span class="text">选项2</span>
              </el-menu-item>
              <el-menu-item index="2-2-3">
                <span class="text">选项3</span>
              </el-menu-item>
            </el-submenu>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span class="text">研究2</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span class="text">研究3</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3" popper-class="header-submenu">
          <template slot="title">
            <span class="text">出版物</span>
          </template>
          <el-menu-item index="3-1">
            <span class="text">出版物1</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <span class="text">出版物2</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <span class="text">出版物3</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <span class="text">人们</span>
        </el-menu-item>
      </el-menu>
    </div>

    <router-view></router-view>

    <div class="footer">
      <div class="footer-content">
        <div class="footer-content-top">
          <div class="footer-content-top-left">
            <el-image
                class="icon"
                src="https://vahala.caltech.edu/static/core/img/caltech-new-logo.png"
            ></el-image>
            <div class="title">
              California Institute of Technology
            </div>
          </div>
          <div class="footer-content-top-right">
            <div class="text">
              1200 East California Boulevard
              <br>
              Pasadena, California 91125
            </div>
            <el-image
                class="icon"
                src="https://vahala.caltech.edu/static/theme-v7.0/img/icon-footerpin.png"
            ></el-image>
          </div>
        </div>
        <div class="footer-content-bottom">
          Home
          <el-divider direction="vertical"></el-divider>
          Privacy Notice
          <el-divider direction="vertical"></el-divider>
          Site Content Copyright © 2021
          <el-divider direction="vertical"></el-divider>
          Log In
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      menuActiveIndex: '1',
      currLang:'',
      langOptions:[
        {
          value: 'cn',
          label: '中文'
        }, {
          value: 'en',
          label: 'English'
        }
      ]
    }
  },
  created() {
    console.log(localStorage.lang)
    this.currLang = localStorage.lang == undefined?'cn':localStorage.lang
  },
  methods: {
    /**
    * 切换菜单
    * */
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    /**
    * 语言切换
    * */
    langChange(e){
      localStorage.setItem('lang', e)
      this.$i18n.locale = e
    }
  }
}
</script>

<style lang="scss" scoped>
.index_warp {
  width: 100%;
  .header {
    width: 100%;
    height: 80px;
    padding: 0 90px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .header-icon {
      width: 100%;
      max-height: 40px;
      height: 40px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      .icon {
        height: 100%;
      }
      .divider {
        height: 100%;
        width: 2px;
        margin-left: 26px;
        margin-right: 26px;
        background-color: #c8c8c8;
      }
      .title {
        font-size: 20px;
        letter-spacing: -0.56px;
        color: #666666;
      }
    }
    .actions {
      .lang-change {
        width: 100px;
      }
    }
  }
  .menu_warp {
    width: 100%;
    padding: 0 90px;
    box-sizing: border-box;
    margin-bottom: 40px;
    margin-top: 10px;

    & /deep/ .menu {
      border-bottom: 0;
      .text {
        font-size: 22px;
        font-weight: bold;
      }
      .el-menu-item {
        padding: 0 30px 0 0;
        border-bottom: 0;
        &:hover {
          background-color: #ffffff !important;
        }
      }
      .el-submenu {
        .el-submenu__title {
          background-color: #ffffff !important;
          padding: 0 30px 0 0;
          border-bottom: 0;
        }
      }
      .is-active {
        border-bottom: #ffffff;
      }

    }
  }
  .footer {
    margin-top: 40px;
    width: 100%;
    height: 220px;
    padding: 0 40px;
    box-sizing: border-box;

    .footer-content {
      width: 100%;
      height: 100%;
      background-color: #003B4C;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 50px;
      box-sizing: border-box;

      .footer-content-top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .footer-content-top-left {
          .icon {
            height: 26px;
            margin-bottom: 10px;
          }
          .title {
            color: #ffffff;
            font-size: 15px;
            font-weight: bold;
          }
        }
        .footer-content-top-right {
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            height: 26px;
            margin-left: 10px;
          }
          .text {
            color: #ffffff;
            font-size: 15px;
            text-align: right;
            line-height: 22px;
          }
        }
      }

      .footer-content-bottom {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #c8c8c8;
        font-size: 14px;
        margin-top: 35px;
      }
    }

  }
}
</style>
<style lang="scss">
.header-submenu {
  .el-menu--popup {
    border-top: 5px solid #D14900;
    border-radius: 0 !important;
    background-color: #1B1B1B !important;
    padding: 10px 0 15px 0;
    .el-menu-item {
      background-color: #1B1B1B !important;
      .text {
        font-size: 18px;
        color: #ffffff;
        padding: 0 20px 0 20px;
      }
      .el-submenu {
        .el-submenu__title {
          background-color: #1B1B1B !important;
          padding: 0 20px 0 0;
        }
        .header-submenu {
          .el-menu--popup {
            border-top: 5px solid #D14900;
            border-radius: 0 !important;
            background-color: #1B1B1B !important;
            padding: 10px 0 15px 0;
            .el-menu-item {
              background-color: #1B1B1B !important;
              .text {
                font-size: 18px;
                color: #ffffff;
                padding: 0 20px 0 20px;
              }
              .el-submenu {
                .el-submenu__title {
                  background-color: #1B1B1B !important;
                  padding: 0 20px 0 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>