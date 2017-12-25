<template>
  <div class="wrap">
    <header>
      <h4>第一步</h4>
      <div class="btn" @click="downLoad">下载今日任务列表</div>
      <h4 class="two">第二步 任务分配</h4>
      <el-row :gutter="10">
        <el-col :span="7" style="border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple">
            <h5>任务一</h5>
            <el-input v-model="input_1" placeholder="请输入内容" style="width:90%;margin-top:8px" @blur="taskOne">
            </el-input>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>{{taskData.leftNum||0}}</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>{{taskData.sprice||0}}</span>元
            </div>
          </div>
        </el-col>
        <el-col :span="7" style=" border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple ">
            <h5>任务二</h5>
            <el-input v-model="input_2" placeholder="请输入内容" style="width:90%;margin-top:8px" @blur="taskTwo"></el-input>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>{{taskData_1.leftNum||0}}</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>{{taskData_1.sprice||0}}</span>元
            </div>
          </div>
        </el-col>
        <el-col :span="7" style="border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class=" grid-content bg-purple ">
            <h5>任务三</h5>
            <el-input v-model="input_3 " placeholder="请输入内容 " style="width:90%;margin-top:8px " @blur="taskThree"></el-input>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>{{taskData_2.leftNum||0}}</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>{{taskData_2.sprice||0}}</span>元
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="7" style="border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple ">
            <h5>任务四</h5>
            <el-input v-model="input_4" placeholder="请输入内容" style="width:90%;margin-top:8px" @blur="taskFour"></el-input>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>{{ taskData_3.leftNum||0 }}</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>{{ taskData_3.sprice||0 }}</span>元
            </div>
          </div>
        </el-col>
        <el-col :span="7" style=" border:1px solid rgba(0,0,0,0.2);margin-top:32px;margin-right:24px">
          <div class="grid-content bg-purple ">
            <h5>任务五</h5>
            <el-input v-model="input_5" placeholder="请输入内容" style="width:90%;margin-top:8px" @blur="taskFive"></el-input>
            <div class="Surtask">
              <p>剩余任务量</p>
              <span>{{taskData_4.leftNum||0}}</span>单
            </div>
            <div class="surMoney">
              <p>剩余任务金额</p>
              <span>{{taskData_4.sprice||0}}</span>元
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="line"></div>
      <div class="bottom">
        <div class="bottom_money">包单金额:&nbsp;&nbsp;
          <span style="color:black;font-weight:600">{{this.totalAdd||0}}</span>元</div>
        <el-button type="primary" style="margin-top:16px" @click="sureChoose">确认筛选</el-button>
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
          <el-table-column prop="messg" label="管理员手机号" align="center">
          </el-table-column>
          <el-table-column prop="plus" label="Plus状态" align="center">
          </el-table-column>
          <el-table-column prop="date" label="会员到期日" align="center">
          </el-table-column>
          <el-table-column prop="city" label="收货城市" align="center">
          </el-table-column>
          <el-table-column prop="money" label="京东本月累计金额" align="center">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small" :disabled="waiteing">待分发</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Nocont v-if="this.tableData.length===0"></Nocont>
      </div>

      <div class="pager" v-if="this.tableData.length!==0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </header>
  </div>
