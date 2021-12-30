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
                <el-button type="primary">提 交</el-button>
              </div>

              <el-dialog :visible.sync="previewDialogVisible">
                <el-image
                    style="width: 100%"
                    :src="previewImageUrl"
                    fit="contain"></el-image>
              </el-dialog>

            </div>
          </div>

          <div class="card home-paper">
            <div class="card-title">
              2、首页左侧文章
            </div>

            <mavon-editor class="mavon-editor-warp" v-model="homePaperValue"
                          :language="mavonEditorLang"
            ></mavon-editor>

            <div class="btn-warp">
              <el-button type="primary">提 交</el-button>
            </div>

          </div>

        </div>
      </el-tab-pane>

      <el-tab-pane class="tab-pane" label="研究" name="2">
        <div class="tab-pane-content">
          <el-button class="add-btn" type="primary" @click="">新 增</el-button>
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="date"
                label="标题"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="图片"
                width="300">
              <template slot-scope="scope">
                <div class="table-column-img">
                  <img src="">
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="操作"
                width="250">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button type="primary" @click="toEditDetails">编辑详情</el-button>
                  <el-button type="danger" @click="toEditDetails">删 除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--   新闻页配置   -->
      <el-tab-pane class="tab-pane" label="新闻" name="3">
        <div class="tab-pane-content">
          <el-button class="add-btn" type="primary" @click="">新 增</el-button>
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="date"
                label="标题"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="图片"
                width="300">
              <template slot-scope="scope">
                <div class="table-column-img">
                  <img src="">
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="操作"
                width="250">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button type="primary" @click="toEditDetails">编辑详情</el-button>
                  <el-button type="danger" @click="toEditDetails">删 除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--   出版物页配置   -->
      <el-tab-pane class="tab-pane" label="出版物" name="4">
        <div class="tab-pane-content">
          <el-button class="add-btn" type="primary" @click="">新 增</el-button>
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="date"
                label="标题"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="参与者"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="链接名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="链接地址"
                width="180">
            </el-table-column>

            <el-table-column
                prop="name"
                label="操作"
                width="250">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button type="primary" @click="toEditDetails">编辑详情</el-button>
                  <el-button type="danger" @click="toEditDetails">删 除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--   成员页配置   -->
      <el-tab-pane class="tab-pane" label="成员" name="5">
        <div class="tab-pane-content">
          <el-button class="add-btn" type="primary" @click="">新 增</el-button>
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="date"
                label="姓名"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="职位"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="图片"
                width="300">
              <template slot-scope="scope">
                <div class="table-column-img">
                  <img src="">
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="操作"
                width="250">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button type="primary" @click="toEditDetails">编辑详情</el-button>
                  <el-button type="danger" @click="toEditDetails">删 除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--   自定义页配置   -->
      <el-tab-pane class="tab-pane" v-for="(item, index) in newMenuList" :key="'tab-pane' + index" :label="item['title_' + currLang]" :name="item.key">
        <div class="tab-pane-content">
          <div class="content-cn">
            <div class="content-title">
              1、中文版
            </div>
            <mavon-editor class="mavon-editor-warp" v-model="newMenuListPageData[index].value_cn"
                          :language="mavonEditorLang"
            ></mavon-editor>
          </div>
          <div class="content-en">
            <div class="content-title">
              2、英文版
            </div>
            <mavon-editor class="mavon-editor-warp" v-model="newMenuListPageData[index].value_en"
                          :language="mavonEditorLang"
            ></mavon-editor>
          </div>

          <div class="submit-btn">
            <el-button type="primary">提 交</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
        title="编辑详情"
        :visible.sync="editDetailsDialogVisible"
        width="1400px"
        custom-class="edit_details_dialog_warp"
        :before-close="editDetailsDialogCancel">
      <div class="dialog-content">
        <div class="content-cn">
          <div class="content-title">
            1、中文版
          </div>
          <mavon-editor class="mavon-editor-warp" v-model="pageDetails.data_cn"
                        :language="mavonEditorLang"
          ></mavon-editor>
        </div>
        <div class="content-cn">
          <div class="content-title">
            2、英文版
          </div>
          <mavon-editor class="mavon-editor-warp" v-model="pageDetails.data_en"
                        :language="mavonEditorLang"
          ></mavon-editor>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDetailsDialogCancel">取 消</el-button>
        <el-button type="primary" @click="editDetailsDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import ModifyPaperContent from "@/components/modifyPaperContent/modifyPaperContent";
import {upload_file_URL} from '@/config/baseURL'
import {GetTabManagementTabListApi, GetTabEditTabApi} from "@/request/api";
export default {
  name: "pageContentManage",
  components: {ModifyPaperContent},
  data() {
    return {
      menuList: [],
      newMenuList: [],
      newMenuListPageData: [],

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
      activeName: '1',
      homeImageForm: {
        describe: '',
        imageUrl: '',
      },
      previewDialogVisible: false,
      previewImageUrl: '',
      homePaperValue: '**二万人微软为*微软 微软++ 微软++***',

      pageDetails: {
        data_cn: '',
        data_en: '',
      },
      editDetailsDialogVisible: false,

      tableData: [
        {
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
        }
      ],
    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    },
    mavonEditorLang() {
      let str = 'zh-CN'
      if (this.currLang === 'en') {
        str = 'en'
      }
      return str
    }
  },
  mounted() {
    this.loadData()
    if (parseInt(this.activeName) > 5) {
      this.loadCustomPageData()
    }
  },
  methods: {
    /**
     * 获取数据
     * */
    async loadData() {
      const res = await GetTabManagementTabListApi()
      console.log(res)
      if (res) {
        this.menuList = res.tab_list
        this.menuList.forEach((item, index) => {
          if (item.key && parseInt(item.key) > 5) {
            this.newMenuList.push(item)
            let obj = {
              ...item,
              value_cn: '',
              value_en: '',
            }
            this.newMenuListPageData.push(obj)
          }
        })
      }
    },
    /**
    * 获取自定义页的数据
    * */
    async loadCustomPageData() {
      if (parseInt(this.activeName) > 5) {
        let id = ''
        this.newMenuList.forEach((item, index) => {
          if ((item.key === this.activeName)) {
            id = item.id
          }
        })
        const res = await GetTabEditTabApi({
          tab_id: id
        })
        console.log(res)
        if (res) {

        }
      }
    },
    handleTabClick(tab) {
      if (parseInt(this.activeName) > 5) {
        this.loadCustomPageData()
      }
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
    toEditDetails(data) {
      console.log(data)
      this.editDetailsDialogVisible = true
    },
    editDetailsDialogConfirm() {
      this.editDetailsDialogCancel()
    },
    editDetailsDialogCancel() {
      this.editDetailsDialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.pageContentManage_warp {
  width: 100%;

  .mavon-editor-warp {
    max-height: 600px;
  }

  .tabs {
    width: 100%;

    .tab-pane {
      width: 100%;

      .tab-pane-content {
        width: 100%;

        .add-btn {
          margin-bottom: 10px;
        }

        .table-column-action {

        }

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

    .content-cn,.content-en {
      margin-bottom: 40px;
      .content-title {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
    .content-en {

    }

    .submit-btn {
      width: 100%;
    }

  }
}
</style>

<style lang="scss">
.edit_details_dialog_warp {
  width: 100%;
  .content-cn,.content-en {
    margin-bottom: 40px;
    .content-title {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
  .content-en {

  }
}
</style>