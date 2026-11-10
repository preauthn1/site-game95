<template>
  <div class="recharge-two-wapper">
    <!--    <div class="title-wapper" @click="back">-->
    <!--      <i class="el-icon el-icon-back"></i>-->
    <!--      <span>{{ $t("提现") }} - {{ selectWithdrawalChannels.bank_name }}({{ selectWithdrawalChannels.bank_number.slice(-4) }})</span>-->
    <!--    </div>-->
    <!-- <div class="balance">
      <span>{{ $t("余额") }}</span>
      <span>{{ numFormat($store.state.userInfo.balance1) }}</span>
    </div> -->
    <!-- <div class="num-input-wapper" v-if="withdrawalRules==1">
      <span>{{ $t("流水总额") }}</span>
      <span>{{ numFormat($store.state.userInfo.savings) }}</span>
    </div> -->
    <!-- <div class="num-input-wapper" v-if="withdrawalRules==1">
      <span>{{ $t("可提现余额") }}</span>
      <img :src="require('@/assets/images/'+$store.state.currencyIcon)" class="vdn-icon" alt="">
      <span>{{ numFormat(userWithdrawalAmount) }}</span>
    </div> -->

    <div class="input-wapper">
      <div class="bank-title">
        {{ $t("金额") }}
      </div>
      <el-input class="input" type="number" :placeholder="$t('请输入提现金额')" v-model="value" @input="onInput">
        <span class="prefix-icon" slot="prefix">{{ dw }}</span>
      </el-input>
    </div>
    <div class="input-wapper" v-if="ver_withdrawal_first==1">
      <div class="bank-title">
        {{ $t("电话") }}
      </div>
      <el-input class="input qhClass-input" type="number" :placeholder="$t('请输入手机号码')" v-model="phone">
        <div slot="prefix">
          <el-select size="small" v-model="selecQu" :placeholder="$t('请选择')" class="qhClass">
            <el-option v-for="item in idc" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
      </el-input>
    </div>
    <div class="input-wapper" v-if="ver_withdrawal_first==1">
      <div class="bank-title">
        {{ $t("验证码") }}
      </div>
      <el-input v-model="code" :placeholder="$t('输入你的验证码')" auto-complete="new-password">
        <template slot="suffix">
          <el-button type="primary" class="button_blue" @click="sendPhoneCode" :disabled="!!timeId"
                     :loading="bthLoading">
            {{ $t(btnText) }}
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="tip">
      <div class="tip-title">{{ $t("提示") }}</div>
      <div class="tip-item">{{ $t("单日剩余提现次数:") }} {{ wtRnum }}</div>
      <div class="tip-item">{{ $t("最低提现金额为:") }} {{ wtMinimum }}</div>
      <div class="tip-item">{{ $t("最高提现金额为:") }} {{ wtHighest }}</div>
      <div class="tip-item" v-if="bankAll.currency_code!=selectWithdrawalChannels.currency_code">{{
          $t("今日汇率")
        }}：1{{ bankAll.currency_code }}={{
          numFormat(selectWithdrawalChannels.withdrawal_rate)
        }}{{ selectWithdrawalChannels.currency_code }}
      </div>
    </div>
    <div class="p-wapper">
      <div class="p-title">
        <span>{{ $t("滚下") }}</span>
        <div>{{ dw }} {{ numFormat(bankAll.finish_water) }} / <span
            class="theme-color">{{ dw }} {{ numFormat(bankAll.water) }}</span></div>
      </div>
      <div class="progress-wapper">
        <div class="progress">
          <div class="progress-content" :style="`width: ${calcB(bankAll.finish_water,bankAll.water)};`"></div>
        </div>
        <span>{{ calcB(bankAll.finish_water, bankAll.water) }}</span>
      </div>

      <div class="progress-tips" v-if="(bankAll.water-bankAll.finish_water) > 0">
        {{ $langKey($t("您仍需下注 {n} 才能提款"), {n: numFormat(bankAll.water - bankAll.finish_water)}) }}
      </div>

      <!-- <div v-if="bankAll.user_appoint_savings.water&&bankAll.user_appoint_savings.water>0" class="progress-wapper1">
        <div class="p-title">
          <div class="question-wapper">
            <span>{{ $t("奖金栏") }}</span>
            <el-tooltip effect="dark" :content="$langKey($t('仅(游戏:{game_name})有投注计算'),{game_name:bankAll.user_appoint_savings.game_name.join(',')})" v-if="bankAll.user_appoint_savings.game_name.length" placement="top-start">
              <i class="el-icon el-icon-question"></i>
            </el-tooltip>
          </div>
          <div>{{dw}} {{ bankAll.user_appoint_savings.finish_water }} / <span class="theme-color">{{dw}} {{ bankAll.user_appoint_savings.water }}</span></div>
        </div>
        <div class="progress-wapper">
          <div class="progress">
            <div class="progress-content" :style="`width: ${calcB(bankAll.user_appoint_savings.finish_water,bankAll.user_appoint_savings.water)};`"></div>
          </div>
          <span>{{ calcB(bankAll.user_appoint_savings.finish_water,bankAll.user_appoint_savings.water) }}</span>
        </div>
        <div class="progress-tips" v-if=" (bankAll.user_appoint_savings.water-bankAll.user_appoint_savings.finish_water) > 0">{{ $langKey($t("您仍需下注 {n} 才能提款"),{n:numFormat(bankAll.user_appoint_savings.water-bankAll.user_appoint_savings.finish_water)}) }}</div>
      </div> -->

    </div>

