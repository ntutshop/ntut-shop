<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col 
        :span="3" 
        class="left">
        <img
          width="126px"
          height="46px"
          src="/logo.png" 
          alt="Logo"></el-col>
      <el-col 
        :span="15" 
        class="center">
        <div class="search">
          <el-select
            v-model="values"
            :remote-method="remoteMethod"
            :loading="loading"
            filterable
            remote
            reserve-keyword
            placeholder="請輸入商品">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">{{ item }}</el-option>
          </el-select>
          <el-button 
            type="primary" 
            icon="el-icon-search"/>
        </div>
      </el-col>
      <el-col 
        :span="6" 
        class="right"/>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      values: [],
      list: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ],
      loading: false
    }
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
          console.log(this.options)
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss">
.search-panel {
  background: #ffffff;
  min-width: 992px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .m-header-searchbar {
    display: flex;
    align-items: center;
    @media screen and (max-width: 1200px) {
      width: 992px;
    }
    width: 1190px;
  }
  .el-select {
    width: 300px;
  }
}
</style>
