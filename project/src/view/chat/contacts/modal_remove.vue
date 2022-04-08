<template>
  <div class="dialog-wrap">
    <el-alert
      type="warning"
      :closable="false"
    ><span slot="title">
      <i class="el-alert__icon el-icon-warning"/>
      &emsp;此操作会删除与目标联系人的聊天记录。<br>
      &emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确定要让此联系人移除对话列表？</span>
    </el-alert>
    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm" v-loading="loading">确定</el-button>
    </div>
  </div>
</template>

<script>

import fetch from "@/fetch/chat";
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    toID: {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.loading = true
      const postData = {
        id: JSON.parse(localStorage.getItem('userLogin')).id,
        toID: this.toID
      }
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
</style>