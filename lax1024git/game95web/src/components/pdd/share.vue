<template>
  <el-drawer
    :visible.sync="isShow"
    direction="btt"
    :with-header="false"
    :wrapperClosable="true"
  >
  <div class="wapper">
    <div class="title">{{ $t("1.邀请朋友前来帮忙") }}</div>
    <div class="icon-wapper">
      <div class="icon-item" @click="share('facebook')">
        <img src="@/assets/images/pdd/facebook.png" class="icon-item-icon">
        <span class="icon-name">Facebook</span>
      </div>
      <div class="icon-item" @click="share('whatsApp')">
        <img src="@/assets/images/pdd/whatsapp.png" class="icon-item-icon">
        <span class="icon-name">WhatsApp</span>
      </div>
      <div class="icon-item" @click="share('telegram')">
        <img src="@/assets/images/pdd/telegram.png" class="icon-item-icon">
        <span class="icon-name">Telegram</span>
      </div>
      <div class="icon-item" @click="share('twitter')">
        <img src="@/assets/images/pdd/twitter.png" class="icon-item-icon">
        <span class="icon-name">Twitter</span>
      </div>
      <div class="icon-item" @click="share('email')">
        <img src="@/assets/images/pdd/email.png" class="icon-item-icon">
        <span class="icon-name">Email</span>
      </div>
    </div>
    <div class="link-wapper">
      <span class="link-txt">{{ data.invite_url }}</span>
      <div v-clipboard:copy="data.invite_url" v-clipboard:success="onCopy" style="flex-shrink: 0;">
        <img src="@/assets/images/pdd/pdd-copy.png" class="pdd-copy">
      </div>
    </div>
    <div class="title" v-if="data.phone_list && data.phone_list.length">{{ $t("2.向随机玩家发送帮助邀请") }}</div>
    <div class="num-wapper" v-if="data.phone_list && data.phone_list.length">
      <div class="number-list">
        <span v-for="item,i in data.phone_list" :key="item" :class="curNum>=i?'acNum':''">{{ item }}</span>
      </div>
    </div>
   
    <div class="bottom-btn-wapper" v-if="data.phone_list && data.phone_list.length">
      <div class="bottom-btn-item">
        <div class="bottom-btn-content" @click="whatsAppSend">
          <span>{{ $t("发送消息") }}</span>
          <span>no WhatsAPP</span>
        </div>
        <img src="@/assets/images/pdd/whatsapp2.png" alt="">
      </div>
      <div class="bottom-btn-item" @click="groupMsgSend">
        <div class="bottom-btn-content">
          <span>{{ $t("发送消息") }}</span>
          <span>SMS</span>
        </div>
        <img src="@/assets/images/pdd/SMS.png" alt="">
      </div>
    </div>
  </div>
  </el-drawer>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
      curNum:-1,
      shareText:this.$t("加入我们,免费获得100BRL,无条件即可PIX提款")
    }
  },
  props:{
    data:{
      default:()=>({})
    }
  },
  methods:{
    show(){
      this.isShow = true
    },
    onCopy(){
      this.successTips('复制成功');
    },
    whatsAppSend(){
      this.curNum ++
      if(this.curNum>=this.data.phone_list.length){
        this.curNum = 0
      }
      location.href = `whatsapp://send?phone=${this.data.phone_list[this.curNum]}&text=${encodeURIComponent(this.shareText+this.data.invite_url)}&via=lopscoop`
    },
    groupMsgSend(){
      location.href = `sms:/open?addresses=${this.data.phone_list.join(",")}&body=${encodeURIComponent(this.shareText+this.data.invite_url)}`
    },
    share(type){
      const shareLinkData = {
        facebook:`https://m.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.data.invite_url)}&t=${encodeURIComponent(this.shareText)}`,
        whatsApp:`whatsapp://send?text=${encodeURIComponent(this.shareText+this.data.invite_url)}&via=lopscoop`,
        telegram:`https://t.me/share/url?url=${encodeURIComponent(this.data.invite_url)}&text=${encodeURIComponent(this.shareText)}`,
        twitter:`https://twitter.com/intent/tweet?text${encodeURIComponent(this.shareText)}&url=${this.data.invite_url}`,
        email:`mailto:?body=${encodeURIComponent(this.shareText+this.data.invite_url)}`
      }
      location.href = shareLinkData[type]
    }
  }
}
</script>

<style scoped lang="less">
::v-deep .el-drawer {
  background-color: #0D131C !important;
  margin: 13px !important;
  width: calc(100vw - 26px) !important;
  backdrop-filter: blur(20px);
  border-radius: 14px;
  height: auto !important;
}
.wapper{
  color: #F3F3F3;
  padding: 30px 13px;
}
.title{
  color: #FFF;
}
.icon-item-icon{
  width: 37px;
  margin-bottom: 6px;
}
.icon-item{
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  font-size: 12px;
  color: #FFF;
}
.icon-wapper{
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.pdd-copy{
  width: 15px;
}
.link-wapper{
  background-color: #161F2C;
  border-radius: 6px;
  font-size: 12px;
  padding: 7px 26px 7px 9px;
  display: flex;
  color: #C2C2C2;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.number-list{
  color: #23A8E8;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  padding: 6px 10px;
  width: calc(100% + 10px) ;
  span {
    margin-right: 10px;
  }
}
.num-wapper{
  background-color: #161F2C;
  border-radius: 10px;
  padding: 4px 0;
}
.bottom-btn-wapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 11px;
}
.bottom-btn-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2C3749;
  margin-right: 17px;
  border-radius: 11px;
  padding: 4px 7px;
  font-size: 14px;
  flex: 1;
  &:last-child{
    margin-right: 0;
  }
}
.bottom-btn-content{
  >span:first-child{
    display: block;
    color: #F3F3F3;
  }
}
.bottom-btn-item img{
  width: 29px;
  height: 29px;
  flex-shrink: 0;
}
.link-txt{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.acNum{
  opacity: .6;
}
</style>