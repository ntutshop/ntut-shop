<template>
  <v-container
    v-loading.fullscreen.lock="fullscreenLoading"
    fluid
    fill-height
    class="order-container"
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
        <el-tabs type="border-card">
          <el-tab-pane label="待處理">
            <order
              v-for="(order, index) in penddingOrderList"
              :key="index"
              :order="order"
              :confirm="false"
              @accept="accept(order)"
              @deny="deny(order)"
            />
          </el-tab-pane>
          <el-tab-pane label="處理中">
            <order
              v-for="(order, index) in handlingOrderList"
              :key="index"
              :order="order"
              :pending="true"
              @cancel="cancel(order)"
            />
          </el-tab-pane>
          <el-tab-pane label="已完成">
            <order
              v-for="(order, index) in finishOrderList"
              :key="index"
              :order="order"
            />
          </el-tab-pane>
          <el-tab-pane label="已取消">
            <order
              v-for="(order, index) in cancelOrderList"
              :key="index"
              :order="order"
            />
          </el-tab-pane>
        </el-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SideBar from '@/components/user/sidebar'
import Order from '@/components/user/order/seller'
export default {
  async asyncData({ $axios, store, error, query }) {
    try {
      let { data } = await $axios.get('/user/orders')
      let orderList = []
      for (let order of data.orders) {
        let orderTemp = await $axios.get(`/orders/${order.id}`)
        orderTemp = orderTemp.data
        if (orderTemp.buyerId !== store.state.userInfo.id) {
          orderTemp.good.shipping = await $axios.get(`/shippings/${orderTemp.good.shipping}`)
          orderTemp.good.shipping = orderTemp.good.shipping.data
          orderTemp.good.payment = await $axios.get(`/payments/${orderTemp.good.payment}`)
          orderTemp.good.payment = orderTemp.good.payment.data
          orderList.push(orderTemp)
        }
      }
      return { orderList }
    } catch (e) {
      const code = parseInt(e.response && e.response.status)
      if (code === 400) {
        error({ statusCode: 400, message: ErrorObject })
      } else {
        throw e
      }
    }
  },
  middleware: ['checkUserLogin', 'checkUserRegister'],
  components: {
    SideBar,
    Order
  },
  data() {
    return {
      orderList: [],
      fullscreenLoading: false
    }
  },
  computed: {
    penddingOrderList() {
      return this.orderList.filter(order => order.state === 0)
    },
    handlingOrderList() {
      return this.orderList.filter(order => order.state === 1)
    },
    finishOrderList() {
      return this.orderList.filter(order => order.state === 2)
    },
    cancelOrderList() {
      return this.orderList.filter(
        order => order.state === 3 || order.state === 4 || order.state === 5
      )
    }
  },
  methods: {
    async accept(order) {
      let { data } = await this.$axios.patch(`/orders/${order.id}`, {
        state: 1
      })
      data.good.shipping = await this.$axios.get(`/shippings/${data.good.shipping}`)
      data.good.shipping = data.good.shipping.data
      data.good.payment = await this.$axios.get(`/payments/${data.good.payment}`)
      data.good.payment = data.good.payment.data
      this.orderList.splice(this.orderList.indexOf(order), 1, data)
    },
    async deny(order) {
      let { data } = await this.$axios.patch(`/orders/${order.id}`, {
        state: 3
      })
      data.good.shipping = await this.$axios.get(`/shippings/${data.good.shipping}`)
      data.good.shipping = data.good.shipping.data
      data.good.payment = await this.$axios.get(`/payments/${data.good.payment}`)
      data.good.payment = data.good.payment.data
      this.orderList.splice(this.orderList.indexOf(order), 1, data)
    },
    async cancel(order) {
      let { data } = await this.$axios.patch(`/orders/${order.id}`, {
        state: 5
      })
      data.good.shipping = await this.$axios.get(`/shippings/${data.good.shipping}`)
      data.good.shipping = data.good.shipping.data
      data.good.payment = await this.$axios.get(`/payments/${data.good.payment}`)
      data.good.payment = data.good.payment.data
      this.orderList.splice(this.orderList.indexOf(order), 1, data)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-container {
  padding: 32px 24px 32px 0;
  .menu {
    background: none;
    border: none;
    /deep/ * {
      background: none;
    }
    .el-menu-item {
      .v-icon {
        margin-right: 5px;
        vertical-align: middle;
        width: 24px;
        transition: none;
      }
      &:not(.is-active) {
        a > span {
          color: #303133;
        }
      }
      /deep/ a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
