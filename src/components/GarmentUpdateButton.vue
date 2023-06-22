<template>
  <div>

    <v-btn icon @click="update_garment()" :loading="loading">
      <v-icon v-if="success" color="success">mdi-check</v-icon>
      <v-icon v-else>mdi-content-save</v-icon>
    </v-btn>
    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.visible"
    >
      {{snackbar.text}}
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="snackbar.visible = false"
        >
        <v-icon>mdi-close</v-icon>
          
        </v-btn>
      </template>
    </v-snackbar>
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
      snackbar: {
        visible: false,
        text: "",
        color: 'success',
      }
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
        this.snackbar.text = "Garment updated"
        this.snackbar.visible = true
        this.snackbar.color = "success"
        setTimeout(() => {
          this.success = false
        }, 2000)
      } catch (error) {
        if (error.response) console.error(error.response.data)
        else console.error(error)

        this.snackbar.text = "Garment update failed"
        this.snackbar.visible = true
        this.snackbar.color = "error"

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
