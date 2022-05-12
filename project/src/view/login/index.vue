<template>
  <div class="wrap">
    <div class="wrapper">
      <div class="text">学生管理系统</div>
      <el-tabs stretch>
        <el-tab-pane label="登录">
          <login></login>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <login :register="true"></login>
        </el-tab-pane>
      </el-tabs>
    </div>
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
  background: #a7b0bb;
  opacity: 0.9;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  width: 400px
}
.text {
  margin-top: 20px;
  text-align: center;
  height: 8%;
  min-height: 50px;
  font-size: 30px;
  color: #4f81af;
  overflow: hidden;
}
</style>
