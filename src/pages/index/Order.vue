<template>
  <el-container>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="订单号">
        <el-input v-model="form.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="form.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" width="180px">
        <el-select v-model="form.orderState" placeholder="订单状态">
          <el-option label="派送中" value="派送中"></el-option>
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" class="date_form" style="width:800px">
        <el-time-picker
          is-range
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="yyyy-MM-dd hh:mm:ss"
          value-format="yyyy-MM-dd hh:mm:ss"
        ></el-time-picker>
        <el-button type="primary" @click="queryBtn">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹框显示查询信息 -->
    <el-dialog title="订单查询" :visible.sync="dialogTableVisible" width="100%">
      <el-form ref="edituserBtn" :data="gridData" label-width="80px">
        <h2 class="h2_class">总订单：{{ totalsum }}</h2>
        <el-form-item v-for="item in gridData" :key="item.id">
          <span class="span_margin">订单id：{{ item.id }}</span>
          <span class="span_margin">订单号：{{ item.orderNo }}</span>
          <span class="span_margin">下单时间：{{ item.orderTime }}</span>
          <span class="span_margin">联系电话：{{ item.phone }}</span>
          <span class="span_margin">收货人：{{ item.consignee }}</span>
          <span class="span_margin">运送地址：{{ item.deliverAddress }}</span>
          <span class="span_margin">送达时间：{{ item.deliveryTime }}</span>
          <span class="span_margin">订单金额：{{ item.orderAmount }}</span>
          <span class="span_margin">订单状态：{{ item.orderState }}</span>
          <span class="span_margin">备注：{{ item.remarks }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 表单 -->
    <el-table :data="tableData" border style="width: 100%;height:100%">
      <el-table-column type="expand">
        <template slot-scope="prope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号">
              <span>{{ prope.row.orderNo }}</span>
            </el-form-item>
            <el-form-item label="下单时间">
              <span>{{ prope.row.orderTime }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ prope.row.phone }}</span>
            </el-form-item>
            <el-form-item label="收货人">
              <span>{{ prope.row.consignee}}</span>
            </el-form-item>
            <el-form-item label="配送地址">
              <span>{{ prope.row.deliverAddress}}</span>
            </el-form-item>
            <el-form-item label="送达时间">
              <span>{{ prope.row.deliveryTime}}</span>
            </el-form-item>
            <el-form-item label="用户备注">
              <span>{{ prope.row.remarks}}</span>
            </el-form-item>
            <el-form-item label="订单金额">
              <span>{{ prope.row.orderAmount}}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{ prope.row.orderState}}</span>
            </el-form-item>
            <el-form-item label="操作"></el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="300"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击查看--弹出模态框 -->
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible2" width="100%">
      <el-form ref="edituserBtn2" :data="handle" label-width="80px">
        <span class="span_margin">订单id：{{ handle.id }}</span>
        <span class="span_margin">订单号：{{ handle.orderNo }}</span>
        <span class="span_margin">下单时间：{{ handle.deliverAddress }}</span>
        <span class="span_margin">联系电话：{{ handle.phone }}</span>
        <span class="span_margin">收货人：{{ handle.consignee }}</span>
        <span class="span_margin">运送地址：{{ handle.orderTime }}</span>
        <span class="span_margin">送达时间：{{ handle.deliveryTime }}</span>
        <span class="span_margin">订单金额：{{ handle.orderAmount }}</span>
        <span class="span_margin">订单状态：{{ handle.orderState }}</span>
        <span class="span_margin">备注：{{ handle.remarks }}</span>
      </el-form>
    </el-dialog>

    <!--分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[4]"
        :page-size="sizerow"
        layout="total,sizes,prev, pager, next, jumper"
        :total="totalall"
      ></el-pagination>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="修改商品" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="newtableDate" label-width="80px">
        <el-form-item label="账号的id">
          <el-input v-model="newtableDate.id"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="newtableDate.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker
            v-model="newtableDate.orderTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="newtableDate.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="newtableDate.consignee"></el-input>
        </el-form-item>
        <el-form-item label="送货地址">
          <el-input v-model="newtableDate.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="送达时间">
          <!-- <el-input v-model="newtableDate.deliveryTime"></el-input> -->
          <el-date-picker
            v-model="newtableDate.deliveryTime"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newtableDate.remarks"></el-input>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="newtableDate.orderAmount"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="newtableDate.orderState"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="reviseBtn">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
//                          查询                 订单详情         修改订单
import {
  API_ORDER_LIST,
  API_ORDER_SEARCH,
  API_ORDER_DETAIL,
  API_ORDER_EDIT
} from "@/api/apis";
export default {
  data() {
    return {
      form: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: ""
      },
      tableData: [],
      currentPage: 1,
      page: 1,
      sizerow: 4,
      totalall: 0,
      dateall: [],
      dialogTableVisible: false,
      dialogTableVisible2: false,
      gridData: [],
      consignee: "",
      totalsum: 0,
      handle: [],
      dialogVisible: false,
      newtableDate: [],
      pickerOptions: {}
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.sizerow = val;
      this.resTable();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.resTable();
    },
    //获取分类列表
    resTable() {
      API_ORDER_LIST(this.page, this.sizerow, "", "", "", "", "").then(res => {
        // console.log(res);
        this.tableData = res.data.data; //数组
        this.totalall = res.data.total; //数组中的总条数        
        // console.log(this.tableData);
      });
    },
    // 点击查询
    queryBtn() {
      this.dialogTableVisible = true;
      // console.log(this.form.orderState);
      API_ORDER_SEARCH(
        this.page,
        this.sizerow,
        this.form.orderNo,
        this.form.consignee,
        this.form.phone,
        this.form.orderState,
        this.dateall
      ).then(res => {
        console.log("数据库：", res.data);
        this.gridData = res.data.data;
        this.totalsum = res.data.total;
        // console.log("数据库2：", res.data.data);
        // console.log( res.data.total );
      });
    },
    // 点击确定发送请求
    handleClick(row) {
      // console.log(row);
      this.dialogTableVisible2 = true;
      API_ORDER_DETAIL(row.id).then(res => {
        // console.log( "res:",res.data.data );
        this.handle = res.data.data;
      });
    },
    // 编辑
    handleEdit(row) {
      console.log("值：", row);
      this.dialogVisible = true;
      this.newtableDate = row;
      console.log("row:", row.orderTime);
    },
    // 修改订单
    reviseBtn() {
      // 深拷贝，展开运算符
      let neworder = { ...this.newtableDate };
      // 把时间转为2020-6-4 09:10:10
      var time = neworder.orderTime;
      var time2 = neworder.deliveryTime;
      var d = new Date(time);
      var d2 = new Date(time2)
      var times =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();


        var times2 =
        d2.getFullYear() +
        "-" +
        (d2.getMonth() + 1) +
        "-" +
        d2.getDate() +
        " " +
        d2.getHours() +
        ":" +
        d2.getMinutes() +
        ":" +
        d2.getSeconds();
        
        console.log( "times",times );
        neworder.orderTime = times
        neworder.deliveryTime = times2
        console.log( "下单",neworder.orderTime );
        console.log( "送达",neworder.deliveryTime );
        
        
        
      // console.log(neworder);
      API_ORDER_EDIT(neworder).then(res => {
        console.log(res);

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
    this.resTable();
  }
};
</script>

<style lang="less" scoped>
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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .el-input {
    width: 180px;
  }
}
.el-container {
  display: flex;
  flex-direction: column;
}
.span_margin {
  margin: 0 15px;
}
.h2_class {
  display: block;
  font-size: 20px;
}
</style>