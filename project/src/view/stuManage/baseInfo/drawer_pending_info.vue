<template>
  <div class="detail-wrap" v-loading="loading">
    <el-form ref="form" v-model="formData" label-position="left" v-if="oldData">
      <el-form-item label="学生学号" label-width="150px" >
        <span>{{ data.fromId }}</span>
      </el-form-item>
      <el-form-item label="姓名" label-width="150px">
        <span>{{ data.name }}</span>
      </el-form-item>
      <el-form-item label="身份证号" label-width="150px" :required="oldData.idNumber!=data.data.idNumber">
        <span>{{ data.data.idNumber }}</span>
      </el-form-item>
      <el-form-item label="民族" label-width="150px" :required="oldData.nation!=data.data.nation">
        <span>{{ data.data.nation }}</span>
      </el-form-item>
      <el-form-item label="国籍" label-width="150px" :required="oldData.nationality!=data.data.nationality">
        <span>{{ data.data.nationality }}</span>
      </el-form-item>
      <el-form-item label="生源地" label-width="150px" :required="oldData.PlaceOfOrigin!=data.data.PlaceOfOrigin">
        <span>{{ data.data.PlaceOfOrigin }}</span>
      </el-form-item>
      <el-form-item label="性别" label-width="150px" :required="oldData.sex!=data.data.sex">
        <span>{{ data.data.sex }}</span>
      </el-form-item>
      <el-form-item label="地址" label-width="150px" :required="oldData.registeredResidence!=data.data.registeredResidence">
        <span>{{ data.data.registeredResidence }}</span>
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
      loading: true,
      formData: {}
    }
  },
  created() {

  },
  mounted() {
    fetch.getBaseInfo(this.data.fromId).then(res => {
      this.oldData = res.data[0]
      this.loading = false
    })
  }
};
</script>

<style scoped>
.detail-wrap {
  padding: 10px 10px 10px 10px;
  height: 100%;
  margin-left: 20px;
}
</style>