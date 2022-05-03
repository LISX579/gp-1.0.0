<template>
  <div class="dialog-wrap">
    <el-alert
      type="warning"
      :closable="false"
    ><span slot="title">
      <i class="el-alert__icon el-icon-warning"/>
      &emsp;此操作会更改该学生的基本信息，确认要删除吗？<br>
     </span>
    </el-alert>
    <div class="modal-form-wrap">
      <el-form label-position="left" ref="form" :model="formData" :rules="rules" label-width="180px" >
        <el-form-item label="学号" label-width="120px">
          {{formData.id}}
        </el-form-item>
        <el-form-item required label="姓名" label-width="120px">
          <el-input v-model="formData.name" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="身份证号" label-width="120px">
          <el-input v-model="formData.idNumber" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="民族" label-width="120px">
          <el-input v-model="formData.nation" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="国籍" label-width="120px">
          <el-input v-model="formData.nationality" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="生源地" label-width="120px">
          <el-input v-model="formData.PlaceOfOrigin" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="性别" label-width="120px">
          <el-input v-model="formData.sex" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="地址" label-width="120px">
          <el-input v-model="formData.registeredResidence" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
      </el-form>
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
      loading: false,
      formData: {},
      rules: {
        input: [
          { required: true, message: '请输入查找内容', trigger: 'blur' },
        ]
      },
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
      const postData= {
        id: JSON.parse(localStorage.getItem('userLogin')).id,
        data: this.formData
      }
      fetch.stuManageEdit(postData).then(res => {
        this.$bus.$emit('stuRefresh')
        this.close()
      })
    }
  },
  mounted() {
    this.formData = this.selectItem[0];
  }
}
</script>

<style>
.footer {
  text-align: right;
}
>>> .el-input {
  width: 85%;
}
</style>