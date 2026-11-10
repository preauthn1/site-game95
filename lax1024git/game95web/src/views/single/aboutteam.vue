<template>
	<div class="app " :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="container">
					<div class="about-team">
						<h1 class="about-team__title">{{ $t('关于 Cyber Raccoon 团队') }}</h1>
						<p class="about-team__desc">
							{{ $t('about_team_desc1') }}
						</p>
						<div class="about-team__bubbles">
							<img src="../../assets/images/bg-color.3348bb3.png" alt="" class="about-team__bg-color">
							<div class="about-team__bubble about-team__bubble-dev">
								<p class="about-team__bubble-title">{{ $t('Development') }}</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									18+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-product">
								<p class="about-team__bubble-title">{{ $t('Product') }}</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									3+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-support">
								<p class="about-team__bubble-title">{{ $t('Support') }}</p>
								<span class="about-team__bubble-count">
									<svg width="13" height="13" focusable="false" aria-hidden="true" class="about-team__icon">
										<use xlink:href="../../assets/fonts/svg-sprite.svg#icon-table-user" class="svg-use"></use>
									</svg>
									35+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-finance">
								<p class="about-team__bubble-title">{{ $t('Finance') }}</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									3+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-risk">
								<p class="about-team__bubble-title">{{ $t('Risk') }}</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									9+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-marketing">
								<p class="about-team__bubble-title">{{ $t('Marketing') }}</p>
								<span class="about-team__bubble-count">
									<svg width="14" height="14" focusable="false" aria-hidden="true" class="about-team__icon">
										<use xlink:href="../../assets/fonts/svg-sprite.svg#icon-table-user" class="svg-use"></use>
									</svg>
									12+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-ceo">
								<p class="about-team__bubble-title">{{ $t('CEO') }}</p>
							</div>
							<div class="about-team__bubble about-team__bubble-security">
								<p class="about-team__bubble-title">{{ $t('Security') }}</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									3+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-vip">
								<p class="about-team__bubble-title">
									{{ $t('VIP Support') }}
								</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									3+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-design">
								<p class="about-team__bubble-title">{{ $t('Design') }}</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									4+
								</span>
							</div>
							<div class="about-team__bubble about-team__bubble-hr">
								<p class="about-team__bubble-title">{{ $t('HR') }}</p>
								<span class="about-team__bubble-count">
									<svgIcon icon="icon-table-user" widthName="12" heightName="12"></svgIcon>
									2+
								</span>
							</div>
							<div class="about-team__bubble-help about-team__bubble-help-1"></div>
							<div class="about-team__bubble-help about-team__bubble-help-2"></div>
							<div class="about-team__bubble-help about-team__bubble-help-3"></div>
							<div class="about-team__bubble-help about-team__bubble-help-4"></div>
							<div class="about-team__bubble-help about-team__bubble-help-5"></div>
							<div class="about-team__bubble-help about-team__bubble-help-6"></div>
							<div class="about-team__bubble-help about-team__bubble-help-7"></div>
							<div class="about-team__bubble-help about-team__bubble-help-8"></div>
							<div class="about-team__bubble-help about-team__bubble-help-9"></div>
							<div class="about-team__bubble-help about-team__bubble-help-10"></div>
							<div class="about-team__bubble-help about-team__bubble-help-11"></div>
							<div class="about-team__bubble-help about-team__bubble-help-12"></div>
							<div class="about-team__bubble-help about-team__bubble-help-13"></div>
							<div class="about-team__bubble-help about-team__bubble-help-14"></div>
							<div class="about-team__bubble-help about-team__bubble-help-15"></div>
							<div class="about-team__bubble-help about-team__bubble-help-16"></div>
							<div class="about-team__bubble-help about-team__bubble-help-17"></div>
							<div class="about-team__bubble-help about-team__bubble-help-18"></div>
						</div>
						<h2 class="about-team__represent-title">{{ $t('Public Team Representatives') }}</h2>
						<p class="about-team__represent-desc">
							{{ $t('about_team_desc2') }}
						</p>
						<div class="slider">
							<div class="slider__head">
								<h3 class="slider__title">
									{{ $t('VIP支持团队') }}
								</h3>
								<div class="slider__head-buttons" v-if="memberlist.length > 6">
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-left">
										<span class="button__inner">
											<span class="button__icon">
												<svg focusable="false" aria-hidden="true" class="">
													<use xlink:href="../../assets/fonts/svg-sprite.svg#icon-arrow-left-small" class="svg-use"></use>
												</svg>
											</span>
										</span>
									</button>
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-right">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-right-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
								</div>
							</div>
							<div class="slider__body">
								<swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
									<swiper-slide v-for="(item,index) in memberlist" :key="index">
										<div class="member">
											<div class="member__item-image">
												<img :src="item.avatar" alt="" class="member__item-avatar">
											</div>
											<div class="member__item-info">
												<h3 class="member__item-name">{{ $t(item.name) }}</h3>
												<p class="member__item-position">{{ $t(item.desc) }}</p>
											</div>
										</div>
									</swiper-slide>
								</swiper>
							</div>
						</div>
						<div class="slider">
							<div class="slider__head">
								<h3 class="slider__title">
									{{ $t('营销团队') }}
								</h3>
								<div class="slider__head-buttons" v-if="memberlist2.length > 6">
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-leftb">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-left-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-rightb">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-right-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
								</div>
							</div>
							<div class="slider__body">
								<swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs2" ref="swiperThumbs">
									<swiper-slide v-for="(item,index) in memberlist2" :key="index">
										<div class="member">
											<div class="member__item-image">
												<img :src="item.avatar" alt="" class="member__item-avatar">
											</div>
											<div class="member__item-info">
												<h3 class="member__item-name">{{ $t(item.name) }}</h3>
												<p class="member__item-position">{{ $t(item.desc) }}</p>
											</div>
											<a :href="$t(item.url)" v-if="item.url" target="_blank"  class="button button_md button_grey2 button_center button_fullwidth">
												<span class="button__inner">
													<span class="button__icon">
														<svgIcon icon="icon-telegram" widthName="12" heightName="12"></svgIcon>
													</span>
													<span class="button__text">
														{{ $t('Contact') }}
													</span>
												</span>
											</a>
										</div>
									</swiper-slide>
								</swiper>
							</div>
						</div>
						<div class="slider mb-30">
							<h2 class="about-team__team-title">
								{{ $t('技术支持团队') }}
							</h2>
							<div class="slider__head">
								<h3 class="slider__subtitle">
									{{ $t('支持代理商') }}
								</h3>
								<div class="slider__head-buttons" v-if="memberlist3.length > 6">
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-leftc">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-left-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-rightc">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-right-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
								</div>
							</div>
							<div class="slider__body">
								<swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs3" ref="swiperThumbs">
									<swiper-slide v-for="(item,index) in memberlist3" :key="index">
										<div class="member">
											<div class="member__item-image">
												<img :src="item.avatar" alt="" class="member__item-avatar">
											</div>
											<div class="member__item-info">
												<h3 class="member__item-name">{{ $t(item.name) }}</h3>
												<p class="member__item-position">{{ $t(item.desc) }}</p>
											</div>
											<a :href="$t(item.url)" v-if="item.url" target="_blank"  class="button button_md button_grey2 button_center button_fullwidth">
												<span class="button__inner">
													<span class="button__icon">
														<svgIcon icon="icon-telegram" widthName="12" heightName="12"></svgIcon>
													</span>
													<span class="button__text">
														{{ $t('Contact') }}
													</span>
												</span>
											</a>
										</div>
									</swiper-slide>
								</swiper>
							</div>
						</div>
						<div class="slider mb-30">
							<div class="slider__head">
								<h3 class="slider__subtitle">
									{{ $t('国际管理') }}
								</h3>
								<div class="slider__head-buttons" v-if="newMemberlist4.length > 6">
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-leftd">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-left-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-rightd">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-right-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
								</div>
							</div>
							<div class="slider__body">
								<swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs4" ref="swiperThumbs">
									<swiper-slide v-for="(item,index) in newMemberlist4" :key="index">
										<div class="member">
											<div class="member__item-image">
												<img :src="item.avatar" alt="" class="member__item-avatar">
											</div>
											<div class="member__item-info">
												<h3 class="member__item-name">
													<img :src="item.icon" class="member__item-flag" alt="">{{ $t(item.name) }}
												</h3>
                        <p class="member__item-position">
                          <span >{{ $t("The administrator of Cyber "+item.label+" community") }}</span>
                          <!-- <span v-if="item.label == 'TW'" >{{ $t("The administrator of Cyber Raccoon Indonesian community") }}</span>
                          <span v-if="item.label == 'EN'" >{{ $t("The administrator of Cyber Raccoon German community") }}</span>
                          <span v-if="item.label == 'VN'" >{{ $t("The administrator of Cyber Raccoon Filipino community") }}</span>
                          <span v-if="item.label == 'PH'" >{{ $t("The administrator of Cyber Raccoon PH community") }}</span>
                          <span v-if="item.label == 'PH'" >{{ $t("The administrator of Cyber Raccoon PH community") }}</span>
                          <span v-if="item.label == 'BR'" >{{ $t("The administrator of Cyber Raccoon BR community") }}</span> -->
                        </p>
											</div>
											<a :href="item.url" v-if="item.url" target="_blank"  class="button button_md button_grey2 button_center button_fullwidth">
												<span class="button__inner">
													<span class="button__icon">
														<svgIcon icon="icon-telegram" widthName="12" heightName="12"></svgIcon>
													</span>
													<span class="button__text">
														{{ $t('Contact') }}
													</span>
												</span>
											</a>
										</div>
									</swiper-slide>
								</swiper>
							</div>
						</div>
						<div class="slider mb-30">
							<div class="slider__head">
								<h3 class="slider__subtitle">
									{{ $t('社区管理') }}
								</h3>
								<div class="slider__head-buttons" v-if="memberlist5.length > 6">
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-lefte">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-left-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
									<button type="button" class="button button_md button_grey1 button_center button_only-icon button_only-icon-righte">
										<span class="button__inner">
											<span class="button__icon">
												<svgIcon icon="icon-arrow-right-small" widthName="12" heightName="12"></svgIcon>
											</span>
										</span>
									</button>
								</div>
							</div>
							<div class="slider__body">
								<swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs5" ref="swiperThumbs">
									<swiper-slide v-for="(item,index) in memberlist5" :key="index">
										<div class="member">
											<div class="member__item-image">
												<img :src="item.avatar" alt="" class="member__item-avatar">
											</div>
											<div class="member__item-info">
												<h3 class="member__item-name">{{ $t(item.name) }}</h3>
												<p class="member__item-position">{{ $t(item.desc) }}</p>
											</div>
											<a :href="$t(item.url)" v-if="item.url" target="_blank"  class="button button_md button_grey2 button_center button_fullwidth">
												<span class="button__inner">
													<span class="button__icon">
														<svgIcon icon="icon-telegram" widthName="12" heightName="12"></svgIcon>
													</span>
													<span class="button__text">
														{{ $t('Contact') }}
													</span>
												</span>
											</a>
										</div>
									</swiper-slide>
								</swiper>
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
				langIcon: '',
				alllang:'',
				memberlist:[
					{
						avatar:require('../../assets/images/avatar1.png'),
						name:'Eugene V.I.P',
						desc:'Head of VIP support'
					},{
						avatar:require('../../assets/images/avatar2.png'),
						name:'Martha V.I.P',
						desc:'VIP Support Manager'
					},{
						avatar:require('../../assets/images/avatar3.png'),
						name:'Kate V.S',
						desc:'VIP Support Manager'
					}
				],
				memberlist2:[
					{
						avatar:require('../../assets/images/demoavatar/m1.png'),
						name:'Kate',
						desc:'Marketing and PR lead'
					},
					{
						avatar:require('../../assets/images/demoavatar/m2.png'),
						name:'Toria',
						desc:'Event Manager'
					},
					{
						avatar:require('../../assets/images/demoavatar/m3.png'),
						name:'Kasey',
						desc:'Retention Manager'
					},
					{
						avatar:require('../../assets/images/demoavatar/m4.png'),
						name:'Claire',
						desc:'SMM manager'
					},
					{
						avatar:require('../../assets/images/demoavatar/m5.png'),
						name:'Mia',
						desc:'Content Manager'
					},
					{
						avatar:require('../../assets/images/demoavatar/m6.png'),
						name:'Helen',
						desc:'SEO Specialist'
					},
					{
						avatar:require('../../assets/images/demoavatar/m7.png'),
						name:'Elliot',
						desc:'Sports Betting Lead'
					},
					{
						avatar:require('../../assets/images/demoavatar/m8.png'),
						name:'Lara',
						desc:'Sports Betting Manager'
					},
					{
						avatar:require('../../assets/images/demoavatar/m9.png'),
						name:'Michael',
						desc:'Business Developer'
					},
					{
						avatar:require('../../assets/images/demoavatar/m10.png'),
						name:'Norman',
						desc:'Influencer Marketing Manager'
					},
				],
				memberlist3:[
					{
						avatar:require('../../assets/images/demoavatar/s1.png'),
						name:'Steve Cyber Raccoon',
						desc:'Head of the Support Department'
					},{
						avatar:require('../../assets/images/demoavatar/s2.png'),
						name:'Mitch Live',
						desc:'Technical Support Manager'
					},{
						avatar:require('../../assets/images/demoavatar/s3.png'),
						name:'Julia',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s4.png'),
						name:'Emily',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s5.png'),
						name:'Lana',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s6.png'),
						name:'Scarlett',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s7.png'),
						name:'Paola',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s8.png'),
						name:'Stella',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s9.png'),
						name:'Diana',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s10.png'),
						name:'Stacey',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s11.png'),
						name:'Ann Cyber Raccoon',
						desc:'Live Support Agent'
					},{
						avatar:require('../../assets/images/demoavatar/s12.png'),
						name:'Lily Cyber Raccoon',
						desc:'Live Support Agent'
					},
				],
				memberlist4:[
					{
            mid:'1',
						avatar:require('../../assets/images/demoavatar/i1.png'),
						name:'Jhazzy',
						flagpic:require('../../assets/images/tw.jpeg'),
						desc:'The administrator of Cyber Raccoon Filipino community',
						url:this.isMobileFlag?this.$helper.get('rule').mobile_service_url:this.$helper.get('rule').pc_service_url,
					},{
            mid:'2',
						avatar:require('../../assets/images/demoavatar/i2.png'),
						name:'Mariusz',
						flagpic:require('../../assets/images/tw.jpeg'),
						desc:'The administrator of Cyber Raccoon Polish community',
						url:this.isMobileFlag?this.$helper.get('rule').mobile_service_url:this.$helper.get('rule').pc_service_url,
					},{
            mid:'3',
						avatar:require('../../assets/images/demoavatar/i3.png'),
						name:'Lux',
						flagpic:require('../../assets/images/tw.jpeg'),
						desc:'The administrator of Cyber Raccoon Indonesian community',
						url:this.isMobileFlag?this.$helper.get('rule').mobile_service_url:this.$helper.get('rule').pc_service_url,
					},{
            mid:'1',
						avatar:require('../../assets/images/demoavatar/i4.png'),
						name:'Fire',
						flagpic:require('../../assets/images/tw.jpeg'),
						desc:'The administrator of Cyber Raccoon Indonesian community',
						url:this.isMobileFlag?this.$helper.get('rule').mobile_service_url:this.$helper.get('rule').pc_service_url,
					},{
            mid:'2',
						avatar:require('../../assets/images/demoavatar/i5.png'),
						name:'Sabine',
						flagpic:require('../../assets/images/tw.jpeg'),
						desc:'The administrator of Cyber Raccoon German community',
						url:this.isMobileFlag?this.$helper.get('rule').mobile_service_url:this.$helper.get('rule').pc_service_url,
					},{
            mid:'3',
						avatar:require('../../assets/images/demoavatar/i6.png'),
						name:'Baptiste',
						flagpic:require('../../assets/images/tw.jpeg'),
						desc:'The administrator of Cyber Raccoon French community',
						url:this.isMobileFlag?this.$helper.get('rule').mobile_service_url:this.$helper.get('rule').pc_service_url,
					},
				],
				memberlist5:[
					{
						avatar:require('../../assets/images/demoavatar/c1.png'),
						name:'BadJ0ker',
						desc:'Community driver',
						url:"telegram_group_url1",
					},{
						avatar:require('../../assets/images/demoavatar/c2.png'),
						name:'Michael',
						desc:'Community driver',
						url:"telegram_group_url2",
					},{
						avatar:require('../../assets/images/demoavatar/c3.png'),
						name:'Dimitry',
						desc:'Community driver',
						url:"telegram_group_url3",
					},{
						avatar:require('../../assets/images/demoavatar/c4.png'),
						name:'Josh',
						desc:'Community driver',
						url:"telegram_group_url4",
					},
				],
				swiperOptionThumbs: {
					autoplay: 3000,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.button_only-icon-right',
						prevEl: '.button_only-icon-left'
					},
					slidesPerView: 6,
					spaceBetween: 26,
					breakpoints: {
						640: {
							slidesPerView: 2,
						},
						750: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 6,
						},
					},
				},
				swiperOptionThumbs2: {
					autoplay: 3000,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.button_only-icon-rightb',
						prevEl: '.button_only-icon-leftb'
					},
					slidesPerView: 6,
					spaceBetween: 26,
					breakpoints: {
						640: {
							slidesPerView: 2,
						},
						750: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 6,
						},
					},
				},
				swiperOptionThumbs3: {
					autoplay: 3000,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.button_only-icon-rightc',
						prevEl: '.button_only-icon-leftc'
					},
					slidesPerView: 6,
					spaceBetween: 26,
					breakpoints: {
						640: {
							slidesPerView: 2,
						},
						750: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 6,
						},
					},
				},
				swiperOptionThumbs4: {
					autoplay: 3000,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.button_only-icon-rightd',
						prevEl: '.button_only-icon-leftd'
					},
					slidesPerView: 6,
					spaceBetween: 26,
					breakpoints: {
						640: {
							slidesPerView: 2,
						},
						750: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 6,
						},
					},
				},
				swiperOptionThumbs5: {
					autoplay: 3000,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.button_only-icon-righte',
						prevEl: '.button_only-icon-lefte'
					},
					slidesPerView: 6,
					spaceBetween: 26,
					breakpoints: {
						640: {
							slidesPerView: 2,
						},
						750: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 6,
						},
					},
				},
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
		computed: {
		  newMemberlist4() {
		    let _this = this;
		    let newList = [];
        let lessnum = 0;
		    let all_lang = _this.$helper.get("alllang").concat(_this.$helper.get("alllang")).sort();
        for (let i in this.memberlist4) {
          if(i < all_lang.length){
            if(i >= _this.$helper.get("alllang").length){
              lessnum = _this.$helper.get("alllang").length
            }
            newList.push({
              mid:parseInt(i) - lessnum,
              avatar:this.memberlist4[i].avatar,
              name:this.memberlist4[i].name,
              desc:this.memberlist4[i].desc,
              url:this.memberlist4[i].url,
              icon:all_lang[i].icon,
              label:all_lang[i].label
            })
          }
        }
		    return sortKey(newList,'mid')
		  },
      
		},
		created() {
			this.isPhone()
		},
	}
  function sortKey(array,key){
      return array.sort(function(a,b){
          var x = a[key];
          var y = b[key];
          return ((x<y)?-1:(x>y)?1:0)
      })
  }
