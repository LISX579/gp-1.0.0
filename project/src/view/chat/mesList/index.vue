<template>
  <div>
    <div v-for="item in toIdMsgArr">
      <cardOfpeople :data="item" :type="'mesList'"></cardOfpeople>
    </div>
  </div>
</template>

<script>
import fetch from '@/fetch/chat'
import cardOfpeople from "@/view/chat/contacts/cardOfpeople";
export default {
  components: {
    cardOfpeople
  },
  data() {
    return {
      toIdMsgArr: []
    }
  },
  methods: {

  },
  mounted() {
    const id = JSON.parse(localStorage.getItem('userLogin')).id
    let arr = []
    fetch.getAllMsg(id).then(res => {
      res.data.forEach(item => {
        const flag = arr.find(i => {
          return i.toID === item.toID
        })
        if (!flag) {
          arr.push(item)
        }
      })
    })
  }
};
</script>

<style scoped>

</style>