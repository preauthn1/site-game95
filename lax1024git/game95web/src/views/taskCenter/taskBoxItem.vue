<template>
  <div class="task-item-wapper">
    <div @click="tabItem"><img :src="require('@/assets/images/task-box.png')" :class="['task-box-icon', data.is_receive==1 || !progress?'task-box-icon-dis':'']"></div>
    <div class="task-item-content" @click="tabItem" v-loading="loading">
      <img class="bi-icon" :src="require('@/assets/images/vnd.png')" alt="" v-if="data.bl_or_amount>0">
      <img class="bi-icon" style="transform: scale(.9);" :src="require('@/assets/images/integral.png')" v-else>
      <span class="item-num">{{ data.bl_or_amount>0?data.bl_or_amount:data.integral_amount }}</span>
      <div class="tip" v-if="data.is_receive==1">{{ $t("已领取") }}</div>
    </div>
    <div class="progress">
      <div class="progress-bg" :style="`width:${progress}%`"></div>
      <div :class="['progress-content',progress>=50?'progress-content-ac':'']"></div>
    </div>
    <div class="bottom-num">{{ data.max_activity }}</div>
  </div>
</template>

<script>
export default {
  props:{
    progress:{
      type:Number,
      default:0
    },
    data:{
      type:Object
    },
    loading:{
      type:Boolean
    }
  },
  methods:{
    tabItem(){
      if(this.progress && this.data.is_receive!=1){
        this.$emit("tabItem")
      }
    }
  }
}
</script>

<style scoped lang="less">
.tip{
  position: absolute;
  transform: rotate(20deg);
  color: #FFF;
  text-shadow: 0 0 10px #000;
  font-weight: bold;
  font-size: 20px;
  top: 0;
  z-index: 3;
  opacity: .6;
}
.task-item-wapper{
  cursor: pointer;
}
.task-box-icon{
  width: 100%;
  transform: translateX(-5%);
  position: relative;
  z-index: 2;
}
.task-box-icon-dis{
  filter:  grayscale(100%);
}
.bi-icon{
  width: 32px;
  height: 32px;
  object-fit: cover;
  margin: 0 4px;
}
.task-item-content{
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #232837;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20%;
  margin-top: -20%;
  padding-bottom: 12px;
  position: relative;
}
.item-num{
  font-size: 18px;
}
.progress{
  height: 3px;
  background-color: #1D1D1D;
  margin: 33px -8px 26px ;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width:768px) {
    margin: 20px -8px 20px ;
  }
}
.progress-content{
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #1D1D1D;
}
.progress-content-ac{
  background-color: #FFE37D;
  box-shadow: 0 0 4px #FFE37D;
}
.progress-bg{
  position: absolute;
  background-color: #FFE37D;
  box-shadow: 0 0 4px #FFE37D;
  width: 50%;
  height: 100%;
  left: 0;
}
.bottom-num{
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  @media (max-width:768px) {
    font-size: 16px;
  }
}
.task-item-wapper .el-loading-mask{
  top: -60%;
  border-radius: 10px;
}

</style>