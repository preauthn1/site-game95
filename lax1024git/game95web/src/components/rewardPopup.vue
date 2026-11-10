<template>
  <div v-if="showPopup" class="reward-popup" @click.self="closePopup">
    <div class="popup-content">
      <img class="img-species" src="@/assets/images/species.png" alt="">
      <div class="reward-info">
        <p>{{ $t("恭喜你成功兑换") }}</p>
        <span>R$ {{reward}}</span>
      </div>
      <button class="close-btn" @click="closePopup">{{$t("关闭")}}</button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    reward: {
      type: String|Number,
      required: true
    }
  },
  data() {
    return {
      showPopup: true
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      this.$emit('close');
    }
  }
};
</script>
  
<style scoped>
.reward-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 0 30px;
}

.popup-content {
  position: relative;
  width: 100%;
  max-width: 307px;
  height: 307px;
  background: #151F2E;
  padding: 20px;
  padding-top: 130px;
  border-radius: 41px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.img-species {
  position: absolute;
  width: calc(100% - 20px);
  height: auto;
  top: -18%;
  left: 50%;
  transform: translateX(-50%);
}

.reward-info {
  text-align: center;
}

.reward-info>p {
  font-size: 18px;
  font-family: Alibaba PuHuiTi;
  font-weight: 500;
  margin-bottom: 6px;
}

.reward-info>span {
  font-size: 36px;
  font-weight: bold;
  color: #FFAB3F;
}

.close-btn {
  width: 160px;
  padding: 8px 16px;
  background: linear-gradient(-6deg, #0B3879, #14838D);
  border: 2px solid #1454AF;
  border-radius: 11px;
  margin: 20px auto 0;
}
</style>