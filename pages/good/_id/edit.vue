<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      row
      wrap
      justify-center
    >
      <v-flex xs8>
        <el-card>
          <h2 class="title">編輯商品</h2>
          <p class="title-description">編輯商品的資訊</p>
          <v-divider />
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item
              :inline-message="true"
              :error="error.name"
              label="商品名稱"
              style="width: 500px;"
            >
              <el-input
                v-model="form.name"
                placeholder="請輸入商品名稱"
              />
            </el-form-item>
            <el-form-item
              label="商品圖片"
              style="width: 500px;"
            >
              <el-upload
                :file-list="fileList"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :on-remove="handleUploadRemove"
                class="upload-demo"
                multiple
                action="/api/image"
                list-type="picture"
              >
                <el-button
                  size="small"
                  type="primary"
                >點擊上傳</el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >只能上傳jpg/png文件，且不超過5MB</div>
              </el-upload>
            </el-form-item>
            <el-form-item
              :inline-message="true"
              :error="error.stock"
              label="數量"
              style="width: 500px;"
            >
              <el-input
                v-model="form.stock"
                placeholder="請輸入商品數量"
              />
            </el-form-item>
            <el-form-item
              :inline-message="true"
              :error="error.price"
              label="價錢"
              style="width: 500px;"
            >
              <el-input
                v-model="form.price"
                placeholder="請輸入商品價錢"
              />
            </el-form-item>
            <el-form-item
              label="運輸方式"
              style="width: 500px;"
            >
              <el-tag
                v-for="(shipping, index) in form.shippings"
                :key="index"
                :disable-transitions="false"
                closable
                @close="handleShippingClose(shipping)"
              >
                {{ `${shipping.service}: $${shipping.fee}` }}
              </el-tag>
              <el-input
                v-if="shippingInputVisible"
                ref="saveTagInput"
                v-model="shippingInput"
                placeholder="方式 運費"
                class="input-new-tag"
                size="small"
                @blur="handleShippingInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showShippingInput"
              >+ 運輸方式</el-button>
            </el-form-item>
            <el-form-item
              label="付款方式"
              style="width: 500px;"
            >
              <el-tag
                v-for="(payment, index) in form.payments"
                :key="index"
                :disable-transitions="false"
                closable
                @close="handlePaymentClose(payment)"
              >
                {{ payment.service }}
              </el-tag>
              <el-input
                v-if="paymentInputVisible"
                ref="savePaymentInput"
                v-model="paymentInput"
                class="input-new-tag"
                size="small"
                @blur="handlePaymentInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showPaymentInput"
              >+ 付款方式</el-button>
            </el-form-item>
            <el-form-item
              label="標籤"
              style="width: 500px;"
            >
              <el-tag
                v-for="(tag, index) in form.tags"
                :key="index"
                :disable-transitions="false"
                closable
                @close="handleTagClose(tag)"
              >
                {{ tag.name }}
              </el-tag>
              <el-input
                v-if="tagInputVisible"
                ref="saveTagInput"
                v-model="tagInput"
                class="input-new-tag"
                size="small"
                @blur="handleTagInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showTagInput"
              >+ 標籤</el-button>
            </el-form-item>
            <el-form-item
              label="商品詳情"
              style="width: 500px;"
            >
              <el-input
                :inline-message="true"
                :error="error.description"
                v-model="form.description"
                :rows="6"
                type="textarea"
                placeholder="請輸入商品詳情"
              />
            </el-form-item>
            <el-form-item
              label="新舊程度"
              style="width: 500px;"
            >
              <el-slider
                v-model="form.durability"
                :step="1"
                :format-tooltip="formatDurability"
                :max="10"
                show-stops
              />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submit"
              >更新商品</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SideBar from '@/components/user/sidebar'

