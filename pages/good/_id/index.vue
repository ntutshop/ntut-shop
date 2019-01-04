<template>
  <el-row class="m-good-detail">
    <el-col :span="24">
      <!-- <crumbs
        :category="category"
        :keyword="keyword"
        class="breadcrumbs"
      /> -->
      <detail
        :detail="detail"
        class="detail-card"
      />
    </el-col>
  </el-row>
</template>

<script>
import Detail from '@/components/good-detail/detail.vue'
export default {
  async asyncData({ params, error, $axios }) {
    let loadedData = {}
    try {
      let { data } = await $axios.get(`/goods/${params.id}`)
      loadedData.goodInfo = data
    } catch (e) {
      const code = parseInt(e.response && e.response.status)
      if (code === 404) {
        error({ statusCode: 404, message: '找不到此商品' })
        return
      } else {
        throw e
      }
    }
    try {
      let { data } = await $axios.get(`/user/information?id=${loadedData.goodInfo.member_id}`)
      loadedData.sellerInfo = data
    } catch (e) {
      const code = parseInt(e.response && e.response.status)
      if (code === 404) {
        error({ statusCode: 404, message: '找不到此賣家' })
      } else {
        throw e
      }
    }
    return loadedData
  },
  components: {
    Detail
  },
  data() {
    return {
    }
  },
  computed: {
    detail() {
      return {
        sellerInfo: this.sellerInfo,
        goodInfo: this.goodInfo
      }
    }
  },
}
</script>

<style lang="scss">
.m-good-detail {
  padding: 24px 0;
  .detail-card {
    margin-top: 24px;
  }
}
</style>
