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
      <v-flex xs2>
        <side-bar index="3" />
      </v-flex>
      <v-flex xs10>
        <el-card>
          <h2 class="title">新建商品</h2>
          <p class="title-description">填入新商品的資訊</p>
          <v-divider />
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
          >
            <el-form-item
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
                :file-list="form.images"
                class="upload-demo"
                multiple
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
              >
                <el-button
                  size="small"
                  type="primary"
                >點擊上傳</el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >只能上傳jpg/png文件，且不超過500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item
              label="數量"
              style="width: 500px;"
            >
              <el-input
                v-model="form.name"
                placeholder="請輸入商品數量"
              />
            </el-form-item>
            <el-form-item
              label="價錢"
              style="width: 500px;"
            >
              <el-input
                v-model="form.name"
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
                {{ shipping }}
              </el-tag>
              <el-input
                v-if="shippingInputVisible"
                ref="saveTagInput"
                v-model="shippingInput"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleShippingInputConfirm"
                @blur="handleShippingInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showShippingInput"
              >+ New Tag</el-button>
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
                {{ payment }}
              </el-tag>
              <el-input
                v-if="paymentInputVisible"
                ref="savePaymentInput"
                v-model="paymentInput"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handlePaymentInputConfirm"
                @blur="handlePaymentInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showPaymentInput"
              >+ New Tag</el-button>
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
                {{ tag }}
              </el-tag>
              <el-input
                v-if="tagInputVisible"
                ref="saveTagInput"
                v-model="tagInput"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleTagInputConfirm"
                @blur="handleTagInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showTagInput"
              >+ New Tag</el-button>
            </el-form-item>
            <el-form-item
              label="商品詳情"
              style="width: 500px;"
            >
              <el-input
                v-model="form.name"
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
              <el-button type="primary">建立商品</el-button>
              <el-button>取消</el-button>
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
  components: {
    SideBar
  },
  middleware: ['checkUserLogin', 'checkUserRegister'],
  data() {
    return {
      form: {
        username: 'deviltea',
        nickname: '威任',
        phone: '0970517333',
        email: 'deviltea@gmail.com',
        durability: 9,
        images: [
          {
            name: 'food.jpeg',
            url:
              'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url:
              'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        shippings: ['海運', '空運'],
        payments: ['現金'],
        tags: ['全新', '女神用過']
      },
      shippingInputVisible: false,
      shippingInput: '',
      paymentInputVisible: false,
      paymentInput: '',
      tagInputVisible: false,
      tagInput: ''
    }
  },
  methods: {
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
      if (shippingInput) {
        this.form.shippings.push(shippingInput)
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
        this.form.payments.push(paymentInput)
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