<template>
  <div class="login_div">
    <div class="inout_div">
      <h1>再来一碗</h1>
      <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="user"></el-input>
      <el-input
        placeholder="请输入密码"
        prefix-icon="el-icon-goods"
        v-model="pwd"
        class="pwd_input"
        type="password"
      ></el-input>
      <el-button @click="clickBtn" type="primary" class="btn">登录</el-button>
    </div>
  </div>
</template>

<script>
// 引入
import { API_Login } from "@/api/apis.js";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      user: "",
      pwd: "",
      id: "",
      isreg: true
    };
  },
  methods: {
    clickBtn() {
      // console.log(111);
      // 防抖节流
      if (this.isreg == false) return;
      this.isreg = false;
      API_Login(this.user, this.pwd).then(res => {
        if (res.data.code == 0) {
          localStorage.setItem("data", JSON.stringify(this.user));
          localStorage.id = res.data.id;
          this.$message({
            message: "登录成功",
            type: "success"
          });
          // 登录后把 token，账号写入浏览器中
          localStorage.token = res.data.token;
          localStorage.user = this.user;
          // 登录把权限保存在本地存储中
          localStorage.role = res.data.role;
          this.$router.push("/index/home");
        } else {
          this.$message.error("登录失败，用户名或密码错误");
        }
        // console.log( this.user,this.pwd );

        console.log(res);
        // this.$router.push("./index/home");
      });
      setTimeout(() => {
        this.isreg = true;
      }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
@base: #2d3a4b;
.login_div {
  background: url('../assets/imgs/123.jpg') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  // background-color: @base;
  display: flex;
  justify-content: center;
  align-items: center;

  .inout_div {
    width: 360px;
    position: relative;
    padding: 20px;
    // border: 1px solid #000;
    background-color: rgba(15, 2, 2, 0.7);
    border-radius: 10px;

    h1 {
      text-align: center;
      font-size: 30px;
      margin-bottom: 20px;
      color: #fafafa;
    }
    .btn {
      width: 100%;
      margin-top: 14px;
    }
    .pwd_input {
      margin: 10px 0;
    }
  }
}
</style>