<template>
	<div class="jackpot-main">
		<el-skeleton v-if="skeletonShow" :rows="1" :count="1" animated :throttle="500">
			<template slot="template">
				<div class="jackpot-panel">
					<h2><el-skeleton-item variant="h1" /></h2>
					<h2><el-skeleton-item variant="h3" /></h2>
				</div>
			</template>
		</el-skeleton>
		<template v-else>
			<div class="jackpot-panel" v-if="gameDate != ''" >
				<div class="jackpot-left" @click="goNewsDetails(gameDate.id)">
					<div class="jackpot-label" :data-text="gameDate.title">{{ gameDate.title }}</div>
					<div class="jackpot-cell">
						<img :src="require('@/assets/images/' + $store.state.currencyIcon)" class="currency__icon" />
						<div class="flex-col">
							<div class="jackpot-value" :data-text="numFormat(gameDate.amount)">{{ numFormat(gameDate.amount) }}</div>
						</div>
					</div>
				</div>
				<div class="jackpot-right">
					<swiper class="swiper gallery-game" :options="swiperOptionGame" ref="swiperThumbs">
						<swiper-slide v-for="(gameitem, index) in gameDate.games" :key="`game${index}`">
							<div class="game__link-box" @click="getGameGetUrl(gameitem.game_status, gameitem)">
								<img :src="gameitem.gi_headimg" alt="">
								<div class="play-title">{{ $t(gameitem.gi_name) }}</div>
								<div class="game-preview__btn-play">
									<svgIcon icon="icon-play" widthName="12" heightName="12" class="play"></svgIcon>
								</div>
							</div>
						</swiper-slide>
					</swiper>
				</div>
			</div>
			<div class="jackpot-panel" v-else>
				<div class="jackpot-left" style="width: 90%;">
					<div class="jackpot-label" :data-text="$t('JACKPOT POOL')">{{ $t('JACKPOT POOL') }}</div>
					<div class="jackpot-cell">
						<img :src="require('@/assets/images/' + $store.state.currencyIcon)" class="currency__icon" />
						<div class="flex-col flex-center">
							<!-- <div class="jackpot-value" :data-text="jackvalue">{{ jackvalue }}</div> -->
							<div v-for="(digit, index) in digitsWithComma" :key="index" class="digit-wrapper" :class="digit == ',' || digit == '.' ? 'digit-sm-wrapper' : ''">
								<template v-if="digit == ','">
									<div class="digit-unit">,</div>
								</template>
								<template v-else>
									<div v-if="digit == '.'" class="digit-unit">.</div>
									<div v-else class="digit" :style="{ transform: 'translateY(-' + (digit * digitHeight) + 'px)' }">
										<span v-for="n in 10" :key="n">
											{{ n - 1 }}
										</span>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
				<el-tooltip class="item" effect="dark" :content="$t('JACKPOT提示')" placement="top">
					<svgIcon icon="icon-info-circle" className="jack-infocircle" widthName="22" heightName="22"></svgIcon>
				</el-tooltip>
			</div>
		</template>
	</div>
</template>
<script>
import svgIcon from "@/components/svg.vue";
import { journalism_list_api, journalism_type_api } from "@/api/news";
export default {
	components: { svgIcon },
	data() {
		return {
			skeletonShow: true,
			jackvalue: '13282184.34',
			gameDate: {},
			stakingthumbs: [],
			swiperOptionGame: {
				autoplay: true,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				navigation: {
					nextEl: ".splide__arrow--next",
					prevEl: ".splide__arrow--prev",
				},
				slidesPerView: 3,
				spaceBetween: 10,
				breakpoints: {
					640: {
						slidesPerView: 1,
					},
					1200: {
						slidesPerView: 3,
					},
				},
			},
			windowWidth: null,
			digits: [],
			digitsWithComma: [],
			number: 13282184.34,
			digitWidth: 24,
			digitHeight: 35,
		};
	},
	mounted() {
		this.setDigits();
		this.startRolling();
		this.getWindowWidth();
		window.addEventListener('resize', this.getWindowWidth);
		this.getJournalismList()
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.getWindowWidth);
	},
	methods: {
		async getJournalismList() {
			let data = {
				is_amount: 1
			};
			await journalism_list_api(data).then(res => {
				if (res && res.data.code == 1) {
					if(this.gameDate = res.data.data.length>0){
						this.gameDate = res.data.data[0];
					}
					this.skeletonShow = false
					console.log(res.data.data)
				}
			});
		},
		goNewsDetails(id) {
			this.$router.push({ path: `/news-detail/${id}` });
		},
		// 获取游戏路径
		async getGameGetUrl(game_status, item) {
			console.log(item, 'itemitemitemitem')
			if (!this.$store.state.isLoginStatu) {
				this.showLoginReg(1);
				return;
			}
			if (
				item &&
				item.g_is_self == 1 &&
				item.g_exfield != "" &&
				item.g_exfield != null
			) {
				this.goUrl(item.g_exfield);
				return;
			}
			if (item && item.g_tcid == 15) {
				this.goUrl("/sport-betting");
				return;
			}
			if (game_status == 1) {
				this.$router.push({ path: '/game-detail', query: { id: item.id } })
			} else {
				this.$notify({
					customClass: "noticeClass",
					dangerouslyUseHTMLString: true,
					duration: "3000",
					message:
						'<div class="notice-bar">' +
						'<div class="bar-ico">⚔️</div>' +
						'<div class="flex_bd">' +
						`<div class="notice-tit">${this.$t("通知")}</div>` +
						`<div class="notice-desc">${this.$t("暂未开放")}</div>` +
						"</div>" +
						"</div>",
				});
			}
		},
		getWindowWidth() {
			this.windowWidth = window.innerWidth;
			if (this.windowWidth < 992) {
				this.digitHeight = 26
			} else {
				this.digitHeight = 56
			}
		},
		setDigits() {
			this.digits = this.number.toFixed(2).toString().split('').reverse();
			this.digitsWithComma = [];
			for (let i = 0; i < this.digits.length; i++) {
				if (i % 3 === 0 && i !== 0 && i > 3) {
					this.digitsWithComma.unshift(',');
				}
				this.digitsWithComma.unshift(this.digits[i]);
			}
		},
		startRolling() {
			let interval = setInterval(() => {
				this.number += parseFloat((5 + Math.random() * 5).toFixed(2));
				this.setDigits();
				let timeElapsed = Date.now() - this.$options.mountedAt;
				if (timeElapsed > 7 * 24 * 60 * 60 * 1000) {
					this.number = 13282184.34;
					this.setDigits();
					clearInterval(interval);
				}
			}, 3000);
		},
	},
	watch: {
		windowWidth(newWidth) {
		},
	},
	beforeCreate() {
		this.$options.mountedAt = Date.now();
	},
};
</script>
<style scoped>
.flex-col {
	flex: 1;
	flex-direction:row;
}

