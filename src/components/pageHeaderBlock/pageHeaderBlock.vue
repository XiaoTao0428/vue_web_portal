<template>
  <div :class="'pageHeaderBlock_warp ' + pageHeaderBlockClassName">
    <div class="content">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item class="breadcrumb-item" v-for="(item, index) in breadcrumbList" :key="'breadcrumbList' + index">
          <span class="breadcrumb-item-a" v-if="item.to" @click="handleMenuListSelect(item)">{{item['title_' + currLang]}}</span>
          <span class="breadcrumb-item-span" v-else>{{item['title_' + currLang]}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title">
        {{title}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import mixins from "@/mixins/mixins";

export default {
  name: "pageHeaderBlock",
  mixins: [mixins],
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
    },
    currLang() {
      return this.$store.state.currLang
    },
  },
  methods: {
    ...mapMutations(['setCurrRoutePath']),
    handleMenuListSelect(obj) {
      console.log('-------------')
      let path = obj.to.split('?')[0]
      if (this.currRoutePath === path) {
        this.$router.push(obj.to)
        // this.$router.go(0)
        location.reload()
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
  background: url("../../assets/icon/bg17.png") no-repeat right;
  background-size: auto 100%;
  margin-bottom: 50px;

  .content {
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    padding: 30px 50px;
    box-sizing: border-box;
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
}
.pageHeaderBlock_warp-sm, .pageHeaderBlock_warp-xs {
  height: 130px;
  .content {
    padding: 30px 20px;
    .title {
      font-size: 30px;
    }
  }
}
</style>