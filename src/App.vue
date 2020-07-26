<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar
      v-if="$route.meta.showTabbar"
      route
      active-color="#e40137"
      inactive-color="#b4b4bd"
    >
      <van-tabbar-item to="/company">
        <span>公司</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_sel"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/question">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_sel"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/find">
        <span>发现</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_sel"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon>
          <i class="iconfont iconicon_footbar_gs_sel"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  // 12345
  // 12345
}
</script>

<style lang="less">
.app {
  // 调整字体图标的大小
  .iconfont {
    font-size: 28px;
  }
}
</style>
