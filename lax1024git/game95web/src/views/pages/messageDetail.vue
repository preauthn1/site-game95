<template>
	<div class="app " :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<article class="page-news-full">
						<div class="news">
							<div class="news__content">
								<div class="news__header">
									<div class="button news__btn-back button_sm button_grey1 button_center" size="small" @click="back()">
										<div class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-left-small" className="icon-arrow-left-small" widthName="24" heightName="24"></svgIcon>
											</span>
											<span class="button__text">{{$t('返回')}}</span>
										</div>
									</div>
								</div>
								<div class="news__text" v-if="msgData">
									<div class="news__text-read">
										<div class="news__banner"><img loading="lazy" alt="" :src="msgData.img"></div>
										<span class="datetime news__date">{{msgData.add_time}}</span>
										<div class="news__body" v-html="msgData.content">
										</div>
									</div>
								</div>
							</div>
						</div>
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
	import Head from '@/components/Head.vue'
	import Foot from '@/components/Foot.vue'
	import asidebar from '@/components/aside.vue'
	import svgIcon from '@/components/svg.vue'
	import tabbar from '@/components/tabbar.vue'
	export default {
		name: 'MessageDetailPage',
		components: {
			Head,
			Foot,
			asidebar,
			svgIcon,
			tabbar
		},
		data() {
			return {
				windowWidth: document.documentElement.clientWidth,
				openedleft:true,
				openedcontests:false,
				isMobileFlag:false,// 响应式
				msgData: {}
			};
		},
		watch: {
			'$route' (to, from) {
				this.getDetailsData()
			}
		},
		methods: {
			getDetailsData(){
				this.msgData = this.$route.params.msgInfo?this.$route.params.msgInfo:this.$helper.get('msgInfo' + this.$route.query.id);
			},
			menuClick(){
				this.openedleft = !this.openedleft
			},
			contestsShow(){
				this.openedcontests = true
			},
		},
		created() {
			this.isPhone();
			this.getDetailsData();
		},
	}
</script>
<style scoped>

/* news */
.news-preview {
	background-color: #161f2c;
	border-radius: 14px;
	overflow: hidden;
	text-decoration: none
}

.news-preview__image {
	position: relative;
	-webkit-transform: translateZ(0)
}

.news-preview__image:hover img {
	opacity: .7;
	transform: scale(1.025)
}

.news-preview__body {
	padding: 24px
}

@media(max-width:768px) {
	.news-preview__body {
		padding-right: 16px;
		padding-left: 16px
	}
}

.news-image {
	background-color: #111923;
	height: 0;
	position: relative;
	overflow: hidden;
	padding-top: 56%
}

.news-image img {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	-o-object-fit: cover;
	object-fit: cover;
	display: block;
	width: 100%;
	height: 100%;
	transition: transform .1s ease-in-out, opacity .1s ease-in-out
}

.news-body__head {
	display: flex;
	align-items: center;
	margin-bottom: 12px
}

.news-body__title {
	font-size: 18px;
	height: 43.2px;
	line-height: 1.2
}

.news-body__subtitle,
.news-body__title {
	display: -webkit-box;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2
}

.news-body__subtitle {
	color: #93acd3;
	font-size: 14px;
	height: 42px;
	line-height: 1.5;
	margin: 0
}

.news-body__time {
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	color: #55657e;
	margin-right: auto
}

.spinner__bounce {
	background-color: #55657e !important
}


.page-news {
	min-height: 400px;
	position: relative
}

.news-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24px
}

@media(max-width:1100px) {
	.news-header {
		flex-wrap: wrap
	}
}

.news-header__title {
	margin: 0 .5em 0 0
}

@media(max-width:1100px) {
	.news-header__title {
		margin-bottom: 24px
	}
}

.news-header__dropdown {
	position: relative
}

.main-news {
	margin-bottom: 40px
}

@media(max-width:1000px) {
	.main-news {
		margin-bottom: 24px
	}
}

@media(max-width:1232px) {
	.opened-left-panel .main-news {
		margin-bottom: 24px
	}
}

@media(max-width:1325px) {
	.opened-right-panel .main-news {
		margin-bottom: 24px
	}
}

