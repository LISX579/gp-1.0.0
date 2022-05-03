<template>
  <div>
    <div style="margin-top: 15px">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{ data.title || '-'}}</span>
          <el-dropdown v-if="myData.permission=='admin'" style="float: right; padding-top:0px; " @command="dropClick">
            <el-button type="text" >
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modalDelete" :disabled="myData.id!=data.id">删除</el-dropdown-item>
              <el-dropdown-item command="modalEdit" :disabled="myData.id!=data.id">编辑</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-tag type="info">时间：{{formatDateTime(data.time)}}</el-tag><br><br>
          <el-tag>
            公告内容：
          </el-tag><br><br>
          {{data.content || '-'}}
        </div>
        <div></div>
      </el-card>
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
        :data="data"
        @close="modalClose"
      ></component>
    </el-dialog>
  </div>
</template>

<script>
import modalDelete from "@/view/overview/modal_delete";
import modalEdit from "@/view/overview/modal_edit";
import util from "@/util/util";
export default {
  components: {
    modalDelete,
    modalEdit
  },
  mixins: [ util ],
  props:{
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      myData: JSON.parse(localStorage.getItem('userLogin')),
      modalTitle: '',
      dialogVisible: false,
      modalName: '',

    }
  },
  methods: {
    dropClick(val) {
      switch (val) {
        case 'modalDelete':
          this.modalTitle = '删除公告'
          this.modalName = 'modalDelete'
          break;
        case 'modalEdit':
          this.modalTitle = '修改公告'
          this.modalName = 'modalEdit'
          break;
      }
      this.dialogVisible = true
    },
    modalClose () {
      this.dialogVisible = false
      this.modalName=''
    }
  }
};
</script>

<style scoped>
>>> .el-card__body {
  height: 260px;
}
>>> .el-button--text {
  padding-top: 0px;
}
</style>