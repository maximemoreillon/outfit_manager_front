<template>
  <v-data-table :headers="headers" :items="garments" :items-per-page="-1">
    <template v-slot:item.image="{ item }">
      <v-img
        width="5em"
        height="8em"
        cover
        v-if="item.image"
        :src="image_src(item)"
      />
      <v-icon v-else size="5rem">mdi-image-off</v-icon>
    </template>

    <template v-slot:item.label="{ item }">
      <router-link :to="{ name: 'garment', params: { garment_id: item._id } }">
        {{ item.label }}
      </router-link>
    </template>

    <template v-slot:item.color="{ item }">
      <v-avatar
        class="elevation-2"
        v-if="itemColorHex(item)"
        :color="itemColorHex(item)"
      />
      <span v-else>{{ item.color }}</span>
    </template>

    <template v-slot:item.rating="{ item }">
      <v-rating
        v-if="item.rating"
        :value="item.rating"
        background-color="primary"
        color="primary"
        readonly
      />
    </template>

    <template v-slot:item.condition="{ item }">
      <v-progress-linear :value="item.condition" height="1rem" rounded />
    </template>
  </v-data-table>
</template>

<script>
import colors from "../colors"
const { VUE_APP_OUTFIT_MANAGER_API_URL } = process.env

export default {
  name: "GarmentsTable",
  props: {
    garments: Array,
  },
  data() {
    return {
      headers: [
        { text: "Image", value: "image" },
        { text: "Name", value: "label" },
        { text: "Type", value: "type" },
        { text: "Color", value: "color" },
        { text: "Brand", value: "brand" },
        { text: "Size", value: "size" },
        { text: "Qty", value: "quantity" },
        { text: "Rating", value: "rating" },
        { text: "Condition", value: "condition" },
      ],
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
    row_clicked({ _id }) {
      this.$router.push({ name: "garment", params: { garment_id: _id } })
    },
  },
}
</script>
