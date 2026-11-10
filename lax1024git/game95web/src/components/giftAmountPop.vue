<template>
  <el-dialog
      :modal-append-to-body="false"
      :visible.sync="isShow"
      custom-class="el-dialog-transparent2 el-dialog-center2"
      @close="hide"
      width="auto"
      z-index="3000"
    >
      <div class="wapper">
        <div class="title">{{ $t("欢迎回来") }}</div>
        <img :src="require('@/assets/images/giftAmountB.png')" class="bi-icon">
        <div class="price-wapper">
          <div class="price-content">
            <img :src="require('@/assets/images/'+$store.state.currencyIcon)" style="width: 1em; height: 1em;margin-right: 10px;"/>
            <span class="price" :data-text="price">{{ price }}</span>
          </div>
        </div>
        <div class="desc" :data-text="$t('给你一份回归礼物')">{{ $t("给你一份回归礼物") }}</div>
        <el-button class="btn" @click="give" :loading="btnLoading">
          <span class="btn-content">{{ $t("立即领取") }}</span>
        </el-button>
        <div class="close">
          <span @click="hide">{{ $t("拒绝领取") }}</span>
        </div>
      </div>
    </el-dialog>
</template>

<script>
import {give_api} from '@/api/user.js'
export default {
  data(){
    return {
      isShow:false,
      price:0,
      btnLoading:false
    }
  },
  watch:{
    "$store.state.userInfo":{
      handler(v){
        if(v?.give_price){
          this.price = v.give_price
          this.show()
        }
      },
      immediate:true
    }
  },
  methods:{
    hide(){
      this.isShow = false
    },
    show(){
      this.isShow = true
    },
    async give(){
      this.btnLoading = true
      const {data} = await give_api()
      this.btnLoading = false
      if(data.code==1){
			  this.successTips(this.$t("领取成功"));
        this.hide()
      }else{
			  this.errorTips(data.msg);
      }
    }
  }
}
</script>

<style scoped lang="less">
.wapper{
  background-image: url(~@/assets/images/giftAmountBg.png);
  width: 484px;
  color: #FFF;
  background-size: 100% 100%;
  max-width: calc(100vw - 30px);
  @media (max-width:768px){
    width: 343px;
  }
}
.title{
  width: 58%;
  margin: auto;
  text-align: center;
  padding: 16px 0;
  line-height: 16px;
  font-size: 30px;
  text-shadow: 0px 5px 0px rgba(11,17,48,0.38);
  @media (max-width:768px) {
    font-size: 20px;
    padding: 14px 0;
  }
}
:deep(.el-dialog__header){
  display: none;
}
:deep(.el-dialog__body){
  padding: 0;
}
:deep(.el-dialog) {
  box-shadow: none ;
}
.bi-icon{
  width: 406px;
  display: block;
  margin: 0 auto;
  margin-top: 40px;
  transform: translateX(3%);
  @media (max-width:768px) {
    margin-top: 16px;
  }
}
.price-wapper{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -60px;
  position: relative;
  z-index: 2;
  @media (max-width:768px) {
  margin-top: -46px;
  }
}
.price-content{
  background: linear-gradient(0deg, #295299, #254988, #183D8A);
  border-radius: 100vh;
  height: 76px;
  min-width: 278px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: 45px;
  @media (max-width:768px) {
    font-size: 26px;
    height: 45px;
    min-width: 160px;
  }
}
.price{
  font-weight: bold;
  display: flex;
  position: relative;
  text-shadow: 0px 5px 2px rgba(11,17,48,0.6);
  &::before{
    content: attr(data-text);
    background: linear-gradient(0deg, #F69B51 0%, #FEFFC8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow:none;
    position: absolute;
  }
}
.desc{
  padding: 0 30px;
  text-align: center;
  position: relative;
  text-shadow: 0px 5px 0px rgba(11,17,48,0.38);
  text-align: center;
  font-size: 28px;
  margin: 26px 0;
  @media (max-width:768px) {
    font-size: 20px;
    margin: 16px 0;
  }
  &::before{
    content: attr(data-text);
    background:  linear-gradient(0deg, #FFFEFF 0%, #D7FFFE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow:none;
    position: absolute;
  }
}
.btn{
  background-color: #3493F0;
  border-radius: 100vh;
  margin: 0 30px;
  width: calc(100% - 60px);
  box-sizing: border-box;
  font-size: 20px;
  position: relative;
  @media (max-width:768px) {
    font-size: 16px;
  }
  &:hover,&:active,&:focus{
    background-color: #3493F0;
    color: #FFF;
  }
  &:hover{
    opacity: .8;
  }
  &::before{
    content:"";
    position: absolute;
    background-image: linear-gradient(to bottom,rgba(255,255,255,.4),rgba(255,255,255,0) 50%);
    inset: 12% 2%;
    border-radius: 100vh;
    z-index: 1;
  }
}
.btn-content{
  position: relative;
  z-index: 2;
}
.close{
  margin: 0 30px;
  font-size: 18px;
  padding: 16px 0;
  text-align: center;
  color: #526B99;
  @media (max-width:768px) {
    font-size: 14px;
    padding: 10px 0;
  }
  span{
    cursor: pointer;
  }
}
</style>