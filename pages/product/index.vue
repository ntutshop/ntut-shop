<template>
  <el-row class="page-product">
    <el-col :span="24">
      <crumbs
        :category="category"
        :keyword="keyword"
        class="breadcrumbs"
      />
      <category
        :types="types"
        :areas="areas"
        class="category"
      />
      <product-list
        :list="list"
        class="product-list"
      />
    </el-col>
    <el-col :span="5">
      <!-- <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
      /> -->
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/product/crumbs.vue'
import Category from '@/components/product/category.vue'
import ProductList from '@/components/product/product-list.vue'
export default {
  components: {
    Crumbs,
    Category,
    ProductList
  },
  data () {
    return {
      keyword: '',
      category: '分類'
    }
  }
}
</script>

<style lang="scss">
.page-product {
  padding: 24px 0;
  .category {
    margin-top: 24px;
  }
  .product-list {
    margin-top: 24px;
  }
}
</style>
