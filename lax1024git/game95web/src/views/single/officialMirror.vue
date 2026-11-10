<template>
	<div>
		<div class="mirrors">
			<div class="mirrors__logo-link">
				<router-link to="/">
					<picture class="logo__picture">
						<img :src="require('@/assets/images/'+$store.state.siteLogo)"   class="logo__img">
					</picture>
				</router-link>
			</div>
			<div class="mirrors__content">
				<div class="mirrors-right">
					<div class="mascot-peo">
						<img src="../../assets/images/mirror/mascot.png" alt="">
						<img src="../../assets/images/mirror/gift-middle.png" class="gift-middle" alt="">
					</div>
					<div class="mirrors-photo">
						<img src="../../assets/images/mirror/main-pic.png" alt="">
					</div>
					<img src="../../assets/images/mirror/gift-small.png" class="gift-small" alt="">
					<img src="../../assets/images/mirror/coin-1.png" class="coin-1" alt="">
					<img src="../../assets/images/mirror/coin-2.png" class="coin-2" alt="">
					<img src="../../assets/images/mirror/coin-3.png" class="coin-3" alt="">
				</div>
				<div class="mirrors-left">
					<div class="mirrors-grid">
						<div class="mirrors-title">{{ $t('主域名') }}</div>
						<div class="mirrors-sub-title">{{ $t('Official Mirror Sites') }}</div>
						<div class="mirrors-desc text-gray">{{ $t('网页描述') }}</div>
					</div>
					<div class="mirrors-domain">
						<div class="button-domain">{{ $t('主域名') }}</div>
						<el-row :gutter="16">
							<el-col :xs="24" :sm="12" v-for="(row,index) in urls" :key="`url${index}`">
								<div class="domains__list-item">
									<div class="item-icon">
										<span class="el-icon-link"></span>
									</div>
									<div class="flex_bd"><a target="_blank" :href="`https://${row.url}`" class="domains__list-item-href">{{ row.url }}</a></div>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import svgIcon from '@/components/svg.vue'
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
					{url:this.$t('镜像域名4'), status:'Online'},
					{url:this.$t('镜像域名5'), status:'Online'},
					{url:this.$t('镜像域名6'), status:'Online'},
					{url:this.$t('镜像域名7'), status:'Online'},
					{url:this.$t('镜像域名8'), status:'Online'},
				]
			};
		},
		methods: {},
		mounted() {},
	}
