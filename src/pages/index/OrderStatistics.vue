<template>
  <div class="main">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="时间范围" class="date_form">
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
      </el-form-item>
    </el-form>
    <!-- ech...图 -->
    <div>
      <div id="echarts_div"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_ORDER_ORDERTAOTAL } from "@/api/apis.js";
export default {
  data() {
    return {
      form: {},
      orderData: []
    };
  },
  mounted() {
    var myecharts = echarts.init(document.getElementById("echarts_div"));
    API_ORDER_ORDERTAOTAL(this.form).then(res => {
      // console.log("数据：", res.data);
      //  时间
      let orderTime = res.data.data.map(time => {
        return time.orderTime
      });
      // 金额
      let orderAmount = res.data.data.map(time => {
        return time.orderAmount
      });
      let option = {
        xAxis: {
          type: "category",
          data: orderTime
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data:orderAmount,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      };
      myecharts.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
#echarts_div {
  width: 100%;
  height: 400px;
  // border: 1px solid #000;
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
  .el-form {
    padding: 10px 0;
    .line {
      padding-left: 10px;
    }
    .margin_btn {
      margin-left: 10px;
    }
  }
}
</style>