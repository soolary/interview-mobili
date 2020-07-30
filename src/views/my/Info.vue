<template>
  <div class="info">
    <MMNavBar title="我的资料" @onClickLeft="back"> </MMNavBar>
    <div class="content">
      <MMCell class="avatar" title="头像">
        <template #default>
          <img :src="userinfo.avatar" alt="" />
        </template>
        <template #right-icon>
          <i class="iconfont iconicon_more"></i>
        </template>
      </MMCell>
      <van-cell-group class="data">
        <MMCell title="昵称" :value="userinfo.nickname" @click="edit"></MMCell>
        <MMCell
          title="性别"
          :value="userGender"
          @click="showGenderPicker = true"
        ></MMCell>
        <MMCell title="地区" value="北京市"></MMCell>
        <MMCell title="个人简介" class="intro" :value="userinfo.intro"></MMCell>
      </van-cell-group>
      <div class="exit" @click="logout">退出登录</div>
    </div>
    <van-popup v-model="isShow" class="edit">
      <div class="edit">
        <MMNavBar
          title="修改昵称"
          @onClickLeft="isShow = false"
          @onClickRight="save"
        >
          <template #right>
            <div>保存</div>
          </template>
        </MMNavBar>
        <div class="content">
          <van-field v-model="value" placeholder="请输入用户名" />
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showGenderPicker" round position="bottom">
      <van-picker
        show-toolbar
        ref="genderPicker"
        :columns="columns"
        @confirm="onConfirmGender"
        @cancel="onCancelGender"
        :default-index="userinfo.gender"
      >
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
import { editUserInfo } from '@/api/user/user.js'
import { removeToken } from '@/utils/local.js'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      isShow: false,
      showGenderPicker: false,
      value: '',
      columns: ['未知', '男', '女']
    }
  },
  methods: {
    ...mapMutations(['SETUSERINFO', 'SETISLOGIN', 'SETPROPVALUE']),
    edit () {
      this.value = this.userinfo.nickname
      this.isShow = true
    },
    back () {
      this.$router.push('/my')
    },
    save () {
      editUserInfo({ nickname: this.value }).then(res => {
        this.$toast.success(res.message)
        res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
        this.SETUSERINFO(res.data)
        this.isShow = false
        console.log(res)
      })
    },
    onConfirmGender (value, index) {
      this.$toast.loading({ duration: 0 })
      editUserInfo({ gender: index }).then(res => {
        // this.SETPROPVALUE({ gender: index })
        this.SETPROPVALUE({ propName: 'gender', propValue: index })
        this.$toast.success('修改成功')
        this.showGenderPicker = false
      })
    },
    onCancelGender () {
      this.$refs.genderPicker.setColumnIndex(0, this.userinfo.gender)
      this.showGenderPicker = false
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
    ...mapGetters(['userGender'])
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

  .edit {
    width: 374px;
    height: 666px;
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
      }
    }
  }
}
</style>