</script>
<style scoped>
	.mirrors__logo-link{
		margin-bottom: 100px;
	}
	.mirrors{
		max-width: 1200px;
		padding: 50px 20px;
		margin: 0 auto;
	}
	.mirrors__content{
		display: flex;
		align-items: center;
	}
	.mirrors-grid{
		margin-bottom: 60px;
	}
	.mirrors-grid .mirrors-title{
		font-size: 52px;
		color: #AE00E0;
		font-weight: bold;
		line-height: 1.2;
		margin-bottom: 10px;
	}
	.mirrors-grid .mirrors-sub-title{
		font-size: 36px;
		color: #AE00E0;
		font-weight: bold;
		line-height: 1.2;
	}
	.mirrors-grid .mirrors-desc{
		font-size: 14px;
		margin-top: 15px;
	}
	.button-domain{
		border-radius:20px;
		height: 60px;
		padding: 0 20px;
		width: 260px;
		font-size: 18px;
		display: inline-flex;
		align-items: center;
		margin-bottom: 40px;
		background-image: linear-gradient(to right,#9f59fe,#3e2fdc,#bbafff);
	}
	.domains__list-item{
		border-radius: 10px;
		display: flex;
		align-items: center;
		height: 42px;
		margin-bottom: 20px;
		background: #1F2027;
	}
	.domains__list-item a{
		color: #9352FA;
		font-weight: bold;
		text-decoration: none;
	}
	.domains__list-item .flex_bd{
		padding: 0 10px 0 15px;
	}
	.domains__list-item .item-icon{
		background: #4C567A;
		border-radius: 10px;
		height: 42px;
		width: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
	}
	.domains__list-item .item-icon span{
		font-size: 28px;
	}
	.mirrors-domain{
		max-width: 520px;
	}
	.mirrors-right{
		position: relative;
		margin-left: 40px;
	}
	.mirrors-photo{
		margin-left: -30px;
	}
	.mascot-peo{
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	.mascot-peo .gift-middle{
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
		-webkit-animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		  infinite;
		animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}
	.mirrors-right .gift-small{
		position: absolute;
		top: 10%;
		left: 62%;
		z-index: 1;
		-webkit-animation: f-p4-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		  infinite;
		animation: f-p4-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}
	.mirrors-right .coin-1{
		position: absolute;
		top: 0;
		left: 48%;
		z-index: 1;
		-webkit-animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		  infinite;
		animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}
	.mirrors-right .coin-2{
		position: absolute;
		top: 42%;
		right: 8%;
		z-index: 1;
		-webkit-animation: f-p5-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		  infinite;
		animation: f-p5-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}
	.mirrors-right .coin-3{
		position: absolute;
		right:20%;
		bottom: 8%;
		z-index: 1;
		-webkit-animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		  infinite;
		animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}

	@media (min-width:820px) {
		.mirrors__content{
			flex-flow: row-reverse;
		}
	}
	@media (max-width: 819px) {
		.mirrors-right{
			margin-left: 0;
		}
		.mascot-peo .gift-middle{
			max-width: 60%;
		}
		.mascot-peo{
			width: 200px;
		}
		.mirrors__content{
			display: block;
		}
		.mirrors__logo-link{
			margin-bottom: 40px;
		}
		.mirrors{
			padding: 40px 15px;
		}
		.mirrors-right .gift-small{
			width: 40px;
		}
		.mirrors-right .coin-1{
			width: 35px;
		}
		.mirrors-right .coin-2{
			width: 27px;
		}
		.mirrors-right .coin-3{
			width: 44px;
		}
		.mirrors-left{
			padding:10px;
		}
		.mirrors-grid .mirrors-title{
			font-size: 40px;
		}
		.mirrors-grid .mirrors-sub-title{
			font-size: 20px;
		}	
	}






@-webkit-keyframes f-p1-data-v-1189e5f5 {
	0% {
	  transform: translate(0);
	}
  
	50% {
	  transform: translate(7px, 10px);
	}
  
	to {
	  transform: translate(0);
	}
  }
  
  @keyframes f-p1-data-v-1189e5f5 {
	0% {
	  transform: translate(0);
	}
  
	50% {
	  transform: translate(7px, 10px);
	}
  
	to {
	  transform: translate(0);
	}
  }
  
  @-webkit-keyframes f-p2-data-v-1189e5f5 {
	0% {
	  transform: rotate(10deg);
	}
  
	50% {
	  transform: rotate(0);
	}
  
	to {
	  transform: rotate(10deg);
	}
  }
  
  @keyframes f-p2-data-v-1189e5f5 {
	0% {
	  transform: rotate(10deg);
	}
  
	50% {
	  transform: rotate(0);
	}
  
	to {
	  transform: rotate(10deg);
	}
  }
  
  @-webkit-keyframes f-p3-data-v-1189e5f5 {
	0% {
	  transform: rotate(10deg);
	}
  
	50% {
	  transform: rotate(0);
	}
  
	to {
	  transform: rotate(10deg);
	}
  }
  
  @keyframes f-p3-data-v-1189e5f5 {
	0% {
	  transform: rotate(10deg);
	}
  
	50% {
	  transform: rotate(0);
	}
  
	to {
	  transform: rotate(10deg);
	}
  }
  
  @-webkit-keyframes f-p4-data-v-1189e5f5 {
	0% {
	  transform: rotate(0);
	}
  
	50% {
	  transform: rotate(10deg);
	}
  
	to {
	  transform: rotate(0);
	}
  }
  
  @keyframes f-p4-data-v-1189e5f5 {
	0% {
	  transform: rotate(0);
	}
  
	50% {
	  transform: rotate(10deg);
	}
  
	to {
	  transform: rotate(0);
	}
  }
  
  @-webkit-keyframes f-p5-data-v-1189e5f5 {
	0% {
	  transform: rotate(0) translateX(0);
	}
  
	50% {
	  transform: rotate(8deg) translateX(-10px);
	}
  
	to {
	  transform: rotate(0) translateX(0);
	}
  }
  
  @keyframes f-p5-data-v-1189e5f5 {
	0% {
	  transform: rotate(0) translateX(0);
	}
  
	50% {
	  transform: rotate(8deg) translateX(-10px);
	}
  
	to {
	  transform: rotate(0) translateX(0);
	}
  }
  
  @-webkit-keyframes f-p6-data-v-1189e5f5 {
	0% {
	  transform: rotate(0) translateX(0);
	}
  
	50% {
	  transform: rotate(10deg) translateX(-15px);
	}
  
	to {
	  transform: rotate(0) translateX(0);
	}
  }
  
  @keyframes f-p6-data-v-1189e5f5 {
	0% {
	  transform: rotate(0) translateX(0);
	}
  
	50% {
	  transform: rotate(10deg) translateX(-15px);
	}
  
	to {
	  transform: rotate(0) translateX(0);
	}
  }



</style>
