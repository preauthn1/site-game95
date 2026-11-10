<template>
  <div class="referrals">
    <div class="actions">
      <el-date-picker @input="getTeamUser" v-model="dateRange" :locale="dateLocale"
        class="vue-date-picker-wrapper actions__date-picker" is-dark is-range>
        <template v-slot="{ inputValue, inputEvents }">
          <svg width="24" height="24" focusable="false" aria-hidden="true" class="calendar-icon">
            <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-calendar" class="svg-use"></use>
          </svg>
          <span v-on="inputEvents.start" class="vue-date-picker">
            <input :placeholder="$t('选择日期')"
              :value="inputValue.start ? `${inputValue.start} ~ ${inputValue.end}` : ''" type="input"
              class="vc-appearance-none vc-text-base vc-text-gray-800 vc-bg-white vc-border vc-border-gray-400 vc-rounded vc-w-full">
            <div class="vc-popover-content-wrapper"></div>
          </span>
          <svg width="14" height="14" focusable="false" aria-hidden="true" class="chevron-icon">
            <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-arrow-down" class="svg-use"></use>
          </svg>
        </template>
        <template v-if="$helper.getLang() === 'TW'" v-slot:header-title="{ shortMonthLabel, yearLabel }">
          <span> {{ yearLabel }}{{ $t('年') }} {{ shortMonthLabel }} </span>
        </template>
      </el-date-picker>
      <el-dropdown @command="handleCommand" class="actions__dropdown-per-page">
        <el-button>
          {{ limit }} <svg width="14" height="14" focusable="false" aria-hidden="true" class="chevron-icon">
            <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-arrow-down" class="svg-use"></use>
          </svg>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu_md lan-dropdown">
          <el-dropdown-item :command="10">10</el-dropdown-item>
          <el-dropdown-item :command="30">30</el-dropdown-item>
          <el-dropdown-item :command="50">50</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="referrals__table-wrap">
      <div class="game-history__table"
        :style="$store.state.moduleLoading ? 'min-height: 200px;margin-top: 20px' : ''"
        v-loading="$store.state.moduleLoading" element-loading-background="rgba(0, 0, 0, 0.2)">
        <table class="no-animation" v-if="users && users.list.length > 0">
          <thead>
            <tr>
              <th>{{ $t('日期') }}</th>
              <th>{{ $t('用户') }}</th>
              <th>{{ $t('级别') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in users.list" :key="`users.list${index}`">
              <td class="td_date">
                <span class="datetime">{{ item.add_time }}</span>
              </td>
              <td class="td_date">
                <span class="datetime">{{ item.username }}</span>
              </td>
              <td class="td_date">
                <span class="datetime">{{ item.level }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="container-class" v-if="users && users.list.length > 0">
          <el-pagination background :small="isMobileFlag" :pager-count="5" layout="prev, pager, next"
            :current-page.sync="currentPage" :page-size="limit" @current-change="handleSizeChange"
            :total="users.user_count"></el-pagination>
        </div>
      </div>
      <div class="empty" v-if="users && users.list.length == 0 && !$store.state.moduleLoading">
        <span>{{ $t('暂无数据') }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import svgIcon from '@/components/svg.vue'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { team_user_api } from "@/api/user";
export default {
  components:{svgIcon,DatePicker},
  data() {
    return {
      currentPage: 1,
      limit: 10,
      users: null,
      dateRange: null,
    }
  },
  methods: {
    getTeamUser() {
      let date = '';
      if (this.dateRange) {
        date = this.timestampToTime3(Date.parse(this.dateRange.start)) + '|' + this.timestampToTime3(Date.parse(this.dateRange.end))
      }
      let data = {
        isday: 0,
        date: date,
        page: this.currentPage,
        limit: this.limit
      }
      this.$store.commit("$vuexSetModuleLoadingState", true);
      team_user_api(data).then(res => {
        if (res && res.data.code == 1) {
          // console.log(res.data.data, "getTeamUser");
          this.users = res.data.data;
          this.$store.commit("$vuexSetModuleLoadingState", false);
        }
      });
    },
    handleSizeChange(e) {
      this.currentPage = e;
      // this.users.list = [];
      this.getTeamUser();
    },
    handleCommand(size) {
      this.limit = size;
      this.currentPage = 1;
      this.users = null;
      this.getTeamUser();
    },
  },
  computed: {
    dateLocale() {
      const types = {
        'EN': 'en',
        'CN': 'zh',
        'TW': 'zh-TW',
        'JP': 'ja',
        'KOR': 'ko',
        'SPA': 'es',
        'VN': 'vi',
        'TH': 'th',
        'MY': 'ms',
        'IN': 'id',
        'HIN': 'hi'
      }
      const lang = this.$helper.getLang();
      return types[lang] ? types[lang] : 'en';
    }
  },
  mounted() {
    this.getTeamUser()
  },
};
</script>
<style scoped>
.referrals__get-btn {
  border: 0;
  height: 40px;
  background: #3a07f2;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -.02em;
  color: #fff;
  width: 100%;
  max-width: 330px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.referrals {
  margin-top: 25px;
}

.referrals__table {
  position: relative;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.02em;
  overflow-x: auto;
  min-height: 200px;
}

.referrals__info,
.referrals__t-head {
  color: #55657e;
}

.referrals__t-body,
.referrals__t-head {
  min-width: 900px;
}

.referrals__t-head {
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 10px;
}

.referrals__th {
  padding-left: 16px;
}

.referrals__t-body {
  max-height: 565px;
  overflow-y: auto;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 80px;
  grid-gap: 16px 30px;
  position: relative;
  z-index: 2;
}

.actions__date-picker {
  margin-left: 0;
  grid-area: 1/1/1/2;
}

.actions__dropdown-campaigns {
  grid-area: 2/1/2/1;
}

.actions .actions__dropdown-per-page {
  min-width: 0;
  grid-area: 2/2/1/3;
}

.actions .actions__dropdown-per-page .el-button--default {
  background-color: #1c2532;
  border-color: #1c2532;
  border-style: solid;
  transition: background-color .1s ease-in-out, border-color .1s ease-in-out;
  width: 100%;
}

.referrals__table-wrap {
  position: relative;
  z-index: 1;
}

@media screen and (max-width: 810px) {
  .referrals__table-wrap {
    position: relative;
  }

  .referrals__table-wrap:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(90deg,
        #0d131c 0,
        rgba(13, 19, 28, 0) 10%,
        rgba(13, 19, 28, 0) 90%,
        #0d131c);
  }
}

.actions {
  display: grid;
  grid-template-columns: 1fr 80px;
  grid-gap: 16px 30px;
  position: relative;
  z-index: 2;
}
.actions__date-picker {
  margin-left: 0;
  grid-area: 1/1/1/2;
}
.actions__dropdown-campaigns {
  grid-area: 2/1/2/1;
}
.actions .actions__dropdown-per-page {
  min-width: 0;
  grid-area: 2/2/1/3;
}
.actions .actions__dropdown-per-page .el-button--default{
  background-color: #1c2532;
  border-color: #1c2532;
  border-style: solid;
  transition: background-color .1s ease-in-out,border-color .1s ease-in-out;
  width: 100%;
}

@media (min-width: 1100px) {
  .actions {
    display: grid;
    grid-template-columns: 165px 230px auto 80px;
    grid-column-gap: 16px;
  }

  .actions__date-picker {
    grid-area: 1/1/1/3;
  }

  .actions__dropdown-campaigns {
    grid-area: 1/1/1/1;
  }

  .actions .actions__dropdown-per-page {
    grid-area: 1/4/1/4;
  }
}

.referral__td {
  overflow: hidden;
}

.referral__tr {
  border-top: 1px solid #1c2532;
}

.referral__td:not(:last-of-type) {
  padding-left: 16px;
  min-width: 121px;
  white-space: nowrap;
}

.referral__tr-main-info {
  height: 55px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(6, 1fr) 40px;
  transition: all 0.15s linear;
  border-radius: 8px;
}

.referral__tr-main-info.selected {
  background: #1c2532;
}

.referral__tr-sub-info-wrap {
  display: grid;
  grid-row-gap: 12px;
  row-gap: 12px;
  max-height: 200px;
  overflow-y: auto;
  margin: 16px 0;
}

.referral__tr-sub-info {
  display: grid;
  grid-template-columns: repeat(6, 1fr) 40px;
}

.referral__action-btn {
  width: 40px;
  height: 40px;
  outline: 0;
  border: 0;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #55657e;
  transition: all 0.15s linear;
}

.referral__action-btn:hover {
  color: #fff;
}

.referral__action-btn .chevron {
  z-index: 100;
}

.referral__date {
  color: #93acd3;
}

.referral__campaign-name {
  margin: 0;
}


.vue-date-picker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #1c2532;
  border-radius: 8px;
  padding-right: 16px;
  height: 40px;
}


.vue-date-picker-wrapper .vue-date-picker {
  display: block;
  width: 100%;
  height: 100%;
}

.vue-date-picker-wrapper .vue-date-picker input {
  background: #1c2532;
  border: 0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  padding: 0 15px 0 42px;
  font-weight: 600;
  font-size: 11px;
  line-height: 20px;
  letter-spacing: -.02em;
  color: #fff;
  cursor: pointer;
  height: 100%;
}

.vc-w-full {
  width: 100%;
}

.calendar-icon,
.chevron-icon {
  z-index: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all .15s;
}

.calendar-icon {
  left: 12px;
}

.chevron-icon {
  right: 12px;
}

.calendar-icon,
.chevron-icon {
  fill: #55657e;
}
</style>