@media(max-width:1340px) {
	.opened-contests-panel .main-news {
		margin-bottom: 24px
	}
}

@media(max-width:1557px) {
	.opened-left-panel.opened-right-panel .main-news {
		margin-bottom: 24px
	}
}

@media(max-width:1572px) {
	.opened-left-panel.opened-contests-panel .main-news {
		margin-bottom: 24px
	}
}

.news-row {
	display: grid;
	grid-column: center-start/center-end;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-gap: 24px;
	margin-bottom: 24px
}

.newsbig-preview {
	width: 100%;
	display: flex;
	grid-gap: 54px;
	gap: 54px;
	text-decoration: none
}

@media(max-width:1000px) {
	.newsbig-preview {
		grid-gap: 24px;
		gap: 24px
	}
}

@media(max-width:1232px) {
	.opened-left-panel .newsbig-preview {
		grid-gap: 24px;
		gap: 24px
	}
}

@media(max-width:1325px) {
	.opened-right-panel .newsbig-preview {
		grid-gap: 24px;
		gap: 24px
	}
}

@media(max-width:1340px) {
	.opened-contests-panel .newsbig-preview {
		grid-gap: 24px;
		gap: 24px
	}
}

@media(max-width:1557px) {
	.opened-left-panel.opened-right-panel .newsbig-preview {
		grid-gap: 24px;
		gap: 24px
	}
}

@media(max-width:1572px) {
	.opened-left-panel.opened-contests-panel .newsbig-preview {
		grid-gap: 24px;
		gap: 24px
	}
}

@media(max-width:768px) {
	.newsbig-preview {
		display: block
	}
}

@media(max-width:1000px) {
	.opened-left-panel .newsbig-preview {
		display: block
	}
}

