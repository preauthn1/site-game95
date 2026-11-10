<template>
  <div class="wallet-box">
    <el-dialog :modal-append-to-body="true" v-if="$store.state.userInfo" :visible.sync="$store.state.isWallet"
               custom-class="el-dialog-transparent el-dialog-center" @close="closeWallet" width="700px" center
               :fullscreen="isMobileFlag?true:false"
               :close-on-click-modal="false"  z-index="2999"
               :title="$t(dialogTitle)">
      <!--      <i class="el-icon-error el-icon" @click="hideSync"></i>-->
      <!--      v-if="rechargeSteps == 0 && withdrawalSteps == 0"-->
      <div ref="walletWapper" class="wallet-wapper" v-if="withdrawalSteps == 0">
        <!--        <div class="wallet-title-wapper">-->
        <!--          <span>{{ $t("钱包") }}</span>-->
        <!--        </div>-->
        <!-- <div class="tabs2-wapper">
          <div :class="['tabs2-item ',tabsCur2==1?'tabs2-active':'']" @click="changeTabs2(1)">{{ $t("法定货币") }}</div>
          <div :class="['tabs2-item ',tabsCur2==0?'tabs2-active':'']" @click="changeTabs2(0)">{{ $t("数字钱包") }}</div>
        </div> -->
        <el-skeleton :rows="9" animated v-if="isLoading"/>
        <template v-else>
          <!--          <div class="flex-flashback">-->
          <!--            <img :src="rechargeImage" class="recharge-image" v-if="rechargeImage && tabsCur == 0">-->
          <!--            <div class="tabs-wapper">-->
          <!--              <el-button :class="['tabs-btn', tabsCur == 0 ? 'tabs-btn-active' : '']" @click="changeTabs(0)">-->
          <!--                <div class="btn-content">-->
          <!--                  <img src="@/assets/images/chongzhi.png" alt="" class="icon-tab">-->
          <!--                  <img src="@/assets/images/chongzhi-ac.png" alt="" class="icon-tab icon-tab-ac">-->
          <!--                  {{ $t("充值") }}-->
          <!--                </div>-->
          <!--              </el-button>-->
          <!--              <el-button :class="['tabs-btn', tabsCur == 1 ? 'tabs-btn-active' : '']" @click="changeTabs(1)">-->
          <!--                <div class="btn-content">-->
          <!--                  <img src="@/assets/images/tixian.png" alt="" class="icon-tab">-->
          <!--                  <img src="@/assets/images/tixian-ac.png" alt="" class="icon-tab icon-tab-ac">-->
          <!--                  {{ $t("提现") }}-->
          <!--                </div>-->
          <!--              </el-button>-->
          <!--              &lt;!&ndash; <div class="btn-xian"></div>-->
          <!--              <el-button @click="goJl" class="tabs-btn2">{{ $t("我的") }} <br />-->
          <!--                {{ $t("记录") }}-->
          <!--              </el-button> &ndash;&gt;-->
          <!--            </div>-->
          <!--          </div>-->
          <el-tabs v-model="tabsCur" :tab-position="isMobileFlag?'top':'left'">
            <el-tab-pane :label="$t('充值')" name="0">
              <!-- 数字货币充值 -->
              <div style="background: #191A1E;overflow-y: scroll;padding: 10px">
                <digitalCurrencyRecharge ref="" @setting="setting" @submit="secondStepOfLegalTenderRecharge"
                                         :dep_address="dep_address" :allUsdt="allUsdt" :digitalWalletList="digitalWallet"
                                         v-if="tabsCur == 0 && tabsCur2 == 0"
                                         @parent-event="parentEvent"></digitalCurrencyRecharge>
                <!-- 法定货币充值 -->
                <div v-if="tabsCur == 0 && tabsCur2 == 1" ref="rechargeModule">
                  <legalCurrencyRecharge @setting="setting" @submit="secondStepOfLegalTenderRecharge" :allBank="allBank"
                                         :bankAll="bankAll || {}" @parent-event="parentEvent">
                  </legalCurrencyRecharge>
                </div>
                <!-- 充值第二步 v-if="rechargeSteps == 1"-->
                <rechargeTwo ref="rechargeTwo" :hide="hide" @back="back" :bankAll="bankAll || {}"
                             :selectRechargeChannel="selectRechargeChannel"
                             @custom-event="handleCustomEvent"></rechargeTwo>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('提现')" name="1">
              <!-- 数字货币提现 -->
              <div style="background: #191A1E;overflow-y: scroll;padding: 10px">
              <digitalCurrencyWthdrawal @setting="setting" @submit="secondStepOfLegalTenderWithdrawal"
                                        :wtAllUsdt="wtAllUsdt"
                                        v-if="tabsCur == 1 && tabsCur2 == 0"
                                        @parent-event="parentEvent"></digitalCurrencyWthdrawal>
              <!-- 法定货币提现 -->
              <legalCurrencyWithdrawal @setting="setting" @submit="secondStepOfLegalTenderWithdrawal"
                                       v-if="tabsCur == 1 && tabsCur2 == 1" :wtAllBank="wtAllBank"
                                       @parent-event="parentEvent">
              </legalCurrencyWithdrawal>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <!-- 提现第二步 -->
      <withdrawalTwo :ver_withdrawal_first="ver_withdrawal_first" :withdrawalRules="withdrawalRules"
                     :bankAll="bankAll || {}"
                     :userWithdrawalAmount="userWithdrawalAmount" :wtRnum="wtRnum" :wtMinimum="wtMinimum"
                     :wtHighest="wtHighest"
                     @submit="ConfirmWithdrawal" :selectWithdrawalChannels="selectWithdrawalChannels"
                     v-if="withdrawalSteps == 1"
                     @back="back" :hide="hide"></withdrawalTwo>
    </el-dialog>
    <el-dialog :modal-append-to-body="false" :visible.sync="eduDialogVisible"
               custom-class="el-dialog-transparent el-dialog-center el-dialog-edu "
               :modal="$store.state.windowWidth > 555">
      <i class="el-icon-error el-icon " :class="!linkTypeShow ? 'icon-error-left' : ''" @click="vhide"></i>
      <div class="v-center">
        <template v-if="showLazyYoutube && linkTypeShow">
          <LazyYoutube ref="LazyVideo" :showTitle="false" :src="videoLink" max-width="700px" thumbnail-format="jpeg"
                       :aspect-ratio="isMobileFlag ? '45:77' : '3:2'"/>
        </template>
        <template v-else>
          <iframe class="js-iframe" :src="videoLink" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
        </template>
      </div>
    </el-dialog>
    <tips ref="tips"></tips>
  </div>
