<template>
  <div class="wrap">
    <header>
      <el-tabs>
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
            <el-button type="primary" @click="exportData()">确认派发</el-button>
          </div>
        </div>
        <div class="middle">
          <span>预计做单组团数:
            <i>{{this.totalClusterCount.totalCluster||0}}</i>
          </span>
          <span>预计做单人数:
            <i>{{this.totalClusterCount.totalCountNum||0}}</i>
          </span>
        </div>
        <div class="red"></div>
        <!-- 内容列表展示 -->
        <div class="accountTab">
          <el-table :data="tableDataBuy" style="width: 90%" @select="handSelect" @select-all="selectAll" border>
            <el-table-column type="selection" fixed :selectable='disabledFilterFirst'></el-table-column>
            <el-table-column prop="sellerTaskId" width="180" align="center" label="任务编号">
            </el-table-column>
            <el-table-column prop="productOrderPrice" width="120" align="center" label="实际下单金额" sortable>
            </el-table-column>
            <el-table-column prop="totalNum" width="120" align="center" label="剩余单数" sortable>
            </el-table-column>
            <el-table-column prop="clusterCount" width="120" align="center" label="领取组团数" sortable>
            </el-table-column>
            <el-table-column prop="comment" width="120" align="center" label="任务备注">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.comment" placement="top">
                  <span class="overElipes">{{ scope.row.comment }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="isPlus" width="120" align="center" label="是否需要Plus">
            </el-table-column>
            <el-table-column prop="isOnlyDiamond" width="120" align="center" label="是否需要钻石">
            </el-table-column>
            <el-table-column prop="isOnlyHuabei" width="120" align="center" label="是否开通花呗">
            </el-table-column>
            <el-table-column prop="shopName" width="120" align="center" label="店铺" fixed="right">
            </el-table-column>
            <el-table-column prop="productName" width="120" align="center" label="商品标题">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.productName" placement="top">
                  <span class="overElipes">{{ scope.row.productName }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="productSecondClassDetail" align="center" width="120" label="三级类目">
            </el-table-column>
          </el-table>
          <div class="line"></div>
        </div>
        <!-- <Nocont v-if="this.tableDataBuy.length===0"></Nocont> -->
      </el-tabs>
    </header>
    <!-- 点击确认派发之后触发的弹框 -->
    <div v-if="dialogTableVisible" class="cover">
      <div class="content">
        <div class="cancel" @click="exit">X</div>
        <h2>确认派单</h2>
        <div class="head">
          <p>本任务包最大订单数:{{this.totalClusterCount.totalCount||0}}</p>
          <p>可接组团数:{{this.totalClusterCount.totalCluster||0}}</p>
          <p>可接人数:{{this.availablNum||0}}</p>
        </div>
        <div class="midd">
          <p>请输入您希望消耗的订单数
          </p>
          <p class="mit">
            <el-input v-model="input" type="number"></el-input>
          </p>
          <span style="margin-left:40px">已选中:{{this.buyIds.length||0}}人</span>
        </div>
        <div class="red"></div>
        <!-- 数据展示部分 -->
        <div class="scoller">
          <el-table :data="tableDataBuyList" style="width: 100%;" @select="handSelectOne">
            <el-table-column type="selection" width="50" :selectable='disabledFilter'></el-table-column>
            <el-table-column prop="buyerName" align="center" width="80" label="姓名">
            </el-table-column>
            <el-table-column prop="telephone" align="center" width="100" label="手机号">
            </el-table-column>
            <el-table-column prop="province" align="center" width="100" label="所在省">
            </el-table-column>
            <el-table-column prop="clusterId" align="center" width="165" label="组团编号">
            </el-table-column>
            <el-table-column prop="buyerIdentify" align="center" width="100" label="标识">
            </el-table-column>
            <el-table-column prop="waitingBackCapitalAccount" width="100" align="center" label="未确认收货金">
            </el-table-column>
            <el-table-column prop="lastLoginTime" align="center" width="150" label="上次登陆时间">
            </el-table-column>
          </el-table>
        </div>
        <div class="line"></div>
        <div class="moneyNum" style="margin-top:10px">
          <el-button @click="allSure()">确认分配</el-button>
        </div>
      </div>
    </div>
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
      repeat: '',
      state2: ((new Date()).toLocaleDateString()).replace(/\//g, '-'),
      input: 0,
      checkList: ['1,2'],
      // 获取预计组团数,预计人数
      totalClusterCount: {},
      activeName2: 'first',
      value1: '',
      value3: '',
      value4: '',
      input5: '',
      tableDataBuy: [],
      tableDataBuyList: [{
        buyerName: 'zhaasn',
        telephone: '15031515',
        province: '河南省',
        clusterId: '15465465461546156156',
        buyerIdentify: '333',
        waitingBackCapitalAccount: '11',
        lastLoginTime: '2015-2-8'
      }
      ],
      // 将选中的值存在一个数组里面
      applyIdsNum: [],
      // 用来判断是否导出就进行提现的问题
      applyIdsNumChoose: [],
      // 钱的数量
      moneyNumber: 0,
      dialogTableVisible: false,
      // 弹出的筛选买家 组团的买家id
      buyIds: [],
      // 本金的存储
      principal: 0,
      // 佣金存储
      commission: 0,
      // 买家信息的存储
      buyInfo: [],
      // 可用买家id的存储
      buyIdsChoonse: [],
      sellerIdsChoonse: [],
      jd: 0,
      taobao: 0,
      tianmao: 0,
      // 筛选买家数组
      maxBuyerUserIds: [],
      // 图片的存储
      imageUrls: [],
      // 点击存储最小值得地方
      bestMin: '',
      // 可接人数 弹框出现的
      availablNum: ''
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
    this.changeCheckbox()
  },
  methods: {
    exit () {
      this.dialogTableVisible = false
      this.maxBuyerUserIds = []
    },
    // 单个选触发的事件
    handSelect (index, val) {
      console.log(index)
      let arr = []
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let arr5 = []
      let arr6 = []
      this.jd = 0
      this.taobao = 0
      this.tianmao = 0
      for (let word of index) {
        console.log(word)
        let goods = {
          state: word.state,
          applyIds: word.sellerTaskId,
          principal: word.productOrderPrice,
          commission: word.commission,
          sellerType: word.sellerShopType,
          productPictureUrl: word.productPictureUrl,
          totalNum: word.totalNum
        }
        arr.push(goods.applyIds)
        arr1.push(goods)
        arr2.push(goods.principal)
        arr3.push(goods.commission)
        arr5.push(goods.productPictureUrl)
        arr6.push(goods.totalNum)
        if (word.sellerShopType === '0') {
          this.jd = this.jd + 1
        } else if (word.sellerShopType === '1') {
          this.taobao = this.taobao + 1
        } else if (word.sellerShopType === '2') {
          this.tianmao = this.tianmao + 1
        }
      }
      console.log(this.jd, this.taobao, this.tianmao)
      this.applyIdsNum = arr
      this.applyIdsNumChoose = arr1
      this.imageUrls = arr5
      // 本金
      let abc = 0
      for (var i = 0; i < arr2.length; i++) {
        abc += arr2[i]
      }
      this.principal = abc
      // console.log(this.principal)
      // 佣金
      let ab = 0
      for (var j = 0; j < arr3.length; j++) {
        ab += arr3[j]
      }
      this.commission = ab
      // 循环已选中的订单数量进行一个排序
      let bestMin = 100000
      for (var a = 0; a < arr6.length; a++) {
        if (arr6[a] < bestMin) {
          bestMin = arr6[a]
        }
      }
      this.bestMin = bestMin
      if (this.applyIdsNum.length > 5) {
        this.$message({
          message: '最多选择5个,您已超出',
          type: 'warning'
        })
        return false
      }
      // console.log(this.jd, this.tianmao, this.taobao)
      this.$ajax.post('/api/buyerAccount/getAvailableBuyerCount', {
        sellerTaskIds: this.applyIdsNum
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.totalClusterCount = {
            totalCluster: res.data.totalClusterCount,
            totalCountNum: res.data.totalCount,
            totalCount: res.data.totalCount > this.bestMin ? this.bestMin : res.data.totalCount
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
      // 检测是否有重复店铺的接口
      this.$ajax.post('/api/seller/taskSearch/checkSellerTasksDuplicateV2', {
        sellerTaskIds: this.applyIdsNum
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
        } else {
          this.repeat = '重复了'
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
    },
    // 弹出页面的单选触发的事件 ,这个事件是不能有全选的
    handSelectOne (index, val) {
      let arr9 = []
      let arr1 = []
      let arr5 = []
      let arr6 = []
      for (let word of index) {
        let goods = {
          buyerIdentify: word.buyerIdentify,
          applyIds: word.clusterId,
          availableBuyerUserAccountId: word.availableBuyerUserAccountId
        }
        arr9.push(goods.applyIds)
        arr1.push(goods)
        arr5.push(word)
        arr6.push(goods.availableBuyerUserAccountId)
      }
      // 组团的买家id
      this.buyIds = arr9
      // 可用买家的id
      this.applyIdsNumChoose = arr1
      this.buyInfo = index
      this.buyIdsChoonse = arr6
      // console.log(this.buyInfo)
      // this.principal = arr2
      // let abc = 0
      // for (var i = 0; i < arr6.length; i++) {
      //   abc += arr2[i]
      // }
      // this.principal = abc
      // console.log(this.buyIdsChoonse)
      this.$ajax.post('/api/buyerAccount/getClusterBuyByUserIds', {
        buyerUserIds: this.buyIdsChoonse
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          // this.maxBuyerUserIds.push(res.data.maxBuyerUserIds)
          this.maxBuyerUserIds = res.data.maxBuyerUserIds
          //  this.buyIdsChoonse
          console.log(this.maxBuyerUserIds)
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
    disabledFilter (row, index) {
      if (this.maxBuyerUserIds.indexOf(row.availableBuyerUserAccountId) >= 0) {
        return false
      } else {
        return true
      }
    },
    // disabledFilterFirst () {

    // },
    // 全选触发的事件
    // selectAll (index, val) {
    //   this.handSelect()
    // },
    // 当进入页面进行展示的部分
    changeCheckbox () {
      if ((this.checkList).join(',') === '') {
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
        this.tableDataBuy = []
        return false
      }
      this.$ajax.post('/api/seller/taskSearch/getDayTaskList', {
        day: this.state2,
        shopType: (this.checkList).join(',')
      }).then((data) => {
        // console.log(data)
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
              totalNum: word.totalNum - word.actualNum,
              // 领取组团数(无)
              clusterCount: word.clusterCount,
              comment: word.comment,
              isPlus: word.isOnlyPlus === '0' ? '否' : word.isPlus === '1' ? '是' : '--',
              isOnlyDiamond: word.isOnlyDiamond === '0' ? '否' : word.isOnlyDiamond === '1' ? '是' : '--',
              isOnlyHuabei: word.isOnlyHuabei === '0' ? '否' : word.isOnlyHuabei === '1' ? '是' : '--',
              shopName: word.shopName,
              productName: word.productName,
              productSecondClassDetail: word.productThirdClassDetail || '--',
              commission: word.buyerCommissionOrder + word.buyerCommmissionFavor,
              sellerShopType: word.sellerShopType,
              productPictureUrl: word.productPictureUrl
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
    // 当点击确认派发触发的事件
    exportData () {
      if (this.applyIdsNum.length === 0) {
        this.$message({
          message: '请至少选择一条数据',
          type: 'warning'
        })
        return false
      }
      if (this.repeat === '重复了') {
        this.$message({
          message: '部分店铺重复或三级类目重复,请重新选取',
          type: 'warning'
        })
        this.repeat = ''
        return false
      }
      if (this.applyIdsNum.length > 5) {
        this.$message({
          message: '最多选择5个,您已超出',
          type: 'warning'
        })
        return false
      }
      this.dialogTableVisible = true
      this.$ajax.post('/api/buyerAccount/getAvailableBuyers', {
        sellerTaskIds: this.applyIdsNum
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.availablNum = res.data.totalCount
          let arr = []
          if (res.data) {
            for (let word of res.data.availableBuyers) {
              let goods = {
                buyerName: word.buyerName,
                telephone: word.telephone,
                province: word.province,
                clusterId: word.clusterId,
                buyerIdentify: word.buyerIdentify === '1' ? '想做单' : '--',
                waitingBackCapitalAccount: word.waitingBackCapitalAccount,
                lastLoginTime: word.lastLoginTime,
                availableBuyerUserAccountId: word.availableBuyerUserAccountId
              }
              arr.push(goods)
            }
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
    // 2.当点击确认分配的时候触发的事件
    allSure () {
      if (this.input <= 0) {
        this.$message({
          message: '请正确输入希望消耗的订单数',
          type: 'warning'
        })
        return false
      }
      if (this.input > this.buyIds.length) {
        this.$message({
          message: '希望消耗的订单数不能大于已选中的人数',
          type: 'warning'
        })
        return false
      }
      if (this.input > this.totalClusterCount.totalCluster) {
        this.$message({
          message: '希望消耗的订单数不能大于本任务包最大订单数',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/order/newPackageAssign', {
        totalCapitalAmount: this.principal,
        totalCommissionAmount: this.commission,
        actualNum: this.input,
        excessNum: this.buyIdsChoonse.length || 0,
        sellerTaskIds: this.applyIdsNum,
        taskAvailableBuyer: this.buyInfo,
        buyerUserIds: this.buyIdsChoonse,
        hasTaobao: this.taobao === 0 ? '0' : '1',
        hasTianmao: this.tianmao === 0 ? '0' : '1',
        hasJD: this.jd === 0 ? '0' : '1',
        taobaoNum: this.taobao,
        tianmaoNum: this.tianmao,
        JDNum: this.jd,
        operaterId: this.userInfo.operateUserAccountId,
        platformOperaterName: this.userInfo.userName,
        imageUrls: this.imageUrls
      }).then((data) => {
        // console.log(data)
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.dialogTableVisible = false
          this.changeCheckbox()
          this.maxBuyerUserIds = []
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
  position relative
  ::-webkit-scrollbar
    width 100%
    height 10px
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
        // margin-left -214px
        .work
          margin-top 3px
      .content
        margin-top -12px
    .middle
      margin-top 20px
      padding-left 10px
    .red
      position absolute
      width 30px
      height 35px
      background #ffffff
      left 5px
      top 110px
      z-index 555
    .accountTab
      margin-top 20px
      .overElipes
        display inline-block
        width 112px
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
    .line
      height 1px
      background #E5E5E5
      margin-top 2rem
    .moneyNum
      margin-top 3rem
      padding-bottom 2rem
      color #333333
      font-size 1.4rem
      .number
        float left
        margin-top 1.2rem
        margin-right 0.5rem
  .cover
    width 100%
    height auto
    background rgba(0, 0, 0, 0.2)
    position absolute
    top 0px
    left 0px
    z-index 655
    min-height 130%
    .content
      width 60%
      background white
      margin-left 10%
      margin-top 5%
      padding 20px
      position relative
      .cancel
        position absolute
        right 5px
        top 5px
        font-size 20px
        cursor pointer
      h2
        font-size 20px
        padding-bottom 10px
      .head
        display flex
        justify-content space-between
        border-top 1px solid #ccc
        padding-top 20px
        padding-bottom 10px
        font-size 14px
      .midd
        display flex
        justify-content flex-start
        font-size 14px
        margin-top 18px
        .mit
          margin-left 5px
          margin-top -5px
      .red
        position absolute
        width 30px
        height 35px
        background #fff
        left 27px
        top 133px
        z-index 555
      .scoller
        overflow auto
</style>