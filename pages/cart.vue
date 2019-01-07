<template>
  <v-container class="m-cart">
    <h2 class="title">請選一項訂單提交</h2>
    <v-layout v-if="1||cart.length">
      <cart-list 
        ref="cartList"
        :cart-data="cart" 
        @delete="deleteCartItem"
        @choose="choose" />
    </v-layout>
    <v-layout
      justify-end
      class="total-price"
    >
      <p>總計：<strong class="money">${{ total }}</strong></p>
    </v-layout>
    <v-layout
      justify-end
      class="submit"
    >
      <el-button
        :disabled="currentChoise === -1"
        type="primary"
        @click="submit"
      >提交訂單</el-button>
    </v-layout>
  </v-container>

</template>

<script>
import CartList from '../components/cart/cart-list.vue'
export default {
  async asyncData({ $axios, error }) {
    let rawCart = []
    let cart = []
    try {
      let { data } = await $axios.get('/cart')
      rawCart = data.goods
    } catch (e) {
      console.log(e)
    }

    for (let i in rawCart) {
      try {
        let response = undefined
        response = await $axios.get(`/goods/${rawCart[i].id}`)
        let good = response.data
        response = await $axios.get(`/shippings/${rawCart[i].shipping_id}`)
        let shipping = response.data
        response = await $axios.get(`/payments/${rawCart[i].payment_id}`)
        let payment = response.data
        cart.push({
          index: cart.length,
          id: rawCart[i].id,
          name: good.name,
          price: good.price,
          quantity: rawCart[i].quantity,
          shippingId: shipping.id,
          shippingService: shipping.service,
          shippingFee: shipping.fee,
          shippingInfo: `${shipping.service}: $${shipping.fee}`,
          paymentId: payment.id,
          paymentService: payment.service
        })
      } catch (e) {
        console.log(e)
      }
    }
    return { cart, rawCart }
  },
  middleware: ['checkUserLogin', 'checkUserRegister'],
  components: {
    CartList
  },
  data() {
    return {
      currentChoise: -1
    }
  },
  computed: {
    total() {
      let total = 0
      if (this.currentChoise !== -1) {
        let item = this.cart[this.currentChoise]
        total += item.price * item.quantity + item.shippingFee
      }
      return total
    }
  },
  methods: {
    choose(row) {
      this.currentChoise = row
    },
    async deleteCartItem(index) {
      try {
        this.rawCart.splice(index, 1)
        this.cart.splice(index, 1)
        let { data } = await this.$axios.patch('/cart', { goods: this.rawCart })
        this.$notify({
          title: '成功',
          message: '成功從購物車移除',
          type: 'success'
        })
      } catch(e) {
        console.log(e)
      }
    },
    async submit() {
      let data = {
        good: {
          id: this.cart[this.currentChoise].id,
          quantity: this.cart[this.currentChoise].quantity
        },
        shippingId: this.cart[this.currentChoise].shippingId,
        paymentId: this.cart[this.currentChoise].paymentId,
      }
      try {
        let orderId = await this.$axios.post('/orders', data)
      } catch(e) {
        console.log(e)
      }
      this.$notify({
        title: '成功',
        message: '成功送出訂單',
        type: 'success'
      })
      await this.$refs.cartList.del(this.currentChoise)
    }
  }
}
</script>

<style lang="scss" scope>
.m-cart {
  .title {
    color: #42a5f5;
    margin-top: 8px;
    margin-bottom: 16px;
    margin-left: 4px;
  }
  padding: 24px 0;
  .total-price {
    margin-top: 8px;
    .money {
      font-size: 20px;
      color: rgb(243, 98, 8);
    }
  }
  .submit {
    margin-top: 8px;
  }
}
</style>
