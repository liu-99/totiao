<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <img src="./logo_index.png" alt />
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码">
              <i slot="prefix" class="el-input__icon iconfont icon-shouji"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码">
             <i slot="prefix" class="el-input__icon iconfont icon-dunpai"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="xieyi" style="text-align:left;">
          <el-checkbox v-model="loginForm.xieyi" style="margin-right:10px;"></el-checkbox>
          <span>我已经阅读并同意用户协议和隐私条款</span>
        </el-form-item>
        <el-form-item>
          <el-button :loading="isActive" :disabled="isActive" style="width:100%;" type="primary" @click="login()">登录</el-button>
          <!-- <el-button :loading="true/false" :disabled="true/false">登录</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import '@/assets/js/gt.js'
import '@/assets/iconfont/iconfont.css'

export default {
  data () {
    var xieyiTest = function (rule, value, callback) {
      // if (value) {
      //   callback()
      // } else {
      //   callback(new Error('无条件遵守我们的规则'))
      // }
      value ? callback() : callback(new Error('无条件遵守我们的规则'))
    }
    return {
      // 登录按钮等待禁用
      isActive: false,
      // 极验窗口对象
      ctaObj: null,
      loginForm: {
        mobile: '13599997777',
        code: '246810',
        xicyi: false
      },
      loginFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号码必填'
          },
          {
            pattern: /^1[35789]\d{9}$/,
            message: '手机号码格式不对'
          }
        ],
        code: [{ required: true, message: '验证码必填' }],
        xieyi: [{ validator: xieyiTest }]
      }
    }
  },
  methods: {
    // 登录系统
    login () {
      // 全部表单域项目校验
      // 获取from表单组件的语句：this.$refs.loginFormRef
      // form组件。validate(回调函数)
      // 参数valid：会体现布尔值，表示校验是否成功
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          if (this.ctaObj !== null) {
            return this.ctaObj.verify()
          }
          // 登录按钮禁用等待
          this.isActive = true
          // 表单校验成功
          let pro = this.$http.get(`/captchas/${this.loginForm.mobile}`)
          pro
            .then(result => {
              console.log(result)
              let { data } = result.data
              window.initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: true,
                product: 'bind'
              }, captchaObj => {
                captchaObj.onReady(() => {
                  captchaObj.verify()
                  this.ctaObj = captchaObj // 已经极验对象赋予给catobj
                  // 登录按钮状态恢复
                  this.isActive = false
                }).onSuccess(() => {
                  this.loginAct()
                }).onError(() => {
                  // your code
                })
              })
            })
            .catch(err => {
              return this.$message.error('获取极验初始校验信息错误' + err)
            })
          // axios发送请求进行账号真实性校验
          // this.loginAct()
        }
      })
    },
    loginAct () {
      let pro = this.$http.post('/authorizations', this.loginForm)
      pro
        .then(result => {
          // console.log(result)
          if (result.data.message === 'OK') {
            window.sessionStorage.setItem(
              'userinfo',
              JSON.stringify(result.data.data)
            )
            this.$router.push('/home')
          }
        })
        .catch(err => {
          return this.$message({
            type: 'error',
            message: '用户名或密码错误' + err,
            duration: 1000
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: gray;
  background-image: url(./login_bg.jpg);
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 400px;
    height: 340px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    img {
      width: 50%;
      margin: 20px auto;
    }
    .el-form {
      width: 75%;
    }
  }
}
</style>
