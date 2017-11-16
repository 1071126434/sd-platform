<template>
  <div class="taskList">
    <div class="head">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部任务" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="待上线" name="third"></el-tab-pane>
        <el-tab-pane label="已上线" name="fourth"></el-tab-pane>
        <el-tab-pane label="已完成任务" name="five"></el-tab-pane>
        <el-tab-pane label="未支付任务" name="six"></el-tab-pane>
      </el-tabs>
      <div class="btns">
        <div class="select">
          <span>任务类型:</span>
          <el-select v-model="taskValue" placeholder="请选择">
            <el-option v-for="item in taskClass" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <span>平台:</span>
          <el-select v-model="taskValue" placeholder="请选择">
            <el-option v-for="item in taskClass" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select">
          <span>关键词:</span>
          <el-input placeholder="任务编号/商品名称关键词"></el-input>
        </div>
        <div class="searchBtn">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tableHead">
        <div style="width:35%">商品信息</div>
        <div style="width:35%">数量</div>
        <div style="width:15%">状态</div>
        <div style="width:15%">操作</div>
      </div>
      <div class="tables">
        <div class="tableItem">
          <ul class="itemHead">
            <li style="width:50%">
              <span class="shopType"></span>
              <span>升达旗舰店</span>
              <span class="taskOrder">任务编号: 9901640082449467
                <span class="link" @click="lookDetail">[查看任务详情]</span>
              </span>
            </li>
            <li style="width:25%">
              <span class="taskType">任务类型:
                <span class="red">垫付</span>
              </span>
            </li>
            <li style="width:25%">
              <span class="onlineTime">上线时间:
                <span class="red">2017-11-14</span>
              </span>
            </li>
          </ul>
          <ul class="itemCont">
            <li style="width:20%">
              <img alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
              <span class="goodsName">安卓数据线</span>
            </li>
            <li style="width:16%">
              <p>付款价格:
                <span class="red">9.90</span>
              </p>
              <p>待确认订单:
                <span class="red">0</span>
              </p>
            </li>
            <li style="width:16%">
              <p>任务数量:
                <span class="red">99</span>
              </p>
              <p>待确认评价截图:
                <span class="red">0</span>
              </p>
            </li>
            <li style="width:16%">
              <p class="lh60">已完成订单:
                <span class="red">99</span>
              </p>
            </li>
            <li class="center" style="width:16%">
              <span class="tipSuccess lh60">已完成</span>
            </li>
            <li style="width:16%">
              <div>
                <p class="center">
                  <span class="smButton greenBg">去审核</span>
                </p>
                <p class="center">
                  <span class="smButton">撤&nbsp;&nbsp;销</span>
                </p>
              </div>
              <!-- <div style="margin-top:16px">
                <p class="center">
                  <span class="smButton">撤&nbsp;&nbsp;销</span>
                </p>
              </div> -->
            </li>
          </ul>
        </div>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'task',
  data () {
    return {
      currentPage: 1,
      activeName: 'first',
      taskValue: '',
      taskClass: [{
        value: '1',
        label: '垫付'
      }, {
        value: '2',
        label: '浏览'
      }]
    }
  },
  methods: {
    // 查看任务详情
    lookDetail () {
      this.$router.push({ name: 'taskDetail' })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.taskList
  min-width 900px
  padding 20px
  .head
    padding 20px
    background #ffffff
    .btns
      margin-top 20px
      display flex
      justify-content flex-start
      .select
        margin-left 25px
        margin-right 20px
        .el-input
          width 226px
      .searchBtn
        position absolute
        right 40px
  .list
    margin-top 12px
    background #ffffff
    .tableHead
      display flex
      font-size 14px
      line-height 36px
      color #333333
      background #f0f0f0
      div
        text-align center
    .tables
      padding 12px 20px
      .tableItem
        border 1px solid #40B6FF
        margin-bottom 12px
        .itemHead
          display flex
          font-size 12px
          line-height 32px
          background rgba(151, 204, 247, 0.2)
          color #535353
          .shopType
            margin 7px 10px 8px 20px
            float left
            width 16px
            height 16px
            background red
          .taskOrder
            margin-left 48px
        .itemCont
          display flex
          padding 20px
          li
            min-width 150px
            border-right 1px solid #E5E5E5
            &:last-child
              border none
          img
            float left
            width 60px
            height 60px
          .goodsName
            line-height 60px
            margin-left 14px
            font-size 14px
            color #666666
          p
            font-size 14px
            color #535353
            line-height 30px
            margin-left 20px
          .lh60
            line-height 60px
          .center
            text-align center
  .red
    color #FC1733
  .link
    color #0A5CE0
    cursor pointer
  .smButton
    display inline-block
    width 74px
    cursor pointer
    text-align center
    font-size 14px
    color #333333
    line-height 30px
    border-radius 4px
    line-height 24px
    border 1px solid #cccccc
  .greenBg
    background #40B6FF
    color #ffffff
    border none
</style>