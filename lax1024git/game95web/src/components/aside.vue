<template>
  <div>
    <!-- <transition name="left"> -->
    <aside
        class="fixed pt-16 top-0 left-0 bottom-0 bg-secondary z-1200"
        v-if="isShow"
    >
      <div class="">
        <div class="left-menu-container__inner">
          <div class="left-menu-container__bonuses" :class="flagShow?'top-img':'top-img2'">
            <button class="bonus bonus_furywheel wait" @click="wheelClick" v-if="$t('menu_luckywheel_is_hidden') != 'hide'">
              <cyb-img class="bonus-img" :src="$t('menu_luckywheel')"></cyb-img>
            </button>
            <button class="bonus bonus_furywheel wait" @click="$router.push('/five-bessings')" v-if="$t('menu_five_bessings') != 'menu_five_bessings' && $store.state.fiveBessings.fiveBessData.id">
              <cyb-img class="bonus-img" :src="$t('menu_five_bessings')"></cyb-img>
              <div class="new" v-if="$store.state.fiveBessings.fiveBessData.num"></div>
            </button>
            <button class="bonus bonus_cashback" @click="goUrl('/lotter')" v-if="$t('is_show_lottery_countdown')==1">
              <cyb-img class="bonus-img" :src="require('@/assets/images/lottery.png')"></cyb-img>
              <span class="countdown-txt">{{ countdown }}</span>
            </button>
            <button class="bonus bonus_cashback" @click="goUrl('/sport-betting')"
                    v-if="$t('menu_sport') != 'menu_sport' && $t('sport_is_hidden') != 'hide' ">
              <cyb-img class="bonus-img" :src="$t('menu_sport')"></cyb-img>
            </button>
            <button class="bonus bonus_cashback" @click="goUrl('/layout/edemption-code')"
                    v-if="this.$t('menu_code_bouns') != 'menu_code_bouns'">
              <cyb-img class="bonus-img" :src="$t('menu_code_bouns')"></cyb-img>
            </button>
            <button class="bonus bonus_cashback" @click="goUrl('/?pdd=show')"
                    v-if="this.$t('menu_pdd') != 'menu_pdd' && isShowPdd">
              <cyb-img class="bonus-img" :src="$t('menu_pdd')"></cyb-img>
            </button>
          </div>
          <!--          <div v-if="flagShow" class="top-img">-->
          <!--            <img src="@/assets/images/aside/16.png">-->
          <!--            <img src="@/assets/images/aside/17.png">-->
          <!--          </div>-->
          <!--          <div v-else class="top-img2">-->
          <!--            <img src="@/assets/images/aside/3.png">-->
          <!--            <img src="@/assets/images/aside/4.png">-->
          <!--          </div>-->
          <div class="left-menu-container__menus">

            <el-menu :collapse="!flagShow" class="el-menu-vertical " :router="false" @select="handleSelect">
              <el-menu-item v-for="(item,index) in Menu" :key="index" @click="toPage(item.url,item.link_type)"
                            v-if="item.show != 'hidden'" :index="item.url" class=" bg-primary ">
                <!-- <div @click="toPage(item.url,item.link_type)" class=" flex items-center"> -->
                <el-image :src="item.navpic" v-if="item.navpic" fit="contain" class="w-9 h-9"></el-image>
                <!--                <img :src="item.navpic" v-if="item.navpic" class="w-9 h-9">-->
                <!-- <i class="iconfont" v-else :class="item.icon"></i> -->
                <span slot="title">
                    {{ $t(item.title) }}
                    <i class="new" v-if="item.isNew && $store.state.isLoginStatu"></i>
                </span>
              </el-menu-item>
            </el-menu>


            <!-- <nav class="secondary-menu" v-if="$store.state.env != 'app' && $t('download_app')!='hide' && $store.state.isLoginStatu">
              <button tag="div" @click="downApp" class="download-btn" :style="{backgroundImage:`url(${$t('download_pic')})`}">
                <span class="d-txt">{{ $t("APP Download") }}</span>
                <div class="d-jiangli">
                  <span>28</span>
                  <img src="@/assets/images/php.svg">
                </div>
              </button>

              <el-menu :default-active="activeIndex" class="el-sm-vertical" :router="true">
                <el-menu-item v-for="(item,index) in secondaryMenu" :key="index" :index="item.url">
                  <span>{{ $t(item.title) }}</span>
                </el-menu-item>
                <el-menu-item index="/download">
                </el-menu-item>
              </el-menu>
            </nav> -->
          </div>
          <div class="left-menu-container__footer mt-3">
            <!--	          <el-button @click="toLiveSuppert" class="button button_grey1 button_left button_fullwidth" size="mini">-->
            <!--              <img src="@/assets/images/livechat.png" alt="" class="icon-reddit">-->
            <!--	            <span>{{ $t('Live Support') }}</span>-->
            <!--	          </el-button> &ndash;&gt;-->
            <div class="dropdown_md">
              <el-dropdown @command="handleCommand" placement="top">
                <div class="dropdown__trigger">
                  <div class="icon">
                    <img focusable="false" aria-hidden="true" :src="langIcon" class/>
                  </div>
                  <span class="text">{{ langType }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown" class="dropdown-menu_md lan-dropdown">
                  <el-dropdown-item
                      :command="item"
                      v-for="(item,index) in langArr"
                      :key="`langArr${index}`"
                  >
                    <button class="dropdown-menu__link">
                      <div class="icon">
                        <img :src="item.icon"/>
                      </div>
                      <span class="text">{{ item.label }}</span>
                    </button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <!-- </transition> -->

    <div style="height: 0; overflow: hidden;">
      <audio :src="enterMus" class="media-audio" ref="MusicEnter"></audio>
    </div>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import {lottery_config_api} from "@/api/lottery";
import {pdd_getData_api} from '@/api/pdd.js'

export default {
  components: {
    svgIcon,
  },
  props: {
    flagShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      timeFlag: null,
      countdown: "00:59",
      langIcon: "",
      langType: "",
      activeIndex: this.$route.path,
      isShow: true,
      isShowPdd: false,
      secondaryMenu: [
        // {
        //   title: "Cyber Raccoon Team",
        //   url: "/about-team"
        // },
        // {
        //   title: "Fairness",
        //   url: "/fairness"
        // }
      ],
      wheelShow: false,
      enterMus: require("../assets/mp3/enter.mp3"),
      cashbackPic: require("../assets/images/cashback-bg.png"),
      wheelPic: require("../assets/images/wheel.png"),
      coin1: require("../assets/images/bi.png"),
      coin2: require("../assets/images/cion.png"),
      iosBut: 0,
      windwoWidth: 0,
      isCollapse: false,
      allLangs: []
    };
  },
  methods: {
    downApp() {
      const ua = navigator.userAgent
      if (/iphone|ipad|ipod/i.test(ua)) {
        if (this.iosBut == 0) {
          window.location.href = this.$helper.get("rule").ios_download_url;
          this.iosBut = 1;
        } else {
          window.location.href = "https://www.pgyer.com/app/getProvisionFile";
        }
      } else {
        let android_download_url = this.$helper.get("rule").android_download_url;
        this.platUrl(android_download_url)
      }
    },

    // 获取pdd数据，判断pdd图片是否显示
    async getPddData() {
      const {data} = await pdd_getData_api()
      if (data.code == 1) {
        this.isShowPdd = !(data.data.length === 0)
      }
    },
    initCountdown() {
      this.timeFlag = setInterval(() => {
        const countdown = (60 - new Date().getSeconds()).toString()
        this.countdown = `00:${countdown.length == 1 ? '0' + countdown : countdown}`
      }, 1000)
    },
    // 页面跳转
    toPage(url, type) {
      if (type) {
        console.log(this.$helper.get('rule').pc_service_url,'1111111')
        this.platUrl(url)
      } else {
        this.$router.push({path: url})
      }
    },
    menuToggle(index) {
      var subshow = this.Menu[index].subshow;
      this.Menu[index].subshow = subshow === true ? false : true;
    },
    handleCommand(command) {
      this.langIcon = command.icon;
      this.langType = command.label;
      this.$helper.set('i18n_icon', this.langIcon);
      this.$helper.setLang(command.label);
      this.$i18n.locale = command.label;
      location.reload();
    },
    langChange() {
      // let rule = this.$helper.get("rule");
      this.allLangs = this.$helper.get('alllang')
      this.langIcon = this.$helper.get("i18n_icon");
      this.langType = this.$helper.get("i18n_lang");
    },
    wheelClick() {
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        return;
      }
      this.getLotteryConfig()
      this.wheelShow = true
      this.$refs.fury.bgMusShow && this.$refs.MusicEnter.play()
    },
    async getLotteryConfig() {
      await lottery_config_api().then(response => {
        let res = response.data
        if (res && res.code == 0) {
          this.errorTips(res.msg);
          return;
        }
      });
    },
    wheelClose() {
      this.wheelShow = false
    },
    toDownload() {
      let rule = this.$helper.get('rule');
      let url = this.getMobileOperatingSystem() === 'iOS' ? rule.ios_download_url : rule.android_download_url;
      if (url) {
        this.platUrl(url);
      }
    },
    toLiveSuppert() {
      const ua = navigator.userAgent
      let service_url = this.$t('service_url');
      if (/android/i.test(ua) || /iphone|ipad|ipod/i.test(ua)) {
        service_url = this.$t('mobile_service_url');
        if (/android/i.test(ua)) {
          window.open(service_url, '_blank');
        } else {
          window.location.href = service_url;
        }
      } else {
        window.open(service_url, '_blank');
      }
    },
    handleSelect() {
      this.$store.commit('changeKeepPages', 'empty')
    }
  },
  beforeDestroy() {
    clearInterval(this.timeFlag)
  },
  computed: {
    langTypeIcon() {

    },
    langArr() {
      let _this = this;
      let options = [];
      let selecValue = this.$helper.getLang();
      let all_lang = this.$helper.get("alllang");
      if (all_lang != null) {
        for (let i = 0; i < all_lang.length; i++) {
          options.push(all_lang[i]);
          if (selecValue == all_lang[i].value) {
            _this.currentSelect = all_lang[i];
          }
        }
      }
      return options;
    },
    Menu() {
      let arr1 = [
        {
          title: this.$t("活动厅"),
          navpic: require("../assets/images1/nav1.png"),
          url: "/activity-hall"
        },
        {
          title: this.$t("所有游戏"),
          navpic: require("../assets/images1/nav2.png"),
          url: "/all-game"
        },
        {
          title: this.$t("团队中心"),
          navpic: require("../assets/images1/nav3.png"),
          url: "/team-center"
        },
        {
          title: this.$t("任务中心"),
          navpic: require("../assets/images1/nav4.png"),
          url: "/layout/task-center",
          show: this.$t('task_center_hide') == 'hide' ? "hidden" : '',
          isNew: this.$store.state.msg.taskNoMsg
        },
        {
          title: this.$t("每日签到"),
          navpic: require("@/assets/images1/nav5.png"),
          url: "/singin"
        },
        {
          title: this.$t("VIP等级系统"),
          navpic: require("../assets/images1/nav6.png"),
          url: "/rank-system"
        }
      ];
      let arr2 = [
        {
          title: this.$t("收益池"),
          navpic: require("../assets/images/nav4.png"),
          url: "/fund"
        }
      ];
      let arr3 = [
        {
          title: this.$t("Telegram"),
          navpic: require("../assets/images/telegram.png"),
          url: this.isMobileFlag ? this.$helper.get('rule').mobile_service_url : this.$helper.get('rule').pc_service_url,
          link_type: 2,
          show: this.$t('telegram_is_hidden') == 1 ? "hidden" : ''
        },
        {
          title: this.$t("Facebook"),
          navpic: require("../assets/images/facebook.png"),
          url: this.$t('facebook_public_url'),
          link_type: 2,
          show: this.$t('facebook_public_url') == 'facebook_public_url' ? "hidden" : ''
        },
        {
          title: this.$t("Instagram"),
          navpic: require("@/assets/images/instagram.png"),
          url: this.$t('instagram_public_url'),
          scale: .8,
          link_type: 2,
          show: this.$t('instagram_public_url') == 'instagram_public_url' ? "hidden" : ''
        },
        {
          title: this.$t("Whatsapp"),
          navpic: require("../assets/images/whatsapp2.png"),
          url: this.$helper.get('rule').whatsapp_public_url,
          link_type: 2,
          show: this.$helper.get('rule').whatsapp_public_url ? "" : 'hidden'
        },
        // {
        //   title: this.$t("消息"),
        //   navpic: require("../assets/images/nav7.png"),
        //   url: "/news",
        //   show:this.$store.state.mediaShow
        // },
        // {
        //   title: this.$t("关于运动"),
        //   navpic: require("../assets/images/nav8.png"),
        //   url: "/about-sport"
        // },
      ];
      if (this.$helper.get("rule").fundStatus == 1) {
        return [...arr1, ...arr2, ...arr3];
      } else {
        return [...arr1, ...arr3];
      }
    }
  },
  mounted() {
    this.initCountdown()
    this.getPddData()
    this.langChange();
    window.onresize = () => {
      this.windwoWidth = window.innerWidth;
      if (this.windwoWidth > 768) {
        this.isShow = true;
      } else {
        this.isCollapse = false;
      }
    };
  },
  created() {
    this.langChange();
  },
  watch: {
    "$store.state.isLoginStatu": function (v) {
      if (v) {
        this.getPddData()
      }
    },
    $route(to) {
      if (to.query.dialog === 'wheel') {
        this.wheelClick()
      }
    }
  }
};
</script>
<style lang="less" scoped>
.top-img {
    width: 213px;
}

