<template>
  <div>
    <div class="title-wapper">
      <img src="@/assets/images/pdd/money-icon.png" alt="" class="title-icon">
      <span>{{ data.title }}</span>
      <!-- <img src="@/assets/images/pdd/question.png" alt="" class="question-icon"> -->
    </div>
    <div class="num-list-wapper">
      <img src="@/assets/images/pdd/pix.png" class="pix-icon">
      <swiper class="swiper" :options="swiperOpt">
        <swiper-slide v-for="(item,index) in data.withdrawal_user_list" :key="index" class="num-item">
          {{ item.username }} {{ $t("刚刚提取") }} {{ item.current_symbol }} {{ item.amount }}
        </swiper-slide>
      </swiper>
    </div>
    <div class="turn-wapper">
      <div class="turntable-wapper">
        <div class="turntable-top-title">{{ data.time }}{{ $t("小时内提取") }} {{ data.current_symbol }} {{ data.amount }}</div>
        <turntable :data="data" @tabBtn="turntable" ref="turntable"></turntable>
        <div class="turntable-bottom-title" v-if="data.remain_time">{{ initTime(data.remain_time) }} {{ $t("后到期") }}</div>
        <div class="turntable-bottom-title" v-else>{{ $t("首次免费抽取奖励") }}</div>
      </div>
      <div class="turn-content">
        <div class="turn-content-title-wapper">
          <span class="turn-content-title">{{ data.current_symbol }} {{ data.awarded_amount || '0.00' }}</span>
          <el-button class="btn1" :loading="btnLoding" @click="withdrawal">
            <img src="@/assets/images/pdd/pix2.png" style="width: 1em;" class="pix-btn-icon">
            <span>{{ $t("去取出") }}</span>
          </el-button>
        </div>
        <div class="jdt-wapper">
          <div class="jdt-txt">
            <span>{{  ((data.awarded_amount/data.amount*100) || 0 ).toFixed(2) }}%</span>
            <span>{{ $t("您还需要") }}  <span class="num">{{ data.current_symbol }} {{ numFormat((data.amount - data.awarded_amount) || 0) }}</span> {{ $t("才能提款") }} </span>
          </div>
          <div class="progress">
            <div class="progress-content" :style="`width: ${data.awarded_amount/data.amount*100}%;`"></div>
          </div>
        </div>
        <el-button class="btn1 btn2" @click="showShare">
          <span>{{ $t("邀请好友帮忙提款") }}</span>
          <span class="share-btn">
            <i class="el-icon el-icon-share"></i>
          </span>
        </el-button>
      </div>
    </div>
    <div class="order-wapper">
      <div class="tabs">
        <div :class="['tabs-item',cur==0?'tabs-item-active':'']" @click="cur=0">{{ $t("报告") }}</div>
        <div :class="['tabs-item',cur==1?'tabs-item-active':'']" @click="cur=1">{{ $t("规则") }}</div>
      </div>
      <div class="list-wapper" v-if="cur==0">
        <none style="margin: 0;" v-if="!data.user_invite_record.length"></none>
        <div class="list-item" v-for="item,index in data.user_invite_record" :key="index">
          <span>{{ item.username }}</span>
          <span>{{ item.invite_username }}</span>
          <span>{{ data.current_symbol }}  {{ item.amount }}</span>
        </div>
      </div>
      <div class="rule html" v-html="data.introduce" v-else></div>
    </div>
    <share :data="data" ref="share"></share>
  </div>
</template>

<script>
import turntable from "@/components/pdd/turntable.vue"
import share from "@/components/pdd/share.vue"
import {pdd_getData_api,pdd_withdrawal_api,pdd_turntable_api} from '@/api/pdd.js'
export default {
  components:{turntable,share},
  data(){
    return {
      swiperOpt: {
        autoplay:true,
        slidesPerView: "auto",
        spaceBetween: 33,
        breakpoints: {
          768: {
            spaceBetween: 23,

          },
          1200: {
            spaceBetween: 33,
          }
        }
      },
      data:{user_invite_record:[]},
      timeId:null,
      cur:0,
      tLoading:false,
      btnLoding:false
    }
  },
  async mounted(){
    await this.getData()
    this.timeId = setInterval(()=>{
      this.data.remain_time--
      this.$forceUpdate()
    },1000)
  },
  beforeDestroy(){
    clearInterval(this.timeId)
  },
  methods:{
    showShare(){
      if(this.judgeClient() == "pc"){
        this.$copyText(this.data.invite_url).then( ()=> {
          this.successTips('链接复制成功，请发送对应的好友');
        })
      }else{
        this.$refs.share.show()
      }
    },
    judgeClient() {
      let client = "";
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //判断iPhone|iPad|iPod|iOS
        client = "ios";
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //判断Android
        client = "android";
      } else {
        client = "pc";
      }
      return client;
    },
    initTime(time){
      if(time<0){
        return "00:00:00"
      }
      const h = parseInt(time / 3600)
      const m = parseInt(time % 3600 / 60) 
      const s = time % 60
      return `${h.toString().padStart(2,0)}:${m.toString().padStart(2,0)}:${s.toString().padStart(2,0)}`
    },
    async getData(){
      const {data} = await pdd_getData_api()
      if(data.code==1){
        this.data = data.data
      }
    },
    // 抽奖
    async turntable(){
      if(this.tLoading) return
      this.tLoading = true
      const {data} = await pdd_turntable_api({id:this.data.id})
      if(data.code==1){
        this.$refs.turntable.run(()=>{
          this.tLoading = false
          if(data.data.amount>0){
            this.successTips(`${this.$t("恭喜您抽中")} ${data.data.amount}`);
          }else{
            this.errorTips("很遗憾，您未中奖");
          }
          this.getData()
        },data.data.amount!=0)
      }else{
        this.tLoading = false
        this.errorTips(data.msg);
      }
    },
    // 取款
    async withdrawal(){
      this.btnLoding = true
      const {data} = await pdd_withdrawal_api({id:this.data.id})
      this.btnLoding = false
      if(data.code==1){
        this.successTips(`${this.$t('恭喜您，提现钱包金额')} ${this.data.amount}`);
        this.getData()
      }else{
        this.errorTips(data.msg);
      }
    }
  }
}
</script>

<style lang="less" scoped src="@/assets/css/pdd.less"></style>