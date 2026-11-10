<template>
	<main>
		<div class="mirrors">
			<div class="mirrors__logo-link">
				<a  href="">
					<picture class="logo__picture">
						<img :src="require('@/assets/images/'+$store.state.siteLogo)"  width="142px" class="logo__img">
					</picture>
				</a>
			</div>
			<main class="mirrors__content">
				<div class="mirrors__content-left">
					<h1 class="mirrors__content-title">
						<span>{{ $t('Cyber Raccoon') }} </span>{{ $t('Official Mirror Sites') }}
					</h1>
					<p class="mirrors__content-subtitle">{{ $t('Have any issues connecting to Cyber Raccoon? Use one of our mirror sites') }}</p>
					<div class="domains mirrors__mob-domains">
						<img src="../../assets/images/racoon.png" alt="" class="domains__raccoon desktop">
						<ul class="domains__list-domains">
							<li class="domains__list-title">
								<span>{{ $t('Domain') }}</span>
								<span>{{ $t('Status') }}</span>
							</li>
							<li class="domains__list-item" v-for="(row,index) in urls" :key="`url${index}`">
								<div class="domains__list-item-left">
									<img src="../../assets/images/network.svg" alt="" class="domains__list-item-img">
									<a target="_blank" rel="noopener noreferrer" :href="`https://${row.url}`" class="domains__list-item-href">{{ row.url }}</a>
								</div>
								<span class="domains__list-item-online">
									<img src="../../assets/images/dui.png" alt=""> {{ $t(row.status) }}
								</span>
							</li>
						</ul>
					</div>
					<aside class="mirrors__aside">
						<h6 class="mirrors__aside-title">{{ $t('What is a mirror site?') }}</h6>
						<p class="mirrors__aside-description">{{ $t('mirror_desc') }} </p>
					</aside>
					<div class="footer-social-icons">
						<a :href="isMobileFlag?helper.get('rule').mobile_service_url:helper.get('rule').pc_service_url" v-if="this.$t('telegram_is_hidden')!=1"
 target="_blank" class="footer-social-icons__icon telegram">
							<div class="footer-social-icons__tooltip"> Telegram </div>
							<svgIcon widthName="16" heightName="16" icon="icon-telegram" className="footer-social-icons__svg"></svgIcon>
						</a>
						<a :href="$t('instagram_public_url')" target="_blank" v-if="this.$t('instagram_public_url') != 'instagram_public_url'"
							class="footer-social-icons__icon instagram">
							<div class="footer-social-icons__tooltip"> Instagram </div>
							<svgIcon widthName="16" heightName="16" icon="icon-instagram" className="footer-social-icons__svg"></svgIcon>
						</a>
						<a :href="$t('facebook_public_url')" target="_blank" v-if="this.$t('facebook_public_url') != 'facebook_public_url'"
							class="footer-social-icons__icon bitcointalk">
							<div class="footer-social-icons__tooltip"> Facebook </div>
							<svgIcon widthName="16" heightName="16" icon="icon-facebook" className="footer-social-icons__svg"></svgIcon>
						</a>
						<a :href="$t('tiktok_public_url')" target="_blank" v-if="this.$t('tiktok_public_url') != 'tiktok_public_url'"
							class="footer-social-icons__icon tiktok">
							<div class="footer-social-icons__tooltip"> Tiktok </div>
							<svgIcon widthName="16" heightName="16" icon="icon-tiktok" className="footer-social-icons__svg"></svgIcon>

						</a>
						<a :href="$t('line_public_url')" target="_blank" v-if="this.$t('line_public_url') != 'line_public_url'"
							class="footer-social-icons__icon discord">
							<div class="footer-social-icons__tooltip"> Line </div>
							<svgIcon widthName="16" heightName="16" icon="icon-line" className="footer-social-icons__svg"></svgIcon>

						</a>
					</div>
				</div>
				<div class="domains desktop">
					<img src="../../assets/images/racoon.png" alt="" class="domains__raccoon desktop">
					<ul class="domains__list-domains">
						<li class="domains__list-title">
							<span>{{ $t('Domain') }}</span>
							<span>{{ $t('Status') }}</span>
						</li>
						<li class="domains__list-item" v-for="(row,index) in urls" :key="`url${index}`">
							<div class="domains__list-item-left">
								<img src="../../assets/images/network.svg" alt="" class="domains__list-item-img">
								<a target="_blank" rel="noopener noreferrer" :href="`https://${row.url}`" class="domains__list-item-href">{{ row.url }}</a>
							</div>
							<span class="domains__list-item-online"> <img src="../../assets/images/dui.png"> {{ $t(row.status) }} </span>
						</li>
					</ul>
				</div>
			</main>
		</div>
	</main>
</template>

<script>
	import svgIcon from '@/components/svg.vue'
	import helper from "@/common/helper";
	export default {
		components: {
			svgIcon
		},
		data() {
			return {
				urls: [
					{url:this.$t('镜像域名1'), status:'Online'},
					{url:this.$t('镜像域名2'), status:'Online'},
					{url:this.$t('镜像域名3'), status:'Online'},
				]
			};
		},
		methods: {},
		mounted() {},
	}
