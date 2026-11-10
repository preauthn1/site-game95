<template>
	<div class="app " :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<div class="boxes">
						<div class="boxes__head">
							<h1 class="boxes__title">Cyber Raccoon Boxes</h1>
							<div class="boxes__tabs">
								<a href="/boxes/all" aria-current="page" class="button-tab router-link-exact-active router-link-active active boxes__tab button-tab_md button-tab_blue" type="button" >
									<span >
										All boxes
									</span>
								</a>
								<a href="/boxes/about" class="button-tab boxes__tab button-tab_md button-tab_blue" type="button" >
									<span >
										About
									</span>
								</a>
								<a href="/boxes/referral" class="button-tab boxes__tab button-tab_md button-tab_blue" type="button" >
									<span >
										Referral
										<span class="boxes__tab-label">20%</span>
									</span>
								</a>
								<a href="/boxes/faq" class="button-tab boxes__tab button-tab_md button-tab_blue" type="button" >
									<span >
										FAQ
									</span>
								</a>
							</div>
						</div>
						<div class="boxes__body">
							<all></all>
						</div>
						<div class="boxes__body">
							<about></about>
						</div>
						<div class="boxes__body">
							<faq></faq>
						</div>
						<div class="boxes__body">
							<referral></referral>
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
	// @ is an alias to /src
	import Head from '@/components/Head.vue'
	import Foot from '@/components/Foot.vue'
	import asidebar from '@/components/aside.vue'
	import tabbar from '@/components/tabbar.vue'
	import svgIcon from '@/components/svg.vue'
	import all from './boxes/all.vue'
	import about from './boxes/about.vue'
	import faq from './boxes/faq.vue'
	import referral from './boxes/referral.vue'
	export default {
		name: 'Home',
		components: {
			Head,
			Foot,
			all,
			about,
			faq,
			referral,
			asidebar,
			svgIcon,
			tabbar
		},
		data() {
			return {

				openedleft:true,
				openedcontests:false,
				isMobileFlag:false,// 响应式
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
		},
		created() {
			this.isPhone()
		},
	}
</script>
<style scoped>

	.boxes {
		padding-top: 42px
	}

	.boxes__head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 48px
	}

	@media(max-width:768px) {
		.boxes__head {
			display: block;
			margin-top: 34px;
			margin-bottom: 24px
		}
	}

	@media(max-width:1000px) {
		.opened-left-panel .boxes__head {
			display: block;
			margin-top: 34px;
			margin-bottom: 24px
		}
	}

	@media(max-width:1093px) {
		.opened-right-panel .boxes__head {
			display: block;
			margin-top: 34px;
			margin-bottom: 24px
		}
	}

	@media(max-width:1108px) {
		.opened-contests-panel .boxes__head {
			display: block;
			margin-top: 34px;
			margin-bottom: 24px
		}
	}

	@media(max-width:1325px) {
		.opened-left-panel.opened-right-panel .boxes__head {
			display: block;
			margin-top: 34px;
			margin-bottom: 24px
		}
	}

	@media(max-width:1340px) {
		.opened-left-panel.opened-contests-panel .boxes__head {
			display: block;
			margin-top: 34px;
			margin-bottom: 24px
		}
	}

	.boxes__title {
		font-weight: 700;
		font-size: 32px;
		line-height: 36px;
		margin: 0
	}

	@media(max-width:768px) {
		.boxes__title {
			margin-bottom: 24px
		}
	}

	@media(max-width:1000px) {
		.opened-left-panel .boxes__title {
			margin-bottom: 24px
		}
	}

	@media(max-width:1093px) {
		.opened-right-panel .boxes__title {
			margin-bottom: 24px
		}
	}

	@media(max-width:1108px) {
		.opened-contests-panel .boxes__title {
			margin-bottom: 24px
		}
	}

	@media(max-width:1325px) {
		.opened-left-panel.opened-right-panel .boxes__title {
			margin-bottom: 24px
		}
	}

	@media(max-width:1340px) {
		.opened-left-panel.opened-contests-panel .boxes__title {
			margin-bottom: 24px
		}
	}

	.boxes__tabs {
		display: flex;
		align-items: center
	}

	@media(max-width:768px) {
		.boxes__tabs {
			justify-content: center
		}
	}

	@media(max-width:1000px) {
		.opened-left-panel .boxes__tabs {
			justify-content: center
		}
	}

	@media(max-width:1093px) {
		.opened-right-panel .boxes__tabs {
			justify-content: center
		}
	}

	@media(max-width:1108px) {
		.opened-contests-panel .boxes__tabs {
			justify-content: center
		}
	}

	@media(max-width:1325px) {
		.opened-left-panel.opened-right-panel .boxes__tabs {
			justify-content: center
		}
	}

	@media(max-width:1340px) {
		.opened-left-panel.opened-contests-panel .boxes__tabs {
			justify-content: center
		}
	}

	.boxes__tab {
		margin-right: 20px
	}

	.boxes__tab:last-child {
		margin-right: 0
	}

	@media(max-width:768px) {
		.boxes__tab {
			justify-content: center;
			margin-right: 0;
			padding: 5px 6px
		}
	}

	@media(max-width:1000px) {
		.opened-left-panel .boxes__tab {
			justify-content: center;
			margin-right: 0;
			padding: 5px 6px
		}
	}

	@media(max-width:1093px) {
		.opened-right-panel .boxes__tab {
			justify-content: center;
			margin-right: 0;
			padding: 5px 6px
		}
	}

	@media(max-width:1108px) {
		.opened-contests-panel .boxes__tab {
			justify-content: center;
			margin-right: 0;
			padding: 5px 6px
		}
	}

	@media(max-width:1325px) {
		.opened-left-panel.opened-right-panel .boxes__tab {
			justify-content: center;
			margin-right: 0;
			padding: 5px 6px
		}
	}

	@media(max-width:1340px) {
		.opened-left-panel.opened-contests-panel .boxes__tab {
			justify-content: center;
			margin-right: 0;
			padding: 5px 6px
		}
	}

	@media(max-width:768px) {
		.boxes__tab {
			font-size: 12px !important
		}
	}

	@media(max-width:1000px) {
		.opened-left-panel .boxes__tab {
			font-size: 12px !important
		}
	}

	@media(max-width:1093px) {
		.opened-right-panel .boxes__tab {
			font-size: 12px !important
		}
	}

	@media(max-width:1108px) {
		.opened-contests-panel .boxes__tab {
			font-size: 12px !important
		}
	}

	@media(max-width:1325px) {
		.opened-left-panel.opened-right-panel .boxes__tab {
			font-size: 12px !important
		}
	}

	@media(max-width:1340px) {
		.opened-left-panel.opened-contests-panel .boxes__tab {
			font-size: 12px !important
		}
	}

	.boxes__tab-label {
		color: #ffb636;
		margin-left: 3px
	}

	.boxes__tab--active .boxes__tab-label {
		color: #fff
	}

	.button-tab {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}

	.button-tab span {
		text-overflow: ellipsis;
		overflow-x: hidden;
		white-space: nowrap
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
		transition: color .1s ease-in-out, background-color .1s ease-in-out, border-color .1s ease-in-out;
		border: 2px solid transparent;
		color: #93acd3;
		background-color: transparent
	}

	.button-tab:active,
	.button-tab:focus {
		outline: none
	}

	.button-tab:disabled {
		pointer-events: none;
		opacity: .5
	}

	.button-tab i {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.5em;
		width: 1.5em
	}

	.button-tab i svg {
		transition: fill .1s ease-in-out
	}

	.button-tab.loading {
		color: transparent !important;
		pointer-events: none;
		transition: all 0s !important
	}

	.button-tab.loading i {
		opacity: 0
	}

	.button-tab.loading:after {
		position: absolute;
		content: "";
		display: block;
		-webkit-animation: spinAround-data-v-7f052bfc .5s linear infinite;
		animation: spinAround-data-v-7f052bfc .5s linear infinite;
		border-radius: 50%;
		border: 2px solid transparent;
		height: 1em;
		width: 1em;
		left: calc(50% - .5em);
		top: calc(50% - .5em)
	}

	.button-tab.fullwidth {
		display: flex;
		width: 100%;
		justify-content: center
	}

	.button-tab i svg {
		fill: #fff
	}

	.button-tab:focus,
	.button-tab:hover {
		background-color: #0b6ada;
		color: #fff
	}

	.button-tab:focus i svg,
	.button-tab:hover i svg {
		fill: #fff
	}

	.button-tab:active {
		background-color: #0a64ce;
		color: #f9f9f9
	}

	.button-tab:active i svg {
		fill: #f9f9f9
	}

	.button-tab:disabled {
		background-color: #6cafff;
		border-color: transparent;
		box-shadow: none;
		color: hsla(0, 0%, 100%, .7)
	}

	.button-tab:disabled i svg {
		fill: hsla(0, 0%, 100%, .7)
	}

	.button-tab.loading:after {
		border-color: transparent transparent #fff #fff !important
	}

	.button-tab i svg {
		fill: #93acd3
	}

	.button-tab.active,
	.button-tab:active,
	.button-tab:focus,
	.button-tab:hover {
		color: #fff;
		background-color: transparent
	}

	.button-tab.active i svg,
	.button-tab:active i svg,
	.button-tab:focus i svg,
	.button-tab:hover i svg {
		fill: #fff
	}

	.button-tab.active,
	.button-tab:disabled {
		cursor: default;
		background-color: #3a07f2;
		opacity: 1
	}

	.button-tab:disabled:not(.active) {
		background-color: transparent
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
		margin-left: .5em;
		transition: color .1s ease-in-out, background-color .1s ease-in-out
	}

	.active .tab-badge {
		color: #3a07f2;
		background-color: #fff
	}

	.button-tab_xs {
		font-size: 11px;
		padding: 2px 8px;
		border-radius: 3rem
	}

	.button-tab_xs i:first-child:not(:last-child) {
		margin-left: -6px
	}

	.button-tab_xs i:last-child:not(:first-child) {
		margin-right: -6px
	}

	.button-tab_xs i:first-child:last-child {
		margin-left: -6px;
		margin-right: -6px
	}

	.button-tab_xs i img,
	.button-tab_xs i svg {
		width: 100%;
		height: 100%
	}

	.button-tab_xs i~span {
		margin-left: 2px
	}

	.button-tab_sm {
		font-size: 12px;
		border-radius: 10px;
		padding: 5px 10px;
		border-radius: 3rem
	}

	.button-tab_sm i:first-child:not(:last-child) {
		margin-left: -5px
	}

	.button-tab_sm i:last-child:not(:first-child) {
		margin-right: -5px
	}

	.button-tab_sm i:first-child:last-child {
		margin-left: -5px;
		margin-right: -5px
	}

	.button-tab_sm i img,
	.button-tab_sm i svg {
		width: 100%;
		height: 100%
	}

	.button-tab_sm i~span {
		margin-left: 4px
	}

	.button-tab_md {
		font-size: 14px;
		border-radius: 10px;
		padding: 8px 12px;
		border-radius: 3rem
	}

	.button-tab_md i:first-child:not(:last-child) {
		margin-left: -4px
	}

	.button-tab_md i:last-child:not(:first-child) {
		margin-right: -4px
	}

	.button-tab_md i:first-child:last-child {
		margin-left: -4px;
		margin-right: -4px
	}

	.button-tab_md i img,
	.button-tab_md i svg {
		width: 100%;
		height: 100%
	}

	.button-tab_md i~span {
		margin-left: 8px
	}

	.button-tab_lg {
		font-size: 16px;
		border-radius: 10px;
		padding: 8px 12px;
		border-radius: 3rem
	}

	.button-tab_lg i:first-child:not(:last-child) {
		margin-left: -4px
	}

	.button-tab_lg i:last-child:not(:first-child) {
		margin-right: -4px
	}

	.button-tab_lg i:first-child:last-child {
		margin-left: -4px;
		margin-right: -4px
	}

	.button-tab_lg i img,
	.button-tab_lg i svg {
		width: 100%;
		height: 100%
	}

	.button-tab_lg i~span {
		margin-left: 8px
	}

	.button-tab_xl {
		font-size: 18px;
		padding: 16px 20px;
		border-radius: 3rem
	}

	.button-tab_xl i:first-child:not(:last-child) {
		margin-left: -4px
	}

	.button-tab_xl i:last-child:not(:first-child) {
		margin-right: -4px
	}

	.button-tab_xl i:first-child:last-child {
		margin-left: -4px;
		margin-right: -4px
	}

	.button-tab_xl i img,
	.button-tab_xl i svg {
		width: 100%;
		height: 100%
	}

	.button-tab_xl i~span {
		margin-left: 8px
	}

</style>
