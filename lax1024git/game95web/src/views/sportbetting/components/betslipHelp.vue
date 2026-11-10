<template>
  <div>
    <div class="betslipMobileButtonGradient" @click="helpToggle">
      <span class="iconfont icon-wenjian"></span>
      <div class="bt26415 bt26410 bt26417" v-if="betsPropsList.length>0" id="bt-header-total-mobile">{{betsPropsList.length}}</div>
    </div>
    <div class="betslipContent" :class="helpShow?'show':'hidden'">
      <div class="betslipHeader" :class="quickFlag?'is-quick':''">
        <div class="bets-info" @click="helpToggle">
          <span class="iconfont icon-wenjian"></span>
          <span class="bets-info-tit">{{$t('投注单')}}</span>
          <div class="bt-header-total" v-if="betsPropsList.length>0">
            <span class="bt623">{{betsPropsList.length}}</span>
          </div>
          <span class="iconfont" :class="helpShow?'icon-dn':'icon-up'"></span>
        </div>
        <!-- <div class="quickBar">
          <div class="quickBetSwitcherLabel">{{$t('快速下注')}}</div>
          <div
            class="quickBetSwitcher"
            :class="quickFlag?'quickShow':'quickfalse'"
            @click="quickToggle"
          >
            <div class="quickBetSwitcherButton">
              <span class="iconfont icon-lightning"></span>
            </div>
          </div>
        </div>-->
      </div>
      <template v-if="betsPropsList.length < 1">
        <div class="bets-empty-panel">
          <div class="bets-empty-cell">
            <img src="../../../assets/images/sport/bet-empty.png" alt />
            <div class="bt2333">
              <div class="bt2334">{{$t('赌注')}}</div>
              <div class="bt2335" style="opacity: 0.7;">{{$t('你的选择将出现在这个区域')}}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- 非快速 -->
        <div class="bt642" v-if="!quickFlag">
          <div class="bt1648">
            <div class="betslipTabs bs-tab" v-if="betsPropsList.length > 1">
              <el-tabs v-model="activeTab" @tab-click="tabChange">
                <el-tab-pane :label="$t('单关')" :name="$t('单关')"></el-tab-pane>
                <el-tab-pane :label="$t('串关')" :name="$t('串关')"></el-tab-pane>
              </el-tabs>
            </div>
            <div class="betslipStake-main">
              <div class="betslipStake-box">
                <div
                  class="betslip-body"
                  :class="activeTab == $t('串关') && isChuanSta == 2 ? 'betslip-select' : ''"
                >
                  <div
                    class="betslipSelection"
                    v-for="(item,index) in betDataBMS"
                    :key="`betDataBMS${index}`"
                  >
                    <div class="betslipSelectionRemoveButton" @click="deleteItem(item)">
                      <span class="iconfont icon-close"></span>
                    </div>
                    <div class="bt253" v-if="item && item.ss != 1">
                      <div class="bt272" data-editor-id="betslipSelectionInactive">
                        <div class="bt274">
                          <svg class="bt275" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill-rule="nonzero" d="M3.9047619 1C3.40442857 1 3 1.40092754 3 1.89492754L3 21.5833333C3 22.0773333 3.40442857 22.4782609 3.9047619 22.4782609 4.40419048 22.4782609 4.80952381 22.0773333 4.80952381 21.5833333L4.80952381 1.89492754C4.80952381 1.40092754 4.40419048 1 3.9047619 1zM21.4290952 3.42525362C19.647619 3.89330072 14.3095238 4.92336232 14.3095238 3.23731884 14.3095238.438880435 8.67104762 1.88508333 6.01557143 2.81491304 5.83461905 2.8784529 5.71428571 3.0475942 5.71428571 3.23731884L5.71428571 13.9764493C5.71428571 14.2896739 6.02914286 14.5017717 6.31685714 14.3979601 7.96533333 13.8610036 13.4047619 12.3056196 13.4047619 13.9764493 13.4047619 16.7238768 18.9708571 15.7680942 21.6634286 15.0673659 21.8624762 15.0145652 22 14.8373696 22 14.634221L22 3.85750362C22 3.5675471 21.7222381 3.34918478 21.4290952 3.42525362z"></path>
                          </svg>
                          <div class="bt276">{{ $t('停售') }}</div>
                          <div class="bt277"></div>
                        </div>
                      </div>
                    </div>
                    <div class="betslip-cell">
                      <div class="betslip-header">
                        <div class="betslip-header-content">
                          <div class="betslipSelectionIcon">
                            <span class="iconfont icon-zuqiu"></span>
                          </div>
                          <span class="item">{{item.op.nm}}</span>
                        </div>
                        <div class="betslip-title">{{ numFormat(item.smin) + ' ~ ' + numFormat(item.smax) }}</div>
                      </div>
                      <div class="betslip-cell_ft">
                        <div class="betslipSelectionOdd">
                          <span class="item">{{item.op.od}}</span>
                        </div>
                        <div class="betslipStakeInput" v-if="activeTab == $t('单关')">
                          <el-input
                            size="small"
                            :placeholder="numFormat(item.smin) + ' ~ ' + numFormat(item.smax)"
                            v-model="item.priceInput"
                          ></el-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bets-tip" v-if="activeTab == $t('串关') && isChuanSta == 2">
                  <el-tooltip class="item" effect="dark" :content="$t('所选项目不能合并')" placement="top">
                    <span class="iconfont icon-tip"></span>
                  </el-tooltip>
                  <span>{{$t('所选项目不能合并')}}</span>
                </div>
                <div v-for="(item,index) in betDataSos" :key="`betDataSos${index}`">
                  <div
                    class="appliedBonusPlate"
                    v-if="activeTab == $t('串关') && betsPropsList.length > 1"
                  >
                    <div class="appliedBonus-main">
                      <span class="bets-header-items">
                        <span class="appliedBonusPlateLabel">
                          <span>{{item.sn?item.sn:betDataSos.length}}</span>
                          <span>{{$t('串')}}</span>
                          <span>{{index == betDataSos.length - 1 ? item.in+'*' : '1*'}}</span>
                          <span>{{item.in}}</span>
                        </span>
                        <span class="bonusTypeLabel">@{{item.sodd.toFixed(2)}}</span>
                      </span>
                      <div class="bets-body-items">
                        <!-- 串光投注 -->
                        <div class="betslipStakeForm-panel" style="position: relative;z-index: 9;">
                          <div class="betslipStakeForm">
                            <div class="betslipStakeInput">
                              <el-input
                                size="small"
                                :placeholder="numFormat(item.mi) + ' ~ ' + numFormat(item.mx)"
                                v-model="item.priceInput2"
                              >
                                <!-- <div slot="suffix" class="stake-suffix">$</div> -->
                              </el-input>
                            </div>
                          </div>
                          <div class="betslip-select-div">
                            <el-radio-group v-model="item.priceInput2">
                              <el-radio-button v-for="(amount, index) in quickAmount" :key="`quick${index}`" :label="amount">{{ numFormat(amount) }}</el-radio-button>
                            </el-radio-group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="betslipStake-pane">
                  <div class="betslipStakeForm-panel" v-if="activeTab == $t('单关')">
                    <div class="betslip-select-div">
                      <el-radio-group v-model="betslipVal" @change="radioChange">
                              <el-radio-button v-for="(amount, index) in quickAmount" :key="`quick${index}`" :label="amount">{{ numFormat(amount) }}</el-radio-button>
                      </el-radio-group>
                    </div>
                  </div>
                  <div class="betslip-total-grid">
                    <div class="betslip-total">
                      <div class="betslipTotalLine">
                        <div class="bets-label">{{$t('总投注额')}}</div>
                        <div class="bets-value">
                          <span v-if="activeTab == $t('单关')">{{ numFormat(betPrive) }}</span>
                          <span v-if="activeTab == $t('串关')">{{ numFormat(betChuanPrive) }}</span>
                        </div>
                      </div>
                      <div class="betslipPotentialWin">
                        <div class="bets-label">{{$t('最高可赢')}}</div>
                        <div class="bets-value">
                          <span v-if="activeTab == $t('单关')">{{ numFormat(winAmount) }}</span>
                          <span v-if="activeTab == $t('串关')">{{ numFormat(winChuanAmount) }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="bt26616 bt26599" v-if="!$store.state.isLoginStatu">
                        <div class="bt26619">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" class="bt26620">
                              <g fill="none" stroke="#ffffff" stroke-width="2">
                                <circle cx="24" cy="24" r="23"></circle>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M40.5,39.2117661 C38.2954996,36.3933633 35.383729,34.154887 32.0316955,32.7633443 M15.9858486,32.7728273 C12.6229344,34.1735758 9.70428537,36.4271722 7.5,39.263518"></path>
                                <path d="M24,30 C28.1421356,30 31.5,23.9747681 31.5,19.7142857 C31.5,15.4538034 28.1421356,12 24,12 C19.8578644,12 16.5,15.4538034 16.5,19.7142857 C16.5,23.9747681 19.8578644,30 24,30 Z"></path>
                              </g>
                            </svg>
                            {{ $t('请登录后下注') }}
                        </div>
                        <button class="bt26621 bt26628 bt26627" @click="showLoginReg(0)" style="font-size: 14px; padding: 11px 28px;">
                            {{ $t('登录') }}
                        </button>
                        <div class="bt26631" data-editor-id="signUpHint">
                            <span class="bt26633">{{ $t('你没有账号吗?') }}</span>
                            <span class="bt26634" @click="showLoginReg(1)">{{ $t('注册') }}</span>
                        </div>
                    </div>
                    <template v-else>
                      <div class="betslip-bottom" v-if="activeTab != $t('串关') || isChuanSta != 2">
                        <el-button
                          class="button_blue"
                          :loading="$store.state.bottonLoading"
                          @click="activeTab == $t('单关')?betPlay():betPlayTwo()"
                        >{{$t('确认投注')}}</el-button>
                        <!-- <el-button class="button_grey1">Share</el-button> -->
                      </div>
                      <div class="betslip-clear" @click="clearBetData">
                        <span class="iconfont icon-clear_line"></span>
                        <span>{{$t('清空投注单')}}</span>
                      </div>
                    </template>
                  </div>
                  <div class="betslip-footer">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="switchvalue ? $t('接受赔率变化') : $t('不接受赔率变化')"
                      placement="top"
                    >
                      <div class="betslipAcceptOddsLabel">
                        <span class="iconfont icon-info"></span>
                        <span>{{switchvalue ? $t('接受赔率变化') : $t('不接受赔率变化')}}</span>
                      </div>
                    </el-tooltip>
                    <el-switch
                      v-model="switchvalue"
                      @change="switchChange"
                      active-color="#3a07f2"
                      inactive-color="rgba(255,255,255,0.15)"
                    ></el-switch>
                  </div>
                </div>
                <div class="bt171 bt172" v-if="isDone" style="max-height: 375px;">
                  <div class="bt1562 bt1559" data-editor-id="betslipNotification">
                    <div class="success-checkmark">
                      <div class="check-icon">
                        <span class="icon-line1 line-tip"></span>
                        <span class="icon-line1 line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                      </div>
                    </div>
                    <div class="bt1566">{{ $t('您的投注已成功下注！') }}</div>
                    <div class="bt1567">
                      <router-link to="/sport-bets" class="bt1568">
                        <svg data-cy="ic-mybets" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="bt1569" style="top: 8px; left: 8px; fill: currentcolor; color: inherit; width: auto; height: 24px;">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M5 6.7C5 4.68329 6.5966 3 8.625 3H17.375C19.4034 3 21 4.68329 21 6.7V19.3C21 21.3167 19.4034 23 17.375 23H8.625C6.5966 23 5 21.3167 5 19.3V6.7ZM8.625 5C7.75391 5 7 5.73437 7 6.7V19.3C7 20.2656 7.75391 21 8.625 21H17.375C18.2461 21 19 20.2656 19 19.3V6.7C19 5.73437 18.2461 5 17.375 5H8.625ZM22.375 10C22.375 9.44772 22.8227 9 23.375 9H24C25.6569 9 27 10.3431 27 12V26C27 27.6569 25.6569 29 24 29H14C12.3431 29 11 27.6569 11 26V25.3C11 24.7477 11.4477 24.3 12 24.3C12.5523 24.3 13 24.7477 13 25.3V26C13 26.5523 13.4477 27 14 27H24C24.5523 27 25 26.5523 25 26V12C25 11.4477 24.5523 11 24 11H23.375C22.8227 11 22.375 10.5523 22.375 10ZM10 16C9.44772 16 9 16.4477 9 17C9 17.5523 9.44772 18 10 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H10ZM9 13C9 12.4477 9.44772 12 10 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H10C9.44772 14 9 13.5523 9 13ZM10 8C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10H16C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8H10Z"></path>
                        </svg>{{ $t('查看我的投注') }}
                      </router-link>
                    </div>
                  </div>
                </div>
                <div class="betslip-loading" v-if="isLoading">
                  <div class="bt1554 bt1375">
                    <div class="bt1557"
                        style="font-size: 36px; min-height: 40px;"
                        v-loading="true"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="#19212b"
                      >
                    </div>
                    <div class="bt1555">{{ $t('请稍等。我们正在处理您的投注。') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 快速 -->
        <div class="bt642" v-else>
          <div class="quick-content">
            <div
              class="quickBetDescription"
            >QuickBet mode is on! After single click on any selection, it will place your bet immediately. See all your bets onM</div>
            <div class="myBetsLink">
              <span class="iconfont icon-fuzhi"></span>
              <span>My Bets page</span>
            </div>
            <div class="quickBetStakeButton">
              <div class="betslip-select-div">
                <el-radio-group v-model="betslipVal">
                  <el-radio-button label="1"></el-radio-button>
                  <el-radio-button label="10"></el-radio-button>
                  <el-radio-button label="50"></el-radio-button>
                  <el-radio-button label="100"></el-radio-button>
                </el-radio-group>
              </div>
              <div class="betslipStakeForm">
                <div class="betslipStakeInput">
                  <el-input size="small" :placeholder="$t('请输入内容')" v-model="stakeVal">
                    <div slot="suffix" class="stake-suffix">$</div>
                  </el-input>
                </div>
              </div>
            </div>
            <div class="betslipQuickBetLabel">
              <span class="iconfont icon-sd"></span>
              <span>Quick Bet is active with 1 $ bet</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import fbSportsService from "@/common/fbSportsService";
import {
  batchBetMatchMarketOfJumpLine_api,
  singlePass_api,
  betMultiple_api
} from "@/api/sports";
export default {
  components: {
    svgIcon
  },
  props: {
    betsPropsList: {
      type: Array,
      default: () => []
    },
    helpPropsShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    betsPropsList(newVal) {
      if (newVal.length > 0) {
        this.getBatchBetMatchMarketOfJumpLine();
        this.helpToggle(true);
      } else {
        this.clearTime();
      }
    },
    betDataBMS(newVal,oldVal){
      for(let i in oldVal){
        if (newVal[i] && newVal[i].ss != 1) {
          oldVal[i].ss = newVal[i].ss;
          oldVal[i].priceInput = 0;
          newVal[i] = oldVal[i];
        }

        if(newVal[i] && oldVal[i].priceInput){
          newVal[i].priceInput = oldVal[i].priceInput;
        }

        if (newVal[i].smin) {
          this.setMinAmount(newVal[i].smin);
        }
      }
    },
    betDataSos(newVal,oldVal){
      for(let i in oldVal){
        if (newVal[i] && newVal[i].ss != 1) {
          oldVal[i].ss = newVal[i].ss;
          oldVal[i].priceInput = 0;
          newVal[i] = oldVal[i];
        }

        if(newVal[i] && oldVal[i].priceInput2){
          newVal[i].priceInput2 = oldVal[i].priceInput2;
        }
        if (newVal[i].mi) {
          this.setMinAmount(newVal[i].mi);
        }
      }
    }
  },
  computed: {
    //   单关总投注金额
    betPrive() {
      let count = 0;
      for (let i in this.betDataBMS) {
        count += this.betDataBMS[i].priceInput * 1;
      }
      return count ? count : 0;
    },
    //   单关可赢金额
    winAmount() {
      let count = 0;
      for (let i in this.betDataBMS) {
        count += this.betDataBMS[i].priceInput * this.betDataBMS[i].op.od * 1;
      }
      return count ? count.toFixed(2) : 0;
    },
    // 串关总投注余额
    betChuanPrive() {
      let count = 0;
      for (let i in this.betDataSos) {
        if (this.betDataSos[i].priceInput2) {
          count += this.betDataSos[i].priceInput2 * this.betDataSos[i].in;
        }
      }
      return count ? count.toFixed(2) : 0;
    },
    //   串关可赢金额
    winChuanAmount() {
      let count = 0;
      for (let i in this.betDataSos) {
        if (this.betDataSos[i].priceInput2) {
          count +=
            this.betDataSos[i].priceInput2 *
            (this.betDataSos[i].sodd - this.betDataSos[i].in);
        }
      }
      return count ? count.toFixed(2) : 0;
    },
    quickAmount() {
      if (this.minAmount <= 0) {
        return [10, 100, 500, 2000];
      }
      let amounts = [];
      const multiple = [1, 10, 50, 100];
      for (let index = 1; index < 5; index++) {
        amounts.push(this.minAmount * multiple[index - 1]);
      }
      return amounts;
    }
  },
  data() {
    return {
      // quickAmount: [10, 100, 500, 2000],
      minAmount: 0,
      isDone: false,
      isLoading: false,
      switchvalue: true,
      activeTab: this.$t("单关"),
      stakeVal: "1",
      betslipVal: "",
      helpShow: this.helpPropsShow,
      quickFlag: false,
      betDataBMS: [],
      isTabSelectSeries: false,
      oddsChange: 2,
      betDataSos: [],
      isChuanSta: 0,
      getBatchBetMatchTime: null
    };
  },
  methods: {
    setMinAmount(min) {
      if (min > this.minAmount && min > 0) {
        this.minAmount = min;
      }
    },
    clearBetData() {
      this.helpToggle(false);
      this.clearTime();
      this.betslipVal = "";
      this.isDone = false;
      this.$emit("clearBetData", []);
    },
    async getBatchBetMatchMarketOfJumpLine() {
      let i18n = this.$helper.getLang();
      let languageType = fbSportsService.getLanguageType(i18n);
      let parmar = {
        // currencyId: 1000,
        currencyId: this.$helper.get("sportsCurrencyID"),
        isSelectSeries: this.isTabSelectSeries,
        languageType,
        betMatchMarketList: this.betsPropsList
      };
      if (this.betsPropsList.length == 1) {
        this.activeTab = this.$t("单关");
      }
      await batchBetMatchMarketOfJumpLine_api(parmar).then(result => {
        if (result) {
          if (result.data.data.bms || result.data.data.sos) {
            let arr1 = [];
            let arr2 = [];
            if (result.data.data.bms) {
              arr1 = result.data.data.bms;
            }
            if (result.data.data.sos) {
              arr2 = result.data.data.sos;
            }
            for (let i in arr1) {
              arr1[i].priceInput = "";
            }
            this.betDataBMS = arr1;
            if (arr2.length > 0) {
              for (let i in arr2) {
                arr1[i].priceInput2 = "";
              }
              this.isChuanSta = 1;
            } else {
              this.isChuanSta = 2;
            }
            this.betDataSos = arr2;
          } else {
            // this.clearBetData()
          }
          clearTimeout(this.getBatchBetMatchTime);
          this.getBatchBetMatchTime = setTimeout(() => {
            this.getBatchBetMatchMarketOfJumpLine();
          }, 3000);
        }
      });
    },
    clearTime() {
      clearTimeout(this.getBatchBetMatchTime);
    },
    async betPlay() {
      let parList = [];
      let arr = this.betDataBMS;
      for (let i in arr) {
        if (arr[i].ss != 1) {
          this.errorTips('请先删除停售的投注');
          return;
        }
        if (!arr[i].priceInput) {
          this.errorTips('请输入正确余额');
          return;
        }
        let optionObj = {};
        let parObj = {};
        optionObj.marketId = arr[i].mid;
        optionObj.odds = arr[i].op.od;
        optionObj.optionType = arr[i].op.ty;
        optionObj.oddsFormat = 1;
        parObj.oddsChange = this.oddsChange;
        parObj.unitStake = Number(arr[i].priceInput);
        parObj.betOptionList = [optionObj];
        parList.push(parObj);
      }
      let i18n = this.$helper.getLang();
      let languageType = fbSportsService.getLanguageType(i18n);
      let param = {
        // currencyId: 1000,
        currencyId: this.$helper.get("sportsCurrencyID"),
        languageType,
        singleBetList: parList
      };
      this.$store.commit("$vuexSetBottonLoadingState", true);
      this.isLoading = true;
      let self = this;
      await singlePass_api(param).then(result => {
        if (result.data.code == 0) {
          self.successTips('下注成功');
          self.isDone = true;
          window.setTimeout(() => {
            self.clearBetData();
          }, 3000);
        } else {
          self.errorTips(result.data.message);
        }
        this.isLoading = false;
        this.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },
    async betPlayTwo() {
      let arr = [];
      for (let i in this.betDataSos) {
        if (this.betDataSos[i].priceInput2) {
          let param = {};
          param.oddsChange = this.oddsChange;
          param.seriesValue = this.betDataSos[i].sn;
          param.unitStake = this.betDataSos[i].priceInput2;
          arr.push(param);
        }
      }
      let arr2 = [];
      for (let i in this.betDataBMS) {
        let param = {};
        param.marketId = this.betDataBMS[i].mid;
        param.odds = this.betDataBMS[i].op.od;
        param.optionType = this.betDataBMS[i].op.ty;
        param.oddsFormat = 1;
        arr2.push(param);
      }
      let i18n = this.$helper.getLang();
      let languageType = fbSportsService.getLanguageType(i18n);
      let data = {
        betMultipleData: arr,
        betOptionList: arr2,
        languageType,
        // currencyId: 1000,
        currencyId: this.$helper.get("sportsCurrencyID")
      };
      this.$store.commit("$vuexSetBottonLoadingState", true);
      this.isLoading = true;
      let self = this;
      await betMultiple_api(data).then(result => {
        if (result.data.code == 0) {
          self.successTips('下注成功');
          self.isDone = true;
          window.setTimeout(() => {
            self.clearBetData();
          }, 3000);
        } else {
          self.errorTips(result.data.message);
        }
        this.isLoading = false;
        this.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },
    switchChange(e) {
      if (e) {
        this.oddsChange = 2;
      } else {
        this.oddsChange = 0;
      }
    },
    // 单关快捷金额
    radioChange(e) {
      for (let i in this.betDataBMS) {
        if (this.betDataBMS[i].ss != 1) {
          this.betDataBMS[i].priceInput = 0;
        }else {
          this.betDataBMS[i].priceInput = e;
        }
      }
    },
    tabChange(e) {
      if (e.name == this.$t("单关")) {
        this.isTabSelectSeries = false;
      } else {
        this.isTabSelectSeries = true;
      }
      this.betslipVal = "";
      this.getBatchBetMatchMarketOfJumpLine();
    },
    helpToggle(helpShow) {
      this.helpShow = helpShow === true ? true : !this.helpShow;
      if (this.helpShow) {
        this.activeTab = this.$t("单关");
      }
    },
    quickToggle() {
      this.quickFlag = !this.quickFlag;
    },
    deleteItem(obj) {
      this.betslipVal = "";
      var index = this.betDataBMS.indexOf(obj);
      this.betDataBMS.splice(index, 1);
      let delect = {
        index,
        data: this.betsPropsList[index]
      };
      this.$emit("delectBetData", delect);
    }
  },
  mounted() {}
};
</script>
<style scoped>
.betslipMobileButtonGradient {
  position: fixed;
  right: 20px;
  bottom: 70px;
  margin-left: -29px;
  pointer-events: auto;
  color: #ffffff;
  width: 58px;
  cursor: pointer;
  height: 58px;
  display: flex;
  background: #3a07f2;
  box-sizing: border-box;
  align-items: center;
  border-radius: 50%;
  background-size: cover;
  justify-content: center;
  z-index: 88;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
@media (min-width: 640px) {
  .betslipMobileButtonGradient {
    display: none;
  }
}
.betslipMobileButtonGradient .icon-wenjian {
  font-size: 24px;
}
.betslipMobileButtonGradient .mobileBetslipBetsTotalPin {
  top: -2px;
  left: 40px;
  font-size: 20px;
  position: absolute;
}

.quick-content {
  padding: 12px;
  font-size: 12px;
}
.quickBetDescription {
  font-size: 12px;
  margin-bottom: 6px;
  color: rgba(255, 255, 255, 0.7);
}
.myBetsLink {
  margin-bottom: 10px;
}
.myBetsLink .iconfont {
  margin-right: 7px;
}
.quickBetStakeButton .betslipStakeForm {
  padding: 10px 0;
}
.betslipQuickBetLabel {
  display: flex;
  align-items: center;
}
.betslipQuickBetLabel .iconfont {
  color: #fa305c;
}

.quickBetSwitcher {
  position: relative;
  width: 52px;
  border: 2px solid;
  height: 24px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0);
  border-color: #ffffff;
  background: #ffffff;
}
.quickBetSwitcherLabel {
  margin-right: 10px;
}
.quickBetSwitcher.quickfalse {
  background: rgba(0, 0, 0, 0);
}
.quickBetSwitcherButton {
  transition: 0.3s all;
}
.quickBetSwitcher.quickfalse .quickBetSwitcherButton {
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  display: flex;
  z-index: 2;
  position: absolute;
  background: #ffffff;
  transition: transform 0.3s;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  transform: translateX(0);
  color: #3a07f2;
  background: #ffffff;
}
.quickBetSwitcher.quickShow .quickBetSwitcherButton {
  top: 2px;
  left: 3px;
  width: 18px;
  height: 18px;
  display: flex;
  z-index: 2;
  position: absolute;
  background: #ffffff;
  transition: transform 0.3s;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  color: #ffffff;
  transform: translateX(28px);
  background: #fa305c;
}

.bets-header-items {
  top: -2px;
  right: -2px;
  z-index: 2;
  position: absolute;
  color: #ffffff;
  height: 13px;
  display: flex;
  overflow: hidden;
  font-size: 9px !important;
  align-items: stretch;
  font-weight: 600;
  line-height: 13px;
  border-radius: 0;
  text-transform: uppercase;
  border-top-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
.appliedBonusPlateLabel {
  color: #ffffff;
  background: #3a07f2;
  padding-left: 6px;
  padding-right: 4px;
  border-bottom-left-radius: 6px;
}
.bonusTypeLabel {
  color: #ffffff;
  background: #08d95b;
  padding-left: 4px;
  padding-right: 6px;
}

.bets-items {
  margin: 0 -1px;
  display: flex;
  padding-top: 25px;
}
.bets-items .bets-item {
  flex: 1;
  height: 8px;
  margin: 0 1px;
  position: relative;
  background: rgba(255, 255, 255, 0.4);
  transition: background ease-in-out 300ms;
}
.bets-items .bets-item .appliedBonusStepLabel {
  left: 50%;
  color: rgba(255, 255, 255, 0.6);
  bottom: calc(100% + 7px);
  padding: 0 4px;
  position: absolute;
  font-size: 14px;
  transform: translateX(-50%);
  line-height: 18px;
  font-size: 12px;
}
.bets-item .appliedBonusStepLabel:before {
  top: 100%;
  left: 50%;
  width: 0;
  height: 0;
  content: "";
  position: absolute;
  transform: translateX(-50%);
  border-color: rgba(255, 255, 255, 0.6) transparent transparent transparent;
  border-style: solid;
  border-width: 4px 3px 0 3px;
}

.bets-items .bets-item:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.bets-items .bets-item:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.bets-text {
  margin-bottom: 16px;
  font-size: 12px;
}
.appliedBonusPlate {
  color: #ffffff;
  display: flex;
  position: relative;
  background: #19212b;
  border: 2px solid #08d95b;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.appliedBonus-main {
  flex: 1;
  padding: 19px 8px 0 8px;
  font-size: 12px !important;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: 0.4px;
  width: 100%;
}

.betslip-select {
  position: relative;
}
.betslip-select::after {
  top: 0;
  left: 0;
  right: 0;
  border: 2px solid #fad247;
  bottom: 0;
  content: "";
  opacity: 1;
  z-index: 1;
  position: absolute;
  transition: opacity 0.3s;
  border-radius: 6px;
  pointer-events: none;
}
.betslip-select .betslipSelection {
  margin-bottom: 1px;
}

.betslipStakeForm-panel {
  /* display: flex; */
  align-items: center;
  margin-bottom: 15px;
}
.betslipStakeForm-panel .betslipStakeForm {
  width: 100%;
  margin: 10px 0;
}
.betslipTabs /deep/ .el-tabs__nav {
  width: 100%;
  background: #19212b;
}
.betslipTabs /deep/ .el-tabs__item {
  width: 50%;
  text-align: center;
}
.betslipTabs /deep/ .el-tabs__header {
  margin-bottom: 0;
}
.betslip-select-div {
  flex: 1;
}

.betslip-select-div .el-radio-group {
  width: 100%;
  width: calc(100% + 8px);
  height: 32px;
  display: flex;
}
.betslip-select-div .el-radio-button {
  flex: 1 1 0%;
  color: rgb(255, 255, 255);
  cursor: pointer;
  height: 32px;
  margin: 0px 8px 0px 0px;
  display: inline-block;
  /* padding: 0px 12px; */
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
  font-weight: 400;
  line-height: 32px;
  border-radius: 24px;
}
.betslip-select-div .el-radio-button.is-active {
  color: rgb(255, 255, 255);
  cursor: default;
  background: rgb(34, 131, 246);
}
.betslip-select-div /deep/ .el-radio-button__inner {
  text-align: center;
  padding: 4px;
  background-color: transparent;
  border-color: transparent;
  border: 0 !important;
  box-shadow: 0 0 0 transparent;
}

.betslipTotalLine {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.71);
}
.betslipPotentialWin {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.betslipAcceptOddsLabel {
  display: flex;
  align-items: center;
  font-weight: normal;
}
.betslip-cell_ft {
  display: flex;
  align-items: center;
}
.betslip-cell_ft .betslipSelectionOdd {
  font-size: 18px;
}
.stake-suffix {
  line-height: 32px;
}
.betslip-cell_ft .betslipStakeInput {
  max-width: 40%;
  margin-left: auto;
}
.betslipStakeInput /deep/ .el-input__inner {
  border: 2px solid #ffffff !important;
  background-color: #ffffff !important;
  color: #111923 !important;
}

.betslip-header-content {
  display: flex;
  align-items: center;
}
.betslipSelectionIcon {
  margin-right: 5px;
}
.betslipSelectionIcon .iconfont {
  font-size: 12px;
}
.betslip-title {
  color: rgba(255, 255, 255, 0.71);
}
.betslipSelection {
  word-break: keep-all;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #ffffff;
  display: flex;
  overflow: visible;
  background: #19212b;
  transition: transform 0.3s;
  border-radius: 6px;
  margin-bottom: 6px;
  position: relative;
}
.betslipSelection .betslip-cell {
  flex: 1;
  display: block;
  padding: 8px 16px 8px 8px;
  z-index: 1;
  position: relative;
  box-sizing: border-box;
  text-decoration: none;
  color: #ffffff;
  font-size: 12px;
}
.betslipSelection .betslipSelectionRemoveButton {
  flex: 0 0 auto;
  color: #ffffff;
  width: 40px;
  cursor: pointer;
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  align-items: center;
  border-radius: 4px 0 0 4px;
  justify-content: center;
}
.betslipStake-main {
  padding: 8px 4px 0;
  max-height: calc(90vh - 95px);
  overflow: hidden;
  overflow-y: auto;
}
.bets-info {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.bets-info .icon-wenjian {
  font-size: 20px;
  margin-right: 5px;
  font-weight: normal;
}
.quickBar {
  display: flex;
  align-items: center;
}
.betslipContent {
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
  background: #111923;
  box-shadow: 0 0 60px rgb(0 0 0 / 65%);
  text-shadow: none;
  border-radius: 6px 6px 0 0;
  pointer-events: auto;
  width: 320px;
  transition: 0.3s all;
  transform: translateY(calc(100% - 55px));
}
@media (max-width: 640px) {
  .betslipContent {
    width: 100%;
    transform: translateY(100%);
  }
}

.betslipContent.show {
  transform: translateY(0);
}

.betslipHeader {
  color: #ffffff;
  cursor: pointer;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  position: relative;
  background: #3a07f2;
  box-sizing: border-box;
  border-radius: 6px 6px 0px 0px;
  justify-content: space-between;
}
.betslipHeader.is-quick {
  background: linear-gradient(to right, #3a07f2, #fa305c);
}
.betslipStake-pane {
  padding: 5px;
}
.betslip-bottom {
  padding: 10px 10px 0 10px;
}
.betslip-bottom .el-button {
  width: 100%;
  margin: 0;
  border-radius: 40px;
  margin-bottom: 15px;
}
.betslip-footer {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
}
.betslip-clear {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
}
.bets-tip {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: normal;
}
.bets-tip .iconfont {
  color: #fad247;
  margin-right: 6px;
}
.betslip-select-div .el-radio-button.is-active {
  color: rgb(255, 255, 255);
  cursor: default;
  background: rgb(34, 131, 246);
}

.bets-empty-cell {
  display: flex;
  align-items: center;
  padding: 25px;
}
.bets-empty-cell img {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}
.bets-empty-cell .bt2335 {
  font-size: 12px;
}
.bt26415 {
    color: #3a07f2;
    width: 22px;
    height: 22px;
    display: flex;
    font-size: 14px;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
    align-items: center;
    font-weight: 600;
    line-height: 22px;
    white-space: nowrap;
    border-radius: 20px;
    justify-content: center;
}
.bt26417 {
    color: #3a07f2;
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
}
.bt26410 {
    top: -2px;
    left: 40px;
    position: absolute;
}

.bt26599 {
    display: flex;
    box-sizing: border-box;
    margin-top: 16px;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    flex-direction: column;
}
.bt26619 {
    color: #ffffff;
    display: flex;
    font-size: 14px;
    align-items: center;
    margin-bottom: 24px;
}
.bt26620 {
    width: 24px;
    height: 24px;
    opacity: 0.5;
    margin-right: 8px;
}
.bt26628 {
    color: rgb(255, 255, 255);
    width: auto;
    cursor: pointer;
    height: unset;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    transition-delay: 0s;
    appearance: none;
    transition-duration: 0.5s;
    transition-property: backgroundColor, background;
    -webkit-font-smoothing: inherit;
    transition-timing-function: ease;
    font: inherit inherit inherit inherit inherit inherit inherit inherit;
    border-width: initial;
    border-style: none;
    border-image: initial;
    margin: 0px;
    outline: none;
    padding: 11px 28px;
    overflow: visible;
    background: rgb(34, 131, 246);
    border-color: rgb(34, 131, 246);
    border-radius: 24px;
}
.bt26627 {
    width: 100%;
    height: auto;
    margin: 0 auto 16px;
    display: block;
    min-width: 240px;
    font-weight: 600;
    padding-left: 44px;
    padding-right: 44px;
    text-transform: uppercase;
}
.bt26631 {
    color: #ffffff;
    opacity: 0.5;
    font-size: 12px;
    text-align: center;
}
.bt26634 {
    color: #ffffff;
    cursor: pointer;
    font-weight: 600;
    padding-left: 8px;
    text-decoration: underline;
}
.bt253 {
    top: 0;
    left: 40px;
    width: calc(100% - 42px);
    height: 100%;
    z-index: 2;
    position: absolute;
}
.bt272 {
    color: #ffffff;
    width: 100%;
    height: 100%;
    display: flex;
    opacity: 0.96;
    background: rgba(25,33,43,0.96);
    text-align: center;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    font-weight: 400;
    flex-direction: column;
    justify-content: center;
}

.success-checkmark {
  width: 80px;
  height: 115px;
  margin: 0 auto;
}
.success-checkmark .check-icon {
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid #4caf50;
}
.success-checkmark .check-icon::before {
  top: 3px;
  left: -2px;
  width: 30px;
  transform-origin: 100% 50%;
  border-radius: 100px 0 0 100px;
}
.success-checkmark .check-icon::after {
  top: 0;
  left: 30px;
  width: 60px;
  transform-origin: 0 50%;
  border-radius: 0 100px 100px 0;
  animation: rotate-circle 4.25s ease-in;
}
.success-checkmark .check-icon::before, .success-checkmark .check-icon::after {
  content: "";
  height: 100px;
  position: absolute;
  background: transparent;
  transform: rotate(-45deg);
}
.success-checkmark .check-icon .icon-line1 {
  height: 5px;
  background-color: #4caf50;
  display: block;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
}
.success-checkmark .check-icon .icon-line1.line-tip {
  top: 46px;
  left: 14px;
  width: 25px;
  transform: rotate(45deg);
  animation: icon-line-tip 0.75s;
}
.success-checkmark .check-icon .icon-line1.line-long {
  top: 38px;
  right: 8px;
  width: 47px;
  transform: rotate(-45deg);
  animation: icon-line-long 0.75s;
}
.success-checkmark .check-icon .icon-circle {
  top: -4px;
  left: -4px;
  z-index: 10;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  box-sizing: content-box;
  border: 4px solid rgba(76, 175, 80, 0.5);
}
.success-checkmark .check-icon .icon-fix {
  top: 8px;
  width: 5px;
  left: 26px;
  z-index: 1;
  height: 85px;
  position: absolute;
  transform: rotate(-45deg);
  background-color: transparent;
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
}
@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}
@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}
.bt1566 {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.bt1567 {
  width: 100%;
  text-align: center;
  padding: 25px;
}
.bt1568 {
  background: rgba(255,255,255,0.1);
  padding: 10px 20px;
  border-radius: 22px;
  color: #FFF;
  text-decoration: none;
}
.bt1568 svg {
  margin-right: 8px;
}
.bt172, .betslip-loading{
  max-height: 375px;
  position: absolute;
  bottom: 0;
  background: #19212b;
  z-index: 999;
  width: 100%;
  padding-top: 30px;
}
.betslip-loading{
  padding: 60px 0;
}
.bt1555 {
  width: 60%;
  margin: 0 auto;
  padding: 20px 0;
  text-align: center;
}
</style>
