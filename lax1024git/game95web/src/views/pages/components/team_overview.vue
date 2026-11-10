<template>
  <div class="overview">
    <div class="referrals" v-if="$store.state.isLoginStatu">
      <img src="@/assets/images/speaker.png" class="referrals__bg" />
      <div class="referrals__block top">
        <div class="referrals__top-text-wrap">
          <h6 class="referrals__top-text-title">{{ $t('InviteCode') }}</h6>
          <span class="referrals__top-text">{{ promotion.rec_code }}</span>
          <span class="buttonsicon" v-clipboard:copy="promotion.rec_code" v-clipboard:success="onCopy">
            <svgIcon icon="icon-copy" widthName="18" heightName="18"></svgIcon>
          </span>
        </div>
      </div>
      <div class="stats referrals__block" v-if="report">
        <div class="stats__block">
          <h6 class="stats__title">{{ $t('Referrals') }}</h6>
          <img src="@/assets/images/users.svg" alt="users" class="stats__img" />
          <span class="stats__ref-count">{{ report.user_count }}</span>
        </div>
        <div class="stats__block">
          <h6 class="stats__title">{{ $t('推广奖励') }}</h6>
          <div class="stats__coin-wrap">
            <span class="currency stats__currency">
              <img width="24" height="24" :src="require('@/assets/images/'+$store.state.currencyIcon)" loading="lazy" class="currency__icon" />
              <div class="currency__balances-wrap">
                <div class="currency__balances">
                  <span class="currency__balances--balance" style="font-size: 14px;">
                    <span style="color: #FFFFFF" class="font-digits">
                      {{ numFormat(report.extension) }}
                    </span>
                    <span @click="popularizeShow" class="iconfont icon-liebiao_list el-m-l-10"
                      style="color:#93acd3"></span>
                  </span>
                </div>
              </div>
            </span>
            <!-- <span class="stats__btc">BTC</span> -->
          </div>
        </div>
        <div class="stats__block">
          <h6 class="stats__title">{{ $t('总收入') }}</h6>
          <div class="stats__coin-wrap">
            <span class="currency stats__currency">
              <img width="24" height="24" :src="require('@/assets/images/'+$store.state.currencyIcon)" loading="lazy" class="currency__icon" />
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
            <input autocomplete="off" :value="promotion.rec_url" onclick="this.select()" readonly="readonly"
              class="input__tag" />
            <button v-clipboard:copy="promotion.rec_url" v-clipboard:success="getQueryUrl" type="button"
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
            <button class="social-icons__button" style="width: 32px; height: 32px; background: rgb(255, 8, 0);">
              <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-reddit" class="svg-use"></use>
              </svg>
            </button>
          </a>
        </div>
      </div>
      <div class="referrals__block column half">
        <h4 class="referrals__heading">{{ $t('Promo') }}</h4>
        <router-link to="/promo-materials" class="referrals__get-btn">{{ $t('获取宣传材料') }}</router-link>
      </div>
    </div>
    <div class="w_100">
      <router-link v-if="!$store.state.isLoginStatu" to="/promo-materials"
        class="overview__get-btn">{{ $t('获取宣传材料') }}</router-link>
    </div>
    <div class="ref-card in-house">
      <div class="ref-card__inner w_100">
        <h4 class="ref-card__header">
          {{ $t('分红百分比1') }}
        </h4>
        <p class="ref-card__subheader">{{ $t('分红来自地址1') }}</p>
        <p class="ref-card__subheader-optional"></p>
        <p class="ref-card__info">{{ $t('分红规则1') }}</p>
        <div class="ref-card__for">{{ $t('针对模块1') }}</div>
      </div>
    </div>
    <div class="ref-card slots">
      <div class="ref-card__inner w_100">
        <h4 class="ref-card__header">
          {{ $t('分红百分比2') }}
        </h4>
        <p class="ref-card__subheader">{{ $t('分红来自地址2') }}</p>
        <p class="ref-card__subheader-optional"></p>
        <p class="ref-card__info w_100">{{ $t('分红规则2') }}</p>
        <div class="ref-card__for">{{ $t('针对模块2') }}</div>
      </div>
    </div>
    <div class="ref-card bfg">
      <div class="ref-card__inner w_100">
        <h4 class="ref-card__header">{{ $t('分红百分比3') }}</h4>
        <p class="ref-card__subheader">{{ $t('分红来自地址3') }}</p>
        <p class="ref-card__subheader-optional"></p>
        <p class="ref-card__info">{{ $t('分红规则3') }}</p>
        <div class="ref-card__for">{{ $t('针对模块3') }}</div>
      </div>
    </div>
    <div class="overview__partnership">
      <p class="overview__partnership-top">{{ $t('具有更大推荐奖励的独特联属网络营销计划') }}</p>
      <p class="overview__partnership-mid">
        {{ $t('联系我们的经理讨论条款') }}
        <a :href="`mailto:${$t('EmailAddress')}`"
          style="text-decoration: none; color: rgb(35, 131, 246); z-index: 100;">{{ $t('EmailAddress') }}</a>
      </p>
      <p class="overview__partnership-bott">{{ $t('重要提示信息') }}</p>
    </div>
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
import svgIcon from '@/components/svg.vue'

