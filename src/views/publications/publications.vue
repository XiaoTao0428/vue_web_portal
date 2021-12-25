<template>
  <div class="publications_warp">
    <div class="header">
      <page-header-block
          :title="pageHeaderBlockTitle"
          :breadcrumb-list="breadcrumbList"
      ></page-header-block>
    </div>
    <div class="content">
      <div class="group" v-for="(item, index) in paperList" :key="'group' + index">
        <div class="group-title">
          {{item.groupTitle}}
        </div>
        <div class="group-content">
          <div class="content-item" v-for="(item2, index2) in item.data" :key="'group-item' + index2">
            <div class="participant">
              <i>{{item2.participant}}</i>
            </div>
            <div class="content-item-title">
              <b>"{{item2.title}}"</b>
            </div>
            <div class="link">{{item2.linkText}}</div>
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
      breadcrumbList: [
        {
          title: '首页',
          to: '/home',
        },
        {
          title: '成果',
        }
      ],

      /**
      * 论文列表
      * */
      paperList: [
        {
          groupTitle: '2021 Publications',
          data: [
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            },
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            }
          ]
        },
        {
          groupTitle: '2021 Publications',
          data: [
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            },
            {
              participant: 'Minh Tran*, Chong Zhang*, Theodore Morin*, Lin Chang, Sabyasachi Barik, Zhiquan Yuan, Woonghee Lee, Glenn Kim, Aditya Malik, Zeyu Zhang, Joel Guo, Heming Wang, Boqiang Shen, Lue Wu, Kerry Vahala, John Bowers, Tin Komljenovic, Hyundai Park',
              title: 'Extending the spectrum of fully integrated photonics',
              linkText: 'arXiv:2112.02923',
              to: '',
            }
          ]
        }
      ],
    }
  },
  computed: {
    pageHeaderBlockTitle() {
      return this.breadcrumbList[this.breadcrumbList.length - 1].title
    }
  },
}
</script>

<style lang="scss" scoped>
.publications_warp {
  width: 100%;
  .header {
    max-width: 1600px;
    margin: 0 auto;
  }
  .content {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 50px;
    box-sizing: border-box;
    .group {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .group-title {
        width: 300px;
        padding-right: 20px;
        font-size: 22px;
        color: #333333;
      }
      .group-content {
        flex: 1;
        padding-left: 20px;

        .content-item {
          width: 100%;
          margin: 0 10px 20px 10px;
          color: #333333;
          font-size: 18px;
          line-height: 28px;

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