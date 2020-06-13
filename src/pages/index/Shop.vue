<template>
  <div>
    <div class="shops_header">
      <el-button type="primary" size="small" @click="edit()">修改</el-button>
    </div>
    <div class="shops_details">
      <el-form ref="form" :model="shopsData" label-width="80px" size="medium">
        <el-form-item label="店铺名称">
          <el-input v-model="shopsData.name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="shopsData.bulletin" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" class="img">
          <el-upload
            class="avatar-uploader"
            :action="serverupload"
            :show-file-list="false"
            :on-success="avatarimgsuccess"
          >
            <img
              v-if="shopsData.avatar"
              :src="servershopimg + shopsData.avatar"
              width="150"
              class="avatar"
            >
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            :action="serverupload"
            list-type="picture-card"
            :file-list="fileList"
            :on-success="shopimgsuccess"
            :disabled="disabled"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="shopsData.deliveryPrice" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="送达时间">
          <el-input v-model="shopsData.deliveryTime" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="shopsData.description" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="shopsData.score" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="shopsData.sellCount" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="checkList" width="150px" :disabled="disabled">
            <el-checkbox v-for="(item,index) in supports" :key="index" :label="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="shopsData.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            :disabled="disabled"
            :default-time="['00:00:00', '23:59:59']"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="起送价格">
          <el-input v-model="shopsData.minPrice" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  API_SHOP_INFO,
  SERVER_UPLOAD,
  SERVER_SHOP_IMG,
  API_SHOP_EDIT
} from "@/api/apis";

export default {
  data() {
    return {
      imgUrl: "http://127.0.0.1:5000/upload/shop/",
      upImg: "",
      disabled: false,
      dialogVisible: false,
      fileList: [], //当前上传的图片数组
      checkList: [], //当前选中的复选框的值
      supports: [
        "单人精彩套餐",
        "VC无限橙果汁全场8折",
        "在线支付满28减5",
        "特价饮品8折抢购"
      ],
      shopsData: {}, //店铺信息
      pics: [], //上传图片成功后，新图片的名字
      serverupload: SERVER_UPLOAD, //服务器上传图片接口地址
      servershopimg: SERVER_SHOP_IMG //服务器获取商店图片地址
    };
  },
  created() {
    API_SHOP_INFO().then(res => {
      console.log("res:", res.data.data);
      this.fileList = res.data.data.pics.map(img => {
        return {
          url: this.servershopimg + img
        };
      });
      this.shopsData = res.data.data;
    });
  },
  methods: {
    //   店铺图片上传成功
    shopimgsuccess(res) {
      //拿到图片新的名字
      this.pics.push(res.imgUrl);
    },
    //   店铺头像上传成功
    avatarimgsuccess(res) {
      this.shopsData.avatar = res.imgUrl;
    },
    //点击修改
    edit() {
      //深拷贝 json 递归 展开运算符

      let newObj = { ...this.shopsData };
      newObj.supports = JSON.stringify(this.shopsData.supports);
      newObj.date = JSON.stringify(this.shopsData.date);
      newObj.pics = JSON.stringify(this.pics.concat(this.shopsData.pics)); //拼接新老图片！
      console.log("new11:", newObj.date);

      API_SHOP_EDIT(newObj).then(res => {
        console.log(res);
        this.$message({
          message: "恭喜你，这是一条成功消息",
          type: "success"
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>