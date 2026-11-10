<template>
  <div :style="$store.state.moduleLoading ? 'min-height: 200px;margin-top: 20px' : ''"
  v-loading="$store.state.moduleLoading" element-loading-background="rgba(0, 0, 0, 0.2)">
  <div class="my-balance__table">
    <div class="my-balance__t-head" v-if="record.length > 0">
      <div class="my-balance__th">{{ $t('结算月份') }}</div>
      <!-- <div class="my-balance__th">{{ $t('返佣基数') }}</div> -->
      <div class="my-balance__th">{{ $t('返佣金额') }}</div>
      <div class="my-balance__th">{{ $t('状态') }}</div>
    </div>
    <div class="my-balance__t-body" v-if="record.length > 0">
      <div class="my-balance__tr" v-for="(item, index) in record" :key="`balance_${index}`">
        <div class="my-balance__td">
          <span class="datetime my-balance__date">{{ item.sff_m }}</span>
        </div>
        <div class="my-balance__td">
          <p class="my-balance__campaign-name">{{ numFormat(item.sff_fy, true) }}</p>
        </div>
        <div class="my-balance__td">
          <el-tag size="mini" v-if="item.sff_payed == 2" type="success">{{ $t('已结算') }}</el-tag>
          <el-tag size="mini" v-else-if="item.sff_payed == 1">{{ $t('未结算') }}</el-tag>
          <el-tag size="mini" v-else-if="item.sff_payed == 0" type="info">{{ $t('无效') }}</el-tag>
        </div>
      </div>
    </div>
    <el-empty v-if="record && record.length == 0 && !$store.state.moduleLoading" :image="$t('no_empty')" :description="$t('暂无数据')" />
  </div>
</div>
</template>
<script>
import svgIcon from '@/components/svg.vue'

import { game_agent_report_api } from "@/api/user";
export default {
  components: { svgIcon },
  data() {
    return {
      record: [],
    }
  },
  methods: {
    async getTeamRecord() {
      this.$store.commit("$vuexSetModuleLoadingState", true);
      await game_agent_report_api().then(res => {
        if (res && res.data.code == 1) {
          this.$store.commit("$vuexSetModuleLoadingState", false);
          this.record = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.getTeamRecord()
  },
};
</script>
<style scoped>

.my-balance {
  display:flex;
  flex-wrap:wrap;
  /* justify-content:center */
}
.my-balance__table {
  flex:1 1 100%;
  margin-top:25px;
  margin-bottom:25px;
  position:relative;
  min-height:200px
}
.my-balance__t-head {
  font-weight:600;
  font-size:12px;
  line-height:20px;
  letter-spacing:-.02em;
  color:#55657e;
  margin-bottom:15px
}
.my-balance__t-head,.my-balance__tr {
  display:flex;
  align-items:center;
  justify-content:space-between
}
.my-balance__tr {
  border-top:1px solid #1c2532;
  height:56px
}
.my-balance__td,.my-balance__th {
  display:flex;
  align-items:center;
  min-width:150px
}
.my-balance__t-body {
  max-height:450px
}
.my-balance__icon {
  width:20px;
  height:20px;
  margin-right:8px
}
.my-balance__btn {
  cursor:pointer;
  outline:0;
  border:0;
  height:50px;
  background:#3a07f2;
  border-radius:8px;
  font-weight:600;
  font-size:14px;
  line-height:22px;
  letter-spacing:-.02em;
  color:#fff;
  padding:14px 16px
}
.my-balance__btn:disabled {
  cursor:not-allowed;
  opacity:.7
}
</style>
