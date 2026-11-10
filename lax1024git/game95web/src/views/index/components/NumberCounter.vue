<template>
	<div class="number-roller" ref="roller">
		<div class="box-left">
			<img :src="$t('jak_left')=='jak_left'?require('@/assets/images/number/jak-left.png'):$t('jak_left')" alt="">
		</div>
		<div class="number-box flex-center" :style="{backgroundImage:'url('+bg+')'}" @click="goUrl('/all-game?tab=25')">
			<div class="coin coin-1"><img src="@/assets/images/number/coin-1.png" alt=""></div>
			<div class="coin coin-2"><img src="@/assets/images/number/coin-2.png" alt=""></div>
			<div class="coin coin-3"><img src="@/assets/images/number/coin-3.png" alt=""></div>
			<div class="unit" :class="$store.state.currencyUint == 't520/unit.png'?'unit-lg':''">
				<img :src="require('@/assets/images/'+$store.state.currencyUint)" alt="">
			</div>
			<div v-for="(digit, index) in digitsWithComma" :key="index" class="digit-wrapper" :class="digit == ',' || digit == '.'?'digit-sm-wrapper':''">
				<template v-if="digit == ','">
					<div class="digit-unit"> <img src="@/assets/images/number/dou.png" :width="digitWidth"
							:height="digitHeight" /> </div>
				</template>
				<template v-else>
					<div v-if="digit == '.'" class="digit-unit"> <img src="@/assets/images/number/dot.png" :width="digitWidth"
							:height="digitHeight" /> </div>
					<div v-else class="digit" :style="{ transform: 'translateY(-' + (digit * digitHeight) + 'px)' }"> <img
							v-for="n in 10" :key="n" :src="require('@/assets/images/number/' + (n-1) + '.png')"
							:width="digitWidth" :height="digitHeight" /> </div>
				</template>
			</div>
		</div>
		<div class="box-left">
			<img :src="$t('jak_right')=='jak_right'?require('@/assets/images/number/jak-right.png'):$t('jak_right')" alt="">
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				windowWidth: null,
				digits: [],
				digitsWithComma: [],
				number: 13282184.34,
				digitWidth: 24,
				digitHeight: 35,
				bg:require('@/assets/images/number/jack-bg.png')
			};
		},
		mounted() {
			this.setDigits();
			this.startRolling();
			this.getWindowWidth();
    		window.addEventListener('resize', this.getWindowWidth);
		},
		beforeUnmount() {
			window.removeEventListener('resize', this.getWindowWidth);
		},
		methods: {
			getWindowWidth() {
				this.windowWidth = window.innerWidth;
				if(this.windowWidth<600){
					this.digitHeight = 20
				}else{
					this.digitHeight = 35
				}
			},
			setDigits() {
				this.digits = this.number.toFixed(2).toString().split('').reverse();
				this.digitsWithComma = [];
				for (let i = 0; i < this.digits.length; i++) {
					if (i % 3 === 0 && i !== 0 && i>3) {
						this.digitsWithComma.unshift(',');
					}
					this.digitsWithComma.unshift(this.digits[i]);
				}
			},
			startRolling() {
				let interval = setInterval(() => {
					this.number += parseFloat((5 + Math.random() * 5).toFixed(2));
					this.setDigits();
					let timeElapsed = Date.now() - this.$options.mountedAt;
					if (timeElapsed > 7 * 24 * 60 * 60 * 1000) {
						this.number = 13282184.34;
						this.setDigits();
						clearInterval(interval);
					}
				}, 3000);
			},
		},
		watch: {
			windowWidth(newWidth) {
			},
		},
		beforeCreate() {
			this.$options.mountedAt = Date.now();
		},
	};
</script>
<style scoped>
	.number-roller{
		margin-top: -10px;
	}
	.coin{
		position: absolute;
		font-size: 0;
	}
	.coin-1{
		left: -30px;
		top: 60%;
		width: 50px;
		-webkit-animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		infinite;
	  animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}
	.coin-2{
		left: -20px;
		top: 28%;
		width: 40px;
		-webkit-animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		infinite;
	  animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}
	.coin-3{
		right: -10px;
		top: 64%;
		width: 50px;
		-webkit-animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1)
		  infinite;
		animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
	}
	.number-roller {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
	}
	.box-left img,
	.box-right img{
		width: 160px;
	}
	.number-box{
		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 600px;
		height: 226px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		box-sizing: border-box;
		padding-top: 25px;
	}
	.digit-wrapper {
		overflow: hidden;
		position: relative;
		width: 28px;
		height: 35px;
		margin: 0 1px;
	}
	.digit-sm-wrapper{
		width: 15px;
	}
	.digit {
		display: flex;
		flex-direction: column;
		transition: transform 0.5s;
	}
	.digit img{
		width: 28px;
		height: 35px;
	}
	.unit img {
		width: 28px;
		height: 35px;
	}
	.unit-lg img {
		width: 40px;
		height: 35px;
	}
	.digit-unit{
		padding-top: 5px;
	}
	.digit-unit img {
		width: 15px;
		height: 30px;
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
		transform: rotate(0) translateX(0);
	  }
	
	  50% {
		transform: rotate(8deg) translateX(-10px);
	  }
	
	  to {
		transform: rotate(0) translateX(0);
	  }
  }
  
  @keyframes f-p2-data-v-1189e5f5 {
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
  
  @-webkit-keyframes f-p3-data-v-1189e5f5 {
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
  
  @keyframes f-p3-data-v-1189e5f5 {
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
  @media(max-width:992px){
	.box-left,
	.box-right{
		display: none;
	}
  }
  @media(max-width:600px){
	.number-box{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 340px;
		height: 128px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		box-sizing: border-box;
		padding-top: 12px;
	}
	.digit-wrapper {
		overflow: hidden;
		position: relative;
		width: 16px;
		height: 20px;
		margin: 0 1px;
	}
	.digit-sm-wrapper{
		width: 9px;
	}
	.digit img{
		width: 20px;
		height: 20px;
	}
	.unit img {
		width: 16px;
		height: 20px;
	}
	.unit-lg img{
		width: 20px;
		height: 20px;
	}
	.digit-unit{
		padding-top: 0;
	}
	.digit-unit img {
		width: 9px;
		height: 20px;
	}
	.coin-1{
		left: -15px;
		top: 50%;
		width: 40px;
	}
	.coin-2{
		left:0px;
		top: 20%;
		width: 30px;
	}
	.coin-3{
		right: -5px;
		top: 64%;
		width: 40px;
	}
  }



</style>
