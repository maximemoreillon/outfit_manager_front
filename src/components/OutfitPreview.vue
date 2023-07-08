<template>
  <v-card
    :to="{ name: 'outfit', params: { outfit_id: outfit._id } }"
    height="100%"
  >
    <v-img height="20rem" cover :src="image_src" />
  </v-card>
</template>

<script>
export default {
  name: "OutfitPreview",
  props: {
    outfit: Object,
  },
  computed: {
    image_src() {
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit._id}/thumbnail`
    },
  },
}
</script>

<style></style>
