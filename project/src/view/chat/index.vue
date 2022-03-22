<template>
  <div class="current-content-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%">
      <el-tab-pane label="通讯" name="chat" style="height: 100%">
        <div class="container">
          <div class="left">
            <chat></chat>
          </div>
          <div class="center">bbb</div>
          <div class="right">ccc</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import chat from './chat/index'
export default {
  components: {
    chat
  },
  data() {
    return {
      activeName: 'chat'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.current-content-wrap {
  height: 100%;
}
.container{
  display: flex;
  height: 100%;
}
.left{
  flex-basis: 25%;
  height: 100%;
  background-color: pink;
}
.center{
  flex-grow: 1;
  height: 100%;
  background-color: powderblue;
}
.right{
  flex-basis: 25%;
  height: 100%;
  background-color: pink;
}
>>> .el-tabs {
  height: 100%;
}
>>> .el-tabs--top {
  height: 100%;
}
>>> .el-tabs__content{
  height: 94%;
}
>>> .el-tab-pane {
  height: 100%;
}
</style>
