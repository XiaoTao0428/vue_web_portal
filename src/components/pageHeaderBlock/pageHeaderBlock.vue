<template>
  <div class="pageHeaderBlock_warp">
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item class="breadcrumb-item" v-for="(item, index) in breadcrumbList" :key="'breadcrumbList' + index">
        <span class="breadcrumb-item-a" v-if="item.to" @click="handleMenuListSelect(item)">{{item.title}}</span>
        <span class="breadcrumb-item-span" v-else>{{item.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      {{title}}
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "pageHeaderBlock",
  props: {
    /**
    * 标题
    * */
    title: {
      type: String,
      default: '',
    },
    breadcrumbList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    currRoutePath() {
      return this.$store.state.currRoutePath
    }
  },
  methods: {
    ...mapMutations(['setCurrRoutePath']),
    handleMenuListSelect(obj) {

      let path = obj.to.split('?')[0]
      if (this.currRoutePath === path) {
        this.$router.push(obj.to)
        this.$router.go(0)
      }else {
        this.setCurrRoutePath({
          currRoutePath: path
        })
        this.$router.push(obj.to)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeaderBlock_warp {
  width: 100%;
  height: 160px;
  background-image: linear-gradient(-226deg, #003b4c 0%, #005851 100%);
  //padding-left: 50px;
  //padding-right: 50px;
  padding: 30px 130px;
  box-sizing: border-box;
  margin-bottom: 50px;
  & /deep/ .breadcrumb {
    font-size: 14px;
    padding-bottom: 15px;
    box-sizing: border-box;
    .breadcrumb-item {
      .breadcrumb-item-a {
        color: #ffffff;
        cursor: pointer;
        &:hover {
          color: #D14900;
        }
      }
      .breadcrumb-item-span {
        color: #aaa99f;
      }
    }
  }
  .title {
    color: #ffffff;
    font-size: 50px;
  }
}
</style>