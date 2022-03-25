<template>
  <div class="dialog-wrap">
    <el-alert
      type="warning"
      :closable="false"
      show-icon
    ><span slot="title">您确定要退出该系统吗？</span></el-alert>
    <div class="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
  </div>
</template>

<script>
import fetch from '../../fetch/login'

export default {
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      console.log(this.userId);
      fetch.exit(this.userId).then(res => {
        sessionStorage.removeItem('userLogin')
        this.$router.push('/')
      })
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