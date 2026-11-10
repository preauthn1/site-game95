<template>
  <div >

    <!-- <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" /> -->
    <div class="wrapper" id="home-wapper">
      <div class="wrapper__inner">
        <div class="container">
          <!-- 未登录 -->
          <div class="intro-wrapper" v-if="false">
            <div class="intro">
              <div class="intro__inner">
                <h1 class="intro__title">
                  <span>{{ $t('主要的') }}</span>
                  {{ $t('加密赌场') }}
                </h1>
                <h2 class="intro__subtitle">{{ $t('享受各种加密游戏') }}</h2>
                <div class="intro__actions">
                  <el-button class="button_red" @click="showLoginReg(1)">{{ $t('注册') }}</el-button>
                  <div class="intro__actions_txt">
                    <span :class="this.$i18n.locale != 'TW' ? 'm-r-5' : ''">{{ $t('获得多次') }}</span>
                    <span>{{ $t('免费旋转') }}</span>
                    <span> + </span>
                    <span :class="this.$i18n.locale != 'TW' ? 'm-r-5' : ''">{{ $t('储值') }}</span>
                    <span>{{ $t('奖励') }}</span>
                  </div>
                  <el-image :src="giftPic" class="liwu-icon" lazy></el-image>
                </div>
              </div>
              <div class="info-turntable">
                <turntable class="turntable"></turntable>
                <!-- 活动轮播 -->
                <activitySwiper v-if="$store.state.activityShow"></activitySwiper>
              </div>
            </div>
            <el-skeleton :rows="1" :count="1" animated :throttle="500" v-if="high_wins.length == 0">
              <template slot="template">
                <div class="el-m-b-15" style="background-color: #161f2c;border-radius: 16px;padding: 10px;">
                  <el-skeleton-item variant="h1" />
                  <el-skeleton-item variant="p" />
                </div>
                <div class="features">
                  <div class="features__inner ">
                    <button class="features__cell features__cell_small">
                      <el-skeleton-item variant="image" style="margin:-12px; width:calc(100% + 24px);height:98px" />
                    </button>
                    <button class="features__cell features__cell_small">
                      <el-skeleton-item variant="image" style="margin:-12px; width:calc(100% + 24px);height:98px" />
                    </button>
                    <!-- 新使用者奖励 -->
                    <button class="features__cell features__cell_small" style="display:none;"></button>
                    <button class="features__cell spin">
                      <el-skeleton-item variant="image"
                        style="margin:-12px; width:calc(100% + 28px);height:calc(100% + 28px)" />
                    </button>
                    <button class="features__cell features__cell_small">
                      <el-skeleton-item variant="image" style="margin:-12px; width:calc(100% + 24px);height:98px" />
                    </button>
                    <button class="features__cell features__cell_small">
                      <el-skeleton-item variant="image" style="margin:-12px; width:calc(100% + 24px);height:98px" />
                    </button>
                  </div>
                </div>
              </template>
            </el-skeleton>
            <template v-if="high_wins.length > 0">
              <!-- 大赢家 -->
              <bigWinner :list="high_wins" v-if="!$store.state.isLoginStatu"></bigWinner>
              <!-- 活动板块 -->
              <activity></activity>
            </template>
          </div>
          <!-- 1 -->
          <el-skeleton :rows="1" :count="1" animated :throttle="500" v-if="!skeletonShow">
            <template slot="template">
              <div class="el-m-b-15 b-pics">
                <div class="b-pic" v-for="item in 3"><el-skeleton-item variant="image"
                    style="width:100%;height:210px;border-radius:10px;" /></div>
              </div>
              <div class="el-m-b-15"><el-skeleton-item variant="h1" style="height:80px;" /></div>
              <div class="el-m-b-15" style="max-width:100%"><el-skeleton-item variant="h2" /></div>
              <div class="el-m-b-15" style="max-width:100px"><el-skeleton-item variant="text" /></div>
              <div class="games__row">
                <div class="col" v-for="item in 12">
                  <div class="game-preview"
                    style="display:flex; justify-content: center;align-items: center; height:200px;">
                    <el-skeleton-item variant="image" style="width:100%;height:100%" />
                  </div>
                </div>
              </div>
            </template>
          </el-skeleton>
          <template v-if="skeletonShow">
            <!-- banner -->
            <banner></banner>
            <merryGoRound></merryGoRound>
            <!-- 大赢家 -->
            <!-- <bigWinner :list="high_wins"></bigWinner> -->
            <!-- jackpot -->
            <jackpot v-if="$t('jackpot_hide') != 'hide'" />
            <!-- <div class="category">
              <div class="category__head">
                <div class="category__title">
                  <svgIcon icon="icon-providers" class widthName="24" heightName="24"></svgIcon>
                  <span>{{ $t('Providers') }}</span>
                </div>
                <div class="category__head-buttons">
                  <button type="button"
                    class="button button_md button_grey1 button_center button_only-icon button_only-leftd"
                    aria-label="Previous">
                    <svgIcon icon="icon-arrow-left-small" class="link__icon" widthName="24" heightName="24"></svgIcon>
                  </button>
                  <button type="button"
                    class="button button_md button_grey1 button_center button_only-icon button_only-rightd"
                    aria-label="Next">
                    <svgIcon icon="icon-arrow-right-small" class="link__icon" widthName="24" heightName="24"></svgIcon>
                  </button>
                </div>
              </div>
              <div class="category__body" v-if="logotypelist.length > 0">
                <swiper class="swiper gallery-games" :options="swiperGamesD" ref="swiperThumbse">
                  <swiper-slide v-for="(item, index) in logotypelist" :key="index" v-if="item.icon != ''">
                    <div class="provider" @click="toProvider(item)">
                      <div class="logotype">
                        <cyb-img style="width:100%;height:100%;border-radius: 0px;" fit="contain" :src="item.icon"
                          class="lazy-picture__image"></cyb-img>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div> -->
            <div class="all-games">
              <div class="lobby">
                <!-- pc filter -->
                <div class="overflow-auto">
                  <div class="navigation" v-for="(item, index) in gameClassification" :class="index == tabscur ? 'active' : ''"
                    :key="`gameClassification${index}`" @click="gameTabChange(index, item.id)"
                    :style="`background:${backgroundArray[index]}`">
                      <div class="navigation_item">
                        <img v-lazy="item.icon" class="navigation_images" alt="">
                        <!-- <img v-lazy="item.icon" v-else class="navigation_images"  alt=""> -->
                        <div class="navigation_title">{{$t(item.name)}}</div> 
                      </div>
                  </div>
                </div>
                <div class="games" v-if="tabscur > 0">
                  <none v-if="gameIndexListHot.length == 0" style="margin:0" v-loading="loading"
                    :element-loading-text="$t('加载中')" element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"></none>
                  <div class="games__row" v-loading="loading" :element-loading-text="$t('加载中')"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                    v-if="!loading || gameIndexListHot.length > 0">
                    <div class="col" v-for="(item, index) in gameIndexListHot" :key="index">
                      <gameItem :item="item" :lazy="false" @cancelFavorite="cancelFavorite(index)"></gameItem>
                    </div>
                  </div>
                  <div v-if="gameIndexListHot.length >= limit" class="games__footer">
                    <button :class="loading ? 'button_loading' : ''" @click="loadMore" type="button"
                      class="button button_lg button_grey1 button_center">
                      <span class="button__inner">
                        <span class="button__text">{{ $t('Load more') }}</span></span>
                    </button>
                  </div>
                </div>
                <template v-if="gameTabId <= 0">
                  <div class="game-main" style="min-height: 200px" v-loading="loading" :element-loading-text="$t('加载中')"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                    <div class="category" v-for="(item, type) in gameIndexListData" :key="`gameIndexListData${type}`">
                      <div class="category__head" v-if="item.game.length > 0">
                        <div class="category__title">
                          <!-- <svgIcon :icon="item.icon"></svgIcon> -->
                          <span class="title_name">{{ $t(item.name) }}</span>
                        </div>
                        <div class="category__head-buttons">
                          <router-link
                            :to="item.name === 'In-House Games' ? '/all-game' : '/all-game?tag=' + item.name.toLowerCase()"
                            class="button button_md button_grey1 button_center a_none">
                            <span class="button__inner">
                              <span class="button__text">{{ $t('全部') }}</span>
                              <span class="arrow">
                                <img src="@/assets/images/navigation/arrow.png" alt="">
                              </span>
                            </span>
                          </router-link>
                        </div>
                      </div>
                      <div class="category__body">
                        <div class="games__row">
                          <div class="col" v-for="(item1, index) in item.game" :key="index">
                            <gameItem :item="item1" :lazy="false" :type="type"></gameItem>
                            <!-- <gameItem :item="item" :lazy="false" @cancelFavorite="cancelFavorite(index)"></gameItem> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template>
                  <div class="provider_names">{{ $t("提供者") }}</div>
                  <div class="provider_icon">
                    <div class="provider_icons" style=" justify-content: space-between">
                      <img src="@/assets/images/provider/123.png" alt="">
                      <img src="@/assets/images/provider/124.png" alt="">
                      <img src="@/assets/images/provider/125.png" alt="">
                    </div>
                  </div>
                  <div class="provider_icon01">
                    <div class="provider_icons">
                      <img src="@/assets/images/provider/126.png" alt="">
                      <img src="@/assets/images/provider/1.png" alt="">
                      <img src="@/assets/images/provider/2.png" alt="">
                    </div>
                  </div>
                </template>
              </div>
            </div>
            
          </template>
        </div>
      </div>
      <Foot />
    </div>
    <!-- <asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar> -->
    <div class="app-overlay" v-if="isMobileFlag" :class="openedleft ? 'visible' : ''" @click="menuClick"></div>
    <!-- 公告 -->
    <welcome :welShow="homeWelcome"></welcome>
    <gameDialog ref="gameDialog"></gameDialog>

    <!-- 下载提示 -->
    <!-- <DownloadTips v-if="$store.state.env != 'app'"></DownloadTips> -->

    <!-- ios书签引导 -->
    <!-- <IosBookmarkGuidance v-if="$store.state.env != 'app'"></IosBookmarkGuidance> -->

    <!-- 顶部提示 -->
    <headerTip></headerTip>
    <gift></gift>

    <!-- 飘窗 -->
    <!-- <floatWindow></floatWindow> -->
    <gameInfoPop />

    <fiveBessingsFirstPop ref="fiveBessingsFirstPop" />
    <fiveBessingsPop ref="fiveBessingsPop" />
  </div>
