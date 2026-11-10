<template>
  <div
    class="app"
    :class="
      `${openedleft ? 'opened-left-panel' : ''}${
        openedcontests ? ' opened-contests-panel' : ''
      }`
    "
  >
    <Head
      :flagShow="openedleft"
      :isMobile="isMobileFlag"
      @menuClick="menuClick"
    />
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="title-wapper">
            <div class="title">{{ $t("我的收藏") }}</div>
            <div class="manage-wapper" @click="isCtr = !isCtr">
              <!-- <img src="@/assets/images/manage-icon.png" class="manage-icon"> -->
              <span>{{ isCtr?$t("取消"):$t("管理") }}</span>
            </div>
          </div>

          <!-- 骨架屏 -->
          <div  class="games__row" v-if="isLoading">
            <div class="skeleton-wapper"  v-for="item,index in 18" :key="index">
              <el-skeleton animated>
                <el-skeleton-item  slot="template" variant="image" class="skeleton-item" />
              </el-skeleton>
            </div>
          </div>
          <none v-else-if="list.length==0"></none>
          <div class="games__row" v-else>
            <div class="col" v-for="(item, index) in list" :key="index">
              <game-item :isCtr="isCtr" @cancelFavorite="cancelFavorite(index)" :item="item" :index="index"></game-item>
            </div>
          </div>
          <div class="game-footer" v-if="page!=-1">
            <el-button
            :class="gameListDataLoading ? 'button_loading' : ''"
            type="button"
            class="button button_lg button_grey1 button_center"
            @click="getList"
          >
            <span class="button__inner">
              <span class="button__text">{{ $t("Load more") }}</span>
            </span>
          </el-button>
          </div>
          
        </div>
      </div>
      <Foot />
    </div>
    <asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
    <div
      class="app-overlay"
      v-if="isMobileFlag"
      :class="openedleft ? 'visible' : ''"
      @click="menuClick"
    ></div>
    <gameInfoPop />
  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import gameItem from "@/components/games/gameItem.vue";
import { collect_index } from "@/api/cybSports";
import gameInfoPop from '@/components/gameInfoPop.vue'
export default {
  name: "Home",
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    gameItem,
    gameInfoPop
  },
  data() {
    return {
      list: [],
      page:0,
      limit:18,
      gameListDataLoading:false,
      isLoading:false,
      isCtr:false
    };
  },
  methods: {
    async getList() {
      if(this.page==-1) return
      this.page++
      this.gameListDataLoading = true
      const res = await collect_index({ page: this.page, limit: this.limit, type: 0 });
      this.gameListDataLoading = false
      if (res.data.code == 1) {
        this.list = this.list.concat(res.data.data);
        if(res.data.data.length<this.limit){
          this.page = -1
        }
      }
    },
    cancelFavorite(index){
      this.list.splice(index,1)
    },
    menuClick() {
      this.openedleft = !this.openedleft;
    },
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
    },
  },
  mounted() {},
  async created() {
    this.isPhone();
    this.isLoading = true
    await this.getList();
    this.isLoading = false
  },
};
</script>
<style scoped>
.games__row {
  grid-template-columns: repeat(6, 1fr);
  display: grid;
  grid-gap: 24px;
}

@media (max-width: 800px) {
  .games__row {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1032px) {
  .opened-left-panel .games__row {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1125px) {
  .opened-right-panel .games__row {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1140px) {
  .opened-contests-panel .games__row {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1357px) {
  .opened-left-panel.opened-right-panel .games__row {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1372px) {
  .opened-left-panel.opened-contests-panel .games__row {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 500px) {
  .games__row {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}

@media (max-width: 732px) {
  .opened-left-panel .games__row {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}

@media (max-width: 825px) {
  .opened-right-panel .games__row {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}

@media (max-width: 840px) {
  .opened-contests-panel .games__row {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}

@media (max-width: 1057px) {
  .opened-left-panel.opened-right-panel .games__row {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}

@media (max-width: 1072px) {
  .opened-left-panel.opened-contests-panel .games__row {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}

.title {
  font-weight: bold;
  font-size: 24px;
}
@media screen and (max-width:768px) {
  .title {
    font-size: 16px;
  }
}
.game-footer{
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
.skeleton-wapper{
  padding-top: 133.34%;
  position: relative;
}
.skeleton-item{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 14px;
}
.manage-icon{
  width: 16px;
  height: 16px;
  margin-right: 11px;
}
.manage-wapper{
  display: flex;
  align-items: center;
  background-color: #1C2532;
  border-radius: 8px;
  padding: 6px 19px;
  transition: opacity .4s;
}
.manage-wapper:active{
  opacity: .6;
  user-select: none;
}
@media screen and (min-width:768px) {
  .manage-wapper{
    display: none;
  }
}
.title-wapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
</style>
