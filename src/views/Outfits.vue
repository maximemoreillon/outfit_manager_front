<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>Outfits</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text :to="{ name: 'create_outfit' }">
        <v-icon left>mdi-plus</v-icon>
        <span>New outfit</span>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>

    <v-card-text>
      <v-row justify="space-around">
        <v-col v-for="(outfit, i) in outfits" :key="`outfit_${i}`" cols="auto">
          <OutfitPreview :outfit="outfit" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import OutfitPreview from "@/components/OutfitPreview.vue"

export default {
  name: "Garments",
  components: {
    OutfitPreview,
  },
  data() {
    return {
      outfits: [],
      garment_search: "",
    }
  },
  mounted() {
    this.get_outfits()
  },
  methods: {
    get_outfits() {
      const url = `/outfits/`

      this.axios
        .get(url)
        .then(({ data }) => {
          this.outfits = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`failed`)
        })
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

<style>
.outfits_wrapper {
  display: flex;
}
</style>
