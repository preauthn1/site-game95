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
    <none v-if="wtAllBank.length==0" @setting="setting"></none>
    <div class="bank-list" v-else>
      <div class="bank-item" v-for="(item,index) in wtAllBank" :key="index" @click="submit(item)">
        <div class="item-title">
          <img src="@/assets/images/ban-icon.png" alt="" class="bank-icon">
          <span>{{ item.bank_name }}</span>
        </div>
        <div class="item-num">
          {{ item.bank_number.slice(0,4) }}***************{{ item.bank_number.slice(-4) }}
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
          value: "选项1",
          label: "黄金糕",
          icon: require("@/assets/images/usdt.svg"),
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  props:{
    wtAllBank:{
      default:()=>[]
    },
  },
  components:{FA,none},
  methods:{
    submit(item){
      this.$emit("submit",item)
    },
    setting(){
      this.$emit("setting")
    },
    childEvt(value) {
      this.$emit('parent-event', value);
      console.log(value,'tixian-----');
    }
  }
}
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
.bank-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 80px;
}
.bank-item{
  width: 236px;
  /* aspect-ratio: 1.59; */
  /* padding: 27px 16px; */
  padding-bottom: 30.3%;
  background-image: url(../../assets/images/bank-bg2.png);
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 14px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.item-title{
  display: flex;
  align-items: center;
  font-size: 12px;
  position: absolute;
  padding: 0 19px;
  top: 19px;
  width: 100%;
}
.item-num{
  font-size: 14px;
  text-align: center;
  position: absolute;
  padding: 0 19px;
  bottom: 19px;
  width: 100%;
}
.bank-icon{
  width: 34px;
  height: 24px;
  margin-right: 9px;
}
@media screen and (max-width:555px) {
  .bank-item{
    width:calc(50% - 5px);
    margin-bottom: 12px;
    /* padding: 16px 10px; */
  }

  .more{
    text-align: center;
    color: #2774E8;
    font-size: 12px;
    display: block;
    margin-bottom: 100px;
  }
  .bank-list{
    margin-bottom: 25px;
  }
  .bank-icon{
    width: calc(20px * 1.2);
    height: calc(14px * 1.2);
  }
  .item-num{
    font-size: 12px;
  }
}
</style>