<!--    <el-button class="button_blue button_fullwidth btn" @click="submit" :loading="$store.state.bottonLoading">-->
<!--      <div class="btn-content">-->
<!--        <span>{{ $t("提现") }}</span>-->
<!--        <div>-->
<!--          <span>{{ calc(value) }}</span>-->
<!--          <span class="btn-dw">{{ selectWithdrawalChannels.currency_code }}</span>-->
<!--          <i class="el-icon el-icon-arrow-right"></i>-->
<!--        </div>-->
<!--      </div>-->
<!--    </el-button>-->
    <div class="topup-btn-box">
      <el-button class="topup-btn" style="margin-top: 12px" @click="submit" :loading="$store.state.bottonLoading"> {{ $t("提现") }}</el-button>
    </div>
<!--    <safe></safe>-->
  </div>
</template>

<script>
import safe from './safe.vue'
import {sendcode_index_api} from "@/api/user";

export default {
  data() {
    return {
      numList: [50, 100, 200, 500, 1000, 2000, 5000, 10000],
      value: "",
      phone: "",
      code: "",
      idc: [],
      selecQu: "55",
      btnText: "发送验证码",
      bthLoading: false,
      timeId: null
    }
  },
  components: {safe},
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
    selectWithdrawalChannels: {
      default: () => {
      }
    },
    bankAll: {
      default: () => {
      }
    }
  },
  computed: {
    dw() {
      return this.bankAll.currency_symbol
    },
  },
  methods: {
    calcB(num1, num2) {
      const num = (parseInt(num1 / num2 * 100) || 0)
      return (num > 100 ? 100 : num) + "%"
    },
    onInput(e) {
      this.value = this.clearIntegerNum(e)
    },
    calc(num) {
      return this.numFormat(num * this.selectWithdrawalChannels.withdrawal_rate)
    },
    back() {
      this.$emit("back")
    },
    submit() {
      if (!this.value) {
        this.$message({
          showClose: true,
          message: this.$t("请输入提现金额"),
          type: 'error'
        });
        return
      }
      this.$emit("submit", {
        id: this.selectWithdrawalChannels.id,
        price: this.value,
        phone: this.phone,
        code: this.code
      })
    },
    // 获取手机验证码
    async sendPhoneCode() {
      if (!this.phone) {
        this.errorTips("手机不能为空");
        return;
      }
      this.bthLoading = true
      const res = await sendcode_index_api({
        qh: this.selecQu,
        phone: this.phone,
        scene: 'verify'
      })
      this.bthLoading = false
      if (res && res.data.code == 1) {
        this.sendSucces()
        this.successTips(res.data.msg);
      } else {
        this.errorTips(res.data.msg);
      }
    },
    sendSucces() {
      this.btnText = "60s"
      this.timeId = setInterval(() => {
        const num = parseInt(this.btnText)
        if (num == 0) {
          clearInterval(this.timeId)
          this.timeId = null
          this.btnText = "发送验证码"
          return
        }
        this.btnText = `${num - 1}s`
      }, 1000)
    }
  },
  mounted() {
    this.idc = this.$helper.get("idc")
    this.selecQu = this.idc[0].value
  },
  beforeDestroy() {
    this.timeId && clearInterval(this.timeId)
  }
};
</script>

<style scoped lang="less">
.p-wapper {
  background-color: #0D131B;
  border-radius: 18px;
  margin-bottom: 30px;
  color: #829CC5;
  padding: 30px 15px;
  font-size: 14px;
  @media (max-width: 768px) {
    background-color: #2a3546;
    padding: 20px 15px;
    font-size: 13px;
    border-radius: 9px;
  }
}

.p-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
}

.progress-wapper {
  display: flex;
  align-items: center;
}

.progress-wapper1 {
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 14px;
  }
}

.theme-color {
  color: #D96A4C;
}

