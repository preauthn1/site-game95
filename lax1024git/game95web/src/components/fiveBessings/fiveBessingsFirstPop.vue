<template>
  <div>
    <el-dialog class="dialog-content" :visible.sync="isShow"  :destroy-on-close="true" custom-class="el-dialog-center2" :close-on-click-modal="false"
      :modal-append-to-body="false">
        <div class="f-box" @click="toReg">
          <div class="f-content">
            <div class="canvas-box">
              <canvasBox @open="open" class="canvas" :disabled="disabled" :isGray="false" :imgSrc="require('@/assets/images/wufushangceng.png')">
                <img v-if="cardData.card_detail && cardData.card_detail.image" :src="cardData.card_detail && cardData.card_detail.image" class="b-icon">
                <img v-else :src="data.losing_lottery_img" class="b-icon">
              </canvasBox>
            </div>
          </div>
        </div>
        
        <div class="close-icon" @click="isShow = false">
          <img :src="require('@/assets/images/close-icon.png')" alt="">
        </div>
    </el-dialog>

    <!-- 结果通知 -->
    <rewardNotification ref="rewardNotification"/>
  </div>
</template>

<script>
import canvasBox from './canvasBox.vue'
import rewardNotification from './rewardNotification.vue'
import {wufu_open_api,wufu_handleOpen_api } from "@/api/wufu"

export default {
  data(){
    return {
      isShow:false,
      disabled:true,
      data:{},
      cardData:{}
    }
  },
  components:{canvasBox,rewardNotification},
  watch:{
    isShow(v){
      if(!v){
        localStorage.setItem("fiveBessingsFirstPop",1)
      }
    },
    "$store.state.isLoginStatu":function(v){
      if(v){
        this.isShow = false
      }
    }
  },
  methods:{
    notLoginShow(){
      if(!this.$store.state.isLoginStatu && this.$route.query.modal!="LoginRegistration"){
        const fiveBessingsFirstPop = localStorage.getItem("fiveBessingsFirstPop")
        if(!fiveBessingsFirstPop) this.isShow = true
      }else{
        localStorage.setItem("fiveBessingsFirstPop",1)
      }
    },
    async show(data){
      this.data = data
      await this.wufu_open()
      this.isShow = true
      this.disabled = false
    },
    // 获取刮奖的卡片
    async wufu_open(){
      const {data} = await wufu_open_api({
        w_id:this.data.id
      })
      if(data.code==1){
        this.cardData = data.data
      }
    },
    // 提交刮奖
    async open(){
      const {data} = await wufu_handleOpen_api({w_id:this.data.id,card_id:this.cardData.card_id})
      if(data.code==1){
        this.isShow = false
        this.$refs.rewardNotification.show({
          bthText:"查看细节",
          icon:this.cardData.card_detail.image,
          title:"奖励通知",
          callBack:()=>{
            this.$router.push("/five-bessings")
          }
        })
      }
    },
    toReg(){
      if(this.disabled){
        this.$router.push("?modal=LoginRegistration&data=tab-1&register_type=0")
      }
    }
  },
}
</script>

<style scoped lang="less">
.dialog-content{
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
::v-deep .__canvas-box{
  background-image: none;
  background-color: transparent;
  border-radius: 0;
}
}

.f-box{
  width: 448px;
  height: 0;
  padding-bottom: 103%;
  user-select: none;
  background-image: url(~@/assets/images/five-pop-bg.png);
  background-size: 100% 100%;
  position: relative;
  max-width: calc(100vw - 40px);
  @media (max-width:768px) {
    width: 331px;
  }
  .f-content{
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
.canvas-box{
  position: absolute;
  padding-bottom: 28%;
  left: 50%;
  bottom: 8%;
  transform: translateX(-50%);
  width: 90%;
  background-image: url(~@/assets/images/wufudiceng.png);
  background-size: 100% 100%;
  .canvas{
    top: 6%;
    left: 2%;
    bottom: 6%;
    right: 2%;
    position: absolute;
  }
}
.b-icon{
  width: 15%;
  filter: drop-shadow(0 0 2px #000);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
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
</style>