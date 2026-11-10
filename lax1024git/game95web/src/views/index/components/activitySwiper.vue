<template>
	<div>
		<swiper class="turntable-thumbs" :options="turntableThumbs" ref="swiperThumbs">
			<swiper-slide v-for="(item, index) in hotList" :key="`hot${index}`">
				<div @click="showMore(item)" class="picture__link-box">
					<img v-if="item.c_img" v-lazy="item.c_img" alt="" class="img">
				</div>
			</swiper-slide>
		</swiper>
		<activityShowDiolog :content="activityItem" ref="activityShowDiolog"></activityShowDiolog>
	</div>
</template>

<script>
import activityShowDiolog from "@/components/activityShowDiolog.vue";
import {
	action_nologin_list_api,
	action_detail_api
} from "@/api/action";
export default {
	components: {
		activityShowDiolog
	},
	data() {
		return {
			hotList: [],
			turntableThumbs:{
				autoplay: {
					delay: 4500,
					disableOnInteraction: false,
				},
				pagination: {
					el: ".swiper-pagination",
					clickable: true
				},
				navigation: {
					nextEl: ".splide__arrow--next",
					prevEl: ".splide__arrow--prev"
				},
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 0,
			},
			activityItem:[]
		}
	},
	mounted() {
		this.getActionList(1);
	},
	methods: {
		showMore(item){
			this.$refs.activityShowDiolog.show()
			this.activityItem = item
			// this.infoTitle = tit,
			// this.infoContent = content,
			// this.typeid = typeid
			// this.activityId = id
		},
		// 活动列表
		async getActionList(is_hot) {
			let data = {
				page: this.listPage,
				limit: is_hot ? 3 : this.listLimit,
				is_hot: is_hot
			};
			await action_nologin_list_api(data).then(res => {
				if (res && res.data.code == 1) {
					if (is_hot) {
						this.hotList = res.data.data;
					} else {
						this.activityList = res.data.data;
					}
				} else {

				}
			});
		},
	}
};
</script>

<style scoped>
.turntable-thumbs {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 222;
	width: 343px;
	height: 275px;
	overflow: hidden;
	border-radius: 8px;
}
@media (max-width : 768px) {
	.turntable-thumbs {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 222;
		width: 100%;
		height: calc(100% * .8);
		overflow: hidden;
		border-radius: 8px;
	}
}
.picture__link-box {
	line-height: 1;
	height: 100%;
}

.picture__link-box img {
	width: 100%;
	object-fit: cover;
	border-radius: 8px;
	height: 100%;
}
</style>
