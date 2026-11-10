<template>
  <div>
    <!-- <el-select class="select" v-model="value" :placeholder="$t('请选择')">
      <img
        class="prefix-icon"
        slot="prefix"
        :src="require('@/assets/images/usdt.svg')"
      />
      <el-option v-for="item,index in digitalWalletList" :key="index" :value="item.name" :label="item.name">
        <div class="el-option-c">
          <img class="sel-icon" :src="item.img" alt="" v-if="item.img" />
          <span>{{ item.name }}</span>
        </div>
      </el-option>
    </el-select> -->
    <div class="sub-title">
      {{ $t("选择支付网络") }}
      <FA @grandchild-event="childEvt"></FA>
    </div>

    <div class="bank-list">
      <div class="bank-item" v-for="(item, index) in allUsdt" :key="index" @click="tabItem(item)">
        <div class="bank-item-content">
            <div class="icon-wapper">
              <img :src="item.icon" alt="">
              <img :src="item.icon" alt="">
            </div>
            <span>{{ item.pay_name || item.bank_name }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="sub-title">{{ $t("选择支付网络") }}</div>
    <myTabs
      class="tabs-sub"
      :list="allUsdt.map(item=>item.pay_name)"
      :isIconDef="true"
    ></myTabs> -->
  </div>
</template>

<script>
import myTabs from "@/components/myTabs.vue";
import VueQr from "vue-qr";
import FA from "./FA.vue";
export default {
  data() {
    return {
      value: "",
    };
  },
  props:{
    // 数字钱包列表
    digitalWalletList:{
      default:()=>[]
    },
    allUsdt:{
      default:()=>[]
    },
    dep_address:{
      default:()=>""
    }
  },
  watch:{
    digitalWalletList:{
      handler(){
        this.value = this.digitalWalletList[0].name
      },
      deep:true,
      immediate: true,
    }
  },
  components: { VueQr, FA, myTabs },
  methods:{
    /**
     * 卡片点击事件，点击进行充值下一步
     * @param {Object} item 列表循环的item
     * */ 
     tabItem(item){
      this.$emit("submit",item)
    },
    childEvt(value) {
      this.$emit('parent-event', value);
    }
  }
};
</script>

<style scoped>
.code-input {
  width: 315px;
  height: 123px;
  background: #111923;
  border: 2px solid #2c3748;
  border-radius: 9px;
  color: #829cc5;
  font-size: 14px;
  padding: 8px;
  position: relative;
}
.copy-icon {
  width: 34px;
  height: 34px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
  z-index: 999;
}
.copy-icon img {
  width: 100%;
}
.sub-title {
  font-size: 14px;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.vue-qr {
  border-radius: 10px;
}
.code-wapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
  position: relative;
}
.code-page {
  padding-left: 20px;
}
.input-wapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.input {
  width: 284px;
}
.input2 {
  width: 121px;
}
.el-icon-d-arrow-right {
  font-size: 20px;
}
.prefix-icon {
  width: 20px;
  height: 20px;
  transform: translate(-5px, 10px);
}
.tip-item {
  color: #829cc5;
  margin-left: 19px;
  font-size: 13px;
}
.tip-title {
  margin-top: 19px;
  margin-bottom: 11px;
}
.tip {
  margin-bottom: 50px;
}
.select {
  width: 100%;
  margin-bottom: 24px;
}
.sel-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.qr-wapper{
  width: 122px;
  height:122px;
  flex-shrink: 0;
}
.copy-btn{
  display: none;
}
.tabs-sub{
  width: 100%;
}
::v-deep .tabs-box{
  width: 100%;
}


.bank-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 80px;
}
.bank-item {
  width: 236px;
  /* aspect-ratio: 1.59; */
  padding-bottom: 30.3%;
  background-image: url(../../assets/images/bank-bg4.png);
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 14px;
  font-size: 14px;
  color: #000;
  cursor: pointer;
}

.bank-item-content{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  padding-right: 10%;
}
.icon-wapper img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.icon-wapper img:first-child{
  opacity: .3;
  margin-right: -20px;
}
.icon-wapper img:last-child{
  position: relative;
  z-index: 2;
}
.icon-wapper {
  display: flex;
  align-items: center;
  margin-right: 13px;
}
.bank-item-content span{
  font-size: 18px;
  /* font-weight: bold; */
}
.item-title {
  display: flex;
  justify-content: space-between;
}
.item-num {
  font-size: 12px;
  text-align: center;
}



@media screen and (max-width:555px) {
  .qr-wapper{
    width: 103px;
    height:103px;
    flex-shrink: 0;
    margin-left: 9px;
  }
  .code-input{
    height: 72px;
    font-size: 12px;
    flex: 1;
  }
  .code-page {
    padding-right: 20px;
  }
  .copy-btn{
    background-color: #1BB83D;
    position: absolute;
    bottom: -5px;
    width: calc(100% - 103px - 9px) ;
    font-size: 12px;
    height: 29px;
    text-align: center;
    line-height: 29px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .copy-icon-xs{
    width:14px;
    position: absolute;
    left:13px;
  }
  .copy-icon{
    display: none;
  }
  .tip{
    margin-left: -18px;
    margin-right: -18px;
  }
  .input2 {
    width: 180px;
  }
  .el-icon-d-arrow-right{
    margin: 0 5px;
  }



  .bank-item {
    width: calc(50% - 5px);
    margin-bottom: 12px;
  }

  .more {
    text-align: center;
    color: #2774e8;
    font-size: 12px;
    display: block;
    margin-bottom: 100px;
  }
  .bank-list {
    margin-bottom: 25px;
  }
}
</style>
