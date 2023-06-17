<template>
  <v-btn icon @click="update_garment()" :loading="loading">
    <v-icon v-if="success" color="success">mdi-check</v-icon>
    <v-icon v-else>mdi-content-save</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "GarmentUpdateButton",
  props: {
    garment: Object,
  },
  data() {
    return {
      loading: false,
      success: false,
    }
  },

  methods: {
    async update_garment() {
      const url = `/garments/${this.garment_id}/`
      this.loading = true
      try {
        await this.axios.patch(url, this.garment)
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 2000)
      } catch (error) {
        if (error.response) console.error(error.response.data)
        else console.error(error)
        alert("Update failed")
      } finally {
        this.loading = false
      }
    },
  },
  computed: {
    garment_id() {
      return this.garment?._id
    },
  },
}
</script>
