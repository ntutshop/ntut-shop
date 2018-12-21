<template>
  <el-card class="m-detail-card">
    <el-row gutter="24">
      <el-col :span="15">
        <h1 class="product-title">雲南菜</h1>
        <el-rate
          v-model="meta.rate"
          :colors="['#ff9900', '#ff9900', '#FF9900']"
          disabled
        />
        <span class="item-value">{{ meta.rate }}分</span>
        <v-divider />
      </el-col>
      <el-col :span="9">
        <el-carousel
          trigger="click"
          height="234px"
        >
          <el-carousel-item
            v-for="item in 4"
            :key="item"
          >
            <!-- <img
              src="http://p1.meituan.net/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@380w_214h_1e_1c"
              alt=""
              class="product-image"
            > -->
            <v-img
              src="http://p1.meituan.net/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@380w_214h_1e_1c"
              contain
            />
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.m-detail-card {
  .product-title {
    font-size: 26px;
  }
  .product-image {
  }
  .el-rate {
    display: inline-block;

    .el-rate__icon {
      font-size: 12px;
    }
  }
}
</style>
