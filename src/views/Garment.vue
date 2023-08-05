<template>
  <v-card :loading="loading">
    <v-toolbar flat>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <GarmentImageDialog :garment="garment" @imageUpdate="get_garment()" />
      <GarmentUpdateButton
        :garment="garment"
        @success="garmentUpdateSuccess()"
        @error="garmentUpdateError()"
      />
      <v-btn icon color="#c00000" @click="delete_garment()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>

    <template v-if="garment">
      <v-row>
        <v-col cols="12" md="8">
          <img :src="image_src" class="garment_image" />
        </v-col>
        <v-col cols="12" md="4">
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field label="Name" v-model="garment.label" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-combobox
                  :items="brands"
                  v-model="garment.brand"
                  label="Brand"
                />
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
                <v-combobox
                  :items="types"
                  v-model="garment.type"
                  label="Type"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Quantity"
                  v-model.number="garment.quantity"
                  type="number"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-rating
                  hover
                  v-model="garment.rating"
                  background-color="primary"
                  color="primary"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn icon @click="garment.rating = null">
                  <v-icon>mdi-star-off</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <OutfitsOfGarment />
        </v-col>
      </v-row>
    </template>

    <v-snackbar :color="snackbar.color" v-model="snackbar.visible" bottom>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar.visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import GarmentImageDialog from "@/components/GarmentImageDialog.vue"
import GarmentUpdateButton from "../components/GarmentUpdateButton.vue"
import OutfitsOfGarment from "../components/OutfitsOfGarment.vue"
import colors from "../colors"
const { VUE_APP_OUTFIT_MANAGER_API_URL } = process.env

export default {
  name: "Garment",
  components: {
    GarmentImageDialog,
    GarmentUpdateButton,
    OutfitsOfGarment,
  },
  data() {
    return {
      loading: false,
      garment: null,
      types: [],
      brands: [],
      colors,
      snackbar: {
        visible: false,
        text: "",
        color: "success",
      },
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
    garmentUpdateSuccess() {
      this.snackbar.text = "Garment updated"
      this.snackbar.visible = true
      this.snackbar.color = "success"
    },
    garmentUpdateError() {
      this.snackbar.text = "Garment update failed"
      this.snackbar.visible = true
      this.snackbar.color = "error"
    },
  },
  computed: {
    garment_id() {
      return this.$route.params.garment_id
    },
    image_src() {
      if (process.env.NODE_ENV === "development")
        return "https://img.maximemoreillon.com/images/63acfcf3441769f977b802f0"
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/image`
    },
  },
}
</script>

<style>
.outfits_wrapper {
  display: flex;
}

.garment_image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
