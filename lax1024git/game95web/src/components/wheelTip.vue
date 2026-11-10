<template>
  <el-dialog
    v-if="$store.state.userInfo"
    :visible.sync="$store.state.wheelTipShow"
		:modal-append-to-body="false"
    custom-class="custom-dialog custom-sm-dialog "
    @close="dialogClose"
  >
    <div class="custom-dialog-head" slot="title">
      <div class="header__title">
        <h1>{{$t('提示')}}</h1>
      </div>
    </div>
    <div class="custom-dialog-body">
      <div class="tip-content" >
		<span v-if="prizeConfig.integral>=prizeConfig.required_integral"> {{ $t('本次遊戲將花費 积分') }}{{ numFormat(prizeConfig && prizeConfig.integral,true) }} {{ $t('是否繼續遊玩') }} ？</span>
	  	<span v-else> {{ $t('本次遊戲將花費 VND') }}{{ numFormat(prizeConfig && prizeConfig.required_balance,true) }} {{ $t('是否繼續遊玩') }} ？</span>
	  </div>
    </div>
		<template #footer>
		<span class="custom-dialog-bottom">
		<el-button
		:loading="$store.state.bottonLoading"
		class="btn_gray button_fullwidth"
		@click="dialogClose"
		>{{$t('取消')}}</el-button>
		<el-button
		@click="dialogComfirm"
		class="button_blue button_fullwidth"
		>{{$t('确定')}}</el-button>
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
  props: {
    prizeConfig: {
      type: Object,
      default: {}
    },
  },
  methods: {
    dialogComfirm() {
	  this.$emit('eventComfirm')
	  this.dialogClose();
    },
    dialogClose() {
      this.$store.commit("$vuexSetWheelTipShowState", false);
    },
  },
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
	  min-height: 120px;
	  padding: 20px;
	  color: #ffffff;
	  line-height: 1.7;
	  background: #1c2532;
	  border-radius: 15px;
	}
	.tip-label {
	  font-size: 14px;
	  color: #ffffff;
	}
	.input-group ::v-deep .g-remove-check-code_tip {
	  display: none;
	}
	.custom-dialog-bottom{
		padding: 0;
	}





</style>
