<template>
  <div class="experience-detail-container">
    <!-- 导航栏 -->
    <MMNavBar></MMNavBar>
    <van-skeleton title avatar :row="20" v-if="shareDetail === ''" />
    <template v-else>
      <!-- 顶部 -->
      <div class="top-box">
        <div class="title">
          {{ shareDetail.title }}
        </div>
        <div class="info-box">
          <img :src="shareDetail.author.avatar" alt="" />
          <div class="name-box">
            <span class="name">{{ shareDetail.author.nickname }}</span>
            <span class="time">{{ shareDetail.created_at | formatTime }}</span>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="experience-content" v-html="shareDetail.content"></div>
      <!-- 评论 -->
    </template>
    <div class="comment-box">
      <!-- 顶部评论 -->
      <div class="title">评论 <span class="num">68</span></div>
      <!-- 每一项 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="comment" v-for="item in commentList" :key="item.id">
          <!-- 姓名 点赞区域 -->
          <div class="info-box">
            <img :src="item.author.avatar" alt="" />
            <div class="name-box">
              <span class="name">{{ item.author.nickname }}:</span>
              <span class="time">{{ item.created_at | formatTime }}</span>
            </div>
            <div class="zan-box">
              <span>{{ item.star }}</span>
              <i class="iconfont iconbtn_dianzan_small_nor"></i>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="content-box">
            <div class="content" @click="showPop(item)">{{ item.content }}</div>
            <div class="reply-box" v-if="item.children_comments.length > 0">
              <div
                class="reply"
                v-for="it in item.children_comments"
                :key="it.id"
              >
                <span class="name">{{ it.author }}:</span>
                {{ it.content }}
              </div>
            </div>
          </div>
          <!-- 底部盒子 -->
          <div class="bottom-box">
            <div class="input" @click="showPop()">我来补充两句</div>
            <div class="shoucang">
              <i class="iconfont iconbtn_shoucang_nor"></i>
              234
            </div>
            <div class="star">
              <i
                class="iconfont iconbtn_dianzan_small_nor"
                @click="supportArticle"
              ></i>
              125
            </div>
            <div class="share" @click="showShare = true">
              <i class="iconfont iconbtn_share"></i>
              998
            </div>
          </div>
          <!-- 底部回复弹出层 -->
          <van-popup
            class="input-pop"
            v-model="show"
            position="bottom"
            :style="{ height: '24%' }"
          >
            <van-field
              autosize
              type="textarea"
              autofocus
              v-model="value"
              :placeholder="placeholder"
              rows="4"
            />
            <span @click="subComment">发送</span>
          </van-popup>
          <!-- 分享弹出层 -->
          <van-popup v-model="showShare">
            <div class="share-box">
              <div class="text">
                长按图片下载并分享
              </div>
              <div class="share-content-box">
                <div class="title">
                  拿到百度音乐的offer后，我总结了面试产品实习的几点经验
                </div>
                <div class="user-box">
                  <img src="@/assets/logo.png" alt="" />
                  <span>热爱生活</span>
                </div>
                <div class="content">
                  先说一下我的基本情况，本人是北京大学前沿交叉学院数据科学专业研一学生，本科在兰州大学信息安全专业。之所以选择走产品而不是技术，代码能力马马虎虎，而且对编程不感兴趣，最关键的是我性格比较外向，比起每天闷头敲代码，更喜欢和人打交道。于是乎，我开始从各种渠道了解产品经理的前世今生，从《人人都是产品经理》这本书和人人都是产品经理社区，再到知乎，了解到了很多笼统的概念，但是感觉如果没有亲身经历，理论和框架就显得很空洞，而且产品不像技术，门槛相对略低，所以更需要实习的经历，再加上本科的时候从未有过实习经历，所以我很迫切的想找一份产品实习。在面试了滴滴出行、回家吃饭和百度音乐之后，拿到了后面两家的Offer，最终选择了百度音乐。
                </div>
                <img class="logo" src="@/assets/avatar.png" alt="" />
                <img class="code" src="@/assets/avatar.png" alt="" />
                <div class="direction">长按识别二维码查看原文</div>
              </div>
            </div>
          </van-popup>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import {
  shareDetail,
  shareComments,
  sendComment,
  supportArticle
} from '@/api/find/find.js'
export default {
  data () {
    return {
      show: false,
      showShare: false,
      value: '',
      shareDetail: '',
      loading: false,
      finished: false,
      placeholder: '',
      start: 0,
      limit: 4,
      commentList: [],
      parentComment: ''
    }
  },
  created () {
    shareDetail(this.$route.params.id).then(res => {
      //   console.log(res)
      if (res.data.author.avatar) {
        res.data.author.avatar =
          process.env.VUE_APP_URL + res.data.author.avatar
      }
      this.shareDetail = res.data
    })
  },
  methods: {
    async supportArticle () {
      await this.$checkLogin()
      const res = await supportArticle({ article: this.$route.params.id })
      console.log(res)
    },
    subComment () {
      this.$checkLogin()
        .then(res => {
          const data = {
            content: this.value
          }
          if (this.parentComment) {
            data.parent = this.parentComment.id
          } else {
            data.article = this.$route.params.id
          }
          sendComment(data).then(res => {
            console.log(res)
            if (res.data.parent) {
              this.parentComment.children_comments.push(res.data)
              this.parentComment = ''
            } else {
              if (res.data.author.avatar) {
                res.data.author.avatar =
                  process.env.VUE_APP_URL + res.data.author.avatar
              }
              this.commentList.unshift(res.data)
            }
            this.$toast.success('发表成功')
            this.show = false
            this.value = ''
          })
        })
        .catch(err => {
          console.log(err)
          console.log('没有登录')
        })
    },
    onLoad () {
      shareComments({
        id: this.$route.params.id,
        start: this.start,
        limit: this.limit
      }).then(res => {
        console.log(res)
        res.data.list.forEach(v => {
          if (v.author.avatar) {
            v.author.avatar = process.env.VUE_APP_URL + v.author.avatar
          }
        })
        this.commentList.push(...res.data.list)
        this.loading = false
        this.start += this.limit
        if (this.commentList.length >= res.data.total) {
          this.finished = true
        }
      })
    },
    showPop (item) {
      //   console.log(item)
      this.parentComment = item
      this.show = true
      if (item) {
        this.placeholder = `回复:${item.author.nickname}`
      } else {
        this.placeholder = '我来补充两句'
      }
      // item没值 直接评论
      this.show = true
    }
  }
}
</script>

