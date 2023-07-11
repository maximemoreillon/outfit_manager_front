<template>
  <v-card
    :to="{ name: 'outfit', params: { outfit_id: outfit._id } }"
  >
    <v-img :src="image_src" aspect-ratio="0.75" />
  </v-card>
</template>

<script>
const {
  NODE_ENV,
  VUE_APP_OUTFIT_MANAGER_API_URL
} = process.env
export default {
  name: "OutfitPreview",
  props: {
    outfit: Object,
  },
  computed: {
    image_src() {
      if(NODE_ENV === 'development') return "https://img.maximemoreillon.com/images/64a496783581c50013b5a9f9"
      else return `${VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit._id}/thumbnail`
    },
  },
}
</script>

<style></style>
