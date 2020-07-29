<template>
  <div class="info">
    <MMNavBar title="我的资料"> </MMNavBar>
    <div class="content">
      <van-cell class="avatar" title="头像">
        <template #default>
          <img src="@/assets/avatar.png" alt="" />
        </template>
        <template #right-icon>
          <i class="iconfont iconicon_more"></i>
        </template>
      </van-cell>
      <van-cell-group class="data">
        <MMCell title="昵称" value="续命咖啡"></MMCell>
        <MMCell title="性别" value="男"></MMCell>
        <MMCell title="地区" value="北京市"></MMCell>
        <MMCell title="个人简介" value="无"></MMCell>
      </van-cell-group>
      <div class="exit">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less">
.info {
  background-color: #ccc;
  padding: 44px 0 0;
  .content {
    border-radius: 8px;
    padding: 10px 19px 15px;
    // padding: 18px 15px;
    .avatar {
      height: 60px;
      line-height: 40px;
      margin-bottom: 10px;
      border-radius: 8px;
      img {
        border-radius: 100%;
        margin-right: 8px;
        height: 40px;
        width: 40px;
      }
    }
    .data {
      border-radius: 8px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    .exit {
      // width: 100%;
      border-radius: 8px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: @main-color;
      background: @white-color;
    }
  }
}
</style>
