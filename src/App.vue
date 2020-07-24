<template>
  <div id="app">
    <div id="nav">
      <van-button class="test ">123cd </van-button>
      <i class="iconfont iconbtn_share">123</i>
    </div>
  </div>
</template>
<script>
export default {
  // 123
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  .test {
    // background-color: @success-color;
    width: 150px;
    height: 4rem;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
