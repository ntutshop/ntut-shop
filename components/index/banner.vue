<template>
  <div>
    <v-carousel
      height="250"
      hide-delimiters
    >
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
            'https://media.taaze.tw/showBanaerImage.html?pk=1000500218&width=1000&height=326&fill=f'
        },
        {
          src:
            'https://media.taaze.tw/showBanaerImage.html?pk=1000498512&width=1000&height=326&fill=f'
        },
        {
          src:
            'https://media.taaze.tw/showBanaerImage.html?pk=1000497596&width=1000&height=326&fill=f'
        }
      ]
    }
  }
}
</script>
