export default {
  namespaced: true,
  state:{
    system:null,
    systemNew:null
  },
  mutations:{
    updateSystem(state,{system,systemNew}){
      state.system = system
      state.systemNew = systemNew
    }
  },
}