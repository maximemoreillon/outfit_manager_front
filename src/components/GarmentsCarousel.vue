<template>
  <v-carousel hide-delimiters v-model="itemIndex" height="100%" width="">
    <v-carousel-item v-for="garment in garments" :key="garment._id">
      <GarmentPreviewCard :garment="garment" />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import GarmentPreviewCard from "./GarmentPreviewCard.vue"

import colors from "../colors"
const { VUE_APP_OUTFIT_MANAGER_API_URL } = process.env

export default {
  name: "GarmentsCarousel",
  components: {
    GarmentPreviewCard,
  },
  props: {
    garments: Array,
  },
  data() {
    return {
      itemIndex: 0,
      colors,
    }
  },
  methods: {
    image_src(item) {
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${item._id}/thumbnail`
      // return "https://img.maximemoreillon.com/images/6451ba6efe111a0013b73dea/thumbnail"
    },
    itemColorHex(item) {
      const foundColor = this.colors.find((color) => color.name === item.color)
      if (!foundColor) return
      return foundColor.hex
    },
  },
}
</script>
