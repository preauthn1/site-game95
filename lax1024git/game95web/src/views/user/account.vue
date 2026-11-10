<template>
 <!--  <div class="app" :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">

    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" /> -->
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="page-account">
            <accountTabsnew num = "a"></accountTabsnew>
            <div class="page-account__body" v-if="$store.state.userInfo">
              <div class="my-account">

                <el-skeleton :rows="10" animated v-if="isLoading" />
                <user v-if="!isLoading" @change="userVisible = true"></user>
<!--                <el-row v-if="!isLoading" :gutter="26" type="flex" style="flex-wrap: wrap;">-->
<!--                  <el-col :span="7" :xs="24" style="margin-bottom: 16px;">-->
<!--                    <user style="height:100%" @change="userVisible = true"></user>-->
<!--                  </el-col>-->
<!--                  <el-col :span="17" :xs="24" style="margin-bottom: 16px;">-->
<!--                    <vip-list :cashbackList="cashbackList" :list="userVipData" style="height:100%"></vip-list>-->
<!--                  </el-col>-->
<!--                </el-row>-->
                <div class="statistic-chat">
                  <h4 class="statistic-chat__top">{{ $t('流水概览') }}</h4>
<!--                  <div class="statistic-chat__bott">-->
<!--                    <div class="stat-block">-->
<!--                      <h6 class="stat-block__title">{{ $t('剩余流水') }}</h6>-->
<!--                      <span class="stat-block__data">{{ numFormat($store.state.userInfo.savings, true) }}</span>-->
<!--                    </div>-->
<!--                    <div class="stat-block">-->
<!--                      <h6 class="stat-block__title">{{ $t('已完成流水') }}</h6>-->
<!--                      <span class="stat-block__data">{{ numFormat($store.state.userInfo.water, true) }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
                </div>
                <cashBack v-if="!isLoading" :cashbackList="cashbackList"></cashBack>

                <div class="statistic" v-if="!isLoading">
                  <div class="statistic__games">
                    <h3>{{ $t('游戏统计信息') }}</h3>
                    <div class="statistic-table">
                      <div class="statistic-table__head">
                        <div class="head">
                          <div class="head__item">
                            <span class="head__label">
                              <span class="m-r-5">{{ $t('总赌注') }}</span>
                              <el-tooltip class="item" effect="dark" :content="$t('用于投注的金额')" placement="top">
                                <svgIcon icon="icon-question" widthName="16" heightName="16"></svgIcon>
                              </el-tooltip>
                            </span>
                            <span class="head__body">
                              <span class="currency">
                                <span style="color: rgb(255, 255, 255);">
                                  <div class="currency__balance-block">
                                    <div class="currency__balances">
                                      <span class="balance">{{ numFormat(statisticsData.total_price, true) }}</span>
                                    </div>
                                  </div>
                                </span>
                              </span>
                            </span>
                          </div>
<!--                          -->
                          <div class="head__item" v-if="$store.state.accountBetShow == 1">
                            <span class="head__label">{{ $t('总盈利') }}</span>
                            <span class="head__body">{{ numFormat(statisticsData.total_winprice, true) }}</span>
                          </div>
                          <div class="head__item" v-if="$store.state.accountBetShow == 1">
                            <span class="head__label">{{ $t('总亏损') }}</span>
                            <span class="head__body">{{ numFormat(statisticsData.total_loss, true) }}</span>
                          </div>
<!--                          <button class="btn-detail" @click="statisticToggle">-->
<!--                            <span v-if="statisticShow">{{ $t('收起') }}</span><span v-else>{{ $t('详细') }}</span>-->
<!--                            <svgIcon v-if="statisticShow" icon="icon-arrow-up" widthName="14" heightName="14"></svgIcon>-->
<!--                            <svgIcon v-else icon="icon-arrow-down" widthName="14" heightName="14"></svgIcon>-->
<!--                          </button>-->
                        </div>
                      </div>
                      <!-- show detail -->
                      <div class="statistic-table__body">
                        <div class="body">
                          <div class="body__head">
                            <h4>{{ $t('详细的赌注信息') }}</h4>
                            <el-select size="small" v-model="detValue" @change="selectChange" :placeholder="$t('请选择')">
                              <el-option v-for="item in detOptions" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                            </el-select>
                          </div>
                          <div class="body__table"
                            :style="$store.state.moduleLoading ? 'min-height: 200px;margin-top: 20px' : ''"
                            v-loading="$store.state.moduleLoading" element-loading-background="rgba(0, 0, 0, 0.2)">
                            <table class="no-animation">
                              <thead v-if="gameOrderList.length > 0">
                                <tr>
                                  <th>{{ $t('下注') }}</th>
                                  <th>{{ $t('名称') }}</th>
                                  <th>{{ $t('游戏结果') }}</th>
                                  <th>{{ $t('赢的金额') }}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, index) in gameOrderList" :key="`gameOrderList${index}`" :class="(index+1)%2==0?'zebra-stripe-2':'zebra-stripe-1'">
                                  <td>
                                    <span class="currency">
                                      <div class="currency__balances-wrap">
                                        <div class="currency__balances">
                                          <span class="currency__balances--balance" style="font-size: 14px;">
                                            <span style="color: #fff" class="font-digits">{{numFormat(item.gb_price,true) }}</span>
                                          </span>
                                        </div>
                                      </div>
                                    </span>
                                  </td>
                                  <td>{{ $t(item.game_name) }}</td>
                                  <td class="td_payout">
                                    <el-tag size="mini" v-if="item.gb_winlose == 2" type="danger">{{ $t('输') }}</el-tag>
                                    <el-tag size="mini" v-else-if="item.gb_winlose == 3" type="success">{{ $t('赢')}}</el-tag>
                                    <el-tag size="mini" v-else-if="item.gb_winlose == 4" type="warning">{{ $t('平')}}</el-tag>
                                    <el-tag size="mini" v-else-if="item.gb_winlose == 1">{{ $t('未结算') }}</el-tag>
                                    <el-tag size="mini" v-else-if="item.gb_winlose == 0" type="info">{{ $t('无效')}}</el-tag>
                                  </td>
                                  <td>{{ numFormat(item.gb_winprice ? item.gb_winprice : '0.00', true) }}</td>
                                </tr>
                              </tbody>
                            </table>
                            <div class="container-class" v-if="gameOrderList.length > 0">
                              <el-pagination background :small="isMobileFlag" :pager-count="5"
                                layout="prev, pager, next" :current-page.sync="currentPage" :page-size="5"
                                @current-change="handleSizeChange" :total="listTotal"></el-pagination>
                            </div>
                            <div class="empty" v-if="gameOrderList.length == 0 && !$store.state.moduleLoading">
                              <span>{{ $t('暂无数据') }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="statistic-chat">
                      <h4 class="statistic-chat__top">{{ $t('活动金额') }}</h4>
                      <div class="statistic-chat__bott">
                        <div class="stat-block">
                          <h6 class="stat-block__title">{{ $t('总金额') }}</h6>
                          <span class="stat-block__data">
                            <span class="currency">
                              <span style="color: rgb(255, 255, 255);">
                                <div class="currency__balance-block">
                                  <div class="currency__balances">
                                    <span class="balance">{{ numFormat(actionStatistics.total_price, true) }}</span>
                                  </div>
                                </div>
                              </span>
                            </span>
                          </span>
                        </div>
                        <div class="stat-block">
                          <h6 class="stat-block__title">{{ $t('已派送金额') }}</h6>
                          <span class="stat-block__data">
                            <span class="currency">
                              <span style="color: rgb(255, 255, 255);">
                                <div class="currency__balance-block">
                                  <div class="currency__balances">
                                    <span class="balance">{{ numFormat(actionStatistics.total_distributed, true)
                                      }}</span>
                                  </div>
                                </div>
                              </span>
                            </span>
                          </span>
                        </div>
                        <div class="stat-block">
                          <h6 class="stat-block__title">{{ $t('未派送金额') }}</h6>
                          <span class="stat-block__data">
                            <span class="currency">
                              <span style="color: rgb(255, 255, 255);">
                                <div class="currency__balance-block">
                                  <div class="currency__balances">
                                    <span class="balance">{{ numFormat(actionStatistics.total_undistributed, true)
                                      }}</span>
                                  </div>
                                </div>
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <!--  <Foot />
    </div>
    <template v-if="j">
      <asidebar @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <template v-else>
      <asidebar v-if="i" @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar> -->
    <two-fa-act ref="fa2act"></two-fa-act>
    <two-fa-set ref="fa2set"></two-fa-set>
    <verify ref="verify" @enter="verifyEnter"></verify>
    <bindPhone ref="bindPhone"></bindPhone>
    <div class="app-overlay" v-if="isMobileFlag" :class="openedleft ? 'visible' : ''" @click="menuClick"></div>
    <!-- 密码 弹窗 -->
    <el-dialog :modal-append-to-body="false" :close-on-click-modal="false" v-if="$store.state.userInfo"
      :visible.sync="pwdVisible" :before-close="pwdModalClose" custom-class="custom-dialog modal-change">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('更改密码') }}</h1>
        </div>
      </div>
      <el-form ref="form" :model="pwdform">
        <el-form-item v-if="$store.state.userInfo.ispass">
          <el-input v-model="pwdform.newPwd" type="password" :placeholder="$t('旧密码')" show-password clearable>
            <span slot="prefix">
              <svgIcon icon="icon-locked-new" widthName="20" heightName="20"></svgIcon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="pwdform.comfirmNewPwd" type="password" :placeholder="$t('输入密码')" show-password clearable>
            <span slot="prefix">
              <svgIcon icon="icon-locked-new" widthName="20" heightName="20"></svgIcon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="pwdform.curPassword" type="password" :placeholder="$t('重复输入密码')" show-password clearable>
            <span slot="prefix">
              <svgIcon icon="icon-locked-new" widthName="20" heightName="20"></svgIcon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button_fullwidth button_red" :loading="$store.state.bottonLoading"
            @click="pwdSubmit">{{ $t('确认') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 会员rank -->
    <el-dialog :visible.sync="rankVisible" custom-class="custom-dialog custom-rank-dialog"
      :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('所有等级') }}</h1>
        </div>
        <div class="header__subtitle">{{ $t('最佳福利') }}</div>
      </div>
      <div class="rank-slider">
        <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
          <swiper-slide v-for="(item, index) in userVipData" :key="`userVipData${index}`">
            <div class="rank-slider__slide glide__slide--active">
              <!-- <img
                loading="lazy"
                :src="item.levelImg"
                v-if="$store.state.userInfo.level_name == item.level_name"
                alt
                class="rank-slider__bg"
              /> -->
              <div class="rank-slider__slider-body">
                <div class="rank-slider__image">
                  <img loading="lazy" :src="item.levelImg" alt />
                </div>
                <h4 class="rank-slider__title">{{ item.level_name }}</h4>
                <div class="rank-slider__details" v-if="item.vip_condition.length > 0">
                  <div class="rank-slider__detail" v-for="(im, it) in item.vip_condition" :key="`vip_condition${it}`">
                    <p class="rank-slider__label">{{ $t(im.key) }}</p>
                    <p class="rank-slider__cashback">{{ im.value }}</p>
                  </div>
                </div>
                <div class="rank-slider__details" v-else>
                  <div class="rank-slider__detail">
                    <p class="rank-slider__label">{{ $t('累计充值金额') }}</p>
                    <p class="rank-slider__cashback">0/0</p>
                  </div>
                  <div class="rank-slider__detail">
                    <p class="rank-slider__label">{{ $t('游戏流水') }}</p>
                    <p class="rank-slider__cashback">0/0</p>
                  </div>
                </div>

              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div data-glide-el="controls" class="rank-slider__navigator">
          <button type="button"
            class="button rank-slider__arrow rank-slider__left-arrow button_md button_grey1 button_center button_only-icon"
            data-glide-dir="<">
            <span class="button__inner">
              <span class="button__icon">
                <svgIcon icon="icon-arrow-left-small" widthName="20" heightName="20"></svgIcon>
              </span>
            </span>
          </button>
          <button type="button"
            class="button rank-slider__arrow rank-slider__right-arrow button_md button_grey1 button_center button_only-icon"
            data-glide-dir=">">
            <span class="button__inner">
              <span class="button__icon">
                <svgIcon icon="icon-arrow-right-small" widthName="20" heightName="20"></svgIcon>
              </span>
            </span>
          </button>
        </div>
      </div>
    </el-dialog>
    <!-- 头像，名称 -->
    <el-dialog :visible.sync="userVisible" custom-class="custom-dialog modal-change" :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('修改头像') }}</h1>
        </div>
      </div>
      <el-form ref="form" :model="formData">
        <el-form-item>
          <div class="modal-changeusername__body mt-3">
