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
    <div class="sub-title-wapper">
      <div class="sub-title">{{ $t("提现至") }}</div>
      <div class="add-cart" @click="setting">{{ $t("新增卡片") }}</div>
    </div>
    <none v-if="wtAllUsdt.length==0" @setting="setting"></none>

    <div class="bank-list" v-else>
      <div class="bank-item" v-for="(item, index) in wtAllUsdt" :key="index" @click="submit(item)">
        <div class="bank-item-content">
          <div class="item-title">
            <span>{{item.bank_name}}</span>
            <div class="icon-wapper">
              <img :src="item.img" alt="">
              <img :src="item.img" alt="">
            </div>
          </div>
          <div class="item-num">
            <span v-for="item,index in (item.bank_number.slice(0,4) + '***************' + item.bank_number.slice(-4)) " :key="index">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
    <FA @grandchild-event="childEvt"></FA>
  </div>
</template>

<script>
import FA from "./FA.vue";
import none from "./none.vue";
export default {
  data() {
    return {
      options: [
        {
          value: "USDT",
          label: "USDT",
          icon: require("@/assets/images/usdt.svg"),
        },
      ],
      value: "USDT",
    };
  },
  props:{
    wtAllUsdt:{
      default:()=>[]
    }
  },
  components: { FA ,none},
  methods:{
    submit(item){
      this.$emit("submit",item)
    },
    setting(){
      this.$emit("setting")
    },
    childEvt(value) {
      this.$emit('parent-event', value);
    }
  }
};
</script>

<style scoped>
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
}
.add-cart{
  font-size: 14px;
  color: #3a07f2;
}
.sub-title-wapper{
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  background-image: url(../../assets/images/bank-bg5.png);
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 14px;
  font-size: 14px;
  cursor: pointer;
  color: #000;
}

.bank-item-content{
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 4% 10% 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  top: 0;
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
}
.item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-num {
  font-size: 12px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@media screen and (max-width: 555px) {
  .bank-item {
    width: calc(50% - 5px);
    margin-bottom: 12px;
  }
  .item-title{
    margin: 0 -6px;
  }
  .icon-wapper{
    transform: scale(.8);
    transform-origin: right center;
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