.gallery-game {
	width: 100%;
}

.game__link-box {
	position: relative;
	cursor: pointer;
	width: 110px;
	height: 110px;
	font-size: 0;
	overflow: hidden;
	border-radius: 10px;
}

.game__link-box .play-title {
	width: 80%;
	position: absolute;
	top: 10px;
	left: 10%;
	font-size: 14px;
	text-align: center;
	color: #ffffff;
}

.game__link-box .play-title {
	width: 80%;
	position: absolute;
	top: 10px;
	left: 10%;
	font-size: 12px;
	text-align: center;
	color: #ffffff;
	z-index: 22;
	opacity: 0;
}

.jackpot-right {
	width: 350px;
	border-radius: 10px;
}

.game__link-box img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 10px;
}

.game-preview__btn-play {
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -15px;
	margin-top: -10px;
	width: 30px;
	height: 30px;
	background-color: #ed1d49;
	border-radius: 50%;
	opacity: 0;
	z-index: 22;
}

.game__link-box::after {
	content: '';
	background-color: rgba(27, 34, 51, 0.8);
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	opacity: 0;
	z-index: 1;
	padding: 19px 10px 13px;
	transition: opacity 0.1s ease-in-out;
	-webkit-transform: translateZ(0);
	-webkit-perspective: 1000;
	transform: translateZ(1px);
}

.game__link-box:hover .play-title,
.game__link-box:hover .game-preview__btn-play {
	opacity: 1;
}

.game__link-box:hover::after {
	opacity: 1;
}

.jackpot-main {
	margin-bottom: 30px;
}

.jackpot-panel {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	line-height: 1.2;
	padding: 40px 50px;
	background: url(../../../assets/images/number/jackpot-bg.png) center no-repeat;
	background-size: 100% 100%;
	box-shadow: 0 0 40px #0025df;
	height: 194px;
}

.jackpot-label {
	cursor: pointer;
	text-shadow: 2px 5px 3px #542b0b;
	font-size: 40px;
	line-height: 1;
	margin-top: 20px;
}

