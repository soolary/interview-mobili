<template>
  <div class="login">
    <!-- 导航栏 -->
    <MMNavBar @onClickLeft="onClickLeft"></MMNavBar>
    <!-- 主体区域 -->
    <div class="main-box">
      <!-- 标题 -->
      <h2>您好，请登录</h2>
      <!-- 表单 -->
      <van-form @submit="onSubmit" ref="loginForm">
        <!-- 手机号 -->
        <van-row>
          <van-col span="24">
            <van-field
              v-model="mobile"
              name="mobile"
              placeholder="请输入手机号"
              type="tel"
              :rules="[
                {
                  required: true,
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号格式不对'
                }
              ]"
            >
              <!-- 插槽自定义左侧图标 -->
              <template #left-icon>
                <i class="iconfont iconbianzu1"></i>
              </template>
            </van-field>
          </van-col>
        </van-row>

        <!-- 验证码 -->
        <van-row>
          <van-col span="16">
            <van-field
              v-model="code"
              name="code"
              type="digit"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请输入验证码' }]"
            >
              <template #left-icon>
                <i class="iconfont iconyanzhengma"></i>
              </template> </van-field
          ></van-col>
          <van-col class="btn-col" span="8">
            <!-- 获取验证码按钮 -->
            <span @click="getCode" class="code-btn van-hairline--left">{{
              btnText
            }}</span>
          </van-col>
        </van-row>
        <!-- 用户协议 -->
        <p class="deal">
          登录即同意<span>《用户使用协议》</span>和<span>《隐私协议》</span>
        </p>
        <div class="submit-box">
          <van-button round block type="danger" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- <button @click="change">{{ $store.state.xxx }}</button> -->
  </div>
</template>

<script>
import { getCode, login } from '@/api/login/login.js'
import { setToken } from '@/utils/local.js'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      btnText: '获取验证码',
      delay: 0
    }
  },
  methods: {
    change () {
      this.$store.commit('xxx', 777)
    },
    onClickLeft () {
      console.log('left')
    },
    onClickRight () {
      console.log('right')
    },
    getCode () {
      if (this.delay !== 0) {
        return
      }
      this.$refs.loginForm.validate('mobile').then(res => {
        this.$toast.loading({ duration: 0 })

        getCode({ mobile: this.mobile }).then(res => {
          this.$toast.success(res.data)
        })
      })
      this.delay = 10
      this.btnText = this.delay + 's后重试'
      const interID = setInterval(() => {
        this.delay--
        this.btnText = this.delay + 's后重试'
        if (this.delay <= 0) {
          clearInterval(interID)
          this.btnText = '获取验证码'
        }
      }, 1000)
    },

    onSubmit (value) {
      this.$toast.loading({ duration: 0 })
      login(value).then(res => {
        this.$toast.success(res.message)
        // 保存token和用户信息（vuex)
        setToken(res.data.jwt)
        this.$store.commit('setUserinfo', res.data.user)
        this.$router.push('/my')
        // console.log(this.$store.state.userinfo)
      })
    }
  }
}
</script>

<style></style>
