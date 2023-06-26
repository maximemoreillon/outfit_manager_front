<template>
  <v-data-table
    :headers="headers"
    :items="garments"
    :items-per-page="-1"
    @click:row="row_clicked($event)"
  >
    <template v-slot:item.image="{ item }">
      <v-img
        width="5em"
        height="8em"
        cover
        v-if="item.image"
        :src="image_src(item)"
      />
    </template>

    <template v-slot:item.color="{ item }">
      <v-avatar
        class="elevation-2"
        v-if="itemColorHex(item)"
        :color="itemColorHex(item)"
      />
      <span v-else>{{ item.color }}</span>
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
      ],
      colors,
    }
  },
  methods: {
    image_src(item) {
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${item._id}/thumbnail`
    },
    itemColorHex(item) {
      const foundColor = this.colors.find((color) => color.name === item.color)
      if (!foundColor) return
      return foundColor.hex
    },
  },
}
</script>