</template>
<script>
import CacheMixin from '@/common/CacheMixin'
import Head from "@/components/Head.vue";
import LoginModal from "@/components/LoginModal.vue";
import DownloadTips from "@/components/DownloadTips.vue";
import IosBookmarkGuidance from "@/components/IosBookmarkGuidance.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import welcome from "@/components/welcome.vue";
import turntable from "@/components/turntable.vue";
import bigWinner from "./components/bigWinner.vue";
import activity from "./components/activity.vue";
import gameDialog from "@/components/gameDialog.vue";
import activitySwiper from "./components/activitySwiper.vue";
import jackpot from "./components/jackpot.vue";
import gameItem from '@/components/games/gameItem.vue'
import headerTip from '@/components/headerTip.vue'
import merryGoRound from '@/components/merryGoRound.vue'
import banner from './components/banner.vue'
import gift from '@/components/gift.vue'
import floatWindow from '@/components/floatWindow.vue'
import gameInfoPop from '@/components/gameInfoPop.vue'
import fiveBessingsFirstPop from '@/components/fiveBessings/fiveBessingsFirstPop.vue'
import fiveBessingsPop from '@/components/fiveBessings/fiveBessingsPop.vue'
import {
  game_index_api,
  game_get_type_api,
  all_game_order_api,
  game_high_order_api,
  user_game_order_api,
  game_login_game_api,
  game_list_api,
  game_game_list_api,
  game_third_api
} from "@/api/cybSports";
import { wufu_getData_api } from "@/api/wufu"

