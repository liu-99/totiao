<template>
  <el-container>
    <el-aside :width="isCollapse?'65px': '200px'">
      <el-menu
        background-color="#323745"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="1" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-submenu index="2" :style="{width:isCollapse?'65px': '200px'}">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="2-1">发布文章</el-menu-item>
          <el-menu-item index="2-2">文章列表</el-menu-item>
          <el-menu-item index="2-3">评论列表</el-menu-item>
          <el-menu-item index="2-4">素材管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="4" :style="{width:isCollapse?'65px': '200px'}">
          <i class="el-icon-location"></i>
          <span slot="title">账户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div id="lt">
          <i :class="isCollapse? 'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
        </div>
        <div id="rt">
          <el-input type="text" placeholder="请输入搜索的文章内容" style="width:240px;"></el-input>
          <span style="margin: 0 25px;">消息</span>
          <!-- <i slot="prefix" class="el-nput__icon el-icon-search"></i> -->

          <!-- <span style="margin:0 10px;"></span> -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <!-- {{name}} -->
              <img :src="photo" alt width="40" height="40" />
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    logout () {
      this.$confirm('确定要退出系统？', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.sessionStorage.clear()
        this.$router.push('/login')
      }).catch(() => { })
    }
  },
  computed: {
    name () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).name
    },
    photo () {
      return JSON.parse(window.sessionStorage.getItem('userinfo')).photo
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: #323745;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    padding: 0 9px 0 10px;
    min-width: 800px;
    #lt {
      height: 100%;
      width: 40%;
      background-color: #fff;
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    #rt {
      height: 100%;
      width: 50%;
      background-color: #fff;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
    }
  }
  .el-main {
    background-color: #f2f3f5;
  }
}
</style>
