<template>
  <div class="chat-wrap">
    <div v-if="toID" style="height: 100%">
      <div class="chatHistory">
        {{this.toID || 'asdsa'}}
      </div>
      <el-input
        class="textarea"
        type="textarea"
        placeholder="请输入消息"
        v-model="msg"
        :rows="4"
        show-word-limit
        resize='none'
      />
      <div class="footer">
        <el-button @click="close">关闭</el-button>
        <el-button @click="sendMessage">发送</el-button>
      </div>
    </div>
    <div v-else style="height: 100%">暂未选择相应ID</div>
  </div>
</template>

<script>
import fetch from "@/fetch/chat";
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  data() {
    return {
      msg: '',
      toID: null
    }
  },
  methods: {
    sendMessage() {
      const postData = {
        id: this.id,
        toID: this.toID,
        content: this.msg,
        time: new Date()
      }
      fetch.sendMsg(postData).then(res => {
        console.log(res);
      })
    },
    close() {
    }
  },
  sockets: {
    send(data) {
      console.log(data);
    }
  },
  mounted() {
    this.$bus.$on('selectedID', id => {
      this.toID = id
    })

  }
}
</script>

<style scoped>
.chatHistory {
  height: 80%;
  background-color: #B3C0D1;
  margin: 10px 10px 10px 10px;
}
.footer {
  text-align: right;
  margin-top: 10px;
}
.textarea {
  margin-top: 10px;
}
</style>
