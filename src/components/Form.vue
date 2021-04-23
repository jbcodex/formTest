<template>
     
        <v-form class="panel" v-model="valid" lazy-validation ref="form">
        <h2>Cadastre-se para acessar</h2>
        <v-text-field
          v-model="newContact.name"
          placeholder="No mínimo 5 caracteres"
          append-icon="mdi-account-circle-outline"
          label="Nome" 
          :rules="nameRules"
          @keyup="allow"
          @keydown="mapChar"
        ></v-text-field>

        <v-text-field
          v-model="newContact.email"
          placeholder="Insira um e-mail válido"
          append-icon="mdi-email-outline"
          label="E-mail"
          :rules="emailRules"
          @keyup="allow"
        ></v-text-field>

        <v-text-field
          v-model.number="newContact.age"
          placeholder="1 / 99 - Somente números"
          append-icon="mdi-emoticon-outline"
          label="Idade"
          maxlength="2"
          :rules="ageRules"
          @keyup="allow"
        ></v-text-field>

        <v-btn @click="saveContact"  x-large class="mt-1" :class="allowButton ? 'blue white--text':'disable-events grey--text'">
          <v-icon left> mdi-check-circle</v-icon>
          Salvar contato</v-btn
        >
    </v-form>
 
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  filter:{
    charMask (mapChar){
        mapChar = mapChar.replace('/[áàãâä]/ui', 'a');
        mapChar = mapChar.replace('/[éèêë]/ui', 'e');
        mapChar = mapChar.replace('/[íìîï]/ui', 'i');
        mapChar = mapChar.replace('/[óòõôö]/ui', 'o');
        mapChar = mapChar.replace('/[úùûü]/ui', 'u');
        mapChar = mapChar.replace('/[ç]/ui', 'c');
        mapChar = mapChar.replace('/[^a-z0-9]/i', '_');
        mapChar = mapChar.replace('/_+/', '_'); //
        return mapChar;
}
  },
  props:{
    newContact:{
      type:Object
    }
  },
    data() {
        return {
            allowButton: false,
            valid: false,
            nameRules: [
                v => (!!v && v.length > 4) || "Obrigatório mínimo 5 caracteres",
                v => (!!v) || 'Nome é obrigatório',
                
            ],
            emailRules: [
                v => (!!v) || "Email obrigatório",
                v =>
                /^(([^<=>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    v
                ) || "E-mail inválido!",
            ],
            ageRules: [v => (!!v) || "Idade obrigatória!"],
        }
    },

    methods:{
      ...mapMutations(['addContact']),
      allow() {
          if (
            this.newContact.name.length >= 5 && 
            this.validEmail(this.newContact.email) && 
            this.newContact.age >= 1)
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
      async saveContact(){
        if(this.$refs.form.validate()){
          const contact = this.newContact
          await this.$emit('setData', contact)    
             this.allowButton = false
             this.$refs.form.resetValidation()
        }
       
      },

    
      
    }
}
</script>

<style>
.disable-events {
  pointer-events: none;
 
}
.swal-title {
  font-family: "Lato", sans-serif;
  font-size: 1.4rem;
}

.swal-button {
  font-family: "Lato", sans-serif;

}

.swal-text {
  font-family: "Lato", sans-serif;
  color: #61534e;
}
.swal-modal {
  width: 350px;
  height: 300px;
}
.swal-footer {
  background-color: rgb(245, 248, 250);
  margin-top: 10px;
  border-top: 1px solid #e9eef1;
}
</style>