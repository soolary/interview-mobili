<template>
  <div class="info">
    <MMNavBar title="我的资料" @onClickLeft="back"> </MMNavBar>
    <div class="content">
      <MMCell class="avatar" title="头像" @click="edit('avatar')">
        <template #default>
          <img :src="userinfo.avatar" alt="" />
        </template>
        <template #right-icon>
          <i class="iconfont iconicon_more"></i>
        </template>
      </MMCell>
      <van-cell-group class="data">
        <MMCell
          title="昵称"
          :value="userinfo.nickname"
          @click="edit('nickname')"
        ></MMCell>
        <MMCell
          title="性别"
          :value="userGender"
          @click="showGenderPicker = true"
        ></MMCell>
        <MMCell
          title="地区"
          :value="userCity"
          @click="showAreaPicker = true"
        ></MMCell>
        <MMCell
          title="个人简介"
          class="intro"
          :value="userinfo.intro"
          @click="edit('intro')"
        ></MMCell>
      </van-cell-group>
      <div class="exit" @click="logout">退出登录</div>
    </div>

    <!-- 性别 -->
    <van-popup
      v-model="showGenderPicker"
      @close="onGenderCancel"
      round
      position="bottom"
    >
      <van-picker
        show-toolbar
        ref="genderPicker"
        :columns="columns"
        @confirm="onGenderConfirm"
        @cancel="onGenderCancel"
        :default-index="userinfo.gender"
      >
      </van-picker>
    </van-popup>
    <!-- 地区 -->
    <van-popup v-model="showAreaPicker" @close="onAreaCancel" position="bottom">
      <van-area
        show-toolbar
        ref="area"
        :area-list="areaData"
        @confirm="onAreaConfirm"
        @cancel="onAreaCancel"
        :columns-num="2"
        :default-index="userinfo.area"
      >
      </van-area>
    </van-popup>
  </div>
</template>

<script>
import { removeToken } from '@/utils/local.js'
import { editUserInfo } from '@/api/user/user.js'

import { mapState, mapMutations, mapGetters } from 'vuex'
import areaData from '../../utils/area.js'
export default {
  data () {
    return {
      showGenderPicker: false,
      showAreaPicker: false,
      value: '',
      columns: ['未知', '男', '女'],
      areaData
    }
  },
  methods: {
    ...mapMutations(['SETUSERINFO', 'SETISLOGIN', 'SETPROPVALUE']),
    edit (prop) {
      this.$router.push(`/editInfo?prop=${prop}`)
    },
    back () {
      this.$router.push('/my')
    },
    onGenderConfirm (value, index) {
      this.$toast.loading({ duration: 0 })
      editUserInfo({ gender: index }).then(res => {
        // this.SETPROPVALUE({ gender: index })
        this.SETPROPVALUE({ propName: 'gender', propValue: index })
        this.$toast.success('修改成功')
        this.showGenderPicker = false
      })
    },
    onAreaConfirm (data) {
      this.$toast.loading({ duration: 0 })
      editUserInfo({ area: data[1].code }).then(res => {
        this.$toast.success('修改成功')
        this.showAreaPicker = false
        this.SETPROPVALUE({
          propName: 'area',
          propValue: data[1].code
        })
      })
    },
    onGenderCancel () {
      this.$refs.genderPicker.setColumnIndex(0, this.userinfo.gender)
      this.showGenderPicker = false
    },
    onAreaCancel () {
      this.$refs.area.reset(this.userinfo.area)
      this.showAreaPicker = false
    },
    logout () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '你要退出咩'
        })
        .then(() => {
          removeToken()
          this.SETISLOGIN(false)
          this.SETUSERINFO('')
          this.$router.push('/find')
        })
        .catch(() => {
          console.log('你怎么还在')
        })
    }
  },
  computed: {
    ...mapState(['userinfo']),
    ...mapGetters(['userGender', 'userCity'])
  }
}
</script>

<style lang="less">
.info {
  position: relative;
  // background-color: #ccc;
  padding: 44px 0 0;
  .content {
    border-radius: 8px;
    // padding: 10px 19px 15px;
    padding: 15px;
    .avatar {
      height: 60px;
      line-height: 40px;
      margin-bottom: 10px;
      border-radius: 8px;
      img {
        border-radius: 100%;
        // margin-right: 8px;
        height: 40px;
        width: 40px;
      }
    }
    .data {
      border-radius: 8px;
      margin-bottom: 15px;
      overflow: hidden;
      .intro {
        .van-cell__value {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
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
