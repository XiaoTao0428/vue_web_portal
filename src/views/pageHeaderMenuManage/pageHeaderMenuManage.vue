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
      </span>
      </el-tree>
    </div>
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
      const newChild = { key: parseInt(Math.random() * 10 + 10), label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
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