<template>
  <div>
    <twoFa v-if="isGoogle" ref="dialog" @enter="enter"></twoFa>
    <codeCheck v-if="isCode" ref="dialog" @enter="enter"></codeCheck>
    <!-- 提示：完善提现密码 -->
    <safeModalTip v-if="isTip" ref="dialog"></safeModalTip>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import codeCheck from "@/components/codeCheck.vue";
import twoFa from "@/components/twoFa.vue";
import safeModalTip from "@/components/safeModalTip.vue";

export default {
  components: {
    svgIcon,
    twoFa,
    codeCheck,
    safeModalTip,
  },
  data() {
    return {
      isGoogle: false,
      isCode: false,
      isTip: false,
    }
  },
  methods: {
    show(type, code) {
      this.isGoogle = code == 110;
      this.isCode = code == 120;
      this.isTip = code == 130;
      this.type = type;
      this.$nextTick(() => {
        this.$refs.dialog.show(type);
      })
    },
    enter(code) {
      this.$emit("enter", code, this.type);
    },
    close() {
      this.isGoogle =  false
      this.isCode = false;
      this.isTip = false;
      this.$emit("enter", '', this.type, 'close');
    },
  },
  mounted() {}
};
</script>
