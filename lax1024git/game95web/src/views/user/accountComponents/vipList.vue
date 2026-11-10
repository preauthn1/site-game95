<template>
  <div class="vip-wapper">
    <!-- <span class="title2 hidden-sm-and-up">{{ $t("vip等级") }}</span> -->
    <div class="right">
      <img src="@/assets/images/vip-right.png" alt="" />
    </div>
    <div class="left">
      <img src="@/assets/images/vip-right.png" alt="" />
    </div>
    <swiper :options="swiperOptionThumbs" class="swiper-vip" ref="swiper" v-if="initList.length">
      <swiper-slide v-for="(item, index) in initList" :key="index">
        <div class="vip-item" @click="toVip">
          <img :src="item.levelImg" class="level-img" />

          <div class="title">{{ item.level_name }}</div>
          <!-- <div class="cashback">{{ $t("现金返还") }}</div>
          <div class="bfb-txt" v-if="item.cashback != undefined">
            {{ item.cashback.toFixed(1) }}%
            <img src="@/assets/images/vip-liwu.png" alt="" class="top" />
          </div> -->
          <div class="cashback">{{ $t("等级彩金") }}</div>
          
          <div class="num">
            <img :src="require('@/assets/images/'+$store.state.currencyIcon)" style="width: 14px; height: 14px;" /> 
            {{numFormat(item.level_gold, true)  }}
          </div>
          <div class="cashback">{{ $t("周礼金") }}</div>
          <div class="bfb-txt">
            <img v-if="item.week_reward_amount!=0" :src="require('@/assets/images/'+$store.state.currencyIcon)" style="width: 14px; height: 14px;" /> 
            <span style="margin-left: 2px;">{{ item.week_reward_amount ==0?'--':numFormat(item.week_reward_amount, true)  }}</span>
            <img v-if="item.week_is_receive_vip_reward!=1" src="@/assets/images/vip-liwu.png" alt="" class="top" />
            <img v-else src="@/assets/images/vip-liwu2.png" alt="" class="top top2" />
          </div>
          <div class="cashback">{{ $t("月礼金") }}</div>
          <div class="bfb-txt">
            <img v-if="item.month_reward_amount!=0" :src="require('@/assets/images/'+$store.state.currencyIcon)" style="width: 14px; height: 14px;" /> 
            <span style="margin-left: 2px;">{{ item.month_reward_amount==0?'--':numFormat(item.month_reward_amount, true) }}</span>
            <img v-if="item.month_is_receive_vip_reward!=1" src="@/assets/images/vip-liwu.png" alt="" class="top" />
            <img v-else src="@/assets/images/vip-liwu2.png" alt="" class="top top2" />
          </div>
          <div :class="['vip-title']" v-if="$store.state.userInfo.level_id==item.id">{{ $t("VIP等级") }}</div>
          <div :class="['jdt-wapper']" v-if="$store.state.userInfo.level_id==item.id">
            <div class="jdt">
              <div class="jdt-content" :style="{width:`${$store.state.userInfo.next_level_rate}%`}"></div>
            </div>
            <span>{{ $store.state.userInfo.next_level_rate }}%</span>
          </div>
          <!-- <div class="bfb-txt">
            <span style="color:#87a1c7;">{{ $t("周礼金") }}：</span>
            {{ item.week_reward_amount }}
            <img src="@/assets/images/vip-liwu.png" alt="" class="top" />
          </div>
          <div class="bfb-txt">
            <span style="color:#87a1c7">{{ $t("月礼金") }}：</span>
            {{ item.month_reward_amount}}
            <img src="@/assets/images/vip-liwu.png" alt="" class="top" />
          </div> -->
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptionThumbs: {
        autoplay: 3000,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".right",
          prevEl: ".left",
        },
        slidesPerView: 3,
        centeredSlides: true,
        breakpoints: {
          540: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        },
      },
    };
  },
  props: {
    list: {
      default: [],
    },
    cashbackList: {
      default: [],
    },
  },
  computed: {
    /**
     * 格式化list列表,添加现金返还数据,取最大数据显示
     * */
    initList() {
      let list = JSON.parse(JSON.stringify(this.list));
      list.forEach((item) => {
        this.cashbackList.forEach((cashbackListItem) => {
          cashbackListItem.vipwater.forEach((vipwaterItem) => {
            if (item.level_name == vipwaterItem.level_name) {
              if (item.cashback) {
                if (item.cashback < vipwaterItem.gbc_rate) {
                  item.cashback = vipwaterItem.gbc_rate;
                }
              } else {
                item.cashback = vipwaterItem.gbc_rate;
              }
            }
          });
        });
      });
      console.log(list)
      return list;
    },
  },
  watch:{
    initList:{
      immediate:true,
      handler(){
        setTimeout(()=>{
          const page = this.initList.findIndex(item=>item.id === this.$store.state.userInfo.level_id)
          this.$refs?.swiper?.swiper.slideTo(page);
        },50)
      },

    }
  },
  methods:{
    toVip(){
      this.$router.push("/rank-system")
    }
  }
};
</script>

