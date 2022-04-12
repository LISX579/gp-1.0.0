<template>
  <div>
    <div class="title-bar">消息列表</div>
    <div v-for="item in toIdMsgArr" class="activeCard">
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
.title-bar {
  background-color: #c6e2ff;
  border: 2px solid #b3d8ff;
  border-radius: 5px;
  /*margin: 0px 10px;*/
  text-align: center;
  height: 8%;
  min-height: 50px;
  font-size: 30px;
  color: white;
  overflow: hidden;
  border-bottom: 1px solid #E4E7ED;
  padding: 5px 0px;
}
.msgListCard {
  border: 1px solid red;
}
.activeCard {
  background-color: rgb(240, 248, 255);
  border-color: rgb(148, 197, 238);
  font-size: 14px;
}
activeCard:hover {
   color: rgb(240, 248, 255);
   background-color: rgb(148, 197, 238);
   border-color: rgb(148, 197, 238);
 }
activeCard:active {
   color: rgb(240, 248, 255);
   background-color: rgb(148, 197, 238);
   border-color: rgb(148, 197, 238);
 }
</style>