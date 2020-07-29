<template>
  <div class="my" v-if="isLogin">
    <div class="top">
      <div class="user-box" @click="toMyInfo">
        <!-- 左侧 -->
        <div class="left">
          <h3 class="title">{{ userinfo.nickname }}</h3>
          <p class="desc">{{ userinfo.intro }}</p>
        </div>
        <!-- 右侧头像 -->
        <div class="right">
          <img :src="avatar" alt="" class="avatar" />
        </div>
      </div>
      <!-- 统计信息 -->
      <div>
        <ul>
          <li>
            <p>{{ userinfo.submitNum }}</p>
            <p>累计刷题</p>
          </li>
          <li>
            <p>{{ userinfo.collectQuestions.length }}</p>
            <p>收藏题目</p>
          </li>
          <li>
            <p>{{ userinfo.errorNum }}</p>
            <p>我的错题</p>
          </li>
          <li>
            <p>{{ rate }}%</p>
            <p>正确率</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <MMCell
        class="topCell"
        title="我的岗位"
        value="产品经理"
        icon="iconicon_mine_gangwei"
      ></MMCell>
      <div class="data">
        <div class="title">面经数据</div>
        <ul>
          <li>
            <p>
              昨日阅读<span>+{{ userinfo.shareData.read.yesterday }}</span>
            </p>
            <p>{{ userinfo.shareData.read.total }}</p>
            <p>阅读总数</p>
          </li>
          <li>
            <p>
              昨日获赞<span>+{{ userinfo.shareData.star.yesterday }}</span>
            </p>
            <p>{{ userinfo.shareData.star.total }}</p>
            <p>获赞总数</p>
          </li>
          <li>
            <p>
              昨日新增<span>+{{ userinfo.shareData.comment.yesterday }}</span>
            </p>
            <p>{{ userinfo.shareData.comment.total }}</p>
            <p>评论总数</p>
          </li>
        </ul>
      </div>
      <van-cell-group>
        <MMCell
          title="我的面经分享"
          icon="iconicon_mine_mianjing"
          value="21"
        ></MMCell>
        <MMCell
          title="我的消息"
          icon="iconicon_mine_xiaoxi"
          :value="userinfo.systemMessages"
        ></MMCell>
        <MMCell
          title="收藏的题库"
          icon="iconicon_mine_tikushoucang"
          :value="userinfo.collectQuestions.length"
        ></MMCell>
        <MMCell
          title="收藏的企业"
          icon="iconicon_mine_qiyeshoucang"
          value="21"
        ></MMCell>
        <MMCell
          title="我的错题"
          icon="iconicon_mine_cuoti"
          :value="userinfo.errorQuestions.length"
        ></MMCell>
        <MMCell
          title="收藏的面试经验"
          icon="iconbtn_shoucang_sel"
          :value="userinfo.starArticles.length"
          @click="clickCell"
        ></MMCell>
      </van-cell-group>
    </div>
    <!-- <Info></Info> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'my',
  data () {
    return {
      // rate: 0
    }
  },
  methods: {
    ...mapMutations(['setUserinfo']),
    clickCell () {
      // console.log(123)
      // console.log(this)
    },
    toMyInfo () {
      // alert(123)
      this.$router.push({ path: '/info' })
    }
  },
  computed: {
    ...mapState(['userinfo', 'isLogin']),
    rate () {
      return (
        ((this.userinfo.submitNum - this.userinfo.errorNum) /
          this.userinfo.submitNum) *
        100
      ).toFixed(1)
    },
    avatar () {
      return process.env.VUE_APP_URL + this.userinfo.avatar
    }
  }
  // created () {
  // if (!this.isLogin) {
  // this.$router.push('/login')
  // }
  // }
}
</script>

<style lang="less">
.my {
  padding: 31px 15px;
  .top {
    height: 260px;
    padding: 31px 15px;
    margin: -31px -15px 0;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    .user-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      .left {
        .title {
          font-size: 21px;
          color: @white-color;
        }
        .desc {
          opacity: 0.7;
          font-size: 12px;
          color: @white-color;
        }
      }
      .right {
        .avatar {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.38);
          border-radius: 50%;
        }
      }
    }
    ul {
      display: flex;
      justify-content: space-around;
      text-align: center;

      p {
        text-align: center;
        margin: 0;
        &:first-child {
          font-size: 21px;
          color: @white-color;
          margin-bottom: 4px;
        }
        &:last-child {
          opacity: 0.7;
          font-size: 12px;
          color: @white-color;
        }
        span {
          font-size: 12px;
          color: @white-color;
        }
      }
    }
  }
  .bottom {
    position: relative;
    padding-top: 27px;
    .topCell {
      position: absolute;
      min-height: 55px;
      top: -40px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .data {
      border-radius: 8px;
      padding: 19px 15px;
      // width: 345px;
      // height: 143px;
      margin-bottom: 10px;
      background: @white-color;
      .title {
        font-size: 14px;
        margin-bottom: 18px;
        // font-weight: 600;
      }
      ul {
        display: flex;
        justify-content: space-around;
        li {
          p {
            font-size: 21px;
            text-align: center;
            margin: 0;
            &:first-child {
              font-size: 10px;
              color: @minor-font-color;
              margin-bottom: 17px;
              span {
                color: @assist-color;
              }
            }
            &:last-child {
              margin-top: 6px;
              font-size: 12px;
            }
          }
        }
      }
    }
    .van-cell-group {
      border-radius: 8px;
      margin-bottom: 10px;
      overflow: hidden;
    }
  }
}
</style>
