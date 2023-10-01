<template>
  <v-card class="mx-auto">
    <template v-if="outfit">
      <v-toolbar flat>
        <v-btn icon exact :to="{ name: 'outfits' }">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon color="#c00000" @click="delete_outfit()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-row>
              <v-col>
                <v-img :src="image_src" height="400" contain />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="text-h6">Image update</div>
              </v-col>
            </v-row>
            <v-form @submit.prevent="image_update()">
              <v-row>
                <v-col>
                  <v-file-input
                    accept="image/*"
                    label="File input"
                    v-model="image_to_upload"
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn text :disabled="!image_to_upload" type="submit">
                    <v-icon>mdi-upload</v-icon>
                    <span>Upload</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>

          <v-col cols="12" md="6">
            <v-data-table
              :headers="garments_table_headers"
              :items="outfit.garments"
              :items-per-page="-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Garments in this outfit</v-toolbar-title>
                  <v-spacer />

                  <!-- TODO: Make thsi its own component -->
                  <v-dialog v-model="dialog">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text v-bind="attrs" v-on="on">
                        <v-icon>mdi-pencil</v-icon>
                        <span class="ml-2">Edit</span>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5">
                        Edit garments
                      </v-card-title>

                      <v-card-text>
                        <v-row>
                          <v-col cols="6">
                            <v-toolbar flat>
                              <v-toolbar-title
                                >Available garments</v-toolbar-title
                              >
                              <v-spacer />
                            </v-toolbar>
                            <v-divider></v-divider>

                            <v-data-table
                              :search="available_garment_search"
                              :headers="garments_table_headers"
                              :items="garments"
                              :items-per-page="-1"
                              height="50vh"
                              @click:row="add_garment($event)"
                            >
                              <template v-slot:top>
                                <v-text-field
                                  label="Search"
                                  v-model="available_garment_search"
                                />
                              </template>

                              <template v-slot:item.image="{ item }">
                                <v-img
                                  width="7.5em"
                                  height="7.5em"
                                  contain
                                  v-if="item.image"
                                  :src="garment_image_src(item)"
                                />
                              </template>

                              <template v-slot:item.details="{ item }">
                                <v-btn
                                  icon
                                  :to="{
                                    name: 'garment',
                                    params: { garment_id: item._id },
                                  }"
                                >
                                  <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                              </template>
                            </v-data-table>
                          </v-col>

                          <v-col cols="6">
                            <v-toolbar flat>
                              <v-toolbar-title
                                >Garments in this outfit</v-toolbar-title
                              >
                              <v-spacer />
                            </v-toolbar>
                            <v-divider></v-divider>

                            <v-data-table
                              :search="garments_part_of_this_outfit_search"
                              :headers="garments_table_headers"
                              :items="outfit.garments"
                              :items-per-page="-1"
                              height="50vh"
                              @click:row="remove_garment($event)"
                            >
                              <template v-slot:top>
                                <v-text-field
                                  label="Search"
                                  v-model="garments_part_of_this_outfit_search"
                                />
                              </template>

                              <template v-slot:item.image="{ item }">
                                <v-img
                                  width="7.5em"
                                  height="7.5em"
                                  contain
                                  v-if="item.image"
                                  :src="garment_image_src(item)"
                                />
                              </template>

                              <template v-slot:item.details="{ item }">
                                <v-btn
                                  icon
                                  :to="{
                                    name: 'garment',
                                    params: { garment_id: item._id },
                                  }"
                                >
                                  <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                              </template>
                            </v-data-table>
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
                <v-divider></v-divider>
              </template>

              <template v-slot:item.image="{ item }">
                <v-img
                  width="7.5em"
                  height="7.5em"
                  contain
                  v-if="item.image"
                  :src="garment_image_src(item)"
                />
              </template>

              <template v-slot:[`item.label`]="{ item }">
                <router-link
                  :to="{ name: 'garment', params: { garment_id: item._id } }"
                  >{{ item.label }}</router-link
                >
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
// import GarmentPreview from '@/components/GarmentPreview.vue'
const { VUE_APP_OUTFIT_MANAGER_API_URL } = process.env
export default {
  name: "Outfit",
  components: {
    // GarmentPreview,
  },
  data() {
    return {
      image_to_upload: null,
      outfit: null,
      garments_table_headers: [
        { text: "Image", value: "image" },
        { text: "Name", value: "label" },
        { text: "Type", value: "type" },
        { text: "Brand", value: "brand" },
        { text: "Color", value: "color" },
      ],
      garments: [],
      selected_garment_indices: [],
      garment_search: "",
      dialog: false,
      available_garment_search: "",
      garments_part_of_this_outfit_search: "",
    }
  },
  mounted() {
    this.get_outfit(), this.get_garments()
  },
  methods: {
    get_outfit() {
      const url = `/outfits/${this.outfit_id}/`

      this.axios
        .get(url)
        .then(({ data }) => {
          this.outfit = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`failed`)
        })
    },
    get_garments() {
      const url = `/garments/`

      this.axios
        .get(url)
        .then(({ data }) => {
          this.garments = data
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`failed`)
        })
    },
    add_garment(garment) {
      const garment_exists = this.outfit.garments.some(
        ({ _id }) => _id === garment._id
      )
      if (garment_exists) return alert("Duplicates not allowed")
      this.outfit.garments.push(garment)
      this.update_outfit()
    },
    remove_garment({ _id }) {
      const found_index = this.outfit.garments.findIndex((g) => g._id === _id)
      if (found_index < 0) return
      this.outfit.garments.splice(found_index, 1)
      this.update_outfit()
    },
    update_outfit() {
      const url = `/outfits/${this.outfit_id}`
      const body = {
        ...this.outfit,
        garments: this.outfit.garments.map(({ _id }) => _id),
      }
      this.axios
        .patch(url, body)
        .then(() => {
          this.get_outfit()
          this.selected_garment_indices = []
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Upload failed`)
        })
    },
    delete_outfit() {
      if (!confirm(`Delete outfit?`)) return
      const url = `/outfits/${this.outfit_id}/`

      this.axios
        .delete(url)
        .then(() => {
          this.$router.push({ name: "outfits" })
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`failed`)
        })
    },
    image_update() {
      const formData = new FormData()
      formData.append("image", this.image_to_upload)

      const url = `/outfits/${this.outfit_id}/image`

      this.axios
        .post(url, formData)
        .then(() => {
          this.get_outfit()
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Upload failed`)
        })
    },
    garment_image_src(item) {
      if (process.env.NODE_ENV === "development")
        return "https://images.maximemoreillon.com/images/63acfcf3441769f977b802f0"
      const token = this.$cookies.get("jwt")
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${item._id}/thumbnail?jwt=${token}`
    },
  },
  computed: {
    outfit_id() {
      return this.$route.params.outfit_id
    },
    image_src() {
      if (process.env.NODE_ENV === "development")
        return "https://images.maximemoreillon.com/images/63acfcf3441769f977b802f0"
      const token = this.$cookies.get("jwt")
      return `${VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/${this.outfit_id}/image?jwt=${token}`
    },

    selected_garments() {
      return this.selected_garment_indices.map((i) => this.garments[i])
    },
    selected_garment_ids() {
      return this.selected_garment_indices.map((i) => this.garments[i]._id)
    },
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
