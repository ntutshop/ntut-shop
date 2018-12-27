<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      row
      wrap
      justify-center
      align-center
    >個人後台頁面 - 商品列表</v-layout>
  </v-container>
</template>

<script>
export default {
  asyncData ({ query }) {
    console.log(query)
    return query
  },
  data () {
    return {

    }
  }
}
</script>
