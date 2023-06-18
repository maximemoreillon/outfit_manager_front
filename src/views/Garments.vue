<template>
  <v-card>
    <v-card-title>Garments</v-card-title>
    <v-card-text>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="garments"
        :items-per-page="-1"
        @click:row="row_clicked($event)"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              hide-details
            />
            <v-spacer />
            <v-btn :to="{ name: 'create_garment' }" color="primary">
              <v-icon left>mdi-plus</v-icon>
              <span>New garment</span>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.image="{ item }">
          <v-img
            width="7.5em"
            height="7.5em"
            contain
            v-if="item.image"
            :src="image_src(item)"
          />
        </template>

        <template v-slot:item.color="{ item }">
          <v-avatar
            class="elevation-2"
            v-if="itemColorHex(item)"
            :color="itemColorHex(item)"
          ></v-avatar>
          <span v-else>{{ item.color }}</span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import colors from "../colors"
export default {
  name: "Garments",
  components: {},
  data() {
    return {
      benched: 0,
      garments: [],
      selected_garments: [],
      search: "",
      headers: [
        { text: "Image", value: "image" },
        { text: "Name", value: "label" },
        { text: "Type", value: "type" },
        { text: "Color", value: "color" },
        { text: "Brand", value: "brand" },
      ],
      colors,
    }
  },
  mounted() {
    this.get_garments()
  },
  methods: {
    get_garments() {
      const url = `/garments`

      this.axios
        .get(url)
        .then(({ data }) => {
          this.garments = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Garment query failed`)
        })
    },

    image_src(item) {
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${item._id}/thumbnail`
    },

    row_clicked({ _id }) {
      this.$router.push({ name: "garment", params: { garment_id: _id } })
    },
    itemColorHex(item) {
      const foundColor = this.colors.find((color) => color.name === item.color)
      if (!foundColor) return
      return foundColor.hex
    },
  },
  computed: {
    searched_garments() {
      if (this.garment_search === "") return this.garments
      return this.garments.filter((g) =>
        g.label.toLowerCase().includes(this.garment_search.toLowerCase())
      )
    },
  },
}
</script>
