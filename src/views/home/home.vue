<template>
  <div class="home_warp">

    <div class="content">

      <div class="home-left">
        <mavon-editor class="markdown-warp" v-model="mavonEditorValue"
                      :language="'zh-CN'"
                      :editable="false"
                      :toolbars-flag="false"
                      :subfield="false"
                      :default-open="'preview'"
        ></mavon-editor>
      </div>

      <div class="home-right">
        <div class="picture-introduction">
          <el-image
              class="image"
              src="https://caltechsites-prod.s3.amazonaws.com/vahala/images/Disk_Cover_v5_h.width-1600.jpg"
          ></el-image>
          <div class="image-msg">
            Photomicrograph of whispering gallery optical resonators on a silicon wafer. These resonators have Q factors of nearly 1 billion, the current record for chip-based devices.
          </div>
        </div>

        <div class="news">

          <div class="news-header">
            <div class="news-header-title">
              {{$t('index.News')}}
            </div>
            <el-link class="link" :underline="false">{{$t('home.AllNews')}} <i class="el-icon-arrow-right"></i></el-link>
          </div>

          <div class="news-content">
            <div class="new-item">
              <div class="image-description">
                <el-image
                    class="image"
                    src="https://caltechsites-prod.s3.amazonaws.com/root/images/Lasers.2e16d0ba.fill-710x400-c100.jpg"
                ></el-image>
                <div class="line"></div>
              </div>
              <div class="date" v-if="currLang === 'en'">
                <i class="el-icon-menu"></i> June 18, 2020
              </div>
              <div class="date" v-if="currLang === 'cn'">
                <i class="el-icon-menu"></i> 2020 年 6 月 18 日
              </div>
              <div class="description" v-if="currLang === 'en'">
                Optical Microcomb Device May Result in Improved Telecommunications, Sensors, Clocks
              </div>
              <div class="description" v-if="currLang === 'cn'">
                光学微梳装置可能会改善电信、传感器、时钟
              </div>
            </div>
            <div class="new-item">
              <div class="image-description">
                <el-image
                    class="image"
                    src="https://caltechsites-prod.s3.amazonaws.com/root/images/Kerry_Vahala-LaserGryroscope-.2e16d0ba.fill-710x400-c100.jpg"
                ></el-image>
<!--                <img class="image" src="https://caltechsites-prod.s3.amazonaws.com/root/images/Kerry_Vahala-LaserGryroscope-.2e16d0ba.fill-710x400-c100.jpg">-->
                <div class="line"></div>
              </div>
              <div class="date" v-if="currLang === 'en'">
                <i class="el-icon-menu"></i> March 4, 2020
              </div>
              <div class="date" v-if="currLang === 'cn'">
                <i class="el-icon-menu"></i> 2020 年 3 月 4 日
              </div>
              <div class="description" v-if="currLang === 'en'">
                New Chip-Based Laser Gyroscope Measures Earth's Rotation
              </div>
              <div class="description" v-if="currLang === 'cn'">
                新型基于芯片的激光陀螺仪测量地球自转
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import mixins from "@/mixins/mixins";

export default {
  name: "home",
  mixins: [mixins],
  data () {
    return {
      mavonEditorValue: '# Confining light on a chip:\n' +
          '\n' +
          '# the science of optical microresonators\n' +
          '\n' +
          'Like a tuning fork for light, optical resonators have a characteristic set of frequencies at which it is possible to confine light waves. At these frequencies, optical energy can be efficiently stored for lengths of time characterized by the resonator Q factor, roughly the storage time in cycles of oscillation.\n' +
          '\n' +
          'In the last ten years there has been remarkable progress in boosting this storage time in micro and millimeter-scale optical resonators. Chip-based devices have attained Q factors of nearly 1 billion and micro-machined crystalline devices have achieved Qs exceeding 100 billion. \n' +
          '\n' +
          'The long, energy-storage time and small form factor of these *ultra-high-Q (UHQ)* resonators enable access to an amazingly wide range of nonlinear phenomena and creation of laser devices with remarkable properties. Also, new science results from radiation-pressure coupling of optical and mechanical degrees-of-freedom in the resonators themselves.\n' +
          '\n' +
          'We have created the highest Q-factor chip-based resonators and also launched many of the subjects of study in this field. \n' +
          '\n' +
          '*Our mission is to explore UHQ physics, investigate applications and create integrated UHQ systems.*\n' +
          '\n' +
          '\n' +
          '\n' +
          '\n' +
          '\n' +
          '![Sponsor logos](https://caltechsites-prod.s3.amazonaws.com/vahala/images/Screen_Shot_2020-07-08_at_5.08.22_PM.original.png)',
    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home_warp {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 50px;
  box-sizing: border-box;


  .content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .home-left {
      flex: 1;
      margin-right: 20px;
      .markdown-warp {
        box-shadow: none !important;
        z-index: 1;
        & /deep/ .v-show-content {
          padding: 0;
          background-color: #ffffff !important;
        }
      }
    }
    .home-right {
      flex: 1;
      margin-left: 20px;

      .picture-introduction {
        width: 100%;
        margin-bottom: 30px;
        position: relative;
        .image {
          max-width: 100%;
        }
        .image-msg {
          position: absolute;
          bottom: 4px;
          left: 0;
          padding: 16px 18px;
          box-sizing: border-box;
          color: #ffffff;
          background-color: rgba(0, 0, 0, 0.54);
        }
      }

      .news-header {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 30px;

        .news-header-title {
          color: #000000;
          font-size: 40px;
        }
        .link {
          color: #003b4c;
          font-size: 14px;
          height: 32px;
          &:hover {
            color: #D14900;
          }
          .el-icon-arrow-right {
            color: #D14900;
            font-weight: bold;
          }
        }
      }

      .news-content {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        .new-item {
          flex: 1;
          &:first-child {
            margin-right: 10px;
          }
          &:last-child {
            margin-left: 10px;
          }

          .image-description {
            width: 100%;
            margin-bottom: 20px;
            .image {
              max-width: 100%;
              margin-bottom: -4px;
            }
            .line {
              width: 100%;
              height: 4px;
              background-image: linear-gradient(90deg, #f9be01 0%, #c75000 100%);
            }
          }

          .date {
            font-size: 12px;
            color: #D14900;
            font-weight: bold;
            margin-bottom: 10px;

            .el-icon-menu {
              font-size: 16px;
              color: #AAA99F;
              margin-right: 5px;
            }
          }

          .description {
            font-size: 22px;
            color: #000000;
            font-weight: bold;
          }
        }

      }

    }
  }
}
</style>