<template>
	<div  class="about">
		<div class="about__info">
			<div class="about__image-block">
				<picture class="about__image">
					<!-- <img src="../../../assets/images/racoon@1x.e5b7764.png" alt="" class="about__image"> -->
				</picture>
			</div>
			<div class="about__text-block">
				<h2 class="about__title">About Cyber Raccoon Boxes</h2>
				<p class="about__text">
					Fury loves crypto and wants everyone to have it! He has prepared mega cool gifts for everyone - special boxes: free - for beginners and deposit for those who want to fill their wallets completely.
				</p>
				<p class="about__text">
					Cyber Raccoon Box is a unique tool that gives everyone the opportunity to get free crypto and multiply it.
					Keep eyes on Cyber Raccoon to catch new Boxes, which are sold out like hotcakes.
					Invite friends to get more bonuses than ever!
				</p>
			</div>
		</div>
		<div class="about__work">
			<h2 class="about__work-title">
				How does it work?
			</h2>
			<div class="about__work-info">
				<div class="about__card">
					<span class="about__card-watter">01</span>
					<h3 class="about__card-title">
						<span class="about__card-help">01.</span>
						Join Cyber Raccoon
					</h3>
					<p class="about__card-desc">
						Just register and log into the Cyber Raccoon platform.
					</p>
				</div>
				<div class="about__card">
					<span class="about__card-watter">02</span>
					<h3 class="about__card-title">
						<span class="about__card-help">02.</span>
						Choose a BOX
					</h3>
					<p class="about__card-desc">
						On the page with Boxes, check out the terms of earnings and choose a Box that maximizes your income.
					</p>
				</div>
				<div class="about__card">
					<span class="about__card-watter">03</span>
					<h3 class="about__card-title">
						<span class="about__card-help">03.</span>
						Get income
					</h3>
					<p class="about__card-desc">
						Rewards every day! Invite friends and earn extra bonuses from referrals.
					</p>
				</div>
			</div>
		</div>
		<div class="about__boxes">
			<h2 class="about__boxes-title">
				Our Boxes
			</h2>
			<div class="about__box">
				<div class="about__box-bg about__box-bg--blue"></div>
				<div class="about__box-img-block about__box-img-block--blue">
					<picture class="about__box-image">
						<!-- <img src="../../../assets/images/racoon@1x.e5b7764.png" alt="" class="about__box-image"> -->
					</picture>
				</div>
				<div class="about__box-info">
					<h2 class="about__box-title">
						Free box
					</h2>
					<p class="about__box-desc">
						Box that is filled itself - isn't that magic? Open your Free Box and get free crypto every day.
						Withdraw coins every 60 min, play or manage it as you like!
					</p>
				</div>
			</div>
			<div class="about__box">
				<div class="about__box-bg about__box-bg--yellow"></div>
				<div class="about__box-img-block about__box-img-block--box">
					<!-- <picture class="about__box-image">
						<img src="../../../assets/images/yellow-box@1x.1ed730a.png" alt="" class="about__box-image">
					</picture> -->
				</div>
				<div class="about__box-info">
					<h2 class="about__box-title">
						Deposit Boxes.
						<span class="about__box-title-help">
							Earn up to 100%
						</span>
					</h2>
					<p class="about__box-desc">
						Take full advantage of crypto! Buy super boxes with your favorite currency and get even more in 30 days. Boost your profit up to 100%.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import svgIcon from '@/components/svg.vue'
	export default {
		components: {
			svgIcon
		},
		data() {
			return {};
		},
		methods: {

		}
	}
