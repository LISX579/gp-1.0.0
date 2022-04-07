<template>
  <div class="chat-wrap">
    <el-tree :data="data" :render-content="renderContent" >
    </el-tree>
    <control-bar></control-bar>
  </div>
</template>

<script>
import fetch from '@/fetch/chat'
import cardOfpeople from '@/view/chat/contacts/cardOfpeople'
import controlBar from "@/view/chat/contacts/controlBar";
export default {
  components: {
    cardOfpeople,
    controlBar
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
    this.getData()
    this.$bus.$on('contact_move', ()=> {
      this.getData()
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
    },
    getData() {
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