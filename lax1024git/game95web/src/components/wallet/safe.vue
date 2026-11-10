<template>
  <div class="safe-box">
    <div class="safe-wapper">
      <img src="@/assets/images/safe.png" class="safe-icon">
      <div class="safe-content">
        {{ $t("由cyber Raccoon 官方和可信赖三方提供存取安全。") }}<br>
        {{ $t("如果存在质疑，请联系我们的") }}<span class="link" @click="toLiveSuppert">{{ $t("在线客服") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    toLiveSuppert() {
      const ua = navigator.userAgent
      let service_url = this.$t('service_url');
      if (/android/i.test(ua) || /iphone|ipad|ipod/i.test(ua)) {
        service_url = this.$t('mobile_service_url');
        if (/android/i.test(ua)) {
          window.open(service_url, '_blank');
        } else {
          window.location.href = service_url;
        }
      } else {
        window.open(service_url, '_blank');
      }
    },
  },
}
</script>

<style scoped>
.safe-wapper{
  width: 329px;
  border: 2px solid #317D48;
  border-radius: 12px;
  padding: 15px 24px;
  flex-shrink: 0;
  word-wrap: break-word;
  word-break:normal;
}
.safe-icon{
  width: 34px;
  height: 38px;
  margin-right: 24px;
}
.safe-box{
  display: flex;
  align-items: center;
  justify-content: center;
}
.safe-wapper{
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #738DB6;
}
.link{
  display: inline;
  cursor: pointer;
}
</style>