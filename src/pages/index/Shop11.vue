<template>
  <el-container>
    <div class="main">
      <!-- 头部 -->
      <div class="btn_div">
        <span>店铺管理</span>
        <el-button type="primary" @click="reviseBtn" v-if="revise">修改</el-button>
        <el-button type="success" @click="successBtn" v-else>保存</el-button>
      </div>
      <!-- 描述 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="form.bulletin" cols="4" rows="10"></el-input>
        </el-form-item>
        <!-- 店铺头像 -->
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            :action="serverupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.avatar" :src="servershopimg + form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 店铺图片 -->
        <el-form-item label="店铺图片">
          <el-upload
            class="avatar-uploader"
            :action="serverupload"
            :file-list="fileList"
            :on-success="shopAvatarSuccess"
            :on-remove="handleRemove"
          >
            <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>

        <el-form-item label="起送价格">
          <el-input v-model="form.minPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="form.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="form.sellCount"></el-input>
        </el-form-item>

        <el-form-item label="活动" prop="type">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="item in supports" :key="item" :label="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="form.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
// 获取店铺详情       上传图片,API_SHOP_UPLOAD
import {
  API_SHOP_INFO,
  API_SHOP_EDIT,
  SERVER_SHOP_IMG,
  SERVER_UPLOAD
} from "@/api/apis";

export default {
  data() {
    return {
      form: {},
        name: "",
        region: "",
        delivery: false,
        type: [],
        resource: "",
        bulletin: "",
        deliveryPrice: 0,
        score: "",
        sellCount: "",
        description: "",
        avatar: "",
        minPrice: "",
        dialogImageUrl: "",
        value1: [new Date(2020, 9, 10, 8, 40), new Date(2020, 9, 10, 9, 40)],
        value2: [new Date(2020, 9, 10, 8, 40), new Date(2020, 9, 10, 9, 40)],
      
      imgUrl: "http://127.0.0.1:5000/upload/shop/",
      ruleForm: {
        type: []
      },
      fileList: [],
      revise: true,
      supports: [
        "单人精彩套餐",
        "VC无限橙果汁全场8折",
        "在线支付满28减5",
        "特价饮品8折抢购"
      ],
      checkList: [],
      pics: [], //图片上传成功后，新图片的名字
      servershopimg: SERVER_SHOP_IMG, //服务器获取商店图片地址
      serverupload: SERVER_UPLOAD //服务器上传图片接口地址
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 上传头像成功
    handleAvatarSuccess(res) {
      // 拿到新的图片名字
      this.form.avatar = res.imgUrl;
      this.$message({
        message: "图片上传成功",
        type: "success"
      });
    },
    // 店铺图片
    shopAvatarSuccess(res) {
      console.log(res);
      this.pics.push(res.imgUrl);
    },
    //点击修改
    reviseBtn() {
      this.revise = false;
    },
    // 点击保存
    successBtn() {
      //结构数据
      let newObj = { ...this.form };
      newObj.supports = JSON.stringify(this.checkList);
      newObj.date = JSON.stringify(this.form.date);
      newObj.pics = JSON.stringify(this.pics.concat(this.form.pics)); //拼接新老图片！
      console.log("newobj:", newObj);
      this.revise = true;
      API_SHOP_EDIT(newObj).then(res => {
        console.log("res", res);
      });
    },
    handleRemove() {}
  },
  // 生命周期开始进入页面
  created() {
    API_SHOP_INFO().then(res => {
      console.log("res:", res);
      this.form = res.data.data;
      this.fileList = res.data.data.pics.map(img => {
        return { url: this.servershopimg + img };
      });
      // console.log("图片名：", this.form.avatar);
    });
  }
};
</script>

<style lang="less" scoped>
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
}
img {
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 140px;
}
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
  .btn_div {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 5px 10px;
    margin-top: 10px;
    background-color: #fff;
    span {
      padding-top: 10px;
    }
  }
  .el-form {
    background-color: #fff;
    // width: 600px;
  }
  .demo-image {
    display: flex;
    .el-image {
      margin: 0 5px;
    }
  }
  .upload-demo {
    width: 200px;
  }
  .el-input,
  .el-textarea {
    width: 300px !important;
  }
}
</style>