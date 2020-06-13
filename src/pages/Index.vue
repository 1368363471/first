<template>
  <el-container>
    <el-aside width="260px">
      <!-- 左边树菜单 -->
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <div v-for="item in newlist" :key="item.index">
          <!-- 可展开 二级 -->
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.icls"></i>
              <span>{{ item.title }}</span>
            </template>
            <!-- 二级儿子 -->
            <el-menu-item v-for="child in item.children" :key="child.item" :index="child.index">
              <i :class="child.icls"></i>
              <span slot="title">{{ child.title }}</span>
            </el-menu-item>
          </el-submenu>
          <!-- 一级选项卡 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.icls"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <!-- 右边 -->
    <el-container>
      <el-header height="56px">
        <div class="nav_div">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="acc_div">
            <span v-html="username" @click="personalBtn"></span>
            <img style="height: 56px;width:56px" :src="headImg" class="img">
          </div>
        </div>
        <!-- 头像 -->
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import { API_CHECK_TOKEN, API_GET_PERSONAL } from "@/api/apis.js";
export default {
  data() {
    return {
      list: [
        {
          index: "/index/home",
          icls: "el-icon-s-home",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/index/order",
          icls: "el-icon-tickets",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "sale",
          icls: "el-icon-s-order",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            {
              index: "/index/shoplist",
              icls: "el-icon-menu",
              title: "商品列表"
            },
            {
              index: "/index/shopadd",
              icls: "el-icon-menu",
              title: "商品添加"
            },
            {
              index: "/index/shopsort",
              icls: "el-icon-menu",
              title: "商品分类"
            }
          ]
        },
        {
          index: "/index/shop",
          icls: "el-icon-menu",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        {
          index: "sale3",
          icls: "el-icon-picture-outline-round",
          title: "账号管理",
          role: ["super"],
          children: [
            {
              index: "/index/acclist",
              icls: "el-icon-menu",
              title: "账号列表"
            },
            {
              index: "/index/addto",
              icls: "el-icon-menu",
              title: "添加账号"
            },
            {
              index: "/index/changepwd",
              icls: "el-icon-menu",
              title: "修改密码"
            }
          ]
        },
        {
          index: "sale2",
          icls: "el-icon-document-copy",
          title: "销售管理",
          role: ["super"],
          children: [
            {
              index: "/index/shopsta",
              icls: "el-icon-menu",
              title: "商品统计"
            },
            {
              index: "/index/ordersta",
              icls: "el-icon-menu",
              title: "订单统计"
            }
          ]
        }
      ],
      role: "",
      //面包屑数组
      breadlist: ["后台首页"],
      //默认选中
      defaultActive: "",
      username: "亲，请登录",
      headImg: ""
    };
  },
  // 计算属性
  computed: {
    newlist() {
      return this.list.filter(i => i.role.includes(this.role));
    }
  },
  methods: {
    // 根据hash值变化切换面包屑
    changeBreadlist(hash) {
      let arr = [];
      //根据hash值，改变面包屑数组
      switch (hash) {
        case "/index/home":
          arr = ["后台首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/shop":
          arr = ["店铺管理"];
          break;

        case "/index/addto":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/changepwd":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/acctlist":
          arr = ["账号管理", "账号列表"];

          break;
        case "/index/shoplist":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/shopadd":
          arr = ["商品管理", "添加商品"];
          break;
        case "/index/shopsort":
          arr = ["商品管理", "商品分类"];
          break;

        case "/index/shopsta":
          arr = ["销售管理", "商品统计"];
          break;
        case "/index/ordersta":
          arr = ["商品管理", "订单统计"];
          break;
        case "/index/personal":
          arr = ["个人中心"];
          break;
      }

      this.breadlist = arr;
    },
    personalBtn() {
      this.$router.push("/index/personal");
    }
  },
  // 检测某个数据(hash)的变化
  watch: {
    //监听路由对象的变化
    $route: {
      handler: val => {
        // 在这里this指向不正确，所以需要提前把this挂载到window上
        // 在这里取出this,调用对应的切换面包屑函数
        window._indexthis.changeBreadlist(val.path);
        // console.log("val:", val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    let hash = this.$route.path;
    this.role = localStorage.role;
    // console.log(this.role);
    // console.log(this.$router)  --> main.js里的router对象实例（最大的vuerouter实例）
    //根据hash值改变左侧树菜单默认选中
    this.defaultActive = hash;
    //改变面包屑数组
    this.changeBreadlist(hash);

    //保存这个this
    window._indexthis = this;
    // console.log("token:", localStorage.token);
    // console.log("user:", localStorage.user);

    //发送请求验证token是否过期
    API_CHECK_TOKEN(localStorage.token).then(res => {
      if (res.data.code == 0) {
        //还在登录状态
        this.username = localStorage.user;
      } else {
        //登录失效
        this.username = "<a href='#/'>亲，请登录</a>";
      }
    });
    //获取用户信息获取当前用户信息头像 API_GET_PERSONAL
    API_GET_PERSONAL(localStorage.id).then(res => {
      console.log("图片地址：", res.data.accountInfo.imgUrl);

      this.headImg = res.data.accountInfo.imgUrl;
    });
  },

};
</script>

<style lang="less" scoped>
@base: #2d3a4b;
@base2: #f0f2f5; //灰色
.el-container {
  height: 100%;

  .el-aside {
    background-color: @base;

    .el-menu {
      border-right: 0;
    }
  }
  .el-main {
    background-color: @base2;
  }
}
.el-breadcrumb {
  font-size: 20px;
  line-height: 56px;
}

.nav_div {
  display: flex;
  justify-content: space-between;
  span {
    font-size: 20px;
  }
}
.acc_div{ width: 120px;
      .img{
        border-radius: 50%;
      }
  }
</style>