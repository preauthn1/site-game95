<template>
	<el-dialog :visible.sync="welcomeVisible" custom-class="welcomeClass" :modal-append-to-body="false">
		<div class="dialog--welcome">
			<div class="welcome">
				<img src="../assets/images/preview-bg-md.png" alt="" class="welcome__bg">
				<div class="container">
					<div class="welcome__date">
						<img src="../assets/images/preview-date.png" alt="" class="welcome__date-bg">
						<p class="welcome__time">November 20 - December 18</p>
					</div>
					<div class="welcome__banner">
						<img src="../assets/images/preview-banner.png" alt="" class="welcome__img">
					</div>
					<p class="welcome__subtitle">Total prize pool:</p>
					<img src="../assets/images/preview-prize.png" alt="" class="welcome__prize">
					<div >
						<h3 class="welcome__title">
							Welcome to FIFA World Cup Games!
						</h3>
						<p class="welcome__descrip">
							Goal! Join the Qatar FIFA World Cup on Cyber Raccoon! Get more emotions
							and share the $100 000 prize pool with a massive amount of events
							and activities: FREE Prediction Event, Battles on different World
							Cup stages, Odds Kings Qatar Edition, Points Race for the most
							active sport Battles players. Enjoy Free Bets for placing bets on
							World Cup matches!
						</p>
					</div>
				</div>
			</div>
			<div class="welcome__footer footer">
				<div class="welcome__button">
					<el-button class="button_grey2  button_fullwidth" @click="welcomeVisible = false">Close</el-button>
				</div>
				<div class="welcome__button">
					<el-button class="button_red  button_fullwidth" @click="welcomeVisible = false">确 定</el-button>
				</div>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import svgIcon from '@/components/svg.vue'
	export default {
		components: {
			svgIcon
		},
		props: {
			welShow: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				welcomeVisible:this.welShow,
			};
		},
		methods: {
		}
	}
