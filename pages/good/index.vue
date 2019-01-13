<template>
  <el-row class="page-good">
    <el-col :span="24">
      <crumbs
        :category="keyword"
        :keyword="keyword"
        class="breadcrumbs"
      />
      <!-- <category class="category" /> -->
      <good-list
        :list="list"
        class="good-list"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/good/crumbs.vue'
import Category from '@/components/good/category.vue'
import GoodList from '@/components/good/good-list.vue'
export default {
  components: {
    Crumbs,
    Category,
    GoodList
  },
  data() {
    return {
      keyword: '',
      category: '分類',
      list: []
    }
  },
  async created() {
    this.keyword = this.$route.query.keyword
    let { data } = await this.$axios.get(`/goods?keyword=${queryString}`)
    data.forEach(element => {
      list.push(data.name)
    });
  },
  asyncData({ query }) {
    return { query }
  }
}
</script>

<style lang="scss">
.page-good {
  padding: 24px 0;
  .category {
    margin-top: 24px;
  }
  .good-list {
    margin-top: 24px;
  }
}
</style>
