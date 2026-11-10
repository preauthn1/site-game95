<template>
	<div>
		<div class="transactions__table" :style="isLoading ? 'min-height: 200px;margin-top: 20px' : ''">
			<table class="no-animation table-all" :style="isLoading ? 'min-height: 200px' : ''"
				v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.2)"
				:element-loading-text="$t('加载中')"
				element-loading-spinner="el-icon-loading">
				<thead v-if="records.length > 0">
					<tr>
						<th>{{ $t('名称') }}</th>
						<th>{{ $t('类型') }}</th>
						<th>{{ $t('金额') }}</th>
						<th>{{ $t('累计收益') }}</th>
						<th>{{ $t('周期') }}</th>
						<th>{{ $t('投资时间') }}</th>
						<th>{{ $t('状态') }}</th>
					</tr>
				</thead>
				<tbody v-for="(item, index) in records" :key="`records${index}`">
					<tr>
						<td class="td__date"><span class="datetime">{{ $t(item.name) }}</span></td>
						<td class="td__date"><span class="datetime">{{ item.type == 1 ? $t('活期') : $t('定期') }}</span></td>
						<td class="td__amount">
							<span class="currency">
								<div class="currency__balances-wrap">
									<div class="currency__balances">{{ numFormat(item.price, true) }}</div>
								</div>
							</span>
						</td>
						<td class="td__amount">
							<span v-if="item.type == 1">-</span>
							<span v-else class="currency">
								<div class="currency__balances-wrap">
									<div class="currency__balances">{{ numFormat(item.all_earnings, true) }}</div>
								</div>
							</span>
						</td>
						<td class="td__amount">
							<span class="datetime" v-if="item.type == 2">{{ item.few_days }} {{ $t('天') }}</span>
							<span v-else>-</span>
						</td>
						<td class="td__date"><span class="datetime">{{ item.add_time }}</span></td>
						<td class="td__status">
							<span v-if="item.type == 1">-</span>
							<template v-else>
								<span v-if="item.f_status == 1" class="td__status-wrapper text-green">{{ $t('进行中') }}</span>
								<span v-else-if="item.f_status == 2" class="td__status-wrapper text-yellow">{{ $t('已返还')
								}}</span>
								<span v-else-if="item.f_status == 3" class="td__status-wrapper text-red">{{ $t('手动返还')
								}}</span>
							</template>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="container-class" v-if="records.length > 0">
			<el-pagination background :small="isMobileFlag" :pager-count="5" layout="prev, pager, next"
				:current-page.sync="page" :page-size="pageSize" @current-change="pageSizeChange"
				:total="total"></el-pagination>
		</div>
		<el-empty v-if="records.length == 0 && !isLoading" :image="$t('no_empty')"
			:description="$t('暂无数据')" />
	</div>
</template>

<script>
import svgIcon from '@/components/svg.vue'
import { get_fund_order_list_api } from "@/api/fund.js";
export default {
	components: {
		svgIcon
	},
	data() {
		return {
			records: [],
			page: 1,
			pageSize: 10,
			total: 0,
			f_status: 'all',
			fund_type: 'all',
			count: 0,
			isLoading: true,
		};
	},
	methods: {
		getData() {
			this.isLoading = true;
			let data = {
				f_status: this.f_status,
				fund_type: this.fund_type,
				page: this.page,
				limit: this.pageSize,
			};
			get_fund_order_list_api(data).then(res => {
				if (res && res.data.code == 1) {
					if (res.data.data.length > 0) {
						this.records = res.data.data;
						this.total = res.data.total
					}
				}
				this.isLoading = false;
			});
		},
		pageSizeChange(e) {
			this.page = e;
			// this.records = [];
			this.getData();
		},
	},
	mounted() {
		this.getData();
	}
}
</script>
<style scoped></style>
