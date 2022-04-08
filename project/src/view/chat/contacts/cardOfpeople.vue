<template>
  <div>
    <div class="cardPeo" @click="cardClick" v-if="type==='contact'">
      <el-avatar size="large" class="headImg"></el-avatar>
      &emsp;{{data.username}}({{data.id}})
      <div class="control">
        <el-dropdown trigger="click" placement="bottom-end" @command="dropClick">
          <el-button @click.stop type="text" style="margin-bottom: 5px">
            <i class="el-icon-more"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modalMove">移动联系人分组</el-dropdown-item>
            <el-dropdown-item command="sendMsg">发送消息</el-dropdown-item>
            <el-dropdown-item command="drawerInfo">查看资料</el-dropdown-item>
            <el-dropdown-item command="modalDelete">删除好友</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <br>
      &emsp;<div class="selfText">[{{data.status === 'offline' ? '离线': '在线'}}]&nbsp;{{data.text}}</div>

    </div>
    <div v-if="type==='msgList'" class="msgClass">
      <div @click="cardClick">
        <el-avatar size="large" class="headImg"></el-avatar>
        &emsp;{{data.username}}({{data.toID}})
        <div class="control">
        <el-dropdown trigger="click" placement="bottom-end" @command="dropClick">
          <el-button @click.stop type="text" style="margin-bottom: 20px">
            <i class="el-icon-more"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modalRemove">从会话列表移除</el-dropdown-item>
            <el-dropdown-item command="sendMsg">发送消息</el-dropdown-item>
            <el-dropdown-item command="drawerInfo">查看资料</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div><br>
        &emsp;<div class="selfText">{{data.content}}</div>


      </div>
    </div>
    <el-dialog
      class="dialog"
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="'520px'"
      @close="modalClose"
    >
      <component
        :is="modalName"
        :toID="this.type === 'contact' ? this.data.id : this.data.toID"
        @close="modalClose"
      ></component>
    </el-dialog>

    <el-drawer
      :visible.sync="drawerVisible"
      show-close
      size="80%"
      :with-header="false">
      <drawerInfo :user-id="this.type === 'contact' ? this.data.id.toString() : this.data.toID.toString()" :title="data.username"></drawerInfo>
    </el-drawer>

  </div>
</template>

<script>
import modalDelete from "@/view/chat/contacts/modal_delete";
import modalMove from "@/view/chat/contacts/modal_move";
import drawerInfo from "@/view/selfInfo";
import modalRemove from "@/view/chat/contacts/modal_remove";
export default {
  components: {
    modalDelete,
    modalMove,
    drawerInfo,
    modalRemove
  },
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
  data () {
   return {
     modalTitle: '',
     modalName: '',
     dialogVisible: false,
     drawerVisible: false
   }
  },
  mounted() {
    console.log(typeof this.data.id);
  },
  methods: {
    cardClick () {
      const id = this.type === 'contact' ? this.data.id : this.data.toID
      this.$bus.$emit('selectedID', id)
    },
    dropClick(val) {
      switch (val) {
        case 'modalMove':
          this.modalTitle = '移动联系人分组'
          break;
        case 'sendMsg':
          this.$bus.$emit('selectedID', this.type === 'contact' ? this.data.id : this.data.toID)
          break;
        case 'drawerInfo':
          this.drawerVisible = true
          break;
        case 'modalDelete':
          this.modalTitle = '删除好友'
          break;
        case 'modalRemove':
          this.modalTitle = '从会话列表删除'
          break;
      }
      if (['sendMsg', 'drawerInfo'].includes(val)) return;
      this.modalName = val;
      this.dialogVisible = true;
      console.log(this.dialogVisible);
    },
    modalClose() {
      this.modalName = null;
      this.dialogVisible = false;
    },
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
.msgClass {
  padding-top: 20px;
  margin-left: 40px;
  cursor: pointer;
}
.selfText {

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 280px;
}
.control {
  display: inline-block;
  right: 10px;
  position: absolute;
}

</style>