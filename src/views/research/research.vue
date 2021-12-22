<template>
  <div class="research_warp">
    <page-header-block
        :title="pageHeaderBlockTitle"
        :breadcrumb-list="breadcrumbList"
    ></page-header-block>
    <div class="content">
      <div class="content-left">
        <el-collapse class="collapse" v-model="activeNames" @change="handleChange">
          <el-collapse-item class="collapse-item" v-for="(item, index) in researchDirectionList" :key="'researchDirectionList' + index" :title="item.title" :name="item.key">
            <div class="collapse-item-content">
              <div class="research-item" v-for="(item2, index2) in item.children" :key="'researchItem' + index2">
                {{item2.title}}
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="content-right">
        <el-carousel trigger="click" class="carousel">
          <el-carousel-item class="carousel-item" v-for="(item, index) in researchCarouselList" :key="'research' + index">
            <div class="carousel-item-content">
              <el-image
                  :src="item.url"
                  fit="contain"
              ></el-image>
              <div class="carousel-item-title">
                {{item.title}}
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeaderBlock from "@/components/pageHeaderBlock/pageHeaderBlock";
export default {
  name: "research",
  components: {PageHeaderBlock},
  data() {
    return {
      pageHeaderBlockTitle: '研究方向',
      breadcrumbList: [
        {
          title: '首页',
          to: '/Home',
        },
        {
          title: '研究方向',
        }
      ],
      researchDirectionList: [
        {
          title: '研究方向一',
          key: '1',
          children: [
            {
              title: '研究一',
              key: '1-1',
            },
            {
              title: '研究二',
              key: '1-2',
            },
            {
              title: '研究三',
              key: '1-3',
            }
          ]
        },
        {
          title: '研究方向二',
          key: '2',
          children: [
            {
              title: '研究一',
              key: '2-1',
            },
            {
              title: '研究二',
              key: '2-2',
            },
            {
              title: '研究三',
              key: '2-3',
            }
          ]
        },
        {
          title: '研究方向三',
          key: '3',
          children: [
            {
              title: '研究一',
              key: '3-1',
            },
            {
              title: '研究二',
              key: '3-2',
            },
            {
              title: '研究三',
              key: '3-3',
            }
          ]
        }
      ],
      researchCarouselList: [
        {
          title: '标题一',
          url: '',
        },
        {
          title: '标题二',
          url: '',
        }
      ],
      activeNames: ['1'],
    }
  },
  methods: {
    handleChange(val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.research_warp {
  width: 100%;
  .content {
    width: 100%;
    padding: 0 150px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .content-left {
      width: 25%;
      margin-right: 40px;
      .collapse {
        .collapse-item {
          .collapse-item-content {
            .research-item {
              width: 100%;
              cursor: pointer;
              &:hover {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .content-right {
      flex: 1;
      .carousel {
        width: 100%;
        .carousel-item {
          width: 100%;
          .carousel-item-content {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>