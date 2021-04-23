<template>

    <v-simple-table class="mt-2 tb">
      <template v-slot:default>
          <thead>
            <tr class="light-gray darken-1">
              <th class="black--text">Nome</th>
              <th class="black--text">E-mail</th>
              <th class="black--text">Idade</th>
              <th class="black--text">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, i) in contacts" :key="data.id">
              <td>{{data.name}}</td>
              <td>{{data.email}}</td>
              <td>{{data.age}}</td>
              <td>
               <v-icon small @click="edit(data, i)">mdi-pencil</v-icon>
                  
              </td>
            </tr>
          </tbody>
      </template>
    </v-simple-table>

</template>

<script>
import { mapMutations } from 'vuex'
export default {
  
  computed:{
      contacts(){
        return this.$store.state.dataArray.map((e) =>{
          return{
            name:e.name,
            email:e.email,
            age:e.age
          }
        })
      }
  },

  methods:{
    ...mapMutations(['addEditContact']),
    edit(data, i){
      this.$emit('oldName', data.name)
      this.addEditContact({data: data, index: i})
      this.$router.push({path: '/Editar'})
    }
  }
}
</script>
<style>
 .tb{
   width:420px; 
   height:330px;
   
 }

</style>

