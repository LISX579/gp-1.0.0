<template>
  <div>
    <el-input type="text" placeholder="请输入消息" v-model="msg"></el-input>
    <el-button @click="btnClick">发消息</el-button>
  </div>
</template>

<script>

export default {
  computed: {
  },
  data() {
    return {
      msg: 'aaa'
    }
  },
  methods: {
    btnClick() {
      navigator.sendBeacon('http://127.0.0.1:9000/exit/'+ '1001' , {'a':'112233'})
      // this.$socket.emit('sub', '前端消息')
    }
  },
  sockets: {
    sub(data) {
      console.log(data);
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
