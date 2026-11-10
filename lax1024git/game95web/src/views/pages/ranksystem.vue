<template>
  <div class="" :class="
      `${openedleft ? 'opened-left-panel' : ''}${
        openedcontests ? ' opened-contests-panel' : ''
      }`
    "
  >
    <!--     <Head
          :flagShow="openedleft"
          :isMobile="isMobileFlag"
          @menuClick="menuClick"
        /> -->
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="app-vip-head">
          <div class="app-vip-head-top">
            <img :src="vipImg" class="app-vip-head-img">
            <div class="app-vip-head-right">
              <div class="level-name">{{ $t('欢迎您！尊贵的') }}<span class="col84F100">{{ userInfo?.level_name }}</span>{{
                  $t('用户')
                }}{{ userInfo?.real_name }}
              </div>
              <div class="flex">
                <div>{{ $t('当前等级') }}: <span class="col84F100">{{ userInfo?.level_name }}</span></div>
                <div class="ml-5">{{ $t('下一等级') }}: <span class="col84F100">{{ userInfo?.next_level_name }}</span></div>
              </div>
              <!--              <div class="next_level_name">{{userInfo.next_level_name}}</div>-->
              <div class="app-vip-head-progress">
                <div class="app-vip-head-progress-left">{{ $t('升级') }} ：{{userInfo?.next_level_rate + '.00'}}/{{userInfo?.next_level_recharge}}</div>
                <el-progress :text-inside="true" :stroke-width="16"
                             :percentage="userInfo?.next_level_rate" color="#84F100" :format="formatApp"
                             define-back-color="#8A8A89" text-color="#FFFFFF"></el-progress>
              </div>
            </div>
          </div>
          <div class="app-vip-head-bottom">
            <div>{{ $t('等级彩金') }}:{{ userLevel && userLevel.level_gold }}</div>
            <div>{{ $t('累计充值') }}:{{ userInfo?.recharge }}</div>
            <div>{{ $t('游戏流水') }}:{{ userInfo?.water }}</div>
          </div>
        </div>
        <div class="container">
          <div class="rank_about__wrapper">
            <div class="vip-head">
              <!--              <img :src="'@/assets/images/ranksystem/vip/'+(userInfo?.level_name||'VIP0')+'.png'" class="vip-head-img">-->
              <img :src="vipImg" class="vip-head-img">
              <div class="vip-head-right">
                <h1>{{ $t('欢迎您！尊贵的') }}<span
                    class="col84F100">{{ userInfo?.level_name }}</span>{{ $t('用户') }}{{ userInfo?.real_name }}</h1>
                <div class="flex">
                  <div>{{ $t('当前等级') }}: <span class="col84F100">{{ userInfo?.level_name }}</span></div>
                  <div class="ml-5">{{ $t('下一等级') }}: <span class="col84F100">{{ userInfo?.next_level_name }}</span></div>
                </div>
                <div class="next_level_name">
                  {{userInfo?.next_level_rate + '.00'}}/{{userInfo?.next_level_recharge}}
                </div>
                <div class="vip-head-progress">
                  <div class="vip-head-progress-left">{{ $t('升级') }}:</div>
                  <el-progress :text-inside="false" :stroke-width="16"
                               :percentage="userInfo?.next_level_rate" color="#84F100" :format="format"
                               define-back-color="#8A8A89" text-color="#FFFFFF"></el-progress>
                </div>
                <div class="vip-head-bottom">
                  <div>{{ $t('等级彩金') }}:{{ userLevel && userLevel.level_gold }}</div>
                  <div>{{ $t('累计充值') }}:{{ userInfo?.recharge }}</div>
                  <div>{{ $t('游戏流水') }}:{{ userInfo?.water }}</div>
                </div>
              </div>
            </div>
            <div class="vip-title">
              {{ userInfo?.level_name }}{{ $t('福利') }}
            </div>
            <div class="graded-welfare">
              <div class="graded-welfare-item">
                <img src="@/assets/images/ranksystem/vip22.png">
                <div class="graded-welfare-item-right">
                  <div class="graded-welfare-name">
                    {{ $t('周礼金') }}:
                    <div>
                      <!--                      <img :src="require('@/assets/images/'+$store.state.currencyIcon)"-->
                      <!--                           style="width: 14px; height: 14px;"/>-->
                      {{
                        userLevel.week_reward_amount == 0 ? '--' : numFormat(userLevel.week_reward_amount, true, 0) || "--"
                      }}
                    </div>
                  </div>
                  <el-button v-if="$store.state.userInfo&&userLevel&&$store.state.userInfo.level_id==userLevel.id"
                             :disabled="$store.state.userInfo&&$store.state.userInfo.level_id!=userLevel.id||userLevel.week_reward_amount==0"
                             @click="receiveLevelReward(userLevel,1)"
                             :class="['button_blue cash-btn',userLevel.week_is_receive_vip_reward==1?'cash-btn2':'']"
                             :loading="userLevel.loading1">
                    <span v-if="userLevel.week_is_receive_vip_reward==0">{{ $t("领取") }}</span>
                    <span v-else>{{
                        formattedTime(userLevel.week_last_receive_time, '周', userLevel, 'week_is_receive_vip_reward')
                      }}</span>
                  </el-button>
                </div>
              </div>
              <div class="graded-welfare-item">
                <img src="@/assets/images/ranksystem/vip22.png">
                <div class="graded-welfare-item-right">
                  <div class="graded-welfare-name">
                    {{ $t('月礼金') }}:
                    <div>
                      <!--                      <img :src="require('@/assets/images/'+$store.state.currencyIcon)"-->
                      <!--                           style="width: 14px; height: 14px;"/>-->
                      {{
                        userLevel.month_reward_amount == 0 ? '--' : numFormat(userLevel.month_reward_amount, true, 0) || "--"
                      }}
                    </div>
                  </div>
                  <el-button v-if="$store.state.userInfo&&userLevel&&$store.state.userInfo.level_id==userLevel.id"
                             :disabled="$store.state.userInfo&&$store.state.userInfo.level_id!=userLevel.id||userLevel.month_reward_amount==0"
                             @click="receiveLevelReward(userLevel,2)"
                             :class="['button_blue cash-btn',userLevel.month_is_receive_vip_reward==1?'cash-btn2':'']"
                             :loading="userLevel.loading1">
                    <span v-if="userLevel.month_is_receive_vip_reward==0">{{ $t("领取") }}</span>
                    <span v-else>{{
                        formattedTime(userLevel.month_last_receive_time, '月', userLevel, 'month_is_receive_vip_reward')
                      }}</span>
                  </el-button>
                </div>
              </div>
            </div>

            <div class="vip-title">
              {{ $t('VIP制度带来的好处') }}
            </div>
            <div class="vip-benefits">
              <div class="vip-benefits-item">
                <div><span>1</span>{{ $t('等级和奖励') }}</div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('你玩的越多，收获越多你玩的越多，收获越多') }}</p>
              </div>
              <div class="vip-benefits-item">
                <div><span>2</span>{{ $t('增加返现') }}</div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('最高可获得8888奖金返回') }}</p>
              </div>
              <div class="vip-benefits-item">
                <div><span>3</span>{{ $t('独家促销活动') }}</div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('达到更高的等级解锁独特的利益') }}</p>
              </div>
              <div class="vip-benefits-item">
                <div><span>4</span>{{ $t('VIP club') }}</div>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                    $t('作为VIP俱乐部的一元，获得专属奖励作为VIP俱乐部的一元，获得专属奖励')
                  }}</p>
              </div>
              <img src="@/assets/images/ranksystem/vip24.png">
            </div>
            <div class="vip-title">{{ $t('常见问题') }}</div>
            <el-collapse class='pl-2 pr-2'>
              <el-collapse-item :title="'1.'+$t('什么是升级奖励')" name="1">
                <div>{{ $t('升级奖励是一种VIP福利随着您的等级越高奖励越丰富') }}</div>
              </el-collapse-item>
            </el-collapse>
            <!--            <div class="lp1">-->
            <!--              <div class="lp3__signs">-->
            <!--                <img src="../../assets/images/signs.5b80dd5.png" alt/>-->
            <!--              </div>-->
            <!--              <div class="lp-heading lp3__heading">-->
            <!--                <h3 class="lp-title lp3__title">-->
            <!--                  {{ $t("成为VIP,达到最高水平") }}-->

            <!--                </h3>-->
            <!--                <p class="lp-toptext">{{ $t("享受最佳游戏体验和优质服务") }}</p>-->
            <!--              </div>-->
            <!--              <div class="rank-slider">-->
            <!--                <swiper-->
            <!--                    class="swiper gallery-thumbs"-->
            <!--                    :options="swiperOptionThumbs"-->
            <!--                    ref="swiperThumbs"-->
            <!--                >-->
            <!--                  <swiper-slide-->
            <!--                      v-for="(item, index) in userVipData"-->
            <!--                      :key="`userVipData${index}`"-->
            <!--                  >-->
            <!--                    <div class="rank-slider__slide glide__slide&#45;&#45;active">-->
            <!--                      <img-->
            <!--                          loading="lazy"-->
            <!--                          src="../../assets/images/rank-bg.png"-->
            <!--                          alt-->
            <!--                          class="rank-slider__bg"-->
            <!--                      />-->
            <!--                      <img-->
            <!--                          loading="lazy"-->
            <!--                          src="../../assets/images/rank-bg-ac.png"-->
            <!--                          alt-->
            <!--                          class="rank-slider__bg rank-slider__bg-ac"-->
            <!--                      />-->
            <!--                      <div class="rank-slider__slider-body">-->
            <!--                        <div class="rank-slider__image">-->
            <!--                          <img :src="item.image || item.levelImg"/>-->
            <!--                        </div>-->
            <!--                        <h4 class="rank-slider__title">-->
            <!--                          {{ item.level_name }}-->
            <!--                        </h4>-->
            <!--                        <div class="rank-slider__details">-->
            <!--                          <div class="rank-slider__detail">-->
            <!--                            <p class="rank-slider__label">{{ $t("等级彩金") }}</p>-->
            <!--                            <p class="rank-slider__cashback">-->
            <!--                              <img :src="require('@/assets/images/'+$store.state.currencyIcon)"-->
            <!--                                   style="width: 14px; height: 14px;"/>-->
            <!--                              {{ numFormat(item.level_gold, true, 0) }}-->
            <!--                            </p>-->
            <!--                          </div>-->
            <!--                          <template v-if="item.vip_condition.length > 0">-->
            <!--                            <div-->
            <!--                                class="rank-slider__detail"-->
            <!--                                v-for="(im, it) in item.vip_condition"-->
            <!--                                :key="`vip_condition${it}`"-->
            <!--                            >-->
            <!--                              <p class="rank-slider__label">{{ $t(im.key) }}</p>-->
            <!--                              <p class="rank-slider__cashback">-->
            <!--                                {{ im.value }}-->
            <!--                              </p>-->
            <!--                            </div>-->
            <!--                          </template>-->
            <!--                          &lt;!&ndash; <div class="rank-slider__detail" :style="{opacity:item.day_limit>0?'1':'0'}">-->
            <!--                            <p class="rank-slider__label">{{ $t("Daily withdrawals") }}</p>-->
            <!--                            <p class="rank-slider__cashback">-->
            <!--                              {{ item.day_limit }}-->
            <!--                            </p>-->
            <!--                          </div> &ndash;&gt;-->
            <!--                          <div class="rank-slider__detail">-->
            <!--                            <p class="rank-slider__label">{{ $t("最低提现金额为") }}</p>-->
            <!--                            <p class="rank-slider__cashback">-->
            <!--                              <img :src="require('@/assets/images/'+$store.state.currencyIcon)"-->
            <!--                                   style="width: 14px; height: 14px;"/>-->
            <!--                              {{ numFormat(item.min_amount, true, 0) }}-->
            <!--                            </p>-->
            <!--                          </div>-->
            <!--                          <div class="rank-slider__detail">-->
            <!--                            <p class="rank-slider__label">{{ $t("最高提现金额为") }}</p>-->
            <!--                            <p class="rank-slider__cashback">-->
            <!--                              <img :src="require('@/assets/images/'+$store.state.currencyIcon)"-->
            <!--                                   style="width: 14px; height: 14px;"/>-->
            <!--                              {{ numFormat(item.max_amount, true, 0) }}-->
            <!--                            </p>-->
            <!--                          </div>-->
            <!--                        </div>-->
            <!--                        <div-->
            <!--                            :class="['cash-title',$store.state.userInfo&&$store.state.userInfo.level_id==item.id?'cash-title-ac':'']">-->
            <!--                          <span>{{ $t("周礼金") }}：</span>-->

            <!--                          <span><img :src="require('@/assets/images/'+$store.state.currencyIcon)"-->
            <!--                                     style="width: 14px; height: 14px;"/> {{-->
            <!--                              item.week_reward_amount == 0 ? '&#45;&#45;' : numFormat(item.week_reward_amount, true, 0) || "&#45;&#45;"-->
            <!--                            }}</span>-->
            <!--                        </div>-->
            <!--                        <el-button v-if="$store.state.userInfo&&$store.state.userInfo.level_id==item.id"-->
            <!--                                   :disabled="$store.state.userInfo&&$store.state.userInfo.level_id!=item.id||item.week_reward_amount==0"-->
            <!--                                   @click="receiveLevelReward(item,1)"-->
            <!--                                   :class="['button_blue cash-btn',item.week_is_receive_vip_reward==1?'cash-btn2':'']"-->
            <!--                                   :loading="item.loading1">-->
            <!--                          <img src="@/assets/images/vip-liwu.png" v-if="item.week_is_receive_vip_reward==0"-->
            <!--                               :class="['btn-icon',item.week_is_receive_vip_reward==0&&$store.state.userInfo&&$store.state.userInfo.level_id==item.id&&item.week_reward_amount!=0?'btn-icon-an':'']">-->
            <!--                          <img src="@/assets/images/vip-liwu2.png" v-else class="btn-icon2">-->
            <!--                          <span v-if="item.week_is_receive_vip_reward==0">{{ $t("领取") }}</span>-->
            <!--                          <span v-else>{{-->
            <!--                              formattedTime(item.week_last_receive_time, '周', item, 'week_is_receive_vip_reward')-->
            <!--                            }}</span>-->
            <!--                        </el-button>-->
            <!--                        <div-->
            <!--                            :class="['cash-title',$store.state.userInfo&&$store.state.userInfo.level_id==item.id?'cash-title-ac':'']">-->
            <!--                          <span>{{ $t("月礼金") }}：</span>-->
            <!--                          <span><img :src="require('@/assets/images/'+$store.state.currencyIcon)"-->
            <!--                                     style="width: 14px; height: 14px;"/>  {{-->
            <!--                              item.month_reward_amount == 0 ? '&#45;&#45;' : numFormat(item.month_reward_amount, true, 0) || "&#45;&#45;"-->
            <!--                            }}</span>-->
            <!--                        </div>-->
            <!--                        <el-button v-if="$store.state.userInfo&&$store.state.userInfo.level_id==item.id"-->
            <!--                                   :disabled="$store.state.userInfo&&$store.state.userInfo.level_id!=item.id||item.month_reward_amount==0"-->
            <!--                                   @click="receiveLevelReward(item,2)"-->
            <!--                                   :class="['button_blue cash-btn',item.month_is_receive_vip_reward==1?'cash-btn2':'']"-->
            <!--                                   :loading="item.loading2">-->
            <!--                          <img src="@/assets/images/vip-liwu.png" v-if="item.month_is_receive_vip_reward==0"-->
            <!--                               :class="['btn-icon',item.month_is_receive_vip_reward==0&&$store.state.userInfo&&$store.state.userInfo.level_id==item.id&&item.month_reward_amount!=0?'btn-icon-an':'']">-->
            <!--                          <img src="@/assets/images/vip-liwu2.png" v-else class="btn-icon2">-->
            <!--                          <span v-if="item.month_is_receive_vip_reward==0">{{ $t("领取") }}</span>-->
            <!--                          <span v-else>{{-->
            <!--                              formattedTime(item.month_last_receive_time, '月', item, 'month_is_receive_vip_reward')-->
            <!--                            }}</span>-->
            <!--                        </el-button>-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                  </swiper-slide>-->
            <!--                </swiper>-->
            <!--                <div-->
            <!--                    class="rank-slider__navigator"-->
            <!--                    v-show="userVipData.length > 0"-->
            <!--                >-->
            <!--                  <button-->
            <!--                      type="button"-->
            <!--                      class="button rank-slider__arrow rank-slider__left-arrow button_md button_grey1 button_center button_only-icon"-->
            <!--                      data-glide-dir="<"-->
            <!--                  >-->
            <!--                    <span class="button__inner">-->
            <!--                      <span class="button__icon">-->
            <!--                        <svgIcon icon="icon-arrow-left-small"></svgIcon>-->
            <!--                      </span>-->
            <!--                    </span>-->
            <!--                  </button>-->
            <!--                  <button-->
            <!--                      type="button"-->
            <!--                      class="button rank-slider__arrow rank-slider__right-arrow button_md button_grey1 button_center button_only-icon"-->
            <!--                      data-glide-dir=">"-->
            <!--                  >-->
            <!--                    <span class="button__inner">-->
            <!--                      <span class="button__icon">-->
            <!--                        <svgIcon icon="icon-arrow-right-small"></svgIcon>-->
            <!--                      </span>-->
            <!--                    </span>-->
            <!--                  </button>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="lp3">-->
            <!--              <div class="lp1__box">-->
            <!--                <h2 class="lp1__title">-->
            <!--                  {{ $t("A LOT OF BENEFITS WITH RANK SYSTEM") }}-->
            <!--                </h2>-->
            <!--                <div class="lp1__img">-->
            <!--                  <img-->
            <!--                      src="../../assets/images/racoon-top.png"-->
            <!--                      alt-->
            <!--                  />-->
            <!--                </div>-->
            <!--                <ul class="lp1__list">-->
            <!--                  <li class="lp1__list-item">-->
            <!--                    <div>-->
            <!--                      <div class="lp1__list-img lp1__list-img_1">-->
            <!--                        <img src="../../assets/images/VIP1.png" alt/>-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                    <div>-->
            <!--                      <p class="lp1__list-heading">-->
            <!--                        {{ $t("Levels and Rewards") }}-->
            <!--                      </p>-->
            <!--                      <p class="lp1__list-text">-->
            <!--                        {{ $t("The more you play - the more you gain") }}-->
            <!--                      </p>-->
            <!--                    </div>-->
            <!--                  </li>-->
            <!--                  <li class="lp1__list-item">-->
            <!--                    <div>-->
            <!--                      <div class="lp1__list-img lp1__list-img_2">-->
            <!--                        <img src="../../assets/images/cahsback.png" alt/>-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                    <div>-->
            <!--                      <p class="lp1__list-heading">-->
            <!--                        {{ $t("Increased Cashback") }}-->
            <!--                      </p>-->
            <!--                      <p class="lp1__list-text">-->
            <!--                        {{ $t("Receive up to 1.3% of your coins back") }}-->
            <!--                      </p>-->
            <!--                    </div>-->
            <!--                  </li>-->
            <!--                  <li class="lp1__list-item">-->
            <!--                    <div>-->
            <!--                      <div class="lp1__list-img lp1__list-img_3">-->
            <!--                        <img src="../../assets/images/3.png" alt/>-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                    <div>-->
            <!--                      <p class="lp1__list-heading">-->
            <!--                        {{ $t("Exclusive Promotions") }}-->
            <!--                      </p>-->
            <!--                      <p class="lp1__list-text">-->
            <!--                        {{ $t("Reach higher rank to unlock unique benefits") }}-->
            <!--                      </p>-->
            <!--                    </div>-->
            <!--                  </li>-->
            <!--                  <li class="lp1__list-item">-->
            <!--                    <div>-->
            <!--                      <div class="lp1__list-img lp1__list-img_3">-->
            <!--                        <img src="../../assets/images/crown.png" alt/>-->
            <!--                      </div>-->
            <!--                    </div>-->
            <!--                    <div>-->
            <!--                      <p class="lp1__list-heading">{{ $t("VIP CLUB") }}</p>-->
            <!--                      <p class="lp1__list-text">-->
            <!--                        {{-->
            <!--                          $t(-->
            <!--                              "Become a part of VIP Club to get exclusive bonuses"-->
            <!--                          )-->
            <!--                        }}-->
            <!--                      </p>-->
            <!--                    </div>-->
            <!--                  </li>-->
            <!--                </ul>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="lp2">-->
            <!--              <div class="lp-heading">-->
            <!--                <h3 class="lp-title">{{ $t("如何工作") }}</h3>-->
            <!--                <p class="lp-toptext">{{ $t("开始您的游戏之路") }}</p>-->
            <!--              </div>-->
            <!--              <ul class="lp2__items">-->
            <!--                <li>-->
            <!--                  <div class="lp2__item">-->
            <!--                    <div class="lp2__item-img lp2__item-img_1">-->
            <!--                      <img src="../../assets/images/VIP1.png" alt/>-->
            <!--                    </div>-->
            <!--                    <div class="lp2__item-num">-->
            <!--                      <img src="../../assets/images/1.svg" alt/>-->
            <!--                    </div>-->
            <!--                    <p class="lp2__item-heading">-->
            <!--                      {{ $t("Login on Cyber Raccoon") }}-->
            <!--                    </p>-->
            <!--                    <p class="lp2__item-text">-->
            <!--                      {{ $t("rank_system_desc1") }}-->
            <!--                    </p>-->
            <!--                  </div>-->
            <!--                </li>-->
            <!--                <li>-->
            <!--                  <div class="lp2__item">-->
            <!--                    <div class="lp2__item-img lp2__item-img_2">-->
            <!--                      <img src="../../assets/images/2.png" alt/>-->
            <!--                    </div>-->
            <!--                    <div class="lp2__item-num">-->
            <!--                      <img src="../../assets/images/02.svg" alt/>-->
            <!--                    </div>-->
            <!--                    <p class="lp2__item-heading">-->
            <!--                      {{ $t("Play favorite games") }}-->
            <!--                    </p>-->
            <!--                    <p class="lp2__item-text">-->
            <!--                      {{ $t("rank_system_desc2") }}-->
            <!--                    </p>-->
            <!--                  </div>-->
            <!--                </li>-->
            <!--                <li>-->
            <!--                  <div class="lp2__item">-->
            <!--                    <div class="lp2__item-img lp2__item-img_3">-->
            <!--                      <img src="../../assets/images/3_.png" alt/>-->
            <!--                    </div>-->
            <!--                    <div class="lp2__item-num">-->
            <!--                      <img src="../../assets/images/03.svg" alt/>-->
            <!--                    </div>-->
            <!--                    <p class="lp2__item-heading">-->
            <!--                      {{ $t("Increase your rank") }}-->
            <!--                    </p>-->
            <!--                    <p class="lp2__item-text">-->
            <!--                      {{ $t("rank_system_desc3") }}-->
            <!--                    </p>-->
            <!--                  </div>-->
            <!--                </li>-->
            <!--              </ul>-->
            <!--              <router-link-->
            <!--                  to="/all-game"-->
            <!--                  class="button button_xl button_red button_center"-->
            <!--              >-->
            <!--                <span class="button__inner">-->
            <!--                  <span class="button__text">{{ $t("开始游戏") }}</span>-->
            <!--                </span>-->
            <!--              </router-link>-->
            <!--            </div>-->
            <!-- <div class="lp4">
              <h2>{{ $t("关于贵宾会") }}</h2>
              <p>{{ $t("最佳游戏体验和高水平服务") }}</p>
              <h3>{{ $t("成为贵宾俱乐部的会员意味着您可以享受") }}</h3>
              <ul>
                <li>
                  <img
                    src="../../assets/images/checkbox.png"
                    height="20"
                    width="20"
                    alt
                  />
                  {{ $t("私人贵宾经理") }}
                </li>
                <li>
                  <img
                    src="../../assets/images/checkbox.png"
                    height="20"
                    width="20"
                    alt
                  />
                  {{ $t("更高的返现奖励") }}
                </li>
                <li>
                  <img
                    src="../../assets/images/checkbox.png"
                    height="20"
                    width="20"
                    alt
                  />
                  {{ $t("每周和每月奖金") }}
                </li>
                <li>
                  <img
                    src="../../assets/images/checkbox.png"
                    height="20"
                    width="20"
                    alt
                  />
                  {{ $t("其他额外津贴") }}
                </li>
              </ul>
              <h4 class="el-m-b-15">{{ $t("加入我们俱乐部的邀请") }}</h4>
              <h4 class="vip-club-h4">More details in our VIP Telegram channel</h4>
              <a
                :href="$t('join_vip_club_url')"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="button button_lg button_blue button_center"
              >
                <span class="button__inner">
                  <span class="button__text">{{ $t("加入") }}</span>
                </span>
              </a>
            </div> -->
            <!--            <h2 style="margin-top:20px">{{ $t("关于赛博浣熊") }}</h2>-->
            <!--            <div class="faq-items">-->
            <!--              <div class="faq-items__column">-->
            <!--                <div-->
            <!--                    class="faq-element"-->
            <!--                    @click="faqClick(item)"-->
            <!--                    v-for="(item, index) in faqListleft"-->
            <!--                    :key="`faqListleft${index}`"-->
            <!--                    :class="item.select ? 'faq-show' : ''"-->
            <!--                >-->
            <!--                  <div class="faq-element__wrapper">-->
            <!--                    <h3 class="faq-element__title">{{ $t(item.title) }}</h3>-->
            <!--                    <div class="faq-element__icon-block">-->
            <!--                      <svg-->
            <!--                          width="20"-->
            <!--                          height="20"-->
            <!--                          focusable="false"-->
            <!--                          aria-hidden="true"-->
            <!--                          class="faq-element__icon-arrow"-->
            <!--                      >-->
            <!--                        <use-->
            <!--                            xlink:href="../../assets/fonts/svg-sprite.svg#icon-arrow-down"-->
            <!--                            class="svg-use"-->
            <!--                        />-->
            <!--                      </svg>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <p-->
            <!--                      class="faq-element__description"-->
            <!--                      v-html="$t('about_us_desc' + item.id)"-->
            <!--                  ></p>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="faq-items__column">-->
            <!--                <div-->
            <!--                    class="faq-element"-->
            <!--                    @click="faqClick(item)"-->
            <!--                    v-for="(item, index) in faqListright"-->
            <!--                    :key="`faqListright${index}`"-->
            <!--                    :class="item.select ? 'faq-show' : ''"-->
            <!--                >-->
            <!--                  <div class="faq-element__wrapper">-->
            <!--                    <h3 class="faq-element__title">{{ $t(item.title) }}</h3>-->
            <!--                    <div class="faq-element__icon-block">-->
            <!--                      <svg-->
            <!--                          width="20"-->
            <!--                          height="20"-->
            <!--                          focusable="false"-->
            <!--                          aria-hidden="true"-->
            <!--                          class="faq-element__icon-arrow"-->
            <!--                      >-->
            <!--                        <use-->
            <!--                            xlink:href="../../assets/fonts/svg-sprite.svg#icon-arrow-down"-->
            <!--                            class="svg-use"-->
            <!--                        />-->
            <!--                      </svg>-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <p-->
            <!--                      class="faq-element__description"-->
            <!--                      v-html="$t('about_us_desc' + item.id)"-->
            <!--                  ></p>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <Foot/>
    </div>
    <!-- <asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar> -->
    <div
        class="app-overlay"
        v-if="isMobileFlag"
        :class="openedleft ? 'visible' : ''"
        @click="menuClick"
    ></div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import {user_vip_api, user_vip_api2, user_receiveLevelReward, user_vip_now} from "@/api/user";
