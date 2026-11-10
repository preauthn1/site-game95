<template>
  <el-dialog :visible.sync="isShow" :class="turntableShow?'turntableShow':'turntableHide'" :destroy-on-close="true" custom-class="custom-dialog el-dialog-center2"
    :modal-append-to-body="false">
    
    <div v-if="turntableShow" class="ed-box">
      <div class="dio-title">
        <img src="@/assets/images/pdd/header-img.png" class="dio-title-icon">
        <div class="dio-title-text">
          <span :data-text="item" v-for="item,index in data.title" :key="index">{{ item }}</span>
        </div>
      </div>
      <div class="close-icon" @click="hide">
        <img src="@/assets/images/pdd/close.png">
      </div>
      <div class="notify-wrap">
        <img src="@/assets/images/pdd-logo.png" alt="" class="title-icon">
        {{ $t("快速取出") }}
      </div>
      <div class="turntable-wapper">
        <turntable :borderShow="false" :data="data" @tabBtn="turntable" ref="turntable"></turntable>
        <img src="@/assets/images/pdd/jinbi.png" class="jinbi-bg">
        <img src="@/assets/images/pdd/pig.png" class="pig-img">
        <img src="@/assets/images/pdd/mouse.png" class="mouse-img">
      </div>
      <div class="bottom-desc">{{ $t("免费旋转并赢得真钱") }}</div>
    </div>

    <div v-else class="unveil-page">
      <div class="dio-title2">{{ data.title }}</div>
      <div class="cashText">{{ $t("恭喜你赢得") }}:</div>
      <div class="noWithdraw">
        <span>{{ data.current_symbol }}</span>
        <animate-number :formatter="formatNumber" from="0" :to="data.awarded_amount" :key="data.awarded_amount"
          duration="1500" easing="easeOutQuad" 
          style="font-size: 40px;margin-left: 6px;"></animate-number>
      </div>

      <div class="jdt-wapper">
        <div class="jdt-txt">
          <span>{{ formatNumber(numFormat(data.awarded_amount / data.amount * 100 || 0)) }}%</span>
        </div>
        <div class="progress">
          <div class="progress-content" :style="`width: ${(data.awarded_amount / data.amount * 100 || 0)}%;`">
          </div>
        </div>
        <div class="needCash">{{ $t("您还需要") }}

          <span class="num">{{ data.current_symbol }}
            <animate-number :formatter="formatNumber" from="0" :to="numFormat((data.amount - data.awarded_amount) || 0)"
              duration="1500" :key="data.amount - data.awarded_amount" easing="easeOutQuad" from-color="#db1de7"
              to-color="#db1de7"></animate-number>
          </span>
          {{ $t("才能提款") }}
        </div>
        <button type="button" @click="goPddPage" class="cashButton ">{{ $t("要求取出更多") }}</button>
      </div>

      <div class="line"></div>
      <div class="withdrawTips">
        <img src="@/assets/images/pdd-logo.png" alt="">
        <span>{{ $t("成功取出") }}</span>
      </div>
      <div class="listContent">
        <div class="cashList" :style="{ 'animation-duration': `${data.withdrawal_user_list.length * 0.5}s` }">
          <div class="list-item" v-for="item, index in data.withdrawal_user_list" :key="index">
            <span>{{ item.username }}</span>
            <span>{{ $t('刚刚提现') }}</span>
            <span>{{ data.current_symbol }} {{ item.amount }}</span>
          </div>
        </div>
      </div>
    </div>

  </el-dialog>
</template>
    
