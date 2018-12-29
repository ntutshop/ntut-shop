<template>
  <el-row class="m-product-detail">
    <el-col :span="24">
      <crumbs
        :category="category"
        :keyword="keyword"
        class="breadcrumbs"
      />
      <detail
        :meta="meta"
        class="detail-card"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/good/crumbs.vue'
import Detail from '@/components/good-detail/detail.vue'
export default {
  components: {
    Crumbs,
    Detail
  },
  data () {
    return {
      keyword: '',
      category: '分類',
      meta: {
        name: '雲南菜',
        imgUrl:
          'http://p1.meituan.net/600.600/deal/dd5fb74439b6601228cf0cb4d9275889323455.jpg@220w_125h_1e_1c',
        rate: 5,
        owner: 'Andy Meow',
        price: 238,
        type: '食物'
      }
    }
  }
}
</script>

<style lang="scss">
.m-product-detail {
  padding: 24px 0;
  .detail-card {
    margin-top: 24px;
  }
  .product-list {
    margin-top: 24px;
  }
}
</style>
