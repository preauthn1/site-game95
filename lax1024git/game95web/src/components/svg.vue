<template>
	<svg :width="widthName" :height="heightName" focusable="false" aria-hidden="true" :class="className">
		<use :xlink:href="href" class="svg-use"></use>
	</svg>
</template>

<script>
	export default {
		props: {
			icon: String,
			className: {
				type: String,
				default: "icon-arrow"
			},
			widthName: {
				type: String,
				default: "24"
			},
			heightName: {
				type: String,
				default: "24"
			},
		},
		computed: {
			href() {
				return require('../assets/fonts/svg-sprite.svg')+'#'+this.icon
			}
		},
		data: function() {
			return {
				// href: require('../assets/fonts/svg-sprite.svg')+'#'+this.icon,
				diyclassName:this.className
			}
		}
	}
</script>
