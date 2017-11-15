<template>
  <div class="wrap">
    <header>
      <h4>第一步</h4>
      <div class="btn">下载今日任务列表</div>
      <h4 class="two">第二步 任务分配</h4>
      <el-row :gutter="10">
        <el-col :span="7" style="border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple ">
            <h5>任务一</h5>
            <el-input v-model="input_1" placeholder="请输入内容" style="width:90%;margin-top:8px">
            </el-input>
            <p class="redColor">任务编号有误</p>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>0</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>0</span>元
            </div>
          </div>
        </el-col>
        <el-col :span="7" style=" border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple ">
            <h5>任务一</h5>
            <el-input v-model="input_2" placeholder="请输入内容" style="width:90%;margin-top:8px"></el-input>
            <p class="redColor">任务编号有误</p>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>0</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>0</span>元
            </div>
          </div>
        </el-col>
        <el-col :span="7" style="border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class=" grid-content bg-purple ">
            <h5>任务一</h5>
            <el-input v-model="input_3 " placeholder="请输入内容 " style="width:90%;margin-top:8px "></el-input>
            <p class="redColor">任务编号有误</p>
            <div class="Surtask ">
              <p>剩余任务量</p>
              <span>0</span>单
            </div>
            <div class="surMoney ">
              <p>剩余任务金额</p>
              <span>0</span>元
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="7" style="border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple ">
            <h5>任务一</h5>
            <el-input v-model="input_4" placeholder="请输入内容" style="width:90%;margin-top:8px"></el-input>
            <p class="redColor">任务编号有误</p>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>0</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>0</span>元
            </div>
          </div>
        </el-col>
        <el-col :span="7" style=" border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple ">
            <h5>任务一</h5>
            <el-input v-model="input_5" placeholder="请输入内容" style="width:90%;margin-top:8px"></el-input>
            <p class="redColor">任务编号有误</p>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>0</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>0</span>元
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="line"></div>
      <div class="bottom">
        <div class="bottom_money">包单金额:&nbsp;&nbsp;
          <span style="color:black;font-weight:600">678</span>元</div>
        <el-checkbox v-model="checked" style="margin-top:27px" v-show="check">使用该商家的买手账号</el-checkbox>&nbsp;&nbsp;
        <el-button type="primary" style="margin-top:16px">确认筛选</el-button>
      </div>
      <h4>第三步 订单分配</h4>
      <div class="orderMent">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center">
          </el-table-column>
          <el-table-column prop="wchat" label="微信号" align="center">
          </el-table-column>
          <el-table-column prop="messg" label="对应平台管理员" align="center">
          </el-table-column>
          <el-table-column prop="plus" label="Plus状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="会员到期日" align="center">
          </el-table-column>
          <el-table-column prop="city" label="收货城市" align="center">
          </el-table-column>
          <el-table-column prop="money" label="京东本月累计金额" align="center">
          </el-table-column>
          <el-table-column prop="stuts" label="任务状态" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.stuts === '已分发' ? 'primary' : scope.row.stuts === '待分发' ?'success':'Danger'" close-transition>{{scope.row.stuts}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="work" label="操作" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'orderManger',
  data () {
    return {
      input_1: '',
      input_2: '',
      input_3: '',
      input_4: '',
      input_5: '',
      checked: false,
      check: true,
      tableData: [{
        name: '王小虎',
        phone: '15037183341',
        wchat: '15037183341',
        messg: '哈哈哈',
        plus: '正式',
        date: '2016-05-02',
        city: '杭州',
        money: '100.00',
        stuts: '待分发',
        work: '确认分发'
      }, {
        name: '王小虎',
        phone: '15037183341',
        wchat: '15037183341',
        messg: '哈哈哈',
        plus: '正式',
        date: '2016-05-02',
        city: '杭州',
        money: '100.00',
        stuts: '已分发',
        work: '确认分发'
      }, {
        name: '王小虎',
        phone: '15037183341',
        wchat: '15037183341',
        messg: '哈哈哈',
        plus: '正式',
        date: '2016-05-02',
        city: '杭州',
        money: '100.00',
        stuts: '已分发',
        work: '确认分发'
      }]
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
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 20px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    h4
      font-size 20px
      color rgba(51, 51, 51, 1)
      line-height 28px
    .btn
      width 144px
      height 36px
      border-radius 4px
      border 1px solid rgba(204, 204, 204, 1)
      color black
      text-align center
      line-height 36px
      font-weight 500
      cursor pointer
      margin-top 24px
    .btn:hover
      background rgba(64, 182, 255, 1)
      color white
    .two
      margin-top 40px
    .bg-purple
      margin-left 24px
      .redColor
        color red
        text-align right
        padding-top 5px
        font-size 10px
        margin-right 30px
      h5
        font-size 14px
        color rgba(51, 51, 51, 1)
        margin-top 16px
      .Surtask
        margin-top 16px
        font-size 12px
        color rgba(102, 102, 102, 1)
        font-weight 600
        span
          display inline-block
          margin-top 8px
          padding-bottom 16px
      .surMoney
        margin-top -48px
        margin-left 136px
        font-weight 600
        span
          display inline-block
          margin-top 8px
          padding-bottom 16px
    .line
      height 1px
      background rgba(204, 204, 204, 1)
      margin-top 24px
    .bottom
      text-align right
      margin-top 25px
      .bottom_money
        color rgba(102, 102, 102, 1)
        font-size 12px
</style>