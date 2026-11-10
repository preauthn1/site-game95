<template>
  <div class="purse">
            <top-up @setting="cardClick" :withdrawalRules="withdrawal_rules" :userWithdrawalAmount="user_withdrawal_amount"
                    :wtRnum="wtRnum" :wtMinimum="wtMinimum" :ver_withdrawal_first="ver_withdrawal_first" :wtHighest="wtHighest" @ConfirmWithdrawal="finish" :bankAll="bankAll"
                    :allUsdt="allUsdt" :dep_address="dep_address" :allBank="[...allBank, ...allPix]"
                    :wtAllBank="[...wtAllPix, ...wtAllBank]" :wtAllUsdt="wtAllUsdt" :rechargeList="rechargeList" ref="top"></top-up>

  </div>
</template>
<script>
import TopUp from "@/views/purse/components/TopUp/index.vue";
// import wallet from "@/components/wallet/index.vue";
import {WalletMixin} from "@/mixins/WalletMixin";
import {EventBus} from "@/common/eventBus";

export default {
  name: "index",
  mixins: [WalletMixin],
  components: {TopUp},
  data() {
    return {
      // activeName: 'first',
      // withdrawal_rules:undefined,
      // user_withdrawal_amount:undefined,
      // wtRnum:undefined,
      // wtMinimum:undefined,
      // ver_withdrawal_first:undefined,
      // wtHighest:undefined,
      // bankAll:undefined,
      // allUsdt:[],
      // wtAllPix:undefined,
      // wtAllBank:undefined,
      // wtAllUsdt:undefined,
      // rechargeList:[],
      // dep_address:undefined,
      // allBank:[],
      // allPix:[],
      // allBankInfo:undefined
    }
  },
  async mounted() {
    this.$refs.top.isLoading = true
    await this.rechargeGetAll()
    this.$refs.top.isLoading = false
    // this.getRechargeParame();
    this.getWithdrawLimit();
    this.getWithdrawList();
    // EventBus.$emit('purse', '1334')
  },
  methods: {
    handleClick() {

    },
    cardClick() {
      EventBus.$emit('cardClick', '1334')
    },
    finish() {

    }
  }
}
</script>
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
.purse {
  //padding: 11px;
  min-height: 100vh;
  background: #0A0605;
}
</style>