</script>
<style scoped>
	body {
		color: #fff;
		background-color: #111923;
		font-family: sans-serif
	}

	h1 {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px
	}

	ul {
		list-style: none;
		padding: 0
	}

	li {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.desktop {
		display: flex
	}

	@media(max-width: 1024px) {
		.desktop {
			display: none
		}
	}

	.mirrors {
		margin: 37px auto;
		max-width: 1024px
	}

	@media(max-width: 1024px) {
		.mirrors {
			margin: 24px 16px
		}
	}

	.mirrors__logo-link {
		margin-bottom: 200px
	}

	@media(max-width: 1024px) {
		.mirrors__logo-link {
			margin-bottom: 0
		}
	}

	.mirrors__content {
		display: flex;
		flex-direction: row;
		align-items: flex-end
	}

	@media(max-width: 1024px) {
		.mirrors__content {
			flex-direction: column;
			align-items: flex-start
		}
	}

	.mirrors__content-left {
		width: 50%;
		margin-right: 16px
	}

	@media(max-width: 1024px) {
		.mirrors__content-left {
			width: 100%;
			margin: 0
		}
	}

	.mirrors__content-left span {
		margin-right: 4px
	}

	.mirrors__content-right {
		width: 50%;
		position: relative
	}

	@media(max-width: 1024px) {
		.mirrors__content-right {
			width: 100%
		}
	}

	.mirrors__content-right-raccoon {
		position: absolute;
		top: 0;
		width: 190px;
		left: 50%;
		transform: translate(-50%, -85%)
	}

	.mirrors__content-title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px
	}

	@media(max-width: 1024px) {
		.mirrors__content-title {
			margin: 8px 0
		}
	}

	.mirrors__content-subtitle {
		font-weight: 600;
		font-size: 16px;
		margin: 1em 0;
		line-height: 20px
	}

	@media(max-width: 1024px) {
		.mirrors__content-subtitle {
			margin: 8px 0 20px
		}
	}

	@media(min-width: 1024px) {
		.mirrors__mob-domains {
			display: none
		}
	}

	.mirrors__aside {
		border-left: 2px solid #3a07f2;
		padding-left: 12px;
		margin-bottom: 1em;
	}

	@media(max-width: 1024px) {
		.mirrors__aside {
			margin: 24px 0 20px
		}
	}

	.mirrors__aside-title {
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 1em;
	}

	.mirrors__aside-description {
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: #93acd3
	}

	.domains {
		width: 50%;
		position: relative
	}

	@media(max-width: 1024px) {
		.domains {
			width: 100%
		}
	}

	.domains__raccoon {
		position: absolute;
		top: 0;
		width: 190px;
		left: 50%;
		transform: translate(-50%, -85%)
	}

	.domains__list-domains {
		width: 100%;
		margin: 0;
		background: #161f2c;
		border-radius: 10px;
		padding: 16px;
		box-sizing: border-box
	}

	.domains__list-title {
		padding-bottom: 8px;
		font-weight: 600;
		font-size: 11px;
		line-height: 16px;
		color: #55657e;
		margin-right: 30px
	}

	.domains__list-item {
		border-top: 1px solid #202a39;
		padding: 11px 0;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px
	}

	.domains__list-item-left {
		display: flex
	}

	.domains__list-item-img {
		margin-right: 6px
	}

	.domains__list-item-href {
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		color: #1d65bb;
		text-decoration: none
	}

	.domains__list-item-href:hover {
		color: #287ce1
	}

	.domains__list-item-online {
		color: #2ddc4b;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px
	}

	.domains__list-item-online :first-child {
		height: 7px;
		width: 10px;
		margin-right: 8px
	}

	.domains__list-item-offline {
		color: #fa305c;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px
	}

	.domains__list-item-offline :first-child {
		height: 8px;
		width: 8px;
		margin-right: 8px
	}

	.footer-social-icons {
		display: flex
	}

	@media(max-width: 750px) {
		.footer-social-icons {
			flex-wrap: wrap;
			justify-content: center
		}

		.footer-social-icons .footer-social-icons__icon {
			margin: 5px 8px 5px 0
		}
	}

	.footer-social-icons__tooltip {
		pointer-events: none;
		position: absolute;
		bottom: calc(100% + 8px);
		font-weight: 500;
		font-size: 9px;
		color: #9cb3df;
		background-color: #364564;
		border-radius: 100px;
		padding: 2px 5px;
		opacity: 0;
		transform: translateY(50%);
		transition: all .3s
	}

	.footer-social-icons__svg {
		fill: #768aae;
		width: 16px;
		height: 16px;
		margin-bottom: 2px;
		transition: fill .3s
	}

	.footer-social-icons__label {
		color: #9cb3df;
		font-size: 6px;
		text-align: center;
		transition: color .3s
	}

	.footer-social-icons__icon {
		position: relative;
		width: 32px;
		height: 32px;
		margin-right: 8px;
		text-decoration: none;
		background-color: #2a3546;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition: background-color .3s
	}

	.footer-social-icons__icon:last-child {
		margin-right: 0
	}

	.footer-social-icons__icon:hover .footer-social-icons__tooltip {
		opacity: 1;
		transform: translateY(0)
	}

	.footer-social-icons__icon:hover .footer-social-icons__label {
		color: #fff
	}

	.footer-social-icons__icon:hover .footer-social-icons__svg {
		fill: #fff
	}

	.footer-social-icons__icon.telegram:hover {
		background-color: #24a2df
	}

	.footer-social-icons__icon.twitter:hover {
		background-color: #1da1f2
	}

	.footer-social-icons__icon.instagram:hover {
		background-color: #e74969
	}

	.footer-social-icons__icon.steemit:hover {
		background-color: #00eeb7
	}

	.footer-social-icons__icon.reddit:hover {
		background-color: #ff4401
	}

	.footer-social-icons__icon.bitcointalk:hover {
		background-color: #f7931a
	}

	.footer-social-icons__icon.youtube:hover {
		background-color: red
	}

	.footer-social-icons__icon.tiktok:hover {
		background-color: #00ded9
	}

	.footer-social-icons__icon.discord:hover {
		background-color: #5865f2
	}
	.mirrors__content-title span{
		color: #fa305c;
	}
</style>
