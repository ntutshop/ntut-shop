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
    >個人後台頁面</v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: ['checkUserLogin', 'checkUserRegister'],
  data () {
    return {

    }
  }
}
</script>