</script>
<style scoped>

	.slider {
		content-visibility: auto;
		margin-bottom: 64px
	}

	.slider__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
		min-height: 30px
	}

	.slider__title {
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
		margin: 0
	}

	.slider__subtitle {
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 0
	}

	.slider__head-buttons {
		display: flex
	}

	.slider__head-buttons button:not(:first-child) {
		margin-left: 8px
	}
	.member,
	.slider__body {
		position: relative
	}
	.slider__body .swiper-slide{
		height:auto;
		min-height:222px;
	}

	.member {
		background: #202a39;
		border-radius: 15px;
		padding: 14px;
		margin-top: 12px;
		margin-bottom: 12px;
		transition: all .3s;
		height: calc(100% - 24px)
	}

	.member:hover {
		box-shadow: inset 0 0 100px 100px hsla(0, 0%, 100%, .1);
		transform: translateY(-12px)
	}

	.member a {
		margin-top: 12px
	}

	.member__details {
		position: absolute;
		top: 0;
		right: 0;
		width: 28px;
		height: 28px;
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center
	}

	.member__details:hover svg {
		fill: #fff
	}

	.member__details svg {
		display: block;
		width: 16px;
		height: 16px;
		fill: #5b6773;
		transition: fill .1s ease-in-out
	}

	.member__item-image {
		text-align: center;
		margin-bottom: 15px
	}

	.member__item-avatar {
		width: 64px;
		height: 64px
	}

	.member__item-name {
		display: flex;
		text-align:center;
		grid-gap: 8px;
		gap: 8px;
		justify-content: center;
		font-weight: 600;
		font-size: 14px;
		line-height: 18px;
		margin: 0 0 10px
	}

	.member__item-flag {
		width: 16px;
		height: 16px;
		border-radius: 16px;
	}

	.member__item-position {
		font-weight: 500;
		font-size: 10px;
		text-align: center;
		margin: 0
	}

	.mb-30 {
		margin-bottom: 30px
	}

	.about-team__title {
		font-weight: 700;
		font-size: 32px;
		line-height: 36px;
		margin: 18px 0 32px;
		text-align: center
	}

	@media(max-width:576px) {
		.about-team__title {
			font-size: 24px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__title {
			font-size: 24px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__title {
			font-size: 24px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__title {
			font-size: 24px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__title {
			font-size: 24px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__title {
			font-size: 24px
		}
	}

	.about-team__desc {
		font-weight: 500;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		max-width: 760px;
		margin: auto
	}

	@media(max-width:576px) {
		.about-team__desc {
			font-size: 14px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__desc {
			font-size: 14px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__desc {
			font-size: 14px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__desc {
			font-size: 14px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__desc {
			font-size: 14px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__desc {
			font-size: 14px
		}
	}

	.about-team__bubbles {
		position: relative;
		margin-top: 20px;
		height: 600px;
		background-image: url(../../assets/images/bg-lines.b1f2939.png);
		background-repeat: no-repeat;
		background-position: 50%
	}
	.about-team__bubble p{
		color:inherit
	}

	@media(max-width:1000px) {
		.about-team__bubbles {
			margin-top: 0
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubbles {
			margin-top: 0
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubbles {
			margin-top: 0
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubbles {
			margin-top: 0
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubbles {
			margin-top: 0
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubbles {
			margin-top: 0
		}
	}

	@media(max-width:576px) {
		.about-team__bubbles {
			margin-left: -16px;
			margin-right: -16px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubbles {
			margin-left: -16px;
			margin-right: -16px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubbles {
			margin-left: -16px;
			margin-right: -16px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubbles {
			margin-left: -16px;
			margin-right: -16px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubbles {
			margin-left: -16px;
			margin-right: -16px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubbles {
			margin-left: -16px;
			margin-right: -16px
		}
	}

	.about-team__bg-color {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		pointer-events: none
	}

	@media(max-width:576px) {
		.about-team__bg-color {
			height: 100%
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bg-color {
			height: 100%
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bg-color {
			height: 100%
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bg-color {
			height: 100%
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bg-color {
			height: 100%
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bg-color {
			height: 100%
		}
	}

	.about-team__bubble {
		position: absolute;
		border-radius: 50%;
		font-weight: 700;
		text-align: center;
		z-index: 2;
		-webkit-animation: bubble-bounce-data-v-125bc2f1 .5s;
		animation: bubble-bounce-data-v-125bc2f1 .5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both
	}

	.about-team__bubble-title {
		margin: 0;
		padding-top: 37%;
		line-height: 1;
		text-align: center
	}

	@media(max-width:576px) {
		.about-team__bubble-title {
			padding-top: 40%
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-title {
			padding-top: 40%
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-title {
			padding-top: 40%
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-title {
			padding-top: 40%
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-title {
			padding-top: 40%
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-title {
			padding-top: 40%
		}
	}

	.about-team__bubble-count {
		background: rgba(10, 29, 58, .1);
		border-radius: 10px;
		padding: 0 9px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		grid-gap: 4px;
		gap: 4px;
		width: -webkit-fit-content;
		width: -moz-fit-content;
		width: fit-content;
		margin: 5px auto 0
	}

	.about-team__bubble-dev {
		left: 20%;
		top: 50px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		filter: drop-shadow(0 0 10px rgba(37, 127, 221, .75));
		box-shadow: 0 22.362px 29.816px rgba(7, 15, 27, .38);
		width: 120px;
		height: 120px;
		color: #2a3546;
		font-size: 14px;
		-webkit-animation-delay: .5s;
		animation-delay: .5s
	}

	@media(max-width:1000px) {
		.about-team__bubble-dev {
			left: 10%;
			width: 100px;
			height: 100px;
			font-size: 11px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-dev {
			left: 10%;
			width: 100px;
			height: 100px;
			font-size: 11px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-dev {
			left: 10%;
			width: 100px;
			height: 100px;
			font-size: 11px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-dev {
			left: 10%;
			width: 100px;
			height: 100px;
			font-size: 11px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-dev {
			left: 10%;
			width: 100px;
			height: 100px;
			font-size: 11px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-dev {
			left: 10%;
			width: 100px;
			height: 100px;
			font-size: 11px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-dev {
			left: 70%;
			top: 350px;
			width: 71px;
			height: 71px;
			font-size: 8px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-dev {
			left: 70%;
			top: 350px;
			width: 71px;
			height: 71px;
			font-size: 8px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-dev {
			left: 70%;
			top: 350px;
			width: 71px;
			height: 71px;
			font-size: 8px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-dev {
			left: 70%;
			top: 350px;
			width: 71px;
			height: 71px;
			font-size: 8px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-dev {
			left: 70%;
			top: 350px;
			width: 71px;
			height: 71px;
			font-size: 8px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-dev {
			left: 70%;
			top: 350px;
			width: 71px;
			height: 71px;
			font-size: 8px
		}
	}

	.about-team__bubble-dev .about-team__bubble-count {
		margin-top: 10px;
		font-size: 13px;
		color: #55657e
	}

	@media(max-width:1000px) {
		.about-team__bubble-dev .about-team__bubble-count {
			font-size: 11px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-dev .about-team__bubble-count {
			font-size: 11px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-dev .about-team__bubble-count {
			font-size: 11px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-dev .about-team__bubble-count {
			font-size: 11px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-dev .about-team__bubble-count {
			font-size: 11px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-dev .about-team__bubble-count {
			font-size: 11px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-dev .about-team__bubble-count {
			margin-top: 8px;
			font-size: 8px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-dev .about-team__bubble-count {
			margin-top: 8px;
			font-size: 8px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-dev .about-team__bubble-count {
			margin-top: 8px;
			font-size: 8px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-dev .about-team__bubble-count {
			margin-top: 8px;
			font-size: 8px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-dev .about-team__bubble-count {
			margin-top: 8px;
			font-size: 8px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-dev .about-team__bubble-count {
			margin-top: 8px;
			font-size: 8px
		}
	}

	.about-team__bubble-dev .about-team__icon {
		fill: #55657e
	}

	@media(max-width:576px) {
		.about-team__bubble-dev .about-team__icon {
			width: 8px;
			height: 8px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-dev .about-team__icon {
			width: 8px;
			height: 8px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-dev .about-team__icon {
			width: 8px;
			height: 8px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-dev .about-team__icon {
			width: 8px;
			height: 8px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-dev .about-team__icon {
			width: 8px;
			height: 8px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-dev .about-team__icon {
			width: 8px;
			height: 8px
		}
	}

	.about-team__bubble-dev:before {
		content: "";
		position: absolute;
		top: -18px;
		left: -18px;
		bottom: -18px;
		right: -18px;
		border: 2px solid #abe1ff;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:1000px) {
		.about-team__bubble-dev:before {
			top: -11px;
			left: -11px;
			bottom: -11px;
			right: -11px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-dev:before {
			top: -11px;
			left: -11px;
			bottom: -11px;
			right: -11px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-dev:before {
			top: -11px;
			left: -11px;
			bottom: -11px;
			right: -11px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-dev:before {
			top: -11px;
			left: -11px;
			bottom: -11px;
			right: -11px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-dev:before {
			top: -11px;
			left: -11px;
			bottom: -11px;
			right: -11px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-dev:before {
			top: -11px;
			left: -11px;
			bottom: -11px;
			right: -11px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-dev:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-dev:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-dev:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-dev:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-dev:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-dev:before {
			display: none
		}
	}

	.about-team__bubble-product {
		left: 40%;
		top: 80px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		filter: drop-shadow(0 0 8px rgba(241, 95, 119, .75));
		box-shadow: 0 22.362px 29.816px rgba(7, 15, 27, .38);
		width: 80px;
		height: 80px;
		font-size: 13px;
		-webkit-animation-delay: .8s;
		animation-delay: .8s
	}

	@media(max-width:1000px) {
		.about-team__bubble-product {
			left: 35%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-product {
			left: 35%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-product {
			left: 35%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-product {
			left: 35%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-product {
			left: 35%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-product {
			left: 35%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-product {
			font-size: 12px;
			left: 42%;
			top: 380px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-product {
			font-size: 12px;
			left: 42%;
			top: 380px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-product {
			font-size: 12px;
			left: 42%;
			top: 380px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-product {
			font-size: 12px;
			left: 42%;
			top: 380px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-product {
			font-size: 12px;
			left: 42%;
			top: 380px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-product {
			font-size: 12px;
			left: 42%;
			top: 380px
		}
	}

	.about-team__bubble-product .about-team__bubble-count {
		font-size: 11px;
		color: #ffc6cf
	}

	@media(max-width:576px) {
		.about-team__bubble-product .about-team__bubble-count {
			margin-top: 8px;
			font-size: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-product .about-team__bubble-count {
			margin-top: 8px;
			font-size: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-product .about-team__bubble-count {
			margin-top: 8px;
			font-size: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-product .about-team__bubble-count {
			margin-top: 8px;
			font-size: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-product .about-team__bubble-count {
			margin-top: 8px;
			font-size: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-product .about-team__bubble-count {
			margin-top: 8px;
			font-size: 9px
		}
	}

	.about-team__bubble-product .about-team__icon {
		fill: #ffc6cf
	}

	@media(max-width:576px) {
		.about-team__bubble-product .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-product .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-product .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-product .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-product .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-product .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	.about-team__bubble-product:before {
		content: "";
		position: absolute;
		top: -15px;
		left: -15px;
		bottom: -15px;
		right: -15px;
		border: 2px solid #ff7ca4;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:576px) {
		.about-team__bubble-product:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-product:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-product:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-product:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-product:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-product:before {
			display: none
		}
	}

	.about-team__bubble-support {
		left: 60%;
		top: 40px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		filter: drop-shadow(0 0 10px rgba(37, 127, 221, .75));
		box-shadow: 0 22.362px 29.816px rgba(7, 15, 27, .38);
		width: 150px;
		height: 150px;
		font-size: 24px;
		color: #2a3546;
		-webkit-animation-delay: 1.1s;
		animation-delay: 1.1s
	}

	@media(max-width:1000px) {
		.about-team__bubble-support {
			top: 60px;
			left: 60%;
			width: 120px;
			height: 120px;
			font-size: 20px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-support {
			top: 60px;
			left: 60%;
			width: 120px;
			height: 120px;
			font-size: 20px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-support {
			top: 60px;
			left: 60%;
			width: 120px;
			height: 120px;
			font-size: 20px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-support {
			top: 60px;
			left: 60%;
			width: 120px;
			height: 120px;
			font-size: 20px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-support {
			top: 60px;
			left: 60%;
			width: 120px;
			height: 120px;
			font-size: 20px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-support {
			top: 60px;
			left: 60%;
			width: 120px;
			height: 120px;
			font-size: 20px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-support {
			left: 5%;
			top: 300px;
			width: 95px;
			height: 95px;
			font-size: 14px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-support {
			left: 5%;
			top: 300px;
			width: 95px;
			height: 95px;
			font-size: 14px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-support {
			left: 5%;
			top: 300px;
			width: 95px;
			height: 95px;
			font-size: 14px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-support {
			left: 5%;
			top: 300px;
			width: 95px;
			height: 95px;
			font-size: 14px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-support {
			left: 5%;
			top: 300px;
			width: 95px;
			height: 95px;
			font-size: 14px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-support {
			left: 5%;
			top: 300px;
			width: 95px;
			height: 95px;
			font-size: 14px
		}
	}

	.about-team__bubble-support .about-team__bubble-count {
		margin-top: 10px;
		font-size: 15px;
		color: #55657e
	}

	@media(max-width:576px) {
		.about-team__bubble-support .about-team__bubble-count {
			font-size: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-support .about-team__bubble-count {
			font-size: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-support .about-team__bubble-count {
			font-size: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-support .about-team__bubble-count {
			font-size: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-support .about-team__bubble-count {
			font-size: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-support .about-team__bubble-count {
			font-size: 9px
		}
	}

	.about-team__bubble-support .about-team__icon {
		fill: #55657e
	}

	@media(max-width:576px) {
		.about-team__bubble-support .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-support .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-support .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-support .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-support .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-support .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	.about-team__bubble-support:before {
		content: "";
		position: absolute;
		top: -23px;
		left: -23px;
		bottom: -23px;
		right: -23px;
		border: 2px solid #abe1ff;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:1000px) {
		.about-team__bubble-support:before {
			top: -20px;
			left: -20px;
			bottom: -20px;
			right: -20px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-support:before {
			top: -20px;
			left: -20px;
			bottom: -20px;
			right: -20px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-support:before {
			top: -20px;
			left: -20px;
			bottom: -20px;
			right: -20px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-support:before {
			top: -20px;
			left: -20px;
			bottom: -20px;
			right: -20px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-support:before {
			top: -20px;
			left: -20px;
			bottom: -20px;
			right: -20px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-support:before {
			top: -20px;
			left: -20px;
			bottom: -20px;
			right: -20px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-support:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-support:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-support:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-support:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-support:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-support:before {
			display: none
		}
	}

	.about-team__bubble-finance {
		left: 85%;
		top: 120px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%);
		filter: drop-shadow(0 0 16px rgba(50, 174, 250, .62));
		width: 90px;
		height: 90px;
		font-size: 14px;
		-webkit-animation-delay: 1.4s;
		animation-delay: 1.4s
	}

	@media(max-width:1000px) {
		.about-team__bubble-finance {
			top: 150px;
			left: 83%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-finance {
			top: 150px;
			left: 83%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-finance {
			top: 150px;
			left: 83%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-finance {
			top: 150px;
			left: 83%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-finance {
			top: 150px;
			left: 83%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-finance {
			top: 150px;
			left: 83%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-finance {
			left: 30%;
			top: 60px;
			width: 70px;
			height: 70px;
			font-size: 11px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-finance {
			left: 30%;
			top: 60px;
			width: 70px;
			height: 70px;
			font-size: 11px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-finance {
			left: 30%;
			top: 60px;
			width: 70px;
			height: 70px;
			font-size: 11px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-finance {
			left: 30%;
			top: 60px;
			width: 70px;
			height: 70px;
			font-size: 11px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-finance {
			left: 30%;
			top: 60px;
			width: 70px;
			height: 70px;
			font-size: 11px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-finance {
			left: 30%;
			top: 60px;
			width: 70px;
			height: 70px;
			font-size: 11px
		}
	}

	.about-team__bubble-finance .about-team__bubble-count {
		margin-top: 10px;
		font-size: 11px;
		opacity: .6;
		background: rgba(10, 29, 58, .15);
		padding: 2px 10px
	}

	@media(max-width:576px) {
		.about-team__bubble-finance .about-team__bubble-count {
			margin-top: 5px;
			font-size: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-finance .about-team__bubble-count {
			margin-top: 5px;
			font-size: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-finance .about-team__bubble-count {
			margin-top: 5px;
			font-size: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-finance .about-team__bubble-count {
			margin-top: 5px;
			font-size: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-finance .about-team__bubble-count {
			margin-top: 5px;
			font-size: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-finance .about-team__bubble-count {
			margin-top: 5px;
			font-size: 9px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-finance .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-finance .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-finance .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-finance .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-finance .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-finance .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	.about-team__bubble-finance:before {
		content: "";
		position: absolute;
		top: -9px;
		left: -9px;
		bottom: -9px;
		right: -9px;
		border: 2px solid #2270af;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:576px) {
		.about-team__bubble-finance:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-finance:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-finance:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-finance:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-finance:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-finance:before {
			display: none
		}
	}

	.about-team__bubble-risk {
		left: 5%;
		top: 140px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%);
		filter: drop-shadow(0 0 8px rgba(37, 127, 221, .75));
		box-shadow: 0 33.5153px 44.6871px rgba(7, 15, 27, .38);
		width: 90px;
		height: 90px;
		font-size: 19px;
		-webkit-animation-delay: 1.7s;
		animation-delay: 1.7s
	}

	@media(max-width:1000px) {
		.about-team__bubble-risk {
			left: 22%;
			top: 180px;
			width: 82px;
			height: 82px;
			font-size: 18px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-risk {
			left: 22%;
			top: 180px;
			width: 82px;
			height: 82px;
			font-size: 18px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-risk {
			left: 22%;
			top: 180px;
			width: 82px;
			height: 82px;
			font-size: 18px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-risk {
			left: 22%;
			top: 180px;
			width: 82px;
			height: 82px;
			font-size: 18px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-risk {
			left: 22%;
			top: 180px;
			width: 82px;
			height: 82px;
			font-size: 18px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-risk {
			left: 22%;
			top: 180px;
			width: 82px;
			height: 82px;
			font-size: 18px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-risk {
			width: 88px;
			height: 88px;
			left: 10%;
			top: 420px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-risk {
			width: 88px;
			height: 88px;
			left: 10%;
			top: 420px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-risk {
			width: 88px;
			height: 88px;
			left: 10%;
			top: 420px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-risk {
			width: 88px;
			height: 88px;
			left: 10%;
			top: 420px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-risk {
			width: 88px;
			height: 88px;
			left: 10%;
			top: 420px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-risk {
			width: 88px;
			height: 88px;
			left: 10%;
			top: 420px
		}
	}

	.about-team__bubble-risk .about-team__bubble-count {
		margin-top: 5px;
		font-size: 11px;
		opacity: .6
	}

	.about-team__bubble-risk:before {
		content: "";
		position: absolute;
		top: -10px;
		left: -10px;
		bottom: -10px;
		right: -10px;
		border: 2px solid #abe1ff;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:1000px) {
		.about-team__bubble-risk:before {
			top: -9px;
			left: -9px;
			bottom: -9px;
			right: -9px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-risk:before {
			top: -9px;
			left: -9px;
			bottom: -9px;
			right: -9px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-risk:before {
			top: -9px;
			left: -9px;
			bottom: -9px;
			right: -9px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-risk:before {
			top: -9px;
			left: -9px;
			bottom: -9px;
			right: -9px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-risk:before {
			top: -9px;
			left: -9px;
			bottom: -9px;
			right: -9px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-risk:before {
			top: -9px;
			left: -9px;
			bottom: -9px;
			right: -9px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-risk:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-risk:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-risk:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-risk:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-risk:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-risk:before {
			display: none
		}
	}

	.about-team__bubble-marketing {
		left: 16%;
		top: 230px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		filter: drop-shadow(0 0 27.3437px rgba(241, 95, 119, .75));
		box-shadow: 0 23.5177px 31.3569px rgba(7, 15, 27, .38);
		width: 155px;
		height: 155px;
		font-size: 21px;
		-webkit-animation-delay: 2s;
		animation-delay: 2s
	}

	@media(max-width:1000px) {
		.about-team__bubble-marketing {
			left: 10%;
			top: 290px;
			width: 116px;
			height: 116px;
			font-size: 16px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-marketing {
			left: 10%;
			top: 290px;
			width: 116px;
			height: 116px;
			font-size: 16px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-marketing {
			left: 10%;
			top: 290px;
			width: 116px;
			height: 116px;
			font-size: 16px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-marketing {
			left: 10%;
			top: 290px;
			width: 116px;
			height: 116px;
			font-size: 16px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-marketing {
			left: 10%;
			top: 290px;
			width: 116px;
			height: 116px;
			font-size: 16px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-marketing {
			left: 10%;
			top: 290px;
			width: 116px;
			height: 116px;
			font-size: 16px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-marketing {
			left: 10%;
			top: 130px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-marketing {
			left: 10%;
			top: 130px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-marketing {
			left: 10%;
			top: 130px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-marketing {
			left: 10%;
			top: 130px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-marketing {
			left: 10%;
			top: 130px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-marketing {
			left: 10%;
			top: 130px
		}
	}

	.about-team__bubble-marketing .about-team__bubble-count {
		margin-top: 10px;
		font-size: 16px;
		color: #ffc6cf
	}

	@media(max-width:1000px) {
		.about-team__bubble-marketing .about-team__bubble-count {
			font-size: 13px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-marketing .about-team__bubble-count {
			font-size: 13px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-marketing .about-team__bubble-count {
			font-size: 13px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-marketing .about-team__bubble-count {
			font-size: 13px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-marketing .about-team__bubble-count {
			font-size: 13px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-marketing .about-team__bubble-count {
			font-size: 13px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-marketing .about-team__icon {
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-marketing .about-team__icon {
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-marketing .about-team__icon {
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-marketing .about-team__icon {
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-marketing .about-team__icon {
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-marketing .about-team__icon {
			width: 11px;
			height: 11px
		}
	}

	.about-team__bubble-marketing:before {
		content: "";
		position: absolute;
		top: -21px;
		left: -21px;
		bottom: -21px;
		right: -21px;
		border: 2px solid #ff7ca4;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:1000px) {
		.about-team__bubble-marketing:before {
			top: -16px;
			left: -16px;
			bottom: -16px;
			right: -16px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-marketing:before {
			top: -16px;
			left: -16px;
			bottom: -16px;
			right: -16px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-marketing:before {
			top: -16px;
			left: -16px;
			bottom: -16px;
			right: -16px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-marketing:before {
			top: -16px;
			left: -16px;
			bottom: -16px;
			right: -16px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-marketing:before {
			top: -16px;
			left: -16px;
			bottom: -16px;
			right: -16px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-marketing:before {
			top: -16px;
			left: -16px;
			bottom: -16px;
			right: -16px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-marketing:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-marketing:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-marketing:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-marketing:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-marketing:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-marketing:before {
			display: none
		}
	}

	.about-team__bubble-ceo {
		left: 50%;
		top: 230px;
		transform: translate(-50%);
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%);
		filter: drop-shadow(0 0 10px rgba(37, 127, 221, .75));
		box-shadow: 0 33.5153px 44.6871px rgba(7, 15, 27, .38);
		width: 135px;
		height: 135px;
		font-size: 31px;
		-webkit-animation: bubble-show-data-v-125bc2f1 .5s;
		animation: bubble-show-data-v-125bc2f1 .5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		-webkit-animation-delay: .2s;
		animation-delay: .2s
	}

	@media(max-width:1000px) {
		.about-team__bubble-ceo {
			top: 230px;
			width: 145px;
			height: 145px;
			font-size: 33px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-ceo {
			top: 230px;
			width: 145px;
			height: 145px;
			font-size: 33px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-ceo {
			top: 230px;
			width: 145px;
			height: 145px;
			font-size: 33px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-ceo {
			top: 230px;
			width: 145px;
			height: 145px;
			font-size: 33px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-ceo {
			top: 230px;
			width: 145px;
			height: 145px;
			font-size: 33px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-ceo {
			top: 230px;
			width: 145px;
			height: 145px;
			font-size: 33px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-ceo {
			width: 118px;
			height: 118px;
			font-size: 25px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-ceo {
			width: 118px;
			height: 118px;
			font-size: 25px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-ceo {
			width: 118px;
			height: 118px;
			font-size: 25px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-ceo {
			width: 118px;
			height: 118px;
			font-size: 25px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-ceo {
			width: 118px;
			height: 118px;
			font-size: 25px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-ceo {
			width: 118px;
			height: 118px;
			font-size: 25px
		}
	}

	.about-team__bubble-ceo .about-team__bubble-count {
		margin-top: 10px;
		font-size: 16px;
		color: #ffc6cf
	}

	.about-team__bubble-ceo:before {
		content: "";
		position: absolute;
		top: -23px;
		left: -23px;
		bottom: -23px;
		right: -23px;
		border: 2px solid #abe1ff;
		border-radius: 50%;
		pointer-events: none;
		opacity: .1
	}

	@media(max-width:576px) {
		.about-team__bubble-ceo:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-ceo:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-ceo:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-ceo:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-ceo:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-ceo:before {
			display: none
		}
	}

	.about-team__bubble-security {
		left: 65%;
		top: 260px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		box-shadow: 0 0 8px rgba(48, 166, 245, .25);
		filter: drop-shadow(0 0 27.3437px rgba(241, 95, 119, .75));
		width: 75px;
		height: 75px;
		font-size: 12px;
		-webkit-animation-delay: 2.3s;
		animation-delay: 2.3s
	}

	@media(max-width:1000px) {
		.about-team__bubble-security {
			top: 240px;
			left: 70%;
			width: 71px;
			height: 71px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-security {
			top: 240px;
			left: 70%;
			width: 71px;
			height: 71px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-security {
			top: 240px;
			left: 70%;
			width: 71px;
			height: 71px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-security {
			top: 240px;
			left: 70%;
			width: 71px;
			height: 71px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-security {
			top: 240px;
			left: 70%;
			width: 71px;
			height: 71px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-security {
			top: 240px;
			left: 70%;
			width: 71px;
			height: 71px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-security {
			left: 72%;
			top: 230px;
			width: 88px;
			height: 88px;
			font-size: 14px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-security {
			left: 72%;
			top: 230px;
			width: 88px;
			height: 88px;
			font-size: 14px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-security {
			left: 72%;
			top: 230px;
			width: 88px;
			height: 88px;
			font-size: 14px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-security {
			left: 72%;
			top: 230px;
			width: 88px;
			height: 88px;
			font-size: 14px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-security {
			left: 72%;
			top: 230px;
			width: 88px;
			height: 88px;
			font-size: 14px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-security {
			left: 72%;
			top: 230px;
			width: 88px;
			height: 88px;
			font-size: 14px
		}
	}

	.about-team__bubble-security .about-team__bubble-count {
		margin-top: 7px;
		font-size: 9px;
		color: #ffc6cf;
		padding: 1px 7px
	}

	@media(max-width:576px) {
		.about-team__bubble-security .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-security .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-security .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-security .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-security .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-security .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-security .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-security .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-security .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-security .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-security .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-security .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	.about-team__bubble-security:before {
		content: "";
		position: absolute;
		top: -13px;
		left: -13px;
		bottom: -13px;
		right: -13px;
		border: 2px solid #ff7ca4;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:576px) {
		.about-team__bubble-security:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-security:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-security:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-security:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-security:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-security:before {
			display: none
		}
	}

	.about-team__bubble-vip {
		left: 90%;
		top: 270px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		box-shadow: 0 22.362px 29.816px rgba(7, 15, 27, .38);
		filter: drop-shadow(0 0 10px rgba(37, 127, 221, .75));
		width: 120px;
		height: 120px;
		font-size: 16px;
		color: #2a3546;
		-webkit-animation-delay: 2.6s;
		animation-delay: 2.6s
	}

	@media(max-width:1000px) {
		.about-team__bubble-vip {
			top: 350px;
			left: 74%;
			width: 113px;
			height: 113px;
			font-size: 15px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-vip {
			top: 350px;
			left: 74%;
			width: 113px;
			height: 113px;
			font-size: 15px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-vip {
			top: 350px;
			left: 74%;
			width: 113px;
			height: 113px;
			font-size: 15px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-vip {
			top: 350px;
			left: 74%;
			width: 113px;
			height: 113px;
			font-size: 15px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-vip {
			top: 350px;
			left: 74%;
			width: 113px;
			height: 113px;
			font-size: 15px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-vip {
			top: 350px;
			left: 74%;
			width: 113px;
			height: 113px;
			font-size: 15px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-vip {
			left: 50%;
			top: 120px;
			width: 94px;
			height: 94px;
			font-size: 12px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-vip {
			left: 50%;
			top: 120px;
			width: 94px;
			height: 94px;
			font-size: 12px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-vip {
			left: 50%;
			top: 120px;
			width: 94px;
			height: 94px;
			font-size: 12px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-vip {
			left: 50%;
			top: 120px;
			width: 94px;
			height: 94px;
			font-size: 12px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-vip {
			left: 50%;
			top: 120px;
			width: 94px;
			height: 94px;
			font-size: 12px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-vip {
			left: 50%;
			top: 120px;
			width: 94px;
			height: 94px;
			font-size: 12px
		}
	}

	.about-team__bubble-vip .about-team__bubble-title {
		padding-top: 27%
	}

	.about-team__bubble-vip .about-team__bubble-count {
		margin-top: 10px;
		font-size: 13px;
		color: #55657e;
		opacity: .6
	}

	@media(max-width:576px) {
		.about-team__bubble-vip .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-vip .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-vip .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-vip .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-vip .about-team__bubble-count {
			font-size: 10px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-vip .about-team__bubble-count {
			font-size: 10px
		}
	}

	.about-team__bubble-vip .about-team__icon {
		fill: #55657e
	}

	@media(max-width:576px) {
		.about-team__bubble-vip .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-vip .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-vip .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-vip .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-vip .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-vip .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	.about-team__bubble-vip:before {
		content: "";
		position: absolute;
		top: -10px;
		left: -10px;
		bottom: -10px;
		right: -10px;
		border: 2px solid #abe1ff;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:576px) {
		.about-team__bubble-vip:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-vip:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-vip:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-vip:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-vip:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-vip:before {
			display: none
		}
	}

	.about-team__bubble-design {
		left: 38%;
		top: 430px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		box-shadow: 0 18.6177px 24.8236px rgba(7, 15, 27, .38);
		filter: drop-shadow(0 0 10px rgba(37, 127, 221, .75));
		width: 100px;
		height: 100px;
		font-size: 18px;
		color: #2a3546;
		-webkit-animation-delay: 2.9s;
		animation-delay: 2.9s
	}

	@media(max-width:1000px) {
		.about-team__bubble-design {
			left: 30%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-design {
			left: 30%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-design {
			left: 30%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-design {
			left: 30%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-design {
			left: 30%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-design {
			left: 30%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-design {
			left: 65%;
			top: 450px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-design {
			left: 65%;
			top: 450px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-design {
			left: 65%;
			top: 450px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-design {
			left: 65%;
			top: 450px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-design {
			left: 65%;
			top: 450px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-design {
			left: 65%;
			top: 450px
		}
	}

	.about-team__bubble-design .about-team__bubble-count {
		margin-top: 8px;
		font-size: 10px;
		color: #55657e;
		opacity: .6
	}

	.about-team__bubble-design .about-team__icon {
		fill: #55657e
	}

	.about-team__bubble-design:before {
		content: "";
		position: absolute;
		top: -16px;
		left: -16px;
		bottom: -16px;
		right: -16px;
		border: 2px solid #abe1ff;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:576px) {
		.about-team__bubble-design:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-design:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-design:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-design:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-design:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-design:before {
			display: none
		}
	}

	.about-team__bubble-hr {
		left: 68%;
		top: 410px;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		box-shadow: 0 26.4572px 35.2762px rgba(7, 15, 27, .38);
		filter: drop-shadow(0 0 16px rgba(241, 95, 119, .75));
		width: 103px;
		height: 103px;
		font-size: 28px;
		-webkit-animation-delay: 3.2s;
		animation-delay: 3.2s
	}

	@media(max-width:1000px) {
		.about-team__bubble-hr {
			top: 420px;
			left: 55%;
			width: 77px;
			height: 77px;
			font-size: 21px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-hr {
			top: 420px;
			left: 55%;
			width: 77px;
			height: 77px;
			font-size: 21px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-hr {
			top: 420px;
			left: 55%;
			width: 77px;
			height: 77px;
			font-size: 21px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-hr {
			top: 420px;
			left: 55%;
			width: 77px;
			height: 77px;
			font-size: 21px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-hr {
			top: 420px;
			left: 55%;
			width: 77px;
			height: 77px;
			font-size: 21px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-hr {
			top: 420px;
			left: 55%;
			width: 77px;
			height: 77px;
			font-size: 21px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-hr {
			left: 73%;
			top: 60px;
			width: 81px;
			height: 81px;
			font-size: 19px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-hr {
			left: 73%;
			top: 60px;
			width: 81px;
			height: 81px;
			font-size: 19px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-hr {
			left: 73%;
			top: 60px;
			width: 81px;
			height: 81px;
			font-size: 19px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-hr {
			left: 73%;
			top: 60px;
			width: 81px;
			height: 81px;
			font-size: 19px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-hr {
			left: 73%;
			top: 60px;
			width: 81px;
			height: 81px;
			font-size: 19px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-hr {
			left: 73%;
			top: 60px;
			width: 81px;
			height: 81px;
			font-size: 19px
		}
	}

	.about-team__bubble-hr .about-team__bubble-count {
		margin-top: 5px;
		font-size: 12px;
		color: #ffc6cf
	}

	@media(max-width:576px) {
		.about-team__bubble-hr .about-team__bubble-count {
			font-size: 9px;
			margin-top: 10px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-hr .about-team__bubble-count {
			font-size: 9px;
			margin-top: 10px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-hr .about-team__bubble-count {
			font-size: 9px;
			margin-top: 10px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-hr .about-team__bubble-count {
			font-size: 9px;
			margin-top: 10px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-hr .about-team__bubble-count {
			font-size: 9px;
			margin-top: 10px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-hr .about-team__bubble-count {
			font-size: 9px;
			margin-top: 10px
		}
	}

	.about-team__bubble-hr .about-team__bubble-title {
		padding-top: 30%
	}

	.about-team__bubble-hr .about-team__icon {
		fill: #ffc6cf
	}

	@media(max-width:576px) {
		.about-team__bubble-hr .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-hr .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-hr .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-hr .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-hr .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-hr .about-team__icon {
			width: 9px;
			height: 9px
		}
	}

	.about-team__bubble-hr:before {
		content: "";
		position: absolute;
		top: -16px;
		left: -16px;
		bottom: -16px;
		right: -16px;
		border: 2px solid #ff7ca4;
		border-radius: 50%;
		pointer-events: none;
		opacity: .2
	}

	@media(max-width:576px) {
		.about-team__bubble-hr:before {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-hr:before {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-hr:before {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-hr:before {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-hr:before {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-hr:before {
			display: none
		}
	}

	.about-team__bubble-help {
		position: absolute;
		border-radius: 50%
	}

	.about-team__bubble-help-1 {
		top: 90px;
		left: 10%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		width: 7px;
		height: 7px;
		opacity: .7
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-1 {
			top: 200px;
			left: 8%;
			width: 21px;
			height: 21px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-1 {
			top: 200px;
			left: 8%;
			width: 21px;
			height: 21px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-1 {
			top: 200px;
			left: 8%;
			width: 21px;
			height: 21px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-1 {
			top: 200px;
			left: 8%;
			width: 21px;
			height: 21px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-1 {
			top: 200px;
			left: 8%;
			width: 21px;
			height: 21px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-1 {
			top: 200px;
			left: 8%;
			width: 21px;
			height: 21px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-1 {
			left: -10px;
			top: 80px;
			width: 32px;
			height: 32px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-1 {
			left: -10px;
			top: 80px;
			width: 32px;
			height: 32px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-1 {
			left: -10px;
			top: 80px;
			width: 32px;
			height: 32px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-1 {
			left: -10px;
			top: 80px;
			width: 32px;
			height: 32px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-1 {
			left: -10px;
			top: 80px;
			width: 32px;
			height: 32px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-1 {
			left: -10px;
			top: 80px;
			width: 32px;
			height: 32px
		}
	}

	.about-team__bubble-help-2 {
		top: 50px;
		left: 38%;
		background: #3e84ee;
		width: 7px;
		height: 7px;
		opacity: .7;
		filter: blur(1.51007px) drop-shadow(0 25.3052px 33.7403px rgba(7, 15, 27, .38))
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-2 {
			top: 80px;
			left: 30%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-2 {
			top: 80px;
			left: 30%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-2 {
			top: 80px;
			left: 30%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-2 {
			top: 80px;
			left: 30%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-2 {
			top: 80px;
			left: 30%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-2 {
			top: 80px;
			left: 30%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-2 {
			left: 13%;
			top: 100px;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-2 {
			left: 13%;
			top: 100px;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-2 {
			left: 13%;
			top: 100px;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-2 {
			left: 13%;
			top: 100px;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-2 {
			left: 13%;
			top: 100px;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-2 {
			left: 13%;
			top: 100px;
			width: 11px;
			height: 11px
		}
	}

	.about-team__bubble-help-3 {
		top: 60px;
		left: 52%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		width: 30px;
		height: 30px;
		opacity: .7
	}

	@media(max-width:576px) {
		.about-team__bubble-help-3 {
			top: -180px;
			left: 5%;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-3 {
			top: -180px;
			left: 5%;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-3 {
			top: -180px;
			left: 5%;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-3 {
			top: -180px;
			left: 5%;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-3 {
			top: -180px;
			left: 5%;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-3 {
			top: -180px;
			left: 5%;
			width: 10px;
			height: 10px
		}
	}

	.about-team__bubble-help-4 {
		top: 70px;
		left: 80%;
		opacity: .7;
		filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%);
		width: 16px;
		height: 16px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-4 {
			top: 120px;
			left: 82%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			filter: none
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-4 {
			top: 120px;
			left: 82%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			filter: none
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-4 {
			top: 120px;
			left: 82%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			filter: none
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-4 {
			top: 120px;
			left: 82%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			filter: none
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-4 {
			top: 120px;
			left: 82%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			filter: none
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-4 {
			top: 120px;
			left: 82%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			filter: none
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-4 {
			top: -155px;
			left: 93%;
			width: 12px;
			height: 12px;
			filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-4 {
			top: -155px;
			left: 93%;
			width: 12px;
			height: 12px;
			filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-4 {
			top: -155px;
			left: 93%;
			width: 12px;
			height: 12px;
			filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-4 {
			top: -155px;
			left: 93%;
			width: 12px;
			height: 12px;
			filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-4 {
			top: -155px;
			left: 93%;
			width: 12px;
			height: 12px;
			filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-4 {
			top: -155px;
			left: 93%;
			width: 12px;
			height: 12px;
			filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	.about-team__bubble-help-5 {
		top: 60px;
		left: 95%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		box-shadow: 0 14.7744px 19.6992px rgba(7, 15, 27, .38);
		width: 30px;
		height: 30px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-5 {
			top: 340px;
			left: 72%;
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-5 {
			top: 340px;
			left: 72%;
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-5 {
			top: 340px;
			left: 72%;
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-5 {
			top: 340px;
			left: 72%;
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-5 {
			top: 340px;
			left: 72%;
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-5 {
			top: 340px;
			left: 72%;
			width: 9px;
			height: 9px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-5 {
			top: 60px;
			left: 16%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-5 {
			top: 60px;
			left: 16%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-5 {
			top: 60px;
			left: 16%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-5 {
			top: 60px;
			left: 16%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-5 {
			top: 60px;
			left: 16%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-5 {
			top: 60px;
			left: 16%;
			width: 18px;
			height: 18px
		}
	}

	.about-team__bubble-help-6 {
		top: 200px;
		left: 40%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		width: 14px;
		height: 14px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-6 {
			top: 150px;
			left: 52%;
			width: 7px;
			height: 7px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-6 {
			top: 150px;
			left: 52%;
			width: 7px;
			height: 7px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-6 {
			top: 150px;
			left: 52%;
			width: 7px;
			height: 7px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-6 {
			top: 150px;
			left: 52%;
			width: 7px;
			height: 7px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-6 {
			top: 150px;
			left: 52%;
			width: 7px;
			height: 7px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-6 {
			top: 150px;
			left: 52%;
			width: 7px;
			height: 7px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-6 {
			top: 80px;
			left: 57%;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-6 {
			top: 80px;
			left: 57%;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-6 {
			top: 80px;
			left: 57%;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-6 {
			top: 80px;
			left: 57%;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-6 {
			top: 80px;
			left: 57%;
			width: 11px;
			height: 11px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-6 {
			top: 80px;
			left: 57%;
			width: 11px;
			height: 11px
		}
	}

	.about-team__bubble-help-7 {
		top: 220px;
		left: 58%;
		background: #3e84ee;
		width: 7px;
		height: 7px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-7 {
			top: 230px;
			left: 63%;
			width: 13px;
			height: 13px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-7 {
			top: 230px;
			left: 63%;
			width: 13px;
			height: 13px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-7 {
			top: 230px;
			left: 63%;
			width: 13px;
			height: 13px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-7 {
			top: 230px;
			left: 63%;
			width: 13px;
			height: 13px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-7 {
			top: 230px;
			left: 63%;
			width: 13px;
			height: 13px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-7 {
			top: 230px;
			left: 63%;
			width: 13px;
			height: 13px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-7 {
			top: 185px;
			left: 80%;
			width: 17px;
			height: 17px;
			opacity: .7;
			filter: blur(1.71932px) drop-shadow(0 28.8118px 38.4158px rgba(7, 15, 27, .38))
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-7 {
			top: 185px;
			left: 80%;
			width: 17px;
			height: 17px;
			opacity: .7;
			filter: blur(1.71932px) drop-shadow(0 28.8118px 38.4158px rgba(7, 15, 27, .38))
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-7 {
			top: 185px;
			left: 80%;
			width: 17px;
			height: 17px;
			opacity: .7;
			filter: blur(1.71932px) drop-shadow(0 28.8118px 38.4158px rgba(7, 15, 27, .38))
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-7 {
			top: 185px;
			left: 80%;
			width: 17px;
			height: 17px;
			opacity: .7;
			filter: blur(1.71932px) drop-shadow(0 28.8118px 38.4158px rgba(7, 15, 27, .38))
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-7 {
			top: 185px;
			left: 80%;
			width: 17px;
			height: 17px;
			opacity: .7;
			filter: blur(1.71932px) drop-shadow(0 28.8118px 38.4158px rgba(7, 15, 27, .38))
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-7 {
			top: 185px;
			left: 80%;
			width: 17px;
			height: 17px;
			opacity: .7;
			filter: blur(1.71932px) drop-shadow(0 28.8118px 38.4158px rgba(7, 15, 27, .38))
		}
	}

	.about-team__bubble-help-8 {
		top: 195px;
		left: 98%;
		opacity: .7;
		filter: drop-shadow(0 22.362px 29.816px rgba(7, 15, 27, .38));
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		width: 14px;
		height: 14px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-8 {
			display: none
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-8 {
			display: none
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-8 {
			display: none
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-8 {
			display: none
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-8 {
			display: none
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-8 {
			display: none
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-8 {
			top: 150px;
			left: 44%;
			display: block;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-8 {
			top: 150px;
			left: 44%;
			display: block;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-8 {
			top: 150px;
			left: 44%;
			display: block;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-8 {
			top: 150px;
			left: 44%;
			display: block;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-8 {
			top: 150px;
			left: 44%;
			display: block;
			width: 10px;
			height: 10px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-8 {
			top: 150px;
			left: 44%;
			display: block;
			width: 10px;
			height: 10px
		}
	}

	.about-team__bubble-help-9 {
		top: 240px;
		left: 90%;
		background: #3e84ee;
		width: 7px;
		height: 7px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-9 {
			top: 270px;
			left: 85%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-9 {
			top: 270px;
			left: 85%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-9 {
			top: 270px;
			left: 85%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-9 {
			top: 270px;
			left: 85%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-9 {
			top: 270px;
			left: 85%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-9 {
			top: 270px;
			left: 85%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-9 {
			top: 150px;
			left: 90%;
			width: 35px;
			height: 35px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.174px 18.8987px rgba(7, 15, 27, .38)
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-9 {
			top: 150px;
			left: 90%;
			width: 35px;
			height: 35px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.174px 18.8987px rgba(7, 15, 27, .38)
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-9 {
			top: 150px;
			left: 90%;
			width: 35px;
			height: 35px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.174px 18.8987px rgba(7, 15, 27, .38)
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-9 {
			top: 150px;
			left: 90%;
			width: 35px;
			height: 35px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.174px 18.8987px rgba(7, 15, 27, .38)
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-9 {
			top: 150px;
			left: 90%;
			width: 35px;
			height: 35px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.174px 18.8987px rgba(7, 15, 27, .38)
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-9 {
			top: 150px;
			left: 90%;
			width: 35px;
			height: 35px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.174px 18.8987px rgba(7, 15, 27, .38)
		}
	}

	.about-team__bubble-help-10 {
		top: 260px;
		left: 78%;
		opacity: .7;
		filter: drop-shadow(0 22.362px 29.816px rgba(7, 15, 27, .38));
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		width: 24px;
		height: 24px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-10 {
			top: 300px;
			left: 88%;
			width: 30px;
			height: 30px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.7744px 19.6992px rgba(7, 15, 27, .38);
			opacity: 1
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-10 {
			top: 300px;
			left: 88%;
			width: 30px;
			height: 30px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.7744px 19.6992px rgba(7, 15, 27, .38);
			opacity: 1
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-10 {
			top: 300px;
			left: 88%;
			width: 30px;
			height: 30px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.7744px 19.6992px rgba(7, 15, 27, .38);
			opacity: 1
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-10 {
			top: 300px;
			left: 88%;
			width: 30px;
			height: 30px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.7744px 19.6992px rgba(7, 15, 27, .38);
			opacity: 1
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-10 {
			top: 300px;
			left: 88%;
			width: 30px;
			height: 30px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.7744px 19.6992px rgba(7, 15, 27, .38);
			opacity: 1
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-10 {
			top: 300px;
			left: 88%;
			width: 30px;
			height: 30px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.7744px 19.6992px rgba(7, 15, 27, .38);
			opacity: 1
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-10 {
			top: 310px;
			left: 70%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-10 {
			top: 310px;
			left: 70%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-10 {
			top: 310px;
			left: 70%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-10 {
			top: 310px;
			left: 70%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-10 {
			top: 310px;
			left: 70%;
			width: 18px;
			height: 18px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-10 {
			top: 310px;
			left: 70%;
			width: 18px;
			height: 18px
		}
	}

	.about-team__bubble-help-11 {
		top: 300px;
		left: 5%;
		opacity: .7;
		filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%);
		width: 14px;
		height: 14px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-11 {
			top: 230px;
			left: 15%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-11 {
			top: 230px;
			left: 15%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-11 {
			top: 230px;
			left: 15%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-11 {
			top: 230px;
			left: 15%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-11 {
			top: 230px;
			left: 15%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-11 {
			top: 230px;
			left: 15%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-11 {
			top: 260px;
			left: 12%;
			filter: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-11 {
			top: 260px;
			left: 12%;
			filter: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-11 {
			top: 260px;
			left: 12%;
			filter: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-11 {
			top: 260px;
			left: 12%;
			filter: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-11 {
			top: 260px;
			left: 12%;
			filter: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-11 {
			top: 260px;
			left: 12%;
			filter: none
		}
	}

	.about-team__bubble-help-12 {
		top: 330px;
		left: 35%;
		opacity: .7;
		filter: drop-shadow(0 22.362px 29.816px rgba(7, 15, 27, .38));
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		width: 29px;
		height: 29px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-12 {
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.694px 19.592px rgba(7, 15, 27, .38);
			top: 350px;
			left: 31%;
			opacity: 1
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-12 {
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.694px 19.592px rgba(7, 15, 27, .38);
			top: 350px;
			left: 31%;
			opacity: 1
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-12 {
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.694px 19.592px rgba(7, 15, 27, .38);
			top: 350px;
			left: 31%;
			opacity: 1
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-12 {
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.694px 19.592px rgba(7, 15, 27, .38);
			top: 350px;
			left: 31%;
			opacity: 1
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-12 {
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.694px 19.592px rgba(7, 15, 27, .38);
			top: 350px;
			left: 31%;
			opacity: 1
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-12 {
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
			box-shadow: 0 14.694px 19.592px rgba(7, 15, 27, .38);
			top: 350px;
			left: 31%;
			opacity: 1
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-12 {
			top: 263px;
			left: 25%;
			width: 11px;
			height: 11px;
			filter: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-12 {
			top: 263px;
			left: 25%;
			width: 11px;
			height: 11px;
			filter: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-12 {
			top: 263px;
			left: 25%;
			width: 11px;
			height: 11px;
			filter: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-12 {
			top: 263px;
			left: 25%;
			width: 11px;
			height: 11px;
			filter: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-12 {
			top: 263px;
			left: 25%;
			width: 11px;
			height: 11px;
			filter: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-12 {
			top: 263px;
			left: 25%;
			width: 11px;
			height: 11px;
			filter: none
		}
	}

	.about-team__bubble-help-13 {
		top: 400px;
		left: 5%;
		background: #3e84ee;
		width: 7px;
		height: 7px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-13 {
			top: 430px;
			left: 95%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			width: 23px;
			height: 23px;
			opacity: .7
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-13 {
			top: 430px;
			left: 95%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			width: 23px;
			height: 23px;
			opacity: .7
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-13 {
			top: 430px;
			left: 95%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			width: 23px;
			height: 23px;
			opacity: .7
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-13 {
			top: 430px;
			left: 95%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			width: 23px;
			height: 23px;
			opacity: .7
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-13 {
			top: 430px;
			left: 95%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			width: 23px;
			height: 23px;
			opacity: .7
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-13 {
			top: 430px;
			left: 95%;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
			width: 23px;
			height: 23px;
			opacity: .7
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-13 {
			top: 410px;
			left: 5%
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-13 {
			top: 410px;
			left: 5%
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-13 {
			top: 410px;
			left: 5%
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-13 {
			top: 410px;
			left: 5%
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-13 {
			top: 410px;
			left: 5%
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-13 {
			top: 410px;
			left: 5%
		}
	}

	.about-team__bubble-help-14 {
		top: 380px;
		left: 33%;
		opacity: .7;
		filter: blur(2px) drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%);
		width: 14px;
		height: 14px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-14 {
			top: 320px;
			left: 33%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-14 {
			top: 320px;
			left: 33%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-14 {
			top: 320px;
			left: 33%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-14 {
			top: 320px;
			left: 33%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-14 {
			top: 320px;
			left: 33%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-14 {
			top: 320px;
			left: 33%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-14 {
			top: 400px;
			left: 33%;
			filter: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-14 {
			top: 400px;
			left: 33%;
			filter: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-14 {
			top: 400px;
			left: 33%;
			filter: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-14 {
			top: 400px;
			left: 33%;
			filter: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-14 {
			top: 400px;
			left: 33%;
			filter: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-14 {
			top: 400px;
			left: 33%;
			filter: none
		}
	}

	.about-team__bubble-help-15 {
		top: 410px;
		left: 58%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		box-shadow: 0 18.6177px 24.8236px rgba(7, 15, 27, .38);
		filter: drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
		width: 29px;
		height: 29px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-15 {
			top: 360px;
			left: 65%;
			width: 18px;
			height: 18px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-15 {
			top: 360px;
			left: 65%;
			width: 18px;
			height: 18px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-15 {
			top: 360px;
			left: 65%;
			width: 18px;
			height: 18px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-15 {
			top: 360px;
			left: 65%;
			width: 18px;
			height: 18px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-15 {
			top: 360px;
			left: 65%;
			width: 18px;
			height: 18px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-15 {
			top: 360px;
			left: 65%;
			width: 18px;
			height: 18px;
			background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
			background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%)
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-15 {
			display: none
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-15 {
			display: none
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-15 {
			display: none
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-15 {
			display: none
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-15 {
			display: none
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-15 {
			display: none
		}
	}

	.about-team__bubble-help-16 {
		top: 400px;
		left: 83%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #34b6ff 0, #1d62ca 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #34b6ff 0, #1d62ca 100%);
		filter: drop-shadow(0 33.5153px 44.6871px rgba(7, 15, 27, .38));
		width: 14px;
		height: 14px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-16 {
			top: 400px;
			left: 93%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-16 {
			top: 400px;
			left: 93%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-16 {
			top: 400px;
			left: 93%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-16 {
			top: 400px;
			left: 93%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-16 {
			top: 400px;
			left: 93%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-16 {
			top: 400px;
			left: 93%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-16 {
			top: 450px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-16 {
			top: 450px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-16 {
			top: 450px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-16 {
			top: 450px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-16 {
			top: 450px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-16 {
			top: 450px
		}
	}

	.about-team__bubble-help-17 {
		top: 410px;
		left: 10%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #fff 45.31%, #c9c9c9 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #fff 45.31%, #c9c9c9 100%);
		box-shadow: 0 22.362px 29.816px rgba(7, 15, 27, .38);
		width: 46px;
		height: 46px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-17 {
			top: 460px;
			left: 15%;
			width: 33px;
			height: 33px
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-17 {
			top: 460px;
			left: 15%;
			width: 33px;
			height: 33px
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-17 {
			top: 460px;
			left: 15%;
			width: 33px;
			height: 33px
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-17 {
			top: 460px;
			left: 15%;
			width: 33px;
			height: 33px
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-17 {
			top: 460px;
			left: 15%;
			width: 33px;
			height: 33px
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-17 {
			top: 460px;
			left: 15%;
			width: 33px;
			height: 33px
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-17 {
			top: 530px;
			left: 15%;
			width: 35px;
			height: 35px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-17 {
			top: 530px;
			left: 15%;
			width: 35px;
			height: 35px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-17 {
			top: 530px;
			left: 15%;
			width: 35px;
			height: 35px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-17 {
			top: 530px;
			left: 15%;
			width: 35px;
			height: 35px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-17 {
			top: 530px;
			left: 15%;
			width: 35px;
			height: 35px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-17 {
			top: 530px;
			left: 15%;
			width: 35px;
			height: 35px
		}
	}

	.about-team__bubble-help-18 {
		top: 460px;
		left: 20%;
		background: radial-gradient(69.78% 69.78% at 69.03%, at 5.03%, #ff6384 0, #ed1d49 100%);
		background: radial-gradient(69.78% 69.78% at 69.03% 5.03%, #ff6384 0, #ed1d49 100%);
		opacity: .7;
		filter: drop-shadow(0 22.362px 29.816px rgba(7, 15, 27, .38));
		width: 12px;
		height: 12px
	}

	@media(max-width:1000px) {
		.about-team__bubble-help-18 {
			background: #3e84ee;
			left: 24%
		}
	}

	@media(max-width:1232px) {
		.opened-left-panel .about-team__bubble-help-18 {
			background: #3e84ee;
			left: 24%
		}
	}

	@media(max-width:1325px) {
		.opened-right-panel .about-team__bubble-help-18 {
			background: #3e84ee;
			left: 24%
		}
	}

	@media(max-width:1340px) {
		.opened-contests-panel .about-team__bubble-help-18 {
			background: #3e84ee;
			left: 24%
		}
	}

	@media(max-width:1557px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-18 {
			background: #3e84ee;
			left: 24%
		}
	}

	@media(max-width:1572px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-18 {
			background: #3e84ee;
			left: 24%
		}
	}

	@media(max-width:576px) {
		.about-team__bubble-help-18 {
			top: 520px;
			left: 35%
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__bubble-help-18 {
			top: 520px;
			left: 35%
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__bubble-help-18 {
			top: 520px;
			left: 35%
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__bubble-help-18 {
			top: 520px;
			left: 35%
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__bubble-help-18 {
			top: 520px;
			left: 35%
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__bubble-help-18 {
			top: 520px;
			left: 35%
		}
	}

	.about-team__represent-title {
		font-weight: 700;
		font-size: 32px;
		line-height: 36px;
		text-align: center;
		margin-bottom: 32px
	}

	@media(max-width:576px) {
		.about-team__represent-title {
			font-size: 24px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__represent-title {
			font-size: 24px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__represent-title {
			font-size: 24px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__represent-title {
			font-size: 24px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__represent-title {
			font-size: 24px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__represent-title {
			font-size: 24px
		}
	}

	.about-team__represent-desc {
		font-weight: 500;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		max-width: 760px;
		margin: 0 auto 64px
	}

	@media(max-width:576px) {
		.about-team__represent-desc {
			font-size: 14px
		}
	}

	@media(max-width:808px) {
		.opened-left-panel .about-team__represent-desc {
			font-size: 14px
		}
	}

	@media(max-width:901px) {
		.opened-right-panel .about-team__represent-desc {
			font-size: 14px
		}
	}

	@media(max-width:916px) {
		.opened-contests-panel .about-team__represent-desc {
			font-size: 14px
		}
	}

	@media(max-width:1133px) {
		.opened-left-panel.opened-right-panel .about-team__represent-desc {
			font-size: 14px
		}
	}

	@media(max-width:1148px) {
		.opened-left-panel.opened-contests-panel .about-team__represent-desc {
			font-size: 14px
		}
	}

	.about-team__team-title {
		margin: 0 0 35px
	}

	@-webkit-keyframes bubble-bounce-data-v-125bc2f1 {
		0% {
			transform: translateY(100px);
			opacity: 0
		}

		to {
			transform: translate(0);
			opacity: 1
		}
	}

	@keyframes bubble-bounce-data-v-125bc2f1 {
		0% {
			transform: translateY(100px);
			opacity: 0
		}

		to {
			transform: translate(0);
			opacity: 1
		}
	}

	@-webkit-keyframes bubble-show-data-v-125bc2f1 {
		0% {
			opacity: 0
		}

		to {
			opacity: 1
		}
	}

	@keyframes bubble-show-data-v-125bc2f1 {
		0% {
			opacity: 0
		}

		to {
			opacity: 1
		}
	}

</style>
