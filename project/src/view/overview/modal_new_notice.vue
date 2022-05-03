<template>
  <div>
    <div class="drawer-wrap">
      <el-form label-position="left" v-model="formData">
        <el-form-item label="工号" label-width="120px">
          <span> {{ myData.id }}</span>
        </el-form-item>
        <el-form-item label="发布人" label-width="120px">
          <span>{{ myData.username }}</span>
        </el-form-item>
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容" label-width="120px">
          <el-input
            type="textarea"
            v-model="content"
            :row="10"
            show-word-limit
            :autosize="{ minRows: 6, maxRows: 15}"
            placeholder="请输入发布公告内容"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="permission" label="权限" label-width="120px">
          <el-radio-group v-model="permission">
            <el-radio label="all">全部可见</el-radio>
            <el-radio label="self">仅学生可见</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      myData: JSON.parse(localStorage.getItem('userLogin')),
      permission: 'all',
      content: '',
      title: ''
    };
  },
  methods: {
    confirm () {
      const postData = {
        id: this.myData.id,
        time: new Date(),
        name: this.myData.username,
        title: this.title,
        content: this.content,
        permission: this.permission
      }
      this.$socket.emit('newNotice', postData)
      this.close()
    },
    close () {
      this.$emit('close')
    }
  }
};
</script>

<style scoped>
.drawer-wrap {
  margin-left: 20px;
}

.footer {
  text-align: right;
}
</style>