<template>
  <div>
    <el-input type="text" placeholder="请输入消息" v-model="msg"></el-input>
    <el-button @click="handleEnter">发消息</el-button>
  </div>
</template>

<script>

const ws = new WebSocket('ws://localhost:8081')

export default {
  data () {
    return {
      msg: '',
      username: '',
      msgList: []
    }
  },
  methods: {
    handleEnter () {
      const msg = this.msg
      if (!msg.trim().length) {
        return
      }

    },
    handleSendBtn (e) {
      console.log('FE:WebSocket open', e)
    },
    handleWsClose (e) {
      console.log('FE:WebSocket close', e)
    },
    handleWsError(e) {
      console.log('FE:WebSocket error', e)
    },
    handleWsMessage(e) {
      console.log('FE:WebSocket message', e)
    }
  },
  mounted() {
    ws.addEventListener('open', this.handleSendBtn.bind(this), false)
    ws.addEventListener('close', this.handleWsClose.bind(this), false)
    ws.addEventListener('error', this.handleWsError.bind(this), false)
    ws.addEventListener('message', this.handleWsMessage.bind(this), false)
  }
}
</script>

<style scoped>

</style>
