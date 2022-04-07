<template>
  <div class="content-wrap">
    <div class="title">{{title || ''}}个人信息</div>
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane
        label="基本信息"
        name="baseInfo"
        v-loading="loading"
      >
        <baseInfo
          :userId="userId"
          @close-loading="closeLoading"
        ></baseInfo>
      </el-tab-pane>
      <el-tab-pane
        label="学籍信息"
        name="studentInfo"
        v-loading="loading"
      >
        <studentInfo
          :userId="userId"
          @close-loading="closeLoading"
        ></studentInfo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import studentInfo from "@/view/selfInfo/card_studentInfo";
import baseInfo from "@/view/selfInfo/card_baseInfo";
export default {
  props: {
    userId: {
      type: String,
      default: (JSON.parse(localStorage.getItem('userLogin')).id).toString()
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    studentInfo,
    baseInfo
  },
  data() {
    return {
      activeName: 'baseInfo',
      loading: true
    }
  },
  methods: {
    closeLoading() {
      this.loading = false
    }
    // handleClick() {
    //   this.loading = true
    // }
  },
  mounted() {

  }
}
</script>

<style scoped>
>>> .el-tabs {
  height: 100%;
}
>>> .el-tabs--top {
  height: 100%;
}
>>> .el-tabs__content{
  height: 94%;
}
>>> .el-tab-pane {
  height: 100%;
}
</style>
