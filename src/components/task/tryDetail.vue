<template>
  <div class="tryDetail">
    <div class="tryInfo">
      <h2>试用进展</h2>
      <ul>
        <li>
          <p>
            <span>试用进度: </span>
            获取试用
          </p>
          <p>
            <span>任务类型: </span>
            手淘app垫付任务
          </p>
          <p>
            <span>订单号: </span>
            4756985442322155632
          </p>
          <p>
            <span>买号: </span>
            贵族的撒
          </p>
        </li>
        <li>
          <p>
            <span>支付金额: </span>
            <strong class="red">9.90</strong>
          </p>
          <p>
            <span>返款方式: </span>
            <strong class="red">平台返款</strong>
          </p>
        </li>
        <li>
          <p>
            <span>任务编号: </span>
            2562626126512651655616516512656
          </p>
          <p>
            <span>申请时间: </span>
            2017-08-09 14:25:36
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
            <img src="http://img4.duitang.com/uploads/item/201510/17/20151017151935_KiQuA.jpeg" alt="pic">
            <span>安卓数据线</span>
          </div>
        </li>
        <li>
          <div class="title">单价(元)</div>
          <div class="cont red">
            9.90
          </div>
        </li>
        <li>
          <div class="title">数量</div>
          <div class="cont">
            1
          </div>
        </li>
        <li>
          <div class="title">运费(元)</div>
          <div class="cont">
            包邮
          </div>
        </li>
      </ul>
      <p>买家实付款:
        <span class="red">9.90</span>元</p>
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
        <li>
          <div>
            <span class="line first"></span>
            <strong>买家找商品</strong>
          </div>
          <div>
            <strong>2017-08-24 19:10:25</strong>
          </div>
          <div>
            <strong>
              驳回原因: 撒后撒谎是否撒谎沙发上
              <br /> 修改方案: 法国沙发上发生阿斯达斯
            </strong>
          </div>
          <div>
            <p>
              <i class="passIcon"></i>
              <strong>买家已完成</strong>
            </p>
            <img src="http://img4.duitang.com/uploads/item/201510/17/20151017151935_KiQuA.jpeg" alt="pic">
          </div>
        </li>
        <li>
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
        </li>
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
      lookImgUrl: ''
    }
  },
  methods: {
    lookImg (url) {
      this.lookImgUrl = url
      this.showLookImg = true
    }
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
    padding 20px
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