<template>
  <div>
    <v-carousel
      height="455"
      hide-delimiters>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
      />
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
        },
        {
          src:
            'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
        },
        {
          src:
            'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
        },
        {
          src:
            'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
        }
      ]
    }
  }
}
</script>
