<template>
	<div class="app" :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">

		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<div class="top-img-wapper" :style="{ backgroundImage: `url(${$t('download_top_img')})` }"
						v-if="$t('download_top_img') != 'download_top_img'">
						<!-- <div class="top-img-txt">
							{{ $t('首次下载APP') }}, <br>
							{{ $t("立即获得28P的免费彩金") }}
						</div> -->
					</div>
					<div class="tips"
						v-if="$t('download_top_img') != 'download_top_img' && $t('download_service_url') != 'hide'">
						<span @click="toLiveSuppert">{{ $t("请联系客服引导领取") }}</span>
					</div>
					<div class="download-main">
						<div class="warning-bar " v-if="isMobileFlag">
							<!-- <span class="iconfont icon-warning"></span> -->
							<img src="@/assets/images/safe.png" class="safe-icon">

							<div class="flex_bd">
								<span>{{ $t("download_tip") }}</span>
							</div>
						</div>
						<!-- <div class="download-row " >
							<div class="download-pic" v-if="this.$t('download_pic_a') != 'download_pic_a'">
								<img :src="$t('download_pic_a')" alt="">
							</div>
							<div class="download-pic" v-if="this.$t('download_pic_b') != 'download_pic_b'">
								<img :src="$t('download_pic_b')" alt="">
							</div>
							<div class="download-pic" v-if="this.$t('download_pic_c') != 'download_pic_c'">
								<img :src="$t('download_pic_c')" alt="">
							</div>
						</div> -->
						<div class="download-pc">
							<div class="d-head">
								<span class="iconfont icon-xz"></span><span>{{ $t("Download for application") }}</span>
							</div>
							<div class="download-cell">
								<div class="download-grid">
									<template v-if="!isMobileFlag">
										<div class="download-code">
											<div class="code-cell">
												<vue-qr :logo-src="logoSrc" v-if="downloadUrl" :size="191" :margin="0"
													:auto-color="true" :dot-scale="1" :text="downloadUrl" />
											</div>
										</div>
										<div class="copy-bar">
											<div class="flex_bd">
												<div class="copy-value">{{ downloadUrl }}</div>
											</div>
											<div class="button button_blue copy-button" v-clipboard:copy="downloadUrl"
												v-clipboard:success="getRecUrl">
												<img :src="isCopy ? require('@/assets/images/download/copy-ok.png') : require('@/assets/images/download/copy.png')"
													alt="">
											</div>
										</div>
									</template>

									<div class="warning-bar" v-if="!isMobileFlag">
										<!-- <span class="iconfont icon-warning"></span> -->
										<img src="@/assets/images/safe.png" class="safe-icon">
										<div class="flex_bd">
											<span>{{ $t("download_tip") }}</span>
										</div>
									</div>
								</div>
								<div class="flex_bd">
									<div class="download-text" v-if="!isMobileFlag">
										<div class="text">{{ $t('Cyber Raccoon') }}</div>
										<div class="text"><span class="text-red">{{ $t('主要的') }}</span> {{ $t('加密赌场') }}</div>
									</div>
									<div class="download-foot" v-if="!isMobileFlag">
										<el-button class=" button_fullwidth"
											:class="tabcur == 'Android' ? 'button_blue' : 'button_grey1'"
											@click="tabclick('Android')">
											<span class="iconfont icon-anzhuo"></span><span class="label">Android</span>
										</el-button>
										<el-button class=" button_fullwidth"
											:class="tabcur == 'IOS' ? 'button_blue' : 'button_grey1'" @click="tabclick('IOS')">
											<span class="iconfont icon-ios"></span><span class="label">IOS</span>
										</el-button>
									</div>
									<div class="download-foot" v-else>
										<el-button class="button_blue button_fullwidth"
											@click="platUrl(downloadInfo.android_download_url)">
											<span class="iconfont icon-anzhuo"></span><span class="label">Android</span>
										</el-button>
										<el-button class="button_grey1 button_fullwidth" @click="iosDownload">
											<span class="iconfont icon-ios"></span><span class="label">IOS</span>
										</el-button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Foot />
		</div>
		<asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
		<tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
		<div class="app-overlay" v-if="isMobileFlag" :class="openedleft ? 'visible' : ''" @click="menuClick"></div>
	</div>
</template>

<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import { doanload_api } from "@/api/index";
import VueQr from 'vue-qr'
export default {
	name: "download",
	components: {
		Head,
		Foot,
		asidebar,
		svgIcon,
		tabbar,
		VueQr
	},
	data() {
		return {
			isCopy: false,
			downloadInfo: [],
			logoSrc: process.env.VUE_APP_M_SITE_LOGO,
			downloadUrl: '',
			tabcur: 'Android',
			iosBut: 0,
		};
	},
	methods: {
		menuClick() {
			this.openedleft = !this.openedleft;
		},
		contestsShow() {
			this.openedcontests = true;
		},
		getRecUrl() {
			this.isCopy = true
			this.successTips('复制成功');
		},
		tabclick(e) {
			let rule = this.$helper.get("rule");
			this.downloadInfo = rule
			this.tabcur = e
			if (e == "Android") {
				this.downloadUrl = rule.android_download_url
			} else {
				this.downloadUrl = rule.ios_download_url
			}
		},
		toLiveSuppert() {
			const ua = navigator.userAgent
			let service_url = this.$t('service_url');
			if (/android/i.test(ua) || /iphone|ipad|ipod/i.test(ua)) {
				service_url = this.$t('mobile_service_url');
				if (/android/i.test(ua)) {
					window.open(service_url, '_blank');
				} else {
					window.location.href = service_url;
				}
			} else {
				window.open(service_url, '_blank');
			}
		},
		getDownloadInfo() {
			let rule = this.$helper.get("rule");
			this.downloadInfo = rule
			this.downloadUrl = rule.android_download_url
		},
		iosDownload() {
			if (this.iosBut == 0) {
				window.location.href = this.downloadInfo.ios_download_url;
				this.iosBut = 1;
			} else {
				window.location.href = "https://www.pgyer.com/app/getProvisionFile";
			}
		},
	},
	mounted() {
		this.getDownloadInfo()
	},
	created() {
		this.isPhone();
	}
};
</script>
<style scoped>
.download-main {
	max-width: 760px;
	margin: 0 auto;
}

