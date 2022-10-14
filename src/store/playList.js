export default {
    state:{
        listData:[]
    },
    mutations:{
        addToList(state,data){
            state.listData = [...state.listData,...[data]]
        }
    }
}