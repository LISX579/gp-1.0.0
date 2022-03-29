<template>
  <div>
    <el-dropdown trigger="click" @command="dropClick">
        <span class="el-dropdown-link">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <span>{{ username }}</span>
        </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="modalHome">我的主页</el-dropdown-item>
        <el-dropdown-item command="modalConfig">设置</el-dropdown-item>
        <el-dropdown-item command="modalExit">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      class="dialog"
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="'520px'"
      @close="modalClose"
    >
      <component
        :is="modalName"
        :userId="userId"
        @close="modalClose"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import fetch from "@/fetch/selfInfo";
import modalExit from "@/global/structure/modal_exit";
export default {
  components: {
    modalExit
  },
  data() {
    return {
      username: '',
      userId: JSON.parse(localStorage.getItem('userLogin')).id,
      modalTitle: '',
      modalName: '',
      dialogVisible: false
    };
  },
  mounted() {
    fetch.getBaseInfo(this.userId).then(res => {
      this.username = res.data[0].username
    });
  },
  methods: {
    dropClick(val) {
      switch (val) {
        case 'modalHome':
          this.modalTitle = '我的主页'
          break;
        case 'modalConfig':
          this.modalTitle = '设置'
          break;
        case 'modalExit':
          this.modalTitle = '退出登录'
          break;
      }
      this.modalName = val;
      this.dialogVisible = true;
    },
    modalClose() {
      this.modalName = null;
      this.dialogVisible = false;
    }
  }
};
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-dropdown-link {
  cursor: pointer;
}

.dialog {
  text-align: left;
  line-height: 30px;
}

</style>
