<template>
  <div class="publications_warp">
    <page-header-block
        :title="pageHeaderBlockTitle"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <div class="group">
        <div class="group-title">
          教师
        </div>
        <div class="group-content">
          <div class="content-item" v-for="(item, index) in 5" :key="'group-item' + index">
            <div class="participant">
              <i>Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park</i>
            </div>
            <div class="content-item-title">
              <b>"Extending the spectrum of fully integrated photonics"</b>
            </div>
            <div class="link">arXiv:2112.02923</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
export default {
  name: "publications",
  components: {PageHeaderBlock},
  data() {
    return {
      pageHeaderBlockTitle: '成果',
      breadcrumbList: [
        {
          title: '首页',
          to: '/Home',
        },
        {
          title: '成果',
        }
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.publications_warp {
  width: 100%;
  .content {
    width: 100%;
    padding: 0 130px;
    box-sizing: border-box;
    .group {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .group-title {
        width: 200px;
        padding-right: 20px;
      }
      .group-content {
        flex: 1;
        padding-left: 20px;

        .content-item {
          width: 100%;
          margin: 0 10px 20px 10px;
          color: #333333;
          font-size: 18px;
          line-height: 30px;

          .participant {
          }

          .content-item-title {
          }

          .link {
            cursor: pointer;
            color: #D14900;
          }
        }
      }
    }
  }
}
</style>