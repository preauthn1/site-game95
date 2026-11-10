<template>
  <div :class="isGuide?'guide-page':''">
    <div class="guide-tip" v-if="isGuide">{{ $t("点击可关闭引导") }}</div>
    <el-button class="back-button" @click="$router.back()">
      <i class="el-icon-arrow-left el-icon"></i>
      {{ $t("返回") }}
    </el-button>
    <div class="content-box">
      <div class="canvas-wapper">
        <div class="f-box">
          <!-- <img :src="require('@/assets/images/five-top.png')" class="five-title"> -->
          <div class="content">
            <div class="canvas-img-box">
              <div class="canvas-box">
                <canvasBoxVue class="canvas" :disabled="!(data.num>0)" :isGray="false" :imgSrc="require('@/assets/images/wufushangceng.png')" @open="open" ref="canvasBoxVue">
                  <div class="canvas-img-wapper">
                    <img v-if="cardData.card_detail && cardData.card_detail.image" :src="cardData.card_detail && cardData.card_detail.image" class="canvas-icon">
                    <img v-else :src="data.losing_lottery_img" class="canvas-icon">
                  </div>
                </canvasBoxVue>
              </div>
              <i :class="['el-icon el-icon-refresh',isAnimate?'refresh-icon-animate':'']" v-if="isOpen" @click="isAnimate = true" @animationend="refresh"></i>
            </div>
           
            
            
            <div class="btn-wapper">
              <div class="guide-box1" v-if="isGuide">
                <span class="guide-tip1">{{ $t("点击查看获得次数任务细节") }}</span>
                <img src="@/assets/images/xiantiao1.png" class="line">
              </div>
              <el-button class="button_fullwidth five-button show-guide" v-if="data.num>0 && !isOpen">{{$langKey($t("剩余{num}次可用"),{num:data.num})}}</el-button>
              <el-button class="button_fullwidth five-button show-guide" v-else @click="toLink">{{$t(data.step_name || "完成任务赠送")}}</el-button>
            </div>
            
          </div>
        </div>
      </div>
      <div class="content-wapper">
        <div class="content-title-box">
          <div class="content-title">
            <img :src="require('@/assets/images/five-title-icon.png')" class="title-icon">
            <span>{{ $t("我的卡片") }}</span>
          </div>
          <div class="content-question" @click="fiveBessingsDetailShow">
            <span>{{ $t("细节") }}</span>
            <img :src="require('@/assets/images/five-question.png')" alt="">
          </div>
        </div>
        <div class="content-swiper">
          <div class="guide-box2" v-if="isGuide">
            <img src="@/assets/images/xiantiao2.png" class="line">
            <span class="guide-tip2">{{ $t("有两张以上卡时,可兑换彩金") }}</span>
          </div>
          <swiper :options="swiperOpt" class="swiper">
            <swiper-slide v-for="(item, index) in data.card_list" :key="index" :class="['slide',index==0?'show-guide':'']">
              <img :src="item.image" class="slide-icon">
              <span>({{ item.num }})</span>
              <el-button class="button_fullwidth five-button slide-btn" size="mini" @click="showConfirm(item.id,item)" round>{{ $t("兑换") }}</el-button>
            </swiper-slide>
          </swiper>
        </div>
        <div class="share-buttons">
          <el-button class="five-button show-guide" @click="showConfirm(0)">{{ $t("提现到PIX") }}</el-button>
          <div class="guide-box3" v-if="isGuide">
            <img src="@/assets/images/xiantiao3.png" class="line">
            <div class="guide-box3-content">
              <img src="@/assets/images/bonus.png" class="bonus">
              <span class="guide-tip3">{{ $t("集齐卡片即可领取大奖") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="order-wapper">
      <div class="rule-title">
        <img src="@/assets/images/rule-icon.png">
        <span>{{ $t("规则") }}</span>
      </div>
      <div class="rule html" v-html="data.introduce"></div>
    </div>

    <fiveTipPop ref="guagualeConfirm">
      <img :src="popData.img" :class="popData.className">
    </fiveTipPop>

    <fiveTipPop ref="receiveSuccess">
      <img :src="require('@/assets/images/five-cover.png')" class="cover">
    </fiveTipPop>

    <fiveBessingsDetail :data="data" ref="fiveBessingsDetail"/>
    <!-- 结果通知 -->
    <rewardNotification ref="rewardNotification"/>

    <div class="mask" v-if="isGuide" @click="hideGuide"></div>
  </div>
</template>

<script>
import canvasBoxVue from '@/components/fiveBessings/canvasBox.vue'
import fiveTipPop from '@/components/fiveBessings/fiveTipPop.vue'
import fiveBessingsDetail from '@/components/fiveBessings/fiveBessingsDetail.vue'
import {wufu_getData_api,wufu_open_api,wufu_handleOpen_api,wufu_receiveCard_api } from "@/api/wufu"
import rewardNotification from '@/components/fiveBessings/rewardNotification.vue'


export default {
  components:{canvasBoxVue,fiveTipPop,fiveBessingsDetail,rewardNotification},
  data(){
    return {
      cur:0,
      swiperOpt: {
        loop: false,
        autoplay: false,
        slidesPerView: "auto",
        spaceBetween: 7,
      },
      data:{
        withdrawal_list:[],
        record_list:[]
      },
      cardData:{},
      isOpen:false,
      isAnimate:false,
      popData:{
        img:"",
        className:""
      },
      isGuide:!localStorage.getItem("five-bessings-guide")
    }
  },
  methods:{
    // 兑换
    async receive(card_id,item){
      const {data} = await wufu_receiveCard_api({w_id:this.data.id,card_id})
      if(data.code==1){
        this.getData()
        this.updateUserInfo()
        this.$refs.receiveSuccess.show({
          msg:this.$langKey(this.$t("恭喜您成功获得 {currency} {amount}"),{currency:this.data.currency,amount:card_id==0?this.data.amount:item.amount}),
          title:"恭喜",
          bthText:"确认"
        })
      }else{
        this.errorTips(data.msg);
      }
    },

    // 显示Confirm
    async showConfirm(card_id,item){
      // card_id!=0 是单张  0 是全部
      if(card_id!=0){
        this.popData.img = item.image
        // 小于两张提示充值
        if(item.num<2){
          this.popData.className = "pop-icon gray-image"
          this.$refs.guagualeConfirm.show({
            msg:"卡片数量小于两张,无法兑换,赶紧去获得卡片吧!",
            title:"很遗憾",
            callBack:()=>{this.$router.push("/layout/task-center")},
            bthText:"获得更多次数"
          })
        }else{
          this.popData.className = "pop-icon"
          this.$refs.guagualeConfirm.show({
            msg:this.$langKey(this.$t("您是否兑换 {data} 获得 {currency} {amount}"),{data:item.name,currency:this.data.currency,amount:item.amount}),
            title:"刮刮卡兑换",
            callBack:async () => await this.receive(card_id,item),
            bthText:"兑换"
          })
        }
        
      }else{
        this.popData.img = require("@/assets/images/five-cover.png")
        // 未满足，提示充值
        if(this.data.card_list.find(item=>item.num==0)){
          this.popData.className = "cover gray-image"
          this.$refs.guagualeConfirm.show({
            msg:"您暂时还没有收集到足够的卡片",
            title:"很遗憾",
            callBack:()=>{this.$router.push("/layout/task-center")},
            bthText:"获得更多次数"
          })
        }else{
          this.popData.className = "cover"
          this.$refs.guagualeConfirm.show({
            msg:this.$langKey(this.$t("您是否兑换全套五福 获得 {currency} {amount}"),{currency:this.data.currency,amount:this.data.amount}),
            title:"刮刮卡兑换",
            callBack:async () => await this.receive(card_id),
            bthText:"兑换"
          })
        }
        
      }
      
    },

    // 获取数据
    async getData(){
      const {data} = await wufu_getData_api()
      if(data.code==1){
        this.$store.commit("fiveBessings/updateFiveBessData",data.data)
        this.data = data.data
      }
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
      this.isOpen = true
      const {data} = await wufu_handleOpen_api({w_id:this.data.id,card_id:this.cardData.card_id})
      if(data.code==1){
        this.$refs.rewardNotification.show({
          bthText:"收入卡库",
          icon:this.cardData.card_detail.image,
          title:"刮卡结果通知"
        })
        this.getData()
      }else{
        this.errorTips(data.msg);
      }
    },

    // 刷新
    refresh(){
      this.isAnimate = false
      this.isOpen = false
      this.$refs.canvasBoxVue.init()
      this.wufu_open()
    },

    // 显示钱包
    showWallet(){
      if(!this.$store.state.isLoginStatu){
        this.showLoginReg(0)
        return
      }
      if(this.$store.state.loading.wallet) return
      this.$store.commit("setIsWallet",!this.$store.state.isWallet)
      if(this.$store.state.isWallet) this.$store.state.walletGetData++
    },

    hideGuide(){
      this.isGuide = false
      localStorage.setItem("five-bessings-guide",true)
    },

    fiveBessingsDetailShow(){
      this.$refs.fiveBessingsDetail.show()
    },

    toLink(){
      if(this.data.step_url.includes("wallet")){
        this.showWallet()
      }else{
        this.$router.push(this.data.step_url)
      }
    }
  },
  async mounted(){
    await this.getData()
    await this.wufu_open()
  }
}
</script>

<style lang="less" src="@/assets/css/fiveBessings.less" scoped></style>