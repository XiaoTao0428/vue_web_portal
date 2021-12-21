<template>
  <div class="modifyPaperContent_warp">
    <div class="way replace-warp">
      <div class="title">
        方法一：覆盖
      </div>

      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :multiple="false"
          :limit="1"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传 *.md;*.markdown;*.mmd;*.mdwn;*.mdown 文件，且数量不超过 1 个文件</div>
      </el-upload>
    </div>
    <div class="way modify-warp">
      <div class="title">
        方法二：修改
      </div>

      <mavon-editor v-model="mavonEditorValue"
                    :language="'zh-CN'"
      ></mavon-editor>
<!--      <mavon-editor v-model="mavonEditorValue"-->
<!--                    :language="'zh-CN'"-->
<!--                    :editable="false"-->
<!--                    :toolbars-flag="false"-->
<!--                    :subfield="false"-->
<!--                    :default-open="'preview'"-->
<!--      ></mavon-editor>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "modifyPaperContent",
  data() {
    return {
      uploadLoading: false,

      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ],

      mavonEditorValue: '**二万人微软为*微软 微软++ 微软++***',
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning('超出文件上传数量限制');
    },
    beforeUpload(file) {
      const fileName = file.name
      let isMarkdown = true
      let fileNameArr = fileName.split('.')
      let fileType = fileNameArr[fileNameArr.length - 1]
      if (fileType !== 'md' && fileType !== 'markdown' && fileType !== 'mmd' && fileType !== 'mdwn' && fileType !== 'mdown') {
        this.$message.error('上传图片只能是 *.md;*.markdown;*.mmd;*.mdwn;*.mdown 文件!')
        isMarkdown = false
      }

      if (isMarkdown) {
        this.uploadImageLoading = true
      }

      return isMarkdown
    }
  }
}
</script>

<style lang="scss" scoped>
.modifyPaperContent_warp {
  width: 100%;

  .way {
    width: 100%;
    margin-bottom: 40px;

    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>