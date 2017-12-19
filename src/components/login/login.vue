<template>
  <div class="login">
    <div class="logLeft">
      <img :src="loginImg" alt="">
      <div class="logo">
        <!-- <img src="./logo.png" alt="logo"> -->
      </div>
      <h1>后台管理系统</h1>
    </div>
    <div class="logoRight" @keyup.13="LogoIn">
      <div class="logoBox">
        <h2>用户登录</h2>
        <div class="border_img">
          <img src="./logoInPng.jpg" alt="">
        </div>
        <div class="inputs">
          <span class="iconfont icon-user"></span>
          <input type="text" class="userName" @focus="waringText=''" v-model="username" placeholder="请输入姓名">
          <span></span>
        </div>
        <div class="inputs pass">
          <span class="iconfont icon-lock"></span>
          <input v-show="canSeePass" v-model="password" @focus="waringText=''" type="text" class="passWord" placeholder="请输入密码">
          <input v-show="!canSeePass" v-model="password" @focus="waringText=''" type="password" class="passWord" placeholder="请输入密码">
          <span class="iconfont eyes" :class="{ 'icon-no-see': !canSeePass, 'icon-see':  canSeePass }" @click="canSeePass = !canSeePass"></span>
        </div>
        <p class="waring">
          <span>{{ waringText }}</span>
        </p>
        <div class="btn" @click="LogoIn">登录</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'md5'
import loginImg from '../../assets/images/login.jpg'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      waringText: '',
      canSeePass: false,
      loginImg: loginImg
    }
  },
  methods: {
    LogoIn () {
      if (this.username === '' || this.password === '') {
        this.waringText = '请输入正确用户名或密码！'
        return false
      } else if (this.password.length < 6) {
        this.waringText = '密码至少6位！'
        return false
      } else {
        // 注册
        // this.$ajax.post('/api/operateAccount/register', {
        //   telephone: this.username,
        //   password: md5(this.password)
        // }).then((data) => {
        //   if (data.data.code === '200') {
        //     this.$message({
        //       message: '注册成功',
        //       type: 'success'
        //     })
        //   } else {
        //     this.$message({
        //       message: data.data.message,
        //       type: 'warning'
        //     })
        //   }
        // }).catch(() => {
        //   this.$message.error('服务器错误！')
        // })
        // 登录
        this.$ajax.post('/api/operateAccount/login', {
          telephone: this.username,
          password: md5(this.password)
        }).then((data) => {
          console.log(data)
          if (data.data.code === '200') {
            this.setUserInfo(data.data.data)
            this.setUserToken(data.headers.accesstoken)
            this.$message({
              message: '登录成功,页面跳转中...',
              type: 'success',
              onClose: () => {
                this.$router.push({ name: 'task' })
              }
            })
          } else {
            this.$message({
              message: data.data.message,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error('服务器错误！')
        })
      }
    },
    ...mapActions([
      'setUserInfo',
      'setUserToken'
    ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background #f0f0f0
  display flex
  justify-content space-between
  .logLeft::before
    content ''
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.26)
  .logLeft
    position relative
    width 42.6%
    min-width 350px
    img
      width 100%
      height 100%
    .logo
      position absolute
      top 0
      left 0
      right 0
      bottom 38px
      border-radius 50%
      margin auto
      width 120px
      height 120px
      // background url('./logo.png') rgba(255, 255, 255, 0.5) center no-repeat
      background-size 70px 70px
      background-color #ff3344
      &:after
        content 'Y'
        color #ffffff
        position absolute
        top 0
        bottom 0
        right 0
        left 0
        margin auto
        font-size 70px
        line-height 120px
        text-align center
    h1
      font-size 30px
      font-weight 500
      color #ffffff
      text-align center
      position absolute
      width 100%
      height 30px
      bottom 75px
  .logoRight
    flex 1
    display flex
    justify-content center
    /* flex-direction column */
    align-items center
    .logoBox
      width 468px
      height 400px
      background #ffffff
      box-shadow 0 1px 5px 0 #ffffff
      border-radius 4px
      h2
        margin-top 45px
        margin-bottom 24px
        text-align center
        font-size 18px
        font-weight 500
        color #666666
      .border_img
        height 8px
        text-align center
        margin-bottom 42px
        img
          height 8px
      .inputs
        width 340px
        height 16px
        padding 8px 0
        border-bottom 1px solid #cccccc
        margin 0 auto 40px
        span
          font-size 16px
          padding-left 12px
          padding-right 12px
          color #666666
          line-height 16px
        .eyes:hover
          color #333333
          cursor pointer
        input
          width 230px
          vertical-align top
          padding 0 12px
          height 16px
          line-height 16px
          font-size 16px
          outline none
          color #333333
        :-moz-placeholder /* Mozilla Firefox 4 to 18 */
          color lightgray
        ::-moz-placeholder /* Mozilla Firefox 19+ */
          color lightgray
        input:-ms-input-placeholder
          color lightgray
        input::-webkit-input-placeholder
          color lightgray
      .pass
        margin-bottom 0
      .btn
        width 340px
        height 40px
        border-radius 4px
        background-color #ff2933
        cursor pointer
        margin 24px auto 0
        color #ffffff
        font-size 16px
        line-height 40px
        text-align center
      .btn:hover
        background red
      .waring
        width 340px
        height 28px
        margin 0 auto
        span
          color #ff3341
          font-size 12px
          line-height 28px
</style>
