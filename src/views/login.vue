<template>
  <div class="home">
      <el-card class="login-card">
        <div slot="header">登录到VBS管理平台</div>
        <div>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="管理员账户">
              <el-input v-model="form.user"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码">
              <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
          <div>
          </div>
        </div>
      </el-card>
  </div>
</template>

<script>
  import {user_login} from "../network";

  export default {
  name: 'Home',
  data() {
    return {
      form: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      let formData = new FormData()
      formData.append('username', this.form.user)
      formData.append('pwd', this.form.password)

      console.log(formData)
      user_login(formData).then(resp => {
        if(!this.$route.query.next)
          this.$router.push('/home')
        else
          this.$router.push(this.$route.query.next)
      }).catch(() => {
        this.$message.error('登录失败')
      })
    }
  },
  mounted() {
  }
  }
</script>

<style scoped>
  .login-card {
    width: 80%;
    margin: 0 auto;
  }
</style>