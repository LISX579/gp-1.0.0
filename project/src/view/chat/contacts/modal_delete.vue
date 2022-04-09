<template>
  <div class="dialog-wrap">
    <el-alert
      type="warning"
      :closable="false"
      show-icon
    ><span slot="title">您确定要删除该好友吗？</span></el-alert>
    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>

import fetch from "@/fetch/chat";
export default {
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
      const postData = {
        id: JSON.parse(localStorage.getItem('userLogin')).id,
        toID: this.toID
      }
      fetch.deleteFriend(postData).then(res => {
        this.$bus.$emit('contact_refresh')
        this.close()
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.footer {
  text-align: right;
}
</style>