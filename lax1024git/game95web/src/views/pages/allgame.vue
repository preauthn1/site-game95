<template>
  <div >
    <div class="wrapper">
      <div class="wrapper__inner" @click="hideSearch">
        <div class="container">
          <el-skeleton :rows="1" :count="1" animated :throttle="500" v-if="!skeletonShow">
            <template slot="template">
              <div class="el-m-b-15 b-pics">
                <div class="b-pic" v-for="item in 3"><el-skeleton-item variant="image" style="width:100%;height:210px;border-radius:10px;" /></div>
              </div>
              <div class="el-m-b-15" style="max-width:100px"><el-skeleton-item variant="text"  /></div>
              <div class="el-m-b-15"><el-skeleton-item variant="h1"  /></div>
              <div class="el-m-b-15" style="max-width:40%"><el-skeleton-item variant="h2"  /></div>
              <div class="games__row">
                <div class="col" v-for="item,index in 24" :key="index">
                  <div class="game-preview" style="display:flex; justify-content: center;align-items: center; height:200px;">
                    <el-skeleton-item variant="image" style="width:100%;height:100%" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
          
          <div class="all-games" v-if="skeletonShow">
            <!-- banner -->
            <banner></banner>
            <div class="overflow-auto">
              <div class="navigation" 
                    v-for="(item, index) in gameClassification" 
                    :class="item.id == tabscur ? 'active' : ''"
                    :key="`gameClassification${index}`" 
                    @click="gameTabChange(item)"
                    :style="`background:${backgroundArray[index]}`">
                      <div class="navigation_item">
                        <img v-lazy="item.icon" class="navigation_images">
                        <div class="navigation_title">{{$t(item.name)}}</div> 
                      </div>
                  </div>
              
            </div>
            <h2 class="all-games__title">
              <span>{{$t('所有游戏')}}</span>
              <div class="search-icon" @click="games_search_show=!games_search_show"></div>
            </h2>
            <div class="lobby">
              <!-- <div class="overflow-auto">
                <div class="lobby-tabs lobby__tabs">
                  <div
                
                    class="tab"
                    v-for="(item,index) in gameClassification"
                    :class="item.id == tabscur?'active':''"
                    :key="`gameClassification${index}`"
                    @click="gameTabChange(item)"
                  >
                    <span class="tab__icon">
                      <img width="18" height="18" v-lazy="item.icon" />
                    </span>
                    <span class="tab__title">{{ $t(item.name) }}</span>
                  这段是注释掉的  <span class="tab__badge" v-if="item.id == tabscur && item.game_count > 0">{{item.game_count}}</span>
                  </div>
                  <div class="search" style="display: none;">
                    <el-input
                      :placeholder="$t('搜索游戏')"
                      size="small"
                      v-model="searchInput"
                      @focus="searchfocus"
                      @blur="searchblur"
                      @input="searchchange"
                    >
                      <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <div class="dropdown-search" v-if="searchShow">
                      <div class="dropdown-search__head" v-if="searchEmpty">
                        <div class="search-head">
                          <span class="search-head__head-info">{{$t('搜索至少需要2个字符')}}</span>
                        </div>
                      </div>
                      <div class="dropdown-search__body" v-else>
                        <div class="search-scroll">
                          <div class="search-scroll__inner">
                            <div
                              class="col"
                              v-for="(item,index) in indexSearchGameList"
                              :key="`indexSearchGameList${index}`"
                            >
                            <game-item :item="item"></game-item>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>-->
              <div class="head-subcategories" v-if="false">
                <div class="head-subcategories__tags">
                  <button @click="onTag('all')" :disabled="tag == 'all'" :class="tag == 'all' ? 'active' : ''" type="button" size="sm" class="button-tab  button-tab_sm button-tab_blue">
                    <span>{{ $t('All') }}</span>
                  </button>
                  <button v-for="(name,index) in tags" :key="`tag${index}`"
                    @click="onTag(name)"
                    :disabled="tag == name" :class="tag == name ? 'active' : ''"
                    type="button" size="sm" class="button-tab button-tab_sm button-tab_blue">
                    <span>{{ $t(name) }}</span>
                  </button>
                </div>
                <div class="provider-select" v-if="gameThirdType.length > 0">
                  <el-select
                    v-model="providerValue"
                    :placeholder="$t('请选择')"
                    style="width: 100%;"
                    popper-class="dw-popper-class"
                    @change="providerChange"
                  >
                    <div class="currency__div" slot="prefix" v-if="thirdicon">
                      <img width="16" height="16" v-lazy="thirdicon" class="currency__icon" />
                    </div>
                    <el-option
                      v-for="(item,index) in gameThirdType"
                      :key="`gameThirdType${index}`"
                      :label="$t(item.tc_name)"
                      :value="item.tc_id"
                    >
                      <span class="currency currency-flex">
                        <img width="20" height="20" v-lazy="item.simple_icon" v-if="item.simple_icon" alt="ETH" class="currency__icon" />
                        <span class="currency__label">{{ $t(item.tc_name) }}</span>
						            <span class="currency__number">{{ $t(item.game_number) }}</span>
                      </span>
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="games" >
                <!-- 游戏服务商 -->
                <!-- <div class="category-provider">
                  <div class="category__head" v-if="false">
                    <div class="category__title">
                      <svgIcon icon="icon-providers" class widthName="24" heightName="24"></svgIcon>
                      <span>{{ $t('Providers') }}</span>
                    </div>
                    <div class="category__head-buttons" v-if="gameThirdType.length > 8">
                      <button
                        type="button"
                        class="button button_md button_grey1 button_center button_only-icon button_only-leftd"
                        aria-label="Previous"
                      >
                        <svgIcon
                          icon="icon-arrow-left-small"
                          class="link__icon"
                          widthName="24"
                          heightName="24"
                        ></svgIcon>
                      </button>
                      <button
                        type="button"
                        class="button button_md button_grey1 button_center button_only-icon button_only-rightd"
                        aria-label="Next"
                      >
                        <svgIcon
                          icon="icon-arrow-right-small"
                          class="link__icon"
                          widthName="24"
                          heightName="24"
                        ></svgIcon>
                      </button>
                    </div>
                  </div>
                  <div class="category__body" v-if="gameThirdType.length > 0">
                    <swiper class="swiper gallery-games" :options="swiperGamesD" ref="swiperThumbse">
                      <swiper-slide v-for="(item,index) in gameThirdType" :key="index" v-if="item.icon != '' && index>0">
                        <div class="provider" :class="tc_cur == item.tc_id?'active':''" @click="providerChange(item.tc_id)">
                          <div class="logotype" >
                            <cyb-img style="width:100%;height:100%;border-radius: 0px;" fit="contain" :src="item.icon" class="lazy-picture__image"></cyb-img>
                          </div>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div> -->
                <div class="game-main"
                  style="min-height: 200px"
                  v-loading="gameListDataLoading"
                  :element-loading-text="$t('加载中')"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                  <div
                    class="games__row" v-if="gameListData.length > 0"
                  >
                    <div
                      class="col"
                      v-for="(item,index) in gameListData"
                      :key="`gameListData${index}`"
                    >
                      <game-item :item="item" @cancelFavorite="cancelFavorite(index)"></game-item>

                    </div>
                  </div>
                  <el-empty v-else :image="$t('no_empty')" :description="$t('暂无数据')" />
                </div>
                <div class="games__footer" v-if="gameListData.length >= 18">
                  <el-button
                    :class="gameListDataLoading ? 'button_loading' : ''"
                    type="button"
                    class="button button_lg button_grey1 button_center"
                    @click="addGameListPage"
                  >
                    <span class="button__inner">
                      <span class="button__text">{{ $t('Load more') }}</span>
                    </span>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
    <gameDialog ref="gameDialog"></gameDialog>
    <!-- <div
      class="app-overlay"
      v-if="isMobileFlag"
      :class="openedleft?'visible':''"
      @click="menuClick"
    ></div> -->
    <gamesSearch v-model="games_search_show"></gamesSearch>
    <gift></gift>
    <gameInfoPop/>
  </div>
