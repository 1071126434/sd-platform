<template>
  <div class="taskDetail">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'task' }">任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>任务详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="head">
      <div class="taskStatus">
        <div class="toDo">待审核</div>
        <h2>任务状态</h2>
      </div>
      <div class="taskInfo">
        <div class="title">
          <span>天猫</span>
          <span>凭轩旗舰店</span>
          <span>手淘app垫付</span>
        </div>
        <h3>任务编号: 51553151546351321541543135</h3>
        <ul class="infoDetail">
          <li>
            <p>商品价格:
              <span class="red">9.90</span>
            </p>
            <p>待确认付款金额:
              <span class="red">0</span>
            </p>
          </li>
          <li>
            <p>投放数量:
              <span class="red">99</span>
            </p>
            <p>已领取:
              <span class="red">0</span>
            </p>
          </li>
          <li>
            <p>待确认好评:
              <span class="red">99</span>
            </p>
            <p>已确认好评:
              <span class="red">0</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="connect">
        <div class="title">
          <h3>商家联系方式</h3>
        </div>
        <ul class="connectDetail">
          <li>
            <span></span>皇军</li>
          <li>
            <span></span>15517756698</li>
          <li>
            <span></span>1072551555@qq.com</li>
          <li>
            <span></span>1866654745</li>
        </ul>
      </div>
    </div>
    <div class="cont">
      <ul class="contTitle">
        <li>任务审核</li>
        <li>
          <span>审核不通过</span>
          <span>审核通过</span>
        </li>
      </ul>
      <div class="contNav">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="商品信息" name="first">
            <ul class="contDetail">
              <li class="step1">
                <h2>1.商品信息</h2>
                <div class="info">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg" alt="">
                  <div>
                    <div>
                      <p>商品名称: 安卓数据线</p>
                      <p>所在分类: 手机周边</p>
                    </div>
                    <div>
                      <p style="width:80%">商品链接:
                        <a class="link" href="http://www.baidu.com">http://www.baidu.com</a>
                      </p>
                    </div>
                    <div>
                      <p>商品售价: 9元</p>
                      <p>买手每单拍: 1件</p>
                    </div>
                    <div>
                      <p>下单价格: 9元</p>
                    </div>
                  </div>
                </div>
              </li>
              <li class="step2">
                <h2>2.如何找到商品</h2>
                <ul class="toFind">
                  <li>
                    <h3>搜索关键词1安卓</h3>
                    <p>
                      <span>排序方式:</span>综合排序</p>
                    <p>
                      <span>价格区间:</span>0.00-100.00元</p>
                    <p>
                      <span>品牌:</span>阿迪</p>
                    <p>
                      <span>发货地:</span>全国</p>
                    <p>
                      <span>评价数(约):</span>51</p>
                    <p>
                      <span>预计翻页数:</span>5</p>
                  </li>
                  <li>
                    <h3>搜索关键词2安卓</h3>
                    <p>
                      <span>排序方式:</span>综合排序</p>
                    <p>
                      <span>价格区间:</span>0.00-100.00元</p>
                    <p>
                      <span>品牌:</span>阿迪</p>
                    <p>
                      <span>发货地:</span>全国</p>
                    <p>
                      <span>评价数(约):</span>51</p>
                    <p>
                      <span>预计翻页数:</span>5</p>
                  </li>
                  <li>
                    <h3>搜索关键词3安卓</h3>
                    <p>
                      <span>排序方式:</span>综合排序</p>
                    <p>
                      <span>价格区间:</span>0.00-100.00元</p>
                    <p>
                      <span>品牌:</span>阿迪</p>
                    <p>
                      <span>发货地:</span>全国</p>
                    <p>
                      <span>评价数(约):</span>51</p>
                    <p>
                      <span>预计翻页数:</span>5</p>
                  </li>
                </ul>
              </li>
              <li class="step3">
                <h2>3.商品收取运费的方式</h2>
                <p>包邮试用: 试客无需支付运费</p>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="试用份数" name="second">
            <div class="tryNum">
              <h2>任务份数发放计划</h2>
              <div class="charts" ref="charts">
                <div class="myChart" ref="myChart"></div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="费用及增值服务" name="third">
            <h2 class="costSum">费用合计
              <b>押金:
                <span class="red">417.9</span>元&nbsp;&nbsp;&nbsp;&nbsp; 金币:
                <span class="red">91.78</span>元
              </b>
            </h2>
            <table class="costTab">
              <tr>
                <th>分类</th>
                <th>费用明细</th>
                <th>小计</th>
                <th>合计</th>
              </tr>
              <tr>
                <td>押金</td>
                <td>
                  <div style="width:50%;margin:0 auto;">
                    <p>商品: 9.00元*1件 / 单 * 25单</p>
                    <p>运费备用金: 10.00元 / 单*25单</p>
                  </div>
                </td>
                <td>19.9元</td>
                <td rowspan="2">
                  <span class="red">91.78</span>元
                </td>
              </tr>
              <tr>
                <td>佣金</td>
                <td>
                  <div style="width:50%;margin:0 auto;">
                    <p>基础佣金: 8.00元 / 单 * 20单</p>
                    <p>其中:</p>
                    <p style="color: #666666">图文好评: 8.00元 / 单 * 2单</p>
                    <p style="color: #666666">纯文字好评: 6.00元 / 单 * 18单</p>
                  </div>
                </td>
                <td>19.9元</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="买手清单" name="fourth">
            <div style="margin:20px;">
              <el-tabs type="border-card">
                <el-tab-pane label="买手列表">
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="phone" align="center" label="买家手机号">
                    </el-table-column>
                    <el-table-column prop="buyerName" align="center" label="买号">
                    </el-table-column>
                    <el-table-column prop="taskWay" align="center" label="任务方式">
                    </el-table-column>
                    <el-table-column prop="process" align="center" label="进度">
                    </el-table-column>
                    <el-table-column prop="platOrderNum" align="center" label="平台订单编号">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="pager">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
