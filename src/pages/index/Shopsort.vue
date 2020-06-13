<template>
  <div class="main">
    <p>
      商品分类
      <el-button type="primary" @click="clickaddshop()">添加分类</el-button>
    </p>
    <!-- 添加商品弹出框 -->
    <el-dialog title="商品分类" :visible.sync="dialogTableVisible">
      <el-table :data="tableData" action="http://127.0.0.1:5000/goods/categories">
        <el-table-column property="cateName" label="分类名称" width="150"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 商品列表 -->
    <el-table :data="tableData" style="width:100%">
      <el-table-column label="序号" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分类名称" width="300px">
        <template slot-scope="{row,$index}">
          <el-input v-model="row.cateName" v-if="showEdit[$index]"></el-input>
          <span v-else>{{ row.cateName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否启用" width="100px">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index,scope.row)"
            v-if="!showEdit[scope.$index]"
          >编辑</el-button>
          <el-button size="mini" type="success" @click="edited(scope.$index,scope.row)" v-else>完成</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
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
        layout="total, sizes ,prev, pager, next, jumper"
        :total="totalall"
      ></el-pagination>
    </div>

    <!-- 添加商品  弹框 -->
    <el-dialog title="添加商品" :visible.sync="editDialogVisible" width="60%">
      <el-form ref="edituserBtn" :data="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cateName"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="addclick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  API_GOODS_CATELIST,
  API_GOODS_DELCATE,
  API_GOODS_EDITCATE,
  API_GOODS_ADDCATE
} from "@/api/apis";
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [], //用户列表
      page: 1, //当前页码（显示页数）
      sizerow: 3, //每页条数
      totalall: 0,
      editDialogVisible: false,
      cateName: "",
      dialogTableVisible: false,
      form: {
        name: "",
        desc: "",
        region: "",
        delivery: false
      },
      showEdit: []
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      // console.log( "set:",row );
    },
    handleCurrentChange(val) {
      // this.sizerow = val;
      this.resTable(val);
      // console.log(`当前页: ${val}`);
    },
    //
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.sizerow = val;
      this.resTable(this.currentPage);
    },
    //获取列表
    resTable(page) {
      API_GOODS_CATELIST(page, this.sizerow).then(res => {
        // console.log("总数组：", res.data);
        this.tableData = res.data.data; //数组
        this.totalall = res.data.total; //数组中的总条数
        this.tableData.forEach(element => {
          element.state = element.state === 1 ? true : false;
        });
        this.total = res.data.total;
      });
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_GOODS_DELCATE(row.id).then(res => {
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
    handleEdit(index) {
      // console.log(row.id);
      // console.log( this.bool );
      // console.log(row, index);

      this.$set(this.showEdit, index, true);
    },
    // 完成编辑
    edited(index, row) {
      this.$set(this.showEdit, index, false);
      // 发请求
      API_GOODS_EDITCATE(row.id, row.cateName, row.state.toString()).then(
        res => {
          if (res.data.code == 0) {
            this.success(res.data.msg);
            this.catelist();
          } else {
            this.error(res.data.msg);
          }
        }
      );
    },
    // 点击添加分类弹出模态框
    addclick() {
      // console.log(this.form.cateName);

      // console.log(this.form.delivery);

      API_GOODS_ADDCATE(this.form.cateName, this.form.delivery).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.editDialogVisible = false;
        }
      });
      this.resTable(this.currentPage);
    },
    clickaddshop() {
      // console.log(1);
      // console.log(this.editDialogVisible);

      this.editDialogVisible = true;
    }
  },
  created() {
    this.resTable(this.currentPage);
  },
  mounted() {}
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
    margin: 20px 0px 0 0px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }
}
</style>