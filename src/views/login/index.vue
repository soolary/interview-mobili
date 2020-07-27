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
            <span @click="getCode" class="code-btn van-hairline--left"
              >获取验证码</span
            >
          </van-col>
        </van-row>
        <!-- 用户协议 -->
        <p class="deal">
          登录即同意<span>《用户使用协议》</span>和<span>《隐私协议》</span>
        </p>
        <div class="submit-box">
          <van-button round block type="danger" native-type="submit">
            {{ $store.state.xxx }}
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { getCode } from '@/api/login/login.js'
export default {
  data () {
    return {
      mobile: '',
      code: ''
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
      this.$refs.loginForm.validate('mobile').then(res => {
        this.$toast.loading({ duration: 0 })
      })
      getCode({ mobile: this.mobile }).then(res => {
        this.$toast.success(res.data)
      })
    },
    onSubmit () {
      console.log('提交')
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100vh;
  background: @white-color;
  .iconfont {
    font-size: 16px;
  }
  .main-box {
    padding: 0 15px;
    h2 {
      margin: 0;
      margin-top: 50px;
      margin-bottom: 63px;
      font-size: 18px;
      font-weight: 600;
    }
    .btn-col {
      height: 45px;
      display: flex;
      align-items: center;
    }
    .code-btn {
      display: inline-block;
      line-height: 29px;
      height: 29px;
      padding-left: 15px;
      font-size: 16px;
      color: #00b8d4;
    }
    .van-row {
      border-bottom: 1px solid #f7f4f5;
    }
    .deal {
      font-size: 12px;
      margin-top: 15px;
      span {
        color: #00b8d4;
      }
    }
    .submit-box {
      margin-top: 44px;
    }
  }
}
</style>
