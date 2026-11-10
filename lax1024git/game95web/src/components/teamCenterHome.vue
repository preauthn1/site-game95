<template>
  <div>
    <!-- 头部内容 -->
    <!-- <div class="t-header">
      <div class="t-header-content">
        <div class="h-title">{{ $t("限时特惠") }}</div>
        <div class="h-sub-title">{{ $t("投注佣金") }}</div>
        <div class="h-desc">
          <div v-for="item,index in data.without_rate" :key="index">
            {{ $langKey($t("{lv}级投注，您将获得{data}%的佣金奖励"),{lv:index+1,data:item*100}) }}
          </div>
        </div>
      </div>
      <div class="t-header-img">
        <img src="@/assets/images/team-h-avatar.png" alt="">
        <div class="txt1">{{ $t("赌注") }}</div>
        <div class="txt2">{{ $t("报酬") }}</div>
        <div class="txt3">{{ $t("1级") }}</div>
        <div class="txt4">{{ $t("2级") }}</div>
        <div class="txt5">{{ $t("3级") }}</div>
      </div>
    </div> -->
    <div class="rewards-title">
      {{ $t('邀请好友') }}
    </div>
    <div class="total-reward">
      {{$t('总奖励')}}
      <span>{{data.invite_bonus}}</span>
    </div>
    <!-- 我的参考 -->
    <div class="referTo">
      <div class="r-content">
        <div class="r-l">
          <div class="r-title">{{ $t("邀请方式") }}</div>
          <div class="link-box">
            <div class="link-box-left">
              {{ $t("推荐链接") }}:
              <span class="link-txt">{{ data.invite_url }}</span>
            </div>
            <!--              <el-button class="copy-btn button_blue" v-clipboard:copy="data.invite_url " v-clipboard:success="onCopy">-->
            <div v-clipboard:copy="data.invite_url " v-clipboard:success="onCopy" class="link-box-right">
              <img src="@/assets/images/copy4.png" class="copy-icon" >
            </div>

            <!--              </el-button>-->
          </div>
          <div class="link-box">
            <div class="link-box-left">
              <span>{{ $t("推荐码") }}:</span>
              <span class="link-txt">{{ data.rec_code }}</span>
            </div>
            <div v-clipboard:copy="data.rec_code" v-clipboard:success="onCopy" class="link-box-right">
              <img src="@/assets/images/copy4.png" class="copy-icon" >
            </div>
<!--            <div class="link-title"></div>-->
<!--            <div class="link-wapper">-->
<!--              <span class="link-txt">{{ data.rec_code }}</span>-->
<!--              <el-button class="" v-clipboard:copy="data.rec_code" v-clipboard:success="onCopy">-->
<!--                <img src="@/assets/images/copy4.png" class="copy-icon">-->
<!--              </el-button>-->
<!--            </div>-->
          </div>

          <!--          <div class="r-l-desc">-->
          <!--            {{ $t("发送您的推荐码和链接给您的朋友加入您的团队") }} <br>-->
          <!--            {{ $t("(他们在存款后正式加入团队)") }} <br>-->
          <!--            {{ $t("邀请用户加入您的团队") }} <br>-->
          <!--            {{ $t("您将根据朋友的有效投注获得奖励") }} <br>-->
          <!--          </div>-->
          <div class="icon-wapper">
            <a href="javascript:void(0)" @click="onShare('telegram')" class="social-icons__item share-network-telegram">
              <button class="social-icons__button" style="width: 32px; height: 32px; background: rgb(0, 167, 240);">
                <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                  <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-telegram" class="svg-use"></use>
                </svg>
              </button>
            </a>
            <a href="javascript:void(0)" @click="onShare('facebook')" class="social-icons__item share-network-telegram">
              <button class="social-icons__button" style="width: 32px; height: 32px; background: rgb(0, 167, 240);">
                <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                  <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-facebook" class="svg-use"></use>
                </svg>
              </button>
            </a>
            <a href="javascript:void(0)" @click="onShare('twitter')" class="social-icons__item share-network-twitter">
              <button class="social-icons__button" style="width: 32px; height: 32px; background: rgb(0, 171, 245);">
                <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                  <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-twitter" class="svg-use"></use>
                </svg>
              </button>
            </a>
            <a href="javascript:void(0)" @click="onShare('reddit')" class="social-icons__item share-network-reddit">
              <button class="social-icons__button" style="width: 32px; height: 32px; background: #FF4500;">
                <svg width="16" height="16" focusable="false" aria-hidden="true" class="social-icons__icon">
                  <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-reddit" class="svg-use"></use>
                </svg>
              </button>
            </a>
          </div>
        </div>
        <div class="r-r">
          <div class="r-title">
            {{$t('统计数据')}}
          </div>
          <div class="link-box">
            <div class="link-box-left">
              <span>{{ $t("团队总数") }}:</span>
              <span class="link-txt">{{  data.team_people.total }}</span>
            </div>
          </div>
          <div class="link-box">
            <div class="link-box-left">
              <span>{{ $t("直接会员总数") }}:</span>
              <span class="link-txt">{{  data.team_people.child }}</span>
            </div>
          </div>
