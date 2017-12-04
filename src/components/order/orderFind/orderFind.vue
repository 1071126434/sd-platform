<template>
  <div class="wrapOder">
    <header>
      <h4>任务分配</h4>
      <div class="selectOne">
        <el-row :gutter="40">
          <el-col :span="7">
            <div class="grid-content bg-purple">
              店铺渠道:
              <el-select v-model="value1" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              店铺名称:
              <el-autocomplete class="inline-input" v-model="value2" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect" style="windth:240px;height:32px"></el-autocomplete>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              平台对接人:
              <el-select v-model="value3" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 第二层选择器 -->
      <div class="selectTwo">
        <el-row :gutter="40">
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入内容" v-model="input1" class="input-with-select">
                <el-select v-model="select1" slot="prepend" placeholder="买家昵称" size="small">
                  <el-option label="买家昵称" value="nick"></el-option>
                  <el-option label="买家微信号" value="wechat"></el-option>
                  <el-option label="买家手机号" value="telephone"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入内容" v-model="input2" class="input-with-select">
                <el-select v-model="select2" slot="prepend" placeholder="任务包编号" size="small">
                  <el-option label="任务包编号" value="package"></el-option>
                  <el-option label="任务编号" value="task"></el-option>
                  <el-option label="子任务编号" value="subTask"></el-option>
                  <el-option label="订单编号" value="order"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple bgColor">
              <el-select v-model="select3" placeholder="分配时间" size="small">
                <el-option label="分配时间" value="allot"></el-option>
                <el-option label="下单时间" value="order"></el-option>
                <el-option label="评价时间" value="favor"></el-option>
                <el-option label="撤销时间" value="cancel"></el-option>
              </el-select>
              <el-date-picker v-model="value4" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="line"></div>
      <div class="btn">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary">搜索</el-button>
      </div>
    </header>
    <div class="orderList">
      <div class="head">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部任务" name="first"></el-tab-pane>
          <el-tab-pane label="待审核" name="second"></el-tab-pane>
          <el-tab-pane label="待上线" name="third"></el-tab-pane>
          <el-tab-pane label="已上线" name="fourth"></el-tab-pane>
          <el-tab-pane label="已完成任务" name="five"></el-tab-pane>
          <el-tab-pane label="未支付任务" name="six"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="list">
        <div class="tables">
          <div class="tableItem">
            <ul class="itemHead">
              <li style="width:60%">
                <span class="shopType"></span>
                <span>升达旗舰店</span>
                <span class="person">对接人:
                  <em>大黄</em>
                </span>
                <span class="taskOrder">任务编号:
                  <i>9901640082449467</i>
                  <span class="link">[查看任务详情]</span>
                </span>
              </li>
              <li style="width:20%">
                <span class="taskType">任务包编号:
                  <span>990484864986416</span>
                </span>
              </li>
              <li style="width:20%">
                <span class="onlineTime">提交时间:
                  <span class="red">2017-11-14 12:23:00</span>
                </span>
              </li>
            </ul>
            <ul class="itemCont">
              <li style="width:5%;border:none;margin-top:17px">
                <img alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
              </li>
              <li style="width:20%;margin-left:-80px">
                <p>安卓数据线
                  <span>商品链接</span>
                </p>
                <p>子任务编号:
                  <i class="red">4696868146-51541</i>
                </p>
                <p>任务类型:
                  <!-- <i class="red">图文好评</i>
                         <i class="red">文字好评</i> -->
                  <i class="red">默认好评</i>
                </p>
              </li>
              <li style="width:30%">
                <p>
                  <span>姓名:
                    <i class="red">黄军</i>
                  </span>
                  <span>订单金额:
                    <i class="red">58</i>
                  </span>
                </p>
                <p>京东订单编号:
                  <span class="red">68489646146</span>
                </p>
                <p>京东用户名:
                  <span class="red">测试一下看看多少字</span>
                </p>
                <p>手机号:
                  <span class="red">15103541616</span>
                </p>
              </li>
              <li class="center" style="width:20%">
                <p class="taskState">子任务状态:</p>
                <!-- <span class="tipSuccess lh60">已完成</span> -->
                <span class="tipWait lh60">待下单</span>
                <p>
                  <el-checkbox v-model="checked">已联系做单</el-checkbox>
                </p>
              </li>
              <li style="width:20%">
                <p class="center">
                  <span class="smButton">撤&nbsp;&nbsp;销</span>
                </p>
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
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'orderFind',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      input1: '',
      input2: '',
      input3: '',
      select1: 'nick',
      select2: 'package',
      select3: '',
      activeName: 'first',
      currentPage: 1,
      checked: true,
      restaurants: []
    }
  },
  methods: {
    reset () {
      this.value = ''
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）' },
        { 'value': '四全鲜食（北新泾店）' },
        { 'value': '五全鲜食（北新泾店）' },
        { 'value': '六全鲜食（北新泾店）' }
      ]
    },
    handleSelect (item) {
      console.log(item)
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapOder
  padding 20px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    h4
      color rgba(51, 51, 51, 1)
      font-size 20px
    .selectOne
      margin-top 32px
      font-size 14px
      color rgba(51, 51, 51, 1)
    .selectTwo
      margin-top 32px
    .line
      height 1px
      background rgba(204, 204, 204, 1)
      margin-top 24px
    .btn
      text-align right
      margin-top 24px
  .orderList
    background rgba(255, 255, 255, 1)
    padding 20px
    margin-top 20px
    .head, padding 20px, background #ffffff, .btns
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
          .person
            margin-left 66px
          .taskOrder
            margin-left 46px
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
            .taskState
              margin-left -5px
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
    margin-top 47px
  .greenBg
    background #40B6FF
    color #ffffff
    border none
</style>