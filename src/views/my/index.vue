<template>
  <div class="my">
    <div class="top">
      <div class="user-box">
        <!-- 左侧 -->
        <div class="left">
          <h3 class="title">老菜头</h3>
          <p class="desc">面试不求人，我有面试宝典</p>
        </div>
        <!-- 右侧头像 -->
        <div class="right">
          <img src="../../assets/avatar.png" alt="" class="avatar" />
        </div>
      </div>
      <!-- 统计信息 -->
      <div>
        <ul>
          <li>
            <p>555</p>
            <p>累计刷题</p>
          </li>
          <li>
            <p>555</p>
            <p>收藏题目</p>
          </li>
          <li>
            <p>555</p>
            <p>我的错题</p>
          </li>
          <li>
            <p>555</p>
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
            <p>昨日阅读<span>+300</span></p>
            <p>17</p>
            <p>阅读总数</p>
          </li>
          <li>
            <p>昨日阅读<span>+300</span></p>
            <p>17</p>
            <p>阅读总数</p>
          </li>
          <li>
            <p>昨日阅读<span>+300</span></p>
            <p>17</p>
            <p>阅读总数</p>
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
          value="21"
        ></MMCell>
        <MMCell
          title="收藏的题库"
          icon="iconicon_mine_tikushoucang"
          value="21"
        ></MMCell>
        <MMCell
          title="收藏的企业"
          icon="iconicon_mine_qiyeshoucang"
          value="21"
        ></MMCell>
        <MMCell title="我的错题" icon="iconicon_mine_cuoti" value="21"></MMCell>
        <MMCell
          title="收藏的面试经验"
          icon="iconbtn_shoucang_sel"
          value="21"
          @click="clickCell"
        ></MMCell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import MMCell from './MMCell.vue'
export default {
  name: 'my',
  components: {
    MMCell
  },
  methods: {
    clickCell () {
      console.log(123)
    }
  }
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
