<template>
	<div class="app "
		:class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<div class="ab-sport">
						<section class="ab-sport-s1 flx">
							<img src="../../assets/images/abSportTitleBigBG.jpg" alt="" class="ab-sport-titleImgBG" />
							<img alt="" class="ab-sport-titleImg" />
							<div class="ab-sport-s1-text flx">
								<h1 class="ab-sport-title">
									{{ $t('許多體育賽事和') }}<span>{{ $t('最佳賠率') }}</span>
								</h1>
								<p class="gray-p">
									{{ $t('about_sport_desc1') }}
								</p>
								<button v-if="!$store.state.isLoginStatu" @click="showLoginReg(0)" type="button" class="button button_lg button_red button_center" tabindex="-1">
									<span class="button__inner">
										<span class="button__text"><span class="sign-text">{{ $t('訂閱/註冊並下注') }}</span></span>
									</span>
								</button>
								<router-link v-else to="/sport-betting" class="button button_lg button_red button_center">
									<span class="button__inner">
										<span class="button__text"><span class="sign-text">{{ $t('开始下注') }}</span></span>
									</span>
								</router-link>
							</div>
						</section>
						<section class="ab-sport-s2 flx">
							<div class="ab-sport-s2-bl">
								<img src="../../assets/images/s2Img1.png" width="40" height="40" alt="" />
								<p>{{ $t('各種戰鬥和挑戰') }}</p>
							</div>
							<div class="ab-sport-s2-bl">
								<img src="../../assets/images/s2Img4.png" width="40" height="40" alt="" />
								<p>{{ $t('活躍的平臺社群') }}</p>
							</div>
						</section>
						<section class="ab-sport-s3 flx">
							<div class="ab-sport-s3-bl min168 flx">
								<h2>
                  <span style="color: #55657e" class="font-digits">{{ numFormat('34114299.2',true) }}</span></h2>
								<span>{{ $t('總勝利') }}</span>
							</div>
							<div class="vert-line"></div>
							<div class="ab-sport-s3-bl flx">
								<h2>{{ numFormat('80000',true) }}+</h2>
								<p>{{ $t('每天都有市場') }}</p>
							</div>
							<div class="vert-line to-vert"></div>
							<div class="ab-sport-s3-bl min168 flx">
								<h2>{{ numFormat('4000',true) }}+</h2>
								<p>{{ $t('每天都有活動') }}</p>
							</div>
							<div class="vert-line"></div>
							<div class="ab-sport-s3-bl flx">
								<h2>80</h2>
								<p>{{ $t('運動種類') }}</p>
							</div>
						</section>
						<section class="ab-sport-s5">
							<div class="forSrcl"></div>
							<h1 class="ab-sport-title">
								{{ $t('Cyber Raccoon上的戰鬥和') }} <span>{{ $t('挑戰') }}</span>
							</h1>
							<div class="s5-block odds-king">
								<img class="fixed-img s5Img1" />
								<h2 class="sub-title">
									{{ $t('颠覆游戏产业') }}
								</h2>
								<h3 class="sub-title2">
									{{ $t('獲得高賠率，證明你是王者！') }}
								</h3>
								<p class="gray-p">
									{{ $t('about_sport_desc2') }}
								</p>
								<button v-if="!$store.state.isLoginStatu" @click="showLoginReg(0)" type="button" class="button button_lg button_red button_center" tabindex="-1">
									<span class="button__inner">
										<span class="button__text"><span class="sign-text">{{ $t('訂閱/註冊並下注') }}</span></span>
									</span>
								</button>
								<router-link v-else to="/sport-betting" class="button button_lg button_blue button_center">
									<span class="button__inner">
										<span class="button__text"><span class="sign-text">{{ $t('开始下注') }}</span></span>
									</span>
								</router-link>
							</div>
							<div class="s5-block sport-bet">
								<img class="fixed-img s5Img2" />
								<h2 class="sub-title">{{ $t('體育博彩大戰') }}</h2>
								<h3 class="sub-title2">
									{{ $t('參加獨特的戰鬥並獲得高額獎勵。') }}
								</h3>
								<p class="gray-p">
									{{ $t('about_sport_desc3') }}
								</p>
								<button v-if="!$store.state.isLoginStatu" @click="showLoginReg(0)" type="button" class="button button_lg button_red button_center" tabindex="-1">
									<span class="button__inner">
										<span class="button__text"><span class="sign-text">{{ $t('訂閱/註冊並下注') }}</span></span>
									</span>
								</button>
								<router-link v-else to="/sport-betting" class="button button_lg button_blue button_center">
									<span class="button__inner">
										<span class="button__text"><span class="sign-text">{{ $t('开始下注') }}</span></span>
									</span>
								</router-link>
							</div>
						</section>
						<section class="ab-sport-s8 ab-sport-social-margin">
							<div class="forSrcl"></div>
							<div class="s8-wrp flx">
								<div class="s8-wrp-text">
									<h2 class="sub-title">{{ $t('關注我們的體育社交網路') }}</h2>
									<p class="gray-p">
										{{ $t('about_sport_desc4') }}
									</p>
								</div>
								<div class="s8-wrp-btns flx">
									<a :href="$t('about_sport_telegram')" :class="lang" class="button i-tel button_lg button_red button_center"
										tabindex="-1">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon v-if="lang === 'TW'" icon="icon-line" class="link__icon"></svgIcon>
												<svgIcon v-else-if="lang === 'VN'" icon="icon-zalo" class="link__icon"></svgIcon>
												<svgIcon v-else icon="icon-telegram" class="link__icon"></svgIcon>
											</span>
											<span class="button__text"><span class="sign-text">{{ $t('Telegram客服') }}</span></span>
										</span>
									</a>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
			<Foot />
		</div>
		<asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
		<tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
		<div class="app-overlay" v-if="isMobileFlag" :class="openedleft?'visible':''" @click="menuClick"></div>
	</div>
</template>

<script>
	import Head from '@/components/Head.vue'
	import Foot from '@/components/Foot.vue'
	import asidebar from '@/components/aside.vue'
	import svgIcon from '@/components/svg.vue'
	import tabbar from '@/components/tabbar.vue'
	export default {
		name: 'AboutSportPage',
		components: {
			Head,
			Foot,
			asidebar,
			svgIcon,
			tabbar
		},
		data() {
			return {
				lang: ''
			};
		},
		methods: {
			menuClick() {
				this.openedleft = !this.openedleft
			},
			contestsClick() {
				this.openedcontests = !this.openedcontests
			},
			contestsShow() {
				this.openedcontests = true
			}

		},
		mounted() {
			this.lang = this.$helper.getLang();
		},
		created() {
			this.isPhone()
		},
	}
