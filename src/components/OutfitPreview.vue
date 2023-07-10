<template>
  <v-card :to="{ name: 'outfit', params: { outfit_id: outfit._id } }">
    <v-img :src="image_src" max-width="20rem" />
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
      // return "https://img.maximemoreillon.com/images/64a496783581c50013b5a9f9"
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit._id}/thumbnail`
    },
  },
}
</script>

<style></style>
