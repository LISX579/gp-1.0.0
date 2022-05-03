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
    <div class="form-wrap">
      <el-form label-position="left" ref="form" :model="formData" label-width="180px" >
        <el-form-item label="学号" label-width="120px">
          {{formData.id}}
        </el-form-item>
        <el-form-item required label="姓名" label-width="120px">
          {{myData.username}}
        </el-form-item>
        <el-form-item required label="年级" label-width="120px">
          <el-input v-model="formData.schoolYear" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="学院名称" label-width="120px">
          <el-input v-model="formData.collegeName" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="系名称" label-width="120px">
          <el-input v-model="formData.departmentName" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="专业方向" label-width="120px">
          <el-input v-model="formData.professionalDirection" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="专业名称" label-width="120px">
          <el-input v-model="formData.major" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="班级名称" label-width="120px">
          <el-input v-model="formData.className" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="学制" label-width="120px">
          <el-input v-model="formData.trainingMode" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="学籍状态" label-width="120px">
          <el-input v-model="formData.studentStatus" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="职务" label-width="120px">
          <el-input v-model="formData.office" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="是否在校" label-width="120px">
          <el-input v-model="formData.inScholl" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="报到注册状态" label-width="120px">
          <el-input v-model="formData.registStatus" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="报到注册备注" label-width="120px">
          <el-input v-model="formData.registRemark" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="报到时间" label-width="120px">
          <el-input v-model="formData.checkinTime" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="学历层次" label-width="120px">
          <el-input v-model="formData.cultivationLevel" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="培养方式" label-width="120px">
          <el-input v-model="formData.cultureMethod" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="培养层次" label-width="120px">
          <el-input v-model="formData.cultivationLevel" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="学生类别" label-width="120px">
          <el-input v-model="formData.typeOfStu" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="招生季度" label-width="120px">
          <el-input v-model="formData.enrollmentquarter" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="所属学院" label-width="120px">
          <el-input v-model="formData.affiliationSchool" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="招生专业" label-width="120px">
          <el-input v-model="formData.admissionsMajor" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="招生年度" label-width="120px">
          <el-input v-model="formData.enrollmentYear" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="毕业学院" label-width="120px">
          <el-input v-model="formData.office" style="display: inline-block;margin-right: 5px"/>
        </el-form-item>
        <el-form-item required label="毕业专业" label-width="120px">
          <el-input v-model="formData.graduatedMajor" style="display: inline-block;margin-right: 5px"/>
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
      this.$socket.emit('stuEdit', postData)
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
.form-wrap {
  margin-top: 15px;
  height: 450px;
  overflow-y: scroll;
  padding-right: 15px;
}
</style>