<template>
  <div class="about">

    <h1>Create Garment</h1>



    <v-form @submit.prevent="create_garment()">
      <v-text-field
        v-model="label"
        label="Label"/>
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
      label: '',
      image: null,
    }
  },
  methods: {
    create_garment(){



      const url = `${process.env.VUE_APP_OUTFIT_MANAGER_API_URL}/garments/`

      const formData = new FormData()
      formData.append('label', this.label)
      formData.append('image', this.image)

      this.axios.post(url,formData)
      .then(({data}) => {
        this.$router.push({name: 'garment', params: {garment_id: data._id}})
      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`failed`)
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
