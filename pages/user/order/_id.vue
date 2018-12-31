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
    >特定訂單頁面 id: {{ id }}</v-layout>
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
