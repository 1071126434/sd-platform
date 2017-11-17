<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="买家本金提现申请" name="first">
          <div class="top">
            <div class="purple_2">
              申请时间:
              <el-date-picker v-model="value4" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="content">
              <el-button type="primary">批量导出</el-button>
            </div>
          </div>
          <!-- 内容列表展示 -->
          <div class="accountTab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="phone" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="moneyNum" align="center" label="提现金额">
              </el-table-column>
              <el-table-column prop="bankNum" align="center" label="银行卡号">
              </el-table-column>
              <el-table-column prop="bank" align="center" label="银行">
              </el-table-column>
              <el-table-column prop="name" align="center" label="姓名">
              </el-table-column>
              <el-table-column prop="time" align="center" label="申请时间">
              </el-table-column>
              <el-table-column prop="state" align="center" label="导出状态">
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">确认</el-button>
                  <el-button @click="handleClick(scope.row)" type="text" size="small">撤销</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pager">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="买家提现记录" name="second">
          <div class="buyerTop">
            <div class="time">
              申请时间:
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="name">
              <el-input placeholder="请输入姓名/手机号" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
          <!-- 内容列表 -->
          <div class="accountTab">
            <el-table :data="tableDataBuy" style="width: 100%">
              <!-- <el-table-column type="selection"></el-table-column> -->
              <el-table-column prop="orderTask" align="center" label="提现编号">
              </el-table-column>
              <el-table-column prop="phone" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="moneyNum" align="center" label="提现金额">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="提现原因">
              </el-table-column>
              <el-table-column prop="time" align="center" label="确认时间">
              </el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='成功' ? 'tipSuccess' : scope.row.JDStatus==='失败' ? 'tipWait' : 'tipError'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="sBank" align="center" label="收款银行卡">
              </el-table-column>
              <el-table-column prop="dBank" align="center" label="打款银行卡">
              </el-table-column>
              <el-table-column prop="person" align="center" label="操作人员">
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pager">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'buyerApply',
  data () {
    return {
      activeName2: 'first',
      checked: true,
      value1: '',
      value3: '',
      value4: '',
      input5: '',
      currentPage: 1,
      checkAll: false,
      // checkedCities: ['上海', '北京'],
      // cities: cityOptions,
      isIndeterminate: true,
      tableDataBuy: [{
        orderTask: '55616156156156156',
        phone: '18655554444',
        moneyNum: '100.00',
        remark: '备注一下',
        time: '2017-11-15 20:30:30',
        JDStatus: '成功',
        sBank: '545565695685856',
        dBank: '186669985665687',
        person: '展示'
      }],
      tableData: [{
        phone: '18655554444',
        moneyNum: '100.00',
        bankNum: '5465465464646',
        bank: '招商',
        name: '黄军',
        time: '2017-11-15 20:30:30',
        state: '已导出'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    handleCheckAllChange (val) {
      // this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
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
    .buyerTop
      margin-top 14px
      border-bottom 1px solid rgba(229, 229, 229, 1)
      padding-bottom 70px
      .time
        float left
      .name
        width 280px
        float right
    .top
      margin-top 22px
      .purple_2
        float left
      .purple_2
        margin-top -12px
        margin-left 12px
        color rgba(51, 51, 51, 1)
        font-size 14px
      .content
        float right
        margin-top -12px
</style>