import {mapState} from "vuex";

export default {
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar
  },
  computed: {
    ...mapState(['userInfo']),
    faqListleft: function () {
      var list = this.faqList.filter(item => item.title != this.$t(item.title));
      var arrTemp = [];
      for (var i = 0; i < list.length; i++) {
        if (i % 2 == 0) {
          arrTemp.push(list[i]);
        }
      }
      return arrTemp;
    },
    faqListright: function () {
      var list = this.faqList.filter(item => item.title != this.$t(item.title));
      var arrTemp = [];
      for (var i = 0; i < list.length; i++) {
        if (i % 2 != 0) {
          arrTemp.push(list[i]);
        }
      }
      return arrTemp;
    },
    userLevel() {
      let list = this.userVipData.filter(item => item.id == this.userInfo.level_id);
      // console.log({list});
      return list[0]
    },
    vipImg() {
      return require(`@/assets/images/ranksystem/vip/${this.userInfo?.level_name || 'VIP0'}.png`);
    }
  },
  data() {
    return {
      curTime: 0,
      timeId: null,
      userVipData: [],
      swiperOptionThumbs: {
        loop: true,
        autoplay: 3000,
        navigation: {
          nextEl: ".rank-slider__right-arrow",
          prevEl: ".rank-slider__left-arrow",
        },
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      },
      faqCur: 0,
      faqData: [],
      faqList: [
        {
          id: 0,
          title: "什麼是 Cyber Raccoon VIP 俱樂部？",
          content: "",
          select: false,
        },
        {
          id: 1,
          title: "如何成為貴賓俱樂部的一員？",
          content: "",
          select: false,
        },
        {
          id: 2,
          title: "加入貴賓俱樂部有什麼好處？",
          content: "",
          select: false,
        },
        {
          id: 3,
          title: "什麼會影響每週/每月的獎金？",
          content: "",
          select: false,
        },
        {
          id: 4,
          title: "我想成為貴賓俱樂部的一員，但我還沒有達到13級，我該怎麼辦？",
          content: "",
          select: false,
        },
        {
          id: 5,
          title: "VIP Club 會員有什麼特別優惠嗎？",
          content: "",
          select: false,
        },
        {
          id: 6,
          title:
              "我是會員，我還沒有收到過任何獎金。為什麼？它們什麼時候傳送給使用者，多久傳送一次？",
          content: "",
          select: false,
        },
      ],
    };
  },
  methods: {
    format(next_level_name) {
      // return next_level_name?this.userInfo.next_level_name:'';
      return '';
    },
    formatApp() {
      return this.userInfo?.next_level_name
    },
    // time(time,curTime,type,item,key){
    //   let nextTime;
    //   time = time*1000
    //   if(type=="周"){
    //     nextTime = time+7*24*60*60*1000
    //   }else{
    //     // const date = new Date(time)
    //     // const month = date.getMonth()+1
    //     // nextTime = date.setMonth(month)
    //     nextTime = time+30*24*60*60*1000
    //   }

    //   const rTime = (nextTime - curTime)/1000
    //   // 判断时间时候为负数，负数改变状态
    //   if(rTime<=0){
    //     item[key] = 0
    //     this.$forceUpdate()
    //     return
    //   }

    //   const h = parseInt(rTime/3600).toString()
    //   const m = parseInt(rTime%3600/60).toString()
    //   const s = parseInt(rTime%3600%60).toString()
    //   if(h>24){
    //     return Math.ceil(h/24) + this.$t("天")
    //   }else{
    //     return `${h.length==1?"0"+h:h}:${m.length==1?"0"+m:m}:${s.length==1?"0"+s:s}`
    //   }
    // },

    formattedTime(time, type, item, key) {
      let nextTime;
      time = time * 1000;
      if (type === "周") {
        nextTime = time + 7 * 24 * 60 * 60 * 1000;
      } else {
        nextTime = time + 30 * 24 * 60 * 60 * 1000;
      }
      const curTime = new Date().getTime();
      const rTime = (nextTime - curTime) / 1000;

      // 判断时间时候为负数，负数改变状态
      if (rTime <= 0) {
        item[key] = 0;
        this.$forceUpdate();
        return;
      }
      const days = Math.floor(rTime / (24 * 3600));
      const hours = Math.floor((rTime % (24 * 3600)) / 3600);
      const minutes = Math.floor((rTime % 3600) / 60);
      const seconds = Math.floor(rTime % 60);

      const formattedDays = String(days).padStart(1, "0");
      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      return `${formattedDays}d ${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
    },

    async receiveLevelReward(item, reward_type) {
      if (item[reward_type == 1 ? 'week_is_receive_vip_reward' : 'month_is_receive_vip_reward'] == 1) {
        this.$message.error(this.$t('请计时结束再领取下次奖励'));
        return
      }
      item['loading' + reward_type] = true
      this.$forceUpdate()
      const res = await user_receiveLevelReward({
        level_id: item.id,
        reward_type
      })
      if (res.data.code == 1) {
        await this.getUserVip(false)
        this.$message({
          message: this.$t('领取成功'),
          type: 'success'
        });
      } else {
        this.$message.error(res.data.msg);
      }
      item['loading' + reward_type] = false
      this.$forceUpdate()
    },
    async getUserVip(init) {
      await user_vip_api().then((res) => {
        if (res && res.data.code == 1) {
          let arr = res.data.data;
          arr.forEach(item => {
            item.week_is_receive_vip_reward = 1
            item.month_is_receive_vip_reward = 1
          });
          if (init) {
            const page = arr.findIndex(item => item.id === this.$store.state.userInfo.level_id)
            this.$refs?.swiperThumbs?.swiper.slideTo(page);
            
          }
          if (arr.length > 0) {
            for (let i in arr) {
              let num = arr[i].level_name.substring(
                  3,
                  arr[i].level_name.length
              );
              let keys = i * 1 + 1 > 20 ? 20 : i * 1 + 1;
              arr[i].levelImg = require(`../../assets/images/r${keys}.png`);
              arr[i].levelNum = Number(num);
            }
            this.userVipData = arr;
          }
        }
      });
    },
    async getUserVip2() {
      await user_vip_api2().then((res) => {
        if (res && res.data.code == 1) {
          let arr = res.data.data;
          if (arr.length > 0) {
            for (let i in arr) {
              let num = arr[i].level_name.substring(
                  3,
                  arr[i].level_name.length
              );
              let keys = i * 1 + 1 > 20 ? 20 : i * 1 + 1;
              arr[i].levelImg = require(`../../assets/images/r${keys}.png`);
              arr[i].levelNum = Number(num);
            }
            this.userVipData = arr;
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
    faqClick(item) {
      if (!item.select) {
        for (let i = 0; i < this.faqList.length; i++) {
          this.faqList[i].select = false;
        }
        item.select = true;
      } else {
        item.select = false;
      }
    },
  },
  mounted() {
    this.curTime = new Date().getTime()
    this.timeId = setInterval(() => {
      this.curTime = new Date().getTime()
    }, 1000)
    if (this.$store.state.isLoginStatu) {
      this.getUserVip(true);
    } else {
      this.getUserVip2();
    }
  },
  watch: {
    '$store.state.isLoginStatu': function (v) {
      if (v) {
        this.getUserVip(true);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timeId)
  },
  created() {
    this.isPhone();
  },
};
</script>
<style scoped lang="less">
// 折叠面板
/deep/ .el-collapse {
  background-color: #191A1E !important;
  --el-collapse-border-color: transparent !important;
}

/deep/ .el-collapse, .el-collapse-item__wrap {
  border: none;
  background-color: #282f5a !important;
  border-color: #282f5a;
}

/deep/ .el-collapse-item__header {
  color: #fff;
  background-color: #282f5a !important;
  border-color: #282f5a;
}

/deep/ .el-collapse-item__content {
  color: #fff;
  background-color: #282f5a!important;
}

/deep/ .el-collapse-item__wrap {
  border-color: #282f5a;
}

@media (max-width: 550px) {
  .app-vip-head {
    display: block;
  }

  .vip-head {
    display: none !important;
  }
}

@media (min-width: 551px) {
  .app-vip-head {
    display: none;
  }

  .vip-head {
    display: flex !important;
  }
}

.col84F100 {
  color: #84F100;
}

.app-vip-head {
  background-image: url("~@/assets/images/ranksystem/appbg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 147px;
  width: 100%;
  padding: 10px;

  &-top {
    display: flex;
    align-items: center;
  }

  &-right {
    padding-left: 6px;
    flex: 1;
  }

  &-img {
    width: 101px;
    height: 90px;
  }

  .level-name {
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 15px;
    color: #FFFFFF;
  }

  &-bottom {
    display: flex;
    justify-content: space-around;
    margin-top: 6px;
  }
}

.vip-head {
  background-image: url("~@/assets/images/ranksystem/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 210px;
  width: 100%;
  display: flex;
  padding: 0 14px;
  align-items: center;

  .next_level_name {
    text-align: right;
    padding-right: 50px;
  }

  h1 {
    font-size: 30px;
    font-weight: 500;
  }

  &-img {
    width: 191px;
    height: 169px;
  }

  &-progress {
    display: flex;
    align-items: center;

    &-left {
      margin-right: 10px;
    }
  }

  ::v-deep .el-progress {
    flex: 1;
  }

  &-bottom {
    display: flex;
    justify-content: space-around;
  }

  &-right {
    padding: 0 20px;
    flex: 1;
  }
}

.graded-welfare {
  /* background: #282f5a; */
  border-radius: 10px;
  padding: 20px 14px;
  display: flex;

  &-name {
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #84F100;
    margin-bottom: 10px;
    display: flex;

    div {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }

  @media (max-width: 1200px) {
    &-item {
      width: 50% !important;
    }
  }
  @media (max-width: 550px) {
    //width: 100%;
    &-name {
      width: 60%;
      font-size: 12px;
    }
    &-item {
      margin-bottom: 10px;
      width: 100% !important;
      &-right {
        display: flex;
        align-items: center;
      }
    }

    flex-direction: column;
  }

  &-item {
    display: flex;
    width: 32%;
    padding: 15px;
    background: #282f5a;
    border-radius: 10px;
    align-items: center;

    &:nth-child(3n-1) {
      @media (min-width: 551px) {
        margin: 0 2%;
      }
    }

    &-right {
      flex: 1;
      padding-left: 10px;
      //display: flex;
      //flex-direction: column;

    }
  }

  img {
    width: 130px;
    height: 103px;
    @media (max-width: 768px) {
      width: 52px;
      height: 41px;
    }
  }
}

.vip-benefits {
  background: #282f5a;
  border-radius: 10px;
  padding: 14px;
  position: relative;

  &-item {
    span {
      font-size: 32px;
    }

    div {
      font-family: PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #84F100;
    }

    p {
      font-family: PingFang SC;
      font-weight: 400;
      font-size: 12px;
      color: #A4A4A4;
    }
  }

  img {
    width: 388px;
    height: 322px;
    position: absolute;
    bottom: -10px;
    right: 20px;
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.vip-title {
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #FFFFFF;
  padding: 10px 0;
}

.content {
  padding-left: 24px;
  padding-right: 24px;
}

.lp {
  position: relative;
  margin-top: -60px;
}

.lp .vip-club-h4 {
  margin-top: 30px;
  margin-bottom: 5px;
  color: #fff;
}

.lp_2 .lp1 {
  padding: 183px 0 0;
}

.lp_2 .lp2 {
  padding-top: 55px;
}

.lp1 {
  padding: 132px 0 59px;
}

.lp1,
.lp1__box {
  position: relative;
}

.lp1__title {
  position: relative;
  margin: 0 0 37px;
  max-width: 660px;
  font-size: 43px;
  font-weight: 900;
  line-height: 1.2;
  text-transform: uppercase;
  color: #fff;
}

.lp1__title span {
  color: #fa305c;
}

.lp1__img {
  position: absolute;
  right: 0;
  top: 0;
  width: 387px;
  height: 438px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}

.lp1__img img {
  max-width: 100%;
  height: auto;
  flex-shrink: 0;
}

.lp1__img_2 {
  right: -124px;
  top: -183px;
  width: 751px;
}

.lp1__list {
  position: relative;
  max-width: 530px;
}

.lp1__list_2 .lp1__list-item {
  margin: 0 0 30px;
}

.lp1__list-item {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 5px;
  font-weight: 600;
}

.lp1__list-item:last-child {
  margin: 0;
}

.lp1__list-item > :first-child {
  width: 88px;
}

.lp1__list-item > :nth-child(2) {
  position: relative;
  width: calc(100% - 88px);
}

.lp1__list-img {
  position: relative;
}

.lp1__list-img img {
  max-width: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}

.lp1__list-img_1 {
  left: -4px;
  top: -4px;
}

.lp1__list-img_1 img {
  width: 82px;
}

.lp1__list-img_2 {
  left: -10px;
  top: -2px;
}

.lp1__list-img_2 img {
  width: 88px;
}

.lp1__list-img_3 {
  left: -15px;
  top: -11px;
}

.lp1__list-img_3 img {
  width: 91px;
}

.lp1__list-heading {
  margin: 0 0 3px;
  font-size: 25px;
  line-height: 1.2;
  text-transform: uppercase;
  color: #fff;
}

.lp1__list-text {
  margin: 0;
  font-size: 15px;
  line-height: 23px;
  color: #9db8e1;
}

.lp2 {
  position: relative;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lp2 .button {
  margin: 30px auto 0;
  display: inline-block;
}

.lp-heading {
  margin: 0 auto 41px;
}

.lp-title {
  margin: 0 auto 21px;
  font-size: 40px;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.lp-title span {
  color: #fa305c;
}

.lp-toptext {
  max-width: 810px;
  font-size: 18px;
  line-height: 1.3;
  color: #9db8e1;
}

.lp-toptext,
.lp-toptextsm {
  margin: 0 auto;
  text-align: center;
}

.lp2__items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
}

.lp2__items > * {
  position: relative;
  padding: 0 6px;
  width: 33.33%;
}

.lp2__items > :after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  display: block;
  margin: -5px 0 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #0d1c31 url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAxNiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjY2NjkgMTEuMDYzNUwzLjk4NjYxIDAuMzgzNDEyQzMuNzM5NTkgMC4xMzYxOTQgMy40MDk4MyAwIDMuMDU4MjMgMEMyLjcwNjYyIDAgMi4zNzY4NyAwLjEzNjE5NCAyLjEyOTg0IDAuMzgzNDEyTDEuMzQzMzEgMS4xNjk3NUMwLjgzMTUxMyAxLjY4MjEzIDAuODMxNTEzIDIuNTE0OTEgMS4zNDMzMSAzLjAyNjUxTDEwLjMxMTggMTEuOTk1TDEuMzMzMzYgMjAuOTczNUMxLjA4NjM0IDIxLjIyMDcgMC45NDk5NTEgMjEuNTUwMyAwLjk0OTk1MSAyMS45MDE3QzAuOTQ5OTUxIDIyLjI1MzUgMS4wODYzNCAyMi41ODMgMS4zMzMzNiAyMi44MzA1TDIuMTE5ODkgMjMuNjE2NkMyLjM2NzExIDIzLjg2MzggMi42OTY2NyAyNCAzLjA0ODI4IDI0QzMuMzk5ODggMjQgMy43Mjk2NCAyMy44NjM4IDMuOTc2NjYgMjMuNjE2NkwxNC42NjY5IDEyLjkyNjdDMTQuOTE0NSAxMi42Nzg3IDE1LjA1MDUgMTIuMzQ3NiAxNS4wNDk3IDExLjk5NTZDMTUuMDUwNSAxMS42NDIyIDE0LjkxNDUgMTEuMzExMyAxNC42NjY5IDExLjA2MzVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K) no-repeat 20px;
  z-index: 1;
}

.lp2__items > :last-child:after {
  display: none;
}

.lp2__item {
  position: relative;
  padding: 149px 20px 32px 38px;
  border-radius: 20px;
  background: linear-gradient(318.42deg, #1e75dc 2.97%, #072445 95.55%);
  font-weight: 600;
  height: 100%;
}

.lp2__item-img {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.lp2__item-img img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}

.lp2__item-img_1 {
  left: 0;
  top: 20px;
}

.lp2__item-img_1 img {
  width: 145px;
}

.lp2__item-img_2 {
  left: -67px;
  top: -93px;
}

.lp2__item-img_2 img {
  width: 340px;
}

.lp2__item-img_3 {
  left: -87px;
  top: -95px;
}

.lp2__item-img_3 img {
  width: 336px;
}

.lp2__item-img_4 {
  left: -75px;
  top: -99px;
}

.lp2__item-img_4 img {
  width: 340px;
}

.lp2__item-img_5 {
  left: 7px;
  top: 5px;
}

.lp2__item-img_5 img {
  width: 146px;
}

.lp2__item-img_6 {
  left: 5px;
  top: 10px;
}

.lp2__item-img_6 img {
  width: 139px;
}

.lp2__item-num {
  position: absolute;
  right: 23px;
  top: 32px;
  width: 153px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
}

.lp2__item-heading {
  margin: 0 0 9px;
  font-size: 25px;
  line-height: 1.32;
  text-transform: uppercase;
  color: #fff;
  -webkit-line-clamp: 2;
}

.lp2__item-heading,
.lp2__item-text {
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.lp2__item-text {
  min-height: 70px;
  margin: 0;
  font-size: 15px;
  line-height: 23px;
  color: #9db8e1;
  -webkit-line-clamp: 3;
}

.btn {
  height: 52px;
  margin: 30px auto 0;
  display: block;
  text-transform: uppercase;
}

.lp3 {
  position: relative;
  overflow: hidden;
  padding: 10px 0;
}

.lp3__signs {
  position: absolute;
  left: 0;
  top: -13px;
  width: 100%;
  z-index: -1;
}

.lp3__heading {
  margin-bottom: 43px;
}

.lp3__title {
  margin-bottom: 8px;
}

.lp4 {
  position: relative;
  width: 100%;
  min-height: 300px;
  border-radius: 20px;
  margin-bottom: 50px;
  padding: 75px;
  background-image: url(../../assets/images/about-vip-bg.png);
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.lp4 h2,
.lp4 h3,
.lp4 h4,
.lp4 p {
  margin: 0;
  padding: 0;
}

.lp4 h2 {
  font-size: 40px;
  line-height: 60px;
  text-transform: uppercase;
  margin: 0 0 20px;
}

.lp4 p {
  max-width: 355px;
  font-size: 18px;
  line-height: 150%;
  color: #9db8e1;
}

.lp4 h3,
.lp4 p {
  font-weight: 400;
  margin-bottom: 25px;
}

.lp4 h3 {
  max-width: 441px;
  font-style: normal;
  font-size: 21px;
}

.lp4 ul {
  margin-bottom: 25px;
}

.lp4 li {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.lp4 li img {
  margin-right: 14px;
}

.lp4 h4 {
  font-weight: 400;
  font-size: 17px;
  color: #fcf076;
  max-width: 400px;
}

.lp4 .btn {
  margin: 25px 0 0;
}

.lp4 .btn_link {
  margin-top: 5px;
  display: inline-block;
}

@media (max-width: 1020px) {
  .lp4 {
    background-image: inherit;
    background: linear-gradient(317.89deg, #af0f54 2.97%, #054792 95.55%);
  }
}

@media (max-width: 1252px) {
  .opened-left-panel .lp4 {
    background-image: inherit;
    background: linear-gradient(317.89deg, #af0f54 2.97%, #054792 95.55%);
  }
}

@media (max-width: 1360px) {
  .opened-contests-panel .lp4 {
    background-image: inherit;
    background: linear-gradient(317.89deg, #af0f54 2.97%, #054792 95.55%);
  }
}

@media (max-width: 1592px) {
  .opened-left-panel.opened-contests-panel .lp4 {
    background-image: inherit;
    background: linear-gradient(317.89deg, #af0f54 2.97%, #054792 95.55%);
  }
}

@media (max-width: 500px) {
  .lp4 {
    padding: 25px;
  }
}

@media (max-width: 732px) {
  .opened-left-panel .lp4 {
    padding: 25px;
  }
}

@media (max-width: 840px) {
  .opened-contests-panel .lp4 {
    padding: 25px;
  }
}

@media (max-width: 1072px) {
  .opened-left-panel.opened-contests-panel .lp4 {
    padding: 25px;
  }
}

@media (max-width: 1040px) {
  .rank_about__wrapper .lp {
    margin-top: -117px;
  }

  .rank_about__wrapper .lp1__title {
    margin: 0 auto 30px;
    max-width: none;
    font-size: 35px;
    line-height: 44px;
    text-align: center;
  }

  .rank_about__wrapper .lp1__img {
    position: relative;
    left: 50%;
    margin: 0 0 25px;
    transform: translate(-50%) scale(0.9);
  }

  .rank_about__wrapper .lp1 {
    padding: 140px 0 56px;
  }

  .rank_about__wrapper .lp1__list-item > :first-child,
  .rank_about__wrapper .lp1__list-item > :nth-child(2) {
    width: 100%;
  }

  .rank_about__wrapper .lp1__list-item {
    margin: 0 0 54px;
    text-align: center;
  }

  .rank_about__wrapper .lp1__list-img {
    margin: 0 0 7px;
    left: auto;
    top: auto;
  }

  .rank_about__wrapper .lp1__list-heading {
    margin: 0 -5px 10px;
  }

  .rank_about__wrapper .lp-title {
    margin: 0 auto 19px;
    font-size: 35px;
    line-height: 45px;
  }

  .rank_about__wrapper .lp2__items {
    margin: 0 auto;
  }

  .rank_about__wrapper .lp2__items > * {
    padding: 0;
    width: 100%;
  }

  .rank_about__wrapper .lp2__item {
    margin: 0 0 28px;
  }

  .rank_about__wrapper .lp-heading {
    margin: 0 auto 37px;
  }

  .rank_about__wrapper .lp2__items > :after {
    content: "";
    position: absolute;
    right: 50%;
    top: auto;
    bottom: -13px;
    transform: translate(50%) rotate(90deg);
  }

  .rank_about__wrapper .lp2__btn,
  .rank_about__wrapper .lp3__signs {
    display: none;
  }

  .rank_about__wrapper .lp3 {
    padding: 11px 0 100px;
  }

  .rank_about__wrapper .lp1__list {
    max-width: none;
  }

  .rank_about__wrapper .lp_2 .lp1 {
    padding: 164px 0 0;
  }

  .rank_about__wrapper .lp_2 .lp1__title {
    line-height: 41px;
  }

  .rank_about__wrapper .lp1__img_2 {
    top: -147px;
    margin: 0 0 0 -11px;
    width: 511px;
    height: 377px;
  }

  .rank_about__wrapper .lp_2 .lp1__list-img {
    margin: 0 0 16px;
  }

  .rank_about__wrapper .lp_2 .lp2 {
    padding-top: 42px;
  }

  .rank_about__wrapper .lp1__list_2 .lp1__list-item {
    margin: 0 0 47px;
  }

  .rank_about__wrapper .lp_2 .lp1__list-text {
    margin: 0 10px;
  }

  .rank_about__wrapper .lp_2 .lp2 .lp-heading {
    margin-bottom: 49px;
  }

  .rank_about__wrapper .lp3__heading {
    margin-left: 22px;
    margin-right: 22px;
  }
}

@media (max-width: 1272px) {
  .lp2__item {
    height: auto;
  }

  .opened-left-panel .rank_about__wrapper .lp {
    margin-top: -117px;
  }

  .opened-left-panel .rank_about__wrapper .lp1__title {
    margin: 0 auto 30px;
    max-width: none;
    font-size: 35px;
    line-height: 44px;
    text-align: center;
  }

  .opened-left-panel .rank_about__wrapper .lp1__img {
    position: relative;
    left: 50%;
    margin: 0 0 25px;
    transform: translate(-50%) scale(0.9);
  }

  .opened-left-panel .rank_about__wrapper .lp1 {
    padding: 140px 0 56px;
  }

  .opened-left-panel .rank_about__wrapper .lp1__list-item > :first-child,
  .opened-left-panel .rank_about__wrapper .lp1__list-item > :nth-child(2) {
    width: 100%;
  }

  .opened-left-panel .rank_about__wrapper .lp1__list-item {
    margin: 0 0 54px;
    text-align: center;
  }

  .opened-left-panel .rank_about__wrapper .lp1__list-img {
    margin: 0 0 7px;
    left: auto;
    top: auto;
  }

  .opened-left-panel .rank_about__wrapper .lp1__list-heading {
    margin: 0 -5px 10px;
  }

  .opened-left-panel .rank_about__wrapper .lp-title {
    margin: 0 auto 19px;
    font-size: 35px;
    line-height: 45px;
  }

  .opened-left-panel .rank_about__wrapper .lp2__items {
    margin: 0 auto;
  }

  .opened-left-panel .rank_about__wrapper .lp2__items > * {
    padding: 0;
    width: 100%;
  }

  .opened-left-panel .rank_about__wrapper .lp2__item {
    margin: 0 0 28px;
  }

  .opened-left-panel .rank_about__wrapper .lp-heading {
    margin: 0 auto 37px;
  }

  .opened-left-panel .rank_about__wrapper .lp2__items > :after {
    content: "";
    position: absolute;
    right: 50%;
    top: auto;
    bottom: -13px;
    transform: translate(50%) rotate(90deg);
  }

  .opened-left-panel .rank_about__wrapper .lp2__btn,
  .opened-left-panel .rank_about__wrapper .lp3__signs {
    display: none;
  }

  .opened-left-panel .rank_about__wrapper .lp3 {
    padding: 11px 0 100px;
  }

  .opened-left-panel .rank_about__wrapper .lp1__list {
    max-width: none;
  }

  .opened-left-panel .rank_about__wrapper .lp_2 .lp1 {
    padding: 164px 0 0;
  }

  .opened-left-panel .rank_about__wrapper .lp_2 .lp1__title {
    line-height: 41px;
  }

  .opened-left-panel .rank_about__wrapper .lp1__img_2 {
    top: -147px;
    margin: 0 0 0 -11px;
    width: 511px;
    height: 377px;
  }

  .opened-left-panel .rank_about__wrapper .lp_2 .lp1__list-img {
    margin: 0 0 16px;
  }

  .opened-left-panel .rank_about__wrapper .lp_2 .lp2 {
    padding-top: 42px;
  }

  .opened-left-panel .rank_about__wrapper .lp1__list_2 .lp1__list-item {
    margin: 0 0 47px;
  }

  .opened-left-panel .rank_about__wrapper .lp_2 .lp1__list-text {
    margin: 0 10px;
  }

  .opened-left-panel .rank_about__wrapper .lp_2 .lp2 .lp-heading {
    margin-bottom: 49px;
  }

  .opened-left-panel .rank_about__wrapper .lp3__heading {
    margin-left: 22px;
    margin-right: 22px;
  }
}

@media (max-width: 1380px) {
  .opened-contests-panel .rank_about__wrapper .lp {
    margin-top: -117px;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__title {
    margin: 0 auto 30px;
    max-width: none;
    font-size: 35px;
    line-height: 44px;
    text-align: center;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__img {
    position: relative;
    left: 50%;
    margin: 0 0 25px;
    transform: translate(-50%) scale(0.9);
  }

  .opened-contests-panel .rank_about__wrapper .lp1 {
    padding: 140px 0 56px;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__list-item > :first-child,
  .opened-contests-panel .rank_about__wrapper .lp1__list-item > :nth-child(2) {
    width: 100%;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__list-item {
    margin: 0 0 54px;
    text-align: center;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__list-img {
    margin: 0 0 7px;
    left: auto;
    top: auto;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__list-heading {
    margin: 0 -5px 10px;
  }

  .opened-contests-panel .rank_about__wrapper .lp-title {
    margin: 0 auto 19px;
    font-size: 35px;
    line-height: 45px;
  }

  .opened-contests-panel .rank_about__wrapper .lp2__items {
    margin: 0 auto;
  }

  .opened-contests-panel .rank_about__wrapper .lp2__items > * {
    padding: 0;
    width: 100%;
  }

  .opened-contests-panel .rank_about__wrapper .lp2__item {
    margin: 0 0 28px;
  }

  .opened-contests-panel .rank_about__wrapper .lp-heading {
    margin: 0 auto 37px;
  }

  .opened-contests-panel .rank_about__wrapper .lp2__items > :after {
    content: "";
    position: absolute;
    right: 50%;
    top: auto;
    bottom: -13px;
    transform: translate(50%) rotate(90deg);
  }

  .opened-contests-panel .rank_about__wrapper .lp2__btn,
  .opened-contests-panel .rank_about__wrapper .lp3__signs {
    display: none;
  }

  .opened-contests-panel .rank_about__wrapper .lp3 {
    padding: 11px 0 100px;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__list {
    max-width: none;
  }

  .opened-contests-panel .rank_about__wrapper .lp_2 .lp1 {
    padding: 164px 0 0;
  }

  .opened-contests-panel .rank_about__wrapper .lp_2 .lp1__title {
    line-height: 41px;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__img_2 {
    top: -147px;
    margin: 0 0 0 -11px;
    width: 511px;
    height: 377px;
  }

  .opened-contests-panel .rank_about__wrapper .lp_2 .lp1__list-img {
    margin: 0 0 16px;
  }

  .opened-contests-panel .rank_about__wrapper .lp_2 .lp2 {
    padding-top: 42px;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__list_2 .lp1__list-item {
    margin: 0 0 47px;
  }

  .opened-contests-panel .rank_about__wrapper .lp_2 .lp1__list-text {
    margin: 0 10px;
  }

  .opened-contests-panel .rank_about__wrapper .lp_2 .lp2 .lp-heading {
    margin-bottom: 49px;
  }

  .opened-contests-panel .rank_about__wrapper .lp3__heading {
    margin-left: 22px;
    margin-right: 22px;
  }
}

@media (max-width: 1612px) {
  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp {
    margin-top: -117px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp1__title {
    margin: 0 auto 30px;
    max-width: none;
    font-size: 35px;
    line-height: 44px;
    text-align: center;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp1__img {
    position: relative;
    left: 50%;
    margin: 0 0 25px;
    transform: translate(-50%) scale(0.9);
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp1 {
    padding: 140px 0 56px;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp1__list-item
  > :first-child,
  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp1__list-item
  > :nth-child(2) {
    width: 100%;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp1__list-item {
    margin: 0 0 54px;
    text-align: center;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp1__list-img {
    margin: 0 0 7px;
    left: auto;
    top: auto;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp1__list-heading {
    margin: 0 -5px 10px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp-title {
    margin: 0 auto 19px;
    font-size: 35px;
    line-height: 45px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp2__items {
    margin: 0 auto;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp2__items
  > * {
    padding: 0;
    width: 100%;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp2__item {
    margin: 0 0 28px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp-heading {
    margin: 0 auto 37px;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp2__items
  > :after {
    content: "";
    position: absolute;
    right: 50%;
    top: auto;
    bottom: -13px;
    transform: translate(50%) rotate(90deg);
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp2__btn,
  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp3__signs {
    display: none;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp3 {
    padding: 11px 0 100px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp1__list {
    max-width: none;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp_2 .lp1 {
    padding: 164px 0 0;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp_2
  .lp1__title {
    line-height: 41px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp1__img_2 {
    top: -147px;
    margin: 0 0 0 -11px;
    width: 511px;
    height: 377px;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp_2
  .lp1__list-img {
    margin: 0 0 16px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp_2 .lp2 {
    padding-top: 42px;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp1__list_2
  .lp1__list-item {
    margin: 0 0 47px;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp_2
  .lp1__list-text {
    margin: 0 10px;
  }

  .opened-left-panel.opened-contests-panel
  .rank_about__wrapper
  .lp_2
  .lp2
  .lp-heading {
    margin-bottom: 49px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp3__heading {
    margin-left: 22px;
    margin-right: 22px;
  }
}

@media (max-width: 370px) {
  .rank_about__wrapper .lp2__item-num {
    transform: scale(0.8);
    transform-origin: right center;
  }

  .rank_about__wrapper .lp2__item {
    padding-left: 30px;
    padding-right: 10px;
  }

  .rank_about__wrapper .lp2__item-img {
    margin-left: -8px;
  }

  .rank_about__wrapper .lp1__img_2 {
    transform: translate(-50%) scale(0.9);
  }
}

@media (max-width: 602px) {
  .opened-left-panel .rank_about__wrapper .lp2__item-num {
    transform: scale(0.8);
    transform-origin: right center;
  }

  .opened-left-panel .rank_about__wrapper .lp2__item {
    padding-left: 30px;
    padding-right: 10px;
  }

  .opened-left-panel .rank_about__wrapper .lp2__item-img {
    margin-left: -8px;
  }

  .opened-left-panel .rank_about__wrapper .lp1__img_2 {
    transform: translate(-50%) scale(0.9);
  }
}

@media (max-width: 710px) {
  .opened-contests-panel .rank_about__wrapper .lp2__item-num {
    transform: scale(0.8);
    transform-origin: right center;
  }

  .opened-contests-panel .rank_about__wrapper .lp2__item {
    padding-left: 30px;
    padding-right: 10px;
  }

  .opened-contests-panel .rank_about__wrapper .lp2__item-img {
    margin-left: -8px;
  }

  .opened-contests-panel .rank_about__wrapper .lp1__img_2 {
    transform: translate(-50%) scale(0.9);
  }
}

@media (max-width: 942px) {
  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp2__item-num {
    transform: scale(0.8);
    transform-origin: right center;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp2__item {
    padding-left: 30px;
    padding-right: 10px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp2__item-img {
    margin-left: -8px;
  }

  .opened-left-panel.opened-contests-panel .rank_about__wrapper .lp1__img_2 {
    transform: translate(-50%) scale(0.9);
  }
}

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
  overflow: hidden;
  border-radius: 16px;
}

.rank-slider__image {
  position: relative;
  margin: auto;
  width: 120px;
  height: 120px;
  margin-top: -5px;
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
}

.rank-slider__title {
  margin-top: 10px;
}

.rank-slider__cashback,
.rank-slider__title {
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
}

.rank-slider__cashback {
  color: #ffb636;
}

.rank-slider__details {
  margin-bottom: 20px;
  min-height: 190px;
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

@media (max-width: 1440px) {
  .opened-contests-panel .faq-items {
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

@media (max-width: 1440px) {
  .opened-contests-panel .faq-items__column {
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
  transition: 0.3s all;
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

@media (max-width: 768px) {
  .rank_about__wrapper .lp1 {
    padding: 60px 0 10px;
  }

  .lp2 {
    padding: 0px 0 10px;
  }

  .lp2 .button {
    margin-top: 0;
  }

  .rank_about__wrapper .lp3 {
    padding-bottom: 36px;
  }
}

.cash-btn {
  width: 90%;
  background-image: linear-gradient(#656667, #656667);
  border-radius: 4px;
  padding: 0;
  height: 36px;
  font-size: 14px;
  //margin: 0 auto;
  display: block;
  //margin-bottom: 26px;
  color: #fff;
}

.btn-icon {
  width: 1.6em;
  margin-right: 15px;
}

.btn-icon2 {
  width: 1.6em;
  margin-right: 15px;
  transform: scale(1.6);
}

.cash-btn2 {
  background-image: linear-gradient(#FFA905, #FFA905);
}

::v-deep .is-disabled {
  //color: #cbcbcb;
  background-image: linear-gradient(0deg, #656667, #656667) !important;
  //background-image: #656667;
  //border-radius: 4px;
  color: #fff;
}

.btn-icon-an {
  animation: btn-icon-an 1s infinite;
}

@keyframes btn-icon-an {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.rank-slider__bg-ac {
  display: none;
}

.swiper-slide-active .rank-slider__bg {
  display: none;
}

.swiper-slide-active .rank-slider__bg-ac {
  display: block;
}

.cash-title {
  text-align: center;
  margin-bottom: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.cash-title span {
  color: #87A1C7;
  font-size: 14px;
}

.cash-title span:last-child {
  color: #FFB422;
  font-weight: bold;
  font-size: 20px;
}

.cash-title span:first-child {
  margin-bottom: 16px;
}

.cash-title-ac {
  flex-direction: row;
  margin-bottom: 10px;
}

.cash-title-ac span:first-child {
  margin-bottom: 0;
}
</style>