let echarts = require('echarts')
export default {
  name: 'taskDetail',
  data () {
    return {
      activeName: 'first',
      currentPage: 1,
      tableData: [{
        phone: '18655554444',
        buyerName: '王小虎',
        taskWay: '手淘app垫付',
        process: '待找商品',
        platOrderNum: '9823786563387066-d21753'
      }, {
        phone: '18655554444',
        buyerName: '王小虎',
        taskWay: '手淘app垫付',
        process: '待下单',
        platOrderNum: '9823786563387066-d21753'
      }, {
        phone: '18655554444',
        buyerName: '王小虎',
        taskWay: '手淘app垫付',
        process: '待返本金',
        platOrderNum: '9823786563387066-d21753'
      }, {
        phone: '18655554444',
        buyerName: '王小虎',
        taskWay: '手淘app垫付',
        process: '待评价',
        platOrderNum: '9823786563387066-d21753'
      }, {
        phone: '18655554444',
        buyerName: '王小虎',
        taskWay: '手淘app垫付',
        process: '待返佣金',
        platOrderNum: '9823786563387066-d21753'
      }, {
        phone: '18655554444',
        buyerName: '王小虎',
        taskWay: '手淘app垫付',
        process: '已完成',
        platOrderNum: '9823786563387066-d21753'
      }, {
        phone: '18655554444',
        buyerName: '王小虎',
        taskWay: '手淘app垫付',
        process: '已终止',
        platOrderNum: '9823786563387066-d21753'
      }],
      option: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['计划下单数', '实际下单数']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['9-7', '9-8', '9-9', '9-10', '9-11', '9-12', '9-13']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '计划下单数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#24AB62',
                lineStyle: {
                  color: '#24AB62'
                }
              }
            },
            data: [11, 11, 15, 13, 12, 13, 10]
          },
          {
            name: '实际下单数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#52BDFF',
                lineStyle: {
                  color: '#52BDFF'
                }
              }
            },
            data: [1, 4, 2, 5, 3, 2, 9]
          }
        ]
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 自适应折线图
    resizeCharts () {
      this.$refs.myChart.style.height = this.$refs.charts.style.height
      this.$refs.myChart.style.width = this.$refs.charts.style.width
      let myCharts = echarts.init(this.$refs.myChart)
      myCharts.setOption(this.option)
    },
    timeFilter (time) {
      time = time.toString()
      let month = time.substr(4, 2)
      let day = time.substr(6, 2)
      return month + '-' + day
    }
  },
  mounted () {
    this.resizeCharts()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.taskDetail
  padding 0 20px 20px
  .red
    color #FC1733
  .link
    color #1D6AE7
  .nav
    height 36px
    span
      font-size 12px
      line-height 36px
      color #262626
  .head
    display flex
    justify-content space-between
    >div
      background #ffffff
      height 208px
    .taskStatus
      display flex
      width 200px
      min-width 200px
      flex-direction column
      justify-content center
      align-items center
      >div
        width 80px
        height 80px
        border-radius 50%
        font-size 14px
        line-height 80px
        text-align center
        color #ffffff
      .toDo
        background #5DC0FF
        box-shadow 0 1px 5px #4DB7FF
      h2
        font-size 16px
        color #333333
        margin-top 30px
    .taskInfo
      flex 2
      max-width 700px
      min-width 440px
      margin-left 20px
      margin-right 20px
      .title
        height 38px
        background #FFA419
        padding-left 8px
        padding-right 8px
        span
          line-height 38px
          font-size 14px
          color #ffffff
          padding-left 12px
          padding-right 12px
          border-right 1px solid #ffffff
          &:last-child
            border none
      h3
        font-size 12px
        color #999999
        line-height 36px
        padding-left 20px
        padding-right 20px
      .infoDetail
        padding 20px
        display flex
        justify-content space-between
        li
          padding-left 16px
          padding-right 16px
          border-left 1px solid #E5E5E5
          &:first-child
            border none
          p
            font-size 14px
            color #262626
            line-height 30px
    .connect
      flex 1
      max-width 400px
      min-width 220px
      .title
        height 38px
        background #30ACFF
        h3
          font-size 14px
          color #ffffff
          line-height 38px
          padding-left 20px
          padding-right 20px
      .connectDetail
        padding 20px
        li
          height 36px
          line-height 36px
          font-size 14px
          color #333333
          span
            float left
            width 20px
            height 20px
            background red
            margin-top 8px
            margin-right 16px
  .cont
    margin-top 16px
    margin-bottom 50px
    background #ffffff
    padding 20px
    .contTitle
      display flex
      height 50px
      border-bottom 1px solid #e5e5e5
      li
        flex 1
        &:first-child
          text-align left
          font-size 20px
          color #333333
          line-height 40px
        &:last-child
          text-align right
          span
            cursor pointer
            display inline-block
            width 90px
            height 36px
            line-height 36px
            color #ffffff
            text-align center
            &:first-child
              background #FF3341
              margin-right 40px
            &:last-child
              background #5DC0FF
    .contNav
      margin-top 24px
    .contDetail
      h2
        font-size 16px
        color #333333
        line-height 32px
        margin-top 30px
        font-weight 600
      .step1
        img
          width 60px
          height 60px
          float left
          margin 20px 40px 20px 20px
        .info
          p
            display inline-block
            width 25%
            font-size 14px
            color #333333
            line-height 30px
      .step2
        .toFind
          padding 20px 20px 0
          display flex
          justify-content flex-start
          li
            margin-right 120px
            h3, p
              font-size 14px
              color #333333
              line-height 30px
              font-weight 600
              span
                color #666666
                display inline-block
                width 90px
      .step3
        p
          font-size 14px
          color #666666
          line-height 30px
          padding 20px
    .tryNum
      margin-top 10px
      margin-bottom 10px
      h2
        font-size 16px
        color #333333
        line-height 32px
      .myChart
        width 1000px
        height 500px
    .costSum
      font-size 16px
      color #333333
      line-height 40px
      b
        float right
        font-size 14px
        color #262626
    .costTab
      margin 20px
      font-size 14px
      color #333333
      width calc(100% - 40px)
      text-align center
      th
        background #f0f0f0
        border 1px solid #cccccc
        height 40px
        vertical-align middle
      td
        height 150px
        border 1px solid #cccccc
        vertical-align middle
        p
          text-align left
          line-height 38px
</style>