</script>
<style scoped>
	
	.about {
		margin-top: 120px
	}
	
	@media(max-width:1000px) {
		.about {
			margin-top: 0
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about {
			margin-top: 0
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about {
			margin-top: 0
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about {
			margin-top: 0
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about {
			margin-top: 0
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about {
			margin-top: 0
		}
	}
	
	.about__info {
		margin-bottom: 32px;
		position: relative
	}
	
	@media(max-width:1000px) {
		.about__info {
			margin-bottom: 55px
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about__info {
			margin-bottom: 55px
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about__info {
			margin-bottom: 55px
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about__info {
			margin-bottom: 55px
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about__info {
			margin-bottom: 55px
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about__info {
			margin-bottom: 55px
		}
	}
	
	.about__image-block {
		position: absolute;
		z-index: -1;
		left: 0;
		bottom: -25px;
		width: 328px;
		height: 337px;
		background: radial-gradient(50% 50% at 50%, at 50%, #a30b0c 0, rgba(175, 18, 18, 0) 100%);
		background: radial-gradient(50% 50% at 50% 50%, #a30b0c 0, rgba(175, 18, 18, 0) 100%)
	}
	
	.about__image-block:before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 175px;
		background: linear-gradient(180deg, rgba(13, 19, 28, 0), rgba(13, 19, 28, .78) 52.06%, #0d131c 84.78%)
	}
	
	@media(max-width:1000px) {
		.about__image-block:before {
			height: 100px
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about__image-block:before {
			height: 100px
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about__image-block:before {
			height: 100px
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about__image-block:before {
			height: 100px
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about__image-block:before {
			height: 100px
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about__image-block:before {
			height: 100px
		}
	}
	
	@media(max-width:1000px) {
		.about__image-block {
			width: 203px;
			height: 207px;
			bottom: auto;
			top: -30px
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about__image-block {
			width: 203px;
			height: 207px;
			bottom: auto;
			top: -30px
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about__image-block {
			width: 203px;
			height: 207px;
			bottom: auto;
			top: -30px
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about__image-block {
			width: 203px;
			height: 207px;
			bottom: auto;
			top: -30px
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about__image-block {
			width: 203px;
			height: 207px;
			bottom: auto;
			top: -30px
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about__image-block {
			width: 203px;
			height: 207px;
			bottom: auto;
			top: -30px
		}
	}
	
	@media(max-width:767px) {
		.about__image-block {
			display: none
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__image-block {
			display: none
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__image-block {
			display: none
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__image-block {
			display: none
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__image-block {
			display: none
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__image-block {
			display: none
		}
	}
	
	.about__image {
		width: 100%;
		height: 100%
	}
	
	.about__title {
		padding-left: 350px
	}
	
	@media(max-width:1000px) {
		.about__title {
			padding-left: 210px
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about__title {
			padding-left: 210px
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about__title {
			padding-left: 210px
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about__title {
			padding-left: 210px
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about__title {
			padding-left: 210px
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about__title {
			padding-left: 210px
		}
	}
	
	@media(max-width:767px) {
		.about__title {
			padding: 0
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__title {
			padding: 0
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__title {
			padding: 0
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__title {
			padding: 0
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__title {
			padding: 0
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__title {
			padding: 0
		}
	}
	
	.about__text {
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: #93acd3;
		padding-left: 350px
	}
	
	@media(max-width:1000px) {
		.about__text:last-child {
			padding-left: 0;
			margin-top: 45px
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 45px
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 45px
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 45px
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 45px
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 45px
		}
	}
	
	@media(max-width:767px) {
		.about__text:last-child {
			padding-left: 0;
			margin-top: 20px
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 20px
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 20px
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 20px
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 20px
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__text:last-child {
			padding-left: 0;
			margin-top: 20px
		}
	}
	
	@media(max-width:1000px) {
		.about__text {
			padding-left: 210px
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about__text {
			padding-left: 210px
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about__text {
			padding-left: 210px
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about__text {
			padding-left: 210px
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about__text {
			padding-left: 210px
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about__text {
			padding-left: 210px
		}
	}
	
	@media(max-width:767px) {
		.about__text {
			padding: 0
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__text {
			padding: 0
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__text {
			padding: 0
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__text {
			padding: 0
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__text {
			padding: 0
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__text {
			padding: 0
		}
	}
	
	.about__work {
		margin-bottom: 32px
	}
	
	@media(max-width:767px) {
		.about__work {
			margin-bottom: 48px
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__work {
			margin-bottom: 48px
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__work {
			margin-bottom: 48px
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__work {
			margin-bottom: 48px
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__work {
			margin-bottom: 48px
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__work {
			margin-bottom: 48px
		}
	}
	
	.about__work-info {
		display: flex;
		grid-gap: 24px;
		gap: 24px
	}
	
	@media(max-width:767px) {
		.about__work-info {
			flex-direction: column
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__work-info {
			flex-direction: column
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__work-info {
			flex-direction: column
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__work-info {
			flex-direction: column
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__work-info {
			flex-direction: column
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__work-info {
			flex-direction: column
		}
	}
	
	.about__card {
		width: 33%;
		padding: 24px;
		background: #111923;
		border-radius: 14px;
		position: relative
	}
	
	@media(max-width:767px) {
		.about__card {
			width: 100%
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__card {
			width: 100%
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__card {
			width: 100%
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__card {
			width: 100%
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__card {
			width: 100%
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__card {
			width: 100%
		}
	}
	
	.about__card-title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		margin: 0 0 8px;
		color: #ed1d49
	}
	
	.about__card-desc {
		position: relative;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: #93acd3;
		z-index: 1;
		margin-bottom: 0
	}
	
	.about__card-watter {
		position: absolute;
		bottom: 5px;
		right: 24px;
		line-height: 1;
		font-weight: 700;
		font-size: 75px;
		color: #161f2c
	}
	
	.about__boxes,
	.about__boxes-title {
		margin-bottom: 40px
	}
	
	.about__box {
		position: relative;
		padding: 32px 80px 32px 250px;
		background: #111923;
		border-radius: 14px;
		margin-top: 24px
	}
	
	@media(max-width:1000px) {
		.about__box {
			padding: 15px 24px 15px 250px
		}
	}
	
	@media(max-width:1232px) {
		.opened-left-panel .about__box {
			padding: 15px 24px 15px 250px
		}
	}
	
	@media(max-width:1325px) {
		.opened-right-panel .about__box {
			padding: 15px 24px 15px 250px
		}
	}
	
	@media(max-width:1340px) {
		.opened-contests-panel .about__box {
			padding: 15px 24px 15px 250px
		}
	}
	
	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about__box {
			padding: 15px 24px 15px 250px
		}
	}
	
	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about__box {
			padding: 15px 24px 15px 250px
		}
	}
	
	@media(max-width:767px) {
		.about__box {
			padding: 175px 24px 24px
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__box {
			padding: 175px 24px 24px
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__box {
			padding: 175px 24px 24px
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__box {
			padding: 175px 24px 24px
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__box {
			padding: 175px 24px 24px
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__box {
			padding: 175px 24px 24px
		}
	}
	
	.about__box-info {
		position: relative
	}
	
	.about__box-img-block {
		position: absolute;
		bottom: 0;
		pointer-events: none
	}
	
	.about__box-img-block--box {
		height: 100%;
		left: 0
	}
	
	@media(max-width:767px) {
		.about__box-img-block--box {
			max-height: 150px;
			top: 0
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__box-img-block--box {
			max-height: 150px;
			top: 0
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__box-img-block--box {
			max-height: 150px;
			top: 0
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__box-img-block--box {
			max-height: 150px;
			top: 0
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__box-img-block--box {
			max-height: 150px;
			top: 0
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__box-img-block--box {
			max-height: 150px;
			top: 0
		}
	}
	
	.about__box-img-block--blue {
		left: 20px;
		top: -25px;
		bottom: 0
	}
	
	@media(max-width:767px) {
		.about__box-img-block {
			bottom: auto;
			left: 50%;
			transform: translate(-50%)
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__box-img-block {
			bottom: auto;
			left: 50%;
			transform: translate(-50%)
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__box-img-block {
			bottom: auto;
			left: 50%;
			transform: translate(-50%)
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__box-img-block {
			bottom: auto;
			left: 50%;
			transform: translate(-50%)
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__box-img-block {
			bottom: auto;
			left: 50%;
			transform: translate(-50%)
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__box-img-block {
			bottom: auto;
			left: 50%;
			transform: translate(-50%)
		}
	}
	
	.about__box-image {
		max-height: 185px;
		pointer-events: none
	}
	
	.about__box-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 300px;
		height: 100%;
		pointer-events: none;
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 0 0 0 14px
	}
	
	.about__box-bg--yellow {
		background-image: url(/_nuxt/img/card-bg-yellow.b6e8d16.png)
	}
	
	@media(max-width:767px) {
		.about__box-bg--yellow {
			background-image: url(/_nuxt/img/card-bg-yellow-mob.2e54d6a.png)
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__box-bg--yellow {
			background-image: url(/_nuxt/img/card-bg-yellow-mob.2e54d6a.png)
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__box-bg--yellow {
			background-image: url(/_nuxt/img/card-bg-yellow-mob.2e54d6a.png)
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__box-bg--yellow {
			background-image: url(/_nuxt/img/card-bg-yellow-mob.2e54d6a.png)
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__box-bg--yellow {
			background-image: url(/_nuxt/img/card-bg-yellow-mob.2e54d6a.png)
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__box-bg--yellow {
			background-image: url(/_nuxt/img/card-bg-yellow-mob.2e54d6a.png)
		}
	}
	
	.about__box-bg--blue {
		background-image: url(/_nuxt/img/card-bg-blue.fc77434.png)
	}
	
	@media(max-width:767px) {
		.about__box-bg--blue {
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__box-bg--blue {
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__box-bg--blue {
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__box-bg--blue {
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__box-bg--blue {
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__box-bg--blue {
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}
	
	@media(max-width:767px) {
		.about__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			border-radius: 0
		}
	}
	
	@media(max-width:999px) {
		.opened-left-panel .about__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			border-radius: 0
		}
	}
	
	@media(max-width:1092px) {
		.opened-right-panel .about__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			border-radius: 0
		}
	}
	
	@media(max-width:1107px) {
		.opened-contests-panel .about__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			border-radius: 0
		}
	}
	
	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .about__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			border-radius: 0
		}
	}
	
	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .about__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			border-radius: 0
		}
	}
	
	.about__box-title {
		color: #3a07f2;
		margin: 0 0 8px
	}
	
	.about__box-title-help {
		color: #ffb636
	}
	
	.about__box-desc {
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: #93acd3;
		margin: 0
	}
	
</style>
