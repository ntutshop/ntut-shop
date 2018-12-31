<template>
  <el-card class="box-card">
    <h2 class="title">我的檔案</h2>
    <p class="title-description">管理你的檔案以保護你的帳戶</p>
    <v-divider />
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
    >
      <el-form-item
        :inline-message="true"
        :error="error.username"
        label="使用者名稱"
        style="width: 400px;"
      >
        <el-input
          v-model="form.username"
          placeholder="請輸入使用者名稱"
          @input="modified = true"
        />
      </el-form-item>
      <el-form-item
        :inline-message="true"
        :error="error.nickname"
        label="暱稱"
        style="width: 400px;"
      >
        <el-input
          v-model="form.nickname"
          placeholder="請輸入暱稱"
          @input="modified = true"
        />
      </el-form-item>
      <el-form-item
        :inline-message="true"
        :error="error.phone"
        label="聯絡電話"
        style="width: 400px;"
      >
        <el-input
          v-model="form.phone"
          placeholder="請輸入聯絡電話"
          @input="modified = true"
        />
      </el-form-item>
      <el-form-item
        :inline-message="true"
        :error="error.email"
        label="信箱"
        style="width: 400px;"
      >
        <el-input
          v-model="form.email"
          placeholder="請輸入信箱"
          @input="modified = true"
        />
      </el-form-item>
      <el-form-item label="註冊日期">
        <div>{{ registerDate }}</div>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="!modified"
          type="primary"
          @click="submit"
        >儲存</el-button>
        <el-button @click="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      modified: false,
      defaultData: () => ({
        username: this.userInfo.username,
        nickname: this.userInfo.nickname,
        phone: this.userInfo.phone,
        email: this.userInfo.email
      }),
      form: {
        username: '',
        nickname: '',
        phone: '',
        email: ''
      },
      error: {
        username: '',
        nickname: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    registerDate() {
      if (this.userInfo.register_time) {
        return new Date(
          Date.parse('2018-12-31T09:59:43.000Z')
        ).toLocaleDateString()
      }
      return '錯誤'
    },
    ...mapState(['userInfo'])
  },
  mounted() {
    this.form = this.defaultData()
  },
  methods: {
    async submit() {
      try {
        Object.keys(this.error).forEach(key => {
          this.error[key] = ''
        })
        await this.$axios.put('/user/information', this.form)
        await this.$store.dispatch('updateUserState')
        this.reset()
      } catch (e) {
        const code = parseInt(e.response && e.response.status)
        if (code === 400) {
          Object.keys(this.error).forEach(key => {
            this.error[key] = e.response.data.error[key]
          })
        } else if (code === 401) {
          this.$store.dispatch('updateUserState')
          this.$nuxt.error({ statusCode: 401 })
        } else if (code === 403 && e.response.data.reason === 'unregistered') {
          this.$store.dispatch('updateUserState')
          this.$nuxt.error({ statusCode: 403, message: 'unregistered' })
        } else {
          throw e
        }
      }
    },
    reset() {
      this.form = this.defaultData()
      this.modified = false
      Object.keys(this.error).forEach(key => {
        this.error[key] = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #42a5f5;
}
.title-description {
  color: #757575;
  font-size: 14px;
  margin-top: 4px;
}
</style>