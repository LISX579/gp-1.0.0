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
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>


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