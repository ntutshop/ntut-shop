<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      row
      wrap
      justify-center
      align-center
    >
      <el-card style="width: 700px;">
        <h2 class="title">編輯商品</h2>
        <p class="title-description">更新商品的資訊</p>
        <v-divider />
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item
            label="商品名稱"
            style="width: 400px;"
          >
            <el-input
              v-model="form.name"
              placeholder="請輸入商品名稱"
            />
          </el-form-item>
          <el-form-item
            label="商品圖片"
            style="width: 400px;"
          >
            <el-upload
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="images"
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
            style="width: 400px;"
          >
            <el-input
              v-model="form.name"
              placeholder="請輸入商品數量"
            />
          </el-form-item>
          <el-form-item
            label="價錢"
            style="width: 400px;"
          >
            <el-input
              v-model="form.name"
              placeholder="請輸入商品價錢"
            />
          </el-form-item>
          <el-form-item
            label="商品詳情"
            style="width: 400px;"
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
            style="width: 400px;"
          >
            <el-slider
              v-model="form.durability"
              :step="1"
              :format-tooltip="formatDurability"
              show-stops
              max="10"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >更新商品</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: ['checkUserLogin', 'checkUserRegister'],
  data () {
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
        ]
      }
    }
  },
  methods: {
    formatDurability(value) {
      return value + '成新'
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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