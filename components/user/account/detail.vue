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
        label="使用者名稱"
        style="width: 400px;"
      >
        <el-input
          v-model="form.username"
          placeholder="請輸入使用者名稱"
        />
      </el-form-item>
      <el-form-item
        label="暱稱"
        style="width: 400px;"
      >
        <el-input
          v-model="form.nickname"
          placeholder="請輸入暱稱"
        />
      </el-form-item>
      <el-form-item
        label="聯絡電話"
        style="width: 400px;"
      >
        <el-input
          v-model="form.phone"
          placeholder="請輸入聯絡電話"
        />
      </el-form-item>
      <el-form-item
        label="信箱"
        style="width: 400px;"
      >
        <el-input
          v-model="form.email"
          placeholder="請輸入信箱"
        />
      </el-form-item>
      <el-form-item label="註冊日期">
        <div>2018-10-11</div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >儲存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: 'deviltea',
        nickname: '威任',
        phone: '0970517333',
        email: 'deviltea@gmail.com'
      }
    }
  },
  methods: {
    onSubmit() {}
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