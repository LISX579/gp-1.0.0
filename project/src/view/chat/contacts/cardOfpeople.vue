<template>
  <div class="cardPeo" @click="cardClick">
    <el-avatar size="large" class="headImg"></el-avatar>
    &emsp;{{data.username}}({{data.id}})<br>
    &emsp;[{{data.status === 'offline' ? '离线': '在线'}}]&nbsp;aabbc
  </div>
</template>

<script>
export default {
 props:{
   data: {
     type: Object,
     default: ''
   }
 },
  mounted() {
    console.log(this.data);
  },
  methods: {
    cardClick () {
      this.$bus.$emit('selectedID', this.data.id)
    }
  }
};
</script>

<style scoped>
.headImg {
  display: flex;
  float: left;
}
.cardPeo {
  padding-top: 10px;
  height: 100%;
  width: 100%;
  margin-left: -30px;
}
</style>