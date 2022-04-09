<template>
  <div class="dialog-wrap">
    <div class="form-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="180px" >
        <el-form-item required prop="input">
          <span slot="label">请输入好友名字/ID号</span>
          <el-input v-model="form.input" style="display: inline-block;width: 80%;margin-right: 5px"/><el-button @click="find">查找</el-button>
        </el-form-item>
        <div v-if="finData.length" class="card-wrap">
          <div v-for="item in finData" :class="selectedCard===item ? 'selectedClass': ''">
            <cardOfpeople :data="item" :type="'findCard'" @selectCard="selectCard"></cardOfpeople>
          </div>
          <el-input
            v-if="selectedCard"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入验证消息..."
            v-model="form.checkInfo"
            style="margin-top: 10px"
          >
          </el-input>
        </div>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm" :disabled="!selectedCard">确定</el-button>
    </div>
  </div>
</template>

<script>
import fetch from "@/fetch/chat";
import cardOfpeople from "@/view/chat/contacts/cardOfpeople";
export default {
  components: {
    cardOfpeople
  },
  data () {
    return {
      form: {
        checkInfo: ''
      },
      finData:[],
      rules: {
        input: [
          { required: true, message: '请输入查找内容', trigger: 'blur' },
        ]
      },
      selectedCard: null
    }
  },
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectCard (data) {
      this.selectedCard = data
    },
    close () {
      this.$emit('close')
    },
    find() {
      fetch.find(this.form).then(res => {
        this.finData = res.data
      })
    },
    confirm () {
      let data = {
        username: JSON.parse(localStorage.getItem('userLogin')).username,
        img: JSON.parse(localStorage.getItem('userLogin')).img,
        text: JSON.parse(localStorage.getItem('userLogin')).text,
        checkInfo: this.form.checkInfo,
        opType: 'addFriend',
        fromID: JSON.parse(localStorage.getItem('userLogin')).id
      }
      const postData = {
        id: JSON.parse(localStorage.getItem('userLogin')).id,
        toID: this.selectedCard.id,
        data: JSON.stringify(data),
      }
      this.$socket.emit('applyAdd', postData)
      this.close()
    }
  },
  mounted() {
  }
}
</script>

<style>
.footer {
  text-align: right;
}
.card-wrap {
  border-radius:10px;
  background-color: #fbfbff;
  color: #606266;
  margin-right: 40px;
  margin-left: 25px;
  line-height: 27px;
  margin-bottom: 10px;
}
.selectedClass {
  border-radius:10px;
  background-color: #f0f9eb;
  color: #67c23a;
}
</style>