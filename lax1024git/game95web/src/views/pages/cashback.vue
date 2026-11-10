<template>
  <div class="app" :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">

    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="page-cashback">
            <h1 v-if="$store.state.isLoginStatu && userInfo">{{ $t('现金返还') }}</h1>
            <div class="category-tabs" v-if="$store.state.isLoginStatu && userInfo">
              <div class="tab" :class="cashCur == 0 ? 'active' : ''" @click="cashCur = 0">
                <span class="tab__icon">
                  <img src="../../assets/images/gree-menu.png" />
                </span>
                <span class="tab__title">{{ $t('About Cashback') }}</span>
              </div>
              <div class="tab" :class="cashCur == 1 ? 'active' : ''" @click="cashCur = 1">
                <span class="tab__icon">
                  <img src="../../assets/images/icon-my-account.png" />
                </span>
                <span class="tab__title">{{ $t('My Cashback') }}</span>
              </div>
            </div>
            <div class="page-cashback__body" v-if="cashCur == 0">
              <section class="about-cashback">
                <article class="about-cashback__header cash-header">
                  <div class="header__racoon">
                    <img :src="this.$t('cash_back_banner') != 'cash_back_banner'? $t('cash_back_banner'):require('../../assets/images/racoonleft.png')" alt="" class="header__img-racoon">
                  </div>
                  <div class="header__info">
                    <h1 class="header-v__title">
                      <span class="color-red">{{ $t('赛博浣熊') }}</span>{{ $t('给用户提供最慷慨的现金返还') }}
                    </h1>
                    <swiper class="cash-gallery" :options="cashThumbsOption" ref="swiperThumbs">
                      <swiper-slide v-for="(item, index) in cashThumbs" :key="index">
                        <div class="info-card">
                          <img :src="item.pic" alt="img" class="info-card__img" />
                          <h4 class="info-card__title">{{ $t(item.title) }}</h4>
                          <p class="info-card__description">{{ $t(item.desc) }}</p>
                        </div>
                      </swiper-slide>
                    </swiper>
                  </div>
                </article>
                <article class="about-cashback__steps steps">
                  <h2 class="steps__title">{{ $t('它是如何工作的？') }}</h2>
                  <div class="steps__subtitle-wrap">
                    <h5 class="steps__subtitle">{{ $t('cashback_desc1') }}</h5>
                    <router-link to="/all-game" class="button button_lg button_red button_center">
                      <span class="button__inner">
                        <span class="button__text">{{ $t('开始游戏') }}</span>
                      </span>
                    </router-link>
                  </div>
                  <div class="steps__cards-wrap">
                    <div class="step-card" v-for="(row, index) in steps" :key="`step${index}`">
                      <img src="../../assets/images/cashback-money-refund-icon.png" class="step-card__img" />
                      <h1 class="step-card__index">{{ row.index }}</h1>
                      <h3 class="step-card__title">{{ $t(row.title) }}</h3>
                      <p class="step-card__body">{{ $t(row.body) }}</p>
                      <img src="../../assets/images/right-arrow.svg" class="step-card__nipple" />
                      <svgIcon class="step-card__nipple-icon" icon="icon-arrow-right" widthName="24" heightName="24">
                      </svgIcon>
                    </div>
                  </div>
                </article>
                <article class="about-cashback__ranks ranks">
                  <h2 class="ranks__title">{{ $t('现金返还') }}</h2>
                  <h5 class="ranks__subtitle">
                    {{ $t('cashback_desc2') }}
                  </h5>
                  <div class="site-card-tab">
                    <el-tabs v-model="activeName">
                      <el-tab-pane v-for="(type, tindex) in vipList" :key="`vip-type${tindex}`" :label="$t(type.name)" :name="tindex.toString()">
                        <div class="ranks__cards-wrap">
                          <div class="rank-card" v-for="(item, index) in type.vipwater" :key="index">
                            <img loading="lazy" :src="item.image || require('../../assets/images/r'+item.gbc_viplvl+'.png')" class="rank-card__img" />
                            <p class="rank-card__title">{{ $t(item.level_name) }}</p>
                            <p class="rank-card__description">{{ parseFloat((item.gbc_rate * 1).toFixed(3)) }}%</p>
                          </div>
                          <!-- <template v-for="(item, index) in vips">
                            <div class="rank-card" :key="`no${index}`" v-if="index >= type.vipwater.length">
                              <img loading="lazy" :src="item.pic" class="rank-card__img" />
                              <p class="rank-card__title">{{ $t(item.name) }}</p>
                              <p class="rank-card__description">-</p>
                            </div>
                          </template> -->
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </article>
                <h3>{{ $t('常见问题') }}</h3>
                <div class="faq-items">
                  <div class="faq-items__column">
                    <div class="faq-element" @click="faqClick(item)" v-for="(item, index) in faqListleft" :key="index"
                      :class="item.select?'faq-show':''">
                      <div class="faq-element__wrapper">
                        <h3 class="faq-element__title">{{ $t(item.title) }}</h3>
                        <div class="faq-element__icon-block">
                          <svg width="20" height="20" focusable="false" aria-hidden="true"
                            class="faq-element__icon-arrow">
                            <use xlink:href="../../assets/fonts/svg-sprite.svg#icon-arrow-down" class="svg-use" />
                          </svg>
                        </div>
                      </div>
                      <p class="faq-element__description" v-html="$t('cashback_faq_' + item.id)"></p>
                    </div>
                  </div>
                  <div class="faq-items__column">
                    <div class="faq-element" @click="faqClick(item)" v-for="(item, index) in faqListright" :key="index"
                      :class="item.select?'faq-show':''">
                      <div class="faq-element__wrapper">
                        <h3 class="faq-element__title">{{ $t(item.title) }}</h3>
                        <div class="faq-element__icon-block">
                          <svg width="20" height="20" focusable="false" aria-hidden="true"
                            class="faq-element__icon-arrow">
                            <use xlink:href="../../assets/fonts/svg-sprite.svg#icon-arrow-down" class="svg-use" />
                          </svg>
                        </div>
                      </div>
                      <p class="faq-element__description" v-html="$t('cashback_faq_' + item.id)"></p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="page-cashback__body" v-if="cashCur == 1">
              <div class="cashback">
                <div class="cashback__head">
                  <div class="cashback__left">
                    <img src="../../assets/images/bg-racoon.png" alt />
                    <div class="my-rank">
                      <img loading="lazy" :src="userInfo.level_image || require(`../../assets/images/r${userInfo.level_id}.png`)" alt class="rank_item my-rank__rank" />
                      <span class="my-rank__title">
                        {{ $t('我的等级') }}:
                        <!-- <span>{{ userInfo.level_name }}</span> -->
                        <!-- <button>All ranks</button> -->
                      </span>
                      <span class="my-rank__subtitle">{{ $t(userInfo.level_name) }}</span>
                    </div>
                    <div class="cashback-progress">
                      <span class="cashback-progress__title">{{ $t('我的返水') }}:</span>
                      <!-- <el-tabs ref="tabs" v-model="activeName2">
                        <el-tab-pane v-for="(type, tindex) in vipList" :key="`vip-type-rate${tindex}`" :label="$t(type.name)" :name="tindex.toString()">
                        </el-tab-pane>
                      </el-tabs> -->
                      <myTabs :list="vipList.map(item=>item.name)" @change="changeTabs"></myTabs>

                      <div class="cashback-progress__body">
                        <span class="cashback-progress__item cashback-progress__item_active">{{ getMyRate() }}</span>
                        <img src="../../assets/images/right-arrow.png" alt class="arrow-img" />
                        <span class="cashback-progress__item">{{ getMyNextRate() }}</span>
                      </div>
                    </div>
                    <!-- <div class="cashback-accrual">
                      <span class="cashback-accrual__title">Accrual in:</span>
                      <div class="cashback-accrual__body">1D 03:11:34</div>
                    </div> -->
                  </div>
                  <div class="cashback__rigth">
                    <div class="balances">
                      <div class="balances__tabs">
                        <!-- <button type="button" size="sm" class="button-tab button-tab_sm button-tab_blue"
                          :class="btnCur == 1 ? 'active' : ''" @click="btnCur = 1">
                          <span>{{ $t('我的余额') }}:</span>
                        </button> -->
                        <button type="button" size="sm" class="button-tab button-tab_sm button-tab_blue active"
                          :class="btnCur == 0 ? 'active' : ''" @click="btnCur = 0"
                        >
                          <span>{{ $t('总收入') }}:</span>
                        </button>
                      </div>
                      <div class="bal-pane" v-if="btnCur == 0">
                        <div class="balances__body" style="text-align: center;">
                          <div class="cashback-scroll" v-if="total_price > 0" style="overflow: inherit;">
                            <div class="cashback-scroll__item">
                              <span class="currency">
                                <img width="40" height="40" :src="require('@/assets/images/'+$store.state.currencyIcon)" class="currency__icon">
                                <div class="currency__balances-wrap">
                                  <div class="currency__balances">
                                    <span class="currency__balances--balance">
                                      <span style="color: #fff; font-size: 30px;" class="font-digits">
                                        {{ numFormat(total_price) }}
                                      </span>
                                    </span>
                                    </div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div v-else class="empty-block empty-block--total">
                            <div class="empty-block__img-wrap">
                              <img src="../../assets/images/no-empty.png" alt />
                            </div>
                            <span>{{ $t('You haven\'t received cashback yet') }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2>{{ $t('历史记录') }}</h2>
                <div class="cashback__table" v-if="historys.length>0">
                  <table class="no-animation">
                      <thead>
                          <tr>
                              <th>{{ $t('日期') }}</th>
                              <th>{{ $t('金额') }}</th>
                              <th>{{ $t('状态') }}</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="" v-for="(item,index) in historys" :key="`his${index}`">
                              <td class="align-middle">
                                  <span class="datetime">{{ item.sb_dt }}</span>
                              </td>
                              <td class="align-middle">
                                  <span class="datetime">{{ numFormat(item.sb_backmoney) }}</span>
                              </td>
                              <td class="align-middle">
                                  <span class="status-ok" v-if="item.sb_payed == 2">{{ $t('已发放') }}</span>
                                  <span class="status-fail" v-else-if="item.sb_payed == 0">{{ $t('无效') }}</span>
                                  <span class="status-wait" v-else>{{ $t('待发放') }}</span>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                </div>

                <div class="empty" v-else>
                  <span>{{ $t('没有记录') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
    <asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
    <div class="app-overlay" v-if="isMobileFlag" :class="openedleft ? 'visible' : ''" @click="menuClick"></div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import myTabs from "@/components/myTabs.vue";
import { game_back_report_api, get_water_configuration } from "@/api/user";
export default {
  name: "CashBack",
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    myTabs
  },
  computed: {
    faqListleft: function () {
      var list = this.faqList;
      var arrTemp = [];
      for (var i = 0; i < list.length; i++) {
        if (i % 2 == 0) {
          arrTemp.push(list[i]);
        }
      }
      return arrTemp;
    },
    faqListright: function () {
      var list = this.faqList;
      var arrTemp = [];
      for (var i = 0; i < list.length; i++) {
        if (i % 2 != 0) {
          arrTemp.push(list[i]);
        }
      }
      return arrTemp;
    }
  },
  data() {
    return {
      cashCur: 0,
      btnCur: 0,
      total_price: 0,
      cashThumbs: [
        {
          title: "丰厚的奖励",
          desc: "您可以独家获得丰厚的奖励，最高返水1.3%",
          pic: require("../../assets/images/cashback_card_0.d122dcc.png")
        },
        {
          pic: require("../../assets/images/cashback_card_2.911944f.png"),
          title: "天天返利",
          desc: "百分之百返利，持续游戏获得更多奖励。"
        },
        {
          pic: require("../../assets/images/cashback_card_1.2fa6a1d.png"),
          title: "自动到账",
          desc: "每天17点开启返水奖励，奖励会及时到达您的余额"
        }
      ],
      steps: [
        { index: '01', title: '享受游戏', body: '玩您最喜欢的游戏并根据您的投注额获得现金返利'},
        { index: '02', title: '自动到账', body: '返水每天都会自动进入您的账户'},
        { index: '03', title: '继续战斗', body: '到账流水即可再次为乐趣而战'},
      ],
      cashThumbsOption: {
        slidesPerView: 3,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 1
          },
          1200: {
            slidesPerView: 3
          }
        }
      },
      faqCur: 0,
      faqList: [
        {
          id: 0,
          title: 'When is cashback available?',
          content: 'Cashback is available to be received on top of your loses twice a week: on Tuesday and Friday',
          select: false
        }, {
          id: 1,
          title: 'How to receive cashback?',
          content: 'The timer in Profile->Cashback shows the countdown to the next period of calculation. You have the time up to the start of the next period of calculation to receive cashback from the previous one. Example (You have cashback from Monday till Thursday that you have to withdraw so you have the time from Thursday to the next Monday to receive it to the game balance, in another way the cashback will be expired).',
          select: false
        }, {
          id: 2,
          title: 'How is cashback calculated?',
          content: 'Cashback is calculated from all your gaming activity (except Live, Table, and Sportsbetting) during one period according to the formula: Cashback amount = (your deposited lost coins in one game period ) * cashback%.<br>Coins for winnings, staking payouts, jackpots, referral payouts, boxes, bonuses (battle rewards, BetFury spins, manual bonuses, VIP bonuses, airdrops, events rewards) are not involved in the cashback accrual.',
          select: false
        }, {
          id: 3,
          title: 'What does the cashback amount depend on?',
          content: 'Percent of cashback depends on your Rank. From the first day you are on the platform, you can get 1% cashback. By playing our games you increase the Rank and thereby the amount of cashback - up to 1.3% for BF Legend.',
          select: false
        }, {
          id: 4,
          title: 'Can cashback be received after the specified period',
          content: 'If you avoid receiving cashback from the previous period you won\'t be able to receive it in the future. You have only one week to withdraw the cashback amount.',
          select: false
        }, {
          id: 5,
          title: 'Where can cashback be obtained?',
          content: 'Cashback may be received on your Account->My cashback.<br>Status in the cashback history will help you to check the current cashback stage. "Accrued" - cashback earned, "Withdrawn" - reached the game balance and " Expired" - missed to withdraw.',
          select: false
        }, {
          id: 6,
          title: 'Is there any reminder about cashback?',
          content: 'Once cashback is available for your account you will receive a notification.',
          select: false
        },
        {
          id: 7,
          title: 'Are there any limits of withdrawals?',
          content: 'The amount to cashback withdrawal is not limited.',
          select: false
        },
        {
          id: 8,
          title: 'Restrictions and prohibitions',
          content: 'The cashback bonus is provided for one person (i.e. for one account and IP address). Players cannot use multiple accounts to receive cashback. BetFury reserves the right to completely disable the cashback function for users who use various schemes and multi-counting to manipulate the receiving cashback. BetFury also has the right at any time to disable cashback to users without notice if such manipulations are suspected. BetFury reserves the right to change the calculation, mechanics and rules of cashback feature at any time.',
          select: false
        }
      ],
      // vip
      activeName: 0,
      activeName2: 0,
      vipTypes: [
        { name: '体育', percentage: ['0.4%', '0.45%', '0.5%', '0.55%', '0.6%', '0.65%', '0.7%']},
        { name: '区块链游戏', percentage: ['1%', '1.05%', '1.1%', '1.15%', '1.2%', '1.25%', '1.3%', ]},
        { name: '真人视讯', percentage: ['0.5%', '0.55%', '0.6%', '0.65%', '0.7%', '0.75%', '0.8%',]},
        { name: '电子游戏', percentage: ['0.6%', '0.65%', '0.7%', '0.75%', '0.8%', '0.85%', '0.9%',]},
      ],
      vips: [
        {
          pic: require('../../assets/images/r1.png'),
          name: '非VIP',
        },
        {
          pic: require('../../assets/images/r2.png'),
          name: '白银',
        },
        {
          pic: require('../../assets/images/r3.png'),
          name: '黄金',
        },
        {
          pic: require('../../assets/images/r4.png'),
          name: '铂金',
        },
        {
          pic: require('../../assets/images/r5.png'),
          name: '钻石',
        },
        {
          pic: require('../../assets/images/r6.png'),
          name: '星耀',
        },
        {
          pic: require('../../assets/images/r7.png'),
          name: '王者',
        },
        {
          pic: require('../../assets/images/r8.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r9.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r10.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r11.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r12.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r13.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r14.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r15.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r16.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r17.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r18.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r19.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r20.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r21.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r22.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r23.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r24.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r25.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r26.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r27.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r28.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r29.png'),
          name: '暂未开启',
        },
        {
          pic: require('../../assets/images/r30.png'),
          name: '暂未开启',
        }
      ],
      vipList: [],
      userInfo: null,
      historys:[],
    };
  },
  methods: {
    changeTabs(i){
      console.log(i)
      this.activeName2 = i.toString()
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
    faqClick(item) {
    	if (!item.select) {
    		for (let i = 0; i < this.faqList.length; i++) {
    			this.faqList[i].select = false
    		}
    		item.select = true;
    	} else {
    		item.select = false;
    	}
    },
    getHistory() {
      game_back_report_api().then(response => {
        let res = response.data
        if (res.code === 1) {
          this.historys = res.data;
          this.total_price = res.total_price;
        }
      })
    },
    getWaterConfiguration() {

      get_water_configuration().then(response => {
        let res = response.data
        if (res.code === 1) {
          this.vipList = res.data;
        }
      })
    },
    getMyRate() {
      let config = this.vipList[this.activeName2];
      let rate = '';
      for (const key in config.vipwater) {
        if (Object.hasOwnProperty.call(config.vipwater, key)) {
          const element = config.vipwater[key];
          if (element.gbc_viplvl == this.userInfo.level_id) {
            rate = parseFloat((element.gbc_rate * 1).toFixed(3));
            break;
          }
        }
      }
      return rate ? rate + '%' : '';
    },
    getMyNextRate() {
      let config = this.vipList[this.activeName2];
      let rate = '';
      for (const key in config.vipwater) {
        if (Object.hasOwnProperty.call(config.vipwater, key)) {
          const element = config.vipwater[key];
          if (element.gbc_viplvl == this.userInfo.next_level_id) {
            rate = parseFloat((element.gbc_rate * 1).toFixed(3));
            break;
          }
        }
      }

      return rate ? rate + '%' : '';
    }
  },
  mounted() {
    this.getWaterConfiguration();
    if (this.$store.state.isLoginStatu) {
      this.userInfo = this.$helper.get("userInfo");
      this.getHistory()
    }
  },
  created() {
    this.isPhone();
  }
};
</script>
<style scoped>
.page-cashback__body {
  margin-top: 32px;
}

.empty {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #55657e;
}

.cash-gallery {
  margin: 0;
  width: 100%;
  max-width: 490px;
}

.category-tabs {
  background: linear-gradient(180deg, rgba(28, 37, 50, 0), #1c2532);
}

.category-tabs,
.tab {
  border-radius: 14px;
  display: flex;
  align-items: center;
}

.tab {
  cursor: pointer;
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
  background: linear-gradient(180deg,
      rgba(34, 131, 246, 0),
      rgba(34, 131, 246, 0) 20%,
      rgba(34, 131, 246, 0.15) 60%,
      rgba(34, 131, 246, 0.4));
  opacity: 1;
}

.tab.active .tab__subtitle {
  color: #fff;
}

.tab:hover:not(.active):before {
  background: linear-gradient(180deg, rgba(22, 31, 44, 0), #1a2534);
  opacity: 1;
}

.tab:hover:not(.active):after {
  opacity: 0.75;
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

.tab__icon img {
  display: block;
  width: 100%;
  height: auto;
}

.tab__title {
  color: #fff;
  font-size: 16px;
  text-align: center;
}

.tab__subtitle,
.tab__title {
  font-weight: 600;
  white-space: nowrap;
  z-index: 1;
}
@media(max-width:768px){
  .tab__title{
    font-size: 14px;
  }
}
.tab__subtitle {
  color: #55657e;
  font-size: 11px;
  transition: color 0.1s ease-in-out;
}

.tab_disabled:not(.active) .tab__icon,
.tab_disabled:not(.active) .tab__subtitle,
.tab_disabled:not(.active) .tab__title {
  opacity: 0.2;
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

.about-cashback__header {
  margin-top: 80px;
}

.about-cashback__steps {
  margin-top: 50px;
}

.about-cashback__ranks {
  margin: 50px 0;
}

.about-cashback .faq-section__title {
  color: #fff;
}

.about-cashback .glide__bullets {
  bottom: -20px;
}

.cash-header {
  background: radial-gradient(57.03% 173.09% at 18.51%,
      at 17.65%,
      #0085ff 0,
      #003b75 33.37%,
      #002751 51.49%,
      #002045 72.51%,
      #001732 100%);
  background: radial-gradient(57.03% 173.09% at 18.51% 17.65%,
      #0085ff 0,
      #003b75 33.37%,
      #002751 51.49%,
      #002045 72.51%,
      #001732 100%);
  border-radius: 14px;
  display: flex;
  position: relative;
}

.header__img-racoon {
  position: absolute;
  z-index: 1;
  bottom: 0;
  height: auto;
}

.header__racoon {
  position: relative;
  width: 36%;
  background-size: cover;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzI4IiBoZWlnaHQ9IjQwMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTM4LTk3LjQgMTYuNiAyMzguN0w3OS43LTg2bC00OCAxOS42IDEwNi41IDIxNi4zTC0yMC0zMi01Ni42IDQuN2wxODAuNiAxNTdMLTg5LjcgNTRsLTIwIDQ3LjcgMjI4LjIgNzcuNy0yNDAuNS0xNi44djUxLjhsMjM4LjctMTYuNi0yMjcuMyA3NC45IDE5LjYgNDhMMTI1LjMgMjE0LTU2LjYgMzcyLjNsMzYuNiAzNi42IDE1Ny0xODAuNkwyOS40IDQ0Mmw0Ny44IDIwIDc3LjYtMjI4LjJMMTM4IDQ3NC4zaDUxLjhMMTczIDIzNS42IDI0OCA0NjIuOWw0OC0xOS42TDE4OS40IDIyN2wxNTguMiAxODEuOSAzNi42LTM2LjYtMTgwLjUtMTU3TDQxNy40IDMyM2wyMC00Ny44LTIyOC4yLTc3LjYgMjQwLjUgMTYuN3YtNTEuOEwyMTEgMTc5LjJsMjI3LjMtNzQuOS0xOS42LTQ4LTIxNi4zIDEwNi41TDM4NC4zIDQuNiAzNDcuNy0zMmwtMTU3IDE4MC41TDI5OC40LTY1bC00Ny43LTIwTDE3MyAxNDNsMTYuOC0yNDAuNUgxMzhaIiBmaWxsPSJ1cmwoI2EpIi8+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJhIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE3Ny4yIDE4OC42KSBzY2FsZSgxNzEuNzkyKSI+PHN0b3Agc3RvcC1jb2xvcj0iIzE2QUJGRiIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiMyNUIxRkYiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMEEzRkYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==) no-repeat 0 -120px;
}

.header__img-bg {
  position: absolute;
}

.header__info {
  padding: 48px 0 48px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.header-v__title {
  max-width: 475px;
  margin-bottom: 24px;
}

.header__cards-wrap .info-card {
  margin: 0 auto;
}

.steps__title {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
}

.steps__subtitle-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 30px;
  gap: 30px;
  margin-bottom: 24px;
}

.ranks__subtitle,
.steps__subtitle {
  color: #55657e;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  max-width: 700px;
  margin-bottom: 0;
}

.steps__cards-wrap {
  grid-gap: 30px;
  gap: 30px;
  display: flex;
}

.steps__cards-wrap .step-card:last-of-type .step-card__nipple,
.steps__cards-wrap .step-card:last-of-type .step-card__nipple-icon {
  display: none;
}

.ranks__subtitle {
  max-width: unset;
  margin-bottom: 16px;
}

.ranks__more {
  color: #3a07f2;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-decoration: none;
}

.ranks__cards-wrap {
  display: grid;
  grid-column: center-start/center-end;
  grid-template-columns: repeat(auto-fill, minmax(152px, 1fr));
  grid-gap: 20px;
  margin-bottom: 24px;
}

.button-type-text {
  display: block;
  padding: 5px;
}

.m-0-auto {
  margin: 0 auto;
}

.color-red {
  color: #ed1d49;
}

.step-card {
  position: relative;
  width: 100%;
  background: #111923;
  padding: 25px;
  display: grid;
  border-radius: 14px;
  grid-template-columns: 56px 1fr;
  grid-template-rows: 32px 26px auto;
  grid-template-areas: "img index" "img title" "body body";
}

.step-card__img {
  grid-area: img;
  width: 100%;
  height: auto;
}

.step-card__body,
.step-card__index,
.step-card__title {
  margin: 0;
}

.step-card__index,
.step-card__title {
  margin-left: 20px;
}

.step-card__index {
  color: #3a07f2;
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  grid-area: index;
}

.step-card__title {
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  grid-area: title;
}

.step-card__body {
  margin-top: 20px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  grid-area: body;
}

.step-card__nipple,
.step-card__nipple-icon {
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
}

.step-card__nipple {
  right: -19px;
}

.step-card__nipple-icon {
  right: -14px;
}

@media (max-width: 1100px) {

  .step-card__nipple,
  .step-card__nipple-icon {
    position: absolute;
    z-index: 1;
    top: unset;
    left: 50%;
    transform: translate(-50%) rotate(90deg);
  }

  .step-card__nipple {
    right: unset;
    bottom: -42px;
  }

  .step-card__nipple-icon {
    right: unset;
    bottom: -8px;
  }
}

@media (max-width: 1100px) {

  .about-cashback__header,
  .about-cashback__ranks,
  .about-cashback__steps {
    margin: 32px 0;
  }

  .cash-header {
    background: radial-gradient(116.46% 49.87% at 50%,
        at 70.56%,
        #0085ff 0,
        #003b75 33.37%,
        #002751 51.49%,
        #002045 72.51%,
        #001732 100%);
    background: radial-gradient(116.46% 49.87% at 50% 70.56%,
        #0085ff 0,
        #003b75 33.37%,
        #002751 51.49%,
        #002045 72.51%,
        #001732 100%);
    flex-direction: column;
    padding-bottom: 403px;
    align-items: center;
    text-align: center;
  }

  .header__img-racoon {
    width: 278px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }

  .header__racoon {
    width: 100%;
    height: 403px;
    position: absolute;
    bottom: 0;
    background-position: 50%;
  }

  .header__info {
    width: 100%;
    padding-bottom: 0;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
  }

  .header-v__title {
    margin-bottom: 24px;
  }

  .steps {
    position: relative;
    padding-bottom: 70px;
  }

  .steps__subtitle-wrap .button {
    position: absolute;
    bottom: 0;
  }

  .ranks__subtitle,
  .steps__subtitle {
    max-width: unset;
  }

  .steps__cards-wrap {
    flex-direction: column;
  }
}

.faq-items {
  margin-bottom: 50px;
  display: flex;
  width: 100%;
}

@media (max-width: 1100px) {
  .faq-items {
    flex-direction: column;
  }
}

@media (max-width: 1332px) {
  .opened-left-panel .faq-items {
    flex-direction: column;
  }
}

@media (max-width: 1425px) {
  .opened-right-panel .faq-items {
    flex-direction: column;
  }
}

@media (max-width: 1440px) {
  .opened-contests-panel .faq-items {
    flex-direction: column;
  }
}

@media (max-width: 1657px) {
  .opened-left-panel.opened-right-panel .faq-items {
    flex-direction: column;
  }
}

@media (max-width: 1672px) {
  .opened-left-panel.opened-contests-panel .faq-items {
    flex-direction: column;
  }
}

.faq-items__column {
  width: 50%;
  margin-right: 24px;
}

.faq-items__column:last-child {
  margin-right: 0;
}

@media (max-width: 1100px) {
  .faq-items__column {
    width: 100%;
    margin-right: 0;
  }
}

@media (max-width: 1332px) {
  .opened-left-panel .faq-items__column {
    width: 100%;
    margin-right: 0;
  }
}

@media (max-width: 1425px) {
  .opened-right-panel .faq-items__column {
    width: 100%;
    margin-right: 0;
  }
}

@media (max-width: 1440px) {
  .opened-contests-panel .faq-items__column {
    width: 100%;
    margin-right: 0;
  }
}

@media (max-width: 1657px) {
  .opened-left-panel.opened-right-panel .faq-items__column {
    width: 100%;
    margin-right: 0;
  }
}

@media (max-width: 1672px) {
  .opened-left-panel.opened-contests-panel .faq-items__column {
    width: 100%;
    margin-right: 0;
  }
}

.faq-element {
  padding: 24px 0;
  border-top: 1px solid #202a39;
  cursor: pointer;
}

.faq-element:last-child {
  border-bottom: 1px solid #202a39;
}

.faq-element__wrapper {
  position: relative;
}

.faq-element__title {
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  padding-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.faq-show .faq-element__title,
.faq-show .faq-element__title:hover {
  color: #3a07f2;
}

.faq-element__title:hover {
  color: #93acd3;
}

.faq-element__description {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #55657e;
  opacity: 0;
  height: 0;
  margin: 0;
  transition: .3s all;
}

.faq-show .faq-element__description {
  opacity: 1;
  margin: 17px 0 0;
  height: auto;
}

.faq-element__icon-block {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}

.faq-element__icon-arrow {
  fill: #3a07f2;
  transition: all 0.2s;
}

.faq-show .faq-element__icon-arrow {
  transform: rotate(180deg);
}

.faq-show {
  max-height: none;
}

.rank-card {
  text-align: center;
  background: url(../../assets/images/rank-card-bg.svg) no-repeat;
  background-size: cover;
  width: 152px;
  height: 212px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.rank-card__img {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%);
  height: 80px;
  width: 80px;
}

.rank-card__title {
  margin-bottom: 6px;
}

.rank-card__description {
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  color: #ffb636;
  margin-bottom: 20px;
}

.info-card {
  width: 100%;
  height: 192px;
  padding: 18px;
  background: hsla(0, 0%, 100%, 0.05);
  border-radius: 14px;
  text-align: center;
  white-space: normal;
}

.info-card__img {
  height: 45px;
  width: 42px;
  margin-bottom: 18px;
}

.info-card__title {
  margin-bottom: 8px;
}

.info-card__description {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #55657e;
}

.cashback__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  -moz-column-gap: 16px;
  column-gap: 16px;
  margin-bottom: 32px;
}

@media (max-width: 1000px) {
  .cashback__head {
    display: block;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .cashback__head {
    display: block;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .cashback__head {
    display: block;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .cashback__head {
    display: block;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .cashback__head {
    display: block;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .cashback__head {
    display: block;
  }
}

.cashback__left,
.cashback__rigth {
  overflow: hidden;
  border-radius: 14px;
  background-color: #161f2c;
  padding: 32px;
}

.cashback__left {
  padding-left: 210px;
  position: relative;
  background: linear-gradient(90deg,
      #024485,
      #092a4b 30.15%,
      #0c2541 37.62%,
      #161f2c 57.87%);
  background-position: 0;
  background-repeat: no-repeat;
  background-size: contain;
}

@media (max-width: 1000px) {
  .cashback__left {
    margin-bottom: 16px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .cashback__left {
    margin-bottom: 16px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .cashback__left {
    margin-bottom: 16px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .cashback__left {
    margin-bottom: 16px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .cashback__left {
    margin-bottom: 16px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .cashback__left {
    margin-bottom: 16px;
  }
}

@media (max-width: 550px) {
  .cashback__left {
    padding-left: 32px;
  }
}

@media (max-width: 782px) {
  .opened-left-panel .cashback__left {
    padding-left: 32px;
  }
}

@media (max-width: 875px) {
  .opened-right-panel .cashback__left {
    padding-left: 32px;
  }
}

@media (max-width: 890px) {
  .opened-contests-panel .cashback__left {
    padding-left: 32px;
  }
}

@media (max-width: 1107px) {
  .opened-left-panel.opened-right-panel .cashback__left {
    padding-left: 32px;
  }
}

@media (max-width: 1122px) {
  .opened-left-panel.opened-contests-panel .cashback__left {
    padding-left: 32px;
  }
}

.cashback__left>img {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
}

@media (max-width: 550px) {
  .cashback__left>img {
    display: none;
  }
}

@media (max-width: 782px) {
  .opened-left-panel .cashback__left>img {
    display: none;
  }
}

@media (max-width: 875px) {
  .opened-right-panel .cashback__left>img {
    display: none;
  }
}

@media (max-width: 890px) {
  .opened-contests-panel .cashback__left>img {
    display: none;
  }
}

@media (max-width: 1107px) {
  .opened-left-panel.opened-right-panel .cashback__left>img {
    display: none;
  }
}

@media (max-width: 1122px) {
  .opened-left-panel.opened-contests-panel .cashback__left>img {
    display: none;
  }
}

.cashback__table {
  overflow-x: auto;
}

.my-rank {
  display: flex;
  flex-direction: column;
  min-height: 68px;
  border-bottom: 1px solid #2a3546;
  padding-left: 82px;
  position: relative;
  box-sizing: content-box;
  padding-bottom: 20px;
  margin-bottom: 24px;
  padding-top: 10px;
}

.my-rank__rank {
  top: 0;
  left: 0;
  position: absolute;
  width: 78px;
}

.my-rank__title {
  font-size: 12px;
  color: #55657e;
}

.my-rank__title span {
  color: #fff;
}

.my-rank__title button {
  margin-left: 1em;
  padding: 0;
  border: none;
  color: #3a07f2;
  text-decoration: underline;
}

.my-rank__title button:hover {
  text-decoration: none;
}

.my-rank__subtitle {
  font-size: 24px;
  font-weight: 700;
  min-width: 200px;
}

.cashback-progress {
  margin-bottom: 16px;
}

.cashback-progress__body {
  display: flex;
  align-items: center;
}

.cashback-progress__title {
  font-size: 12px;
}

.cashback-progress__item {
  font-size: 32px;
  font-weight: 700;
  color: #202a39;
  line-height: 1;
  white-space: nowrap;
}

.cashback-progress__item_active {
  color: #1bb83d;
}

.cashback-progress img {
  margin: 0 8px;
}

.cashback-accrual__title {
  font-size: 12px;
}

.cashback-accrual__body {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #ffb636;
}

.balances {
  height: 100%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 1000px) {
  .balances {
    min-height: 250px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .balances {
    min-height: 250px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .balances {
    min-height: 250px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .balances {
    min-height: 250px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .balances {
    min-height: 250px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .balances {
    min-height: 250px;
  }
}

.balances__tabs {
  margin-bottom: 24px;
}

.balances__body {
  flex: 1 1;
  position: relative;
}

.balances__footer {
  margin-top: 24px;
}

.cashback-scroll {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.cashback-scroll__item {
  width: 50%;
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
}

@media (max-width: 550px) {
  .cashback-scroll__item {
    width: 100%;
  }
}

@media (max-width: 782px) {
  .opened-left-panel .cashback-scroll__item {
    width: 100%;
  }
}

@media (max-width: 875px) {
  .opened-right-panel .cashback-scroll__item {
    width: 100%;
  }
}

@media (max-width: 890px) {
  .opened-contests-panel .cashback-scroll__item {
    width: 100%;
  }
}

@media (max-width: 1107px) {
  .opened-left-panel.opened-right-panel .cashback-scroll__item {
    width: 100%;
  }
}

@media (max-width: 1122px) {
  .opened-left-panel.opened-contests-panel .cashback-scroll__item {
    width: 100%;
  }
}

.cashback-scroll__item span {
  font-size: 14px;
  margin-left: 0.5em;
}

.button-tab {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button-tab span {
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
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

.button-tab:active,
.button-tab:focus {
  outline: none;
}

.button-tab:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.button-tab i {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5em;
  width: 1.5em;
}

.button-tab i svg {
  transition: fill 0.1s ease-in-out;
}

.button-tab.loading {
  color: transparent !important;
  pointer-events: none;
  transition: all 0s !important;
}

.button-tab.loading i {
  opacity: 0;
}

.button-tab.loading:after {
  position: absolute;
  content: "";
  display: block;
  -webkit-animation: spinAround-data-v-7f052bfc 0.5s linear infinite;
  animation: spinAround-data-v-7f052bfc 0.5s linear infinite;
  border-radius: 50%;
  border: 2px solid transparent;
  height: 1em;
  width: 1em;
  left: calc(50% - 0.5em);
  top: calc(50% - 0.5em);
}

.button-tab.fullwidth {
  display: flex;
  width: 100%;
  justify-content: center;
}

.button-tab i svg {
  fill: #fff;
}

.button-tab:focus,
.button-tab:hover {
  background-color: #0b6ada;
  color: #fff;
}

.button-tab:focus i svg,
.button-tab:hover i svg {
  fill: #fff;
}

.button-tab:active {
  background-color: #0a64ce;
  color: #f9f9f9;
}

.button-tab:active i svg {
  fill: #f9f9f9;
}

.button-tab:disabled {
  background-color: #6cafff;
  border-color: transparent;
  box-shadow: none;
  color: hsla(0, 0%, 100%, 0.7);
}

.button-tab:disabled i svg {
  fill: hsla(0, 0%, 100%, 0.7);
}

.button-tab.loading:after {
  border-color: transparent transparent #fff #fff !important;
}

.button-tab i svg {
  fill: #93acd3;
}

.button-tab.active,
.button-tab:active,
.button-tab:focus,
.button-tab:hover {
  color: #fff;
  background-color: transparent;
}

.button-tab.active i svg,
.button-tab:active i svg,
.button-tab:focus i svg,
.button-tab:hover i svg {
  fill: #fff;
}

.button-tab.active,
.button-tab:disabled {
  cursor: default;
  background-color: #3a07f2;
  opacity: 1;
}

.button-tab:disabled:not(.active) {
  background-color: transparent;
}

.button-tab_xs {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 3rem;
}

.button-tab_xs i:first-child:not(:last-child) {
  margin-left: -6px;
}

.button-tab_xs i:last-child:not(:first-child) {
  margin-right: -6px;
}

.button-tab_xs i:first-child:last-child {
  margin-left: -6px;
  margin-right: -6px;
}

.button-tab_xs i img,
.button-tab_xs i svg {
  width: 100%;
  height: 100%;
}

.button-tab_xs i~span {
  margin-left: 2px;
}

.button-tab_sm {
  font-size: 12px;
  border-radius: 10px;
  padding: 5px 10px;
  border-radius: 3rem;
}

.button-tab_sm i:first-child:not(:last-child) {
  margin-left: -5px;
}

.button-tab_sm i:last-child:not(:first-child) {
  margin-right: -5px;
}

.button-tab_sm i:first-child:last-child {
  margin-left: -5px;
  margin-right: -5px;
}

.button-tab_sm i img,
.button-tab_sm i svg {
  width: 100%;
  height: 100%;
}

.button-tab_sm i~span {
  margin-left: 4px;
}

.button-tab_md {
  font-size: 14px;
  border-radius: 10px;
  padding: 8px 12px;
  border-radius: 3rem;
}

.button-tab_md i:first-child:not(:last-child) {
  margin-left: -4px;
}

.button-tab_md i:last-child:not(:first-child) {
  margin-right: -4px;
}

.button-tab_md i:first-child:last-child {
  margin-left: -4px;
  margin-right: -4px;
}

.button-tab_md i img,
.button-tab_md i svg {
  width: 100%;
  height: 100%;
}

.button-tab_md i~span {
  margin-left: 8px;
}

.button-tab_lg {
  font-size: 16px;
  border-radius: 10px;
  padding: 8px 12px;
  border-radius: 3rem;
}

.button-tab_lg i:first-child:not(:last-child) {
  margin-left: -4px;
}

.button-tab_lg i:last-child:not(:first-child) {
  margin-right: -4px;
}

.button-tab_lg i:first-child:last-child {
  margin-left: -4px;
  margin-right: -4px;
}

.button-tab_lg i img,
.button-tab_lg i svg {
  width: 100%;
  height: 100%;
}

.button-tab_lg i~span {
  margin-left: 8px;
}

.button-tab_xl {
  font-size: 18px;
  padding: 16px 20px;
  border-radius: 3rem;
}

.button-tab_xl i:first-child:not(:last-child) {
  margin-left: -4px;
}

.button-tab_xl i:last-child:not(:first-child) {
  margin-right: -4px;
}

.button-tab_xl i:first-child:last-child {
  margin-left: -4px;
  margin-right: -4px;
}

.button-tab_xl i img,
.button-tab_xl i svg {
  width: 100%;
  height: 100%;
}

.button-tab_xl i~span {
  margin-left: 8px;
}

.empty-block {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-block span {
  text-align: center;
  color: #55657e;
  font-size: 12px;
}

.empty-block img {
  width: 81px;
}

.empty-block--total span {
  font-size: 14px;
}

.empty-block--total img {
  width: 144px;
}

.empty-block__img-wrap {
  position: relative;
}

.empty-block__img-wrap:after {
  content: "";
  display: block;
  width: 100%;
  height: 54px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: linear-gradient(180deg,
      rgba(22, 31, 44, 0),
      rgba(22, 31, 44, 0.74) 56.18%,
      #161f2c);
}

.steps__title {
  margin-bottom: 10px;
}
.cashback-scroll,
.cashback__table {
    scrollbar-color: #2a3546 rgba(13, 19, 28, 0.8);
    scrollbar-color: var(--color_grey-60) rgba(13, 19, 28, 0.8);
    scrollbar-width: thin;
    overflow-y: auto;
}
.cashback__table {
    overflow-x: auto;
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

table td:first-child,
table th:first-child {
    padding-left: 16px;
}
table td:last-child,
table th:last-child {
    padding-right: 16px;
}

table td:nth-child(2),
table th:nth-child(3) {
    width: 180px;
    min-width: 180px;
    white-space: nowrap;
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
    -webkit-animation-name: horizont-1-data-v-1eb47bdc;
    animation-name: horizont-1-data-v-1eb47bdc;
}

table tbody tr:nth-child(odd) {
    -webkit-animation-name: horizont-3-data-v-1eb47bdc;
    animation-name: horizont-3-data-v-1eb47bdc;
}

table.no-animation tbody tr {
    -webkit-animation: none;
    animation: none;
}

table tbody td {
    position: relative;
    vertical-align: top;
    padding: 18px 8px;
}
table td:first-child,
table th:first-child {
    padding-left: 16px;
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
.datetime {
    white-space: nowrap;
}

.status-fail,
.status-ok,
.status-wait {
    position: relative;
}
.status-fail {
    color: #e5342c;
}
.status-ok {
    display: flex;
    align-items: center;
    color: #1bb83d;
}
.status-wait {
    color: #fed700;
}
</style>
