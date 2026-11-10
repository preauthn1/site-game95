<template>
  <div class=""
      :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
<!--    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick"/>-->
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="ref-cabinet">
            <!-- <h1 class="ref-cabinet__title">{{$t("团队中心")}}</h1> -->
            <!-- 移动端选择 -->
            <!-- <div class="lobby__m-cells" v-if="isMobileFlag">
              <el-select
                v-model="TabValue"
                :placeholder="$t('请选择')"
                style="width: 100%;"
                popper-class="dw-popper-class"
                @change="tabChange"
                @focus="elSelectOnFocus"
              >
                <div v-if="Tabicon" class="currency__div" slot="prefix">
                  <img width="16" height="16" v-lazy="Tabicon" class="currency__icon" />
                </div>
                <el-option
                  v-for="(item,index) in tablist"
                  :key="index"
                  :value="item.tabvalue"
                  :label="$t(item.name)"
                >
                  <span class="currency">
                    <img width="20" height="20" v-lazy="item.icon" class="currency__icon" />
                    <span class="currency__label">{{ $t(item.name) }}</span>
                  </span>
                </el-option>
              </el-select>
            </div> -->
            <div class="overflow-auto">
              <div class="category-tabs" v-if="$store.state.isLoginStatu">
                <div @click="onTab(item.tabvalue)" class="tab" :class="tab == item.tabvalue ? 'active' : ''"
                     v-if="!item.hide" v-for="(item,index) in tablist" :key="index">
                    <span class="tab__icon">
                      <img :src="item.icon"/>
                    </span>
                  <span class="tab__title">{{ item.name }}</span>
                </div>
              </div>
            </div>
            <div class="overview" v-if="false">
              <div class="referrals" v-if="$store.state.isLoginStatu">
                <img src="@/assets/images/speaker.png" class="referrals__bg"/>
                <div class="referrals__block top">
                  <div class="referrals__top-text-wrap">
                    <h6 class="referrals__top-text-title">{{ $t('InviteCode') }}</h6>
                    <span class="referrals__top-text">{{ rec_code }}</span>
                    <span
                        class="buttonsicon"
                        v-clipboard:copy="rec_code"
                        v-clipboard:success="onCopy"
                    >
                      <svgIcon icon="icon-copy" widthName="18" heightName="18"></svgIcon>
                    </span>
                  </div>
                </div>
                <div class="stats referrals__block" v-if="report">
                  <div class="stats__block">
                    <h6 class="stats__title">{{ $t('Referrals') }}</h6>
                    <img src="@/assets/images/users.svg" alt="users" class="stats__img"/>
                    <span class="stats__ref-count">{{ report.user_count }}</span></div>
                  <div class="stats__block" v-if="$t('external_team_is_hidden')!='hide'">
                    <h6 class="stats__title">{{ $t('推广奖励') }}</h6>
                    <div class="stats__coin-wrap">
                      <span class="currency stats__currency">
                        <img width="24" height="24" :src="require('@/assets/images/'+$store.state.currencyIcon)"
                             loading="lazy" class="currency__icon"/>
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span class="currency__balances--balance" style="font-size: 14px;">
                              <span style="color: #FFFFFF" class="font-digits">
                                {{ numFormat(report.extension) }}
                              </span>
                              <!-- <span @click="popularizeShow" class="iconfont icon-liebiao_list el-m-l-10" style="color:#93acd3"></span> -->
                            </span>
                          </div>
                        </div>
                      </span>
                      <!-- <span class="stats__btc">BTC</span> -->
                    </div>
                  </div>
                  <div class="stats__block" v-if="$t('external_team_is_hidden')!='hide'">
                    <h6 class="stats__title">{{ $t('总收入') }}</h6>
                    <div class="stats__coin-wrap">
                      <span class="currency stats__currency">
                        <img width="24" height="24" :src="require('@/assets/images/'+$store.state.currencyIcon)"
                             loading="lazy" class="currency__icon"/>
                        <div class="currency__balances-wrap">
                          <div class="currency__balances">
                            <span class="currency__balances--balance" style="font-size: 14px;">
                              <span style="color: #FFFFFF" class="font-digits">
                                {{ numFormat(report.agent_total_amount) }}
                              </span>
                            </span>
                          </div>
                        </div>
                      </span>
                      <!-- <span class="stats__btc">BTC</span> -->
                    </div>
                  </div>
                </div>
                <div class="referrals__block column link">
                  <h4 class="referrals__heading">{{ $t('My referral link') }}</h4>
                  <div class="input input_md" readonly="readonly">
                    <div class="input__inner input__inner_readonly">
                      <input autocomplete="off" :value="invite_url" onclick="this.select()" readonly="readonly"
                             class="input__tag"/>
                      <button v-clipboard:copy="invite_url"
                              v-clipboard:success="getQueryUrl" type="button"
                              class="button button_sm button_blue button_center button_only-icon">
                        <span class="button__inner">
                          <span class="button__icon">
                            <svg focusable="false" aria-hidden="true" class="">
                              <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-copy" class="svg-use"></use>
                            </svg>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="referrals__block column half share">
                  <h4 class="referrals__heading">{{ $t('Share') }}</h4>
                  <div class="social-icons2 referrals__socials">
                    <a href="javascript:void(0)" @click="onShare('telegram')"
                       class="social-icons__item share-network-telegram">
                      <button class="social-icons__button"
                              style="width: 32px; height: 32px; background: rgb(0, 167, 240);">
                        <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                          <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-telegram" class="svg-use"></use>
                        </svg>
                      </button>
                    </a>
                    <a v-if="$store.state.shareStyle" href="javascript:void(0)" @click="onShare('facebook')"
                       class="social-icons__item share-network-telegram">
                      <button class="social-icons__button"
                              style="width: 32px; height: 32px; background: rgb(0, 167, 240);">
                        <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                          <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-facebook" class="svg-use"></use>
                        </svg>
                      </button>
                    </a>
                    <a v-if="!$store.state.shareStyle" href="javascript:void(0)" @click="onShare('twitter')"
                       class="social-icons__item share-network-twitter">
                      <button class="social-icons__button"
                              style="width: 32px; height: 32px; background: rgb(0, 171, 245);">
                        <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                          <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-twitter" class="svg-use"></use>
                        </svg>
                      </button>
                    </a>
                    <a v-if="!$store.state.shareStyle" href="javascript:void(0)" @click="onShare('reddit')"
                       class="social-icons__item share-network-reddit">
                      <button class="social-icons__button"
                              style="width: 32px; height: 32px; background: rgb(255, 8, 0);">
                        <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                          <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-reddit" class="svg-use"></use>
                        </svg>
                      </button>
                    </a>
                  </div>
                </div>
                <div class="referrals__block column half" v-if=" $t('external_team_is_hidden')!='hide'">
                  <h4 class="referrals__heading">{{ $t('Promo') }}</h4>
                  <router-link to="/promo-materials" class="referrals__get-btn">{{ $t('获取宣传材料') }}</router-link>
                </div>
              </div>
              <!-- new add -->
              <template v-if="$store.state.isLoginStatu">
                <div class="referrals-cells">
                  <h1 class="ref-cabinet__title" v-if=" $t('external_team_is_hidden')!='hide'">
                    <span>{{ $t("推荐奖金如何运作") }}</span></h1>
                  <div class="bonusWork_box">
                    <div class="bonusWork_box_left">
                      <p class="bonusWork_box_left_title text-yellow">
                        <i>{{ $t("充值返利") }}</i>
                      </p>
                      <p class="bonusWork_box_test">
                        {{ $t("充值返利描述") }}
                      </p>
                    </div>
                    <div class="bonusWork_box_right"><img class="bonusWork_box_icon"
                                                          src="../../assets/images/teamcenter/bonus_work.png" alt="">
                    </div>
                  </div>
                  <div class="bonusWork_invite_panel" v-if="$t('external_team_is_hidden')!='hide'">
                    <p class="bonusWork_table_title text-yellow">{{ $t("成就奖金") }}</p>
                    <ul class="bonusWork_table_ul">
                      <li class="table_li_hd">
                        <div class="table_text">
                          <span>{{ $t("累计邀请用户") }}</span>
                        </div>
                        <div class="table_text">
                          <span>{{ $t("奖金") }}</span>
                        </div>
                      </li>
                      <li :class="['table_li',bonuslistMore?'table_li_show':'']" v-for="(item ,index) in bonuslistInit"
                          :key="index">
                        <div class="table_text">
                          <span>{{ $t(item.stratum_number) }}</span>
                        </div>
                        <div class="table_text">
                          <span>{{ item.stratum_bonus }}</span>
                        </div>
                      </li>
                    </ul>
                    <div class="more" v-if="!bonuslistMore">
                      <span @click="bonuslistMore = true">{{ $t("查看更多") }} <i
                          class="el-icon el-icon-d-arrow-right"></i> </span>
                    </div>
                    <div class="referral_overview_desc">
                      <p>{{ $t('Tips:') }}</p>
                      <p class="cont">{{ $t('1. 被邀有效用户：被邀请人持邀请码的入站注朋并完成首次储值的用户') }}</p>
                      <p class="cont" v-if="$t('2. 1菲律宾比索:1赛博金币')!='2. 1菲律宾比索:1赛博金币'">
                        {{ $t('2. 1菲律宾比索:1赛博金币') }}</p>
                    </div>
                  </div>
                </div>
                <div class="referrals-cells" v-if="$t('external_team_is_hidden')!='hide'">
                  <h1 class="ref-cabinet__title">
                    <span>{{ $t("如何从投注中获得佣金") }}</span>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="$t('如何提示')"
                        placement="top"
                    >
                      <svgIcon icon="icon-question" widthName="16" heightName="16"></svgIcon>
                    </el-tooltip>
                  </h1>
                  <div class="referral_apostas_box">
                    <div class="referral_apostas_top">
                      <div class="referral_apostas_top_left">
                        <div class="referral_apostas_bgc">
                          <p class="referral_apostas_desc">
                            {{ $t("红利规则") }}：
                            <br>
                            <span style="padding-left:15px;display: inline-block;margin-top: 4px;">{{
                                $t("红利规则内容")
                              }}</span>
                          </p>
                          <div class="referral_example">
                            <p class="referral_example_title">
                              {{ $t("3个级别的比例如下") }} :
                            </p>
                            <p class="referral_example_title_desc">
                              <span>- {{ $t("级别") }} 1：</span>
                              <span>{{ $t("在平台上获得") }}</span>
                              <span style="color: #ffb636;">
                                {{ $t("50% 的优势") }}
                              </span>
                            </p>
                            <p class="referral_example_title_desc">
                              <span>- {{ $t("级别") }} 2：</span>
                              <span>{{ $t("在平台上获得") }}</span>
                              <span style="color: #ffb636;">
								{{ $t("15% 的优势") }}
                              </span>
                            </p>
                            <p class="referral_example_title_desc">
                              <span>- {{ $t("级别") }} 3：</span>
                              <span>{{ $t("在平台上获得") }}</span>
                              <span style="color: #ffb636;">
								{{ $t("5% 的优势") }}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p class="referral_overview_desc">
                          {{ $t("邀请提示") }}
                          <!-- 这将是您的长期收入，每次您邀请的玩家下注时，您将获得不同的佣金百分比。 -->
                        </p>
                      </div>
                      <!-- <div class="referral_apostas_top_right"><img class="referral_apostas_icon"
                          src="../../assets/images/teamcenter/icon05.png" alt=""><span
                          class="referral_apostas_dot"></span></div> -->
                    </div>
                    <div class="referral_apostas_bottom">
                      <picture class="referral_apostas_image">
                        <source srcset="../../assets/images/teamcenter/icon07.jpg" media="(max-width: 540px)"
                                type="image/webp">
                        <img src="../../assets/images/teamcenter/icon08.jpg" alt=""/>
                      </picture>
                    </div>
                    <!-- <div class="referral_apostas_mobile"><img class="referral_apostas_icon"
                        src="../../assets/images/teamcenter/icon05.png" alt=""></div> -->
                  </div>
                </div>
                <div class="overview__info-wrap" v-if="$t('external_team_is_hidden')!='hide'">
                  <p class="overview__info">
                    {{ $t('每个关注您的链接,在平台上积极注册和玩游戏的玩家都会获得被动收入') }}</p>
                  <p class="overview__info">{{ $t('使用唯一的推荐链接为每个来源创建您自己的活动') }}</p>
                </div>
              </template>
              <button v-if="$store.state.isLoginStatu" class="overview__read-more"></button>
              <div class="w_100">
                <router-link v-if="!$store.state.isLoginStatu" to="/promo-materials" class="overview__get-btn">
                  {{ $t('获取宣传材料') }}
                </router-link>
              </div>
              <!-- <div class="ref-card in-house">
                <div class="ref-card__inner w_100">
                  <h4 class="ref-card__header">
                    {{$t('分红百分比1')}}
                  </h4>
                  <p class="ref-card__subheader">{{$t('分红来自地址1')}}</p>
                  <p class="ref-card__subheader-optional"></p>
                  <p class="ref-card__info">{{$t('分红规则1')}}</p>
                  <div class="ref-card__for">{{$t('针对模块1')}}</div>
                </div>
              </div>
              <div class="ref-card slots">
                <div class="ref-card__inner w_100">
                  <h4 class="ref-card__header">
                    {{$t('分红百分比2')}}
                  </h4>
                  <p class="ref-card__subheader">{{$t('分红来自地址2')}}</p>
                  <p class="ref-card__subheader-optional"></p>
                  <p class="ref-card__info w_100">{{$t('分红规则2')}}</p>
                  <div class="ref-card__for">{{$t('针对模块2')}}</div>
                </div>
              </div>
              <div class="ref-card bfg">
                <div class="ref-card__inner w_100">
                  <h4 class="ref-card__header">{{$t('分红百分比3')}}</h4>
                  <p class="ref-card__subheader">{{$t('分红来自地址3')}}</p>
                  <p class="ref-card__subheader-optional"></p>
                  <p class="ref-card__info">{{$t('分红规则3')}}</p>
                  <div class="ref-card__for">{{$t('针对模块3')}}</div>
                </div>
              </div>
              <div class="overview__partnership">
                <p class="overview__partnership-top">{{$t('具有更大推荐奖励的独特联属网络营销计划')}}</p>
                <p class="overview__partnership-mid">
                  {{$t('联系我们的经理讨论条款')}}
                  <a
                    :href="`mailto:${$t('EmailAddress')}`"
                    style="text-decoration: none; color: rgb(35, 131, 246); z-index: 100;"
                  >{{$t('EmailAddress')}}</a>
                </p>
                <p class="overview__partnership-bott">{{$t('重要提示信息')}}</p>
              </div> -->
            </div>
            <div v-else-if="tab == 'overview' || !$store.state.isLoginStatu">
              <teamCenterHome></teamCenterHome>
            </div>
            <div class="referral-reward" v-else-if="tab == 'referral-reward'">
              <teamReward></teamReward>
            </div>
            <div class="my-balance" v-else-if="tab == 'my-balance'">
              <div class="my-balance__table">
                <div class="my-balance__t-head" v-if="record.length > 0">
                  <div class="my-balance__th">{{ $t('结算月份') }}</div>
                  <!-- <div class="my-balance__th">{{ $t('返佣基数') }}</div> -->
                  <div class="my-balance__th">{{ $t('返佣金额') }}</div>
                  <div class="my-balance__th">{{ $t('状态') }}</div>
                </div>
                <div class="my-balance__t-body" v-if="record.length > 0">
                  <div class="my-balance__tr" v-for="(item,index) in record" :key="`balance_${index}`">
                    <div class="my-balance__td">
                      <span class="datetime my-balance__date">{{ item.sff_m }}</span>
                    </div>
                    <div class="my-balance__td">
                      <p class="my-balance__campaign-name">{{ numFormat(item.sff_fy, true) }}</p>
                    </div>
                    <div class="my-balance__td">
                      <el-tag size="mini" v-if="item.sff_payed == 2" type="success">{{ $t('已结算') }}</el-tag>
                      <el-tag size="mini" v-else-if="item.sff_payed == 1">{{ $t('未结算') }}</el-tag>
                      <el-tag size="mini" v-else-if="item.sff_payed == 0" type="info">{{ $t('无效') }}</el-tag>
                    </div>
                  </div>
                </div>
                <el-empty v-else :image="$t('no_empty')" :description="$t('暂无数据')"/>
              </div>
              <!-- <button disabled="disabled" class="my-balance__btn">Commission payout</button> -->
            </div>
            <div class="referrals" v-else-if="tab == 'referrals'">
              <div class="top-btn-wapper">
                <div class="top-btn-item" v-if="users">{{
                    $t("注册人数")
                  }}<span>（{{ users.register_user_count }}）</span></div>
                <div class="top-btn-item" v-if="users">{{
                    $t("充值人数")
                  }}<span>（{{ users.recharge_user_count }}）</span></div>
                <el-select v-model="level" :placeholder="$t('筛选层级')" class="select-level" @change="getTeamUser">
                  <el-option
                      v-for="item in 3"
                      :key="item"
                      :label="$t('层级')+ item"
                      :value="item">
                  </el-option>
                </el-select>
              </div>
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
                    {{ limit }}
                    <svg width="14" height="14" focusable="false" aria-hidden="true" class="chevron-icon">
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
                <div
                    class="game-history__table"
                    :style="$store.state.moduleLoading ? 'min-height: 200px;margin-top: 20px' : ''"
                    v-loading="$store.state.moduleLoading"
                    element-loading-background="rgba(0, 0, 0, 0.2)"
                >
                  <table class="no-animation" v-if="users && users.list.length > 0">
                    <thead>
                    <tr>
                      <th>{{ $t('日期') }}</th>
                      <th>{{ $t('用户') }}</th>
                      <th>{{ $t('总充值') }}</th>
                      <th>{{ $t('级别') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in users.list" :key="`users.list${index}`">
                      <td class="td_date">
                        <span class="datetime">{{ item.add_time }}</span>
                      </td>
                      <td class="td_date">
                        <span class="datetime">{{ item.username }}</span>
                      </td>
                      <td class="td_date">
                        <span class="datetime">{{ numFormat(item.total_offline) }}</span>
                      </td>
                      <td class="td_date">
                        <span class="datetime">{{ item.level }}</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="container-class" v-if="users && users.list.length > 0">
                    <el-pagination
                        background
                        :small="isMobileFlag"
                        :pager-count="5"
                        layout="prev, pager, next"
                        :current-page.sync="currentPage"
                        :page-size="limit"
                        @current-change="handleSizeChange"
                        :total="users.register_user_count"
                    ></el-pagination>
                  </div>
                </div>
                <div class="empty" v-if="users && users.list.length == 0 && !$store.state.moduleLoading">
                  <span>{{ $t('暂无数据') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Foot/>
    </div>
<!--    <asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>-->
<!--    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>-->
    <div
        class="app-overlay"
        v-if="isMobileFlag"
        :class="openedleft?'visible':''"
        @click="menuClick"
    ></div>
    <el-dialog :visible.sync="popularizeVisible" custom-class="custom-dialog" :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('详情列表') }}</h1>
        </div>
      </div>
      <table>
        <thead v-if="popularizeList.not_finish && popularizeList.not_finish.length > 0">
        <tr>
          <th>{{ $t('会员等级') }}</th>
          <th>{{ $t('推广人数') }}</th>
          <th>{{ $t('奖励') }}</th>
          <th>{{ $t('状态') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in popularizeList.not_finish" :key="`finish${index}`">
          <td>
            {{ item.stratum }}
          </td>
          <td>
            {{ item.stratum_number }}
          </td>
          <td>
            {{ numFormat(item.stratum_bonus, true) }}
          </td>
          <td>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="header__title" style="margin-top: 20px;">
        <h3>{{ $t('已完成') }}</h3>
      </div>
      <table>
        <thead v-if="popularizeList.finish && popularizeList.finish.length > 0">
        <tr>
          <th>{{ $t('会员等级') }}</th>
          <th>{{ $t('推广人数') }}</th>
          <th>{{ $t('奖励') }}</th>
          <th>{{ $t('状态') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in popularizeList.finish" :key="`finish${index}`">
          <td>
            {{ item.stratum }}
          </td>
          <td>
            {{ item.stratum_number }}
          </td>
          <td>
            {{ numFormat(item.stratum_bonus, true) }}
          </td>
          <td>
            {{ $t('已完成') }}
          </td>
        </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import {
  team_promotion_api,
  team_report_api,
  team_record_api,
  team_user_api,
  game_agent_report_api,
  team_popularize_api,
  getRechargeRebate_api
} from "@/api/user";

import teamReward from "./components/team_reward.vue";
import teamCenterHome from "@/components/teamCenterHome.vue";

export default {
  name: "TeamCenter",
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    teamReward,
    teamCenterHome
  },
  data() {
    return {
      level: "",
      bonuslistMore: false,
      rec_code: "",
      invite_url: "",
      currentPage: 1,
      limit: 10,
      dateRange: null,
      tab: 'overview',
      promotion: {},
      report: {
        agent_total_amount: 0,
        extension: 0,
        user_count: 0,
        lists: []
      },
      record: [
        // {sff_m:'1',sff_fy:'123',sff_pay:2}
      ],
      users: null,
      popularizeVisible: false,
      popularizeList: {
        not_finish: []
      },
      bonuslist: [],
      // 移动端选择
      Tabicon: require("@/assets/images/icon-overview.png"),
      TabValue: this.$t('Overview'),
      tablist: [
        {
          icon: require('@/assets/images/teamcenter/icon877.png'),
          tabvalue: 'overview',
          name: this.$t('面板')
        }, {
          icon: require('@/assets/images/teamcenter/icon878.png'),
          tabvalue: 'referral-reward',
          name: this.$t('报酬')
        }, {
          icon: require('@/assets/images/icon-balance.png'),
          tabvalue: 'my-balance',
          name: this.$t('返佣记录'),
          hide: this.$t('external_team_is_hidden') == 'hide'
        }, {
          icon: require('@/assets/images/icon-referrals.png'),
          tabvalue: 'referrals',
          name: this.$t('Referrals'),
          hide: this.$t('external_team_is_hidden') == 'hide'

        }
      ],
    };
  },
  computed: {
    bonuslistInit() {
      if (this.bonuslistMore) {
        return this.bonuslist
      } else {
        return this.bonuslist.slice(0, 4)
      }
    },
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
  methods: {
    onCopy: function () {
      this.successTips('Copy success');
    },
    onTab(tab) {
      this.tab = tab
      if (this.tab === 'my-balance') {
        this.getTeamRecord()
      } else if (this.tab === 'referrals') {
        this.getTeamUser()
      }
      for (let i in this.tablist) {
        if (this.tablist[i].tabvalue == tab) {
          this.TabValue = this.tablist[i].name
          this.Tabicon = this.tablist[i].icon
          break;
        }
      }
    },
    getQueryUrl() {
      this.successTips('复制成功');
    },
    async getTeamPromotion() {
      await team_promotion_api({type: 0}).then(res => {
        if (res && res.data.code == 1) {
          // console.log(res.data.data, "推广数据");
          this.promotion = res.data.data;
        }
      });
    },

    getTeamReport() {
      team_report_api().then(res => {
        if (res && res.data.code == 1) {
          // console.log(res.data.data, "getTeamReport");
          this.report = res.data.data;
        }
      });
    },

    getTeamRecord() {
      // team_record_api().then(res => {
      game_agent_report_api().then(res => {
        if (res && res.data.code == 1) {
          // console.log(res.data.data, "getTeamRecord");
          this.record = res.data.data;
        }
      });
    },
    getTeamPopularize() {
      team_popularize_api().then(res => {
        if (res && res.data.code == 1) {
          this.popularizeList = res.data.data
        }
      })
    },
    popularizeShow() {
      this.popularizeVisible = true
    },
    getTeamUser() {
      let date = '';
      if (this.dateRange) {
        date = this.timestampToTime3(Date.parse(this.dateRange.start)) + '|' + this.timestampToTime3(Date.parse(this.dateRange.end))
      }
      let data = {
        isday: 0,
        date: date,
        page: this.currentPage,
        limit: this.limit,
        level: this.level
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
    menuClick() {
      this.openedleft = !this.openedleft;
    },
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
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
    onShare(type) {
      let url = this.promotion.rec_url ? this.promotion.rec_url : window.location.origin;
      let text = this.$t('share_media_text');
      let share_url = ''
      const urls = {
        baidu: "http://cang.baidu.com/do/add?iu=@u&it=@t",
        buffer: "https://bufferapp.com/add?text=@t&url=@u",
        email: "mailto:?subject=@t&body=@u%0D%0A@d",
        evernote: "https://www.evernote.com/clip.action?url=@u&title=@t",
        facebook: "https://www.facebook.com/sharer/sharer.php?u=@u&title=@t&description=@d&quote=@q&hashtag=@h",
        flipboard: "https://share.flipboard.com/bookmarklet/popout?v=2&url=@u&title=@t",
        hackernews: "https://news.ycombinator.com/submitlink?u=@u&t=@t",
        instapaper: "http://www.instapaper.com/edit?url=@u&title=@t&description=@d",
        line: "http://line.me/R/msg/text/?@t%0D%0A@u%0D%0A@d",
        linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=@u",
        messenger: "fb-messenger://share/?link=@u",
        odnoklassniki: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=@u&st.comments=@t",
        pinterest: "https://pinterest.com/pin/create/button/?url=@u&media=@m&description=@t",
        pocket: "https://getpocket.com/save?url=@u&title=@t",
        quora: "https://www.quora.com/share?url=@u&title=@t",
        reddit: "https://www.reddit.com/submit?url=@u&title=@t",
        skype: "https://web.skype.com/share?url=@t%0D%0A@u%0D%0A@d",
        sms: "sms:?body=@t%0D%0A@u%0D%0A@d",
        stumbleupon: "https://www.stumbleupon.com/submit?url=@u&title=@t",
        telegram: "https://t.me/share/url?url=@u&text=@t%0D%0A@d",
        tumblr: "https://www.tumblr.com/share/link?url=@u&name=@t&description=@d",
        twitter: "https://twitter.com/intent/tweet?text=@t&url=@u&hashtags=@h@tu",
        viber: "viber://forward?text=@t%0D%0A@u%0D%0A@d",
        vk: "https://vk.com/share.php?url=@u&title=@t&description=@d&image=@m&noparse=true",
        weibo: "http://service.weibo.com/share/share.php?url=@u&title=@t&pic=@m",
        whatsapp: "https://api.whatsapp.com/send?text=@t%0D%0A@u%0D%0A@d",
        wordpress: "https://wordpress.com/press-this.php?u=@u&t=@t&s=@d&i=@m",
        xing: "https://www.xing.com/social/share/spi?op=share&url=@u&title=@t",
        yammer: "https://www.yammer.com/messages/new?login=true&status=@t%0D%0A@u%0D%0A@d",
      }
      if (urls[type]) {
        share_url = urls[type];
      }

      if (share_url) {
        share_url = share_url.replace('@u', encodeURIComponent(url))
            .replace('@t', encodeURIComponent(text))
            .replace('@d', '');
        window.open(share_url);
      }
    },
    getRechargeRebate() {
      getRechargeRebate_api().then(res => {
        if (res && res.data.code == 1) {
          this.bonuslist = res.data.data.invite_recharge_rebate_list
          this.invite_url = res.data.data.invite_url
          this.rec_code = res.data.data.rec_code
        }
      })
    },
    tabChange(val) {
      this.tab = val
      for (let i in this.tablist) {
        if (this.tablist[i].tabvalue == val) {
          this.Tabicon = this.tablist[i].icon
          break;
        }
      }
    },
  },
  mounted() {
    // this.getTeamPromotion();
    // this.getTeamReport()
    if (this.$route.query.tab) {
      this.onTab(this.$route.query.tab)
    }
    // this.getTeamPopularize()
    // this.getRechargeRebate()
  },
  created() {
    this.isPhone();
  }
};
</script>
<style scoped lang="less">
//.wrapper__inner {
 // background: #0A0605;
//}

.account_setting {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .account_a {
    display: flex;
    height: 44px;
    background: #191A1E;
    text-decoration: none;
    border-radius: 8px;

    .account_name {
      line-height: 3;
      margin-left: 5px;
      color: #fff;
    }

    .active02 {
      color: #84F100;
    }

    .account_img {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      margin-top: 5px;
    }
  }
}

.active01 {
  border: 1px solid #FF7D1E;
}

.ref-cabinet {
  padding-bottom: 20px;
}

.ref-cabinet__title {
  margin: 25px 0;
}

@media (max-width: 540px) {
  .ref-cabinet__title {
    margin: 0 0 25px;
  }
}

.ref-cabinet__title .icon-arrow {
  margin-left: 6px;
  color: #55657e;
}

.ref-card {
  max-width: 400px;
  width: 100%;
  border-radius: 24px;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  padding: 76px 25px 0;
  margin-bottom: 25px;
}

.ref-card.in-house {
  background-image: url(../../assets/images/in-house.png);
}

.ref-card.slots {
  background-image: url(../../assets/images/slots.jpg);
}

.ref-card.bfg {
  background-image: url(../../assets/images/bfg.png);
  background-position: 50%;
}

.ref-card__inner {
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 22px 32px 60px 32px;
}

.ref-card__header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 48px;
  line-height: 59px;
  letter-spacing: -0.02em;
  color: #fff;
}

.ref-card__header-tooltip {
  line-height: 16px;
}

.ref-card__header-icon {
  fill: #55657e;
  margin-bottom: 18px;
}

.ref-card__subheader {
  color: #fff;
}

.ref-card__subheader,
.ref-card__subheader-optional {
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.02em;
}

.ref-card__subheader-optional {
  color: #55657e;
}

.ref-card__info {
  letter-spacing: -0.02em;
  color: #93acd3;
}

.ref-card__for,
.ref-card__info {
  font-size: 11px;
  line-height: 16px;
}

.ref-card__for {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 100%;
  background: hsla(0, 0%, 100%, 0.08);
  border-radius: 16px 16px 0 0;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
}

@media (min-width: 1100px) {
  .ref-card {
    margin: 0;
    flex: 1 1 30%;
  }
}

.category-tabs {
  //width: max-content;
  //min-width: 100%;
  //background: linear-gradient(180deg, rgba(28, 37, 50, 0), #1c2532);
}

.category-tabs, .tab {
  border-radius: 14px;
  display: flex;
  align-items: center;
}

.tab {
  padding: 10px 20px;
  //flex: 1 1;
  //flex-direction: column;
  //justify-content: center;
  //text-decoration: none;
  //position: relative;
  //overflow: hidden;
  //-webkit-transform: translateZ(0);
  //-webkit-perspective: 1000;
  background: #282f5a;
  border-radius: 8px;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.active{
  border: 1px solid #FF7D1E;
  .tab__title{
    color: #84F100;
  }
}
.tab:before {
  //pointer-events: none;
  //content: "";
  //position: absolute;
  //top: 0;
  //bottom: 0;
  //left: 0;
  //right: 0;
  //opacity: 0;
  //z-index: 0;
  //transition: opacity .1s ease-in-out;
}

.tab.active:before {
  //background: linear-gradient(180deg, rgba(34, 131, 246, 0), rgba(34, 131, 246, 0) 20%, rgba(34, 131, 246, .15) 60%, rgba(34, 131, 246, .4));
  //opacity: 1;
}

.tab__icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  //margin-bottom: 8px;
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
  font-size: 14px;
  text-align: center;
  margin-left: 16px;
}

@media (max-width: 768px) {
  .tab__title {
    font-size: 14px;
  }

  .referrals__block.column {
    align-items: flex-start;
  }
}

.tab__subtitle, .tab__title {
  font-weight: 600;
  white-space: nowrap;
  z-index: 1;
}

.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}

.overview__info {
  margin-bottom: 0;
}

.overview__read-more {
  letter-spacing: -0.02em;
  color: #3a07f2;
  display: flex;
  align-items: center;
  width: 100%;
  outline: none;
  padding-top: 12px;
  padding-bottom: 26px;
}

.overview__get-btn,
.overview__read-more {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  border: 0;
}

.overview__get-btn {
  padding: 10px 16px;
  background: #3a07f2;
  border-radius: 8px;
  color: #fff;
  text-decoration: none;
  display: inline-block;
}

.overview__partnership {
  width: 100%;
  max-width: 400px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 25px 25px 220px;
  position: relative;
  overflow: hidden;
  background: #161f2c url(../../assets/images/partnership.png) 0 100% no-repeat;
}

.overview__partnership-bott,
.overview__partnership-mid,
.overview__partnership-top {
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: #fff;
  margin-top: 0;
}

.overview__partnership-top {
  margin-bottom: 0;
}

.overview__partnership-mid {
  margin-bottom: 24px;
}

.overview__partnership-bott {
  margin-bottom: 0;
}

.chevron {
  fill: #55657e;
  margin-left: 15px;
  transition: transform 0.15s linear;
}

.chevron--rotated {
  fill: #fff;
  transform: rotate(180deg);
}

@media (max-width: 1199.98px) {
  .overview__get-btn {
    margin-bottom: 16px;
  }
}

@media (min-width: 1100px) {
  .overview {
    flex-direction: row;
    flex-wrap: wrap;
    grid-gap: 25px;
    gap: 25px;
  }

  .overview__partnership {
    max-width: unset;
    background-size: 240px;
    padding-left: 240px;
    padding-bottom: 25px;
  }

  .overview__partnership-bott,
  .overview__partnership-mid,
  .overview__partnership-top {
    margin-top: 0;
  }
}

.testimonials {
  width: 100%;
  margin-top: 48px;
}

.testimonials__list {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  grid-template-rows: 309px 309px;
}

@media (max-width: 1024px) {
  .testimonials__list {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 16px;
    grid-template-rows: auto;
  }
}

.testimonials__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  position: relative;
  width: 100%;
  max-width: 309px;
  border-radius: 16px;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .testimonials__item {
    /* width: 400px; */
    max-width: 400px;
    height: auto;
  }
}

.testimonials__item-header {
  width: 100%;
  height: 125px;
  background: #161f2c;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.testimonials__wrap-logo:hover :first-child {
  margin: 16px auto 4px;
}

.testimonials__item-logo {
  margin: 20px auto 0;
  width: 235px;
  height: 46px;
  transition: margin 0.15s linear;
}

.testimonials__item-link {
  color: #93acd3;
}

.testimonials__item-link .a__link {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #3a07f2;
  margin: 0 2px;
  cursor: pointer;
  text-decoration: none;
}

.testimonials__item-description {
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #93acd3;
  margin-top: 2px;
}

.testimonials__item-footer {
  width: 100%;
  flex: 1 1;
  background: #202a39;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 21px 16px;
}

@media (max-width: 1024px) {
  .testimonials__item-footer {
    height: auto;
  }
}

.testimonials__item-footer .button {
  margin-bottom: -16px;
}

.testimonials__item-footer .footer__quotes {
  height: 24px;
  width: 24px;
  position: absolute;
  margin-top: -12px;
  top: 0;
}

.testimonials__item-footer .footer__text {
  font-weight: 500;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  line-clamp: 6;
  -webkit-box-orient: vertical;
}

.testimonials__item-footer .footer__text p:last-child {
  margin-bottom: 0;
}

.overview .referrals {
  position: relative;
  color: #fff;
  max-width: 400px;
  width: 100%;
  border-radius: 24px;
  background: radial-gradient(292.92% 100% at 3.96%, at 100%, rgba(34, 131, 246, .32) 0, rgba(22, 31, 44, 0) 69.37%);
  background: radial-gradient(292.92% 100% at 3.96% 100%, rgba(34, 131, 246, .32) 0, rgba(22, 31, 44, 0) 69.37%);
  padding: 0 25px 25px;
  margin-bottom: 25px;
}

@media (min-width: 1100px) {
  .overview .referrals {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-bottom: 0;
  }
}

.overview .referrals__bg {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (max-width: 576px) {
  .referrals__bg {
    width: 140px;
    display: none;
  }
}

.referrals__block {
  display: flex;
}

.referrals__block:not(:last-of-type) {
  margin-bottom: 25px;
}

.referrals__block.top {
  justify-content: space-between;
}

@media (min-width: 1100px) {
  .referrals__block.top {
    justify-content: flex-start;
    flex-direction: column;
    flex: 0 1 140px;
  }
}

@media screen and (min-width: 1200px) {
  .referrals__block.top {
    flex: 0 1 190px;
  }
}

.referrals__block:not(:last-of-type) {
  margin-bottom: 25px;
}

@media (min-width: 1100px) {
  .referrals__block:not(:last-of-type):not(.stats) {
    margin-bottom: 0;
  }
}

.referrals__top-text-wrap {
  display: flex;
  align-items: center;
  font-weight: 600;
  letter-spacing: -.02em;
}

@media (min-width: 1100px) {
  .referrals__top-text-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
}

.referrals__top-text-title {
  font-size: 12px;
  line-height: 20px;
  color: #55657e;
  margin-top: 0;
  margin-bottom: 0;
  min-width: 50px;
  margin-right: 5px;
}

@media (min-width: 1100px) {
  .referrals__top-text-title {
    margin-bottom: 0;
  }
}

.referrals__top-text {
  font-size: 14px;
}

.stats {
  background: #212d3f;
  border-radius: 24px;
  margin: 0 -25px 25px;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -.02em;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 25px;
}

@media (min-width: 1100px) {
  .stats {
    margin: -30px -30px 25px 0;
    flex: 1 1 calc(100% - 190px);
    flex-direction: row;
    border-radius: 0 24px 24px 24px;
    padding: 30px;
  }
}

.stats__block {
  display: flex;
  flex-wrap: wrap;
}

.stats__block:not(:last-of-type) {
  margin-bottom: 16px;
}

@media (min-width: 1100px) {
  .stats__block {
    flex: 1;
  }
}

@media (min-width: 1100px) {
  .stats__block:not(:last-of-type) {
    margin: 0;
  }
}

@media (min-width: 1100px) {
  .stats__block:not(:last-of-type) {
    margin: 0;
  }
}

.stats__title {
  flex: 1 1 100%;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -.02em;
  color: #93acd3;
  margin-top: 0;
  margin-bottom: 8px;
}

@media (min-width: 1100px) {
  .stats__title {
    margin-bottom: 12px;
  }
}

.stats__img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.stats__coin-wrap {
  display: flex;
  align-items: center;
}

.currency {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.stats__currency {
  margin: 0 8px 0 0;
}

.currency__icon {
  flex-shrink: 0;
  margin-right: 0.5em;
}

.currency__balances--balance, .currency__balances-wrap {
  display: flex;
  align-items: center;
}

.currency__balances {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.currency__balances--balance {
  line-height: 18px;
}

.font-digits {
  font-family: Numbers, Montserrat;
  font-weight: 600;
  letter-spacing: -.5px;
  white-space: nowrap;
}

.currency span span {
  line-height: inherit;
  font-size: inherit;
}

.stats__currency .balance, .stats__currency .font-digits {
  font-size: 18px;
}

.currency span span {
  line-height: inherit;
  font-size: inherit;
}

.referrals__block.column {
  flex-direction: column;
}

@media (min-width: 1100px) {
  .referrals__block.link {
    margin-left: 220px;
    margin-right: 30px;
    flex: 1;
  }
}

.referrals__heading {
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -.02em;
  margin: 0 0 8px;
}

@media (min-width: 1100px) {
  .referrals__heading {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.referrals__heading-default {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #2a3546;
  background: #1bb83d;
  border-radius: 8px;
  padding: 5px 8px;
  margin-left: 10px;
  display: inline-block;
}

.input {
  width: 100%;
}

.input__inner {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid #2a3546;
  transition: color .1s ease-in-out, border-color .1s ease-in-out;
}

.input_md .input__inner {
  height: 44px;
  border-radius: 10px;
  padding: 0 14px;
}

.input__tag {
  width: 0;
  flex: 1 1;
  display: block;
  font-weight: 600;
  color: #fff;
  outline: none;
}

.input__inner_readonly .input__tag {
  cursor: default;
}

.input_md .input__tag {
  line-height: 20px;
  font-size: 14px;
  padding: 0;
  border: none;
  height: 20px;
  background: none;
}

.input__btn-clear, .input__btn-successful {
  outline: none;
}

.input_md .input__inner button {
  border-radius: 6px;
  margin-left: 8px;
  margin-right: -7px;
}

.input__btn-clear svg, .input__btn-successful svg {
  fill: #55657e;
  transition: fill .1s ease-in-out;
}

.input_md .input__btn-clear svg, .input_md .input__btn-successful svg {
  width: 20px;
  height: 20px;
}

.input__btn-clear, .input__btn-successful {
  outline: none;
}

.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  text-decoration: none;
  align-items: center;
  position: relative;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  outline: none;
  display: inline-block;
  transition: color .1s ease-in-out, background-color .1s ease-in-out, border-color .1s ease-in-out;
}

.button_blue.button {
  background-color: #3a07f2;
  color: #fff;
  border-color: transparent;
}

.button_sm.button {
  border-radius: 8px;
  font-size: 11px;
}

.button_sm.button_only-icon {
  padding: 4px;
}

.input_md .input__inner button {
  border-radius: 6px;
  margin-left: 8px;
  margin-right: -7px;
}

.button__inner {
  width: 100%;
}

.button__icon, .button__inner {
  display: flex;
  align-items: center;
}

.button_center .button__inner, .button_fullwidth {
  justify-content: center;
}

.button_blue .button__icon {
  display: block;
}

.button_sm .button__icon {
  width: 16px;
  height: 16px;
}

.button__icon svg {
  width: 100%;
  height: 100%;
  display: block;
  transition: fill .1s ease-in-out;
}

.button_blue .button__icon svg {
  fill: #fff;
}

.referrals__block.half {
  margin-left: 50%;
}

.referrals__block.share {
  grid-gap: 2px;
  gap: 2px;
}

@media (min-width: 1100px) {
  .referrals__block.half {
    flex-basis: 20%;
    margin-left: 0;
  }
}

@media (max-width: 576px) {
  .referrals__block.half {
    margin-left: 0;
  }
}

.social-icons2 {
  display: inline-flex;
}

.referrals__socials {
  display: flex;
  height: 40px;
}

.social-icons__item {
  margin-right: 8px;
}

.social-icons__button {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #fff;
}

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

.my-balance {
  display: flex;
  flex-wrap: wrap;
  /* justify-content:center */
}

.my-balance__table {
  flex: 1 1 100%;
  margin-top: 25px;
  margin-bottom: 25px;
  position: relative;
  min-height: 200px
}

.my-balance__t-head {
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -.02em;
  color: #55657e;
  margin-bottom: 15px
}

.my-balance__t-head, .my-balance__tr {
  display: flex;
  align-items: center;
  justify-content: space-between
}

.my-balance__tr {
  border-top: 1px solid #1c2532;
  height: 56px
}

.my-balance__td, .my-balance__th {
  display: flex;
  align-items: center;
  min-width: 150px
}

.my-balance__t-body {
  /* max-height:450px */
}

.my-balance__icon {
  width: 20px;
  height: 20px;
  margin-right: 8px
}

.my-balance__btn {
  cursor: pointer;
  outline: 0;
  border: 0;
  height: 50px;
  background: #3a07f2;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -.02em;
  color: #fff;
  padding: 14px 16px
}

.my-balance__btn:disabled {
  cursor: not-allowed;
  opacity: .7
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

.chevron {
  fill: #55657e;
  transition: transform 0.15s linear;
}

.chevron--rotated {
  fill: #fff;
  transform: rotate(180deg);
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

.calendar-icon, .chevron-icon {
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

.calendar-icon, .chevron-icon {
  fill: #55657e;
}

table {
  color: #ffffff;
}

.bonusWork_box {
  background: linear-gradient(-90deg, rgba(34, 131, 246, .32) 0, rgba(22, 31, 44, .8) 69.37%);
  border-radius: 10px;
  display: flex;
  overflow: hidden;
}

.bonusWork_box_right {
  margin-left: auto;
}

.bonusWork_box_right .bonusWork_box_icon {
  max-width: 460px;
}

.bonusWork_box_left {
  padding: 35px 0 0 30px;
  width: 45%;
}

.text-yellow {
  color: #ffb636 !important;
}

.referrals-cells {
  width: 100%;
}

p {
  font-size: 14px;
}

.bonusWork_invite_panel {
  margin-top: 20px;
}

.referral_apostas_box {
  background: linear-gradient(-90deg, rgba(34, 131, 246, .32) 0, rgba(22, 31, 44, .8) 69.37%);
  border-radius: 10px;
  overflow: hidden;
}

.referral_apostas_top_left {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: Montserrat-SemiBold;
  /* padding: 30px 0 0 35px; */
  width: 100%;
}

@media (min-width: 768px) {
  .referral_apostas_top_left {
    margin: 20px;
    text-align: center;
  }
}

.referral_apostas_bgc {
  background-color: rgba(35, 52, 77, .5);
  border-radius: 10px;
  line-height: 1.76;
  min-height: 260px;
  padding: 20px;
}

.referral_overview_desc {
  margin-top: 10px;
  color: #7c96be;
}

.referral_overview_desc .cont {
  padding-left: 24px;
}

.referral_apostas_desc {
  font-size: 16px;
  margin-bottom: 10px;
}

.referral_example * {
  font-size: 14px;
}

.referral_example_title_desc {
  line-height: 1.8;
  padding-left: 15px;
  margin-top: 5px;
}

.referral_apostas_top {
  display: flex;
}

.referral_apostas_top_right {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: 49%;
}

.referral_apostas_bottom {
  margin: 20px;
  background-color: rgba(0, 29, 71, .3);
  border-radius: 15px 15px 15px 15px;
  overflow: hidden;
}

.referral_apostas_mobile {
  display: none;
}

.bonusWork_box_left .bonusWork_box_left_title {
  font-size: 24px;
  margin-bottom: 10px;
}

.bonusWork_box_left .bonusWork_box_test {
  line-height: 1.8;
}

.overview__info-wrap {
  margin-top: 10px;
}

.bonusWork_invite_panel {
  border-radius: 10px;
  padding: 25px 30px;
  background: linear-gradient(-0deg, rgba(34, 131, 246, .32) 0, rgba(22, 31, 44, .8) 69.37%);
}

.bonusWork_table_title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.bonusWork_table_ul .table_li {
  cursor: pointer;
  display: flex;
  width: 100%;
  background: rgb(255 255 255 / 10%);
  color: #93acd3;
  border-radius: 8px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 8px;
}

.table_li_hd {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  display: flex;
}

.bonusWork_table_ul .table_text {
  flex: 1 1;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  min-height: 32px;
  display: flex;
  line-height: 1.1;
  align-items: center;
  justify-content: center;
}

.table_li_hd {
  margin-bottom: 10px;
  line-height: 12px;
}

.table_li_hd .table_text {
  color: #ffffff;
}

.table_li_show:nth-last-of-type(1) {
  background: #ffeb68 !important;
  color: #0d131c;
}

.table_li_show:nth-last-of-type(2) {
  background: #ffeb68 !important;
  color: #0d131c;
}

.table_li_show:nth-last-of-type(3) {
  background: #fff4ac !important;
  color: #0d131c;
}

@media (max-width: 765px) {
  .bonusWork_invite_panel {
    padding: 15px;
  }

  .bonusWork_box {
    flex-direction: column;
  }

  .bonusWork_box_left {
    width: 100%;
    padding: 20px 15px;
  }

  .referral_apostas_bottom {
    margin: 15px;
  }

  .referral_apostas_mobile {
    display: block;
  }

  .referral_apostas_top_right {
    display: none;
  }

  .referral_apostas_top_left {
    padding: 15px;
    width: 100%;
  }
}

.referral_apostas_image * {
  min-width: 100%;
  background-color: #fff;
}

@media (max-width: 540px) {
  .referrals__block.top {
    margin-top: -30px;
  }

  .stats.referrals__block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .stats__block {
    margin-bottom: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stats__title {
    text-align: center;
  }

  .stats.referrals__block {
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
  }

  .category-tabs {
    //background: #161f2c;
    //border-radius: 14px;
    //padding: 8px;
  }

  .tab.active {
    //background-color: #3a07f2;
    color: #fff;
  }

  .tab__icon {
    width: 30px;
    height: 30px;
    margin-bottom: 2px;
  }

  .category-tabs .tab {
    border-radius: 7px;
    margin-right: 10px;
    padding: 10px 15px;
    overflow: unset;
  }
}

@media (max-width: 768px) {
  .social-icons__button {
    width: 50px !important;
    height: 50px !important;
  }

  .referrals__socials {
    height: auto
  }

  .social-icons__icon {
    width: 25px;
    height: 25px
  }

  .tab__title {
    font-size: 13px;
  }

  .tab__icon {
    width: 30px;
    height: 30px;
  }

  .ref-cabinet__title {
    margin-bottom: 4px;
  }
}

.more {
  text-align: center;
  padding: 20px;
  color: #93acd3;
}

.more span {
  cursor: pointer;
}

.el-icon-d-arrow-right {
  transform: rotate(90deg);
}

.top-btn-wapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.top-btn-item {
  background-color: #1c2532;
  padding: 10px 20px;
  margin-right: 30px;
  border-radius: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .top-btn-wapper {
    justify-content: center;
    flex-wrap: wrap;
  }

  .top-btn-item {
    flex: 1;
  }
}

.top-btn-item:nth-child(2) {
  @media (max-width: 768px) {
    margin-right: 0;
  }
}

.top-btn-item span {
  color: #5aa1ff;
}

.select-level {
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
