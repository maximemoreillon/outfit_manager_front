<template>
  <v-dialog v-model="dialog" width="50rem">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-image-refresh</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title> Image update </v-card-title>

      <v-form @submit.prevent="image_upload()">
        <v-card-text>
          <v-file-input
            accept="image/*"
            label="File input"
            v-model="image_to_upload"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
          <v-btn
            :loading="loading"
            text
            :disabled="!image_to_upload"
            type="submit"
            >Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GarmentImageDialog",
  props: {
    garment: Object,
  },
  data() {
    return {
      dialog: false,
      image_to_upload: null,
      loading: false,
    }
  },
  methods: {
    image_upload() {
      this.loading = true

      const formData = new FormData()
      formData.append("image", this.image_to_upload)

      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/image`

      this.axios
        .post(url, formData)
        .then(() => {
          this.$emit("imageUpdate")
          this.dialog = false
        })
        .catch((error) => {
          if (error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Upload failed`)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  computed: {
    garment_id() {
      return this.$route.params.garment_id
    },
  },
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