<style scoped>
.vip-wapper {
  background: #161f2c;
  border-radius: 11px;
  padding: 10px 0;
  position: relative;
}
.right,
.left {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  cursor: pointer;
  z-index: 2;
  user-select: none;
}
.right img,
.left img {
  width: 100%;
}
.right {
  right: 34px;
}
.left {
  left: 34px;
  transform: translateY(-50%) rotate(180deg);
}
.vip-item {
  width: 150px;
  min-height: 210px;
  flex-shrink: 0;
  /* height: 188px; */
  background-image: url(../../../assets/images/rank-bg.png);
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s;
  position: relative;
  transform-origin: center bottom;
  cursor: pointer;
}
.title2{
  position: absolute;
  top: 13px;
  left: 13px;
  font-weight: bold;
  color: #91AAD1;
  z-index: 2;
}
@media screen and (min-width: 540px) {
  .vip-item {
    transform: scale(0.9);
    opacity: 0.6;
    padding-bottom: 10px;
    font-size: 12px;
  }
  .swiper-slide-active .vip-item {
    transform: scale(1.3);
    z-index: 3;
    background-image: url(../../../assets/images/rank-bg-ac.png);
    opacity: 1;
    /* filter: drop-shadow(0 0 10px #000); */
  }
  .swiper-slide-next .vip-item,
  .swiper-slide-prev .vip-item {
    transform: scale(1);
    z-index: 2;
    opacity: 1;
  }
}

.swiper-slide {
  display: flex;
  justify-content: center;
}
.swiper-vip {
  width: 458px;
  padding-top: 80px;
  max-width: 100%;
}
.level-img {
  width: 52px;
  margin-top: -16px;
}
.title {
  margin-bottom: 4px;
}
.cashback {
  color: #87a1c7;
  font-size: 10px;
  text-align: center;
  line-height: 1.3;
  margin-bottom: 2px;
  padding: 0 4px;
}
.bfb-txt {
  color: #dea338;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.bonus-sa-rank {
  color: #87a1c7;
  font-size: 12px;
  margin-bottom: 6px;
}
.num {
  color: #1bb23c;
}
.vip-title {
  color: #87a1c7;
  font-size: 12px;
  margin-bottom: 6px;
}
.jdt {
  height: 4px;
  background-color: #0a3059;
  border-radius: 100vh;
  flex: 1;
  margin-right: 10px;
}
.jdt-wapper {
  font-size: 12px;
  display: flex;
  align-items: center;
  width: 80%;
}
.jdt-content {
  height: 100%;
  border-radius: 100vh;
  background-color: #007aff;
  width: 50%;
}
.top {
  width: 14px;
  margin-left: 4px;
}
.top2{
  transform: scale(1.6);
}
.hide{
  opacity: 0;
}
@media screen and (max-width: 768px) {
  .right,
  .left {
    display: none;
  }
}
@media screen and (max-width: 540px) {
  .vip-wapper{
    padding: 0;
    background-color: transparent;
  }
  .swiper-vip{
    width: 100%;
    padding: 0;
  }
  .vip-item{
    width: 100%;
    background-image: url(../../../assets/images/vip-bg-app.png);
    padding: 18px 18px 27px;
  }
  .vip-item *{
    font-size: 14px !important;

  }
  .level-img{
    margin: 0;
    width: 73px;
  }
  .bfb-txt,.num{
    margin-bottom: 13px;
  }
  .jdt-wapper{
    width: 70%;
  }
  .jdt{
    height: 6px;
  }
}
</style>
