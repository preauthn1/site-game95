<template>
  <el-dialog :visible.sync="isShow"  :destroy-on-close="true" custom-class="el-dialog-center2" :close-on-click-modal="false"
    :modal-append-to-body="false">
      <div class="f-box">
        <img :src="require('@/assets/images/five-top.png')" class="five-title">
        <div class="content">
          <div class="canvas-wapper">
            <div class="canvas">
              <img src="@/assets/images/wufushangceng.png" alt="">
              <div class="canvas-tip">{{ $t("新的呱呱卡请查收") }}</div>
            </div>
          </div>
          <div class="tips">{{ $t("你的好友赠送给你1张新的刮刮卡") }}</div>
          <el-button class="button_fullwidth five-button" @click="$router.push('/five-bessings')">{{$t("细节")}}</el-button>
          <div class="close-icon" @click="isShow = false">
            <img :src="require('@/assets/images/close-icon.png')" alt="">
          </div>
        </div>
      </div>
  </el-dialog>
</template>

<script>
import canvasBox from './canvasBox.vue'
export default {
  data(){
    return {
      isShow:false
    }
  },
  components:{canvasBox},
  methods:{
   show(){
    this.isShow = true
   }
  },
  watch:{
    "$route.path":function(v){
      if(v!="/"){
        this.isShow = false
      }
    }
  },
}
</script>

<style scoped lang="less">
::v-deep .el-dialog {
  background-color: transparent;
  box-shadow: none;
  overflow: visible;
  width: fit-content;    
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body{
    padding: 0;
    width: fit-content;
    color: #FFF;
  }
}
.f-box{
  color: #89B6E1;
  user-select: none;
  max-width: 100vw;
  margin: 0 auto;
  width: 388px;
  transform: translateX(-3%);
  @media (max-width:540px) {
    width: 321px;
    max-width: calc(100% - 60px);
  }
}
.five-title{
  width: 100%;
  position: relative;
  z-index: 4;
}
.canvas-wapper{
  height: 153px;
  width: 100%;
  margin-top: -8%;
  position: relative;
  background-image: url(~@/assets/images/five-pop-bg2.png);
  background-size: 100% 100%;
  @media (max-width:540px) {
   height: 110px;
  }
  .canvas{
    position: absolute;
    width: 90%;
    height: 70%;
    left: 50%;
    top: 56%;
    transform: translate(-50%,-50%);
    background-image: url(~@/assets/images/wufudiceng.png);
    background-size: 100% 100%;
    img{
      position: absolute;
      width: 96%;
      height: 89%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
.canvas-tip{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-shadow: 0 6px 10px #000;
  font-weight: bold;
  color: #FFF;
  padding: 0 8px;
  @media (max-width:540px) {
   font-size: 12px;
  }
}
.content{
  width: 94%;
  margin-left: 6%;
}
.tips{
  margin: 13px 0;
  font-weight: 500;
  @media (max-width:540px) {
    font-size: 12px;
  }
}
.close-icon{
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin: 15px auto 0;
  @media (max-width:540px) {
    width: 27px;
    height: 27px;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.five-button{
  @media (max-width:540px) {
    height: 33px;
    display: flex;
    align-items: center;
    font-size: 13px;
    border-radius: 7px;
  }
}
</style>