.top-img2 {
  width: 60px;
}

/* 路由动画 */
.left-enter-active, .left-leave-active {
  transition: all .3s !important;
}

.left-enter-from, .left-leave-to {
  transform: translateX(-100%);
}

.el-menu-vertical {
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #fff;
  overflow: hidden;
}

.el-menu-item.is-active {
  color: #84F100;
}

.el-menu-item:focus, .el-menu-item:hover {
  background-color: #0A0605;
  color: #84F100;
}

.el-menu-item {
  color: #A5A5A5;
}

</style>
<style scoped>
/* aside */
.left-menu-container {
  padding-top: 64px;
  position: fixed;
  z-index: 1203;
  left: 0;
  top: 0;
  bottom: 0;
  width: 232px;
  background-color: #111923;
}

.left-menu-container .social-icons {
  margin-top: 20px;
}

.left-menu-container__link,
.left-menu-container__link:active,
.left-menu-container__link:hover {
  color: #fff;
}

.left-menu-container__outer {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-color: transparent transparent;
}

.left-menu-container__outer::-webkit-scrollbar,
.left-menu-container__outer::-webkit-scrollbar-track {
  background-color: transparent;
}

.left-menu-container__outer::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.left-menu-container__inner {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
  position: relative;
}

@media (max-width: 1000px) {
  .left-menu-container__inner {
    padding: 12px 12px 72px;
  }
}

