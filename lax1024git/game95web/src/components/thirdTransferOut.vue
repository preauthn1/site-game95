<template>
	<el-dialog :visible.sync="thirdBalance" custom-class="custom-dialog custom-sm-dialog " :show-close="false" :modal-append-to-body="false">
  <div class="custom-dialog-head" slot="title">
    <div class="header__title">
      <h1>{{$t('提示')}}</h1></div>
  </div>
  <div class="custom-dialog-body">
    <div class="tip-content">
      <span>{{ $t('您还有余额在游戏中,是否转出?') }}</span></div>
  </div>
  <template #footer>
    <span class="custom-dialog-bottom">
      <el-button @click="dialogComfirm" class="button_blue button_fullwidth">{{$t('确定')}}</el-button>
    </span>
  </template>
</el-dialog>
</template>

<script>
import { game_user_transout_api } from "@/api/cybSports";
export default {
  computed: {
    thirdBalance () {
      return this.$store.state.userInfo ? this.$store.state.userInfo.third_balance > 0 : false;
    }
  },
  watch: {
    thirdBalance (newBalance, oldBalance) {
      // console.log(`We have ${newBalance}, old ${oldBalance} fruits now, yay!`)
    }
  },
  methods: {
    dialogComfirm() {
      game_user_transout_api(0).then(response => {
        let res = response.data;
        this.updateUserInfo();
      });
    },
  }
}
</script>
