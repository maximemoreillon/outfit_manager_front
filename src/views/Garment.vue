<template>
  <v-card class="mx-auto" max-width="50rem" :loading="loading">
    <template v-if="garment">
      <v-toolbar flat>
        <v-btn icon exact :to="{ name: 'garments' }">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{ garment.label }}</v-toolbar-title>
        <v-spacer />
        <GarmentUpdateButton :garment="garment" />
        <v-btn icon color="#c00000" @click="delete_garment()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />

      <GarmentImageDialog :garment="garment" @imageUpdate="get_garment()" />

      <!-- <v-img
        class="mt-4"
        :src="image_src"
        max-height="400"
        contain/> -->

      <v-card-text>
        <div class="text-h6 mb-3">Properties</div>
        <v-row>
          <v-col>
            <v-text-field label="Name" v-model="garment.label" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-combobox :items="brands" v-model="garment.brand" label="Brand" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-combobox
              v-model="garment.color"
              :items="colors.map((c) => c.name)"
              label="Color"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="Size" v-model="garment.size" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="Description"
              auto-grow
              rows="1"
              v-model="garment.description"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="Comment"
              auto-grow
              rows="1"
              v-model="garment.comment"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-combobox :items="types" v-model="garment.type" label="Type" />
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import GarmentImageDialog from "@/components/GarmentImageDialog.vue"
import GarmentUpdateButton from "../components/GarmentUpdateButton.vue"
import colors from "../colors"

export default {
  name: "Garment",
  components: {
    GarmentImageDialog,
    GarmentUpdateButton,
  },
  data() {
    return {
      loading: false,
      garment: null,
      types: [],
      brands: [],
      colors,
    }
  },
  mounted() {
    this.get_garment()
    this.get_garment_types()
    this.get_garment_brands()
  },
  methods: {
    get_garment() {
      this.loading = true
      this.garment = null
      const url = `/garments/${this.garment_id}/`

      this.axios
        .get(url)
        .then(({ data }) => {
          this.garment = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`failed`)
        })
        .finally(() => {
          this.loading = false
        })
    },

    get_garment_types() {
      // TODO: have this in a type selector component
      const url = `/garments/types`

      this.axios
        .get(url)
        .then(({ data }) => {
          this.types = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Garment type query failed`)
        })
    },
    get_garment_brands() {
      // TODO: have this in a brand selector component
      const url = `/garments/brands`

      this.axios
        .get(url)
        .then(({ data }) => {
          this.brands = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Garment type query failed`)
        })
    },

    delete_garment() {
      if (!confirm(`Delete garment?`)) return
      const url = `/garments/${this.garment_id}/`

      this.axios
        .delete(url)
        .then(() => {
          this.$router.push({ name: "garments" })
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`failed`)
        })
    },
  },
  computed: {
    garment_id() {
      return this.$route.params.garment_id
    },
    image_src() {
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/image`
    },
  },
}
</script>

<style>
.outfits_wrapper {
  display: flex;
}
</style>
