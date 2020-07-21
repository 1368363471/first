<template>
  <div class="home_main">
    <!-- 头部显示数据信息 -->
    <div class="home_main_header">
      <div>
        <p>
          <span>总收益</span>
          <i class="el-icon-info"></i>
        </p>
        <p>20000</p>
        <p>3</p>
        <p>4</p>
      </div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
    <!-- 模板使用情况 -->
    <div class="home_main_template">
      <div>
          <h3>模板使用情况</h3>
      </div>
      <div>2</div>
    </div>
    <!-- 模板数 -->
    <div class="home_main_temnum">
      <div class="home_main_temunm_son" v-for="item in temlist" :key="item.index">
        <p>{{ item.text }}</p>
        <p>{{ item.num }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temlist: [
        { id: 0, text: "模板数", num: 8 },
        { id: 1, text: "模板数", num: 8 },
        { id: 2, text: "模板数", num: 8 },
        { id: 3, text: "模板数", num: 8 },
        { id: 4, text: "模板数", num: 8 },
        { id: 5, text: "模板数", num: 8 },
        { id: 6, text: "模板数", num: 8 },
        { id: 7, text: "模板数", num: 8 }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.home_main {
  border: 1px solid #000;
  margin: 5px;
  background-color: #fff;
  .home_main_header {
    display: flex;
    justify-content: space-between;
    div {
      height: 80px;
    }
  }
  .home_main_header,
  .home_main_template,
  .home_main_temnum {
    border: 1px solid #000;
    margin-top: 20px;
    // padding: 10px;
  }
//   模板数
  .home_main_temnum {
    display: flex;
    flex-wrap: wrap;
// 模板数--下面的儿子div
    .home_main_temunm_son {
      width: 23.1%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      margin: 10px;
      
    }
  }
}
// 模板使用情况
.home_main_template{
    display: flex;
    justify-content: space-between;
    >div{
        width: 48%;
        border: 1px solid #000;
        height: 300px;
        padding: 20px 40px;
        h3{
            border-bottom: 1px solid #ccc;
            width: 200px;
            padding-bottom: 10px;
        }
    }
}
</style>