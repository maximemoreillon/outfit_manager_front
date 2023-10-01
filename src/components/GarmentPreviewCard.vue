<template>
  <v-card
    height="100%"
    outlined
    :to="{ name: 'garment', params: { garment_id: garment._id } }"
  >
    <v-img
      :height="height"
      contain
      v-if="garment.image"
      :src="image_src(garment)"
    />
    <div v-else class="text-center">
      <v-icon :size="height">mdi-image-off</v-icon>
    </div>

    <v-card-title>
      <span class="garmentTitle">
        {{ garment.label }}
      </span>
    </v-card-title>
    <v-card-subtitle>
      <v-row dense align="baseline">
        <v-col cols="auto">
          <v-avatar
            size="1.5em"
            class="elevation-2"
            v-if="itemColorHex(garment)"
            :color="itemColorHex(garment)"
          />
        </v-col>
        <v-col cols="auto">
          {{ garment.brand }}
        </v-col>
        <v-col cols="auto">
          {{ garment.size }}
        </v-col>
      </v-row>
      <v-row dense v-if="garment.rating">
        <v-col>
          <v-rating
            small
            :value="garment.rating"
            background-color="primary"
            color="primary"
          />
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import colors from "../colors"
const { VUE_APP_OUTFIT_MANAGER_API_URL } = process.env

export default {
  name: "GarmentsCards",
  props: {
    garment: Object,
    height: {
      type: String,
      default: "24em",
    },
  },
  data() {
    return {
      colors,
    }
  },
  methods: {
    image_src(item) {
      const token = this.$cookies.get("jwt")
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${item._id}/thumbnail?jwt=${token}`
    },

    itemColorHex(item) {
      const foundColor = this.colors.find((color) => color.name === item.color)
      if (!foundColor) return
      return foundColor.hex
    },
  },
}
</script>
