<template>
  <div class="tryDetail">
    <div class="tryInfo">
      <h2>试用进展</h2>
      <ul>
        <li>
          <p>
            <span>试用进度: </span>
            {{ infoObj.orderStatusDetail || '--' }}
          </p>
          <p>
            <span>任务类型: </span>
            {{ infoObj.taskTypeDetail || '--' }}
          </p>
          <p>
            <span>订单号: </span>
            {{ infoObj.orderId || '--' }}
          </p>
          <p>
            <span>买号: </span>
            {{ infoObj.buyerName || '--' }}
          </p>
        </li>
        <li>
          <p>
            <span>支付金额: </span>
            <strong class="red">{{ infoObj.orderPrice || '--' }}</strong>
          </p>
          <p>
            <span>返款方式: </span>
            <strong class="red">平台返款</strong>
          </p>
        </li>
        <li>
          <p>
            <span>任务编号: </span>
            {{ infoObj.taskId || '--' }}
          </p>
          <p>
            <span>申请时间: </span>
            {{ infoObj.applyTime || '--' }}
          </p>
        </li>
      </ul>
    </div>
    <div class="goodsInfo">
      <h2>商品信息</h2>
      <ul>
        <li>
          <div class="title">商品</div>
          <div class="cont">
            <img :src="infoObj.productPicUrl || ''" alt="pic">
            <span>{{ infoObj.productName || '--' }}</span>
          </div>
        </li>
        <li>
          <div class="title">单价(元)</div>
          <div class="cont red">
            {{ infoObj.productPrice || '--' }}
          </div>
        </li>
        <li>
          <div class="title">数量</div>
          <div class="cont">
            {{ infoObj.numPereOrder || '--' }}
          </div>
        </li>
        <li>
          <div class="title">运费(元)</div>
          <div class="cont">
            {{ (infoObj.isContainPost==1 ? '0': '10') || '--' }}
          </div>
        </li>
      </ul>
      <p>买家实付款:
        <span class="red">{{ infoObj.actualPrice || '--' }}</span>元</p>
    </div>
    <div class="stepInfo">
      <h2>任务进展</h2>
      <ul class="title">
        <li>申请进度</li>
        <li>完成时间</li>
        <li>备注</li>
        <li>状态</li>
      </ul>
      <ul class="detail">
        <li v-for="(item, index) in detailArr" :key="index">
          <div>
            <span class="line" :class="{'first': index===0}"></span>
            <strong>{{ item.orderFlowTypeDetail || '--' }}</strong>
          </div>
          <div>
            <strong>{{ item.gmtCreate || '--' }}</strong>
          </div>
          <div>
            <strong v-if="0">
              {{ item.content }}
            </strong>
            <br />
            <strong v-if="item.favorContent">{{ '评论内容: ' + item.favorContent || '--' }}</strong>
            <br />
            <strong v-if="item.thirdOrderId">{{ '买家订单编号: ' + item.thirdOrderId || '--' }}</strong>
          </div>
          <div>
            <p>
              <i class="passIcon"></i>
              <strong>已完成</strong>
            </p>
            <p v-if="item.logisticsPicUrl!='[]' && item.logisticsPicUrl">物流截图:</p>
            <p v-if="item.favorPicUrls!='[]' && item.favorPicUrls">评价截图:</p>
            <p v-if="item.relatedProductPicsId!='[]' && item.relatedProductPicsId">货比三家截图:</p>
            <p v-if="item.searchPic!='[]' && item.searchPic">搜索截图:</p>
            <img v-if="item.logisticsPicUrl" :src="img" @click="lookImg(img)" v-for="(img, i) in (item.logisticsPicUrl ? JSON.parse(item.logisticsPicUrl) : [])" :key="i" alt="pic">
            <img v-if="item.favorPicUrls" :src="img" @click="lookImg(img)" v-for="(img, i) in (item.favorPicUrls ? JSON.parse(item.favorPicUrls) : [])" :key="i" alt="pic">
            <img v-if="item.relatedProductPicsId" :src="img" @click="lookImg(img)" v-for="(img, i) in (item.relatedProductPicsId ? JSON.parse(item.relatedProductPicsId) : [])" :key="i" alt="pic">
            <img v-if="item.searchPic" :src="img" @click="lookImg(img)" v-for="(img, i) in (item.searchPic ? JSON.parse(item.searchPic) : [])" :key="i" alt="pic">
          </div>
        </li>
        <!-- <li>
          <div class="firstDiv">
            <span class="line" :class="{ 'grayLine': 0 }"></span>
            <strong>买家找商品防撒旦法撒</strong>
          </div>
          <div>
            <strong>2017-08-24 19:10:25</strong>
          </div>
          <div>
            <strong></strong>
          </div>
          <div>
            <p>
              <i class="passIcon"></i>
              <strong>买家已完成</strong>
            </p>
            <img @click="lookImg('http://img4.duitang.com/uploads/item/201510/17/20151017151935_KiQuA.jpeg')" src="http://img4.duitang.com/uploads/item/201510/17/20151017151935_KiQuA.jpeg" alt="pic">
            <img src="http://img4.duitang.com/uploads/item/201510/17/20151017151935_KiQuA.jpeg" alt="pic">
            <img src="http://img4.duitang.com/uploads/item/201510/17/20151017151935_KiQuA.jpeg" alt="pic">
          </div>
        </li> -->
      </ul>
    </div>
    <div v-show="showLookImg ">
      <lookImg :imgUrl="lookImgUrl " @close="showLookImg=false "></lookImg>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import LookImg from '../../base/lookImg/lookImg'