</template>
<script>
import CacheMixin from '@/common/CacheMixin'
import Head from "@/components/Head.vue";
import LoginModal from "@/components/LoginModal.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import gameDialog from "@/components/gameDialog.vue";
import gameItem from '@/components/games/gameItem.vue'
import gamesSearch from '@/components/gamesSearch.vue'
import banner from '../index/components/banner.vue'
import gift from '@/components/gift.vue'
import gameInfoPop from '@/components/gameInfoPop.vue'
import {
  game_get_type_api,
  game_login_game_api,
  game_list_api,
  game_third_api
} from "@/api/cybSports";
import { rule_index_api } from "@/api/index";
export default {
  name: 'AllGame',
	mixins: [CacheMixin],
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    gameDialog,
	  LoginModal,
    gameItem,
    banner,
    gamesSearch,
    gift,
    gameInfoPop
  },
  data() {
    return {
      backgroundArray:['linear-gradient(5deg, #17093B, #736DFF)','linear-gradient(5deg, #070E34, #07A9FB)','linear-gradient(5deg, #17093B, #FF6669)','linear-gradient(5deg, #100333, #9C00FF)','linear-gradient(5deg, #19093D, #E646F8)','linear-gradient(to top, #0250c5 0%, #d43f8d 100%)'],
      games_search_show:false,
      showAll: false,
      restaurants: [],
      searchInput: "",
      tabscur: 'all',
      // mobile 筛选
      gameTabicon: require("@/assets/images/icon-lobby.png"),
      gameTabValue: "all",
      gameClassification: [],
      gameListData: [],
      gameListDataLoading: false,
      gameListPage: 1, //游戏列表分页
      gameList_t_id: 0, //第一项
      gameItemLoading: false,
      searchShow: false,
      searchEmpty: true,
      indexSearchGameList: [],
      aboutGameContent:'',
      tags: [],
      tag: 'all',
      // // 三方游戏平台
      thirdicon: require("@/assets/images/all.png"),
      gameThirdType:[],
      gameTc_id: 0, //平台id
      providerValue:0,
      skeletonShow:false,
      tc_cur:0,
      swiperGamesD: {
        navigation: {
          nextEl: ".button_only-rightd",
          prevEl: ".button_only-leftd"
        },
        slidesPerView: 8,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          750: {
            slidesPerView: 6
          },
          1200: {
            slidesPerView: 8,
            spaceBetween: 10
          }
        }
      },
    };
  },
  methods: {
    onTag(name) {
      this.tag = name;
      this.init();
    },
    searchfocus() {
      this.searchShow = true;
      if (this.searchInput) {
        this.searchchange(this.searchInput)
      }
    },
    searchblur() {
      if (this.searchInput == '') {
        this.searchShow = false;
        this.searchInput = "";
        this.indexSearchGameList = [];
        this.searchEmpty = true;
      }
    },
    hideSearch(e, node) {
      let classNames = e.target.getAttribute('class');
      if (
        classNames == 'all-games' || classNames == 'lobby-tabs lobby__tabs' ||
        classNames == 'wrapper__inner' || classNames == 'all-games__title'
        ) {
        this.searchShow = false;
        this.searchInput = "";
        this.indexSearchGameList = [];
        this.searchEmpty = true;
      }
    },
    async searchchange(e) {
      if (e.length > 1) {
        let param = {
          page: 1,
          limit: 18,
          keywords: e
        };
        if (this.gameList_t_id != 'all') {
          param['t_id'] = this.gameList_t_id;
        }
        await game_list_api(param).then(res => {
          if (res && res.data.code == 1) {
            this.indexSearchGameList = res.data.data;
            if (this.indexSearchGameList.length > 0) {
              this.searchEmpty = false;
            } else {
              this.searchEmpty = true;
            }
          }
        });
      }
    },
    // 获取游戏分类
    async getGameGetType() {
      await game_get_type_api().then(response => {
        let res = response.data;
        if (res && res.code == 1) {
          this.gameClassification = res.data;
          if (this.gameClassification.length > 0) {
            this.gameClassification.unshift({
              icon: require("@/assets/images/navigation/collection.png"),
              id: 'collect_id',
              name: '我的收藏',
              sort: 0
            });
            this.gameClassification.unshift({
              icon: require("@/assets/images/navigation/web.png"),
              id: 'all',
              name: '所有游戏',
              sort: 0
            });
            
          }
          this.tags = res.tags;
          if (this.$route.query.tab) {
            this.tabChange(this.$route.query.tab);
          }
        }
      });
    },

    cancelFavorite(index){
      if(this.gameList_t_id=="collect_id"){
        this.gameListData.splice(index,1)
        this.$forceUpdate()
      }
    },
    // 获取游戏列表
    async getGameList(add) {
      let param = {
        page: this.gameListPage,
        limit: 18,
      };
      if (this.gameList_t_id != 'all') {
        param['t_id'] = this.gameList_t_id;
      }
      if (this.tag != '' && this.tag != 'all') {
        param['tag'] = this.tag;
      }
      param['tc_id'] = this.gameTc_id;
      if(param.t_id=="collect_id"){
        // 判断登录
        if (!this.$store.state.isLoginStatu) {
          this.showLoginReg(1);
          return;
        }
      }
      this.gameListDataLoading = true;
      await game_list_api(param).then(response => {
        let res = response.data
        if (res && res.code == 1) {
          this.gameListData = add ? res.data : this.gameListData.concat(res.data);
          this.tags = res.tags;
          this.skeletonShow = true
        }
        this.gameListDataLoading = false;
      });
    },
    // 获取游戏路径
    async getGameGetUrl(game_status, gid, item) {
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(1)
		    // this.$refs.loadinModal.loginVisible = true
        return
      }
      if (item && item.g_is_self == 1 && item.g_exfield != '' && item.g_exfield != null) {
        this.goUrl(item.g_exfield);
        return;
      }
      if (item && item.g_tcid == 15) {
        this.goUrl('/sport-betting');
        return;
      }
      if (game_status == 1) {
        this.gameListDataLoading = true;
        let platform = 0;
        if (this.isMobileFlag) {
          platform = 2;
        } else {
          platform = 1;
        }
        let param = {
          platform,gid
        }
        await game_login_game_api(param).then(res => {
          if (res && res.data.code == 1) {
            // this.platUrl(res.data.data);
            this.$router.push({path:'/game-detail',query:{id:item.id}})
          } else {
            this.$notify({
              customClass: "noticeClass",
              dangerouslyUseHTMLString: true,
              duration: "3000",
              message:
                '<div class="notice-bar">' +
                '<div class="bar-ico">⚔️</div>' +
                '<div class="flex_bd">' +
                `<div class="notice-tit">${this.$t("通知")}</div>` +
                `<div class="notice-desc">${this.$t(res.data.msg)}</div>` +
                "</div>" +
                "</div>"
            });
          }
          this.gameListDataLoading = false;
        });
      } else {
        this.$notify({
          customClass: "noticeClass",
          dangerouslyUseHTMLString: true,
          duration: "3000",
          message:
            '<div class="notice-bar">' +
            '<div class="bar-ico">⚔️</div>' +
            '<div class="flex_bd">' +
            `<div class="notice-tit">${this.$t("通知")}</div>` +
            `<div class="notice-desc">${this.$t("暂未开放")}</div>` +
            "</div>" +
            "</div>"
        });
      }
    },
    // 多页加载
    addGameListPage() {
      this.gameListPage++;
      this.getGameList();
    },
    init() {
      this.gameListPage = 1;
      this.gameListData = [];
      this.getGameList("add");
    },
    gameTabChange(item) {
      this.getThirdType(item.id)
      this.gameTabValue = item.id;
      this.gameTabicon = item.icon;
      this.tabscur = item.id;
      this.gameList_t_id = item.id;
      this.tc_cur = 0
      this.gameTc_id = 0
      this.$router.push(
        {
          path: this.$route.path,
          query: {
              share_code:this.$helper.get("userInfo")?this.$helper.get("userInfo").rec_code:'',
              tab: item.id,
          }
       }
      )

      this.init();

    },
    tabChange(id) {
      for (let i in this.gameClassification) {
        if (this.gameClassification[i].id == id) {
          this.gameTabChange(this.gameClassification[i]);
          break;
        }
      }
    },
    showToggle() {
      this.showAll = !this.showAll;
    },
    getRule(type) {
      const self = this
      const key = 'tc_content_' + type + '_' + this.$helper.getLang()

      if (this.$helper.get(key)) {
        this.aboutGameContent = this.$helper.get(key).content
      }
      rule_index_api(type).then(response => {
        if (response && response.data.code == 1) {
          const data = response.data.data
          if (data) {
            this.aboutGameContent = data.content;
          } else {
            this.errorTips('没有内容');
          }
        }
      })
    },
  
    listenTab() {
      if ( this.$route.query.tab && this.$route.query.tab != this.gameList_t_id) {
        this.tabChange(this.$route.query.tab);
      }
      if ( this.$route.query.ptid) {
        this.providerChange(this.$route.query.ptid);
      }
      
    },
    // 获取三方游戏平台
    async getThirdType(id="") {
      await game_third_api(id=='all'?'':id).then(response => {
        let res = response.data;
        if (res && res.code == 1) {
          this.gameThirdType = res.data;
          if (this.gameThirdType.length > 0) {
            this.gameThirdType.unshift({
              icon: require("@/assets/images/all.png"),
              tc_id: 0,
              tc_name: '所有平台',
              sort: 0
            });
          }
        }
        if (this.$route.query.ptid) {
            this.providerChange(this.$route.query.ptid);
            this.providerValue = parseInt(this.$route.query.ptid)
          }
      });
    },
    providerChange(e) {
      this.tc_cur = e;
      // this.tabscur = 'all';
      // this.gameList_t_id = 'all';
      // this.gameTabicon = require("@/assets/images/icon-lobby.png");
      // this.gameTabValue = "all";
      
      for(let i in this.gameThirdType){
        if(this.gameThirdType[i].tc_id == e){
          this.thirdicon = this.gameThirdType[i].simple_icon
          this.gameTc_id = this.gameThirdType[i].tc_id
          this.$router.push({
              path: this.$route.path,
              query: {
                share_code:this.$helper.get("userInfo")?this.$helper.get("userInfo").rec_code:'',
                  ptid: this.gameThirdType[i].tc_id
              }
          });
        }
      }
      this.init();
    },
  },
  mounted() {
    if (this.$route.query.tag) {
      this.tag = this.$route.query.tag;
    }
    
    this.getGameGetType();
    if (!this.$route.query.ptid) {
      this.getGameList();
    }
    // this.getRule(11)
    this.getThirdType()
  },
  created() {
    this.isPhone();
  },
  watch:{
    $route (to, from){
      this.listenTab();
    }
  },
};
</script>
<style scoped lang="less">
/* all game */
.lobby,
.lobby__tabs {
  position: relative;
}
.overflow-auto{
  margin-top: 29px;
  margin-bottom: 28px;
  display: flex;
  gap: 16px;
  overflow: auto;
  .active{
    border: 2px solid #FFAB00;
  }
  .navigation{
    width: 75px; 
    height: 80px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    cursor:pointer;
    .navigation_item{
      margin:19px 33px 56px 33px;
      .navigation_images{
        width: 66px; 
        height: 30px;
        object-fit: contain;
      }
      .navigation_title{
        margin-top: 6px;
        font-size: 12px; 
        text-align: center;
        white-space: nowrap;
        }
    }
  }
}
.lobby__tabs {
  z-index: 6;
}

