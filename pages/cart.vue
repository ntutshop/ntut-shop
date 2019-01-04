<template>
  <v-container class="m-cart">
    <h2 class="title">請選一項訂單提交</h2>
    <v-layout v-if="1||cart.length">
      <char-list 
        :cart-data="cart" 
        @delete="deleteCartItem($event)" />
    </v-layout>
    <v-layout
      justify-end
      class="total-price"
    >
      <p>應付金額：<strong class="money">${{ total }}</strong></p>
    </v-layout>
    <v-layout
      justify-end
      class="submit"
    >
      <el-button
        type="primary"
        class="blue"
      >提交訂單</el-button>
    </v-layout>
  </v-container>

</template>

<script>
import CharList from '../components/cart/cart-list.vue'
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
    CharList
  },
  data() {
    return {
    }
  },
  computed: {
    total() {
      let total = 0
      this.cart.forEach(item => {
        total += item.price * item.quantity + item.shippingFee
      })
      return total
    }
  },
  methods: {
    async deleteCartItem(index) {
      this.rawCart.splice(index, 1)
      this.cart.splice(index, 1)
      let { data } = await this.$axios.patch('/cart', { goods: this.rawCart })
      this.$notify({
        title: '成功',
        message: '成功從購物車移除',
        type: 'success'
      })
    },
    async updateCartItem() {
      this.rawCart = []
      this.cart = []
      try {
        let { data } = await this.$axios.get('/cart')
        this.rawCart = data.goods
      } catch (e) {
        console.log(e)
      }

      for (let i in this.rawCart) {
        try {
          let response = undefined
          response = await this.$axios.get(`/goods/${this.rawCart[i].id}`)
          let good = response.data
          response = await this.$axios.get(`/shippings/${this.rawCart[i].shipping_id}`)
          let shipping = response.data
          response = await this.$axios.get(`/payments/${this.rawCart[i].payment_id}`)
          let payment = response.data
          this.cart.push({
            id: this.rawCart[i].id,
            name: good.name,
            price: good.price,
            quantity: this.rawCart[i].quantity,
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
