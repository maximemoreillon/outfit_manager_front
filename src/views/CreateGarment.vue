<template>
  <v-card max-width="40rem" class="mx-auto">
    <v-card-title>Create garment</v-card-title>

    <v-card-text>
      <v-form @submit.prevent="create_garment()">
        <v-row>
          <v-col>
            <v-text-field v-model="label" label="Label" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-file-input accept="image/*" label="File input" v-model="image" />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn type="submit" color="primary" :loading="loading">
              <v-icon left>mdi-plus</v-icon>
              <span>Create</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      label: "",
      image: null,
      loading: false,
    }
  },
  methods: {
    create_garment() {
      const url = `/garments/`

      const formData = new FormData()
      formData.append("label", this.label)
      formData.append("image", this.image)

      this.loading = true

      this.axios
        .post(url, formData)
        .then(({ data }) => {
          this.$router.push({
            name: "garment",
            params: { garment_id: data._id },
          })
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
  },
}
</script>

<style>
.outfits_wrapper {
  display: flex;
}
</style>
