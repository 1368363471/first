<template>
  <el-container>
    <el-header>
      <div class="header_left">
        <span>云网吧运维系统</span>
        <span class="icon">
          <i class="el-icon-refresh"></i>
          F5刷新
        </span>
      </div>
      <div class="header_right">
        <span>
          <img src="../assets/imgs/header.jpg" alt>
          admin
        </span>
        <span class="header_right_icon">
          <i class="el-icon-s-comment"></i>
          消息
        </span>
        <span class="header_right_icon">
          <i class="el-icon-warning"></i>
          退出
        </span>
      </div>
    </el-header>
    <el-container>
      <!-- 左边树菜单 -->
      <el-aside width="270px">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右边主要区域 -->
      <el-main>
        <!-- 数据显示 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      list:[{
          index:'/index/home'
      }]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
*{
    padding: 0;
    margin: 0;
}
.el-container{
    width: 100%;
}
// 左边
.el-header {
    padding: 0 10px;
  border: 1px solid #000;
  display: flex;
  height: 40px !important;
  justify-content: space-between;
  align-items: center;
  .header_left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 330px;
    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      i {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .header_right {
    display: flex;
    width: 165px;
    span {
      display: flex;
      align-items: center;
      padding-left: 10px;
      img {
        width: 30px;
        border-radius: 15px;
        padding-right: 5px;
      }
    }
    .header_right_icon{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        i{
            font-size: 16px;
        }
    }
  }
}
// 右边
.el-aside,
.el-main {
  border: 1px solid #000;
}
.el-main{
      background-color: #ccc;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>