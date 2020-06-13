<template>
  <div class="main">
    <p>商品列表</p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="prope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ prope.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ prope.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ prope.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片" prop="imgUrl">
              <img
                :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+prope.row.imgUrl"
                style="width:80px"
              >
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ prope.row.goodsDesc}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <template slot-scope="prop">
          <!-- span{{ prop.row.imgUrl }} -->
          <img
            :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+prop.row.imgUrl"
            style="width:100px"
          >
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10]"
        :page-size="sizerow"
        layout="total,sizes,prev, pager, next, jumper"
        :total="totalall"
      ></el-pagination>
    </div>
    <!-- 点击编辑弹出模态框 -->
    <el-dialog title="修改商品" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="newtableDate" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="newtableDate.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-input v-model="newtableDate.category"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="newtableDate.price"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="newtableDate.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-image style="width:100px;height:100px" :src="'http://127.0.0.1:5000/upload/imgs/goods_img'+img"></el-image>
        </el-form-item>
        <el-form-item label="商品id">
          <el-input v-model="newtableDate.id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="reviseBtn">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
// 商品列表                                 修改商品
import { API_GOODS_LIST, API_GOODS_DEL, API_GOODS_EDIT } from "@/api/apis";
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [], //用户列表
      page: 1, //当前页码（显示页数）
      sizerow: 3, //每页条数
      totalall: 0,
      dialogVisible: false, //显示与隐藏编辑模态框
      newtableDate: [],
      img: ""
    };
  },
  methods: {
    resTable(page) {
      API_GOODS_LIST(page, this.sizerow).then(res => {
        this.tableData = res.data.data; //数组
        this.totalall = res.data.total; //数组中的总条数
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.sizerow = val;
      this.resTable(this.currentPage);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.resTable(val);
    },
    // 删除商品
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_GOODS_DEL(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.resTable(this.currentPage);
          }
        });
      });
    },
    // 编辑
    handleEdit(row) {
      console.log("值：", row);
      this.dialogVisible = true;
      this.newtableDate = row;      
      // console.log("http://127.0.0.1:5000/upload/imgs/goods_img" + row.imgUrl);
      this.img = this.newtableDate.imgUrl;
    },
    // 确认修改
    reviseBtn() {
      //name,category,price,inmUrl,goodsDesc,id
      API_GOODS_EDIT(
        this.newtableDate.name,
        this.newtableDate.category,
        this.newtableDate.price,
        this.newtableDate.imgUrl,
        this.newtableDate.goodsDesc,
        this.newtableDate.id
      ).then(res => {
        if (res.data.code == 0) {
          this.dialogVisible = false;
          
        }
      });
    },
    // 关闭
    handleClose(done) {
      this.$confirm("确认关闭？");
      // .then( => {
      //   done();
      // })
      // .catch(_ => {});
      console.log(done);
    }
  },
  created() {
    // console.log(this.page, this.sizerow);
    this.resTable(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
.input_newdata {
  width: 200px;
  height: 30px;
  font-size: 18px;
}
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
    margin: 20px 0px 0 0px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  .el-button--default {
    background-color: #409eff;
    color: #fff;
  }
}
</style>