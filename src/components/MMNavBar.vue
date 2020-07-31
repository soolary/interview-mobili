<template>
  <van-nav-bar
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    class="MMNavBar"
  >
    <template #left>
      <i id="back" class="iconfont iconbtn_nav_back"></i>
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
  props: ['title', 'leftText', 'rightText'],
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
  #back {
    font-size: 44px;
    color: @black-color;
  }
}
</style>
