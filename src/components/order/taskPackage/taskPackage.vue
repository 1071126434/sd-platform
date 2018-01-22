<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" @tab-click="handleClickTab">
        <div class="top">
          <div class="purple_2">
            <div class="grid-content bg-purple">
              做单时间:
              <el-autocomplete style="windth:240px;height:32px" disabled class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false"></el-autocomplete>
            </div>
          </div>
          <div class="midd">
            <span class="work">做单渠道: </span>&nbsp;&nbsp; &nbsp;
            <el-checkbox-group v-model="checkList" @change="changeCheckbox">
              <el-checkbox label='1,2'>天猫/淘宝</el-checkbox>
              <el-checkbox label="0">京东</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="content">
            <el-button type="primary" @click="exportData(applyIdsNumChoose)">确认派发</el-button>
          </div>
        </div>
        <div class="middle">
          <span>预计做单组团数:
            <i>34</i>
          </span>
          <span>预计做单人数:
            <i>34</i>
          </span>
        </div>
        <!-- 内容列表展示 -->
        <div class="accountTab">
          <el-table :data="tableDataBuy" style="width: 100%" @select="handSelect" @select-all="selectAll">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="sellerTaskId" align="center" label="编号">
            </el-table-column>
            <el-table-column prop="productOrderPrice" align="center" label="实际下单金额" sortable>
            </el-table-column>
            <el-table-column prop="moneyType" align="center" label="剩余单数" sortable>
            </el-table-column>
            <el-table-column prop="bankNum" align="center" label="领取组团数" sortable>
            </el-table-column>
            <el-table-column prop="comment" align="center" label="任务备注">
            </el-table-column>
            <el-table-column prop="isPlus" align="center" label="是否需要Plus">
            </el-table-column>
            <el-table-column prop="isOnlyDiamond" align="center" label="是否需要钻石">
            </el-table-column>
            <el-table-column prop="isOnlyHuabei" align="center" label="是否开通花呗">
            </el-table-column>
            <el-table-column prop="shopName" align="center" label="店铺">
            </el-table-column>
            <el-table-column prop="productName" align="center" label="商品标题">
            </el-table-column>
            <el-table-column prop="productSecondClassDetail" align="center" label="三级类目">
            </el-table-column>
          </el-table>
          <div class="line"></div>
          <div class="moneyNum">
            <!-- <p class="number">实际金额 :
              <span style="color:#ff3341">{{moneyNumber}}</span>
            </p> -->
            <!-- <el-button @click="allSure(applyIdsNumChoose)">批量确认</el-button> -->
          </div>
        </div>
        <!-- <Nocont v-if="this.tableDataBuy.length===0"></Nocont> -->

        <!-- 分页 -->
        <!-- <div class="pager" style="clear:both" v-if="showPager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div> -->
      </el-tabs>
    </header>
    <!-- 点击确认派发之后触发的弹框 -->
    <el-dialog title="派单确认" :visible.sync="dialogTableVisible" :modal-append-to-body='false'>
      <div class="head">
        <p>本任务包最大订单数:34</p>
        <p>可接组团数:34</p>
        <p>可接人数:34</p>
      </div>
      <div class="midd">
        <p>请输入您希望消耗的订单数
        </p>
        <p class="mit">
          <el-input v-model="input"></el-input>
        </p>
        <span>已选中:34人</span>
      </div>
      <div class="red"></div>
      <!-- 数据展示部分 -->
      <el-table :data="tableDataBuy" style="width: 100%" @select="handSelect" @select-all="selectAll" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="phone" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="moneyNum" align="center" label="手机号">
        </el-table-column>
        <el-table-column prop="moneyType" align="center" label="所在省">
        </el-table-column>
        <el-table-column prop="bankNum" align="center" label="组团编号">
        </el-table-column>
        <el-table-column prop="bank" align="center" label="标识">
        </el-table-column>
        <el-table-column prop="name" align="center" label="未确认收货金">
        </el-table-column>
        <el-table-column prop="time" align="center" label="上次登陆时间">
        </el-table-column>
      </el-table>
      <div class="line"></div>
      <div class="moneyNum">
        <el-button @click="allSure(applyIdsNumChoose)">批量确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import Nocont from '../../../base/noCont/noCont'
