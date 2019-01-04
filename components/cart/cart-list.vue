<template>
  <el-table
    ref="singleTable"
    :data="cartData"
    highlight-current-row
    class="cart-table"
  >
    <el-table-column
      prop="name"
      label="商品"
      width="400"
    />
    <el-table-column
      prop="paymentService"
      label="付款方式"
    />
    <el-table-column
      prop="shippingInfo"
      label="運輸方式"
    />
    <el-table-column
      prop="price"
      label="單價"
    />
    <el-table-column
      prop="quantity"
      label="數量"
    />
    <el-table-column label="總計">
      <template slot-scope="scope">
        {{ scope.row.price * scope.row.quantity + scope.row.shippingFee }}
      </template>
    </el-table-column>
    <el-table-column
      prop="action"
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click.stop="$emit('delete', scope.$index)"
        >刪除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    cartData: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.cart-table {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  /deep/ .el-table__row {
    cursor: pointer;
  }
  /deep/ th {
    text-align: center;
  }
  /deep/ td {
    text-align: center;
  }
}
</style>
