<template>
  <div class="current-content-wrap">
    <div class="title">公告</div>
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane
        label="公告"
        name="notice"
      >
        <div class="control-bar" v-if="myData.permission==='admin'">
          <div class="action-bar">
            <el-button @click="showModalMore" type="text">更多公告</el-button>
            <div class="btn">
              <el-button @click="newNotice" type="primary">发布新公告</el-button>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="leftOne">
            <card-notice :data="carData[0]" v-if="carData[0]"/>
            <card-notice :data="carData[1]" v-if="carData[1]"/>
          </div>
          <div class="leftTwo">
            <card-notice :data="carData[2]" v-if="carData[2]"/>
            <card-notice :data="carData[3]" v-if="carData[3]"/>
          </div>
          <div class="rightOne">
            <card-notice :data="carData[4]" v-if="carData[4]"/>
            <card-notice :data="carData[5]" v-if="carData[5]"/>
          </div>
          <div class="rightTwo">
            <card-notice :data="carData[6]" v-if="carData[6]"/>
            <card-notice :data="carData[7]" v-if="carData[7]"/>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      class="dialog"
      style="z-index: 1990"
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="'800px'"
      @close="modalClose"
    >
      <component
        :is="modalName"
        :data="carData"
        @close="modalClose"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import modalNewNotice from "@/view/overview/modal_new_notice";
import newNotice from "@/view/overview/modal_new_notice";
import cardNotice from "@/view/overview/card_notice";
import modalMore from "@/view/overview/modal_more";
export default {
  sockets: {
    noticeRefresh (res) {
      const data = res.data
      data.sort((a, b) => {
        if (new Date(a.time) > new Date(b.time)) return -1;
        else if (new Date(a.time) < new Date(b.time)) return 1;
        else return 0;
      });
      this.carData = data;
    }
  },
  components: {
    modalNewNotice,
    newNotice,
    cardNotice,
    modalMore
  },
  data() {
    return {
      carData: [],
      myData: JSON.parse(localStorage.getItem('userLogin')),
      activeName: 'notice',
      drawerVisible: false,
      modalName: '',
      modalTitle: '',
      dialogVisible: ''
    }
  },
  methods: {
    newNotice() {
      this.modalName = 'modalNewNotice'
      this.modalTitle = '发布新公告'
      this.dialogVisible = true
    },
    showModalMore () {
      this.modalName = 'modalMore'
      this.modalTitle = '更多公告'
      this.dialogVisible = true
    },
    modalClose() {
      this.modalName = null;
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.modalName = null;
    this.dialogVisible = false;
    this.$socket.emit('getNotice', this.myData)
  }
}
</script>

<style scoped>
.action-bar {
  flex: 1;
  text-align: left;
  margin: 15px 0px -5px 10px;
}
.btn {
  display: inline-block;
  position: absolute;
  right: 0px;
}

.current-content-wrap {
  height: 92%;
  margin-top: 5px;
}

.container {
  display: flex;
  height: 100%;
}
.leftOne{
  flex-basis: 25%;
  height: 100%;
  /*background-color: aquamarine;*/
}
.leftTwo{
  margin-left: 5px;
  flex-basis: 25%;
  height: 100%;
  /*background-color: greenyellow;*/
}
.rightOne{
  margin-left: 5px;
  flex-basis: 25%;
  height: 100%;
  /*background-color: white;*/
}
.rightTwo{
  margin-left: 5px;
  flex-basis: 25%;
  height: 100%;
  /*background-color: wheat;*/
}
.control-bar {
  /*background-color: pink;*/
}
>>> .el-tabs {
  height: 100%;
}

>>> .el-tabs--top {
  height: 100%;
}

>>> .el-tabs__content {
  height: 94%;
  margin-top: -20px;
}

>>> .el-tab-pane {
  height: 100%;
}
</style>
