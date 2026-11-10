<template>
  <div>
    <div class="back-wapper">
      <span @click="back">{{ $t("返回") }}</span>
    </div>
    <div class="title-wapper">{{ $t("推荐奖金") }}</div>
    <div class="action-item" v-for="item,index in list" :key="index" @click="tabItem(index)">
      <div class="action-item-content">
        {{ item.news_title }}
      </div>
      <div :class="['action-item-btn',active==index?'action-item-btn-ac':'']"></div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    list:{
      default:()=>[]
    },
    active:{
      default:()=>0
    }
  },
  methods:{
    tabItem(index){
      this.$emit("submit",index)
      this.back()
    },
    back(){
      this.$parent.isActionList = false
    }
  }
}
</script>

<style scoped>
.back-wapper{
  padding: 20px 0;
}
.title-wapper{
  color: #68707D;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.title-wapper::before{
  content: "";
  height: 1.2em;
  width: 6px;
  display: block;
  background-color: #2283F6;
  border-radius: 100vh;
  margin-right: 10px;
}
.action-item{
  padding-bottom: 35.3%;
  background-image: url(~@/assets/images/action-bg.png);
  background-size: 100% 100%;
  margin-bottom: 18px;
  position: relative;
  cursor: pointer;
}
.action-item-btn{
  width: 24px;
  height: 24px;
  border: 2px solid #FFF;
  background-color: #111923;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
}
@media (max-width:768px) {
  .action-item-btn{
    width: 20px;
    height: 20px;
  }
}
.action-item-btn-ac{
  background-color: #682FFF;
}
.action-item-content{
  width: 36%;
  position: absolute;
  left: 14%;
  top: 50%;
  transform: translateY(-50%);
  color: #593B10;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 这里是超出几行省略 */
}
@media (max-width:768px) {
  .action-item-content{
    font-size: 16px;
  }
}
</style>