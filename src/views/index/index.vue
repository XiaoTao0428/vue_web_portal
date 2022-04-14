<template>
  <div class="index_warp">
    <div class="content" v-loading="dataLoading">
      <div :class="'header ' + headerClassName">
        <div class="header-icon">
          <img class="icon" :src="Peking_University_logo" @click="toPekingUniversityHome">
<!--          <el-divider class="divider" direction="vertical" v-if="currScreenSize !== 'xs'"></el-divider>-->
          <div class="divider" direction="vertical" v-if="currScreenSize !== 'xs'"></div>
          <img class="research-group-icon" :src="researchGroupIcon">
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

      <div :class="'menu-warp ' + menuWarpClassName">

        <!--    大屏幕时的效果    -->
        <div class="menu-list-lg" :style="isInit?'':'overflow-x: auto;'" id="headerMenuId" v-if="!menuOverflow && currScreenSize === 'lg'">
          <div class="menu-item" v-for="(item, index) in menuList" :key="'menuList' + index">
            <span :class="isChecked(item.key)?'menu-item-title menu-item-title-checked':'menu-item-title'" @click="handleMenuListSelect(item)">
              {{item['title_' + currLang]}}
            </span>
            <div class="submenu" v-if="item.children && item.children.length > 0">
              <div class="submit-item" v-for="(item2, index2) in item.children" :key="'submenu' + index2">
                <span :class="isChecked(item2.key)?'submit-item-title submit-item-title-checked':'submit-item-title'" @click="handleMenuListSelect(item2)">
                  {{item2['title_' + currLang]}}
                </span>
              </div>
            </div>
          </div>

          <div class="menu-item" v-if="token">
            <span :class="isChecked('99999')?'menu-item-title menu-item-title-checked': 'menu-item-title'" @click="handleMenuListSelect({router: '/manage', key: '99999'})">{{$t('index.Manage')}}</span>
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
                  <span class="close-btn-title">{{$t('index.Close')}}</span>
                </div>
                <div class="menu-item" v-for="(item, index) in menuList" :key="'menuList' + index">
                  <div class="menu-item-title-warp">
                    <span :class="isChecked(item.key)?'menu-item-title menu-item-title-checked':'menu-item-title'" @click="handleMenuListSelect(item)">{{item['title_' + currLang]}}</span>
                    <span class="icon">
                    <i v-if="item.children && item.children.length > 0" class="el-icon-arrow-right" @click="menuListPopupContentVisibleChange(item.children)"></i>
                  </span>
                  </div>
                </div>

                <div class="menu-item" v-if="token">
                  <div class="menu-item-title-warp">
                    <span :class="isChecked('99999')?'menu-item-title menu-item-title-checked':'menu-item-title'" @click="handleMenuListSelect({router: '/manage', key: '99999'})">{{$t('index.Manage')}}</span>
                    <span class="icon"></span>
                  </div>
                </div>

                <div class="submenu-popup" v-if="menuListPopupContentVisible">
                  <div class="submenu-popup-header">
                    <div class="submenu-popup-header-title">
                      {{$t('index.People')}}
                    </div>
                    <div class="action" @click.stop="menuListPopupContentHide">
                      <i class="el-icon-arrow-left"></i>
                      <span class="back-text">{{$t('index.Back')}}</span>
                    </div>
                  </div>
                  <div class="submit-item" v-for="(item2, index2) in submitList" :key="'submenu' + index2" @click="handleMenuListSelect(item2)">
                    <span :class="isChecked(item2.key)?'submit-item-title submit-item-title-checked':'submit-item-title'">{{item2['title_' + currLang]}}</span>
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
        <my-footer
            :address="groupInfo['contactAddress_' + currLang]"
            @handlerClickHome="handleMenuListSelect({router: '/home', key: '1'})"
            @handlerClickLogin="handleMenuListSelect({router: '/login', key: ''})"
            @handlerClickLogout="userLogout"
        ></my-footer>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Peking_University_logo from '../../assets/icon/Peking_University3.png'
