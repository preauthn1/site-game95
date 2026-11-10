<template>
  <el-dialog
    :modal-append-to-body="false"
    v-if="$store.state.userInfo"
    :visible.sync="$store.state.pwdTestShow"
    custom-class="custom-dialog"
    @close="dialogClose"
  >
    <div class="custom-dialog-head" slot="title">
      <div class="header__title">
        <h1>{{$t('安全验证')}}</h1>
      </div>
    </div>
    <div class="modal__body">
      <div class="tip-label">{{$t('正在验证提现密码')}}:</div>
      <div class="input-group">
        <transition name="el-zoom-in-center">
          <!--  @finish="verifyFinish" -->
          <messageInput ref="finishClearVerify"  @finish="finish"></messageInput>
        </transition>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import messageInput from "@/components/messageInput.vue";

export default {
  components: {
	svgIcon,
	messageInput
  },
  methods: {
    dialogClose() {
	  this.$store.commit("$vuexSetPwdTestShowState", false);
	  this.$refs.finishClearVerify.clearInput();
	},
	finish(e){
		this.$emit("pwdTestChange",e);
	},

  }
};
</script>
<style scoped>
</style>
