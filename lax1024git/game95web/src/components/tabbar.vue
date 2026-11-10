<template>
	<div :class="['bottom-menu',isIndex?'bottom-menu-bar-index':'']">
		<div class="mask" v-if="$store.state.isWallet" @click.stop="tabMask"></div>

		<div class="bottom-menu__item" @click="handleactive(index)" v-for="(item,index) in tabbarListData" :key="index">
			<button class="menu-link" @click="menuClick" v-if="!item.path">
				<div class="icon-box">
					<img v-if="selectedMenu === index" :src="item.activeIcon" class="mb-1 size" />
					<img v-else :src="item.menIcon" class="mb-1 size" />
					<div class="new" v-if="$store.state.fiveBessings.fiveBessData.num || $store.state.msg.taskNoMsg"></div>
				</div>
				<span class="menu-link__label" :class="selectedMenu === index ? 'active' :''">{{ $t(item.name) }}</span>
			</button>

			<router-link v-else :to="item.path" class="menu-link">
				<div class="wallet-box" v-if="index === 2">
					<div :class="['wallet-wapper', 'wallet-wapper-active']">
						<div class="wallet-icon">
							<img :src="item.activeIcon"/>
						</div>
					</div>
				</div>

				<div class="tabbaricon" v-else>
					<img v-if="selectedMenu === index" :src="item.activeIcon" class="size" />
					<img v-else :src="item.menIcon" class="size" />

				</div>
				<span class="menu-link__label" :class="selectedMenu === index ? 'active' :''">{{$t(item.name)}}</span>
			</router-link>

		</div>
	</div>
</template>

<script>
	import svgIcon from '@/components/svg.vue'
	import {url_menu} from '@/api/url.js'
	export default {
		components: {
			svgIcon
		},
		name: 'Foot',
		data() {
			return {
				visible:false,
				tabscur:0,
				isIndex:false,
				timeId:null,
				menuLoading:false,
				one:true,
				two:true,
				three:true,
				four:true,
				five:true,
				tabbarListData:[
					{
						name:'菜单',
						menIcon:require('@/assets/images/tabbar/menu.png'),
						activeIcon:require('@/assets/images/tabbar/menu_1.png'),
						path:false
					},
					{
						name:'所有游戏',
						menIcon:require('@/assets/images/tabbar/game.png'),
						activeIcon:require('@/assets/images/tabbar/game_1.png'),
						path:'/all-game'
					},
					{
						name:'团队中心',
						menIcon:require('@/assets/images/tabbar/share.png'),
						activeIcon:require('@/assets/images/tabbar/share.png'),
						path:'/team-center'
					},
					{
						name:'促销活动',
						menIcon:require('@/assets/images/tabbar/promotion.png'),
						activeIcon:require('@/assets/images/tabbar/promotion_1.png'),
						path:'/rank-system'
					},
					{
						name:'我的',
						menIcon:require('@/assets/images/tabbar/my.png'),
						activeIcon:require('@/assets/images/tabbar/my_1.png'),
						path:'/mine'
					},
				],
				selectedMenu:0
			};
		},
    created() {
      let routerList = ['/purse']
      if (routerList.indexOf(this.$route.path) !== -1) {
        this.menuLoading = true
        return;
      }else {
        this.menuLoading = false
      }
      const route_name = this.$route.name
      if (route_name === "all-game") {
        this.two = !this.two
      } else if (route_name === 'activity-hall') {
        this.three = !this.three
      } else if (route_name === 'rank-system') {
        this.four = !this.four
      } else if (route_name === 'mine') {
        this.five = !this.five
      }

      console.log(this.$route, '这是获取路由！')
    },
    watch: {
      "$store.state.isWallet": function (e) {
        clearTimeout(this.timeId)
        if (e) {
          this.isIndex = e
        } else {
          this.timeId = setTimeout(() => {
            this.isIndex = e
          }, 200)
        }
      },
      // 监听路由对象中的$route属性
      '$route'(to, from) {
        // 路由变化时会触发这个函数
        // 'to' 和 'from' 是两个参数，分别代表路由变化后和变化前的路由对象
        console.log('Route changed from', from.path, 'to', to.path);
        let routerList = ['/purse']
        if (routerList.indexOf(to.path) !== -1) {
          this.menuLoading = true
        }else {
          this.menuLoading = false
        }
        // 你可以在这里根据路由变化执行相应的逻辑
      }
    },
		props:["openaside"],
		async mounted(){
			await this.getMenu()
		},
		computed:{
			menuList(){
				return this.$store.state.menuList
			}
		},
		beforeDestroy(){
			this.$store.commit("setIsWallet",false)
		},
		methods: {
			to(url){
				if(url.startsWith('http')){
					location.href = url
				}else{
					this.$router.push(url)
				}
			},
			async getMenu(){
				if(this.menuList!==null) return;
				this.menuLoading = true
				const {data} = await url_menu()
				this.menuLoading = false
				if(data.code==1){
					if(data.data.length==2){
						this.$store.commit("menuList",data.data)
					}else{
						this.$store.commit("menuList",false)
					}
				}
			},
			tabMask(){
				if(this.$store.state.loading.wallet) return
				if(!this.$store.state.loading.wallet){
					this.$store.state.isWallet=false
				}
			},
			/**
			 * 显示钱包
			 * */
			showWallet(){
				if(!this.$store.state.isLoginStatu){
					this.showLoginReg(0)
					return
				}
				if(this.$store.state.loading.wallet) return
				this.$store.commit("setIsWallet",!this.$store.state.isWallet)
				if(this.$store.state.isWallet) this.$store.state.walletGetData++
			},
			menuClick(){
				this.$emit('menuClick')
			},
			handleactive(num){
				if(this.selectedMenu == num) return
				this.selectedMenu = num
			},
		},
	}
