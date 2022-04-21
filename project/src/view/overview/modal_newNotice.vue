<template>
  <div>
    <div class="drawer-wrap">

    </div>
    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "newNotice"
};
</script>

<style scoped>
.drawer-wrap {
  margin-left: 20px;
}
.footer {
  position: absolute;
  text-align: right;
  bottom: 20px;
  right: 10px;
}
</style>