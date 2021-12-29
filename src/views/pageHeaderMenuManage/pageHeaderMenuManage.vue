<template>
  <div class="pageHeaderMenuManage_warp">
    <div class="content">
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
        <el-button type="primary" @click="appendDialogConfirm">确 定</el-button>
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
        <el-button type="primary" @click="delDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "pageHeaderMenuManage",
  data() {
    return {
      treeList: [
        {
          key: 'root',
          title_cn: '根目录',
          title_en: 'Root directory',
          appendBtnShow: true,
          children: [
            {
              key: '1',
              title_cn: '首页',
              title_en: 'Home',
              router: '/home',
            },
            {
              key: '2',
              title_cn: '研究方向',
              title_en: 'Research',
              router: '/research',
            },
            {
              key: '3',
              title_cn: '新闻',
              title_en: 'News',
              router: '/news',
            },
            {
              key: '4',
              title_cn: '出版物',
              title_en: 'Publications',
              router: '/publications',
            },
            {
              key: '5',
              title_cn: '成员',
              title_en: 'People',
              router: '/people',
              appendBtnShow: true,
              children: [
                {
                  key: '5-1',
                  title_cn: '教师',
                  title_en: 'Teacher',
                  router: '/people?search=Teacher',
                },
                {
                  key: '5-2',
                  title_cn: '博士后',
                  title_en: 'Postdoc',
                  router: '/people?search=Postdoc',
                },
                {
                  key: '5-3',
                  title_cn: '博士',
                  title_en: 'Doctor',
                  router: '/people?search=Doctor',
                },
                {
                  key: '5-4',
                  title_cn: '硕士',
                  title_en: 'Master',
                  router: '/people?search=Master',
                },
                {
                  key: '5-5',
                  title_cn: '校友',
                  title_en: 'Alumni',
                  router: '/people?search=Alumni',
                }
              ]
            }
          ]
        },
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
    }
  },
  computed: {
    currLang() {
      return this.$store.state.currLang
    }
  },
  methods: {
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
          let newChild = {
            key: '',
            title_cn: this.appendNodeForm.name_cn,
            title_en: this.appendNodeForm.name_en,
            router: '',
            delBtnShow: true,
          }
          if (this.appendNodeData.key === '5') {
            newChild.router = '/people?search=' + this.appendNodeForm.router
          }else {
            newChild.router = '/' + this.appendNodeForm.router
          }

          let max = 1
          let arr = []
          if (this.appendNodeData.children) {
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
              this.appendNodeData.children.push(newChild)
            }else {
              let key = max.toString()
              newChild.key = key
              this.appendNodeData.children.push(newChild)
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
            this.appendNodeData.children.push(newChild)
          }

          console.log('treeList', this.treeList)

          this.appendDialogCancel()
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
    delDialogConfirm() {
      this.delNode(this.treeList[0].children, this.delNodeData.key)
      this.delDialogVisible = false
      console.log('treeList', this.treeList)
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
            console.log('item.children', item.children)
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
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    /**
    * 拖拽成功完成时触发的事件
    * */
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
      console.log('---treeList---', this.treeList)
    },
    /**
     * 拖拽时判定目标节点能否被放置
     * */
    allowDrop(draggingNode, dropNode, type) {
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