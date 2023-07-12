<template>
  <v-card-text>
    <template v-if="outfits.length">
      <h2 class="my-6">Outfits with this garment</h2>
      <v-row justify="space-around">
        <v-col
          v-for="(outfit, i) in outfits"
          :key="`outfit_${i}`"
          cols="12"
          md="3"
          sm="6"
        >
          <OutfitPreview :outfit="outfit" />
        </v-col>
      </v-row>
    </template>
  </v-card-text>
</template>

<script>
import OutfitPreview from "./OutfitPreview.vue"
export default {
  name: "OutfitsOfGarment",
  components: {
    OutfitPreview,
  },
  data() {
    return {
      outfits: [],
    }
  },
  mounted() {
    this.getOutfitsOfGarment()
  },
  methods: {
    async getOutfitsOfGarment() {
      const garmentId = this.$route.params.garment_id
      const route = `/garments/${garmentId}/outfits`
      const { data } = await this.axios.get(route)
      this.outfits = data
    },
  },
}
</script>
