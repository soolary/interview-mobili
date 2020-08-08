<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="find">
      <MMNavBar :showBack="false" title="发现"> </MMNavBar>
      <div class="technic">
        <MMCell title="面试技巧" value="查看更多"></MMCell>
        <div class="technic-list">
          <div class="item" v-for="item in technicList" :key="item.id">
            <div class="left">
              <h3>
                {{ item.title }}
              </h3>
              <div class="detail-box">
                <div class="time">{{ item.created_at | formatTime }}</div>
                <div class="read">
                  <i class="iconfont iconicon_liulanliang"></i>
                  {{ item.read }}
                </div>
                <div class="star">
                  <i class="iconfont iconicon_dianzanliang"></i>
                  {{ item.star }}
                </div>
              </div>
            </div>
            <div class="cover" v-if="item.cover">
              <img :src="item.cover" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="data">
        <MMCell title="市场数据" value="查看更多"></MMCell>
        <div class="data-content">
          <div class="tags">
            <span class="tag">{{ hotData.city }}</span>
            <span class="tag">{{ hotData.position }}</span>
          </div>
          <div class="data-list">
            <div class="item" v-for="(item, index) in dataList" :key="index">
              <div class="time">{{ item.year }}</div>
              <div class="process">
                <div
                  class="step"
                  :style="{
                    width:
                      ((item.salary / hotData.topSalary) * 100).toFixed(1) + '%'
                  }"
                >
                  ￥{{ item.salary }}
                </div>
              </div>
              <div class="arrow-box">
                <i
                  class="iconfont "
                  :class="{
                    iconicon_shangsheng: item.percent > 0,
                    iconicon_xiajiang: item.percent < 0
                  }"
                ></i>
                <span v-if="item.percent">{{ item.percent }}%</span>
              </div>
            </div>
          </div>
          <div class="more" @click="toggleData">
            展开更多
            <i class="iconfont " :class="{ rotate: isAll }"></i>
          </div>
        </div>
        <div class="share-container">
          <MMCell
            title="面经分享"
            value="查看更多"
            @click="$router.push('/sharelist')"
          >
          </MMCell>
          <div class="list">
            <MMShare
              class="share-content"
              v-for="item in shareList"
              :key="item.id"
              :item="item"
            >
              <!-- <div class="list">
              <div
                class="item van-hairline--bottom"
                v-for="item in shareList"
                :key="item.id"
              >
                <h3>
                  {{ item.title }}
                </h3>
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
            </div> -->
            </MMShare>
          </div>
        </div>
      </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { technicList, hotData, shareList } from '@/api/find/find.js'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  name: 'find',

  data () {
    return {
      technicList: [],
      hotData: {},
      dataList: [],
      isAll: false,
      shareList: [],
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.getData()
        // this.$toast.clear()
        // 关闭loading
        this.isLoading = false
      }, 500)
    },
    getData () {
      hotData().then(res => {
        this.hotData = res.data
        this.hotData.yearSalary.reverse()
        this.dataList = res.data.yearSalary.slice(0, 4)
      })
      technicList().then(res => {
        res.data.list.forEach(v => {
          if (v.cover) {
            v.cover = process.env.VUE_APP_URL + v.cover
          }
          this.technicList = res.data.list
        })
      })
      shareList().then(res => {
        console.log(res)
        res.data.list.forEach(v => {
          if (v.author.avatar) {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
          }
        })
        this.shareList = res.data.list
      })
    },
    toggleData () {
      this.isAll = !this.isAll
      if (this.isAll === true) {
        this.dataList = this.hotData.yearSalary
      } else {
        this.dataList = this.hotData.yearSalary.slice(0, 4)
      }
    }
  },
  filters: {
    formatTime (value) {
      return moment(value)
        .startOf('day')
        .fromNow()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less">
.find {
  padding: 31px 15px;
  padding-bottom: 100px;
  .van-cell__title span {
    font-size: 18px;
    font-weight: 600;
  }
  .van-cell {
    padding: 10px 0;
  }
  .technic {
    .technic-list {
      background-color: @white-color;
      .item {
        display: flex;
        align-items: center;
        .left {
          flex: 1;
          h3 {
            font-weight: 600;
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .detail-box {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: @minor-font-color;
            .time {
              flex: 1;
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
        .cover {
          margin-left: 20px;
          img {
            display: block;
            width: 113px;
            height: 75px;
            border-radius: 8px;
          }
        }
      }
    }
  }
  .data {
    background: @white-color;

    .tags {
      margin-bottom: 20px;
      .tag {
        background: @minor-font-color;
        color: @subdominant-font-color;
        font-size: 12px;
        padding: 5px;
        margin-right: 10px;
        border-radius: 8px;
      }
    }
    // 列表
    .data-list {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .time {
          font-size: 12px;
          color: @subdominant-font-color;
          margin-right: 15px;
        }
        .process {
          height: 12px;
          background: @minor-font-color;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 15px;
          flex: 1;
          .step {
            height: 100%;
            width: 50%;
            background: @error-color;
            color: @white-color;
            text-align: right;
            font-size: 12px;
            padding-right: 5px;
            border-radius: 8px;
          }
        }
        .arrow-box {
          display: flex;
          align-items: center;
          font-size: 12px;
          width: 50px;
          i {
            font-size: 16px;
            // 箭头下
            &.iconicon_xiajiang {
              color: @error-color;
            }
            // 箭头上
            &.iconicon_shangsheng {
              color: @success-color;
            }
          }
        }
      }
    }
    // 更多
    .more {
      display: flex;
      justify-content: center;
      font-size: 12px;
      color: @subdominant-font-color;
      align-items: center;
      i {
        color: @minor-font-color;
        font-size: 14px;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
  // 面经分享
  .share-container {
    background: @white-color;
    .list {
      .item {
        h3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 14px;
          font-weight: 600;
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
          .time,
          .comment,
          .star {
            font-size: 12px;
            color: @minor-font-color;
          }
          .time {
            margin-right: 20px;
          }
          .comment {
            margin-right: 20px;
            display: flex;
            align-items: center;
            i {
              font-size: 16px;
            }
          }
          .star {
            display: flex;
            align-items: center;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