export default {
  name: 'Index',
  mixins: [CacheMixin],
  components: {
    merryGoRound,
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    welcome,
    turntable,
    bigWinner,
    activity,
    gameDialog,
    DownloadTips,
    activitySwiper,
    jackpot,
    LoginModal,
    gameItem,
    banner,
    headerTip,
    gift,
    IosBookmarkGuidance,
    floatWindow,
    gameInfoPop,
    fiveBessingsFirstPop,
    fiveBessingsPop
  },
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      homeWelcome: false,
      tabscur: 0,
      // mobile 筛选
      gameTabicon: require("@/assets/images/icon-lobby.png"),
      gameTabValue: this.$t("大厅"),
      stakingthumbs: [],
      backgroundArray:['linear-gradient(5deg, #17093B, #736DFF)','linear-gradient(5deg, #070E34, #07A9FB)','linear-gradient(5deg, #17093B, #FF6669)','linear-gradient(5deg, #100333, #9C00FF)','linear-gradient(5deg, #19093D, #E646F8)','linear-gradient(to top, #0250c5 0%, #d43f8d 100%)'],
      swiperOptionThumbs: {
        autoplay: {
          delay: 4500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".splide__arrow--next",
          prevEl: ".splide__arrow--prev"
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 1,
            slidesPerGroup: 1
          },
          1200: {
            slidesPerView: 3
          }
        }
      },
      swiperGamesA: {
        navigation: {
          nextEl: ".button_only-righta",
          prevEl: ".button_only-lefta"
        },
        slidesPerView: 6,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          750: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 6
          }
        }
      },
      swiperGamesB: {
        navigation: {
          nextEl: ".button_only-rightb",
          prevEl: ".button_only-leftb"
        },
        slidesPerView: 6,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          750: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 6
          }
        }
      },
      swiperGamesC: {
        navigation: {
          nextEl: ".button_only-rightc",
          prevEl: ".button_only-leftc"
        },
        slidesPerView: 6,
        spaceBetween: 30,
        breakpoints: {
          640: {
            slidesPerView: 3,
            spaceBetween: 10
          },
          750: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 20
          }
        }
      },
      logotypelist: [
      ],
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
      high_wins: [],
      high_bets: [],
      activeName: "first",
      loginReg: true, //未登录
      gameIndexList: [], //游戏首页
      gameIndexListHot: [], //游戏首页热门
      gameIndexListData: [], //游戏首页
      gameClassification: [], // 游戏分类
      gameIndexOrderList: [], //首页游戏订单
      gameIndexOrderListEmpty: 0, //首页游戏订单缺省
      gameOrderListPage: 1,
      userGameOrderList: [], //首页游戏用户订单
      userGameOrderListEmpty: 0, //首页游戏用户订单缺省
      searchShow: false,
      searchEmpty: true,
      searchInput: "",
      gameTabId: 0,
      page: 1,
      limit: 24,
      loading: false,
      isFilterGame: true,
      indexSearchGameList: [], //搜索游戏列表
      skeletonShow: false,
      giftPic: require('@/assets/images/turntable/liwu.jpeg'),
    };
  },
  methods: {
    async getwufuData() {
      const { data } = await wufu_getData_api()
      if (data.code == 1) {
        this.$store.commit("fiveBessings/updateFiveBessData",data.data)
        // 没有登录判断有数据显示
        if(!this.$store.state.isLoginStatu){
          if(data.data.id){
            this.$refs.fiveBessingsFirstPop.notLoginShow()
          }
        }else{
          // 登录判断次数显示
          if (data.data.num > 0) {
            if (data.data.open_num == 0) {
              this.$refs.fiveBessingsFirstPop.show(data.data)
            } else {
              this.$refs.fiveBessingsPop.show()
            }
          }
        }
        
        
      }
    },
    initEnv() {
      // 判断ios书签算作app
      const env = ("standalone" in window.navigator) && window.navigator.standalone ? "app" : this.$route.query.env
      if (env) {
        this.$store.commit("setEnv", env)
      }
    },
    async toProvider(item) {
      this.$router.push(`/all-game?ptid=${item.tc_id}`)
    },
    // 获取游戏路径
    async getGameGetUrl(game_status, gid, item) {
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        // this.$refs.loadinModal.loginVisible = true
        return;
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
        this.loading = true;
        let platform = 0;
        if (this.isMobileFlag) {
          platform = 2;
        } else {
          platform = 1;
        }
        let param = {
          platform,
          gid
        };
        await game_login_game_api(param).then(res => {
          if (res && res.data.code == 1) {
            if (this.$helper.get("gameInfoHelper")) {
              this.$helper.rm("gameInfoHelper")
            } else {
              let gameArray = []
              gameArray.push({
                icon: item.icon,
                gid: item.id,
                game_name: item.game_name,
                url: res.data.data
              })
              this.$helper.set("gameInfoHelper", gameArray);
              this.$router.push({ path: '/game-detail' });
            }
          } else if (res && res.data.code == 1000) {
            this.showLoginReg(0);
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
          this.loading = false;
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
    searchfocus() {
      this.searchShow = true;
    },
    searchblur() {
      if (this.searchInput == "") {
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
    async getIndexGameList() {
      await game_index_api({ nlimit: 12 }).then(response => {
        let res = response.data;
        if (res && res.code == 1) {
          // console.log(res.data);
          this.gameIndexList = res.data;
          // this.gameIndexListHot = res.data.hot;
          // 数据更改，避免dom改变
          let falseArr = res.data;
          for (let i in falseArr) {
            falseArr[i].paramData = {
              navigation: {
                nextEl: ".button_only-righta-" + (i),
                prevEl: ".button_only-lefta-" + (i),
                nextEl_class: "button_only-righta-" + (i),
                prevEl_class: "button_only-lefta-" + (i)
              },
              slidesPerView: 6,
              spaceBetween: 16,
              breakpoints: {
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10
                },
                750: {
                  slidesPerView: 3
                },
                1200: {
                  slidesPerView: 6
                }
              }
            };
          }
          this.gameIndexListData = falseArr;
          console.log(this.gameIndexListData,'游戏首页数据')
          this.skeletonShow = true
        }
      });
    },
    async getGameListById() {
      this.loading = true;
      await game_game_list_api(this.page, this.limit, this.gameTabId).then(response => {
        let res = response.data;
        this.loading = false;
        if (res && res.code == 1) {
          if (this.page == 1) {
            this.gameIndexListHot = res.data;
            // console.log(this.gameIndexListHot)
          } else {
            for (const key in res.data) {
              if (Object.hasOwnProperty.call(res.data, key)) {
                const element = res.data[key];
                this.gameIndexListHot.push(element)
              }
            }
          }
        }
      });
    },
    // 获取游戏分类
    async getGameGetType() {
      await game_get_type_api().then(res => {
        if (res && res.data.code == 1) {
          this.gameClassification = res.data.data;
          console.log(res.data.data,"获取游戏分类")
          if (this.gameClassification.length > 0) {
            this.gameClassification.unshift({
              icon: require("@/assets/images/navigation/collection.png"),
              id: 'collect_id',
              name: '我的收藏',
              sort: 0
            });
            this.gameClassification.unshift({
              icon: require("@/assets/images/navigation/web.png"),
              id: -1,
              name: this.$t("大厅"),
              sort: 0
            });
          }
        }
      });
    },
    // 获取首页游戏订单
    getGameIndexOrderList() {
      all_game_order_api(this.gameOrderListPage).then(res => {
        if (res && res.data.code == 1) {
          this.gameIndexOrderList = res.data.data;
          if (this.gameIndexOrderList.length > 0) {
            this.gameIndexOrderListEmpty = 1;
          } else {
            this.gameIndexOrderListEmpty = 2;
          }
        }
      });
    },
    getGameHighOrder() {
      game_high_order_api().then(res => {
        if (res && res.data.code == 1) {
          this.high_bets = res.data.data.high_bet;
          this.high_wins = res.data.data.high_win;
        }
      });
    },
    // 获取我的投注
    getUserGameOrder() {
      user_game_order_api().then(res => {
        if (res && res.data.code == 1) {
          this.userGameOrderList = res.data.data;
          if (this.userGameOrderList.length > 0) {
            this.userGameOrderListEmpty = 1;
          } else {
            this.userGameOrderListEmpty = 2;
          }
        }
      });
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
    gameTabChange(index, id) {
      if (id == "collect_id") {
        // 判断登录
        if (!this.$store.state.isLoginStatu) {
          this.showLoginReg(1);
        }
      }
      this.tabscur = index;
      this.gameTabId = id;
      if (id > 0 || id == "collect_id") {
        this.page = 1;
        // this.gameIndexListHot = [];
        this.getGameListById();
      }
    },
    loadMore() {
      this.page += 1;
      this.getGameListById();
    },

    /**
     * 取消收藏，更新列表
     * @param {Number} index 索引
     * */
    cancelFavorite(index) {
      if (this.gameTabId == "collect_id") {
        this.gameIndexListHot.splice(index, 1)
        this.$forceUpdate()
      }
    },
    tabChange(e) {
      for (let i in this.gameClassification) {
        if (this.gameClassification[i].name == e) {
          this.gameTabValue = this.gameClassification[i].name;
          this.gameTabicon = this.gameClassification[i].icon;
          this.gameTabId = this.gameClassification[i].id;
          this.tabscur = this.gameClassification[i].id;
          if (this.gameClassification[i].id > 0 || this.gameClassification[i].id == "collect_id") {
            if (this.gameClassification[i].id == "collect_id") {
              // 判断登录
              if (!this.$store.state.isLoginStatu) {
                this.showLoginReg(1);
              }
            }
            this.page = 1;
            this.gameIndexListHot = [];
            this.getGameListById();
          }
        }
      }
    },
    notice() {
      this.$notify({
        customClass: "noticeClass",
        dangerouslyUseHTMLString: true,
        duration: "5000",
        message:
          '<div class="notice-bar">' +
          '<div class="bar-ico">⚔️</div>' +
          '<div class="flex_bd">' +
          '<div class="notice-tit">Pinned message</div>' +
          '<div class="notice-desc">Watch your bets history for all cryptocurrencies.</div>' +
          "</div>" +
          "</div>"
      });
    },
    orderTab() {
      if (this.activeName == 'first') {
        this.getGameIndexOrderList();
      } else if (this.activeName == 'second') {
        this.getUserGameOrder();
      } else if (this.activeName == 'third' || this.activeName == 'fourth') {
        this.getGameHighOrder();
      }
    },
    //供应商logo
    async getThirdInfo() {
      await game_third_api().then(response => {
        let res = response.data;
        if (res && res.code == 1) {
          this.logotypelist = res.data;
        }
      });
    },
  },
  watch: {
    "$store.state.isLoginStatu": {
      handler() {
        this.getwufuData()
      },
      immediate: true
    },
    "$route.path": function (v) {
      if (v == "/") {
        if (this.$store.state.isLoginStatu) this.getwufuData()
      }
    }
  },
  mounted() {
    this.initEnv()
    // 判断登录状态
    // this.notice() //通知
    this.getGameGetType();
    this.getIndexGameList();
    // this.getGameIndexOrderList();
    // this.getGameHighOrder();
    this.getThirdInfo();
    // 登录数据
    if (this.$store.state.isLoginStatu) {
      this.getUserGameOrder();
    }
  },
  created() {
    this.isPhone();
  },
  destroyed() { }
};
</script>
<style lang="less" scoped>
.lobby__m-cells .el-select {
  margin-bottom: 10px;
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
.provider_names{
  font-family: PingFang SC;
  font-weight: 600;
  color: #FFFFFF;
  @media (min-width:480px) {
    font-size: 30px;
  }
}
.provider_icon{
  margin-left: 50px;
  margin: 10px;
  @media (max-width:750px) {
    margin-left: 20px;
  }
  .provider_icons{
    display: flex;
    justify-content: space-around;
    img{
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: fit-content;
      object-fit: fill;
      @media (max-width:750px){
        max-width: 20%;
        max-height: 20%;
      }
    }

  }
}
.provider_icon01{
  margin-left: 80px;
  margin: 10px;
  @media (max-width:750px) {
    margin-left: 30px;
  }
  .provider_icons{
    display: flex;
    align-items: center;
    justify-content: space-around;
    img{
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: fit-content;
      object-fit: fill;
      @media (max-width:750px){
        max-width: 20%;
        max-height: 20%;
      }
    }
  }
}

/* all game */
.lobby,
.lobby__tabs {
  position: relative;
}

.lobby__tabs {
  margin-bottom: 24px;
  z-index: 6;
}

@media (max-width: 768px) {
  .lobby__tabs {
    margin-bottom: 12px;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .lobby__tabs {
    margin-bottom: 12px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .lobby__tabs {
    margin-bottom: 12px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .lobby__tabs {
    margin-bottom: 12px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .lobby__tabs {
    margin-bottom: 12px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .lobby__tabs {
    margin-bottom: 12px;
  }
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
}

@media (max-width: 1000px) {
  .games {
    /* padding-bottom: 84px; */
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

.lobby-tabs {
  background: #161f2c;
  border-radius: 14px;
  padding: 8px;
  width: max-content;
  min-width: 100%;
  display: flex;
  justify-content: space-between;
}

.tab {
  flex: 1;
  width: 100%;
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
  .tab {
    display: flex;
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
  .tab__icon {
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

@media(min-width:1024px) {

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
}

@media(max-width:1024px) {

  .game-preview.hover .game-preview__hover,
  .game-preview:active .game-preview__hover {
    opacity: 1;
  }

  .game-preview.hover .center,
  .game-preview:active .center {
    justify-content: center;
  }

  .game-preview.hover .game-preview__inner,
  .game-preview:active .game-preview__inner {
    filter: blur(3px);
  }

  .game-preview.hover .game-preview__image,
  .game-preview:active .game-preview__image {
    transform: scale(1.05);
  }

  .game-preview.hover .game-preview__name,
  .game-preview:active .game-preview__name {
    opacity: 1;
    transform: scale(1);
  }
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
  .opened-left-panel.opened-right-panel .game-preview:hover .game-preview__name {
    display: none;
  }
}

@media (max-width: 1519px) {

  .opened-left-panel.opened-contests-panel .game-preview.hover .game-preview__name,
  .opened-left-panel.opened-contests-panel .game-preview:hover .game-preview__name {
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

  .opened-left-panel.opened-right-panel .game-preview.hover .game-preview__provider,
  .opened-left-panel.opened-right-panel .game-preview:hover .game-preview__provider {
    display: none;
  }
}

@media (max-width: 1519px) {

  .opened-left-panel.opened-contests-panel .game-preview.hover .game-preview__provider,
  .opened-left-panel.opened-contests-panel .game-preview:hover .game-preview__provider {
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

.game-preview__image .el-image {
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

.game-preview__btn-star {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0;
  border: none;
  background-color: transparent;
}

.game-preview__btn-star svg {
  display: block;
  fill: #fff;
}

.spinner__bounce {
  background-color: #55657e !important;
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

.progress-wrapper {
  margin-top: 10px;
}

.category {
  content-visibility: auto;
  margin-bottom: 15px;
}

.category__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  min-height: 30px;
}

.category__tooltip {
  margin-left: 8px;
}

.category__tooltip,
.category__tooltip.icon,
.category__tooltip.icon svg {
  width: 20px;
  height: 20px;
}

.category__tooltip.icon svg:hover {
  fill: #93acd3;
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
  .title_name{
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 18px;
    color: #FFFFFF;
  }
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


.category__bonus-all {
  width: 100%;
  text-align: center;
}

.category__footer {
  padding-top: 32px;
  display: flex;
  justify-content: center;
}

.provider {
  background-color: #1c2532;
  border-radius: 14px;
  padding: 0 12px;
  transition: background-color 0.1s ease-in-out;
  cursor: pointer;
}

.provider,
.provider>img {
  display: block;
  width: 100%;
}

.provider>img {
  all: unset;
  height: auto;
}

.provider:hover {
  background-color: #18202b;
}

.provider:active {
  background-color: #151b25;
}

.logotype {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100% !important;
  height: 40px !important;
  cursor: pointer;
}

.logotype img {
  max-width: 116px;
  max-height: 40px;
  object-fit: contain;
  /* filter: grayscale(100%) brightness(200%); */
}

@media(max-width:750px) {
  .logotype {
    height: 40px !important;
  }

  .provider {
    border-radius: 8px;
    padding: 0 5px;
  }
}

.statistics {
  margin-top: 48px;
}

.statistics__body {
  position: relative;
  min-height: 200px;
}

.statistics__inner {
  overflow-x: auto;
  overscroll-behavior-y: auto;
}

.statistics.panel {
  margin-top: 0;
}

.tab-badge {
  font-family: Roboto, serif;
  position: relative;
  top: auto;
  display: block;
  transform-origin: 50% 50%;
  line-height: 1;
  height: 20px;
  font-weight: 600;
  font-size: 12px;
  color: #fff;
  background: #3a07f2;
  margin: 0 -8px 0 8px;
  border-radius: 10px;
  padding: 4px 9px;
}

table.table-all td:first-child,
table.table-all th:first-child,
table.table-battles td:first-child,
table.table-battles th:first-child,
table.table-high td:first-child,
table.table-high th:first-child,
table.table-my td:first-child,
table.table-my th:first-child,
table.table-rare td:first-child,
table.table-rare th:first-child {
  background-color: #0d131c;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
}

.panel table.table-all td:first-child,
.panel table.table-all th:first-child,
.panel table.table-battles td:first-child,
.panel table.table-battles th:first-child,
.panel table.table-high td:first-child,
.panel table.table-high th:first-child,
.panel table.table-my td:first-child,
.panel table.table-my th:first-child,
.panel table.table-rare td:first-child,
.panel table.table-rare th:first-child,
table.table-all .panel td:first-child,
table.table-all .panel th:first-child,
table.table-battles .panel td:first-child,
table.table-battles .panel th:first-child,
table.table-high .panel td:first-child,
table.table-high .panel th:first-child,
table.table-my .panel td:first-child,
table.table-my .panel th:first-child,
table.table-rare .panel td:first-child,
table.table-rare .panel th:first-child {
  background-color: #111923;
}

table {
  width: 100%;
  font-weight: 600;
  font-size: 12px;
}

table td,
table th {
  padding: 8px;
  height: 56px;
  line-height: 1.8;
}

table td:first-child,
table th:first-child {
  padding-left: 16px;
}

table td:last-child,
table th:last-child {
  padding-right: 16px;
}

table th {
  color: #55657e;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
}

table thead th {
  position: relative;
  z-index: 1;
  background-color: #0d131c;
}

.panel table thead th {
  background-color: #111923;
}

table tbody tr {
  -webkit-animation-duration: var(--animation-duration);
  animation-duration: var(--animation-duration);
  -webkit-animation-direction: normal;
  animation-direction: normal;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation-play-state: running;
  animation-play-state: running;
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  will-change: transform, opacity;
}

table tbody tr:first-child {
  -webkit-animation-name: horizont-1-data-v-47b53a9f;
  animation-name: horizont-1-data-v-47b53a9f;
}

table tbody tr:nth-child(2n) {
  -webkit-animation-name: horizont-2-data-v-47b53a9f;
  animation-name: horizont-2-data-v-47b53a9f;
}

table tbody tr:nth-child(odd) {
  -webkit-animation-name: horizont-3-data-v-47b53a9f;
  animation-name: horizont-3-data-v-47b53a9f;
}

table tbody td {
  position: relative;
  vertical-align: top;
  padding: 18px 8px;
}

table tbody td.align-middle {
  vertical-align: middle;
}

table tbody td:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #161f2c;
}

table.no-animation tbody tr {
  -webkit-animation: none;
  animation: none;
}

table.clickable tbody tr {
  cursor: pointer;
}

table.table-battles td:nth-child(3),
table.table-battles th:nth-child(3) {
  min-width: 165px;
}

table.table-battles td:nth-child(4),
table.table-battles th:nth-child(4) {
  width: 200px;
  min-width: 200px;
}

table.table-battles td:last-child,
table.table-battles th:last-child {
  width: 150px;
  min-width: 150px;
}

table.table-online td:first-child,
table.table-online td:nth-child(2),
table.table-online th:first-child,
table.table-online th:nth-child(2) {
  width: 50%;
  min-width: 50%;
}

table.table-online td:nth-child(3),
table.table-online th:nth-child(3) {
  width: 125px;
  min-width: 125px;
}

table.table-rounds td:nth-child(3),
table.table-rounds th:nth-child(3) {
  width: 500px;
  min-width: 500px;
}

table.table-all td:nth-child(4),
table.table-all th:nth-child(4) {
  min-width: 135px;
}

table.table-all td:nth-child(6),
table.table-all th:nth-child(6) {
  width: 125px;
  min-width: 125px;
}

table.table-my td:nth-child(4),
table.table-my th:nth-child(4) {
  min-width: 116px;
}

table.table-my td:nth-child(6),
table.table-my th:nth-child(6) {
  width: 125px;
  min-width: 125px;
}

table.table-high td:nth-child(4),
table.table-high th:nth-child(4),
table.table-rare td:nth-child(4),
table.table-rare th:nth-child(4) {
  min-width: 116px;
}

table.table-high td:nth-child(6),
table.table-high th:nth-child(6),
table.table-rare td:nth-child(6),
table.table-rare th:nth-child(6) {
  width: 125px;
  min-width: 125px;
}

@media screen and (min-width: 1000px) {
  @-webkit-keyframes horizont-1-data-v-47b53a9f {
    0% {
      opacity: 0;
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-1-data-v-47b53a9f {
    0% {
      opacity: 0;
      transform: translateY(-99.99%);
    }
  }

  @-webkit-keyframes horizont-2-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-2-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @-webkit-keyframes horizont-3-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-3-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }
}

.my-bet {
  background-color: #1c2532;
  border-radius: 14px;
}

.my-bet td:first-child {
  background-color: #1c2532 !important;
}

.user {
  display: flex;
  align-items: center;
}

.user--clickable {
  cursor: pointer;
}

.user__avatar {
  position: relative;
  flex-shrink: 0;
}

.user__inner {
  right: 0;
  overflow: hidden;
  border-radius: 50%;
}

.user__inner,
.user__inner img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}

.user__inner img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  display: block;
  width: auto;
  height: 100%;
  max-width: none;
}

.user__level {
  right: -4px;
  bottom: -4px;
  position: absolute;
  background-color: #55657e;
  width: 15px;
  height: 15px;
  text-align: center;
  font-size: 10px;
  line-height: 15px;
  border-radius: 50%;
  color: #fff;
  pointer-events: none;
}

.user__additional-info,
.user__name {
  margin-left: 8px;
}

.user__wrap {
  display: flex;
  flex-direction: column;
}

.user__additional-info {
  letter-spacing: -0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #93acd3;
}


@-webkit-keyframes confetti-down-data-v-40468d4e {
  0% {
    top: -80%;
  }

  to {
    top: 130%;
  }
}

@keyframes confetti-down-data-v-40468d4e {
  0% {
    top: -80%;
  }

  to {
    top: 130%;
  }
}

@-webkit-keyframes pulse-data-v-40468d4e {
  0% {
    transform: translate(-50%) scale(1);
  }

  50% {
    transform: translate(-50%) scale(1.2);
  }

  to {
    transform: translate(-50%) scale(1);
  }
}

@keyframes pulse-data-v-40468d4e {
  0% {
    transform: translate(-50%) scale(1);
  }

  50% {
    transform: translate(-50%) scale(1.2);
  }

  to {
    transform: translate(-50%) scale(1);
  }
}

.wink-boost {
  position: relative !important;
  top: auto !important;
  bottom: auto !important;
  width: 190px;
  z-index: 5;
  margin-top: 8px;
  filter: drop-shadow(4px 4px 30px rgba(0, 0, 0, 0.35));
}

.intro__inner {
  margin-top: 20px;
  z-index: 1;
  max-width: 550px;
}

.intro picture {
  position: absolute;
  max-width: 710px;
  top: 0;
  bottom: 0;
  height: 100%;
  right: 0px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.td-time,
.td-name {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .intro picture {
    right: 50%;
    transform: translate(50%);
    width: 100%;
    top: auto;
    height: auto;
    bottom: 0px;
  }

  .td-name {
    max-width: 120px;
  }
}

.m-search {
  position: relative;
  margin-top: 15px;
}

.view-all {
  display: block;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background: linear-gradient(180deg, rgba(34, 131, 246, 0), #3a07f2);
}

.view-all__hover {
  background-image: url(../../assets/images/view-all.png);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.1s ease-in-out;
}

.view-all__label {
  color: #fff;
  font-size: 18px;
}

.view-all:focus,
.view-all:hover {
  text-decoration: none;
}

.view-all:focus .view-all__hover,
.view-all:hover .view-all__hover {
  transform: scale(1.05);
}

.view-all__label {
  color: #fff;
  font-size: 18px;
}

.td-currency {
  min-width: max-content;
}

.turntable {
  width: 250px;
}

.intro {
  justify-content: space-between;
  padding: 0 60px;
}

@media (max-width: 768px) {
  .intro {
    flex-direction: column-reverse;
    padding: 0;
  }

  .turntable {
    width: 100%;
  }
}

.button_red {
  background-image: linear-gradient(to bottom, #da3f3d, #70191b);
  color: #fff;
  height: 120%;
  text-align: center;
  min-width: 120px;
  border-color: transparent;
  font-size: 20px;
}

.liwu-icon {
  height: 100%;
  border-radius: 10px;
}

.intro__actions_txt {
  flex: 1;
  margin: 0 12px;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 这里是超出几行省略 */
}

.blue {
  color: #5e718d;
}

.intro__title {
  max-width: 400px;
}

@media(max-width:750px) {
  .intro__actions .button_red {
    min-width: 80px;
    height: 114%;
    font-size: 16px;
    padding: 0;
  }

  .intro__actions {
    height: 60px;
  }

  .intro__actions_txt {
    line-height: 1.2;
    -webkit-line-clamp: 3;
    /* 这里是超出几行省略 */
  }

  .liwu-icon {
    width: 36px;
    height: 36px;
  }
}

/* 活动轮播 */
.info-turntable {
  position: relative;
}

.b-pics {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.b-pic {
  width: 32%;
  border-radius: 10px;
  height: 210px;
}

@media(max-width:750px) {
  .b-pic {
    width: 100%;
  }

  .info-turntable {
    width: 100%
  }

  .b-pics .b-pic:nth-child(2),
  .b-pics .b-pic:nth-child(3) {
    display: none;
  }
}

.game-main {
  min-height: 100vh !important;
  .game-main_name{
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 30px;
    color: red;
  }
  .a_none{
    text-decoration: none;
    .button__inner{
    display: flex;
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 21px;
    color: #84F100;
    gap: 10px;
    .arrow{
      margin-top: 8px;
    }
  }
  }
  
}

// .fire-text {
//   text-align: center;
//   font: bold 26px helvetica, arial, sans-serif;
//   color: #F00;
//   padding:24px;  
//   text-shadow: 0 0 4px #FFF, 0 -5px 4px #ff3, 2px -8px 6px #fd3, -2px -15px 11px #f80, 2px -25px 18px #f20;
//   animation: flame 0.5s infinite alternate-reverse;
// }

// @keyframes flame {
//   0% {
//     text-shadow: 0 0 4px #FFF, 0 -5px 4px #ff3, -1px -6px 7px #fd3, -2px -14px 9px #f80, 2px -25px 18px #f20;
//   }
//   20% {
//     text-shadow: 0 0 4px #FFF, 0 -5px 5px #ff3, 1px -7px 8px #fd3, 0px -12px 11px #f80, 0px -20px 18px #f20;
//   }
//   100% {
//     text-shadow: 0 0 4px #FFF, 0 -5px 5px #ff3, 0px -8px 6px #fd3, -1px -15px 11px #f80, -1px -24px 18px #f20;
//   }
// }
</style>
