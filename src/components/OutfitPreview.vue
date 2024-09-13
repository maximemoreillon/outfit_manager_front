<template>
  <v-card :to="{ name: 'outfit', params: { outfit_id: outfit._id } }">
    <v-img :src="image_src" aspect-ratio="0.75" />
  </v-card>
</template>

<script>
const { VUE_APP_OUTFIT_MANAGER_API_URL } = process.env
export default {
  name: "OutfitPreview",
  props: {
    outfit: Object,
  },
  computed: {
    image_src() {
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit._id}/thumbnail`
    },
  },
}
</script>

<style></style>
