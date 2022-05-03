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
import util from "@/util/util";
export default {
  mixins: [util],
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm () {
      const postData = {
        ...this.data
      }
      postData.time = this.formatDateTime(postData.time)
      this.$socket.emit('notice_delete', postData)
      this.close()
    }
  }

}
</script>

<style scoped>
.footer {
  text-align: right;
}
</style>