@media(max-width:1093px) {
	.opened-right-panel .newsbig-preview {
		display: block
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .newsbig-preview {
		display: block
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .newsbig-preview {
		display: block
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .newsbig-preview {
		display: block
	}
}

.newsbig-preview__image {
	position: relative;
	width: 50%
}

@media(max-width:768px) {
	.newsbig-preview__image {
		display: block;
		margin-bottom: 24px;
		width: 100%
	}
}

@media(max-width:1000px) {
	.opened-left-panel .newsbig-preview__image {
		display: block;
		margin-bottom: 24px;
		width: 100%
	}
}

@media(max-width:1093px) {
	.opened-right-panel .newsbig-preview__image {
		display: block;
		margin-bottom: 24px;
		width: 100%
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .newsbig-preview__image {
		display: block;
		margin-bottom: 24px;
		width: 100%
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .newsbig-preview__image {
		display: block;
		margin-bottom: 24px;
		width: 100%
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .newsbig-preview__image {
		display: block;
		margin-bottom: 24px;
		width: 100%
	}
}

.newsbig-preview__body {
	width: 50%
}

@media(max-width:768px) {
	.newsbig-preview__body {
		width: 100%
	}
}

@media(max-width:1000px) {
	.opened-left-panel .newsbig-preview__body {
		width: 100%
	}
}

@media(max-width:1093px) {
	.opened-right-panel .newsbig-preview__body {
		width: 100%
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .newsbig-preview__body {
		width: 100%
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .newsbig-preview__body {
		width: 100%
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .newsbig-preview__body {
		width: 100%
	}
}

.newsbig-image {
	border-radius: 14px;
	background-color: #111923;
	height: 0;
	position: relative;
	overflow: hidden;
	padding-top: 56%
}

.newsbig-image img {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	-o-object-fit: cover;
	object-fit: cover;
	display: block;
	width: 100%;
	height: 100%;
	transition: transform .1s ease-in-out, opacity .1s ease-in-out
}

.newsbig-body {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start
}

.newsbig-body__head {
	display: flex;
	width: 100%;
	margin-bottom: 16px
}

.newsbig-body__title {
	font-size: 24px;
	height: 57.6px;
	line-height: 1.2
}

.newsbig-body__subtitle[data-v-9646461c],
.newsbig-body__title {
	width: 100%;
	display: -webkit-box;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2
}

.newsbig-body__subtitle {
	color: #93acd3;
	font-size: 14px;
	height: 42px;
	line-height: 1.5
}

.newsbig-body__time {
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	color: #93acd3;
	margin-left: auto
}

.newsbig-body__btn-readmore {
	margin-top: auto
}


.news{
	min-height: 400px
}

.news__header{
	margin-bottom: 24px;
	display: flex;
	align-items: center;
}

.news__headerbutton {
	margin-right: auto
}

.news__headerbutton svg {
	fill: #fff
}

.news__banner{
	margin-bottom: 20px
}

.news__banner img{
	max-width: 100%;
	border-radius: 25px
}

.news__content{
	max-width: 856px;
	margin: auto
}

.news__text{
	width: 100%
}

.news__title{
	font-weight: 500;
	font-size: 40px;
	line-height: 50px;
	color: #fff;
	margin-top: 16px;
	margin-bottom: 12px
}

.news__date{
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	color: #93acd3
}

.news__text-read{
	margin-bottom: 0
}

.news__share{
	width: 100%;
	background: #1c2532;
	border-radius: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 26px;
	margin: 30px 0
}

@media(max-width:575.98px) {
	.news__share{
		padding: 26px 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center
	}
}

.news__share-title{
	font-weight: 700;
	font-size: 24px;
	line-height: 32px;
	letter-spacing: -.02em;
	color: #3a07f2;
	margin-top: 14px;
	margin-bottom: 14px
}

@media(max-width:575.98px) {
	.news__share-title{
		width: 100%;
		text-align: center;
		margin-top: 0;
		margin-bottom: 32px
	}
}

.news__socials{
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	list-style: none !important;
	padding: 0 !important
}

.news__socials li {
	margin-left: 20px
}

.news__socials li:first-child {
	margin-left: 0
}

.news__socials li:first-child span {
	background: #ff3f18
}

.news__socials li:nth-child(2) span {
	background: linear-gradient(203.21deg, #37aee2 21.68%, #1e96c8 69.99%)
}

.news__socials li span {
	outline: 0 !important;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 60px;
	border-radius: 50% !important;
	transition: all .4s
}

.news__socials li span:hover {
	cursor: pointer;
	transform: scale(1.2);
	transform-origin: center
}

.news__socials li svg {
	fill: #fff
}

.news__body a {
	color: #2281f6
}

.news__body a::-moz-selection {
	background: #2281f6;
	text-shadow: none;
	color: #fff
}

.news__body a::selection {
	background: #2281f6;
	text-shadow: none;
	color: #fff
}

.news__body h1,
.news__body h2,
.news__body h3,
.news__body h4 {
	margin: 30px 0 10px
}

.news__body h1,
.news__body h2 {
	font-weight: 500;
	font-size: 40px;
	line-height: 50px
}

.news__body h1 {
	color: #fff
}

.news__body h2 {
	margin-bottom: 20px
}

.news__body h3 {
	font-weight: 500;
	font-size: 30px;
	line-height: 40px
}

.news__body h4 {
	font-weight: 500;
	font-size: 20px;
	line-height: 30px
}

.news__body h6 {
	font-size: 15px;
	line-height: 24px;
	color: #3a07f2;
	margin-bottom: 8px;
	width: 170px;
	height: 41px;
	background-color: rgba(34, 131, 246, .2);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center
}

.news__body p {
	font-size: 16px;
	line-height: 24px;
	color: #9cb3df;
	margin: 10px 0;
	padding: 10px 0 !important
}

.news__body ul {
	list-style-type: disc
}

.news__body ol,
.news__body ul {
	font-size: 16px;
	line-height: 30px;
	margin: 16px 0;
	padding: 0 40px;
	color: #9cb3df
}

.news__body figure img {
	width: 100%;
	border-radius: 25px
}

.news__body figure.image {
	clear: both;
	text-align: center;
	margin: 1em auto
}

.news__body figure.image-style-align-left {
	float: left;
	margin: 20px 40px 20px 0
}

.news__body figure.image-style-align-right {
	float: right;
	margin-left: 21px
}

.news__body figure.media {
	clear: both;
	margin: 1em auto
}

@media(max-width:575.98px) {
	.news__body figure {
		width: 100% !important
	}

	.news__body figure.image {
		float: none;
		margin: 10px 0
	}
}
</style>
