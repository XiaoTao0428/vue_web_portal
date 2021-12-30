<template>
  <div class="pageHeaderMenuManage_warp">
    <div class="content" v-loading="loading">
      <el-tree
          class="tree"
          :data="treeList"
          node-key="key"
          default-expand-all
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data['title_' + currLang] }}</span>
        <span v-if="data.appendBtnShow && data.appendBtnShow === true">
          <el-button type="text" size="mini" @click.stop="appendTreeNode(data)">
            添加
          </el-button>
        </span>
        <span v-if="data.delBtnShow && data.delBtnShow === true">
          <el-button type="text" size="mini" @click.stop="delTreeNode(data)">
            删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>

    <el-dialog
        title="添加节点"
        :visible.sync="appendDialogVisible"
        :before-close="appendDialogCancel"
        width="700px"
    >
      <div class="dialog-content">
        <el-form ref="appendNodeFormRef" :rules="rules" :model="appendNodeForm" label-width="160px">
          <el-form-item label="节点名（中文）" prop="name_cn">
            <el-input v-model="appendNodeForm.name_cn" placeholder="例如：首页"></el-input>
          </el-form-item>
          <el-form-item label="节点名（英文）" prop="name_en">
            <el-input v-model="appendNodeForm.name_en" placeholder="例如：Home"></el-input>
          </el-form-item>
          <el-form-item label="路由名" prop="router">
            <el-input placeholder="例如：首页的路由是 /home ，不能包含 /、?、=、& 等特殊字符 " v-model="appendNodeForm.router">
              <template slot="prepend">/</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appendDialogCancel">取 消</el-button>
        <el-button type="primary" :loading="submitBtnLoading" @click="appendDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="删除节点"
        :visible.sync="delDialogVisible"
        width="500px"
    >
      <span>确定要删除此节点吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="submitBtnLoading" @click="delDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {GetTabManagementTabListApi, PostTabAddTabApi, PostTabDeleteTabApi, PostTabSortTabApi} from "@/request/api";

