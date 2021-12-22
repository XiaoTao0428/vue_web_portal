<template>
  <div class="index_warp">
    <div class="content">
      <div class="header">
        <div class="header-icon">
          <el-image
              class="icon"
              fit="contain"
              :src="TSINGHUA_UNIVERSITY_logo"
          ></el-image>
          <el-divider class="divider" direction="vertical"></el-divider>
          <div class="title">
            {{$t('index.VahalaResearchGroup')}}
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

      <div class="menu-warp">

        <!--    大屏幕时的效果    -->
        <div class="menu-list-lg" :style="isInit?'':'overflow-x: auto;'" id="headerMenuId" v-if="!menuOverflow && currScreenSize === 'lg'">
          <div class="menu-item" v-for="(item, index) in menuList" :key="'menuList' + index">
            <span class="menu-item-title" @click="handleMenuListSelect(item)">{{item['title_' + currLang]}}</span>
            <div class="submenu" v-if="item.children && item.children.length > 0">
              <div class="submit-item" v-for="(item2, index2) in item.children" :key="'submenu' + index2">
                <span class="submit-item-title" @click="handleMenuListSelect(item)">{{item2['title_' + currLang]}}</span>
              </div>
            </div>
          </div>
        </div>

        <!--    小屏幕时的效果    -->
        <div class="menu-list-no-lg" v-if="menuOverflow || currScreenSize !== 'lg'">
          <div class="action" v-clickoutside="menuListPopupHide">
            <div @click="menuListPopupVisibleChange">
              <span class="menu-title">{{$t('index.Menu')}}</span>
              <i class="el-icon-menu"></i>
            </div>
            <div class="menu-list-popup" v-show="menuListPopupVisible">
              <div class="menu-list-popup-content" :style="menuListPopupContentVisible?'left: -230px;':'left: 0px;'">
                <div class="close-popup" @click="menuListPopupHide">
                  <i class="el-icon-close"></i>
                  <span class="close-btn-title">关闭</span>
                </div>
                <div class="menu-item" v-for="(item, index) in menuList" :key="'menuList' + index">
                  <div class="menu-item-title-warp">
                    <span class="menu-item-title" @click="handleMenuListSelect(item)">{{item['title_' + currLang]}}</span>
                    <span class="icon">
                    <i v-if="item.children && item.children.length > 0" class="el-icon-arrow-right" @click="menuListPopupContentVisibleChange(item.children)"></i>
                  </span>
                  </div>
                </div>

                <div class="submenu-popup" v-if="menuListPopupContentVisible">
                  <div class="submenu-popup-header">
                    <div class="submenu-popup-header-title">
                      标题
                    </div>
                    <div class="action" @click.stop="menuListPopupContentHide">
                      <i class="el-icon-arrow-left"></i>
                      <span class="back-text">返回</span>
                    </div>
                  </div>
                  <div class="submit-item" v-for="(item2, index2) in submitList" :key="'submenu' + index2" @click="handleMenuListSelect(item2)">
                    <span class="submit-item-title">{{item2['title_' + currLang]}}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="main">
        <router-view></router-view>
      </div>

      <div class="footer">
        <div class="footer-content">
          <div class="footer-content-top">
            <div class="footer-content-top-left">
              <el-image
                  class="icon"
                  fit="contain"
                  src="https://vahala.caltech.edu/static/core/img/caltech-new-logo.png"
              ></el-image>
              <div class="title">
                {{$t('index.CaliforniaInstituteOfTechnology')}}
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
                  fit="contain"
                  src="https://vahala.caltech.edu/static/theme-v7.0/img/icon-footerpin.png"
              ></el-image>
            </div>
          </div>
          <div class="footer-content-bottom">
            <el-link class="link" :underline="false">{{$t('index.Home')}}</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link class="link" :underline="false">{{$t('index.PrivacyNotice')}}</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link class="link" :underline="false">{{$t('index.SiteContentCopyright')}} © 2021</el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link class="link" :underline="false">{{$t('index.LogIn')}}</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TSINGHUA_UNIVERSITY_logo from '../../assets/icon/TSINGHUA_UNIVERSITY_logo2.png'