.progress {
  flex: 1;
  background-color: #FFFFFF;
  height: 16px;
  border-radius: 100vh;
  margin-right: 10px;
  @media (max-width: 768px) {
    height: 10px;
  }
}

.progress-content {
  background: linear-gradient(0deg, #F28E26, #FD644F);
  height: 100%;
  max-width: 100%;
  border-radius: 100vh;
  width: 0%;
}

.recharge-two-wapper {
  //background-image: linear-gradient(to bottom, #01316c, #111923, #111923 122px);
  //border-radius: 10px;
  background: #0A0605;
  color: #fff;
  padding: 20px 58px 59px;
  overflow: auto;

}

.title-wapper {
  padding: 20px 0;
  position: relative;
  cursor: pointer;
  display: inline-block;
}

.btn ::v-deep .el-icon-loading {
  position: relative;
  left: 16px;
  top: 4px;
}

.el-icon-back {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translate(-10px, -50%);
  font-size: 20px;
  margin-bottom: 54px;
}

.input-wapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .bank-title {
    width: 80px;
  }
}

/* .input {
  width: 254px;
} */
.input2 {
  width: 135px;
}

.el-icon-d-arrow-right {
  font-size: 20px;
}

.prefix-icon {
  transform: translate(-5px, 10px);
  color: #fff;
  line-height: 44px;
}

.input-label {
  margin-bottom: 14px;
  font-size: 14px;
}

.num-item {
  width: 99px;
  height: 39px;
  line-height: 39px;
  background-color: #3A495F;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 13px;
  cursor: pointer;
}

.num-item:hover {
  background-color: #2c3642;
}

.num-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 35px;
}

.btn {
  padding: 18px 0;
  overflow: hidden;
}

.btn-content {
  display: flex;
  width: 439px;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 16px;
}

.btn-dw {
  margin-left: 10px;
}

.el-icon-arrow-right {
  margin-left: 4px;
}

.tip-item {
  //color: #829cc5;
  //font-size: 13px;
  //margin-bottom: 11px;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #535353;
}

.tip-title {
  margin-top: 19px;
  margin-bottom: 11px;
  font-size: 18px;
}

.tip {
  margin-bottom: 30px;
}

.vdn-icon {
  width: 30px;
  margin-right: 4px;
}

.num-input-wapper {
  height: 44px;
  background: #161f2c;
  border: 2px solid #2C3748;
  border-radius: 8px;
  margin-bottom: 22px;
  padding: 0 15px;
  display: flex;
  align-items: center;
}

.num-input-wapper span:first-child {
  flex: 1;
}

.sxf-box {
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
}

.sxf-wapper {
  border: 2px solid #223145;
  border-radius: 11px;
  padding: 4px 24px;
  color: #829CC5;
}

.balance {
  display: flex;
  justify-content: space-between;
  color: #9AB5DE;
  padding: 0 16px;
  margin-bottom: 12px;
  font-size: 12px;
}

.sxf-wapper span:last-child {
  color: #4CD964;
}

.btn {
  margin-bottom: 62px;
}

@media screen and (max-width: 555px) {

  .recharge-two-wapper {
    height: 100%;
    padding-left: 27px;
    padding-right: 27px;
    padding-bottom: calc(46px + 44px);
  }

  .btn-content {
    width: calc(100vw - 54px);
    font-weight: normal;
  }

  .el-icon-d-arrow-right {
    margin: 0 4px;
  }

  .input2 {
    width: 145px;
  }

  .title-wapper {
    margin-left: 16px;
  }

  .recharge-two-wapper {
    border-radius: 0;
    //background: #0D131C;
  }

  .num-item {
    width: calc(25% - 7px);
    height: 34px;
    border-radius: 5px;
    line-height: 34px;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .btn {
    padding: 12px 0;
  }
}

.progress-tips {
  font-size: 12px;
  margin-top: 2px;
}

.question-wapper {
  display: flex;
  align-items: center;
}

.el-icon-question {
  margin-left: 10px;
  font-size: 18px;
}

.qhClass-input {
  > ::v-deep(.el-input__inner) {
    padding-left: 90px;
  }
}

.qhClass {
  height: 44px;
  width: 80px;
  display: flex;
  align-items: center;
  border: none;
  margin-left: -12px;

  ::v-deep .el-input__inner {
    border: none !important;
    background-color: transparent;
    padding-left: 14px;
  }
}

::v-deep .is-disabled {
  color: #cbcbcb;
  background: #2a3546 !important;
}
.topup-btn-box{
  display: flex;
  justify-content: center;
}
.topup-btn{
  background: #FF7D1E;
  height: 52px;
  width: 420px;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
}
</style>
