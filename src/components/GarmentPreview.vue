<template>
  <v-card
    max-width="200">

    <v-img
      height="200"
      contain
      :src="image_src"/>

    <v-card-title>{{garment.label}}</v-card-title>

    <v-card-actions>
      <slot name="actions"></slot>
      <v-btn
        :to="{name: 'garment', params: {garment_id: garment._id}}">See more
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'GarmentPreview',
  props: {
    garment: Object,
  },
  computed: {
    image_src() {
      //return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment._id}/image`
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment._id}/thumbnail`
    }
  }
}
</script>

<style>
</style>