export default {
  async asyncData({ params, error, store, $axios }) {
    let loadedData = {}
    try {
      let { data } = await $axios.get(`/goods/${params.id}`)
      loadedData.goodInfo = data
    } catch (e) {
      const code = parseInt(e.response && e.response.status)
      if (code === 404) {
        error({ statusCode: 404, message: '找不到此商品' })
        return
      } else {
        throw e
      }
    }
    if (store.state.userInfo.id !== loadedData.goodInfo.member_id) {
      error({ statusCode: 403, message: 'permission-denied' })
      return
    }
    try {
      let { data } = await $axios.get(
        `/user/information?id=${loadedData.goodInfo.member_id}`
      )
      loadedData.sellerInfo = data
    } catch (e) {
      const code = parseInt(e.response && e.response.status)
      if (code === 404) {
        error({ statusCode: 404, message: '找不到此賣家' })
      } else {
        throw e
      }
    }
    let form = {
      name: loadedData.goodInfo.name,
      description: loadedData.goodInfo.description,
      price: loadedData.goodInfo.price,
      stock: loadedData.goodInfo.stock,
      durability: loadedData.goodInfo.durability,
      images: loadedData.goodInfo.images,
      shippings: loadedData.goodInfo.shippings,
      payments: loadedData.goodInfo.payments,
      tags: loadedData.goodInfo.tags
    }
    let fileList = loadedData.goodInfo.images.map(url => ({ url }))
    return { form, fileList }
  },
  components: {
    SideBar
  },
  data() {
    return {
      // form: {
      //   name: '',
      //   description: '',
      //   price: '',
      //   stock: '',
      //   durability: 5,
      //   images: [],
      //   shippings: [],
      //   payments: [],
      //   tags: []
      // },
      error: {
        name: '',
        description: '',
        price: '',
        stock: '',
        durability: '',
        images: '',
        shippings: '',
        payments: '',
        tags: ''
      },
      shippingInputVisible: false,
      shippingInput: '',
      paymentInputVisible: false,
      paymentInput: '',
      tagInputVisible: false,
      tagInput: ''
    }
  },
  middleware: ['checkUserLogin', 'checkUserRegister'],
  methods: {
    async submit() {
      try {
        Object.keys(this.error).forEach(key => {
          this.error[key] = ''
        })
        let { data } = await this.$axios.put('/goods', this.form)
        this.$router.replace(`/good/${data.goodId}`)
      } catch (e) {
        const code = parseInt(e.response && e.response.status)
        if (code === 400) {
          Object.keys(this.error).forEach(key => {
            this.error[key] = e.response.data.error[key]
          })
          console.log(this.error)
        } else {
          throw e
        }
      }
    },
    cancel() {
      this.$router.push('/')
    },
    handleUploadChange(file, fileList) {
      let images = []
      fileList.forEach(f => {
        images.push(f.remoteUrl || f.url)
      })
      this.form.images = images
    },
    handleUploadRemove(file, fileList) {
      this.handleUploadChange(file, fileList)
    },
    handleUploadSuccess(response, file, fileList) {
      fileList[fileList.indexOf(file)].remoteUrl = response.url
      this.handleUploadChange(file, fileList)
    },
    handleUploadError(error, file, fileList) {
      console.log(error)
    },
    formatDurability(value) {
      return value + '成新'
    },
    handleShippingClose(tag) {
      this.form.shippings.splice(this.form.shippings.indexOf(tag), 1)
    },
    showShippingInput() {
      this.shippingInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleShippingInputConfirm() {
      let shippingInput = this.shippingInput
      let temp = shippingInput.trim().split(' ')
      if (
        temp.length === 2 &&
        typeof temp[0] === 'string' &&
        !isNaN(+temp[1])
      ) {
        let shipping = {
          service: temp[0],
          fee: +temp[1]
        }
        this.form.shippings.push(shipping)
      }
      this.shippingInputVisible = false
      this.shippingInput = ''
    },
    handlePaymentClose(tag) {
      this.form.payments.splice(this.form.payments.indexOf(tag), 1)
    },
    showPaymentInput() {
      this.paymentInputVisible = true
      this.$nextTick(_ => {
        this.$refs.savePaymentInput.$refs.input.focus()
      })
    },
    handlePaymentInputConfirm() {
      let paymentInput = this.paymentInput
      if (paymentInput) {
        this.form.payments.push({ service: paymentInput })
      }
      this.paymentInputVisible = false
      this.paymentInput = ''
    },
    handleTagClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1)
    },
    showTagInput() {
      this.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleTagInputConfirm() {
      let tagInput = this.tagInput
      if (tagInput) {
        this.form.tags.push(tagInput)
      }
      this.tagInputVisible = false
      this.tagInput = ''
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>