<template>
	<div class="modals-container" v-if="wheelShow">
		<div class="modal-wrapper" style="z-index: 1;">
			<div  class="modal fury-wheel-modal" style="max-width: 724px;">
				<div  class="modal__container">
					<button v-if="!prizeRequest" class="modal__btn-close" @click="wheelClose">
						<svgIcon widthName="24" heightName="24" icon="icon-close" className="vv-icon"></svgIcon>
					</button>
					<div class="fury-wheel" :class="playShow?'fury-wheel--play':''">
						<div class="fury-wheel__sound">
							<button class="sound-on" v-show="bgMusShow" @click="bgPlayPause">
								<svgIcon widthName="16" heightName="16" icon="icon-sound-on" className="fury-wheel__sound-icon" ></svgIcon>
							</button>
							<button class="sound-off" v-show="!bgMusShow" @click="bgPlayPlay">
								<svgIcon widthName="16" heightName="16" icon="icon-sound-off" className="fury-wheel__sound-icon" ></svgIcon>
							</button>
						</div>
						<div class="fury-wheel__bg-wrap">
							<img src="../assets/images/furyWheel/wheel-decor.png" alt="" class="fury-wheel__bg-wheel-img">
						</div>
						<div class="fury-wheel__wheel-wrap" v-if="!resultShow">
							<!-- <img src="../assets/images/furyWheel/wheel-VIP1.png" alt="" class="fury-wheel__wheel-img" style="transform: translate(-50%, -50%) rotate(0deg); transition-duration: 6s; z-index: -1;"> -->
							<div class="fury-wheel__wheel-img" >
								<LuckyWheel ref="myLucky" :width="wlWidth" :height="wlHeight" :defaultConfig="defaultConfig" :prizes="prizes" :blocks="blocks" :buttons="buttons" @start="startCallback"  @end="endCallback" />
							</div>
							<img src="../assets/images/furyWheel/wheel-arrow.png" alt="" class="fury-wheel__arrow-img">
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-1">
								<img src="../assets/images/furyWheel/circle-1.png" alt="" class="fury-wheel__wheel-help fury-wheel__wheel-help-1">
							</div>
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-2">
								<img src="../assets/images/furyWheel/circle-2.png" alt="" class="fury-wheel__wheel-help fury-wheel__wheel-help-2">
							</div>
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-3">
								<img src="../assets/images/furyWheel/circle-3.png" alt="" class="fury-wheel__wheel-help fury-wheel__wheel-help-3">
							</div>
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-4">
								<img src="../assets/images/furyWheel/circle-4.png" alt="" class="fury-wheel__wheel-help fury-wheel__wheel-help-4">
							</div>
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-5">
								<img src="../assets/images/furyWheel/circle-5.png" alt="" class="fury-wheel__wheel-help fury-wheel__wheel-help-5">
							</div>
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-6">
								<img src="../assets/images/furyWheel/circle-6.png">
							</div>
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-7">
								<img src="../assets/images/furyWheel/circle-7.png" alt="" class="fury-wheel__wheel-help fury-wheel__wheel-help-7">
							</div>
							<div class="fury-wheel__wheel-help-wrap fury-wheel__wheel-help-wrap-8">
								<img src="../assets/images/furyWheel/circle-8.png" alt="" class="fury-wheel__wheel-help fury-wheel__wheel-help-8">
							</div>
						</div>
						<!-- result -->
						<div class="wheel-win" v-if="resultShow">
							<div class="wheel-win__coins-block">
								<img :src="$t('lottery_coins_img')=='lottery_coins_img'?require('../assets/images/furyWheel/win-coins-fun.png'):$t('lottery_coins_img')" alt="" class="wheel-win__coins-fun">
							</div>
							<!-- <button type="button" class="button wheel-win__btn-back button_lg button_grey1 button_center" @click="resultShow = false">
								<span class="button__inner">
									<span class="button__text">
										<svgIcon widthName="16" heightName="16" icon="icon-arrow-left" className="link__icon"></svgIcon>
									</span>
								</span>
							</button> -->
							<div class="wheel-win__body">
								<div class="wheel-win__amount-wrap">
									<img src="../assets/images/furyWheel/win-label.png" alt="" class="wheel-win__label-img">
									<div class="wheel-win__amount-block">
										<img :src="require('@/assets/images/'+$store.state.currencyIcon)" class="">
										<p class="wheel-win__amount-sum">{{ numFormat(prize.amount) }}</p>
										<p class="wheel-win__currency-name">
											<!-- {{ prize.title }} -->
										</p>
									</div>
								</div>
								<p class="wheel-win__desc">
									{{ $t('win_lottery_prize_desc') }}
									<!-- <span class="wheel-win__desc--orange">share $150 prize pool</span> -->
								</p>
								<div class="wheel-win__btn-block">
									<button  type="button" v-if="this.free_count == 0 " @click="startBack" class="button button_lg button_red button_fullwidth button_center">
										<span class="button__inner">
											<span class="button__text">{{ $t('继续游玩') }}</span>
										</span>
									</button>
									<button type="button" v-else @click="startAgain" class="button button_lg button_red button_fullwidth button_center">
										<span class="button__inner">
											<span class="button__text">{{ $t('继续游玩') }}</span>
										</span>
									</button>
									<button type="button" @click="wheelClose" class="button button_lg btn_gray button_fullwidth button_center">
										<span class="button__inner">
											<span class="button__text">{{ $t('取消') }}</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<div class="fury-wheel__body">
							<img :src="this.$t('lucky wheel_banner') != 'lucky wheel_banner'? $t('lucky wheel_banner'):require('../assets/images/furyWheel/racoon.png')" alt="" class="fury-wheel__racoon-img">
							<div class="fury-wheel__group">
								<button class="fury-wheel__btn" @click="startCallback" v-if="prizeConfig && prizeConfig.required_balance != null">
									<span v-if="this.free_count == 0">
										<template v-if="prizeConfig.integral>=prizeConfig.required_integral">{{ numFormat(prizeConfig.required_integral) }} {{ $t("积分") }}/{{ $t("次") }}</template>
										<template v-else>{{ numFormat(prizeConfig.required_balance) }} {{ prizeConfig.currency_symbol }}/{{ $t("次") }}</template>
									</span>
									<span v-else> {{ $t('剩余') }} {{free_count}}{{ $t('次') }} {{ $t('免费') }}</span>
								</button>
								<div class="fury-less-time" v-show="this.free_count == 0 && this.$helper.get('timehelper')">
									<el-statistic
									ref="statistic"
									format="HH:mm:ss"
									:value='$helper.get("timehelper")'
									@finish="timeover"
									title=""
									:value-style="valueStyle"
									time-indices
									>
									</el-statistic>
								</div>
								<div class="fury-wheel__less" v-if="prizeConfig.integral>=prizeConfig.required_integral">
									<img src="../assets/images/integral.png" alt="" class="vnd-light">
									<span>{{numFormat(prizeConfig.integral)}}</span>
								</div>
								<div class="fury-wheel__less" v-else>
									<img src="../assets/images/furyWheel/vnd-light.png" alt="" class="vnd-light">
									<span>{{$store.state.userInfo.balance1}}</span>
								</div>
							</div>
							<button class="link fury-wheel__link link_md" @click="historyShow = true">
								<span class="link__text">{{ $t('中奖历史') }}</span>
								<svgIcon widthName="24" heightName="24" icon="icon-arrow-right-small" className="link__icon"></svgIcon>
							</button>
						</div>
						<div class="fury-wheel__footer">
							<div class="fury-wheel__winners">
								<swiper class="swiper gallery-fury-wheel" :options="swiperOptionThumbs" ref="swiperThumbs">
								  <swiper-slide v-for="(item,index) in winlist" :key="index">
								    <div class="fury-wheel__winner">
										<img width="20" height="20" :src="item.icon" loading="lazy" class="">
										{{item.uname}} {{ $t('通過輪盤獲得') }} {{ numFormat(item.value) }}
								    </div>
								  </swiper-slide>
								</swiper>
							</div>
						</div>
					</div>
					<div class="wheel-history " :class="historyShow?'wheel-history--show':''">
						<div class="wheel-history__content">
							<div class="wheel-history__head">
								<button type="button" class="button wheel-history__btn-back button_sm button_grey1 button_center" @click="historyShow = false">
									<span class="button__inner">
										<span class="button__text">
											<svgIcon widthName="16" heightName="16" icon="icon-arrow-left" className="buttonlink__icon"></svgIcon>
										</span>
									</span>
								</button>
								<h3 class="wheel-history__title">{{ $t('Recent and big wins') }}</h3>
							</div>
							<div class="wheel-history__body">
								<div class="wheel-history__tabs">
									<div class="wheel-history__tab wheel-history__tab--active">
										{{ $t('中奖历史') }}
									</div>
								</div>
								<div class="wheel-history__table">
									<div class="wheel-history__row wheel-history__row--recent">
										<div class="wheel-history__col wheel-history__col--head">{{ $t('Time') }}</div>
										<div class="wheel-history__col wheel-history__col--head">{{ $t('User') }}</div>
										<div class="wheel-history__col wheel-history__col--head">{{ $t('Prize') }}</div>
									</div>
									<div class="wheel-history__row wheel-history__row--recent" v-for="(item,index) in records" :key="index">
										<div class="wheel-history__col wheel-history__col--time">
											<span class="datetime history__time">{{ item.time }}</span>
										</div>
										<div class="wheel-history__col">
											<div class="user user--clickable">
												<div class="user__avatar" style="width: 22px; height: 22px;">
													<div class="user__inner">
														<img height="22" width="22" src="../assets/images/default-avatar.png" alt="" >
													</div>
												</div>
												<div class="user__wrap">
													<span class="user__name">{{ item.username }}</span>
												</div>
											</div>
										</div>
										<div class="wheel-history__col">
											<span class="currency">
												<img width="20" height="20" :src="require('@/assets/images/'+$store.state.currencyIcon)" class="currency__icon">
												<span style="font-size: 12px;">
													<span style="color: #ffffff" class="font-digits">{{ numFormat(item.prize_price) }}</span>
												</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 0; overflow: hidden;">
			<audio :src="clickMus" class="media-audio" ref="MusicPlay"></audio>
			<audio :src="roundMus" class="media-audio" ref="MusicRound"></audio>
			<audio :src="resultMus" class="media-audio" ref="MusicResult"></audio>
			<audio :src="enterMus" class="media-audio" ref="MusicEnter"></audio>
			<audio :src="bgMus" class="media-audio" loop ref="MusicBg"></audio>
		</div>
		<wheelTip ref="wheelTipDialog" :prizeConfig="prizeConfig" @eventComfirm="eventComfirm"></wheelTip>
	</div>