.left-menu-container__logo {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-menu-container__logo a {
  display: block;
}

.left-menu-container__head {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.left-menu-container__bonuses {
  margin-bottom: 10px;
}

.left-menu-container__bonuses .scratchcards,
.left-menu-container__bonuses .spin {
  grid-column: 1/3;
}

.left-menu-container__birthday {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 4px;
  cursor: pointer;
  text-decoration: none;
}

.left-menu-container__birthday.active,
.left-menu-container__birthday:hover {
  background: #202a39;
}

.left-menu-container__birthday.active .left-menu-container__birthday-title {
  color: #fff;
}

.left-menu-container__birthday-img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.left-menu-container__birthday-title {
  color: #93acd3;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
}

.left-menu-container__questions {
  background: url(/_nuxt/img/menu-bg.7e0d126.png) 100% no-repeat,
  linear-gradient(93.73deg, #1d2632, #4718e5 118.75%), #2a3546;
  background-size: contain;
  border-radius: 8px;
  margin-bottom: 8px;
  height: 48px;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 13px;
  line-height: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}

.left-menu-container__questions + .left-menu-container__bonuses {
  margin-top: 0;
}

.left-menu-container__questions-subtitle {
  color: hsla(0, 0%, 100%, 0.65);
  font-weight: 700;
}

.left-menu-container__footer {
  position: relative;
}

.left-menu-container__footer > .button {
  margin-bottom: 12px;
  justify-content: flex-start;
  color: #fff;
  font-weight: 500;
}

.primary-menu {
  margin-bottom: 19px;
  padding-bottom: 16px;
  position: relative;
}

.primary-menu:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 12px;
  right: 12px;
  height: 1px;
  background-color: #2a3546;
}

.primary-menu__item {
  position: relative;
  margin-bottom: 4px;
  border-radius: 8px;
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
}

.primary-menu__item:last-child {
  margin-bottom: 0;
}

.primary-menu__item.active,
.primary-menu__item:focus,
.primary-menu__item:hover {
  background-color: #202a39;
}

.primary-menu__item.active svg,
.primary-menu__item:focus svg,
.primary-menu__item:hover svg {
  fill: #93acd3;
}

.primary-menu__item:active {
  background-color: #1c2532;
}

.primary-menu__item.active .primary-menu__item-link span {
  color: #fff;
}

.primary-menu__link-block {
  position: relative;
}

.primary-menu__boost {
  padding: 1px 3px;
  position: absolute;
  bottom: 8px;
  left: 14px;
  background: linear-gradient(180deg, #ffd233, #f90);
  box-shadow: 0 1px 0 #694010, 0 2px 5px -2.92171px rgba(0, 0, 0, 0.3),
  inset 0 1px 0.5px hsla(0, 0%, 100%, 0.7);
  border-radius: 50px;
  font-weight: 900;
  font-size: 10px;
  line-height: 110%;
  text-shadow: 0.5px 0.5px 0.5px #6a4000;
  text-transform: uppercase;
}

.primary-menu__item-link {
  text-decoration: none;
  align-items: center;
  display: flex;
  position: relative;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  justify-content: flex-start;
  width: 100%;
  padding: 8px 12px;
}

.primary-menu__item-link svg {
  fill: #55657e;
  flex-shrink: 0;
}

.primary-menu__item-link img {
  width: 24px;
  height: 24px;
}

.primary-menu__item-link .el-image {
  width: 24px;
  height: 24px;
}

.primary-menu__item-link span {
  flex: 1 1;
  margin-left: 8px;
  font-size: 14px;
  text-align: left;
  color: #93acd3;
  font-weight: 600;
  transition: color 0.1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.primary-menu__item-link .iconfont {
  font-weight: normal;
  color: #93acd3;
  font-size: 20px;
}

.primary-menu__submenu .iconfont {
  font-weight: normal;
  color: #93acd3;
}

.primary-menu__item-link--landing {
  margin: 0 0 12px;
}

.primary-menu__item-link--landing span {
  color: #ffb636;
}

.primary-menu__item-link span,
.primary-menu__submenu-item-link span {
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
}

.primary-menu__item-link-icon {
  position: relative;
}

.primary-menu__submenu {
  padding-bottom: 10px;
}

.primary-menu__submenu-item {
  position: relative;
  margin-bottom: 2px;
  display: block;
}

.primary-menu__submenu-item:last-child {
  margin-bottom: 0;
}

.primary-menu__submenu-item-link {
  text-decoration: none;
  font-weight: 600;
  font-size: 12px;
  line-height: 1.3333;
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 100%;
  padding: 5px 12px;
}

.primary-menu__submenu-item-link svg {
  fill: #55657e;
  position: relative;
  flex-shrink: 0;
}

.primary-menu__submenu-item-link span {
  margin-left: 4px;
  margin-right: 2px;
  font-size: 12px;
  font-weight: 600;
  color: #93acd3;
  transition: color 0.1s ease-in-out;
}

.primary-menu__submenu-item-link.active span,
.primary-menu__submenu-item-link:active span,
.primary-menu__submenu-item-link:focus span,
.primary-menu__submenu-item-link:hover span {
  color: #fff;
}

.battles-menu {
  margin-bottom: 17px;
}

.battles-menu .primary-menu__submenu-item-link svg {
  fill: #1bb83d;
}

.battles-menu .primary-menu__submenu-item-link.funfury svg {
  fill: #ffb636;
}

.secondary-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 18px;
  position: relative;
}

.secondary-menu:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 12px;
  right: 12px;
  height: 1px;
  background-color: #2a3546;
}

.secondary-menu__link {
  text-decoration: none;
  line-height: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 6px 12px;
}

.secondary-menu__link svg {
  margin: -2px 0 -2px 2px;
  fill: #55657e;
}

.secondary-menu__link span {
  font-weight: 600;
  color: #55657e;
  transition: color 0.1s ease-in-out;
}

.secondary-menu__link:last-child {
  margin-bottom: 0;
}

.secondary-menu__link.active span,
.secondary-menu__link:focus span,
.secondary-menu__link:hover span {
  color: #fff;
}

.icon-arrow {
  /* margin-left: 8px; */
  transform: rotate(0deg);
  transition: fill 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.active .icon-arrow {
  transform: rotate(270deg);
  transform-origin: center;
}

.bc-widget {
  display: block;
  position: relative;
  background-color: #202a39;
  border: 2px solid #2a3546;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: background-color 0.2s;
}

.bc-widget__progress {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.bc-widget__progress-bar {
  position: absolute !important;
  left: 0;
  bottom: 0;
}

.bc-widget__progress-bar .progress {
  border-radius: 0 !important;
}

.bc-widget__progress-line {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  background: #1bb83d;
}

.bc-widget:hover {
  background-color: #1c2532;
  border-color: #263041;
}

.bc-widget:active {
  background-color: #161f2c;
  border-color: #202a39;
}

.bc-widget__bg {
  display: block;
  width: 100%;
  height: auto;
}

.bc-widget__inner {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #fff;
  display: flex;
  align-items: center;
}

.bc-widget__counter {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: #1bb83d;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  min-width: 20px;
  font-family: Numbers, Montserrat;
}

.bc-widget__label {
  margin-left: 58px;
  font-weight: 600;
  font-size: 14px;
}

.bonus {
  width: 100%;
  height: 60px;
  position: relative;

}

.bonus__label {
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.bonus__label span {
  text-transform: uppercase;
  line-height: 1;
}

.bonus__label span:first-child {
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  transition: color 0.1s ease-in-out;
}

.bonus__label span:last-child {
  color: hsla(0, 0%, 100%, 0.65);
  font-weight: 700;
  font-size: 13px;
  transition: color 0.1s ease-in-out;
}

.bonus__inner {
  border-radius: 8px;
  position: relative;
  padding: 8px;
  height: 100%;
  overflow: hidden;
  transform: translateZ(0);
}

.bonus__inner:after {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  transition: opacity 0.1s ease-in-out;
}

.bonus:hover .bonus_img-star {
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.bonus:hover .bonus_img-star img {
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.bonus_cashback .bonus__inner:after {
  opacity: 0.4;
  background: radial-gradient(
      84.81% 128.48% at 87.97%,
      at 106.82%,
      #f90 0,
      #1c2532 100%
  ),
  #1c2532;
  background: radial-gradient(
      84.81% 128.48% at 87.97% 106.82%,
      #f90 0,
      #1c2532 100%
  ),
  #1c2532;
}

.bonus_cashback:focus .bonus__inner:after,
.bonus_cashback:hover .bonus__inner:after {
  opacity: 0.7;
}

.bonus_cashback.ready-2 .bonus__inner:after,
.bonus_cashback.ready .bonus__inner:after {
  opacity: 0.9;
}

.bonus {
  margin-bottom: 5px;
}


.bonus_furywheel .bonus__inner:after {
  opacity: 0.5;
  background: radial-gradient(
      100% 151.49% at 103.16%,
      at 135.23%,
      #5200ff 0,
      #1c2532 100%
  ),
  linear-gradient(0deg, #1c2532, #1c2532);
  background: radial-gradient(
      100% 151.49% at 103.16% 135.23%,
      #5200ff 0,
      #1c2532 100%
  ),
  linear-gradient(0deg, #1c2532, #1c2532);
}

.bonus_furywheel:focus .bonus__inner:after,
.bonus_furywheel:hover .bonus__inner:after {
  opacity: 0.5;
}

.bonus_furywheel .bonus__label span:last-child {
  font-size: 10px;
}

.bonus_furywheel .wait .wheel-amin__coin-lg,
.bonus_furywheel .wait .wheel-amin__coin-sm,
.bonus_furywheel .wait .wheel-amin__wheel,
.bonus_furywheel .wait .wheel-amin__wheel-wrap {
  -webkit-animation: none;
  animation: none;
}

.bonus_furywheel:hover .wheel-amin__wheel-wrap {
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.bonus_furywheel:hover .wheel-amin__wheel {
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.bonus_furywheel:focus .bonus__inner:after,
.bonus_furywheel:hover .bonus__inner:after {
  opacity: 0.8;
}

.bonus_furywheel.ready-2 .bonus__inner:after,
.bonus_furywheel.ready .bonus__inner:after {
  opacity: 1;
}

.bonus_rakeback .bonus__inner:after {
  opacity: 0.5;
  background: radial-gradient(
      100% 151.49% at 103.16%,
      at 135.23%,
      #2ddc54 0,
      #1c2532 100%
  ),
  #1c2532;
  background: radial-gradient(
      100% 151.49% at 103.16% 135.23%,
      #2ddc54 0,
      #1c2532 100%
  ),
  #1c2532;
  border-radius: 8px;
}

.bonus_rakeback:focus .bonus__inner:after,
.bonus_rakeback:hover .bonus__inner:after {
  opacity: 0.8;
}

.bonus_rakeback.ready-2 .bonus__inner:after,
.bonus_rakeback.ready .bonus__inner:after {
  opacity: 1;
}

.bonus_furycharge .bonus__inner:after {
  opacity: 0.5;
  background: radial-gradient(
      87.97% 133.28% at 91.14%,
      at 111.36%,
      rgba(0, 117, 255, 0.8) 0,
      rgba(28, 37, 50, 0.8) 100%
  ),
  #1c2532;
  background: radial-gradient(
      87.97% 133.28% at 91.14% 111.36%,
      rgba(0, 117, 255, 0.8) 0,
      rgba(28, 37, 50, 0.8) 100%
  ),
  #1c2532;
}

.bonus_furycharge:focus .bonus__inner:after,
.bonus_furycharge:hover .bonus__inner:after {
  opacity: 0.5;
}

.bonus_furycharge .bonus__label span:last-child {
  font-size: 8.5px;
}

.bonus_furycharge:focus .bonus__inner:after,
.bonus_furycharge:hover .bonus__inner:after {
  opacity: 0.8;
}

.bonus_furycharge.ready-2 .bonus__inner:after,
.bonus_furycharge.ready .bonus__inner:after {
  opacity: 1;
}

.bonus.disabled .bonus__label span:first-child {
  color: hsla(0, 0%, 100%, 0.65);
}

.bonus.disabled:hover .bonus__label span:first-child {
  color: #fff;
}

.bonus__bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: block;
}

.bonus__bg,
.wheel-amin {
  pointer-events: none;
}

.wheel-amin__wheel-wrap {
  position: absolute;
  width: 52px;
  height: 52px;
  right: -14px;
  bottom: -14px;
  -webkit-animation: rolling-data-v-529d0c7e 3s linear infinite;
  animation: rolling-data-v-529d0c7e 3s linear infinite;
}

.wheel-amin__wheel {
  display: block;
  width: 52px;
  height: 52px;
  -webkit-animation: rolling-data-v-529d0c7e 6s linear infinite;
  animation: rolling-data-v-529d0c7e 6s linear infinite;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.wheel-amin__wheel-center {
  position: absolute;
  width: 18px;
  right: 3px;
  bottom: 2px;
}

.wheel-amin__coin-lg {
  position: absolute;
  top: 6px;
  right: 16px;
  width: 30px;
  -webkit-animation: coin-lg-data-v-529d0c7e 4s linear infinite;
  animation: coin-lg-data-v-529d0c7e 4s linear infinite;
}

.wheel-amin__coin-sm {
  position: absolute;
  width: 22px;
  top: -3px;
  right: 4px;
  -webkit-animation: coin-sm-data-v-529d0c7e 4s linear infinite;
  animation: coin-sm-data-v-529d0c7e 4s linear infinite;
}

.bonus_img-star {
  -webkit-animation: rotating-data-v-529d0c7e 8s linear infinite;
  animation: rotating-data-v-529d0c7e 8s linear infinite;
  pointer-events: none;
  opacity: 0.7;
  position: absolute;
  bottom: -22px;
  right: -22px;
}

.bonus_img-star img {
  -webkit-animation: rotating-data-v-529d0c7e 18s linear infinite;
  animation: rotating-data-v-529d0c7e 18s linear infinite;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

.bonus__boost {
  padding: 3px 5px;
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: linear-gradient(180deg, #ffd233, #f90);
  box-shadow: 0 1px 0 #694010, 0 2px 5px -2.92171px rgba(0, 0, 0, 0.3),
  inset 0 1px 0.5px hsla(0, 0%, 100%, 0.7);
  border-radius: 50px;
  font-weight: 900;
  font-size: 10px;
  line-height: 110%;
  text-shadow: 0.5px 0.5px 0.5px #6a4000;
  text-transform: uppercase;
}

.bonus__tip {
  z-index: 2;
  position: absolute;
  width: 20px;
  height: 20px;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bonus__tip,
.wait .bonus__tip {
  background-color: #3c485c;
}

.ready-2 .bonus__tip {
  -webkit-animation: ready-2-data-v-529d0c7e 1s linear infinite alternate;
  animation: ready-2-data-v-529d0c7e 1s linear infinite alternate;
}

.bonus__tip svg {
  fill: #93acd3;
}

.progress {
  width: 14px;
  height: 14px;
}

@-webkit-keyframes rotating-data-v-529d0c7e {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

@keyframes rotating-data-v-529d0c7e {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

@-webkit-keyframes ready-2-data-v-529d0c7e {
  0% {
    transform: scale(0.9);
  }

  to {
    transform: scale(1.1);
  }
}

@keyframes ready-2-data-v-529d0c7e {
  0% {
    transform: scale(0.9);
  }

  to {
    transform: scale(1.1);
  }
}

@-webkit-keyframes rolling-data-v-529d0c7e {
  to {
    transform: rotate(1turn);
  }
}

@keyframes rolling-data-v-529d0c7e {
  to {
    transform: rotate(1turn);
  }
}

@-webkit-keyframes coin-sm-data-v-529d0c7e {
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(2px) scale(1.2);
  }

  to {
    transform: translateY(0) scale(1);
  }
}

@keyframes coin-sm-data-v-529d0c7e {
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(2px) scale(1.2);
  }

  to {
    transform: translateY(0) scale(1);
  }
}

@-webkit-keyframes coin-lg-data-v-529d0c7e {
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(4px) scale(1.2);
  }

  to {
    transform: translateY(0) scale(1);
  }
}

@keyframes coin-lg-data-v-529d0c7e {
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(4px) scale(1.2);
  }

  to {
    transform: translateY(0) scale(1);
  }
}

.dropdown {
  position: relative;
}

.dropdown__label {
  display: inline-block;
  margin-bottom: 4px;
  line-height: 1.33;
  font-weight: 600;
  color: #55657e;
}

.dropdown__trigger,
.dropdown__trigger-custom {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}

.dropdown__trigger-custom > div.icon,
.dropdown__trigger > div.icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown__trigger-custom > div.icon svg,
.dropdown__trigger > div.icon svg {
  fill: #93acd3;
  width: 100%;
  height: 100%;
}

.dropdown__trigger-custom > div.icon img,
.dropdown__trigger > div.icon img {
  width: 73%;
}

.dropdown__trigger-custom > span.text,
.dropdown__trigger > span.text {
  flex: 1 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.dropdown__trigger {
  background-color: #0A0605;
  border-color: #0A0605;
  border-style: solid;
  transition: background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;
}

.dropdown__trigger:focus,
.dropdown__trigger:hover {
  background-color: #2a3546;
  border-color: #2a3546;
}

.dropdown__trigger:active {
  background-color: #161f2c;
  border-color: #161f2c;
}

.dropdown__inner {
  z-index: 1;
  position: absolute;
  transform: translateY(0);
}

.dropdown__content {
  background-color: #1c2532;
  border-color: #1c2532;
  border-style: solid;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
}

.dropdown__content .input {
  margin-bottom: 6px;
}

.dropdown__empty {
  color: #55657e;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown_fullwidth {
  display: block;
  width: 100%;
}

.dropdown_disabled {
  pointer-events: none;
}

.dropdown_disabled .dropdown__trigger span {
  color: #55657e;
}

.dropdown_disabled .dropdown__trigger svg {
  fill: #55657e;
}

.dropdown_is-error .dropdown__trigger {
  border-color: #ed1d49;
}

.dropdown_top .dropdown__inner,
.dropdown_topLeft .dropdown__inner,
.dropdown_topRight .dropdown__inner {
  bottom: 100%;
  margin-top: 0 !important;
}

.dropdown_top .icon-arrow,
.dropdown_topLeft .icon-arrow,
.dropdown_topRight .icon-arrow {
  fill: #93acd3;
  pointer-events: none;
  transform: rotate(180deg);
  transition: fill 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.dropdown_top.dropdown_opened .icon-arrow,
.dropdown_topLeft.dropdown_opened .icon-arrow,
.dropdown_topRight.dropdown_opened .icon-arrow {
  transform: rotate(0deg);
  transform-origin: center;
}

.dropdown_bottom .dropdown__inner,
.dropdown_bottomLeft .dropdown__inner,
.dropdown_bottomRight .dropdown__inner {
  top: 100%;
  margin-bottom: 0 !important;
}

.dropdown_bottom .icon-arrow,
.dropdown_bottomLeft .icon-arrow,
.dropdown_bottomRight .icon-arrow {
  fill: #93acd3;
  pointer-events: none;
  transform: rotate(0deg);
  transition: fill 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.dropdown_bottom.dropdown_opened .icon-arrow,
.dropdown_bottomLeft.dropdown_opened .icon-arrow,
.dropdown_bottomRight.dropdown_opened .icon-arrow {
  transform: rotate(180deg);
  transform-origin: center;
}

.dropdown_bottomLeft .dropdown__inner,
.dropdown_topLeft .dropdown__inner {
  left: 0;
}

.dropdown_bottomRight .dropdown__inner,
.dropdown_topRight .dropdown__inner {
  right: 0;
}

.dropdown_bottom .dropdown__inner,
.dropdown_top .dropdown__inner {
  right: 0;
  left: 0;
}

.dropdown_sm.dropdown--join.dropdown_opened .dropdown__trigger {
  border-radius: 10px 10px 0 0;
}

.dropdown_sm.dropdown--join .dropdown__trigger {
  background-color: #1c2532;
}

.dropdown_sm.dropdown--join .dropdown__trigger:hover {
  background-color: #1c2532;
  border-color: #1c2532;
}

.dropdown_sm.dropdown--join .dropdown__content {
  border-radius: 0 0 10px 10px;
  box-shadow: none;
}

.dropdown_sm.dropdown--join .dropdown__inner {
  margin-top: 0;
  position: static;
}

.dropdown_sm .dropdown__label {
  font-size: 11px;
}

.dropdown_sm .dropdown__trigger-custom .icon-arrow,
.dropdown_sm .dropdown__trigger .icon-arrow {
  width: 16px;
  height: 16px;
  margin-left: 2px;
  margin-right: -4px;
}

.dropdown_sm .dropdown__trigger-custom > div.icon,
.dropdown_sm .dropdown__trigger > div.icon {
  margin-left: -3.2px;
  margin-right: 2px;
  width: 16px;
  height: 16px;
}

.dropdown_sm .dropdown__trigger-custom > span.text,
.dropdown_sm .dropdown__trigger > span.text {
  line-height: 16px;
}

.dropdown_sm .dropdown__trigger {
  font-size: 10px;
  border-radius: 8px;
  padding: 3px 7px;
  border-width: 1px;
}

.dropdown_sm .dropdown__inner {
  margin-top: 6px;
  margin-bottom: 6px;
  z-index: 2;
}

.dropdown_sm .dropdown__content {
  z-index: 1;
  font-size: 10px;
  padding: 3px;
  border-radius: 8px;
  border-width: 1px;
}

.dropdown_sm .dropdown__empty {
  font-size: 10px;
  min-height: 50px;
}

.dropdown_md.dropdown--join.dropdown_opened .dropdown__trigger {
  border-radius: 10px 10px 0 0;
}

.dropdown_md.dropdown--join .dropdown__trigger {
  background-color: #1c2532;
}

.dropdown_md.dropdown--join .dropdown__trigger:hover {
  background-color: #1c2532;
  border-color: #1c2532;
}

.dropdown_md.dropdown--join .dropdown__content {
  border-radius: 0 0 10px 10px;
  box-shadow: none;
}

.dropdown_md.dropdown--join .dropdown__inner {
  margin-top: 0;
  position: static;
}

.dropdown_md .dropdown__label {
  font-size: 12px;
}

.dropdown_md .dropdown__trigger-custom .icon-arrow,
.dropdown_md .dropdown__trigger .icon-arrow {
  width: 20px;
  height: 20px;
  margin-left: 4px;
  margin-right: -4px;
}

.dropdown_md .dropdown__trigger-custom > div.icon,
.dropdown_md .dropdown__trigger > div.icon {
  margin-left: -4px;
  margin-right: 3px;
  width: 20px;
  height: 20px;
}

.dropdown_md .dropdown__trigger-custom > span.text,
.dropdown_md .dropdown__trigger > span.text {
  line-height: 20px;
}

.dropdown_md .dropdown__trigger {
  font-size: 12px;
  border-radius: 10px;
  padding: 5px 9px;
  border-width: 1px;
}

.dropdown_md .dropdown__inner {
  margin-top: 6px;
  margin-bottom: 6px;
  z-index: 2;
}

.dropdown_md .dropdown__content {
  z-index: 1;
  font-size: 12px;
  padding: 3px;
  border-radius: 10px;
  border-width: 1px;
}

.dropdown_md .dropdown__empty {
  font-size: 12px;
  min-height: 50px;
}

.dropdown_lg.dropdown--join.dropdown_opened .dropdown__trigger {
  border-radius: 10px 10px 0 0;
}

.dropdown_lg.dropdown--join .dropdown__trigger {
  background-color: #1c2532;
}

.dropdown_lg.dropdown--join .dropdown__trigger:hover {
  background-color: #1c2532;
  border-color: #1c2532;
}

.dropdown_lg.dropdown--join .dropdown__content {
  border-radius: 0 0 10px 10px;
  box-shadow: none;
}

.dropdown_lg.dropdown--join .dropdown__inner {
  margin-top: 0;
  position: static;
}

.dropdown_lg .dropdown__label {
  font-size: 12px;
}

.dropdown_lg .dropdown__trigger-custom .icon-arrow,
.dropdown_lg .dropdown__trigger .icon-arrow {
  width: 24px;
  height: 24px;
  margin-left: 8px;
  margin-right: -4px;
}

.dropdown_lg .dropdown__trigger-custom > div.icon,
.dropdown_lg .dropdown__trigger > div.icon {
  margin-left: -4.8px;
  margin-right: 6px;
  width: 24px;
  height: 24px;
}

.dropdown_lg .dropdown__trigger-custom > span.text,
.dropdown_lg .dropdown__trigger > span.text {
  line-height: 24px;
}

.dropdown_lg .dropdown__trigger {
  font-size: 14px;
  border-radius: 10px;
  padding: 8px 12px;
  border-width: 2px;
}

.dropdown_lg .dropdown__inner {
  margin-top: 8px;
  margin-bottom: 8px;
  z-index: 2;
}

.dropdown_lg .dropdown__content {
  z-index: 1;
  font-size: 14px;
  padding: 2px;
  border-radius: 10px;
  border-width: 2px;
}

.dropdown_lg .dropdown__empty {
  font-size: 14px;
  min-height: 50px;
}

.dropdown_xl.dropdown--join.dropdown_opened .dropdown__trigger {
  border-radius: 10px 10px 0 0;
}

.dropdown_xl.dropdown--join .dropdown__trigger {
  background-color: #1c2532;
}

.dropdown_xl.dropdown--join .dropdown__trigger:hover {
  background-color: #1c2532;
  border-color: #1c2532;
}

.dropdown_xl.dropdown--join .dropdown__content {
  border-radius: 0 0 10px 10px;
  box-shadow: none;
}

.dropdown_xl.dropdown--join .dropdown__inner {
  margin-top: 0;
  position: static;
}

.dropdown_xl .dropdown__label {
  font-size: 14px;
}

.dropdown_xl .dropdown__trigger-custom .icon-arrow,
.dropdown_xl .dropdown__trigger .icon-arrow {
  width: 32px;
  height: 32px;
  margin-left: 8px;
  margin-right: -8px;
}

.dropdown_xl .dropdown__trigger-custom > div.icon,
.dropdown_xl .dropdown__trigger > div.icon {
  margin-left: -6.4px;
  margin-right: 6px;
  width: 32px;
  height: 32px;
}

.dropdown_xl .dropdown__trigger-custom > span.text,
.dropdown_xl .dropdown__trigger > span.text {
  line-height: 32px;
}

.dropdown_xl .dropdown__trigger {
  font-size: 16px;
  border-radius: 14px;
  padding: 14px 18px;
  border-width: 2px;
}

.dropdown_xl .dropdown__inner {
  margin-top: 10px;
  margin-bottom: 10px;
  z-index: 2;
}

.dropdown_xl .dropdown__content {
  z-index: 1;
  font-size: 16px;
  padding: 4px;
  border-radius: 14px;
  border-width: 2px;
}

.dropdown_xl .dropdown__empty {
  font-size: 16px;
  min-height: 50px;
}

.dropdown-menu__inner {
  overflow-y: auto;
  overflow-x: hidden;
}

.dropdown-menu__inner_has-scroll {
  padding-right: 4px;
}

.dropdown-menu__link {
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: 0;
  color: #55657e;
  transition: color 0.1s ease-in-out;
}

.dropdown-menu__link:focus,
.dropdown-menu__link:hover {
  color: #fff;
}

.dropdown-menu__link:active {
  color: #93acd3;
}

.dropdown-menu__link > div.icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu__link > div.icon svg {
  fill: #93acd3;
  width: 100%;
  height: 100%;
}

.dropdown-menu__link > div.icon img {
  width: 73%;
}

.dropdown-menu__link > span.text {
  flex: 1 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.dropdown-menu__link_selected {
  color: #fff;
  pointer-events: none;
  background-color: #2a3546;
}

.dropdown-menu_sm .dropdown-menu__link {
  border-radius: 4px;
  padding: 4px;
}

.dropdown-menu_sm .dropdown-menu__link > div.icon {
  margin-left: -3.2px;
  margin-right: 2px;
  width: 16px;
  height: 16px;
}

.dropdown-menu_sm .dropdown-menu__link > span.text {
  line-height: 16px;
}

.dropdown-menu_md .dropdown-menu__link {
  border-radius: 6px;
  padding: 6px;
}

.dropdown-menu_md .dropdown-menu__link > div.icon {
  margin-left: -4px;
  margin-right: 3px;
  width: 20px;
  height: 20px;
}

.dropdown-menu_md .dropdown-menu__link > span.text {
  line-height: 20px;
}

.dropdown-menu_lg .dropdown-menu__link {
  border-radius: 6px;
  padding: 8px 10px;
}

.dropdown-menu_lg .dropdown-menu__link > div.icon {
  margin-left: -4.8px;
  margin-right: 6px;
  width: 24px;
  height: 24px;
}

.dropdown-menu_lg .dropdown-menu__link > span.text {
  line-height: 24px;
}

.dropdown-menu_xl .dropdown-menu__link {
  border-radius: 10px;
  padding: 8px 14px;
}

.dropdown-menu_xl .dropdown-menu__link > div.icon {
  margin-left: -6.4px;
  margin-right: 6px;
  width: 32px;
  height: 32px;
}

.dropdown-menu_xl .dropdown-menu__link > span.text {
  line-height: 32px;
}

.gift {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 10px;
  height: 10px;
  margin-right: 0;
}

.is-wallet {
  display: flex;
  width: 100%;
}

.is-wallet .currency__balances {
  margin-left: auto;
}

.is-wallet .currency__label {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #93acd3;
}

.is-wallet .currency__label:hover {
  color: #fff;
}

.left-menu-container__footer .el-dropdown {
  width: 100%;
}

.social-icons a {
  color: #55657e;
}

.button_fullwidth {
  display: flex;
  align-items: center;
  line-height: 20px;
}

.icon-reddit {
  width: 20px;
  transform: translate(-10%, -10%);
}

.icon-svg-livechat {
  margin-right: 5px;
  color: #55657e;
}

.left-menu-container__footer .btn-toLiveSuppert {
  padding: 8px 10px;
}

.lan-dropdown {
  width: 212px;
}

.bonus-img {
  width: 100%;
  border-radius: 6px;
  position: relative;
}

.bonus-img::after {
  display: block;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 2px;
  background: linear-gradient(to right, rgba(57, 174, 237, 0.1), rgba(57, 174, 237, 0.8), rgba(255, 255, 255, .9), rgba(57, 174, 237, 0.8), rgba(57, 174, 237, 0.1));
  clip-path: ellipse(49% 50% at 50% 50%);
  filter: blur(.3px) drop-shadow(0 0 4px #FFF);
  animation: bonus-img 2s infinite;
}

@keyframes bonus-img {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.download-btn {
  padding-bottom: 33%;
  width: 103%;
  background-image: url(../assets/images/download-btn-bg.png);
  background-size: 100% 100%;
  margin-bottom: -20px;
  margin-top: -10px;
  position: relative;
  cursor: pointer;
}

.d-txt {
  position: absolute;
  font-size: 12px;
  left: 23%;
  top: 24%;
  transform: scale(.9);
}

.d-jiangli {
  position: absolute;
  right: 10%;
  transform: rotate(20deg);
  top: 47%;
  font-size: 12px;
}

.d-jiangli img {
  width: 1em;
}

.countdown-txt {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  font-weight: bold;
  color: transparent;
  background-image: linear-gradient(0deg, #FEF4FE 0%, #FDC6FD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.new {
  width: 8px;
  height: 8px;
  background-color: red;
  display: inline-block;
  border-radius: 50%;
  margin-left: 4px;
}

.primary-menu .new {
  position: absolute;
  right: 12px;
}

.bonus .new {
  position: absolute;
  right: 2px;
  top: 2px;
}

</style>
