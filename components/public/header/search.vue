<template>
  <div class="search">
    <el-col>
      <el-autocomplete
        v-model="value"
        :fetch-suggestions="querySearchAsync"
        placeholder="請輸入內容"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
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
      }, 2000 * Math.random())
    }
  }
}
</script>

<style lang="scss">
</style>