</script>
<style scoped>
	.tabbaricon{
		width:21px;
		height:23px;
		display:flex;
		align-items: center;
		justify-content: center;
    margin-bottom: 4px;
	}
	.bottom-menu {
		z-index: 2000;
		position: fixed;
		bottom: 0;
		width: 100%;
    height: 60px;
		background-color: #161f2c;
		display: none;
		grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
		grid-column-gap: 4px;
		padding-left: 24px;
		padding-right: 24px;
		padding-bottom: 8px;
		border-top: 1px solid rgba(183, 207, 255, .0509803922);
	}
	.bottom-menu-bar-index{
		z-index: 99999;
	}
	@media(max-width:768px) {
		.bottom-menu {
			display: grid;
			padding-left: 16px;
			padding-right: 16px;
      height: 60px;
      height: calc(60px + constant(safe-area-inset-bottom));
      height: calc(60px + env(safe-area-inset-bottom));
		}
	}
	.active{
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24px;
		color: #FFFFFF;
		background: linear-gradient(172deg, #FF9001 0%, #FFBB09 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.bottom-menu__item {
		position: relative;
		height: 52px
	}

	.menu-link {
		position: relative;
		width: 100%;
		text-decoration: none;
		color: #93acd3;
		justify-content: center;
    text-align: center;
		height: 100%;
		transform: translateZ(0)
	}

	.menu-link,
	.menu-link--tooltip {
		display: flex;
		flex-direction: column;
		align-items: center
	}

	.menu-link--tooltip:hover {
		color: #fff
	}

	.menu-link--tooltip:hover>svg {
		fill: #fff
	}

	.menu-link--tooltip:hover:hover {
		color: #fff
	}

	.menu-link:before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		top: -15px;
		left: 50%;
		transform: translate(-50%);
		background: transparent;
		filter: blur(0);
		transition: all .2s ease-in-out;
		z-index: -1
	}

	.menu-link svg {
		fill: #93acd3;
		transition: fill .1s ease-in-out
	}

	.menu-link__label {
		font-weight: 600;
		font-size: 9px;
		line-height: 12px;
		transition: color .1s ease-in-out
	}

	.menu-link:hover {
		color: #93acd3
	}

	.menu-link--active {
		color: #fff
	}

	.menu-link--active>svg {
		fill: #fff
	}

	.menu-link--active:hover {
		color: #fff
	}

	.menu-link--active:before {
		content: "";
		position: absolute;
		width: 30px;
		height: 30px;
		top: -15px;
		left: 50%;
		transform: translate(-50%);
		background: #3a07f2;
		filter: blur(15px);
		opacity: 1;
		transition: all .2s ease-in-out;
		z-index: -1
	}

	.menu-link__coin {
		position: absolute;
		top: 4px;
		left: 50%;
		transform: translate(-50%) scale(1);
		width: 16px;
		height: 16px;
		-webkit-animation: pulse-data-v-ce6ef5ae .7s linear infinite;
		animation: pulse-data-v-ce6ef5ae .7s linear infinite
	}

	.menu-link__coin--static {
		-webkit-animation: none;
		animation: none;
		transform: translate(0) scale(1)
	}

	.amount {
		min-width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 5px;
		padding-right: 5px;
		background: #55657e;
		border-radius: 50px;
		border: 1px solid #161f2c;
		position: absolute;
		top: 1px;
		left: 48%;
		font-weight: 700;
		font-size: 10px;
		line-height: 8px;
		color: #fff
	}

	.amount--tag,
	.is-bonuses {
		background-color: #1bb83d
	}

	@-webkit-keyframes pulse-data-v-ce6ef5ae {
		0% {
			transform: scale(1)
		}

		50% {
			transform: scale(1.2)
		}

		to {
			transform: scale(1)
		}
	}

	@keyframes pulse-data-v-ce6ef5ae {
		0% {
			transform: scale(1)
		}

		50% {
			transform: scale(1.2)
		}

		to {
			transform: scale(1)
		}
	}

	.contests-controls {
		position: fixed;
		right: 0;
		top: 112px;
		width: 40px;
		border-radius: 10px 0 0 10px;
		background-color: #202a39;
		z-index: 10;
		transition: right .2s ease-in-out;
		cursor: pointer;
		padding: 4px
	}

	@media(max-width:1000px) {
		.contests-controls {
			position: static;
			width: auto;
			padding: 6px
		}
	}

	.contests-controls--move {
		right: 340px
	}

	.contests-controls--move-short {
		right: 325px
	}

	.contests-controls__item {
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all .2s;
		position: relative;
		border-radius: 7px
	}

	@media(max-width:1000px) {
		.contests-controls__item {
			flex-direction: row-reverse;
			justify-content: flex-end;
			padding: 6px 7.5px
		}
	}

	@media(max-width:1000px) {
		.contests-controls__item-img {
			width: 25px;
			height: 25px
		}
	}

	.contests-controls__item:not(.contests-controls__item--active):hover {
		background-color: #3c485c
	}

	.contests-controls__item:not(.contests-controls__item--active):hover .contests-controls__item-tip {
		display: block
	}

	.contests-controls__item+.contests-controls__item {
		margin-top: 4px
	}

	.contests-controls__item--active {
		background: #3a07f2
	}

	.contests-controls__item--active .contests-controls__item-tip {
		color: #fff
	}

	.contests-controls__item-tip {
		display: none;
		position: absolute;
		width: 106px;
		height: 38px;
		background: #263041;
		border-radius: 8px;
		left: -124px;
		top: 50%;
		transform: translateY(-50%);
		padding-left: 12px;
		line-height: 38px;
		font-weight: 500;
		font-size: 12px;
		color: #93acd3
	}

	@media(max-width:1000px) {
		.contests-controls__item-tip {
			position: static;
			display: block;
			width: auto;
			height: auto;
			background: none;
			transform: none;
			line-height: 18px;
			font-size: 14px
		}
	}

	.contests-controls__item-tip:after {
		content: "";
		position: absolute;
		display: block;
		right: -6px;
		top: 0;
		width: 20px;
		height: 20px;
		background: #263041;
		transform: translateY(50%) rotate(135deg);
		border-radius: 2px;
		z-index: -1
	}

	@media(max-width:1000px) {
		.contests-controls__item-tip:after {
			display: none
		}
	}
	.wallet-box{
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.wallet-wapper{
		background-color: transparent;
		width: 28px;
		height: 28px;
		transition: all .5s;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;

	}
	.wallet-wapper-active{
		background: linear-gradient(172deg, #FF9001, #FFBB09);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transform: translateY(-60%) scale(1.8);
	}
	.wallet-icon{
		transition: all .5s;
		width: 16.6px;
		height: 16.6px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.wallet-wapper-active svg{
		transition: all .5s;
		fill: #FFF;
	}
	.mask{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 999;
		height: 100%;
		width: 100%;
	}
	.item_icon{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
	}
	.item_icon .iconfont{
		font-size: 22px;
	}
	.icon-box{
		position: relative;
	}
	.new{
		width: 5px;
		height: 5px;
		background-color: red;
		border-radius: 50%;
		position: absolute;
		top: 0;
		right: 0;
	}
.size{
	width: 21px;
}
</style>
