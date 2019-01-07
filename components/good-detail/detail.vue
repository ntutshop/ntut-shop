<template>
  <div>
    <el-card class="good-header-card">
      <v-btn
        v-if="userInfo.username === detail.sellerInfo.username"
        icon
        fab
        small
        dark
        color="blue"
        style="position: absolute;right: 24px;z-index: 20;"
        @click="$router.push(`/good/${detail.goodInfo.id}/edit`)"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <el-row :gutter="24">
        <el-col :span="13">
          <v-carousel height="350">
            <v-carousel-item
              v-for="(image,index) in detail.goodInfo.images"
              :key="index"
              :src="image"
            />
          </v-carousel>
        </el-col>
        <el-col :span="11">
          <h1 class="good-title">{{ detail.goodInfo.name }}</h1>
          <div
            class="seller-info"
            style="height: 24px;padding-top: 8px;"
          >
            <span class="seller-name">{{ detail.sellerInfo.nickname }}</span>
            <el-rate
              v-model="detail.sellerInfo.rate"
              :colors="['#ff9900', '#ff9900', '#FF9900']"
              class="seller-rate"
              disabled
            />
            <span class="item-value">{{ detail.sellerInfo.rate }}分</span>
            <span class="price">＄{{ detail.goodInfo.price }}</span>
          </div>
          <v-divider />
          <div class="good-payment">
            <span>付款方式：</span>
            <el-select
              v-model="currentPayment"
              placeholder="請選擇"
            >
              <el-option
                v-for="(payment, index) in detail.goodInfo.payments"
                :key="index"
                :label="`${payment.service}`"
                :value="payment.id"
              />
            </el-select>
          </div>
          <div class="good-shipping">
            <span>運送方式：</span>
            <el-select
              v-model="currentShipping"
              placeholder="請選擇"
            >
              <el-option
                v-for="(shipping, index) in detail.goodInfo.shippings"
                :key="index"
                :label="`${shipping.service}: $${shipping.fee}`"
                :value="shipping.id"
              />
            </el-select>
          </div>
          <div class="good-shipping">
            <span>購買數量：</span>
            <el-select
              v-model="currentQuantity"
              placeholder="請選擇"
            >
              <el-option
                v-for="i in detail.goodInfo.stock"
                :key="i"
                :label="i"
                :value="i"
              />
            </el-select>
          </div>
          <v-layout
            row
            wrap
            align-center
          >
            <span>分享：</span>
            <v-btn
              icon
              color="blue darken-3"
              dark
              class="pa-2"
            >
              <v-icon>fab fa-facebook-f</v-icon>
            </v-btn>
            <el-button
              :disabled="!addToCartEnabled"
              type="primary"
              class="cart-button"
              @click="addToCart"
            >
              <v-icon dark>shopping_cart</v-icon>
              {{ detail.goodInfo.state === 0 ? '加入購物車' : detail.goodInfo.state === 1 ? '已遭下架' : detail.goodInfo.state === 2 ? '已遭移除' : '???' }}
            </el-button>
          </v-layout>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="good-detail-card">
      <div slot="header">
        <span>商品詳情</span>
      </div>
      <div>
        <span>標籤: </span>
        <el-tag
          v-for="(tag, index) in detail.goodInfo.tags"
          :key="index"
          class="ma-1"
        >
          {{ tag.name }}
        </el-tag>
      </div>
      <p class="good-detail-content">
        {{ detail.goodInfo.description }}
      </p>
    </el-card>
    <el-card class="good-messaage-board-card">
      <div slot="header">
        <span>留言區</span>
      </div>
      <div
        v-for="(message, index) in messaageList"
        :key="index"
        class="good-messaage-board-item"
      >
        <div class="good-messaage-board-box">
          <v-avatar size="56">
            <img
              :src="message.userImage"
              alt="John"
            >
          </v-avatar>
          <div class="good-messaage-board-content">
            <div class="good-messaage-board__username">
              <p>{{ message.userName }}</p>
            </div>
            <div class="good-messaage-board__message">
              <p>{{ message.content }}</p>
            </div>
            <p class="text-xs-right good-messaage-board__time">{{ message.time }}</p>
          </div>
        </div>
        <v-divider />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    detail: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentShipping: undefined,
      currentPayment: undefined,
      currentQuantity: undefined,
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
  },
  computed: {
    addToCartEnabled() {
      return (
        this.detail.goodInfo.state === 0 &&
        this.currentQuantity &&
        this.currentShipping &&
        this.currentPayment &&
        this.userInfo.username !== this.detail.sellerInfo.username
      )
    },
    ...mapState(['userInfo'])
  },
  methods: {
    async addToCart() {
      let cartGoods = undefined
      try {
        let { data } = await this.$axios.get('/cart')
        cartGoods = data.goods
        cartGoods.push({
          id: this.detail.goodInfo.id,
          quantity: this.currentQuantity,
          shipping_id: this.currentShipping,
          payment_id: this.currentPayment
        })
      } catch (e) {
        console.log(e)
      }
      try {
        let vm = this
        let { data } = await this.$axios.patch('/cart', { goods: cartGoods })
        this.$notify({
          title: '成功',
          message: '成功添加到購物車',
          type: 'success',
          onClick: function() {
            vm.$router.push('/cart')
            this.close()
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.good-header-card {
  /deep/ .v-carousel__controls {
    background: none;
  }
  font-size: 14px;
  .good-title {
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
  .good-payment {
    margin-bottom: 16px;
    > span {
      color: #757575;
    }
  }
  .good-shipping {
    margin-bottom: 16px;
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
    margin-left: 48px;
    /deep/ span {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.good-detail-card {
  margin-top: 16px;
  .good-detail__item {
    font-size: 14px;
    margin-bottom: 18px;
    .good-detail__label {
      color: #757575;
      margin-right: 40px;
    }
  }
}
.good-messaage-board-card {
  margin-top: 16px;
  .good-messaage-board-item {
    margin-bottom: 18px;
    margin-left: 16px;
    .good-messaage-board-box {
      display: flex;
      .good-messaage-board-content {
        margin-left: 32px;
        .good-messaage-board__username {
          font-size: 14px;
        }
        .good-messaage-board__message {
          background: #f5f5f5;
          color: rgba(0, 0, 0, 0.87);
          padding: 16px;
          border-radius: 4px;
          font-size: 14px;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        }
        .good-messaage-board__time {
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
.price {
  font-size: 24px;
  transform: translateY(-9px);
  color: #f60;
}
</style>
