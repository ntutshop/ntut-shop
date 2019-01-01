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
        <side-bar index="2" />
      </v-flex>
      <v-flex xs10>
        <el-tabs type="border-card">
          <el-tab-pane label="待處理">
            <order
              v-for="(order, index) in penddingOrderList"
              :key="index"
              :order="order"
            />
          </el-tab-pane>
          <el-tab-pane label="處理中">
            <order
              v-for="(order, index) in handlingOrderList"
              :key="index"
              :order="order"
            />
          </el-tab-pane>
          <el-tab-pane label="完成">
            <order
              v-for="(order, index) in finishOrderList"
              :key="index"
              :order="order"
            />
          </el-tab-pane>
          <el-tab-pane label="取消">
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
import Order from '@/components/user/order/order'
export default {
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
  async asyncData({ $axios, error, query }) {
    try {
      let { data } = await $axios.get('/user/orders')
      let orderList = []
      for (let order of data.orders) {
        let orderTemp = await $axios.get(`/orders/${order.id}`)
        orderList.push(orderTemp.data)
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
