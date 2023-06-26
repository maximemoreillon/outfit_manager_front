<template>
  <div>
    <v-row justify="space-around">
      <v-col
        v-for="garment in garments"
        :key="garment._id"
        cols="12"
        md="4"
        sm="6"
      >
        <GarmentPreviewCard :garment="garment" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GarmentPreviewCard from "./GarmentPreviewCard.vue"

export default {
  name: "GarmentsCards",
  props: {
    garments: Array,
  },
  components: {
    GarmentPreviewCard,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style>
.garmentTitle {
  max-width: 80%;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
