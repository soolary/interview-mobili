<template>
  <div>
    <div
      class="item van-hairline--bottom"
      @click="$router.push(`/sharedetail/${item.id}`)"
    >
      <h3 v-html="item.title"></h3>
      <div class="desc">
        {{ item.content }}
      </div>
      <div class="detail-box">
        <div class="user">
          <img :src="item.author.avatar" alt="" />
          {{ item.author.nickname }}
        </div>
        <div class="time">
          {{ item.created_at | formatTime }}
        </div>
        <div class="comment">
          <i class="iconfont iconicon_pinglunliang"></i>
          {{ item.artical_comment }}
        </div>
        <div class="star">
          <i class="iconfont iconicon_dianzanliang"></i>
          {{ item.star }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MMShare',
  props: { item: { type: Object } }
}
</script>

<style lang="less" scope>
.item {
  padding-bottom: 10px;
  h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 14px;
    font-weight: 600;
    /deep/ span {
      color: @main-color;
    }
  }
  .desc {
    font-size: 12px;
    color: @subdominant-font-color;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .detail-box {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: @minor-font-color;
    .user {
      display: flex;
      align-items: center;
      color: @subdominant-font-color;
      font-size: 12px;
      flex: 1;
      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .time {
      margin-right: 20px;
    }
    .read {
      margin-right: 20px;
      display: flex;
      align-items: center;
      i {
        margin-right: 10px;
        font-size: 16px;
      }
    }
    .star {
      display: flex;
      align-items: center;
      i {
        margin-right: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>
