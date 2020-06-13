<template>
  <el-container>
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:5000/users/avatar_upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :data="data"
    >
      <h2>上传头像</h2>
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 管理员信息 -->
    <div class="user_div">
      <p class="one_p">管理员信息</p>
      <p>
        <span>管理员id：</span>
        <span>{{ id }}</span>
      </p>
      <p>
        <span>账号：</span>
        <span>{{ account }}</span>
      </p>
      <p>
        <span>用户组：</span>
        <span>{{ userGroup }}</span>
      </p>
      <p>
        <span>创建时间：</span>
        <span>{{ ctime }}</span>
      </p>
      <p>
        <span>管理员头像：</span>
        <img style="width: 100px" :src="headImg">
      </p>
    </div>
  </el-container>
</template>

<script>
// 个人信息
import { API_GET_PERSONAL } from "@/api/apis";
export default {
  data() {
    return {
      username: "请登录",
      imageUrl: "",
      data: { id: localStorage.id },
      headImg: "",
      id: 0,
      ctime: "",
      imgUrl: "",
      userGroup: "",
      account: ""
    };
  },
  created() {
    API_GET_PERSONAL(localStorage.id).then(res => {
      this.id = res.data.accountInfo.id;
      this.ctime = res.data.accountInfo.ctime;
      this.imgUrl = res.data.accountInfo.imgUrl;
      this.userGroup = res.data.accountInfo.userGroup;
      this.account = res.data.accountInfo.account;
      this.headImg = res.data.accountInfo.imgUrl;
      // console.log( this.id );
    });
  },
  methods: {
    handleAvatarSuccess() {
      window.location.reload(); //刷新页面 ==  F5
      // document.getE().src = URL.createObjectURL(file.raw)
      // this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log()
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.el-header {
  padding: 0;
  height: 50px;
  background-color: #fff;
  padding-left: 20px;
  .el-breadcrumb {
    line-height: 50px;
    width: 100%;
    height: 50px;
    font-size: 20px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px solid #000;
}
p {
  font-size: 20px;
  margin: 5px 0;
  border-bottom: 1px solid #fff;
  span:nth-child(1) {
    width: 120px;
    display: inline-block;
  }
}
.one_p {
  text-align: center;
}
h2{
  font-size: 20px;
}
div.user_div{
  margin-left: 30px;
  border: 1px solid #fff;
}
</style>