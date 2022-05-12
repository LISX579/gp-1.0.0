<template>
  <div class="detail-wrap">
    <div class="cardPeo">
      <el-avatar v-if="data.sex=='男'" size="large" class="headImg" :src="require('@/assets/img/boy.jpg')"></el-avatar>
      <el-avatar v-if="data.sex=='女'" size="large" class="headImg" :src="require('@/assets/img/girl.jpg')"></el-avatar>
      &emsp;{{data.username}}({{data.fromID}})<br>
    </div>
    <div class="form-wrap">
      <el-form ref="form" label-position="left">
        <el-form-item label="用户名" label-width="150px">
          <span>{{data.username}}</span>
        </el-form-item>
        <el-form-item label="用户ID" label-width="150px">
          <span>{{data.fromID}}</span>
        </el-form-item>
        <el-form-item label="个性签名" label-width="150px">
          <span>{{data.text}}</span>
        </el-form-item>
        <el-form-item label="对方留言" label-width="150px">
          <span>{{data.checkInfo}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
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
</style>