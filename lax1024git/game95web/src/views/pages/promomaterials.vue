<template>
	<div class="app " :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<div class="promo_materials">
						<h1 class="title">{{ $t('Promo Materials') }}</h1>
						<materialScienceCart></materialScienceCart>
						<h3 class="tabs-banner__title">{{ $t('BANNERS') }}</h3>
						<div class="tabs-banner__box">
							<ul class="tabs-banner">
								<li class="tabs-banner__item " v-for="(item,index) in tabs" @click="tab(index)" :class="index == cur?'tabs-banner__item_active':''" :key="index">
									<span>{{ $t(item.name) }}</span>
								</li>
							</ul>
						</div>
						<div class="tabs-banner-content" >
							<div class="bf-banners">
								<section class="tabs">
									<!-- <div class="tabs-banner__box">
										<ul class="tabs-banner">
											<li class="tabs-banner__item " v-for="(item,index) in subtabs" @click="subTab(index)" :class="index == subCur?'tabs-banner__item_active':''" :key="index">
												<span>{{ $t(item.name) }}</span>
											</li>
										</ul>
									</div> -->
									<div class="tabs-banner-content" v-if="subCur == 0">
										<div class="banner_tab">
											<div class="banner_area" v-for="(item, index) in staticPics" :key="`pic${index}`">
												<h5>{{ $t('Size') }}: {{ item.size }}</h5>
												<img :src="item.pic" alt="" class="banner_area__img">
												<div class="banner_area__copy">
													<el-input :value="inputAddress.replace('#URL#', url).replace('#PIC#', item.pic)" readonly="readonly">
														<button slot="suffix" type="button" class="button button_sm button_blue button_center button_only-icon" @click="copyButton(inputAddress.replace('#URL#', url).replace('#PIC#', item.pic))">
															<span class="button__icon">
																<svgIcon className="ico" icon="icon-copy"></svgIcon>
															</span>
														</button>
													</el-input>
												</div>
											</div>
										</div>
									</div>
									<div class="tabs-banner-content" v-if="subCur == 1">
										<div class="empty-box">
											<img src="../../assets/images/no-empty.png" alt="">
											<div class="e-label">{{ $t('暂无数据') }}</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Foot />
		</div>
		<asidebar :flagShow="openedleft" @menuClick="menuClick" ></asidebar>
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
	import materialScienceCart from './components/materialScienceCart.vue'
	export default {
		components: {
			Head,
			Foot,
			asidebar,
			svgIcon,
			tabbar,
			materialScienceCart
		},
		data() {
			return {
				windowWidth: document.documentElement.clientWidth,
				openedleft:true,
				openedcontests:false,
				isMobileFlag:false,// 响应式
				url:'',
				staticPics: [
					{pic:this.$t('publicity1'), size: '114x90'},
					{pic:this.$t('publicity2'), size: '120x600'},
					{pic:this.$t('publicity3'), size: '160x600'},
					{pic:this.$t('publicity4'), size: '200x200'},
					{pic:this.$t('publicity5'), size: '240x400'},
					{pic:this.$t('publicity6'), size: '250x250'},
					{pic:this.$t('publicity7'), size: '300x250'},
					{pic:this.$t('publicity8'), size: '300x600'},
					{pic:this.$t('publicity9'), size: '320x50'},
					{pic:this.$t('publicity10'), size: '320x100'},
					{pic:this.$t('publicity11'), size: '321x101'},
					{pic:this.$t('publicity12'), size: '336x280'},
					{pic:this.$t('publicity13'), size: '468x60'},
					{pic:this.$t('publicity14'), size: '480x70'},
					{pic:this.$t('publicity15'), size: '500x65'},
					{pic:this.$t('publicity16'), size: '728x90'},
					{pic:this.$t('publicity17'), size: '730x90'},
					{pic:this.$t('publicity18'), size: '970x250'},
					{pic:this.$t('publicity19'), size: '1140x90'},
					{pic:this.$t('publicity20'), size: '1200x720'},
					{pic:this.$t('publicity21'), size: '1920x106'},
				],
				inputAddress:'<a href="#URL#" target="_blank"><img src="#PIC#" /></a>',
				cur: 0,
				tabs: [
					{
						name: '赛博浣熊',
					},
					// {
					// 	name: '体育',
					// },
				],
				subCur: 0,
				subtabs: [{
					name: '静态图',
				},
				// {
				// 	name: '动态图',
				// },
				],
			};
		},
		methods: {
			menuClick(){
				this.openedleft = !this.openedleft
			},
			contestsClick(){
				this.openedcontests = !this.openedcontests
			},
			contestsShow(){
				this.openedcontests = true
			},
			copyButton(text){
				this.$copyText(text).then( e => {
      		this.successTips('Copy success');
				}, function (e) {
				})
			},
			tab(index) {
				this.cur = index
			},
			subTab(index) {
				this.subCur = index
			},
		},
		mounted() {
			this.head_userInfo = this.$helper.get("userInfo");
			this.url = window.location.origin
			if (this.head_userInfo) {
				this.url += "?share_code=" + this.head_userInfo.rec_code
			}
		},
		created() {
			this.isPhone()
		}
	}
