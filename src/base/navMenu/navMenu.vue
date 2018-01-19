<template>
  <div class="menu">
    <div class="logo">
      <img src="../../assets/images/logow.png" alt="Logo" class="img">
      <!-- <span style="color:#FF2933;line-height:60px">红商会</span> -->
    </div>
    <div class="router">
      <div class="routerBox" v-for="(item,index) in menus" :key="index" ref="routerBox" @click="setRouterActive">
        <div class="routerHeader" :class="{'routerHeaderActive':isActive===index}">
          <span class="icon iconfont" :class="item.icon"></span>
          <span class="text">{{item.header}}</span>
        </div>
        <router-link tag="div" class="routerLine" v-for="(line,lineIndex) in item.lines" :key="lineIndex" :to="{name:line.link}" ref="routerLine">
          <span class="text">{{line.text}}</span>
          <span class="bradge" v-if="line.bradge">{{line.bradge}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'navMenu',
  data () {
    return {
      isActive: 0
    }
  },
  computed: {
    menus: {
      get () {
        return [
          {
            icon: 'icon-renwuguanli',
            header: '任务管理',
            routerHead: 'task',
            lines: [
              {
                text: '任务管理',
                link: 'task'
                // bradge: 12
              }
            ]
          },
          {
            icon: 'icon-coupons-',
            header: '订单管理',
            routerHead: 'order',
            lines: [
              {
                text: '派单管理',
                link: 'orderManger'
              },
              {
                text: '任务包管理',
                link: 'taskPackage'
              },
              {
                text: '订单查询',
                link: 'orderFind'
              },
              {
                text: '订单驳回处理',
                link: 'orderRegectDetail'
              },
              {
                text: '评价驳回处理',
                link: 'orderEvaluteRegect'
              }
            ]
          },
          {
            icon: 'icon-Finance-',
            header: '资金管理',
            routerHead: 'money',
            lines: [
              {
                text: '买家提现',
                link: 'buyerApply'
              },
              {
                text: '商家提现',
                link: 'sellerApply'
              },
              {
                text: '商家充值',
                link: 'sellerRecharge'
                // bradge: 12
              }
            ]
          },
          {
            icon: 'icon-zhanghaoguanli-',
            header: '帐号管理',
            routerHead: 'account',
            lines: [
              {
                text: '商家帐号',
                link: 'sellerAccount'
                // bradge: 12
              },
              {
                text: '买家帐号',
                link: 'buyerAccount'
              }
            ]
          },
          {
            icon: 'icon-complaint-',
            header: '投诉处理',
            routerHead: 'complain',
            lines: [
              {
                text: '商家投诉',
                link: 'sellerComplain'
              }
            ]
          }
        ]
      },
      set (val) {
        return val
      }
    }
  },
  methods: {
    setRouterActive () {
      this.$nextTick(() => {
        let activeRouter = this.$route.path
        if (activeRouter.indexOf('task') !== -1) {
          this.isActive = 0
        } else if (activeRouter.indexOf('order') !== -1) {
          this.isActive = 1
        } else if (activeRouter.indexOf('money') !== -1) {
          this.isActive = 2
        } else if (activeRouter.indexOf('account') !== -1) {
          this.isActive = 3
        } else if (activeRouter.indexOf('complain') !== -1) {
          this.isActive = 4
        }
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/variable'
.menu
  background #0a1727
  height 100%
  .logo
    height $normal-height
    background $bg-small
    text-align center
    .img
      position relative
      width 150px
  .router
    .routerBox
      font-size 0
      .routerHeader
        height $line-height
        line-height $line-height
        color $color-normal-d
        font-size $font-size-normal
        cursor pointer
        position relative
        &.routerHeaderActive
          color $color-hover
        .text
          margin-left 48px
        .icon
          text-align center
          position absolute
          top 0
          left 20px
      .routerLine
        position relative
        height $line-height
        line-height $line-height
        color $color-normal
        font-size $font-size-small
        background $bg-small
        cursor pointer
        &:hover
          background $bg-active
          transition background-color 0.3s, color 0.3s
          &::before
            content ''
            height 100%
            width 5px
            background $bg-red
            position absolute
            transition all 0.3s
        &.router-link-active
          background $bg-active
          &::before
            content ''
            height 100%
            width 5px
            background $bg-red
            position absolute
        .text
          margin-left 48px
        .bradge
          position absolute
          height 12px
          line-height 12px
          margin 12px 0
          right 15px
          background $bg-red
          border-radius 10px
          padding 2px 4px
          text-align center
</style>
