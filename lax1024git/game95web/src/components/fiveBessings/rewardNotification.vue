<template>
  <el-dialog :visible.sync="isShow"  :destroy-on-close="true" custom-class="custom-dialog" :close-on-click-modal="true"
    :modal-append-to-body="false">
      <div class="content-box">
        <div class="title">{{$t(title)}}</div>
        <div class="content">
          <img src="@/assets/images/wufutishibeijing.png" class="bg-img">
          <img :src="icon" class="cover">
        </div>
        <slot name="button">
          <el-button class="button_fullwidth five-button" size="mini" @click="submit">{{$t(bthText)}}</el-button>
        </slot>
      </div>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
      bthText:"",
      title:"",
      icon:"",
      callBack:null,
    }
  },
  methods:{
    show({callBack,bthText,icon,title}){
      this.icon = icon
      this.title = title
      this.bthText = bthText
      this.isShow = true
      this.callBack = callBack
    },
    async submit(){
      this.callBack && await this.callBack()
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
.five-button{
  padding: 10px 15px;
  margin-top: 30px;
}
.content{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  position: relative;
}
.bg-img{
  position: absolute;
  width: 100%;
}
.cover{
  width: 69px;
  position: relative;
  z-index: 2;
}
</style>