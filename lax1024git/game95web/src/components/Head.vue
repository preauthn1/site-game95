<template>
  <div>
    <header class=" fixed top-0 left-0 w-full px-5 py-6 flex items-stretch justify-between h-16 z-1999 md:px-4 md:py-5 bg-secondary">
      <i class="el-icon-arrow-left" v-if="$route.meta.title" @click="$router.back()"></i>
      <div class="header__left-block" v-else>
        <div class="nav-img">
          <button class="hamburger" :class="flagShow ? 'is-active' : ''" @click="menuClick">
            <img src="@/assets/images1/icon_menu.png" alt="">
          </button>
          <router-link to="/" class="logo__link">
              <div >
                 <el-image  :src="$helper.get('rule').website_pc_logo || logo" class="header_img"></el-image>
              </div>
            </router-link>
        </div>
        <!-- <div class="casino-sport-selector" v-if="!isMobile">
          <el-menu :default-active="$route.path" :router="true" class="el-casino-nav" mode="horizontal">
            <el-menu-item :class="[isSport ? '' : 'isActive']" index="/">
              <span class="iconfont icon-casino-"></span>
              <span>{{ $t('Gaming') }}</span>
            </el-menu-item>
            <el-menu-item :class="[isSport ? 'isActive' : '']" index="/sport-betting"
              v-if="this.$t('sport_is_hidden') != 'hide'">
              <span class="iconfont icon-lanqiu"></span>
              <span>{{ $t('体育') }}</span>
            </el-menu-item>
          </el-menu>
        </div> -->
      </div>
      <div class="app-head-title" v-if="$route.meta.title">{{$t($route.meta.title)}}</div>
      <div class=" relative flex items-center gap-x-4"  v-if="$store.state.isLoginStatu && $store.state.userInfo">
          <div v-loading="$store.state.loading.wallet" v-if="!$route.meta.title" @click="dialogVisibleChange" class=" flex items-center gap-3 py-3 px-6 bg-primary rounded-lg border-2 border-charcoal cursor-pointer">
            <img class=" w-7 h-auto object-fill" src="../assets/images1/icon_wallet.png" alt="">
            <p v-if="$store.state.blanceStatus" class=" font-bold text-sm text-lime-green flex items-center gap-1">
              <span >R$</span>
              {{ numFormat($store.state.userInfo.balance) }}
            </p>
            <div class="relative flex items-center text-lime-green gap-1" v-else id="balance">
              <span>{{ $t('游戏中') }}</span>
              <span class="el-icon-loading"></span>
            </div>
          </div>
          <button type="button" @click="showMsg" v-if="$store.state.isLoginStatu" class="relative">
            <img class=" w-6 h-auto object-fill" src="../assets/images1/icon_notice.png" alt="">
            <div class=" absolute -top-2 -right-3.5 py-0.5 px-1.5 text-xs bg-lime-green rounded-xl" v-if="$store.state.messageUnreadCount > 0">{{ $store.state.messageUnreadCount }}</div>
          </button>
          <button  type="button" class="avatar01 ml-3" @click.stop="userToggle">
              <img v-if="$store.state.userInfo.head_img"
              v-lazy="$store.state.userInfo.head_img" style="border-radius: 50%; border: 2px solid #FF9E03;" class=" w-9 h-auto object-fill " />
              <img v-else src="../assets/images/default_head.png" style="border-radius: 50%; border: 2px solid #FF9E03;" class=" w-9 h-auto object-fill" />
          </button>
          <div class=" absolute top-11 right-0 min-w-60" v-show="userShow && $store.state.userInfo">
              <div class="dropdown__content">
                <div class="profile-preview">
                  <div class="profile-preview__userpick">
                    <div class="user">
                      <div class="user__avatar"
                        style="width: 64px; height: 64px; overflow: hidden; border-radius: 50%; margin-bottom: 8px;">
                        <div class="user__inner">
                          <el-image v-if="$store.state.userInfo.head_img"
                            :src="$store.state.userInfo.head_img" style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="image-slot">
                              <i class="iconfont icon-img-false"></i>
                            </div>
                          </el-image>
                          <el-image v-else :src="require('../assets/images/default_head.png')"
                            style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="image-slot">
                              <i class="iconfont icon-img-false"></i>
                            </div>
                          </el-image>
                        </div>
                      </div>
                      <div class="user__wrap"></div>
                    </div>
                    <div class="item-info-row">{{ $store.state.userInfo.level_name }}</div>
                    <div class="item-info-row" v-if="$store.state.showUserId == 1">
                      {{ $t('ID') }}:
                      {{ $store.state.userInfo.rec_code }}
                      <div v-clipboard:copy="$store.state.userInfo.rec_code" v-clipboard:success="onCopy">
                        <svgIcon icon="icon-copy" ></svgIcon>
                      </div>
                    </div>
                  </div>
                  <span class="profile-preview__name">{{ $store.state.userInfo.real_name }}</span>
                </div>
                <!-- 下面这段是注释掉的 -->
                <!-- <div class="profile-progress" @click="goUrl('/rank-system')">
                  <div class="profile-progress__inner-wapper">
                    <div class="profile-progress__inner">
                      <div class="progress-wrapper" style="width: 100%;">
                        <span class="progress-subtitle">{{ $t("充值金额") }}</span>
                        <el-progress
                          :percentage="calc($store.state.userInfo.recharge1, $store.state.userInfo.next_level_recharge)"></el-progress>
                        <span class="progress-subtitle"
                          v-if="($store.state.userInfo.next_level_recharge - $store.state.userInfo.recharge1) > 0">{{
                            $langKey($t("您仍需 {n} 才能升级"),{n:formatNumber($store.state.userInfo.next_level_recharge-$store.state.userInfo.recharge1)}) }}</span>
                      </div>
                    </div>
                    <div class="profile-progress__inner">
                      <div class="progress-wrapper" style="width: 100%;">
                        <span class="progress-subtitle">{{ $t("投注金额") }}</span>
                        <el-progress
                          :percentage="calc($store.state.userInfo.water, $store.state.userInfo.next_level_water)"></el-progress>
                        <span class="progress-subtitle"
                          v-if="($store.state.userInfo.next_level_water - $store.state.userInfo.water) > 0">{{
                            $langKey($t("您仍需 {n} 才能升级"),{n:formatNumber($store.state.userInfo.next_level_water-$store.state.userInfo.water)}) }}</span>
                      </div>
                    </div>
                  </div>

                </div> -->
                <div class="profile-menu">
                  <div class="vertical-menu">
                    <ul class="vertical-menu__inner">
                      <li class="vertical-menu__item" v-if="isMobile">
                        <button class="vertical-menu__link" @click="showMsg">
                          <svgIcon icon="icon-bell-full"></svgIcon>
                          <span>{{ $t('站内信息') }}</span>
                          <i class="vertical-menu__notify" v-if="$store.state.messageUnreadCount > 0">{{
                            $store.state.messageUnreadCount }}</i>
                        </button>
                      </li>
                      <li class="vertical-menu__item">
                        <button class="vertical-menu__link" @click="accountChange">
                          <svgIcon icon="icon-account"></svgIcon>
                          <span>{{ $t('帐户') }}</span>
                        </button>
                      </li>
                      <li class="vertical-menu__item">
                        <button class="vertical-menu__link" @click="url('/transactions')">
                          <svgIcon icon="icon-transaction"></svgIcon>
                          <span>{{ $t('交易') }}</span>
                        </button>
                      </li>
                      <li class="vertical-menu__item" @click="url('/game-history')">
                        <button class="vertical-menu__link">
                          <svgIcon icon="icon-history"></svgIcon>
                          <span>{{ $t('游戏历史') }}</span>
                        </button>
                      </li>
                      <li class="vertical-menu__item">
                        <button class="vertical-menu__link" @click="url('/sessions')">
                          <svgIcon icon="icon-sessions"></svgIcon>
                          <span>{{ $t('登录日志') }}</span>
                        </button>
                      </li>
                      <li class="vertical-menu__item">
                        <button class="vertical-menu__link" @click="cardClick">
                          <svgIcon icon="icon-transaction"></svgIcon>
                          <span>{{ $t('卡片管理') }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <el-button type="button" :loading="loginOutLoading" class="loginout_btn"
                  @click="loginOut">
                  <span class="button__text">{{ $t('登出') }}</span>
                </el-button>
              </div>
            </div>
      </div>
      <div class=" flex items-center gap-x3" v-else>
        <el-button class="login_btn " @click="login(1)">{{ $t('登录') }}</el-button>
        <el-button class="login_btn signin_btn" @click="login(2)">{{ $t('注册') }}</el-button>
      </div>
    </header>
    <!-- recycleBin1 -->
    <!-- recycleBin1 -->
    <!-- card admin -->
    <el-dialog v-if="$store.state.userInfo" :modal-append-to-body="false" :visible.sync="dialogVisibleCard"
      custom-class="custom-dialog card-dialog">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('卡片管理') }}</h1>
        </div>
        <div class="header-right">
          <el-button type="primary" class="button_blue" size="mini" @click="showAddAccount" v-if="(activeTab == $t('银行卡') && myBank.length > 0) ||
            (activeTab == $t('USDT') && myUsdt.length > 0) ||
            (activeTab == $t('电子钱包') && myWallet.length > 0) ||
            (activeTab == $t('PIX') && myPix.length > 0)
            ">{{ $t('添加账户') }}</el-button>
        </div>
      </div>
      <div class="total__inner site-card-tab">
        <el-tabs v-model="activeTab">
          <template v-for="paytypeItem in paytype">
            <el-tab-pane v-if="paytypeItem == $t('银行卡')" :label="$t('银行卡')" :name="$t('银行卡')">
              <swiper v-if="myBank.length > 0" class="swiper swiper-card" :options="swiperCard" ref="swiperCard">
                <swiper-slide v-for="(item, index) in myBank" :key="`myBank${index}`">
                  <div class="admin-card bank-card">
                    <div class="bank-title">
                      <span class="iconfont icon-bankcard"></span>
                      <span>{{ item.bank_hm }} <i style="font-size:12px;">({{ item.currency_code }})</i> </span>
                    </div>
                    <div class="bank-val">**** **** **** **** {{ item.bankcrad }}</div>
                    <div class="bank-name">{{ item.bank_name }}</div>
                  </div>
                </swiper-slide>
              </swiper>
              <el-button class="button_blue content-add-button" v-else size="large" @click="showAddAccount">{{ $t("添加账户")
              }}</el-button>
            </el-tab-pane>
            <el-tab-pane v-if="paytypeItem == $t('USDT')" :label="$t('USDT')" :name="$t('USDT')">
              <swiper v-if="myUsdt.length > 0" class="swiper swiper-card" :options="swiperCard" ref="swiperCard">
                <swiper-slide v-for="(item, index) in myUsdt" :key="`myUsdt${index}`">
                  <div class="admin-card usdt-card">
                    <div class="bank-title">
                      <span class="iconfont icon-USDT"></span>
                      <span>{{ item.bank_name }}</span>
                    </div>
                    <div class="bank-val">**** **** **** **** {{ item.bankcrad }}</div>
                  </div>
                </swiper-slide>
              </swiper>
              <el-button class="button_blue content-add-button" v-else size="large" @click="showAddAccount">{{ $t("添加账户")
              }}</el-button>
            </el-tab-pane>

            <el-tab-pane v-if="paytypeItem == $t('电子钱包')" :label="$t('电子钱包')" :name="$t('电子钱包')">
              <swiper v-if="myWallet.length > 0" class="swiper swiper-card" :options="swiperCard" ref="swiperCard">
                <swiper-slide v-for="(item, index) in myWallet" :key="`myWallet${index}`">
                  <div class="admin-card elec-card">
                    <div class="bank-title">
                      <span class="iconfont icon-qianbao"></span>
                      <span>{{ $t('电子钱包') }}</span>
                    </div>
                    <div class="bank-val">**** **** **** **** {{ item.bankcrad }}</div>
                  </div>
                </swiper-slide>
              </swiper>
              <el-button class="button_blue content-add-button" v-else size="large" @click="showAddAccount">{{ $t("添加账户")
              }}</el-button>
            </el-tab-pane>

            <el-tab-pane v-if="paytypeItem == $t('PIX')" :label="$t('PIX')" :name="$t('PIX')">
              <swiper v-if="myPix.length > 0" class="swiper swiper-card" :options="swiperCard" ref="swiperCard">
                <swiper-slide v-for="(item, index) in myPix" :key="`myPix${index}`">
                  <div class="admin-card pix-card">
                    <div class="bank-title">
                      <span class="iconfont icon-jinbi"></span>
                      <span>{{ $t('PIX') }}</span>
                    </div>
                    <div class="bank-val">**** **** **** **** {{ item.bankcrad }}</div>
                  </div>
                </swiper-slide>
              </swiper>
              <el-button class="button_blue content-add-button" v-else size="large" @click="showAddAccount">{{ $t("添加账户")
              }}</el-button>
            </el-tab-pane>
          </template>

        </el-tabs>
      </div>
    </el-dialog>
    <!-- add card -->
    <el-dialog v-if="$store.state.userInfo" :visible.sync="bankshow" custom-class="custom-dialog "
      :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('添加銀行卡') }}</h1>
        </div>
      </div>
      <div class="modal__body">
        <div class="form__body">
          <!-- <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{$t('币种')}}</span>
                <el-select v-model="bankCurrencyId">
                  <el-option
                    v-for="item in allCurrency"
                    :key="item.id"
                    :label="item.country_code"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div> -->
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{ $t('戶名') }}</span>
                <el-input clearable v-model="KaihuName" :placeholder="$t('輸入戶名')"></el-input>
              </div>
            </div>
          </div>
          <div class="input-block el-m-b-15" v-if="bankNameList && bankNameList.length > 0">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{ $t('銀行名稱') }}</span>
                <el-select v-model="BankName" :placeholder="$t('请选择')">
                  <el-option v-for="(item, index) in bankNameList" :key="index" :label="item.bank_name"
                    :value="item.bank_name">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="input-block el-m-b-15" v-else>
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{ $t('銀行名稱') }}</span>
                <el-input clearable v-model="BankName" :placeholder="$t('輸入銀行名稱')"></el-input>
              </div>
            </div>
          </div>
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input input_md">
                <span class="input__label">{{ $t('銀行帳戶') }}</span>
                <el-input type="number" clearable v-model="BankNumber" :placeholder="$t('輸入銀行帳戶')"></el-input>
              </div>
            </div>
          </div>

          <div class="input-block el-m-b-15" v-if="bankFinancial == 1">
            <div class="input-block__body">
              <div class="input input_md">
                <span class="input__label">{{ $t('金融代碼') }}</span>
                <el-input clearable v-model="BankFinancialNumber" :placeholder="$t('輸入金融代碼')"></el-input>
              </div>
            </div>
          </div>
          <div class="input-block el-m-b-15" v-if="isBankOpen == 1">
            <div class="input-block__body">
              <div class="input input_md">
                <span class="input__label">{{ $t('開戶行') }}</span>
                <el-input clearable v-model="BankIsBankOpen" :placeholder="$t('輸入開戶行')"></el-input>
              </div>
            </div>
          </div>

          <div class="btn_wrap">
            <el-button :loading="$store.state.bottonLoading" class="button_red button_fullwidth" @click="addBankCar(0)">{{
              $t('添加') }}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- add elec -->
    <el-dialog v-if="$store.state.userInfo" :visible.sync="elecshow" custom-class="custom-dialog "
      :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('添加電子錢包') }}</h1>
        </div>
      </div>
      <div class="modal__body">
        <div class="form__body">
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{ $t('開戶名') }}</span>
                <el-input clearable v-model="elecName" :placeholder="$t('輸入開戶名')"></el-input>
              </div>
            </div>
          </div>
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{ $t('錢包號碼') }}</span>
                <el-input clearable v-model="elecNumber" :placeholder="$t('輸入錢包號碼')"></el-input>
              </div>
            </div>
          </div>
          <div class="btn_wrap">
            <el-button :loading="$store.state.bottonLoading" class="button_red button_fullwidth" @click="addBankCar(2)">{{
              $t('添加') }}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- add usdt -->
    <el-dialog v-if="$store.state.userInfo" :visible.sync="usdtshow" custom-class="custom-dialog "
      :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('添加USDT') }}</h1>
        </div>
      </div>
      <div class="modal__body">
        <div class="form__body">
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{ $t('收幣地址') }}</span>
                <el-input clearable v-model="usdtUrl" :placeholder="$t('輸入收幣地址')"></el-input>
              </div>
            </div>
          </div>
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <span class="input__label">{{ $t('鏈名稱') }}</span>
                <el-select v-model="usdtNameValue" :placeholder="$t('選擇鏈名稱')" style="width: 100%;"
                  popper-class="dw-popper-class" :disabled="this.caterange.length < 2">
                  <template #prefix>
                    <div class="select-pre" v-if="caterange.find(item => item.name == usdtNameValue)">
                      <img width="20" height="20" :src="caterange.find(item => item.name == usdtNameValue).img"
                        class="currency__icon" />
                    </div>
                  </template>
                  <el-option v-for="(item, index) in caterange" :key="index" :label="item.name" :value="item.name">
                    <button class="dropdown-menu__link">
                      <span class="currency is-wallet">
                        <img width="20" height="20" :src="item.img" alt="ETH" class="currency__icon" />
                        <span class="currency__label">{{ item.name }}</span>
                      </span>
                    </button>
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="btn_wrap">
            <el-button :loading="$store.state.bottonLoading" class="button_red button_fullwidth" @click="addBankCar(1)">{{
              $t('添加') }}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- add pix -->
    <el-dialog v-if="$store.state.userInfo" :visible.sync="pixshow" custom-class="custom-dialog "
      :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('添加PIX') }}</h1>
        </div>
      </div>
      <div class="modal__body">
        <div class="form__body">
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input address_input input_md">
                <div class="input__label">{{ $t('開戶名') }}</div>
                <el-input clearable v-model="pixName" :placeholder="$t('輸入開戶名')"></el-input>
              </div>
            </div>
          </div>
          <div class="input-block el-m-b-15">
            <div class="input__label">{{ $t('金鑰類型') }}</div>
            <div class="card-wrap">
              <div class="card-items" :class="pixTypeValue === item.name ? 'active' : ''" v-for="item in pixType"
                :key="`pixType${item.value}`" @click="pixTypeValue = item.name">
                {{ $t(`${item.name}`) }}
              </div>
            </div>

            <!-- <div class="input-block__body">
              <div class="input address_input input_md">
             <div class="input__label">{{ $t('金鑰類型') }}</div>
                <el-select
                  v-model="pixTypeValue"
                  :placeholder="$t('選擇金鑰類型')"
                  popper-class="dw-popper-class"
                >
                  <el-option
                    v-for="item in pixType"
                    :key="`pixType${item.value}`"
                    :label="item.name"
                    :value="item.name"
                  >
                    <button class="dropdown-menu__link">
                      <span class="currency__label">{{item.name}}</span>
                    </button>
                  </el-option>
                </el-select>
              </div>
            </div> -->
          </div>
          <div class="input-block el-m-b-15">
            <div class="input-block__body">
              <div class="input input_md">
                <div class="input__label">{{ $t('鑰匙' + pixTypeValue) }}</div>
                <el-input clearable v-model="pixNumber" :placeholder="$t('輸入鑰匙' + pixTypeValue)"
                  :class="pixTypeValue == 'Phone' ? 'input-key' : ''">
                  <span slot="prefix" class="phone-label" v-if="pixTypeValue == 'Phone'">+55</span>
                </el-input>
              </div>
            </div>
          </div>
          <div class="btn_wrap">
            <el-button :loading="$store.state.bottonLoading" class="button_red button_fullwidth" @click="addBankCar(3)">{{
              $t('添加') }}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 渲染FORM表单 -->
    <div class v-if="payInfo">
      <div v-html="payInfo.form"></div>
    </div>
    <wallet @setting="cardClick" :withdrawalRules="withdrawal_rules" :userWithdrawalAmount="user_withdrawal_amount"
      :wtRnum="wtRnum" :wtMinimum="wtMinimum" :ver_withdrawal_first="ver_withdrawal_first" :wtHighest="wtHighest" @ConfirmWithdrawal="finish" :bankAll="bankAll"
      :allUsdt="allUsdt" :dep_address="dep_address" :allBank="[...allBank, ...allPix]"
      :wtAllBank="[...wtAllPix, ...wtAllBank]" :wtAllUsdt="wtAllUsdt" :rechargeList="rechargeList" ref="wallet"></wallet>

    <twoFa ref="twofa" @enter="verifyEnter"></twoFa>
    <forget ref="forget" @back="login"></forget>
    <thirdTransferOut v-if="$store.state.userInfo"></thirdTransferOut>
    <LoginModal ref="loginModal" @close="LoginLoadingClose"></LoginModal>
    <verify ref="verify" @enter="verifyEnter"></verify>
    <message ref="message"></message>
  </div>
