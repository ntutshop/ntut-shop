<template>
  <div class="search">
    <el-col>
      <el-autocomplete
        v-model="value"
        :fetch-suggestions="querySearchAsync"
        placeholder="請輸入內容"
        @select="handleSelect">
        <el-button
          slot="append"
          icon="el-icon-search"/>
      </el-autocomplete>
    </el-col>
  </div>
</template>
