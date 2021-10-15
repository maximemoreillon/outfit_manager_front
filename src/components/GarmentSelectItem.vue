<template>
  <v-item v-slot="{ active, toggle }">
    <GarmentPreview
      :garment="garment">
      <template v-slot:actions>
        <v-btn
          :color="active ? 'primary' : ''"
          @click="toggle"> Select
        </v-btn>
      </template>
    </GarmentPreview>

  </v-item>
</template>

<script>
import GarmentPreview from '@/components/GarmentPreview.vue'

export default {
  name: 'GarmentSelectItem',
  props: {
    garment: Object,
  },
  components: {
    GarmentPreview,
  }
}
</script>

<style>
</style>
