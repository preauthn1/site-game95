<template>
  <div>
    <iframe @load="load" v-if="src" class="iframe" id="iframe" :src="src" frameborder="0"></iframe>
    <Head v-if="!isLoading" :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
    <div class="loading-page" v-if="isLoading">
      <div class="loading-box">
        <div class="loading-content">
            <img :src="loadingImg">
            <!-- <span class="loading-txt">50%</span> -->
        </div>
        <div class="loading-wapper">
          
          <div class="loading"></div>
          <div
            class="loading-child"
            v-for="(item, index) in 25"
            :key="index"
            :style="{
              left: `${10 + Math.random() * 70}px`,
              animationDelay: `${Math.random() * 3}s`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import {gsap,Power4} from 'gsap'
export default {
  components: {
    Head
  },
  data() {
    return {
      src: "",
      loadingImg:"",
      isLoading:true,
    };
  },
  mounted() {
    this.isPhone()
    this.src = this.$route.query.src;
    this.loadingImg = this.$route.query.loadingImg
    console.log(Power4)
  },
  methods: {
    load() {
      gsap.to("#iframe",{
        duration:1,
        clipPath:"circle(150% at 100% 100%)",
        onComplete:()=>{
          this.isLoading = false
        }
      })
    },
    menuClick() {
      this.openedleft = !this.openedleft;
    },
  },
};
</script>

<style scoped>
.iframe {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  overflow: hidden;
  z-index: 2;
  clip-path: circle(0% at 100% 100%);
}
.loading-page {
  --loadingSize: 100px;
  --pageHeight: 200px;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #000;
}
.loading-box{
  background-color: #0d131c;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loading-content{
  width: var(--loadingSize);
  height: var(--loadingSize);
  position: absolute;
  z-index: 2;
  transform: scale(.8);
  border-radius: 50%;
  overflow: hidden;
  left: 30px;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-content img{
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  border-radius: 50%;
}
.loading-wapper {
  height: var(--pageHeight);
  padding: 30px;
  box-sizing: content-box;
  animation: filter 10s infinite linear;
  filter: contrast(30);
  background-color: #000;
}
.loading-txt{
  position: relative;
  z-index: 2;
  text-shadow: 0 0 8px #000000;
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
}
@keyframes filter {
  0% {
    filter: contrast(30) hue-rotate(0deg);
  }
  50% {
    filter: contrast(10) hue-rotate(180deg);
  }
  100% {
    filter: contrast(30) hue-rotate(0deg);
  }
}

.loading {
  width: var(--loadingSize);
  height: var(--loadingSize);
  background-color: rgb(79, 186, 70);
  border-radius: 50% 50% 50% 50%;
  filter: blur(4px);
  animation: border 3s infinite linear;
}

@keyframes border {
  0% {
    transform: rotate(0deg);
    border-radius: 50% 45% 40% 35%;
  }
  25% {
    border-radius: 35% 50% 45% 40%;
  }
  50% {
    border-radius: 40% 35% 50% 45%;
  }
  75% {
    border-radius: 45% 40% 35% 50%;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 50% 45% 40% 30%;
  }
}

.loading-child {
  width: 17px;
  height: 17px;
  background-color: rgb(79, 186, 70);
  border-radius: 50%;
  position: absolute;
  bottom: 15px;
  animation: loading-child infinite 3s;
  filter: blur(4px);
  transform: translateY(0) translateX(30px);
}
@keyframes loading-child {
  0% {
    transform: translateY(0) translateX(30px);
  }
  100% {
    transform: translateY(calc(var(--pageHeight) * -1 / 1.3)) translateX(30px);
  }
}
</style>
