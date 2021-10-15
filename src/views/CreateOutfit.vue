<template>
  <div class="about">

    <h1>Create outfit</h1>



    <v-form @submit.prevent="create_outfit()">
      <v-file-input
      accept="image/*"
      label="File input"
      v-model="image"
      />
      <v-btn type="submit">Submit</v-btn>
    </v-form>







  </div>
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
