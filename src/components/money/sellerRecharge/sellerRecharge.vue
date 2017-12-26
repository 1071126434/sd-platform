<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" @tab-click="handleClicks">
        <el-tab-pane label="商家充值申请" name="first">
          <div class="top">
            <el-select placeholder="收款卡卡号" v-model="input5" class="input-with-select" value-key="bankCardId">
              <el-option v-for="(input5,index) in options" :key="index" :label="input5.cardNo" :value="input5">
              </el-option>
            </el-select>
            <el-button type="primary" slot="append" icon="el-icon-search" @click="searchBankNum"></el-button>
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
                  <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">确认到账</el-button>
                  <el-button @click="handleNoClickNo(scope.$index, scope.row)" type="text" size="small">未到账</el-button>
                </template>
              </el-table-column>
            </el-table>
            <noCont v-if="this.tableData.length===0"></noCont>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商家充值记录" name="second">
          <div class="second_top">
            <div class="Stime">
              申请时间：
              <el-date-picker v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd' format='yyyy-MM-dd'>
              </el-date-picker>
            </div>
            <div class="search">
              <el-input placeholder="请输入手机号" v-model="input6" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchTime"></el-button>
              </el-input>
            </div>
            <!-- <div class="excel">
              <el-button>导出excel</el-button>
            </div> -->
          </div>
          <!-- 展示内容部分 -->
          <div class="accountTab">
            <el-table :data="tableDataBuy" style="width: 100%">
              <el-table-column prop="orderTask" align="center" label="充值流水号">
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
                  <span class="tipSmall" :class="scope.row.JDStatus==='已到账' ? 'tipSuccess' : scope.row.JDStatus==='未到账' ? 'tipError' : 'tipDoing'">{{scope.row.JDStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" align="center" label="确认时间">
              </el-table-column>
              <el-table-column prop="person" align="center" label="操作人">
              </el-table-column>
            </el-table>
          </div>
          <noCont v-if="this.tableDataBuy.length===0"></noCont>
        </el-tab-pane>
        <!-- <noCont v-if="this.tableDataBuy.length===0"></noCont> -->
        <div class="pager" v-if="noContPage">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
import noCont from '../../../base/noCont/noCont'
export default {
  name: 'sellerRecharge',
  components: {
    noCont
  },
  data () {
    return {
      value3: '',
      input6: '',
      activeName2: 'first',
      input5: '',
      currentPage: 1,
      pageSize: 5,
      totalCount: 0,
      tableData: [],
      options: [],
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
  computed: {
    noContPage: function () {
      if (this.activeName2 === 'first' && this.tableData.length !== 0) {
        return true
      } else if (this.activeName2 === 'second' && this.tableDataBuy.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.sercherOne(1, this.pageSize)
    this.platformBankNum()
  },
  methods: {
    handleClicks () {
      if (this.activeName2 === 'first') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(1, this.pageSize)
      }
    },
    // 卖家充值申请的搜索
    searchBankNum () {
      this.sercherOne(1, this.pageSize)
    },
    // 卖家充值记录的搜索
    searchTime () {
      this.sellerRecord(1, this.pageSize)
    },
    handleClick (val) {
      this.$confirm('此操作将确认卖家充值到账, 是否继续?', '确认卖家充值到账?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$ajax.post('/api/sellerorder/updateApplysPass', {
          sellerChargeApplyIds: [this.tableData[val].chargeApplyId],
          platformBankCardId: this.input5
        }).then((data) => {
          let res = data.data
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.sercherOne(1, this.pageSize)
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch(() => {
          this.$message.error('网络错误，刷新下试试')
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSizeChange (val) {
      if (this.activeName2 === 'first') {
        this.sercherOne(1, val)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(1, val)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName2 === 'first') {
        this.sercherOne(val, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(val, this.pageSize)
      }
    },
    handleNoClickNo (val) {
      this.$confirm('此操作将确认卖家充值未到账, 是否继续?', '确认卖家充值未到账?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/sellerorder/updateApplysReject', {
          sellerChargeApplyIds: [this.tableData[val].chargeApplyId]
        }).then((data) => {
          let res = data.data
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.sercherOne(1, this.pageSize)
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch(() => {
          this.$message.error('网络错误，刷新下试试')
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 卖家充值申请
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/sellerorder/getChargeApplysByConditions', {
        statusList: ['0'],
        pageNo: pageNo,
        pageSize: pageSize,
        platformBankCardId: this.input5.bankCardId
      }).then((data) => {
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
              creatTime: word.gmtCreate,
              chargeApplyId: word.chargeApplyId
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
    },
    // 卖家充值记录
    sellerRecord (pageNo, pageSize) {
      this.$ajax.post('/api/sellerorder/getChargeApplysByConditions', {
        statusList: ['1', '2'],
        pageNo: pageNo,
        pageSize: pageSize,
        startTime: this.value3 ? this.value3[0] : '',
        endTime: this.value3 ? this.value3[1] : '',
        sellerTelephoneOrName: this.input6
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.chargeApplys) {
            let goods = {
              phone: word.sellerTelephone,
              moneyNum: word.chargeAmount,
              remark: word.memo,
              sBank: word.platformBankCardNo,
              dBank: word.sellerBankCardNo,
              creatTime: word.gmtCreate,
              orderTask: word.chargeApplyId,
              JDStatus: word.status === '2' ? '未到账' : word.status === '1' ? '已到账' : '进行中',
              time: word.gmtModify,
              person: word.sellerBankCardUserName
            }
            arr.push(goods)
          }
          this.tableDataBuy = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
    },
    // 获取收款卡的卡号
    platformBankNum () {
      this.$ajax.post('/api/config/bankCard/getListByType', {
        type: 0
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          if (res.data) {
            for (let word of res.data) {
              let goods = {
                bankCardId: word.bankCardId,
                cardNo: word.cardNo
              }
              arr.push(goods)
            }
          }
          this.options = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('未知错误！')
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 20px
  min-width 1000px
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