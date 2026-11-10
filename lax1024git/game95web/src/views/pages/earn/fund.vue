<template>
  <div
    class="app"
    :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`"
  >
    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="boxes">
            <div class="boxes__head">
              <h1 class="boxes__title">{{$t('收益池')}}</h1>
              <div class="boxes__tabs">
                <div
                  class="button-tab boxes__tab button-tab_md button-tab_blue"
                  @click="onTab(0)"
                  :class="tabAcitve == 0?'active':''"
                >
                  <span>{{$t('所有收益')}}</span>
                </div>
                <div
                  v-if="$store.state.isLoginStatu"
                  class="button-tab boxes__tab button-tab_md button-tab_blue"
                  @click="onTab(2)"
                  :class="tabAcitve == 2?'active':''"
                >
                  <span>{{$t('投资记录')}}</span>
                </div>
                <div
                  class="button-tab boxes__tab button-tab_md button-tab_blue"
                  @click="onTab(1)"
                  :class="tabAcitve == 1?'active':''"
                >
                  <span>{{ $t('FAQ') }}</span>
                </div>
              </div>
            </div>
            <div class="boxes__body" v-if="tabAcitve == 0">
              <all></all>
            </div>
            <div class="boxes__body" v-if="tabAcitve == 1">
              <faq></faq>
            </div>
            <div class="boxes__body" v-if="tabAcitve == 2">
              <div
                class="transactions__table"
                :style="$store.state.moduleLoading ? 'min-height: 200px;margin-top: 20px' : ''"
              >
                <table
                  class="no-animation table-all"
                  :style="$store.state.moduleLoading ? 'min-height: 200px' : ''"
                  v-loading="$store.state.moduleLoading"
                  element-loading-background="rgba(0, 0, 0, 0.2)"
                >
                  <thead v-if="records.length > 0">
                    <tr>
                      <th>{{$t('名称')}}</th>
                      <th>{{$t('类型')}}</th>
                      <th>{{$t('金额')}}</th>
                      <th>{{$t('累计收益')}}</th>
                      <th>{{$t('周期')}}</th>
                      <th>{{$t('投资时间')}}</th>
                      <th>{{$t('状态')}}</th>
                    </tr>
                  </thead>
                  <tbody v-for="(item,index) in records" :key="`records${index}`">
                    <tr>
                      <td class="td__date"><span class="datetime">{{ $t(item.name) }}</span></td>
                      <td class="td__date"><span class="datetime">{{ item.type == 1 ? $t('活期') : $t('定期')}}</span></td>
                      <td class="td__amount">
                        <span class="currency">
                          <div class="currency__balances-wrap">
                            <div class="currency__balances">{{ numFormat(item.price,true) }}</div>
                          </div>
                        </span>
                      </td>
                      <td class="td__amount">
                        <span v-if="item.type == 1">-</span>
                        <span v-else class="currency">
                          <div class="currency__balances-wrap">
                            <div class="currency__balances">{{ numFormat(item.all_earnings,true) }}</div>
                          </div>
                        </span>
                      </td>
                      <td class="td__amount">
                        <span class="datetime" v-if="item.type == 2">{{item.few_days}} {{ $t('天') }}</span>
                        <span v-else>-</span>
                      </td>
                      <td class="td__date"><span class="datetime">{{ item.add_time }}</span></td>
                      <td class="td__status">
                        <span v-if="item.type == 1">-</span>
                        <template v-else>
                          <span v-if="item.f_status==1" class="td__status-wrapper text-green">{{ $t('进行中') }}</span>
                          <span v-else-if="item.f_status==2" class="td__status-wrapper text-yellow">{{ $t('已返还') }}</span>
                          <span v-else-if="item.f_status==3" class="td__status-wrapper text-red">{{ $t('手动返还') }}</span>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="container-class" v-if="records.length > 0">
                <el-pagination
                  background
                  :small="isMobileFlag"
                  :pager-count="5"
                  layout="prev, pager, next"
                  :current-page.sync="page"
                  :page-size="pageSize"
                  @current-change="pageSizeChange"
                  :total="total"
                ></el-pagination>
              </div>
              <div class="empty" v-if="records.length == 0 && !$store.state.moduleLoading">
                <span>{{$t('暂无数据')}}</span>
              </div>
            </div>
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
      :class="openedleft?'visible':''"
      @click="menuClick"
    ></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import tabbar from "@/components/tabbar.vue";
import svgIcon from "@/components/svg.vue";
import all from "../boxes/all.vue";
import faq from "../boxes/faq.vue";
import { get_fund_order_list_api } from "@/api/fund.js";
export default {
  name: "FundPage",
  components: {
    Head,
    Foot,
    all,
    faq,
    asidebar,
    svgIcon,
    tabbar
  },
  data() {
    return {
      tabAcitve: 0,
      records: [],
      page: 1,
      pageSize: 10,
      total: 0,
      f_status: 'all',
      fund_type: 'all',
      count:0,
      isLoading: false,
    };
  },
  methods: {
    onTab(index) {
      if (index < 0 || index > 2) {
        return;
      }
      this.tabAcitve = index;
      if (index == 2) {
        this.getData();
      }
    },
    getData() {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      let data = {
        f_status: this.f_status,
        fund_type: this.fund_type,
        page: this.page,
        limit: this.pageSize,
      };
      get_fund_order_list_api(data).then(res => {
        if (res && res.data.code == 1) {
          if (res.data.data.length > 0) {
            this.records = res.data.data;
            this.total = res.data.total
          }
        }
        this.isLoading = false;
      });
    },
    pageSizeChange(e) {
      this.page = e;
      // this.records = [];
      this.getData();
    },
    menuClick() {
      this.openedleft = !this.openedleft;
    },
    contestsShow() {
      this.openedcontests = true;
    },
  },
  created() {
    if (this.$route.query.tab) {
      this.onTab(this.$route.query.tab)
    }
    this.isPhone();
  }
};
</script>
<style scoped>
.boxes {
  padding-top: 42px;
  min-height: 600px;
}

.boxes__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
.boxes{
	padding-top: 0;
}
  .boxes__head {
    display: block;
    margin-top: 0;
    margin-bottom: var(--padding);
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .boxes__head {
    display: block;
    margin-top: 34px;
    margin-bottom: 24px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .boxes__head {
    display: block;
    margin-top: 34px;
    margin-bottom: 24px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .boxes__head {
    display: block;
    margin-top: 34px;
    margin-bottom: 24px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .boxes__head {
    display: block;
    margin-top: 34px;
    margin-bottom: 24px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .boxes__head {
    display: block;
    margin-top: 34px;
    margin-bottom: 24px;
  }
}

.boxes__title {
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  margin: 0;
}

@media (max-width: 768px) {
  .boxes__title {
    margin-bottom: 24px;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .boxes__title {
    margin-bottom: 24px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .boxes__title {
    margin-bottom: 24px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .boxes__title {
    margin-bottom: 24px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .boxes__title {
    margin-bottom: 24px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .boxes__title {
    margin-bottom: 24px;
  }
}

.boxes__tabs {
  display: flex;
  align-items: center;
  cursor: pointer;
  overflow-x: scroll;
}
.boxes__tabs::-webkit-scrollbar,.boxes__tabs::-webkit-scrollbar-thumb,.boxes__tabs::-webkit-scrollbar-track{
  display: none;
}

.boxes__tab {
  margin-right: 20px;
}

.boxes__tab:last-child {
  margin-right: 0;
}

@media (max-width: 768px) {
  .boxes__tab {
    justify-content: center;
    margin-right: 0;
    padding: 5px 6px;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .boxes__tab {
    justify-content: center;
    margin-right: 0;
    padding: 5px 6px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .boxes__tab {
    justify-content: center;
    margin-right: 0;
    padding: 5px 6px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .boxes__tab {
    justify-content: center;
    margin-right: 0;
    padding: 5px 6px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .boxes__tab {
    justify-content: center;
    margin-right: 0;
    padding: 5px 6px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .boxes__tab {
    justify-content: center;
    margin-right: 0;
    padding: 5px 6px;
  }
}

@media (max-width: 768px) {
  .boxes__tab {
    font-size: 12px !important;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .boxes__tab {
    font-size: 12px !important;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .boxes__tab {
    font-size: 12px !important;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .boxes__tab {
    font-size: 12px !important;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .boxes__tab {
    font-size: 12px !important;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .boxes__tab {
    font-size: 12px !important;
  }
}

.boxes__tab-label {
  color: #ffb636;
  margin-left: 3px;
}

.boxes__tab--active .boxes__tab-label {
  color: #fff;
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

.tab-badge {
  font-family: Numbers, Montserrat;
  position: relative;
  display: block;
  line-height: 1.2;
  font-weight: 600;
  font-size: 10px;
  color: #fff;
  background-color: #3a07f2;
  border-radius: 10px;
  padding: 3px 9px;
  margin-left: 0.5em;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
}

.active .tab-badge {
  color: #3a07f2;
  background-color: #fff;
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

.button-tab_xs i ~ span {
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

.button-tab_sm i ~ span {
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

.button-tab_md i ~ span {
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

.button-tab_lg i ~ span {
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

.button-tab_xl i ~ span {
  margin-left: 8px;
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
table.table-all td:nth-child(4), table.table-all th:nth-child(4) {
  min-width: auto;
}
table.table-all td .datetime {
  width:max-content;
  display: block;
}
.transactions__table {
  overflow-y: auto;
  overscroll-behavior-y: auto;
}
</style>
