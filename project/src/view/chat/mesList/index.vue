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
  sockets: {
    msgListInc(data) {
      const a = this.toIdMsgArr.find(item => {
        return item.toID == data.toID
      })
      if (!a) this.toIdMsgArr.push(data)
    },
    msgRefresh() {
      this.getList()
    }
  },
  components: {
    cardOfpeople
  },
  data() {
    return {
      toIdMsgArr: [],
      myData: JSON.parse(localStorage.getItem('userLogin'))
    };
  },
  methods: {
    getList() {
      this.toIdMsgArr=[]
      const id = this.myData.id
      fetch.getAllMsg(id).then(res => {
        console.log(res);
        const data = res.res1.data.concat(res.res2.data)

        data.sort((a, b)=> {
          if (new Date(a.time)> new Date(b.time)) return -1
          else if (new Date(a.time) < new Date(b.time)) return 1
          else return 0
        })
        for (let i = 0 ; i < data.length; i++) {
          const flag = this.toIdMsgArr.find(item => item.toID == data[i].toID)
          if (!flag) {
            this.toIdMsgArr.push(data[i])
          }
        }
      });
    }
  },
  mounted() {
    this.getList()
    this.$bus.$on('refreshList', ()=> {
      this.getList()
    })
  }
};
</script>

<style scoped>

</style>