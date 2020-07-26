<template>
  <van-cell class="mm-cell" @click="clickCell" :title="title" :value="value">
    <template #icon>
      <i class="iconfont" :class="icon"></i>
    </template>
    <template #right-icon>
      <i class="iconfont iconicon_more"></i>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'MMCell',
  props: ['title', 'value', 'icon'],
  methods: {
    clickCell () {
      // console.log(456)
      // this.$emit('click')
    }
  }
}
</script>

<style lang="less">
.mm-cell {
  .iconfont {
    // width: 21px;
    // height: 21px;
    font-size: 21px;
  }
  .vab-cell__title {
    margin-left: 13px;
  }
  .iconicon_more {
    font-size: 14px;
    margin-left: 9px;
  }
  &::after {
    background: transparent;
  }
}
</style>
