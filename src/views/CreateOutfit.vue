<template>
  <v-card max-width="500" class="mx-auto">
    <v-card-title>Create outfit</v-card-title>

    <v-card-text>
      <v-form @submit.prevent="create_outfit()">
        <v-row>
          <v-col>
            <v-file-input
            accept="image/*"
            label="File input"
            v-model="image" />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn type="submit">Create</v-btn>
          </v-col>
        </v-row>

      </v-form>
    </v-card-text>

  </v-card>

</template>

<script>

export default {
  name: 'Home',
  data(){
    return {
      image: null,
    }
  },
  methods: {
    create_outfit(){


      const formData = new FormData()
      formData.append('image', this.image)

      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/outfits/`

      this.axios.post(url,formData)
      .then(({data}) => {
        this.$router.push({name: 'outfit', params: {outfit_id: data._id}})
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
      })

    }
  }

}
</script>

<style>
.outfits_wrapper {
  display: flex;
}
</style>
