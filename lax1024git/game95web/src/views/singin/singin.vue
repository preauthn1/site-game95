<template>
  <div class="wrapper">
    <div class="wrapper__inner">
      <div class="container">
  <el-skeleton :rows="16" v-if="loading" animated />
  <div v-else>
    <img src="../../assets/images/singin/headdiagram.png"  alt="">
    <div class="title-wapper">
      <!-- <img src="@/assets/images/singin-icon.png" alt="" class="title-icon"> -->
      <span>{{ $t("每日签到") }}</span>
    </div>
    <div class="cart">
      <div class="c-title-wapper">
        <div class="c-title-l">
          <div class="c-title">{{ $t("待领奖励") }}
            <span class="c-title-m" >{{ data.currency }} {{ numFormat(data.total_amount || 0) }}</span>
          </div>
          <!-- <div class="c-title-num">{{ data.currency }} {{ numFormat(data.total_amount || 0) }}</div> -->
        </div>
       <!--  <div class="btn-wapper" v-if="actionDay.index>7">
          <el-button :loading="btnLoding" class="button button_blue btn_more" @click="showPop">{{ $t("更多奖励") }}</el-button>
          <div class="c-title-r" v-if="data.surplus_sign_count>0">{{ $t("补卡次数") }}{{ data.surplus_sign_count }}</div>
        </div> -->
      </div>
      <div class="new_singin">
        <div v-for="item,index in data.day_list" :key="index" @click="actionDay.index==index?singIn(item):null">
            <div class="new_singin_item" :style="item.status != 0 ?`background:linear-gradient(5deg, #84F100, #BBEC5A);`:``">
              <span v-if="item.status == 0" class="new_singin_item_num">{{ index + 1 }}</span>
              <span v-else class="signedin"> {{ $t('已签到')}} </span>
              <div v-if="index == 0 || index == 1">
                <img v-if = "item.status == 0" src="../../assets/images/singin/16.png" class="singin_item_img01" alt="">
                <img v-else src="../../assets/images/singin/21.png" class="singin_item_active" alt="">
              </div>
              <div v-else-if="index == 2">
                <img v-if="item.status == 0" src="../../assets/images/singin/17.png" class="singin_item_img" alt="">
                <img v-else src="../../assets/images/singin/21.png" class="singin_item_active" alt="">
              </div>
              <div v-else-if="index == 3 || index == 4">
                <img v-if="item.status == 0" src="../../assets/images/singin/19.png" class="singin_item_img" alt="">
                <img v-else src="../../assets/images/singin/21.png" class="singin_item_active" alt="">
              </div>
              <div v-else-if = "index == 5">
                <img v-if="item.status == 0" src="../../assets/images/singin/14.png" class="singin_item_img" alt="">
                <img v-else src="../../assets/images/singin/21.png" class="singin_item_active" alt="">
              </div>
              <div v-else>
                <img v-if="item.status == 0" src="../../assets/images/singin/15.png" class="singin_item_img" alt="">
                <img v-else src="../../assets/images/singin/21.png" class="singin_item_active" alt="">
              </div>
              <div class="new_singin_item_bottom">{{ data.currency }} {{ item.amount }}</div>
            </div>
        </div>
      </div>

      <!-- <div class="list-wapper">
        <div v-loading="item.loading"
        @click="actionDay.index==index?singIn(item):null"
        :class="['list-item',item.status==1?'list-item-ac':'',actionDay.index==index?'list-item-ac2':'']"
        v-for="item,index in data.day_list"
        :key="index">
          <div class="item-icon-wapper">
            <img src="@/assets/images/singin-icon1.png" class="item-icon" v-if="item.status==0&&item.reward_amount>0">
            <img src="@/assets/images/integral.png" class="item-icon item-icon2" v-else-if="item.status==0">
            <img src="@/assets/images/singin-icon2.png" class="item-icon" v-else>
          </div>
          <span class="item-num">{{item.amount > 0 ? data.currency :"X"}} {{ item.amount > 0 ? numFormat(item.amount) : item.integral }}</span>
          <div class="item-bottom">
            <span v-if="item.status!=0" style="color: #306AEF;">{{ $t("已签到") }}</span>
            <span v-else-if="actionDay.index==index" style="color: #306AEF;">{{ $t(actionDay.text) }}</span>
            <span v-else>{{  item.day.toString().padStart(2,"0") }}</span>
          </div>
          <div class="bage"></div>
        </div>
      </div> -->
    </div>
    <!-- <div class="html" v-html="data.introduce" style="margin-bottom: 10px;"></div>
    <singinPop ref="singinPop"></singinPop> -->
  </div>
      </div>
    </div>
  </div>
</template>

<script>
import {sign_getSign_api,sign_userSign_api,sign_addSign_api} from "@/api/singin.js"
import singinPop from './singinPop.vue'
export default {
  data(){
    return {
      loading:false,
      btnLoding:false,
      data:{
        day_list:[]
      }
    }
  },
  components:{singinPop},
  computed:{
    // 判断签到或补签所在的天数
    actionDay(){
      const i = this.data.day_list.findIndex(item=>item.status==0)
      if((i+1)>this.data.current_day) return {}
      return {
        text:this.data.current_day==(i+1)?"签到":"补签",
        index:i
      }
    }
  },
  methods:{
    async showPop(){
      this.btnLoding = true
      await this.$refs.singinPop.show()
      this.btnLoding = false
    },
    // 获取数据
    async getData(){
      const {data} = await sign_getSign_api()
      if(data.code==1){
        this.data = data.data
        console.log(this.data.day_list,'签到的数据')
      }
    },
    // 签到或者补签
    async singIn(item){
      item.loading = true
      this.$forceUpdate()
      const api = this.actionDay.text=='签到'?sign_userSign_api:sign_addSign_api
      const {data} = await api({
        sign_id:this.data.id,
        day: item.day
      })
      if(data.code==1){
        this.getData()
        this.$message({
          message:data.msg,
          type:'success'
        });
      }else{
        this.$message.error(data.msg);
      }
      item.loading = false
      this.$forceUpdate()
    }

  },
  async mounted(){
    this.loading = true
    await this.getData()
    this.loading = false
  }
}
</script>
<style scoped src="@/assets/css/singin.less" lang="less"></style>