</template>
<script>
import svgIcon from "@/components/svg.vue";
import wheelTip from "@/components/wheelTip.vue";
import { lottery_api, lottery_record_api, lottery_config_api } from "@/api/lottery";
export default {
  components: {
    svgIcon,
	wheelTip
  },
  props: {
    wheelShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
			wlWidth:380,
			wlHeight:380,
			wlPartWidth:90,
			wlPartHeight:142,
			playShow:false,
			historyShow:false,
			blocks: [{
				padding: '2px',
				imgs: []
			}],
			prizes: [],
			buttons: [{
				radius: '100px',
				pointer: true,
				fonts: [{
					text: this.$t('开始'),
					top: '-10px',
					fontColor: "#ffffff"
				}],
				imgs: [{
					top: '-50px',
					width: '100px',
					height: '100px',
					src: require("@/assets/images/bottom.png")
				}]
			}],
			defaultConfig: {
				stopRange: 0,
				gutter: 10,
				offsetDegree: -15
			},
			winlist:[],
			swiperOptionThumbs: {
				loop: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				observer:true,
				observeParents:true,
				slidesPerView: '2',
				spaceBetween: 5,
				breakpoints: {
				  640: {
					slidesPerView: '1',
				  },
				}
			},
			resultShow:false,
			bgMusShow:false,
			clickMus:require("../assets/mp3/click.mp3"),
			roundMus:require("../assets/mp3/round.mp3"),
			resultMus:require("../assets/mp3/result.mp3"),
			bgMus:require("../assets/mp3/bg.mp3"),
			enterMus:require("../assets/mp3/enter.mp3"),
			prizeConfig: null,
			prizesIdByIndex: {},
			prizeRequest: false,
			prize: null,
			records:[],
			free_count: 0, //抽奖次数
			limit_count: 0,
			balance: 0,
			timestamp:'',
			valueStyle:{
				color:"#ffffff",
				fontSize:"22px"
			}
		};
  },
  methods: {
		bgPlayPause(){
			this.$refs.MusicBg.pause()
			this.$refs.MusicPlay.pause();
			this.$refs.MusicRound.pause();
			this.$refs.MusicResult.pause();
			this.bgMusShow = false
		},
		bgPlayPlay(){
			this.$refs.MusicBg.play()
			this.bgMusShow = true
		},
		wheelClose() {
			this.$emit("wheelClose");
			this.resultShow = false
			this.playShow = false
		},
		timeover(){
			this.getFreeCount()
			if(this.$helper.get("timehelper")){
				this.$helper.rm("timehelper");
			}
		},
		getFreeCount(time){
			let self = this
			lottery_config_api().then(response => {
				let res = response.data
				if (res && res.code == 1) {
					self.free_count = res.data.free_count;
					self.limit_count = res.data.limit_count;
					self.prizeConfig = res.data
					self.balance = res.data.balance;
					if(time && time != ''){
						setTimeout(() => {
							if(!this.$helper.get("timehelper")){
								this.$helper.set("timehelper", Date.now() + 1000 * parseInt(res.data.free_time));
							}
						}, 7000)
					}
				}
			});
		},
		startCallback() {
			if (this.prizeRequest) {
				this.tips('请勿频繁请求');
				return;
			}
			if(this.free_count == 0){
				if(!this.$helper.get("tipStorage")){
					this.$store.commit("$vuexSetWheelTipShowState", true);
					return;
				}
			}
			this.prizeRequest = true;
			let self = this

			lottery_api().then(response => {
				let res = response.data
				if (res && res.code == 1) {
					self.playShow = true
					self.prize = res.data
					// 重新获取次数
					this.getFreeCount('timesss')
					// 音乐
					this.bgMusShow && self.$refs.MusicPlay.play();
					setTimeout(() => {
						this.bgMusShow && self.$refs.MusicRound.play();
					}, 500)
					// 转盘事件
					self.$refs.myLucky.play()
					setTimeout(() => {
						// 后端返回的中奖索引
						const index = self.prizesIdByIndex[res.data.id]
						// 调用stop停止旋转并传递中奖索引
						self.$refs.myLucky.stop(index)
					}, 4500)
					setTimeout(() => {
						self.resultShow = true
            self.updateUserInfo();
						this.bgMusShow && self.$refs.MusicResult.play();
						self.prizeRequest = false;
					}, 7000)
				} else {
					self.errorTips(res.msg);
					self.prizeRequest = false;
				}
		  });
		},
		// 第一次花钱玩
		eventComfirm(){
			this.$helper.set("tipStorage", true);
      this.updateUserInfo();
			this.startCallback()
		},
		// 继续玩
		startAgain(){
			this.startCallback()
			this.resultShow = false
		},
		// 继续玩
		startBack(){
			this.resultShow = false
			this.playShow = false
		},
	// 抽奖结束会触发end回调
	endCallback(prize) {
		// console.log('endCallback', prize)
	},
	wheelSize() {
	  if (document.body.clientWidth < 992) {
	    this.wlWidth = 280
		this.wlHeight = 280
		this.wlPartWidth = 64
		this.wlPartHeight = 100
	  } else {
		  this.wlWidth = 380
		  this.wlHeight = 380
			this.wlPartWidth = 90
			this.wlPartHeight = 142
	  }
	  window.onresize = () => {
	    return (() => {
	      if (this.windowWidth < 992) {
			  this.wlWidth = 280
			  this.wlHeight = 280
			  this.wlPartWidth = 64
			  this.wlPartHeight = 100
		  } else {
			  this.wlWidth = 380
			  this.wlHeight = 380
				this.wlPartWidth = 90
				this.wlPartHeight = 142
		  }
	    })();
	  };
	},
	initPrizes(prizes) {
		for (const key in prizes) {
			if (Object.hasOwnProperty.call(prizes, key)) {
				const element = prizes[key];
				this.prizesIdByIndex[element.id] = key;
				this.prizes.push({
					fonts: [{
						text: this.$t(element.title),
						fontSize: '0',
						fontColor: '#ffffff',
						top: '-300'
					}],
					imgs: [{
						top: '-2',
						width: this.wlPartWidth,
						height: this.wlPartHeight,
						src: element.pic
					}]
				})
			}
		}
	},
	// 奖品配置列表
	async getLotteryConfig() {
	  await lottery_config_api().then(response => {
			let res = response.data
	    if (res && res.code == 1) {
				this.initPrizes(res.data.Prize)
				this.prizeConfig = res.data
				this.free_count = res.data.free_count;
				this.balance = res.data.balance;
				this.limit_count = res.data.limit_count;
	    }
	  });
	},
	// 抽奖记录
	getLotteryRecord() {
		let self = this
	  lottery_record_api().then(response => {
			let res = response.data
			if (res && res.code == 1) {
				for (const key in res.data.data) {
					if (Object.hasOwnProperty.call(res.data.data, key) && self.winlist) {
						const element = res.data.data[key];
						self.winlist.push({
							icon:require('@/assets/images/'+this.$store.state.currencyIcon),
							value:element.prize_price,
							uname:element.username
						})
					}
				}
				self.records = res.data.data
	    }
	  });
	},
  },
  async mounted() {
		await Promise.all([
			this.wheelSize(),
			this.getLotteryConfig(),
			this.getLotteryRecord()
		])

		if (this.$route.query.dialog === 'wheel' && this.$store.state.isLoginStatu) {
			this.$parent.wheelClick()
		}
  },
  watch: {
		wheelShow(val){
			if (val && this.prizes.length == 0 && this.$store.state.isLoginStatu) {
					this.getLotteryConfig();
					this.getLotteryRecord();
				}else if(!val){
					if(this.$route.query.dialog=="wheel"){
						this.$router.push(this.$route.path)
					}
				}
		}
	},
};
</script>

