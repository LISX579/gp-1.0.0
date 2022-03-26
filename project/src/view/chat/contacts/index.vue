<template>
  <div class="chat-wrap">
    <el-tree :data="data"></el-tree>
  </div>
</template>

<script>
import fetch from '@/fetch/chat'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: null
    }
  },
  mounted() {
    console.log('contact');
    fetch.getContact(this.id).then(res => {
      console.log(res);
    })
  }
}
</script>

<style scoped>

</style>