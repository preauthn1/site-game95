<template>
	<div>
		<!-- livechat -->
		<div class="livechat">
			<button type="button" @click="toLiveSuppert" class="button livechat__btn button_lg button_blue button_center button_only-icon">
				<span class="button__inner">
					<span class="button__icon">
						<svgIcon icon="icon-livechat" widthName="22" heightName="22" className="livechat-ico"></svgIcon>
					</span>
				</span>
			</button>
		</div>
	</div>
</template>
<script>
	import svgIcon from "@/components/svg.vue";
		export default {
		  components: {
		    svgIcon,
		  },
		  props: {},
		  data() {
		    return {};
		  },
		  methods: {
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
			},
		  mounted() {},
		  created() {}
		};
</script>
<style scoped>
	/* live chat */
	.livechat {
		position: fixed;
		bottom: 15px;
		right: 15px;
		z-index: 10;
		transition: right .1s ease-in-out
	}
	.livechat.right-panel-opened {
		right: 340px
	}

	.livechat.in-sport {
		bottom: 79px
	}
	.livechat{
	    position: fixed;
		width: 44px;
		height: 44px;
	    bottom: 15px;
	    right: 15px;
	    z-index: 10;
	    transition: right .1s ease-in-out;
	}
	@media(max-width:1099.98px) {
	    .livechat {
	        bottom: 68px;
			z-index: 999;
	    }
	}
</style>