<style>
	.gallery-fury-wheel .swiper-slide{
		width: auto;
	}
	.modals-container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9000
	}

	.modal-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		text-align: center;
		white-space: nowrap;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 16px;
		background-color: rgba(3, 11, 21, .85)
	}

	@media(max-width:568px) {
		.modal-wrapper {
			padding: 8px
		}
	}

	.modal-wrapper:before {
		content: "";
		height: 100%;
		width: 0
	}

	.modal-wrapper:before,
	.modal-wrapper>div {
		display: inline-block;
		vertical-align: middle
	}

	.modal-wrapper>div {
		width: 100%;
		text-align: left;
		position: relative;
		white-space: normal;
		overflow: hidden;
		border-radius: 12px;
		opacity: 1;
		transform: translateZ(0)
	}

	.fury-wheel {
		position: relative;
		height: 100%
	}

	.fury-wheel--play .fury-wheel__wheel-help-wrap {
		-webkit-animation-play-state: running;
		animation-play-state: running
	}

	.fury-wheel--play .fury-wheel__wheel-help {
		-webkit-animation-play-state: paused;
		animation-play-state: paused
	}

	.fury-wheel--play .fury-wheel__body {
		-webkit-animation: bodyHide-data-v-5b9beddd .6s linear forwards;
		animation: bodyHide-data-v-5b9beddd .6s linear forwards
	}

	@media(max-width:767px) {
		.fury-wheel--play .fury-wheel__body {
			-webkit-animation: bodyHideMobile-data-v-5b9beddd .6s linear forwards;
			animation: bodyHideMobile-data-v-5b9beddd .6s linear forwards
		}
	}

	.fury-wheel--play .fury-wheel__winners {
		-webkit-animation: winnersHide-data-v-5b9beddd .6s linear forwards;
		animation: winnersHide-data-v-5b9beddd .6s linear forwards
	}

	.fury-wheel--play .fury-wheel__wheel-wrap {
		-webkit-animation: wheelCenter-data-v-5b9beddd .6s linear forwards;
		animation: wheelCenter-data-v-5b9beddd .6s linear forwards
	}

	@media(max-width:767px) {
		.fury-wheel--play .fury-wheel__wheel-wrap {
			-webkit-animation: wheelCenterMobile-data-v-5b9beddd .6s linear forwards;
			animation: wheelCenterMobile-data-v-5b9beddd .6s linear forwards;
			z-index: 5
		}

		.fury-wheel--play .fury-wheel__wheel-wrap:before {
			display: none
		}
	}

	.fury-wheel--play .fury-wheel__bg-wheel-img {
		-webkit-animation: bgImgCenter-data-v-5b9beddd .6s linear forwards;
		animation: bgImgCenter-data-v-5b9beddd .6s linear forwards
	}

	@media(max-width:767px) {
		.fury-wheel--play .fury-wheel__bg-wheel-img {
			-webkit-animation: bgImgCenterMobile-data-v-5b9beddd .6s linear forwards;
			animation: bgImgCenterMobile-data-v-5b9beddd .6s linear forwards
		}
	}

	.fury-wheel--play .fury-wheel__bg-wrap:before {
		-webkit-animation: bgCenter-data-v-5b9beddd .6s linear forwards;
		animation: bgCenter-data-v-5b9beddd .6s linear forwards
	}

	@media(max-width:767px) {
		.fury-wheel--play .fury-wheel__bg-wrap:before {
			-webkit-animation: bgCenterMobile-data-v-5b9beddd .6s linear forwards;
			animation: bgCenterMobile-data-v-5b9beddd .6s linear forwards
		}
	}

	.fury-wheel--change .fury-wheel__wheel-wrap {
		-webkit-animation: changeToWin-data-v-5b9beddd .6s linear forwards;
		animation: changeToWin-data-v-5b9beddd .6s linear forwards
	}

	@media(max-width:767px) {
		.fury-wheel {
			padding-top: 136px
		}
	}

	.fury-wheel__sound {
		position: absolute;
		z-index: 9;
		top: 19px;
		right: 60px
	}

	.fury-wheel__sound-icon {
		fill: #93acd3
	}

	.fury-wheel__sound-icon--active {
		fill: #3a07f2;
		fill: var(--color_blue)
	}

	.fury-wheel__sound-icon:hover {
		fill: #fff
	}

	.fury-wheel img {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.fury-wheel__bg-wrap {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 20px
	}

	.fury-wheel__bg-wrap:before {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		background: url(../assets/images/furyWheel/bg-help.png);
		width: 738px;
		height: 706px;
		transform: translate(-95%, -57%) scale(0);
		-webkit-animation: wheelBgShow-data-v-5b9beddd 1.2s linear .6s forwards;
		animation: wheelBgShow-data-v-5b9beddd 1.2s linear .6s forwards
	}

	@media(max-width:767px) {
		.fury-wheel__bg-wrap:before {
			left: 50%;
			top: 50%;
			width: 538px;
			height: 505px;
			transform: translate(-50%, -90%) scale(0);
			-webkit-animation: wheelBgShowMobile-data-v-5b9beddd 1.2s linear .6s forwards;
			animation: wheelBgShowMobile-data-v-5b9beddd 1.2s linear .6s forwards;
			background-size: cover
		}
	}

	.fury-wheel__bg-wheel-img {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 813px;
		max-width: 813px;
		height: 813px;
		transform: translate(-82%, -50%) scale(0);
		z-index: 2;
		-webkit-animation: wheelDecorShow-data-v-5b9beddd 1.2s linear .6s forwards;
		animation: wheelDecorShow-data-v-5b9beddd 1.2s linear .6s forwards
	}

	@media(max-width:767px) {
		.fury-wheel__bg-wheel-img {
			left: 50%;
			top: 50%;
			width: 647px;
			max-width: 647px;
			height: 647px;
			transform: translate(-50%, -70%) scale(0);
			-webkit-animation: wheelDecorShowMobile-data-v-5b9beddd 1.2s linear .6s forwards;
			animation: wheelDecorShowMobile-data-v-5b9beddd 1.2s linear .6s forwards;
			z-index: 5
		}
	}

	.fury-wheel__wheel-wrap {
		position: absolute;
		left: 0;
		top: 50%;
		background: linear-gradient(270deg, #010958, #1108bf);
		transform: translate(-400px, -50%) rotate(-60deg);
		opacity: 0;
		width: 483px;
		height: 483px;
		border-radius: 50%;
		z-index: 4;
		-webkit-animation: wheelShow-data-v-5b9beddd .6s linear .4s forwards;
		animation: wheelShow-data-v-5b9beddd .6s linear .4s forwards
	}

	@media(max-width:767px) {
		.fury-wheel__wheel-wrap {
			width: 350px;
			height: 350px;
			top: 40px;
			left: 50%;
			transform: translate(-50%, -100px) rotate(-60deg);
			-webkit-animation: wheelShowMobile-data-v-5b9beddd .6s linear .4s forwards;
			animation: wheelShowMobile-data-v-5b9beddd .6s linear .4s forwards
		}

		.fury-wheel__wheel-wrap:before {
			content: "";
			position: absolute;
			bottom: -30px;
			left: 0;
			width: 100%;
			height: 160px;
			background: linear-gradient(180deg, rgba(1, 9, 57, 0), #010939 51.96%, #010939);
			border-radius: 14px;
			z-index: 1;
			opacity: 0;
			-webkit-animation: shadow-show-data-v-5b9beddd .1s linear .6s forwards;
			animation: shadow-show-data-v-5b9beddd .1s linear .6s forwards
		}
	}

	.fury-wheel__arrow-img {
		position: absolute;
		left:50%;
		top: 30px;
		transform: translate(-48%, -50%);
		width: 86px;
		height: 31px;
		z-index: 2;
	}

	.fury-wheel__arrow-img--win-pulse {
		-webkit-animation: pulse-arrow-data-v-5b9beddd .6s linear !important;
		animation: pulse-arrow-data-v-5b9beddd .6s linear !important
	}

	@media(max-width:767px) {
		.fury-wheel__arrow-img--win-pulse {
			-webkit-animation: pulse-arrow-mobile-data-v-5b9beddd .6s linear !important;
			animation: pulse-arrow-mobile-data-v-5b9beddd .6s linear !important
		}
	}

	.fury-wheel__arrow-img--disabled {
		-webkit-animation: none;
		animation: none
	}

	@media(max-width:767px) {
		.fury-wheel__arrow-img {
			left: 50%;
			transform: translateX(-50%);
			top:32px;
			width:64px;
			height:23px;
			z-index:1111;
		}
	}

	.fury-wheel__wheel-img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 381px;
		height: 381px;
		z-index:111;
		transition-property: transform;
		transition-timing-function: cubic-bezier(.19, -.11, .03, 1.04)
	}

	@media(max-width:767px) {
		.fury-wheel__wheel-img {
			width: 284px;
			height: 284px
		}
	}

	.fury-wheel__wheel-help-wrap {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 458px;
		height: 458px;
		-webkit-animation: rolling-data-v-5b9beddd 5s linear .6s infinite;
		animation: rolling-data-v-5b9beddd 5s linear .6s infinite;
		-webkit-animation-play-state: paused;
		animation-play-state: paused
	}

	.fury-wheel__wheel-help-wrap-3,
	.fury-wheel__wheel-help-wrap-5,
	.fury-wheel__wheel-help-wrap-7 {
		animation-direction: reverse
	}

	@media(max-width:767px) {
		.fury-wheel__wheel-help-wrap {
			width: 350px;
			height: 350px
		}
	}

	.fury-wheel__wheel-help {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-animation: rolling-data-v-5b9beddd 20s linear .6s infinite;
		animation: rolling-data-v-5b9beddd 20s linear .6s infinite;
		-webkit-animation-play-state: running;
		animation-play-state: running
	}

	.fury-wheel__wheel-help-3,
	.fury-wheel__wheel-help-5,
	.fury-wheel__wheel-help-7 {
		animation-direction: reverse
	}

	.fury-wheel__wheel-btn {
		position: absolute;
		padding: 0;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		background: linear-gradient(270deg, #010958, #1108bf);
		border-radius: 50%;
		width: 99px;
		height: 99px;
		cursor: pointer;
		z-index: 9;
		-webkit-animation: pulse-btn-data-v-5b9beddd 2.5s linear 1s infinite;
		animation: pulse-btn-data-v-5b9beddd 2.5s linear 1s infinite
	}

	.fury-wheel__wheel-btn--win-pulse {
		-webkit-animation: pulse-btn-data-v-5b9beddd .6s linear !important;
		animation: pulse-btn-data-v-5b9beddd .6s linear !important
	}

	.fury-wheel__wheel-btn--disabled {
		pointer-events: none;
		-webkit-animation: none;
		animation: none
	}

	.fury-wheel__wheel-btn--disabled .fury-wheel__btn-img {
		opacity: .3
	}

	.fury-wheel__wheel-btn:hover .fury-wheel__btn-content,
	.fury-wheel__wheel-btn:hover .fury-wheel__btn-wrap {
		background: linear-gradient(180deg, #ff9c29, #ff2e00)
	}

	.fury-wheel__wheel-btn:active .fury-wheel__btn-img {
		opacity: .8
	}

	@media(max-width:767px) {
		.fury-wheel__wheel-btn {
			width: 70px;
			height: 70px
		}
	}

	.fury-wheel__btn-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50.5%, -50.5%);
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(180deg, #ffb629, #ff3d00);
		box-shadow: 0 3.42188px 5.70312px rgba(0, 0, 0, .4);
		width: 91px;
		height: 91px;
		border-radius: 50%
	}

	@media(max-width:767px) {
		.fury-wheel__btn-wrap {
			transform: translate(-50%, -50%);
			width: 65px;
			height: 65px
		}
	}

	.fury-wheel__btn-content {
		position: relative;
		width: 68px;
		height: 68px;
		background: linear-gradient(180deg, #ffb629, #ff3d00);
		transform: matrix(1, 0, 0, -1, 0, 0);
		border-radius: 50%;
		border: 1px solid #ffc58f
	}

	@media(max-width:767px) {
		.fury-wheel__btn-content {
			width: 45px;
			height: 45px
		}
	}

	.fury-wheel__btn-img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-52%, -55%) matrix(1, 0, 0, -1, 0, 0);
		width: 41px;
		height: 41px
	}

	@media(max-width:767px) {
		.fury-wheel__btn-img {
			width: 28px;
			height: 28px
		}
	}

	.fury-wheel__body {
		position: relative;
		padding-left: 322px;
		padding-top:20px;
		text-align: center;
		z-index: 3;
		transform: translate(300px);
		opacity: 0;
		-webkit-animation: bodyShow-data-v-5b9beddd .6s linear .4s forwards;
		animation: bodyShow-data-v-5b9beddd .6s linear .4s forwards
	}

	@media(max-width:767px) {
		.fury-wheel__body {
			pointer-events: none;
			transform: translateY(500px);
			-webkit-animation: bodyShowMobile-data-v-5b9beddd .6s linear .4s forwards;
			animation: bodyShowMobile-data-v-5b9beddd .6s linear .4s forwards;
			padding-left: 0;
			z-index: 5
		}
	}

	.fury-wheel__racoon-img {
		width: 95%;
	}

	@media(max-width:767px) {
		.fury-wheel__racoon-img {
			width: 268px;
			margin-top: 0
		}
	}
	.fury-wheel__group{
		margin:0 auto ;
		width: 180px;
		margin-bottom: 12px;
	}
	.fury-wheel__btn {
		position: relative;
		margin:0 auto 15px;
		height: 49px;
		width:100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(180deg, #c0f, #11b0ff);
		box-shadow: 0 10px 35px rgba(0, 163, 255, .56);
		color: #ffffff;
		border-radius: 14px;
		font-weight: 600;
		font-size: 18px;
		line-height: 23px;
		padding: 0 20px;
		overflow: hidden
	}
	.fury-wheel__btn span{
		font-size: 14px;
	}
	.fury-wheel__less{
		height: 50px;
		background: #000C51;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height:1;
	}
	.fury-wheel__less .vnd-light{
		width: 22px;
		width: 22px;
		margin-right:8px;
	}
	.fury-wheel__btn:before {
		left: 20px;
		width: 20px
	}

	.fury-wheel__btn:after,
	.fury-wheel__btn:before {
		content: "";
		position: absolute;
		top: 50%;
		height: 90px;
		background: #fff;
		opacity: .4;
		filter: blur(5px);
		transform: translate(-150px, -50%) rotate(45deg);
		-webkit-animation: highlight-btn-data-v-5b9beddd 3s linear infinite;
		animation: highlight-btn-data-v-5b9beddd 3s linear infinite
	}

	.fury-wheel__btn:after {
		left: 80px;
		width: 30px
	}

	@media(max-width:767px) {
		.fury-wheel__btn {
			pointer-events: all;
			margin: 18px auto 13px
		}
		.fury-wheel__group{
		  width: 240px;
		  margin-top: -40px;
		}
	}

	.fury-wheel__btn:hover {
		background: linear-gradient(180deg, rgba(204, 0, 255, .9), rgba(17, 176, 255, .9))
	}

	.fury-wheel__btn:active {
		box-shadow: 0 5px 20px rgba(0, 163, 255, .56)
	}

	.fury-wheel__link {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 14px;
		line-height: 22px;
		color: #3a07f2;
		margin: auto
	}

	@media(max-width:767px) {
		.fury-wheel__link {
			pointer-events: all
		}
	}

	.fury-wheel__link svg {
		fill: #3a07f2;
		margin-left: 4px
	}

	.fury-wheel__timer-label {
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		color: #8f9ef6;
		text-align: center;
		margin-bottom: 8px
	}

	.fury-wheel__timer-block {
		margin: 30px 0 48px
	}

	@media(max-width:767px) {
		.fury-wheel__timer-block {
			margin: 12px 0
		}
	}

	.fury-wheel__timer,
	.fury-wheel__timer-time {
		display: flex;
		align-items: center;
		justify-content: center
	}

	.fury-wheel__timer-time {
		position: relative;
		width: 46px;
		height: 40px;
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		background: linear-gradient(180deg, #7c1da9, #5d32ef);
		border-radius: 8px;
		margin-right: 22px
	}

	.fury-wheel__timer-time:before {
		content: ":";
		position: absolute;
		top: 50%;
		right: -16px;
		transform: translateY(-60%);
		font-weight: 400;
		font-size: 48px;
		line-height: 36px;
		color: #5e4190
	}

	@media(max-width:767px) {
		.fury-wheel__timer-time:before {
			font-size: 36px;
			right: -15px
		}
	}

	.fury-wheel__timer-time:last-child {
		margin-right: 0
	}

	.fury-wheel__timer-time:last-child:before {
		display: none
	}

	.fury-wheel__footer {
		width: 100%;
		max-width: 500px;
		margin-left: auto;
		margin-top: 12px;
		overflow: hidden;
		z-index: 3
	}

	@media(max-width:767px) {
		.fury-wheel__footer {
			max-width: 100%
		}
	}

	.fury-wheel__winners {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row-reverse;
		position: relative;
		padding-right: 13px;
		border-radius: 15px;
		margin-bottom: 12px;
		opacity: 0;
		-webkit-animation: winnersShow-data-v-5b9beddd .6s linear .6s forwards;
		animation: winnersShow-data-v-5b9beddd .6s linear .6s forwards
	}

	.fury-wheel__winners:before {
		content: "";
		position: absolute;
		left: -30px;
		top: 0;
		width: 231px;
		height: 100%;
		background: linear-gradient(90deg, #010939 12.86%, rgba(1, 9, 57, 0));
		z-index: 2
	}

	.fury-wheel__winner {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 12px;
		line-height: 16px;
		background: rgba(110, 102, 244, .21);
		border-radius: 15px;
		padding: 4px 6px;
		margin-left: 4px;
		min-width: 16%;
		transition: all 1s;
		-webkit-animation-duration: .5s;
		animation-duration: .5s;
		-webkit-animation-direction: normal;
		animation-direction: normal;
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
		-webkit-animation-play-state: running;
		animation-play-state: running;
		-webkit-animation-timing-function: ease-out;
		animation-timing-function: ease-out;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fury-wheel__winner:first-child {
		-webkit-animation-name: horizont-1-data-v-5b9beddd;
		animation-name: horizont-1-data-v-5b9beddd
	}

	.fury-wheel__winner:nth-child(2n) {
		-webkit-animation-name: horizont-2-data-v-5b9beddd;
		animation-name: horizont-2-data-v-5b9beddd
	}

	.fury-wheel__winner:nth-child(odd) {
		-webkit-animation-name: horizont-3-data-v-5b9beddd;
		animation-name: horizont-3-data-v-5b9beddd
	}

	.fury-wheel__winner img {
		margin-right: 6px
	}

	@media(max-width:767px) {
		.fury-wheel__winner {
			min-width: 25%
		}
	}

	@-webkit-keyframes wheelShow-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translate(-400px, -50%) rotate(-60deg)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(-136px, -50%) rotate(0)
		}
	}

	@keyframes wheelShow-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translate(-400px, -50%) rotate(-60deg)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(-136px, -50%) rotate(0)
		}
	}

	@-webkit-keyframes changeToWin-data-v-5b9beddd {
		0% {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0);
			opacity: 1
		}

		to {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0) scale(0)
		}
	}

	@keyframes changeToWin-data-v-5b9beddd {
		0% {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0);
			opacity: 1
		}

		to {
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0) scale(0)
		}
	}

	@-webkit-keyframes wheelCenter-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(-136px, -50%) rotate(0)
		}

		to {
			opacity: 1;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0)
		}
	}

	@keyframes wheelCenter-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(-136px, -50%) rotate(0)
		}

		to {
			opacity: 1;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0)
		}
	}

	@-webkit-keyframes wheelCenterMobile-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(-50%, -15%) rotate(0)
		}

		to {
			opacity: 1;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0)
		}
	}

	@keyframes wheelCenterMobile-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(-50%, -15%) rotate(0)
		}

		to {
			opacity: 1;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%) rotate(0)
		}
	}

	@-webkit-keyframes bgImgCenter-data-v-5b9beddd {
		0% {
			transform: translate(-82%, -50%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@keyframes bgImgCenter-data-v-5b9beddd {
		0% {
			transform: translate(-82%, -50%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@-webkit-keyframes bgImgCenterMobile-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -70%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@keyframes bgImgCenterMobile-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -70%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@-webkit-keyframes bgCenter-data-v-5b9beddd {
		0% {
			transform: translate(-95%, -57%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@keyframes bgCenter-data-v-5b9beddd {
		0% {
			transform: translate(-95%, -57%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@-webkit-keyframes bgCenterMobile-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -90%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@keyframes bgCenterMobile-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -90%) scale(1)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@-webkit-keyframes wheelShowMobile-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translate(-50%, -200px) rotate(-60deg)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(-50%, -15%) rotate(0)
		}
	}

	@keyframes wheelShowMobile-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translate(-50%, -200px) rotate(-60deg)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(-50%, -15%) rotate(0)
		}
	}

	@-webkit-keyframes bodyShow-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translate(300px)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(0)
		}
	}

	@keyframes bodyShow-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translate(300px)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(0)
		}
	}

	@-webkit-keyframes bodyHide-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(0)
		}

		80% {
			opacity: 0
		}

		to {
			opacity: 0;
			transform: translate(300px)
		}
	}

	@keyframes bodyHide-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(0)
		}

		80% {
			opacity: 0
		}

		to {
			opacity: 0;
			transform: translate(300px)
		}
	}

	@-webkit-keyframes bodyHideMobile-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(0)
		}

		80% {
			opacity: 0
		}

		to {
			opacity: 0;
			transform: translateY(300px)
		}
	}

	@keyframes bodyHideMobile-data-v-5b9beddd {
		0% {
			opacity: 1;
			transform: translate(0)
		}

		80% {
			opacity: 0
		}

		to {
			opacity: 0;
			transform: translateY(300px)
		}
	}

	@-webkit-keyframes bodyShowMobile-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translateY(500px)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(0)
		}
	}

	@keyframes bodyShowMobile-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translateY(500px)
		}

		80% {
			opacity: 1
		}

		to {
			opacity: 1;
			transform: translate(0)
		}
	}

	@-webkit-keyframes winnersShow-data-v-5b9beddd {
		to {
			opacity: 1
		}
	}

	@keyframes winnersShow-data-v-5b9beddd {
		to {
			opacity: 1
		}
	}

	@-webkit-keyframes winnersHide-data-v-5b9beddd {
		0% {
			opacity: 1
		}

		to {
			opacity: 0
		}
	}

	@keyframes winnersHide-data-v-5b9beddd {
		0% {
			opacity: 1
		}

		to {
			opacity: 0
		}
	}

	@-webkit-keyframes wheelDecorShow-data-v-5b9beddd {
		0% {
			transform: translate(-82%, -50%) scale(0)
		}

		to {
			transform: translate(-82%, -50%) scale(1)
		}
	}

	@keyframes wheelDecorShow-data-v-5b9beddd {
		0% {
			transform: translate(-82%, -50%) scale(0)
		}

		to {
			transform: translate(-82%, -50%) scale(1)
		}
	}

	@-webkit-keyframes wheelDecorShowMobile-data-v-5b9beddd {
		0% {
			z-index: 1;
			transform: translate(-50%, -70%) scale(0)
		}

		to {
			z-index: 5;
			transform: translate(-50%, -70%) scale(1)
		}
	}

	@keyframes wheelDecorShowMobile-data-v-5b9beddd {
		0% {
			z-index: 1;
			transform: translate(-50%, -70%) scale(0)
		}

		to {
			z-index: 5;
			transform: translate(-50%, -70%) scale(1)
		}
	}

	@-webkit-keyframes wheelBgShow-data-v-5b9beddd {
		0% {
			transform: translate(-95%, -57%) scale(0)
		}

		to {
			transform: translate(-95%, -57%) scale(1)
		}
	}

	@keyframes wheelBgShow-data-v-5b9beddd {
		0% {
			transform: translate(-95%, -57%) scale(0)
		}

		to {
			transform: translate(-95%, -57%) scale(1)
		}
	}

	@-webkit-keyframes wheelBgShowMobile-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -90%) scale(0)
		}

		to {
			transform: translate(-50%, -90%) scale(1)
		}
	}

	@keyframes wheelBgShowMobile-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -90%) scale(0)
		}

		to {
			transform: translate(-50%, -90%) scale(1)
		}
	}

	@-webkit-keyframes rolling-data-v-5b9beddd {
		to {
			transform: translate(-50%, -50%) rotate(1turn)
		}
	}

	@keyframes rolling-data-v-5b9beddd {
		to {
			transform: translate(-50%, -50%) rotate(1turn)
		}
	}

	@-webkit-keyframes pulse-btn-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -50%) scale(1.1)
		}

		50% {
			transform: translate(-50%, -50%) scale(1.2)
		}

		to {
			transform: translate(-50%, -50%) scale(1.1)
		}
	}

	@keyframes pulse-btn-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -50%) scale(1.1)
		}

		50% {
			transform: translate(-50%, -50%) scale(1.2)
		}

		to {
			transform: translate(-50%, -50%) scale(1.1)
		}
	}

	@-webkit-keyframes pulse-arrow-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -50%) scale(1.1)
		}

		50% {
			transform: translate(-50%, -50%) scale(1.2)
		}

		to {
			transform: translate(-50%, -50%) scale(1.1)
		}
	}

	@keyframes pulse-arrow-data-v-5b9beddd {
		0% {
			transform: translate(-50%, -50%) scale(1.1)
		}

		50% {
			transform: translate(-50%, -50%) scale(1.2)
		}

		to {
			transform: translate(-50%, -50%) scale(1.1)
		}
	}

	@-webkit-keyframes pulse-arrow-mobile-data-v-5b9beddd {
		0% {
			transform: translateY(-50%) scale(1.1)
		}

		50% {
			transform: translateY(-50%) scale(1.2)
		}

		to {
			transform: translateY(-50%) scale(1.1)
		}
	}

	@keyframes pulse-arrow-mobile-data-v-5b9beddd {
		0% {
			transform: translateY(-50%) scale(1.1)
		}

		50% {
			transform: translateY(-50%) scale(1.2)
		}

		to {
			transform: translateY(-50%) scale(1.1)
		}
	}

	@-webkit-keyframes highlight-btn-data-v-5b9beddd {

		0%,
		80% {
			transform: translate(-150px, -50%) rotate(45deg)
		}

		to {
			transform: translate(200px, -50%) rotate(45deg)
		}
	}

	@keyframes highlight-btn-data-v-5b9beddd {

		0%,
		80% {
			transform: translate(-150px, -50%) rotate(45deg)
		}

		to {
			transform: translate(200px, -50%) rotate(45deg)
		}
	}

	@-webkit-keyframes shadow-show-data-v-5b9beddd {
		to {
			opacity: 1
		}
	}

	@keyframes shadow-show-data-v-5b9beddd {
		to {
			opacity: 1
		}
	}

	@-webkit-keyframes horizont-1-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translateX(99.99%)
		}
	}

	@keyframes horizont-1-data-v-5b9beddd {
		0% {
			opacity: 0;
			transform: translateX(99.99%)
		}
	}

	@-webkit-keyframes horizont-2-data-v-5b9beddd {
		0% {
			transform: translateX(99.99%)
		}
	}

	@keyframes horizont-2-data-v-5b9beddd {
		0% {
			transform: translateX(99.99%)
		}
	}

	@-webkit-keyframes horizont-3-data-v-5b9beddd {
		0% {
			transform: translateX(99.99%)
		}
	}

	@keyframes horizont-3-data-v-5b9beddd {
		0% {
			transform: translateX(99.99%)
		}
	}

	.wheel-win {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		transform: translate(-50%, -50%);
		text-align: center;
		border-radius: 20px;
		height: 100%;
		z-index: 4
	}

	@media(max-width:767px) {
		.wheel-win {
			padding: 120px 0 32px
		}
	}

	.wheel-win img {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.wheel-win .wheel-win__btn-back {
		position: absolute;
		left: 16px;
		top: 16px;
		z-index: 5;
		width: 32px;
		height: 32px;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center
	}

	.wheel-win__coins-block {
		position: absolute;
		top: 0;
		height: 100%;
		width: 100%
	}

	.wheel-win__coins {
		position: absolute;
		left: -20px;
		top: -20px;
		right: -20px;
		bottom: -20px;
		max-width: none;
		z-index: 5;
		transform: scale(0);
		-webkit-animation: coins-show-data-v-be806286 .6s linear forwards;
		animation: coins-show-data-v-be806286 .6s linear forwards
	}

	@media(max-width:767px) {
		.wheel-win__coins {
			top: 50%;
			left: 50%;
			right: 0;
			bottom: 0;
			padding-bottom: 56px;
			transform: translate(-50%, -50%) scale(0);
			-webkit-animation: coins-show-mobile-data-v-be806286 .6s linear forwards;
			animation: coins-show-mobile-data-v-be806286 .6s linear forwards
		}
	}

	.wheel-win__coins-fun {
		position: absolute;
		left: -80px;
		top: -30px;
		right: 40px;
		bottom: -10px;
		max-width: none;
		z-index: 5;
		-webkit-animation: coins-show-data-v-be806286 .6s linear forwards;
		animation: coins-show-data-v-be806286 .6s linear forwards
	}
	@media(max-width:767px) {
		.wheel-win__coins-fun {
			position: static;
			width: 100%;
		}
	}
	.wheel-win__body {
		opacity: 0;
		-webkit-animation: showWin-data-v-be806286 1s linear forwards;
		animation: showWin-data-v-be806286 1s linear forwards
	}

	.wheel-win__amount-wrap,
	.wheel-win__body {
		position: relative
	}

	.wheel-win__label-img {
		margin-bottom: 10px
	}

	@media(max-width:767px) {
		.wheel-win__label-img {
			margin-bottom: 15px
		}
	}

	.wheel-win__amount-block {
		position: absolute;
		bottom: 30px;
		left: 50%;
		display: flex;
		align-items: center;
		transform: translate(-50%)
	}

	.wheel-win__amount-block img {
		width: 36px;
		height: 36px
	}

	@media(max-width:767px) {
		.wheel-win__amount-block img {
			width: 32px;
			height: 32px
		}
	}

	.wheel-win__amount-sum {
		font-weight: 700;
		font-size: 22px;
		line-height: 32px;
		text-shadow: 0 9.5429px 25.4477px rgba(20, 26, 41, .32);
		margin: 0 0 0 7px
	}

	@media(max-width:767px) {
		.wheel-win__amount-sum {
			font-size: 18px
		}
	}

	.wheel-win__currency-name {
		font-weight: 700;
		font-size: 22px;
		line-height: 32px;
		margin-left: 4px;
		margin-bottom: 0;
		text-transform: capitalize
	}

	@media(max-width:767px) {
		.wheel-win__currency-name {
			font-size: 18px
		}
	}

	.wheel-win__desc {
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		max-width: 300px;
		text-align: center;
		margin: 0 auto 16px
	}

	.wheel-win__desc--orange {
		color: #ffb636
	}

	.wheel-win__btn-block {
		margin-bottom: 57px;
		margin-left:auto;
		margin-right:auto;
		max-width: 150px;
	}
	.wheel-win__btn-block .button_fullwidth{
		margin-bottom: 20px;
	}

	@media(max-width:767px) {
		.wheel-win__btn-block {
			margin-bottom: 40px
		}
	}

	.wheel-win__btn-block button {
		position: relative;
		overflow: hidden;
		height: 44px;
		border: 0
	}

	.wheel-win__btn-block button:before {
		left: 20px;
		width: 20px
	}

	.wheel-win__btn-block button:after,
	.wheel-win__btn-block button:before {
		content: "";
		position: absolute;
		top: 50%;
		height: 90px;
		background: #fff;
		opacity: .4;
		filter: blur(5px);
		transform: translate(-150px, -50%) rotate(45deg);
		-webkit-animation: highlight-btn-data-v-be806286 3s linear infinite;
		animation: highlight-btn-data-v-be806286 3s linear infinite
	}

	.wheel-win__btn-block button:after {
		left: 80px;
		width: 30px
	}

	@-webkit-keyframes showWin-data-v-be806286 {
		0% {
			opacity: 0
		}

		10% {
			opacity: 0
		}

		to {
			opacity: 1
		}
	}

	@keyframes showWin-data-v-be806286 {
		0% {
			opacity: 0
		}

		10% {
			opacity: 0
		}

		to {
			opacity: 1
		}
	}

	@-webkit-keyframes coins-show-data-v-be806286 {
		0% {
			transform: scale(0)
		}

		to {
			transform: scale(1)
		}
	}

	@keyframes coins-show-data-v-be806286 {
		0% {
			transform: scale(0)
		}

		to {
			transform: scale(1)
		}
	}

	@-webkit-keyframes coins-show-mobile-data-v-be806286 {
		0% {
			transform: translate(-50%, -50%) scale(0)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@keyframes coins-show-mobile-data-v-be806286 {
		0% {
			transform: translate(-50%, -50%) scale(0)
		}

		to {
			transform: translate(-50%, -50%) scale(1)
		}
	}

	@-webkit-keyframes highlight-btn-data-v-be806286 {

		0%,
		80% {
			transform: translate(-150px, -50%) rotate(45deg)
		}

		to {
			transform: translate(200px, -50%) rotate(45deg)
		}
	}

	@keyframes highlight-btn-data-v-be806286 {

		0%,
		80% {
			transform: translate(-150px, -50%) rotate(45deg)
		}

		to {
			transform: translate(200px, -50%) rotate(45deg)
		}
	}

	.wheel-history {
		position: absolute;
		left: -136px;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 11;
		border-radius: 20px;
		overflow: hidden;
		pointer-events: none
	}

	.wheel-history .user__name {
		font-size: 12px
	}

	.wheel-history--show {
		pointer-events: all
	}

	.wheel-history--show .wheel-history__content {
		transition: all 1s;
		transform: translateX(0)
	}

	@media(max-width:767px) {
		.wheel-history {
			left: 0
		}
	}

	.wheel-history__content {
		position: absolute;
		right: 0;
		top: 0;
		width: 530px;
		max-width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #001768, #0f1420 15.43%, #0f1420);
		border-radius: 20px;
		padding: 32px 32px 0;
		transition: all 1s;
		transform: translateX(100%)
	}

	@media(max-width:767px) {
		.wheel-history__content {
			padding: 32px 24px 0
		}
	}

	.wheel-history__head {
		display: flex;
		align-items: center;
		margin-bottom: 28px
	}

	.wheel-history__btn-close {
		width: 38px;
		height: 38px;
		border: none;
		font-weight: 500;
		font-size: 38px;
		line-height: 38px;
		color: #93acd3;
		background-color: transparent;
		padding: 0;
		position: absolute;
		top: 0;
		right: 0;
		outline: none;
		z-index: 10;
		transition: color .1s ease-in-out
	}

	.wheel-history__btn-close:hover {
		color: #fff;
		color: var(--color_white)
	}

	.wheel-history .wheel-history__btn-back {
		width: 32px;
		height: 32px;
		padding: 5px;
		margin-right: 8px
	}

	.wheel-history__title {
		margin: 0;
		font-weight: 600;
		font-size: 18px;
		line-height: 24px
	}

	.wheel-history__tabs {
		display: flex;
		align-items: center;
		margin-bottom: 16px
	}

	.wheel-history__tab {
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		color: #93acd3;
		margin-right: 14px;
		cursor: pointer;
		padding: 7px 10px
	}

	.wheel-history__tab--active {
		color: #fff;
		background: #3a07f2;
		border-radius: 32px
	}

	.wheel-history__table {
		width: 100%
	}

	.wheel-history__row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #1c2532
	}

	.wheel-history__row:last-child {
		border: none
	}

	.wheel-history__row--recent .wheel-history__col:first-child {
		max-width: 28%
	}

	.wheel-history__row--recent .wheel-history__col:nth-child(2) {
		max-width: 40%
	}

	.wheel-history__row--recent .wheel-history__col:nth-child(3) {
		max-width: 32%
	}

	.wheel-history__col {
		display: flex;
		align-items: center;
		max-width: 25%;
		width: 100%;
		height: 40px
	}

	.wheel-history__col:first-child {
		max-width: 40%
	}

	.wheel-history__col:nth-child(2) {
		max-width: 35%
	}

	@media(max-width:767px) {
		.wheel-history__col:first-child {
			max-width: 28%
		}

		.wheel-history__col:nth-child(2) {
			max-width: 40%
		}

		.wheel-history__col:last-child {
			max-width: 32%
		}
	}

	.wheel-history__col--time {
		font-weight: 600;
		font-size: 12px;
		line-height: 16px;
		color: #93acd3
	}

	.wheel-history__col--head {
		font-weight: 600;
		font-size: 11px;
		line-height: 16px;
		color: #55657e
	}

	.fury-wheel-modal {
		position: relative;
		background: #010939;
		transition: all 1s;
		overflow: visible !important;
		margin-left: 136px;
		height: 580px
	}

	@media(max-width:767px) {
		.fury-wheel-modal {
			height: 590px
		}
	}

	.fury-wheel-modal--play {
		margin-left: 0
	}

	.fury-wheel-modal:before {
		display: none
	}

	.fury-wheel-modal .modal__container {
		padding: 0;
		height: 100%
	}

	@media(max-width:767px) {
		.fury-wheel-modal {
			margin-left: 0;
			overflow: hidden !important
		}
	}

	.modal__btn-close{
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
		display: flex;
		align-items: center;
		justify-content: center;
		outline: none;
		z-index: 10;
		transition: color .1s ease-in-out
	}

	.modal__btn-close:hover,
	.modal__container{
		color: #fff;
	}

	.modal__container{
		position: relative;
		z-index: 2;
		min-height: 62px;
		padding: 20px 24px
	}
	.button_grey1.button{
		color: #55657e;
	}
	.user__wrap{
	    display: flex;
	    flex-direction: column;
	}
	.user--clickable{
	    cursor: pointer;
	}
	.user {
	    display: flex;
	    align-items: center;
	}
	.user__additional-info, .user__name{
	    margin-left: 8px;
	}
	.fury-less-time{
		height: 36px;
		background: #000C51;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		margin-bottom: 10px;
	}


</style>
