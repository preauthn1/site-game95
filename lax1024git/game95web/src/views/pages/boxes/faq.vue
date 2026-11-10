<template>
	<div class="faq-items">
		<div class="faq-items__column">
			<div class="faq-element" @click="faqClick(item)" v-for="(item,index) in faqListleft" :key="index" :class="item.select?'faq-show':''">
				<div class="faq-element__wrapper">
					<h3 class="faq-element__title">
						{{ $t(item.title) }}
					</h3>
					<div class="faq-element__icon-block">
						<svgIcon className="faq-element__icon-arrow" icon="icon-arrow-down" widthName="20" heightName="20"></svgIcon>
					</div>
				</div>
				<p class="faq-element__description" v-html="$t('fund_faq_' + item.id)"></p>
			</div>
		</div>
		<div class="faq-items__column">
			<div class="faq-element" @click="faqClick(item)" v-for="(item,index) in faqListright" :key="index" :class="item.select?'faq-show':''">
				<div class="faq-element__wrapper">
					<h3 class="faq-element__title">
						{{ $t(item.title) }}
					</h3>
					<div class="faq-element__icon-block">
						<svgIcon className="faq-element__icon-arrow" icon="icon-arrow-down" widthName="20" heightName="20"></svgIcon>
					</div>
				</div>
				<p class="faq-element__description" v-html="$t('fund_faq_' + item.id)"></p>
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
				faqCur:0,
				faqList:[
					{
						id:0,
						title:'Cyber Raccoon 收益池是什么？',
						content:'由游戏奖金组成的架构。',
						select: false
					},{id:1,
						title:'加入Cyber Raccoon 收益池有什么好处？',
						content:'可以获得一定比例的投资收益。',
						select: false
					},{id:2,
						title:'Cyber Raccoon 收益池 投资提现规则是?',
						content:'Cyber Raccoon VIP Club 解鎖以下好處：<br>- 直接來自團隊的第一手資訊；<br>-每週、每月、生日和其他獎金；<br>- 更高的推薦率；<br>-特別的VIP活動和戰鬥；<br>專門的個人經理以個性化的方式解決您可能面臨的任何問題。',
						select: false
					},{id:3,
						title:'如何加入Cyber Raccoon 收益池？',
						content:'唯一影響您的獎金的是您的遊戲活動 - 您玩的越多，您獲得的越多。例外是生日獎金，當然它無論如何都會發送給使用者。',
						select: false
					},{id:4,
						title:'Cyber Raccoon 收益池的产品收益率不高?',
						content:'您需要聯絡一位 VIP 經理。如果檢測到高活躍度，團隊可能會考慮讓您在達到必要等級之前成為 VIP 俱樂部的一員。',
						select: false
					},{id:5,
						title:'Cyber Raccoon 收益池风险性？',
						content:'是的，有很多。您的經理會親自詳細告知您其他所有事情。',
						select: false
					}
				],
			};
		},
		methods: {
			faqClick(item) {
				if (!item.select) {
					for (let i = 0; i < this.faqList.length; i++) {
						this.faqList[i].select = false
					}
					item.select = true;
				} else {
					item.select = false;
				}
			},
		}
	}
</script>
<style scoped>

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
