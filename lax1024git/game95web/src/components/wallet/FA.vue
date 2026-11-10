<template>
  <div class="fa-wapper" >
    <!-- <div class="fa-btn" @click="tab">
      <span v-if="!$store.state.userInfo.goodsle_bind">{{ $t("为保护您的资产，请开启") }}</span>
      <span v-else>{{ $t("已启用") }}</span>
      <span class="fa-txt">2FA</span>
  </div> -->
    <div @click="GrandchildEvt($t('edu_show_link'))" v-if="this.$t('edu_show_link') != 'edu_show_link'" class="fa-btn">
      <img src="@/assets/images/question.png" class="qsicon" >
      <span>{{ $t("新手教学") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    tab(){
      if(!this.$store.state.userInfo.goodsle_bind){
        this.goUrl('/account?modal=enabled2fa')
      }
    },
    GrandchildEvt(val){
      this.$emit('grandchild-event', val);
    }
  }
}
</script>

<style scoped>
.fa-wapper{
  display: flex;
  align-items: center;
  justify-content: center;
}
.fa-btn{
  height: 39px;
  padding: 0 23px;
  border: 2px solid #1C2532;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #738DB6;
  cursor: pointer;
  text-decoration: none;
}
.fa-txt{
  color: #1BB83D;
}
.fa-btn img{
  width: 15px;
  height: 15px;
  margin-right: 5px;
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}


</style>