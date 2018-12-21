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
        class="category"
      />
      <product-list
        :list="list"
        class="product-list"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Category from '../components/products/category.vue'
import ProductList from '../components/products/product_list.vue'
export default {
  components: {
    Crumbs,
    Category,
    ProductList
  },
  data () {
    return {
      keyword: '',
      category: '分類',
      list: []
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
