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
              <el-form ref="homeImageForm" :rules="rules" :model="homeImageForm" label-width="80px">
                <el-form-item label="图片描述" prop="describe">
                  <el-input type="textarea" v-model="homeImageForm.describe" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="图片上传" prop="imageUrl">
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
                <el-button type="primary" @click="homeImageFormSubmit">提 交</el-button>
              </div>

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
          <el-button class="add-btn" type="primary" @click="addResearch">新 增</el-button>
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
                  <el-button type="primary" @click="editDetails">编辑详情</el-button>
                  <el-button type="danger" @click="editDetails">删 除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--   新闻页配置   -->
      <el-tab-pane class="tab-pane" label="新闻" name="3">
        <div class="tab-pane-content">
          <el-button class="add-btn" type="primary" @click="addNew">新 增</el-button>
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
                width="320">
              <template slot-scope="scope">
                <div class="table-column-action">
                  <el-button @click="">置 顶</el-button>
                  <el-button type="primary" @click="editDetails">编辑详情</el-button>
                  <el-button type="danger" @click="editDetails">删 除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!--   出版物页配置   -->
      <el-tab-pane class="tab-pane" label="出版物" name="4">
        <div class="tab-pane-content">
          <el-button class="add-btn" type="primary" @click="addPublication">新 增</el-button>
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
                  <el-button type="primary" @click="editDetails">编辑详情</el-button>
                  <el-button type="danger" @click="editDetails">删 除</el-button>
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
                  <el-button type="primary" @click="editDetails">编辑详情</el-button>
                  <el-button type="danger" @click="editDetails">删 除</el-button>
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
            <el-button type="primary" @click="customPageSubmit(item)">提 交</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--  图片预览  -->
    <el-dialog :visible.sync="previewDialogVisible">
      <el-image
          style="width: 100%"
          :src="previewImageUrl"
          fit="contain"></el-image>
    </el-dialog>

    <!--  编辑详情弹窗  -->
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

    <!--  新增研究方向  -->
    <el-dialog
        title="新增研究方向"
        :visible.sync="addResearchDialogVisible"
        width="800px"
        custom-class="add_research_dialog_warp"
        :before-close="addResearchDialogCancel">
      <div class="dialog-content">
        <el-form :model="addResearchForm" :rules="rules" ref="addResearchFormRef" label-width="140px">
          <el-form-item label="研究标题（中文）" prop="title_cn">
            <el-input v-model="addResearchForm.title_cn" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="研究标题（英文）" prop="title_en">
            <el-input v-model="addResearchForm.title_en" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="开始日期" prop="time">
            <el-date-picker
                v-model="addResearchForm.time"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="图片描述" prop="imageUrl">
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
                :on-remove="handleAddResearchImageUploadRemove"
                :on-success="handleAddResearchImageUploadSuccess"
            >
              <img v-if="addResearchForm.imageUrl" :src="addResearchForm.imageUrl" class="avatar">
              <i  v-if="!addResearchForm.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">最大允许上传个数为1，只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addResearchDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addResearchDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!--  新增新闻  -->
    <el-dialog
        title="新增新闻"
        :visible.sync="addNewDialogVisible"
        width="800px"
        custom-class="add_new_dialog_warp"
        :before-close="addNewDialogCancel">
      <div class="dialog-content">
        <el-form :model="addNewForm" :rules="rules" ref="addNewFormRef" label-width="140px">
          <el-form-item label="研究标题（中文）" prop="title_cn">
            <el-input v-model="addNewForm.title_cn" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="研究标题（英文）" prop="title_en">
            <el-input v-model="addNewForm.title_en" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="日期" prop="date">
            <el-date-picker
                v-model="addNewForm.date"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="图片描述" prop="imageUrl">
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
                :on-remove="handleAddNewImageUploadRemove"
                :on-success="handleAddNewImageUploadSuccess"
            >
              <img v-if="addNewForm.imageUrl" :src="addNewForm.imageUrl" class="avatar">
              <i  v-if="!addNewForm.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">最大允许上传个数为1，只能上传jpg/png文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addNewDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addNewDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!--  新增发布的成果  -->
    <el-dialog
        title="新增发布的成果"
        :visible.sync="addPublicationDialogVisible"
        width="800px"
        custom-class="add_publication_dialog_warp"
        :before-close="addPublicationDialogCancel">
      <div class="dialog-content">
        <el-form :model="addPublicationForm" :rules="rules" ref="addPublicationFormRef" label-width="140px">
          <el-form-item label="标题（中文）" prop="title_cn">
            <el-input v-model="addPublicationForm.title_cn" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="标题（英文）" prop="title_en">
            <el-input v-model="addPublicationForm.title_en" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="title_en">
            <el-input type="textarea" :rows="3" v-model="addPublicationForm.author" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="期刊名称" prop="journalTitle">
            <el-input v-model="addPublicationForm.journalTitle" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="期刊地址" prop="journalTitle">
            <el-input v-model="addPublicationForm.journalUrl" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPublicationDialogCancel">取 消</el-button>
        <el-button type="primary" @click="addPublicationDialogConfirm">确 定</el-button>
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
        title_cn: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        title_en: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        date: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        author: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        journalTitle: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        journalUrl: [
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

      /**
      * 编辑详情
      * */
      editDetailsDialogVisible: false,

      /**
      * 新增研究方向
      * */
      addResearchDialogVisible: false,
      addResearchForm: {
        title_cn: '',
        title_en: '',
        date: '',
        imageUrl: '',
      },

      /**
       * 新增新闻
       * */
      addNewDialogVisible: false,
      addNewForm: {
        title_cn: '',
        title_en: '',
        date: '',
        imageUrl: '',
      },

      /**
       * 新增发布过的成果
       * */
      addPublicationDialogVisible: false,
      addPublicationForm: {
        title_cn: '',
        title_en: '',
        author: '',
        journalTitle: '',
        journalUrl: '',
      },

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
    /**
    * 切换tab页时触发
    * */
    handleTabClick(tab) {
      if (parseInt(this.activeName) > 5) {
        this.loadCustomPageData()
      }
    },
    /**
    * 上传首页图片时，在上传前触发
    * */
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
    /**
     * 上传首页图片时，超出了数量上限触发
     * */
    handleImageUploadExceed(files, fileList) {
      this.$message.warning('超出了数量上限！')
    },
    /**
     * 上传首页图片时，图片预览
     * */
    handleImageUploadPreview(file) {
      console.log(file.url)
      this.previewImageUrl = file.url
      this.previewDialogVisible = true
    },
    /**
     * 上传首页图片时，图片删除
     * */
    handleImageUploadRemove(file, fileList) {
      this.homeImageForm.imageUrl = ''
    },
    /**
     * 上传首页图片时，图片上传成功
     * */
    handleImageUploadSuccess(res, file) {
      console.log('handleImageUploadSuccess', res)
    },
    /**
    * 首页图片表单提交时触发
    * */
    homeImageFormSubmit() {
      this.$refs.homeImageForm.validate(async (valid) => {
        if (valid) {

        }
      })
    },
    /**
     * 去编辑详情
     * */
    editDetails(data) {
      console.log(data)
      this.editDetailsDialogVisible = true
    },
    /**
     * 编辑详情弹窗提交时触发
     * */
    editDetailsDialogConfirm() {
      this.editDetailsDialogCancel()
    },
    /**
     * 编辑详情弹窗关闭时触发
     * */
    editDetailsDialogCancel() {
      this.editDetailsDialogVisible = false
    },
    /**
    * 新增研究方向
    * */
    addResearch() {
      this.addResearchDialogVisible = true
    },
    /**
     * 新增研究方向弹窗提交时触发
     * */
    addResearchDialogConfirm() {
      this.$refs.addResearchFormRef.validate(async (valid) => {
        if (valid) {
          this.addResearchDialogCancel()
        }
      })
    },
    /**
     * 新增研究方向弹窗关闭时触发
     * */
    addResearchDialogCancel() {
      this.$refs.addResearchFormRef.resetFields()
      this.addResearchDialogVisible = false
    },
    /**
     * 新增研究方向弹窗中，图片删除时触发
     * */
    handleAddResearchImageUploadRemove(file, fileList) {
      this.addResearchForm.imageUrl = ''
    },
    /**
     * 新增研究方向弹窗中，图片上传成功时触发
     * */
    handleAddResearchImageUploadSuccess(res, file) {

    },

    /**
     * 新增新闻
     * */
    addNew() {
      this.addNewDialogVisible = true
    },
    /**
     * 新增新闻弹窗提交时触发
     * */
    addNewDialogConfirm() {
      this.$refs.addNewFormRef.validate(async (valid) => {
        if (valid) {
          this.addNewDialogCancel()
        }
      })
    },
    /**
     * 新增新闻弹窗关闭时触发
     * */
    addNewDialogCancel() {
      this.$refs.addNewFormRef.resetFields()
      this.addNewDialogVisible = false
    },
    /**
     * 新增新闻弹窗中，图片删除时触发
     * */
    handleAddNewImageUploadRemove(file, fileList) {
      this.addNewForm.imageUrl = ''
    },
    /**
     * 新增新闻弹窗中，图片上传成功时触发
     * */
    handleAddNewImageUploadSuccess(res, file) {

    },

    /**
     * 新增发布的成果
     * */
    addPublication() {
      this.addPublicationDialogVisible = true
    },
    /**
     * 新增发布的成果弹窗提交时触发
     * */
    addPublicationDialogConfirm() {
      this.$refs.addPublicationFormRef.validate(async (valid) => {
        if (valid) {
          this.addPublicationDialogCancel()
        }
      })
    },
    /**
     * 新增发布的成果弹窗关闭时触发
     * */
    addPublicationDialogCancel() {
      this.$refs.addPublicationFormRef.resetFields()
      this.addPublicationDialogVisible = false
    },

    /**
    * 自定义页内容编辑的提交
    * */
    customPageSubmit(obj) {
      console.log(obj)

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