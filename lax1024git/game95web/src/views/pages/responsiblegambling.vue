<template>
	<div class="app " :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<div class="responsible-gambling">
						<div class="responsible-gambling__wrap">
							<div class="responsible-gambling__left-wrap">
								<button type="button" class="button button_sm button_grey1 button_center" @click="back">
									<span class="button__inner">
										<span class="button__icon">
											<svgIcon widthName="20" heightName="20" icon="icon-arrow-left-small" className="svg-use"></svgIcon>
										</span>
										<span class="button__text">{{ $t('返回') }}</span>
									</span>
								</button>
								<h2 class="responsible-gambling__title">{{ $t('Responsible Gambling') }}</h2>
								<p class="responsible-gambling__subtitle">
									{{ $t('Make your gaming responsible! You have great results and we want them to be lasting.') }}
								</p>
								<p class="responsible-gambling__desc">
									{{ $t('We have even more opportunities for you to continue enjoying the games and improve your playing experience on Cyber Raccoon. We suggest you take care of yourself in advance and set some limits.') }}
								</p>
								<!-- <div class="responsible-gambling__links">
									<a href="https://gamblersanonymous.org" target="_blank" class="responsible-gambling__link">
										<svgIcon widthName="20" heightName="20" icon="icon-share" className="svg-use"></svgIcon>
										gamblersanonymous.org
									</a>
									<a href="https://gamcare.org.uk" target="_blank" class="responsible-gambling__link">
										<svgIcon widthName="20" heightName="20" icon="icon-share" className="svg-use"></svgIcon>
										gamcare.org.uk
									</a>
								</div> -->
								<a href="javascript:;" @click="showTC(12)" rel="noopener noreferrer nofollow" class="button button_lg button_blue button_center">
									<span class="button__inner">
										<span class="button__text">{{ $t('Terms and Conditions') }}</span>
									</span>
								</a>
							</div>
							<img v-if="!isMobileFlag" src="../../assets/images/responsible-gambling-bg.png" class="responsible-gambling__images">
							<img v-else src="../../assets/images/responsible-gambling-bg-mob.png" class="responsible-gambling__images">
						</div>
						<div class="responsible-gambling__opportunities">
							<p class="responsible-gambling__subtitle">
								<svgIcon widthName="24" heightName="24" icon="icon-stop" className="svg-use"></svgIcon>
								{{ $t('Responsible gambling opportunities') }}
							</p>
							<div class="responsible-gambling__opportunities-wrap">
								<div class="responsible-gambling__time-alert">
									<img v-if="!isMobileFlag" src="../../assets/images/time-alert.png" alt="" class="responsible-gambling__opportunities-images">
									<img v-else src="../../assets/images/time-alert-mob.png" alt="" class="responsible-gambling__opportunities-images">
									<h3 class="responsible-gambling__opportunities-title">
										{{ $t('Time Alert') }}
									</h3>
									<p class="responsible-gambling__opportunities-desc">
										{{ $t('Control your actions more. Play a fixed time in a day and stay informed about the session time. The notification will remind you of the current session.') }}
									</p>
									<!-- <button class="link link_md">
										<span class="link__text">{{ $t('Activate limit') }}</span>
										<svgIcon widthName="16" heightName="16" icon="icon-arrow-right-small" className="link__icon"></svgIcon>
									</button> -->
								</div>
								<div class="responsible-gambling__self-exclusion">
									<img v-if="!isMobileFlag" src="../../assets/images/self-exclusion.png" alt="" class="responsible-gambling__opportunities-images">
									<img v-else src="../../assets/images/self-exclusion-mob.png" alt="" class="responsible-gambling__opportunities-images">
									<h3 class="responsible-gambling__opportunities-title">
										{{ $t('Self-Exclusion') }}
									</h3>
									<p class="responsible-gambling__opportunities-desc">
										{{ $t('Want to take a break? Set the limit and you will be excluded from the account for the selected period. When the term expires you will receive a notification.') }}
									</p>
									<!-- <button class="link link_md">
										<span class="link__text">{{ $t('Activate limit') }}</span>
										<svgIcon widthName="16" heightName="16" icon="icon-arrow-right-small" className="link__icon"></svgIcon>
									</button> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Foot />
		</div>
    <el-dialog :visible.sync="tcVisible" custom-class="custom-dialog" :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ tcTitle }}</h1>
        </div>
      </div>
      <div class="news__body" v-html="tcContent"></div>
    </el-dialog>
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
import { rule_index_api } from "@/api/index";
export default {
	name: 'ResponsiblePage',
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
			isMobileFlag:false,// 响应
			tcVisible: false,
			tcContent: '',
			tcTitle: '',
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
		showTC(type) {
      this.tcContent = '';
      this.tcTitle = '';
      const key = 'tc_content_' + type + '_' + this.$helper.getLang()
      if (this.$helper.get(key)) {
        this.tcContent = this.$helper.get(key).content
        this.tcTitle = this.$helper.get(key).title
        this.tcVisible = true
        return
      }
      this.getRule(type)
    },
    getRule(type) {
      const self = this
      const key = 'tc_content_' + type + '_' + this.$helper.getLang()
      rule_index_api(type).then(response => {
        if (response && response.data.code == 1) {
          const data = response.data.data
          if (data) {
            self.$helper.set(key, data)
            self.showTC(type)
          } else {
            this.errorTips('没有内容');
          }
        }
      })
    }
	},
	created() {
		this.isPhone()
	},
}
</script>
<style scoped>

