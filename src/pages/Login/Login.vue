<template>
<section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:isOn}" @click="isOn=true">短信登录</a>
            <a href="javascript:;" :class="{on:!isOn}" @click="isOn=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login()">
            <div :class="{on:isOn}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightphone" class="get_verification"  @click.prevent="getTime"  :class="{rightphone:rightphone}">
                  {{computedTime>0 ? `已发送(${computedTime}s)`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!isOn}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                  <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                  @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      
      <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
</section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {reqSendCode,reqSms,reqLoginPwd} from '../../api'
 export default {
   data () {
     return {
       isOn:true,
       phone:'',
       computedTime:0,
       showPwd:false,
       phone:'',//手机号
       code:'', //验证码
       name:'', //手机/邮箱/用户名
       pwd:'', //密码
       captcha:'', // 图形验证码
       showAlert:false, //是否显示提醒框
       alertText:'',//传递的内容
     }
   },
   computed: {
     rightphone () {
       return /^1\d{10}$/.test(this.phone)
     }
   },
   methods: {    
     async getTime () {      
       if (!this.computedTime) {
         //启动定时器 
         this.computedTime = 30
         this.intervalId = setInterval(() => {
         this.computedTime--;
        if (this.computedTime<0) {
          //销毁定时器
          clearInterval(this.intervalId)
        }
      },1000)    
      //发送ajax请求
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 显示错误
          this.alertShow(result.msg)
          if (this.computedTime) {
            this.computedTime = 0
            this.clearInterval(this.intervalId)
            this.intervalId = null
          }
          // 清除定时器
          
        }
       }
         
         
     },
    
     alertShow (alertText) {
        this.showAlert = true;
        this.alertText = alertText
     },

    async login () {
       let result
       if (this.isOn) {    
         //如果为手机验证登陆
         const {phone,code,rightphone} = this;
         if (!this.rightphone) {
           //手机号不正确
          return this.alertShow('手机号不正确')
         }else if (!/^\d{6}$/.test(code)) {
           //验证码必须是六位数字
          return this.alertShow('验证码必须是六位数字')
         }
          result = await reqSms(phone,code)

       }else {
         //账号密码验证
         const {name,captcha,pwd} = this
         if (!this.name) {
           //用户名必须指定
           return this.alertShow('用户名必须指定')
         }else if (!this.pwd) {
           //密码必须指定
           return this.alertShow('密码必须指定')
         }else if (!this.captcha) {
           //验证码不正确
           return this.alertShow('验证码必须指定')
         }
           result = await reqLoginPwd({name,captcha,pwd})     
       }
        if (this.computedTime) {
            this.computedTime = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }

        if (result.code === 0) {
          //将user保存到vuex中
            const user = result.data;
            this.$store.dispatch('reqLogin',user)
           //实行网页跳转
           this.$router.replace('/profile')
         } else {
           //提示错误信息
           const msg = result.msg;
           this.alertShow(msg)   
           this.getCaptcha()     
         }
     },
      closeTip () {
        this.showAlert = false;
        this.alertText = ''
     },
     getCaptcha () {
       this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
     },

   },
   components: {
     AlertTip
   }
 }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl'
 .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.rightphone
                    color green
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999

</style>