import mixins from '@/mixins/mixins'
export default {
  name: "index",
  mixins: [mixins],
  data() {
    return {
      TSINGHUA_UNIVERSITY_logo: TSINGHUA_UNIVERSITY_logo,  // logo 图标
      isInit: false,
      currLang:'',  // 当前的语言
      langOptions:[
        {
          value: 'cn',
          label: '中文'
        }, {
          value: 'en',
          label: 'English'
        }
      ],
      menuList: [
        {
          key: '1',
          title_cn: '首页',
          title_en: 'Home',
          router: '/home',
        },
        {
          key: '2',
          title_cn: '研究',
          title_en: 'Research',
          router: '/research',
        },
        {
          key: '3',
          title_cn: '新闻',
          title_en: 'News',
          router: '/news',
        },
        {
          key: '4',
          title_cn: '出版物',
          title_en: 'Publications',
          router: '/publications',
        },
        {
          key: '5',
          title_cn: '成员',
          title_en: 'People',
          router: '/people',
          children: [
            {
              key: '5-1',
              title_cn: '教师',
              title_en: 'Teacher',
              router: '/people?search=teacher',
            },
            {
              key: '5-2',
              title_cn: '博士后',
              title_en: 'Postdoc',
              router: '/people?search=postdoc',
            },
            {
              key: '5-3',
              title_cn: '博士',
              title_en: 'Doctor',
              router: '/people?search=doctor',
            },
            {
              key: '5-4',
              title_cn: '硕士',
              title_en: 'master',
              router: '/people?search=master',
            },
            {
              key: '5-5',
              title_cn: '校友',
              title_en: 'Alumni',
              router: '/people?search=alumni',
            }
          ]
        },
        {
          key: '6',
          title_cn: '管理',
          title_en: 'Manage',
          router: '/manage',
        },
      ],
      menuOverflow: false,  // 菜单栏是否溢出
      menuListPopupVisible: false,  // 菜单栏弹窗
      menuActiveIndex: '1',  // 激活的菜单栏
      submitList: [],  // 子菜单列表
      menuListPopupContentVisible: false,
    }
  },
  created() {
    let url = this.$route.path
    console.log(url)
    this.setCurrRoutePath({
      currRoutePath: url
    })

    this.currLang = localStorage.lang == undefined?'cn':localStorage.lang
    this.setCurrLang({
      currLang: this.currLang
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations(['setCurrLang', 'setCurrRoutePath']),
    init() {
      this.isInit = false
      if (this.currScreenSize === 'lg' && !this.menuOverflow) {
        let headerMenuDom = document.getElementById('headerMenuId')
        if (headerMenuDom.scrollWidth > headerMenuDom.offsetWidth || (headerMenuDom.scrollWidth > 1340)) {
          this.menuOverflow = true
        } else {
          this.menuOverflow = false
        }
      }
      this.isInit = true
    },
    /**
     * 切换菜单
     * */
    handleMenuListSelect(obj) {
      console.log(obj)
      this.menuListPopupHide()
      this.$router.push(obj.router)
    },
    // /**
    // * 切换菜单
    // * */
    // handleMenuListNoLgSelect(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    /**
    * 语言切换
    * */
    langChange(e){
      localStorage.setItem('lang', e)
      this.$i18n.locale = e
      this.setCurrLang({
        currLang: this.currLang
      })
      this.menuOverflow = false
      this.$nextTick(() => {
        this.init()
      })
    },
    /**
    * 切换菜单栏弹出层是否显示
    * */
    menuListPopupVisibleChange() {
      this.menuListPopupVisible = !this.menuListPopupVisible
      this.menuListPopupContentVisible = false
    },
    menuListPopupHide() {
      this.menuListPopupVisible = false
      this.menuListPopupContentVisible = false
    },
    menuListPopupContentHide() {
      this.menuListPopupContentVisible = false
    },
    menuListPopupContentVisibleChange(arr) {
      this.menuListPopupContentVisible = !this.menuListPopupContentVisible
      this.submitList = arr
    },
  }
}
</script>

<style lang="scss" scoped>
.index_warp {
  width: 100%;

  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;

    .header {
      width: 100%;
      height: 77px;
      padding: 0 50px;
      box-sizing: border-box;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .header-icon {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        .icon {
          height: 100%;
          cursor: pointer;
        }
        .divider {
          height: 100%;
          width: 2px;
          margin-left: 26px;
          margin-right: 26px;
          background-color: #c8c8c8;
        }
        .title {
          font-size: 24px;
          letter-spacing: -0.56px;
          color: #666666;
          cursor: pointer;
        }
      }

      .actions {
        .lang-change {
          width: 100px;
        }
      }

    }

    .menu-warp {
      width: 100%;
      height: 77px;
      padding: 0 50px;
      box-sizing: border-box;
      margin-bottom: 20px;

      .menu-list-lg {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .menu-item {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #4a4a4a;
          font-size: 22px;
          font-weight: bold;
          padding: 0 17px;
          box-sizing: border-box;
          cursor: pointer;
          position: relative;

          &:first-child {
            padding-left: 0;
          }

          .menu-item-title {
            white-space: nowrap;
            &:hover {
              color: #D14900;
            }
          }

          &:hover {
            .submenu {
              display: inline-flex;
            }
          }

          .submenu {
            width: 300px;
            background-color: #1B1B1B;
            border-top: 5px solid #D14900;
            position: absolute;
            top: 70px;
            left: 0;
            display: none;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 20px 25px;
            box-sizing: border-box;
            cursor: default;
            z-index: 99;

            .submit-item {
              width: 100%;
              color: #ffffff;
              font-size: 17px;
              font-weight: normal;
              margin-bottom: 15px;

              .submit-item-title {
                cursor: pointer;
                white-space: nowrap;
                &:hover {
                  //color: #D14900;
                }
              }

              &:last-child {
                //margin-bottom: 0;
              }
            }
          }

        }
      }

      .menu-list-no-lg {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .action {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          .menu-title {
            color: #4a4a4a;
            font-size: 15px;
            font-weight: bold;
          }
          .el-icon-menu {
            color: #696B73;
            font-size: 20px;
            line-height: 20px;
            font-weight: bold;
            margin-left: 5px;
          }
          .menu-list-popup {
            width: 250px;
            background-color: #1B1B1B;
            border-top: 5px solid #D14900;
            position: absolute;
            top: 40px;
            left: 0;
            z-index: 99;
            cursor: default;
            overflow: hidden;

            .menu-list-popup-content {
              width: 100%;
              position: relative;
              top: 0;
              left: 0;
              transition: left 0.3s;
              padding: 5px 20px 20px 20px;
              box-sizing: border-box;

              .close-popup {
                width: 100%;
                font-size: 14px;
                color: #ffffff;
                font-weight: bold;
                padding: 10px 0;
                box-sizing: border-box;
                border-bottom: 2px solid #323232;
                margin-bottom: 15px;
                cursor: pointer;
                z-index: 99;

                .el-icon-close {
                }

                .close-btn-title {
                  margin-left: 5px;
                }
              }

              .menu-item {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .menu-item-title-warp {
                  width: 100%;
                  font-size: 16px;
                  font-weight: bold;
                  color: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .menu-item-title {
                    padding: 6px 0;
                    box-sizing: border-box;
                    flex: 1;
                    cursor: pointer;
                    &:hover {
                      background-color: #666666;
                    }
                  }
                  .icon {
                    width: 17px;
                    .el-icon-arrow-right {
                      cursor: e-resize;
                    }
                  }
                }
              }

              .submenu-popup {
                width: 230px;
                background-color: #383838;
                position: absolute;
                left: 250px;
                top: 0;
                padding: 15px 20px 20px 20px;
                box-sizing: border-box;
                cursor: default;

                .submenu-popup-header {
                  width: 100%;
                  border-bottom: 2px solid #414141;
                  padding-bottom: 5px;
                  box-sizing: border-box;
                  margin-bottom: 20px;

                  .submenu-popup-header-title {
                    font-size: 20px;
                    color: #f0f0f0;
                    padding-bottom: 18px;
                    box-sizing: border-box;
                    font-weight: bold;
                  }
                  .action {
                    width: 100%;
                    font-size: 14px;
                    color: #ffffff;
                    font-weight: bold;
                    margin-bottom: 15px;
                    cursor: pointer;
                  }
                }

                .submit-item {
                  width: 100%;
                  padding: 6px 0;
                  box-sizing: border-box;

                  &:hover {
                    background-color: #666666;
                  }

                  .submit-item-title {
                    font-size: 16px;
                    color: #f0f0f0;
                    width: 100%;
                    font-weight: bold;
                  }
                }

              }
            }

            //.menu-item-title {
            //  color: #ffffff;
            //  font-size: 15px;
            //  font-weight: bold;
            //}
            //
            //& /deep/ .menu {
            //  background-color: #1B1B1B;
            //
            //  .is-active {
            //    background-color: #1B1B1B;
            //  }
            //
            //  .el-menu-item {
            //    &:hover {
            //      background-color: #666666;
            //    }
            //  }
            //
            //  .el-submenu {
            //    .el-submenu__title {
            //      &:hover {
            //        background-color: #666666 !important;
            //      }
            //    }
            //
            //    .el-menu--inline {
            //      background-color: #383838;
            //      .el-menu-item {
            //        .submenu-item-title {
            //          color: #ffffff;
            //        }
            //        &:hover {
            //          background-color: #666666;
            //        }
            //      }
            //    }
            //  }
            //}
          }
        }
      }
    }

    .main {
      width: 100%;
      min-height: calc(100vh - 220px - 60px - 174px);
      margin-bottom: 60px;
    }

    .footer {
      width: 100%;
      height: 220px;

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
          margin-bottom: 10px;
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
              height: 29px;
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
          padding-top: 20px;

          .link {
            color: #c8c8c8;
            &:hover {
              color: #c8c8c8;
            }
          }
        }
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