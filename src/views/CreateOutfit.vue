<template>
  <v-card max-width="40rem" class="mx-auto">
    <v-card-title>Create outfit</v-card-title>

    <v-card-text>
      <v-form @submit.prevent="create_outfit()">
        <v-row>
          <v-col>
            <v-file-input accept="image/*" label="File input" v-model="image" />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn type="submit" :loading="loading">Create</v-btn>
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
      image: null,
      loading: false,
    }
  },
  methods: {
    create_outfit() {
      const formData = new FormData()
      formData.append("image", this.image)

      const url = `/outfits/`

      this.loading = true
      this.axios
        .post(url, formData)
        .then(({ data }) => {
          this.$router.push({ name: "outfit", params: { outfit_id: data._id } })
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
}
</script>

<style>
.outfits_wrapper {
  display: flex;
}
</style>
