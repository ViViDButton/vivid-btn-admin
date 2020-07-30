<template>
  <div style="overflow: hidden">
    <el-container direction="vertical"  style="height: 100vh; border: 1px solid #eee">
      <el-header>
        <span class="header">
          <i style="color: #FFFF00" class="el-icon-message-solid"></i>
          Vivid Button 管理平台
        </span>
        <span v-if="!in_login" style="float:right;">
          <span>欢迎您:</span>
          <span style="padding: 0 15px; color: #000000;">{{ display_name }}</span>
          <span>
            <el-button type="primary" size="small" @click="logout">退出登录</el-button>
          </span>
        </span>
      </el-header>
      <el-container>

        <el-aside style="background-color: red" width="200px">
          <el-menu
                  router
                  :collapse="false"
                  style="height: 100%"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#409EFF">
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/vtuber">
              <i class="el-icon-message-solid"></i>
              <span>Vtuber管理</span>
            </el-menu-item>
            <el-submenu index="/">
              <template slot="title">
                <i class="el-icon-circle-plus"></i>
                <span>按钮管理</span>
              </template>
              <el-menu-item index="/group">分组管理</el-menu-item>
              <el-menu-item index="/voice">声音管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/user">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <i class="el-icon-s-help"></i>
              <span slot="title">关于</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main style="padding: 10px; max-height: calc(100vh - 60px)">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {login_status, user_logout} from "./network";

  export default {
    mounted() {
      this.check_login()
    },
    watch: {
      $route(to, from) {
        this.check_login()
      }
    },
    data() {
      return {
        user: '',
        name: ''
      }
    },
    methods: {
      check_login() {
        if(this.$route.path !== '/login')
          login_status().then(resp => {
            if(resp.data.code !== 403) {
              this.user = resp.data.user
              this.name = resp.data.first_name + '  ' + resp.data.last_name
            }else {
              this.$router.push({
                path: '/login',
                query: {
                  next: this.$route.path
                }
              })
            }
          })
        else {
          login_status().then(resp => {
            if(resp.data.code !== 403)
              this.$router.push('/home')
          })
        }
      },
      logout() {
        user_logout().then(resp => {
          this.$message({
            message: '您已退出登录',
            type: 'success'
          });
          this.$router.push('/login')
        })
      }
    },
    computed: {
      in_login() {
        return this.$route.path === '/login'
      },
      display_name() {
        return this.name.trim() === ''?this.user:this.name
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .el-drawer__body {
    overflow-y: auto
  }

  .header {
    color: #303133;
    font-size: 22px;
  }
</style>
