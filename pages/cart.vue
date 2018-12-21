<template>
  <v-container class="m-cart">
    <v-layout v-if="1||cart.length">
      <list :cart-data="cart" />
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
import List from '../components/cart/list.vue'
export default {
  components: {
    List
  },
  data () {
    return {
      cart: [
        {
          name: '蝦子卷',
          mode: '面交',
          price: 120,
          quantity: 4,
          action: ''
        }
      ]
    }
  },
  computed: {
    total () {
      let total = 0
      this.cart.forEach(item => {
        total += item.price * item.quantity
      })
      return total
    }
  }
}
</script>

<style lang="scss">
.m-cart {
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
