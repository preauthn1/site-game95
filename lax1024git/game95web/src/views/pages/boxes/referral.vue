<template>
	<div class="referral">
		
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
			return {
				inputAddress:'https://cyberraccoon.io?r=invite_code',
			};
		},
		methods: {
			copyButton(){
				this.$copyText(this.inputAddress).then( e => {
      		this.successTips('Copy success');
					console.log(e)
				}, function (e) {
					console.log(e)
				})
			},
		}
	}
</script>
<style scoped>
	.referral__link-block /deep/ .el-input__suffix{
		height: 44px;
		display: flex;
		align-items: center;
	}
	.referral__account-table-column,
	.referral__account-table-column>span,
	.referral__row-detail-td,
	.referral__row-detail-td>span {
		text-overflow: ellipsis;
		overflow-x: hidden;
		white-space: nowrap
	}

	.referral__account-table-inner {
		scrollbar-color: #2a3546 rgba(13, 19, 28, .8);
		scrollbar-width: thin;
		overflow-y: auto
	}

	.referral__account-table-inner::-webkit-scrollbar,
	.referral__account-table-inner::-webkit-scrollbar-track {
		background-color: rgba(13, 19, 28, .8);
		border-radius: 2px
	}

	.referral__account-table-inner::-webkit-scrollbar {
		width: 4px;
		height: 4px
	}

	.referral__account-table-inner::-webkit-scrollbar-thumb {
		border-radius: 2px;
		background-color: #2a3546
	}

	a {
		color: #3a07f2;
		text-decoration: underline;
		padding: 0;
		border: none;
		cursor: pointer;
		transition: color .1s ease-in-out
	}

	a:hover {
		color: #3202de
	}

	@-webkit-keyframes spinAround-data-v-ffe6fec6 {
		0% {
			transform: rotate(0)
		}

		to {
			transform: rotate(359deg)
		}
	}

	@keyframes spinAround-data-v-ffe6fec6 {
		0% {
			transform: rotate(0)
		}

		to {
			transform: rotate(359deg)
		}
	}

	@media screen and (min-color-index:0)and (-webkit-min-device-pixel-ratio:0) {
		.button span {
			text-overflow: clip !important;
			overflow-x: visible !important;
			overflow-x: initial !important
		}
	}

	.menu-fade-enter-active,
	.menu-fade-leave-active {
		transition: opacity .1s ease-in-out, height .1s ease-in-out, padding .1s ease-in-out;
		overflow: hidden
	}

	.menu-fade-enter,
	.menu-fade-leave-to {
		opacity: 0;
		padding: 0 !important;
		height: 0 !important
	}

	.top-enter-active {
		transition: all .1s ease-in-out .3s
	}

	.top-leave-active {
		transition: all .05s ease-in-out 0s
	}

	.top-enter,
	.top-leave-to {
		transform: translateY(-5px);
		opacity: 0
	}

	.bottom-enter-active {
		transition: all .1s ease-in-out .3s
	}

	.bottom-leave-active {
		transition: all .05s ease-in-out 0s
	}

	.bottom-enter,
	.bottom-leave-to {
		transform: translateY(5px);
		opacity: 0
	}

	.left-enter-active {
		transition: all .1s ease-in-out .3s
	}

	.left-leave-active {
		transition: all .05s ease-in-out 0s
	}

	.left-enter,
	.left-leave-to {
		transform: translateX(-5px);
		opacity: 0
	}

	.right-enter-active {
		transition: all .1s ease-in-out .3s
	}

	.right-leave-active {
		transition: all .05s ease-in-out 0s
	}

	.right-enter,
	.right-leave-to {
		transform: translateX(5px);
		opacity: 0
	}

	.dropdown-top-enter-active {
		transition: all .1s ease-in-out
	}

	.dropdown-top-leave-active {
		transition: all .05s ease-in-out
	}

	.dropdown-top-enter,
	.dropdown-top-leave-to {
		transform: translateY(-5px) !important;
		opacity: 0
	}

	.dropdown-bottom-enter-active {
		transition: all .1s ease-in-out
	}

	.dropdown-bottom-leave-active {
		transition: all .05s ease-in-out
	}

	.dropdown-bottom-enter,
	.dropdown-bottom-leave-to {
		transform: translateY(5px) !important;
		opacity: 0
	}

	.referral__details {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 60px
	}

	@media(max-width:767px) {
		.referral__details {
			flex-direction: column
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__details {
			flex-direction: column
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__details {
			flex-direction: column
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__details {
			flex-direction: column
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__details {
			flex-direction: column
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__details {
			flex-direction: column
		}
	}

	.referral__balance {
		position: relative;
		width: 35%;
		padding: 24px;
		background: linear-gradient(180deg, #003370, #03254e 11.76%, #051d39 21.85%, #111923 33.54%);
		border-radius: 14px;
		margin-right: 24px
	}

	@media(max-width:767px) {
		.referral__balance {
			width: 100%;
			margin-right: 0;
			margin-bottom: 24px
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__balance {
			width: 100%;
			margin-right: 0;
			margin-bottom: 24px
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__balance {
			width: 100%;
			margin-right: 0;
			margin-bottom: 24px
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__balance {
			width: 100%;
			margin-right: 0;
			margin-bottom: 24px
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__balance {
			width: 100%;
			margin-right: 0;
			margin-bottom: 24px
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__balance {
			width: 100%;
			margin-right: 0;
			margin-bottom: 24px
		}
	}

	.referral__lock {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(22, 31, 44, .95);
		border-radius: 14px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		grid-gap: 15px;
		gap: 15px;
		z-index: 1
	}

	.referral__lock:before {
		content: "";
		position: absolute;
		top: 21%;
		width: 152px;
		height: 152px;
		border-radius: 50%;
		background: radial-gradient(50% 50% at 50%, at 50%, rgba(237, 29, 73, 0) 0, rgba(237, 29, 73, .7) 41.15%, rgba(237, 29, 73, 0) 100%);
		background: radial-gradient(50% 50% at 50% 50%, rgba(237, 29, 73, 0) 15.42%, rgba(237, 29, 73, .7) 41.15%, rgba(237, 29, 73, 0) 100%);
		filter: blur(32px)
	}

	.referral__lock-image {
		width: 91px;
		height: 91px;
		position: relative
	}

	.referral__lock-desc {
		width: 220px;
		text-align: center;
		font-weight: 600;
		font-size: 18px;
		line-height: 24px
	}

	.referral__balance-buttons {
		display: flex;
		grid-gap: 10px;
		gap: 10px;
		margin-bottom: 24px
	}

	.referral__balance-button {
		padding: 7px 10px;
		color: #93acd3;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		text-transform: capitalize
	}

	.referral__balance-button--active {
		color: #fff;
		background: #3a07f2;
		border-radius: 16px
	}

	.referral__balance-details {
		display: flex;
		flex-direction: column
	}

	.referral__balance-sum {
		margin-top: 16px
	}

	.referral__balance-sum .font-digits {
		font-size: 18px
	}

	.referral__withdraw {
		margin-top: 24px
	}

	.referral__link-block {
		width: 65%;
		padding: 24px;
		background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
		border-radius: 14px
	}

	@media(max-width:767px) {
		.referral__link-block {
			width: 100%
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__link-block {
			width: 100%
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__link-block {
			width: 100%
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__link-block {
			width: 100%
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__link-block {
			width: 100%
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__link-block {
			width: 100%
		}
	}

	.referral__link-title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		margin: 0 0 16px;
		text-transform: capitalize
	}

	.referral__share-title {
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		margin: 24px 0 8px
	}

	.referral__share-block {
		display: flex;
		align-items: center;
		justify-content: space-between
	}

	@media(max-width:767px) {
		.referral__share-block {
			flex-direction: column;
			align-items: flex-start
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__share-block {
			flex-direction: column;
			align-items: flex-start
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__share-block {
			flex-direction: column;
			align-items: flex-start
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__share-block {
			flex-direction: column;
			align-items: flex-start
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__share-block {
			flex-direction: column;
			align-items: flex-start
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__share-block {
			flex-direction: column;
			align-items: flex-start
		}
	}

	.referral__social-links {
		display: flex
	}

	.referral__social-links .social-icons {
		margin-right: .5em
	}

	@media(max-width:767px) {
		.referral__social-links {
			margin-bottom: 16px
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__social-links {
			margin-bottom: 16px
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__social-links {
			margin-bottom: 16px
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__social-links {
			margin-bottom: 16px
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__social-links {
			margin-bottom: 16px
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__social-links {
			margin-bottom: 16px
		}
	}

	.referral__download {
		font-weight: 600;
		font-size: 11px;
		line-height: 16px;
		color: #3a07f2;
		text-decoration: none
	}

	.referral__input-link {
		position: relative;
		padding: 13px 40px 13px 13px;
		border: 2px solid #2a3546;
		border-radius: 10px;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		color: #55657e;
		cursor: pointer
	}

	.referral__copy-block {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 24px;
		height: 24px;
		background: #3a07f2;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center
	}

	.referral__copy-ico {
		fill: #fff
	}

	.referral__program-title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		margin: 12px 0
	}

	.referral__program-desc {
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: #93acd3
	}

	.referral__box {
		position: relative;
		padding: 32px 80px 32px 420px;
		background: #111923;
		border-radius: 14px;
		margin-top: 50px;
		margin-bottom: 24px
	}

	@media(max-width:1000px) {
		.referral__box {
			padding-left: 350px;
			padding-right: 30px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .referral__box {
			padding-left: 350px;
			padding-right: 30px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .referral__box {
			padding-left: 350px;
			padding-right: 30px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .referral__box {
			padding-left: 350px;
			padding-right: 30px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .referral__box {
			padding-left: 350px;
			padding-right: 30px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .referral__box {
			padding-left: 350px;
			padding-right: 30px
		}
	}

	@media(max-width:767px) {
		.referral__box {
			padding: 175px 24px 24px
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__box {
			padding: 175px 24px 24px
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__box {
			padding: 175px 24px 24px
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__box {
			padding: 175px 24px 24px
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__box {
			padding: 175px 24px 24px
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__box {
			padding: 175px 24px 24px
		}
	}

	.referral__box-info {
		position: relative
	}

	.referral__box-img-block {
		position: absolute;
		bottom: 0;
		pointer-events: none;
		left: 20px;
		height: 176px
	}

	@media(max-width:767px) {
		.referral__box-img-block {
			bottom: auto;
			left: 20px;
			transform: none;
			top: -25px
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__box-img-block {
			bottom: auto;
			left: 20px;
			transform: none;
			top: -25px
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__box-img-block {
			bottom: auto;
			left: 20px;
			transform: none;
			top: -25px
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__box-img-block {
			bottom: auto;
			left: 20px;
			transform: none;
			top: -25px
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__box-img-block {
			bottom: auto;
			left: 20px;
			transform: none;
			top: -25px
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__box-img-block {
			bottom: auto;
			left: 20px;
			transform: none;
			top: -25px
		}
	}

	.referral__box-image {
		width: 100%;
		height: 100%;
		pointer-events: none
	}

	.referral__box-bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 300px;
		height: 100%;
		pointer-events: none;
		background-repeat: no-repeat;
		background-image: url(/_nuxt/img/card-bg-blue.fc77434.png);
		border-radius: 0 0 0 14px
	}

	@media(max-width:767px) {
		.referral__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__box-bg {
			height: 150px;
			width: 100%;
			background-size: 100% 150px;
			background-image: url(/_nuxt/img/card-bg-blue-mob.fa8be63.png)
		}
	}

	.referral__box-title {
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		margin: 0 0 8px
	}

	.referral__box-title-help {
		color: #ffb636
	}

	.referral__box-desc {
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: #93acd3;
		margin: 0
	}

	.referral__box-promo {
		position: absolute;
		left: 250px;
		top: 50%;
		transform: translate(-25%, -50%)
	}

	@media(max-width:1000px) {
		.referral__box-promo {
			left: 220px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .referral__box-promo {
			left: 220px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .referral__box-promo {
			left: 220px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .referral__box-promo {
			left: 220px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .referral__box-promo {
			left: 220px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .referral__box-promo {
			left: 220px
		}
	}

	@media(max-width:767px) {
		.referral__box-promo {
			left: 250px;
			top: 0;
			transform: translate(-50%, 80%)
		}
	}

	@media(max-width:999px) {
		.opened-left-panel .referral__box-promo {
			left: 250px;
			top: 0;
			transform: translate(-50%, 80%)
		}
	}

	@media(max-width:1092px) {
		.opened-right-panel .referral__box-promo {
			left: 250px;
			top: 0;
			transform: translate(-50%, 80%)
		}
	}

	@media(max-width:1107px) {
		.opened-contests-panel .referral__box-promo {
			left: 250px;
			top: 0;
			transform: translate(-50%, 80%)
		}
	}

	@media(max-width:1324px) {
		.opened-left-panel.opened-right-panel .referral__box-promo {
			left: 250px;
			top: 0;
			transform: translate(-50%, 80%)
		}
	}

	@media(max-width:1339px) {
		.opened-left-panel.opened-contests-panel .referral__box-promo {
			left: 250px;
			top: 0;
			transform: translate(-50%, 80%)
		}
	}

	.referral__box-promo-label {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		color: #3a07f2;
		white-space: nowrap;
		margin: 0 0 6px
	}

	.referral__box-promo-value {
		font-weight: 700;
		font-size: 48px;
		line-height: 36px;
		color: #ffb636;
		margin: 0
	}

	.referral__box-label {
		position: absolute;
		right: 0;
		top: 0
	}

	.referral__table-title {
		font-weight: 700;
		font-size: 30px;
		line-height: 29px;
		text-transform: uppercase;
		margin: 50px 0 10px
	}

	.referral__row-detail {
		width: 100%
	}

	.referral__row-detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.referral__row-detail-td {
		height: 57px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-weight: 600;
		font-size: 15px;
		padding-right: 10px;
		overflow: hidden
	}

	.referral__row-detail-td:last-child {
		padding-right: 0
	}

	.referral__row-detail-td>span {
		font-size: inherit
	}

	.referral__account-table-inner {
		overflow-x: auto
	}

	.referral__account-table-head {
		display: flex;
		height: 57px;
		color: #55657e
	}

	.referral__account-table-row {
		border-top: 1px solid rgba(85, 101, 126, .18)
	}

	.referral__account-table-row-inner {
		display: flex;
		justify-content: space-between
	}

	.referral__account-table-column {
		min-width: 200px;
		height: 57px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-weight: 600;
		font-size: 15px;
		padding-right: 10px;
		overflow: hidden;
		position: relative
	}

	@media(max-width:767.98px) {
		.referral__account-table-column {
			font-size: 12px;
			white-space: normal
		}
	}

	.referral__account-table-column:last-child {
		padding-right: 0
	}

	.referral__account-table-column>span {
		font-size: inherit
	}

	.referral__account-table-column .icon-arrow {
		transition: all .3s
	}

	.referral__account-table-column .icon-arrow.opened {
		transform: rotate(180deg)
	}

	.referral__account-table .user {
		display: flex;
		align-items: center
	}

	.referral__account-table .user img {
		width: 25px;
		height: 25px;
		margin-right: 5px
	}

	.referral__account-table .user span {
		font-weight: 600;
		font-size: 12px;
		color: #fff
	}

	.referral__table-affilate .referral__account-table-row {
		cursor: pointer
	}

</style>
