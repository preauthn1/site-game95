<template>
  <!-- table -->
  <div class="statistics site-card-tab">
    <el-tabs v-model="activeName" @tab-click="orderTab">
      <el-tab-pane :label="$t('所有投注')" name="first">
        <div class="statistics__body" v-if="gameIndexOrderListEmpty == 1">
          <div class="statistics__inner" style="min-height: 560px;">
            <table class="clickable table-all" style="--animation-duration:500ms;">
              <thead>
                <tr>
                  <th>{{$t('游戏图标')}}</th>
                  <th>{{$t('游戏名称')}}</th>
                  <th class="hidden-xs-only">{{$t('时间')}}</th>
                  <th>{{$t('游戏者')}}</th>
                  <!-- <th>{{$t('下注金额')}}</th> -->
                  <th>{{$t('盈利金额')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class
                  v-for="(item,index) in gameIndexOrderList"
                  :key="`gameIndexOrderList${index}`"
                >
                <td class="table-flex">
                    <img class="tab-img" :src="item.game_icon" alt="">
                  </td>
                  <td>
                    <span class="td-name" tab="all">
                      <!-- <svgIcon icon="icon-dice" widthName="24" heightName="24"></svgIcon> -->
                      {{ $t(item.game_name) }}
                    </span>
                  </td>
                  <td class="hidden-xs-only">
                    <span class="td-time">
                      <span class="datetime">{{item.gb_bettime}}</span>
                    </span>
                  </td>
                  <td>
                    <div class="user user--clickable user-wrap" tab="all">
                      <img :src="item.avatar" />
                      <div class="user__wrap">
                        <span class="user__name">{{item.username}}</span>
                      </div>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="td-currency" tab="all">
                      <span class="currency">
                        <img
                          width="20"
                          height="20"
                          :src="require('@/assets/images/'+$store.state.currencyIcon)"
                          loading="lazy"
                          class="currency__icon"
                        />
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span
                              class="currency__balances--balance"
                              style="font-size: 12px;"
                            >
                              <span
                                style="color: #fff"
                                class="font-digits"
                              >{{ numFormat(item.gb_price) }}</span>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </td> -->
                  <td>
                    <div class="td-currency" tab="all">
                      <span class="currency">
                        <img
                          width="20"
                          height="20"
						  :src="require('@/assets/images/'+$store.state.currencyIcon)"
                          loading="lazy"
                          class="currency__icon"
                        />
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span
                              class="currency__balances--balance"
                              :class="item.status"
                              style="font-size: 12px;"
                            >
                              <span>{{ numFormat(item.gb_winprice) }}</span>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="no-data" v-if="gameIndexOrderListEmpty == 2">
          <span>{{$t('暂无数据')}}</span>
        </div>
      </el-tab-pane>
      <template v-if="$store.state.isLoginStatu">
        <el-tab-pane :label="$t('我的投注')" name="second">
          <template v-if="userGameOrderListEmpty == 1">
            <div class="statistics__body">
              <div class="statistics__inner" style="min-height: 560px;">
                <table class="clickable table-all" style="--animation-duration:500ms;">
                  <thead>
                    <tr>
                      <th>{{$t('游戏名称')}}</th>
                      <th>{{$t('时间')}}</th>
                      <th>{{$t('下注金额')}}</th>
                      <th>{{$t('盈利金额')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class
                      v-for="(item,index) in userGameOrderList"
                      :key="`userGameOrderList${index}`"
                    >
                      <td>
                        <span class="td-name" tab="all">
                          <!-- <svgIcon icon="icon-dice" widthName="24" heightName="24"></svgIcon> -->
                          {{ $t(item.game_name) }}
                        </span>
                      </td>
                      <td>
                        <span class="td-time">
                          <span class="datetime">{{item.gb_bettime}}</span>
                        </span>
                      </td>
                      <td>
                        <div class="td-currency" tab="all">
                          <span class="currency">
                            <img
                              width="20"
                              height="20"
                              :src="require('@/assets/images/'+$store.state.currencyIcon)"
                              loading="lazy"
                              class="currency__icon"
                            />
                            <div class="currency__balances-wrap">
                              <div class="currency__balances">
                                <span
                                  class="currency__balances--balance"
                                  style="font-size: 12px;"
                                >
                                  <span
                                    style="color: #fff"
                                    class="font-digits"
                                  >{{ numFormat(item.gb_price) }}</span>
                                </span>
                              </div>
                            </div>
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="td-currency" tab="all">
                          <span class="currency">
                            <img
                              width="20"
                              height="20"
                              :src="require('@/assets/images/'+$store.state.currencyIcon)"
                              alt="BNB"
                              loading="lazy"
                              class="currency__icon"
                            />
                            <div class="currency__balances-wrap">
                              <div class="currency__balances">
                                <span
                                  class="currency__balances--balance"
                                  :class="item.status"
                                  style="font-size: 12px;"
                                >
                                  <span>{{ numFormat(item.gb_winprice) }}</span>
                                </span>
                              </div>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-if="userGameOrderListEmpty == 2">
            <div class="no-data">
              <span>{{$t('暂无数据')}}</span>
            </div>
          </template>
        </el-tab-pane>
      </template>
      <el-tab-pane :label="$t('High rollers')" name="third">
        <div class="statistics__body" v-if="high_bets && high_bets.length > 0">
          <div class="statistics__inner" style="min-height: 560px;">
            <table class="clickable table-all" style="--animation-duration:500ms;">
              <thead>
                <tr>
                  <th>{{$t('游戏名称')}}</th>
                  <th>{{$t('时间')}}</th>
                  <th>{{$t('游戏者')}}</th>
                  <th>{{$t('下注金额')}}</th>
                  <th>{{$t('盈利金额')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr class v-for="(item,index) in high_bets" :key="`high_bets${index}`">
                  <td>
                    <span class="td-name" tab="all">
                      <!-- <svgIcon icon="icon-dice" widthName="24" heightName="24"></svgIcon> -->
                      {{ $t(item.game_name) }}
                    </span>
                  </td>
                  <td>
                    <span class="td-time">
                      <span class="datetime">{{item.gb_betdate}}</span>
                    </span>
                  </td>
                  <td>
                    <div class="user user--clickable user-wrap" tab="all">
                      <img :src="item.avatar" />
                      <div class="user__wrap">
                        <span class="user__name">{{item.username}}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="td-currency" tab="all">
                      <span class="currency">
                        <img
                          width="20"
                          height="20"
                          :src="require('@/assets/images/'+$store.state.currencyIcon)"
                          loading="lazy"
                          class="currency__icon"
                        />
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span
                              class="currency__balances--balance"
                              style="font-size: 12px;"
                            >
                              <span
                                style="color: #fff"
                                class="font-digits"
                              >{{ numFormat(item.gb_price) }}</span>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="td-currency" tab="all">
                      <span class="currency">
                        <img
                          width="20"
                          height="20"
                          :src="require('@/assets/images/'+$store.state.currencyIcon)"
                          loading="lazy"
                          class="currency__icon"
                        />
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span
                              class="currency__balances--balance"
                              :class="item.status"
                              style="font-size: 12px;"
                            >
                              <span>{{ numFormat(item.gb_winprice) }}</span>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="no-data" v-else>
          <span>{{$t('暂无数据')}}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('Rare wins')" name="fourth">
        <div class="statistics__body" v-if="high_wins && high_wins.length > 0">
          <div class="statistics__inner" style="min-height: 560px;">
            <table class="clickable table-all" style="--animation-duration:500ms;">
              <thead>
                <tr>
                  <th>{{$t('游戏名称')}}</th>
                  <th>{{$t('时间')}}</th>
                  <th>{{$t('游戏者')}}</th>
                  <th>{{$t('下注金额')}}</th>
                  <th>{{$t('盈利金额')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr class v-for="(item,index) in high_wins" :key="`high_wins${index}`">
                  <td>
                    <span class="td-name" tab="all">
                      <!-- <svgIcon icon="icon-dice" widthName="24" heightName="24"></svgIcon> -->
                      {{ $t(item.game_name) }}
                    </span>
                  </td>
                  <td>
                    <span class="td-time">
                      <span class="datetime">{{item.gb_betdate}}</span>
                    </span>
                  </td>
                  <td>
                    <div class="user user--clickable user-wrap" tab="all">
                      <img :src="item.avatar" />
                      <div class="user__wrap">
                        <span class="user__name">{{item.username}}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="td-currency" tab="all">
                      <span class="currency">
                        <img
                          width="20"
                          height="20"
                          :src="require('@/assets/images/'+$store.state.currencyIcon)"
                          loading="lazy"
                          class="currency__icon"
                        />
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span
                              class="currency__balances--balance"
                              style="font-size: 12px;"
                            >
                              <span
                                style="color: #fff"
                                class="font-digits"
                              >{{ numFormat(item.gb_price) }}</span>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="td-currency" tab="all">
                      <span class="currency">
                        <img
                          width="20"
                          height="20"
                          :src="require('@/assets/images/'+$store.state.currencyIcon)"
                          loading="lazy"
                          class="currency__icon"
                        />
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span
                              class="currency__balances--balance"
                              :class="item.status"
                              style="font-size: 12px;"
                            >
                              <span>{{ numFormat(item.gb_winprice) }}</span>
                            </span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="no-data" v-else>
          <span>{{$t('暂无数据')}}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  all_game_order_api,
  game_high_order_api,
  user_game_order_api,
} from "@/api/cybSports";
export default {
  components: {},
  data(){
	  return{
		activeName: "first",
		high_wins: [],
		high_bets: [],
		userGameOrderList: [], //首页游戏用户订单
		userGameOrderListEmpty: 0, //首页游戏用户订单缺省
		gameIndexOrderListEmpty: 0, //首页游戏订单缺省
		gameOrderListPage: 1,
		userGameOrderList: [], //首页游戏用户订单
		userGameOrderListEmpty: 0, //首页游戏用户订单缺省
	  }
  },
  methods: {
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
	  orderTab() {
	    if (this.activeName == 'first') {
	      this.getGameIndexOrderList();
	    } else if (this.activeName == 'second') {
	      this.getUserGameOrder();
	    } else if (this.activeName == 'third' || this.activeName == 'fourth') {
	      this.getGameHighOrder();
	    }
	  }
  },
  mounted() {
    this.getGameIndexOrderList();
    this.getGameHighOrder();
    // 登录数据
    if (this.$store.state.isLoginStatu) {
      this.getUserGameOrder();
    }
  },
};
</script>

<style scoped>
	.td-name{
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
  }
  @media screen and (max-width:768px) {
    .td-name{
      max-width: 25vw;
    }
    table.table-all td:nth-child(4), table.table-all th:nth-child(4) {
      min-width: 100px;
    }
  }
  .statistics__inner{
    overflow: auto;
  }
  .tab-img{
    max-width: 38px;
    height: auto;
    object-fit: cover;
  }
  .user-wrap{
    display: flex;
    align-items: center;
  }
  .user-wrap > img{
    width: 22px;
    height: 22px;
    object-fit: cover;
  }
</style>
