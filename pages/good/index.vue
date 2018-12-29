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
import Crumbs from '@/components/product/crumbs.vue'
import Category from '@/components/product/category.vue'
import ProductList from '@/components/product/product-list.vue'
export default {
  asyncData ({ query }) {
    return { query }
  },
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
