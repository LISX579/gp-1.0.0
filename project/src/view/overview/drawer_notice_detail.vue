<template>
  <div class="detail-wrap">
    <div class="form-wrap">
      <el-form label-position="left" ref="form">
        <el-form-item label="标题" label-width="150px">
          <span>{{data.title}}</span>
        </el-form-item>
        <el-form-item label="教工号" label-width="150px">
          <span>{{data.id}}</span>
        </el-form-item>
        <el-form-item label="姓名" label-width="150px">
          <span>{{data.tName}}</span>
        </el-form-item>
        <el-form-item label="时间" label-width="150px">
          <span>{{this.formatDateTime(data.time)}}</span>
        </el-form-item>
        <el-form-item label="公告内容" label-width="150px">
          <span>{{data.content}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  mixins:[util],
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  mounted() {
    console.log('drawer',this.data);
  }
};
</script>

<style scoped>
.detail-wrap {
  padding: 10px 10px 10px 10px;
}
.cardPeo {
  padding-top: 10px;
  height: 100%;
  width: 100%;
  padding-bottom: 10px;
}
.headImg {
  display: flex;
  float: left;
}
.selfText {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 280px;
}
.form-wrap {
  margin-left: 20px;
}
</style>