<style lang="less">
.experience-detail-container {
  padding: 31px 0 50px;
  background-color: @white-color;
  .van-nav-bar__left {
    padding-left: 0;
  }
  .iconbtn_nav_back {
    font-size: 44px;
  }
  .top-box {
    background-color: @white-color;
    padding: 15px;
    .title {
      font-size: 18px;
      font-weight: 500;
    }
  }
  .info-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .name-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .name {
        font-size: 12px;
        font-weight: 600;
        color: @subdominant-font-color;
      }
      .time {
        font-size: 12px;
        color: @minor-font-color;
      }
    }
    .zan-box {
      span {
        color: @minor-font-color;
        font-size: 12px;
      }
      .iconfont {
        color: @minor-font-color;
        font-size: 24px;
      }
    }
  }
  .experience-content {
    padding: 15px;
    font-size: 16px;
    color: @main-font-color;
    background-color: @white-color;
    img {
      width: 100%;
      display: block;
    }
  }
  .comment-box {
    margin-top: 10px;
    background-color: @white-color;
    padding: 26px 15px;
    .van-overlay {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .title {
      font-size: 18px;
      font-weight: 500;
      position: relative;
      span {
        color: @minor-font-color;
        font-size: 12px;
        position: absolute;
        left: 40px;
        top: -5px;
      }
    }
    .content-box {
      padding-left: 44px;
      .content {
        margin-top: 11px;
        font-size: 16px;
        color: @main-font-color;
        line-height: 27px;
      }
      .reply-box {
        margin-top: 5px;
        padding-top: 5px;
        padding-left: 15px;
        padding-bottom: 12px;
        background: @border-color;
        .reply {
          font-size: 14px;
          color: @subdominant-font-color;
          word-break: break-all;
          &:not(:first-child) {
            margin-top: 15px;
          }
          .name {
            font-weight: 500;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .bottom-box {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 65px;
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px 0;
    background-color: @white-color;
    width: 100%;
    justify-content: space-between;
    .input {
      height: 34px;
      background: @border-color;
      border-radius: 4px;
      flex: 1;
      font-size: 14px;
      margin-top: 10px;
      color: @subdominant-font-color;
      margin-right: 24px;
      line-height: 34px;
      padding-left: 6px;
    }
    div:not(.input) {
      font-size: 12px;
      color: @subdominant-font-color;
      i {
        display: block;
        font-size: 28px;
      }
    }
    .shoucang {
      margin-right: 24px;
    }
    .star {
      margin-right: 24px;
    }
  }
  .input-pop {
    padding: 25px 15px 0;
    overflow: hidden;
    // 弹出层
    .van-cell::after {
      border-bottom: none;
    }
    .van-field {
      height: 99px;
      width: 100%;
      background: @border-color;
      border-radius: 4px;
    }
    span {
      font-size: 16px;
      color: @subdominant-font-color;
      float: right;
      margin-top: 11px;
    }
  }
  // 底部弹出层
  .share-box {
    width: 311px;
    height: 553px;
    background-size: 100% 100%;
    background-position-x: 0;
    background-position-y: 0;
    padding: 0 15px 15px;
    // background-image: url('../../../assets/avatar.png');
    display: flex;
    flex-direction: column;
    .text {
      text-align: center;
      font-size: 12px;
      color: @white-color;
      padding: 15px;
    }
    .share-content-box {
      flex: 1;
      background-color: @white-color;
      border-radius: 10px;
      padding: 0 15px;
      .title {
        font-size: 16px;
        margin-top: 20px;
      }
      .user-box {
        margin-top: 15px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
        }
        span {
          font-size: 12px;
        }
      }
      .content {
        font-size: 16px;
        margin-top: 20px;
        height: 165px;
        overflow: hidden;
        position: relative;
        &::after {
          content: '';
          width: 100%;
          bottom: 0;
          left: 0;
          height: 25px;
          background-color: @white-color;
          opacity: 0.9;
          position: absolute;
        }
      }
      .logo {
        width: 150px;
        display: block;
        margin: 20px auto;
      }
      .code {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
      .direction {
        font-size: 12px;
        text-align: center;
        margin-top: 20px;
        color: @minor-font-color;
      }
    }
  }
}
</style>