</template>
<script type="text/ecmascript-6">
import Nocont from '../../../base/noCont/noCont'
export default {
  name: 'orderManger',
  components: {
    Nocont
  },
  data () {
    return {
      currentPage: 1,
      disabled: true,
      totalCount: 0,
      input_1: '',
      input_2: '',
      input_3: '',
      input_4: '',
      input_5: '',
      taskData: {},
      taskData_1: {},
      taskData_2: {},
      taskData_3: {},
      taskData_4: {},
      pageSize: 5,
      checked: false,
      tableData: [],
      apiUrl: '/api/buyerAccount/getSelectableBuyerUserInfo',
      waiteing: false,
      isJDPlus: ''
    }
  },
  // 此数据用计算属性来处理
  computed: {
    sendArr: function () {
      let arr = []
      if (this.input_1 !== '') {
        arr.push(this.input_1)
      }
      if (this.input_2 !== '') {
        arr.push(this.input_2)
      }
      if (this.input_3 !== '') {
        arr.push(this.input_3)
      }
      if (this.input_4 !== '') {
        arr.push(this.input_4)
      }
      if (this.input_5 !== '') {
        arr.push(this.input_5)
      }
      return arr
    },
    totalAdd: function () {
      let number = 0
      if (this.taskData.sprice) {
        number += this.taskData.sprice
      }
      if (this.taskData_1.sprice) {
        number += this.taskData_1.sprice
      }
      if (this.taskData_2.sprice) {
        number += this.taskData_2.sprice
      }
      if (this.taskData_3.sprice) {
        number += this.taskData_3.sprice
      }
      if (this.taskData_4.sprice) {
        number += this.taskData_4.sprice
      }
      return number
    }
  },
  methods: {
    reset () {
      this.value = ''
    },
    handleClick (index, seller) {
      this.waiteing = true
      this.$ajax.post('/api/order/packageAssign', {
        sellerTaskIds: this.sendArr,
        plusType: this.isJDPlus,
        buyerUserId: seller.sellerUserId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            type: 'sucess',
            message: '分发成功'
          })
          this.waiteing = false
          this.getDatas(1, this.pageSize)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    handleSizeChange (val) {
      this.getDatas(1, val)
    },
    handleCurrentChange (val) {
      this.getDatas(val, this.pageSize)
    },
    downLoad () {
      window.open('/api/file/downloadTodayTaskFile')
      // this.$ajax.get('/api/file/downloadTodayTaskFile', {
      // }).then((data) => {
      //   // window.open('http://182.61.29.51:8089/file/downloadTodayTaskFile')
      // }).catch((err) => {
      //   this.$message.error(err)
      // })
    },
    // 当点击确认校验的时候触发的事件
    sureChoose () {
      if (this.input_1 === '' && this.input_2 === '' && this.input_3 === '' && this.input_4 === '' && this.input_5 === '') {
        this.$message({
          type: 'warning',
          message: '操作失败,请至少添加一条任务!'
        })
        return false
      }
      // 后台校验输入的数据是否正确
      this.$ajax.post('/api/seller/taskSearch/checkSellerTasksDuplicate', {
        sellerTaskIds: this.sendArr
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.isJDPlus = res.data.isJDPlus
          // 校验无误的时候开始筛选列表
          this.getDatas(1, this.pageSize)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 当点击确认筛选的时候进行买家的筛选
    getDatas (pageNo, pageSize) {
      this.$ajax.post('/api/buyerAccount/getSelectableBuyerUserInfo', {
        pageNo: pageNo,
        pageSize: pageSize,
        sellerTaskIds: this.sendArr,
        type: 'JD',
        isPlus: this.isJDPlus
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.buyerUsers) {
            let obj = {
              name: word.userName,
              phone: word.telephone,
              wchat: word.wechatNum || '暂无数据',
              messg: word.operaterTelephone,
              plus: this.isJDPlus === '0' ? '--' : '正式会员',
              // 用来截取 只获取年月日
              date: word.jdPlusEndDate ? word.jdPlusEndDate.split(' ')[0] : '--',
              city: word.postCity,
              money: word.jdMonthIncome || '暂无数据',
              sellerUserId: word.buyerUserAccountId
            }
            arr.push(obj)
          }
          this.tableData = arr
          if (this.tableData.length === 0) {
            this.$message({
              type: 'warning',
              message: '暂无匹配的买家'
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 任务一失焦的时候请求对应的接口
    taskOne () {
      if (this.input_1 === '') {
        this.taskData = {}
        return false
      }
      if (this.input_2 === this.input_1 || this.input_3 === this.input_1 || this.input_4 === this.input_1 || this.input_5 === this.input_1) {
        this.$message({
          type: 'warning',
          message: '该任务编号添加失败,请仔细核对!'
        })
        this.input_1 = ''
        return false
      }
      this.$ajax.post('/api/seller/taskSearch/getTodayTaskDayBySellerTaskIds', {
        sellerTaskIds: [this.input_1]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let obj = {
            leftNum: res.data[0].leftNum,
            sprice: res.data[0].price,
            sellerTaskDayId: res.data[0].sellerTaskDayId,
            sellerTaskId: res.data[0].sellerTaskId
          }
          this.taskData = obj
          if (obj.leftNum <= 0) {
            this.$message({
              type: 'warning',
              message: '该任务当天余量为0,请更换任务'
            })
          }
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    taskTwo () {
      if (this.input_2 === '') {
        this.taskData_1 = {}
        return false
      }
      if (this.input_3 === this.input_2 || this.input_4 === this.input_2 || this.input_5 === this.input_2 || this.input_1 === this.input_2) {
        this.$message({
          type: 'warning',
          message: '该任务编号添加失败,请仔细核对!'
        })
        this.input_2 = ''
        return false
      }
      this.$ajax.post('/api/seller/taskSearch/getTodayTaskDayBySellerTaskIds', {
        sellerTaskIds: [this.input_2]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let obj = {
            leftNum: res.data[0].leftNum,
            sprice: res.data[0].price,
            sellerTaskDayId: res.data[0].sellerTaskDayId,
            sellerTaskId: res.data[0].sellerTaskId
          }
          this.taskData_1 = obj
          if (obj.leftNum <= 0) {
            this.$message({
              type: 'warning',
              message: '该任务当天余量为0,请更换任务'
            })
          }
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    taskThree () {
      if (this.input_3 === '') {
        this.taskData_2 = {}
        return false
      }
      if (this.input_4 === this.input_3 || this.input_5 === this.input_3 || this.input_1 === this.input_3 || this.input_2 === this.input_3) {
        this.$message({
          type: 'warning',
          message: '该任务编号添加失败,请仔细核对!'
        })
        this.input_3 = ''
        return false
      }
      this.$ajax.post('/api/seller/taskSearch/getTodayTaskDayBySellerTaskIds', {
        sellerTaskIds: [this.input_3]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let obj = {
            leftNum: res.data[0].leftNum,
            sprice: res.data[0].price,
            sellerTaskDayId: res.data[0].sellerTaskDayId,
            sellerTaskId: res.data[0].sellerTaskId
          }
          this.taskData_2 = obj
          if (obj.leftNum <= 0) {
            this.$message({
              type: 'warning',
              message: '该任务当天余量为0,请更换任务'
            })
          }
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    taskFour () {
      if (this.input_4 === '') {
        this.taskData_3 = {}
        return false
      }
      if (this.input_1 === this.input_4 || this.input_4 === this.input_2 || this.input_4 === this.input_3 || this.input_5 === this.input_4) {
        this.$message({
          type: 'warning',
          message: '该任务编号添加失败,请仔细核对!'
        })
        this.input_4 = ''
        return false
      }
      this.$ajax.post('/api/seller/taskSearch/getTodayTaskDayBySellerTaskIds', {
        sellerTaskIds: [this.input_4]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let obj = {
            leftNum: res.data[0].leftNum,
            sprice: res.data[0].price,
            sellerTaskDayId: res.data[0].sellerTaskDayId,
            sellerTaskId: res.data[0].sellerTaskId
          }
          this.taskData_3 = obj
          if (obj.leftNum <= 0) {
            this.$message({
              type: 'warning',
              message: '该任务当天余量为0,请更换任务'
            })
          }
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    taskFive () {
      if (this.input_5 === '') {
        this.taskData_4 = {}
        return false
      }
      if (this.input_1 === this.input_5 || this.input_5 === this.input_2 || this.input_5 === this.input_3 || this.input_5 === this.input_4) {
        this.$message({
          type: 'warning',
          message: '该任务编号添加失败,请仔细核对!'
        })
        this.input_5 = ''
        return false
      }
      this.$ajax.post('/api/seller/taskSearch/getTodayTaskDayBySellerTaskIds', {
        sellerTaskIds: [this.input_5]
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let obj = {
            leftNum: res.data[0].leftNum,
            sprice: res.data[0].price,
            sellerTaskDayId: res.data[0].sellerTaskDayId,
            sellerTaskId: res.data[0].sellerTaskId
          }
          this.taskData_4 = obj
          if (obj.leftNum <= 0) {
            this.$message({
              type: 'warning',
              message: '该任务当天余量为0,请更换任务'
            })
          }
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 20px
  min-width 900px
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