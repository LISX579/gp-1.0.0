<template>
  <div class="description-wrap">
    <el-descriptions
      title="基本信息"
      :column="2"
    >
      <el-descriptions-item label="学号">{{data.id}}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{data.name ||'-'}}</el-descriptions-item>
      <el-descriptions-item label="曾用名">{{data.usedName||'-'}}</el-descriptions-item>
      <el-descriptions-item label="性别">{{data.sex||'-'}}</el-descriptions-item>
      <el-descriptions-item label="证件类型">{{data.idType||'-'}}</el-descriptions-item>
      <el-descriptions-item label="出生日期">{{dateFormat(data.dateOfBirth)||'-' }}</el-descriptions-item>
      <el-descriptions-item label="民族">{{data.nation||'-'}}</el-descriptions-item>
      <el-descriptions-item label="入学日期">{{dateFormat(data.dateOfAdmission)||'-'}}</el-descriptions-item>
      <el-descriptions-item label="生源地">{{data.PlaceOfOrigin||'-'}}</el-descriptions-item>
      <el-descriptions-item label="血型名称">{{data.bloodType||'-'}}</el-descriptions-item>
      <el-descriptions-item label="政治面貌">{{data.politicalOutlook||'-'}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import fetch from "@/fetch/selfInfo"
import util from "@/util/util"
export default {
  mixins: [util],
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: null,
      loading: true
    }
  },
  mounted() {
    fetch.getBaseInfo(this.userId).then(res => {
      this.data = res.data[0]
      this.$emit('close-loading')
    })
  }

}
</script>

<style>

</style>
