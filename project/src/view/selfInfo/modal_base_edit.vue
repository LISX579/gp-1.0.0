<template>
  <div class="dialog-wrap">
    <el-alert
      type="warning"
      :closable="false"
      v-if="myData.permission=='user'"
    ><span  slot="title">
      <i class="el-alert__icon el-icon-warning"/>
      &emsp;向老师发起修改申请，待老师同意后，修改成功。<br>
     </span>
    </el-alert>
    <div class="modal-form-wrap">
      <el-form label-position="left" ref="form" :model="formData"  label-width="180px" >
        <el-form-item label="学号" label-width="120px">
          {{formData.id}}
        </el-form-item>
        <el-form-item required label="姓名" label-width="120px">
          {{formData.name}}
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
      <el-button type="primary" @click="confirm" v-loading="loading">申请修改</el-button>
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
      myData: JSON.parse(localStorage.getItem('userLogin'))
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      const postData= {
        fromId: this.myData.id,
        name: this.myData.username,
        toId: this.myData.tid,
        data: this.formData
      }
      this.$socket.emit('baseEdit', postData)
      this.close()
    }
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.data));
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