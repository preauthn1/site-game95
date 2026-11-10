<template>
	<div class="app " :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<article class="fairness">
						<section class="home">
							<h1 class="home__title">{{ $t('如何检验公平性？') }}</h1>
							<p class="home__sub-title">{{ $t('fairness_desc1') }}</p>
							<div class="home__img-wrap">
								<img loading="lazy" src="../../assets/images/racoon-fairness.876aada.png" alt="money" class="home__img">
							</div>
						</section>
						<section class="how">
							<header class="how__header">
								<h2 class="how__header-title">{{ $t('它是如何工作的？') }}</h2>
								<p class="how__header-sub-title">{{ $t('fairness_desc2') }}</p>
							</header>
							<article class="box">
								<img loading="lazy" src="../../assets/images/number1.svg" alt="index" class="box__index-img">
								<h4 class="box__title">{{ $t('合作公正') }}</h4>
								<p class="box__sub-title">{{ $t('fairness_desc3') }}</p>
								<img loading="lazy" :src="$t('0-fairness-desc')" alt="desc" class="box__desc-img">
							</article>
							<article class="box">
								<img loading="lazy" src="../../assets/images/number2.svg" alt="index" class="box__index-img">
								<h4 class="box__title">{{ $t('投注') }}</h4>
								<p class="box__sub-title">{{ $t('fairness_desc4') }}</p>
								<img loading="lazy" :src="$t('1-fairness-desc')" alt="desc" class="box__desc-img">
							</article>
							<article class="box">
								<img loading="lazy" src="../../assets/images/number3.svg" alt="index" class="box__index-img">
								<h4 class="box__title">{{ $t('检查验证') }}</h4>
								<p class="box__sub-title">{{ $t('fairness_desc5') }}</p>
								<img loading="lazy" :src="$t('2-fairness-desc')" alt="desc" class="box__desc-img">
							</article>
							<router-link to="/all-game" class="button button_lg button_red button_center">
								<span class="button__inner">
									<span class="button__text">{{ $t('开始游戏') }}</span>
								</span>
							</router-link>
						</section>
						<section class="faq">
							<h2 class="faq__title">{{ $t('常见问题') }}</h2>
							<div class="faq-items">
								<div class="faq-items__column">
									<div class="faq-element" @click="faqClick(item)" v-for="(item,index) in faqListleft" :key="index" :class="item.select?'faq-show':''">
										<div class="faq-element__wrapper">
											<h3 class="faq-element__title">
												{{ $t(item.title) }}
											</h3>
											<div class="faq-element__icon-block">
												<svgIcon icon="icon-arrow-down" widthName="20" heightName="20" className="faq-element__icon-arrow"></svgIcon>
											</div>
										</div>
										<p class="faq-element__description" v-html="$t('fairness_faq_' + item.id)"></p>
									</div>
								</div>
								<div class="faq-items__column">
									<div class="faq-element" @click="faqClick(item)" v-for="(item,index) in faqListright" :key="index" :class="item.select?'faq-show':''">
										<div class="faq-element__wrapper">
											<h3 class="faq-element__title">
												{{ $t(item.title) }}
											</h3>
											<div class="faq-element__icon-block">
												<svgIcon icon="icon-arrow-down" widthName="20" heightName="20" className="faq-element__icon-arrow"></svgIcon>
											</div>
										</div>
										<p class="faq-element__description" v-html="$t('fairness_faq_' + item.id)"></p>
									</div>
								</div>
							</div>
						</section>
					</article>
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
	// @ is an alias to /src
		import Head from '@/components/Head.vue'
		import Foot from '@/components/Foot.vue'
		import asidebar from '@/components/aside.vue'
		import svgIcon from '@/components/svg.vue'
		import tabbar from '@/components/tabbar.vue'
	export default {

		components: {
				Head,
				Foot,
				asidebar,
				svgIcon,
				tabbar
			},
		computed: {
			faqListleft: function () {
				var list = this.faqList;
				var arrTemp = [];
				for (var i = 0; i < list.length; i++) {
					if (i % 2 == 0) {
						arrTemp.push(list[i]);
					}
				}
				return arrTemp;
			},
			faqListright: function () {
				var list = this.faqList;
				var arrTemp = [];
				for (var i = 0; i < list.length; i++) {
					if (i % 2 != 0) {
						arrTemp.push(list[i]);
					}
				}
				return arrTemp;
			}
		},
		data() {
			return {
				windowWidth: document.documentElement.clientWidth,
				openedleft:true,
				openedcontests:false,
				isMobileFlag:false,// 响应式
				faqCur:0,
				faqList:[
					{
						id:0,
						title:'1.什么是I-Gaming游戏？',
						content:'',
						select: false
					},{id:1,
						title:'2.I-Gaming游戏有哪些优势？',
						content:'',
						select: false
					},{id:2,
						title:'3.I-Gaming游戏的可用性？',
						content:'',
						select: false
					},{id:3,
						title:'4.I-Gaming游戏丰富！',
						content:'',
						select: false
					},{id:4,
						title:'5.为什么与比特币相同的SHA256技术是公平的？',
						content:'',
						select: false
					},{id:5,
						title:'6.为什么是SHA-256？',
						content:'',
						select: false
					}
				],
			};
		},
		methods: {
			faqClick(item) {
				for (let i = 0; i < this.faqList.length; i++) {
					this.faqList[i].select = !item.select && item.id == this.faqList[i].id
				}
			},

			menuClick(){
				this.openedleft = !this.openedleft
			},
			contestsClick(){
				this.openedcontests = !this.openedcontests
			},
			contestsShow(){
				this.openedcontests = true
			},
		},
		created() {
			this.isPhone()
		},
	}
