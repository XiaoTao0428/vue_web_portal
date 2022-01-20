<template>
  <div :class="'myFooter_warp ' + footerClassName">
    <div class="top">
      <img class="icon" :src="Peking_University_logo">
      <img class="title" :src="Peking_University_title">
    </div>
    <div class="bottom">
      <span class="a" @click="handlerClickHome">{{$t('index.Home')}}</span>
      <template v-if="currScreenSize !== 'xs'">|</template>
      <span class="a" v-if="!token" @click="handlerClickLogin">{{$t('index.LogIn')}}</span>
      <span class="a" v-if="token" @click="handlerClickLogout">{{$t('index.LogOut')}}</span>
      <template v-if="currScreenSize !== 'xs'">|</template>
      <span>{{$t('index.Copyright')}}</span>
      <template v-if="currScreenSize !== 'xs'">|</template>
      <span>{{$t('index.Address')}}{{address}}</span>
    </div>
  </div>
</template>

<script>
import Peking_University_logo from "@/assets/icon/Peking_University6.png";
import Peking_University_title from "@/assets/icon/Peking_University7.png";
import mixins from "@/mixins/mixins";

export default {
  name: "myFooter",
  mixins: [mixins],
  props: {
    address: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      Peking_University_logo: Peking_University_logo,  // logo 图标
      Peking_University_title: Peking_University_title,
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    },
  },
  methods: {
    /**
    * 去首页
    * */
    handlerClickHome() {
      this.$emit('handlerClickHome')
    },
    /**
    * 登录
    * */
    handlerClickLogin() {
      this.$emit('handlerClickLogin')
    },
    /**
    * 退出
    * */
    handlerClickLogout() {
      this.$emit('handlerClickLogout')
    }
  }
}
</script>

<style lang="scss" scoped>
.myFooter_warp {
  //background-color: rgb(104, 21, 21);
  background-color: #3E4F6D;
  font-size: 14px;
  color: #ffffff;
  padding: 15px 0;
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .icon {
      max-width: 70px;
    }
    .title {
      max-width: 120px;
      margin-top: 10px;
    }
  }
  .bottom {
    margin-top: 30px;
    text-align: center;
    color: rgba(255,255,255,0.1);
    span {
      margin: 0 15px;
      color: #ffffff;
    }
    .a {
      cursor: pointer;
    }
  }
}
.footer-lg, .footer-md, .footer-sm {

}
.footer-xs {
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      margin: 5px 0;
    }
  }
}
</style>