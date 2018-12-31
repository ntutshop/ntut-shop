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
    >特定商品 id: {{ id }} 編輯頁面</v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: ['checkUserLogin', 'checkUserRegister'],
  asyncData ({ params }) {
    return params
  },
  data () {
    return {

    }
  }
}
</script>
