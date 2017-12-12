<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="卖家充值申请" name="first">
          <div class="top">
            <el-input placeholder="请输入申请的卡号" v-model="input5" class="input-with-select">
              <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="line"></div>
          <div class="accountTab">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="payWater" align="center" label="充值流水单号">
              </el-table-column>
              <el-table-column prop="phone" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="payNum" align="center" label="充值金额">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="充值备注">
                <!-- <template slot-scope="scope">
                  <el-tooltip effect="dark" placement="top">
                    <div slot="content">{{ scope.row.content }}</div>
                    <p class="overHidden">{{ scope.row.name }}</p>
                  </el-tooltip>
                </template> -->
              </el-table-column>
              <el-table-column prop="collectionBank" align="center" label="收款银行卡">
              </el-table-column>
              <el-table-column prop="moneyBank" align="center" label="打款银行卡号">
              </el-table-column>
              <el-table-column prop="creatTime" align="center" label="提交时间">
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">确认到账</el-button>
                  <el-button @click="handleNoClickNo(scope.row)" type="text" size="small">未到账</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="卖家充值记录" name="second">
          <div class="second_top">
            <div class="Stime">
              申请时间：
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="search">
              <el-input placeholder="请输入姓名/手机号" v-model="input6" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="excel">
              <el-button>导出excel</el-button>
            </div>
          </div>
          <!-- 展示内容部分 -->
          <div class="accountTab">
            <el-table :data="tableDataBuy" style="width: 100%">
              <el-table-column prop="orderTask" align="center" label="订单号">
              </el-table-column>
              <el-table-column prop="phone" align="center" label="手机号">
              </el-table-column>
              <el-table-column prop="moneyNum" align="center" label="金额">
              </el-table-column>
              <el-table-column prop="remark" align="center" label="充值备注">
              </el-table-column>
              <el-table-column prop="sBank" align="center" label="收款银行卡">
              </el-table-column>
              <el-table-column prop="dBank" align="center" label="打款银行卡">
              </el-table-column>
              <el-table-column align="center" label="状态">
                <template slot-scope="scope">
                  <span class="tipSmall" :class="scope.row.JDStatus==='已到账' ? 'tipSuccess' : scope.row.JDStatus==='未到账' ? 'tipWait' : 'tipError'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" align="center" label="确认时间">
              </el-table-column>
              <el-table-column prop="person" align="center" label="操作人">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sellerRecharge',
  data () {
    return {
      value3: '',
      input6: '',
      activeName2: 'first',
      input5: '',
      currentPage: 1,
      pageSize: 5,
      totalCount: 0,
      tableData: [{
        payWater: '55616156156156156',
        phone: '18655554444',
        payNum: '100.00',
        remark: '备注一下',
        collectionBank: '545565695685856',
        moneyBank: '186669985665687',
        creatTime: '2017-11-15 20:30:30'
      }],
      tableDataBuy: [{
        orderTask: '55616156156156156',
        phone: '18655554444',
        moneyNum: '100.00',
        remark: '备注一下',
        sBank: '545565695685856',
        dBank: '186669985665687',
        JDStatus: '已到账',
        time: '2017-11-15 20:30:30',
        person: '展示'
      }]
    }
  },
  created () {
    this.sercherOne(1, this.pageSize)
  },
  methods: {
    handleClick (val) {
      this.$confirm('此操作将确认卖家充值到账, 是否继续?', '确认卖家充值到账?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$ajax.post('/api/sellerorder/updateApplysPass', {
        }).then((data) => {
          console.log(data)
          let res = data.data
          this.totalCount = res.data.totalCount
          if (res.code === '200') {
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch(() => {
          this.$message.error('网络错误，刷新下试试')
        })
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
      })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.sercherOne(1, val)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.sercherOne(val, this.pageSize)
    },
    handleNoClick (val) {
      this.$confirm('此操作将确认卖家充值未到账, 是否继续?', '确认卖家充值未到账?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
      }).catch(() => {
      })
    },
    // 卖家充值申请的列表
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/sellerorder/getChargeApplysByConditions', {
        statusList: ['0'],
        pageNo: pageNo,
        pageSize: pageSize
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.chargeApplys) {
            let goods = {
              payWater: word.chargeApplyId,
              phone: word.sellerTelephone,
              payNum: word.chargeAmount,
              remark: word.memo,
              collectionBank: word.platformBankCardNo,
              moneyBank: word.sellerBankCardNo,
              creatTime: word.gmtCreate
            }
            arr.push(goods)
          }
          this.tableData = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
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
    .top
      width 280px
      margin-left 70%
    .line
      height 1px
      background rgba(229, 229, 229, 1)
      margin-top 24px
    .second_top
      margin-top 20px
      width 100%
      overflow hidden
      .Stime
        float left
        margin-right 30px
      .search
        width 280px
        float left
      .excel
        float right
</style>