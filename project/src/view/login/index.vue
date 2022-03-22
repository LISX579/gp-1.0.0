<template>
  <div class="wrap">
    <el-tabs class="wrapper" stretch>
      <el-tab-pane label="登录">
        <login></login>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <login :register="true"></login>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Login from "@/view/login/login"

export default {
  components: {
    Login
  }
}
</script>

<style scoped>
.wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background: url('../../assets/img/background.jpg') no-repeat 4px 5px;
  background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
}

.wrapper {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
}
</style>