</script>
<style scoped>

	.home {
		display: grid;
		grid-template-rows: repeat(2, 220px);
		grid-template-columns: minmax(400px, 1fr) minmax(275px, 387px);
		grid-template-areas: "title img-wrap""sub-title img-wrap"
	}

	.home__title {
		font-weight: 900;
		font-size: 50px;
		line-height: 60px;
		text-transform: uppercase;
		color: #fff;
		align-self: end;
		margin-bottom: 20px;
		grid-area: title
	}

	.home__sub-title {
		font-weight: 500;
		font-size: 15px;
		line-height: 23px;
		color: #b5c2cf;
		margin: 0;
		max-width: 400px;
		grid-area: sub-title
	}

	.home__img-wrap {
		width: 100%;
		position: relative;
		grid-area: img-wrap
	}

	.home__img-wrap:after {
		content: "";
		position: absolute;
		top: 25%;
		left: 50%;
		width: 250px;
		height: 300px;
		background: #3a07f2;
		filter: blur(150px);
		transform: translate(-50%, -50%) rotate(-79.02deg);
		z-index: -1
	}

	@media(max-width:768px) {
		.home__img-wrap:after {
			top: 50%
		}
	}

	.how {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: linear-gradient(218.79deg, #3a07f2 -42.47%, rgba(22, 31, 44, 0) 87.54%);
		filter: drop-shadow(0 20px 38px rgba(33, 23, 72, .069575));
		border-radius: 30px;
		padding: 40px 70px;
		margin-bottom: 75px
	}

	.how__header {
		text-align: center;
		color: #fff;
		margin-bottom: 20px
	}

	.how__header-title {
		font-weight: 700;
		font-size: 40px;
		line-height: 60px;
		text-transform: uppercase
	}

	.how__header-sub-title {
		font-size: 15px;
		line-height: 23px;
		max-width: 537px;
		margin: 0 auto
	}

	.box {
		margin-bottom: 35px;
		align-items: center;
		display: grid;
		grid-template-rows: 80px minmax(70px, 1fr);
		grid-template-columns: minmax(100px, 180px) minmax(45%, 1fr) minmax(200px, 333px);
		grid-template-areas: "index-img title desc-img""index-img sub-title desc-img"
	}

	.box__index-img {
		grid-area: index-img;
		padding-right: 20px
	}

	.box__title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		align-self: end;
		grid-area: title
	}

	.box__sub-title {
		font-weight: 400;
		font-size: 15px;
		line-height: 23px;
		grid-area: sub-title
	}
  @media(max-width:758px){
    .box__sub-title{
      margin-bottom: 15px;
    }
  }
	.box__desc-img {
		padding-left: 20px;
		grid-area: desc-img
	}

	.faq__title {
		font-weight: 700;
		font-size: 30px;
		line-height: 29px;
		text-align: center;
		text-transform: uppercase;
		color: #fff;
		margin-bottom: 45px
	}

	@media(max-width:768px) {
		.box__desc-img,.box__sub-title,.how__header-sub-title{
			max-width: calc(100vw - 32px - 30px) !important;
			width: 100vw;
		}
		.fairness {
			padding-top: 30px
		}

		.home {
			text-align: center;
			grid-template-rows: auto;
			grid-template-columns: auto;
			grid-template-areas: "title""sub-title""img-wrap"
		}

		.home__title {
			font-size: 40px;
			line-height: 52px
		}

		.home__sub-title {
			margin: 0 auto
		}

		.home__img-wrap {
			margin: 0 auto;
			max-width: 275px;
			height: 312px
		}

		.home__img-wrap:after {
			z-index: 1
		}

		.home__img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 2
		}

		.how {
			background: linear-gradient(258.79deg, #2281f6 -44.47%, rgba(22, 31, 44, 0) 75.54%);
			border-radius: 15px
		}

		.how__header-title {
			font-size: 30px;
			line-height: 42px
		}

		.box {
			text-align: center;
			position: relative;
			grid-template-rows: 105px repeat(2, auto);
			grid-template-columns: 1fr;
			grid-template-areas: "title""sub-title""desc-img"
		}

		.box__index-img {
			padding-right: 0;
			position: absolute;
			z-index: -1;
			top: 0;
			left: 50%;
			transform: translateX(-50%)
		}

		.box__desc-img {
			padding-left: 0;
			max-width: 320px;
			margin: 0 auto
		}
	}

	.faq-items{
		margin-bottom: 50px;
		display: flex;
		width: 100%
	}

	@media(max-width:1100px) {
		.faq-items{
			flex-direction: column
		}
	}

	@media(max-width:1332px) {
		.opened-left-panel .faq-items{
			flex-direction: column
		}
	}

	@media(max-width:1425px) {
		.opened-right-panel .faq-items{
			flex-direction: column
		}
	}

	@media(max-width:1440px) {
		.opened-contests-panel .faq-items{
			flex-direction: column
		}
	}

	@media(max-width:1657px) {
		.opened-left-panel.opened-right-panel .faq-items{
			flex-direction: column
		}
	}

	@media(max-width:1672px) {
		.opened-left-panel.opened-contests-panel .faq-items{
			flex-direction: column
		}
	}

	.faq-items__column{
		width: 50%;
		margin-right: 24px
	}

	.faq-items__column:last-child {
		margin-right: 0
	}

	@media(max-width:1100px) {
		.faq-items__column{
			width: 100%;
			margin-right: 0
		}
	}

	@media(max-width:1332px) {
		.opened-left-panel .faq-items__column{
			width: 100%;
			margin-right: 0
		}
	}

	@media(max-width:1425px) {
		.opened-right-panel .faq-items__column{
			width: 100%;
			margin-right: 0
		}
	}

	@media(max-width:1440px) {
		.opened-contests-panel .faq-items__column{
			width: 100%;
			margin-right: 0
		}
	}

	@media(max-width:1657px) {
		.opened-left-panel.opened-right-panel .faq-items__column{
			width: 100%;
			margin-right: 0
		}
	}

	@media(max-width:1672px) {
		.opened-left-panel.opened-contests-panel .faq-items__column{
			width: 100%;
			margin-right: 0
		}
	}

	.faq-element{
		padding: 24px 0;
		border-top: 1px solid #202a39;
		cursor: pointer
	}

	.faq-element:last-child {
		border-bottom: 1px solid #202a39
	}

	.faq-element__wrapper{
		position: relative
	}

	.faq-element__title{
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		padding-right: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		margin: 0
	}

	.faq-show .faq-element__title,
	.faq-show .faq-element__title:hover {
		color: #3a07f2
	}

	.faq-element__title:hover {
		color: #93acd3
	}

	.faq-element__description{
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: #55657e;
		opacity: 0;
		height: 0;
		margin: 0;
		transition: .3s all;
	}

	.faq-show .faq-element__description{
		opacity: 1;
		margin: 17px 0 0;
		height: auto
	}

	.faq-element__icon-block{
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(-50%, -50%)
	}

	.faq-element__icon-arrow{
		fill: #3a07f2;
		transition: all .2s
	}

	.faq-show .faq-element__icon-arrow{
		transform: rotate(180deg)
	}

	.faq-show{
		max-height: none
	}
</style>
