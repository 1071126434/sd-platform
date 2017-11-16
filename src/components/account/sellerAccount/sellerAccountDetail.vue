<template>
  <div class="wrap">
    <header>
      <p class="top">买家账号/账号详情</p>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6" style="flex:1">
          <div class="grid-content bg-purple" >
            <h4>
              <span>卖家基本信息</span>
            </h4>
            <div class="phone">
              <i class="el-icon-mobile-phone"></i>
              <span>15037183341</span>
              <span class="vip">普通会员</span>
            </div>
            <div class="wchat">
              服务人微信号:
              <span>黄军</span>
              <em class="yaoPerson">邀请人:
                <span>黄军</span>
              </em>
            </div>
            <div class="tab">
              <el-switch v-model="value3" active-text="成为联盟商家">
              </el-switch>
              <em class="service">服务人:
                <span>黄军</span>
              </em>
            </div>
          </div>
        </el-col>
        <el-col :span="6" style="flex:1;margin-left:20px;margin-right:20px">
          <div class="grid-content bg-purple">
            <h4 style="background:rgba(64,182,255,1)">
              <span>卖家账号信息</span>
            </h4>
            <ul class="left">
              <li><img width="80" height="80" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510814036177&di=09d6409601464ce6f36b31b6adfc3d57&imgtype=0&src=http%3A%2F%2Fimg2.cxtuku.com%2F00%2F10%2F55%2Fs04761a14185.jpg" alt=""></li>
              <li class="pricMoney">
                <span>600</span>
                <p>本金</p>
              </li>
              <li class="pricMon">
                <span>600</span>
                <p>联盟佣金</p>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="6" style="flex:1">
          <div class="grid-content bg-purple">
            <h4 style="background:rgba(255,51,65,1)">
              <span>商家关联银行卡</span>
            </h4>
            <h5>平台卡号</h5>
            <p class="bank">
              <span>小智</span>&nbsp;&nbsp;
              <i>招商</i>&nbsp;&nbsp;
              <em>5164681435616851316513568</em>
            </p>
          </div>
        </el-col>
      </el-row>
    </header>
    <!-- 第二部分 数据部分 -->
    <article>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in elTabs" :key="index"></el-tab-pane>
      </el-tabs>
      <shopAdmin v-if="activeName==='shopAdmin'"></shopAdmin>
      <recomAdmin v-else></recomAdmin>
    </article>
  </div>
</template>
<script type="text/ecmascript-6">
import ShopAdmin from './sellerAccountDetailShop'
import RecomAdmin from './sellerAccountDetailRecom'
export default {
  components: {
    ShopAdmin,
    RecomAdmin
  },
  name: 'sellerAccountDetail',
  data () {
    return {
      value3: true,
      activeName: 'shopAdmin',
      elTabs: [
        {
          label: '店铺管理',
          name: 'shopAdmin'
        },
        {
          label: '推荐人员管理',
          name: 'recomAdmin'
        }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      this.activeName = tab.name
      console.log(this.activeName)
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap
  padding 20px
  header
    // background rgba(255, 255, 255, 1)
    // padding 20px
    .row-bg
      margin-top 10px
    .bg-purple
      box-shadow 0 1px 5px 0 rgba(0, 0, 0, 0.2)
      height 251px
      border-radius 4px
      background rgba(255, 255, 255, 1)
      h4
        height 38px
        width 100%
        background rgba(255, 173, 51, 1)
        line-height 38px
        span
          margin-left 20px
          color rgba(255, 255, 255, 1)
          font-size 14px
      .phone
        padding-top 56px
        color rgba(51, 51, 51, 1)
        font-size 14px
        .vip
          margin-left 72px
      div
        padding-left 32px
      .tab
        margin-left -32px
        margin-top 28px
        color rgba(146, 146, 146, 1)
        font-size 14px
        .service
          margin-left 39px
      .wchat
        margin-top 27px
        color rgba(94, 94, 94, 1)
        font-size 14px
        span
          color rgba(38, 38, 38, 1)
        .yaoPerson
          margin-left 59px
      .left
        padding-top 62px
        padding-left 41px
        li
          float left
        .pricMoney
          margin-left 46px
          margin-top 33px
          color rgba(153, 153, 153, 1)
          border-right 1px solid rgba(204, 204, 204, 1)
          padding-right 23px
          span
            color rgba(51, 51, 51, 1)
            line-height 28px
            font-size 28px
          p
            font-size 14px
            margin-top 10px
        .pricMon
          margin-left 24px
          margin-top 33px
          color rgba(153, 153, 153, 1)
          span
            color rgba(51, 51, 51, 1)
            line-height 28px
            font-size 28px
          p
            font-size 14px
            margin-top 10px
      h5
        font-size 14px
        color rgba(51, 51, 51, 1)
        margin-left 20px
        margin-top 56px
      .bank
        margin-top 20px
        margin-left 25px
        font-size 14px
        color rgba(51, 51, 51, 1)
  article
    background rgba(255, 255, 255, 1)
    padding 20px
    margin-top 20px
</style>