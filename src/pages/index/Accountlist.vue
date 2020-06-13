<template>
  <div class="main">

    <p>账号列表</p>
    <div class="acc_div">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="account" label="账号" width="300"></el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="300"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="120"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 
        :page-size="3"  一页显示多少条数据
        @current-change="handleCurrentChange" 获取当前页  val获取到第几页 并赋值给
        
      -->
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
        <div class="btn_div">
          <el-button @click="clickRemoveAll" type="danger">批量删除</el-button>
          <el-button type="primary">取消选择</el-button>
        </div>
      </div>
    </div>
    <!-- 修改用户对话框 -->

    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="edituserBtn" :data="tableData" label-width="80px">
        <el-form-item label="id">
          <el-input v-model="tableData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="account" prop="account"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-input v-model="userGroup" prop="userGroup"></el-input>
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
// 用户列表     删除账号      批量删除账号  编辑API_Edit  检查旧密码API_USER_CHECKOLDPWD  API_CHECK_TOKEN
import {
  API_LIST,
  API_Del,
  API_Batchdel,
  API_Edit,
  API_CHECK_TOKEN
} from "@/api/apis.js";

export default {
  data() {
    return {
      tableData: [], //用户列表
      page: 1, //当前页码（显示页数）
      sizerow: 3, //每页条数
      totalall: 0, //总条数
      currentPage: 1, //默认页数
      // 控制对话框显示隐藏
      editDialogVisible: false,
      id: 0,
      account: "",
      userGroup: "",
      username: ""
    };
  },
  created() {
    this.resTable(this.currentPage);
    // 获取token
    API_CHECK_TOKEN(localStorage.token).then(res => {
      if (res.data.code == 0) {
        //还在登录状态
        this.username = localStorage.user;
      } else {
        //登录失效
        this.username = "<a href='#/'>亲，请登录</a>";
      }
    });
  },
  methods: {
    resTable(page) {
      API_LIST(page, this.sizerow).then(res => {
        // console.log( res.data.data,res.data.total );

        this.tableData = res.data.data; //数组
        this.totalall = res.data.total; //数组中的总条数
      });
    },
    // 编辑
    handleEdit(row) {
      this.tableData.id = row.id;
      this.tableData.account = row.account;
      this.tableData.userGroup = row.userGroup;
      this.id = row.id;
      this.account = row.account;
      this.userGroup = row.userGroup;

      // 显示对话框
      this.editDialogVisible = true;
      console.log("row:", row); //#endregion
      console.log("数组：", this.tableData);

      // 数据保存在数组中
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(res => {
          console.log(res);

          done();
        })
        .catch(res => {
          console.log(res);
        });
    },
    // 删除
    handleDelete(row) {
      console.log(row);

      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_Del(row.id).then(res => {
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
    // 页数改变触发
    handleSizeChange(newpage) {
      console.log(newpage);
      this.sizerow = newpage;
      this.resTable(this.currentPage);
    },
    // 点击页码触发
    handleCurrentChange(pages) {
      console.log(pages);
      this.resTable(pages);
    },
    // 批量删除
    clickRemoveAll() {
      if (!this.ids || this.ids.length == 0) {
        this.$message("请先选中数据");
        return;
      }
      console.log("ids:", this.ids);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_Batchdel(JSON.stringify(this.ids)).then(res => {
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
    // 改变
    handleSelectionChange(selection) {
      // console.log(selection);
      this.ids = selection.map(item => item.id);
      console.log(this.ids);
    },
    // 监听修改
    addclick() {
      this.tableData.id = this.id;
      this.tableData.account = this.account;
      this.tableData.userGroup = this.userGroup;
      console.log(this.account);

      // JSON.stringify(this.tableData.account),JSON.stringify(this.tableData.userGroup)
      API_Edit(this.id, this.account, this.userGroup).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.editDialogVisible = false;
          this.resTable(this.currentPage);
          this.$message.success("成功");
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
  p {
    font-size: 20px;
    padding: 10px;
    margin: 20px 10px 0 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  div.acc_div {
    margin: 0 10px 0 10px;
  }
  .block {
    background-color: #fff;
    padding: 20px;
    .btn_div {
      padding: 10px 0;
    }
  }
}
</style>