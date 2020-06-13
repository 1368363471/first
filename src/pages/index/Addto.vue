<template>
  <div class="main">

    <p>添加账号</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="user">
        <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="用户组" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择用户组">
          <el-option label="普通管理员" value="普通管理员"></el-option>
          <el-option label="超级管理员" value="超级管理员"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="clickAdd">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { API_Add } from "@/api/apis.js";
export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pass: "",
        region: ""
      },
      rules: {
        user: [{ validator: validatePass1, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    clickAdd() {
      // console.log(11);
      API_Add(
        this.ruleForm.user,
        this.ruleForm.pass,
        this.ruleForm.region
      ).then(res => {
        // console.log( this.ruleForm.user );
        // console.log( res );
        if (res.data.code == 0) {
          this.$message({
            message: "添加用户成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/index/acclist");
          }, 1000);
        } else {
          this.$message.error("添加用户失败，请稍后再试");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  background-color: #f1f1f1;
  padding: 5px;
  .el-header {
    padding: 0;
    height: 60px;
    background-color: #fff;
    padding-left: 20px;
    .el-breadcrumb {
      line-height: 60px;
      width: 100%;
      height: 60px;
      font-size: 20px;
    }
  }
  .el-form {
    padding-top: 20px;
  }
  p {
    font-size: 20px;
    padding: 10px;
    margin: 20px 10px 0 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  .demo-ruleForm {
    background-color: #fff;
    margin: 0 10px;
    padding-bottom: 40px;
  }
  .el-input,
  .el-select {
    width: 400px;
  }
}
</style>