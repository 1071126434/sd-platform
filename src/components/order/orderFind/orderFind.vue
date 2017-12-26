<template>
  <div class="wrapOder">
    <header>
      <h4>任务分配</h4>
      <div class="selectOne">
        <el-row :gutter="40">
          <el-col :span="7">
            <div class="grid-content bg-purple">
              店铺渠道:
              <el-select v-model="value1" placeholder="请选择" size="small" @change="change">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              店铺名称:
              <el-autocomplete style="windth:240px;height:32px" class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">
              平台对接人:
              <el-select v-model="item" placeholder="请选择" size="small" @focus="focus" value-key='operateUserAccountId'>
                <el-option v-for="(item,index) in operateUserAccountName" :key="index" :label="item.userName" :value="item">
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
                <el-select v-model="select1" slot="prepend" placeholder="请选择" size="small">
                  <el-option label="姓名" value="nick"></el-option>
                  <el-option label="买家微信号" value="wechat"></el-option>
                  <el-option label="买家手机号" value="telephone"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-input placeholder="请输入内容" v-model="input2" class="input-with-select">
                <el-select v-model="select2" slot="prepend" placeholder="请选择" size="small">
                  <el-option label="任务包编号" value="package"></el-option>
                  <el-option label="任务编号" value="task"></el-option>
                  <el-option label="子任务编号" value="subTask"></el-option>
                  <el-option label="订单编号" value="order"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple bgColor" style="margin-top:-2px">
              <el-select v-model="select3" placeholder="请选择" size="small">
                <el-option label="分配时间" value="allot"></el-option>
                <el-option label="下单时间" value="order"></el-option>
                <el-option label="评价时间" value="favor"></el-option>
                <el-option label="撤销时间" value="cancel"></el-option>
              </el-select>
              <el-date-picker v-model="value4" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd'>
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="line"></div>
      <div class="btn">
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </header>
    <div class="orderList">
      <div class="head">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="ALL"></el-tab-pane>
          <el-tab-pane label="待下单" name="1"></el-tab-pane>
          <el-tab-pane label="待商家审核" name="3"></el-tab-pane>
          <el-tab-pane label="待评价" name="10"></el-tab-pane>
          <el-tab-pane label="待审核评价" name="11"></el-tab-pane>
          <div class="list" v-for="(item,index) in secondArr" :key="index">
            <div class="tables">
              <div class="tableItem">
                <ul class="itemHead">
                  <li style="width:40%">
                    <span class="shopType jdIcon"></span>
                    <span>{{item.sellerShopName}}</span>
                    <span class="person">对接人:
                      <em>{{item.operaterUserName}}</em> --
                      <em>{{item.platformWechatNum}}</em>
                    </span>
                  </li>
                  <li style="width:20%">
                    <span class="taskType">买手:
                      <span>{{item.wechatNum}}</span>
                    </span>
                  </li>
                  <li style="width:20%">
                    <span class="taskType">任务包编号:
                      <span>{{item.buyerTaskPackageId}}</span>
                    </span>
                  </li>
                  <li style="width:20%">
                    <span class="onlineTime">提交时间:
                      <span class="red">{{item.gmtCreate}}</span>
                    </span>
                  </li>
                </ul>
                <ul class="itemCont">
                  <li style="width:5%;border:none;margin-top:17px">
                    <img alt="" width="30" height="30" :src="item.productPictureUrl">
                  </li>
                  <li style="width:33%;margin-left:-80px">
                    <p>{{item.productName}}
                      <span>
                        <a :href="item.productUrl" style="color:#3377FF ">商品链接</a>
                      </span>
                    </p>
                    <p style="white-space:nowrap">订单编号:
                      <i class="red">{{item.buyerTaskRecordId}}</i>
                    </p>
                    <p>任务类型:
                      <i class="red" v-if="item.sellerTaskType===1">图文好评</i>
                      <i class="red" v-else-if="item.sellerTaskType===2">文字好评</i>
                      <i class="red" v-else>默认好评</i>
                    </p>
                    <p>任务编号:
                      <i>{{item.sellerTaskId}}</i>
                      <span class="link" @click="taskDetail(index,secondArr)">[查看任务详情]</span>
                    </p>
                  </li>
                  <li class="border_line">
                    <p>
                      <span>姓名:
                        <i class="red">{{item.userName}}</i>
                      </span>
                      <span>订单金额:
                        <i class="red">{{item.realOrderPrice}}</i>
                      </span>
                    </p>
                    <p>京东订单编号:
                      <span class="red">{{item.realOrderId}}</span>
                    </p>
                    <p>京东用户名:
                      <span class="red">{{item.jdNickName}}</span>
                    </p>
                    <p>手机号:
                      <span class="red">{{item.telephone}}</span>
                    </p>
                  </li>
                  <li class="center" style="width:20%">
                    <p class="taskState">子任务状态:</p>
                    <span class="tipSuccess lh60" v-if="item.taskStatus==='20'">已完成</span>
                    <span class="tipWait lh60" v-else-if="item.taskStatus==='1'">待下单</span>
                    <span class="tipWait lh60" v-else-if="item.taskStatus==='2'">待修改订单</span>
                    <span class="tipWait lh60" v-else-if="item.taskStatus==='3'">待商家审核</span>
                    <span class="tipSuccess lh60" v-else-if="item.taskStatus==='4'">订单审核通过</span>
                    <span class="tipWait lh60" v-else-if="item.taskStatus==='5'">订单待提交</span>
                    <span class="tipError lh60" v-else-if="item.taskStatus==='6'||item.taskStatus==='7'">订单驳回</span>
                    <span class="tipWait lh60" v-else-if="item.taskStatus==='10'">待评价</span>
                    <span class="tipWait lh60" v-else-if="item.taskStatus==='11'">待审核评价</span>
                    <span class="tipError lh60" v-else-if="item.taskStatus==='12'">评价驳回</span>
                    <span class="tipSuccess lh60" v-else-if="item.taskStatus==='13'">评价通过</span>
                    <span class="tipError lh60" v-else-if="item.taskStatus==='19'">已撤销</span>
                    <p>
                      <!-- 当为复选框的时候 需要循环出来 这样才能保证操作的是对应的值 -->
                      <el-checkbox v-model="item.isContact" v-if="item.taskStatus==='1'" @change="checkedClick(item)">已联系做单</el-checkbox>
                      <!-- <el-table-column type="selection" v-if="item.taskStatus==='1'"></el-table-column> -->
                    </p>
                  </li>
                  <li style="width:20%">
                    <p style="text-align:center">
                      <span class="smButton" v-if="item.taskStatus==='1'||item.taskStatus==='3'" @click="revocation(index,secondArr)">撤&nbsp;&nbsp;销</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <noCont v-if="secondArr.length===0"></noCont>
          <div class="pager" v-if="secondArr.length!==0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>
          </div>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../../assets/js/mixin'
