<template>
  <div class="pageContentManage_warp">
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane class="tab-pane" label="首页" name="first">

        <div class="tab-pane-content">

<!--          <modify-paper-content></modify-paper-content>-->

          <div class="card home-image">
            <div class="card-title">
              1、首页右侧主图
            </div>
            <div class="card-content">
              <el-form ref="homeImageForm" :model="homeImageForm" label-width="80px">
                <el-form-item label="图片描述">
                  <el-input type="textarea" v-model="homeImageForm.describe" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="图片上传">
                  <el-upload
                      :action="uploadAction"
                      :headers="uploadHeaders"
                      :multiple="false"
                      name="image"
                      :limit="1"
                      list-type="picture-card"
                      :on-exceed="handleImageUploadExceed"
                      :on-preview="handleImageUploadPreview"
                      :before-upload="beforeImageUpload"
                      :on-remove="handleImageUploadRemove"
                      :on-success="handleImageUploadSuccess"
                  >
                    <img v-if="homeImageForm.imageUrl" :src="homeImageForm.imageUrl" class="avatar">
                    <i  v-if="!homeImageForm.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">最大允许上传个数为1，只能上传jpg/png文件，且不超过2MB</div>
                  </el-upload>
                </el-form-item>
              </el-form>

              <div class="btn-warp">
                <el-button>提 交</el-button>
              </div>

              <el-dialog :visible.sync="previewDialogVisible">
                <img width="100%" :src="previewImageUrl" alt="">
              </el-dialog>

            </div>
          </div>

          <div class="card home-paper">
            <div class="card-title">
              2、首页左侧文章
            </div>

            <mavon-editor v-model="homePaperValue"
                          :language="'zh-CN'"
            ></mavon-editor>

            <div class="btn-warp">
              <el-button>提 交</el-button>
            </div>

          </div>

        </div>

      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        配置管理
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ModifyPaperContent from "@/components/modifyPaperContent/modifyPaperContent";
import {upload_file_URL} from '@/config/baseURL'
export default {
  name: "pageContentManage",
  components: {ModifyPaperContent},
  data() {
    return {
      uploadAction: upload_file_URL,
      uploadHeaders: {},
      activeName: 'first',
      homeImageForm: {
        describe: '',
        imageUrl: '',
      },
      previewDialogVisible: false,
      previewImageUrl: '',
      homePaperValue: '**二万人微软为*微软 微软++ 微软++***',
    }
  },
  methods: {
    handleTabClick(tab) {
      console.log(tab)
    },
    beforeImageUpload(file) {
      const fileType = file.type
      const isLt2M = file.size / 1024 / 1024 <= 2;

      let isJPGOrPng = true
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        this.$message.error('上传图片只能是 JPG/JPEG 或 PNG 格式!')
        isJPGOrPng = false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }

      if (isJPGOrPng && isLt2M) {

      }

      return isJPGOrPng && isLt2M
    },
    handleImageUploadExceed(files, fileList) {
      this.$message.warning('超出了数量上限！')
    },
    handleImageUploadPreview(file) {
      console.log(file.url)
      this.previewImageUrl = file.url
      this.previewDialogVisible = true
    },
    handleImageUploadRemove(file, fileList) {
      this.homeImageForm.imageUrl = ''
    },
    handleImageUploadSuccess(res, file) {
      console.log('handleImageUploadSuccess', res)
    },
  }
}
</script>

<style lang="scss" scoped>
.pageContentManage_warp {
  width: 100%;

  .tabs {
    width: 100%;

    .tab-pane {
      width: 100%;

      .tab-pane-content {
        width: 100%;

        .card {
          width: 100%;
          &:first-child {
            margin-bottom: 40px;
          }

          .card-title {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .card-content {
            width: 100%;
          }
        }
        .home-paper {
          .btn-warp {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>