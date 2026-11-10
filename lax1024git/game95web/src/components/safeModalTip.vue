<template>
  <el-dialog
    v-if="$store.state.userInfo"
    :visible.sync="$store.state.safePwdTipShow"
    :modal-append-to-body="false"
    custom-class="custom-dialog "
    @close="dialogClose"
  >
    <div class="custom-dialog-head" slot="title">
      <div class="header__title">
        <h1>{{$t('提示')}}</h1>
      </div>
    </div>
    <div class="custom-dialog-body">
      <div class="tip-content">{{$t('检测到您的账号资料尚未完善，为保证您的 资金账户 安全，请完善您提现密码！')}}</div>
    </div>
		<template #footer>
			<span class="custom-dialog-bottom">
				<el-button
          :loading="$store.state.bottonLoading"
          class="btn_gray button_fullwidth"
          @click="dialogClose"
        >{{$t('取消')}}</el-button>
				<el-button
          @click="goToSet"
          class="button_red button_fullwidth"
        >{{$t('去设置')}}</el-button>
			</span>
		</template>
  </el-dialog>
</template>

<script>
import svgIcon from "@/components/svg.vue";
export default {
  components: {
    svgIcon
  },
  methods: {
    goToSet() {
      this.goUrl("/account?modal=paypwd");
      this.dialogClose();
    },
    dialogClose() {
      this.$store.commit("$vuexSetSafePwdTipShowState", false);
    }
  }
};
</script>
<style scoped>
	.btn_group-wrap {
	  display: flex;
	  margin: 0 -15px;
	}
	.btn_group-wrap .col {
	  flex: 1;
	  padding: 0 15px;
	}
	.tip-content {
	  min-height: 150px;
	  padding: 20px;
	  color: #ffffff;
	  line-height: 1.7;
	  background: #1c2532;
	  border-radius: 15px;
	  margin-bottom: 20px;
	}
	.tip-label {
	  font-size: 14px;
	  color: #ffffff;
	}
	.input-group ::v-deep .g-remove-check-code_tip {
	  display: none;
	}
</style>