<!--          <div class="r-input">-->
<!--            <span>{{ $t("团队总数统计") }}</span>-->
<!--            <span></span>-->
<!--          </div>-->
<!--          <div class="r-input">-->
<!--            <span>{{ $t("团队总数") }}</span>-->
<!--            <span>{{ data.team_people.total }}</span>-->
<!--          </div>-->
<!--          <div class="r-input">-->
<!--            <span>{{ $t("直接会员总数") }}</span>-->
<!--            <span>{{ data.team_people.child }}</span>-->
<!--          </div>-->
<!--          <div class="r-input">-->
<!--            <span>{{ $t("其他会员总数") }}</span>-->
<!--            <span>{{ data.team_people.other }}</span>-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <!-- 数据统计 -->
    <div class="rewards-title">{{$t('我的奖励')}}</div>
    <div class="rewards-item">
      <div>
        <span>{{$t('首充存款直接会员数量')}}</span><span>{{ data.team_statistics.first_deposit_child_user }}</span>
      </div>
      <div>
        <span>{{$t('直接存款会员数量')}}</span><span>{{ data.team_statistics.deposit_child_user }}</span>
      </div>
      <div>
        <span>{{$t('直接会员投注总额')}}</span><span>{{ data.team_statistics.bet_child_user_amount }}</span>
      </div>
    </div>
<!--    <div class="cart">-->
<!--      <el-date-picker format="MM-dd-yyyy" value-format="yyyy-MM-dd" @change="changeDate" v-model="dateVal"-->
<!--                      type="daterange" range-separator="—" :start-placeholder="$t('开始日期')"-->
<!--                      :end-placeholder="$t('结束日期')" popper-class="el-date-picker-content"-->
<!--                      class="date-picker"></el-date-picker>-->
<!--      <div class="select-wapper">-->
<!--        <el-select :placeholder="$t('选择时间')" class="select" v-model="timeData" @change="changeSel">-->
<!--          <el-option :value="item.value" :label="$t(item.name)" v-for="item in timeList" :key="item.value"></el-option>-->
<!--        </el-select>-->
<!--      </div>-->

<!--      <div class="list">-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("首充存款直接会员数量") }}</span>-->
<!--          <span>{{ data.team_statistics.first_deposit_child_user }}</span>-->
<!--        </div>-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("直接存款会员数量") }}</span>-->
<!--          <span>{{ data.team_statistics.deposit_child_user }}</span>-->
<!--        </div>-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("直接会员投注总额") }}</span>-->
<!--          <span>{{ data.team_statistics.bet_child_user_amount }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <!-- <div class="cart">
      <div class="list">
        <div class="list-item">
          <span>{{ $t("今日佣金") }}</span>
          <span>{{ data.commission.today }}</span>
        </div>
        <div class="list-item">
          <span>{{ $t("昨天的佣金") }}</span>
          <span>{{ data.commission.yesterday }}</span>
        </div>
        <div class="list-item">
          <span>{{ $t("所有佣金") }}</span>
          <span>{{ data.commission.total }}</span>
        </div>
      </div>
    </div> -->

<!--    <div class="cart">-->
<!--      <div class="list">-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("今日的推荐奖励") }}</span>-->
<!--          <span>{{ data.referral_reward.today }}</span>-->
<!--        </div>-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("昨天的推荐奖励") }}</span>-->
<!--          <span>{{ data.referral_reward.yesterday }}</span>-->
<!--        </div>-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("所有推荐奖励") }}</span>-->
<!--          <span>{{ data.referral_reward.total }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="rewards-item">
      <div>
        <span>{{$t('今日的推荐奖励')}}</span><span>{{ data.referral_reward.today }}</span>
      </div>
      <div>
        <span>{{$t('昨天的推荐奖励')}}</span><span>{{ data.referral_reward.yesterday }}</span>
      </div>
      <div>
        <span>{{$t('推荐奖励总计')}}</span><span>{{ data.referral_reward.total }}</span>
      </div>
    </div>
    <div class="rewards-item">
      <div>
        <span>{{$t('今天所有收益')}}</span><span>{{ data.total_earnings.today }}</span>
      </div>
      <div>
        <span>{{$t('昨天所有收益')}}</span><span>{{ data.total_earnings.yesterday }}</span>
      </div>
      <div>
        <span>{{$t('总奖金')}}</span><span>{{ data.total_earnings.total }}</span>
      </div>
    </div>
<!--    <div class="cart">-->
<!--      <div class="list">-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("今日奖励") }}</span>-->
<!--          <span>{{ data.total_earnings.today }}</span>-->
<!--        </div>-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("昨天所有收益") }}</span>-->
<!--          <span>{{ data.total_earnings.yesterday }}</span>-->
<!--        </div>-->
<!--        <div class="list-item">-->
<!--          <span>{{ $t("总奖金") }}</span>-->
<!--          <span>{{ data.total_earnings.total }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!-- 规则 -->
  </div>
</template>

<script>
import {team_view_api} from '@/api/user.js'
import moment from 'moment'

export default {
  data() {
    return {
      dateVal: null,
      timeData: "",
      timeList: [
        {name: "今日", value: 0},
        {name: "三日", value: 2},
        {name: "七日", value: 6},
      ],
      data: {
        without_rate: {},
        team_people: {},
        team_statistics: {},
        commission: {},
        referral_reward: {},
        total_earnings: {},
      }
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    dateVal(v) {
      this.getData()
    },
  },
  methods: {
    onCopy() {
      this.successTips('Copy success');
    },
    changeDate(v) {
      this.timeData = ""
    },
    changeSel(v) {
      const curTime = new Date().getTime()
      const time = curTime - v * 86400000
      this.dateVal = [moment(time).format('YYYY-MM-DD'), moment(curTime).format('YYYY-MM-DD')]
    },
    // 获取数据
    async getData() {
      const {data} = await team_view_api({
        start_time: this.dateVal ? this.dateVal[0] : "",
        end_time: this.dateVal ? this.dateVal[1] : "",
      })
      if (data.code == 1) {
        this.data = data.data
      }
    },
    dateChange() {
    },
    onShare(type) {
      // let url =  this.promotion?.rec_url || window.location.origin;
      let url = this.data.invite_url || window.location.origin;
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
  }
}
</script>

<style scoped lang="less" src="@/assets/css/teamCenterHome.less"></style>
