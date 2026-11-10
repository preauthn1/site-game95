import { wufu_getData_api } from "@/api/wufu"

export default {
  namespaced: true,
  state:{
    fiveBessData:{}
  },
  mutations:{
    updateFiveBessData(state,data){
      state.fiveBessData = data
    }
  },
  actions:{
    async updateFiveBessData({commit}){
      const { data:res } = await wufu_getData_api()
      if(res.code==1){
        commit("updateFiveBessData",res.data)
      }
    }
  }
}