</template>
<script>
import svgIcon from "@/components/svg.vue";
import twoFa from "@/components/twoFa.vue";
import verify from "@/components/verify.vue";
import forget from "@/components/forget.vue";
import thirdTransferOut from "@/components/thirdTransferOut.vue";
import LoginModal from "@/components/LoginModal";
import wallet from "@/components/wallet/index.vue";
import { EventBus } from "@/common/eventBus.js";
import message from "@/components/message.vue";
import VueQr from 'vue-qr'
import {
  my_info_api,
  my_logout_api
} from "@/api/index";
import {
  recharge_get_all_api,
  recharge_apply_api,
  message_unread_api,
  bank_my_api,
  withdraw_limit_api,
  recharge_parame_api,
  withdraw_apply_api,
  team_statprofit0_api,
  team_statprofit1_api,
  team_statprofit2_api,
  bank_lists_api,
  bank_add_api
} from "@/api/user";
import { game_statistics_api, game_order_api } from "@/api/cybSports";
export default {
  components: {
    svgIcon,
    twoFa,
    forget,
    thirdTransferOut,
    LoginModal,
    verify,
    wallet,
    message,
    VueQr
  },
  props: {
    flagShow: {
      type: Boolean,
      default: true
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      withdrawal_rules: "",
      user_withdrawal_amount: "",
      dep_address2: '',
      loginOutLoading: false, //退出加载状态
      head_userInfo: null, //用户信息
      msgShow: false,
      isShow: false,
      userShow: false,
      ver_withdrawal_first:0,
      // switch
      walletCur: 0,
      walletTabs: [
        {
          icon: "icon-arrow-down-full",
          name: "充值"
        },
        {
          icon: "icon-arrow-up-full",
          name: "提现"
        }
        // {
        //   icon: "icon-wallet-account",
        //   name: "地址薄"
        // }
      ],
      // recharge slect
      dialogVisible: false,
      dep_address: "",
      dep_qrcode: "",
      dwToggle: "USDT",
      // withdraw
      withdrawAddress: "",
      Amount: "",
      Balance: "0.0",

      /* profile */
      dialogVisible2: false,
      // details
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
      detShow: false,
      bankAll: null, //所有平台收款信息
      allBankInfo: [], //组合线上线下银行卡
      allBank: [], //银行卡
      allUsdt: [], //USDT
      allWallet: [], //电子钱包
      allPix: [], //PIX
      allRechangeChannel: {},
      rechargeList: [],
      depositType: 0,
      rechargeListValue: "",
      rechargeFilter: false,
      rechargeCarFilter: false,
      rechargeCarType: "",
      showRechargeRate: 0, //是否显示汇率
      bankId: 0,
      usdt_type: "",
      rechargeType: 0,
      usdt_bank_name: "",
      depositInfo: null,
      rechargePrice: "", //充值金额
      payInfo: "", //线上充值渲染表单
      withdrawList: [],
      withdrawListValue: "",
      wtRpersent: "",
      service_charge: "",
      usdt_charge: "",
      mShowStatus: null,
      wtBankList: [],
      wtAllBank: [],
      wtAllUsdt: [],
      wtAllWallet: [],
      wtAllPix: [],
      allWithdrawChannel: [],
      isDataShow: null,
      isUsdt: null,
      withdrawFilter: false,
      withdrawCarFilter: true,
      currency_defa: 0,
      currency_type: 0,
      withdrawal_rate: 0,
      wtBankid: 0,
      wtRnum: 0, //今日剩余数量
      wtMinimum: 0, //最低提现金额
      wtHighest: 0, //最高提现金额
      curWithdrawInfo: null,
      withdrawPrice: "",
      // ========================
      // 卡片管理
      // 假数据
      dialogVisibleCard: false,
      bankshow: false,
      KaihuName: "",
      BankName: "",
      BankNumber: "",
      elecshow: false,
      elecName: "",
      elecNumber: "",
      usdtshow: false,
      usdtUrl: "",
      caterange: [],
      usdtNameValue: "",
      pixshow: false,
      pixName: "",
      pixType: [],
      pixTypeValue: "",
      allCurrency: null,
      bankCurrencyId: '',
      pixNumber: "",
      activeTab: "",
      swiperCard: {
        slidesPerView: "auto",
        slidesPerGroup: 3,
        spaceBetween: 16
      },
      teamStatprofitCount0: "0.00",
      teamStatprofitCount1: "0.00",
      teamStatprofitCount2: "0.00",
      gameStatistics: {
        total_price: "0.00",
        total_winprice: "0.00",
        total_loss: "0.00"
      },
      head_currentPage: 1,
      listTotal: 0,
      gameOrderList: [],
      gameOrderListPage: 1,
      settlement: 0,
      paytype: [],
      withdrawFlag: true, //判断是否有卡片
      myBankList: [],
      myBank: [],
      myUsdt: [],
      myWallet: [],
      myPix: [],
      bankFinancial: 0,
      isBankOpen: 0,
      BankIsBankOpen: "",
      BankFinancialNumber: "",
      addAct: "",
      verify_code: "",
      addBankCarI: null,
      withdrawPwdQ: "",
      isOnlineRecharge: false,
      isUsdtRecharge: false,
      updateStatus: false,
      bankNameList: [],
      mlogo: process.env.VUE_APP_M_SITE_LOGO,
      logo: process.env.VUE_APP_SITE_LOGO,
    };
  },
  methods: {
    calc(num1, num2) {
      const num = parseInt(num1 / num2 * 100) || 0
      return (num > 100 ? 100 : num)
    },
    accountChange() {
      this.url("/account");
    },
    verifyShow(type, code) {
      this.verify_code = "";
      this.$refs.verify.show(type, code);
    },
    verifyClose() {
      this.verify_code = "";
      this.$refs.verify.close();
    },
    verifyEnter(code, type) {
      if (type === "bankcard_check") {
        this.verify_code = code;
        this.verify_code && this.addBankCar(this.addBankCarI);
      } else if (type === "withdrawal_check") {
        this.verify_code = code;
        this.verify_code && this.finish(this.withdrawPwdQ);
      }
    },
    showAddAccount() {
      console.log('显示添加银行卡')
      this.bankshow = this.activeTab === this.$t('银行卡');
      this.elecshow = this.activeTab === this.$t('电子钱包');
      this.usdtshow = this.activeTab === this.$t('USDT');
      this.pixshow = this.activeTab === this.$t('PIX');
    },
    async addBankCar(i) {
      // console.log(this.$store.state)
      this.addBankCarI = i;
      let parm = {};
      if (i == 0) {
        // if (!this.bankCurrencyId) {
        //   this.errorTips("请选择币种");
        //   return;
        // }
        if (this.KaihuName == "") {
          this.errorTips("輸入戶名");
          return;
        }
        if (this.BankName == "") {
          this.errorTips("輸入銀行名稱");
          return;
        }
        if (this.BankNumber == "") {
          this.errorTips("輸入銀行帳戶");
          return;
        }
        parm = {
          bank_type: 0,
          currency_id: this.bankCurrencyId,
          bank_name: this.BankName,
          bank_number: this.BankNumber,
          bank_open: this.BankIsBankOpen,
          bank_hm: this.KaihuName,
          financial: this.BankFinancialNumber,
          withdrawal_psd: "",
          verify_code: this.verify_code
        };
      } else if (i == 1) {
        if (this.usdtNameValue == "") {
          this.errorTips("選擇鏈名稱");
          return;
        }
        if (this.usdtUrl == "") {
          this.errorTips("輸入收幣地址");
          return;
        }
        parm = {
          bank_type: 1,
          bank_name: this.usdtNameValue,
          bank_number: this.usdtUrl,
          bank_open: "",
          bank_hm: this.usdtNameValue,
          withdrawal_psd: "",
          verify_code: this.verify_code
        };
      } else if (i == 2) {
        if (this.elecName == "") {
          this.errorTips("輸入開戶名");
          return;
        }
        if (this.elecNumber == "") {
          this.errorTips("輸入錢包號碼");
          return;
        }
        parm = {
          bank_type: 2,
          bank_name: this.elecName,
          bank_hm: this.elecName,
          bank_number: this.elecNumber,
          bank_open: "",
          withdrawal_psd: "",
          verify_code: this.verify_code
        };
      } else if (i == 3) {
        if (this.pixName == "") {
          this.errorTips("輸入開戶名");
          return;
        }
        if (this.pixTypeValue == "") {
          this.errorTips("選擇金鑰類型");
          return;
        }
        if (this.pixNumber == "") {
          this.errorTips("輸入鑰匙");
          return;
        }
        parm = {
          bank_type: 3,
          bank_name: this.pixTypeValue,
          bank_hm: this.pixName,
          bank_number: this.pixNumber,
          financial: "",
          withdrawal_psd: "",
          verify_code: this.verify_code
        };
      }
      if(this.verify_code){
        parm.check_type = this.$store.state.userInfo.mail?2:1
      }else{
        parm.check_type = 0
      }
      this.$store.commit("$vuexSetBottonLoadingState", true);
      await bank_add_api(parm).then(response => {
        let res = response.data;
        if (res.code == 1) {
          this.successTips(res.msg);
          this.getBankMyList();
          this.bankshow = false;
          this.usdtshow = false;
          this.elecshow = false;
          this.pixshow = false;
          this.verifyClose();
        } else if (res.code == 110 || res.code == 120 || res.code == 130) {
          this.verify_code && this.errorTips(res.msg);
          this.verifyShow("bankcard_check", res.code);
        } else {
          this.verifyClose();
          this.errorTips(res.msg);
        }
        this.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },

    async getBankMyList() {
      this.myBank = [];
      this.myWallet = [];
      this.myUsdt = [];
      this.myPix = [];
      await bank_my_api({ bank_type: "all" }).then(res => {
        if (res && res.data.code == 1) {
          this.myBankList = res.data.data;
          let arr = res.data.data;
          for (let i in arr) {
            if (arr[i].bank_type == 0) {
              this.myBank.push(arr[i]);
            } else if (arr[i].bank_type == 1) {
              this.myUsdt.push(arr[i]);
            } else if (arr[i].bank_type == 2) {
              this.myWallet.push(arr[i]);
            } else {
              this.myPix.push(arr[i]);
            }
          }
        }
      });
    },
    async getBankLists() {
      await bank_lists_api().then(response => {
        let res = response.data;
        if (res && res.code == 1) {
          this.bankNameList = res.data.bank_list[0];
          this.allCurrency = res.data.all_currency;
          for (const key in this.allCurrency) {
            if (Object.hasOwnProperty.call(this.allCurrency, key)) {
              const element = this.allCurrency[key];
              if (element['country_code'] == this.$helper.getLang()) {
                this.bankCurrencyId = element['id'];
              }
            }
          }
          // console.log(this.bankCurrencyId, this.$helper.getLang(), this.allCurrency)
          let paytype_obj = res.data.paytype;
          let paytype_arr1 = [];
          for (var a in paytype_obj) {
            paytype_arr1.push(paytype_obj[a]);
          }
          this.paytype = paytype_arr1;
          this.activeTab = this.$t(this.paytype[0])
          let usdtType = res.data.usdt_type;
          this.caterange = []
          for (let i in usdtType) {
            this.caterange.push({
              value: i,
              name: usdtType[i]
            });
            this.caterange.forEach(item => {
              if (item.name.includes("TRC")) {
                item.img = require('@/assets/images/TRC20.png')
              }
              if (item.name.includes("ERC")) {
                item.img = require('@/assets/images/ERC20.png')
              }
            })
          }
          if (this.caterange.length == 1) {
            this.usdtNameValue = this.caterange[0].value
          }
          let arr = res.data.pix_type;
          this.pixType = []
          for (let i in arr) {
            this.pixType.push({
              value: i,
              name: arr[i]
            });
          }
          this.pixTypeValue = this.pixType[0].name
        }
      });
    },
    selectChange(e) {
      for (let i in this.detOptions) {
        if (this.detOptions[i].value == e) {
          this.settlement = this.detOptions[i].settlement;
          this.gameOrderListPage = 1;
          this.head_currentPage = 1;
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
        settlement: this.settlement,
        isday: 0
      }).then(res => {
        if (res && res.data.code == 1) {
          this.gameOrderList = res.data.data;
          this.listTotal = res.data.total;
        }
        this.$store.commit("$vuexSetModuleLoadingState", false);
      });
    },
    // 获取游戏统计数据
    async getGameStatistics() {
      await game_statistics_api().then(res => {
        if (res && res.data.code == 1) {
          this.gameStatistics = res.data.data;
        }
      });
    },
    // 获取代理总收入
    async getTeamStatprofit0() {
      await team_statprofit0_api().then(res => {
        if (res && res.data.code == 1) {
          this.teamStatprofitCount0 = res.data.data.profit_count;
        }
      });
    },
    // 获取代理 今日-总收入
    async getTeamStatprofit1() {
      await team_statprofit1_api().then(res => {
        if (res && res.data.code == 1) {
          this.teamStatprofitCount1 = res.data.data.profit_count;
        }
      });
    },
    // 获取代理 昨日-总收入
    async getTeamStatprofit2() {
      await team_statprofit2_api().then(res => {
        if (res && res.data.code == 1) {
          this.teamStatprofitCount2 = res.data.data.profit_count;
        }
      });
    },
    cardClick() {
      this.getBankMyList();
      this.getBankLists();
      this.dialogVisibleCard = true;
      this.dialogVisible = false;
      this.userShow = false;
    },
    rechargeInputChange(e) {
      this.$nextTick(() => {
        this.rechargePrice = this.clearNoNum(e);
      });
    },
    wtInputChange(e) {
      this.$nextTick(() => {
        if (this.$store.state.wtIntNum) {
          this.withdrawPrice = this.clearIntegerNum(e);
        } else {
          this.withdrawPrice = this.clearNoNum(e);
        }
      });
    },
    async dialogVisibleChange() {
      if (this.isMobileFlag && this.$route.path!='/purse'){
        this.$router.push({
          path:'/purse'
        })
        return
      }
      this.$store.commit("$vuexSetLoadingWalletState", true);
      this.$refs.wallet.isLoading = true
      await this.rechargeGetAll();
      this.$refs.wallet.isLoading = false
      this.$store.commit("$vuexSetLoadingWalletState", false);
      this.$refs.wallet.show()
      // this.dialogVisible = true;
      this.getRechargeParame();
      this.getWithdrawLimit();
      this.getWithdrawList();
    },
    getRuleInfo() {
      var rule = this.$helper.get("rule");
      if (this.$helper.get("userformAvatar")) {
        this.$store.commit(
          "$vuexSetUserAvatarState",
          this.$helper.get("userformAvatar")
        );
      } else {
        this.$store.commit(
          "$vuexSetUserAvatarState",
          "https://0simg.s3.ap-southeast-1.amazonaws.com/storage/img/20221219/7eb0637d17840e0bef3df06c1e6b1c4c.png"
        );
        this.$helper.set(
          "userformAvatar",
          "https://0simg.s3.ap-southeast-1.amazonaws.com/storage/img/20221219/7eb0637d17840e0bef3df06c1e6b1c4c.png"
        );
      }
    },
    loginStatus() {
      if (this.$helper.get("tokenInfo")) {
        this.$store.commit("$vuexSetLoginState", true);
        this.$store.commit("$vuexUserInfo", this.$helper.get("userInfo"));
        this.head_userInfo = this.$store.state.userInfo;
        this.updateUserInfo();
      } else {
        this.$store.commit("$vuexSetLoginState", false);
      }
    },
    // 充值
    async rechargeSubmit() {
      var _this = this;
      if (_this.rechargePrice == "") {
        _this.errorTips('请输入充值个数');
      } else {
        _this.userRecharge();
      }
    },
    async userRecharge() {
      let parm1 = {
        type: this.rechargeType,
        pay_set_id: this.bankId,
        apply_price: this.rechargePrice,
        usdt_type: this.usdt_type
      };
      if (this.isOnlineRecharge) {
        this.$store.commit("$vuexSetBottonLoadingState", true);
        await recharge_apply_api(parm1).then(res => {
          if (res && res.data.code == 1) {
            this.$store.commit("$vuexSetBottonLoadingState", false);
            if (res.data.data.handle_type == "navto") {
              if (res.data.data.pay_url) {
                this.platUrl(res.data.data.pay_url);
              } else if (res.data.data.is_qrcode) {
                this.dep_address = res.data.data.address;
                this.dep_qrcode = res.data.data.qrcode_url;
              }
            } else {
              this.payInfo = res.data.data;
              this.$store.commit("$vuexSetBottonLoadingState", true);
              setTimeout(function () {
                this.$store.commit("$vuexSetBottonLoadingState", false);
                document.getElementById("paysubmit").submit();
              }, 1000);
            }
          } else {
            this.errorTips(res.data.msg);
          }
          this.$store.commit("$vuexSetBottonLoadingState", false);
        });
      } else {
        // 这里进行线下充值
        this.offLineSubmit();
      }
    },
    async offLineSubmit() {
      let parm2 = {
        type: this.rechargeType,
        bank_sk_id: this.bankId,
        apply_price: this.rechargePrice
      };
      this.$store.commit("$vuexSetBottonLoadingState", true);
      await recharge_apply_api(parm2).then(res => {
        if (res && res.data.code == 1) {
          // this.rechargeType = "";
          this.successTips(res.data.msg);
          // this.dialogVisible = false;
          this.dep_address = this.depositInfo.bank_number;
          this.dep_qrcode = this.depositInfo.bank_qrcode;
        } else {
          this.errorTips(res.data.msg);
        }
        this.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },
    // 获取未读消息数量
    async getMessageUnread() {
      await message_unread_api().then(res => {
        if (res && res.data.code == 1) {
          this.$store.commit("$vuexSetMessageUnreadCount", res.data.data.count);
        }
      });
    },
    // 获取充值账户
    async rechargeGetAll() {
      this.allBank = [];
      this.allUsdt = [];
      this.allWallet = [];
      this.allPix = [];
      this.rechargeList = [];
      this.allRechangeChannel = {};
      await recharge_get_all_api().then(res => {
        if (res && res.data.code == 1) {
          this.bankAll = res.data.data;
          // 根据接口拼接线上线下数据
          this.allBankInfo = res.data.data.offline.concat(res.data.data.online);
          for (let i in this.allBankInfo) {
            if (!this.allRechangeChannel[this.allBankInfo[i].type]) {
              this.allRechangeChannel[this.allBankInfo[i].type] = new Array();
            }
            this.allRechangeChannel[this.allBankInfo[i].type].push(
              this.allBankInfo[i]
            );
            // 获取银行卡
            if (this.allBankInfo[i].type == 0) {
              this.allBank.push(this.allBankInfo[i]);
              this.allBank.forEach(item => {
                item.img = require("../assets/images/bankcard.svg")
              });
            }
            // 获取USDT
            if (this.allBankInfo[i].type == 1) {
              this.allUsdt.push(this.allBankInfo[i]);
              this.allUsdt.forEach(item => {
                if (item.pay_name) {
                  if (item.pay_name.includes("TRC")) {
                    item.img = require("../assets/images/TRC20.png")
                  }
                }
                if (item.bank_name) {
                  if (item.bank_name.includes("ERC20")) {
                    item.img = require("../assets/images/erc20.svg")
                  }
                }
              });
            }
            // 获取电子钱包
            if (this.allBankInfo[i].type == 2) {
              this.allWallet.push(this.allBankInfo[i]);
            }
            // 获取PIX
            if (this.allBankInfo[i].type == 3) {
              this.allPix.push(this.allBankInfo[i]);
            }
          }
          this.$nextTick(() => {
            if (this.allPix.length > 0) {
              this.rechargeList.unshift({
                name: this.$t("PIX"),
                uname: "pix",
                img: require("../assets/images/bankcard.svg"),
                depositType: 3
              });
              this.depositType = 3;
            }
            if (this.allWallet.length > 0) {
              this.rechargeList.unshift({
                name: this.$t("电子钱包"),
                uname: "wallet",
                img: require("../assets/images/bankcard.svg"),
                depositType: 2
              });
              this.depositType = 2;
            }
            if (this.$store.state.rechargeOrder == 2) {
              if (this.allUsdt.length > 0) {
                this.rechargeList.unshift({
                  name: this.$t("USDT"),
                  uname: "usdt",
                  img: require("../assets/images/usdt.svg"),
                  depositType: 1
                });
                this.depositType = 1;
              }
              if (this.allBank.length > 0) {
                this.rechargeList.unshift({
                  name: this.$t("银行卡"),
                  uname: "bank",
                  img: require("../assets/images/bankcard.svg"),
                  depositType: 0
                });
                this.depositType = 0;
              }
            } else {
              if (this.allBank.length > 0) {
                this.rechargeList.unshift({
                  name: this.$t("银行卡"),
                  uname: "bank",
                  img: require("../assets/images/bankcard.svg"),
                  depositType: 0
                });
                this.depositType = 0;
              }
              if (this.allUsdt.length > 0) {
                this.rechargeList.unshift({
                  name: this.$t("USDT"),
                  uname: "usdt",
                  img: require("../assets/images/usdt.svg"),
                  depositType: 1
                });
                this.depositType = 1;
              }
            }
            if (this.rechargeList.length > 0) {
              this.rechargeListChange(this.rechargeList[0].name);
            }
            this.currency_defa = res.data.data.currency_defa; //货币类型
          });
        }
      }).catch(function (error) {
        this.errorTips(error);
      });
    },
    getWithdrawList() {
      this.withdrawList = [];
      this.wtBankList = [];
      this.wtAllBank = [];
      this.wtAllUsdt = [];
      this.wtAllWallet = [];
      this.wtAllPix = [];
      this.allWithdrawChannel = [];

      bank_my_api({ bank_type: "all" }).then(res => {
        if (res && res.data.code == 1) {
          this.wtBankList = res.data.data;
          for (let i in this.wtBankList) {
            if (!this.allWithdrawChannel[this.wtBankList[i].bank_type]) {
              this.allWithdrawChannel[
                this.wtBankList[i].bank_type
              ] = new Array();
            }
            this.allWithdrawChannel[this.wtBankList[i].bank_type].push(
              this.wtBankList[i]
            );
            // 获取银行卡
            if (this.wtBankList[i].bank_type == 0) {
              this.wtAllBank.push(this.wtBankList[i]);
              this.wtAllBank.forEach(item => {
                item.img = require("../assets/images/bankcard.svg")
              });
              if (this.wtAllBank.length > 0) {
                this.withdrawFlag = false;
              } else {
                this.withdrawFlag = true;
              }
            }
            // 获取USDT
            if (this.wtBankList[i].bank_type == 1) {
              this.wtAllUsdt.push(this.wtBankList[i]);
              this.wtAllUsdt.forEach(item => {
                if (item.bank_name.includes("TRC")) {
                  item.img = require("../assets/images/TRC20.png")
                }
              })
            }
            // 获取电子钱包
            if (this.wtBankList[i].bank_type == 2) {
              this.wtAllWallet.push(this.wtBankList[i]);
            }
            // 获取PIX
            if (this.wtBankList[i].bank_type == 3) {
              this.wtAllPix.push(this.wtBankList[i]);
            }

          }
          this.$nextTick(() => {
            if (this.wtAllPix.length > 0) {
              this.withdrawList.unshift({
                name: this.$t("PIX"),
                keys: "pix",
                img: require("../assets/images/bankcard.svg"),
                mShowStatus: 3
              });
              this.wtRpersent = this.service_charge + "%";
              this.mShowStatus = 3;
            }
            if (this.wtAllWallet.length > 0) {
              this.withdrawList.unshift({
                name: this.$t("电子钱包"),
                keys: "wallet",
                img: require("../assets/images/bankcard.svg"),
                mShowStatus: 2
              });
              this.wtRpersent = this.service_charge + "%";
              this.mShowStatus = 2;
            }
            if (this.wtAllBank.length > 0) {
              this.withdrawList.unshift({
                name: this.$t("银行卡"),
                img: require("../assets/images/bankcard.svg"),
                keys: "bank",
                mShowStatus: 0
              });
              this.wtRpersent = this.service_charge + "%";
              this.mShowStatus = 0;
            }
            if (this.wtAllUsdt.length > 0) {
              this.withdrawList.unshift({
                name: this.$t("USDT"),
                keys: "usdt",
                img: require("../assets/images/usdt.svg"),
                mShowStatus: 1
              });
              this.wtRpersent = this.usdt_charge + "%";
              this.mShowStatus = 1;
            }
          });

          if (this.withdrawList.length > 0) {
            this.isDataShow = 1;
            if (
              this.currency_type == 0 &&
              (this.withdrawList[0].keys == "bank" ||
                this.withdrawList[0].keys == "pix" ||
                this.withdrawList[0].keys == "wallet")
            ) {
              this.isUsdt = 0;
            } else if (
              this.currency_type == 1 &&
              (this.withdrawList[0].keys == "bank" ||
                this.withdrawList[0].keys == "pix" ||
                this.withdrawList[0].keys == "wallet")
            ) {
              this.isUsdt = 1;
            } else if (
              this.currency_type == 0 &&
              this.withdrawList[0].keys == "usdt"
            ) {
              this.isUsdt = 1;
            } else if (
              this.currency_type == 1 &&
              this.withdrawList[0].keys == "usdt"
            ) {
              this.isUsdt = 0;
            }
          } else {
            this.isDataShow = 0;
          }
        }
        this.$store.commit("$vuexSetModuleLoadingState", false);
      });
    },
    getWithdrawLimit() {
      withdraw_limit_api().then(res => {
        if (res && res.data.code == 1) {
          // withdrawal_rules提现规则，1才有可提现金额
          // user_withdrawal_amount：可提现金额
          this.service_charge = res.data.data.service_charge;
          this.usdt_charge = res.data.data.usdt_charge;
          this.wtRnum = res.data.data.day_limit;
          this.wtMinimum = res.data.data.min_amount;
          this.wtHighest = res.data.data.max_amount;
          this.withdrawal_rules = res.data.data.withdrawal_rules;
          this.user_withdrawal_amount = res.data.data.user_withdrawal_amount;
          this.ver_withdrawal_first = res.data.data.ver_withdrawal_first
        }
      });
    },
    getRechargeParame() {
      recharge_parame_api().then(res => {
        if (res && res.data.code == 1) {
          this.currency_type = res.data.data.currency_type;
          this.bankFinancial = res.data.data.bank.financial_status;
          this.isBankOpen = res.data.data.is_bank_open;
        }
        // console.log(res.data)
      });
    },
    menuClick() {
      this.$emit("menuClick", this.flagShow);
    },
    showMsg() {
      this.userShow = false
      if (this.msgShow) {
        this.$refs.message.hide();
      } else {
        this.$refs.message.show();
      }
      this.msgShow = !this.msgShow;
      // EventBus.$emit("msgFlag", this.msgShow);
    },
    userToggle() {
      this.userShow = !this.userShow;
    },

    // 鼠标移除事件
    mouseleave() {
      // 判断当前平台是否为pc端，因为苹果浏览器也有这个时间
      const dev = /(Win32|Win16|WinCE|Mac68K|MacIntel|MacIntel|MacPPC|Linux mips64)/i.test(navigator.platform);
      if (dev) {
        //电脑
        this.userToggle()
      }
    },

    url(url) {
      this.$router.push({
        path: url
      });
      this.userToggle();
    },
    // wallet弹窗
    async walletTab(e) {
      this.rechargeFilter = false;
      this.withdrawFilter = false;
      this.$store.commit("$vuexSetRechargeCarNameState", "");
      this.$store.commit("$vuexSetWithdrawCarNameState", "");
      this.walletCur = e;
      if (e == 0) {
        this.rechargeCarFilter = false;
        this.rechargeListValue = "";
        if (this.rechargeList.length > 0) {
          this.rechargeListChange(this.rechargeList[0].name);
        }
      } else {
        this.withdrawCarFilter = true;
        this.withdrawListValue = "";
        if (this.withdrawList.length > 0) {
          this.wtChange(this.withdrawList[0].name);
        }
      }
    },
    closeWallet() {
      this.walletCur = 0;
      this.rechargeFilter = false;
      this.withdrawFilter = false;
      this.rechargeCarFilter = false;
      this.withdrawCarFilter = false;
      this.rechargeListValue = "";
      this.withdrawListValue = "";
      this.dep_address = "";
      this.rechargePrice = "";
      this.$store.commit("$vuexSetRechargeCarNameState", "");
      this.$store.commit("$vuexSetWithdrawCarNameState", "");
    },
    rechargeListChange(e) {
      this.dep_address = "";
      this.rechargeCarFilter = false;
      this.$store.commit("$vuexSetRechargeCarNameState", "");
      this.dwToggle = e
      for (let i in this.rechargeList) {
        if (this.rechargeList[i].name == e) {
          this.rechargeFilter = true;
          this.depositType = this.rechargeList[i].depositType;
          this.rechargeListValue = this.rechargeList[i].name;
          if (this.allRechangeChannel[this.depositType].length > 1) {
            if (this.depositType == 1) {
              if (this.allRechangeChannel[this.depositType][1]) {
                this.rechargeListTypeChange(
                  this.allRechangeChannel[this.depositType][1],
                  this.depositType
                );
              }
            } else {
              if (this.allRechangeChannel[this.depositType][0]) {
                this.rechargeListTypeChange(
                  this.allRechangeChannel[this.depositType][0],
                  this.depositType
                );
              }
            }
          } else {
            if (this.allRechangeChannel[this.depositType][0]) {
              this.rechargeListTypeChange(
                this.allRechangeChannel[this.depositType][0],
                this.depositType
              );
            }
          }
          break;
        }
      }
    },
    rechargeListTypeChange(e, i) {
      this.rechargeCarFilter = true;
      // 是否为线上收款
      // 线上类型为：1，2，5，7
      // 线下类型为：0，3，4，6
      this.isOnlineRecharge = e.pay_type == 1 || e.pay_type == 2 || e.pay_type == 7 || e.pay_type == 5;
      // 2 为线上USDT充值。 3为线下充值
      this.isUsdtRecharge = e.pay_type == 2 || e.pay_type == 3;
      // 卡片选择
      if (this.isOnlineRecharge) {
        this.$store.commit("$vuexSetRechargeCarNameState", e.pay_name);
      } else {
        this.$store.commit("$vuexSetRechargeCarNameState", e.bank_name);
      }
      // 获取卡片信息
      this.bankId = e.id;
      this.usdt_type = e.usdt_type;
      this.rechargeType = e.pay_type;
      this.usdt_bank_name = e.bank_name;
      this.depositInfo = e;
      this.dep_address = ''
    },
    withdrawListTypeChange(e) {
      // console.log(e)
      this.curWithdrawInfo = e;
      this.withdrawCarFilter = false;
      this.withdrawal_rate = 0;
      this.wtBankid = e.id;
      this.withdrawal_rate = e.withdrawal_rate;
      if (e.pay_type == 1 || e.pay_type == 2) {
        this.$store.commit("$vuexSetWithdrawCarNameState", e.pay_name);
      } else {
        this.$store.commit("$vuexSetWithdrawCarNameState", e.bank_name);
      }
    },
    async finish(e, bank_id, w_price,phone,code) {
      if (bank_id) {
        this.wtBankid = bank_id
        this.withdrawPrice = w_price
      }
      this.withdrawPwdQ = e;
      this.$store.commit("$vuexSetBottonLoadingState", true);
      let parm = {
        bank_id: this.wtBankid,
        w_price: this.withdrawPrice,
        first_withdrawal_code:code,
        ispass: "1",
        phone,
        verify_code: this.verify_code
      };
      await withdraw_apply_api(parm).then(res => {
        if (res && res.data.code == 1) {
          this.successTips(res.data.msg);
          this.verifyClose();
          this.getWithdrawLimit();
          this.reduceUserBalance(this.withdrawPrice);
          this.withdrawPrice = '';
          this.$refs.wallet.hide()
        } else if (res && (res.data.code == 110 || res.data.code == 120 || res.data.code == 130)) {
          this.verify_code && this.errorTips(res.data.msg);
          this.verifyShow("withdrawal_check", res.data.code);
          this.$store.commit("$vuexSetBottonLoadingState", false);
          return;
        } else {
          this.verifyClose();
          this.errorTips(res.data.msg);
        }
        this.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },
    // 申请提现
    withdrawChange() {
      if (this.withdrawPrice > 0) {
        this.finish();
      } else {
        this.errorTips('请输入正确提款金额');
      }
    },
    allPrice() {
      if (this.$store.state.wtIntNum) {
        this.withdrawPrice = this.clearIntegerNum(this.$store.state.userInfo.balance);
      } else {
        this.withdrawPrice = this.$store.state.userInfo.balance;
      }
    },
    wtChange(e) {
      for (let i in this.withdrawList) {
        if (this.withdrawList[i].name == e) {
          this.withdrawFilter = true;
          this.mShowStatus = this.withdrawList[i].mShowStatus;
          this.withdrawListValue = this.withdrawList[i].name;
          if (this.allWithdrawChannel[this.mShowStatus][0]) {
            this.withdrawListTypeChange(
              this.allWithdrawChannel[this.mShowStatus][0]
            );
          }
          break;
        }
      }
    },
    onCopy: function () {
      this.successTips('Copy success');
    },
    myProfile() {
      this.userShow = false;
      this.dialogVisible2 = true;
      this.getGameStatistics();
      this.getTeamStatprofit0();
      this.getTeamStatprofit1();
      this.getTeamStatprofit2();
    },
    LoginLoadingClose() {
      this.getRuleInfo();
      this.loginStatus();
    },
    async getUserInfo() {
      await my_info_api().then(res => {
        if (res && res.data.code == 1) {
          this.$helper.set("userInfo", res.data.data);
          this.$store.commit("$vuexUserInfo", res.data.data);
          this.head_userInfo = this.$store.state.userInfo;
          this.$helper.set("userformAvatar", this.$store.state.userInfo.head_img);
          this.$store.commit("$vuexSetUserAvatarState", this.$store.state.userInfo.head_img);
          if (this.isSport) {
            location.reload();
          }
        }
      });
    },
    // 退出
    async loginOut() {
      this.loginOutLoading = true;
      this.$helper.rm("userInfo");
      await my_logout_api().then(res => {
        if (res && res.data.code == 1) {
          this.userShow = false;
          this.$helper.rm("tokenInfo");
          this.$helper.rm("userInfo");
          this.$store.commit("$vuexSetLoginState", false);
          this.$store.commit("$vuexUserInfo", null);
          this.$message({
            customClass: "successMessage",
            showClose: false,
            message: this.$t("已成功退出当前账号"),
            center: true,
            type: "success",
            duration: "1000",
            onClose: () => {
              this.goUrl('/');
            }
          });
        } else {
          this.errorTips("失败");
        }
        this.loginOutLoading = false;
        this.$helper.rm("tipStorage");
      });
    },
    login(type) {
      this.$refs.loginModal.show(type);
    },
    showDetailToggle() {
      this.detShow = !this.detShow;
      if (this.detShow) {
        this.getGameOrder();
      }
    },
    mountChange() {
      // 分享码
      if (this.$route.query.share_code) {
        this.$helper.set('share_code', this.$route.query.share_code);
      }
      // 广告渠道ID
      if (this.$route.query.acid) {
        this.$helper.set('acid', this.$route.query.acid);
      }
      let rule = this.$helper.get("rule");
    },

    listenModal() {
      if (
        !this.$store.state.isLoginStatu &&
        this.$route.query.modal === "LoginRegistration"
      ) {
        if (this.$route.query.data == "tab-0") {
          this.login(1);
        } else if (this.$route.query.data == "tab-1") {
          this.login(2);
        }
      }
    },
    infoUpdate() {
      var _this = this;
      _this.updateStatus = true,
        setTimeout(function () {
          _this.updateStatus = false
          _this.getMessageUnread()
          _this.updateUserInfo()
        }, 2000)
    },
    closeUserPanel() {
      document.addEventListener("click", e => {
        const iconEl = document.querySelector(".dropdown__inner");
        if (iconEl && !iconEl.contains(e.target)) {
          this.userShow = false;
        }
      });
    }

  },
  mounted() {

    this.loginStatus();
    this.getRuleInfo();
    this.listenModal();
    if (this.$route.query.dialog === 'wallet' && this.$store.state.isLoginStatu) {
      this.dialogVisibleChange()
    }
    // this.loginStatus();
    // this.getRuleInfo();
    this.mountChange();
    this.getRechargeParame()
    if (this.$store.state.isLoginStatu) {
      this.getMessageUnread();
    }
    this.listenModal();
    this.closeUserPanel()
    EventBus.$on('cardClick',(e)=>{
      console.log(e);
      console.log('bus-----------------------');
      this.cardClick()
    })
  },

  computed: {
    isSport() {
      return this.$route.name === 'sportbets' || this.$route.name === 'sportbetting' || this.$route.name === 'sportdetail';
    },
    myData() {
      return this.$store.state.Openback;
  }

  },
  watch: {
    $route(to, from) {
      this.listenModal();
      if (to.query.dialog === 'wallet') {
        this.dialogVisibleChange()
      }
      if (this.msgShow) {
        this.showMsg();
      }
    },
    // 是否重新拉取数据
    "$store.state.walletGetData": async function (e) {
      this.dialogVisibleChange()
    },
    myData(newdata,olddata){
      if(olddata){
        this.cardClick()
      }
      this.$store.state.Openback = false
    }
  },
  beforeDestroy() {
    EventBus.$off('cardClick')
  }
};
</script>

<style scoped lang="less">
.header__left-block{
  display: flex;
  align-items: center;
}
.login_btn{
  background: linear-gradient(180deg,#F2F047,#8DFF01);
  box-shadow: 0 4px 0 #4A8204;
  color:#fff;
  position: relative;
  overflow: hidden;
}

.login_btn::after{
  content: "";
  display: block;
  position: absolute;
  height: 110%;
  width: 20px;
  background: linear-gradient(to right,rgba(255,255,255,.1),rgba(255,255,255,1),rgba(255,255,255,0.5));
  transform: rotate(6deg);
  top:-5%;
  left: -20px;
  opacity: 0;
  animation: button_animate_after 2s infinite;
}
.signin_btn{

  background: linear-gradient(180deg,#FE9B08,#C72600);
  box-shadow: 0 4px 0 #652E06;
}
.button_animate_reg::after{
  animation-delay: 1s;
}
@keyframes button_animate_after {
  0%{
    opacity: 0;
  }30%{
    opacity: .8;
  }60%{
    opacity: 0;
  }100%{
    opacity: 0;
    left:calc(100% + 20px);
  }
}

@keyframes button_animate {
  0%{
    transform: translateY(0);
    box-shadow: 0 4px 0 var(--shadow-color);
  }50%{
    transform: translateY(-4px);
    box-shadow: 0 6px 0 var(--shadow-color2);
  }100%{
    transform: translateY(0);
    box-shadow: 0 4px 0 var(--shadow-color);
  }
}
</style>

<style scoped lang="less">
.el-casino-nav {
  border-radius: 14px;
  overflow: hidden;
  background-color: #202a39;
  border-bottom: 0 !important;
}
.nav-img{
  display:flex ;
  align-items: center;
  gap:2px;
  margin: -10px 0px;
}
.header_img{
  height: 50px;
  object-fit: contain;
  bottom: 3px;
  @media(max-width:768px){
    max-width: 139px;
  }
}
.el-casino-nav::after {
  display: none;
}

.el-casino-nav>.el-menu-item,
.el-casino-nav>.el-menu-item:hover {
  height: 30px;
  line-height: 30px;
  color: #93acd3;
  background-color: #202a39;
  border-bottom: 0 !important;
  border-radius: 30px !important;
}

.el-casino-nav>.el-menu-item.isActive {
  background-color: #db1de7;
  color: #ffffff;
  border-bottom: 0 !important;
}

.el-casino-nav .iconfont {
  margin-right: 5px;
}

.currency {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.balance-wrapper {
  background-color: #202a39;
  padding-right: 12px;
  padding-left: 6px;
}

@media(max-width:768px) {
  .balance-wrapper {
    padding-right: 6px;
    padding-left: 4px;
    font-size: 12px;
  }
}

.balance-wrapper {
  margin-right: -22px;
  border-radius: 10px 0 0 10px;
}

.balance__currency-wrap {
  height: 40px;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.currency__icon {
  flex-shrink: 0;
  margin-right: 0.5em;
}

.user__inner img {
  width: 32px;
  height: 32px;
  border-radius: 43px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  display: block;
  max-width: none;
}

.profile-wrapper {
  margin-left: 20px;
  position: relative;
}

.profile-wrapper i {
  border-radius: 10px;
  position: absolute;
  top: -6px;
  right: -40px;
  background-color: #1bb83d;
  font-family: Numbers, Montserrat;
  font-style: normal;
  white-space: nowrap;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 2px 6px;
}

.dropdown__trigger-custom {
  padding: 2px;
  border-radius: 20px;
  background-color: #202a39;
  padding-right: 8px;
}

.dropdown__trigger-custom>span.text,
.dropdown__trigger>span.text {
  text-overflow: ellipsis;
  overflow-x: hidden;
}

@-webkit-keyframes spinAround-data-v-877fdee8 {
  0% {
    transform: rotate(0);
  }

  to {
    transform: rotate(359deg);
  }
}

@keyframes spinAround-data-v-877fdee8 {
  0% {
    transform: rotate(0);
  }

  to {
    transform: rotate(359deg);
  }
}

@media screen and (min-color-index: 0) and (-webkit-min-device-pixel-ratio: 0) {
  .button span {
    text-overflow: clip !important;
    overflow-x: visible !important;
    overflow-x: initial !important;
  }
}

// .menu-fade-enter-active,
// .menu-fade-leave-active {
//   transition: opacity 0.1s ease-in-out, height 0.1s ease-in-out,
//     padding 0.1s ease-in-out;
//   overflow: hidden;
// }

// .menu-fade-enter,
// .menu-fade-leave-to {
//   opacity: 0;
//   padding: 0 !important;
//   height: 0 !important;
// }

.top-enter-active {
  transition: all 0.1s ease-in-out 0.3s;
}
.avatar01{
  display: block;
  @media screen and (max-width:768px){
    display: none;
  }
}
.top-leave-active {
  transition: all 0.05s ease-in-out 0s;
}

.top-enter,
.top-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.bottom-enter-active {
  transition: all 0.1s ease-in-out 0.3s;
}

.bottom-leave-active {
  transition: all 0.05s ease-in-out 0s;
}

.bottom-enter,
.bottom-leave-to {
  transform: translateY(5px);
  opacity: 0;
}

.left-enter-active {
  transition: all 0.1s ease-in-out 0.3s;
}

.left-leave-active {
  transition: all 0.05s ease-in-out 0s;
}

.left-enter,
.left-leave-to {
  transform: translateX(-5px);
  opacity: 0;
}

.right-enter-active {
  transition: all 0.1s ease-in-out 0.3s;
}

.right-leave-active {
  transition: all 0.05s ease-in-out 0s;
}

.right-enter,
.right-leave-to {
  transform: translateX(5px);
  opacity: 0;
}

.dropdown-top-enter-active {
  transition: all 0.1s ease-in-out;
}

.dropdown-top-leave-active {
  transition: all 0.05s ease-in-out;
}

.dropdown-top-enter,
.dropdown-top-leave-to {
  transform: translateY(-5px) !important;
  opacity: 0;
}

.dropdown-bottom-enter-active {
  transition: all 0.1s ease-in-out;
}

.dropdown-bottom-leave-active {
  transition: all 0.05s ease-in-out;
}

.dropdown-bottom-enter,
.dropdown-bottom-leave-to {
  transform: translateY(5px) !important;
  opacity: 0;
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

.dropdown__trigger-custom>div.icon,
.dropdown__trigger>div.icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown__trigger-custom>div.icon svg,
.dropdown__trigger>div.icon svg {
  fill: #93acd3;
  width: 100%;
  height: 100%;
}

.dropdown__trigger-custom>div.icon img,
.dropdown__trigger>div.icon img {
  width: 73%;
}

.dropdown__trigger-custom>span.text,
.dropdown__trigger>span.text {
  flex: 1 1;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.dropdown__trigger {
  background-color: #1c2532;
  border-color: #1c2532;
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

.dropdown_sm .dropdown__trigger-custom>div.icon,
.dropdown_sm .dropdown__trigger>div.icon {
  margin-left: -3.2px;
  margin-right: 2px;
  width: 16px;
  height: 16px;
}

.dropdown_sm .dropdown__trigger-custom>span.text,
.dropdown_sm .dropdown__trigger>span.text {
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

.dropdown_sm .dropdown__content {
  padding: 7px;
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

.dropdown_md .dropdown__trigger-custom>div.icon,
.dropdown_md .dropdown__trigger>div.icon {
  margin-left: -4px;
  margin-right: 3px;
  width: 20px;
  height: 20px;
}

.dropdown_md .dropdown__trigger-custom>span.text,
.dropdown_md .dropdown__trigger>span.text {
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

.dropdown_md .dropdown__content {
  padding: 9px;
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

.dropdown_lg .dropdown__trigger-custom>div.icon,
.dropdown_lg .dropdown__trigger>div.icon {
  margin-left: -4.8px;
  margin-right: 6px;
  width: 24px;
  height: 24px;
}

.dropdown_lg .dropdown__trigger-custom>span.text,
.dropdown_lg .dropdown__trigger>span.text {
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

.dropdown_lg .dropdown__content {
  padding: 12px;
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

.dropdown_xl .dropdown__trigger-custom>div.icon,
.dropdown_xl .dropdown__trigger>div.icon {
  margin-left: -6.4px;
  margin-right: 6px;
  width: 32px;
  height: 32px;
}

.dropdown_xl .dropdown__trigger-custom>span.text,
.dropdown_xl .dropdown__trigger>span.text {
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

.dropdown_xl .dropdown__content {
  padding: 18px;
}

.profile-wrapper {
  margin-left: 20px;
  position: relative;
}

@media (max-width: 768px) {
  .profile-wrapper {
    margin-left: 10px;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .profile-wrapper {
    margin-left: 10px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .profile-wrapper {
    margin-left: 10px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .profile-wrapper {
    margin-left: 10px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .profile-wrapper {
    margin-left: 10px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .profile-wrapper {
    margin-left: 10px;
  }
}

.profile-wrapper i {
  border-radius: 10px;
  position: absolute;
  top: -6px;
  right: -40px;
  background-color: #1bb83d;
  font-family: Numbers, Montserrat;
  font-style: normal;
  white-space: nowrap;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  padding: 2px 6px;
}

.dropdown__inner {
  min-width: 240px;
}

.dropdown__trigger,
.dropdown__trigger-custom {
  border-radius: 20px;
  background-color: #202a39;
  padding-right: 8px;
}

.dropdown__trigger-custom .icon-arrow,
.dropdown__trigger .icon-arrow {
  right: 8px !important;
  margin-left: 0 !important;
}

.dropdown__trigger-custom .dropdown__content,
.dropdown__trigger .dropdown__content {
  min-width: 240px;
  background-color: #1c2532;
  padding: 12px;
}

@media (max-width: 1100px) {
  .dropdown__trigger {
    padding-right: 0;
  }
}

.profile {
  display: flex;
  position: relative;
  flex-direction: column;
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.profile__arc,
.profile__avatar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.profile-menu {
  margin-bottom: 8px;
}

.vip-label {
  background: linear-gradient(260deg, #ffb636, #ff5c00 90%);
  border-radius: 16px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  padding: 1px 6px 1px 3px;
}

.vip-label svg {
  transform: scale(1.4);
}

.vip-label span {
  font-weight: 600;
  font-size: 11px;
}

.admin-label {
  background: linear-gradient(282.86deg, #ff7e20 0.69%, #e20000 109.18%);
  border-radius: 16px;
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  padding: 1px 6px;
}

.admin-label span {
  font-weight: 600;
  font-size: 11px;
}

.vertical-menu {
  padding: 6px 2px;
}

.vertical-menu__link {
  position: relative;
  -moz-appearance: none;
  -webkit-appearance: none;
  text-decoration: none;
  align-items: center;
  display: inline-flex;
  vertical-align: middle;
  justify-content: flex-start;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  font-size: 14px;
  border-radius: 10px;
  padding: 6px;
  color: #93acd3;
  width: 100%;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
}

.vertical-menu__link svg {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.vertical-menu__link.active,
.vertical-menu__link:focus,
.vertical-menu__link:hover {
  color: #fff;
}

.vertical-menu__icon {
  margin-right: 8px;
  fill: #55657e;
}

.vertical-menu__notify {
  position: relative !important;
  top: auto !important;
  right: auto !important;
  margin-left: 4px;
  color: #fff;
}

.profile-preview {
  padding-top: 8px;
  margin-bottom: 9px;
}

.profile-preview,
.profile-preview__userpick {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-preview__userpick {
  margin-bottom: 4px;
}

.profile-preview__userpick span {
  font-weight: 700;
  font-size: 12px;
  padding: 2px 9px;
  line-height: 1;
  background-color: #ed1d49;
  border-radius: 8px;
  position: relative;
  margin-top: -3px;
  outline: 2px solid #1c2532;
}

.profile-preview__name {
  font-weight: 600;
  font-size: 16px;
}

.profile-progress {
  margin-bottom: 8px;
}

.profile-progress__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  margin-bottom: 4px;
}

.profile-progress__head span {
  font-weight: 600;
  font-size: 11px;
  color: #93acd3;
}

.profile-progress__inner-wapper {
  background-color: #2a3546;
  border-radius: 12px;
  padding: 10px 0;
}

.profile-progress__inner {
  padding: 6px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
}

.profile-progress__inner>div {
  display: block;
}

.profile-progress__inner span {
  font-weight: 600;
  font-size: 11px;
  color: #fff;
  margin: -4px 0 -4px 4px;
}

.profile-progress__inner img {
  width: 11px;
  height: 11px;
  position: relative;
  z-index: 2;
  margin: -4px 0 -4px -5px;
}

.profile-menu {
  background-color: #2a3546;
  border-radius: 12px;
}

/* currany */

.balance-dropdown .no-data-image {
  display: block;
  margin: 16px auto 5px;
}

.balance-dropdown__head {
  margin-bottom: 12px;
}

.balance-dropdown__body {
  position: relative;
}

.balance-dropdown__body:after,
.balance-dropdown__body:before {
  z-index: 1;
  content: "";
  left: 0;
  right: 4px;
  height: 6px;
  position: absolute;
  pointer-events: none;
}

.balance-dropdown__body:before {
  top: 0;
  background: linear-gradient(0deg, rgba(28, 37, 50, 0), #1c2532);
}

.balance-dropdown__body:after {
  bottom: 0;
  background: linear-gradient(180deg, rgba(28, 37, 50, 0), #1c2532);
}

.balance-dropdown__body ul {
  max-height: 220px;
  overflow-y: auto;
  position: relative;
  margin-left: -9px;
}

.balance-dropdown__body li {
  display: flex;
  align-items: center;
  height: 40px;
  white-space: nowrap;
  cursor: pointer;
  border-left: 4px solid transparent;
  padding-left: 16px;
  transition: border-left-color 0.1s ease-in-out;
}

.balance-dropdown__body li:hover {
  border-left-color: #3a07f2;
}

.balance-dropdown__body li:hover .coin_label {
  color: #fff;
}

.balance-dropdown__body li:focus {
  outline: none;
}

.balance-dropdown__body li span {
  font-weight: 600;
  font-size: 12px;
  color: #55657e;
}

.balance-dropdown__body li .coin_label {
  margin-left: 8px;
  transition: all 0.1s;
}

.balance-dropdown__body p {
  font-size: 14px;
  text-align: center;
  color: #55657e;
  padding: 12px 0;
  margin: 0 0 12px;
  border-bottom: 1px solid #334259;
}

.balance-dropdown__body .no-data-image+p {
  margin: 0 0 22px;
  border-bottom: none;
  padding: 0;
}

.balance-dropdown__footer {
  padding-top: 16px;
  position: relative;
}

.balance-dropdown__footer .balance-dropdown__fiat-btn {
  position: absolute;
  right: 40px;
  top: 13px;
  margin-right: 5px;
}

.balance-dropdown__footer .toggle__label {
  gap: 0;
  grid-gap: 0;
}

.balance-dropdown__footer .toggle:not(:last-of-type) {
  margin-bottom: 15px;
}

.balance-dropdown__sport-currency {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.balance-dropdown__sport-label {
  letter-spacing: -0.02em;
  font-weight: 600;
  line-height: 20px;
  font-size: 12px;
  color: #93acd3;
  margin: 0;
}

.balance-dropdown__sport-btns {
  display: flex;
}

.balance-dropdown__sport-btns .balance-dropdown__sport-btn:first-child {
  border-radius: 8px 0 0 8px;
  right: -3px;
}

.balance-dropdown__sport-btns .balance-dropdown__sport-btn:last-child {
  border-radius: 0 8px 8px 0;
}

.balance-dropdown__sport-btns .balance-dropdown__sport-btn--active {
  position: relative;
  z-index: 2;
}

.balance-dropdown__sport-btns .balance-dropdown__sport-btn--active:first-child,
.balance-dropdown__sport-btns .balance-dropdown__sport-btn--active:last-child {
  border-radius: 8px;
}

.balance-dropdown--top-currencies .toggle__label {
  color: #fff;
  font-size: 12px;
}

.balance-dropdown--top-currencies .currency {
  width: 100%;
}

.balance-dropdown--top-currencies .currency__label {
  margin-right: auto;
  font-size: 13px;
}

.balance-dropdown--top-currencies .balance-dropdown__head {
  margin-bottom: 6px;
}

.balance-dropdown--top-currencies .balance-dropdown__body:before {
  display: none;
}

.balance-dropdown--top-currencies .balance-dropdown__body ul {
  margin-left: 0;
}

.balance-dropdown--top-currencies .balance-dropdown__body li {
  margin-right: 4px;
  padding: 0 8px;
  color: #93acd3;
  border-left: none;
  /* text-transform: uppercase; */
  height: 50px;
}

.balance-dropdown--top-currencies .balance-dropdown__body li .currency__label {
  transition: all 0.2s;
}

.balance-dropdown--top-currencies .balance-dropdown__body li.is-active {
  border-radius: 6px;
  background-color: #293546;
}

.balance-dropdown--top-currencies .balance-dropdown__body li:first-of-type .currency__label,
.balance-dropdown--top-currencies .balance-dropdown__body li:hover .currency__label {
  color: #fff;
}

.balance-dropdown--top-currencies .balance-dropdown__body li:active .currency__label {
  color: #55657e;
}

.balance-dropdown--top-currencies .balance-dropdown__body li span {
  color: inherit;
}

.toggle {
  background-color: unset;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  width: 100%;
  color: #93acd3;
  cursor: pointer;
  transition: color 0.1s ease-in-out;
}

.balance-dropdown--top-currencies .balance-dropdown__footer {
  padding: 16px 12px;
  background-color: #202a39;
  margin: 0 -4px -4px;
}

.balance-dropdown--top-currencies .balance-dropdown__footer:after {
  content: "";
  width: 100%;
  height: 1px;
  background: rgba(183, 207, 255, 0.05);
  position: absolute;
  top: 0;
  left: 0;
}

.balance-dropdown--top-currencies .balance-dropdown__footer .balance-dropdown__fiat-btn {
  right: 50px;
}

.balance-wrapper .dropdown__content {
  padding: 2px !important;
  overflow: hidden;
}

/* dialog wallet */

.modal-depositwithdraw {
  background: #111923;
}

.modal-depositwithdraw .dropdown {
  z-index: 4;
}

.modal-depositwithdraw .modal__container {
  padding: 0;
  display: flex;
}

@media (max-width: 710px) {
  .modal-depositwithdraw .modal__container {
    display: block;
  }
}

@media (max-width: 420px) {
  .modal-depositwithdraw__balances .dropdown__inner {
    width: 300px;
  }
}

.modal-depositwithdraw__tabs {
  padding: 32px;
  width: 225px;
}

@media (max-width: 710px) {
  .modal-depositwithdraw__tabs {
    width: auto;
    padding: 32px 24px 0;
  }
}

.modal-depositwithdraw__body {
  position: relative;
  flex: 1 1;
  padding: 24px;
  background-color: #111923;
}

@media (max-width: 710px) {
  .modal-depositwithdraw__body {
    background-color: transparent;
  }
}

.modal-depositwithdraw__2fa-warning {
  z-index: 7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #111923;
  opacity: 0.95;
}

.modal-depositwithdraw__2fa-warning-text {
  margin-top: 8px;
  max-width: 220px;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
}

.modal-depositwithdraw__2fa-warning-bonus {
  max-width: 300px;
  text-align: center;
  margin-top: 8px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
}

.modal-depositwithdraw__2fa-warning-arrow,
.modal-depositwithdraw__2fa-warning-img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.modal-depositwithdraw__2fa-warning-arrow {
  position: absolute;
  bottom: 32px;
  left: 0;
}

@media (max-width: 576px) {
  .modal-depositwithdraw__2fa-warning-arrow {
    left: auto;
    right: 60px;
    bottom: 90px;
    transform: rotate(-85deg);
  }
}

.modal-depositwithdraw .select-chain__overlay {
  filter: none !important;
  position: absolute;
  background: rgba(17, 25, 35, 0.9);
  width: 100%;
  height: calc(100% - 90px);
  z-index: 10;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-depositwithdraw .select-chain__overlay span {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
}

@media(max-width:750px) {
  .modal-depositwithdraw .select-chain__overlay span {
    font-size: 16px;
  }
}

.modal-depositwithdraw .select-chain__overlay span button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  color: #fff;
  text-decoration: underline;
}

.modal-depositwithdraw .confirm_delete {
  filter: none !important;
  position: absolute;
  background: rgba(17, 25, 35, 0.9);
  width: 100%;
  height: 100%;
  z-index: 10;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal-depositwithdraw .confirm_delete h1 {
  color: #ed1d49;
  font-size: 24px;
}

.modal-depositwithdraw .confirm_delete span {
  color: #fff;
  font-size: 16px;
}

.modal-depositwithdraw .confirm_delete .row {
  margin-top: 20px;
}

.modal-depositwithdraw .confirm_delete .row .btn {
  width: 70px;
  height: 32px;
  justify-content: center;
}

.modal-depositwithdraw .confirm_delete .row .btn.btn_no {
  margin-left: 8px;
}

.modal-depositwithdraw .confirm_delete.confirm_success h1 {
  color: #1bb83d;
  font-size: 24px;
}

.modal-depositwithdraw .confirm_delete.confirm_success .btn {
  margin-top: 20px;
}

.tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tabs__body {
  display: flex;
  flex-direction: column;
  flex: 1 1;
}

@media (max-width: 710px) {
  .tabs__body {
    flex-direction: row;
    overflow-y: auto;
  }
}

.tabs__body button {
  margin-bottom: 4px;
}

@media (max-width: 710px) {
  .tabs__body button {
    margin-bottom: 0;
  }
}

.tabs__footer {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}

.body {
  height: 100%;
}

.body__title {
  z-index: 9;
  position: relative;
}

.body__title-add-wallet {
  display: flex;
  align-items: center;
}

.body__title-add-wallet span {
  margin-left: 15px;
}

.body__title-confirm-withdraw {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 500px) {
  .body__title-confirm-withdraw {
    flex-direction: column;
  }
}

.body .network_block {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.body .network_block .netwok_info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 5px;
}

.body .network_block .netwok_info span {
  font-size: 10px;
  color: #55657e;
}

.body .network_block .netwok_info h4 {
  margin: 0;
  font-size: 12px;
  color: #93acd3;
  font-weight: 500 !important;
}

.body__warning {
  display: flex;
  justify-content: center;
  border-top: 1px solid #1c2532;
  padding-top: 24px;
  margin-top: 24px;
}

.curencies {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 16px;
  -moz-column-gap: 16px;
  column-gap: 16px;
  margin-bottom: 16px;
  z-index: 11;
  position: relative;
  display: flex;
}

.curencies .fullwidth {
  justify-content: flex-start;
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

.tab_deposit {
  display: flex;
  flex-direction: column;
}

.tab_deposit .min_dep {
  background: #1c2532;
  border-radius: 8px;
  padding: 8px 10px;
  color: #fff;
  font-weight: 600;
  margin-bottom: 8px !important;
}

.tab_deposit__body {
  flex: 1 1;
}

.tab_deposit .dep_address .input {
  font-size: 13px;
}

.tab_deposit .ripple-tag-block {
  margin-top: 10px;
}

.tab_deposit .qr__block {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px 0;
}

.qr__block .button {
  width: 60%;
  border-radius: 30px;
}

.tab_deposit .qr__block .qr__texts {
  display: flex;
  flex-direction: column;
  font-size: 11px;
  color: #55657e;
}

.tab_deposit .qr__block .qr__texts p {
  margin-bottom: 0;
}

.tab_deposit .qr__block .qr {
  border-radius: 10px;
  padding: 5px;
  background: #fff;
  margin-left: 15px;
}

.modal-el-select ::v-deep .el-input--prefix .el-input__inner {
  padding-left: 35px;
}

/* .modal-el-select ::v-deep .el-input__inner {
  text-transform: uppercase;
} */

.dw-popper-class .el-select-dropdown__item {
  padding: 0;
  height: auto;
  line-height: unset;
  /* text-transform: uppercase; */
}

.el-select-dropdown__item.selected {
  border-radius: 8px;
}

.dw-popper-class .dropdown-menu__link {
  padding: 8px 10px;
  display: block;
  line-height: 0;
  /* text-transform: uppercase; */
}

.dw-popper-class .currency__label {
  margin-right: 10px;
}

.is-wallet .currency__label {
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  color: #93acd3;
}

.dropdown_is-error ::v-deep .el-input__inner {
  border: 2px solid #ed1d49;
}

.tab_withdraw {
  display: flex;
  flex-direction: column;
}

.tab_withdraw .input-block__label {
  color: #55657e;
  font-weight: 600;
}

.tab_withdraw .ripple-tag-block {
  margin-top: 15px;
}

.tab_withdraw .vertical-menu__link {
  padding: 0 8px 0 0;
  margin-bottom: 14px;
}

.tab_withdraw .address-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #202a39;
  height: 44px;
  width: 100%;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
  padding: 14px;
  transition: all 0.3s;
}

.tab_withdraw .address-item__title {
  color: #fff;
}

.tab_withdraw .address-item__address {
  color: #93acd3;
}

.tab_withdraw .address-item:hover {
  transform: scale(1.01);
}

.tab_withdraw .withdaraw_amounts {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

@media screen and (max-width: 500px) {
  .tab_withdraw .withdaraw_amounts {
    flex-direction: column;
    margin-top: 8px;
  }
}

.tab_withdraw .input-block-amount {
  margin-right: 15px;
  flex: 3;
}

@media screen and (max-width: 500px) {
  .tab_withdraw .input-block-amount {
    width: 100%;
    margin: 0;
  }
}

.tab_withdraw .input-block-balance {
  flex: 2;
}

@media screen and (max-width: 500px) {
  .tab_withdraw .input-block-balance {
    width: 100%;
    margin: 8px 0 0;
  }
}

.tab_withdraw .withdraw_info {
  margin-top: 12px;
}

.tab_withdraw .withdraw_info p {
  font-weight: 500;
  font-size: 11px;
}

@media screen and (max-width: 500px) {
  .tab_withdraw .withdraw_info p {
    margin-top: 1rem;
  }
}

.tab_withdraw .btn_wrap {
  display: flex;
  width: 100%;
}

.btn_wrap {
  margin-top: 15px;
}

.tab_withdraw .btn_wrap .mode_btns {
  display: flex;
}

.tab_withdraw .btn_wrap .mode_btns .slow {
  margin: 0 16px 0 4px;
}

.gray {
  color: #55657e;
}

.gray span {
  color: #93acd3;
}

.tab_withdraw .input-block-address .dropdown__content {
  background-color: #161f2c;
}

.tab_withdraw .input {
  font-size: 13px;
}

.tab_withdraw .balance_input .input {
  padding-left: 35px;
}

.tab_withdraw .btn_withdraw {
  min-height: 41px;
}

.tab_withdraw .input-block__tag--error .input__inner {
  border: 2px solid #ed1d49;
}

.tab_withdraw .input-block__tag--error .input__inner:hover {
  border: 2px solid #ed1d49 !important;
}

.input-suffix {
  display: flex;
  align-items: center;
  justify-items: center;
  height: 44px;
}

.input-block__body ::v-deep .el-input__suffix-inner {
  display: flex;
  flex-direction: row-reverse;
}

.total-info {
  padding: 16px 0;
}

.data-cards {
  display: flex;
  grid-gap: 12px;
  gap: 12px;
}

.chat-activity {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-activity .tooltip svg {
  transition: fill 0.15s linear;
  fill: #55657e;
}

.chat-activity .tooltip:hover svg {
  fill: #fff;
}

.chat-activity__status {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #93acd3;
  margin: 0;
}

.chat-activity__status-title {
  display: inline-block;
  margin-left: 6px;
  padding: 2px 8px;
  border-radius: 16px;
  color: #fff;
}

.chat-activity__status-title--rank-1 {
  background: #93acd3;
}

.chat-activity__status-title--rank-2 {
  background: #ffb636;
}

.chat-activity__status-title--rank-3 {
  background: #1bb83d;
}

.chat-activity__status-title--rank-4 {
  background: #3a07f2;
}

.chat-activity__status-title--rank-5 {
  background: #ed1d49;
}

.summary {
  display: flex;
  flex-direction: column;
}

.tips {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}

.tips__icon-hearth {
  fill: #ed1d49;
}

.divider {
  border-bottom: 1px solid #202a39;
  margin-top: 20px;
  margin-bottom: 20px;
}

.info {
  display: flex;
  align-items: flex-start;
  letter-spacing: -0.02em;
  grid-gap: 30px;
  gap: 30px;
  margin-bottom: 16px;
}

@media (max-width: 576px) {
  .info {
    flex-direction: column;
    grid-gap: 0;
    gap: 0;
    align-items: center;
    margin-bottom: 24px;
  }
}

.info+.divider {
  margin-top: 0;
}

.info__left {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}

.info .avatar {
  position: relative;
}

.info__vip-crown {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.info__avatar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.info__level {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 6px;
  border: 4px solid #111923;
  /* text-transform: uppercase; */
  line-height: 1;
  font-feature-settings: "tnum" on, "lnum" on;
  font-weight: 600;
  font-size: 11px;
  background-color: #ed1d49;
  color: #ffffff;
  border-radius: 50px;
}

.info__right {
  padding-right: 5px;
  width: 100%;
}

@media (max-width: 0) {
  .info__right {
    text-align: center;
  }
}

@media (max-width: 232px) {
  .opened-left-panel .info__right {
    text-align: center;
  }
}

@media (max-width: 325px) {
  .opened-right-panel .info__right {
    text-align: center;
  }
}

@media (max-width: 340px) {
  .opened-contests-panel .info__right {
    text-align: center;
  }
}

@media (max-width: 557px) {
  .opened-left-panel.opened-right-panel .info__right {
    text-align: center;
  }
}

@media (max-width: 572px) {
  .opened-left-panel.opened-contests-panel .info__right {
    text-align: center;
  }
}

.info__date {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #93acd3;
  margin-bottom: 0;
}

@media (max-width: 576px) {
  .info__date {
    text-align: center;
  }
}

@media (max-width: 808px) {
  .opened-left-panel .info__date {
    text-align: center;
  }
}

@media (max-width: 901px) {
  .opened-right-panel .info__date {
    text-align: center;
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .info__date {
    text-align: center;
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .info__date {
    text-align: center;
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .info__date {
    text-align: center;
  }
}

.info__name-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

@media (max-width: 576px) {
  .info__name-wrap {
    justify-content: center;
  }
}

@media (max-width: 808px) {
  .opened-left-panel .info__name-wrap {
    justify-content: center;
  }
}

@media (max-width: 901px) {
  .opened-right-panel .info__name-wrap {
    justify-content: center;
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .info__name-wrap {
    justify-content: center;
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .info__name-wrap {
    justify-content: center;
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .info__name-wrap {
    justify-content: center;
  }
}

.info__name {
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  margin-bottom: 0;
  max-width: 277px;
  overflow-y: hidden;
}

@media (max-width: 576px) {
  .info__name {
    font-size: 28px;
    line-height: 26px;
    max-width: 100%;
  }
}

@media (max-width: 808px) {
  .opened-left-panel .info__name {
    font-size: 28px;
    line-height: 26px;
    max-width: 100%;
  }
}

@media (max-width: 901px) {
  .opened-right-panel .info__name {
    font-size: 28px;
    line-height: 26px;
    max-width: 100%;
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .info__name {
    font-size: 28px;
    line-height: 26px;
    max-width: 100%;
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .info__name {
    font-size: 28px;
    line-height: 26px;
    max-width: 100%;
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .info__name {
    font-size: 28px;
    line-height: 26px;
    max-width: 100%;
  }
}

.info__vip-mark {
  display: flex;
  align-items: center;
  width: 53px;
  height: 24px;
  background: linear-gradient(255.53deg, #ffb636 -0.85%, #ff5c00 91.53%);
  border-radius: 16px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 0;
  margin-left: 8px;
}

.info__avatar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

h4 svg {
  color: #55657e;
  margin-right: 2px;
}

p {
  margin: 0;
}

.card {
  padding: 9px 16px;
  background: #161f2c;
  border-radius: 10px;
  flex-grow: 1;
  text-align: center;
}

.card-title {
  font-feature-settings: "tnum" on, "lnum" on;
  color: #55657e;
  letter-spacing: -0.02em;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

.statistic {
  margin-bottom: 16px;
}

.statistic__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.statistic__top-title {
  display: flex;
  align-items: center;
  margin: 0;
}

.statistic__top-title svg {
  width: 20px;
  height: 20px;
}

.link_md svg {
  width: 20px;
  height: 20px;
}

.statistic__bott {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  gap: 16px;
}

.total-info .icon-arrow {
  width: 20px;
  height: 20px;
}

@media (max-width: 550px) {
  .statistic__bott {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 550px) {
  .data-card:last-child {
    grid-column: 1/3;
  }
}

.stat-block {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
}

.has-height .body__inner,
.secondary-tab .tab-inner .body__inner {
  scrollbar-color: #2a3546 rgba(13, 19, 28, 0.8);
  scrollbar-width: thin;
  overflow-y: auto;
}

.has-height .body__inner::-webkit-scrollbar-track,
.secondary-tab .tab-inner .body__inner::-webkit-scrollbar-track {
  background-color: rgba(13, 19, 28, 0.8);
  border-radius: 2px;
}

.has-height .body__inner::-webkit-scrollbar,
.secondary-tab .tab-inner .body__inner::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: rgba(13, 19, 28, 0.8);
  border-radius: 2px;
}

.has-height .body__inner::-webkit-scrollbar-thumb,
.secondary-tab .tab-inner .body__inner::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: #2a3546;
}

.secondary-tab {
  text-align: left;
}

.favorite-games__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 0;
}

.favorite-games__top-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.favorite-games__wrap {
  display: flex;
  margin-top: 9px;
}

@media (max-width: 500px) {
  .favorite-games__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}

@media (max-width: 732px) {
  .opened-left-panel .favorite-games__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}

@media (max-width: 825px) {
  .opened-right-panel .favorite-games__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}

@media (max-width: 840px) {
  .opened-contests-panel .favorite-games__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}

@media (max-width: 1057px) {
  .opened-left-panel.opened-right-panel .favorite-games__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}

@media (max-width: 1072px) {
  .opened-left-panel.opened-contests-panel .favorite-games__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}

.favorite-games__preview {
  width: 100%;
  max-width: 113px;
  margin-right: 10px;
}

.favorite-games__preview:last-child {
  margin-right: 0;
}

@media (max-width: 500px) {
  .favorite-games__preview {
    max-width: 145px;
    width: 100%;
    margin-bottom: 10px;
  }

  .favorite-games__preview:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 732px) {
  .opened-left-panel .favorite-games__preview {
    max-width: 145px;
    width: 100%;
    margin-bottom: 10px;
  }

  .opened-left-panel .favorite-games__preview:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 825px) {
  .opened-right-panel .favorite-games__preview {
    max-width: 145px;
    width: 100%;
    margin-bottom: 10px;
  }

  .opened-right-panel .favorite-games__preview:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 840px) {
  .opened-contests-panel .favorite-games__preview {
    max-width: 145px;
    width: 100%;
    margin-bottom: 10px;
  }

  .opened-contests-panel .favorite-games__preview:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 1057px) {
  .opened-left-panel.opened-right-panel .favorite-games__preview {
    max-width: 145px;
    width: 100%;
    margin-bottom: 10px;
  }

  .opened-left-panel.opened-right-panel .favorite-games__preview:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 1072px) {
  .opened-left-panel.opened-contests-panel .favorite-games__preview {
    max-width: 145px;
    width: 100%;
    margin-bottom: 10px;
  }

  .opened-left-panel.opened-contests-panel .favorite-games__preview:nth-child(2n) {
    margin-right: 0;
  }
}

.favorite-games__preview .game-preview__btn-star {
  display: none;
}

.favorite-games__preview .game-preview__hover {
  padding-bottom: 30px;
}

.favorite-games__wagered-label {
  padding-top: 8px;
}

.favorite-games__wagered,
.favorite-games__wagered-label {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #55657e;
  margin-bottom: 0;
}

.favorite-games__wagered .currency {
  display: inline;
  display: initial;
}

.favorite-games__game-wrap {
  border-radius: 14px;
  background-color: #202a39;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 150px;
}

.favorite-games__all-games,
.favorite-games__game-wrap {
  display: flex;
  flex-direction: column;
}

.favorite-games__all-games .favorite-games__game-wrap {
  aspect-ratio: 0.755;
  height: auto;
}

@media (max-width: 500px) {
  .favorite-games__all-games .favorite-games__game-wrap {
    width: 145px;
    max-width: 100%;
  }
}

@media (max-width: 732px) {
  .opened-left-panel .favorite-games__all-games .favorite-games__game-wrap {
    width: 145px;
    max-width: 100%;
  }
}

@media (max-width: 825px) {
  .opened-right-panel .favorite-games__all-games .favorite-games__game-wrap {
    width: 145px;
    max-width: 100%;
  }
}

@media (max-width: 840px) {
  .opened-contests-panel .favorite-games__all-games .favorite-games__game-wrap {
    width: 145px;
    max-width: 100%;
  }
}

@media (max-width: 1057px) {
  .opened-left-panel.opened-right-panel .favorite-games__all-games .favorite-games__game-wrap {
    width: 145px;
    max-width: 100%;
  }
}

@media (max-width: 1072px) {
  .opened-left-panel.opened-contests-panel .favorite-games__all-games .favorite-games__game-wrap {
    width: 145px;
    max-width: 100%;
  }
}

.icon-dice {
  margin-bottom: 12px;
}

.button__icon {
  width: 24px;
  height: 24px;
}

.tabs-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  gap: 16px;
  margin-bottom: 24px;
}

.tabs-buttons .el-button {
  margin: 0;
}

/* 登录注册 */

.modal-intro:before {
  display: none;
}

.modal-intro .modal__container {
  padding: 0;
  display: flex;
}

.modal-intro__intro {
  width: 330px;
  min-height: 550px;
  text-align: center;
  padding: 40px 20px 0;
  background: url(../assets/images/bg-intro-bonus.png) no-repeat 50%,
    linear-gradient(180deg,
      rgba(237, 29, 73, 0.65),
      transparent 50%,
      rgba(1, 72, 160, 0.85));
  background-size: cover;
}

@media (max-width: 720px) {
  .modal-intro__intro {
    display: none;
  }
}

.modal-intro__intro-text {
  font-weight: 500;
  margin: 0;
  font-size: 18px;
  text-align: center;
}

.modal-intro__intro-title {
  font-weight: 900;
  font-size: 24px;
  line-height: 110%;
  letter-spacing: 0.02em;
  /* text-transform: uppercase; */
  color: #ffffff;
}

.modal-intro__intro-title--yellow {
  color: #fed700;
  white-space: nowrap;
}

.modal-intro__intro-label {
  display: inline-block;
  background-color: #fed700;
  box-shadow: 0 8.4px 16px -8.4px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 6px 10px;
  margin-bottom: 20px;
}

.modal-intro__intro-label-text {
  margin: 0;
  font-size: 12px;
  line-height: 110%;
  letter-spacing: 0.02em;
  /* text-transform: uppercase; */
  color: #150e3b;
  font-weight: 800;
}

.modal-intro__content {
  padding: 32px;
  width: 366px;
}

@media (max-width: 720px) {
  .modal-intro__content {
    width: 100%;
  }
}

.telegram_btn {
  overflow: hidden;
}

.telegram_auth {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  cursor: pointer;
  opacity: 0.01;
  width: 40px;
  height: 40px;
}

@media (max-width: 400px) {
  .modal-login .modal-intro__content {
    padding: 30px;
  }
}

.modal-login__head {
  margin-bottom: 24px;
}

.modal-login__body {
  flex: 1 1;
}

.modal-login__body .hint {
  font-size: 11px;
  color: #55657e;
  line-height: 1.2;
}

.modal-login__bonus {
  position: relative;
  margin-bottom: 20px;
}

.modal-login__bonus-text {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 18px;
  text-align: center;
  font-weight: 900;
  font-size: 22px;
  line-height: 110%;
  letter-spacing: 0.02em;
  /* text-transform: uppercase; */
}

.modal-login__bonus-text--yellow {
  color: #fed700;
  white-space: nowrap;
}

.modal-login__inputs {
  margin-bottom: 16px;
}

.modal-login .checkbox,
.modal-login__inputs .input:not(:last-child) {
  margin-bottom: 10px;
}

.modal-login__footer p {
  margin: 0;
  font-size: 11px;
}

.modal-login__footer button {
  padding: 0;
  border: 0;
  color: #3a07f2;
  text-decoration: underline;
}

.modal-login__footer button:hover {
  text-decoration: none;
}

.captcha,
form [type="submit"] {
  margin-top: 16px;
}

form label span {
  font-size: 11px;
  color: #55657e;
  line-height: 1.2;
}

form a {
  font-size: 11px;
}

.login-variants {
  margin-top: 24px;
  margin-bottom: 16px;
}

.login-variants__row {
  display: flex;
  transition: opacity 0.1s ease-in-out;
  margin-top: 8px;
}

.login-variants__row:hover .variant__btn {
  opacity: 0.5;
}

.login-variants__row .variant__btn:hover {
  opacity: 1;
}

.login-variants__label {
  color: #55657e;
  font-size: 11px;
}

.login-variants button {
  margin-right: 8px;
}

.variant {
  position: relative;
  flex-wrap: wrap;
}

.variant,
.variant__btn {
  display: flex;
  justify-content: center;
}

.variant__btn {
  width: 44px;
  height: 44px;
  text-align: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.variant__btn.bg_telegram {
  background-color: #37aee2;
  padding: 0;
}

.variant__btn.bg_gmail {
  background-color: #fff;
}

.variant__btn.bg_tron {
  background-color: #ec0928;
}

.variant__btn.bg_tron svg {
  width: 30px;
  height: 30px;
}

.variant__btn.bg_metamask {
  background-color: #fff;
}

.variant__btn.bg_binance {
  background-color: #1e2025;
}

.variant__btn.bg_coin98 {
  background-color: #d9b432;
}

.variant__btn svg {
  transform: translateZ(0);
}

.variant__tooltip {
  pointer-events: none;
  position: absolute;
  bottom: calc(100% + 8px);
  font-weight: 500;
  font-size: 9px;
  color: #55657e;
  background-color: #202a39;
  border-radius: 100px;
  padding: 2px 5px;
  opacity: 0;
  transform: translateY(50%);
  white-space: nowrap;
  margin-left: -8px;
  transition: transform 0.1s ease-in-out;
}

.variant:hover .variant__tooltip {
  opacity: 1;
  transform: translateY(0);
}

.forget-link {
  margin-bottom: 16px;
}

.modal-login__footer {
  margin-top: 10px;
  color: #ffffff;
}

.modal {
  overflow: hidden;
  position: relative;
  border-radius: 14px;
  background-color: #111923;
  transition: height 0.3s;
}

.modal__btn-close {
  width: 38px;
  height: 38px;
  border: none;
  font-weight: 500;
  font-size: 38px;
  line-height: 38px;
  background-color: transparent;
  color: #93acd3;
  padding: 0;
  position: absolute;
  top: 15px;
  right: 15px;
  outline: none;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.1s ease-in-out;
}

.modal__btn-close--white {
  color: #fff;
  top: 6px;
  right: 6px;
}

.modal__btn-close:hover {
  color: #fff;
}

.modal__container {
  position: relative;
  z-index: 2;
  padding: 0;
  color: #fff;
  height: 100%;
}

.default-tab,
.secondary-tab {
  position: relative;
}

.default-tab,
.secondary-tab,
.tab-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 20px 24px;
  transition: background-color 0.3s, border-bottom-color 0.3s;
}

.header__subtitle {
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #93acd3;
  margin-top: 2px;
}

.header__title {
  display: flex;
  align-items: center;
}

.header h1,
.header h2 {
  margin: 0 0.5em 0 0;
}

.header h1 {
  font-size: 24px;
}

.header h2 {
  font-size: 18px;
  margin-left: 0.5em;
  margin-right: 0.5em;
}

.header+.body .body__inner:before {
  display: none;
}

.body {
  flex: 1 1;
  min-height: 200px;
  position: relative;
}

.body:after,
.body:before {
  left: 0;
  right: 4px;
  display: block;
  content: "";
  height: 40px;
  position: absolute;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
.header0101{
  margin-bottom: 10px;
}
.body:before {
  top: 0;
  background: linear-gradient(0deg, transparent, rgba(17, 25, 35, 0.5));
}

.body:after {
  bottom: 0;
  background: linear-gradient(180deg, transparent, rgba(17, 25, 35, 0.5));
}

.bottom-shadow.body:after,
.top-shadow.body:before {
  opacity: 1;
}

.body__inner {
  padding: 0 24px;
}

.has-height.body__inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(183, 207, 255, 0.05);
  background-color: #161f2c;
}

.default-tab {
  z-index: 1;
}

.default-tab .modal__btn-close {
  position: absolute;
}

.default-tab .header {
  border-bottom: 1px solid transparent;
}

.default-tab .header:before {
  bottom: 0;
}

.default-tab .body__inner:before,
.default-tab .header:before {
  position: absolute;
  display: block;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background: linear-gradient(180deg, #003370, #08264a 40%, #111923);
  transition: bottom 0.3s;
}

.default-tab .body__inner:before {
  height: 70px;
}

.top-shadow.default-tab .header {
  border-bottom-color: rgba(183, 207, 255, 0.05);
}

.top-shadow.default-tab .header:before {
  bottom: -40%;
}

.secondary-tab {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #111923;
  transform: translateX(100%);
  transition: 0.4s all;
}

.secondary-tab.show {
  transform: translateX(0);
}

.secondary-tab .header {
  position: relative;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid transparent;
}

.secondary-tab .tab-inner {
  height: calc(100% - 73px);
}

.secondary-tab .tab-inner .body__inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
}

.top-shadow.secondary-tab .header {
  background-color: #161f2c;
  border-bottom-color: rgba(183, 207, 255, 0.05);
}

.slide-fade-to-right-enter-active,
.slide-fade-to-right-leave-active {
  transition: transform 0.2s ease-in-out;
}

.slide-fade-to-right-enter,
.slide-fade-to-right-leave-to {
  transform: translateX(100%);
}

.details {
  letter-spacing: -0.02em;
}

.details__header {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #fff;
  margin-bottom: 36px;
}

.details__header .button {
  margin-right: 16px;
}

.details__table-wrapper {
  margin-top: 16px;
  overflow: scroll-y;
}

.details__table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
}

.details__table tbody,
.details__table thead {
  display: block;
  width: 100%;
}

.details__table thead {
  padding-right: 14px;
}

.details__table thead tr {
  padding-bottom: 4px;
}

.details__table tr {
  display: block;
  border-bottom: 1px solid #2a3546;
}

.details__table tr:after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}

.details__table th {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #55657e;
}

.details__table td,
.details__table th {
  display: inline-block;
  border: 0;
  width: 49%;
}

.details__table tbody {
  min-height: 133px;
  padding-right: 10px;
}

.details__table tbody tr {
  padding: 11px 0;
}

.details__table td {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  max-height: 20px;
}

.details__table .currency {
  display: flex;
  align-items: center;
}

.details__table .currency__name {
  font-size: 12px;
  margin-left: 0.5em;
}

.font-digits,
.font-digits {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
}

.det-select-bar .el-select {
  width: 100%;
}

.warning p {
  color: #55657e;
  font-size: 11px;
  line-height: 16px;
  margin-bottom: 8px;
}

.tab__title-block {
  /* padding: 20px 0; */
}

.tab_deposit-panel {
  padding: 16px;
  background: #1c2532;
  border-radius: 14px;
}

.dep-bank-row {
  display: flex;
  font-size: 12px;
  padding: 7px 0;
}

.dep-bank-row .label {
  opacity: 0.5;
  min-width: 60px;
}

.is-not-tw .dep-bank-row .label {
  min-width: 120px;
}


.dep-bank-row .val {
  flex: 1;
}

.dep-bank-row .button__icon {
  cursor: pointer;
  color: #93acd3;
}

.dep_bankInput {
  margin-top: 15px;
}

.empty_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.empty_list svg {
  fill: #2a3546;
}

.empty_list span {
  color: #55657e;
}

.tab-book-form {
  min-height: 264px;
}

.captchaImageClass {
  width: 100px;
  height: 38px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: -3px;
  border-radius: 0 7px 7px 0;
}

.test_emil {
  height: 38px;
  line-height: 10px;
  padding: 15px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: -3px;
  border-radius: 7px;
}

.qhClass {
  max-width: 90px;
  margin-left: -16px;
}

.currency__right__item {
  border: 2px solid #2a3546;
  background-color: #2a3546;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 2px;
}

.modal-login__body /deep/ .el-form-item__content {
  line-height: 44px;
}

.modal-login .qhClass /deep/ .el-input__inner {
  padding-left: 20px !important;
  border: 0 !important;
  background: none !important;
}

.modal-login .qhClass-input /deep/ .el-input__inner {
  padding-left: 100px !important;
}

.has-code-item {
  margin-bottom: 16px;
}

.has-code-item /deep/ .el-input__suffix-inner {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.icon-licai {
  margin-right: 8px;
}

@media (max-width: 750px) {
  .btn-container.no-logged {
    margin-right: 0px;
  }

  .header {
    padding: 20px 16px;
  }

  .icon-licai {
    margin-right: 0 !important;
  }
}

.enabled_2fa {
  display: flex;
  align-items: center;
  background: #202a39;
  border: 2px solid #2a3546;
  border-radius: 10px;
  width: 148px;
  height: 44px;
  padding: 10px 16px 10px 10px;
}

.enabled_2fa svg {
  fill: #93acd3;
}

.enabled_2fa span {
  padding-left: 7px;
  color: #93acd3;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
}

.btn-blue-link {
  display: inline-block;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  margin-left: 10px;
  background: linear-gradient(180deg, #005abe, #002148);
}

.user__avatar img {
  border-radius: 40px;
}

.body_sub_title {
  font-size: 14px;
  text-decoration: none;
  margin-left: 4px;
}

.profile-preview__userpick .icon-img-false {
  font-size: 60px;
}

.icon-jiazai_shuaxin {
  display: inline-block;
  cursor: pointer;
  font-size: 18px;
  margin-left: 5px;
  opacity: .6;
}

@media(max-width:768px) {
  .icon-jiazai_shuaxin {
    display: none
  }
}

.icon-jiazai_shuaxin.circle {
  animation: circle 2s;
  animation-fill-mode: forwards;
}

@keyframes circle {
  100% {
    transform: rotate(720deg);
  }
}

.balance__currency-wrap .el-icon-loading {
  display: inline-block;
  margin-left: 5px;
  color: #ffcf73;
}

.ph-label {
  margin-right: 5px;
}

@media(max-width:750px) {
  .ph-label {
    margin-right: 0
  }
}

.progress-subtitle {
  display: block;
  font-size: 12px !important;
  transform: scale(.8);
  transform-origin: 0 0;
  margin-left: 0 !important;
  margin-top: 1px !important;
  margin-left: 2px !important;
}

:deep(.el-progress-bar) {
  padding-right: 40px;
  margin-right: -45px;
}

:deep(.el-progress-bar__inner) {
  background: linear-gradient(2deg, #D25106, #FF9869);
}

@media (max-width:768px) {
  .btn-wallet {
    padding: 0;
  }
}

.phone-label {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-right: 10px;
}

.input-key :deep(.el-input__inner) {
  padding-left: 50px;
}

.content-add-button {
  display: block;
  margin: 30px auto;
}

.card-wrap {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  padding: 4px 0;
  gap: 15px;
  @media (max-width:768px) {
    gap: 10px;
  }
}

.card-items {
  padding: 10px 24px;
  border: 1px solid #3a07f2;
  color: #3a07f2;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  text-align: center;
  white-space: nowrap;
  @media (max-width:768px) {
    padding: 6px 24px;
  }
}

.card-items:hover {
  background-color: #427dc5;
  color: #fff;
}

.card-items.active {
  background-color: #3a07f2;
  color: #fff;
}


.item-info-row{
  display: flex;
  align-items: center;
}
.loginout_btn{
  padding:9px 15px;
  border-radius: 10px;
  margin-bottom: 3px;
  background: #2a3546;
  color: #FFFFFF;
}
</style>

