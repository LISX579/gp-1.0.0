<template>
    <div class="con" v-loading="loading">
      <el-form
          v-model="formData"
          label-width="80px">
        <el-form-item label="账户" required>
          <el-input v-model="formData.id"></el-input>
        </el-form-item>
        <el-form-item v-if="register" label="姓名" required>
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="formData.password" show-password></el-input>
        </el-form-item>
        <el-button @click="confirm">{{register ? '注册' : '登录'}}</el-button>
      </el-form>
    </div>
</template>

<script>
import fetch from '../../fetch/login'

export default {
  props: {
    register: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {},
      loading: false
    }
  },
  methods: {
    confirm () {
      this.loading = true
      if (this.register) {
        fetch.register(this.formData).then(res => {
          this.loading = false
          if (res.registerCheck === 'success') {
            this.$notify({
              title: '注册',
              type: 'success',
              message: '注册成功，自动以该账户登录...'
            })
            // this.$socket.connect()
            this.$router.push({name: 'graduation'})
            localStorage.setItem('userLogin', JSON.stringify(this.formData))
          } else {
            this.$notify.error({
              title: '注册',
              message: '您输入的账户已被注册'
            })
          }
        })
      } else {
        this.loading = false
        fetch.login(this.formData).then(res => {
          if (res.loginCheck === 'success') {
            this.$router.push({name: 'overview'})
            this.$notify({
              title: '登录',
              type: 'success',
              message: '登录成功！'
            })
            // this.$socket.connect()
          } else if(res.loginCheck === 'fail') {
            this.loginError = true
            this.$notify.error({
              title: '登录',
              message: '您的账户或者密码输入有误！'
            })
          } else if(res.loginCheck === 'repeat') {
            this.$notify.error({
              title: '登录',
              message: '您输入的账户已经登录！'
            })
          }
        })
        localStorage.setItem('userLogin', JSON.stringify(this.formData))
      }
    }
  },
  mounted() {
    console.log('session:' + JSON.parse(localStorage.getItem('userLogin')))
    if(JSON.parse(localStorage.getItem('userLogin'))) {
      this.$router.push({name: 'graduation'})
    }
  }
}
</script>

<style scoped>
.con {
  background: aqua;
  margin: 0 auto;
  width: 302px;
  padding: 32px 40px 28px 40px;
}

</style>
