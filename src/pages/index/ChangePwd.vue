<template>
  <div class="main">
    <p>修改密码</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldpass">
        <el-input type="text" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// API_Checkoldpwd  检测旧密码接口
// API_Editpwd  修改密码接口API_Editpwd   API_Editpwd新密码
import { API_Checkoldpwd, API_Editpwd } from "@/api/apis.js";
export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码"));
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        pass: "",
        checkPass: ""
        // id:''
      },
      rules: {
        oldpass: [{ validator: validatePass1, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      console.log("data:", localStorage.getItem("data"));
      console.log("id:", localStorage.id);
      // console.log("old:", JSON.stringify(this.ruleForm.oldpass));
      console.log("密码：", this.ruleForm.oldpass);

      if (
        JSON.stringify(this.ruleForm.oldpass) == localStorage.getItem("data")
      ) {
        API_Checkoldpwd(this.ruleForm.oldpass, localStorage.id).then(res => {
          console.log(res);

          res.data.oldpass = this.ruleForm.pass;
          this.id = res.data.id;
        });
      }else {
        this.$message('旧密码不正确')
        return
      }
      console.log( this.ruleForm.pass );
      
      // 修改密码
      API_Editpwd(this.ruleForm.pass,localStorage.id ).then(res => {
        if(res.data.code == 0){
           this.$message('修改成功');
           this.$router.push("/");
        }else{
           this.$message('修改失败');
        }
      });
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
  .el-input {
    width: 400px;
  }
}
</style>