</script>
<style scoped>
	.banner_area {
			position: relative;
			width: 100%;
			background: #0d131c;
			border: .866667px solid #28374d;
			box-sizing: border-box;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			padding: 25px 24px 24px 22px;
			margin-top: 15px
		}
		
		.banner_area:first-child {
			margin-top: 0
		}

		.banner_area h5 {
			margin: 0 0 15px;
			font-size: 14px;
			line-height: 27px;
			color: #9ca8ba
		}

		.banner_area .banner_area__copy {
			position: relative;
			margin: 17px 0 24px;
			width: 100%
		}

		.banner_area .banner_area__copy-text {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-size: 12px;
			line-height: 27px;
			color: #677282;
			background: #161e28;
			border-radius: 5px;
			padding: 0 50px 0 15px;
			width: 100%;
			border: 1px solid rgba(85, 101, 126, .5)
		}

		.banner_area .banner_area__copy-text:focus {
			border: 1px solid #297fe5;
			outline: none
		}

		@media(max-width:1020px) {
			.banner_area {
				margin: 15px auto 0
			}

			.banner_area__img {
				display: none
			}
		}

		.promo_materials{
			padding-bottom: 40px
		}
		.promo_materials {
			padding-bottom: 40px
		}

		.title {
			font-weight: 900;
			font-size: 50px;
			line-height: 58px;
			text-transform: uppercase;
			color: #fff;
			margin: 0 0 30px;
			text-align: center
		}

		@media(max-width: 575.98px) {
			.title {
				font-size:52px
			}
		}

		.tabs-banner__box {
			display: flex;
			margin: 0 0 20px;
			text-align: center;
			font-weight: 600
		}

		.tabs-banner__title {
			font-weight: 500;
			font-size: 28px;
			line-height: 27px;
			text-transform: uppercase;
			color: #fff;
			margin: 80px 0 24px
		}

		.tabs-banner {
			position: relative;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			font-size: 20px;
			line-height: 1.5;
			text-transform: uppercase;
			text-align: center;
			white-space: nowrap;
			color: #55657e
		}

		.tabs-banner__item {
			cursor: pointer;
			display: block;
			flex-shrink: 0;
			margin: 0 33px 0 0
		}

		.tabs-banner__item:last-child {
			margin: 0
		}

		.tabs-banner__item span {
			position: relative;
			display: inline-block;
			padding: 11px 0;
			font-weight: 500;
			font-size: 20px;
			line-height: 30px;
			color: #fff;
			text-decoration: none
		}

		.tabs-banner__item span>* {
			color: #ffc51c!important
		}

		.tabs-banner__item span img {
			opacity: .4;
			transition: opacity .3s;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			pointer-events: none
		}

		.tabs-banner__item span:after {
			opacity: 0;
			content: "";
			position: absolute;
			left: 50%;
			bottom: 3px;
			transform: translate(-50%);
			width: 100%;
			height: 3px;
			border-radius: 4px;
			background: #f42e59;
			transition: all .3s
		}

		.tabs-banner__item span:hover {
			color: #fff;
			cursor: pointer
		}

		.tabs-banner__item a:hover a:after,.tabs-banner__item a:hover a img {
			opacity: 1
		}

		@media(max-width: 445px) {
			.tabs-banner__item a {
				font-size:15px
			}
		}

		@media(max-width: 677px) {
			.opened-left-panel .tabs-banner__item a {
				font-size:15px
			}
		}

		@media(max-width: 770px) {
			.opened-right-panel .tabs-banner__item a {
				font-size:15px
			}
		}

		@media(max-width: 785px) {
			.opened-contests-panel .tabs-banner__item a {
				font-size:15px
			}
		}

		@media(max-width: 1002px) {
			.opened-left-panel.opened-right-panel .tabs-banner__item a {
				font-size:15px
			}
		}

		@media(max-width: 1017px) {
			.opened-left-panel.opened-contests-panel .tabs-banner__item a {
				font-size:15px
			}
		}

		.tabs-banner__item:first-child a img {
			position: relative;
			top: 2px;
			left: 0
		}

		.tabs-banner__item_active {
			color: #fff
		}

		.tabs-banner__item_active span:after,.tabs-banner__item_active span img {
			opacity: 1
		}

		

		


		


		.fade-enter-active,.fade-leave-active {
			transition: opacity .25s
		}

		.fade-enter,.fade-leave-to {
			opacity: 0
		}
		.banner_area__copy /deep/ .el-input__suffix{
			height: 44px;
			display: flex;
			align-items: center;
		}
		.empty-box{
			text-align: center;
		}
		.empty-box img{
			width:240px;
		}
		.empty-box .e-label{
			margin-top: 20px;
			color: #93acd3;
		}
</style>
