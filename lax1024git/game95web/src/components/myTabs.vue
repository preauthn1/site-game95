<template>
  <div class="tabs-root">
    <i class="el-icon-arrow-left" @click="pre" v-if="isIcon&&showIcon"></i>
    <div class="tabs-box">
      <div class="_tabs-wapper">
        <!-- <div
          @click="tabItem(i)"
          :class="['tabs-item', i == active ? 'tabs-item-ac' : '']"
          v-for="(item, i) in list"
          :key="i"
        > -->
        <div
          @click="tabItem(i)"
          :class="['newTab-item',i == active ? 'newTab-item-active' : '' ]"
          v-for="(item, i) in list"
          :key="i"
        >
          <img :src="imagesMap.get(item.name)" v-if="imagesMap.get(item.name)" class="newTab-item-img" alt="">
          <img :src="item.icon" alt="" class="newTab-item-img" v-else>
          <span>{{ $t(item.name) }}</span>
        </div>
        <div class="bar" :style="barStyle"></div>
      </div>
    </div>
    <i class="el-icon-arrow-right" @click="next" v-if="isIcon&&showIcon"></i>

  </div>
</template>

<script>
import { list } from 'postcss';

export default {
  props: {
    list: {
      default: [],
    },
    showIcon:{
      default: true,
    }
  },
  data() {
    return {
      active: 0,
      barStyle: {},
      isIcon:false,
      imagesMap:new Map([
        ['全部任务',require('@/assets/images/taskTabs/all.png')],
        ['阶段任务',require('@/assets/images/taskTabs/test.png')],
        ['限时任务',require('@/assets/images/taskTabs/limitedtime.png')],
        ['日常任务',require('@/assets/images/taskTabs/daily.png')],
        ['成就任务',require('@/assets/images/taskTabs/achievement.png')],
        ['全部活动',require('@/assets/images/active/all.png')],
        ['入金',require('@/assets/images/active/gold.png')],
        ['兑换码',require('@/assets/images/active/exchange.png')],
      ]),
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.changeBarLeft(true);
      this.init()
    });
  },
  methods: {
    init(){
      let div = document.getElementsByClassName("tabs-box")[0];
      this.isIcon = (div.scrollWidth > div.clientWidth) || (div.offsetWidth > div.clientWidth)
    },
    tabItem(i) {
      this.active = i;
      this.$emit('change',i)
      /* this.$nextTick(() => {
        let ac = document.getElementsByClassName("tabs-item-ac")[0];
        let box = document.getElementsByClassName("tabs-box")[0];
        let w = ac.offsetWidth;
        box.scrollTo({
          left: ac.offsetLeft - box.offsetWidth / 2 + ac.offsetWidth / 2,
          behavior: "smooth",
        });
        this.changeBarLeft();
      }); */
    },
    next(){
      let box = document.getElementsByClassName("tabs-box")[0];
      box.scrollTo({
          left: box.scrollLeft + box.offsetWidth/2,
          behavior: "smooth",
      });
    },
    pre(){
      let box = document.getElementsByClassName("tabs-box")[0];
      box.scrollTo({
          left: box.scrollLeft - box.offsetWidth/2,
          behavior: "smooth",
      });
    },
    changeBarLeft(init) {
      let ac = document.getElementsByClassName("tabs-item-ac")[0];
      if(!ac) return
      if (init) {
        this.barStyle = {
          width: ac.offsetWidth + "px",
          left: ac.offsetLeft + "px",
        };
      } else {
        this.barStyle = {
          width: ac.offsetWidth + "px",
          left: ac.offsetLeft + "px",
          transition: "all 0.2s",
        };
      }
    },
  },
};
</script>

<style scoped lang="less">
.tabs-root{
  display: flex;
}
.el-icon-arrow-left{
  margin-right: 10px;
  font-size: 12px;
  transform: translateY(14px);
  color: #999;
}
.el-icon-arrow-right{
  margin-left: 10px;
  font-size: 12px;
  transform: translateY(14px);
  color: #999;
}
.tabs-box {
  overflow-x: scroll;
  position: relative;
  margin-bottom: 20px;
}
.tabs-box::-webkit-scrollbar {
  height: 0;
}
._tabs-wapper {
  display: flex;
  gap: 10px;
  cursor: pointer;
  flex-wrap: wrap;
}
.tabs-item {
  margin-right: 40px;
  flex-shrink: 0;
  color: #999;
  line-height: 40px;
  user-select: none;
}
.newTab-item{
  display: flex;
  background: #282f5a;
  border-radius: 8px; 
  padding: 10px;
  .newTab-item-img{
    width: 20px;
    height: 20px;
    margin-right:5px ;
  }
}
.newTab-item-active{
  border: 1px solid #FF7D1E;
  color: #84F100;
}
.tabs-item:hover {
  color: #409eff;
}
.tabs-item-ac {
  color: #409eff;
}
.bar {
  height: 1px;
  width: 0;
  background-color: #409eff;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
