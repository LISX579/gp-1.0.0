<template>
  <div>
    <div class="cardPeo" @click="cardClick" v-if="type==='contact'">
      <el-avatar size="large" class="headImg"></el-avatar>
      &emsp;{{data.username}}({{data.id}})<br>
      &emsp;[{{data.status === 'offline' ? '离线': '在线'}}]&nbsp;{{data.text}}
    </div>
    <div v-if="type==='megList'" class="cardPeo">
      <div @click="cardClick">
        <el-avatar size="large" class="headImg"></el-avatar>
        &emsp;{{data.username}}({{data.id}})<br>
        &emsp;[{{data.status === 'offline' ? '离线': '在线'}}]&nbsp;{{data.text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
 props:{
   data: {
     type: Object,
     default: ''
   },
   type: {
     type: String,
     default: ''
   }
 },
  mounted() {
    console.log(this.type);
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