</script>
<style scoped>
	/* 公告 */
	.welcome {
		overflow: hidden;
		position: relative;
		-moz-text-align-last: center;
		text-align-last: center;
		background: radial-gradient(63.06% 7.14% at 118.37%, at 76.32%, rgba(255, 0, 68, .28) 0, rgba(255, 0, 68, .28) 24.81%, rgba(255, 0, 68, 0) 100%), radial-gradient(45.28% 9.12% at 109.41%, at 16.49%, #060304 0, #060304 43.82%, rgba(6, 3, 4, 0) 100%), linear-gradient(180deg, #15090d, #150a0e 46.37%, #0d131c 61.53%, #0d131c);
		background: radial-gradient(63.06% 7.14% at 118.37% 76.32%, rgba(255, 0, 68, .28) 0, rgba(255, 0, 68, .28) 24.81%, rgba(255, 0, 68, 0) 100%), radial-gradient(45.28% 9.12% at 109.41% 16.49%, #060304 0, #060304 43.82%, rgba(6, 3, 4, 0) 100%), linear-gradient(180deg, #15090d, #150a0e 46.37%, #0d131c 61.53%, #0d131c)
	}
	
	@media(max-width:768px) {
		.welcome {
			background: linear-gradient(180deg, #15090d, #150a0e 58.76%, #0d131c 104.57%, #0d131c 132.92%)
		}
	}
	
	.welcome img {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none;
		width: 100%
	}
	
	.welcome__bg {
		position: absolute
	}
	
	.welcome__date {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 295px;
		height: 55px;
		margin: auto
	}
	
	.welcome__time {
		position: relative;
		margin-bottom: 15px;
		font-weight: 700;
		font-size: 16px;
		line-height: 24px;
		color: #20010b
	}
	
	.welcome__date-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: -5px
	}
	
	.welcome__fireworks,
	.welcome__preview-bg {
		position: absolute;
		top: 0;
		left: 0
	}
	
	.welcome__banner {
		position: relative;
		margin-bottom: -22px;
		min-height: 180px
	}
	
	@media(max-width:699px) {
		.welcome__banner {
			margin: 0;
			position: unset
		}
	}
	
	@media(max-width:931px) {
		.opened-left-panel .welcome__banner {
			margin: 0;
			position: unset
		}
	}
	
	@media(max-width:1024px) {
		.opened-right-panel .welcome__banner {
			margin: 0;
			position: unset
		}
	}
	
	@media(max-width:1039px) {
		.opened-contests-panel .welcome__banner {
			margin: 0;
			position: unset
		}
	}
	
	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .welcome__banner {
			margin: 0;
			position: unset
		}
	}
	
	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .welcome__banner {
			margin: 0;
			position: unset
		}
	}
	
	.welcome__img {
		width: 758px;
		margin-top: -5px;
		margin-right: -15px
	}
	
	@media(max-width:576px) {
		.welcome__img {
			position: absolute;
			margin-top: -5px;
			margin-left: -10px
		}
	}
	
	.welcome__subtitle {
		text-transform: uppercase;
		font-weight: 700;
		font-size: 10.3946px;
		line-height: 30px;
		letter-spacing: -.02em;
		margin-bottom: -10px;
		color: #ffe0a9;
		display: flex;
		justify-content: center
	}
	
	@media(max-width:699px) {
		.welcome__subtitle {
			font-size: 10px;
			line-height: 10px;
			margin-bottom: 0
		}
	}
	
	@media(max-width:931px) {
		.opened-left-panel .welcome__subtitle {
			font-size: 10px;
			line-height: 10px;
			margin-bottom: 0
		}
	}
	
	@media(max-width:1024px) {
		.opened-right-panel .welcome__subtitle {
			font-size: 10px;
			line-height: 10px;
			margin-bottom: 0
		}
	}
	
	@media(max-width:1039px) {
		.opened-contests-panel .welcome__subtitle {
			font-size: 10px;
			line-height: 10px;
			margin-bottom: 0
		}
	}
	
	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .welcome__subtitle {
			font-size: 10px;
			line-height: 10px;
			margin-bottom: 0
		}
	}
	
	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .welcome__subtitle {
			font-size: 10px;
			line-height: 10px;
			margin-bottom: 0
		}
	}
	
	.welcome__prize {
		width: 238px;
		display: flex;
		margin: 0 auto 8px
	}
	
	@media(max-width:699px) {
		.welcome__prize {
			width: 221px
		}
	}
	
	@media(max-width:931px) {
		.opened-left-panel .welcome__prize {
			width: 221px
		}
	}
	
	@media(max-width:1024px) {
		.opened-right-panel .welcome__prize {
			width: 221px
		}
	}
	
	@media(max-width:1039px) {
		.opened-contests-panel .welcome__prize {
			width: 221px
		}
	}
	
	@media(max-width:1256px) {
		.opened-left-panel.opened-right-panel .welcome__prize {
			width: 221px
		}
	}
	
	@media(max-width:1271px) {
		.opened-left-panel.opened-contests-panel .welcome__prize {
			width: 221px
		}
	}
	
	.welcome__title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		letter-spacing: -.02em;
		font-feature-settings: "tnum"on, "lnum"on;
		margin-bottom: 8px;
		display: flex;
		justify-content: center;
		text-align: center
	}
	
	.welcome__descrip {
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		color: #93acd3;
		padding-bottom: 24px;
		margin: 0
	}
	
	.welcome__footer {
		position: relative;
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-top: 1px solid rgba(183,207,255,.05);
		background-color: #161f2c;
	}
	
	.welcome__button {
		width: 50%
	}
	
	.welcome__button:first-child {
		margin-right: 12px
	}
	
</style>
<style>
	.welcomeClass{
		min-width: 320px;
		max-width: 530px;
		border-radius: 15px;
		overflow: hidden;
	}
	.welcomeClass  .el-dialog__header{
		position: relative;
		height: 0;
		padding: 0;
		z-index: 88;
	}
	.welcomeClass  .el-dialog__body{
		padding: 0;
	}
	.el-dialog__headerbtn .el-dialog__close{
		color: #fff;
	}
</style>