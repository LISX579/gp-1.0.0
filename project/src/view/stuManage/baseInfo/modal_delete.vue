<template>
  <div class="dialog-wrap">
    <el-alert
      type="warning"
      :closable="false"
    ><span slot="title">
      <i class="el-alert__icon el-icon-warning"/>
      &emsp;此操作会删除对该学生的信息管理，确认要删除吗？<br>
     </span>
    </el-alert>
   <div class="modal-form-wrap">
     <el-descriptions title="学生信息">
       <el-descriptions-item label="学号">{{selectItem[0].id}}</el-descriptions-item>
       <el-descriptions-item label="姓名">{{selectItem[0].name}}</el-descriptions-item>
     </el-descriptions>
   </div>


    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm" v-loading="loading">确定</el-button>
    </div>
  </div>
</template>

<script>

import fetch from "@/fetch/stuManage";
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    selectItem: {
      type: Array,
      default: []
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      const postData = {
        id: JSON.parse(localStorage.getItem('userLogin')).id,
        toID: this.selectItem[0].id
      }
      fetch.stuManageDelete(postData).then(res => {
        this.$bus.$emit('stuRefresh')
        this.close()
      })
    }
  },
  mounted() {
  }
}
</script>

<style>
.footer {
  text-align: right;
}
</style>