import { team_promotion_api, team_report_api, team_popularize_api } from "@/api/user";
export default {
  components:{svgIcon},
  data() {
    return {
      promotion: {},
      report: {
        agent_total_amount: 0,
        extension: 0,
        user_count: 0,
        lists: [],
      },
      popularizeVisible: false,
      popularizeList: {
        not_finish: []
      },
    }
  },
  methods:{
    onCopy: function () {
      this.successTips('Copy success');
    },
    getQueryUrl() {
      this.successTips('复制成功');
    },
    async getTeamPromotion() {
      await team_promotion_api({ type: 0 }).then(res => {
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
  },
  mounted() {
    this.getTeamPromotion();
    this.getTeamReport()
    this.getTeamPopularize()
  },
};
</script>
<style scoped>

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

@media (min-width:1100px) {
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

@media (min-width:1100px) {
  .referrals__block.top {
    justify-content: flex-start;
    flex-direction: column;
    flex: 0 1 140px;
  }
}

@media screen and (min-width:1200px) {
  .referrals__block.top {
    flex: 0 1 190px;
  }
}

.referrals__block:not(:last-of-type) {
  margin-bottom: 25px;
}

@media (min-width:1100px) {
  .referrals__block:not(:last-of-type):not(.stats) {
    margin-bottom: 0;
  }
}

.referrals__top-text-wrap {
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-weight: 600;
  letter-spacing: -.02em;
}

@media (min-width:1100px) {
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

@media (min-width:1100px) {
  .referrals__top-text-title {
    margin-bottom: 0;
  }
}

.referrals__top-text {
  font-size: 14px;
}
.ref-cabinet {
  padding-bottom: 20px;
}

.ref-cabinet__title {
  margin: 25px 0;
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
  background-image: url(../../../assets/images/in-house.png);
}

.ref-card.slots {
  background-image: url(../../../assets/images/slots.jpg);
}

.ref-card.bfg {
  background-image: url(../../../assets/images/bfg.png);
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

@media (min-width:1100px) {
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

@media (min-width:1100px) {
  .stats__block {
    flex: 1;
  }
}

@media (min-width:1100px) {
  .stats__block:not(:last-of-type) {
    margin: 0;
  }
}

@media (min-width:1100px) {
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

@media (min-width:1100px) {
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

.currency__balances--balance,
.currency__balances-wrap {
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

.stats__currency .balance,
.stats__currency .font-digits {
  font-size: 18px;
}

.currency span span {
  line-height: inherit;
  font-size: inherit;
}

.referrals__block.column {
  flex-direction: column;
}

@media (min-width:1100px) {
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

@media (min-width:1100px) {
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


.referrals__block.half {
  margin-left: 50%;
}

.referrals__block.share {
  grid-gap: 2px;
  gap: 2px;
}

@media (min-width:1100px) {
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

.input__btn-clear,
.input__btn-successful {
  outline: none;
}

.input_md .input__inner button {
  border-radius: 6px;
  margin-left: 8px;
  margin-right: -7px;
}

.input__btn-clear svg,
.input__btn-successful svg {
  fill: #55657e;
  transition: fill .1s ease-in-out;
}

.input_md .input__btn-clear svg,
.input_md .input__btn-successful svg {
  width: 20px;
  height: 20px;
}

.input__btn-clear,
.input__btn-successful {
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

.button__icon,
.button__inner {
  display: flex;
  align-items: center;
}

.button_center .button__inner,
.button_fullwidth {
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


.chevron {
  fill: #55657e;
  transition: transform 0.15s linear;
}

.chevron--rotated {
  fill: #fff;
  transform: rotate(180deg);
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
  background: #161f2c url(../../../assets/images/partnership.png) 0 100% no-repeat;
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

@media (max-width:765px) {
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
    padding: 15px;
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
table{
  color: #FFFFFF;
}

</style>
