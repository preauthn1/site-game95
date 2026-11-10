<template>
	<div class="table-panel">
		<el-table :data="tableData" style="width: 100%" stripe>
			<el-table-column prop="qishu" :label="$t('开奖ID')" width="180" align="center">
			</el-table-column>
			<el-table-column prop="uid" width="130" >
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
							<span class="user__name">{{ $t(scope.row.uid) }}</span>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="option" :label="$t('玩法')" width="160">
			</el-table-column>
			<el-table-column prop="odds" :label="$t('倍率')">
				<template slot-scope="scope">
					<span style="color: #828999;">{{ scope.row.odds }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="win_amount" width="140" :label="$t('奖金')">
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
</template>

<script>
import {
	get_s_lottery_record_api
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
			tableData: []
		};
	},
	methods: {
		handleSizeChange(e) {
			this.listPage = e;
			this.getData();
		},
		getData() {
			get_s_lottery_record_api({
				page: this.listPage,
				limit: this.listLimit,
				lottery_id: this.id,
			}).then(response => {
				const res = response.data;
				if (res.code == 1) {
					this.tableData = res.data.list;
					this.listTotal = res.data.total;
				}
			})
		}
	},
	mounted() {
		this.getData();
	},
	created() {}
};
</script>
<style >
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
</style>