import NoCont from '../../../base/noCont/noCont'
export default {
  name: 'orderFind',
  mixins: [pageCommon],
  components: {
    NoCont
  },
  data () {
    return {
      options: [{
        value: '0',
        label: '京东'
      }, {
        value: '1',
        label: '淘宝'
      }, {
        value: '2',
        label: '天猫'
      }, {
        value: '3',
        label: '全部'
      }],
      value1: '',
      item: '',
      value4: [],
      input1: null,
      input2: null,
      input3: null,
      select1: 'nick',
      select2: 'package',
      select3: 'allot',
      activeName: 'ALL',
      state2: '',
      shopNameId: null,
      firstArr: [],
      secondArr: [],
      isChecked: true,
      restaurants: [],
      shopNameArr: [],
      operateUserAccountName: [],
      currentPage: 1,
      apiUrl: '/api/order/search/getOrderListByCondition'
    }
  },
  computed: {
    params () {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sellerShopId: this.shopNameId,
        taskStatus: this.activeName,
        operateUserAccountId: this.item.operateUserAccountId || null,
        buyerKeywordType: this.select1,
        buyerKeyword: this.input1,
        taskKeywordType: this.select2,
        taskKeyword: this.input2,
        timeType: this.select3,
        startTime: this.value4 ? this.value4[0] : '',
        endTime: this.value4 ? this.value4[1] : ''
      }
    }
  },
  methods: {
    search () {
      this.getTask()
    },
    reset () {
      this.value = ''
      this.value1 = ''
      this.value3 = ''
      this.input1 = ''
      this.select1 = ''
      this.input2 = ''
      this.select2 = ''
      this.select3 = ''
      this.value4 = ''
      this.state2 = ''
    },
    handleClick (tab, event) {
      this.getTask()
    },
    change () {
      this.$ajax.post('/api/order/search/getShopListByType', {
        shopType: this.value1
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let obj = {
              value: word.shopName,
              shopNameId: word.shopId
            }
            arr.push(obj)
          }
          this.shopNameArr = arr
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
    // 当失焦的时候获取平台管理员的信息
    focus () {
      this.$ajax.post('/api/operateAccount/getOperatersOfPlatform', {
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let obj = {
              userName: word.userName,
              operateUserAccountId: word.operateUserAccountId
            }
            arr.push(obj)
          }
          this.operateUserAccountName = arr
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
    // 当单机撤销的时候 进行撤销
    revocation (index, secondArr) {
      this.$ajax.post('/api/buyer/task/cancelTask', {
        buyerTaskId: secondArr[index].buyerTaskRecordId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '撤销成功'
          })
          this.getTask()
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
    // 已联系做单的事件
    checkedClick (val) {
      // console.log(val)
      this.$ajax.post('/api/order/changeIsContact', {
        buyerTaskRecordId: val.buyerTaskRecordId,
        isContact: val.isContact === true ? 1 : 0
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getTask()
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
    // 当点击查看任务详情触发的事件
    taskDetail (index, secondArr) {
      this.$router.push({ name: 'taskDetail', query: { sellerTaskId: secondArr[index].sellerTaskId } })
    },
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          sellerShopName: word.sellerShopName || '暂无数据',
          /* 平台对接人 */
          operaterUserName: word.operaterUserName || '暂无数据',
          /* 订单编号编号 */
          buyerTaskRecordId: word.buyerTaskRecordId || '暂无数据',
          /* 任务包 */
          buyerTaskPackageId: word.buyerTaskPackageId || '暂无数据',
          /* 提交时间 */
          gmtCreate: word.gmtCreate || '暂无数据',
          // 商家任务id
          sellerTaskId: word.sellerTaskId,
          // 任务图片链接
          productPictureUrl: word.productPictureUrl,
          /* 商品名字 */
          productName: word.productName || '暂无数据',
          /* 商品链接 */
          productUrl: word.productUrl || '暂无数据',
          /* 子任务编号 */
          sellerTaskDayId: word.sellerTaskDayId || '暂无数据',
          /* 任务类型 */
          sellerTaskType: word.sellerTaskType || '暂无数据',
          /* 买家姓名 */
          userName: word.userName || '暂无数据',
          /* 订单金额 */
          realOrderPrice: word.realOrderPrice || '--',
          /* 京东订单编号 */
          realOrderId: word.realOrderId || '--',
          /* 京东用户名 */
          jdNickName: word.jdNickName || '暂无数据',
          telephone: word.telephone || '暂无数据',
          taskStatus: word.taskStatus || '暂无数据',
          isContact: word.isContact === '1' ? true : 0,
          wechatNum: word.wechatNum,
          platformWechatNum: word.platformWechatNum
        }
        arr.push(goods)
      }
      this.firstArr = arr
      this.secondArr = arr
    },
    // 店铺的名称的一个筛选
    querySearch (queryString, cb) {
      var restaurants = this.shopNameArr
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    handleSelect (item) {
      this.shopNameId = item.shopNameId
    }
  },
  mounted () {
    this.restaurants = this.shopNameArr
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapOder
  padding 20px
  min-width 1200px
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
      // padding 12px 20px
      .tableItem
        border 1px solid rgba(223, 240, 253, 0.6)
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
          .person
            margin-left 66px
        .itemCont
          display flex
          padding 20px
          li
            min-width 150px
            // border-right 1px solid #E5E5E5
            &:last-child
              border none
            .taskOrder
              margin-left 46px
          .border_line
            width 30%
            margin-left 100px
            border-left 1px solid #E5E5E5
            border-right 1px solid #E5E5E5
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
            border-right 1px solid #E5E5E5
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