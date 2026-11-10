<template>
    <transition name="fade">
       <div class="cookies_mask" v-if="cookiesAccepted">
           <div class="cookies_container">
               <span class="accept_tips">{{ $t("本网站使用Cookies来确保您在我们的网站上获得最佳体验") }}.</span>
               <button class="accept_btn" @click="acceptCookies">{{ $t('接受所有cookie') }}</button>
           </div>
       </div>
   </transition>
</template>

<script>

export default {
   data() {
       return {
           cookiesAccepted: false
       }
   },
   mounted(){
       if (localStorage.getItem('cookies_accepted') === 'true') {
           this.cookiesAccepted = false;
       }else{
           this.cookiesAccepted = true;
       }
   },
   methods:{
       acceptCookies() {
           // 设置名为 'cookies_accepted' 的本地存储标志
           localStorage.setItem('cookies_accepted', 'true');
           // 更新状态以隐藏提示框
           document.cookie = 'cookies_accepted=true;'
           this.cookiesAccepted = false;
       },
   }
}

</script>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
 transition: opacity 0.5s, transform 0.5s;
}
.fade-enter, .fade-leave-to{
 opacity: 0;
 transform: translateY(100%);
}
.cookies_mask {
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;

   z-index: 9999;
}

.cookies_container {
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: #2C7CBF;
   padding: 24px 16px;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;


}

.accept_tips {
   margin: 10px 0;
}

.accept_btn {
   padding: 8px 12px;
   background: #fff;
   color: #2C7CBF;
   height: fit-content;
   font-size: 14px;
   margin-left: 10px;
}
</style>