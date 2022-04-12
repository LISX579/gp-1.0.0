<template>
  <div class="control-bar">
    <el-dropdown trigger="click" placement="top-start" @command="dropClick">
      <span class="el-dropdown-link">
        <i class="el-icon-more" style="font-size: 25px;    color: #409EFF;"></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="modalIncrease">添加好友</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-tooltip class="item" effect="dark" content="待处理" placement="right-start">
      <div class="notice">
        <el-badge :value="pendingData.length || ''" class="item">
          <el-button @click="modalPending" type="text">
            <i class="el-icon-bell" style="font-size: 25px"></i>
          </el-button>
        </el-badge>
      </div>
    </el-tooltip>

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
        :id="id"
        :tableData="pendingData"
        @close="modalClose"
      ></component>
    </el-dialog>
  </div>
</template>

<script>

import modalIncrease from "@/view/chat/contacts/modal_increase";
import modalPending from "@/view/chat/contacts/modal_pending";
import util from "@/util/util";

export default {
  mixins: [util],
  sockets: {
    refreshApply(data) {
      const _data = this.parseRes(data)
      this.pendingData = _data
    },
    demoBack(data) {
      console.log(data);
    }
  },
  components: {
    modalIncrease,
    modalPending
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      modalTitle: '',
      modalName: '',
      dialogVisible: false,
      pendingData: [],
      myID: JSON.parse(localStorage.getItem('userLogin')).id
    }
  },
  methods: {
    click() {
      this.$socket.emit('applyAdd','1004')
    },
    dropClick(val) {
      switch (val) {
        case 'modalIncrease':
          this.modalTitle= '添加好友'
          break;
      }
      this.dialogVisible = true
      this.modalName = val;
    },
    modalPending() {
      this.modalTitle= '待处理'
      this.dialogVisible = true
      this.modalName = 'modalPending'
    },

    modalClose() {
      this.modalName = null;
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.$socket.emit('getApply',this.id)
  }
}
</script>

<style scoped>
.control-bar {
  position: absolute;
  bottom: 0;
  /*width: 30%;*/
  padding-left: 10px;
  padding-bottom: 5px;
}
.notice {
  display: inline-block;
  margin-left: 10px;
}
</style>