<script>
import turntable from "./turntable.vue"
import { pdd_getData_api, pdd_turntable_api } from '@/api/pdd.js'
export default {
  components: { turntable },
  data() {
    return {
      isShow: false,
      turntableShow: true,
      data: {},
      fristState: true
    }
  },
  watch: {
    $route: {
      async handler(to) {
        if (to.query.pdd == "show") {
          await this.getData()
          this.show()
        }else{
          this.hide()
        }
      },
      immediate: true
    },
    "$store.state.isLoginStatu":{
      async handler(){
        if(this.$route.path=="/pdd") return
        await this.getData()
        if(this.data.length!=0) {
          this.isShow = true
        }
      }
    },
    isShow(v) {
      if (!v) {
        this.$router.push({ query: {} });
      }
    }
  },
  async mounted() {
    

  },
  methods: {
    verifyForThefirst() {
      const key = "pddPopHideTime";
      const date = new Date();
      const time = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      // 判断时间相等不显示，不相等进行显示
      console.log(localStorage.getItem(key))
      return time == localStorage.getItem(key);
    },
    async show() {
      if(this.$route.path=="/pdd") return
      if (this.data.awarded_amount > 0) {
        this.$router.push("/pdd")
      } else {
        this.isShow = true
      }
    },
    hide() {
      this.isShow = false;
      this.turntableShow = true
    },
    goPddPage() {
      this.turntableShow = true
      this.$router.push("/pdd")
    },
    // 抽奖
    async turntable() {
      if (!this.$store.state.isLoginStatu) {
        this.$router.push('/?modal=LoginRegistration&data=tab-0')
        return
      }
      if (this.tLoading) return
      if(!this.data.id) return
      if(this.data.awarded_amount>0){
        this.$router.push("/pdd")
        return
      }
      this.tLoading = true
      const { data } = await pdd_turntable_api({ id: this.data.id })
      if (data.code == 1) {
        this.$refs.turntable.run(async () => {
          this.tLoading = false
          if (data.data.amount > 0) {
            this.data.awarded_amount = data.data.amount
            setTimeout(() => {
              this.turntableShow = false
            }, 2000)
          } else {
            this.errorTips("很遗憾，您未中奖");
          }
        }, data.data.amount,data.data.type)
      } else {
        this.tLoading = false
        this.errorTips(data.msg);
      }
    },
    async getData() {
      const { data } = await pdd_getData_api()
      if (data.code == 1) {
        this.data = data.data
      } else {
        this.errorTips(data.msg)
      }
    }
  }
}
</script>
    
<style scoped lang="less">

.turntableShow{
  /deep/.el-dialog {
      background-color: transparent;
      box-shadow: none;
      overflow: visible;
      @media (max-width:540px) {
        width: 100%;    
      }
  }
  /deep/.el-dialog__header {
    display: none;
  }
}
.turntableHide{
  /deep/.el-dialog__header {
    padding: 0;
  }
}
.dio-title2{
  padding: 18px 30px;
  color: #2283F6;
  background-color: #161F2C;
  margin: 0 -15px;
  font-size: 15px;
  font-weight: bold;
}

/deep/.el-dialog__headerbtn {
  position: absolute;
  top: 8px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
.el-dialog__wrapper{
  background-color: rgba(0, 0, 0, .6);
}

/deep/.el-dialog__body {
  border: none;
  margin: 0;
  padding: 0;
  // padding-bottom: 30px;
  ;
}

.ed-box {
  width: 100%;
  // height: 80vh;
  padding-bottom: 30px;
  background-size: cover;

  .title-icon {
    width: auto;
    height: 20px;
    object-fit: fill;
  }
}

.custom-dialog {
  padding: 0 !important;
}

.notify-wrap {
  width: 100%;
  height: 42px;
  color: #E500FF;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  img {
    margin-right: 8px;
  }
}

.withdrawLogs {
  font-size: 13px;
  line-height: 13px;
  height: 20px;
  width: 100%;
  margin-left: 2px;
}

.van-notice-bar__wrap {
  position: relative;
  -webkit-box-flex: 1;
  flex: 1;
  align-items: center;
  height: 100%;
  overflow: hidden;
  display: flex;
}

.haveCash {
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
}

