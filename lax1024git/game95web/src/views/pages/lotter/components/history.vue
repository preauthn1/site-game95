<template>
	<div>
		<div class="his-row">
			<div class="his-head flex-center">
				<span class="his-tit" style="color: #8690A4;">{{ $t('往期开奖ID') }}</span>
				<span class="his-id">{{ detail.last.qishu }}</span>
			</div>
			<div class="draw-card">
				<div class="draw-number">
					<div class="nun-box" v-for="(item,index) in detail.last.balls" :key="index">
						{{ item }}
					</div>
				</div>
				<div class="flex_bd draw-row">
					<el-row>
						<el-col :span="6" v-for="(item,index) in detail.last.result" :key="index">
							<div class="draw-cell">
								<div class="d-label">{{ $t(detail.options_text[index] ? detail.options_text[index] : index) }}</div>
								<div class="d-value">{{ $t(item) }}</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="his-row his-center-button">
			<button class="button button_grey1 btn-look-more" @click="dialogVisible = true">
				{{ $t('查看更多') }} <span class="el-icon-arrow-right"></span>
			</button>
		</div>
		<div class="his-row">
			<div class="his-head"><span class="his-tit">{{ $t('中奖者名单') }}</span></div>
		</div>
		<div class="table-panel">
			<el-table :data="tableData" style="width: 100%" stripe>
				<el-table-column prop="uid" width="160">
					<template slot="header">
						<div class="column-top">
							<span>{{ $t('用户') }}</span>
						</div>
					</template>
					<template slot-scope="scope">
						<div class="user user--clickable" tab="all">
							<div class="user__avatar" style="width: 22px; height: 22px;">
								<div class="user__inner">
									<img
										height="22"
										width="22"
										src="@/assets/images/default-avatar.png"
										alt
									/>
								</div>
							</div>
							<div class="user__wrap">
								<span class="user__name">{{ scope.row.uid }}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="option" :label="$t('玩法')" width="180">
				</el-table-column>
				<el-table-column prop="odds" :label="$t('倍率')" >
					<template slot-scope="scope">
						<span style="color: #828999;">{{ scope.row.odds }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="win_amount" :label="$t('奖金')" width="200">
					<template slot-scope="scope">
						<span class="currency">
							<img
								width="20"
								height="20"
								:src="require('@/assets/images/'+$store.state.currencyIcon)"
								loading="lazy"
								class="currency__icon"
							/>
							<div class="currency__balances-wrap">
								<div class="currency__balances">
									<span>{{ numFormat(scope.row.win_amount) }}</span>
								</div>
							</div>
						</span>
					</template>
				</el-table-column>

			</el-table>
			<div class="table-foot">
				<el-pagination
					background
					:small="isMobileFlag"
					:pager-count="5"
					layout="prev, pager, next"
					:current-page.sync="currentPage"
					@current-change="handleSizeChange"
					:page-size="listLimit"
					:total="listTotal"
				></el-pagination>
			</div>
		</div>
		
		<el-dialog :visible.sync="dialogVisible" custom-class="custom-dialog history-dialog" :modal-append-to-body="false">
			<div class="custom-dialog-head" slot="title">
				<div class="header__title">
					<h1>{{ $t("往期开奖") }}</h1>
				</div>
			</div>
			<div class="draw-cells">
				<div class="draw-row" v-for="(item,index) in drawData" :key="index">
					<div class="his-head flex-center">
						<span class="his-tit" style="color: #8690A4;">{{ $t('开奖ID') }}</span>
						<span class="his-id">{{ item.qishu }}</span>
					</div>
					<div class="draw-card" >
						<div class="draw-number">
							<div class="nun-box" v-for="(bitem,bindex) in item.balls" :key="bindex">
								{{ bitem }}
							</div>
						</div>
						<div class="flex_bd draw-row">
							<el-row>
								<el-col :span="6" v-for="(ritem,rindex) in item.result" :key="rindex">
									<div class="draw-cell">
										<div class="d-label">{{ $t(optionsData[rindex] ? optionsData[rindex] : rindex) }}</div>
										<div class="d-value">{{ $t(ritem) }}</div>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</div>
			<div class="table-foot">
				<el-pagination
					background
					:small="isMobileFlag"
					:pager-count="5"
					layout="prev, pager, next"
					:current-page.sync="drawcurrentPage"
					@current-change="handledrawChange"
					:page-size="drawlistLimit"
					:total="drawlistTotal"
				></el-pagination>
			</div>
		</el-dialog>
	</div>
</template>

<script>

import {
	get_s_lottery_record_api,
	get_lottery_draw_api
} from "@/api/lottery";
export default {
	components: {},
	props: {
		id: {
			type: Number,
			default: 0
		},
		detail: {
			type: Object,
			default: null
		}
	},
	watch: {
		detail() {
			this.getData()
		}
	},
	data() {
		return {
			currentPage: 1,
			listPage: 1,
			listLimit: 9,
			listTotal: 0,
			tableData: [],
			drawcurrentPage: 1,
			drawlistPage: 1,
			drawlistLimit: 4,
			drawlistTotal: 50,
			drawData:[],
			optionsData:[],
			dialogVisible:false
		};
	},
	methods: {
		handleSizeChange(e) {
			this.listPage = e;
			this.getData();
		},
		handledrawChange(e) {
			this.drawlistPage = e;
			this.getLotteryDraw();
		},
		getData() {
			get_s_lottery_record_api({
				page: this.listPage,
				limit: this.listLimit,
				lottery_id: this.id,
				orderby: 3,
				is_win: 3,
				// qishu: this.detail.last.qishu
			}).then(response => {
				const res = response.data;
				if (res.code == 1) {
					this.tableData = res.data.list;
					this.listTotal = res.data.total;
				}
			})
		},
		getLotteryDraw() {
			get_lottery_draw_api({
				page: this.drawlistPage,
				limit: this.drawlistLimit,
				lottery_id: this.id,
			}).then(response => {
				const res = response.data;
				if (res.code == 1) {
					this.drawData = res.data.list;
					this.optionsData = res.data.options_text
					// this.drawlistTotal = res.data.total;
				}
			})
		},
	},
	mounted() {
		this.getData();
		this.getLotteryDraw()
	},
	created() {}
};
</script>
<style >
	.draw-cells >.draw-row{
		margin-bottom: 20px;
	}
	.table-panel{
		background-color: #161d29;
		border-radius: 16px;
		overflow: hidden;
	}
	.table-panel table{
		font-size: 14px;
	}
	.table-panel .el-table::before{
		display: none;
	}
	.table-panel .el-table, .el-table__expanded-cell {
		background-color: transparent;
	}
	.table-panel .el-table tr{
		background: #192535!important;
		color: #ffffff;
	}
	.table-panel .el-table tr:hover{
		background: #2C333F!important;
	}
	.table-panel .el-table td, .table-panel .el-table th.is-leaf {
		border-bottom: 1px solid #2C333F;
	}
	.table-panel .el-table tr:hover td{
		background: #2C333F!important;
		color: #ffffff;
	}
	.table-panel .el-table th{
		background-color: #18212e;
		color: #868E9C;
	}
	.table-panel .el-table--striped .el-table__body tr.el-table__row--striped td {
		background-color: #1c2534;
	}
	.currency__balances{
		color: #E9BF59;
	}

	.lotter-panel .el-tabs .el-tabs__item{
		font-size: 18px;
		color: #636B77;
	}
	.lotter-panel .el-tabs .el-tabs__item.is-active{
		font-size: 22px;
		color: #ffffff;
	}
	.table-foot{
		display: flex;
		justify-content: center;
		padding: 20px 10px;
	}
	.his-row{
		margin-bottom: 20px;
	}
	.his-head{
		margin-bottom: 15px;
		font-size: 16px;
	}
	.his-head .his-id{
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-left: 10px;
		padding: 0 6px;
		font-size: 12px;
		height: 22px;
		border: 1px solid;
		border-image: linear-gradient(0deg, #192635, #151F2B) 10 10;
		background: linear-gradient(0deg, #111923 0%, #182433 99%);
	}
	.draw-card{
		display: flex;
		align-items: center;
		background: #152435;
		border: 1px solid #2C333F;
		border-radius: 15px;
	}
	.draw-ico{
		font-size: 0;
		margin: 0 10px;
	}
	.draw-ico img{
		width: 44px;
		height: 44px;
	}
	.draw-number{
		padding: 0 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.draw-number .nun-box{
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: url(../../../../assets/images/lotter/numbox.png) no-repeat;
		background-size: contain;
		font-size:20px;
		width: 32px;
		height: 32px;
		margin: 0 10px;
		font-weight: bold;
		color: #ffffff;
	}
	.draw-cell{
		text-align: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		height: 80px;
		border-left: 1px solid #2C333F;
		font-size: 16px;
	}
	.draw-row .d-label{
		color: #8690A4;
		margin-bottom: 6px;
	}
	.d-value{
		color: #DE3B3B;
	}
	@media (max-width:700px) {
		.draw-cell{
			font-size: 14px;
		}
		.draw-number{
			padding: 10px 0 15px 0;
		}
		.draw-card{
			display: block;
		}
		.draw-row .el-row >div:first-child .draw-cell{
			border-left: 0;
		}
	}
	.user__wrap{
		white-space: nowrap;
	}
	.currency__balances-wrap{
		white-space: nowrap;
	}
	.btn-look-more{
		border-radius: 8px;
		min-width: 100px;
		height: 36px;
	}
	.his-center-button{
		text-align: center;
	}
	.history-dialog{
		max-width: 760px;
	}
</style>
