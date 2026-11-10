<template>
	<div class="app " :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<div class="page-dailytasks"  >
						<div  class="lp lp_3">
							<div  class="intro lp1" style="width: 100%;">
								<div  class="lp1__box" style="width: 100%;">
									<h2  class="lp1__title" style="z-index: 1;">
										Claim reward
										<br >for challenging Daily tasks
									</h2>
									<div  class="lp1__img lp1__img_3">
										<!-- <img  loading="lazy" src="../../assets/images/raccoon.876aada.png" alt=""> -->
									</div>
									<div  class="lp1__text">
										<p >
											Discover daily gaming activities and make your experience on Cyber Raccoon more exciting! Daily tasks are available on different in-house games. Get your reward with extra coins by completing them!
										</p>
									</div>
									<div  class="lp1__btn-block">
										<button  type="button" class="button button_lg button_red button_center">
											<span class="button__inner">
												<span class="button__text">
													Sign Up
												</span>
											</span>
										</button>
									</div>
								</div>
							</div>
							<div  class="lp5">
								<ul  class="lp5__items">
									<li v-for="(item,index) in items" :key="index">
										<div class="lp5-item">
											<div class="lp5-item__box">
												<div class="lp5-item__head">
													<div class="lp5-item__img">
														<img loading="lazy" :src="item.pic" alt="">
													</div>
													<p class="lp5-item__text">{{item.title}}</p>
												</div>
												<div class="lp5-item__range">
													<div class="lp5-item__range-line" style="width: 0%;"></div>
													<div class="lp5-item__range-value">0/40</div>
												</div>
												<p class="lp5-item__bet">
													Min. bet 0.0002 BTC
												</p>
												<button type="submit" class="btn btn_large btn_block btn_blue btn_disable lp5-item__btc">
													0.00002 btc
													<img loading="lazy" src="../../assets/images/gift.png" alt="">
												</button>
											</div>
										</div>
									</li>
								</ul>
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
		data() {
			return {
				windowWidth: document.documentElement.clientWidth,
				openedleft:true,
				openedcontests:false,
				isMobileFlag:false,// 响应式
				items: []
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
	.lp5-item__text{
		margin: 0 auto 15px;
		min-height: 100px;
		font-weight: 900;
		font-size: 18px;
		font-family: "Montserrat";
		vertical-align: center;
	}
	.lp {
		position: relative;
		overflow: hidden
	}

	.lp_3 .lp1__cloud {
		right: -120px;
		top: -230px
	}

	.lp_3 .lp1 {
		padding-top: 115px
	}

	.lp__backgrounds {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%
	}

	.lp1 {
		padding: 144px 0 30px
	}

	.lp1,
	.lp1__box {
		position: relative
	}

	.lp1__cloud {
		position: absolute;
		right: -109px;
		top: -204px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.lp1__cloud img {
		max-width: none
	}

	.lp1__cloud_2 {
		right: -108px;
		top: -183px
	}

	.lp1__title {
		position: relative;
		margin: 0 0 37px;
		max-width: 660px;
		font-family: "Montserrat";
		font-size: 50px;
		font-weight: 900;
		text-transform: uppercase;
		color: #fff
	}

	.lp1__title span {
		color: #fa305c
	}

	.lp1__img {
		position: absolute;
		right: -125px;
		top: -204px;
		width: 387px;
		height: 438px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.lp1__img_3 {
		right: 10px;
		top: -130px
	}

	.lp1__img_3 img {
		width: 100%;
		height: 100%
	}

	.lp1__list {
		max-width: 530px
	}

	.lp1__list,
	.lp1__list-img {
		position: relative
	}

	.lp1__list-img img {
		max-width: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.lp1__list-img_1 {
		left: -4px;
		top: -4px
	}

	.lp1__list-img_1 img {
		width: 82px
	}

	.lp1__list-img_2 {
		left: -10px;
		top: -2px
	}

	.lp1__list-img_2 img {
		width: 88px
	}

	.lp1__list-img_3 {
		left: -15px;
		top: -11px
	}

	.lp1__list-img_3 img {
		width: 91px
	}

	.lp1__list-img_4 {
		left: -4px;
		top: -3px
	}

	.lp1__list-img_4 img {
		width: 73px
	}

	.lp1__list-heading {
		margin: 0 0 3px;
		font: 25px/1.2 "Montserrat";
		text-transform: uppercase;
		color: #fff
	}

	.lp1__list-text {
		margin: 0;
		color: #9db8e1
	}

	.lp1__list-text,
	.lp1__text {
		font: 15px/23px "Montserrat"
	}

	.lp1__text {
		position: relative;
		margin: -22px 0 24px;
		max-width: 520px;
		color: #6a87b2
	}

	.lp1__text>* {
		margin: 0 0 .5em
	}

	.lp1__text>:last-child {
		margin: 0
	}

	.lp2 {
		position: relative;
		padding: 40px 0
	}

	.lp-heading {
		margin: 0 auto 41px
	}

	.lp-title {
		margin: 0 auto 21px;
		font: 40px/1.5 "Montserrat";
		text-align: center;
		text-transform: uppercase;
		color: #fff
	}

	.lp-title span {
		color: #fa305c
	}

	.lp-toptext {
		max-width: 810px;
		font: 18px/1.3 "Montserrat";
		color: #9db8e1
	}

	.lp-toptext,
	.lp-toptextsm {
		margin: 0 auto;
		text-align: center
	}

	.lp-toptextsm {
		max-width: 610px;
		font: 15px/1.55 "Montserrat";
		color: #6a87b2
	}

	.lp2__items {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 0 -4.57px
	}

	.lp2__items>* {
		position: relative;
		padding: 0 6px;
		width: 33.33%
	}

	.lp2__items>:after {
		content: "";
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(50%, -50%);
		display: block;
		margin: -5px 0 0;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #0d1c31 url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAxNiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0LjY2NjkgMTEuMDYzNUwzLjk4NjYxIDAuMzgzNDEyQzMuNzM5NTkgMC4xMzYxOTQgMy40MDk4MyAwIDMuMDU4MjMgMEMyLjcwNjYyIDAgMi4zNzY4NyAwLjEzNjE5NCAyLjEyOTg0IDAuMzgzNDEyTDEuMzQzMzEgMS4xNjk3NUMwLjgzMTUxMyAxLjY4MjEzIDAuODMxNTEzIDIuNTE0OTEgMS4zNDMzMSAzLjAyNjUxTDEwLjMxMTggMTEuOTk1TDEuMzMzMzYgMjAuOTczNUMxLjA4NjM0IDIxLjIyMDcgMC45NDk5NTEgMjEuNTUwMyAwLjk0OTk1MSAyMS45MDE3QzAuOTQ5OTUxIDIyLjI1MzUgMS4wODYzNCAyMi41ODMgMS4zMzMzNiAyMi44MzA1TDIuMTE5ODkgMjMuNjE2NkMyLjM2NzExIDIzLjg2MzggMi42OTY2NyAyNCAzLjA0ODI4IDI0QzMuMzk5ODggMjQgMy43Mjk2NCAyMy44NjM4IDMuOTc2NjYgMjMuNjE2NkwxNC42NjY5IDEyLjkyNjdDMTQuOTE0NSAxMi42Nzg3IDE1LjA1MDUgMTIuMzQ3NiAxNS4wNDk3IDExLjk5NTZDMTUuMDUwNSAxMS42NDIyIDE0LjkxNDUgMTEuMzExMyAxNC42NjY5IDExLjA2MzVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K) no-repeat 20px;
		z-index: 1
	}

	.lp2__items>:last-child:after {
		display: none
	}

	.lp2__item {
		position: relative;
		padding: 149px 20px 32px 38px;
		border-radius: 20px;
		background: linear-gradient(318.42deg, #1e75dc 2.97%, #072445 95.55%)
	}

	.lp2__item-img {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1
	}

	.lp2__item-img img {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.lp2__item-img_1 {
		left: 0;
		top: 20px
	}

	.lp2__item-img_1 img {
		width: 145px
	}

	.lp2__item-img_2 {
		left: -67px;
		top: -93px
	}

	.lp2__item-img_2 img {
		width: 340px
	}

	.lp2__item-img_3 {
		left: -87px;
		top: -95px
	}

	.lp2__item-img_3 img {
		width: 336px
	}

	.lp2__item-img_4 {
		left: -75px;
		top: -99px
	}

	.lp2__item-img_4 img {
		width: 340px
	}

	.lp2__item-img_5 {
		left: 7px;
		top: 5px
	}

	.lp2__item-img_5 img {
		width: 146px
	}

	.lp2__item-img_6 {
		left: 5px;
		top: 10px
	}

	.lp2__item-img_6 img {
		width: 139px
	}

	.lp2__item-num {
		position: absolute;
		right: 23px;
		top: 32px;
		width: 153px;
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.lp2__item-heading {
		position: relative;
		margin: 0 0 9px;
		font: 25px/1.32 "Montserrat";
		text-transform: uppercase;
		color: #fff;
		z-index: 1
	}

	.lp2__item-text {
		margin: 0;
		color: #9db8e1;
		z-index: 1
	}

	.lp2__btn,
	.lp2__item-text {
		position: relative;
		font: 15px/23px "Montserrat"
	}

	.lp2__btn {
		display: block;
		margin: 37px auto 0;
		width: 176px;
		height: 52px;
		border-radius: 10px;
		text-align: center;
		text-transform: uppercase;
		color: #fff;
		background: #b61739;
		overflow: hidden
	}

	.lp2__btn>* {
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1
	}

	.lp2__btn>*,
	.lp2__btn>:before {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%
	}

	.lp2__btn>:before {
		content: "";
		background: linear-gradient(250.05deg, #fa305c 2.79%, #b61739 138.13%);
		z-index: -1;
		transition: opacity .3s
	}

	.lp2__btn:hover>:before {
		opacity: 0
	}

	.lp3 {
		position: relative;
		padding: 73px 0
	}

	.lp3__signs {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%
	}

	.lp3__signs img {
		position: absolute;
		left: 50%;
		top: 0;
		transform: translate(-50%);
		margin: -77px 0 0 33px;
		max-width: none;
		width: 1098px;
		pointer-events: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}

	.lp3__heading {
		margin-bottom: 43px
	}

	.lp3__title {
		margin-bottom: 8px
	}

	.lp3__items {
		position: relative;
		margin: 0 auto;
		max-width: 909px
	}

	.lp3__items .glide__arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: block;
		margin: -1px 0 0;
		padding: 0;
		width: 46px;
		height: 46px;
		border: 1px solid #2f80ed;
		border-radius: 50%;
		font-size: 0;
		background-color: #2f80ed;
		background-repeat: no-repeat;
		background-position: 50%;
		box-shadow: 0 0 15px rgba(0, 0, 0, .15)
	}

	.lp3__items .glide__arrow:hover {
		border: 1px solid #f2f2f2;
		background-color: #1162cf
	}

	.lp3__items .glide__arrow--left {
		left: -55px;
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDkgMTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjQ1NTM0IDcuODg5N0w4Ljc3Mjk5IDEzLjIwNzZDOC45MTk0MSAxMy4zNTM3IDguOTk5OTYgMTMuNTQ5IDguOTk5OTYgMTMuNzU3MkM4Ljk5OTk2IDEzLjk2NTYgOC45MTk0MSAxNC4xNjA4IDguNzcyOTkgMTQuMzA3MUw4LjMwNzAyIDE0Ljc3MjhDOC4xNjA4MyAxNC45MTkzIDcuOTY1NDEgMTUgNy43NTcxNiAxNUM3LjU0ODkxIDE1IDcuMzUzNzIgMTQuOTE5MyA3LjIwNzQyIDE0Ljc3MjhMMC44NzU5MTQgOC40NDE0MUMwLjcyOTAzIDguMjk0NjQgMC42NDg1OTYgOC4wOTg1MyAwLjY0OTE3NCA3Ljg5MDA1QzAuNjQ4NTk2IDcuNjgwNjQgMC43Mjg5MTQgNy40ODQ3NiAwLjg3NTkxNCA3LjMzNzg3TDcuMjAxNTIgMS4wMTI2MUM3LjM0NzgzIDAuODY2MDc0IDcuNTQzMDIgMC43ODU0MDkgNy43NTEzOSAwLjc4NTQwOUM3Ljk1OTY0IDAuNzg1NDA5IDguMTU0ODMgMC44NjYwNzQgOC4zMDEyNSAxLjAxMjYxTDguNzY3MDkgMS40NzgzNEM5LjA3MDIyIDEuNzgxNDcgOS4wNzAyMiAyLjI3NDk0IDguNzY3MDkgMi41Nzc5NUwzLjQ1NTM0IDcuODg5N1oiIGZpbGw9IiNGMkYyRjIiLz4KPC9zdmc+Cg==);
		background-position: 16px
	}

	.lp3__items .glide__arrow--right {
		right: -55px;
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDkgMTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01LjU0NDY2IDcuMTEwM0wwLjIyNzAxNSAxLjc5MjQzQzAuMDgwNTkyMiAxLjY0NjM1IDQuMjkxNTNlLTA1IDEuNDUxMDQgNC4yOTE1M2UtMDUgMS4yNDI3OUM0LjI5MTUzZS0wNSAxLjAzNDQzIDAuMDgwNTkyMiAwLjgzOTIzOSAwLjIyNzAxNSAwLjY5MjkzMkwwLjY5Mjk3NiAwLjIyNzIwMkMwLjgzOTE2NiAwLjA4MDY2NDkgMS4wMzQ1OSAwIDEuMjQyODQgMEMxLjQ1MTA5IDAgMS42NDYyOCAwLjA4MDY2NDkgMS43OTI1OCAwLjIyNzIwMkw4LjEyNDA5IDYuNTU4NTlDOC4yNzA5NyA2LjcwNTM2IDguMzUxNCA2LjkwMTQ3IDguMzUwODMgNy4xMDk5NUM4LjM1MTQgNy4zMTkzNiA4LjI3MTA5IDcuNTE1MjQgOC4xMjQwOSA3LjY2MjEzTDEuNzk4NDggMTMuOTg3NEMxLjY1MjE3IDE0LjEzMzkgMS40NTY5OCAxNC4yMTQ2IDEuMjQ4NjIgMTQuMjE0NkMxLjA0MDM3IDE0LjIxNDYgMC44NDUxNzYgMTQuMTMzOSAwLjY5ODc1NCAxMy45ODc0TDAuMjMyOTA4IDEzLjUyMTdDLTAuMDcwMjIwOSAxMy4yMTg1IC0wLjA3MDIyMDkgMTIuNzI1MSAwLjIzMjkwOCAxMi40MjIxTDUuNTQ0NjYgNy4xMTAzWiIgZmlsbD0iI0YyRjJGMiIvPgo8L3N2Zz4K);
		background-position: 19px
	}

	.lp3__items-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: center
	}

	.lp3__items-box>* {
		padding: 0 12px;
		width: 33.33%
	}

	.lp3__item {
		padding: 21px 10px 26px;
		border-radius: 20px;
		text-align: center;
		background: linear-gradient(299.17deg, #1e75dc 2.97%, #072445 95.55%)
	}

	.lp3__item-img {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 0 14px;
		height: 100px
	}

	.lp3__item-img img {
		max-height: 100%;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.lp3__item-img_1 img {
		width: 82px
	}

	.lp3__item-img_2 img {
		width: 107px
	}

	.lp3__item-title {
		margin: 0 0 11px;
		font: 20px/1.4 "Montserrat";
		text-transform: uppercase;
		color: #fff
	}

	.lp3__item-blocks {
		margin: 0 0 19px
	}

	.lp3__item-block {
		position: relative;
		padding: 9px 0
	}

	.lp3__item-block:after {
		content: "";
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%);
		width: 197px;
		height: 3px;
		border-bottom: 3px dashed #0d131c
	}

	.lp3__item-heading {
		margin: 0 0 4px;
		font: 12px/1.2 "Montserrat";
		letter-spacing: .01em;
		color: #9db8e1
	}

	.lp3__item-btc {
		margin: 0;
		font: 20px/1.2 "Montserrat";
		color: #9db8e1
	}

	.lp3__item-btc_white>* {
		color: #fff
	}

	.lp3__item-btc_green>* {
		color: #1bb83d
	}

	.lp3__item-cashback {
		font: 25px/1.2 "Montserrat";
		color: #fad702
	}

	.lp3__item-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		font: 16px/1.2 "Montserrat";
		color: #9db8e1
	}

	.lp3__item-list li {
		position: relative;
		margin: 0 0 24px
	}

	.lp3__item-list li:last-child {
		margin: 0
	}

	.lp3__item-list li:before {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%)
	}

	.lp3__item-yes {
		padding: 0 0 0 30px;
		color: #fff
	}

	.lp3__item-yes:before {
		content: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjY2NDYgMS40NTk0N0wxOS45NzY3IDAuNzcxNTk2QzE5Ljc2MDYgMC41NTUyNzkgMTkuNDcyNCAwLjQzNjI3OSAxOS4xNjQ3IDAuNDM2Mjc5QzE4Ljg1NzEgMC40MzYyNzkgMTguNTY4NyAwLjU1NTI3OSAxOC4zNTI2IDAuNzcxNTk2TDguNjg2OTMgMTAuNDM3TDIuNjQ3OTggNC4zOTc5M0MyLjQzMTgzIDQuMTgxOTYgMi4xNDM0NiA0LjA2Mjc5IDEuODM1ODEgNC4wNjI3OUMxLjUyODMyIDQuMDYyNzkgMS4yNDAxMiA0LjE4MTk2IDEuMDIzODEgNC4zOTc5M0wwLjMzNTc1NyA1LjA4NTY0QzAuMTE5NDQgNS4zMDIzIDAuMDAwNjEwMzUyIDUuNTkwODMgMC4wMDA2MTAzNTIgNS44OTgxNUMwLjAwMDYxMDM1MiA2LjIwNTY0IDAuMTE5NDQgNi40OTQgMC4zMzU3NTcgNi43MTAzMkw3LjE1NDEgMTMuNTI4M0M3LjE2MzE1IDEzLjU0MTEgNy4xNzI3MSAxMy41NTMxIDcuMTgzODEgMTMuNTY0TDcuODcxODUgMTQuMjQwNkM4LjA4OCAxNC40NTYxIDguMzc2MzcgMTQuNTYzOCA4LjY4NjQyIDE0LjU2MzhIOC42OUM4Ljk5NzgzIDE0LjU2MzggOS4yODYyIDE0LjQ1NjEgOS41MDIgMTQuMjQwNkwxMC4xOTAyIDEzLjU1OEMxMC4yMDEzIDEzLjU0NzEgMTAuMjEwNyAxMy41MzggMTAuMjE2MyAxMy41Mjg4TDIwLjY2NDQgMy4wODE3NkMyMS4xMTI2IDIuNjM0NjIgMjEuMTEyNiAxLjkwNzEzIDIwLjY2NDYgMS40NTk0N1oiIGZpbGw9IiMxQkI4M0QiLz4KPC9zdmc+Cg==)
	}

	.lp3__item-no {
		padding: 0 0 0 20px
	}

	.lp3__item-no:before {
		content: url(/_nuxt/img/no.1cf6760.svg)
	}

	.lp4 {
		position: relative;
		padding: 87px 0 80px;
		text-align: center
	}

	.lp4 .lp-title {
		margin: 0 auto 11px
	}

	.lp4 .lp-heading {
		margin: 0 auto 69px
	}

	.lp4__coins {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%
	}

	.lp4__coins img {
		position: absolute;
		left: 50%;
		top: 0;
		transform: translate(-50%);
		margin: -69px 0 0 35px;
		max-width: none;
		width: 1016px;
		pointer-events: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}

	.lp4__items {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 0 -6px -41px
	}

	.lp4__items>* {
		margin: 0 0 68px;
		padding: 0 6px
	}

	.lp4__item {
		position: relative;
		padding: 39px 0 10px;
		width: 159px;
		min-height: 140px;
		border-radius: 15px;
		text-align: center;
		background: linear-gradient(189.31deg, #2281f6 3.71%, rgba(22, 31, 44, 0) 174.7%);
		background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU5IiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE1OSAxNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMTVDMCA2LjcxNTczIDYuNzE1NzMgMCAxNSAwSDE0NEMxNTIuMjg0IDAgMTU5IDYuNzE1NzMgMTU5IDE1VjY0LjAxNDVDMTU4LjgzNSA2NC4wMDQ5IDE1OC42NjggNjQgMTU4LjUgNjRDMTUzLjgwNiA2NCAxNTAgNjcuODA1NiAxNTAgNzIuNUMxNTAgNzcuMTk0NCAxNTMuODA2IDgxIDE1OC41IDgxQzE1OC42NjggODEgMTU4LjgzNSA4MC45OTUxIDE1OSA4MC45ODU1VjEyNUMxNTkgMTMzLjI4NCAxNTIuMjg0IDE0MCAxNDQgMTQwSDE1QzYuNzE1NzMgMTQwIDAgMTMzLjI4NCAwIDEyNVY4MC45ODU1QzQuNDYxNjkgODAuNzI2NyA4IDc3LjAyNjYgOCA3Mi41QzggNjcuOTczNCA0LjQ2MTY5IDY0LjI3MzMgMCA2NC4wMTQ1VjE1WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyIiB4MT0iMTIxLjQyOCIgeTE9IjIuMjEwMmUtMDYiIHgyPSI3Ni4xMTM4IiB5Mj0iMjc2LjUxOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMjI4MUY2Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE2MUYyQyIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==) no-repeat 50%;
		background-size: 100% 100%;
		box-shadow: 0 20px 38px rgba(33, 23, 72, .069575)
	}

	.lp4__item-img {
		position: absolute;
		left: 0;
		top: -49px;
		width: 100%;
		height: 82px
	}

	.lp4__item-img img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	.lp4__item-img_1 img,
	.lp4__item-img_2 img {
		width: 83px
	}

	.lp4__item-img_3 img {
		width: 86px
	}

	.lp4__item-img_4 img {
		width: 83px
	}

	.lp4__item-img_5 img {
		width: 75px
	}

	.lp4__item-img_6 img {
		width: 95px
	}

	.lp4__item-img_7 img {
		width: 74px
	}

	.lp4__item-img_8 img {
		width: 55px
	}

	.lp4__item-img_9 img {
		width: 77px
	}

	.lp4__item-img_10 img {
		width: 98px
	}

	.lp4__item-img_11 img {
		width: 78px
	}

	.lp4__item-heading {
		position: relative;
		padding: 0 0 8px;
		margin: 0 0 12px;
		font: 18px/28px "Montserrat";
		text-transform: uppercase;
		color: #fff
	}

	.lp4__item-heading:before {
		content: "";
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%);
		width: 112px;
		height: 3px;
		border-bottom: 3px dashed #0d1c30
	}

	.lp4__item-percent {
		font: 40px/1 "Montserrat";
		color: #fad702
	}

	.lp4__more {
		display: inline-block;
		margin: 0 auto;
		padding: 5px;
		font: 15px/28px "Montserrat";
		text-decoration: underline;
		text-transform: uppercase;
		color: #3a07f2
	}

	.lp__btn {
		position: relative;
		display: block;
		margin: 0;
		width: 250px;
		height: 52px;
		border-radius: 10px;
		background: #b61739;
		overflow: hidden;
		transition: none
	}

	.lp__btn>* {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 5px;
		z-index: 1
	}

	.lp__btn>*,
	.lp__btn>:before {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%
	}

	.lp__btn>:before {
		content: "";
		background: linear-gradient(250.05deg, #fa305c 2.79%, #b61739 138.13%);
		z-index: -1;
		transition: opacity .3s
	}

	.lp__btn:hover>:before {
		opacity: 0
	}

	.lp5 {
		padding: 67px 0 0
	}

	.lp5__items {
		display: grid;
		grid-column: center-start/center-end;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		grid-gap: 16px;
		margin-bottom: 24px;
		grid-column-gap: 16px;
		-moz-column-gap: 16px;
		column-gap: 16px;
		grid-row-gap: 90px;
		row-gap: 90px
	}

	.lp5-item {
		position: relative;
		margin: 0 auto;
		border-radius: 15px;
		text-align: center;
		color: #fff;
		box-shadow: 0 20px 38px rgba(33, 23, 72, .069575)
	}

	.lp5-item_locked .lp5-item__box {
		opacity: .65
	}

	.lp5-item_locked:after {
		content: url(/_nuxt/img/locked.8e7757c.svg);
		position: absolute;
		left: 50%;
		bottom: 81px;
		transform: translate(-50%);
		line-height: 0
	}

	.lp5-item_locked:hover .lp5-item__box {
		opacity: 1
	}

	.lp5-item_locked:hover:after {
		display: none
	}

	.lp5-item_locked:hover .lp5-item__range {
		opacity: .65
	}

	.lp5-item__box {
		position: relative;
		padding: 128px 16px 23px;
		border-radius: 15px;
		background: linear-gradient(179.87deg, #12305f 2.01%, rgba(22, 31, 44, 0) 214.51%);
		transition: opacity .1s
	}

	.lp5-item__img {
		position: absolute;
		left: 0;
		top: -63px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 185px
	}

	.lp5-item__img img {
		pointer-events: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}

	.lp5-item__text {
		margin: 0 auto 15px;
		font-family: "Montserrat";
		font-weight: 900
	}

	.lp5-item__range {
		position: relative;
		margin: 0 0 11px;
		padding: 5px 6px;
		height: 34px;
		border-radius: 10px;
		background: #1c4279
	}

	.lp5-item__range-line {
		width: 4.55%;
		height: 100%;
		border-radius: 5px;
		background: #19d95a
	}

	.lp5-item__range-value {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		font: 15px/34px "Montserrat"
	}

	.lp5-item__bet {
		margin: 0 0 15px;
		font: 12px/1.3 "Montserrat";
		color: #6a87b3
	}

	.lp5-item__btc {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 52px;
		font: 15px/1.3 "Montserrat";
		border-radius: 10px;
		white-space: nowrap;
		text-transform: uppercase;
		background: #1c4279
	}

	.lp5-item__btc img {
		margin: 0 0 0 8px;
		max-width: 27px
	}

	.lp5-item__btc_red {
		background: #fa305c
	}

	.countdown,
	.lp5-info {
		position: relative;
		margin: -61px 0 94px;
		border-radius: 15px;
		box-shadow: 0 20px 38px rgba(33, 23, 72, .069575);
		overflow: hidden
	}

	.lp5-info__box {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		padding: 21px 35px 30px 27px;
		background: linear-gradient(180.3deg, #12305f 3.79%, #122a4f 98.08%)
	}

	.lp5-info__box>* {
		padding: 0 5px 0 0
	}

	.lp5-info__box>:first-child {
		width: 26%
	}

	.lp5-info__box>:nth-child(2) {
		width: 42%
	}

	.lp5-info__box>:nth-child(3) {
		display: flex;
		justify-content: flex-end;
		padding: 0;
		width: 32%
	}

	.lp5-info_locked {
		cursor: not-allowed
	}

	.lp5-info_locked:after {
		content: url(/_nuxt/img/locked.8e7757c.svg);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		line-height: 0;
		margin: 9px 0 0
	}

	.lp5-info_locked:hover {
		opacity: 1 !important
	}

	.lp5-info_locked:hover:after {
		opacity: 0
	}

	.lp5-info_locked:hover .lp5-item__range {
		opacity: .65
	}

	.lp5-info_locked:hover .lp5-info__box {
		opacity: 1 !important
	}

	.lp5-info_locked .lp5-info__box {
		opacity: .65;
		pointer-events: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}

	.lp5-info_locked .lp5-info__countdown-value {
		color: #fad702
	}

	.lp5-info_locked .lp5-info__complete-block {
		background: #1c4279 !important
	}

	.lp5-info_locked .lp5-info__heading>* {
		font-family: "Montserrat";
		font-weight: 500px;
		color: inherit
	}

	.lp5-info_locked .lp5-info__pickup img {
		display: none
	}

	.lp5-info__heading {
		margin: 0 0 13px;
		font: 15px/1.3 "Montserrat";
		color: #fff
	}

	.lp5-info__heading>* {
		font-family: "Montserrat";
		color: #1ec055
	}

	.lp5-info__countdown-timer {
		display: flex;
		flex-wrap: wrap;
		max-width: 220px;
		margin: 0 0 0 -9px;
		text-align: center
	}

	.lp5-info__countdown-timer>* {
		width: 33%
	}

	.lp5-info__countdown-timer>:last-child .lp5-info__countdown-value:after {
		display: none
	}

	.lp5-info__countdown-value {
		position: relative;
		margin: 0 0 3px;
		font-family: Numbers, Montserrat;
		font-size: 35px;
		color: #fed700
	}

	.lp5-info__countdown-value:after {
		content: "";
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(50%, -50%);
		width: 3px;
		height: 18px;
		background: linear-gradient(#565a73, #565a73 4px, transparent 0, transparent 14px, #565a73 0, #565a73 18px)
	}

	.lp5-info__countdown-hint {
		font: 12px/1 "Montserrat";
		color: #fff
	}

	.lp5-info__complete-blocks {
		display: flex;
		margin: 20px 0 0;
		max-width: 387px;
		height: 37px
	}

	.lp5-info__complete-block {
		margin: 0 6px 0 0;
		width: 6.7%;
		height: 100%;
		border-radius: 6px;
		background: #1c4279
	}

	.lp5-info__complete-block:last-child {
		margin: 0
	}

	.lp5-info__complete-block_active {
		background: #19d95a
	}

	.lp5-info__pickup {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin: 24px 0 0;
		padding: 0 22px;
		min-width: 255px;
		height: 52px;
		border-radius: 10px;
		font: 15px/1.3 "Montserrat";
		white-space: nowrap;
		text-transform: uppercase
	}

	.lp5-info__pickup img {
		margin: 0 0 0 8px;
		max-width: 27px
	}

	.lp6 {
		padding: 123px 0 50px
	}

	.lp6__bg {
		position: absolute;
		left: 50%;
		top: -30px;
		transform: translate(-50%);
		margin: 0 0 0 -9px;
		width: 1095px;
		pointer-events: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}

	.lp6__bg>:nth-child(2) {
		display: none
	}

	.lp6__title {
		position: relative;
		margin: 0 0 26px;
		font: 50px/1.2 "Montserrat";
		text-align: center;
		color: #fff
	}

	.lp6__numbers-mob {
		display: none
	}

	.lp6__numbers-box {
		margin: 0 auto 19px;
		padding: 2px;
		background: linear-gradient(180deg, #d1d0ee 0, #5a58b7)
	}

	.lp6__numbers,
	.lp6__numbers-box {
		position: relative;
		display: inline-flex;
		border-radius: 9px
	}

	.lp6__numbers {
		margin: 0 auto;
		padding: 4px 7px;
		background: linear-gradient(180.14deg, #0d223f 1.16%, #0d192a 109.53%);
		background-clip: padding-box;
		box-shadow: 0 3.50368px 17.5184px rgba(0, 0, 0, .5), inset 0 2.62776px 4.3796px rgba(0, 0, 0, .3)
	}

	.lp6__number {
		position: relative;
		display: block;
		margin: 0 7px 0 0;
		width: 65px;
		height: 76px;
		border-radius: 9px;
		font: 66px/76px "Montserrat";
		text-align: center;
		color: #fed700;
		background: linear-gradient(181.6deg, #227ae6 1.16%, rgba(29, 98, 184, 0) 109.53%);
		box-shadow: 0 3.50368px 8.7592px rgba(0, 0, 0, .25), inset 0 7.00736px 4.3796px rgba(0, 0, 0, .5)
	}

	.lp6__number:after,
	.lp6__number:before {
		content: "";
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2px;
		height: 63px;
		background: linear-gradient(180deg, #c4c4c4, hsla(0, 0%, 58.4%, 0) 0, #c4c4c4 51.04%, hsla(0, 0%, 76.9%, 0))
	}

	.lp6__number:before {
		left: -2px
	}

	.lp6__number:after {
		right: -2px
	}

	.lp6__number:last-child {
		margin: 0
	}

	.lp6__number_dot {
		width: 23px;
		background: none;
		box-shadow: none
	}

	.lp6__number_dot:after,
	.lp6__number_dot:before {
		display: none
	}

	.lp6__number_btc {
		margin-left: 5px !important;
		padding: 0 12px;
		width: auto
	}

	.lp6__number_btc:after,
	.lp6__number_btc:before {
		display: none
	}

	.lp6__sum {
		display: block;
		margin: 0;
		font: 30px/1.2 "Montserrat";
		text-align: center;
		color: #fed700
	}

	.lp6__sum,
	.lp7 {
		position: relative
	}

	.lp7 {
		padding: 61px 0 50px
	}

	.lp7 .lp-heading {
		margin-bottom: 35px
	}

	.lp7 .lp__btn {
		margin: 0 auto
	}

	.lp7__items {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -7px
	}

	.lp7__items>* {
		margin: 0 0 30px;
		padding: 0 7px;
		width: 20%
	}

	.lp7-item_new .lp7-item__tag_new {
		display: block
	}

	.lp7-item__img {
		position: relative;
		padding: 134% 0 0;
		border-radius: 12px;
		overflow: hidden
	}

	.lp7-item__img>img {
		position: absolute;
		left: 0;
		top: 0;
		display: inline-block;
		width: 100%;
		height: 100%
	}

	.lp7-item__tag {
		position: absolute;
		right: -5px;
		top: 0
	}

	.lp7-item__tag>* {
		position: relative;
		display: block;
		padding: 0 31px 0 26px;
		height: 33px;
		font: 16.5px/33px "Montserrat";
		text-align: center;
		color: #fff;
		white-space: nowrap
	}

	.lp7-item__tag:before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 0 0 0 10px;
		background: #fad247;
		transform: skewX(11deg)
	}

	.lp7-item__tag_new {
		display: none
	}

	.lp7-item__tag_new:before {
		background: #1bb83d
	}

	.lp7-item__trx {
		position: absolute;
		left: -5px;
		bottom: 0
	}

	.lp7-item__trx>* {
		position: relative;
		display: block;
		padding: 0 18px 0 23px;
		height: 41px;
		font: 16.5px/41px "Montserrat";
		text-align: center;
		color: #1a1c25;
		white-space: nowrap
	}

	.lp7-item__trx>*>* {
		font-family: "Montserrat"
	}

	.lp7-item__trx:before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 0 10px 0 0;
		background: #fad247;
		transform: skewX(11deg)
	}

	.lp7-item__detail {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 13px auto 0;
		height: 52px;
		border: 1px solid #55657e;
		border-radius: 10px;
		font: 15px/1.2 "Montserrat";
		text-align: center;
		color: #fff
	}

	.lp7-item__detail:hover {
		background: #55657e
	}

	.lp7__text {
		margin: 0 auto 29px;
		font: 15px/23px "Montserrat";
		text-align: center;
		color: #55657e
	}

	@media(max-width: 1040px) {
		.page-dailytasks .lp .content {
			padding: 0 22px;
			max-width: 375px
		}

		.page-dailytasks .lp1__title {
			margin: 0 auto 30px;
			max-width: none;
			font-size: 35px;
			line-height: 44px;
			text-align: center
		}

		.page-dailytasks .lp1__img {
			position: relative;
			right: auto;
			left: 50%;
			top: -123px;
			transform: translate(-50%);
			width: 577px;
			height: 377px;
			margin: 0 0 0 -35px
		}

		.page-dailytasks .lp1 {
			padding: 23px 0 56px
		}

		.page-dailytasks .lp1__cloud {
			position: absolute;
			right: auto !important;
			left: 50%;
			top: 34px !important;
			transform: translate(-53%) rotate(-27deg);
			width: 750px;
			margin: 0
		}

		.page-dailytasks .lp1__cloud img {
			max-width: 100%
		}

		.page-dailytasks .lp1__list-img {
			margin: 0 0 7px;
			left: auto;
			top: auto
		}

		.page-dailytasks .lp1__list-heading {
			margin: 0 -5px 10px
		}

		.page-dailytasks .lp-title {
			margin: 0 auto 19px;
			font-size: 35px;
			line-height: 45px
		}

		.page-dailytasks .lp2__items {
			margin: 0 auto;
			max-width: 331px
		}

		.page-dailytasks .lp2__items>* {
			padding: 0;
			width: 100%
		}

		.page-dailytasks .lp2__item {
			margin: 0 0 28px
		}

		.page-dailytasks .lp-heading {
			margin: 0 auto 37px
		}

		.page-dailytasks .lp2__items>:after {
			content: "";
			position: absolute;
			right: 50%;
			top: auto;
			bottom: -13px;
			transform: translate(50%) rotate(90deg)
		}

		.page-dailytasks .lp2__btn,
		.page-dailytasks .lp3__signs {
			display: none
		}

		.page-dailytasks .lp3 {
			padding: 11px 0 100px
		}

		.page-dailytasks .lp3__items .glide__arrow {
			display: none
		}

		.page-dailytasks .lp3__items .glide__track {
			overflow: visible
		}

		.page-dailytasks .lp3__items-box>* {
			padding: 0 9px
		}

		.page-dailytasks .lp1__list {
			max-width: none
		}

		.page-dailytasks .lp_2 .lp1 {
			padding: 47px 0 0
		}

		.page-dailytasks .lp_2 .lp1__title {
			line-height: 41px
		}

		.page-dailytasks .lp_2 .lp1__list-img {
			margin: 0 0 16px
		}

		.page-dailytasks .lp_2 .lp2 {
			padding-top: 42px
		}

		.page-dailytasks .lp_2 .lp1__list-text {
			margin: 0 10px
		}

		.page-dailytasks .lp_2 .lp2 .lp-heading {
			margin-bottom: 49px
		}

		.page-dailytasks .lp4 .lp-title {
			margin: 0 20px 21px
		}

		.page-dailytasks .lp4 {
			padding: 25px 0 50px
		}

		.page-dailytasks .lp-toptextsm {
			font: 18px/1.45 "Montserrat";
			color: #9db8e1
		}

		.page-dailytasks .lp4__coins {
			display: none
		}

		.page-dailytasks .lp4 .lp-heading {
			margin: 0 auto 95px
		}

		.page-dailytasks .lp4__items {
			margin-bottom: -28px
		}

		.page-dailytasks .lp3 {
			margin: 0 -22px;
			overflow: hidden
		}

		.page-dailytasks .lp3__items {
			max-width: 297px
		}

		.page-dailytasks .lp3__items:after,
		.page-dailytasks .lp3__items:before {
			content: "";
			position: absolute;
			top: 0;
			width: 39px;
			height: 100%;
			z-index: 1
		}

		.page-dailytasks .lp3__items:before {
			left: -39px;
			background: linear-gradient(270deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.page-dailytasks .lp3__items:after {
			right: -39px;
			background: linear-gradient(90deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.page-dailytasks .lp3__heading {
			margin-left: 22px;
			margin-right: 22px
		}

		.page-dailytasks .lp_3 .lp1__title {
			font-size: 30px;
			line-height: 1.28
		}

		.page-dailytasks .lp_3 .lp1__cloud,
		.page-dailytasks .lp_3 .lp1__img,
		.page-dailytasks .lp_3 .lp1__title br {
			display: none
		}

		.page-dailytasks .lp_3 .lp1__text {
			margin: -14px auto 21px;
			text-align: center
		}

		.page-dailytasks .lp_3 .lp1 .lp__btn {
			margin: 0 auto;
			width: 345px;
			max-width: 100%
		}

		.page-dailytasks .lp_3 .content {
			padding: 0 15px
		}

		.page-dailytasks .lp5-info__box>:first-child {
			margin: 0 0 22px;
			padding: 0;
			width: 100%
		}

		.page-dailytasks .lp5-info__box>:nth-child(2) {
			margin: 0 0 25px;
			padding: 0;
			width: 100%
		}

		.page-dailytasks .lp5-info__box>:nth-child(3) {
			width: 100%
		}

		.page-dailytasks .lp5-info__heading {
			text-align: center
		}

		.page-dailytasks .lp5-info__complete-blocks,
		.page-dailytasks .lp5-info__countdown-timer {
			margin: 0 auto
		}

		.page-dailytasks .lp5-info__pickup {
			padding: 0;
			width: 100%;
			min-width: auto
		}

		.page-dailytasks .lp5 {
			padding: 0
		}

		.page-dailytasks .lp5-info__box {
			padding: 21px 25px 20px
		}

		.page-dailytasks .lp5-info__pickup {
			margin: 0 auto
		}

		.page-dailytasks .lp5-item__text {
			max-width: 210px
		}

		.page-dailytasks .lp5-item__box {
			padding-left: 25px;
			padding-right: 25px
		}

		.page-dailytasks .lp_4 .lp1__title {
			font-size: 30px;
			line-height: 45px
		}

		.page-dailytasks .lp_4 .lp1__cloud {
			display: none
		}

		.page-dailytasks .lp_4 .lp1__list-img {
			margin: 0 0 15px
		}

		.page-dailytasks .lp_4 .lp1__list-heading {
			margin-bottom: 3px
		}

		.page-dailytasks .lp_4 .content {
			padding: 0 15px
		}

		.page-dailytasks .lp6 {
			padding: 32px 0 50px
		}

		.page-dailytasks .lp6__title {
			margin: 0 0 11px;
			font-size: 30px
		}

		.page-dailytasks .lp6__box {
			margin: 0 auto;
			padding: 52px 0 58px;
			max-width: 345px
		}

		.page-dailytasks .lp6__numbers-mob {
			position: relative;
			display: block;
			margin: 0 0 10px;
			font: 35px/1.2 "Montserrat";
			text-align: center;
			color: #fed700
		}

		.page-dailytasks .lp6__numbers-box {
			display: none
		}

		.page-dailytasks .lp6__sum {
			font-size: 18px
		}

		.page-dailytasks .lp6__bg>:first-child {
			display: none
		}

		.page-dailytasks .lp6__bg>:nth-child(2) {
			display: inline-block
		}

		.page-dailytasks .lp6__bg {
			top: -24px;
			margin: 0 0 0 1px;
			width: 383.5px
		}

		.page-dailytasks .lp6__box:before {
			display: none
		}

		.page-dailytasks .lp7 {
			padding: 43px 0 20px
		}

		.page-dailytasks .lp7 .lp-title {
			line-height: 42px
		}

		.page-dailytasks .lp7 .lp-title span {
			display: block
		}

		.page-dailytasks .lp7 .lp-heading {
			margin-bottom: 28px
		}

		.page-dailytasks .lp7__items {
			margin: 0 auto;
			max-width: 345px
		}

		.page-dailytasks .lp7__items>* {
			margin: 0 0 26px;
			width: 50%
		}

		.page-dailytasks .lp7__items>:nth-child(2n-1) {
			padding: 0 8px 0 0
		}

		.page-dailytasks .lp7__items>:nth-child(2n) {
			padding: 0 0 0 8px
		}

		.page-dailytasks .lp7-item__tag>* {
			padding: 0 27px 0 24px;
			height: 28px;
			font-size: 14px;
			line-height: 28px
		}

		.page-dailytasks .lp7-item__trx>* {
			padding: 0 17px 0 21px;
			height: 35px;
			font-size: 14px;
			line-height: 35px
		}

		.page-dailytasks .lp7-item__detail {
			margin: 11px auto 0;
			height: 44px;
			font-size: 13px
		}

		.page-dailytasks .lp7 .lp__btn,
		.page-dailytasks .lp7__text {
			display: none
		}
	}

	@media(max-width: 1272px) {
		.opened-left-panel .page-dailytasks .lp .content {
			padding: 0 22px;
			max-width: 375px
		}

		.opened-left-panel .page-dailytasks .lp1__title {
			margin: 0 auto 30px;
			max-width: none;
			font-size: 35px;
			line-height: 44px;
			text-align: center
		}

		.opened-left-panel .page-dailytasks .lp1__img {
			position: relative;
			right: auto;
			left: 50%;
			top: -123px;
			transform: translate(-50%);
			width: 577px;
			height: 377px;
			margin: 0 0 0 -35px
		}

		.opened-left-panel .page-dailytasks .lp1 {
			padding: 23px 0 56px
		}

		.opened-left-panel .page-dailytasks .lp1__cloud {
			position: absolute;
			right: auto !important;
			left: 50%;
			top: 34px !important;
			transform: translate(-53%) rotate(-27deg);
			width: 750px;
			margin: 0
		}

		.opened-left-panel .page-dailytasks .lp1__cloud img {
			max-width: 100%
		}

		.opened-left-panel .page-dailytasks .lp1__list-img {
			margin: 0 0 7px;
			left: auto;
			top: auto
		}

		.opened-left-panel .page-dailytasks .lp1__list-heading {
			margin: 0 -5px 10px
		}

		.opened-left-panel .page-dailytasks .lp-title {
			margin: 0 auto 19px;
			font-size: 35px;
			line-height: 45px
		}

		.opened-left-panel .page-dailytasks .lp2__items {
			margin: 0 auto;
			max-width: 331px
		}

		.opened-left-panel .page-dailytasks .lp2__items>* {
			padding: 0;
			width: 100%
		}

		.opened-left-panel .page-dailytasks .lp2__item {
			margin: 0 0 28px
		}

		.opened-left-panel .page-dailytasks .lp-heading {
			margin: 0 auto 37px
		}

		.opened-left-panel .page-dailytasks .lp2__items>:after {
			content: "";
			position: absolute;
			right: 50%;
			top: auto;
			bottom: -13px;
			transform: translate(50%) rotate(90deg)
		}

		.opened-left-panel .page-dailytasks .lp2__btn,
		.opened-left-panel .page-dailytasks .lp3__signs {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp3 {
			padding: 11px 0 100px
		}

		.opened-left-panel .page-dailytasks .lp3__items .glide__arrow {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp3__items .glide__track {
			overflow: visible
		}

		.opened-left-panel .page-dailytasks .lp3__items-box>* {
			padding: 0 9px
		}

		.opened-left-panel .page-dailytasks .lp1__list {
			max-width: none
		}

		.opened-left-panel .page-dailytasks .lp_2 .lp1 {
			padding: 47px 0 0
		}

		.opened-left-panel .page-dailytasks .lp_2 .lp1__title {
			line-height: 41px
		}

		.opened-left-panel .page-dailytasks .lp_2 .lp1__list-img {
			margin: 0 0 16px
		}

		.opened-left-panel .page-dailytasks .lp_2 .lp2 {
			padding-top: 42px
		}

		.opened-left-panel .page-dailytasks .lp_2 .lp1__list-text {
			margin: 0 10px
		}

		.opened-left-panel .page-dailytasks .lp_2 .lp2 .lp-heading {
			margin-bottom: 49px
		}

		.opened-left-panel .page-dailytasks .lp4 .lp-title {
			margin: 0 20px 21px
		}

		.opened-left-panel .page-dailytasks .lp4 {
			padding: 25px 0 50px
		}

		.opened-left-panel .page-dailytasks .lp-toptextsm {
			font: 18px/1.45 "Montserrat";
			color: #9db8e1
		}

		.opened-left-panel .page-dailytasks .lp4__coins {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp4 .lp-heading {
			margin: 0 auto 95px
		}

		.opened-left-panel .page-dailytasks .lp4__items {
			margin-bottom: -28px
		}

		.opened-left-panel .page-dailytasks .lp3 {
			margin: 0 -22px;
			overflow: hidden
		}

		.opened-left-panel .page-dailytasks .lp3__items {
			max-width: 297px
		}

		.opened-left-panel .page-dailytasks .lp3__items:after,
		.opened-left-panel .page-dailytasks .lp3__items:before {
			content: "";
			position: absolute;
			top: 0;
			width: 39px;
			height: 100%;
			z-index: 1
		}

		.opened-left-panel .page-dailytasks .lp3__items:before {
			left: -39px;
			background: linear-gradient(270deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-left-panel .page-dailytasks .lp3__items:after {
			right: -39px;
			background: linear-gradient(90deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-left-panel .page-dailytasks .lp3__heading {
			margin-left: 22px;
			margin-right: 22px
		}

		.opened-left-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 30px;
			line-height: 1.28
		}

		.opened-left-panel .page-dailytasks .lp_3 .lp1__cloud,
		.opened-left-panel .page-dailytasks .lp_3 .lp1__img,
		.opened-left-panel .page-dailytasks .lp_3 .lp1__title br {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp_3 .lp1__text {
			margin: -14px auto 21px;
			text-align: center
		}

		.opened-left-panel .page-dailytasks .lp_3 .lp1 .lp__btn {
			margin: 0 auto;
			width: 345px;
			max-width: 100%
		}

		.opened-left-panel .page-dailytasks .lp_3 .content {
			padding: 0 15px
		}

		.opened-left-panel .page-dailytasks .lp5-info__box>:first-child {
			margin: 0 0 22px;
			padding: 0;
			width: 100%
		}

		.opened-left-panel .page-dailytasks .lp5-info__box>:nth-child(2) {
			margin: 0 0 25px;
			padding: 0;
			width: 100%
		}

		.opened-left-panel .page-dailytasks .lp5-info__box>:nth-child(3) {
			width: 100%
		}

		.opened-left-panel .page-dailytasks .lp5-info__heading {
			text-align: center
		}

		.opened-left-panel .page-dailytasks .lp5-info__complete-blocks,
		.opened-left-panel .page-dailytasks .lp5-info__countdown-timer {
			margin: 0 auto
		}

		.opened-left-panel .page-dailytasks .lp5-info__pickup {
			padding: 0;
			width: 100%;
			min-width: auto
		}

		.opened-left-panel .page-dailytasks .lp5 {
			padding: 0
		}

		.opened-left-panel .page-dailytasks .lp5-info__box {
			padding: 21px 25px 20px
		}

		.opened-left-panel .page-dailytasks .lp5-info__pickup {
			margin: 0 auto
		}

		.opened-left-panel .page-dailytasks .lp5-item__text {
			max-width: 210px
		}

		.opened-left-panel .page-dailytasks .lp5-item__box {
			padding-left: 25px;
			padding-right: 25px
		}

		.opened-left-panel .page-dailytasks .lp_4 .lp1__title {
			font-size: 30px;
			line-height: 45px
		}

		.opened-left-panel .page-dailytasks .lp_4 .lp1__cloud {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp_4 .lp1__list-img {
			margin: 0 0 15px
		}

		.opened-left-panel .page-dailytasks .lp_4 .lp1__list-heading {
			margin-bottom: 3px
		}

		.opened-left-panel .page-dailytasks .lp_4 .content {
			padding: 0 15px
		}

		.opened-left-panel .page-dailytasks .lp6 {
			padding: 32px 0 50px
		}

		.opened-left-panel .page-dailytasks .lp6__title {
			margin: 0 0 11px;
			font-size: 30px
		}

		.opened-left-panel .page-dailytasks .lp6__box {
			margin: 0 auto;
			padding: 52px 0 58px;
			max-width: 345px
		}

		.opened-left-panel .page-dailytasks .lp6__numbers-mob {
			position: relative;
			display: block;
			margin: 0 0 10px;
			font: 35px/1.2 "Montserrat";
			text-align: center;
			color: #fed700
		}

		.opened-left-panel .page-dailytasks .lp6__numbers-box {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp6__sum {
			font-size: 18px
		}

		.opened-left-panel .page-dailytasks .lp6__bg>:first-child {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp6__bg>:nth-child(2) {
			display: inline-block
		}

		.opened-left-panel .page-dailytasks .lp6__bg {
			top: -24px;
			margin: 0 0 0 1px;
			width: 383.5px
		}

		.opened-left-panel .page-dailytasks .lp6__box:before {
			display: none
		}

		.opened-left-panel .page-dailytasks .lp7 {
			padding: 43px 0 20px
		}

		.opened-left-panel .page-dailytasks .lp7 .lp-title {
			line-height: 42px
		}

		.opened-left-panel .page-dailytasks .lp7 .lp-title span {
			display: block
		}

		.opened-left-panel .page-dailytasks .lp7 .lp-heading {
			margin-bottom: 28px
		}

		.opened-left-panel .page-dailytasks .lp7__items {
			margin: 0 auto;
			max-width: 345px
		}

		.opened-left-panel .page-dailytasks .lp7__items>* {
			margin: 0 0 26px;
			width: 50%
		}

		.opened-left-panel .page-dailytasks .lp7__items>:nth-child(2n-1) {
			padding: 0 8px 0 0
		}

		.opened-left-panel .page-dailytasks .lp7__items>:nth-child(2n) {
			padding: 0 0 0 8px
		}

		.opened-left-panel .page-dailytasks .lp7-item__tag>* {
			padding: 0 27px 0 24px;
			height: 28px;
			font-size: 14px;
			line-height: 28px
		}

		.opened-left-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 17px 0 21px;
			height: 35px;
			font-size: 14px;
			line-height: 35px
		}

		.opened-left-panel .page-dailytasks .lp7-item__detail {
			margin: 11px auto 0;
			height: 44px;
			font-size: 13px
		}

		.opened-left-panel .page-dailytasks .lp7 .lp__btn,
		.opened-left-panel .page-dailytasks .lp7__text {
			display: none
		}
	}

	@media(max-width: 1365px) {
		.opened-right-panel .page-dailytasks .lp .content {
			padding: 0 22px;
			max-width: 375px
		}

		.opened-right-panel .page-dailytasks .lp1__title {
			margin: 0 auto 30px;
			max-width: none;
			font-size: 35px;
			line-height: 44px;
			text-align: center
		}

		.opened-right-panel .page-dailytasks .lp1__img {
			position: relative;
			right: auto;
			left: 50%;
			top: -123px;
			transform: translate(-50%);
			width: 577px;
			height: 377px;
			margin: 0 0 0 -35px
		}

		.opened-right-panel .page-dailytasks .lp1 {
			padding: 23px 0 56px
		}

		.opened-right-panel .page-dailytasks .lp1__cloud {
			position: absolute;
			right: auto !important;
			left: 50%;
			top: 34px !important;
			transform: translate(-53%) rotate(-27deg);
			width: 750px;
			margin: 0
		}

		.opened-right-panel .page-dailytasks .lp1__cloud img {
			max-width: 100%
		}

		.opened-right-panel .page-dailytasks .lp1__list-img {
			margin: 0 0 7px;
			left: auto;
			top: auto
		}

		.opened-right-panel .page-dailytasks .lp1__list-heading {
			margin: 0 -5px 10px
		}

		.opened-right-panel .page-dailytasks .lp-title {
			margin: 0 auto 19px;
			font-size: 35px;
			line-height: 45px
		}

		.opened-right-panel .page-dailytasks .lp2__items {
			margin: 0 auto;
			max-width: 331px
		}

		.opened-right-panel .page-dailytasks .lp2__items>* {
			padding: 0;
			width: 100%
		}

		.opened-right-panel .page-dailytasks .lp2__item {
			margin: 0 0 28px
		}

		.opened-right-panel .page-dailytasks .lp-heading {
			margin: 0 auto 37px
		}

		.opened-right-panel .page-dailytasks .lp2__items>:after {
			content: "";
			position: absolute;
			right: 50%;
			top: auto;
			bottom: -13px;
			transform: translate(50%) rotate(90deg)
		}

		.opened-right-panel .page-dailytasks .lp2__btn,
		.opened-right-panel .page-dailytasks .lp3__signs {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp3 {
			padding: 11px 0 100px
		}

		.opened-right-panel .page-dailytasks .lp3__items .glide__arrow {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp3__items .glide__track {
			overflow: visible
		}

		.opened-right-panel .page-dailytasks .lp3__items-box>* {
			padding: 0 9px
		}

		.opened-right-panel .page-dailytasks .lp1__list {
			max-width: none
		}

		.opened-right-panel .page-dailytasks .lp_2 .lp1 {
			padding: 47px 0 0
		}

		.opened-right-panel .page-dailytasks .lp_2 .lp1__title {
			line-height: 41px
		}

		.opened-right-panel .page-dailytasks .lp_2 .lp1__list-img {
			margin: 0 0 16px
		}

		.opened-right-panel .page-dailytasks .lp_2 .lp2 {
			padding-top: 42px
		}

		.opened-right-panel .page-dailytasks .lp_2 .lp1__list-text {
			margin: 0 10px
		}

		.opened-right-panel .page-dailytasks .lp_2 .lp2 .lp-heading {
			margin-bottom: 49px
		}

		.opened-right-panel .page-dailytasks .lp4 .lp-title {
			margin: 0 20px 21px
		}

		.opened-right-panel .page-dailytasks .lp4 {
			padding: 25px 0 50px
		}

		.opened-right-panel .page-dailytasks .lp-toptextsm {
			font: 18px/1.45 "Montserrat";
			color: #9db8e1
		}

		.opened-right-panel .page-dailytasks .lp4__coins {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp4 .lp-heading {
			margin: 0 auto 95px
		}

		.opened-right-panel .page-dailytasks .lp4__items {
			margin-bottom: -28px
		}

		.opened-right-panel .page-dailytasks .lp3 {
			margin: 0 -22px;
			overflow: hidden
		}

		.opened-right-panel .page-dailytasks .lp3__items {
			max-width: 297px
		}

		.opened-right-panel .page-dailytasks .lp3__items:after,
		.opened-right-panel .page-dailytasks .lp3__items:before {
			content: "";
			position: absolute;
			top: 0;
			width: 39px;
			height: 100%;
			z-index: 1
		}

		.opened-right-panel .page-dailytasks .lp3__items:before {
			left: -39px;
			background: linear-gradient(270deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-right-panel .page-dailytasks .lp3__items:after {
			right: -39px;
			background: linear-gradient(90deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-right-panel .page-dailytasks .lp3__heading {
			margin-left: 22px;
			margin-right: 22px
		}

		.opened-right-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 30px;
			line-height: 1.28
		}

		.opened-right-panel .page-dailytasks .lp_3 .lp1__cloud,
		.opened-right-panel .page-dailytasks .lp_3 .lp1__img,
		.opened-right-panel .page-dailytasks .lp_3 .lp1__title br {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp_3 .lp1__text {
			margin: -14px auto 21px;
			text-align: center
		}

		.opened-right-panel .page-dailytasks .lp_3 .lp1 .lp__btn {
			margin: 0 auto;
			width: 345px;
			max-width: 100%
		}

		.opened-right-panel .page-dailytasks .lp_3 .content {
			padding: 0 15px
		}

		.opened-right-panel .page-dailytasks .lp5-info__box>:first-child {
			margin: 0 0 22px;
			padding: 0;
			width: 100%
		}

		.opened-right-panel .page-dailytasks .lp5-info__box>:nth-child(2) {
			margin: 0 0 25px;
			padding: 0;
			width: 100%
		}

		.opened-right-panel .page-dailytasks .lp5-info__box>:nth-child(3) {
			width: 100%
		}

		.opened-right-panel .page-dailytasks .lp5-info__heading {
			text-align: center
		}

		.opened-right-panel .page-dailytasks .lp5-info__complete-blocks,
		.opened-right-panel .page-dailytasks .lp5-info__countdown-timer {
			margin: 0 auto
		}

		.opened-right-panel .page-dailytasks .lp5-info__pickup {
			padding: 0;
			width: 100%;
			min-width: auto
		}

		.opened-right-panel .page-dailytasks .lp5 {
			padding: 0
		}

		.opened-right-panel .page-dailytasks .lp5-info__box {
			padding: 21px 25px 20px
		}

		.opened-right-panel .page-dailytasks .lp5-info__pickup {
			margin: 0 auto
		}

		.opened-right-panel .page-dailytasks .lp5-item__text {
			max-width: 210px
		}

		.opened-right-panel .page-dailytasks .lp5-item__box {
			padding-left: 25px;
			padding-right: 25px
		}

		.opened-right-panel .page-dailytasks .lp_4 .lp1__title {
			font-size: 30px;
			line-height: 45px
		}

		.opened-right-panel .page-dailytasks .lp_4 .lp1__cloud {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp_4 .lp1__list-img {
			margin: 0 0 15px
		}

		.opened-right-panel .page-dailytasks .lp_4 .lp1__list-heading {
			margin-bottom: 3px
		}

		.opened-right-panel .page-dailytasks .lp_4 .content {
			padding: 0 15px
		}

		.opened-right-panel .page-dailytasks .lp6 {
			padding: 32px 0 50px
		}

		.opened-right-panel .page-dailytasks .lp6__title {
			margin: 0 0 11px;
			font-size: 30px
		}

		.opened-right-panel .page-dailytasks .lp6__box {
			margin: 0 auto;
			padding: 52px 0 58px;
			max-width: 345px
		}

		.opened-right-panel .page-dailytasks .lp6__numbers-mob {
			position: relative;
			display: block;
			margin: 0 0 10px;
			font: 35px/1.2 "Montserrat";
			text-align: center;
			color: #fed700
		}

		.opened-right-panel .page-dailytasks .lp6__numbers-box {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp6__sum {
			font-size: 18px
		}

		.opened-right-panel .page-dailytasks .lp6__bg>:first-child {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp6__bg>:nth-child(2) {
			display: inline-block
		}

		.opened-right-panel .page-dailytasks .lp6__bg {
			top: -24px;
			margin: 0 0 0 1px;
			width: 383.5px
		}

		.opened-right-panel .page-dailytasks .lp6__box:before {
			display: none
		}

		.opened-right-panel .page-dailytasks .lp7 {
			padding: 43px 0 20px
		}

		.opened-right-panel .page-dailytasks .lp7 .lp-title {
			line-height: 42px
		}

		.opened-right-panel .page-dailytasks .lp7 .lp-title span {
			display: block
		}

		.opened-right-panel .page-dailytasks .lp7 .lp-heading {
			margin-bottom: 28px
		}

		.opened-right-panel .page-dailytasks .lp7__items {
			margin: 0 auto;
			max-width: 345px
		}

		.opened-right-panel .page-dailytasks .lp7__items>* {
			margin: 0 0 26px;
			width: 50%
		}

		.opened-right-panel .page-dailytasks .lp7__items>:nth-child(2n-1) {
			padding: 0 8px 0 0
		}

		.opened-right-panel .page-dailytasks .lp7__items>:nth-child(2n) {
			padding: 0 0 0 8px
		}

		.opened-right-panel .page-dailytasks .lp7-item__tag>* {
			padding: 0 27px 0 24px;
			height: 28px;
			font-size: 14px;
			line-height: 28px
		}

		.opened-right-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 17px 0 21px;
			height: 35px;
			font-size: 14px;
			line-height: 35px
		}

		.opened-right-panel .page-dailytasks .lp7-item__detail {
			margin: 11px auto 0;
			height: 44px;
			font-size: 13px
		}

		.opened-right-panel .page-dailytasks .lp7 .lp__btn,
		.opened-right-panel .page-dailytasks .lp7__text {
			display: none
		}
	}

	@media(max-width: 1380px) {
		.opened-contests-panel .page-dailytasks .lp .content {
			padding: 0 22px;
			max-width: 375px
		}

		.opened-contests-panel .page-dailytasks .lp1__title {
			margin: 0 auto 30px;
			max-width: none;
			font-size: 35px;
			line-height: 44px;
			text-align: center
		}

		.opened-contests-panel .page-dailytasks .lp1__img {
			position: relative;
			right: auto;
			left: 50%;
			top: -123px;
			transform: translate(-50%);
			width: 577px;
			height: 377px;
			margin: 0 0 0 -35px
		}

		.opened-contests-panel .page-dailytasks .lp1 {
			padding: 23px 0 56px
		}

		.opened-contests-panel .page-dailytasks .lp1__cloud {
			position: absolute;
			right: auto !important;
			left: 50%;
			top: 34px !important;
			transform: translate(-53%) rotate(-27deg);
			width: 750px;
			margin: 0
		}

		.opened-contests-panel .page-dailytasks .lp1__cloud img {
			max-width: 100%
		}

		.opened-contests-panel .page-dailytasks .lp1__list-img {
			margin: 0 0 7px;
			left: auto;
			top: auto
		}

		.opened-contests-panel .page-dailytasks .lp1__list-heading {
			margin: 0 -5px 10px
		}

		.opened-contests-panel .page-dailytasks .lp-title {
			margin: 0 auto 19px;
			font-size: 35px;
			line-height: 45px
		}

		.opened-contests-panel .page-dailytasks .lp2__items {
			margin: 0 auto;
			max-width: 331px
		}

		.opened-contests-panel .page-dailytasks .lp2__items>* {
			padding: 0;
			width: 100%
		}

		.opened-contests-panel .page-dailytasks .lp2__item {
			margin: 0 0 28px
		}

		.opened-contests-panel .page-dailytasks .lp-heading {
			margin: 0 auto 37px
		}

		.opened-contests-panel .page-dailytasks .lp2__items>:after {
			content: "";
			position: absolute;
			right: 50%;
			top: auto;
			bottom: -13px;
			transform: translate(50%) rotate(90deg)
		}

		.opened-contests-panel .page-dailytasks .lp2__btn,
		.opened-contests-panel .page-dailytasks .lp3__signs {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp3 {
			padding: 11px 0 100px
		}

		.opened-contests-panel .page-dailytasks .lp3__items .glide__arrow {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp3__items .glide__track {
			overflow: visible
		}

		.opened-contests-panel .page-dailytasks .lp3__items-box>* {
			padding: 0 9px
		}

		.opened-contests-panel .page-dailytasks .lp1__list {
			max-width: none
		}

		.opened-contests-panel .page-dailytasks .lp_2 .lp1 {
			padding: 47px 0 0
		}

		.opened-contests-panel .page-dailytasks .lp_2 .lp1__title {
			line-height: 41px
		}

		.opened-contests-panel .page-dailytasks .lp_2 .lp1__list-img {
			margin: 0 0 16px
		}

		.opened-contests-panel .page-dailytasks .lp_2 .lp2 {
			padding-top: 42px
		}

		.opened-contests-panel .page-dailytasks .lp_2 .lp1__list-text {
			margin: 0 10px
		}

		.opened-contests-panel .page-dailytasks .lp_2 .lp2 .lp-heading {
			margin-bottom: 49px
		}

		.opened-contests-panel .page-dailytasks .lp4 .lp-title {
			margin: 0 20px 21px
		}

		.opened-contests-panel .page-dailytasks .lp4 {
			padding: 25px 0 50px
		}

		.opened-contests-panel .page-dailytasks .lp-toptextsm {
			font: 18px/1.45 "Montserrat";
			color: #9db8e1
		}

		.opened-contests-panel .page-dailytasks .lp4__coins {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp4 .lp-heading {
			margin: 0 auto 95px
		}

		.opened-contests-panel .page-dailytasks .lp4__items {
			margin-bottom: -28px
		}

		.opened-contests-panel .page-dailytasks .lp3 {
			margin: 0 -22px;
			overflow: hidden
		}

		.opened-contests-panel .page-dailytasks .lp3__items {
			max-width: 297px
		}

		.opened-contests-panel .page-dailytasks .lp3__items:after,
		.opened-contests-panel .page-dailytasks .lp3__items:before {
			content: "";
			position: absolute;
			top: 0;
			width: 39px;
			height: 100%;
			z-index: 1
		}

		.opened-contests-panel .page-dailytasks .lp3__items:before {
			left: -39px;
			background: linear-gradient(270deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-contests-panel .page-dailytasks .lp3__items:after {
			right: -39px;
			background: linear-gradient(90deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-contests-panel .page-dailytasks .lp3__heading {
			margin-left: 22px;
			margin-right: 22px
		}

		.opened-contests-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 30px;
			line-height: 1.28
		}

		.opened-contests-panel .page-dailytasks .lp_3 .lp1__cloud,
		.opened-contests-panel .page-dailytasks .lp_3 .lp1__img,
		.opened-contests-panel .page-dailytasks .lp_3 .lp1__title br {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp_3 .lp1__text {
			margin: -14px auto 21px;
			text-align: center
		}

		.opened-contests-panel .page-dailytasks .lp_3 .lp1 .lp__btn {
			margin: 0 auto;
			width: 345px;
			max-width: 100%
		}

		.opened-contests-panel .page-dailytasks .lp_3 .content {
			padding: 0 15px
		}

		.opened-contests-panel .page-dailytasks .lp5-info__box>:first-child {
			margin: 0 0 22px;
			padding: 0;
			width: 100%
		}

		.opened-contests-panel .page-dailytasks .lp5-info__box>:nth-child(2) {
			margin: 0 0 25px;
			padding: 0;
			width: 100%
		}

		.opened-contests-panel .page-dailytasks .lp5-info__box>:nth-child(3) {
			width: 100%
		}

		.opened-contests-panel .page-dailytasks .lp5-info__heading {
			text-align: center
		}

		.opened-contests-panel .page-dailytasks .lp5-info__complete-blocks,
		.opened-contests-panel .page-dailytasks .lp5-info__countdown-timer {
			margin: 0 auto
		}

		.opened-contests-panel .page-dailytasks .lp5-info__pickup {
			padding: 0;
			width: 100%;
			min-width: auto
		}

		.opened-contests-panel .page-dailytasks .lp5 {
			padding: 0
		}

		.opened-contests-panel .page-dailytasks .lp5-info__box {
			padding: 21px 25px 20px
		}

		.opened-contests-panel .page-dailytasks .lp5-info__pickup {
			margin: 0 auto
		}

		.opened-contests-panel .page-dailytasks .lp5-item__text {
			max-width: 210px
		}

		.opened-contests-panel .page-dailytasks .lp5-item__box {
			padding-left: 25px;
			padding-right: 25px
		}

		.opened-contests-panel .page-dailytasks .lp_4 .lp1__title {
			font-size: 30px;
			line-height: 45px
		}

		.opened-contests-panel .page-dailytasks .lp_4 .lp1__cloud {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp_4 .lp1__list-img {
			margin: 0 0 15px
		}

		.opened-contests-panel .page-dailytasks .lp_4 .lp1__list-heading {
			margin-bottom: 3px
		}

		.opened-contests-panel .page-dailytasks .lp_4 .content {
			padding: 0 15px
		}

		.opened-contests-panel .page-dailytasks .lp6 {
			padding: 32px 0 50px
		}

		.opened-contests-panel .page-dailytasks .lp6__title {
			margin: 0 0 11px;
			font-size: 30px
		}

		.opened-contests-panel .page-dailytasks .lp6__box {
			margin: 0 auto;
			padding: 52px 0 58px;
			max-width: 345px
		}

		.opened-contests-panel .page-dailytasks .lp6__numbers-mob {
			position: relative;
			display: block;
			margin: 0 0 10px;
			font: 35px/1.2 "Montserrat";
			text-align: center;
			color: #fed700
		}

		.opened-contests-panel .page-dailytasks .lp6__numbers-box {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp6__sum {
			font-size: 18px
		}

		.opened-contests-panel .page-dailytasks .lp6__bg>:first-child {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp6__bg>:nth-child(2) {
			display: inline-block
		}

		.opened-contests-panel .page-dailytasks .lp6__bg {
			top: -24px;
			margin: 0 0 0 1px;
			width: 383.5px
		}

		.opened-contests-panel .page-dailytasks .lp6__box:before {
			display: none
		}

		.opened-contests-panel .page-dailytasks .lp7 {
			padding: 43px 0 20px
		}

		.opened-contests-panel .page-dailytasks .lp7 .lp-title {
			line-height: 42px
		}

		.opened-contests-panel .page-dailytasks .lp7 .lp-title span {
			display: block
		}

		.opened-contests-panel .page-dailytasks .lp7 .lp-heading {
			margin-bottom: 28px
		}

		.opened-contests-panel .page-dailytasks .lp7__items {
			margin: 0 auto;
			max-width: 345px
		}

		.opened-contests-panel .page-dailytasks .lp7__items>* {
			margin: 0 0 26px;
			width: 50%
		}

		.opened-contests-panel .page-dailytasks .lp7__items>:nth-child(2n-1) {
			padding: 0 8px 0 0
		}

		.opened-contests-panel .page-dailytasks .lp7__items>:nth-child(2n) {
			padding: 0 0 0 8px
		}

		.opened-contests-panel .page-dailytasks .lp7-item__tag>* {
			padding: 0 27px 0 24px;
			height: 28px;
			font-size: 14px;
			line-height: 28px
		}

		.opened-contests-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 17px 0 21px;
			height: 35px;
			font-size: 14px;
			line-height: 35px
		}

		.opened-contests-panel .page-dailytasks .lp7-item__detail {
			margin: 11px auto 0;
			height: 44px;
			font-size: 13px
		}

		.opened-contests-panel .page-dailytasks .lp7 .lp__btn,
		.opened-contests-panel .page-dailytasks .lp7__text {
			display: none
		}
	}

	@media(max-width: 1597px) {
		.opened-left-panel.opened-right-panel .page-dailytasks .lp .content {
			padding: 0 22px;
			max-width: 375px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__title {
			margin: 0 auto 30px;
			max-width: none;
			font-size: 35px;
			line-height: 44px;
			text-align: center
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__img {
			position: relative;
			right: auto;
			left: 50%;
			top: -123px;
			transform: translate(-50%);
			width: 577px;
			height: 377px;
			margin: 0 0 0 -35px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1 {
			padding: 23px 0 56px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__cloud {
			position: absolute;
			right: auto !important;
			left: 50%;
			top: 34px !important;
			transform: translate(-53%) rotate(-27deg);
			width: 750px;
			margin: 0
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__cloud img {
			max-width: 100%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__list-img {
			margin: 0 0 7px;
			left: auto;
			top: auto
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__list-heading {
			margin: 0 -5px 10px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp-title {
			margin: 0 auto 19px;
			font-size: 35px;
			line-height: 45px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__items {
			margin: 0 auto;
			max-width: 331px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__items>* {
			padding: 0;
			width: 100%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__item {
			margin: 0 0 28px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp-heading {
			margin: 0 auto 37px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__items>:after {
			content: "";
			position: absolute;
			right: 50%;
			top: auto;
			bottom: -13px;
			transform: translate(50%) rotate(90deg)
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__btn,
		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__signs {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3 {
			padding: 11px 0 100px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items .glide__arrow {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items .glide__track {
			overflow: visible
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items-box>* {
			padding: 0 9px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__list {
			max-width: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_2 .lp1 {
			padding: 47px 0 0
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_2 .lp1__title {
			line-height: 41px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_2 .lp1__list-img {
			margin: 0 0 16px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_2 .lp2 {
			padding-top: 42px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_2 .lp1__list-text {
			margin: 0 10px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_2 .lp2 .lp-heading {
			margin-bottom: 49px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp4 .lp-title {
			margin: 0 20px 21px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp4 {
			padding: 25px 0 50px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp-toptextsm {
			font: 18px/1.45 "Montserrat";
			color: #9db8e1
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp4__coins {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp4 .lp-heading {
			margin: 0 auto 95px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp4__items {
			margin-bottom: -28px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3 {
			margin: 0 -22px;
			overflow: hidden
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items {
			max-width: 297px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items:after,
		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items:before {
			content: "";
			position: absolute;
			top: 0;
			width: 39px;
			height: 100%;
			z-index: 1
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items:before {
			left: -39px;
			background: linear-gradient(270deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items:after {
			right: -39px;
			background: linear-gradient(90deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__heading {
			margin-left: 22px;
			margin-right: 22px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 30px;
			line-height: 1.28
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .lp1__cloud,
		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .lp1__img,
		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .lp1__title br {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .lp1__text {
			margin: -14px auto 21px;
			text-align: center
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .lp1 .lp__btn {
			margin: 0 auto;
			width: 345px;
			max-width: 100%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .content {
			padding: 0 15px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__box>:first-child {
			margin: 0 0 22px;
			padding: 0;
			width: 100%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__box>:nth-child(2) {
			margin: 0 0 25px;
			padding: 0;
			width: 100%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__box>:nth-child(3) {
			width: 100%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__heading {
			text-align: center
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__complete-blocks,
		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__countdown-timer {
			margin: 0 auto
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__pickup {
			padding: 0;
			width: 100%;
			min-width: auto
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5 {
			padding: 0
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__box {
			padding: 21px 25px 20px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__pickup {
			margin: 0 auto
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-item__text {
			max-width: 210px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-item__box {
			padding-left: 25px;
			padding-right: 25px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_4 .lp1__title {
			font-size: 30px;
			line-height: 45px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_4 .lp1__cloud {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_4 .lp1__list-img {
			margin: 0 0 15px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_4 .lp1__list-heading {
			margin-bottom: 3px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_4 .content {
			padding: 0 15px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6 {
			padding: 32px 0 50px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__title {
			margin: 0 0 11px;
			font-size: 30px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__box {
			margin: 0 auto;
			padding: 52px 0 58px;
			max-width: 345px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__numbers-mob {
			position: relative;
			display: block;
			margin: 0 0 10px;
			font: 35px/1.2 "Montserrat";
			text-align: center;
			color: #fed700
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__numbers-box {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__sum {
			font-size: 18px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__bg>:first-child {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__bg>:nth-child(2) {
			display: inline-block
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__bg {
			top: -24px;
			margin: 0 0 0 1px;
			width: 383.5px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__box:before {
			display: none
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7 {
			padding: 43px 0 20px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7 .lp-title {
			line-height: 42px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7 .lp-title span {
			display: block
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7 .lp-heading {
			margin-bottom: 28px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7__items {
			margin: 0 auto;
			max-width: 345px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7__items>* {
			margin: 0 0 26px;
			width: 50%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7__items>:nth-child(2n-1) {
			padding: 0 8px 0 0
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7__items>:nth-child(2n) {
			padding: 0 0 0 8px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7-item__tag>* {
			padding: 0 27px 0 24px;
			height: 28px;
			font-size: 14px;
			line-height: 28px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 17px 0 21px;
			height: 35px;
			font-size: 14px;
			line-height: 35px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7-item__detail {
			margin: 11px auto 0;
			height: 44px;
			font-size: 13px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7 .lp__btn,
		.opened-left-panel.opened-right-panel .page-dailytasks .lp7__text {
			display: none
		}
	}

	@media(max-width: 1612px) {
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp .content {
			padding: 0 22px;
			max-width: 375px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__title {
			margin: 0 auto 30px;
			max-width: none;
			font-size: 35px;
			line-height: 44px;
			text-align: center
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__img {
			position: relative;
			right: auto;
			left: 50%;
			top: -123px;
			transform: translate(-50%);
			width: 577px;
			height: 377px;
			margin: 0 0 0 -35px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1 {
			padding: 23px 0 56px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__cloud {
			position: absolute;
			right: auto !important;
			left: 50%;
			top: 34px !important;
			transform: translate(-53%) rotate(-27deg);
			width: 750px;
			margin: 0
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__cloud img {
			max-width: 100%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__list-img {
			margin: 0 0 7px;
			left: auto;
			top: auto
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__list-heading {
			margin: 0 -5px 10px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp-title {
			margin: 0 auto 19px;
			font-size: 35px;
			line-height: 45px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__items {
			margin: 0 auto;
			max-width: 331px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__items>* {
			padding: 0;
			width: 100%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__item {
			margin: 0 0 28px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp-heading {
			margin: 0 auto 37px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__items>:after {
			content: "";
			position: absolute;
			right: 50%;
			top: auto;
			bottom: -13px;
			transform: translate(50%) rotate(90deg)
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__btn,
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__signs {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3 {
			padding: 11px 0 100px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items .glide__arrow {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items .glide__track {
			overflow: visible
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items-box>* {
			padding: 0 9px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__list {
			max-width: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_2 .lp1 {
			padding: 47px 0 0
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_2 .lp1__title {
			line-height: 41px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_2 .lp1__list-img {
			margin: 0 0 16px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_2 .lp2 {
			padding-top: 42px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_2 .lp1__list-text {
			margin: 0 10px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_2 .lp2 .lp-heading {
			margin-bottom: 49px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4 .lp-title {
			margin: 0 20px 21px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4 {
			padding: 25px 0 50px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp-toptextsm {
			font: 18px/1.45 "Montserrat";
			color: #9db8e1
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4__coins {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4 .lp-heading {
			margin: 0 auto 95px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4__items {
			margin-bottom: -28px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3 {
			margin: 0 -22px;
			overflow: hidden
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items {
			max-width: 297px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items:after,
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items:before {
			content: "";
			position: absolute;
			top: 0;
			width: 39px;
			height: 100%;
			z-index: 1
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items:before {
			left: -39px;
			background: linear-gradient(270deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items:after {
			right: -39px;
			background: linear-gradient(90deg, rgba(13, 19, 28, 0) 17.95%, #0d131c)
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__heading {
			margin-left: 22px;
			margin-right: 22px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 30px;
			line-height: 1.28
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .lp1__cloud,
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .lp1__img,
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .lp1__title br {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .lp1__text {
			margin: -14px auto 21px;
			text-align: center
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .lp1 .lp__btn {
			margin: 0 auto;
			width: 345px;
			max-width: 100%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .content {
			padding: 0 15px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__box>:first-child {
			margin: 0 0 22px;
			padding: 0;
			width: 100%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__box>:nth-child(2) {
			margin: 0 0 25px;
			padding: 0;
			width: 100%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__box>:nth-child(3) {
			width: 100%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__heading {
			text-align: center
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__complete-blocks,
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__countdown-timer {
			margin: 0 auto
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__pickup {
			padding: 0;
			width: 100%;
			min-width: auto
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5 {
			padding: 0
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__box {
			padding: 21px 25px 20px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__pickup {
			margin: 0 auto
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-item__text {
			max-width: 210px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-item__box {
			padding-left: 25px;
			padding-right: 25px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_4 .lp1__title {
			font-size: 30px;
			line-height: 45px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_4 .lp1__cloud {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_4 .lp1__list-img {
			margin: 0 0 15px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_4 .lp1__list-heading {
			margin-bottom: 3px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_4 .content {
			padding: 0 15px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6 {
			padding: 32px 0 50px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__title {
			margin: 0 0 11px;
			font-size: 30px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__box {
			margin: 0 auto;
			padding: 52px 0 58px;
			max-width: 345px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__numbers-mob {
			position: relative;
			display: block;
			margin: 0 0 10px;
			font: 35px/1.2 "Montserrat";
			text-align: center;
			color: #fed700
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__numbers-box {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__sum {
			font-size: 18px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__bg>:first-child {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__bg>:nth-child(2) {
			display: inline-block
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__bg {
			top: -24px;
			margin: 0 0 0 1px;
			width: 383.5px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__box:before {
			display: none
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7 {
			padding: 43px 0 20px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7 .lp-title {
			line-height: 42px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7 .lp-title span {
			display: block
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7 .lp-heading {
			margin-bottom: 28px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7__items {
			margin: 0 auto;
			max-width: 345px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7__items>* {
			margin: 0 0 26px;
			width: 50%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7__items>:nth-child(2n-1) {
			padding: 0 8px 0 0
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7__items>:nth-child(2n) {
			padding: 0 0 0 8px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7-item__tag>* {
			padding: 0 27px 0 24px;
			height: 28px;
			font-size: 14px;
			line-height: 28px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 17px 0 21px;
			height: 35px;
			font-size: 14px;
			line-height: 35px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7-item__detail {
			margin: 11px auto 0;
			height: 44px;
			font-size: 13px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7 .lp__btn,
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7__text {
			display: none
		}
	}

	@media(max-width: 576px) {
		.page-dailytasks .container {
			padding: 0 20px !important
		}
	}

	@media(max-width: 808px) {
		.opened-left-panel .page-dailytasks .container {
			padding: 0 20px !important
		}
	}

	@media(max-width: 901px) {
		.opened-right-panel .page-dailytasks .container {
			padding: 0 20px !important
		}
	}

	@media(max-width: 916px) {
		.opened-contests-panel .page-dailytasks .container {
			padding: 0 20px !important
		}
	}

	@media(max-width: 1133px) {
		.opened-left-panel.opened-right-panel .page-dailytasks .container {
			padding: 0 20px !important
		}
	}

	@media(max-width: 1148px) {
		.opened-left-panel.opened-contests-panel .page-dailytasks .container {
			padding: 0 20px !important
		}
	}

	@media(max-width: 375px) {
		.page-dailytasks .lp4__items>* {
			width: 50%
		}

		.page-dailytasks .lp4__item {
			width: 100%
		}
	}

	@media(max-width: 607px) {
		.opened-left-panel .page-dailytasks .lp4__items>* {
			width: 50%
		}

		.opened-left-panel .page-dailytasks .lp4__item {
			width: 100%
		}
	}

	@media(max-width: 700px) {
		.opened-right-panel .page-dailytasks .lp4__items>* {
			width: 50%
		}

		.opened-right-panel .page-dailytasks .lp4__item {
			width: 100%
		}
	}

	@media(max-width: 715px) {
		.opened-contests-panel .page-dailytasks .lp4__items>* {
			width: 50%
		}

		.opened-contests-panel .page-dailytasks .lp4__item {
			width: 100%
		}
	}

	@media(max-width: 932px) {
		.opened-left-panel.opened-right-panel .page-dailytasks .lp4__items>* {
			width: 50%
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp4__item {
			width: 100%
		}
	}

	@media(max-width: 947px) {
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4__items>* {
			width: 50%
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4__item {
			width: 100%
		}
	}

	@media(max-width: 767px) {
		.page-dailytasks .lp1__btn-block {
			text-align: center
		}

		.page-dailytasks .lp5__items {
			grid-row-gap: 0;
			row-gap: 0
		}
	}

	@media(max-width: 999px) {
		.opened-left-panel .page-dailytasks .lp1__btn-block {
			text-align: center
		}

		.opened-left-panel .page-dailytasks .lp5__items {
			grid-row-gap: 0;
			row-gap: 0
		}
	}

	@media(max-width: 1092px) {
		.opened-right-panel .page-dailytasks .lp1__btn-block {
			text-align: center
		}

		.opened-right-panel .page-dailytasks .lp5__items {
			grid-row-gap: 0;
			row-gap: 0
		}
	}

	@media(max-width: 1107px) {
		.opened-contests-panel .page-dailytasks .lp1__btn-block {
			text-align: center
		}

		.opened-contests-panel .page-dailytasks .lp5__items {
			grid-row-gap: 0;
			row-gap: 0
		}
	}

	@media(max-width: 1324px) {
		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__btn-block {
			text-align: center
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5__items {
			grid-row-gap: 0;
			row-gap: 0
		}
	}

	@media(max-width: 1339px) {
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__btn-block {
			text-align: center
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5__items {
			grid-row-gap: 0;
			row-gap: 0
		}
	}

	@media(max-width: 370px) {
		.page-dailytasks .lp4__item-heading {
			font-size: 16px
		}

		.page-dailytasks .lp2__item-num {
			transform: scale(.8);
			transform-origin: right center
		}

		.page-dailytasks .lp2__item {
			padding-left: 30px;
			padding-right: 10px
		}

		.page-dailytasks .lp2__item-img {
			margin-left: -8px
		}

		.page-dailytasks .lp3__items {
			max-width: 270px
		}

		.page-dailytasks .lp5-item__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.page-dailytasks .lp5-item_locked:after {
			bottom: 73px
		}

		.page-dailytasks .lp5-info__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.page-dailytasks .lp5-info__complete-block {
			margin: 0 4px 0 0
		}

		.page-dailytasks .lp_3 .lp1__title {
			font-size: 28px
		}

		.page-dailytasks .lp1__img_4 {
			margin-left: 16px;
			width: 330px
		}

		.page-dailytasks .lp6__bg {
			width: 350px
		}

		.page-dailytasks .lp7-item__trx>* {
			padding: 0 7px 0 10px
		}

		.page-dailytasks .lp7 .lp-title {
			font-size: 34px
		}
	}

	@media(max-width: 602px) {
		.opened-left-panel .page-dailytasks .lp4__item-heading {
			font-size: 16px
		}

		.opened-left-panel .page-dailytasks .lp2__item-num {
			transform: scale(.8);
			transform-origin: right center
		}

		.opened-left-panel .page-dailytasks .lp2__item {
			padding-left: 30px;
			padding-right: 10px
		}

		.opened-left-panel .page-dailytasks .lp2__item-img {
			margin-left: -8px
		}

		.opened-left-panel .page-dailytasks .lp3__items {
			max-width: 270px
		}

		.opened-left-panel .page-dailytasks .lp5-item__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-left-panel .page-dailytasks .lp5-item_locked:after {
			bottom: 73px
		}

		.opened-left-panel .page-dailytasks .lp5-info__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-left-panel .page-dailytasks .lp5-info__complete-block {
			margin: 0 4px 0 0
		}

		.opened-left-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 28px
		}

		.opened-left-panel .page-dailytasks .lp1__img_4 {
			margin-left: 16px;
			width: 330px
		}

		.opened-left-panel .page-dailytasks .lp6__bg {
			width: 350px
		}

		.opened-left-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 7px 0 10px
		}

		.opened-left-panel .page-dailytasks .lp7 .lp-title {
			font-size: 34px
		}
	}

	@media(max-width: 695px) {
		.opened-right-panel .page-dailytasks .lp4__item-heading {
			font-size: 16px
		}

		.opened-right-panel .page-dailytasks .lp2__item-num {
			transform: scale(.8);
			transform-origin: right center
		}

		.opened-right-panel .page-dailytasks .lp2__item {
			padding-left: 30px;
			padding-right: 10px
		}

		.opened-right-panel .page-dailytasks .lp2__item-img {
			margin-left: -8px
		}

		.opened-right-panel .page-dailytasks .lp3__items {
			max-width: 270px
		}

		.opened-right-panel .page-dailytasks .lp5-item__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-right-panel .page-dailytasks .lp5-item_locked:after {
			bottom: 73px
		}

		.opened-right-panel .page-dailytasks .lp5-info__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-right-panel .page-dailytasks .lp5-info__complete-block {
			margin: 0 4px 0 0
		}

		.opened-right-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 28px
		}

		.opened-right-panel .page-dailytasks .lp1__img_4 {
			margin-left: 16px;
			width: 330px
		}

		.opened-right-panel .page-dailytasks .lp6__bg {
			width: 350px
		}

		.opened-right-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 7px 0 10px
		}

		.opened-right-panel .page-dailytasks .lp7 .lp-title {
			font-size: 34px
		}
	}

	@media(max-width: 710px) {
		.opened-contests-panel .page-dailytasks .lp4__item-heading {
			font-size: 16px
		}

		.opened-contests-panel .page-dailytasks .lp2__item-num {
			transform: scale(.8);
			transform-origin: right center
		}

		.opened-contests-panel .page-dailytasks .lp2__item {
			padding-left: 30px;
			padding-right: 10px
		}

		.opened-contests-panel .page-dailytasks .lp2__item-img {
			margin-left: -8px
		}

		.opened-contests-panel .page-dailytasks .lp3__items {
			max-width: 270px
		}

		.opened-contests-panel .page-dailytasks .lp5-item__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-contests-panel .page-dailytasks .lp5-item_locked:after {
			bottom: 73px
		}

		.opened-contests-panel .page-dailytasks .lp5-info__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-contests-panel .page-dailytasks .lp5-info__complete-block {
			margin: 0 4px 0 0
		}

		.opened-contests-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 28px
		}

		.opened-contests-panel .page-dailytasks .lp1__img_4 {
			margin-left: 16px;
			width: 330px
		}

		.opened-contests-panel .page-dailytasks .lp6__bg {
			width: 350px
		}

		.opened-contests-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 7px 0 10px
		}

		.opened-contests-panel .page-dailytasks .lp7 .lp-title {
			font-size: 34px
		}
	}

	@media(max-width: 927px) {
		.opened-left-panel.opened-right-panel .page-dailytasks .lp4__item-heading {
			font-size: 16px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__item-num {
			transform: scale(.8);
			transform-origin: right center
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__item {
			padding-left: 30px;
			padding-right: 10px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp2__item-img {
			margin-left: -8px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp3__items {
			max-width: 270px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-item__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-item_locked:after {
			bottom: 73px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp5-info__complete-block {
			margin: 0 4px 0 0
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 28px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp1__img_4 {
			margin-left: 16px;
			width: 330px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp6__bg {
			width: 350px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 7px 0 10px
		}

		.opened-left-panel.opened-right-panel .page-dailytasks .lp7 .lp-title {
			font-size: 34px
		}
	}

	@media(max-width: 942px) {
		.opened-left-panel.opened-contests-panel .page-dailytasks .lp4__item-heading {
			font-size: 16px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__item-num {
			transform: scale(.8);
			transform-origin: right center
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__item {
			padding-left: 30px;
			padding-right: 10px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp2__item-img {
			margin-left: -8px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp3__items {
			max-width: 270px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-item__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-item_locked:after {
			bottom: 73px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__box {
			padding-bottom: 15px;
			padding-left: 15px;
			padding-right: 15px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp5-info__complete-block {
			margin: 0 4px 0 0
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp_3 .lp1__title {
			font-size: 28px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp1__img_4 {
			margin-left: 16px;
			width: 330px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp6__bg {
			width: 350px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7-item__trx>* {
			padding: 0 7px 0 10px
		}

		.opened-left-panel.opened-contests-panel .page-dailytasks .lp7 .lp-title {
			font-size: 34px
		}
	}
</style>
