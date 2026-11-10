<template>
  <div>
    <!-- <el-select class="select" v-model="value" :placeholder="$t('请选择')">
      <img
        class="prefix-icon"
        slot="prefix"
        :src="require('@/assets/images/usdt.svg')"
      />
      <el-option v-for="item in options" :key="item.value" :value="item.value">
        <div class="el-option-c">
          <img class="sel-icon" :src="item.icon" alt="" v-if="item.icon" />
          <span>{{ item.label }}</span>
        </div>
      </el-option>
    </el-select> -->
    <!-- {{ bankAll.bank_payment_system }} -->
    <div class="sub-title">
      <span>{{ $t("选择支付方式") }}</span>
      <FA @grandchild-event="childEvt"></FA>
    </div>
    <div class="bank-list">
      <div class="bank-item" v-for="(item,index) in list" @click="tabItem(item)" :key="index"
           :class="chooseItem.id==item.id?'choose':''">
        <!--        <img src="@/assets/images/hot-icon.png" class="hot-icon" v-if="item.is_hot==1">-->
        <img :src="item.icon" alt="" class="item-icon">
        <div class="item-content">
          <div class="content-title ell" :title="item.pay_name || item.bank_name ">{{
              item.pay_name || item.bank_name
            }}
          </div>
          <!--          <div class="bank-item-icon-wapper">-->
          <div class="content-num ell" :title="contentNum(item)">{{ contentNum(item) }}</div>
          <!--          </div>-->
        </div>

      </div>
    </div>
    <div class="more" v-if="!isMore && allBank.length>6">
      <span @click="isMore=!isMore">{{ $t("展示更多") }}</span>
    </div>
  </div>
</template>

<script>
import myTabs from "@/components/myTabs.vue";
import FA from "./FA.vue";

export default {
  data() {
    return {
      options: [],
      value: "",
      isMore: false,
      chooseItem: {}
    };
  },
  props: {
    allBank: {
      default: () => []
    },
    bankAll: {
      default: {}
    }
  },
  components: {FA, myTabs},
  computed: {
    list() {
      return this.isMore ? this.allBank : this.allBank.slice(0, 6)
    }
  },
  mounted() {
    console.log('legalCurrencyRecharge')
    this.$nextTick(() => {
      console.log('legalCurrencyRecharge')
      if (!this.chooseItem.id) {
        this.chooseItem = this.list[0];
        this.$emit("submit", this.list[0]);
      }
    })
  },
  methods: {
    /**
     * 格式化最小-最大充值
     * @param {Object} item 列表循环的item
     * */
    contentNum(item) {
      return `${item.currencyApi.currency_symbol}${this.numFormat(item.pay_min_amout || item.min_amcount)} - ${item.currencyApi.currency_symbol}${this.numFormat(item.pay_max_amout || item.max_amcount)}`
    },

    /**
     * 卡片点击事件，点击进行充值下一步
     * @param {Object} item 列表循环的item
     * */
    tabItem(item) {
      this.chooseItem = item;
      this.$emit("submit", item)
    },
    childEvt(value) {
      this.$emit('parent-event', value);
    }
  }
}
</script>

<style scoped lang="less">
.select {
  width: 100%;
  margin-bottom: 24px;
}

.sel-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.prefix-icon {
  width: 20px;
  height: 20px;
  transform: translate(-5px, 10px);
}

.sub-title {
  font-size: 14px;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bank-item {
  //width: 236px;
  width: 32%;
  padding: 12px 0;
  /* aspect-ratio: 1.59; */
  //padding-bottom: 24.5%;
  //background-image: url(../../assets/images/bank-bg3.png);
  //background-size: 100% 100%;
  //position: relative;
  margin-bottom: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  //justify-content: center;
  background: #141414;
  border-radius: 5px;
}

.bank-item:nth-child(3n-1) {
  margin-left: 2%;
  margin-right: 2%;
}

.item-content {
  //width: calc(56%);
  flex: 1;
  //top: 50%;
  //transform: translateY(-50%);
  //position: absolute;
  font-size: 15px;
  //left: 38%;
  //height: 44%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (max-width: 555px) {
    font-size: 11px;
  }
}

.content-time {
  transform: scale(.8);
  transform-origin: 0 0;
}

.ell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bank-list {
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  //margin-bottom: 25px;
}

.more {
  text-align: center;
  color: #2774E8;
  font-size: 12px;
  display: block;
  margin-bottom: 100px;
}

.more span {
  cursor: pointer;
}

.item-icon {
  //width: 25%;
  //left: 6%;
  //position: absolute;
  //top: 35%;
  //transform: translateY(-50%);
  //border-radius: 20%;
  margin: 0 12px;
  width: 31px;
  height: 31px;
  @media (max-width: 555px) {
    width: 22px;
    height: 22px;
  }

  border-radius: 50%;
}

.bank-item-icon-wapper {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 16px 20px;
  font-size: 14px;
  @media (max-width: 555px) {
    font-size: 12px;
    padding: 10px 12px;
  }
}

.bank-item-icon-wapper img {
  width: 16.66%;
  flex: 1;
}

.hot-icon {
  width: 20%;
  position: absolute;
  right: 0;
  top: 0;
}

@media screen and (max-width: 555px) {
  .bank-item {
    //width:calc(50% - 5px);
    width: 32%;
    margin-bottom: 12px;
  }

  .sub-title {
    margin-bottom: 9px;
  }

  .bank-list {
    margin-bottom: 25px;
  }

  .item-content {
    //height: 50%;
  }

  .content-time {
    width: 130%;
  }
}

.content-title {
  color: #84F100;
  font-size: 15px;
  @media (max-width: 555px) {
    font-size: 11px;
    //padding: 10px 12px;
  }
}

.content-num {
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 10px;
  color: #6D6F74;
}

.choose {
  border: 1px solid #FF7D1E;
}
</style>
