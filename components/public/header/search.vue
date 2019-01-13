<template>
  <div class="search">
    <el-col>
      <el-autocomplete
        v-model="value"
        :fetch-suggestions="querySearchAsync"
        placeholder="請輸入內容"
        @select="searchCommit"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchCommit"
        />
      </el-autocomplete>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      timeout: null
    }
  },
  methods: {
    async querySearchAsync(queryString, callback) {
      let { data } = await this.$axios.get(`/goods?keyword=${queryString}`)
      let searchResult = []
      data.forEach(element => {
        searchResult.push({
          value: element.name,
          id: element.id
        })
      })
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        callback(searchResult)
      }, 1000 * Math.random())
    },
    searchCommit(item) {
      this.$router.push({
        path: `/good/${item.id}`
      })
    }
  }
}
</script>

<style lang="scss">
</style>