import icon_footerpin from '../../assets/icon/icon-footerpin.png'
import mixins from '@/mixins/mixins'
import {GetIndexIndexInfoApi, GetTabTabListApi} from '@/request/api'
import MyFooter from "@/components/myFooter/myFooter";
import {file_before_url} from "@/config/baseURL";
export default {
  name: "index",
  components: {MyFooter},
  mixins: [mixins],
  data() {
    return {
      fileBeforeUrl: file_before_url,
      Peking_University_logo: Peking_University_logo,  // logo 图标
      icon_footerpin: icon_footerpin,
      isInit: false,
      currLang:'',  // 当前的语言
      dataLoading: false,
      langOptions:[
        {
          value: 'cn',
          label: '中文'
        }, {
          value: 'en',
          label: 'English'
        }
      ],
      menuOverflow: false,  // 菜单栏是否溢出
      menuListPopupVisible: false,  // 菜单栏弹窗
      submitList: [],  // 子菜单列表
      menuListPopupContentVisible: false,
      currMenuKey: '1',

      homeImageForm: {
        imageUrl_cn: '',
        imageUrl_en: '',
        contactAddress_cn: '',
        contactAddress_en: '',
      },
    }
  },
  computed: {
    groupInfo() {
      return this.$store.state.groupInfo
    },
    researchGroupIcon() {
      if (this.currLang == 'cn' && this.groupInfo.icon_cn) {
        return this.fileBeforeUrl + '' + this.groupInfo.icon_cn
      }
      else if (this.currLang == 'en' && this.groupInfo.icon_en) {
        return this.fileBeforeUrl + '' + this.groupInfo.icon_en
      }else {
        return ''
      }
    },
    token() {
      return this.$store.state.token
    },
    menuList() {
      return this.$store.state.menuList
    },
    currRoutePath() {
      return this.$store.state.currRoutePath
    },
    currRouteKey() {
      return this.$store.state.currRouteKey
    }
  },
  watch: {
    currRouteKey: {
      handler: function () {
        if (this.currRouteKey !== '') {
          this.currMenuKey = this.currRouteKey
        }else {
          this.currMenuKey = '1'
        }
      },
      immediate: true
    }
  },
  created() {
    let url = this.$route.path
    this.setCurrRoutePath({
      currRoutePath: url
    })

    this.currLang = localStorage.lang == undefined?'cn':localStorage.lang
    this.setCurrLang({
      currLang: this.currLang
    })
    currLangChange(this.currLang)
  },
  async mounted() {
    this.init()
    await this.loadHomeData()
    await this.loadData()
  },
  methods: {
    ...mapMutations(['setCurrLang', 'setCurrRoutePath', 'setCurrRouteKey', 'logout', 'setMenuList', 'setGroupInfo']),
    /**
     * 初始化路由key
     * */
    initCurrRouteKey() {
      let url = this.$route.path
      let query = this.$route.query
      if (url === '/manage' || url === '/pageContentManage' || url === '/pageHeaderMenuManage') {
        this.setCurrRouteKey({
          currRouteKey: '99999'
        })
      }else {
        let key = ''
        let children = []
        this.menuList.forEach((item, index) => {
          if (item.router === url) {
            key = item.key
            children = item.children || []
          }else {
            let routerArr = item.router.split('?')
            if (routerArr[0] === url) {
              key = item.item
            }
          }
        })
        if (key) {

          if (query && query.search) {
            let newKey = ''
            children.forEach((item, index) => {
              let newRouter = this.getUrlParam(item.router, 'search')
              if (query.search === newRouter) {
                newKey = item.key
              }
            })
            this.setCurrRouteKey({
              currRouteKey: newKey
            })
          }else {
            this.setCurrRouteKey({
              currRouteKey: key
            })
          }
        }
      }
    },
    /**
     * 获取首页数据
     * */
    async loadHomeData() {
      this.dataLoading = true
      const res = await GetIndexIndexInfoApi()
      if (res) {
        this.homeImageForm.contactAddress_cn = res.index_info.contact_address_cn
        this.homeImageForm.contactAddress_en = res.index_info.contact_address_en
        this.homeImageForm.imageUrl_cn = res.index_info.home_image_cn
        this.homeImageForm.imageUrl_en = res.index_info.home_image_en

        this.setGroupInfo({
          groupInfo: {
            icon_cn: this.homeImageForm.imageUrl_cn,
            icon_en: this.homeImageForm.imageUrl_en,
            contactAddress_cn: this.homeImageForm.contactAddress_cn,
            contactAddress_en: this.homeImageForm.contactAddress_en,
          }
        })
      }
    },
    /**
    * 去北京大学首页
    * */
    toPekingUniversityHome() {
      window.location.href = 'https://www.pku.edu.cn/'
    },
    /**
    * 初始化页面宽度
    * */
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
    * 获取数据
    * */
    async loadData() {
      this.dataLoading = true
      const res = await GetTabTabListApi()
      if (res) {
        this.setMenuList({
          menuList: res.tab_list
        })
      }
      this.dataLoading = false
    },
    /**
     * 切换菜单
     * */
    handleMenuListSelect(obj) {
      let path = obj.router.split('?')[0]
      this.menuListPopupHide()
      if (this.currRoutePath === path) {
        this.$router.push(obj.router)
        // this.$router.go(0)
        location.reload()
      }else {
        this.setCurrRoutePath({
          currRoutePath: path
        })
        this.$router.push(obj.router)
      }
    },
    /**
     * 是否是选中状态
     * */
    isChecked(key) {
      if (!this.currMenuKey) {
        return
      }
      let state = false
      if (this.currMenuKey.indexOf('-') === -1) {
        if (this.currMenuKey === key) {
          state = true
        }
      }else {
        if (this.currMenuKey === key) {
          state = true
        }
        let currMenuKeyArr = this.currMenuKey.split('-')
        if (currMenuKeyArr[0] === key) {
          state = true
        }
      }
      return state
    },
    /**
     * 获取url链接中的指定参数
     * */
    getUrlParam(url, name){
      let param = ''

      if (url.indexOf('?') !== -1) {
        let allParamsStr = url.split('?')[1]
        let allParams = allParamsStr.split('&')
        allParams.forEach((item, index) => {
          let paramArr = item.split('=')
          if (paramArr[0] === name) {
            param = paramArr[1]
          }
        })
      }

      return param
    },
    /**
    * 语言切换
    * */
    langChange(e){
      localStorage.setItem('lang', e)
      this.$i18n.locale = e
      this.setCurrLang({
        currLang: this.currLang
      })
      currLangChange(this.currLang)
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
    /**
     * 菜单栏弹出层关闭
     * */
    menuListPopupHide() {
      this.menuListPopupVisible = false
      this.menuListPopupContentVisible = false
    },
    /**
    * 菜单栏内容弹出层关闭
    * */
    menuListPopupContentHide() {
      this.menuListPopupContentVisible = false
    },
    /**
     * 切换菜单栏内容弹出层是否显示
     * */
    menuListPopupContentVisibleChange(arr) {
      this.menuListPopupContentVisible = !this.menuListPopupContentVisible
      this.submitList = arr
    },
    /**
    * 退出
    * */
    userLogout() {
      this.logout({})
      this.$router.push('/home')
      this.$message.success('退出成功')
    },
  }
}
</script>

<style lang="scss" scoped>
.index_warp {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    .header {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 40px 50px 0 50px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      .header-icon {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        .icon {
          height: 100%;
          max-height: 100%;
          cursor: pointer;
        }
        .divider {
          height: 100%;
          width: 0;
          margin-left: 26px;
          margin-right: 26px;
          border-right: 2px solid #c8c8c8;
        }
        .research-group-icon {
          margin-right: 100px;
          max-height: 100%;
          max-width: calc(100% - 200px);
        }
        .title {
          font-size: 24px;
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

    .header-lg,.header-md, {
    }
    .header-sm {
      padding: 40px 20px 0 20px;
    }
    .header-xs {
      width: 100%;
      margin: 0 auto;
      padding: 20px 20px 0 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      .header-icon {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        .icon {
          width: 80%;
          max-width: 180px;
          min-width: 80px;
        }
        .title {
          font-size: 24px;
          margin-top: 5px;
        }
        .research-group-icon {
          max-height: 100%;
          max-width: 100%;
          cursor: pointer;
          margin-top: 10px;
        }
      }
      .actions {
        margin-top: 10px;
        .lang-change {
          width: 100px;
        }
      }
    }

    .menu-warp {
      width: 100%;
      max-width: 1440px;
      height: 67px;
      min-height: 67px;
      margin-top: 30px;
      padding: 0 50px;
      box-sizing: border-box;
      margin-bottom: 20px;
      margin-left: auto;
      margin-right: auto;

      .menu-list-lg {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 3px solid #3E4F6D;

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
          &:last-child {
            padding-right: 0;
          }

          .menu-item-title {
            white-space: nowrap;
            &:hover {
              color: #9B0000;
            }
          }

          &:hover {
            .submenu {
              display: inline-flex;
            }
          }

          .menu-item-title-checked {
            color: #9B0000;
          }

          .submenu {
            width: 300px;
            background-color: #1B1B1B;
            border-top: 5px solid #9B0000;
            position: absolute;
            top: 64px;
            left: 0;
            display: none;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 20px 25px;
            box-sizing: border-box;
            cursor: default;
            z-index: 9999;

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
                  //color: #9B0000;
                }
              }

              .submit-item-title-checked {
                color: #9B0000;
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
            border-top: 5px solid #9B0000;
            position: absolute;
            top: 40px;
            left: 0;
            z-index: 9999;
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
                z-index: 9999;

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
                  .menu-item-title-checked {
                    color: #9B0000;
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
                  .submit-item-title-checked {
                    color: #9B0000;
                  }
                }

              }
            }

          }
        }
      }
    }

    .menu-warp-xs, .menu-warp-sm {
      padding: 0 20px;
    }

    .main {
      width: 100%;
      margin-top: 20px;
      flex: 1;
      margin-bottom: 60px;
    }

    .footer {
      width: 100%;
    }
  }

}
</style>