<template>
  <div class="wrap">
    <header>
      <el-tabs v-model="activeName2" @tab-click="handleClicks">
        <ul class="search getOrder" v-if="activeName2==='first'||activeName2==='second'">
          <li>
            派单时间&nbsp; &nbsp;
            <el-date-picker v-model="value6" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='yyyy-MM-dd'>
            </el-date-picker>
          </li>
          <li>
            管理员&nbsp; &nbsp;
            <el-select v-model="value" placeholder="请选择" @change="adName">
              <el-option v-for="(item, index) in adminNameArr" :label="item.userName" :value="item.operateUserAccountId" :key="index"></el-option>
            </el-select>
          </li>
          <li>
            管理员微信号&nbsp; &nbsp;
            <el-select v-model="value1" placeholder="请选择">
              <el-option v-for="(item, index) in wechatArr" :label="item.wechatNum" :value="item.operateWechatId" :key="index"></el-option>
            </el-select>
          </li>
        </ul>
        <ul class="search_1 getOrder">
          <li v-if="activeName2==='first'||activeName2==='second'">
            <span class="status">状态</span>&nbsp; &nbsp;
            <el-select v-model="value2" placeholder="请选择">
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value2">
              </el-option>
            </el-select>
          </li>
          <li class="taskNumInput">
            <span class="status">任务包编号</span>&nbsp; &nbsp;
            <el-input v-model="taskNum" placeholder="请输入内容"></el-input>
          </li>
          <li style="margin-left:200px" v-if="activeName2==='first'||activeName2==='second'">
            <el-button type="primary" @click="searchBtn">查询</el-button>
          </li>
          <li style="margin-left:200px" v-if="activeName2==='three'">
            <el-button type="primary" @click="searchThree">查询</el-button>
          </li>
        </ul>
        <el-tab-pane label="任务管理" name="three">
          <!-- 展示内容部分 -->
          <div class="accountTab">
            <el-table :data="tableDataMess" border style="width: 100%">
              <el-table-column prop="platformPackageId" label="任务包编号" width="160" align="center">
              </el-table-column>
              <el-table-column prop="actualNum" label="总任务数" width="120" align="center">
              </el-table-column>
              <el-table-column prop="actualNumIng" label="已领取任务数" width="120" align="center">
                <template slot-scope="scope">
                  <span @click="jumper(scope.row.platformPackageId)">{{scope.row.actualNumIng}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="actualLeftNum" label="剩余任务数" width="120" align="center">
                <template slot-scope="scope">
                  <span @click="jumper_1(scope.row.platformPackageId)">{{scope.row.actualLeftNum}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <noCont v-if="this.tableDataBuy.length===0 "></noCont> -->
        </el-tab-pane>
        <el-tab-pane label="未联系" name="first">
          <div class="accountTab">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed type="index" width="50" label="编号" align="center">
              </el-table-column>
              <el-table-column prop="date" label="任务包编号" width="160" align="center">
              </el-table-column>
              <el-table-column prop="name" label="任务包状态" width="120" align="center">
              </el-table-column>
              <el-table-column prop="province" label="垫付总金额" width="120" align="center">
              </el-table-column>
              <el-table-column prop="city" label="预计佣金" width="120" align="center">
              </el-table-column>
              <el-table-column prop="address" label="单数" width="120" align="center">
              </el-table-column>
              <el-table-column prop="operaterUserName" label="剩余单数" width="120" align="center">
              </el-table-column>
              <el-table-column prop="buyName" label="买家姓名" width="120" align="center">
              </el-table-column>
              <el-table-column prop="buyPhone" label="买家手机号" width="120" align="center">
              </el-table-column>
              <el-table-column prop="comment" label="买家备注" width="120" align="center">
              </el-table-column>
              <el-table-column prop="platformOperaterName" label="平台联系人" width="120" align="center">
              </el-table-column>
              <el-table-column prop="contantStatus" label="联系状态" width="120" align="center">
              </el-table-column>
              <el-table-column prop="gmtModify" label="派包时间" width="120" align="center">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.name==='未领取'||scope.row.name==='已领取'" @click=" handleClick(scope.row) " type="text " size="small ">我已联系</el-button>
                  <el-button v-if="scope.row.name==='未领取'||scope.row.name==='已领取'" @click="handleNoClickNo(scope.row) " type="text " size="small ">撤销</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已联系" name="second">
          <!-- 展示内容部分 -->
          <div class="accountTab">
            <el-table :data="tableDataBuy" border style="width: 100%">
              <el-table-column fixed type="index" width="50" label="编号" align="center">
              </el-table-column>
              <el-table-column prop="date" label="任务包编号" width="160" align="center">
              </el-table-column>
              <el-table-column prop="name" label="任务包状态" width="120" align="center">
              </el-table-column>
              <el-table-column prop="province" label="垫付总金额" width="120" align="center">
              </el-table-column>
              <el-table-column prop="city" label="预计佣金" width="120" align="center">
              </el-table-column>
              <el-table-column prop="address" label="单数" width="120" align="center">
              </el-table-column>
              <el-table-column prop="operaterUserName" label="剩余单数" width="120" align="center">
              </el-table-column>
              <el-table-column prop="buyName" label="买家姓名" width="120" align="center">
              </el-table-column>
              <el-table-column prop="buyPhone" label="买家手机号" width="120" align="center">
              </el-table-column>
              <el-table-column prop="comment" label="买家微信备注" width="120" align="center">
              </el-table-column>
              <el-table-column prop="platformOperaterName" label="平台联系人" width="120" align="center">
              </el-table-column>
              <el-table-column prop="contantStatus" label="联系状态" width="120" align="center">
              </el-table-column>
              <el-table-column prop="gmtModify" label="派包时间" width="120" align="center">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.name==='未领取'||scope.row.name==='已领取'" @click=" handleClick(scope.row) " type="text " size="small ">我已联系</el-button>
                  <el-button v-if="scope.row.name==='未领取'||scope.row.name==='已领取'" @click="handleNoClickNo(scope.row) " type="text " size="small ">撤销</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <noCont v-if="this.tableDataBuy.length===0 "></noCont> -->
        </el-tab-pane>

        <!-- <noCont v-if="this.tableDataBuy.length===0 "></noCont> -->
        <div class="pager">
          <el-pagination @size-change="handleSizeChange " @current-change="handleCurrentChange " :current-page="currentPage " :page-sizes="[15, 30, 40, 50] " :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper " :total="totalCount ">
          </el-pagination>
        </div>
      </el-tabs>
    </header>
    <!-- 点击确认联系触发的弹框 -->
    <el-dialog title="确认联系" :visible.sync="dialogFormVisible_2 " :modal-append-to-body='false' width="36% " style="margin-top: 25vh ">
      <el-radio v-model="radio" label="已联系做单立马做">已联系做单，立马做</el-radio><br>
      <el-radio v-model="radio" label="已联系做单晚点做">已联系做单，晚点做</el-radio><br>
      <el-radio v-model="radio" label="已联系未回信息">已联系，未回信息</el-radio><br>
      <el-radio v-model="radio" label="未联系">未联系</el-radio><br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_2=false">取 消</el-button>
        <el-button type="primary" @click="sure_2">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击撤销的弹框 -->
    <el-dialog title="撤销" :visible.sync="dialogFormVisible_1" :modal-append-to-body='false' width="36% " style="margin-top: 25vh">
      <el-radio v-model="radio1" label="已联系做单晚点做">已联系做单，不想做</el-radio><br>
      <el-radio v-model="radio1" label="已联系未回信息">已联系，未回信息</el-radio><br>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_1=false">取 消</el-button>
        <el-button type="primary" @click="sure_1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import noCont from '../../../base/noCont/noCont'
import { mapGetters } from 'vuex'
export default {
  name: 'sellerRecharge',
  components: {
    noCont
  },
  data () {
    return {
      adminNameArr: [],
      wechatArr: [],
      radio: '',
      radio1: '',
      value3: '',
      input6: '',
      value6: '',
      activeName2: 'three',
      value: '',
      value1: '',
      currentPage: 1,
      pageSize: 15,
      totalCount: 0,
      dialogFormVisible_2: false,
      dialogFormVisible_1: false,
      tableData: [],
      tableDataMess: [],
      taskNum: '',
      options: [{
        value2: '0',
        label: '未领取'
      }, {
        value2: '1',
        label: '已领取'
      }, {
        value2: '2',
        label: '已失效'
      }],
      value2: '',
      tableDataBuy: [],
      assignedUserId: ''
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
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.message(1, this.pageSize)
    this.adminName_1()
  },
  methods: {
    jumper (val) {
      this.activeName2 = 'second'
      this.taskNum = val
      this.sellerRecord(1, this.pageSize)
    },
    jumper_1 (val) {
      this.activeName2 = 'first'
      this.taskNum = val
      this.sercherOne(1, this.pageSize)
    },
    handleClicks () {
      this.value6 = ''
      this.value = ''
      this.value1 = ''
      this.value2 = ''
      this.taskNum = ''
      if (this.activeName2 === 'first') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(1, this.pageSize)
      } else if (this.activeName2 === 'three') {
        this.message(1, this.pageSize)
      }
    },
    // 卖家充值申请的搜索
    searchBtn () {
      if (this.activeName2 === 'first') {
        this.sercherOne(1, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(1, this.pageSize)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.activeName2 === 'first') {
        this.sercherOne(1, val)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(1, val)
      } else if (this.activeName2 === 'three') {
        this.message(1, val)
      }
    },
    handleCurrentChange (val) {
      if (this.activeName2 === 'first') {
        this.sercherOne(val, this.pageSize)
      } else if (this.activeName2 === 'second') {
        this.sellerRecord(val, this.pageSize)
      } else if (this.activeName2 === 'three') {
        this.message(val, this.pageSize)
      }
    },
    // 未联系
    sercherOne (pageNo, pageSize) {
      this.$ajax.post('/api/platformPackageAssign/getPackageAssignInfoByCondition', {
        startTime: this.value6 ? this.value6[0] : '',
        endTime: this.value6 ? this.value6[1] : '',
        operateUserAccountId: '',
        operaterWechatId: this.value1,
        status: this.value2,
        contactStatus: '0',
        limit: pageSize,
        currPageNo: pageNo,
        platformPackageId: this.taskNum
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.total
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.datas) {
            let goods = {
              date: word.platformPackageId,
              name: word.status === '0' ? '未领取' : word.status === '1' ? '已领取' : '已失效',
              province: word.totalCapital,
              city: word.totalCommission,
              address: word.totalTaskNum,
              // 对应管理员
              operaterUserName: word.undoneTaskNum,
              buyName: word.assignedUserName,
              buyPhone: word.assignedUserTelephone,
              comment: '--',
              // 买家信息
              platformOperaterName: word.platformOperaterName,
              contantStatus: word.comment || '--',
              gmtModify: word.gmtModify,
              assignedUserId: word.assignedUserId
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
    // 当点击我已联系触发事件
    handleClick (val) {
      this.dialogFormVisible_2 = true
      console.log(val)
      this.assignedUserId = val.assignedUserId
    },
    sure_2 () {
      this.$ajax.post('/api/platformPackageAssign/updatePackageAssignContactStatus', {
        contactStatus: '1',
        assignedUserId: this.assignedUserId,
        comment: this.radio
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogFormVisible_2 = false
          if (this.activeName2 === 'first') {
            this.sercherOne(1, this.pageSize)
          } else if (this.activeName2 === 'second') {
            this.sellerRecord(1, this.pageSize)
          }
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
    // 当点击撤销触发的事件
    handleNoClickNo (val) {
      this.dialogFormVisible_1 = true
      console.log(val)
      this.assignedUserId = val.assignedUserId
    },
    sure_1 () {
      this.$ajax.post('/api/platformPackageAssign/updatePackageAssignStatus', {
        status: '2',
        assignedUserId: this.assignedUserId,
        comment: this.radio1
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.dialogFormVisible_1 = false
          if (this.activeName2 === 'first') {
            this.sercherOne(1, this.pageSize)
          } else if (this.activeName2 === 'second') {
            this.sellerRecord(1, this.pageSize)
          }
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
    // 已联系
    sellerRecord (pageNo, pageSize) {
      this.$ajax.post('/api/platformPackageAssign/getPackageAssignInfoByCondition', {
        startTime: this.value6 ? this.value6[0] : '',
        endTime: this.value6 ? this.value6[1] : '',
        operateUserAccountId: '',
        operaterWechatId: this.value1,
        status: this.value2,
        contactStatus: '1',
        limit: pageSize,
        currPageNo: pageNo,
        platformPackageId: this.taskNum
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.total
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.datas) {
            let goods = {
              date: word.platformPackageId,
              name: word.status === '0' ? '未领取' : word.status === '1' ? '已领取' : '已失效',
              province: word.totalCapital,
              city: word.totalCommission,
              address: word.totalTaskNum,
              operaterUserName: word.undoneTaskNum,
              buyName: word.assignedUserName,
              buyPhone: word.assignedUserTelephone,
              comment: '--',
              // 买家信息
              platformOperaterName: word.platformOperaterName,
              contantStatus: word.comment || '--',
              gmtModify: word.gmtModify,
              assignedUserId: word.assignedUserId
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
    // 任务管理列表
    message (pageNo, pageSize) {
      this.$ajax.post('/api/platformPackageAssign/getTodaysPlatformPackageInfosByCondition', {
        platformPackageId: this.taskNum,
        limit: pageSize,
        currPageNo: pageNo
      }).then((data) => {
        console.log(data)
        let res = data.data
        this.totalCount = res.data.total
        if (res.code === '200') {
          let arr = []
          for (let word of res.data.datas) {
            let goods = {
              platformPackageId: word.platformPackageId,
              // 总任务数
              actualNum: word.actualNum,
              // 已领取
              actualNumIng: word.actualNum - word.actualLeftNum,
              // 剩余的
              actualLeftNum: word.actualLeftNum
            }
            arr.push(goods)
          }
          this.tableDataMess = arr
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
    searchThree () {
      this.message(1, this.pageSize)
    },
    adName () {
      this.value1 = ' '
      this.wechatArr = []
      this.wechats()
    },
    // 获取管理员姓名接口
    adminName_1 () {
      this.$ajax.post('/api/operateAccount/getOperatersOfPlatform', {
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              userName: word.userName || '暂无数据',
              operateUserAccountId: word.operateUserAccountId
            }
            arr.push(goods)
          }
          this.adminNameArr = arr
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
    // 获取平台端联系人微信列表
    wechats () {
      this.$ajax.post('/api/platform/wechat/getListByOperateUserId', {
        operateUserId: this.value
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              wechatNickName: word.wechatNickName,
              wechatNum: word.wechatNum,
              operateWechatId: word.operateWechatId
            }
            arr.push(goods)
          }
          this.wechatArr = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        // this.$message.error('网络错误，刷新下试试')
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