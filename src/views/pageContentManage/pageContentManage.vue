<template>
  <div class="pageContentManage_warp">
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleTabClick">
      <!--   首页配置   -->
      <el-tab-pane class="tab-pane" label="首页" name="1">
        <div class="tab-pane-content">

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

      <el-tab-pane class="tab-pane" label="研究" name="2">
        <div class="tab-pane-content">

        </div>
      </el-tab-pane>

      <!--   新闻页配置   -->
      <el-tab-pane label="新闻" name="3">
        <div class="tab-pane-content">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--   出版物页配置   -->
      <el-tab-pane label="出版物" name="4">出版物</el-tab-pane>

      <!--   成员页配置   -->
      <el-tab-pane label="成员" name="5">成员</el-tab-pane>
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
      rules: {
        describe: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        imageUrl: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
      },
      uploadHeaders: {},
      activeName: 'first',
      homeImageForm: {
        describe: '',
        imageUrl: '',
      },
      previewDialogVisible: false,
      previewImageUrl: '',
      homePaperValue: '**二万人微软为*微软 微软++ 微软++***',

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
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