.jackpot-label:before {
	content: attr(data-text);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-text-stroke: 1px #fbf77f;
	text-stroke: 1px #fbf77f;
	background-image: linear-gradient(to bottom, #fbf77f, #ae7829);
	position: absolute;
}

.jackpot-cell {
	display: flex;
	align-items: center;
}

.jackpot-cell .currency__icon {
	width: 50px;
	height: 50px;
}

.jackpot-value {
	-webkit-text-fill-color: #01151a;
	text-shadow: 1px 11px 2px #01151a;
	font-size: 56px;
	line-height: 1;
	font-family: Arial-Black, Arial;
	font-weight: bold;
}

.jackpot-value:before {
	content: attr(data-text);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-image: linear-gradient(to bottom, #fff, #74fae4);
	-webkit-text-stroke: 1px #61d3c0;
	text-stroke: 1px #61d3c0;
	text-shadow: none;
	position: absolute;
}

.jack-infocircle {
	position: absolute;
	right: 40px;
	top: 40px;
	cursor: pointer;
	color: #ed1d49;
}


@media (max-width : 992px) {
	.game__link-box .play-title {
		display: none;
	}

	.jackpot-label {
		font-size: 20px;
	}

	.jackpot-value {
		font-size: 26px;
		text-shadow: 1px 5px 2px #01151a;
	}

	.jackpot-panel {
		padding: 15px 20px 15px 30px;
		box-shadow: 0 0 20px rgb(0 37 223 / 50%);
		height: 104px;
		background: url(../../../assets/images/number/jackpot-m-bg.png) center no-repeat;
		background-size: 100% 100%;
	}

	.jackpot-cell .currency__icon {
		width: 20px;
		height: 20px;
	}

	.game__link-box {
		width: 72px;
		height: 72px;
		font-size: 0;
	}

	.jackpot-right {
		width: 72px;
		box-shadow: 1px 0 16px #01151a;
	}
}




.number-roller {
	margin-top: -10px;
}

.coin {
	position: absolute;
	font-size: 0;
}

.coin-1 {
	left: -30px;
	top: 60%;
	width: 50px;
	-webkit-animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
}

.coin-2 {
	left: -20px;
	top: 28%;
	width: 40px;
	-webkit-animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
}

.coin-3 {
	right: -10px;
	top: 64%;
	width: 50px;
	-webkit-animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
}

.number-roller {
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
}

.box-left img,
.box-right img {
	width: 160px;
}

.number-box {
	position: relative;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 600px;
	height: 226px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	box-sizing: border-box;
	padding-top: 25px;
}

.digit-wrapper {
	overflow: hidden;
	position: relative;
	font-size: 56px;
	height: 56px;
	margin: 0 1px;
}

.digit-sm-wrapper {
	width: 15px;
}

.digit {
	display: flex;
	flex-direction: column;
	transition: transform 0.5s;
	line-height: 1;
	font-family: Arial-Black, Arial;
	font-weight: bold;
	overflow: hidden;
}

.digit span {
	display: inline-flex;
	height: 56px;
	line-height: 56px;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-image: linear-gradient(to bottom, #fff, #74fae4);
}

.unit img {
	width: 28px;
	height: 35px;
}

.unit-lg img {
	width: 40px;
	height: 35px;
}

.digit-unit {
	line-height: 1;
	padding-top: 5px;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-image: linear-gradient(to bottom, #fff, #74fae4);
}

.digit-unit img {
	width: 15px;
	height: 30px;
}

@-webkit-keyframes f-p1-data-v-1189e5f5 {
	0% {
		transform: translate(0);
	}

	50% {
		transform: translate(7px, 10px);
	}

	to {
		transform: translate(0);
	}
}

@keyframes f-p1-data-v-1189e5f5 {
	0% {
		transform: translate(0);
	}

	50% {
		transform: translate(7px, 10px);
	}

	to {
		transform: translate(0);
	}
}

@-webkit-keyframes f-p2-data-v-1189e5f5 {
	0% {
		transform: rotate(0) translateX(0);
	}

	50% {
		transform: rotate(8deg) translateX(-10px);
	}

	to {
		transform: rotate(0) translateX(0);
	}
}

@keyframes f-p2-data-v-1189e5f5 {
	0% {
		transform: rotate(0) translateX(0);
	}

	50% {
		transform: rotate(8deg) translateX(-10px);
	}

	to {
		transform: rotate(0) translateX(0);
	}
}

@-webkit-keyframes f-p3-data-v-1189e5f5 {
	0% {
		transform: rotate(0) translateX(0);
	}

	50% {
		transform: rotate(10deg) translateX(-15px);
	}

	to {
		transform: rotate(0) translateX(0);
	}
}

@keyframes f-p3-data-v-1189e5f5 {
	0% {
		transform: rotate(0) translateX(0);
	}

	50% {
		transform: rotate(10deg) translateX(-15px);
	}

	to {
		transform: rotate(0) translateX(0);
	}
}

@media(max-width:992px) {
	.jackpot-main {
		margin-bottom: 20px;
	}

	.box-left,
	.box-right {
		display: none;
	}

	.digit-wrapper {
		font-size: 26px;
		height: 26px;
	}

	.digit span {
		display: inline-flex;
		height: 26px;
		line-height: 26px;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: linear-gradient(to bottom, #fff, #74fae4);
	}
}

@media(max-width:600px) {
	.jack-infocircle {
		right: 15px;
		top: 15px;
	}

	.number-box {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 340px;
		height: 128px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		box-sizing: border-box;
		padding-top: 12px;
	}

	.digit-wrapper {
		overflow: hidden;
		position: relative;
		width: 16px;
		height: 26px;
		margin: 0 1px;
	}

	.digit-sm-wrapper {
		width: 9px;
	}

	.digit img {
		width: 20px;
		height: 20px;
	}

	.unit img {
		width: 16px;
		height: 20px;
	}

	.unit-lg img {
		width: 20px;
		height: 20px;
	}

	.digit-unit {
		padding-top: 0;
	}

	.digit-unit img {
		width: 9px;
		height: 20px;
	}

	.coin-1 {
		left: -15px;
		top: 50%;
		width: 40px;
	}

	.coin-2 {
		left: 0px;
		top: 20%;
		width: 30px;
	}

	.coin-3 {
		right: -5px;
		top: 64%;
		width: 40px;
	}
}</style>
