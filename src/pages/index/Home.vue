<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div>
              <i class="el-icon-picture-outline-round"></i>
            </div>
            <!-- 总订单 -->
            <div class="allorder">
              <p>总订单</p>
              <p>{{  totalAmount }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div>
              <i class="el-icon-s-data"></i>
            </div>
            <!-- 总订单 -->
            <div class="allorder">
              <p>总销售额</p>
              <p>{{  totalOrder }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div>
              <i class="el-icon-trophy-1"></i>
            </div>
            <!-- 总订单 -->
            <div class="allorder">
              <p>今日订单</p>
              <p>{{ todayOrder }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div>
              <i class="el-icon-s-marketing"></i>
            </div>
            <!-- 总订单 -->
            <div class="allorder">
              <p>今日销售额</p>
              <p>{{ totayAmount }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="data">
        <div id="echarts_div"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import echarts from "echarts";
import { API_ORDER_TOTSLDATA } from "@/api/apis.js";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      todayOrder: 0,
      totalAmount: 0,
      totalOrder: 0,
      totayAmount: 0
    };
  },
  mounted() {
    var myecharts = echarts.init(document.getElementById("echarts_div"));
    myecharts.showLoading();
    setTimeout(() => {
      API_ORDER_TOTSLDATA().then(res => {
        /* 
      todayOrder: 189总订单
      totalAmount: 202466总销售额
      totalOrder: 5486今日订单
      totayAmount: 2189今日销售额
      ,todayOrder,totalAmount,totalOrder, totayAmount
      */
        let {
          xData,
          amountData,
          orderData,
          todayOrder,
          totalAmount,
          totalOrder,
          totayAmount
        } = res.data;
        this.amountData = amountData;
        this.orderData = orderData;
        this.todayOrder = todayOrder;
        this.totalAmount = totalAmount;
        this.totalOrder = totalOrder;
        this.totayAmount = totayAmount;
        console.log(this.orderData);

        let option = {
          title: {
            text: "折线图堆叠"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["订单数据", "金额数据"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: orderData
            },
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: amountData
            }
          ]
        };
        myecharts.setOption(option);
        myecharts.hideLoading();
      });
    }, 2000);
    
  }
};
</script>

<style lang="less" scoped>
.el-main {
  background-color: #f1f1f1;
  .grid-content {
    background-color: #fff;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .allorder {
      font-size: 18px;
      p:nth-child(1) {
        color: #ccc;
      }
      p:nth-child(2) {
        font-weight: bold;
      }
    }
  }
  .data {
    height: 100%;
    background-color: #fff;
    margin-top: 20px;
  }
}
#echarts_div {
  width: 100%;
  height: 400px;
  // border: 1px solid #000;
}
i {
  font-size: 60px;
}
i.el-icon-picture-outline-round{
  color: yellow;
}
i.el-icon-s-data{
  color: red;
}
i.el-icon-s-marketing{
  color: blueviolet;
}
i.el-icon-trophy-1{
  color: yellow;
}
</style>