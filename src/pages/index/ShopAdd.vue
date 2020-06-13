<template>
  <div class="main">
    <!-- 商品添加 -->
    <p>
      <span>商品添加</span>
    </p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="categoriesall.cateName" placeholder="请选择分类">
          <el-option
            v-for="item in categoriesall"
            :key="item.index"
            :label="item.cateName"
            :value="item.cateName"
          >{{ item.cateName }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="1000" label="描述文字"></el-input-number>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" v-if="dialogImageUrl">
        </el-dialog>
      </el-form-item>

      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="addcate">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//                查询所有分类    添加商品
import { API_GOODS_CATEGORIES,API_GOODS_ADD } from "@/api/apis";
export default {
  data() {
    return {
      form: {},
      name: "",//商品名称
      desc: "",
      region: "",
      categories:'',//
      goodsDesc:'',//描述
      num: 0,//价格
      dialogImageUrl: "",
      imgUrl:'',
      dialogVisible: false,
      categoriesall:[]//分类
    };
  },
  methods: {
    handleChange(value) {
      console.log("商品价格:", value);
    },
    handleRemove(file, fileList) {
      console.log("文件：", file, fileList);
      console.log( fileList );
      
    },
    
    handlePictureCardPreview(file) {
      console.log( file );
      this.dialogImageUrl = file.url
      console.log( "土浦安：",file.url );
      
      this.dialogVisible = true;
    },
    handleSuccess(file, fileList){
      console.log( fileList );
      console.log( "图片名字：",file.imgUrl );
      this.imgUrl = file.imgUrl
    }
    ,
    addcate() {
      // console.log( "图片：",this.img);
      
      // (name,category,price,imgUrl,goodsDesc)
      API_GOODS_ADD(this.form.name,this.categoriesall.cateName,this.num,this.imgUrl,this.form.desc).then(res=>{
        // console.log( res );
        if( res.data.code == 0 ){
          //弹框成功 
          this.$message({
            message: "添加成功",
            type: "success"
          });
          // 页面刷新
          // window.location.reload();//F5

        }else{
          //弹框失败
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      })
    }
  },
  created() {
    API_GOODS_CATEGORIES().then(res => {
      this.categoriesall = res.data.categories;
      console.log("数组？",this.categories);
    });
    
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  background-color: #f1f1f1;
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
  p {
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
  }
  .el-input {
    width: 400px;
  }
  .el-textarea {
    width: 400px;
  }
}
</style>