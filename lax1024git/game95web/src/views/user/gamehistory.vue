<template>
 <!--  <div class="app" :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`"> -->

   <!--  <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" /> -->
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="page-account">
            <accountTabsnew num = "g"></accountTabsnew>
            <h2 class="gamehistory_title">{{$t("游戏记录")}}</h2>
            <div class="page-account__body">
              <div class="transactions">
                <div class="table-filter">
                  <div class="filter-select" v-if="options.length">
                    <el-select v-model="selectValue" @change="selectChange" :placeholder="$t('请选择')">
                      <el-option v-for="item in options" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <div class="filter-date">
                    <el-date-picker format="MM-dd-yyyy" value-format="yyyy-MM-dd" v-model="dateVal" @change="dateChange"
                      type="daterange" range-separator="—" :start-placeholder="$t('开始日期')" :end-placeholder="$t('结束日期')"
                     ></el-date-picker>
                  </div>
                </div>
                <div class="game-history__table overflow-x-auto"
                  :style="$store.state.moduleLoading ? 'min-height: 200px;margin-top: 20px' : ''"
                  v-loading="$store.state.moduleLoading" element-loading-background="rgba(0, 0, 0, 0.2)">
                  <table class="no-animation table-all">
                    <thead v-if="gameOrderList.length > 0">
                      <tr class="tr_title">
                        <th>{{ $t('类型') }}</th>
                        <th>{{ $t('子类型') }}</th>
                        <th>{{ $t('变更余额') }}</th>
                        <th>{{ $t('变更后余额') }}</th>
                        <th>{{ $t('时间') }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in gameOrderList" v-if="index % 2 != 1" :key="`gameOrderList${index}`" class="tab_tr_color">
                        <td class="td_name">
                          <span class="datetime">
                            <!-- <img width="20" height="20" :src="item.game_icon" loading="lazy" class="currency__icon" /> -->
                            {{ $t(item.type) }}
                          </span>
                        </td>
                        <td class="td_date">
                          <span class="datetime">{{ item.child_type ? item.child_type : '--' }}</span>
                        </td>
                        <td>
                          <span class="currency">
                            <div class="currency__balances-wrap">
                              <div class="currency__balances">{{ numFormat(item.price, true) }}</div>
                            </div>
                          </span>
                        </td>
                        <td class="td_payout">
                          <span class="currency">
                            <div class="currency__balances-wrap">
                              <div class="currency__balances">{{ numFormat(item.new_price, true) }}</div>
                            </div>
                          </span>
                        </td>
                        <td class="td_payout">
                          <span class="datetime">{{ item.add_time }}</span>
                        </td>
                      </tr>
                      <tr v-else >
                        <td class="td_name">
                          <span class="datetime">
                            <!-- <img width="20" height="20" :src="item.game_icon" loading="lazy" class="currency__icon" /> -->
                            {{ $t(item.type) }}
                          </span>
                        </td>
                        <td class="td_date">
                          <span class="datetime">{{ item.child_type ? item.child_type : '--' }}</span>
                        </td>
                        <td>
                          <span class="currency">
                            <div class="currency__balances-wrap">
                              <div class="currency__balances">{{ numFormat(item.price, true) }}</div>
                            </div>
                          </span>
                        </td>
                        <td class="td_payout">
                          <span class="currency">
                            <div class="currency__balances-wrap">
                              <div class="currency__balances">{{ numFormat(item.new_price, true) }}</div>
                            </div>
                          </span>
                        </td>
                        <td class="td_payout">
                          <span class="datetime">{{ item.add_time }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="container-class" v-if="gameOrderList.length > 0">
                    <el-pagination background :small="isMobileFlag" :pager-count="5" layout="prev, pager, next"
                      :current-page.sync="currentPage" :page-size="10" @current-change="handleSizeChange"
                      :total="listTotal"></el-pagination>
                  </div>
                </div>
                <div class="empty" v-if="gameOrderList.length == 0 && !$store.state.moduleLoading">
                  <span>{{ $t('暂无数据') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot />
   <!--  </div> -->
   <!--  <template v-if="j">
            <asidebar  @menuClick="menuClick" :flagShow="openedleft"></asidebar>
        </template>
    <template v-else>
        <asidebar v-if="i" @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar> -->
    <div class="app-overlay" v-if="isMobileFlag" :class="openedleft ? 'visible' : ''" @click="menuClick"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import { game_order_api, game_balance_record_api } from "@/api/user";
import accountTabsnew from "../../components/accountTabs_new.vue"
const size = window.innerWidth
let width_size = true
let app = true
if(size < 1024){
    console.log('进来了')
    width_size = false
    app = false
}
export default {
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    accountTabsnew
  },
  data() {
    return {
      i:width_size,
      j:app,
      pickerOptions: {
        disabledDate: (time) => {
          let nowData = new Date()
          nowData = new Date(nowData.setDate(nowData.getDate() - 7))
          return time < nowData
        }
      },
      options: [  ],
      selectValue: "all",
      dateVal: "",
      currentPage: 1,
      gameOrderList: [],
      listTotal: 0,
      page: 1,
      settlementType: 0,
      start_time: "",
      end_time: ""
    };
  },
  methods: {
    dateChange(dateVal) {
      if (dateVal) {
        this.start_time = this.dateVal[0];
        this.end_time = this.dateVal[1];
        this.page = 1;
        this.gameOrderList = [];
        this.getBalanceRecord();
      } else {
        this.start_time = "";
        this.end_time = "";
        this.page = 1;
        this.gameOrderList = [];
        this.getBalanceRecord();
      }
    },
    selectChange(e) {
      this.dateVal = "";
      this.start_time = "";
      this.end_time = "";
      this.page = 1;
      this.gameOrderList = [];
      this.getBalanceRecord(e);
    },

    async getBalanceRecord(type = "") {
      this.$store.commit("$vuexSetModuleLoadingState", true);
      let param = {};
      param = {
        page: this.page,
        limit: 10,
        type: type,
        start_time:this.start_time,
        end_time:this.end_time
      };
      await game_balance_record_api(param).then(res => {
        if (res && res.data.code == 1) {
          console.log(res);
          this.gameOrderList = res.data.data;
          this.listTotal = res.data.total;
          if (res.data.type.length > 0) {
            const option = []
            res.data.type.forEach((ele, index) => {
              option.push({ label: ele, value: index })
            });
            option.unshift({ label: this.$t("所有"), value: "all" })
            this.options = option
          }

        }
        this.$store.commit("$vuexSetModuleLoadingState", false);
      });


    },

    async getGameOrder() {
      this.$store.commit("$vuexSetModuleLoadingState", true);
      let param = {};
      param = {
        page: this.page,
        limit: 10,
        settlement: this.settlementType,
        date: this.start_time ? this.start_time + "|" + this.end_time : ""
      };
      await game_order_api(param).then(res => {
        if (res && res.data.code == 1) {
          this.gameOrderList = res.data.data;
          this.listTotal = res.data.total;
        }
        this.$store.commit("$vuexSetModuleLoadingState", false);
      });
    },



    handleSizeChange(e) {
      this.page = e;
      this.gameOrderList = [];
      this.getBalanceRecord(this.selectValue);
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
  },
  mounted() {
    // this.getGameOrder();
    this.getBalanceRecord()
  },
  created() {
    this.isPhone();
  }
};
</script>
<style scoped>
/* .wrapper__inner{
  background: #0A0605;
} */
.page-account__body {
  background: #191A1E;
  border-radius: 10px;
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
  grid-gap: 24px;
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
  position: absolute;
  right: 0;
  bottom: 0;
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
}

.statistic-table__body,
.statistic-table__head {
  background-color: #111923;
}

.head,
.statistic-table__body {
  padding: 24px;
}

.head {
  display: flex;
  justify-content: stretch;
}

@media (max-width: 1500px) {
  .opened-right-panel .head {
    display: block;
  }
}

@media (max-width: 1000px) {
  .head {
    display: block;
  }
}

.head__item {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

@media (max-width: 1500px) {
  .opened-right-panel .head__item {
    width: auto;
    padding-right: 0;
  }
}

@media (max-width: 1000px) {
  .head__item {
    width: auto;
    padding-right: 0;
  }
}

.head__item:not(:first-child) {
  padding-left: 24px;
  border-left: 1px solid #2a3546;
}

@media (max-width: 1500px) {
  .opened-right-panel .head__item:not(:first-child) {
    border-top: 1px solid #2a3546;
    padding-left: 0;
    border-left: none;
    margin-top: 16px;
    padding-top: 16px;
  }
}

@media (max-width: 1000px) {
  .head__item:not(:first-child) {
    border-top: 1px solid #2a3546;
    padding-left: 0;
    border-left: none;
    margin-top: 16px;
    padding-top: 16px;
  }
}

.head__label {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #55657e;
  margin-bottom: 4px;
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
  display: inline-flex;
  align-items: center;
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
  background: #111923;
  border-radius: 14px;
}

@media (max-width: 1500px) {
  .opened-right-panel .statistic-chat__bott {
    display: block;
  }
}

@media (max-width: 1000px) {
  .statistic-chat__bott {
    display: block;
  }
}

.stat-block {
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

@media (max-width: 1500px) {
  .opened-right-panel .stat-block {
    width: auto;
    padding-right: 0;
  }
}

@media (max-width: 1000px) {
  .stat-block {
    width: auto;
    padding-right: 0;
  }
}

.stat-block:not(:first-child) {
  padding-left: 24px;
  border-left: 1px solid #2a3546;
}

@media (max-width: 1500px) {
  .opened-right-panel .stat-block:not(:first-child) {
    border-top: 1px solid #2a3546;
    padding-left: 0;
    border-left: none;
    margin-top: 16px;
    padding-top: 16px;
  }
}

@media (max-width: 1000px) {
  .stat-block:not(:first-child) {
    border-top: 1px solid #2a3546;
    padding-left: 0;
    border-left: none;
    margin-top: 16px;
    padding-top: 16px;
  }
}

.stat-block__title {
  font-size: 12px;
  color: #55657e;
  margin-bottom: 4px;
}

.stat-block__data,
.stat-block__title {
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
  color: #55657e;
}

.battles-table table td,
.battles-table table th {
  display: inline-block;
  border: 0;
  text-align: left;
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
.table-filter{
  height: 70px;
}
.tr_title{
  background-color: #FFA905;
}
.tab_tr_color{
  background-color: #0A0605;
}
.gamehistory_title{
  margin: 20px 0px 10px 0px;
}
@media (max-width: 768px){
  table.table-all td:first-child{
    background-color: #191A1E;
  }
}
</style>
