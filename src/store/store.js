import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        dataArray:[],
        dataEdit:{},
        edditingUserIndex:null
    },
    getters:{
        validEmail(state) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(state);
          }
    },
    mutations:{
        addContact(state, payload){
            state.dataArray.push(payload)
        },
        addEditContact(state, payload){
            state.dataEdit = payload.data
            state.edditingUserIndex = payload.index
        },

        saveEditingContact(state, payload){
           state.dataArray[state.edditingUserIndex] = payload
        },
       
       
    }
})