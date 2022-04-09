<template>
  <div class="chat-wrap">
    <el-tree :data="data" :render-content="renderContent" >
    </el-tree>
  </div>
</template>

<script>
import fetch from '@/fetch/chat'
import cardOfpeople from '@/view/chat/contacts/cardOfpeople'
import controlBar from "@/view/chat/contacts/controlBar";
export default {
  sockets: {
    applyAgreeBack(data) {
      const id = JSON.parse(localStorage.getItem('userLogin')).id
      if (data.indexOf(id)> -1) {
        this.getData()
      }
    }
  },
  components: {
    cardOfpeople,
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
    this.$bus.$on('contact_refresh', ()=> {
      this.getData()
    })
  },
  methods: {
    renderContent (h, { node, data, store }) {
      if (node.level == 1) {
        let count = 0
        data.children.forEach(item => {
          if (item.status === 'online') count++
        })
        return (
          <div>
            {data.label}
            <span style="right: 10px; position: absolute;">{count}/{data.children.length}</span>
          </div>
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
        this.data=_data
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
.count {

}
</style>