<template>
  <div>
    <div v-for="item in toIdMsgArr">
      <cardOfpeople :data="item" :type="'msgList'"></cardOfpeople>
    </div>
  </div>
</template>

<script>
import fetch from '@/fetch/chat';
import cardOfpeople from "@/view/chat/contacts/cardOfpeople";

export default {
  components: {
    cardOfpeople
  },
  data() {
    return {
      toIdMsgArr: []
    };
  },
  methods: {
    getList() {
      const id = JSON.parse(localStorage.getItem('userLogin')).id;
      fetch.getAllMsg(id).then(res => {
        res.data.forEach(item => {
          const flag = this.toIdMsgArr.find(it => it.toID === item.toID)
          if (!flag) this.toIdMsgArr.push(item)
          else {
            let index = -1
            this.toIdMsgArr.forEach((it,ind) => {
              index = ind
            })
            this.toIdMsgArr[index] = item
          }
        })
      });
    }
  },
  mounted() {
    this.getList()
  }
};
</script>

<style scoped>

</style>