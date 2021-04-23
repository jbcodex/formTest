<template>
    <div>
        <v-form class="panel" ref="formEdit">
         <div class="titleForm">
            <router-link to="/"><v-icon small left>mdi-arrow-left-thick</v-icon></router-link>
          <h2>Editar contato</h2>
         </div>
          <v-text-field
            v-model="contactSelected.name"
            placeholder="No mínimo 5 caracteres"
            append-icon="mdi-account-circle-outline"
            label="Nome"
            :rules="nameRules"
            @keyup="allow"
          ></v-text-field>

          <v-text-field
            v-model="contactSelected.email"
            placeholder="Insira um e-mail válido"
            append-icon="mdi-email-outline"
            label="E-mail"
            :rules="emailRules"
            @keyup="allow"
          ></v-text-field>

          <v-text-field
            v-model="contactSelected.age"
            placeholder="1 / 99 - Somente números"
            append-icon="mdi-emoticon-outline"
            label="Idade"
            maxlength="2"
            :rules="ageRules"
            @keyup="allow"
          ></v-text-field>

        <v-btn x-large @click="edit" class="mt-1" :class="allowButton ? 'blue white--text':'disable-events grey--text'">
        <v-icon left> mdi-check-circle</v-icon>
        Editar contato</v-btn>
        </v-form>
    </div>
</template>
<script>
import swal from "sweetalert";
export default {
  props:{
      contactSelected:{
        type:Object
      }
  },
  data(){
    return{
      oldN:this.oldName,
      allowButton: false,
      nameRules: [
          v => (!!v && v.length > 4) || "Obrigatório mínimo 5 caracteres",
      ],
      emailRules: [
          v => (!!v) || "Email obrigatório",
          v =>
          /^(([^<=>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
          ) || "E-mail inválido!",
      ],
      ageRules: [
        v => (!!v) || "Idade obrigatória!"
        ]
      
    }
  },
   methods:{
     allow(){
         if (
            this.contactSelected.name.length >= 5 && 
            this.validEmail(this.contactSelected.email) && 
            this.contactSelected.age >= 1)
          {
            this.allowButton = true;
          }else{
            this.allowButton = false;
          }
     },
     validEmail(mail) {
            var re = /^(([^<=>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(mail);
     },
     edit(){
       
          swal('Feito!', 'Contato '+this.contactSelected.name+' editado!', 'success')
          this.$emit('editContact', this.contactSelected)
  
     }
  }
}

</script>

<style scoped>
 .disable-events {
     pointer-events: none;
 
  } 

  .titleForm{
    display: flex;
  }
  .swal-title {
  font-family: "Lato", sans-serif;
  font-size: 1.4rem;
}

.swal-button {
  font-family: "Lato", sans-serif;
  background-color: #87bfe4;
  font-size: 15px;
}

.swal-text {
  font-family: "Lato", sans-serif;
  color: #61534e;
}
.swal-modal {
  width: 350px;
  
}
.swal-footer {
  background-color: rgb(245, 248, 250);
  margin-top: 10px;
  border-top: 1px solid #e9eef1;
}
</style>