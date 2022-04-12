<template>
  <div class="chat-wrap">
    <div v-if="toID" style="height: 100%">
      <div class="title-bar">{{ toData ? toData.username : '' }}({{ toData ? toData.id : '' }})</div>
      <div class="chatHistory" ref="chatHis">
        <div v-for="item in msgArr">
          <card_msg
            :item="item"
            :align="item.align"
          ></card_msg>
        </div>
      </div>
      <el-input
        class="textarea"
        type="textarea"
        placeholder="请输入消息"
        v-model="msg"
        :rows="5"
        show-word-limit
        resize='none'
        @keyup.enter.native="sendMessage"
      />
      <div class="footer">
        <el-button @click="close">关闭</el-button>
        <el-button @click="sendMessage" type="warning" plain>发送</el-button>
      </div>
    </div>
    <div v-else style="height: 100%">暂未打开聊天界面相应ID</div>
  </div>
</template>

<script>
import card_msg from "@/view/chat/chat/card_msg";
import fetch from '@/fetch/chat';

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
  computed: {},
  data() {
    return {
      toID: null,
      toData: null,
      msg: '',
      msgArr: [],
      myData: JSON.parse(localStorage.getItem('userLogin'))
    };
  },
  methods: {
    sendMessage() {
      const postData = {
        id: this.id,
        toID: this.toID,
        content: this.msg,
        time: new Date(new Date())
      };
      this.$socket.emit('sendMsg', postData);
      this.msg = '';
      postData.align = postData.id == this.myData.id ? 'right' : 'left';
      this.msgArr.push(postData);
    },
    close() {
      this.emit('close')
    }
  },
  sockets: {
    getMsg(data) {
      data.align = 'left';
      if (data.id == this.toData.id) this.msgArr.push(data);
      this.$socket.emit('openChat', {
        id: this.myData.id,
        toID: this.toID
      });
    }
  },
  mounted() {
    this.msgArr = [];
    this.$bus.$on('selectedID', id => {
      // 已读当前id的界面消息
      this.$socket.emit('openChat', {
        id: this.myData.id,
        toID: id
      });


      // 刷新chat页面为选中id的页面
      this.toID = id;
      const data = {
        id: this.id,
        toID: this.toID
      };
      fetch.getUserInfo(this.toID).then(res => {
        this.toData = res.data[0];
      });

      fetch.getMsg(data).then(res => {
        const data = res.data;
        data.sort((a, b) => {
          if (new Date(a.time) > new Date(b.time)) return 1;
          else if (new Date(a.time) < new Date(b.time)) return -1;
          else return 0;
        });
        data.forEach(item => {
          item.align = item.id == this.myData.id ? 'right' : 'left';
        });
        this.msgArr = data;
      });
    });
  },
  watch: {
    'msgArr': function () {
      this.$nextTick(() => {
        if (this.$refs['chatHis']) {
          this.$refs['chatHis'].scrollTop = parseInt(this.$refs['chatHis'].scrollHeight);
        }
      });
    }
  }
};
</script>

<style scoped>
.chatHistory {
  height: 70%;
  /*background-color: #B3C0D1;*/
  border: 2px solid #b3d8ff;
  border-radius: 5px;
  margin: -5px 10px 0px 10px;
  padding: 20px 20px 20px 20px;
  overflow: auto;
  background-color: #ecf5ff;
  z-index: 10;
}

.footer {
  text-align: right;
  margin: 5px 10px ;
}

.textarea {
  /*margin: 10px 10px 10px 10px;*/
  margin-left: 10px;
  width: calc(100% - 20px);
}

.title-bar {
  background-color: #c6e2ff;
  border: 2px solid #b3d8ff;
  border-radius: 5px;
  margin: 0px 10px;
  text-align: center;
  height: 8%;
  min-height: 50px;
  font-size: 30px;
  color: white;
  overflow: hidden;
  border-bottom: 1px solid #E4E7ED;
  padding: 5px 0px;
}
</style>