.download-row {
	display: flex;
	justify-content: space-between;
	overflow: hidden;
}

.download-pic {
	overflow: hidden;
}

.download-pic:nth-child(odd) {
	padding-top: 30px;
}

.download-pic img {
	width: 180px;
}

.download-pc {
	padding: 30px 0;
}

.d-head {
	margin-bottom: 30px;
	color: #8795B0;
	font-size: 17px;
}

.d-head .iconfont {
	margin-right: 5px;
	font-size: 18px;
}

.download-cell {
	display: flex;
	align-items: center;
}

.download-code {
	display: flex;
	align-items: center;
	text-align: center;
}

.download-code .code-cell {
	flex: 1;
	text-align: center;
}

.download-code img {
	width: 120px;
	height: 120px;
	padding: 8px;
	background-color: #fff;
	border-radius: 8px;
}

.download-code .code-label {
	margin-top: 10px;
	color: #8795B0;
}

.m-t-30 {
	margin-top: 30px;
}

.download-grid {
	width: 420px;
	margin-right: 40px;
}

.copy-bar {
	display: flex;
	align-items: center;
	background: #243349;
	border-radius: 40px;
	height: 40px;
	margin-top: 30px;
}

.flex_bd {
	min-width: 0;
}

.copy-bar .copy-button {
	background: #0075FF;
	min-width: 70px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 33px;
}

.copy-button img {
	width: 27px;
	height: 27px;
}

.copy-value {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 0 10px;
}

.warning-bar {
	background: #161F2C;
	border-radius: 6px;
	padding: 8px 10px;
	display: flex;
	color: #CDCDCD;
	font-size: 14px;
	margin-top: 30px;
	display: flex;
	align-items: center;
}

.warning-bar .icon-warning {
	color: #e7c900;
	display: inline-flex;
	margin-right: 10px;
}

.download-text {
	color: #CDCDCD;
	font-size: 34px;
}

.download-text .text {
	margin-bottom: 10px;
	line-height: 1.3;
}

.download-foot .el-button {
	font-size: 18px;
	line-height: 1;
	color: #CDCDCD;
	margin: 0;
	margin-top: 25px;
}

.download-foot .el-button .iconfont {
	font-size: 28px;
	color: #fff;
}

.download-foot .el-button .label {
	display: inline-block;
	width: 110px;
	text-align: center;
}

.safe-icon {
	width: 1em;
	height: 1.1em;
	flex-shrink: 0;
	margin-right: 10px;
	display: inline;
}

@media (max-width:750px) {
	.copy-bar {
		margin-top: 20px;
		margin-bottom: 40px;
	}

	.download-grid {
		width: 100%;
	}

	.download-cell {
		display: block;
	}

	.download-foot {
		display: flex;
		align-items: center;
		justify-content: space-between
	}

	.download-foot .el-button {
		font-size: 16px;
		width: 45% !important;
		margin: 30px 0;
	}

	.download-foot .el-button .iconfont {
		font-size: 24px;
	}

	.warning-bar {
		margin-bottom: 30px;
	}

	.download-row {
		margin: 0 -40px;
	}

	.download-pic {
		padding: 0 8px;
	}

	.download-pic img {
		width: 120px;
	}

	.download-pic:nth-child(1) {
		padding-top: 15px;
	}

	.download-pic:nth-child(2) {
		padding-top: 30px;
	}

	.download-pic:nth-child(3) {
		padding-top: 45px;
	}

	.download-pic:nth-child(4) {
		padding-top: 60px;
	}
}

.wrapper__inner {
	overflow: hidden;
}

.top-img-wapper {
	background-image: url(~@/assets/images/app-top.png);
	background-size: cover;
	padding-bottom: 29%;
	position: relative;
}

@media (max-width:768px) {
	.top-img-wapper {
		padding-bottom: 34%;
		border-radius: 10px;
	}
}

.top-img-txt {
	text-align: center;
	position: absolute;
	/* background: linear-gradient(0deg, #ACCBEE 0%, #E7F0FD 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent; */
	font-weight: bold;
	font-family: zihun446hao-menghuanti;
	font-size: 26px;
	font-style: italic;
	left: 15%;
	bottom: 10%;
	text-shadow: 0 0 4px rgba(0, 0, 0, 1);
}

@media (max-width:768px) {
	.top-img-txt {
		font-size: 12px;
		bottom: 6%;
	}
}

.tips {
	text-align: right;
	color: #72d061;
	margin-top: 10px;
	font-size: 14px;
}

.tips span {
	cursor: pointer;
}</style>
