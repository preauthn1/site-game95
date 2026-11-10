<template>
  <div class="turntable">
    <div class="turn-content">
      <img v-if="borderShow" src="@/assets/images/pdd/border2.png" class="border2">
      <img v-if="border2Show" src="@/assets/images/pdd/border3.png" class="border4">
      <img v-if="border2Show" src="@/assets/images/pdd/border4.png" class="border5">
      <img src="@/assets/images/pdd/content.png" :class="['content', isTransition ? 'transition' : '']"
        :style="`transform: rotate(${turnRotate}deg);`" @transitionend="transitionend">
      <img src="@/assets/images/pdd/d.png" class="border3">
      <img src="@/assets/images/pdd/active.png" class="active" v-show="isActive">
      <div class="turn-button" @click="tabBtn">
        <img src="@/assets/images/pdd/button.png" alt="">
        <div class="btn-info" ref="turnButton">
          <div v-if="!amountShow">
            <p class="nums">{{ data.remain_turntable_count || 0 }}</p>
           <!-- eslint-disable-next-line vue/no-parsing-error -->
            <p class="info2">{{$t(data.remain_turntable_count<=1?"Giro":"Giros")}}</p>
          </div>
          <div v-else>
            <div v-if="amount!=0" class="flex-box">
              +
              <animate-number :formatter="formatNumber" from="0" :to="amount" :key="amount" duration="1500" easing="easeOutQuad" from-color="#fff" to-color="#fff"
                style="font-size:20px;text-align:center;display:block;"></animate-number>
            </div>
            <div v-else class="reward-icon">
              <img src="@/assets/images/pdd/spin-4.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <img src="@/assets/images/vnd.png" class="jinbi-icon" :style="iconStyle" v-show="iconStyle" @animationend="animationend">
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      turnRotate: 0,
      isTransition: false,
      baseRotate: 360 * 8,
      callBack: null,
      amountShow: false,
      amount: 0,
      type:1,
      isActive:false,
      iconStyle:null
    }
  },
  props: {
    data: {
      default: () => ({})
    },
    borderShow: {
      type: Boolean,
      default: true
    },
     border2Show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    tabBtn() {
      this.$emit("tabBtn")
    },
    run(callBack, amount,type) {
      this.data.remain_turntable_count -=1
      this.callBack = callBack
      this.type = type
      if (this.isTransition) return
      this.isActive = false
      this.isTransition = true
      this.$nextTick(() => {
        if(amount==0){
          this.turnRotate = this.baseRotate + 45
        }else{
          if(type==1){
            this.turnRotate = this.baseRotate + 0
          }else{
            this.turnRotate = this.baseRotate - 45
          }
        }
        setTimeout(() => {
          this.amount = amount
          this.amountShow = true
          if(type==2){
            this.runIcon()
          }
          setTimeout(()=>{
            this.amount=0
            this.amountShow = false
          },3000)
        }, 5000)
      })
    },
    transitionend() {
      this.callBack && this.callBack()
      this.isTransition = false
      this.$nextTick(() => {
        this.isActive = true
        this.turnRotate = this.turnRotate - this.baseRotate
      })
    },
    runIcon(){
      const {x,y,width,height} = this.$refs.turnButton.getBoundingClientRect()
      const {x:x2,y:y2,width:width2,height:height2} = document.getElementById("balance").getBoundingClientRect()
      this.iconStyle ={
        "--left":`${x+width/2-15}px`,
        "--top":`${y+height/2-10}px`,
        "--target-left":`${x2+width2/2-15}px`,
        "--target-top":`${y2+height2/2-10}px`,
      }
      console.log(this.iconStyle)
    },
    animationend(){
      this.iconStyle = null
    }
  },
}
</script>
  
  
<style scoped lang="less">
.turntable {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
}

.turn-content {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.border2 {
  width: 100%;
  max-width: 120% !important;
  position: absolute;
  animation: 30s turn-border linear infinite;
  pointer-events: none;
}
.border4{
  .border2();
  width: 77%;
  z-index: -2;
}
.border5{
  position: absolute;
  pointer-events: none;
  width: 80%;
  transform: translate(-1%,-2%);
}
@keyframes turn-border {
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(1.1);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
}


.border {
  width: 84%;
  position: absolute;
}

.border3 {
  width: 69%;
  position: absolute;
  animation: lamp-5cb94c3e .7s infinite;
}

@keyframes lamp-5cb94c3e {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }

  32.99% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  33% {
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }

  65.99% {
    -webkit-transform: rotate(-15deg);
    transform: rotate(-15deg);
  }

  66% {
    -webkit-transform: rotate(-30deg);
    transform: rotate(-30deg);
  }

  99.99% {
    -webkit-transform: rotate(-30deg);
    transform: rotate(-30deg);
  }
}

.content {
  width: 72%;
  position: absolute;
}

.transition {
  transition: all 5s;
}

.turn-button {
  position: absolute;
  width: 20%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -57%);
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.3;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  @media (max-width:768px) {
    font-size: 12px;
  }
}

.btn-info {
  position: absolute;
  z-index: 10;
  top: 54%;
  transform: translateY(-46%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  font-family: SWISSC;

  .nums {
    font-size: 26px;
    line-height: 26px;
    font-weight: bold;
    @media (max-width:768px) {
      font-size: 20px;
    }
  }

  .info1 {
    font-size: 9px;
  }

  .info2 {
    font-size: 12px;
    font-weight: bold;
    @media (max-width:768px) {
      font-size: 10px;
    }
  }
}

.star-wapper {
  position: absolute;
  height: 10%;
  width: 10%;
  z-index: 2;
  transform: rotate(45deg);
  pointer-events: none;
}

.star {
  width: 100%;
  position: absolute;
  z-index: 2;
  transform: translateY(310%);
  animation: 3s star linear infinite, 30s star-turn linear infinite;
  animation-delay: 1s;
  filter: blur(0) drop-shadow(0 0 0 rgb(243, 179, 179));
}

@keyframes star {
  0% {
    filter: blur(0) drop-shadow(0 0 0 rgb(243, 179, 179));
  }

  50% {
    filter: blur(0px) drop-shadow(0 0 10px rgb(255, 3, 3));
    transform: translateY(310%) scale(1.5);
  }

  100% {
    filter: blur(0) drop-shadow(0 0 0 rgb(243, 179, 179));
  }
}

@keyframes star-turn {
  0% {
    transform: translateY(310%) rotate(0deg);
  }

  100% {
    transform: translateY(310%) rotate(360deg);
  }
}

.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.reward-icon{
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
    height: auto;
  }
}
.active{
  position: absolute;
  width: 27%;
  top: 18%;
  animation: active .6s 3 linear;
}
@keyframes active{
  0%{
    opacity: 1;
  }50%{
    opacity: 0;
  }100%{
    opacity: 1;
  }
}
.jinbi-icon{
  width: 30px;
  position: fixed;
  z-index: 9999;
  left:var(--left);
  top:var(--top);
  animation: jinbi-icon 1s;
  user-select: none;
}
@keyframes jinbi-icon {
  0%{
    left:var(--left);
    top:var(--top);
  }100%{
    left:var(--target-left);
    top:var(--target-top);
  }
}
</style>