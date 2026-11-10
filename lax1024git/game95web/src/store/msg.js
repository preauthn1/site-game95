export default {
  namespaced: true,
  state:{
    taskNoMsg:parseInt(localStorage.getItem("taskNoMsg")) || 0,
  },
  mutations:{
    updateNoMsgTask(state,taskNoMsg){
      state.taskNoMsg = taskNoMsg
      localStorage.setItem("taskNoMsg",taskNoMsg)
    }
  },
}