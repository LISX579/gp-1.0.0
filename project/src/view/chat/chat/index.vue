<template>
  <div class="chat-wrap">
    <div v-if="toID" style="height: 100%">
      <div class="chatHistory" ref="chatHis">
        <div v-for="item in msgArr">
          <card_msg
            :item="item"
          ></card_msg>
        </div>
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
import card_msg from "@/view/chat/chat/card_msg";
import fetch from '@/fetch/chat'
export default {
  components: {
    card_msg
  },
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
      toID: null,
      msg: '',
      msgArr: []
    }
  },
  methods: {
    sendMessage() {
      const postData = {
        id: this.id,
        toID: this.toID,
        content: this.msg,
        time: new Date(new Date())
      }
      this.$socket.emit('sendMsg', postData)
      this.msg = ''
    },
    close() {
    }
  },
  sockets: {
    send(data) {
      console.log(data);
    },
    sendMsg(data) {
      console.log(data);
    },
    getMsg(data) {
      this.msgArr = data.data
    }
  },
  mounted() {
    this.$bus.$on('selectedID', id => {
      this.toID = id
      const  data = {
        id: this.id,
        toID: this.toID
      }
      fetch.getMsg(data).then(res => {
        this.msgArr = res.data
        console.log(res.data);
      })
    })
  },
  watch: {
    'msgArr': function () {
      this.$nextTick(() => {
        this.$refs['chatHis'].scrollTop = parseInt(this.$refs['chatHis'].scrollHeight)
      })
    }
  }
}
</script>

<style scoped>
.chatHistory {
  height: 70%;
  background-color: #B3C0D1;
  margin: 10px 10px 10px 10px;
  padding: 20px 20px 20px 20px;
  overflow: auto;
}
.footer {
  text-align: right;
  margin-top: 10px;
}
.textarea {
  margin: 10px 10px 10px 10px;
  width: calc(100% - 20px);
}
</style>
