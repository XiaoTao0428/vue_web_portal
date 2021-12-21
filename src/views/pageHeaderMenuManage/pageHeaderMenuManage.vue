<template>
  <div class="pageHeaderMenuManage_warp">
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
</template>

<script>
export default {
  name: "pageHeaderMenuManage",
  data() {
    return {
      treeList: [
        {
          key: 'home',
          label: '首页',
        },
        {
          key: 'research',
          label: '研究方向',
        },
        {
          key: 'news',
          label: '新闻',
        },
        {
          key: 'publications',
          label: '成果',
        },
        {
          key: 'people',
          label: '成员',
          appendBtnShow: true,
          children: [
            {
              key: 'people-1',
              label: '教师',
            },
            {
              key: 'people-2',
              label: '博士后',
            },
            {
              key: 'people-3',
              label: '博士',
            },
            {
              key: 'people-4',
              label: '硕士',
            },
            {
              key: 'people-5',
              label: '校友',
            },
          ]
        }
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
        if (dropNode.data.key === 'home' || dropNode.data.key === 'research' || dropNode.data.key === 'news' || dropNode.data.key === 'publications' || dropNode.data.key === 'people') {
          return false
        }else {
          return type !== 'inner'
        }
      }else if (dropNode.data.key === 'home' || dropNode.data.key === 'research' || dropNode.data.key === 'news' || dropNode.data.key === 'publications' || dropNode.data.key === 'people') {
        return type !== 'inner'
      }else {
        if (dropNode.data.key.indexOf('people') !== -1) {
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
      return draggingNode.data.label.indexOf('5-2') === -1
    }
  }
}
</script>

<style lang="scss" scoped>
.pageHeaderMenuManage_warp {
  
}
</style>