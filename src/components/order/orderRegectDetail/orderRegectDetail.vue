<template>
  <div class="wrap">
    <div class="orderList">
      <div class="head">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待确认订单" name="1">
            <div class="list">
              <div class="tables">
                <div class="tableItem">
                  <ul class="itemHead">
                    <li style="width:30%">
                      <span class="shopType"></span>
                      <span>升达旗舰店</span>
                    </li>
                    <li style="width:50%">
                      <span class="taskOrder">子任务编号:
                        <i>9901640082449467</i>
                      </span>
                      </l>
                      <li style="width:20%">
                        <el-checkbox v-model="checked">已联系做单</el-checkbox>
                      </li>
                  </ul>
                  <ul class="itemCont">
                    <li style="width:5%;border:none;margin-top:17px">
                      <img alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
                    </li>
                    <li style="width:30%;margin-left:-80px">
                      <p>安卓数据线
                        <span>商品链接</span>
                      </p>
                      <p>子任务编号:
                        <i class="red">4696868146-51541</i>
                      </p>
                      <p>任务类型:
                        <!-- <i class="red">图文好评</i>
                         <i class="red">文字好评</i> -->
                        <i class="red">默认好评</i>
                      </p>
                    </li>
                    <li style="width:60px;border:none;margin-left:40px">
                      <img class="taskImg" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=499534944,3745393208&fm=173&s=F0B58B7467D353D0480EFDD6030070BA&w=640&h=448&img.JPEG" alt="">
                    </li>
                    <li style="width:30%;margin-left:-90px">
                      <p>
                        <span>姓名:
                          <i class="red">黄军</i>&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span>订单金额:
                          <i class="red">58</i>
                        </span>
                      </p>
                      <p>京东订单编号:
                        <span class="red">68489646146</span>
                      </p>
                      <p>京东用户名:
                        <span class="red">测试一下看看多少字</span>
                      </p>
                      <p>手机号:
                        <span class="red">15103541616</span>
                      </p>
                      <p>微信号:
                        <span class="red">15103541616</span>
                      </p>
                    </li>
                    <li class="center styles" style="width:30%">
                      <span class="onlineTime">驳回时间:
                        <span class="red">2017-11-14 12:23:00</span>
                      </span>
                      <p class="taskState">驳回原因:
                        <span>卧槽</span>
                      </p>
                      <p class="taskState">备注:
                        <span>卧槽</span>
                      </p>

                    </li>
                  </ul>
                </div>
                <div class="pager">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- 切换部分 -->
          <el-tab-pane label="待确认评价" name="2">
            <div class="list">
              <div class="tables">
                <div class="tableItem">
                  <ul class="itemHead">
                    <li style="width:30%">
                      <span style="margin-left:20px">安卓数据线</span>
                    </li>
                    <li style="width:30%">
                      <span class="taskOrder">子任务编号:
                        <i>9901640082449467</i>
                      </span>
                      </l>
                      <li style="width:25%">
                        <span class="taskOrder">任务类型:
                          <i>默认好评</i>
                          <!-- <i>图文好评</i>
                          <i>纯文好评</i> -->
                        </span>
                      </li>
                      <li style="width:15%">
                        <span class="onlineTime">提交时间:
                          <span class="red">2017-11-14 12:23:00</span>
                        </span>
                      </li>
                  </ul>
                  <ul class="itemCont">
                    <li style="width:5%;border:none;margin-top:17px">
                      <img alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
                    </li>
                    <li style="width:25%;margin-left:-80px">
                      <p>姓名:
                        <span>黄军</span>
                      </p>
                      <p>淘宝/天猫用户名:
                        <i class="red">呵呵到达刀锋</i>
                      </p>
                      <p>手机号:
                        <i class="red">150371833551</i>
                      </p>
                    </li>
                    <li style="width:40%">
                      <p>
                        <!-- <span>图文好评</span>&nbsp;&nbsp; |&nbsp;&nbsp;  -->
                        <span>文字好评好评</span>&nbsp;&nbsp; |&nbsp;&nbsp;
                        <i>东西很不错,下次继续光顾分发万福金安开发垃圾</i>
                      </p>
                      <!-- <p>
                        <img style="margin-right:10px" alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
                        <img style="margin-right:10px" alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
                        <img alt="" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511264881&di=517c3dacb2e6b5c612f16bad69c9fc11&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dce62ca28a5c3793169658e6a83addd30%2F0b55b319ebc4b745f53bbf38c5fc1e178a821574.jpg">
                      </p> -->

                    </li>
                    <li style="width:60px;border:none;margin-left:60px">
                      <img class="taskImg" src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=499534944,3745393208&fm=173&s=F0B58B7467D353D0480EFDD6030070BA&w=640&h=448&img.JPEG" alt="">
                    </li>
                    <li class="center styles" style="width:10%;margin-left:-90px">
                      <p class="taskState">淘宝/天猫订单编号:
                      </p>
                      <span class="red">145616516315665</span>
                      <el-button type="primary">去审核</el-button>
                    </li>
                  </ul>
                </div>
                <div class="pager">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../../assets/js/mixin'
