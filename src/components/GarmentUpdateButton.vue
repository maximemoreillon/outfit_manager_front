<template>
  <div>
    <v-btn icon @click="update_garment()" :loading="loading">
      <v-icon v-if="success" color="success">mdi-check</v-icon>
      <v-icon v-else>mdi-content-save</v-icon>
    </v-btn>
  </div>
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
  mounted() {
    document.addEventListener("keydown", this.handle_keydown_events)
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handle_keydown_events)
  },
  methods: {
    handle_keydown_events(e) {
      if (e.key === "s" && e.ctrlKey) {
        e.preventDefault()
        this.update_garment()
      }
    },
    async update_garment() {
      const url = `/garments/${this.garment_id}/`
      this.loading = true
      try {
        await this.axios.patch(url, this.garment)
        this.success = true
        this.$emit("success")

        setTimeout(() => {
          this.success = false
        }, 2000)
      } catch (error) {
        if (error.response) console.error(error.response.data)
        else console.error(error)
        this.$emit("error")
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
