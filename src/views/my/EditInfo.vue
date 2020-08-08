<template>
  <div class="edit">
    <MMNavBar :title="title" @onClickLeft="back" @onClickRight="save">
      <template v-if="isEdit" #right>
        <div>保存</div>
      </template>
    </MMNavBar>
    <div class="content">
      <van-field
        v-if="$route.query.prop !== 'avatar'"
        v-model="value"
        :placeholder="placeholder"
      />
      <van-uploader
        v-else
        :after-read="afterRead"
        v-model="fileList"
        :max-count="1"
      />
    </div>
  </div>
</template>

<script>
import { editUserInfo, uploadFiles } from '@/api/user/user.js'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      // 输入框绑定的数据
      value: '',
      // 绑定的标题
      title: '',
      placeholder: '',
      // 预览的图片
      fileList: [{ url: '' }],
      // 头像id
      avatar: ''
    }
  },
  methods: {
    ...mapMutations(['SETPROPVALUE']),
    back () {
      this.$router.push('/info')
    },
    save () {
      if (!this.isEdit) {
        return
      }
      const propValue = this.value
      const prop = this.$route.query.prop
      if (prop === 'avatar' && this.avatar === '') {
        this.$toast.fail('请选择头像')
        return
      }
      const data = {}
      if (prop !== 'avatar') {
        data[prop] = propValue
      } else {
        data[prop] = this.avatar
      }
      this.$toast.loading({ duration: 0 })
      editUserInfo(data).then(res => {
        this.$toast.success(res.message)
        if (prop !== 'avatar') {
          this.SETPROPVALUE({ propName: prop, propValue })
        } else {
          res.data.avatar = process.env.VUE_APP_URL + res.data.avatar
          this.SETPROPVALUE({ propName: prop, propValue: res.data.avatar })
        }
        this.$router.go(-1)
      })
    },
    afterRead (fileInfo) {
      console.log(fileInfo)
      const data = new FormData()
      data.append('files', fileInfo.file)
      // 调用接口
      uploadFiles(data).then(res => {
        console.log(res)
        // 需要保存id 方便后续使用
        this.avatar = res.data[0].id
      })
    }
  },
  computed: {
    ...mapState(['userinfo']),
    isEdit () {
      return this.value !== this.userinfo[this.$route.query.prop]
    }
  },
  created () {
    const prop = this.$route.query.prop
    const obj = {
      avatar: '头像',
      nickname: '昵称',
      position: '职位',
      intro: '个人简介'
    }
    this.title = `修改${obj[prop]}`
    this.placeholder = `请输入${obj[prop]}`
    const propValue = this.userinfo[prop]
    if (prop !== 'avatar') {
      this.value = propValue
    } else {
      this.fileList[0].url = propValue
    }
  }
}
</script>

<style lang="less">
.edit {
  height: 100vh;
  padding: 44px 0 0;
  background-color: @white-color;

  .content {
    // border-radius: 8px;
    text-align: center;
    // padding: 10px 19px 15px;
    padding: 15px;
    // .avatar {
    //   height: 60px;
    //   line-height: 40px;
    //   margin-bottom: 10px;
    //   border-radius: 8px;
    // }
    .van-field {
      background-color: @bg-color;
      border-radius: 8px;
    }
  }
}
</style>