.responsible-gambling img {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	pointer-events: none
}

.responsible-gambling__wrap {
	position: relative;
	border-bottom: 1px solid #1c2532;
	margin-bottom: 30px
}

@media(max-width:768px) {
	.responsible-gambling__wrap {
		border-bottom: none
	}
}

@media(max-width:1000px) {
	.opened-left-panel .responsible-gambling__wrap {
		border-bottom: none
	}
}

@media(max-width:1093px) {
	.opened-right-panel .responsible-gambling__wrap {
		border-bottom: none
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .responsible-gambling__wrap {
		border-bottom: none
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__wrap {
		border-bottom: none
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__wrap {
		border-bottom: none
	}
}

.responsible-gambling__wrap:before {
	content: "";
	position: absolute;
	right: -50%;
	top: -50%;
	width: 632px;
	height: 257px;
	transform: translate(-25%, 25%);
	background: #0045ca;
	filter: blur(100px);
	pointer-events: none
}

@media(max-width:768px) {
	.responsible-gambling__wrap:before {
		display: none
	}
}

@media(max-width:1000px) {
	.opened-left-panel .responsible-gambling__wrap:before {
		display: none
	}
}

@media(max-width:1093px) {
	.opened-right-panel .responsible-gambling__wrap:before {
		display: none
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .responsible-gambling__wrap:before {
		display: none
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__wrap:before {
		display: none
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__wrap:before {
		display: none
	}
}

.responsible-gambling__left-wrap {
	max-width: 51%;
	padding-bottom: 36px
}

@media(max-width:768px) {
	.responsible-gambling__left-wrap {
		max-width: 100%;
		padding-bottom: 280px
	}
}

@media(max-width:1000px) {
	.opened-left-panel .responsible-gambling__left-wrap {
		max-width: 100%;
		padding-bottom: 280px
	}
}

@media(max-width:1093px) {
	.opened-right-panel .responsible-gambling__left-wrap {
		max-width: 100%;
		padding-bottom: 280px
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .responsible-gambling__left-wrap {
		max-width: 100%;
		padding-bottom: 280px
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__left-wrap {
		max-width: 100%;
		padding-bottom: 280px
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__left-wrap {
		max-width: 100%;
		padding-bottom: 280px
	}
}

.responsible-gambling__title {
	font-weight: 700;
	font-size: 32px;
	line-height: 40px;
	margin: 12px 0 8px
}

@media(max-width:768px) {
	.responsible-gambling__title {
		font-size: 24px;
		line-height: 32px
	}
}

@media(max-width:1000px) {
	.opened-left-panel .responsible-gambling__title {
		font-size: 24px;
		line-height: 32px
	}
}

@media(max-width:1093px) {
	.opened-right-panel .responsible-gambling__title {
		font-size: 24px;
		line-height: 32px
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .responsible-gambling__title {
		font-size: 24px;
		line-height: 32px
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__title {
		font-size: 24px;
		line-height: 32px
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__title {
		font-size: 24px;
		line-height: 32px
	}
}

.responsible-gambling__subtitle {
	display: flex;
	align-items: center;
	font-weight: 600;
	font-size: 16px;
	line-height: 20px;
	margin-bottom: 6px
}

@media(max-width:768px) {
	.responsible-gambling__subtitle {
		font-size: 16px
	}
}

@media(max-width:1000px) {
	.opened-left-panel .responsible-gambling__subtitle {
		font-size: 16px
	}
}

@media(max-width:1093px) {
	.opened-right-panel .responsible-gambling__subtitle {
		font-size: 16px
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .responsible-gambling__subtitle {
		font-size: 16px
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__subtitle {
		font-size: 16px
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__subtitle {
		font-size: 16px
	}
}

.responsible-gambling__subtitle svg {
	fill: #55657e;
	margin-right: 5px
}

.responsible-gambling__desc {
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
	color: #93acd3;
	margin-bottom: 12px
}

.responsible-gambling__links {
	margin-bottom: 22px
}

.responsible-gambling__link {
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	color: #3a07f2;
	text-decoration: none;
	margin-right: 12px;
	white-space: nowrap
}

@media(max-width:768px) {
	.responsible-gambling__link:first-child {
		margin-bottom: 6px;
		margin-right: 100%
	}
}

@media(max-width:1000px) {
	.opened-left-panel .responsible-gambling__link:first-child {
		margin-bottom: 6px;
		margin-right: 100%
	}
}

@media(max-width:1093px) {
	.opened-right-panel .responsible-gambling__link:first-child {
		margin-bottom: 6px;
		margin-right: 100%
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .responsible-gambling__link:first-child {
		margin-bottom: 6px;
		margin-right: 100%
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__link:first-child {
		margin-bottom: 6px;
		margin-right: 100%
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__link:first-child {
		margin-bottom: 6px;
		margin-right: 100%
	}
}

.responsible-gambling__link svg {
	fill: #55657e
}

.responsible-gambling__images {
	position: absolute;
	right: -19px;
	top: -34px;
	max-height: 344px;
	object-fit: contain;
	bottom: 0;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	width: 58%
}

@media(max-width:768px) {
	.responsible-gambling__images {
		bottom: 0;
		max-width: none;
		width: calc(100% + 32px);
		left: 50%;
		transform: translate(-50%);
		top: auto
	}
}

@media(max-width:1000px) {
	.opened-left-panel .responsible-gambling__images {
		bottom: 0;
		max-width: none;
		width: calc(100% + 32px);
		left: 50%;
		transform: translate(-50%);
		top: auto
	}
}

@media(max-width:1093px) {
	.opened-right-panel .responsible-gambling__images {
		bottom: 0;
		max-width: none;
		width: calc(100% + 32px);
		left: 50%;
		transform: translate(-50%);
		top: auto
	}
}

@media(max-width:1108px) {
	.opened-contests-panel .responsible-gambling__images {
		bottom: 0;
		max-width: none;
		width: calc(100% + 32px);
		left: 50%;
		transform: translate(-50%);
		top: auto
	}
}

@media(max-width:1325px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__images {
		bottom: 0;
		max-width: none;
		width: calc(100% + 32px);
		left: 50%;
		transform: translate(-50%);
		top: auto
	}
}

@media(max-width:1340px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__images {
		bottom: 0;
		max-width: none;
		width: calc(100% + 32px);
		left: 50%;
		transform: translate(-50%);
		top: auto
	}
}

@media(max-width:500px) {
	.responsible-gambling__images {
		width: 500px
	}
}

@media(max-width:732px) {
	.opened-left-panel .responsible-gambling__images {
		width: 500px
	}
}

@media(max-width:825px) {
	.opened-right-panel .responsible-gambling__images {
		width: 500px
	}
}

@media(max-width:840px) {
	.opened-contests-panel .responsible-gambling__images {
		width: 500px
	}
}

@media(max-width:1057px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__images {
		width: 500px
	}
}

@media(max-width:1072px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__images {
		width: 500px
	}
}

.responsible-gambling__opportunities-wrap {
	margin-top: 18px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 22px
}

@media(max-width:1000px) {
	.responsible-gambling__opportunities-wrap {
		flex-direction: column
	}
}

@media(max-width:1232px) {
	.opened-left-panel .responsible-gambling__opportunities-wrap {
		flex-direction: column
	}
}

@media(max-width:1325px) {
	.opened-right-panel .responsible-gambling__opportunities-wrap {
		flex-direction: column
	}
}

@media(max-width:1340px) {
	.opened-contests-panel .responsible-gambling__opportunities-wrap {
		flex-direction: column
	}
}

@media(max-width:1557px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__opportunities-wrap {
		flex-direction: column
	}
}

@media(max-width:1572px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__opportunities-wrap {
		flex-direction: column
	}
}

.responsible-gambling__self-exclusion,
.responsible-gambling__time-alert {
	position: relative;
	padding: 24px 24px 24px 176px;
	background: #161f2c;
	border-radius: 14px;
	width: calc(50% - 8px);
	overflow: hidden
}

@media(max-width:1000px) {

	.responsible-gambling__self-exclusion,
	.responsible-gambling__time-alert {
		width: 100%;
		padding: 24px 24px 200px;
		margin-bottom: 16px
	}
}

@media(max-width:1232px) {

	.opened-left-panel .responsible-gambling__self-exclusion,
	.opened-left-panel .responsible-gambling__time-alert {
		width: 100%;
		padding: 24px 24px 200px;
		margin-bottom: 16px
	}
}

@media(max-width:1325px) {

	.opened-right-panel .responsible-gambling__self-exclusion,
	.opened-right-panel .responsible-gambling__time-alert {
		width: 100%;
		padding: 24px 24px 200px;
		margin-bottom: 16px
	}
}

@media(max-width:1340px) {

	.opened-contests-panel .responsible-gambling__self-exclusion,
	.opened-contests-panel .responsible-gambling__time-alert {
		width: 100%;
		padding: 24px 24px 200px;
		margin-bottom: 16px
	}
}

@media(max-width:1557px) {

	.opened-left-panel.opened-right-panel .responsible-gambling__self-exclusion,
	.opened-left-panel.opened-right-panel .responsible-gambling__time-alert {
		width: 100%;
		padding: 24px 24px 200px;
		margin-bottom: 16px
	}
}

@media(max-width:1572px) {

	.opened-left-panel.opened-contests-panel .responsible-gambling__self-exclusion,
	.opened-left-panel.opened-contests-panel .responsible-gambling__time-alert {
		width: 100%;
		padding: 24px 24px 200px;
		margin-bottom: 16px
	}
}

.responsible-gambling__opportunities-title {
	display: flex;
	align-items: center;
	font-weight: 700;
	font-size: 24px;
	line-height: 32px;
	margin-bottom: 6px
}

.responsible-gambling__opportunities-desc {
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: #93acd3;
	margin-bottom: 12px
}

.responsible-gambling__opportunities-images {
	position: absolute;
	left: 0;
	top: 50%;
	max-height: 199px;
	object-fit: contain;
	transform: translateY(-50%);
	border-radius: 14px 0 0 14px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	pointer-events: none;
	width: 34%;
}

@media(max-width:1000px) {
	.responsible-gambling__opportunities-images {
		bottom: 0;
		left: 50%;
		width: 500px;
		max-width: none;
		transform: translate(-50%);
		top: auto;
		border-radius: 0
	}
}

@media(max-width:1232px) {
	.opened-left-panel .responsible-gambling__opportunities-images {
		bottom: 0;
		left: 50%;
		width: 500px;
		max-width: none;
		transform: translate(-50%);
		top: auto;
		border-radius: 0
	}
}

@media(max-width:1325px) {
	.opened-right-panel .responsible-gambling__opportunities-images {
		bottom: 0;
		left: 50%;
		width: 500px;
		max-width: none;
		transform: translate(-50%);
		top: auto;
		border-radius: 0
	}
}

@media(max-width:1340px) {
	.opened-contests-panel .responsible-gambling__opportunities-images {
		bottom: 0;
		left: 50%;
		width: 500px;
		max-width: none;
		transform: translate(-50%);
		top: auto;
		border-radius: 0
	}
}

@media(max-width:1557px) {
	.opened-left-panel.opened-right-panel .responsible-gambling__opportunities-images {
		bottom: 0;
		left: 50%;
		width: 500px;
		max-width: none;
		transform: translate(-50%);
		top: auto;
		border-radius: 0
	}
}

@media(max-width:1572px) {
	.opened-left-panel.opened-contests-panel .responsible-gambling__opportunities-images {
		bottom: 0;
		left: 50%;
		width: 500px;
		max-width: none;
		transform: translate(-50%);
		top: auto;
		border-radius: 0
	}
}

.responsible-gambling__timer-wrap {
	background: #202a39;
	padding: 8px 12px;
	border-radius: 8px;
	margin-bottom: 8px;
	margin-top: 16px
}

.responsible-gambling__timer-wrap .progress::-webkit-progress-bar {
	background-color: #3c485c
}

.responsible-gambling__timer-block {
	display: flex;
	justify-content: space-between
}

.responsible-gambling__timer-label {
	color: #93acd3
}

.responsible-gambling__timer-label,
.responsible-gambling__timer-time {
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	margin: 0
}

.responsible-gambling__allow-actions {
	font-weight: 500;
	font-size: 12px;
	line-height: 18px;
	color: #93acd3;
	margin-bottom: 0
}

.responsible-gambling__allow-time {
	color: #fff;
	font-weight: 600;
	line-height: 16px
}

.responsible-gambling__label {
	background: #ffb636;
	border-radius: 56px;
	padding: 3px 9px;
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	color: #1c2532;
	margin-left: 12px
}

.responsible-gambling__actions {
	margin-top: 16px
}

.responsible-gambling__exclude-info {
	display: flex;
	padding: 8px 12px;
	background: #202a39;
	border-radius: 8px;
	margin: 16px 0 8px
}

.responsible-gambling__exclude-end,
.responsible-gambling__exclude-start {
	width: 50%
}

.responsible-gambling__exclude-start {
	position: relative
}

.responsible-gambling__exclude-start:before {
	content: "";
	position: absolute;
	right: 6px;
	top: 0;
	bottom: 0;
	width: 1px;
	background: #3c485c
}

.responsible-gambling__exclude-end {
	padding-left: 6px
}

.responsible-gambling__exclude-label {
	font-weight: 600;
	font-size: 12px;
	line-height: 16px;
	color: #93acd3;
	margin-bottom: 5px
}

.responsible-gambling__exclude-value {
	display: flex;
	align-items: center
}

.responsible-gambling__exclude-value svg {
	fill: #55657e;
	margin-right: 4px
}

.responsible-gambling__exclude-text {
	font-weight: 600;
	font-size: 14px;
	line-height: 18px;
	margin-bottom: 0
}

</style>
