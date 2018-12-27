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
    >{{ username }} 的僅可檢視的個人資訊頁面</v-layout>
  </v-container>
</template>

<script>
export default {
  asyncData ({ params }) {
    return params
  },
  data () {
    return {

    }
  }
}
</script>
