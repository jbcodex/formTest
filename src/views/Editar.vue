<template>
  
    <v-container class="content">
      <FormEdit :contactSelected="contactSelected" @editContact="editContact" />
    </v-container>
  
</template> 
<script>
import { mapMutations } from 'vuex'
import FormEdit from '@/components/FormEdit.vue'
export default {
  components:{
    FormEdit, 
  },
  
 computed:{
   contactSelected(){
     return this.$store.state.dataEdit
   }
  },

  methods:{
     ...mapMutations(['saveEditingContact']),
     editContact(payload){
       this.saveEditingContact(payload)
      this.$router.push({path: '/'})
     },
  }
 }
  
  

</script>

