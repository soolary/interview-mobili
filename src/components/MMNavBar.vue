<template>
  <van-nav-bar
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    :showBack="true"
    @click-left="onClickLeft"
    @click-right="onClickRight"
    class="MMNavBar"
  >
    <template #left v-if="showBack">
      <!-- <slot name="left"></slot> -->
      <!-- 直接写死 iconfont中的返回按钮即可 -->
      <i class="iconfont iconbtn_nav_back"></i>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'MMNavBar',
  // props: ['title', 'leftText', 'rightText', 'showBack'],
  props: {
    title: { type: String },
    leftText: { type: String },
    rightText: { type: String },
    showBack: { type: Boolean, default: true }
  },
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      this.$emit('onClickLeft')
    },
    onClickRight () {
      this.$emit('onClickRight')
    }
  }
}
</script>

<style lang="less">
.MMNavBar {
  i {
    font-size: 44px;
    color: @black-color;
  }
}
</style>
