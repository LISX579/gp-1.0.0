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