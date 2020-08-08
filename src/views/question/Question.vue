<template>
  <div class="ai">
    <div>人工智能小爱</div>
    <van-field class="text" v-model="text" @keyup.enter="answer"></van-field>
    <van-button class="btn" type="primary" @click="answer">发送</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
    answer () {
      var answer = this.text.replace(/[嘛吗]$/, '呀')
      answer = answer.replace('我', '你')
      answer = answer.replace('你', '我')
      this.$toast(answer)
    }
  }
}
</script>

<style lang="less">
.ai {
  text-align: center;
  color: #095;
  .text {
    height: 30px;
    width: 250px;
    line-height: 30px;
    border: 1px solid red;
    margin: 0 auto;
  }
  .btn {
    height: 30px;
    width: 100px;
  }
}
</style>
