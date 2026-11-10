<template>
  <el-dialog :visible.sync="isShow"  :destroy-on-close="true" custom-class="custom-dialog" :close-on-click-modal="true"
    :modal-append-to-body="false">
      <div class="content-box">
        <div class="title">{{$t(title)}}</div>
        <slot>
          <img :src="icon" class="cover">
        </slot>
        <div class="tips">{{ $t(msg) }}</div>
        <slot name="button">
          <el-button class="button_fullwidth five-button" size="mini" @click="submit" :loading="btnLoading">{{$t(bthText)}}</el-button>
        </slot>
      </div>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
      msg:"",
      callBack:null,
      bthText:"",
      title:"",
      btnLoading:false,
      icon:""
    }
  },
  methods:{
    show({msg,callBack,bthText,icon,title}){
      this.msg = msg
      this.icon = icon
      this.title = title
      this.callBack = callBack
      this.bthText = bthText
      this.isShow = true
    },
    async submit(){
      this.btnLoading = true
      this.callBack && await this.callBack()
      this.btnLoading = false
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="less">
::v-deep .el-dialog {
  box-shadow: none;
  max-width: calc(100vw - 40px);
  min-width: 300px;
  width: 350px;
  .el-dialog__body{
    padding: 0;
    color: #FFF;
  }
}
.content-box{
  padding: 0 26px 26px 26px;
}
.title{
  text-align: center;
  width: 100%;
  font-size: 18px;
}

.tips{
  text-align: center;
  font-size: 12px;
}
.five-button{
  padding: 10px 15px;
  margin-top: 30px;
}
</style>