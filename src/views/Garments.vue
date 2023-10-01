<template>
  <v-card :loading="loading">
    <v-toolbar flat>
      <v-toolbar-title> Garments </v-toolbar-title>
      <v-spacer />
      <v-btn :to="{ name: 'create_garment' }" color="primary">
        <v-icon left>mdi-plus</v-icon>
        <span>New</span>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          />
        </v-col>
        <v-col cols="auto">
          <v-btn-toggle v-model="layout" mandatory group>
            <v-btn>
              <v-icon>mdi-view-sequential</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-view-grid</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-view-carousel</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select :items="selectableTypes" v-model="type" label="Type" />
        </v-col>
        <v-col>
          <v-select
            @change="get_garments()"
            :items="selectableColors"
            v-model="color"
            label="Color"
          />
        </v-col>
        <v-col>
          <v-select
            @change="get_garments()"
            :items="selectableBrands"
            v-model="brand"
            label="Brand"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-if="garments.length">
      <GarmentsTable v-if="layout === 0" :garments="searched_garments" />
      <GarmentsCards v-else-if="layout === 1" :garments="searched_garments" />
      <GarmentsCarousel
        v-else-if="layout === 2"
        :garments="searched_garments"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import colors from "../colors"
import GarmentsTable from "../components/GarmentsTable.vue"
import GarmentsCards from "../components/GarmentsCards.vue"
import GarmentsCarousel from "../components/GarmentsCarousel.vue"
const { VUE_APP_OUTFIT_MANAGER_API_URL } = process.env
export default {
  name: "Garments",
  components: {
    GarmentsTable,
    GarmentsCards,
    GarmentsCarousel,
  },
  data() {
    return {
      layout: Number(localStorage.getItem("layout")) || 0,
      garments: [],
      loading: false,
      search: "",

      colors,
      selectableColors: [
        { text: "Any", value: null },
        ...colors.map((c) => ({ text: c.name, value: c.name })),
      ],
      garmentTypes: [],
      garmentBrands: [],
    }
  },
  mounted() {
    this.get_garments()
    this.get_garment_types()
    this.get_garment_brands()
  },
  watch: {
    query() {
      this.get_garments()
    },
    layout(val) {
      localStorage.setItem("layout", val)
    },
  },
  methods: {
    get_garments() {
      const params = this.query

      this.loading = true
      this.axios
        .get(`/garments`, { params })
        .then(({ data }) => {
          this.garments = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Garment query failed`)
        })
        .finally(() => {
          this.loading = false
        })
    },
    get_garment_types() {
      this.axios
        .get(`/garments/types`)
        .then(({ data }) => {
          this.garmentTypes = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Garment type query failed`)
        })
    },
    get_garment_brands() {
      this.axios
        .get(`/garments/brands`)
        .then(({ data }) => {
          this.garmentBrands = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Garment type query failed`)
        })
    },

    image_src(item) {
      const token = this.$cookies.get("jwt")
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${item._id}/thumbnail?jwt=${token}`
    },

    itemColorHex(item) {
      const foundColor = this.colors.find((color) => color.name === item.color)
      if (!foundColor) return
      return foundColor.hex
    },
    setQueryParam(key, value) {
      if (this.$route.query[key] === value) return
      const query = { ...this.$route.query }
      if (value) query[key] = value
      else delete query[key]
      this.$router.replace({ query })
    },
  },
  computed: {
    searched_garments() {
      // TODO: server-side search
      if (this.search === "") return this.garments
      return this.garments.filter((g) =>
        g.label.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    selectableTypes() {
      return [
        { text: "Any", value: null },
        ...this.garmentTypes.map((t) => ({ text: t, value: t })),
      ]
    },
    selectableBrands() {
      return [
        { text: "Any", value: null },
        ...this.garmentBrands.map((t) => ({ text: t, value: t })),
      ]
    },
    query() {
      return this.$route.query
    },
    type: {
      get() {
        return this.$route.query.type
      },
      set(newVal) {
        this.setQueryParam("type", newVal)
      },
    },
    color: {
      get() {
        return this.$route.query.color
      },
      set(newVal) {
        this.setQueryParam("color", newVal)
      },
    },
    brand: {
      get() {
        return this.$route.query.brand
      },
      set(newVal) {
        this.setQueryParam("brand", newVal)
      },
    },
  },
}
</script>
