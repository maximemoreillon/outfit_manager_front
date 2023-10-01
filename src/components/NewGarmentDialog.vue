<template>
  <v-dialog max-width="50rem" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="primary" dark>
        <v-icon left>mdi-plus</v-icon>
        <span>New</span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title> New garment </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="create_garment()">
          <v-row>
            <v-col>
              <v-text-field v-model="label" label="Label" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-file-input
                accept="image/*"
                label="File input"
                v-model="image"
              />
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
  </v-dialog>
</template>

<script>
export default {
  name: "NewGarmentDialog",

  data: () => ({
    loading: false,
    newGarment: {
      label: "",
    },
    dialog: false,
  }),

  methods: {
    create_meal_plan() {
      this.loading = true

      const formData = new FormData()
      formData.append("label", this.label)

      if (this.image) formData.append("image", this.image)

      this.axios
        .post(`/garments`, this.newGarment)
        .then(({ data }) => {
          this.$router.push({
            name: "garment",
            params: { garment_id: data._id },
          })
        })
        .catch((error) => {
          alert(`Garment creation failed`)
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
