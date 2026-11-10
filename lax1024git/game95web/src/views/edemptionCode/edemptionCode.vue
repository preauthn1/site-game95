<template>
  <div>
    <div class="e-header">
      <div class="e-h-content">
        <div class="h-title">
          <span class="h-title-txt">{{ $t("这里有你所有的奖励") }}</span>
        </div>
        <div class="h-input-wapper">
          <input class="input" v-model="code" type="text" :placeholder="$t('请输入神秘代码')">
          <el-button class="input-btn" @click="submit" :loading="loading">{{ $t('兑换') }}</el-button>
        </div>
      </div>
    </div>
    <div class="sub-title">
      <img src="@/assets/images/title-icon2.png">
      <span>{{ $t("可领取奖金") }}</span>
    </div>
    <div class="row">
      <div class="bonus-item" v-for="item,index in 4" :key="index">
          <div class="bonus-item-content">
            <img src="@/assets/images/lock-icon.png" class="lock-icon">
            <span>{{ $t("敬请期待") }}</span>
          </div>
        </div>
    </div>
    <div class="sub-title">
      <img src="@/assets/images/title-icon1.png">
      <span>{{ $t("VIP福利") }}</span>
    </div>
    <div class="vip-item">
      <img src="@/assets/images/lock-icon.png" class="lock-icon2">
      <span>{{ $t("敬请期待") }}</span>
    </div>
    <div class="vip-item vip-item2">
      <img src="@/assets/images/lock-icon.png" class="lock-icon2">
      <span>{{ $t("敬请期待") }}</span>
    </div>

    <edemptionCodePop ref="edemptionCodePop"></edemptionCodePop>
    <edemptionCodeSuccess ref="edemptionCodeSuccess"></edemptionCodeSuccess>
  </div>
</template>

<script>
import {code_receive} from '@/api/code'
import edemptionCodePop from './edemptionCodePop.vue'
import edemptionCodeSuccess from './edemptionCodeSuccess.vue'
export default {
  components:{edemptionCodePop,edemptionCodeSuccess},
  data(){
    return {
      code:'',
      loading:false,
    }
  },
  methods:{
    showPop(){
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        return;
      }
      this.$refs.edemptionCodePop.show(this.code)
    },
    async submit(){
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        return;
      }
      if(!this.code){
        this.$message.error(this.$t("请输入神秘代码"));
        return
      }
      this.loading = true
      const {data} = await code_receive({code:this.code})
      this.loading = false
      if(data.code==1){
        this.$refs.edemptionCodeSuccess.show(data.data.amount)
        this.code=''
      }else{
        this.$message.error(data.msg);
      }
    }
  }
}
</script>

<style scoped lang="less">
.e-header{
  background-image: url(~@/assets/images/e-header-bg.png);
  padding-bottom: 35.8%;
  background-size: cover;
  position: relative;
  margin-bottom: 30px;
  background-position: center center;
  @media (max-width:768px) {
    margin-bottom: 20px;
  }
  @media (max-width:540px) {
    padding-bottom: 39%;
    border-radius: 16px;
  }
}
.e-h-content{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5%;
}
.h-title{
  background: linear-gradient(88deg, #F0E9D5 0%, #FFD091 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 34px;
  font-weight: bold;
  position: relative;
  display: flex;
  align-items: center;
  max-width: 80%;
  padding: 0 10px;
  text-align: center;
  @media (max-width:768px) {
    font-size: 16px;
  }
}
.h-title::after,.h-title::before{
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  background: radial-gradient(circle, #E7B880, #FFCE8F, #D4906D, #F8A881);
  transform: rotate(45deg);
  margin: 0 26px;
  flex-shrink: 0;
  @media (max-width:768px) {
    width: 7px;
    height: 7px;
    margin: 0 10px;
  }
}
.h-title-txt{
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}
.input{
  color: #95917E;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 24px;
  padding: 0 20px;
  font-weight: bold;
  @media (max-width:768px) {
    font-size: 14px;
    padding: 0 10px;
  }
}
.h-input-wapper{
  width: 500px;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #FFFAE3;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 50px;
  @media (max-width:768px) {
    height: 36px;
    margin-top: 30px;
    width: 80%;
    border-radius: 6px;
  }
  @media (max-width:540px) {
    margin-top: 16px;
  }
}
.input-btn{
  background: linear-gradient(75deg, #E7CAAF 0%, #AB8167 100%);
  white-space: nowrap;
  color: #402929;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding:  0 30px;
  font-size: 26px;
  user-select: none;
  cursor: pointer;
  min-width: 174px;
  font-weight: bold;
  border-radius: 0;
  @media (max-width:768px) {
    font-size: 14px;
    padding:  0 16px;
    min-width: 0;
  }
}

.sub-title{
  color: #AF866C;
  font-size: 22px;
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 26px;
  @media (max-width:768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
}
.sub-title img{
  width: 1.3em;
  margin-right: 12px;
}
.bonus-item{
  padding-bottom: 100%;
  position: relative;
  background-image: url(~@/assets/images/b-icon1.png);
  background-size: 100% 100%;
}
.bonus-item:nth-child(2){
  background-image: url(~@/assets/images/b-icon2.png);
}
.bonus-item:nth-child(3){
  background-image: url(~@/assets/images/b-icon3.png);
}
.bonus-item:nth-child(4){
  background-image: url(~@/assets/images/b-icon4.png);
}
.bonus-item-content{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  font-size: 20px;
  color: #FFDAC3;
  @media (max-width:768px) {
    font-size: 16px;
  }
  @media (max-width:540px) {
    font-size: 14px;
  }
}
.row{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-gap: 39px;
  margin-bottom: 30px;
  @media (max-width:768px) {
    grid-template-columns: repeat(3,1fr);
    grid-gap: 25px;
    margin-bottom: 20px;
  }
  @media (max-width:540px) {
    grid-template-columns: repeat(2,1fr);
    grid-gap: 15px;
  }
}
.lock-icon{
  margin-bottom: 40px;
  width: 34px;
  @media (max-width:768px) {
    width: 26px;
    margin-bottom: 20px;
  }
}
.lock-icon2{
  width: 34px;
  margin-right: 20px;
  @media (max-width:768px) {
    width: 26px;
  }
}
.vip-item{
  height: 128px;
  background-image: url(~@/assets/images/b-icon6.png);
  background-size: cover;
  background-position: right center;
  padding: 0 45px;
  font-size: 20px;
  color: #FFDAC3;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  @media (max-width:768px) {
    font-size: 16px;
    height: 100px;
    margin-bottom: 10px;
  }
  @media (max-width:540px) {
    font-size: 14px;
  }
}
.vip-item2{
  background-image: url(~@/assets/images/b-icon5.png);
}
</style>