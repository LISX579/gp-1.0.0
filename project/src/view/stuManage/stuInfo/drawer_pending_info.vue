<template>
  <div class="detail-wrap" v-loading="loading">
    <el-form ref="form" label-position="left" v-if="oldData">
      <el-form-item label="学号" label-width="120px">
        {{data.id}}
      </el-form-item>
      <el-form-item label="姓名" label-width="120px">
        {{data.name}}
      </el-form-item>
      <el-form-item :required="newData.schoolYear!=oldData.schoolYear" label="年级" label-width="120px">
        {{newData.schoolYear}}
      </el-form-item>
      <el-form-item :required="newData.collegeName!=oldData.collegeName" label="学院名称" label-width="120px">
        {{newData.collegeName}}
      </el-form-item>
      <el-form-item :required="newData.departmentName!=oldData.departmentName" label="系名称" label-width="120px">
        {{newData.departmentName}}
      </el-form-item>
      <el-form-item :required="newData.professionalDirection!=oldData.professionalDirection" label="专业方向" label-width="120px">
        {{newData.professionalDirection}}
      </el-form-item>
      <el-form-item :required="newData.major!=oldData.major" label="专业名称" label-width="120px">
        {{newData.major}}
      </el-form-item>
      <el-form-item :required="newData.className!=oldData.className" label="班级名称" label-width="120px">
        {{ newData.className }}
      </el-form-item>
      <el-form-item :required="newData.trainingMode!=oldData.trainingMode" label="学制" label-width="120px">
        {{ newData.trainingMode }}
      </el-form-item>
      <el-form-item :required="newData.studentStatus!=oldData.studentStatus" label="学籍状态" label-width="120px">
        {{ newData.studentStatus }}
      </el-form-item>
      <el-form-item :required="newData.office!=oldData.office" label="职务" label-width="120px">
        {{ newData.office }}
      </el-form-item>
      <el-form-item :required="newData.inScholl!=oldData.inScholl" label="是否在校" label-width="120px">
        {{ newData.inScholl }}
      </el-form-item>
      <el-form-item :required="newData.registStatus!=oldData.registStatus" label="报到注册状态" label-width="120px">
        {{ newData.registStatus }}
      </el-form-item>
      <el-form-item :required="newData.registRemark!=oldData.registRemark" label="报到注册备注" label-width="120px">
        {{ newData.registRemark }}
      </el-form-item>
      <el-form-item :required="newData.checkinTime!=oldData.checkinTime" label="报到时间" label-width="120px">
        {{ newData.checkinTime }}
      </el-form-item>
      <el-form-item :required="newData.cultivationLevel!=oldData.cultivationLevel" label="学历层次" label-width="120px">
        {{ newData.cultivationLevel }}
      </el-form-item>
      <el-form-item :required="newData.cultureMethod!=oldData.cultureMethod" label="培养方式" label-width="120px">
        {{ newData.cultureMethod }}
      </el-form-item>
      <el-form-item :required="newData.cultivationLevel!=oldData.cultivationLevel" label="培养层次" label-width="120px">
        {{ newData.cultivationLevel }}
      </el-form-item>
      <el-form-item :required="newData.typeOfStu!=oldData.typeOfStu" label="学生类别" label-width="120px">
        {{ newData.typeOfStu }}
      </el-form-item>
      <el-form-item :required="newData.enrollmentquarter!=oldData.enrollmentquarter" label="招生季度" label-width="120px">
        {{ newData.enrollmentquarter }}
      </el-form-item>
      <el-form-item :required="newData.affiliationSchool!=oldData.affiliationSchool" label="所属学院" label-width="120px">
        {{ newData.affiliationSchool }}
      </el-form-item>
      <el-form-item :required="newData.admissionsMajor!=oldData.admissionsMajor" label="招生专业" label-width="120px">
        {{ newData.admissionsMajor }}
      </el-form-item>
      <el-form-item :required="newData.enrollmentYear!=oldData.enrollmentYear" label="招生年度" label-width="120px">
        {{ newData.enrollmentYear }}
      </el-form-item>
      <el-form-item :required="newData.office!=oldData.office" label="毕业学院" label-width="120px">
        {{ newData.office }}
      </el-form-item>
      <el-form-item :required="newData.graduatedMajor!=oldData.graduatedMajor" label="毕业专业" label-width="120px">
        {{ newData.graduatedMajor }}
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import fetch from "@/fetch/selfInfo";
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      oldData: null,
      newData: this.data.data,
      loading: true
    }
  },
  mounted() {
    fetch.getStuInfo(this.data.fromId).then(res => {
      this.oldData = res.data[0]
      this.loading = false
    })
  }
};
</script>

<style scoped>
.detail-wrap {
  margin-left: 20px;
  padding: 10px 10px 10px 10px;
  height: 100%;
}
</style>