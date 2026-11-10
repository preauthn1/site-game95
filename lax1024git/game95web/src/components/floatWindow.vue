<template>
  <div class="float-wapper" @touchmove.prevent="touchmove" @touchstart="touchstart"  @touchend="touchend" :style="`right: ${right}px;bottom:${bottom}px`" ref="floatWapper">
    <el-collapse-transition>
      <div :class="['icon-wapper']" v-show="isShow">
        <div :class="['__icon',isShow?'icon-animation':'']" v-for="item,index in list" @click="toPage(item)" :key="index">
          <img :src="item.img" alt="">
        </div>
      </div>
    </el-collapse-transition>
    
    <div class="__icon __icon-def" @click="changeShow">
      <div :class="['icon-bg',!isShow?'icon-bg-ac':'']" ref="icon">
        <i class="el-icon-caret-top el-icon"></i>        
      </div>
      <img src="@/assets/images/kefu-icon.png" alt="">
    </div>
    
  </div>
</template>

<script>
import {service_list_api} from '@/api'
export default {
  data(){
    return {
      isShow:false,
      list:[],
      touchStartData:null,
      right:"",
      bottom:"",
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    touchmove(e){
      if(!this.touchStartData) return
      let x,y;
      if(e.changedTouches && e.changedTouches[0]){
        const {clientX,clientY} = e.changedTouches[0]
        x = clientX
        y = clientY
      }else{
        const {clientX,clientY} = e
        x = clientX
        y = clientY
      }
      this.right = this.touchStartData.oldRight + (this.touchStartData.clientX  - x)
      this.bottom = this.touchStartData.oldBottom + (this.touchStartData.clientY  - y)
      this.limitPosition()
    },
    limitPosition(){
      if(this.bottom<60){
        this.bottom=60
      }
      if(this.bottom > (window.innerHeight - this.$refs.icon.offsetWidth*1.3 - 64)){
        this.bottom = window.innerHeight -this.$refs.icon.offsetWidth*1.3 - 64
      }
      if(this.right<0){
        this.right=0
      }
      if(this.right > (window.innerWidth - this.$refs.floatWapper.offsetWidth)){
        this.right=window.innerWidth - this.$refs.floatWapper.offsetWidth
      }
    },
    touchstart(e){
      if(e.changedTouches && e.changedTouches[0]){
        this.touchStartData = e.changedTouches[0]
      }else{
        this.touchStartData = e
      }
      this.right = window.innerWidth - this.$refs.floatWapper.offsetLeft - this.$refs.floatWapper.offsetWidth
      this.bottom = window.innerHeight - this.$refs.floatWapper.offsetTop - this.$refs.floatWapper.offsetHeight
      this.touchStartData.oldRight = this.right
      this.touchStartData.oldBottom = this.bottom
    },
    touchend(){
      this.touchStartData = null
    },
    changeShow(){
      this.isShow = !this.isShow
    },
    toPage(item){
      if(item.link.startsWith("http")){
        this.platUrl(item.link)
      }else{
        this.$router.push(item.link)
      }
    },
    async getList(){
      const {data} = await service_list_api()
      if(data.code==1){
        this.list = data.data
      }
    }
  }
}
</script>

<style scoped lang="less">
.float-wapper{
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 99;
  background-color: rgba(0,0,0,.2);
  padding: 6px;
  border-radius: 10px;
  cursor: pointer;
  @media (min-width: 769px) {
    right: 30px !important;
    bottom: 60px !important;
  }
}
.__icon{
  width: 40px;
  height: 40px;
  margin: 10px 0;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.icon-animation{
  animation: 3s icon infinite;
  animation-delay: 0.4s;
}
@keyframes icon {
  0%{
    margin: 10px 0;
  }50%{
    margin: 20px 0;
  }100%{
    margin: 10px 0;
  }
}

.__icon-def{
  border-radius: 50%;
  margin: 0;
  position: relative;
  img{
    transform: scale(.86);
    border-radius: 50%;
  }
  .el-icon-caret-top{
    position: absolute;
    top: 0;
    color: red;
    left: 50%;
    transform: translate(-50%,-60%);
    z-index: 2;
    color: rgb(255, 191, 0);
  }
}
.icon-bg{
  background: linear-gradient(60deg,rgb(243, 238, 188),rgb(255, 191, 0));
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 50%;
  transition: all .3s;
}
.icon-bg-ac{
  transform: rotate(180deg);
}
.icon-wapper{
  overflow: hidden;
  .__icon:first-child{
    margin-top: 0 !important;
  }
}
</style>