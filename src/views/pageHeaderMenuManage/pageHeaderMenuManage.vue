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
        <span>{{ node.label }}</span>
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

<!--    <el-dialog-->
<!--        title="添加"-->
<!--        :visible.sync="dialogVisible"-->
<!--        width="500px"-->
<!--    >-->
<!--      <span>这是一段信息</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->

<!--    <el-dialog-->
<!--        title="删除"-->
<!--        :visible.sync="dialogVisible"-->
<!--        width="500px"-->
<!--    >-->
<!--      <span>这是一段信息</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->

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
          label: '根目录',
          appendBtnShow: true,
          children: [
            {
              key: '1',
              label: '首页',
            },
            {
              key: '2',
              label: '研究方向',
            },
            {
              key: '3',
              label: '新闻',
            },
            {
              key: '4',
              label: '成果',
            },
            {
              key: '5',
              label: '成员',
              appendBtnShow: true,
              children: [
                {
                  key: '5-1',
                  label: '教师',
                },
                {
                  key: '5-2',
                  label: '博士后',
                },
                {
                  key: '5-3',
                  label: '博士',
                },
                {
                  key: '5-4',
                  label: '硕士',
                },
                {
                  key: '5-5',
                  label: '校友',
                },
              ]
            }
          ]
        },
      ],
    }
  },
  methods: {
    /**
    * 添加子节点
    * */
    appendTreeNode(data) {
      console.log(data)
      let max = 1
      let arr = []
      if (data.children) {
        data.children.forEach((item, index) => {
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

          console.log(key)
          const newChild = {
            key: key,
            label: 'test',
            delBtnShow: true,
          }
          data.children.push(newChild)
        }else {
          let key = max.toString()
          console.log(key)
          const newChild = {
            key: key,
            label: 'test',
            delBtnShow: true,
          }
          data.children.push(newChild)
        }
      }else {
        let key = ''
        if (data.key !== 'root') {
          key = data.key + '-' + '1'
        }else {
          key = '1'
        }
        const newChild = {
          key: key,
          label: 'test',
          delBtnShow: true,
        }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }

    },
    /**
     * 删除指定节点
     * */
    delTreeNode(data) {
      console.log(data)
      this.delNode(this.treeList[0].children, data.key)
      console.log(this.treeList[0].children)
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
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
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