.lobby__search {
  margin-bottom: 48px;
}

@media (max-width: 1000px) {
  .lobby__search {
    margin-bottom: 44px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .lobby__search {
    margin-bottom: 44px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .lobby__search {
    margin-bottom: 44px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .lobby__search {
    margin-bottom: 44px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .lobby__search {
    margin-bottom: 44px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .lobby__search {
    margin-bottom: 44px;
  }
}

@media (max-width: 768px) {
  .lobby__search {
    margin-bottom: 40px;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .lobby__search {
    margin-bottom: 40px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .lobby__search {
    margin-bottom: 40px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .lobby__search {
    margin-bottom: 40px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .lobby__search {
    margin-bottom: 40px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .lobby__search {
    margin-bottom: 40px;
  }
}

.games {
  padding-bottom: 24px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .games {
    margin-top: 12px;
  }
}
@media (max-width: 1000px) {
  .games {
    padding-bottom: 84px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .games {
    padding-bottom: 84px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .games {
    padding-bottom: 84px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .games {
    padding-bottom: 84px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .games {
    padding-bottom: 84px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .games {
    padding-bottom: 84px;
  }
}

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

.games__footer {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

.filters.only-search {
  grid-template-columns: 1fr;
  grid-template-areas: "input";
}

.head-subcategories {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  min-height: 44px;
}

@media (max-width: 900px) {
  .head-subcategories {
    display: block;
  }
}

@media (max-width: 1132px) {
  .opened-left-panel .head-subcategories {
    display: block;
  }
}

@media (max-width: 1225px) {
  .opened-right-panel .head-subcategories {
    display: block;
  }
}

@media (max-width: 1240px) {
  .opened-contests-panel .head-subcategories {
    display: block;
  }
}

@media (max-width: 1457px) {
  .opened-left-panel.opened-right-panel .head-subcategories {
    display: block;
  }
}

@media (max-width: 1472px) {
  .opened-left-panel.opened-contests-panel .head-subcategories {
    display: block;
  }
}

.head-subcategories__tags {
  flex: 1 1;
}

@media (max-width: 900px) {
  .head-subcategories__tags {
    margin-bottom: 24px;
  }
}

@media (max-width: 1132px) {
  .opened-left-panel .head-subcategories__tags {
    margin-bottom: 24px;
  }
}

@media (max-width: 1225px) {
  .opened-right-panel .head-subcategories__tags {
    margin-bottom: 24px;
  }
}

@media (max-width: 1240px) {
  .opened-contests-panel .head-subcategories__tags {
    margin-bottom: 24px;
  }
}

@media (max-width: 1457px) {
  .opened-left-panel.opened-right-panel .head-subcategories__tags {
    margin-bottom: 24px;
  }
}

@media (max-width: 1472px) {
  .opened-left-panel.opened-contests-panel .head-subcategories__tags {
    margin-bottom: 24px;
  }
}

.head-subcategories__dropdown {
  min-width: 248px;
}

.head-subcategories.button-tab {
  text-transform: capitalize;
}
.lobby-tabs {
  background: #161f2c;
  border-radius: 14px;
  padding: 8px;
  display: flex;
  width:max-content;
  min-width: 100%;
  justify-content: space-between;
}

.tab {
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #93acd3;
  text-decoration: none;
  background-color: transparent;
  border-radius: 7px;
  margin-right: 6px;
  padding: 6px 15px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  flex-shrink: 0;
  
}
@media (min-width:768px) {
  .tab{
    display:flex;
    align-items: center;
  }
}
.tab:hover {
  color: #fff;
}

.tab__icon {
  width: 30px;
  height: 30px;
  display: inline-block;
  text-align: center;
}
@media (min-width:768px) {
  .tab__icon{
    margin-right: 10px;
  }
}
.tab__icon img {
  display: block;
  width: 100%;
  height: auto;
}

.tab__title {
  white-space: nowrap;
  display: block;
}

.tab__badge {
  color: #3a07f2;
  margin-left: 8px;
  font-weight: 700;
  font-size: 10px;
  padding: 1px 6px;
  background: #fff;
  border-radius: 4px;
}

.tab.active {
  background-color: #db1de7;
  color: #fff;
}

.tab-item {
  display: flex;
  align-items: center;
}

.tab-item i {
  height: 1.5em;
  width: 1.5em;
}

.tab-item img {
  margin-right: 0.5em;
  width: 70%;
  height: 70%;
}

@media (max-width: 768px) {
  .all-games {
    padding-bottom: 30px;
  }
  .games{
    padding-bottom:var(--padding);
  }
}

.all-games.games {
  padding-bottom: 30px;
}

.game-preview {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  background-color: #202a39;
  display: block;
  -webkit-transform: translateZ(0);
  -webkit-perspective: 1000;
}

.game-preview__loading-freespins {
  background-color: rgba(27, 34, 51, 0.8);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.game-preview__loading-freespins h5 {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #fff;
}

.game-preview__progress {
  width: 40px;
  height: 40px;
  position: relative;
}

.game-preview.hover .game-preview__hover,
.game-preview:hover .game-preview__hover {
  opacity: 1;
}

.game-preview.hover .center,
.game-preview:hover .center {
  justify-content: center;
}

.game-preview.hover .game-preview__inner,
.game-preview:hover .game-preview__inner {
  filter: blur(3px);
}

.game-preview.hover .game-preview__image,
.game-preview:hover .game-preview__image {
  transform: scale(1.05);
}

.game-preview.hover .game-preview__name,
.game-preview:hover .game-preview__name {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 947px) {
  .game-preview.hover .game-preview__name,
  .game-preview:hover .game-preview__name {
    display: none;
  }
}

@media (max-width: 1179px) {
  .opened-left-panel .game-preview.hover .game-preview__name,
  .opened-left-panel .game-preview:hover .game-preview__name {
    display: none;
  }
}

@media (max-width: 1272px) {
  .opened-right-panel .game-preview.hover .game-preview__name,
  .opened-right-panel .game-preview:hover .game-preview__name {
    display: none;
  }
}

@media (max-width: 1287px) {
  .opened-contests-panel .game-preview.hover .game-preview__name,
  .opened-contests-panel .game-preview:hover .game-preview__name {
    display: none;
  }
}

@media (max-width: 1504px) {
  .opened-left-panel.opened-right-panel .game-preview.hover .game-preview__name,
  .opened-left-panel.opened-right-panel
    .game-preview:hover
    .game-preview__name {
    display: none;
  }
}

@media (max-width: 1519px) {
  .opened-left-panel.opened-contests-panel
    .game-preview.hover
    .game-preview__name,
  .opened-left-panel.opened-contests-panel
    .game-preview:hover
    .game-preview__name {
    display: none;
  }
}

.game-preview.hover .game-preview__btn-play,
.game-preview.hover .game-preview__lock,
.game-preview:hover .game-preview__btn-play,
.game-preview:hover .game-preview__lock {
  opacity: 1;
}

.game-preview.hover .game-preview__provider,
.game-preview:hover .game-preview__provider {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 947px) {
  .game-preview.hover .game-preview__provider,
  .game-preview:hover .game-preview__provider {
    display: none;
  }
}

@media (max-width: 1179px) {
  .opened-left-panel .game-preview.hover .game-preview__provider,
  .opened-left-panel .game-preview:hover .game-preview__provider {
    display: none;
  }
}

@media (max-width: 1272px) {
  .opened-right-panel .game-preview.hover .game-preview__provider,
  .opened-right-panel .game-preview:hover .game-preview__provider {
    display: none;
  }
}

@media (max-width: 1287px) {
  .opened-contests-panel .game-preview.hover .game-preview__provider,
  .opened-contests-panel .game-preview:hover .game-preview__provider {
    display: none;
  }
}

@media (max-width: 1504px) {
  .opened-left-panel.opened-right-panel
    .game-preview.hover
    .game-preview__provider,
  .opened-left-panel.opened-right-panel
    .game-preview:hover
    .game-preview__provider {
    display: none;
  }
}

@media (max-width: 1519px) {
  .opened-left-panel.opened-contests-panel
    .game-preview.hover
    .game-preview__provider,
  .opened-left-panel.opened-contests-panel
    .game-preview:hover
    .game-preview__provider {
    display: none;
  }
}

.game-preview__shield {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 95px;
  height: 23px;
  background-size: 95px 23px;
  background-position: 50%;
  background-repeat: no-repeat;
  -webkit-transform: translateZ(0);
  -webkit-perspective: 1000;
  transform: translateZ(1px);
}

.game-preview__shield_promo {
  background-image: url(../../assets/images/promo.png);
}

.game-preview__shield_popular {
  background-image: url(../../assets/images/popular.png);
}

.game-preview__shield_hot {
  background-image: url(../../assets/images/hot.png);
}

.game-preview__shield_top {
  background-image: url(../../assets/images/top.png);
}

.game-preview__shield_new {
  background-image: url(../../assets/images/new.png);
}

.game-preview__shield_tournament {
  background-image: url(../../assets/images/tournament.png);
}

.game-preview__shield_battles {
  background-image: url(../../assets/images/battle.png);
}

.rtp .icon-preview svg {
  fill: #93acd3;
}

.game-preview__inner {
  position: relative;
  overflow: hidden;
  padding-top: 133.34%;
}

.game-preview__image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.1s ease-in-out;
}

.game-preview__image img {
  -o-object-fit: cover;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
}

.game-preview__hover {
  background-color: rgba(27, 34, 51, 0.8);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  z-index: 1;
  padding: 19px 10px 13px;
  transition: opacity 0.1s ease-in-out;
  -webkit-transform: translateZ(0);
  -webkit-perspective: 1000;
  transform: translateZ(1px);
}

@media (max-width: 947px) {
  .game-preview__hover {
    justify-content: center;
  }
}

@media (max-width: 1179px) {
  .opened-left-panel .game-preview__hover {
    justify-content: center;
  }
}

@media (max-width: 1272px) {
  .opened-right-panel .game-preview__hover {
    justify-content: center;
  }
}

@media (max-width: 1287px) {
  .opened-contests-panel .game-preview__hover {
    justify-content: center;
  }
}

@media (max-width: 1504px) {
  .opened-left-panel.opened-right-panel .game-preview__hover {
    justify-content: center;
  }
}

@media (max-width: 1519px) {
  .opened-left-panel.opened-contests-panel .game-preview__hover {
    justify-content: center;
  }
}

.game-preview__name {
  opacity: 0;
  transform: scale(0.9);
  color: #fff;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-align: center;
  max-width: 70%;
  display: -webkit-box;
  display: block;
  font-size: 14px;
  height: 36.4px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

@media (max-width: 576px) {
  .game-preview__name {
    font-size: 12px;
    height: 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}

@media (max-width: 808px) {
  .opened-left-panel .game-preview__name {
    font-size: 12px;
    height: 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}

@media (max-width: 901px) {
  .opened-right-panel .game-preview__name {
    font-size: 12px;
    height: 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .game-preview__name {
    font-size: 12px;
    height: 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .game-preview__name {
    font-size: 12px;
    height: 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .game-preview__name {
    font-size: 12px;
    height: 20px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}

.game-preview__provider {
  text-transform: capitalize;
  font-size: 11px;
  text-align: center;
  color: #93acd3;
}

.game-preview__btn-play,
.game-preview__provider {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.game-preview__btn-play {
  width: calc(40% + 20px);
  min-width: 42px;
  background-color: #ed1d49;
  border-radius: 50%;
}

.game-preview__btn-play svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #fff;
  width: 20px;
  height: 20px;
}

@media (max-width: 576px) {
  .game-preview__btn-play svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 808px) {
  .opened-left-panel .game-preview__btn-play svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 901px) {
  .opened-right-panel .game-preview__btn-play svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .game-preview__btn-play svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .game-preview__btn-play svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .game-preview__btn-play svg {
    width: 14px;
    height: 14px;
  }
}

.game-preview__btn-play:before {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.button-tab {
  -moz-appearance: none;
  -webkit-appearance: none;
  text-decoration: none;
  align-items: center;
  display: inline-flex;
  vertical-align: middle;
  justify-content: flex-start;
  font-weight: 600;
  line-height: 1.5;
  position: relative;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;
  border: 2px solid transparent;
  color: #93acd3;
  background-color: transparent;
}

.button-tab_sm {
  font-size: 12px;
  border-radius: 10px;
  padding: 5px 10px;
  border-radius: 3rem;
}

.button-tab:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.button-tab.active,
.button-tab:active,
.button-tab:focus,
.button-tab:hover {
  color: #fff;
  background-color: transparent;
}

.button-tab.active,
.button-tab:disabled {
  cursor: default;
  background-color: #3a07f2;
  opacity: 1;
}

.head-subcategories .button-tab {
  text-transform: capitalize;
}

.show-more h2 {
  margin: 20px 0 0;
  font-size: 16px;
}

.show-more h2,
.show-more h3,
.show-more h4 {
  color: #93acd3;
  font-weight: 600;
}

.show-more strong {
  font-weight: 700;
}

.show-more h3,
.show-more h4 {
  margin: 20px 0 0;
  font-size: 14px;
}

.show-more li,
.show-more p {
  color: #55657e;
  font-size: 14px;
}

.show-more ul {
  list-style: disc outside;
  padding-left: 25px;
}

.show-more li {
  margin: 20px 0 0;
}

.show-more li:last-of-type {
  margin-bottom: 20px;
}

.show-more p + p {
  margin-top: 20px;
}

.show-more a {
  text-decoration: none;
}

.show-more__btn {
  display: block;
  margin: 10px auto 0;
}

.show-more__btn .button__icon {
  opacity: 0.5;
  transition: all 0.2s;
}

.show-more__btn--rotate-icon .button__icon {
  transform: rotate(180deg);
}

.show-more__content {
  max-height: var(--max-height);
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease-in-out;
}
.show-more__content p,
.show-more__content span,
.show-more__content div{
  color: #ffffff!important;
}
.show-more__content:after {
  content: "";
  width: 100%;
  height: 130px;
  background: linear-gradient(180deg, rgba(13, 19, 28, 0), #0d131c);
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.show-more__content--full {
  max-height: var(--full-height);
}

.show-more__content--full:after {
  display: none;
}
.show-more__content h3 {
  margin-bottom: 10px;
}
.show-more__content h2 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
.m-search {
  margin-top: 15px;
}
.provider-select ::v-deep .el-input__inner{
  height:36px;
  line-height: 34px;
  background-color: #2a3546!important;
}
.provider-select .currency__div{
  height: 36px;
}
.provider-select ::v-deep .el-input__icon{
  line-height:34px
}
.currency-flex{
	display:flex;
}
.currency-flex .currency__number{
	margin-left:auto;
}


.provider {
  background-color: #1c2532;
  border-radius: 10px;
  cursor: pointer;
  padding: 0 12px;
  transition: background-color 0.1s ease-in-out;
}

.provider,
.provider > img {
  display: block;
  width: 100%;
}

.provider > img {
  all: unset;
  height: auto;
}
.provider:hover,
.provider.active {
  background-color: #3a07f2;
  box-shadow:inset 0 0 1px 1px #87bff2;
}

.logotype {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100% !important;
  height: 40px !important;
  cursor: pointer;
}
.logotype img{
	max-width: 116px;
	max-height: 40px;
  object-fit: contain;
  filter: grayscale(100%) brightness(200%);
}

.provider.active .logotype img{
  filter: grayscale(0%) brightness(100%);
}

@media(max-width:750px){
	.provider {
	  border-radius: 8px;
	  padding: 0 5px;
	}
}


.category__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  min-height: 30px;
}

.category__head-buttons {
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.category__head-buttons a {
  margin-right: 4px;
}

.category__head-buttons button:not(:first-child) {
  margin-left: 8px;
}
.category__head-buttons .button_md {
  min-width: 32px;
  height: 32px;
}
.category__head-buttons .button_md svg {
  width: 20px;
  height: 20px;
}
.category__body {
  position: relative;
}
.category-provider{
  margin-bottom: 30px;
}


.category__title {
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
  text-transform: capitalize;
  text-decoration: none;
  color: #93acd3;
  transition: color 0.1s ease-in-out;
}

.category__title svg {
  fill: #93acd3;
  margin-right: 5px;
  transition: fill 0.1s ease-in-out;
}
.category__title .el-image {
  margin-right: 5px;
}

.category__title:active,
.category__title:focus,
.category__title:hover {
  color: #fff;
}

.category__title:active svg,
.category__title:focus svg,
.category__title:hover svg {
  fill: #fff;
}

.b-pics{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.b-pic{
  width: 32%;
  border-radius: 10px;
  height: 210px;
}
@media(max-width:750px){
  .b-pic{
    width: 100%;
  }
	.info-turntable{
		width: 100%
	}
  .b-pics .b-pic:nth-child(2),
  .b-pics .b-pic:nth-child(3){
    display: none;
  }
}

.all-games__title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.opened-right-search-panel{
  padding-right: 358px;
  @media (max-width:1024px) {
    padding-right: 0;
  }
}
.search-icon{
  width: 52px;
  height: 52px;
  background: #202A39;
  border-radius: 14px;
  background-image: url(~@/assets/images/games-search-icon.png);
  background-size: 150% 150%;
  background-position: 33% 25%;
  cursor: pointer;
}
</style>
