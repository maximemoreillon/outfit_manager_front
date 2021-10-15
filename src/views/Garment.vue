<template>
  <v-card class="mx-auto" max-width="600">

    <div class="" v-if="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>

    <template
      v-else-if="garment">

      <v-toolbar flat>
        <v-btn
          icon
          exact
          :to="{name: 'garments'}">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>{{garment.label}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="update_garment()">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
        <v-btn
          icon
          color="#c00000"
          @click="delete_garment()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>

      <v-img
        class="mt-4"
        :src="image_src"
        max-height="400" contain/>





      <v-card-text>
        <div class="text-h6 mb-3">
          Properties
        </div>
        <v-form @submit.prevent="update_garment()">
          <v-row>
            <v-col>
              <v-text-field
                label="Label"
                v-model="garment.label" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="garment.color"
                :items="colors"
                label="Color"/>
            </v-col>
          </v-row>

        </v-form>
      </v-card-text>

      <v-card-text>
        <div class="text-h6 mb-3">
          Image update
        </div>
        <v-form @submit.prevent="image_upload()">
          <v-row align="center">
            <v-col>
              <v-file-input
              accept="image/*"
              label="File input"
              v-model="image_to_upload"/>
            </v-col>
            <v-col cols="auto">
              <v-btn
                :disabled="!image_to_upload"
                type="submit">Submit</v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-card-text>

    </template>


  </v-card>
</template>

<script>

export default {
  name: 'Garment',
  data(){
    return {
      loading: false,
      garment: null,
      image_to_upload: null,
      colors: [
        'black',
        'white',
        'navy',
        'charcoal',
        'beige',
        'dark brown',
        'light brown',
      ]
    }
  },
  mounted(){
    this.get_garment()
  },
  methods: {
    get_garment(){
      this.loading = true
      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/`

      this.axios.get(url)
      .then(({data}) => {
        this.garment = data
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
      })
      .finally( () => {this.loading = false})
    },
    update_garment(){
      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/`

      this.axios.patch(url, this.garment)
      .then(() => {
        this.get_garment()
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
      })
    },

    delete_garment(){
      if(!confirm(`Delete garment?`)) return
      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/`

      this.axios.delete(url)
      .then(() => {
        this.$router.push({name: 'garments'})
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
      })
    },

    image_upload(){

      const formData = new FormData()
      formData.append('image', this.image_to_upload)


      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/image`

      this.axios.post(url,formData)
      .then(() => {
        this.get_garment()
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
      })

    }
  },
  computed: {
    garment_id(){
      return this.$route.params.garment_id
    },
    image_src(){
      return `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/${this.garment_id}/image`
    }
  }

}
</script>

<style>
.outfits_wrapper {
  display: flex;
}
</style>