</script>
<style>
	/* about */

	.forSrcl {
		position: absolute;
		width: 50px;
		height: 50px;
		left: 0;
		top: 0;
		pointer-events: none
	}

	.flx {
		display: flex;
		align-items: center;
		justify-content: center
	}

	.gray-p {
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: #93acd3
	}

	.ab-sport-title,
	.gray-p {
		font-family: "Montserrat";
		font-style: normal;
		text-align: center
	}

	.ab-sport-title {
		font-weight: 700;
		font-size: 32px;
		line-height: 40px;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		color: #fff
	}

	.ab-sport-title span {
		color: #ed1d49
	}

	@media(max-width:699px) {
		.ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	.ab-sport-s1 {
		height: 410px;
		position: relative
	}

	@media(max-width:699px) {
		.ab-sport-s1 {
			align-items: flex-start;
			justify-content: flex-start;
			height: 446px
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-s1 {
			align-items: flex-start;
			justify-content: flex-start;
			height: 446px
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-s1 {
			align-items: flex-start;
			justify-content: flex-start;
			height: 446px
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-s1 {
			align-items: flex-start;
			justify-content: flex-start;
			height: 446px
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-s1 {
			align-items: flex-start;
			justify-content: flex-start;
			height: 446px
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s1 {
			align-items: flex-start;
			justify-content: flex-start;
			height: 446px
		}
	}

	.ab-sport-s1-text {
		max-width: 364px;
		flex-direction: column;
		padding-bottom: 58px
	}

	@media(max-width:699px) {
		.ab-sport-s1-text {
			max-width: none;
			padding-top: 0;
			align-items: flex-start
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-s1-text {
			max-width: none;
			padding-top: 0;
			align-items: flex-start
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-s1-text {
			max-width: none;
			padding-top: 0;
			align-items: flex-start
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-s1-text {
			max-width: none;
			padding-top: 0;
			align-items: flex-start
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-s1-text {
			max-width: none;
			padding-top: 0;
			align-items: flex-start
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s1-text {
			max-width: none;
			padding-top: 0;
			align-items: flex-start
		}
	}

	.ab-sport-s1-text h1,
	.ab-sport-s1-text p {
		margin-bottom: 0
	}

	@media(max-width:400px) {

		.ab-sport-s1-text h1,
		.ab-sport-s1-text p {
			max-width: 306px
		}
	}

	@media(max-width:632px) {

		.opened-left-panel .ab-sport-s1-text h1,
		.opened-left-panel .ab-sport-s1-text p {
			max-width: 306px
		}
	}

	@media(max-width:725px) {

		.opened-right-panel .ab-sport-s1-text h1,
		.opened-right-panel .ab-sport-s1-text p {
			max-width: 306px
		}
	}

	@media(max-width:740px) {

		.opened-contests-panel .ab-sport-s1-text h1,
		.opened-contests-panel .ab-sport-s1-text p {
			max-width: 306px
		}
	}

	@media(max-width:957px) {

		.opened-left-panel.opened-right-panel .ab-sport-s1-text h1,
		.opened-left-panel.opened-right-panel .ab-sport-s1-text p {
			max-width: 306px
		}
	}

	@media(max-width:972px) {

		.opened-left-panel.opened-contests-panel .ab-sport-s1-text h1,
		.opened-left-panel.opened-contests-panel .ab-sport-s1-text p {
			max-width: 306px
		}
	}

	.ab-sport-s1-text p {
		margin: 12px 0 24px
	}

	@media(max-width:699px) {
		.ab-sport-s1-text p {
			text-align: left;
			margin: 8px 0 20px
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-s1-text p {
			text-align: left;
			margin: 8px 0 20px
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-s1-text p {
			text-align: left;
			margin: 8px 0 20px
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-s1-text p {
			text-align: left;
			margin: 8px 0 20px
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-s1-text p {
			text-align: left;
			margin: 8px 0 20px
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s1-text p {
			text-align: left;
			margin: 8px 0 20px
		}
	}

	.ab-sport-titleImgBG {
		z-index: -1;
		height: auto;
		width: 2000px;
		max-width: 2000px;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%)
	}

	@media(max-width:1208px) {
		.ab-sport-titleImgBG {
			width: 1208px;
			max-width: 1208px;
			height: 447px
		}
	}

	@media(max-width:1440px) {
		.opened-left-panel .ab-sport-titleImgBG {
			width: 1208px;
			max-width: 1208px;
			height: 447px
		}
	}

	@media(max-width:1533px) {
		.opened-right-panel .ab-sport-titleImgBG {
			width: 1208px;
			max-width: 1208px;
			height: 447px
		}
	}

	@media(max-width:1548px) {
		.opened-contests-panel .ab-sport-titleImgBG {
			width: 1208px;
			max-width: 1208px;
			height: 447px
		}
	}

	@media(max-width:1765px) {
		.opened-left-panel.opened-right-panel .ab-sport-titleImgBG {
			width: 1208px;
			max-width: 1208px;
			height: 447px
		}
	}

	@media(max-width:1780px) {
		.opened-left-panel.opened-contests-panel .ab-sport-titleImgBG {
			width: 1208px;
			max-width: 1208px;
			height: 447px
		}
	}

	@media(max-width:699px) {
		.ab-sport-titleImgBG {
			display: none
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-titleImgBG {
			display: none
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-titleImgBG {
			display: none
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-titleImgBG {
			display: none
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-titleImgBG {
			display: none
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-titleImgBG {
			display: none
		}
	}

	.ab-sport-titleImg {
		z-index: -1;
		height: 437px;
		width: 1208px;
		max-width: 1208px;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		content: url(../../assets/images/abSportTitleBig.png)
	}

	@media(max-width:950px) {
		.ab-sport-titleImg {
			transform: translateX(-50%) translateY(25px) scale(.9)
		}
	}

	@media(max-width:1182px) {
		.opened-left-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(25px) scale(.9)
		}
	}

	@media(max-width:1275px) {
		.opened-right-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(25px) scale(.9)
		}
	}

	@media(max-width:1290px) {
		.opened-contests-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(25px) scale(.9)
		}
	}

	@media(max-width:1507px) {
		.opened-left-panel.opened-right-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(25px) scale(.9)
		}
	}

	@media(max-width:1522px) {
		.opened-left-panel.opened-contests-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(25px) scale(.9)
		}
	}

	@media(max-width:800px) {
		.ab-sport-titleImg {
			transform: translateX(-50%) translateY(106px) scale(.65)
		}
	}

	@media(max-width:1032px) {
		.opened-left-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(106px) scale(.65)
		}
	}

	@media(max-width:1125px) {
		.opened-right-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(106px) scale(.65)
		}
	}

	@media(max-width:1140px) {
		.opened-contests-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(106px) scale(.65)
		}
	}

	@media(max-width:1357px) {
		.opened-left-panel.opened-right-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(106px) scale(.65)
		}
	}

	@media(max-width:1372px) {
		.opened-left-panel.opened-contests-panel .ab-sport-titleImg {
			transform: translateX(-50%) translateY(106px) scale(.65)
		}
	}

	@media(max-width:699px) {
		.ab-sport-titleImg {
			transform: translateX(-50%);
			width: 850px;
			height: 412px;
			content: url(../../assets/images/abSportTitleLow.jpg)
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-titleImg {
			transform: translateX(-50%);
			width: 850px;
			height: 412px;
			content: url(../../assets/images/abSportTitleLow.jpg)
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-titleImg {
			transform: translateX(-50%);
			width: 850px;
			height: 412px;
			content: url(../../assets/images/abSportTitleLow.jpg)
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-titleImg {
			transform: translateX(-50%);
			width: 850px;
			height: 412px;
			content: url(../../assets/images/abSportTitleLow.jpg)
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-titleImg {
			transform: translateX(-50%);
			width: 850px;
			height: 412px;
			content: url(../../assets/images/abSportTitleLow.jpg)
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-titleImg {
			transform: translateX(-50%);
			width: 850px;
			height: 412px;
			content: url(../../assets/images/abSportTitleLow.jpg)
		}
	}

	.ab-sport-title {
		font-weight: 700;
		font-size: 32px;
		line-height: 40px;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		color: #fff
	}

	.ab-sport-title span {
		color: #ed1d49
	}

	@media(max-width:699px) {
		.ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-title {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
			text-align: left
		}
	}

	.ab-sport-s2 {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		grid-gap: 16px;
		gap: 16px
	}

	.ab-sport-s2-bl {
		cursor: pointer;
		width: 100%;
		padding: 8px;
		background: #161f2c;
		border: 1px solid #1c2532;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-weight: 600;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		color: #fff
	}

	.ab-sport-s2-bl:hover {
		background: #1c2532;
		border-color: transparent
	}

	.ab-sport-s2-bl:active {
		background: #111923;
		border-color: transparent
	}

	.ab-sport-s2-bl p {
		margin: 0 0 0 8px;
		font-weight: 600;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: -.02em
	}


	.ab-sport-s3 {
		justify-content: space-between;
		margin: 28px 0 36px
	}

	.ab-sport-s3-bl h2 {
		white-space: nowrap;
		font-size: 28px;
		line-height: 36px;
		display: flex;
		align-items: center;
    flex:1;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		color: #55657e;
		margin-bottom: 0;
		margin-right: 8px
	}

	@media(max-width:850px) {
		.ab-sport-s3-bl h2 {
			font-weight: 700;
			font-size: 18px;
			line-height: 24px;
			margin-right: 6px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .ab-sport-s3-bl h2 {
			font-weight: 700;
			font-size: 18px;
			line-height: 24px;
			margin-right: 6px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .ab-sport-s3-bl h2 {
			font-weight: 700;
			font-size: 18px;
			line-height: 24px;
			margin-right: 6px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .ab-sport-s3-bl h2 {
			font-weight: 700;
			font-size: 18px;
			line-height: 24px;
			margin-right: 6px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .ab-sport-s3-bl h2 {
			font-weight: 700;
			font-size: 18px;
			line-height: 24px;
			margin-right: 6px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s3-bl h2 {
			font-weight: 700;
			font-size: 18px;
			line-height: 24px;
			margin-right: 6px
		}
	}

	.ab-sport-s3-bl p {
		margin-bottom: 0;
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		color: #55657e
	}
	.ab-sport-s3-bl >span {
		margin-bottom: 0;
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		color: #55657e
	}

	@media(max-width:850px) {
		.ab-sport-s3-bl p {
			font-weight: 500;
			font-size: 10px;
			line-height: 14px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .ab-sport-s3-bl p {
			font-weight: 500;
			font-size: 10px;
			line-height: 14px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .ab-sport-s3-bl p {
			font-weight: 500;
			font-size: 10px;
			line-height: 14px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .ab-sport-s3-bl p {
			font-weight: 500;
			font-size: 10px;
			line-height: 14px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .ab-sport-s3-bl p {
			font-weight: 500;
			font-size: 10px;
			line-height: 14px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s3-bl p {
			font-weight: 500;
			font-size: 10px;
			line-height: 14px
		}
	}

	@media(max-width:960px) {
		.ab-sport-s3 {
			flex-wrap: wrap
		}
	}

	@media(max-width:1192px) {
		.opened-left-panel .ab-sport-s3 {
			flex-wrap: wrap
		}
	}

	@media(max-width:1285px) {
		.opened-right-panel .ab-sport-s3 {
			flex-wrap: wrap
		}
	}

	@media(max-width:1300px) {
		.opened-contests-panel .ab-sport-s3 {
			flex-wrap: wrap
		}
	}

	@media(max-width:1517px) {
		.opened-left-panel.opened-right-panel .ab-sport-s3 {
			flex-wrap: wrap
		}
	}

	@media(max-width:1532px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s3 {
			flex-wrap: wrap
		}
	}

	@media(max-width:699px) {
		.ab-sport-s3 {
			justify-content: flex-start;
			margin: 24px 0 32px
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-s3 {
			justify-content: flex-start;
			margin: 24px 0 32px
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-s3 {
			justify-content: flex-start;
			margin: 24px 0 32px
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-s3 {
			justify-content: flex-start;
			margin: 24px 0 32px
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-s3 {
			justify-content: flex-start;
			margin: 24px 0 32px
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s3 {
			justify-content: flex-start;
			margin: 24px 0 32px
		}
	}

	.vert-line {
		height: 28px;
		width: 1px;
		background: #263041
	}

	@media(max-width:850px) {
		.vert-line {
			margin: 0 9px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .vert-line {
			margin: 0 9px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .vert-line {
			margin: 0 9px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .vert-line {
			margin: 0 9px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .vert-line {
			margin: 0 9px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .vert-line {
			margin: 0 9px
		}
	}

	@media(max-width:699px) {
		.to-vert {
			width: 100%;
			height: 1px;
			margin: 12px 0
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .to-vert {
			width: 100%;
			height: 1px;
			margin: 12px 0
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .to-vert {
			width: 100%;
			height: 1px;
			margin: 12px 0
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .to-vert {
			width: 100%;
			height: 1px;
			margin: 12px 0
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .to-vert {
			width: 100%;
			height: 1px;
			margin: 12px 0
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .to-vert {
			width: 100%;
			height: 1px;
			margin: 12px 0
		}
	}

	@media(max-width:699px) {
		.min168 {
			min-width: 50%;
			justify-content: flex-start
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .min168 {
			min-width: 50%;
			justify-content: flex-start
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .min168 {
			min-width: 50%;
			justify-content: flex-start
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .min168 {
			min-width: 50%;
			justify-content: flex-start
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .min168 {
			min-width: 50%;
			justify-content: flex-start
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .min168 {
			min-width: 50%;
			justify-content: flex-start
		}
	}

	@media(max-width:400px) {
		.min168 {
			min-width: 168px
		}
	}

	@media(max-width:632px) {
		.opened-left-panel .min168 {
			min-width: 168px
		}
	}

	@media(max-width:725px) {
		.opened-right-panel .min168 {
			min-width: 168px
		}
	}

	@media(max-width:740px) {
		.opened-contests-panel .min168 {
			min-width: 168px
		}
	}

	@media(max-width:957px) {
		.opened-left-panel.opened-right-panel .min168 {
			min-width: 168px
		}
	}

	@media(max-width:972px) {
		.opened-left-panel.opened-contests-panel .min168 {
			min-width: 168px
		}
	}

	.ab-sport-s4 {
		position: relative;
		background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
		border-radius: 14px;
		padding: 16px
	}

	.ab-sport-s4 .forSrcl {
		top: -90px
	}

	@media(max-width:899px) {
		.ab-sport-s4 .forSrcl {
			top: -80px
		}
	}

	@media(max-width:1131px) {
		.opened-left-panel .ab-sport-s4 .forSrcl {
			top: -80px
		}
	}

	@media(max-width:1224px) {
		.opened-right-panel .ab-sport-s4 .forSrcl {
			top: -80px
		}
	}

	@media(max-width:1239px) {
		.opened-contests-panel .ab-sport-s4 .forSrcl {
			top: -80px
		}
	}

	@media(max-width:1456px) {
		.opened-left-panel.opened-right-panel .ab-sport-s4 .forSrcl {
			top: -80px
		}
	}

	@media(max-width:1471px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s4 .forSrcl {
			top: -80px
		}
	}

	.ab-sport-s4 h2[data-v-91d5870a],
	.ab-sport-s4 p {
		margin-bottom: 0
	}

	.ab-sport-s4-head {
		justify-content: space-between;
		width: 100%;
		margin-bottom: 16px
	}

	.ab-sport-s4-head span {
		font-weight: 600;
		font-size: 18px
	}

	.ab-sport-s4-bl {
		position: relative;
		padding: 12px 12px 12px 20px;
		background: #1c2532;
		border-radius: 12px;
		justify-content: space-between;
		margin-top: 16px;
		cursor: pointer
	}

	@media(max-width:899px) {
		.ab-sport-s4-bl {
			align-items: flex-start;
			flex-wrap: wrap;
			padding: 16px
		}
	}

	@media(max-width:1131px) {
		.opened-left-panel .ab-sport-s4-bl {
			align-items: flex-start;
			flex-wrap: wrap;
			padding: 16px
		}
	}

	@media(max-width:1224px) {
		.opened-right-panel .ab-sport-s4-bl {
			align-items: flex-start;
			flex-wrap: wrap;
			padding: 16px
		}
	}

	@media(max-width:1239px) {
		.opened-contests-panel .ab-sport-s4-bl {
			align-items: flex-start;
			flex-wrap: wrap;
			padding: 16px
		}
	}

	@media(max-width:1456px) {
		.opened-left-panel.opened-right-panel .ab-sport-s4-bl {
			align-items: flex-start;
			flex-wrap: wrap;
			padding: 16px
		}
	}

	@media(max-width:1471px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s4-bl {
			align-items: flex-start;
			flex-wrap: wrap;
			padding: 16px
		}
	}

	@media(max-width:699px) {
		.ab-sport-s4-bl {
			flex-direction: column
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-sport-s4-bl {
			flex-direction: column
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-sport-s4-bl {
			flex-direction: column
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-sport-s4-bl {
			flex-direction: column
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-sport-s4-bl {
			flex-direction: column
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s4-bl {
			flex-direction: column
		}
	}

	.s4-start {
		width: 73px;
		flex-direction: column;
		transform: translateY(5px);
		margin-right: 20px
	}

	.s4-start span {
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		color: #93acd3
	}

	.s4-start .time-p span {
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		color: #fff
	}

	@media(max-width:850px) {
		.s4-start .time-p span {
			font-weight: 600;
			font-size: 14px;
			line-height: 18px;
			padding-left: 6px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .s4-start .time-p span {
			font-weight: 600;
			font-size: 14px;
			line-height: 18px;
			padding-left: 6px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .s4-start .time-p span {
			font-weight: 600;
			font-size: 14px;
			line-height: 18px;
			padding-left: 6px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .s4-start .time-p span {
			font-weight: 600;
			font-size: 14px;
			line-height: 18px;
			padding-left: 6px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .s4-start .time-p span {
			font-weight: 600;
			font-size: 14px;
			line-height: 18px;
			padding-left: 6px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .s4-start .time-p span {
			font-weight: 600;
			font-size: 14px;
			line-height: 18px;
			padding-left: 6px
		}
	}

	@media(max-width:699px) {
		.s4-start {
			flex-direction: row;
			width: -webkit-max-content;
			width: -moz-max-content;
			width: max-content
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s4-start {
			flex-direction: row;
			width: -webkit-max-content;
			width: -moz-max-content;
			width: max-content
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s4-start {
			flex-direction: row;
			width: -webkit-max-content;
			width: -moz-max-content;
			width: max-content
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s4-start {
			flex-direction: row;
			width: -webkit-max-content;
			width: -moz-max-content;
			width: max-content
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s4-start {
			flex-direction: row;
			width: -webkit-max-content;
			width: -moz-max-content;
			width: max-content
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s4-start {
			flex-direction: row;
			width: -webkit-max-content;
			width: -moz-max-content;
			width: max-content
		}
	}

	.s4-mid {
		flex-direction: column;
		padding: 0 20px;
		border-left: 1px solid #2a3546;
		flex: 1;
		align-items: flex-start
	}

	.s4-mid p {
		font-weight: 600;
		font-size: 16px;
		line-height: 20px
	}

	.s4-mid svg {
		margin-right: 4px;
		fill: #93acd3
	}

	.s4-mid span {
		font-weight: 500;
		font-size: 14px;
		margin-bottom: 6px;
		line-height: 20px;
		text-align: center;
		color: #55657e
	}

	@media(max-width:699px) {
		.s4-mid span {
			margin-bottom: 12px;
			text-align: left
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s4-mid span {
			margin-bottom: 12px;
			text-align: left
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s4-mid span {
			margin-bottom: 12px;
			text-align: left
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s4-mid span {
			margin-bottom: 12px;
			text-align: left
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s4-mid span {
			margin-bottom: 12px;
			text-align: left
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s4-mid span {
			margin-bottom: 12px;
			text-align: left
		}
	}

	.s4-mid br {
		display: none
	}

	@media(max-width:850px) {
		.s4-mid br {
			display: block
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .s4-mid br {
			display: block
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .s4-mid br {
			display: block
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .s4-mid br {
			display: block
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .s4-mid br {
			display: block
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .s4-mid br {
			display: block
		}
	}

	@media(max-width:699px) {
		.s4-mid {
			padding: 10px 0 20px;
			margin: 10px 0 14px;
			border-left: none;
			border-top: 1px solid #2a3546;
			border-bottom: 1px solid #2a3546;
			width: 100%
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s4-mid {
			padding: 10px 0 20px;
			margin: 10px 0 14px;
			border-left: none;
			border-top: 1px solid #2a3546;
			border-bottom: 1px solid #2a3546;
			width: 100%
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s4-mid {
			padding: 10px 0 20px;
			margin: 10px 0 14px;
			border-left: none;
			border-top: 1px solid #2a3546;
			border-bottom: 1px solid #2a3546;
			width: 100%
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s4-mid {
			padding: 10px 0 20px;
			margin: 10px 0 14px;
			border-left: none;
			border-top: 1px solid #2a3546;
			border-bottom: 1px solid #2a3546;
			width: 100%
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s4-mid {
			padding: 10px 0 20px;
			margin: 10px 0 14px;
			border-left: none;
			border-top: 1px solid #2a3546;
			border-bottom: 1px solid #2a3546;
			width: 100%
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s4-mid {
			padding: 10px 0 20px;
			margin: 10px 0 14px;
			border-left: none;
			border-top: 1px solid #2a3546;
			border-bottom: 1px solid #2a3546;
			width: 100%
		}
	}

	.s4-end-bl {
		width: 96px;
		height: 56px;
		background: #263041;
		flex-direction: column
	}

	.s4-end-bl span {
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		text-align: center;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		color: #55657e
	}

	@media(max-width:850px) {
		.s4-end-bl span {
			font-weight: 600;
			font-size: 12px;
			line-height: 16px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .s4-end-bl span {
			font-weight: 600;
			font-size: 12px;
			line-height: 16px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .s4-end-bl span {
			font-weight: 600;
			font-size: 12px;
			line-height: 16px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .s4-end-bl span {
			font-weight: 600;
			font-size: 12px;
			line-height: 16px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .s4-end-bl span {
			font-weight: 600;
			font-size: 12px;
			line-height: 16px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .s4-end-bl span {
			font-weight: 600;
			font-size: 12px;
			line-height: 16px
		}
	}

	@media(max-width:850px) {
		.s4-end-bl .time-p {
			font-weight: 600;
			font-size: 16px;
			line-height: 20px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .s4-end-bl .time-p {
			font-weight: 600;
			font-size: 16px;
			line-height: 20px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .s4-end-bl .time-p {
			font-weight: 600;
			font-size: 16px;
			line-height: 20px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .s4-end-bl .time-p {
			font-weight: 600;
			font-size: 16px;
			line-height: 20px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .s4-end-bl .time-p {
			font-weight: 600;
			font-size: 16px;
			line-height: 20px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .s4-end-bl .time-p {
			font-weight: 600;
			font-size: 16px;
			line-height: 20px
		}
	}

	.s4-end-bl[data-v-91d5870a]:first-child {
		border-radius: 8px 4px 4px 8px
	}

	.s4-end-bl[data-v-91d5870a]:nth-child(2) {
		margin: 0 6px;
		border-radius: 4px
	}

	.s4-end-bl[data-v-91d5870a]:nth-child(3) {
		border-radius: 4px;
		border-radius: 4px 8px 8px 4px
	}

	.s4-end-bl[data-v-91d5870a]:nth-child(4) {
		border-radius: 8px;
		margin-left: 10px;
		flex-direction: column-reverse
	}

	@media(max-width:899px) {
		.s4-end-bl {
			width: 100%
		}
	}

	@media(max-width:1131px) {
		.opened-left-panel .s4-end-bl {
			width: 100%
		}
	}

	@media(max-width:1224px) {
		.opened-right-panel .s4-end-bl {
			width: 100%
		}
	}

	@media(max-width:1239px) {
		.opened-contests-panel .s4-end-bl {
			width: 100%
		}
	}

	@media(max-width:1456px) {
		.opened-left-panel.opened-right-panel .s4-end-bl {
			width: 100%
		}
	}

	@media(max-width:1471px) {
		.opened-left-panel.opened-contests-panel .s4-end-bl {
			width: 100%
		}
	}

	@media(max-width:699px) {
		.s4-end-bl {
			width: 23%;
			height: 50px
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s4-end-bl {
			width: 23%;
			height: 50px
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s4-end-bl {
			width: 23%;
			height: 50px
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s4-end-bl {
			width: 23%;
			height: 50px
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s4-end-bl {
			width: 23%;
			height: 50px
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s4-end-bl {
			width: 23%;
			height: 50px
		}
	}

	@media(max-width:899px) {
		.s4-end {
			width: 100%;
			padding-top: 14px;
			border-top: 1px solid #2a3546;
			margin-top: 12px
		}
	}

	@media(max-width:1131px) {
		.opened-left-panel .s4-end {
			width: 100%;
			padding-top: 14px;
			border-top: 1px solid #2a3546;
			margin-top: 12px
		}
	}

	@media(max-width:1224px) {
		.opened-right-panel .s4-end {
			width: 100%;
			padding-top: 14px;
			border-top: 1px solid #2a3546;
			margin-top: 12px
		}
	}

	@media(max-width:1239px) {
		.opened-contests-panel .s4-end {
			width: 100%;
			padding-top: 14px;
			border-top: 1px solid #2a3546;
			margin-top: 12px
		}
	}

	@media(max-width:1456px) {
		.opened-left-panel.opened-right-panel .s4-end {
			width: 100%;
			padding-top: 14px;
			border-top: 1px solid #2a3546;
			margin-top: 12px
		}
	}

	@media(max-width:1471px) {
		.opened-left-panel.opened-contests-panel .s4-end {
			width: 100%;
			padding-top: 14px;
			border-top: 1px solid #2a3546;
			margin-top: 12px
		}
	}

	@media(max-width:699px) {
		.s4-end {
			border-top: none;
			margin-top: 0;
			padding-top: 0
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s4-end {
			border-top: none;
			margin-top: 0;
			padding-top: 0
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s4-end {
			border-top: none;
			margin-top: 0;
			padding-top: 0
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s4-end {
			border-top: none;
			margin-top: 0;
			padding-top: 0
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s4-end {
			border-top: none;
			margin-top: 0;
			padding-top: 0
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s4-end {
			border-top: none;
			margin-top: 0;
			padding-top: 0
		}
	}

	.time-p {
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		color: #fff
	}

	@media(max-width:699px) {
		.ab-bigOnly {
			display: none
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .ab-bigOnly {
			display: none
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .ab-bigOnly {
			display: none
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .ab-bigOnly {
			display: none
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .ab-bigOnly {
			display: none
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .ab-bigOnly {
			display: none
		}
	}

	.red_shild {
		width: 73px;
		height: auto;
		position: absolute;
		left: 0;
		top: 0;
		content: url(/_nuxt/img/boosted_shild.7cbfd49.png)
	}

	@media(max-width:699px) {
		.red_shild {
			content: url(/_nuxt/img/boosted_shild2.dc6ff8c.png);
			left: auto;
			right: 0
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .red_shild {
			content: url(/_nuxt/img/boosted_shild2.dc6ff8c.png);
			left: auto;
			right: 0
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .red_shild {
			content: url(/_nuxt/img/boosted_shild2.dc6ff8c.png);
			left: auto;
			right: 0
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .red_shild {
			content: url(/_nuxt/img/boosted_shild2.dc6ff8c.png);
			left: auto;
			right: 0
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .red_shild {
			content: url(/_nuxt/img/boosted_shild2.dc6ff8c.png);
			left: auto;
			right: 0
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .red_shild {
			content: url(/_nuxt/img/boosted_shild2.dc6ff8c.png);
			left: auto;
			right: 0
		}
	}

	.ab-sport-showAll {
		margin: 16px auto 0;
		width: -webkit-max-content;
		width: -moz-max-content;
		width: max-content;
		color: #93acd3;
		cursor: pointer
	}

	.ab-sport-showAll svg {
		padding: 3px;
		fill: #93acd3
	}

	.ab-sport-showAll[data-v-91d5870a]:hover {
		color: #fff
	}

	.ab-sport-showAll:hover svg {
		fill: #fff
	}

	.arrowUp svg {
		transform: rotate(180deg)
	}

	.link {
		color: #3a07f2;
		display: flex;
		font-weight: 600;
		align-items: center;
		text-decoration: none;
		padding: 0
	}

	.link__icon {
		fill: #3a07f2;
		transition: transform .1s ease-in-out, fill .1s ease-in-out
	}

	.link:focus,
	.link:hover {
		color: #3a07f2
	}

	.link:focus .link__icon,
	.link:hover .link__icon {
		fill: #fff;
		transform: translateX(10%)
	}

	.link:active {
		color: #fff
	}

	.link:active .link__icon {
		fill: #fff
	}

	.link:disabled,
	.link_disabled {
		pointer-events: none;
		color: #3c485c
	}

	.link:disabled .link__icon,
	.link_disabled .link__icon {
		fill: #3c485c
	}

	.link_sm.link,
	.link_sm .link__text {
		font-size: 11px
	}

	.link_sm .link__icon {
		width: 18px;
		height: 18px
	}

	.link_md.link,
	.link_md .link__text {
		font-size: 14px
	}

	.link_md .link__icon {
		width: 24px;
		height: 24px
	}


	.ab-sport-s5 {
		position: relative;
		margin-top: 28px;
		padding: 40px 0 32px
	}

	.ab-sport-s5 .forSrcl {
		top: -50px
	}

	@media(max-width:850px) {
		.ab-sport-s5 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .ab-sport-s5 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .ab-sport-s5 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .ab-sport-s5 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .ab-sport-s5 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s5 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:900px) {
		.ab-sport-s5 {
			padding: 24px 0 28px
		}
	}

	@media(max-width:1132px) {
		.opened-left-panel .ab-sport-s5 {
			padding: 24px 0 28px
		}
	}

	@media(max-width:1225px) {
		.opened-right-panel .ab-sport-s5 {
			padding: 24px 0 28px
		}
	}

	@media(max-width:1240px) {
		.opened-contests-panel .ab-sport-s5 {
			padding: 24px 0 28px
		}
	}

	@media(max-width:1457px) {
		.opened-left-panel.opened-right-panel .ab-sport-s5 {
			padding: 24px 0 28px
		}
	}

	@media(max-width:1472px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s5 {
			padding: 24px 0 28px
		}
	}

	.ab-sport-s5 .ab-sport-title {
		margin-bottom: 24px
	}

	@media(max-width:900px) {
		.ab-sport-s5 .ab-sport-title {
			margin-bottom: 20px
		}
	}

	@media(max-width:1132px) {
		.opened-left-panel .ab-sport-s5 .ab-sport-title {
			margin-bottom: 20px
		}
	}

	@media(max-width:1225px) {
		.opened-right-panel .ab-sport-s5 .ab-sport-title {
			margin-bottom: 20px
		}
	}

	@media(max-width:1240px) {
		.opened-contests-panel .ab-sport-s5 .ab-sport-title {
			margin-bottom: 20px
		}
	}

	@media(max-width:1457px) {
		.opened-left-panel.opened-right-panel .ab-sport-s5 .ab-sport-title {
			margin-bottom: 20px
		}
	}

	@media(max-width:1472px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s5 .ab-sport-title {
			margin-bottom: 20px
		}
	}

	.s5-block {
		position: relative;
		background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
		border-radius: 16px;
		overflow: hidden
	}

	.s5-block .sub-title {
		margin-bottom: 6px
	}

	.s5-block .sub-title2 {
		margin-bottom: 8px;
	}

	.s5-block .gray-p {
		margin-bottom: 16px;
		text-align: left
	}

	.odds-king {
		margin: 24px 0;
		padding: 28px 28px 24px 50%
	}

	@media(max-width:699px) {
		.odds-king {
			margin: 0 auto 20px;
			padding: 24px 20px 92%
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .odds-king {
			margin: 0 auto 20px;
			padding: 24px 20px 92%
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .odds-king {
			margin: 0 auto 20px;
			padding: 24px 20px 92%
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .odds-king {
			margin: 0 auto 20px;
			padding: 24px 20px 92%
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .odds-king {
			margin: 0 auto 20px;
			padding: 24px 20px 92%
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .odds-king {
			margin: 0 auto 20px;
			padding: 24px 20px 92%
		}
	}

	.sub-title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		letter-spacing: -.02em
	}

	.sub-title2 {
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: -.02em
	}

	.totalPaid {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: #1c2532;
		border-radius: 14px;
		padding: 12px 16px;
		width: -webkit-max-content;
		width: -moz-max-content;
		width: max-content;
		margin-bottom: 16px
	}

	.totalPaid h4[data-v-5b1ede3b],
	.totalPaid p {
		margin: 0
	}

	.totalPaid h4 {
		font-weight: 700;
		font-size: 20px;
		white-space: nowrap;
		line-height: 32px;
		letter-spacing: -.02em;
		margin-bottom: 0;
		margin-left: 4px
	}

	.totalPaid p {
		color: #55657e;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: -.02em;
		margin-right: 12px
	}

	.totalPaid img {
		margin-right: 2px;
		width: 28px
	}

	.totalPaid2 {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: #263041;
		border-radius: 8px;
		padding: 4px 8px;
		width: -webkit-max-content;
		width: -moz-max-content;
		width: max-content
	}

	.totalPaid2 h4[data-v-5b1ede3b],
	.totalPaid2 p {
		margin: 0
	}

	.totalPaid2 h4 {
		font-weight: 700;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: -.02em;
		margin-left: 4px
	}

	.totalPaid2 p {
		color: #93acd3;
		font-weight: 500;
		font-size: 12px;
		line-height: 18px;
		letter-spacing: -.02em;
		margin-right: 6px
	}

	.totalPaid2 img {
		margin-right: 4px;
		width: 20px
	}

	.odds-king-contrl {
		margin-top: 24px;
		justify-content: flex-start
	}

	.odds-king-contrl button {
		margin-right: 20px
	}

	.fixed-img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: auto
	}

	.s5Img1 {
		width: 56.6%;
		content: url(../../assets/images/s5Img1Big.png)
	}

	@media(max-width:890px) {
		.s5Img1 {
			transform: scale(1.23) translate(-13px, 22px)
		}
	}

	@media(max-width:1122px) {
		.opened-left-panel .s5Img1 {
			transform: scale(1.23) translate(-13px, 22px)
		}
	}

	@media(max-width:1215px) {
		.opened-right-panel .s5Img1 {
			transform: scale(1.23) translate(-13px, 22px)
		}
	}

	@media(max-width:1230px) {
		.opened-contests-panel .s5Img1 {
			transform: scale(1.23) translate(-13px, 22px)
		}
	}

	@media(max-width:1447px) {
		.opened-left-panel.opened-right-panel .s5Img1 {
			transform: scale(1.23) translate(-13px, 22px)
		}
	}

	@media(max-width:1462px) {
		.opened-left-panel.opened-contests-panel .s5Img1 {
			transform: scale(1.23) translate(-13px, 22px)
		}
	}

	@media(max-width:750px) {
		.s5Img1 {
			transform: scale(1.3) translate(2px, 30px)
		}
	}

	@media(max-width:982px) {
		.opened-left-panel .s5Img1 {
			transform: scale(1.3) translate(2px, 30px)
		}
	}

	@media(max-width:1075px) {
		.opened-right-panel .s5Img1 {
			transform: scale(1.3) translate(2px, 30px)
		}
	}

	@media(max-width:1090px) {
		.opened-contests-panel .s5Img1 {
			transform: scale(1.3) translate(2px, 30px)
		}
	}

	@media(max-width:1307px) {
		.opened-left-panel.opened-right-panel .s5Img1 {
			transform: scale(1.3) translate(2px, 30px)
		}
	}

	@media(max-width:1322px) {
		.opened-left-panel.opened-contests-panel .s5Img1 {
			transform: scale(1.3) translate(2px, 30px)
		}
	}

	@media(max-width:699px) {
		.s5Img1 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5Img1Low.png)
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s5Img1 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5Img1Low.png)
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s5Img1 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5Img1Low.png)
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s5Img1 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5Img1Low.png)
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s5Img1 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5Img1Low.png)
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s5Img1 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5Img1Low.png)
		}
	}

	.sport-bet {
		padding: 32px 50% 24px 28px
	}

	.sport-bet .fixed-img {
		left: auto;
		right: 0
	}

	@media(max-width:699px) {
		.sport-bet {
			margin: 0 auto 20px;
			padding: 24px 20px 99%
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .sport-bet {
			margin: 0 auto 20px;
			padding: 24px 20px 99%
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .sport-bet {
			margin: 0 auto 20px;
			padding: 24px 20px 99%
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .sport-bet {
			margin: 0 auto 20px;
			padding: 24px 20px 99%
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .sport-bet {
			margin: 0 auto 20px;
			padding: 24px 20px 99%
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .sport-bet {
			margin: 0 auto 20px;
			padding: 24px 20px 99%
		}
	}

	.sport-bet a {
		width: -webkit-max-content;
		width: -moz-max-content;
		width: max-content
	}

	.s5-profbords {
		margin-bottom: 20px;
		justify-content: flex-start
	}

	@media(max-width:900px) {
		.s5-profbords {
			align-items: flex-start;
			flex-direction: column;
			margin-bottom: 16px
		}
	}

	@media(max-width:1132px) {
		.opened-left-panel .s5-profbords {
			align-items: flex-start;
			flex-direction: column;
			margin-bottom: 16px
		}
	}

	@media(max-width:1225px) {
		.opened-right-panel .s5-profbords {
			align-items: flex-start;
			flex-direction: column;
			margin-bottom: 16px
		}
	}

	@media(max-width:1240px) {
		.opened-contests-panel .s5-profbords {
			align-items: flex-start;
			flex-direction: column;
			margin-bottom: 16px
		}
	}

	@media(max-width:1457px) {
		.opened-left-panel.opened-right-panel .s5-profbords {
			align-items: flex-start;
			flex-direction: column;
			margin-bottom: 16px
		}
	}

	@media(max-width:1472px) {
		.opened-left-panel.opened-contests-panel .s5-profbords {
			align-items: flex-start;
			flex-direction: column;
			margin-bottom: 16px
		}
	}

	.s5Img2 {
		pointer-events: none;
		width: 50%;
		content: url(../../assets/images/s5Img2Big.png)
	}

	@media(max-width:890px) {
		.s5Img2 {
			transform: scale(1.3) translate(19px, 27px)
		}
	}

	@media(max-width:1122px) {
		.opened-left-panel .s5Img2 {
			transform: scale(1.3) translate(19px, 27px)
		}
	}

	@media(max-width:1215px) {
		.opened-right-panel .s5Img2 {
			transform: scale(1.3) translate(19px, 27px)
		}
	}

	@media(max-width:1230px) {
		.opened-contests-panel .s5Img2 {
			transform: scale(1.3) translate(19px, 27px)
		}
	}

	@media(max-width:1447px) {
		.opened-left-panel.opened-right-panel .s5Img2 {
			transform: scale(1.3) translate(19px, 27px)
		}
	}

	@media(max-width:1462px) {
		.opened-left-panel.opened-contests-panel .s5Img2 {
			transform: scale(1.3) translate(19px, 27px)
		}
	}

	@media(max-width:699px) {
		.s5Img2 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5img2Low.png)
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s5Img2 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5img2Low.png)
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s5Img2 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5img2Low.png)
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s5Img2 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5img2Low.png)
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s5Img2 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5img2Low.png)
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s5Img2 {
			transform: none;
			top: auto;
			bottom: 0;
			width: 100%;
			height: auto;
			content: url(../../assets/images/s5img2Low.png)
		}
	}

	.king-time {
		position: absolute;
		width: 284px;
		height: 60px;
		background: hsla(0, 0%, 100%, .35);
		box-shadow: 0 21px 40px -21px rgba(0, 0, 0, .08);
		-webkit-backdrop-filter: blur(4px);
		backdrop-filter: blur(4px);
		border-radius: 12px;
		transform: translate(-50%, -50%);
		left: 25%;
		bottom: -10px;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 8px
	}

	.king-time p {
		margin-bottom: 0;
		margin-left: 8px;
		font-weight: 800;
		font-size: 31px;
		line-height: 110%;
		text-align: center;
		letter-spacing: .02em;
		text-transform: uppercase;
		color: #fff;
		text-shadow: 0 2.10707px 6px rgba(0, 0, 0, .25)
	}

	@media(max-width:699px) {
		.king-time {
			left: 50%
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .king-time {
			left: 50%
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .king-time {
			left: 50%
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .king-time {
			left: 50%
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .king-time {
			left: 50%
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .king-time {
			left: 50%
		}
	}

	@media(max-width:750px) {
		.bfgPaid h4 {
			font-size: 18px
		}
	}

	@media(max-width:982px) {
		.opened-left-panel .bfgPaid h4 {
			font-size: 18px
		}
	}

	@media(max-width:1075px) {
		.opened-right-panel .bfgPaid h4 {
			font-size: 18px
		}
	}

	@media(max-width:1090px) {
		.opened-contests-panel .bfgPaid h4 {
			font-size: 18px
		}
	}

	@media(max-width:1307px) {
		.opened-left-panel.opened-right-panel .bfgPaid h4 {
			font-size: 18px
		}
	}

	@media(max-width:1322px) {
		.opened-left-panel.opened-contests-panel .bfgPaid h4 {
			font-size: 18px
		}
	}

	.ab-sport-s8 {
		position: relative;
		margin-bottom: 58px
	}

	.ab-sport-s8 .forSrcl {
		top: -50px
	}

	@media(max-width:850px) {
		.ab-sport-s8 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1082px) {
		.opened-left-panel .ab-sport-s8 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1175px) {
		.opened-right-panel .ab-sport-s8 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1190px) {
		.opened-contests-panel .ab-sport-s8 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1407px) {
		.opened-left-panel.opened-right-panel .ab-sport-s8 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:1422px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s8 .forSrcl {
			top: -50px
		}
	}

	@media(max-width:900px) {
		.ab-sport-s8 {
			margin-bottom: 34px
		}
	}

	@media(max-width:1132px) {
		.opened-left-panel .ab-sport-s8 {
			margin-bottom: 34px
		}
	}

	@media(max-width:1225px) {
		.opened-right-panel .ab-sport-s8 {
			margin-bottom: 34px
		}
	}

	@media(max-width:1240px) {
		.opened-contests-panel .ab-sport-s8 {
			margin-bottom: 34px
		}
	}

	@media(max-width:1457px) {
		.opened-left-panel.opened-right-panel .ab-sport-s8 {
			margin-bottom: 34px
		}
	}

	@media(max-width:1472px) {
		.opened-left-panel.opened-contests-panel .ab-sport-s8 {
			margin-bottom: 34px
		}
	}

	.s8-wrp {
		padding: 28px 28px 42px;
		border-radius: 16px;
		background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
		justify-content: space-between;
		background-image: url(../../assets/images/s5Img3Big.png);
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: right;
	}

	.s8-wrp .sub-title {
		font-weight: 700;
		font-size: 22px;
		line-height: 34px;
		margin-bottom: 6px
	}

	@media(max-width:699px) {
		.s8-wrp .sub-title {
			margin-bottom: 8px;
			font-size: 24px;
			line-height: 32px;
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s8-wrp .sub-title {
			margin-bottom: 8px;
			font-size: 24px;
			line-height: 32px;
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s8-wrp .sub-title {
			margin-bottom: 8px;
			font-size: 24px;
			line-height: 32px
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s8-wrp .sub-title {
			margin-bottom: 8px;
			font-size: 24px;
			line-height: 32px
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s8-wrp .sub-title {
			margin-bottom: 8px;
			font-size: 24px;
			line-height: 32px
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s8-wrp .sub-title {
			margin-bottom: 8px;
			font-size: 24px;
			line-height: 32px
		}
	}

	.s8-wrp .gray-p {
		text-align: left;
		font-size: 16px;
		line-height: 24px;
		margin-bottom: 0;
		padding-right: 10px
	}

	@media(max-width:699px) {
		.s8-wrp .gray-p {
			margin-bottom: 16px;
			font-size: 14px;
			line-height: 20px
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s8-wrp .gray-p {
			margin-bottom: 16px;
			font-size: 14px;
			line-height: 20px
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s8-wrp .gray-p {
			margin-bottom: 16px;
			font-size: 14px;
			line-height: 20px
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s8-wrp .gray-p {
			margin-bottom: 16px;
			font-size: 14px;
			line-height: 20px
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s8-wrp .gray-p {
			margin-bottom: 16px;
			font-size: 14px;
			line-height: 20px
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s8-wrp .gray-p {
			margin-bottom: 16px;
			font-size: 14px;
			line-height: 20px
		}
	}

	.s8-wrp-text {
		max-width: 392px
	}

	@media(max-width:699px) {
		.s8-wrp {
			padding: 28px 20px 24px;
			flex-direction: column;
			background-image: none;
		}
	}

	@media(max-width:931px) {
		.opened-left-panel .s8-wrp {
			padding: 28px 20px 24px;
			flex-direction: column
		}
	}

	@media(max-width:1024px) {
		.opened-right-panel .s8-wrp {
			padding: 28px 20px 24px;
			flex-direction: column
		}
	}

	@media(max-width:1039px) {
		.opened-contests-panel .s8-wrp {
			padding: 28px 20px 24px;
			flex-direction: column
		}
	}

	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .s8-wrp {
			padding: 28px 20px 24px;
			flex-direction: column
		}
	}

	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .s8-wrp {
			padding: 28px 20px 24px;
			flex-direction: column
		}
	}

	.s8-wrp-btns {
		justify-content: space-between;
		flex-wrap: wrap;
		min-width: 365px
	}

	.s8-wrp-btns .i-tel {
		background-color: #3a07f2
	}
	.s8-wrp-btns .i-tel.TW{
		background-color: #02b346;
	}
	.s8-wrp-btns .i-tw {
		background-color: #00a8ff
	}

	.s8-wrp-btns .i-inst {
		background: linear-gradient(109.27deg, #7320ba 8.67%, #e03d44 57.74%, #f6cc60 102.89%)
	}

	.s8-wrp-btns.i-dis {
		background-color: #5865f2
	}

	@media(max-width:990px) {
		.s8-wrp-btns {
			max-width: 380px;
			width: 100%;
			min-width: auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
			grid-gap: 12px;
			gap: 12px
		}
	}

	@media(max-width:1222px) {
		.opened-left-panel .s8-wrp-btns {
			max-width: 380px;
			width: 100%;
			min-width: auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
			grid-gap: 12px;
			gap: 12px
		}
	}

	@media(max-width:1315px) {
		.opened-right-panel .s8-wrp-btns {
			max-width: 380px;
			width: 100%;
			min-width: auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
			grid-gap: 12px;
			gap: 12px
		}
	}

	@media(max-width:1330px) {
		.opened-contests-panel .s8-wrp-btns {
			max-width: 380px;
			width: 100%;
			min-width: auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
			grid-gap: 12px;
			gap: 12px
		}
	}

	@media(max-width:1547px) {
		.opened-left-panel.opened-right-panel .s8-wrp-btns {
			max-width: 380px;
			width: 100%;
			min-width: auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
			grid-gap: 12px;
			gap: 12px
		}
	}

	@media(max-width:1562px) {
		.opened-left-panel.opened-contests-panel .s8-wrp-btns {
			max-width: 380px;
			width: 100%;
			min-width: auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
			grid-gap: 12px;
			gap: 12px
		}
	}
  .min288{
  }
</style>
