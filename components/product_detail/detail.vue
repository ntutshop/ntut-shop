<template>
  <div>
    <el-card class="product-header-card">
      <el-row gutter="24">
        <el-col :span="13">
          <v-carousel height="350">
            <v-carousel-item
              v-for="(item,index) in productImage"
              :key="index"
              :src="item.src"
            />
          </v-carousel>
        </el-col>
        <el-col :span="11">
          <h1 class="product-title">雲南菜</h1>
          <div class="seller-info">
            <span class="seller-name">DevilTea</span>
            <el-rate
              v-model="rate"
              :colors="['#ff9900', '#ff9900', '#FF9900']"
              class="seller-rate"
              disabled
            />
            <span class="item-value">{{ rate }}分</span>
          </div>
          <v-divider />
          <div class="product-payment">
            <span>付款方式：</span>
            <el-select
              v-model="currentPayment"
              placeholder="請選擇"
            >
              <el-option
                v-for="(item, index) in paymentList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="product-shipping">
            <span>運送方式：</span>
            <el-select
              v-model="currentShipping"
              placeholder="請選擇"
            >
              <el-option
                v-for="(item, index) in shippingList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="social-share">
            <span>分享：</span>
            <v-btn
              icon
              color="blue darken-3"
              dark
              class="pa-2"
            >
              <v-icon>fab fa-facebook-f</v-icon>
            </v-btn>
          </div>
          <el-button
            type="primary"
            class="cart-button"
          >
            <v-icon dark>shopping_cart</v-icon>
            加入購物車
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="product-detail-card">
      <div slot="header">
        <span>商品詳情</span>
      </div>
      <p class="product-detail-content">
        威任哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉哈囉
      </p>
    </el-card>
    <el-card class="product-messaage-board-card">
      <div slot="header">
        <span>留言區</span>
      </div>
      <div
        v-for="(message, index) in messaageList"
        :key="index"
        class="product-messaage-board-item"
      >
        <div class="product-messaage-board-box">
          <v-avatar size="56">
            <img
              :src="message.userImage"
              alt="John"
            >
          </v-avatar>
          <div class="product-messaage-board-content">
            <div class="product-messaage-board__username">
              <p>{{ message.userName }}</p>
            </div>
            <div class="product-messaage-board__message">
              <p>{{ message.content }}</p>
            </div>
            <p class="text-xs-right product-messaage-board__time">{{ message.time }}</p>
          </div>
        </div>
        <v-divider />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rate: 4,
      currentPayment: '',
      currentShipping: '',
      paymentList: ['面交', '口交'],
      shippingList: ['海運', '航運'],
      productImage: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      messaageList: [
        {
          userName: 'DevilTea',
          userImage: 'https://cdn.vuetifyjs.com/images/john.jpg',
          content: '威任好棒棒！威任好棒棒！威任好棒棒！',
          time: '2018-10-12'
        },
        {
          userName: 'DevilTea',
          userImage: 'https://cdn.vuetifyjs.com/images/john.jpg',
          content: '威任好棒棒！威任好棒棒！威任好棒棒！'
        },
        {
          userName: 'DevilTea',
          userImage: 'https://cdn.vuetifyjs.com/images/john.jpg',
          content: '威任好棒棒！威任好棒棒！威任好棒棒！'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.product-header-card {
  /deep/ .v-carousel__controls {
    background: none;
  }
  font-size: 14px;
  .product-title {
    font-size: 26px;
  }
  .el-rate {
    display: inline-block;
    > .el-rate__icon {
      font-size: 12px;
    }
  }
  .seller-info {
    display: flex;
    color: #757575;
    margin-top: 4px;
    > span {
      padding-right: 8px;
    }
  }
  .v-divider {
    margin: 24px 0;
  }
  .product-payment {
    margin-bottom: 16px;
    > span {
      color: #757575;
    }
  }
  .product-shipping {
    > span {
      color: #757575;
    }
  }
  .social-share {
    margin-top: 16px;
    > :first-child {
      color: #757575;
    }
  }

  .cart-button {
    margin-top: 24px;
    /deep/ span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.product-detail-card {
  margin-top: 16px;
  .product-detail__item {
    font-size: 14px;
    margin-bottom: 18px;
    .product-detail__label {
      color: #757575;
      margin-right: 40px;
    }
  }
}
.product-messaage-board-card {
  margin-top: 16px;
  .product-messaage-board-item {
    margin-bottom: 18px;
    margin-left: 16px;
    .product-messaage-board-box {
      display: flex;
      .product-messaage-board-content {
        margin-left: 32px;
        .product-messaage-board__username {
          font-size: 14px;
        }
        .product-messaage-board__message {
          background: #f5f5f5;
          color: rgba(0, 0, 0, 0.87);
          padding: 16px;
          border-radius: 4px;
          font-size: 14px;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        }
        .product-messaage-board__time {
          align-self: flex-end;
          margin-left: 4px;
          color: #757575;
          font-size: 14px;
          transform: translateY(5px);
        }
      }
    }
  }
}
</style>
