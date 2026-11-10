<template>
  <div class="cashBack-wapper">
    <div class="cashBack-wapper-top">
      <div>
        <p>{{$t('剩余流水')}}</p>
        <span>{{ numFormat(userInfo.savings, true) }}</span>
      </div>
      <div class="line"> &nbsp;</div>
      <div>
        <p>{{$t('已完成流水')}}</p>
        <span>{{ numFormat(userInfo.water, true) }}</span>
      </div>
    </div>
    <div class="back-money-title">
      <span>{{ $t("现金返还") }}</span>
    </div>
    <div class="back-money">
      <div class="back-item" v-for="(item,index) in list" :style="`background-image: url(${require('@/assets/images/account/cb'+(index%4+1)+'.png')});`" @click="toCashBack(item)">
        <span :title="item.name">{{ $t(item.name) }}</span>
        <span>{{ item.num }}%</span>
      </div>
    </div>
<!--    <div class="cash-list">-->
<!--      <div class="cash hidden-xs-only">-->
<!--        <span v-if="$helper.getLang() != 'BR'">{{ $t("现金") }}</span>-->
<!--        <span>{{ $t("返还") }}</span>-->
<!--      </div>-->
<!--      <swiper :options="swiperOptionThumbs" class="swiper" ref="swiper">-->
<!--        <swiper-slide v-for="(item,index) in list" :key="index" >-->
<!--          <div class="cash-item"  :style="`background-image: url(${require('@/assets/images/cb'+(index%5+1)+'.png')});`" @click="toCashBack(item)">-->
<!--            <span class="item-title" :title="item.name">{{ $t(item.name) }}</span>-->
<!--            <span class="item-num">{{ item.num }}%</span>-->
<!--          </div>-->
<!--        </swiper-slide>-->
<!--      </swiper>-->
<!--    </div>-->
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data(){
    return {
      swiperOptionThumbs: {
        loop: false,
        slidesPerView: 5,
        centeredSlides: false,
        breakpoints: {
          540: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          768:{
            slidesPerView: 3,
            spaceBetween: 0,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 0,
          },

        },
      },
    }
  },
  props:{
    cashbackList:{
      default:[]
    }
  },
  computed:{
    ...mapState(['userInfo']),
    list(){
      return this.cashbackList.map(item=>{
        let obj = item.vipwater.find(vipwaterItem=>vipwaterItem.gbc_viplvl===this.$store.state.userInfo.level_id)
        return {
          ...item,
          num:obj?obj.gbc_rate:0
        }
      })

    }
  },
  methods:{
    /**
     * 跳转页面
     * */
    toCashBack(item){
      this.$router.push(`/all-game?tab=${item.id}`)
    }
  }
}
</script>

<style scoped lang="less">
.back-money-title{
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  margin: 4px 0 10px;
}
.back-money{
  display: flex;
  justify-content: center;
}
.back-item{
  @media (max-width: 550px){
    width: 78px;
    height: 40px;
    span:nth-child(1){
      font-size: 10px !important;
    }
    span{
      font-size: 12px !important;
    }
  }
  width: 237px;
  height: 121px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span:nth-child(1){
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #FFFFFF;
  }
  span{
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 20px;
    color: #84F100;
  }
}
.cashBack-wapper{
  background: #191A1E;
  border-radius: 10px;
  padding: 10px 20px;
  &-top{
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      font-weight: 400;
      font-size: 14px;
      color: #949494;
    }
    span{
      font-weight: 500;
      font-size: 20px;
      color: #84F100;
    }
    .line{
      border-left: 1px solid #999999;
      height: 50px;
      margin: 0 20px;
    }
  }
}
.cash{
  width: 139px;
  height: 112px;
  background-image: url(../../../assets/images/cashback-bg2.png);
  background-size: 100% 100%;
  flex-shrink: 0;
  padding-left:23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #91AAD1;
  font-size: 16px;
  font-weight: bold;
}
.cash span:nth-child(2){
  text-indent: 1em;
}
.cash-item{
  width: 100%px;
  padding-bottom: 46%;
  background-image: url(../../../assets/images/cb1.png);
  background-size: 100% 100%;
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
}
.item-title{
  position: absolute;
  top: 10%;
  left: 20%;
  max-width: 65%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-num{
  position: absolute;
  top: 53%;
  left: 44%;
  color: #1BB23C;
  font-weight: bold;
  font-size: 15px;
}
.cash-list{
  display: flex;
  align-items: center;
  overflow: auto;
}
.swiper{
  flex: 1;
}
.cash-title-wapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #91AAD1;
  font-weight: bold;
  margin-bottom: 27px;
}

@media screen and (max-width:768px) {
  .cashBack-wapper{
    height: auto;
    padding: 20px 12px 12px;
    background-color: #111923;
    border-radius: 12px;
  }
}
@media screen and (max-width:540px){
  .cash-item{
    font-size: 12px;
  }
  .item-num{
    font-size: 12px;
  }
}
</style>
