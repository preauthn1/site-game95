<template>
  <div class="none-wapper">
    <span>{{ $t("未检测到账户") }}</span>
    <el-button class="button_blue" @click="setting">{{ $t("去设置") }}</el-button>
  </div>
</template>

<script>
export default {
  methods:{
    setting(){
      this.$emit("setting")
    }
  }
}
</script>

<style scoped>
.none-wapper{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 100px 0;
  font-size: 22px;
}
.button_blue{
  margin-left: 16px;
  font-size: 22px;
  padding-top: 8px;
  padding-bottom: 8px;
}
@media screen and (max-width:555px) {
  .none-wapper{
    font-size: 15px;
  }
  .button_blue{
  font-size: 15px;
  }
}
</style>