<template>
  <v-carousel hide-delimiters v-model="itemIndex" height="auto">
    <v-carousel-item v-for="garment in garments" :key="garment._id">
      <GarmentPreviewCard :garment="garment" height="50vh" />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import GarmentPreviewCard from "./GarmentPreviewCard.vue"

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
    }
  },
  methods: {},
}
</script>
