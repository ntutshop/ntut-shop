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
      console.log(data)
      let searchResult = []
      data.forEach(element => {
        searchResult.push({
          value: element.name
        })
      })
      console.log(searchResult)
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        callback(searchResult)
      }, 1000 * Math.random())
    },
    searchCommit() {
      this.$router.push({
        path: `/good?keyword=${this.value}`
      })
    }
  }
}
</script>

<style lang="scss">
</style>
