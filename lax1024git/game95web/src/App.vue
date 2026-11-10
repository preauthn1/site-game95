<template>
  <div id="app" :class="$t('base_class')">
    <keep-alive :include="keepPages">
      <router-view></router-view>
    </keep-alive>
		<msgPop ref="msgPop" />
		<giftAmountPop />
    <pddPop v-if="$route.query.modal!='LoginRegistration'" />
		<advertisement ref="advertisement"/>
    <notice></notice>
  </div>
</template>
<script>
import advertisement from "@/components/advertisement.vue"
import msgPop from "@/components/msgPop.vue"
import giftAmountPop from "@/components/giftAmountPop.vue"
import pddPop from '@/components/pdd/pddPop.vue'
import { getWsToken } from "@/api/user"
import updateLangAndSystem from '@/common/updateLangAndSystem.js';
import notice from '@/components/notice.vue'
import socketRouter from '@/utils/SocketRouter'
export default {
	components:{
		msgPop,
    pddPop,
		giftAmountPop,
		advertisement,
    notice,
	},
	mounted(){
		// 更新五福数据 判断路由避免重复拉取接口
		if( window.location.hash!="#/" && window.location.hash!="#/five-bessings") this.$store.dispatch("fiveBessings/updateFiveBessData")
		this.initGlobalCss()
		window.addEventListener("resize",()=>{
			this.$store.commit("setWindowWidth")
		})
	},
	methods: {
		// 添加全局css 变量
    initGlobalCss(){
      const el_skeleton__image = `url(${this.$t('placeholder_img')=='placeholder_img'?"/"+require('@/assets/images/anwen.png'):this.$t('placeholder_img')})`
      document.documentElement.style.setProperty("--el-skeleton-image",el_skeleton__image)
    },
		async initSocket() {
			const _this = this
			await getWsToken().then(response => {
				if (response.data.code == 1) {
					const res = response.data.data;
					this.$helper.set("socketUrl", res.WebSocket);
					this.$helper.set("socketToken", res.token);
					this.$helper.set("socketUid", res.uid);
					const url = res.WebSocket;
					if (url != "") {
						_this.$ws.initWebSocket(_this.receiveMessage, url,()=>{
							_this.$ws.send({
								type:"online",
								op:"page",
								page:this.$route.path
							})
						});
					}
				}
			});
		},
		receiveMessage(e) {
			if (!e) return;
			const params = this.$helper.parseMsg(e.data);
			if (params && params["order"] == "msg") {
				socketRouter.start(params["mode"],params)
				params["title"] = decodeURIComponent(params["title"]);
				params["msg"] = decodeURIComponent(params["msg"]);
				switch (params["mode"]) {
					case "recharge":
						var content = JSON.parse(params['msg'])
						this.tips(this.$t(content['msg']) + content['current_symbol'] + this.numFormat(content['amount']), params["title"], params['showtime'],require('@/assets/images/msg-icon3.png'))
						this.addUserBalance(content.amount)
						break;
					case "activity":
						var content = JSON.parse(params['msg'])
						this.tips(this.$t(content['msg']) + content['current_symbol'] + this.numFormat(content['amount']), params["title"], params['showtime'],require('@/assets/images/msg-icon4.png'))
						this.addUserBalance(content.amount)
						break;
					case "pop":
						this.$refs.msgPop.show({
							title:params["title"],
							msg:params["msg"]
						})
						break;
					case "withdraw":
						this.tips(params["msg"], params["title"], params['showtime'],require('@/assets/images/msg-icon2.png'))
						break;
					case "task":
						this.$store.commit("msg/updateNoMsgTask",this.$store.state.msg.taskNoMsg + 1)
						this.$refs.msgPop.show({
							title:this.$t("任务"),
							msg:this.$t("您有新任务还未领取，抓紧时间领取把！"),
							buttonText:"查看细节",
							callBack:()=>{
								this.$router.push("/layout/task-center")
							}
						})
						break;
					case "advertising":
						var content = JSON.parse(params['msg'])
						this.$refs.advertisement.show(content.data)
						break;
					default:
						this.tips(params["msg"], params["title"], params['showtime'])
				}
			}
		},
		watchRouterAndSendWs(to,from){
			// 监听路由并用ws向后台传输,只记录路径
			if(to.path!=from.path){
				this.$ws.send({
					type:"online",
					op:"page",
					page:to.path
				})
			}
			// 监听游戏界面路由，向后台传输
			if(to.path=="/game-detail"){
				this.$ws.send({
					type:"online",
					op:"playgame",
					gameid:to.query.id
				})
			}
		}
	},
	watch: {
		$route(to, from) {
			this.watchRouterAndSendWs(to,from)
			if (!this.$store.state.blanceStatus) {
				this.$store.commit("$vuexSetBlanceShowState", true);
			}
		},
		"$store.state.isLoginStatu": {
			async handler(v) {
				// 更新系统配置和语言包
				updateLangAndSystem({i18n:this.$i18n,data:{}})
				if (v) {
					await this.initSocket()
				}else{
					this.$ws.close()
				}
			},
		}
	},
	computed: {
		keepPages() {
			return this.$store.getters.getKeepPages.split(',');
		}
	}
}
</script>

<style>
</style>