export default {
  name: 'tryDetail',
  components: {
    LookImg
  },
  data () {
    return {
      showLookImg: false,
      lookImgUrl: '',
      detailArr: [],
      infoObj: {}
    }
  },
  methods: {
    lookImg (url) {
      this.lookImgUrl = url
      this.showLookImg = true
    },
    // 获取任务详情信息
    getInfo () {
      this.$ajax.post('/api/buyer/task/getOrderDetail', {
        buyerTaskId: this.$route.query.buyerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.infoObj = data.data.data
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    },
    // 获取步骤流水内容
    getDetail () {
      this.$ajax.post('/api/buyer/task/getOrderFlowByOrderId', {
        buyerTaskId: this.$route.query.buyerTaskId
      }).then((data) => {
        if (data.data.code === '200') {
          this.detailArr = data.data.data
        } else {
          this.$message({
            type: 'warning',
            message: data.data.message
          })
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  mounted () {
    this.getInfo()
    this.getDetail()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.tryDetail
  padding 20px
  .red
    color #ff2933
  i
    display inline-block
    width 20px
    height 20px
    vertical-align middle
  h2
    font-size 16px
    color #333333
    line-height 30px
    font-weight bolder
    margin-bottom 20px
  .tryInfo
    background #ffffff
    padding 20px
    ul
      display flex
      font-size 14px
      li
        margin-right 100px
        p
          font-weight bold
          line-height 30px
        span
          display inline-block
          width 70px
          color #666666
  .goodsInfo
    background #ffffff
    padding 20px
    margin-top 20px
    ul
      display flex
      li
        flex auto
        text-align center
        .title
          height 36px
          line-height 36px
          background #EEEEEE
          color #333333
        .cont
          border-bottom 1px solid #D8D8D8
          padding 26px
          line-height 60px
          display flex
          justify-content center
          img
            vertical-align middle
            border none
            width 60px
            height 60px
            margin-right 16px
    p
      font-size 16px
      color #333333
      margin-top 22px
      text-align right
  .stepInfo
    padding 20px 20px 100px
    background #ffffff
    .title
      display flex
      height 36px
      line-height 36px
      background #EEEEEE
      color #333333
      li
        padding-left 50px
        flex 1
    .detail
      margin-top 40px
      li
        display flex
        div
          overflow hidden
          flex 1
          padding-left 50px
          span
            float left
            position relative
            width 2px
            height 100%
            background #FF2933
            margin-right 30px
            &:before
              content ''
              position absolute
              top 20px
              left -5px
              width 12px
              height 12px
              border-radius 50%
              background #FF2933
          .grayLine
            background #CCCCCC
            &:before
              background #CCCCCC
          strong
            line-height 50px
            font-size 14px
          .first
            height calc(100% - 20px)
            margin-top 20px
            &:before
              content ''
              top 0
        img
          width 53px
          height 95px
          vertical-align middle
</style>