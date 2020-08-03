<template>
  <div class="interview-search-container">
    <!-- 顶部 -->
    <div class="top-box">
      <MMNavBar title="面试技巧搜索"></MMNavBar>
      <van-search
        shape="round"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <template #left-icon>
          <i class="iconfont iconicon_search"></i>
        </template>
      </van-search>
    </div>
    <!-- 搜索选项 -->
    <div class="option-box">
      <!-- 热搜区域 -->
      <div v-if="shareList.length === 0" class="section">
        <div class="title">大家都在搜索</div>
        <ul class="tags">
          <li
            class="tag"
            v-for="(item, index) in topSearch"
            :key="index"
            @click="clickAndSearch(item)"
          >
            {{ item }}
          </li>
          <!-- <li class="tag">产品</li>
          <li class="tag">运营</li>
          <li class="tag">设计师</li> -->
        </ul>
        <!-- 历史记录区域 -->
        <div class="section">
          <div class="title">历史记录 <span>清空</span></div>
          <div class="tags">
            <span
              class="tag"
              v-for="(item, index) in history"
              :key="index"
              @click="clickAndSearch(item)"
              >{{ item }}</span
            >
            <!-- <span class="tag">产品</span>
          <span class="tag">运营</span>
          <span class="tag">设计师</span> -->
          </div>
        </div>
      </div>
      <div v-else>
        <MMShare
          v-for="(item, index) in shareList"
          :key="index"
          :item="item"
        ></MMShare>
      </div>
    </div>
  </div>
</template>

<script>
import { shareTopSearch, shareList } from '@/api/find/find.js'
import { getHistory, removeHistory, saveHistory } from '@/utils/shareHistory.js'

export default {
  data () {
    return {
      value: '',
      shareList: [],
      history: getHistory(),
      topSearch: []
    }
  },
  created () {
    shareTopSearch().then(res => {
      console.log(res.data)
      this.topSearch = res.data
    })
  },
  methods: {
    clickAndSearch (item) {
      this.value = item
      this.onSearch()
    },
    removeItem (index) {
      this.history.splice(index, 1)
    },
    clearHistory () {
      removeHistory()
      this.history = []
    },
    onSearch () {
      if (!this.value) {
        this.$toast.fail('没有你查个锤子')
        return
      }
      this.history.unshift(this.value)
      this.history = [...new Set(this.history)]
      if (this.history.length > 5) {
        this.history.pop()
      }
      saveHistory(this.history)
      shareList({ q: this.value }).then(res => {
        res.data.list.forEach(v => {
          if (v.author.avatar) {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
          }
          v.title = v.title.replace(this.value, `<span>${this.value}</span>`)
        })
        this.shareList = res.data.list
      })
    }
  }
}
</script>

<style lang="less">
.interview-search-container {
  .top-box {
    padding-bottom: 11px;
    background: @white-color;
    position: relative;
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
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .van-search__content {
      background: #f7f4f5;
      font-size: 14px;
      color: #b3b3b3;
      .iconfont {
        font-size: 19px;
        color: #b3b3b3;
      }
    }
  }
  // 搜索选项
  .option-box {
    padding: 15px;

    .section {
      margin-bottom: 27px;
      .title {
        font-size: 18px;
        font-weight: 500;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 12px;
          color: #545671;
        }
      }
      .tags {
        margin-top: 18px;
        display: flex;
        .tag {
          margin-right: 10px;
          margin-bottom: 11px;
          padding: 6px;
          border-radius: 4px;
          font-size: 12px;
          color: @subdominant-font-color;
          background-color: #eceaea;
        }
      }
    }
  }
  .result-box {
    padding: 15px;
  }
}
</style>
