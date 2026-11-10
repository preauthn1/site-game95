<template>
    <div v-if="showPopup" class="reward-popup" @click.self="closePopup">
      <div class="popup-content">
        <img class="img-species" src="../../assets/images/active/login.png" alt="">
        <div>
            <span class="prompt">{{ $t('提示') }}</span> 
            <span class="content">{{ $t('当前未登录请登录以后再参加活动') }}</span>
        </div>
        <!-- @click="closePopup" -->
        <button class="btn_login" @click="closePopup" >{{$t("点击登录")}}</button>
      </div>
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        showPopup: true
      };
    },
    methods: {
      closePopup() {
        this.showLoginReg(0);
        this.showPopup = false;
        this.$emit('close');
      }
    }
  };
  </script>
    
  <style lang="less" scoped>
  .reward-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    padding: 0 30px;
    
  }
  
  .popup-content {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 275px;
    background: #191A1E;
    padding: 20px;
    padding-top: 100px;
    border-radius: 41px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    @media(max-width:780px){
        height: 280px;
    }
  }
  
  .img-species {
    position: absolute;
    width: 100px;
    height: auto;
    top: -12%;
    left: 50%;
    transform: translateX(-50%);
  }
  .prompt{
    font-weight: 500;
    font-size: 20px;
    display: block;
    color: #FFFFFF;
  }
  .content{
    color: #A4A4A4;
  }
  .btn_login{
    width: 60%; 
    background: #FF7D1E; 
    margin: 10px; 
    padding: 15px; 
    border-radius: 8px; 
    font-size: 18px;
  }
  .reward-info {
    text-align: center;
  }
  
  .reward-info>p {
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: 500;
    margin-bottom: 6px;
  }
  
  .reward-info>span {
    font-size: 36px;
    font-weight: bold;
    color: #FFAB3F;
  }
  
  .close-btn {
    width: 160px;
    padding: 8px 16px;
    background: linear-gradient(-6deg, #0B3879, #14838D);
    border: 2px solid #1454AF;
    border-radius: 11px;
    margin: 20px auto 0;
  }
  </style>