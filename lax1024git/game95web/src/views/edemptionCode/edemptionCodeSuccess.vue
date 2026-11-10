<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="el-dialog-center2 el-dialog-transparent2"
    width="auto"
  >
    <div class="box">
      <img
        src="@/assets/images/edemptionCodeSuccess.png"
        alt=""
        class="bg-img"
      />
      <div class="btn-wapper" @click="hide">{{ $t("了解") }}</div>
      <div class="num">
        <img
          :src="require('@/assets/images/' + $store.state.currencyIcon)"
          class="currency__icon"
        />
        <span>{{ num }}</span>
        
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      num: "",
    };
  },
  methods: {
    show(num) {
      this.num = num;
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped lang="less">
::v-deep .el-dialog__header {
  display: none;
}
.bg-img {
  width: 100%;
  flex-shrink: 0;
}
.box {
  position: relative;
  width: 522px;
  max-width: 100%;
}
.btn-wapper {
  width: 34%;
  position: absolute;
  left: 51.5%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  bottom: 1%;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  height: 15%;
  cursor: pointer;
  @media (max-width:768px) {
    font-size: 26px;
  }
  @media (max-width:540px) {
    font-size: 20px;
  }
  @media (max-width:320px) {
    font-size: 16px;
  }
}
.num {
  color: #fff;
  position: absolute;
  left: 51.5%;
  transform: translateX(-50%);
  width: 61%;
  bottom: 20%;
  font-size: 46px;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  height: 17%;
  @media (max-width:768px) {
    font-size: 40px;
  }
  @media (max-width:540px) {
    font-size: 30px;
  }
  @media (max-width:320px) {
    font-size: 20px;
  }
}
.currency__icon{
  margin-right: 0.2em;
  width: 1em;
  height: 1em;
}
</style>