export default {
  name: "pageHeaderMenuManage",
  data() {
    return {
      loading: true,
      treeList: [
        {
          key: 'root',
          title_cn: '根目录',
          title_en: 'Root directory',
          appendBtnShow: true,
          children: []
        }
      ],
      appendDialogVisible: false,
      appendNodeData: null,
      appendNodeForm: {
        name_cn: '',
        name_en: '',
        router: '',
      },
      rules: {
        name_cn: [
          {
            required: true,
            message: '请输入节点名称',
            trigger: 'change'
          },
        ],
        name_en: [
          {
            required: true,
            message: '请输入节点名称',
            trigger: 'change'
          },
        ],
        router: [
          {
            required: true,
            message: '请输入路由名',
            trigger: 'change'
          },
          {
            validator: this.routerValidatePass,
            trigger: 'change' }
        ],
      },
      delDialogVisible: false,
      delNodeData: null,
      submitBtnLoading: false,
    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    }
  },
  async mounted() {
    this.loading = true
    await this.loadData()
    this.loading = false
  },
  methods: {
    /**
    * 获取数据
    * */
    async loadData() {
      const res = await GetTabManagementTabListApi()
      console.log(res)
      if (res) {
        let arr = res.tab_list
        arr.forEach((item, index) => {
          if (item.key === '5') {
            item.appendBtnShow = true
            item.children.forEach((item2, index2) => {
              if (item2.key!== '5-1') {
                item2.delBtnShow = true
              }
            })
          }
          if (item.key !== '1' && item.key !== '2' && item.key !== '3' && item.key !== '4' && item.key !== '5') {
            item.delBtnShow = true
          }
        })
        this.treeList[0].children = arr
      }
    },
    /**
     * 添加节点弹窗取消
     * */
    appendDialogCancel() {
      this.$refs.appendNodeFormRef.resetFields()
      this.appendDialogVisible = false
    },
    /**
    * 添加节点弹窗提交
    * */
    appendDialogConfirm() {
      this.$refs.appendNodeFormRef.validate(async (valid) => {
        if (valid) {
          this.submitBtnLoading = true
          let newChild = {
            id: '',
            key: '',
            title_cn: this.appendNodeForm.name_cn,
            title_en: this.appendNodeForm.name_en,
            router: '',
            delBtnShow: true,
          }
          if (this.appendNodeData.key === '5') {
            newChild.router = '/people?search=' + this.appendNodeForm.router
          }else {
            newChild.router = '/customPage?pageName=' + this.appendNodeForm.router
          }

          let max = 1
          let arr = []
          if (this.appendNodeData.children && this.appendNodeData.children.length > 0) {
            this.appendNodeData.children.forEach((item, index) => {
              arr = item.key.split('-')
              if (parseInt(arr[arr.length - 1]) > max) {
                max = parseInt(arr[arr.length - 1])
              }
            })
            max++
            if (arr.length > 1) {
              let key = ''
              arr.forEach((item, index) => {
                if (index < arr.length - 1) {
                  key += item + '-'
                }else {
                  key += max.toString()
                }
              })

              newChild.key = key
            }else {
              let key = max.toString()
              newChild.key = key
            }
          }else {
            let key = ''
            if (this.appendNodeData.key !== 'root') {
              key = this.appendNodeData.key + '-' + '1'
            }else {
              key = '1'
            }
            newChild.key = key
            if (!this.appendNodeData.children) {
              this.$set(this.appendNodeData, 'children', [])
            }
          }
          console.log('treeList', this.treeList)

          let param = {
            key: newChild.key,
            title_cn: newChild.title_cn,
            title_en: newChild.title_en,
            router: newChild.router,
            tab_content_cn: '',
            tab_content_en: '',
          }
          if (newChild.key.indexOf('-') !== -1) {
            let arr = newChild.key.split('-')
            param.parent_key = arr[0]
          }
          console.log('param', param)
          const res = await PostTabAddTabApi({...param})
          console.log(res)
          if (res) {
            newChild.id = res.new_tab_info.id
            this.appendNodeData.children.push(newChild)
            this.$message.success('新增成功')
          }

          this.appendNodeData = null
          this.appendDialogCancel()
          this.submitBtnLoading = false
        }
      })

    },
    /**
    * 自定义路由验证
    * */
    routerValidatePass(rule, value, callback) {

      if (value.indexOf(' ') !== -1) {
        callback(new Error('不能包含空格'))
      } else if (!(/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value))) {
        callback(new Error('以英文字母开头，只能包含英文字母、数字、下划线'))
      }else {
        let state = false
        let state2 = false

        let arr = []
        this.treeList[0].children.forEach((item, index) => {
          if (item.router.toLowerCase() === '/' + value.toLowerCase()) {
            state = true
          }
          if (item.key === '5') {
            arr = item.children
          }
        })

        arr.forEach((item, index) => {
          let strArr = item.router.split('?')
          let newRouter = strArr[1].split('=')[1]
          if (newRouter.toLowerCase() === value.toLowerCase()) {
            state2 = true
          }
        })
        if (state || state2) {
          callback(new Error('不能重复'))
        }else {
          callback()
        }
      }
    },
    /**
    * 添加子节点
    * */
    appendTreeNode(data) {
      console.log(data)
      this.appendNodeData = data
      this.appendDialogVisible = true
    },
    /**
     * 删除节点弹窗确定
     * */
    async delDialogConfirm() {
      this.submitBtnLoading = true
      console.log('delNodeData', this.delNodeData)
      const res = await PostTabDeleteTabApi({
        tab_id: this.delNodeData.id
      })
      console.log(res)
      if (res) {
        this.delNode(this.treeList[0].children, this.delNodeData.key)
        this.$message.success('删除成功')
      }
      this.delNodeData = null
      this.delDialogVisible = false
      this.submitBtnLoading = false
    },
    /**
     * 删除指定节点
     * */
    delTreeNode(data) {
      console.log(data)
      this.delNodeData = data
      this.delDialogVisible = true
    },
    /**
     * 删除节点
     * */
    delNode(arr, key) {
      try {
        arr.forEach((item, index) => {
          if (item.key === key) {
            arr.splice(index, 1)
            throw Error()
          }else {
            if (item.children && item.children.length > 0) {
              this.delNode(item.children, key)
            }
          }
        })
      } catch (e) {
      }
    },
    /**
     * 节点拖动结束
     * */
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ',draggingNode.key, dropNode.key, dropType)
    },
    /**
    * 拖拽成功完成时触发的事件
    * */
    async handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag: ',draggingNode, dropNode, dropType)

      this.loading = true
      let node = []
      node = this.getNode(this.treeList[0].children, draggingNode.key)
      console.log('node', node)
      let param = []
      node.forEach((item, index) => {
        param.push(item.id)
      })
      const res = await PostTabSortTabApi({
        tab_id_list: JSON.stringify(param)
      })
      console.log(res)
      if (res) {
        this.$message.success('操作成功')
      }
      this.loading = false
    },
    /**
     * 获取节点
     * */
    getNode(arr, key) {
      console.log(arr, key)
      let data = []
      try {
        arr.forEach((item, index) => {
          if (item.key === key) {
            data = arr
            throw Error()
          }else {
            if (item.children && item.children.length > 0) {
              let newData = this.getNode(item.children, key)
              if (newData) {
                data = newData
                throw Error()
              }
            }
          }
        })
      } catch (e) {
      }
      return data
    },
    /**
     * 拖拽时判定目标节点能否被放置
     * */
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.key === 'root') {
        return false
      }else {
        if (draggingNode.data.key.indexOf('-') !== -1) {
          if (dropNode.data.key === '1' || dropNode.data.key === '2' || dropNode.data.key === '3' || dropNode.data.key === '4' || dropNode.data.key === '5') {
            return false
          }else {
            return type !== 'inner'
          }
        }else if (dropNode.data.key === '1' || dropNode.data.key === '2' || dropNode.data.key === '3' || dropNode.data.key === '4' || dropNode.data.key === '5') {
          return type !== 'inner'
        }else {
          if (dropNode.data.key.indexOf('5') !== -1) {
            return false
          }else {
            return type !== 'inner'
          }
        }
      }

    },
    /**
     * 判断节点能否被拖拽
     * */
    allowDrag(draggingNode) {
      // return draggingNode.data.label.indexOf('5-2') === -1
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeaderMenuManage_warp {
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
  .content {
    width: 300px;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>