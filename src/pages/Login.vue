<template>
  <div id="main">
    <!-- 登录窗口 -->
    <h2>LOGO</h2>
    <h2>
      云网吧运维系统
      <span>v.1.0.0</span>
    </h2>
    <div class="login_box">
      <div class="login_user_box">
        <input class="login_user_box" v-model="user" type="text" placeholder="请输入用户名">
        <img class="iconimg" :src="iconimg" alt="">
      </div>
      <div class="login_pwd_box">
        <input class="login_user_box" v-model="pwd" type="password" placeholder="请输入密码">
      </div>
      <div class="login_pwd">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <span>忘记密码？</span>
      </div>
      <el-button type="success" round style="width:404px" @click="LoginBtn">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      user:'',
      pwd:'',
      iconimg:'../assets/imgs/icon_error.png'
    };
  },
  methods:{
      LoginBtn(){
        this.$router.push("/index");
      }
  }
};
</script>

<style lang="less" scoped>
#user {
  background-color: #000;
}
#main {
  background-color: rgb(60, 66, 87);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    color: #fff;
    span {
      color: #ccc;
      font-size: 14px;
    }
  }
  .login_box {
    width: 500px;
    height: 344px;
    border-radius: 8px;
    background-color: rgb(66, 72, 92);
    box-shadow: rgb(40, 43, 55) 0px 0px 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    .login_user_box{
        .iconimg{
            width: 20px;height: 20px;
        }
    }
    input {
      width: 400px;
      height: 50px;
      outline: none;
      border: none;
      margin-top: 10px;
      border-bottom: 1px solid yellowgreen;
      background-color: rgb(66, 72, 92);
      font-size: 16px;
      color: #ccc;
    }
    .login_pwd {
      display: flex;
      justify-content: space-between;
      width: 404px;
      margin-top: 10px;
      color: #fff;
      .el-checkbox {
        color: #fff;
      }
    }
    .el-button {
      margin-top: 10px;
    }
  }
}
</style>