<!--            <h2>{{ $t('更换头像') }}</h2>-->
            <div class="modal-changeusername__scroll">
              <div class="avatar-block">
                <div class="avatar-block__inner">
                  <span class="avatar-item" :class="avatarCur == index ? 'selected' : ''"
                    v-for="(item, index) in avatarLists" :key="index" @click="avatarSelect(index)">
                    <div class="user__avatar"
                      style="width: 64px; height: 64px; overflow: hidden; border-radius: 50%; cursor: pointer;">
                      <el-image :src="item.pic" style="width: 64px; height: 64px;border-radius: 50%;"></el-image>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('更改用户名')">
          <el-input v-model="formData.real_name" :placeholder="$t('新用户名')" clearable></el-input>
        </el-form-item>
        <el-form-item>
<!--          class="button_fullwidth button_red"-->
          <el-button @click="nameSubmit" type="warning" style="width: 100%"
            :loading="$store.state.bottonLoading">{{ $t('确认') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import twoFaAct from "@/components/twoFaAct.vue";
import twoFaSet from "@/components/twoFaSet.vue";
import verify from "@/components/verify.vue";
import bindPhone from "@/components/bindPhone.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import cashBack from './accountComponents/cashBack.vue'
import user from './accountComponents/user.vue'
import vipList from './accountComponents/vipList.vue'
import accountTabsnew from "../../components/accountTabs_new.vue"
import { game_statistics_api, game_order_api } from "@/api/cybSports";

import {
  my_editinfo_api,
  user_vip_api,
  user_vip_api2,
  action_statistics_api,
  get_water_configuration,
  user_get_default_head_img_api
} from "@/api/user";
const size = window.innerWidth
let width_size = true
let app = true
if (size < 1024) {
  console.log('进来了')
  width_size = false
  app = false
}
export default {
  components: {
    Head,
    Foot,
    twoFaAct,
    twoFaSet,
    asidebar,
    svgIcon,
    tabbar,
    verify,
    bindPhone,
    cashBack,
    user,
    vipList,
    accountTabsnew,
  },
  data() {
    return {
      i: width_size,
      j: app,
      isLoading: false,
      cashbackList: [],//现金返还数据
      // username avatar
      userVisible: false,
      avatarCur: -1,
      avatarLists: [],
      // rank
      rankVisible: false,
      levels: [
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r1.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r2.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r3.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r4.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r5.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r6.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r7.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r8.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r9.png")
        },
        {
          title: "Newcomer",
          numpic: require("../../assets/images/r10.png")
        }
      ],
      swiperOptionThumbs: {
        loop: true,
        autoplay: 3000,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".rank-slider__right-arrow",
          prevEl: ".rank-slider__left-arrow"
        },
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
          640: {
            slidesPerView: 1
          },
          1200: {
            slidesPerView: 3
          }
        }
      },
      pwdVisible: false,
      pwdform: {
        newPwd: "",
        comfirmNewPwd: "",
        curPassword: ""
      },
      verify_code: '',
      setchecked: false,
      statisticShow: false,
      detOptions: [
        {
          value: this.$t("所有"),
          label: this.$t("所有"),
          settlement: 0
        },
        {
          value: this.$t("已结算"),
          label: this.$t("已结算"),
          settlement: 1
        },
        {
          value: this.$t("未结算"),
          label: this.$t("未结算"),
          settlement: 2
        }
      ],
      detValue: this.$t("所有"),
      head_userInfo: {}, //用户信息
      formData: {
        real_name: ""
      },
      userVipData: [],
      statisticsData: {},
      actionStatistics: {},
      gameOrderList: [
        // {gb_price:1,game_name:'111',gb_winlose:1},
        // {gb_price:1,game_name:'222',gb_winlose:2},
        // {gb_price:1,game_name:'333',gb_winlose:3},
      ],
      listTotal: 0,
      currentPage: 1,
      gameOrderListPage: 1,
      settlement: 0,
    };
  },
  methods: {
    async getAvatarList() {
      const { data: res } = await user_get_default_head_img_api()
      if (res.code == 1) {
        this.avatarLists = res.data.map(item => ({ ...item, pic: item.url }))
      }
    },
    /**
     * 获取现金返还信息
     */
    async getCashbackList() {
      let res = await get_water_configuration()
      if (res && res.data.code == 1) {
        this.cashbackList = res.data.data
      }
    },
    onBindPhone(type) {
      this.$refs.bindPhone.show(type)
    },
    verifyShow(type, code) {
      this.verify_code = '';
      this.$refs.verify.show(type, code)
    },
    verifyClose() {
      this.verify_code = '';
      this.$refs.verify.close()
    },
    verifyEnter(code, type) {
      this.verify_code = code;
      if (type === 'login_password_check') {
        this.verify_code && this.pwdSubmit();
      }
    },
    fa2ActShow() {
      this.$refs.fa2act.show()
    },
    fa2SetShow() {
      this.$refs.fa2set.show()
    },
    showPwdModal() {
      this.pwdVisible = true;
    },
    pwdModalClose(done) {
      if (this.$route.query.modal === 'paypwd' || this.$route.query.modal === 'loginpwd') {
        window.location.href = window.location.href.replace('?modal=paypwd', '')
          .replace('&modal=paypwd', '')
          .replace('?modal=loginpwd', '')
          .replace('&modal=loginpwd', '');
      }
      done();
    },
    selectChange(e) {
      for (let i in this.detOptions) {
        if (this.detOptions[i].value == e) {
          this.settlement = this.detOptions[i].settlement;
          this.currentPage = 1;
          this.gameOrderListPage = 1;
          this.gameOrderList = [];
          this.getGameOrder();
        }
      }
    },
    handleSizeChange(e) {
      this.gameOrderListPage = e;
      this.gameOrderList = [];
      this.getGameOrder();
    },
    // 获取游戏记录
    async getGameOrder() {
      this.$store.commit("$vuexSetModuleLoadingState", true);
      await game_order_api({
        page: this.gameOrderListPage,
        limit: 5,
        settlement: this.settlement
      }).then(res => {
        if (res && res.data.code == 1) {
          this.gameOrderList = res.data.data;
          this.listTotal = res.data.total;
        }
        this.$store.commit("$vuexSetModuleLoadingState", false);
      });
    },
    async getUserVip() {
      await user_vip_api().then(res => {
        if (res && res.data.code == 1) {
          let arr = res.data.data;
          if (arr.length > 0) {
            for (let i in arr) {
              let num = arr[i].level_name.substring(
                3,
                arr[i].level_name.length
              );
              let keys = i * 1 + 1 > 20 ? 20 : i * 1 + 1;

              arr[i].levelImg = arr[i].image || require(`../../assets/images/r${keys}.png`);
              arr[i].levelNum = Number(num);
            }
            this.userVipData = arr;
          }
        }
      });
    },
    async getUserVip2() {
      await user_vip_api2().then(res => {
        if (res && res.data.code == 1) {
          let arr = res.data.data;
          if (arr.length > 0) {
            for (let i in arr) {
              let num = arr[i].level_name.substring(
                3,
                arr[i].level_name.length
              );
              let keys = i * 1 + 1 > 10 ? 10 : i * 1 + 1;
              arr[i].levelImg = require(`../../assets/images/r${keys}.png`);
              arr[i].levelNum = Number(num);
            }
            this.userVipData = arr;
          }
        }
      });
    },
    // 获取活动统计
    async getActionStatistics() {
      await action_statistics_api().then(res => {
        if (res && res.data.code == 1) {
          this.actionStatistics = res.data.data;
        }
      });
    },
    // 获取游戏统计
    async gameStatistics() {
      await game_statistics_api().then(res => {
        if (res && res.data.code == 1) {
          this.statisticsData = res.data.data;
        }
      });
    },
    loginStatus() {
      if (this.$helper.get("tokenInfo")) {
        this.$store.commit("$vuexSetLoginState", true);
        this.$store.commit("$vuexUserInfo", this.$helper.get("userInfo"));
        console.log(this.$helper.get("userformAvatar"), 'this.$helper.get("userformAvatar")this.$helper.get("userformAvatar")');
        this.$store.commit("$vuexSetUserAvatarState", this.$helper.get("userformAvatar"));
        this.head_userInfo = this.$store.state.userInfo;
        this.updateUserInfo()
      } else {
        this.$store.commit(
          "$vuexSetUserAvatarState",
          "https://0simg.s3.ap-southeast-1.amazonaws.com/storage/img/20221219/7eb0637d17840e0bef3df06c1e6b1c4c.png"
        );
      }
    },
    getUserInfo() {
      this.updateUserInfo();
    },
    nameSubmit() {
      let data = {};
      if (this.userformAvatar && this.userformAvatar != this.head_userInfo.head_img) {
        data['head_img'] = this.userformAvatar;
      }

      if (this.formData.real_name) {
        data['real_name'] = this.formData.real_name;
      }
      if (Object.keys(data).length === 0) {
        this.errorTips('请完善信息');
        return;
      }

      let self = this;
      this.editinfoPost(data, function () {
        self.$helper.set("userformAvatar", self.userformAvatar);
        self.formData.real_name = "";
        self.getUserInfo();
        self.userVisible = false;
      });
    },
    async pwdSubmit() {
      if (this.$store.state.userInfo.ispass && this.pwdform.newPwd == "") {
        this.errorTips('请输入旧密码');
        return false;
      }
      if (this.pwdform.comfirmNewPwd == "") {
        this.errorTips('请输入密码');
        return false;
      }
      if (this.pwdform.curPassword == "") {
        this.errorTips('请输入重复密码');
        return false;
      }
      if (this.pwdform.comfirmNewPwd.length < 6) {
        this.errorTips('密码长度不能低于6位字符');
        return;
      }
      if (this.pwdform.comfirmNewPwd != this.pwdform.curPassword) {
        this.errorTips('密码不一致');
        return false;
      }
      this.$store.commit("$vuexSetBottonLoadingState", true);
      let param = {
        old_password: this.pwdform.newPwd,
        password: this.pwdform.comfirmNewPwd,
        verify_code: this.verify_code
      };
      await my_editinfo_api(param).then(res => {
        if (res && res.data.code == 1) {
          this.updateUserInfo();
          this.pwdform.newPwd = "";
          this.pwdform.comfirmNewPwd = "";
          this.pwdform.curPassword = "";
          this.pwdVisible = false;
          this.successTips(res.data.msg);
          this.verifyClose();
        } else if (res && (res.data.code == 110 || res.data.code == 120 || res.data.code == 130)) {
          this.verify_code && this.errorTips(res.data.msg)
          this.verifyShow('login_password_check', res.data.code);
        } else {
          this.verifyClose();
          this.errorTips(res.data.msg);
        }
        this.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },

    async editinfoPost(data, callback) {
      let self = this;
      self.$store.commit("$vuexSetBottonLoadingState", true);
      await my_editinfo_api(data).then(res => {
        if (typeof callback === 'function') {
          callback(res && res.data.code == 1 ? 'success' : 'error', res);
        }
        if (res && res.data.code == 1) {
          self.successTips(res.data.msg);
        } else {
          self.errorTips(res.data.msg);
        }
        self.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },
    avatarSelect(index) {
      console.log(index, 'indexindexindexindex');
      this.avatarCur = index;
      this.userformAvatar = this.avatarLists[index].pic;
      this.$store.commit(
        "$vuexSetUserAvatarState",
        this.avatarLists[index].pic
      );
    },
    menuClick() {
      this.i = !this.i
      this.openedleft = !this.openedleft;
    },
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
    },
    statisticToggle() {
      this.statisticShow = !this.statisticShow;
    },
    listenRouter() {
      if (this.$route.query.modal) {
        let modal = this.$route.query.modal;
        if (modal == 'loginpwd') {
          if (!this.pwdVisible) {
            this.showPwdModal(modal == 'loginpwd');
          }
        } else if (modal == 'enabled2fa') {
          this.fa2ActShow();
        }
      }
    }
  },
  async mounted() {
    this.isLoading = true
    this.loginStatus();
    if (this.$store.state.isLoginStatu) {
      await Promise.all([
        this.getCashbackList(),
        this.getUserVip(),
        this.gameStatistics(),
        this.getActionStatistics(),
        this.getGameOrder(),
      ])

    } else {
      this.goUrl('/');
      // this.getUserVip2();
    }
    this.isLoading = false
    this.listenRouter();
  },
  created() {
    this.isPhone();
    this.getAvatarList()
    // this.loginStatus();
  },
  watch: {
    $route(to, from) {
      console.log('watch.$route')
      this.listenRouter();
    }
  }
};
</script>
<style scoped>
thead{
  background: #FFA905;
  color: #fff;
}
.zebra-stripe-1 td{
  background: #0A0605 !important;
}
.zebra-stripe-2 td{
  background: #191A1E !important;
}
.wrapper__inner {
/*   background: #0A0605; */
}
.page-account__body {
  margin-top: 32px;
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

.page-account__tabs[data-v-f82d319c] {
  position: relative;
  z-index: 6;
}

.page-account__body[data-v-f82d319c] {
  margin-top: 32px;
}

.link-like-button {
  color: #3a07f2;
  text-decoration: underline;
  font-size: 11px;
}

.link-like-button:hover {
  text-decoration: none;
}

.right-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.right-block p {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 24px;
  margin-bottom: 32px;
}

.dashboard__item {
  padding: 20px;
  background-color: #161f2c;
  border-radius: 14px;
}

.dashboard__item_rank {
  position: relative;
  padding-left: 88px;
}

.dashboard__item_rank .rank_item {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 80px;
}

.dashboard__item_rank span {
  color: #1bb83d;
}

.progress-bar {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 7px;
  width: 100%;
}

.progress-bar .progress-wrapper {
  flex: 1;
  padding-right: 26px;
}

.progress-bar img {
  position: absolute;
  right: 0;
}

.dashboard__item_my-cashback {
  padding-left: 120px;
  position: relative;
}

.dashboard__item_my-cashback img:not(.arrow-img) {
  width: 96px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin: auto;
}

.dashboard__item_my-cashback img:not(.arrow-img).mask-img {
  top: 0;
}

.cashback-progress {
  display: flex;
  align-items: center;
}

.cashback-progress img {
  margin: 0 8px;
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

.dashboard__item_total-wager {
  display: flex;
  flex-direction: column;
}

.dashboard__item_total-wager .top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard__item_total-wager .top-block p {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0;
}

.dashboard__item_total-wager .currency {
  margin-top: auto;
}

.settings {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
}

.settings__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 24px;
}

.settings__item {
  padding: 24px;
  background-color: #111923;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.settings__item_personal-settings .checkbox:not(:last-child) {
  margin-bottom: 8px;
}

.settings__item_my-email .checkbox {
  margin-bottom: 16px;
}

.settings__item_my-email .settings__body,
.settings__item_password .button {
  margin-top: auto;
}

.settings__title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.settings__title h4 {
  margin-bottom: 0;
  margin-left: 4px;
  font-weight: 600;
}

.settings__title svg {
  flex-shrink: 0;
}

.verified {
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.verified.verified {
  color: #1bb83d;
}

.verified.not-verified {
  color: #ed1d49;
}

.settings__description {
  color: #55657e;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 1rem;
}

.dashboard__item_user {
  display: grid;
  grid-gap: 16px;
  gap: 16px;
  grid-template-columns: 60px 1fr;
}

.dashboard__item_user .right-block {
  justify-content: center;
}

.dashboard__item_user .right-block p {
  font-size: 18px;
  margin: 0;
}

.dashboard__item_user .right-block button {
  padding: 0;
  border: none;
  color: #3a07f2;
  text-decoration: underline;
  font-size: 11px;
}

.dashboard__item_user .right-block button:hover {
  text-decoration: none;
}

.userpick {
  display: block;
  position: relative;
  align-self: center;
}

.userpick,
.userpick__progress {
  width: 60px;
  height: 60px;
}

.userpick .user {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.statistic {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-areas: "personal-settings games games";
}

@media (max-width: 1100px) {
  .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1332px) {
  .opened-left-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1425px) {
  .opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1440px) {
  .opened-contests-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1657px) {
  .opened-left-panel.opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1672px) {
  .opened-left-panel.opened-contests-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1200px) {
  .opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1432px) {
  .opened-left-panel .opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1525px) {
  .opened-right-panel .opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1540px) {
  .opened-contests-panel .opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1757px) {
  .opened-left-panel.opened-right-panel .opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

@media (max-width: 1772px) {
  .opened-left-panel.opened-contests-panel .opened-right-panel .statistic {
    grid-template-areas: "personal-settings" "games";
  }
}

.statistic__personal-settings {
  grid-area: personal-settings;
}

.statistic__games {
  grid-area: games;
}

.personal-settings {
  padding: 24px;
  background-color: #111923;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
}

.personal-settings .checkbox,
.personal-settings__description,
.personal-settings__title {
  margin-bottom: 8px;
}

.personal-settings__title {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
}

.personal-settings__description {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #55657e;
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
  height: 48px;
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
  color: #fff;
  font-weight: 500;
  text-align: center;
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
  -webkit-animation-name: horizont-1-data-v-10c36e46;
  animation-name: horizont-1-data-v-10c36e46;
}

table tbody tr:nth-child(2n) {
  -webkit-animation-name: horizont-2-data-v-10c36e46;
  animation-name: horizont-2-data-v-10c36e46;
}

table tbody tr:nth-child(odd) {
  -webkit-animation-name: horizont-3-data-v-10c36e46;
  animation-name: horizont-3-data-v-10c36e46;
}

table tbody td {
  position: relative;
  vertical-align: top;
  padding: 14px 8px;
  text-align: center;
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
  @-webkit-keyframes horizont-1-data-v-10c36e46 {
    0% {
      opacity: 0;
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-1-data-v-10c36e46 {
    0% {
      opacity: 0;
      transform: translateY(-99.99%);
    }
  }

  @-webkit-keyframes horizont-2-data-v-10c36e46 {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-2-data-v-10c36e46 {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @-webkit-keyframes horizont-3-data-v-10c36e46 {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-3-data-v-10c36e46 {
    0% {
      transform: translateY(-99.99%);
    }
  }
}

.btn-detail {
  margin-left: auto;
  white-space: nowrap;
  color: #93acd3;
  transition: color 0.1s ease-in-out;
}

@media (max-width: 1500px) {
  .btn-detail .opened-right-panel {
    position: static;
  }
}

@media (max-width: 768px) {
  .btn-detail {
    position: static;
    margin-top: 10px;
  }
}

.btn-detail span {
  margin-right: 0.5em;
}

.btn-detail.active {
  color: #fff;
}

.btn-detail.active svg {
  fill: #fff;
  transform: rotate(180deg);
}

.btn-detail .icon-arrow {
  fill: #93acd3;
  transition: fill 0.1s ease-in-out, transform 0.1s ease-in-out;
}

.statistic-table {
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 16px;
  background: #191A1E;
}

.statistic-table__body,
.statistic-table__head {
  background-color: #191A1E;
}

.head{
  padding: 14px;
}
.statistic-table__body{
  padding: 0 0 14px;
}
.head {
  display: flex;
  justify-content: stretch;
}

@media (max-width: 1500px) {
  .opened-right-panel .head {
    /* //display: block; */
  }
}

@media (max-width: 1000px) {
  .head {
    /* //display: block; */
    flex-wrap: wrap;
  }
}

.head__item {
  /* //width: 33.33%; */
  display: flex;
  /* //flex-direction: column; */
  justify-content: center;
  position: relative;
}

@media (max-width: 1500px) {
  .opened-right-panel .head__item {
   /*  //width: auto;
    //padding-right: 0; */
  }
}

@media (max-width: 1000px) {
  .head__item {
   /*  //width: auto; */
    width: 50%;
    /* //padding-right: 0; */
  }
}

.head__item:not(:first-child) {
  padding-left: 24px;
  border-left: 1px solid #2a3546;
}

@media (max-width: 1500px) {
  .opened-right-panel .head__item:not(:first-child) {
    /* //border-top: 1px solid #2a3546;
    //padding-left: 0;
    //border-left: none;
    //margin-top: 16px;
    //padding-top: 16px; */
  }
}

@media (max-width: 1000px) {
  .head__item:not(:first-child) {
    /* //border-top: 1px solid #2a3546;
    //padding-left: 0;
    //border-left: none;
    //margin-top: 16px;
    //padding-top: 16px; */
  }
}

.head__label {
  display: flex;
  align-items: center;
 /*  //font-size: 12px;
  //color: #55657e; */
  margin-bottom: 4px;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
}

.head__label button {
  color: #3a07f2;
  text-decoration: underline;
  font-size: 11px;
}

.head__label button:hover {
  text-decoration: none;
}

.head__body {
  font-weight: 600;
  font-size: 18px;
  font-family: Numbers, Montserrat;
  /* //display: inline-flex; */
  align-items: center;
  display: inline-block;
  background: #141414;
  border-radius: 4px;
  border: 2px solid #262625;
  padding: 4px 14px;
  margin-left: 10px;
  color: #84F100;
}

.head__body img {
  margin-right: 6px;
}

.body__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  margin-bottom: 24px;
  padding: 0 14px ;
}

.body__head h4 {
  margin: 0;
}

.body__table {
  max-height: 220px;
  overflow-y: auto;
  position: relative;
}

table thead th {
  background-color: transparent;
}

.statistic-chat {
  margin-bottom: 18px;
}

.statistic-chat__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.statistic-chat__bott {
  padding: 24px;
  display: flex;
  justify-content: stretch;
  margin-bottom: 16px;
  background: #191A1E;
  border-radius: 14px;
}

@media (max-width: 1500px) {
  .opened-right-panel .statistic-chat__bott {
   /*  //display: block; */
  }
}

@media (max-width: 1000px) {
  .statistic-chat__bott {
    /* //display: block; */
  }
}

.stat-block {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
}

@media (max-width: 1500px) {
  .opened-right-panel .stat-block {
    /* //width: auto;
    //padding-right: 0; */
  }
}

@media (max-width: 1000px) {
  .stat-block {
    /* //width: auto;
    //padding-right: 0; */
  }
}

.stat-block:not(:first-child) {
  padding-left: 24px;
  border-left: 1px solid #2a3546;
}

@media (max-width: 1500px) {
  .opened-right-panel .stat-block:not(:first-child) {
   /*  //border-top: 1px solid #2a3546;
    //padding-left: 0;
    //border-left: none;
    //margin-top: 16px;
    //padding-top: 16px; */
  }
}

@media (max-width: 1000px) {
  .stat-block:not(:first-child) {
   /*  //border-top: 1px solid #2a3546;
    //padding-left: 0;
    //border-left: none;
    //margin-top: 16px;
    //padding-top: 16px; */
  }
}

.stat-block__title {
  /* //font-size: 12px;
  //color: #55657e; */
  margin-bottom: 4px;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #949494;
}

.stat-block__data{
  white-space: nowrap;
  font-weight: 600;
  line-height: 1;
}

.stat-block__data {
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  color: #fff;
  margin-bottom: 0;
}

.stat-block__data img {
  margin-right: 6px;
}

.favorite-games {
  margin-bottom: 18px;
}

.favorite-games__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  padding-left: 0;
}

.favorite-games__wrap {
  background: #111923;
  border-radius: 14px;
  padding: 24px;
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 10px;
}

.favorite-games__wrap .game-preview__hover {
  padding-bottom: 50px;
}

@media (max-width: 500px) {
  .favorite-games__wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 732px) {
  .opened-left-panel .favorite-games__wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 825px) {
  .opened-right-panel .favorite-games__wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 840px) {
  .opened-contests-panel .favorite-games__wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1057px) {
  .opened-left-panel.opened-right-panel .favorite-games__wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1072px) {
  .opened-left-panel.opened-contests-panel .favorite-games__wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

.favorite-games__preview .game-preview__btn-star {
  display: none;
}

.favorite-games__preview+.favorite-games__all-games {
  height: calc(100% - 40px);
}

.favorite-games__wagered {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #55657e;
  padding-top: 8px;
  margin-bottom: 0;
  min-height: 40px;
}

.favorite-games__game-wrap {
  border-radius: 14px;
  background-color: #202a39;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.favorite-games__all-games {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}

.favorite-games__all-games:after {
  content: "";
  display: block;
  width: 100%;
  padding-top: 133.34%;
}

.icon-dice {
  margin-bottom: 12px;
}

.chevron {
  transition: transform 0.15s linear;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.battles-rewards {
  margin-bottom: 18px;
}

.battles-rewards__top {
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 0;
}

.battles-table {
  background: #111923;
  border-radius: 14px;
  padding: 24px;
  overflow-y: hidden;
  overflow-x: auto;
}

.battles-table table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  min-width: 452px;
}

.battles-table table tbody,
.battles-table table thead {
  display: block;
  width: 100%;
}

.battles-table table thead {
  padding-right: 14px;
}

.battles-table table thead tr {
  padding-bottom: 4px;
}

.battles-table table tr {
  display: block;
  border-bottom: 1px solid #2a3546;
}

.battles-table table tr:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}

.battles-table table th {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #fff;
}

.battles-table table td,
.battles-table table th {
  display: inline-block;
  border: 0;
  text-align: center;
}

.battles-table table td:first-child,
.battles-table table th:first-child {
  width: 32%;
}

.battles-table table td:nth-child(2),
.battles-table table th:nth-child(2) {
  width: 22%;
}

.battles-table table td:nth-child(3),
.battles-table table th:nth-child(3) {
  width: 14%;
}

.battles-table table td:nth-child(4),
.battles-table table th:nth-child(4) {
  width: 27%;
}

.battles-table table tbody {
  height: 132px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
}

.battles-table table tbody tr {
  padding: 6px 0;
}

.battles-table table td {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  text-align: center;
}

.battles-table .amount {
  padding-left: 3px;
}

.chevron {
  transition: transform 0.15s linear;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.currency {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
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

.game-preview__block-bonus {
  right: 12px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA4CAMAAACMj4vYAAAAIVBMVEVMaXEVICwXIDAVHy0VICuTrNMWHyxleJYrNkhWaIOHn8Pw+VWBAAAABXRSTlMAoBzpUQnsbGcAAAAJcEhZcwAAFiUAABYlAUlSJPAAAADLSURBVEiJ7ZTBEsMgCERRswL+/wd3Ym1nNJjILdNmTznw2BUxlJ2iB7jxlESZVZYBYVSxrAFS3vVAkSWAgaIiWgBeAeTTeXeSBUABHb9OAf72FSsT3R4Q5X2aTUA5XHgPKAzpHBCrHv1l0KUBeosOaEs3ih8g//uU1LtL4t3W7H0Puf5Ue+npi1sQ/QKQfPWJgg8IFF0WKRJFh0eItCuGJZfUyiuyJU951XaaLGx01PQwySyviJXskKXXmGza3Ew2z2Imu8gyJps1fwHwxDgcjIaEzgAAAABJRU5ErkJggg==);
}

.rtp .icon-preview svg {
  fill: #93acd3;
}

.game-preview__battle,
.game-preview__block-bonus {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 24px;
  height: 28px;
  background-size: 24px 28px;
  background-position: 50%;
  background-repeat: no-repeat;
  filter: drop-shadow(1px 2px 5px rgba(17, 17, 17, 0.25));
}

.game-preview__battle {
  right: 13px;
  -webkit-transform: translateZ(0);
  -webkit-perspective: 1000;
  transform: translateZ(1px);
  background-image: url(../../assets/images/battle.png);
}

.game-preview__battle.is_high_roller {
  background-image: url(../../assets/images/highroller_battle.png);
}

.game-preview__battle.is_vip {
  background-image: url(../../assets/images/vip_battle.png);
}

@media (max-width: 1000px) {
  .game-preview__battle {
    width: 19px;
    height: 22px;
    background-size: 19px 22px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .game-preview__battle {
    width: 19px;
    height: 22px;
    background-size: 19px 22px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .game-preview__battle {
    width: 19px;
    height: 22px;
    background-size: 19px 22px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .game-preview__battle {
    width: 19px;
    height: 22px;
    background-size: 19px 22px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .game-preview__battle {
    width: 19px;
    height: 22px;
    background-size: 19px 22px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .game-preview__battle {
    width: 19px;
    height: 22px;
    background-size: 19px 22px;
  }
}

.game-preview__jackpot {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 76px;
  height: 23px;
  padding-left: 8px;
  font-style: italic;
  white-space: nowrap;
  background-image: url(../../assets/images/jackpot.png);
  background-size: 76px 23px;
  background-position: 50%;
  background-repeat: no-repeat;
  -webkit-transform: translateZ(0);
  -webkit-perspective: 1000;
  transform: translateZ(1px);
}

.game-preview__jackpot span {
  font-weight: 700;
  font-size: 9px;
  line-height: 26px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1c2532;
  display: block;
  white-space: nowrap;
}

@media screen and (max-width: 420px) {
  .game-preview__jackpot {
    padding: 2px 0 0 4px;
    background-position-x: inherit;
    background-position-y: bottom;
    bottom: -1px;
    background-size: 83%;
  }

  .game-preview__jackpot span {
    font-size: 8px;
  }
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

.game-preview__lock {
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
}

.game-preview__lock span {
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  margin-top: 5px;
}

@media (max-width: 887px) {
  .game-preview__lock span {
    font-size: 10px;
    line-height: 14px;
  }
}

@media (max-width: 1119px) {
  .opened-left-panel .game-preview__lock span {
    font-size: 10px;
    line-height: 14px;
  }
}

@media (max-width: 1212px) {
  .opened-right-panel .game-preview__lock span {
    font-size: 10px;
    line-height: 14px;
  }
}

@media (max-width: 1227px) {
  .opened-contests-panel .game-preview__lock span {
    font-size: 10px;
    line-height: 14px;
  }
}

@media (max-width: 1444px) {
  .opened-left-panel.opened-right-panel .game-preview__lock span {
    font-size: 10px;
    line-height: 14px;
  }
}

@media (max-width: 1459px) {
  .opened-left-panel.opened-contests-panel .game-preview__lock span {
    font-size: 10px;
    line-height: 14px;
  }
}

@media (max-width: 947px) {
  .game-preview__lock svg {
    display: none;
  }
}

@media (max-width: 1179px) {
  .opened-left-panel .game-preview__lock svg {
    display: none;
  }
}

@media (max-width: 1272px) {
  .opened-right-panel .game-preview__lock svg {
    display: none;
  }
}

@media (max-width: 1287px) {
  .opened-contests-panel .game-preview__lock svg {
    display: none;
  }
}

@media (max-width: 1504px) {
  .opened-left-panel.opened-right-panel .game-preview__lock svg {
    display: none;
  }
}

@media (max-width: 1519px) {
  .opened-left-panel.opened-contests-panel .game-preview__lock svg {
    display: none;
  }
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

.game-preview .rtp-wrap {
  position: absolute;
  right: 7px;
  bottom: 10px;
}

@media (max-width: 500px) {
  .game-preview .rtp-wrap {
    position: absolute;
    right: 2px;
    bottom: 5px;
  }

  .game-preview .rtp-wrap.tooltip {
    padding: 5px;
  }
}

@media (max-width: 732px) {
  .opened-left-panel .game-preview .rtp-wrap {
    position: absolute;
    right: 2px;
    bottom: 5px;
  }

  .opened-left-panel .game-preview .rtp-wrap.tooltip {
    padding: 5px;
  }
}

@media (max-width: 825px) {
  .opened-right-panel .game-preview .rtp-wrap {
    position: absolute;
    right: 2px;
    bottom: 5px;
  }

  .opened-right-panel .game-preview .rtp-wrap.tooltip {
    padding: 5px;
  }
}

@media (max-width: 840px) {
  .opened-contests-panel .game-preview .rtp-wrap {
    position: absolute;
    right: 2px;
    bottom: 5px;
  }

  .opened-contests-panel .game-preview .rtp-wrap.tooltip {
    padding: 5px;
  }
}

@media (max-width: 1057px) {
  .opened-left-panel.opened-right-panel .game-preview .rtp-wrap {
    position: absolute;
    right: 2px;
    bottom: 5px;
  }

  .opened-left-panel.opened-right-panel .game-preview .rtp-wrap.tooltip {
    padding: 5px;
  }
}

@media (max-width: 1072px) {
  .opened-left-panel.opened-contests-panel .game-preview .rtp-wrap {
    position: absolute;
    right: 2px;
    bottom: 5px;
  }

  .opened-left-panel.opened-contests-panel .game-preview .rtp-wrap.tooltip {
    padding: 5px;
  }
}

/* rankd */

.rank-slider {
  overflow: hidden;
}

.rank-slider__slides {
  display: flex;
  grid-gap: 16px;
  gap: 16px;
}

.rank-slider__slide {
  position: relative;
  padding: 0 12px;
  margin-bottom: 26px;
}

.rank-slider__image {
  position: relative;
  margin: auto;
  width: 80px;
  height: 80px;
}

.rank-slider__image img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%);
  width: 80px;
  height: 80px;
}

.rank-slider__title {
  margin-top: 10px;
}

.rank-slider__cashback,
.rank-slider__title {
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
}

.rank-slider__cashback {
  color: #ffb636;
}

.rank-slider__details {
  border-bottom: 1px solid rgba(147, 172, 211, 0.1);
  margin-bottom: 16px;
}

.rank-slider__label {
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #93acd3;
  text-align: center;
  margin: 0;
}

.rank-slider__value {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #1bb83d;
  text-align: center;
}

.rank-slider__currency {
  color: #fff;
}

.rank-slider__slider-body {
  position: relative;
  z-index: 2;
}

.rank-slider__bg {
  position: absolute;
  left: 0;
  top: 20px;
  width: 100%;
  height: calc(100% - 20px);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}

.rank-slider__possibilities {
  text-align: center;
}

.rank-slider__possibility {
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  color: #55657e;
}

.rank-slider__possibility--active {
  color: #fff;
}

.rank-slider__possibility--active svg {
  fill: #1bb83d;
}

.rank-slider__arrow:first-child {
  margin-right: 8px;
}

.rank-slider__navigator {
  display: flex;
  justify-content: center;
}

.rank-slider__bg-label {
  position: relative;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAAQCAYAAABnYDOFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFRSURBVHgB7ZjNTQMxEIXfOJcsnOjAoYKkAlqACkg6CAUEdok4IzrYdAAdLBWwDQAuYQ9EiZDswV4kpKAkax8T+5N2L/NsaZ5m/EewyIevIQxJAi7B4oKIJRK+NPZbGHAFLWqVZ4q2qeT9amwDd8ncvTTEdPN+m5X/A7RrhMxXUvT4Ea56ExswqGLdv1I5Ndvi1DXBYL4sCXSNRAuDF5+z0/E+jUDXJPp7ykwKCQsp1ifTLlWnqSo/a5gwQQLEKHa1/IYOnpzPl29WPkS0kPqYZQMfZWel/mH4FTFj+MVX6m2qEb1nRIwR5J2/f6XqdY3fg26UqFlW+Wq9TW03LFCNCHHn0hC9f6XC7X7+68oxEZp3kKnGUJTramjeQaa6x4LQVjh07G2ydHmHjAky1cEak3huWKS0RoFAgk1tq9WsR7Ypno7VXGYo+y+M7o9Cq9TxA7LVfuYNX2buAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-position: 50%;
  bottom: -16px;
  width: 85px;
  transform: translate(-50%);
  left: 50%;
}

.rank-slider__bg-label-text {
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  margin: 0;
}

.modal-changeusername__head {
  margin-bottom: 24px;
}

.modal-changeusername__h1 {
  font-size: 24px;
}

.modal-changeusername__scroll {
  height: 300px;
  overflow-y: scroll;
}

.modal-changeusername__footer {
  position: relative;
}

.avatar-block {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

.avatar-block__label {
  color: #55657e;
  margin-bottom: 16px;
  display: inline-block;
}

.avatar-block__inner {
  grid-template-columns: repeat(4, 1fr);
  display: grid;
  grid-gap: 2px;
}

.input-block {
  margin-bottom: 24px;
}

.input-block__label {
  display: inline-block;
  color: #55657e;
  margin-bottom: 4px;
}

.avatar-item,
.input-block__tag {
  position: relative;
}

.avatar-item {
  border-radius: 50%;
  padding: 3px;
  width: 70px;
  height: 70px;
  transition: background-color 0.1s ease-in-out;
}

.avatar-item svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #55657e;
}

.avatar-item.selected,
.avatar-item:hover {
  background-color: #1bb83d;
}

.avatar-item.selected:after {
  display: block;
  content: "✓";
  width: 23px;
  height: 23px;
  line-height: 23px;
  border-radius: 50%;
  text-align: center;
  background-color: #1bb83d;
  color: #0d131c;
  position: absolute;
  bottom: 0;
  right: 0;
}

.avatar-item.locked {
  cursor: not-allowed;
}

.avatar-item.locked:hover {
  background-color: transparent;
}

.avatar-item.locked .user {
  opacity: 0.3;
}

.body__head .el-select {
  width: 160px;
}

.modal-change>>>.el-dialog__body {
  padding-top: 0
}

.icon-shuaxin {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
}

.icon-shuaxin.circle {
  animation: circle 3s;
  animation-fill-mode: forwards;
}
@keyframes circle {
  100% {
    transform: rotate(720deg);
  }
}
</style>
