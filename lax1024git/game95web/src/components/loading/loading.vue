//index.vue
<template>
	<transition name="animation">
		<div :style="{ background: background }" v-if="visable" class="loaidng">
			<div class="loading-cell flash">
				<img :src="imgSrc">
			</div>
		</div>
	</transition>
</template>

<script>
	import helper from '@/common/helper.js';
	export default {
		data() {
			return {
				visable: false,
				text: "loading...",
				background: "#0d131c",
				imgSrc:''
			};
		},
		mounted() {
			this.imgSrc = helper.get('rule')?.website_pc_logo || process.env.VUE_APP_SITE_LOGO
		}
	};
</script>

<style>
	.animation-enter,
	.animation-leave-to {
		opacity: 0;
	}

	.animation-enter-active,
	.animation-leave-active {
		transition: opacity 0s;
	}

	.loaidng {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 20px;
	}

	@-webkit-keyframes flash {

		0%,
		50%,
		to {
			opacity: 1
		}

		25%,
		75% {
			opacity: 0
		}
	}

	@keyframes flash {

		0%,
		50%,
		to {
			opacity: 1
		}

		25%,
		75% {
			opacity: 0
		}
	}

	.flash {
		-webkit-animation-name: flash;
		animation-name: flash;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-duration: 4s;
		animation-duration: 4s
	}
</style>
