import Vue from 'vue'
export default new Vue({
    methods:{
        userEdit(data){
            this.$emit('sendUser', data)
          
        },
        userEditDone(data){
            this.$on('sendUser', data)
           
        }
    }
})

