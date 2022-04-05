<template>
  <div class="chat-wrap">
    <el-tree :data="data" :render-content="renderContent" >
    </el-tree>
  </div>
</template>

<script>
import fetch from '@/fetch/chat'
import cardOfpeople from '@/view/chat/contacts/cardOfpeople'
export default {
  components: {
    cardOfpeople
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: null,
      props: {
        label: 'label',
        children: 'children'
      }
    }
  },
  mounted() {
    fetch.getContact(this.id).then(res => {
      const label = new Set(res.data.map(item => item.fclass))
      let _data = []
      label.forEach(item => {
        _data.push({
          label: item,
          children: []
        })
      })
      res.data.forEach(item => {
        for (let i = 0; i< _data.length; i++) {
          if (_data[i].label === item.fclass) {
            _data[i].children.push(item)
          }
        }
      })
      if (_data.length) {
        this.data = _data
      } else {
        this.data = [{
          label: '我的好友',
          children: []
        }]
      }
    })
  },
  methods: {
    renderContent (h, { node, data, store }) {
      if (node.level == 1) {
        return (
          <span>{data.label}</span>
        )
      }else return (
        <cardOfpeople data={data} type="contact"></cardOfpeople>
      )
    }
  }
}
</script>

<style scoped>
.selfInfo {
  height: 50px;
}
>>> .el-tree-node__content {
  height: 60px;
  padding-left:0px;

}
</style>