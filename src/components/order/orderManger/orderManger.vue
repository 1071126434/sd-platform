<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" @tab-click="handleClicks">
        <ul class="search getOrder">
          <li>
            派单时间&nbsp; &nbsp;
            <el-date-picker v-model="value6" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </li>
          <li>
            管理员&nbsp; &nbsp;
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            管理员微信号&nbsp; &nbsp;
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <ul class="search_1 getOrder">
          <li>
            <span class="status">状态</span>&nbsp; &nbsp;
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary" @click="searchBtn">查询</el-button>
          </li>
        </ul>
        <el-tab-pane label="未联系" name="first">
          <div class="accountTab">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed type="index" width="50" label="编号">
              </el-table-column>
              <el-table-column prop="date" label="任务包编号" width="120">
              </el-table-column>
              <el-table-column prop="name" label="任务包状态" width="120">
              </el-table-column>
              <el-table-column prop="province" label="垫付总金额" width="120">
              </el-table-column>
              <el-table-column prop="city" label="预计佣金" width="120">
              </el-table-column>
              <el-table-column prop="address" label="单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="剩余单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家手机号" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家微信备注" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="平台联系人" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="联系状态" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="派包时间" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">我已联系</el-button>
                  <el-button type="text" size="small">取消</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已联系" name="second">
          <!-- 展示内容部分 -->
          <div class="accountTab">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed type="index" width="50" label="编号">
              </el-table-column>
              <el-table-column prop="date" label="任务包编号" width="120">
              </el-table-column>
              <el-table-column prop="name" label="任务包状态" width="120">
              </el-table-column>
              <el-table-column prop="province" label="垫付总金额" width="120">
              </el-table-column>
              <el-table-column prop="city" label="预计佣金" width="120">
              </el-table-column>
              <el-table-column prop="address" label="单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="剩余单数" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家手机号" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="买家微信备注" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="平台联系人" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="联系状态" width="120">
              </el-table-column>
              <el-table-column prop="zip" label="派包时间" width="120">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
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
      value6: '',
      activeName2: 'first',
      input5: '',
      currentPage: 1,
      pageSize: 5,
      totalCount: 0,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金',
        zip: 200333
      }],
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
        this.$ajax.post('', {
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
        this.$ajax.post('', {
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
      this.$ajax.post('', {
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
      this.$ajax.post('', {
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
      this.$ajax.post('', {
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
  ::-webkit-scrollbar
    width 100%
    height 10px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    .search, .search_1
      display flex
      justify-content flex-start
      margin-top 20px
      li
        margin-right 20px
      .status
        margin-right 23px
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
    .accountTab
      margin-top 30px
</style>