export default {
  mixins: [pageCommon],
  name: 'orderRegectDetail',
  data () {
    return {
      activeName: '1',
      currentPage: 1,
      checked: true,
      apiUrl: '/api/platform/order/getOrderListByTaskStatus'
    }
  },
  computed: {
    params () {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        taskStatus: '1'
      }
    }
  },
  methods: {
    reset () {
      this.value = ''
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    setList (data) {
      // let arr = []
      // for (let word of data) {
      //   let goods = {
      //     sellerShopName: word.sellerShopName || '暂无数据',
      //     /* 平台对接人 */
      //     operaterUserName: word.operaterUserName || '暂无数据',
      //     /* 订单编号编号 */
      //     buyerTaskRecordId: word.buyerTaskRecordId || '暂无数据',
      //     /* 任务包 */
      //     buyerTaskPackageId: word.buyerTaskPackageId || '暂无数据',
      //     /* 提交时间 */
      //     gmtCreate: word.gmtCreate || '暂无数据',
      //     // 商家任务id
      //     sellerTaskId: word.sellerTaskId,
      //     // 任务图片链接
      //     productPictureUrl: word.productPictureUrl,
      //     /* 商品名字 */
      //     productName: word.productName || '暂无数据',
      //     /* 商品链接 */
      //     productUrl: word.productUrl || '暂无数据',
      //     /* 子任务编号 */
      //     sellerTaskDayId: word.sellerTaskDayId || '暂无数据',
      //     /* 任务类型 */
      //     sellerTaskType: word.sellerTaskType || '暂无数据',
      //     /* 买家姓名 */
      //     userName: word.userName || '暂无数据',
      //     /* 订单金额 */
      //     realOrderPrice: word.realOrderPrice || '--',
      //     /* 京东订单编号 */
      //     realOrderId: word.realOrderId || '--',
      //     /* 京东用户名 */
      //     jdNickName: word.jdNickName || '暂无数据',
      //     telephone: word.telephone || '暂无数据',
      //     taskStatus: word.taskStatus || '暂无数据',
      //     isContact: word.isContact === '1' ? this.checked = true : this.checked = false
      //   }
      //   arr.push(goods)
      // }
      // this.firstArr = arr
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 20px
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
      padding 12px 20px
      .tableItem
        border 1px solid #40B6FF
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
            background red
          .person
            margin-left 66px
          .taskOrder
            margin-left 46px
        .itemCont
          display flex
          padding 20px
          li
            min-width 150px
            border-right 1px solid #E5E5E5
            &:last-child
              border none
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
            .taskState
              margin-left -5px
            .onlineTime
              font-size 14px
          .styles
            line-height 40px
          .taskImg
            height 107px
            margin-top 10px
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