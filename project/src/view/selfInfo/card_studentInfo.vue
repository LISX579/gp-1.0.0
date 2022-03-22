<template>
  <div class="description-wrap">
    <el-descriptions
      title="学籍信息"
      :column="2"
    >
      <el-descriptions-item label="年级">{{ data.schoolYear || '-' }}</el-descriptions-item>
      <el-descriptions-item label="学院名称">{{ data.collegeName || '-'}}</el-descriptions-item>
      <el-descriptions-item label="系名称">{{ data.departmentName || '-'}}</el-descriptions-item>
      <el-descriptions-item label="专业方向">{{ data.professionalDirection || '-'}}</el-descriptions-item>
      <el-descriptions-item label="专业名称">{{ data.major || '-'}}</el-descriptions-item>
      <el-descriptions-item label="班级名称">{{ data.className|| '-'}}</el-descriptions-item>
      <el-descriptions-item label="学制">{{ data.trainingMode|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="学籍状态">{{ data.studentStatus|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="职务">{{ data.office || '-'}}</el-descriptions-item>
      <el-descriptions-item label="是否在校">{{ data.inScholl || '-'}}</el-descriptions-item>
      <el-descriptions-item label="报到注册状态">{{ data.registStatus|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="报到注册备注">{{ data.registRemark|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="报到时间">{{ data.checkinTime || '-'}}</el-descriptions-item>
      <el-descriptions-item label="学历层次">{{ data.cultivationLevel || '-'}}</el-descriptions-item>
      <el-descriptions-item label="培养方式">{{ data.cultureMethod || '-'}}</el-descriptions-item>
      <el-descriptions-item label="培养层次">{{ data.cultivationLevel|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="学生类别">{{ data.typeOfStu || '-'}}</el-descriptions-item>
      <el-descriptions-item label="招生季度">{{ data.enrollmentquarter|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="所属学院">{{ data.affiliationSchool|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="招生专业">{{ data.admissionsMajor|| '-' }}</el-descriptions-item>
      <el-descriptions-item label="招生年度">{{ data.enrollmentYear || '-'}}</el-descriptions-item>
      <el-descriptions-item label="毕业学院">{{ data.graduatedFrom || '-'}}</el-descriptions-item>
      <el-descriptions-item label="毕业专业">{{ data.graduatedMajor || '-'}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import fetch from "@/fetch/selfInfo"
// import util from "@/util/util"

export default {
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: null
    }
  },
  methods: {},
  mounted() {
    fetch.getStuInfo(this.userId).then(res => {
      this.data = res.data[0]
      console.log(this.data)
      this.$emit('close-loading')
    })
  }
}
</script>

<style scoped>

</style>
