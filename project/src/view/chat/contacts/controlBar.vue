<template>
  <div class="control-bar">
    <el-dropdown trigger="click" placement="top-start" @command="dropClick">
      <span class="el-dropdown-link">
        <i class="el-icon-more" style="font-size: 30px"></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="modalIncrease">添加好友</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

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
        @close="modalClose"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import modalIncrease from "@/view/chat/contacts/modal_increase";
export default {
  components: {
    modalIncrease
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
    }
  },
  methods: {
    dropClick(val) {
      switch (val) {
        case 'modalIncrease':
          this.modalTitle= '添加好友'
          break;
      }
      this.dialogVisible = true
      this.modalName = val;

    },

    modalClose() {
      this.modalName = null;
      this.dialogVisible = false;
    },
  }
}
</script>

<style scoped>
.control-bar {
  margin-left: 10px;
  position: absolute;
  bottom: 0
}
</style>