<template>
	<div class="app lotter-app"
		:class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`">
		<Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" />
		<div class="wrapper">
			<div class="wrapper__inner">
				<div class="lotter-container" v-if="detail">
					<div class="lotter-top">
						<span class="el-icon-circle-close" @click="back()"></span>
					</div>
					<div class="lot-tabs" v-if="this.tabs.length > 1">
						<div class="lot-tab-item" :class="cur == index?'active':''" v-for="(item,index) in tabs" :key="index" @click="lotab(index, item.id)">
							{{ item.name }}
						</div>
					</div>
					<div class="lot-card">
						<div class="lot-head">
							<div class="lot-period">
								<div>{{ $t("本期彩票") }}</div>
								<div>{{ detail.current.qishu }}</div>
							</div>
							<div class="lot-top">
								{{ $t("开奖倒计时") }}
							</div>
							<div class="lot-rule" @click="ruleShow">{{ $t("规则") }}</div>
						</div>
						<div class="log-main">
							<div class="lot-deadline">
								<el-statistic
								v-show="false"
								ref="statistic_close"
								@finish="closeTime"
								format="HH:mm:ss"
								:value="close_time"
								:value-style="valueStyle"
								title=""
								time-indices
								>
								</el-statistic>
								<el-statistic
								ref="statistic_draw"
								@finish="drawTime"
								format="HH:mm:ss"
								:value="draw_time"
								:value-style="valueStyle"
								title=""
								time-indices
								>
									<template slot="suffix">
										<span v-if="is_draw" style="color: #01d860;">{{ $t('开奖中') }}</span>
										<span v-if="!is_draw && is_close" style="color: yellow">{{ $t('封盘中') }}</span>
									</template>
								</el-statistic>
							</div>
							<div class="result-number" v-if="detail.last">
								<div class="number-box" v-for="(item,index) in detail.last.balls" :key="index">
									{{ item }}
								</div>
							</div>
							<div class="result-infomation">
								<div class="result-box" v-for="(item,index) in detail.last.result" :key="index">
									<div class="label">{{ getText(index) }}</div>
									<div class="value">{{ $t(item) }}</div>
								</div>
							</div>
						</div>
						<div class="lot-left">
							<img src="../../../assets/images/lotter/left.png" alt="">
						</div>
						<div class="lot-right">
							<img src="../../../assets/images/lotter/right.png" alt="">
						</div>
					</div>
					
					<div class="lotter-panel">
						<div class="lot-head">
							<div class="lot-title">{{ $t('玩法选择') }}</div>
						</div>
						<div class="lot-body lot-scroll">
							<el-radio-group v-model="bet_group" size="small">
								<el-radio-button v-for="item,index in detail.odds" :label="index" :key="index">{{ getText(index) }}</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lotter-panel" v-if="bet_group">
						<div class="lot-head">
							<div class="lot-title">{{ $t('号码选择') }}</div>
						</div>
						<div class="lot-body lot-scroll">
							<el-checkbox-group v-model="bet_option" size="small" @change="onBet">
								<el-checkbox-button v-for="item,index in detail.odds[bet_group]" :label="index" :key="index">
									{{ getText(index) }}<br>
									{{ item }}
								</el-checkbox-button>
							</el-checkbox-group>
						</div>
					</div>
					<div class="lotter-panel">
						<div class="lot-head">
							<div class="lot-title">{{ $t('快捷投注') }}</div>
						</div>
						<div class="lot-body lot-scroll">
							<el-radio-group @input="onQuick" v-model="quickValue" size="small">
								<el-radio-button v-for="item in quickList" :label="item" :key="item"></el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lotter-panel" v-if="!isMobileFlag">
						<div class="bet-foot">
							<el-button @click="onBetOrder" class="button_blue bet-button">
								<div>{{ $t("立即下注") }}</div>
								<div class="currency">
									<img width="20" height="20" :src="require('@/assets/images/'+$store.state.currencyIcon)" loading="lazy"
										class="currency__icon" />
									<div class="currency__balances-wrap">
										<div class="currency__balances">
											<span>{{ numFormat(totalAmount) }}</span>
										</div>
									</div>
								</div>
							</el-button>
						</div>
					</div>
					<div class="lotter-panel" v-if="!isMobileFlag">
						<div class="lot-head flex-center">
							<div class="lot-label">{{ $t("共{0}张门票", [betsData.length]) }}</div>
							<div class="lot-del" @click="onClearAll">
								<span class="iconfont icon-shanchu"></span><span>{{ $t('清空所有') }}</span>
							</div>
						</div>
						<div class="lot-body">
							<div class="table-panel">
								<el-table :data="betsData" style="width: 100%" stripe>
									<el-table-column :label="$t('操作')" width="100" align="center">
										<template slot-scope="scope">
											<span class="iconfont icon-shanchu text-red"
												@click="handleDelete(scope.$index, scope.row)"></span>
										</template>
									</el-table-column>
									<el-table-column prop="bet_group" :label="$t('玩法')" width="160">
										<template slot-scope="scope">
											<span style="color: #828999;">{{ getText(scope.row.bet_group) }}[{{ getText(scope.row.bet_option) }}]</span>
										</template>
									</el-table-column>
									<el-table-column prop="lt_bv" :label="$t('倍率')" width="130">
										<template slot-scope="scope">
											<span style="color: #828999;">{{ scope.row.odds }}</span>
										</template>
									</el-table-column>
									<el-table-column prop="amount" :label="$t('投注金额')" width="200">
										<template slot-scope="scope">
											<el-input type="number" v-model="scope.row.amount" @input="onAmount(scope.row,scope.$index)" :placeholder="$t('输入投注金额')">
											</el-input>
										</template>
									</el-table-column>
									<el-table-column prop="profit" :label="$t('预估获利')" >
										<template slot-scope="scope">
											<span class="currency">
												<img width="20" height="20" :src="require('@/assets/images/'+$store.state.currencyIcon)" loading="lazy" class="currency__icon" />
												<div class="currency__balances-wrap">
													<div class="currency__balances">
														<span>{{ numFormat(scope.row.profit) }}</span>
													</div>
												</div>
											</span>
										</template>
									</el-table-column>
								</el-table>
								
							</div>
						</div>
					</div>
					<div v-if="lottery_id > 0" class="lotter-panel">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane :label="$t('我的彩票')" name="first">
								<myLotter :id="lottery_id"  ref="myLotterKey" :detail="detail"></myLotter>
							</el-tab-pane>
							<el-tab-pane :label="$t('往期开奖')" name="second">
								<history :id="lottery_id" :detail="detail"></history>
							</el-tab-pane>
							<el-tab-pane :label="$t('大赢家')" name="third">
								<bigWinner :id="lottery_id" :detail="detail"></bigWinner>
							</el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</div>
			<div v-if="isMobileFlag" class="lotter-popup" :class="popupShow?'is-active':''">
				<div class="lotter-bar" @click.stop="lotterShow">
					<div class="lotter-circle">{{ betsData.length }}</div>
				</div>
				<div class="lotter-popup-main">
					<div class="lotter-popup-top" @click="onClearAll">
						<span class="iconfont icon-shanchu"></span><span>{{ $t('清空所有') }}</span>
					</div>
					<div class="lotter-popup-body">
						<div class="table-panel">
							<el-table :data="betsData" style="width: 100%" stripe>
								<el-table-column :label="$t('操作')" width="100" align="center">
									<template slot-scope="scope">
										<span class="iconfont icon-shanchu text-red"
											@click="handleDelete(scope.$index, scope.row)"></span>
									</template>
								</el-table-column>
								<el-table-column prop="bet_group" :label="$t('玩法')" width="160">
									<template slot-scope="scope">
										<span style="color: #828999;">{{ getText(scope.row.bet_group) }}[{{ getText(scope.row.bet_option) }}]</span>
									</template>
								</el-table-column>
								<el-table-column prop="lt_bv" :label="$t('倍率')" width="110">
									<template slot-scope="scope">
										<span style="color: #828999;">{{ scope.row.odds }}</span>
									</template>
								</el-table-column>
								<el-table-column prop="amount" :label="$t('投注金额')" width="200">
									<template slot-scope="scope">
										<el-input type="number" v-model="scope.row.amount" @input="onAmount(scope.row)" :placeholder="$t('输入投注金额')">
										</el-input>
									</template>
								</el-table-column>
								<el-table-column prop="profit" :label="$t('预估获利')" >
									<template slot-scope="scope">
										<span class="currency">
											<img width="20" height="20" :src="require('@/assets/images/'+$store.state.currencyIcon)" loading="lazy" class="currency__icon" />
											<div class="currency__balances-wrap">
												<div class="currency__balances">
													<span>{{ numFormat(scope.row.profit) }}</span>
												</div>
											</div>
										</span>
									</template>
								</el-table-column>
							</el-table>
							<div class="table-foot">
								<el-button @click="onBetOrder" class="button_blue bet-button">
									<div>{{ $t("立即下注") }}</div>
									<div class="currency">
										<img width="20" height="20" :src="require('@/assets/images/'+$store.state.currencyIcon)" loading="lazy"
											class="currency__icon" />
										<div class="currency__balances-wrap">
											<div class="currency__balances">
												<span>{{ numFormat(totalAmount) }}</span>
											</div>
										</div>
									</div>
								</el-button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Foot />
		</div>
		<!-- rule diolog -->
		<el-dialog :visible.sync="ruleVisible" custom-class="custom-dialog " :modal-append-to-body="false">
			<div class="custom-dialog-head" slot="title">
			  <div class="header__title">
			    <h1>{{ruleTitle}} {{$t("规则")}}</h1>
			  </div>
			</div>
			<div class="news__body" v-html="ruleCont"></div>
		</el-dialog>
		<asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
		<div class="app-overlay" v-if="isMobileFlag" :class="openedleft?'visible':''" @click="menuClick"></div>
	</div>
</template>

<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import bigWinner from "./components/bigWinner.vue";
import history from "./components/history.vue";
import myLotter from "./components/myLotter.vue";
import {
	get_s_lottery_api,
	get_s_lottery_detail_api, post_s_lottery_order_api
} from "@/api/lottery";
export default {
	name: "lotter",
	components: {
		Head,
		Foot,
		asidebar,
		svgIcon,
		tabbar,
		bigWinner,
		myLotter,
		history
	},
	data() {
		return {
			cur: 0,
			popupShow:false,
			tabs: [],
			lottery_id: 0,
			lottery: null,
			detail: null,
			is_draw: false,
			is_close: false,
			close_time: 0,
			draw_time: 0,
			valueStyle:{
				color:"#ffffff"
			},
			activeName: 'first',
			bet_group: '',
			quickValue: '',
			quickList: ["1000", "2000", "3000", "4000", "5000", "6000", "7000", ],
			bet_option: [],
			betsData: [],
			totalAmount: 0,
			is_loading: false,
			is_order: false,
			ruleCont:'',
			ruleTitle:'',
			ruleVisible:false
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		handleDelete(index, row) {
			this.bet_option.splice(this.bet_option.indexOf(row.bet_option), 1)
			this.totalAmount -= row.amount;
			this.betsData.splice(index, 1);
		},
		onClearAll() {
			this.totalAmount = 0;
			this.betsData = [];
			this.bet_option = [];
		},
		lotab(index, lottery_id) {
			this.cur = index
			this.lottery_id = lottery_id
		},
		closeTime() {
			if (this.is_loading) {
				return;
			}
			this.tips('当前封盘了,投注时请注意期号');
			this.is_close = true;
		},
		drawTime() {
			if (this.is_loading) {
				return;
			}
			this.is_draw = true;
			this.getDetail();
		},
		lotterShow(){
			this.popupShow = !this.popupShow
		},
		menuClick() {
			this.openedleft = !this.openedleft;
		},
		contestsShow() {
			this.openedcontests = true;
		},
		getText( index ) {
			return this.detail.options_text[index] ? this.$t(this.detail.options_text[index]) : this.$t(index)
		},
		onAmount(row,index) {
			// console.log(row)
			// if (!row.amount) {
			// 	return
			// }
			row.amount && row.amount !="undefined" ?row.amount:0
			row.profit = row.amount * row.odds
			this.totalAmount = 0;
			this.betsData.forEach((row) => {
				if(!row.amount){
					return
				}
				this.totalAmount += parseFloat(row.amount)
			});
		},
		onQuick(value) {
			this.totalAmount = 0;
			this.betsData.forEach((row) => {
				row.amount = value;
				row.profit = row.amount * row.odds;
				if (!isNaN(this.quickValue)) {
					this.totalAmount += parseFloat(value)
				}
			});
		},
		onBet() {
			this.betsData.forEach((row, index) => {
				if (!this.bet_option.includes(row.bet_option)) {
					this.betsData.splice(index, 1);
					this.totalAmount -= row.amount
				}
			});
			this.bet_option.forEach((option, index) => {
				if (this.betsData.length > index) {
					return
				}
				let row = {
					bet_group: this.bet_group,
					bet_option: option,
					odds: this.detail.odds[this.bet_group][option],
					amount: this.quickValue,
					profit: 0
				}
				if (!isNaN(this.quickValue) && this.quickValue > 0) {
					this.totalAmount += parseFloat(this.quickValue)
					row.profit = row.amount * row.odds
				}
				this.betsData.push(row)
			});
		},
		getDetail() {
			let self = this
			if (self.is_loading) {
				return;
			}
			self.is_loading = true;
			get_s_lottery_detail_api({id: this.lottery_id}).then(response => {
				const res = response.data;
				if (res.code == 1) {
					this.detail = res.data;
					self.quickList = res.data.info.quick_amount
					self.ruleCont = res.data.info.rule_text
					self.ruleTitle = this.$t(res.data.info.name)
					self.close_time = Date.now() + 1000 * this.detail.current.close_time
					self.draw_time = Date.now() + 1000 * (this.detail.current.draw_time + 1)
					self.is_close = false;
					self.is_draw = false;
					self.is_loading = false;
				} else {
					this.errorTips(res.msg);
				}
			})
		},
		getLottery() {
			get_s_lottery_api().then((response) => {
				const res = response.data;
				if (res.code == 1) {
					this.tabs = res.data
					this.lottery_id = this.tabs[0].id
					this.getDetail();
				} else {
					this.errorTips(res.msg);
				}
			})
		},
		onBetOrder() {
			if (!this.$store.state.isLoginStatu) {
				this.showLoginReg(0);
				return
			}
			if (this.is_order) {
				return;
			}
			if (this.betsData.length <= 0 || this.totalAmount <= 0) {
				return;
			}
			let data = {lottery_id: this.lottery_id, order_data: []};
			this.betsData.forEach(row => {
				let order = {
					bet_group: row.bet_group,
					bet_option: row.bet_option,
					amount: row.amount
				}
				data.order_data.push(order);
			});
			this.is_order = true;
			post_s_lottery_order_api(data).then(response => {
				const res = response.data;
				if (res.code == 1) {
					this.successTips('投注成功');
					this.$refs.myLotterKey.getData();
					this.onClearAll()
				} else {
					this.errorTips(res.msg);
				}
				this.is_order = false;
			})
		},
		ruleShow(){
			this.ruleVisible = true
		},
		closelotterPanel() {
		  document.addEventListener("click", e => {
		    const iconEl = document.querySelector(".lotter-popup");
		    if (iconEl && !iconEl.contains(e.target)) {
		      this.popupShow = false;
		    }
		  });
		}
	},
	mounted() {
		this.getLottery()
		this.closelotterPanel()
	},
	created() {
		this.isPhone();
	}
};
</script>
<style scoped>
	.lotter-popup-top{
		padding: 10px;
		color: #868E9C;
		text-align: right;
	}
	.lotter-bar{
		position: relative;
		cursor: pointer;
		z-index: 33;
		background: url(../../../assets/images/lotter/action-bar.png) center bottom no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		width: 200px;
		margin: 0 auto;
		overflow: hidden;
	}
	.lotter-popup-body{
		padding: 0 15px;
	}
	.lotter-circle{
		width: 34px;
		height: 34px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		background: url(../../../assets/images/lotter/circle.png) center bottom no-repeat;
		background-size: 100% 100%;
		margin-top: 10px;
	}
	.lotter-popup{
		width: 100%;
		position: fixed;
		text-align: center;
		z-index: 200;
		overflow: hidden;
		left: 0;
		transform: translateY(calc(100% - 44px));
		transition: .3s all;
		bottom: 0;
		bottom: calc(0px + env(safe-area-inset-bottom));
	}
	.lotter-popup.is-active{
		transform: translateY(0);
	}
	.lotter-popup-main{
		margin-top: -1px;
		border: 1px solid #293c59;
		border-radius: 10px 10px 0 0;
		background: linear-gradient(-1deg, #141D2A, #141D2A, #1B2939);
	}
	.lot-tabs{
		display: flex;
		align-items: flex-end;
		margin-bottom: 15px;
	}
	.lot-tabs .lot-tab-item{
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0 22px;
		height: 34px;
		background: #111923;
		border-radius: 12px;
		margin-right: 15px;
		cursor: pointer;
	}
	.lot-tabs .lot-tab-item.active{
		height: 45px;
		background: #2283F6;
		font-size: 16px;
	}
	.lot-card{
		padding:12px;
		position: relative;
		border-radius: 8px;
		background-color: #0f1c33;
		margin-bottom: 20px;
		background: url(../../../assets/images/lotter/bg.png) center bottom no-repeat;
		background-size: cover;
		padding-bottom: 25px;
	}
	.lot-deadline{
		margin-bottom: 30px;
	}
	.lot-card .lot-head{
		position: relative;
		min-height: 60px;
	}
	.lot-period{
		position: absolute;
		top: 0;
		left: 0;
		padding: 8px 20px;
		border-image: linear-gradient(0deg, #3BA5FF, #39D0A4) 10 10;
		background: linear-gradient(0deg, #0191F2 0%, #02ABF8 100%);
		border-radius: 14px;
	}
	.lot-top{
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		min-width: 214px;
		text-align: center;
		padding: 0 20px;
		height: 44px;
		line-height: 44px;
		background: url(../../../assets/images/lotter/top.png) center no-repeat;
		background-size: 100% 100%;
	}
	.lot-rule{
		position: absolute;
		top: 15px;
		right:0;
		cursor: pointer;
	}
	.result-number{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
	}
	.number-box{
		width: 40px;
		height: 40px;
		background: url(../../../assets/images/lotter/numbox.png) no-repeat;
		background-size: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		margin:0 10px;
		font-size: 18px;
	}
	.result-box{
		min-width: 50px;
		margin:0 10px;
		text-align: center;
		border: 1px solid #183D8A;
		padding: 3px;
		background: linear-gradient(0deg, #131C28, #182332);
		border-radius: 5px;
	
	}
	.result-box .label{
		padding: 5px 0;
	}
	.result-box .value{
		background: linear-gradient(0deg, #0e3f45, #17a556);
		color: #ffffff;
		border-radius: 5px;
		line-height: 32px;
		padding: 0 3px;
		font-size: 12px;
	}
	.result-infomation{
		display: flex;
		justify-content: center;
	}
	.lotter-panel {
		margin-bottom: 30px;
	}

	.lot-head {
		margin-bottom: 15px;
	}

	.lot-label {
		font-size: 16px;
	}
	.lot-del {
		cursor: pointer;
		color: #868E9C;
		font-size: 14px;
		margin-left: auto;
	}

	.lot-title {
		position: relative;
		height: 26px;
		line-height: 26px;
		font-size: 18px;
		padding-left: 16px;
	}

	.lot-title::before {
		content: '';
		position: absolute;
		left: 0%;
		top: 0;
		width: 5px;
		height: 26px;
		background: #3BA5FF;
		border-radius: 6px;
	}

	.lotter-container {
		margin: 0 auto;
		max-width: 760px;
	}

	.lot-body ::v-deep .el-radio-button {
		margin: 0 6px 10px 6px !important;
		outline: none;
		min-width: 96px;
	}
	.lot-body ::v-deep .el-checkbox-button {
		margin: 0 6px 10px 6px !important;
		min-width: 96px;
	}

	.lot-body ::v-deep .el-radio-button .el-radio-button__inner {
		border-image: linear-gradient(0deg, #192635, #151F2B) 10 10;
		background: linear-gradient(0deg, #111923 0%, #182433 99%);
		border-radius: 6px !important;
		color: #8690A4;
		border: 0;
		width: 100%;
	}

	.lot-body ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
		color: #FFF;
		border-image: linear-gradient(0deg, #3BA5FF, #39D0A4) 10 10;
		background: linear-gradient(0deg, #0191F2 0%, #02ABF8 100%);
		border: 0;
	}


	.lot-body ::v-deep .el-checkbox-button .el-checkbox-button__inner {
		border-image: linear-gradient(0deg, #192635, #151F2B) 10 10;
		background: linear-gradient(0deg, #111923 0%, #182433 99%);
		border-radius: 6px !important;
		color: #8690A4;
		border: 0;
		width: 100%;
	}

	.lot-body ::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner {
		color: #FFF;
		border-image: linear-gradient(0deg, #3BA5FF, #39D0A4) 10 10;
		background: linear-gradient(0deg, #0191F2 0%, #02ABF8 100%);
		border: 0;
	}

	.bet-button {
		min-width: 220px;
		padding: 8px 20px 5px 20px;
		line-height: 1;
	}

	.bet-button .currency {
		margin-top: 5px;
	}

	.lot-body .icon-shanchu {
		font-size: 24px;
		display: inline-flex;
		cursor: pointer;
	}
	.log-main{
		position: relative;
		z-index: 11;
	}
	.lot-left img{
		width: 250px;
	}
	.lot-right img{
		width: 250px;
	}
	.lot-right{
		position: absolute;
		right: -30px;
		bottom: 0;
	}
	.lot-left{
		position: absolute;
		left: -30px;
		bottom: 0;
	}
	@media (max-width:750px) {
		.lot-top{
			min-width: 120px;
			padding: 0 10px;
		}
		.lot-left,
		.lot-right{
			bottom: 10px;
		}
		.lot-left{
			left: -50px;
		}
		.lot-right{
			right: -50px;
		}
		.lot-left img,
		.lot-right img{
			width: 115px;
		}
		.lot-period{
			font-size: 12px;
			padding: 4px 6px;
		}
		.number-box{
			margin: 0 5px;
		}
		.result-box{
			margin: 0 5px;
		}
		.lotter-container{
			padding: 0 10px;
		}
		.lot-body ::v-deep .el-radio-button {
			min-width: 100px;
		}
		.lot-body ::v-deep .el-checkbox-button {
			min-width: 100px;
		}
		.lotter-panel ::v-deep .el-tabs__nav{
			background-color: #16202c;
			padding:4px;
			width: 100%;
			border-radius: 16px;
		}
		.lotter-panel ::v-deep .el-tabs__item{
			padding:0 10px!important;
			min-width:33.33%;
			text-align:center;
			font-size:16px;
			border-radius: 16px!important;
		}
		.lotter-panel ::v-deep .el-tabs__active-bar{
			display: none;
		}
		.lotter-panel ::v-deep .el-tabs__item.is-active{
			background-color: #1e446b;
			font-size:16px;
			box-shadow: inset 1px 2px 1px #4e6b89;
		}
		.lot-scroll{
			white-space: nowrap;
			overflow: hidden;
			overflow-x: auto;
		}
		.result-infomation{
			flex-wrap: wrap;
		}
		.result-infomation .result-box{
			width: calc(30% - 10px);
		}
		.result-infomation .result-box:first-child{
			width: calc(90% - 10px);
			margin-bottom: 10px;
		}
	}
	.text-red{
		color: #DE3B3B!important;
	}
	
	.lot-scroll ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
	    background-color: transparent;
	    border-color: transparent;
	    box-shadow: 0 0 0 0 transparent
	}
	.lot-scroll ::v-deep .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
	    box-shadow: 0 0 0 0 transparent
	}
	.lot-scroll ::v-deep .el-checkbox-button__orig-checkbox:checked+.el-checkbox-button__inner {
	    background-color: transparent;
	    border-color: transparent;
	    box-shadow: 0 0 0 0 transparent
	}
	.lot-scroll ::v-deep .el-checkbox-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
	    box-shadow: 0 0 0 0 transparent
	}
	.lot-scroll ::v-deep .el-checkbox-button.is-checked .el-checkbox-button__inner{
		box-shadow: 0 0 0 0 transparent
	}
	.bet-foot{
		text-align: center;
	}
	.lotter-app{
		padding-bottom: 0;
	}
	.lotter-top{
		margin-bottom: 5px;
		text-align: right;
		cursor: pointer;
		color: #868E9C;
		font-size: 14px;
	}
	.lotter-top span{
		font-size: 24px;
	}
	.wrapper__inner{
		padding: 20px 0;
	}

</style>
