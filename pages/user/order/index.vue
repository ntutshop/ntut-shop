<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      column
      wrap
      justify-center
      align-center
    >
      <p>
        個人後台頁面 - 訂單列表
      </p>
      <div>
        <p>query:</p>
        <ul>
          <li
            v-for="key in Object.keys(query)"
            :key="key">{{ key }} = {{ query[key] }}</li>
        </ul>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  asyncData ({ query }) {
    return { query }
  },
  data () {
    return {

    }
  }
}
</script>
