<template>
  <div class="experience-list-container">
    <van-sticky>
      <div class="top-box">
        <MMNavBar
          title="面试技巧"
          @onClickLeft="$router.push('/find')"
        ></MMNavBar>
        <div class="search-box" @click="$router.push('/sharesearch')">
          <div class="content">
            <i class="iconfont iconicon_search"></i> 请输入关键字
          </div>
        </div>
      </div>
    </van-sticky>
    <!-- 列表 -->
    <div class="experience-box">
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="一滴都没有了"
        @load="onload"
      >
        <div class="experience-list">
          <MMShare
            class="share-content"
            v-for="item in shareList"
            :key="item.id"
            :item="item"
          ></MMShare>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { shareList } from '../../api/find/find'
export default {
  name: 'shareList',
  data () {
    return {
      shareList: [],
      loading: false,
      finished: false,
      start: 0,
      limit: 5
    }
  },
  methods: {
    onload () {
      shareList({ start: this.start, limit: this.limit }).then(res => {
        console.log(res.data)
        res.data.list.forEach(v => {
          if (v.author.avatar) {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
          }
        })
        this.shareList.push(...res.data.list)
        this.start += this.limit
        if (this.shareList.length >= res.data.total) {
          this.finished = true
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
.experience-list-container {
  padding: 31px 0;
  min-height: 100vh;
  background: @white-color;
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .search-box {
    position: relative;
    font-size: 14px;
    color: #b3b3b3;
    padding-bottom: 10px;
    .content {
      height: 34px;
      width: 345px;
      margin: 0 auto;
      background: @bg-color;
      border-radius: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      border: 0 solid #ebedf0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom-width: 0.02667rem;
    }
    .iconfont {
      font-size: 19px;
    }
  }
  .experience-box {
    padding: 0 15px;
    background: @white-color;
  }
}
</style>
