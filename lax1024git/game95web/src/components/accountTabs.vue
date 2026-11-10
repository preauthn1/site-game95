<template>
  <div class="category-tabs page-account__tabs">
    <router-link :to="item.link" aria-current="page" :class="['tab',active==index?'active':'']" v-for="item,index in tabsList" :key="index">
      <span class="tab__icon">
        <img
          :src="item.icon"
          :alt="$t(item.name)"
        />
      </span>
      <span class="tab__title">{{ $t(item.name) }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props:{
    active:{
      default:0
    }
  },
  data(){
    return {
      tabsList:[
        {name:"我的账户",icon:require('@/assets/images/icon-my-account.79f1d6e.png'),link:"/account"},
        {name:"交易",icon:require('@/assets/images/icon-transactions.9e4cc46.png'),link:"/transactions"},
        {name:"游戏历史",icon:require('@/assets/images/icon-game-history.c57a6ff.png'),link:"/game-history"},
        {name:"账户设置",icon:require('@/assets/images/setting.png'),link:"/setting"},
      ]
    }
  }
};
</script>

<style scoped>
.category-tabs {
  background: linear-gradient(180deg, rgba(28, 37, 50, 0), #1c2532);
  border-radius: 14px;
  display: flex;
  align-items: center;
}

.tab {
  border-radius: 14px;
  display: flex;
  align-items: center;
}

.tab {
  padding: 15px 25px;
  flex: 1 1;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  -webkit-transform: translateZ(0);
  -webkit-perspective: 1000;
}
.tab__icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
}
.tab__title{
    font-weight: 600;
    white-space: nowrap;
    z-index: 1;
    color: #fff;
    font-size: 16px;
    text-align: center;
}
.tab:before {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 0;
    transition: opacity 0.1s ease-in-out;
}
.tab.active:before {
    background: linear-gradient( 180deg, rgba(34, 131, 246, 0), rgba(34, 131, 246, 0) 20%, rgba(34, 131, 246, 0.15) 60%, rgba(34, 131, 246, 0.4) );
    opacity: 1;
}
.tab:hover:not(.active):before {
    background: linear-gradient(180deg, rgba(22, 31, 44, 0), #1a2534);
    opacity: 1;
}
@media (max-width: 576px) {
  .tab__title {
    font-size: 12px;
  }
  .tab__icon {
    width: 30px;
    height: 30px;
  }
}
</style>