</template>

<script>
/**
 * header钱包弹窗组件，包含充值和提现，在header里面引用
 */
import myTabs from "@/components/myTabs.vue";
import digitalCurrencyRecharge from './digitalCurrencyRecharge.vue'
import legalCurrencyRecharge from './legalCurrencyRecharge.vue'
import rechargeTwo from './rechargeTwo.vue'
import tips from './tips.vue'
import withdrawalTwo from './withdrawalTwo.vue'
import digitalCurrencyWthdrawal from './digitalCurrencyWthdrawal.vue'
import legalCurrencyWithdrawal from './legalCurrencyWithdrawal.vue'
// import {Loading} from 'element-ui';

export default {
  data() {
    return {
      selectRechargeChannel: null,//当前选中充值渠道
      selectWithdrawalChannels: null,
      tabsCur: 0,//顶部充值提现切换tabs下标
      tabsCur2: 1,//顶部数字钱包，法定货币切换tabs下标
      rechargeSteps: 0,//充值步数
      withdrawalSteps: 0,//充值步数
      isLoading: false,
      videoLink: "",
      eduDialogVisible: false,
      showLazyYoutube: false,
      linkTypeShow: true,
      tabPosition: 'top',
      dialogTitle: '钱包'
    };
  },
  props: {
    ver_withdrawal_first: {
      default: 0
    },
    withdrawalRules: {
      default: 0
    },
    userWithdrawalAmount: {
      default: 0
    },
    wtRnum: {
      default: 0
    },
    wtMinimum: {
      default: 0
    },
    wtHighest: {
      default: 0
    },
    wtAllBank: {
      default: () => []
    },
    wtAllUsdt: {
      default: () => []
    },
    bankAll: {
      default: null
    },
    rechargeList: {
      default: () => []
    },
    allUsdt: {
      default: () => []
    },
    dep_address: {
      default: () => ""
    },
    allBank: {
      default: () => []
    }
  },
  watch: {
    // 格式化提现默认选择
    tabsCur(v) {
      if (v == 1) {
        if (this.wtAllBank.length) {
          this.tabsCur2 = 1
        } else if (this.wtAllUsdt.length) {
          this.tabsCur2 = 0
        }
      }
    }
  },
  computed: {
    rechargeImage() {
      if (!this.bankAll) return
      const imgs = this.bankAll.recharge_action_reg_json.filter(item => item.recharge_image)
      if (imgs.length == 0) {
        return
      } else {
        return imgs[0].recharge_image
      }
    },
    /**
     * 数字钱包列表 根据rechargeList筛选，"uname": "usdt" 为数字钱包
     * */
    digitalWallet() {
      return this.rechargeList.filter(item => item.uname == "usdt")
    },

    /**
     * 法定货币列表 根据rechargeList筛选，是银行卡得都归类法定货币"uname": "bank" 为银行卡
     * */
    FiatCurrency() {
      return this.rechargeList.filter(item => item.uname == "bank")
    }
  },
  components: {
    tips,
    myTabs,
    digitalCurrencyRecharge,
    legalCurrencyRecharge,
    rechargeTwo,
    digitalCurrencyWthdrawal,
    legalCurrencyWithdrawal,
    withdrawalTwo
  },
  methods: {
    //视频弹出
    handleCustomEvent(value) {
      this.videoLink = value
      this.eduDialogVisible = true
      this.showLazyYoutube = true
      this.$nextTick(() => {
        this.$refs.LazyVideo.playVideo()
      })

    },
    parentEvent(value) {
      this.videoLink = value
      this.eduDialogVisible = true
      this.linkTypeShow = false
    },
    setting() {
      this.$emit("setting")
      this.hide()
    },
    goJl() {
      this.hide()
      this.goUrl('/transactions')
    },

    ConfirmWithdrawal({id, price, phone, code}) {
      this.$emit("ConfirmWithdrawal", "", id, price, phone, code)
    },
    /**
     * 返回第一步
     * */
    back() {
      this.rechargeSteps = 0
      this.withdrawalSteps = 0
    },

    /**
     * 法定货币充值第二步
     * @param {Object} rechargeChannels 充值渠道
     * */
    secondStepOfLegalTenderRecharge(rechargeChannels) {
      this.rechargeSteps = 1
      this.selectRechargeChannel = rechargeChannels
    },

    /**
     * 法定货币提现第二步
     * @param {Object} withdrawalChannels 提现渠道
     * */
    secondStepOfLegalTenderWithdrawal(withdrawalChannels) {
      this.withdrawalSteps = 1
      this.selectWithdrawalChannels = withdrawalChannels
    },

    closeWallet() {
      setTimeout(() => {
        this.back()
        this.tabsCur = 0
      }, 500)
    },
    hide() {
      this.$store.commit("setIsWallet", false)
    },
    async hideSync() {
      const giftAmount = this.$refs.rechargeTwo?.giftAmount
      if (!giftAmount) {
        this.hide()
        return
      }
      const confirm = await this.$refs.tips.show(giftAmount)
      if (confirm) {
        this.hide()
      }
    },

    /**
     * 钱包弹窗显示
     * */
    show() {
      this.$store.commit("setIsWallet", true)
      // this.$store.state.isWallet = true
    },

    /**
     * 顶部充值提现切换tabs下标
     * @param {Number} index 需要改变的索引
     * */
    changeTabs(index) {
      this.tabsCur = index
      if (index === 0) {
        this.$nextTick(() => {
          const element = this.$refs.rechargeModule;
          const container = this.$refs.walletWapper;
          container.style.transition = 'scroll-behavior 0.5s ease';
          container.scrollTop = element.offsetTop
        })
      }
    },

    /**
     * 顶部数字钱包，法定货币切换tabs下标
     * @param {Number} index 需要改变的索引
     * */
    changeTabs2(index) {
      this.tabsCur2 = index
    },
    vhide() {
      if (this.$refs.LazyVideo) {
        this.$refs.LazyVideo.stopVideo()
      }
      this.videoLink = ""
      this.eduDialogVisible = false
      this.showLazyYoutube = false
    },
  },
};
</script>

<style scoped src="@/assets/css/wallet.css"></style>
<style scoped>
::v-deep .el-tabs__item {
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 15px;
  color: #FFFFFF;
  line-height: 52px;
}

::v-deep .el-tabs__active-bar {
  background-color: #84F100;

}

::v-deep .el-tabs__item.is-active {
  color: #84F100;
}

::v-deep .el-tabs__nav-wrap::after {
  position: static !important;

}
::v-deep .el-tabs--left .el-tabs__header.is-left{
  margin-right: 0;
}
@media (min-width: 551px) {
  ::v-deep .el-tabs{
    height: 100%;
  }
  ::v-deep .el-tabs__content{
    height: 100%;
    background: #191A1E;
  }
}
::v-deep .el-tabs__content{
  overflow-y: scroll;
}
.purse {
  padding: 11px;
}
</style>