export default {
  name: 'buyerApply',
  components: {
    Nocont
  },
  data () {
    return {
      state2: ((new Date()).toLocaleDateString()).replace(/\//g, '-'),
      input: '',
      checkList: [],
      activeName2: 'first',
      value1: '',
      value3: '',
      value4: '',
      input5: '',
      currentPage: 1,
      totalCount: 0,
      isIndeterminate: true,
      pageSize: 5,
      bankList: [],
      bankName: '',
      tableDataBuy: [],
      tableDataBuyList: [],
      dialogFormVisible: false,
      dialogFormVisible_1: false,
      dialogFormVisible_2: false,
      withdrawApply_1: '',
      withdrawApply_2: '',
      formName: '',
      formNo: '',
      // 将选中的值存在一个数组里面
      applyIdsNum: [],
      dialogFormBank: false,
      dialogFormBankOne: false,
      withdrawApply_sure: '',
      // 用来判断是否导出就进行提现的问题
      applyIdsNumChoose: [],
      // 钱的数量
      moneyNumber: 0,
      // 批量导出的时候暂不处理的不给导出处理
      point_1: '',
      point_2: '',
      // gridData: [{
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }, {
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   address: '上海市普陀区金沙江路 1518 弄'
      // }],
      dialogTableVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userToken']),
    showPager: function () {
      if (this.activeName2 === 'first' && this.tableDataBuy.length !== 0) {
        return true
      } else if (this.activeName2 === 'second' && this.tableDataBuyList.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    // this.buyerData(1, this.pageSize)
    // this.bankLists()
  },
  methods: {
    handleClickTab () {
      if (this.activeName2 === 'first') {
        // this.buyerData(1, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.buyerDataList(1, this.pageSize)
      }
    },
    // 单个选触发的事件
    handSelect (index, val) {
      // console.log(index, val)
      let arr = []
      let arr1 = []
      for (let word of index) {
        let goods = {
          state: word.state,
          applyIds: word.withdrawApplyId,
          state1: word.state1
        }
        arr.push(goods.applyIds)
        arr1.push(goods)
      }
      this.applyIdsNum = arr
      this.applyIdsNumChoose = arr1
      let abc = 0
      for (var i = 0; i < index.length; i++) {
        abc += (index[i].moneyNum - 0)
      }
      this.moneyNumber = abc.toFixed(2)
    },
    // 全选触发的事件
    selectAll (val) {
      let arr = []
      let arr1 = []
      for (let word of val) {
        let goods = {
          state: word.state,
          applyIds: word.withdrawApplyId,
          state1: word.state1
        }
        arr.push(goods.applyIds)
        arr1.push(goods)
      }
      this.applyIdsNum = arr
      this.applyIdsNumChoose = arr1
      let abc = 0
      for (var i = 0; i < val.length; i++) {
        abc += (val[i].moneyNum - 0)
      }
      this.moneyNumber = abc.toFixed(2)
    },
    // 当点击单个的时候 的暂不处理 触发
    handleClick (tab) {
      this.withdrawApply_1 = tab.withdrawApplyId
      this.dialogFormVisible_1 = true
    },
    sure_1 () {
      this.$ajax.post('/api/withdrawApply/updateApplysStop', {
        comment: this.formName,
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: [this.withdrawApply_1]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible_1 = false
          // this.buyerData(1, this.pageSize)
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
    // 当操作单个驳回的结束
    // 当点击单个进行处理的操作
    handleClicking (tab) {
      this.$ajax.post('/api/withdrawApply/updateApplysRestart', {
        comment: '',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: [tab.withdrawApplyId]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          // this.buyerData(1, this.pageSize)
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
    // 当点击单个进行处理的结束

    // 当点击单个进行确认的时候开始
    handleClickPass (val) {
      this.dialogFormBankOne = true
      this.withdrawApply_sure = val.withdrawApplyId
    },
    sureBankOne () {
      this.$ajax.post('/api/withdrawApply/updateApplysPass', {
        comment: '本金提现',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: [this.withdrawApply_sure],
        platformBankCardId: this.bankName
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormBankOne = false
          // this.buyerData(1, this.pageSize)
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
    // 当点击单个进行确认结束
    // 单个取消的开始
    handleClickNoPass (val) {
      this.withdrawApply_2 = val.withdrawApplyId
      this.dialogFormVisible_2 = true
    },
    sure_2 () {
      this.$ajax.post('/api/withdrawApply/updateApplysReject', {
        comment: this.formNo,
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: [this.withdrawApply_2]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible_2 = false
          // this.buyerData(1, this.pageSize)
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
    // 单个取消的结束
    handleSizeChange (val) {
      if (this.activeName2 === 'first') {
        // this.buyerData(1, val)
      } else if (this.activeName2 === 'second') {
        this.buyerDataList(1, val)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName2 === 'first') {
        // this.buyerData(val, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.buyerDataList(val, this.pageSize)
      }
    },
    // 当进入页面进行展示的部分
    changeCheckbox () {
      this.$ajax.post('/api/seller/taskSearch/getDayTaskList', {
        day: this.state2,
        shopType: (this.checkList).join(',')
      }).then((data) => {
        console.log(data)
        let res = data.data
        // this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          // if (res.data) {
          for (let word of res.data) {
            let goods = {
              sellerTaskId: word.sellerTaskId,
              productOrderPrice: word.productOrderPrice,
              // 剩余单数(无)
              // 领取组团数(无)
              comment: word.comment,
              isPlus: word.isPlus === '0' ? '否' : word.isPlus === '1' ? '是' : '--',
              isOnlyDiamond: word.isOnlyDiamond === '0' ? '否' : word.isOnlyDiamond === '1' ? '是' : '--',
              isOnlyHuabei: word.isOnlyHuabei === '0' ? '否' : word.isOnlyHuabei === '1' ? '是' : '--',
              shopName: word.shopName,
              productName: word.productName,
              productSecondClassDetail: word.productSecondClassDetail
            }
            arr.push(goods)
          }
          // }
          this.tableDataBuy = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error('网络错误，刷新下试试')
      })
    },
    // 当进入第二个请求的部分
    // 当进入页面进行展示的部分
    buyerDataList () {
      this.$ajax.post('/api/withdrawApply/getApplysByConditions', {
        statusList: ['1', '2'],
        startTime: this.value3 ? this.value3[0] : '',
        endTime: this.value3 ? this.value3[1] : '',
        buyerTelephoneOrName: this.input5
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.withdrawApplys) {
            let goods = {
              orderTask: word.withdrawApplyId,
              phone: word.userTelephone,
              moneyNum: word.actualAmount,
              remark: word.withdrawType === '0' ? '本金提现' : '提前支取',
              JDStatus: word.status === '1' ? '成功' : '失败',
              sBank: word.bankName + word.userName + word.bankCardNo,
              dBank: word.platformBankCardName || '--',
              time: word.gmtModify,
              person: word.modifiedOperaterName
            }
            arr.push(goods)
          }
          this.tableDataBuyList = arr
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
    allSure (val) {
      if (val.length === 0) {
        this.$message({
          message: '请至少选择一条数据进行操作',
          type: 'warning'
        })
        return false
      }
      for (var i = 0; i < val.length; i++) {
        if (val[i].state === '未导出') {
          this.$message({
            message: '请先进行导出再批量确认',
            type: 'warning'
          })
          return false
        } else {
          this.dialogFormBank = true
        }
      }
    },
    // 批量进行通过提现部分
    sureBank () {
      this.$ajax.post('/api/withdrawApply/updateApplysPass', {
        comment: '',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: this.applyIdsNum,
        platformBankCardId: this.bankName
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormBank = false
          // this.buyerData(1, this.pageSize)
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
    // 当点击确认派发触发的事件
    exportData (val) {
      this.dialogTableVisible = true
      console.log(val)
      let params = (this.applyIdsNum).join(',')
      if (this.applyIdsNum.length === 0) {
        this.$message({
          message: '请至少选择一条数据',
          type: 'warning'
        })
        return false
      }
      // bug修改部分 暂未进行处理
      for (var i = 0; i < val.length; i++) {
        if (val[i].state === '未导出' && val[i].state1 === '1') {
          this.$message({
            message: '请注意,暂不处理的数据不能进行导出',
            type: 'warning'
          })
          return false
        }
      }
      window.open('/api/file/buyerWithdrawList?list=' + params)
      this.allState()
      this.applyIdsNum = []
      // let params = (this.applyIdsNum).join(',')
      // this.$ajax.get('/api/file/buyerWithdrawList?list=' + params, {
      //   }).then((data) => {
      //     window.open('http://182.61.29.51:8089/file/downloadTodayTaskFile')
      //     this.allState()
      //   }).catch(() => {
      //     this.$message.error('网络错误，刷新下试试')
      //   })
    },
    // 批量导出的状态修改
    allState () {
      this.$ajax.post('/api/withdrawApply/updateApplysExport', {
        comment: '',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: this.applyIdsNum
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible = false
          // this.buyerData(1, this.pageSize)
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
    // 批量通过审批的接口
    morePass () {
      this.$ajax.post('/api/withdrawApply/updateApplysPass', {
        comment: '',
        operateUserAccountId: this.userInfo.operateUserAccountId,
        operateUserName: this.userInfo.userName,
        applyIds: this.applyIdsNum
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogFormVisible = false
          // this.buyerData(1, this.pageSize)
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
    // 日期的筛选
    blur () {
      // this.buyerData(1, this.pageSize)
    },
    search () {
      this.buyerDataList(1, this.pageSize)
    },
    // 获取银行卡列表
    bankLists () {
      this.$ajax.post('/api/config/bankCard/getListByType', {
        type: 0
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          if (res.data) {
            for (let word of res.data) {
              let goods = {
                bankName: word.bankName,
                cardNo: word.cardNo,
                userName: word.userName,
                bankCarId: word.bankCardId
              }
              arr.push(goods)
            }
          }
          this.bankList = arr
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
  min-width 1200px
  header
    background rgba(255, 255, 255, 1)
    padding 20px
    overflow hidden
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
      display flex
      justify-content space-between
      .purple_2
        margin-top -12px
        margin-left 12px
        color rgba(51, 51, 51, 1)
        font-size 14px
      .midd
        margin-left -40%
        .work
          margin-top 3px
      .content
        margin-top -12px
    .middle
      margin-top 12.5px
      padding-left 10px
    .line
      height 1px
      background #E5E5E5
      margin-top 2rem
    .moneyNum
      float right
      margin-top 2rem
      padding-bottom 2rem
      color #333333
      font-size 1.4rem
      .number
        float left
        margin-top 1.2rem
        margin-right 0.5rem
  .head
    display flex
    justify-content space-between
    border-top 1px solid #ccc
    padding-top 20px
    padding-bottom 10px
  .midd
    display flex
    justify-content space-between
    .mit
      margin-left -60%
  .red
    position absolute
    width 17px
    height 35px
    background #ffffff
    left 33px
    top 175px
    z-index 555
</style>