.dio-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -10px;
  .dio-title-text{
    display: flex;
    align-items: center;
  }
  span{
    position: relative;
    color: #723017;
    font-family: Impact;
    font-weight: bold;
    letter-spacing:0;
    font-size: 20px;
    letter-spacing: -0.03em;
    display: block;
    &::after{
      display: block;
      content: attr(data-text);
      color: transparent;
      background: linear-gradient(to bottom, #FDFBC1 0%,#FDFBC1 20%,#FFD300 80%, #DD882A 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: absolute;
      top: 0;
      left: 0;
      letter-spacing: 0;
      white-space: nowrap;
      transform: scale(0.9);
    }
  }
  .dio-title-icon{
    width: 60px;
    transform: scale(1.5);
    margin-right: 10px;
  }
 
}

.title-icon {
  width: 1.8em;
  margin-right: 9px;
}

.top-desc {
  color: #FFF;
  text-align: center;
  font-size: 18px;
  margin-bottom: -30px;
  margin-top: 30px;

  @media (max-width:768px) {
    font-size: 14px;
    margin: 0;
    margin-top: 20px;
  }
}

.bottom-desc {
  color: #2283F6;
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  @media (max-width:768px) {
    font-size: 14px;
    margin-top: 14px;
    margin-bottom: 0;
  }
}
.turntable-wapper{
  position: relative;
  margin-top: -13%;
   @media (max-width:768px) {
    transform: scale(1.1);
  }
}
.unveil-page {
  width: 100%;
  padding: 0 15px 30px;
  img {
    width: auto;
    height: 20px;
    object-fit: fill;
  }
}

.cashText {
  font-size: 13px;
  color: #FFF;
  padding-top: 20px;
  text-align: center;
}

.noWithdraw {
  font-size: 30px;
  color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.jdt-wapper {
  // margin-top: 8px;
  color: #fff;
  text-align: center;
}

.jdt-txt {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
}

.progress {
  height: 23px;
  border-radius: 100vh;
  background: #93ACD3;
  box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.1) inset, 0px 1px 2px 0px #373737 inset;
  overflow: hidden;
  @media (max-width:768px) {
    height: 16px;
  }
}

.progress-content {
  max-width: 100%;
  width: 0%;
  height: 100%;
  background: linear-gradient(to top, #0165EB, #00B8FE);
  border-radius: 100vh;
  transition: all .3s;
}

.num {
  color:#db1de7;
  font-size: 1.3em;
}

.needCash {
  text-align: center;
  padding: 8px 0 16px;
}

.cashButton {
  width: 90%;
  height: 42px;
  background: #2283F6;
  color: #fff;
  margin: 4px 0 18px;
  border-radius: 100vh;
}

.line {
  border: 1px dashed grey;
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 1px;
}

.withdrawTips {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 40px;
  font-family: SWISSC;
  color: #FFF;

  span {
    margin-left: 8px;
  }
}

.listContent {
  padding: 12px 0 6px;
  height: 120px;
  overflow: hidden;
}

.cashList {
  margin: 0 30px;
  animation: scrollList linear infinite;
}

@keyframes scrollList {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-100%);
  }
}

.list-item {
  color: #94ADD6;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  @media (max-width:768px) {
    font-size: 12px;
  }
  span{
    flex: 1;
    text-align: center;
    overflow: hidden;
    &:first-child{
      text-align: left;
    }
    &:last-child{
      text-align: right;
    }
  }
}
.jinbi-bg{
  width: 80%;
  position: absolute;
  top: 14%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}
.mouse-img{
  position: absolute;
  bottom: 2%;
  width: 30%;
  right: 0;
  z-index: -1;
}
.pig-img{
  position: absolute;
  bottom: 0%;
  width: 43%;
  left: 0;
  z-index: -1;
}
.close-icon{
  width: 28px;
  position: absolute;
  right: 20px;
  top: -20px;
  cursor: pointer;
  z-index: 2;
  img{
    width: 100%;
    user-select: none;
  }
}
</style>