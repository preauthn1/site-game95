<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
    <audio id="audioDom" ref="audioDom">
      <source src="@/assets/notify.mp3"/>
    </audio>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { ElConfigProvider, ElMessageBox, ElNotification } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { useUserStoreHook } from "@/store/modules/user";
import { parseMsg } from "./utils/global";
import { ReDialog } from "@/components/ReDialog";
import { useGlobal } from "@pureadmin/utils";
export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  computed: {
    currentLocale() {
      return this.$storage.locale?.locale === "cn" ? zhCn : en;
    }
  },
  mounted() {
    useUserStoreHook().initSocket(this.receiveMessage)
  },
  methods: {
    playAudio() {
      this.$refs.audioDom.play()
      // (this.audioDom as any).play();
      // if ((audioDom.value)?.paused) {
      // }
    },
    // 消息接收
    receiveMessage(e: any) {
      // console.log(e);
      if (e) {
        const params = parseMsg(e.data);
        // console.log(params);
        if (params["order"] == "msg") {
          params["title"] = decodeURIComponent(params["title"]);
          params["msg"] = decodeURIComponent(params["msg"]);
          this.playAudio()
          switch (params["mode"]) {
            case "toast":
              ElNotification({
                title: params["title"],
                message: params["msg"],
                type: "info"
              });
              break;
            case "pop":
              ElMessageBox.alert(params["msg"], params["title"]);
              break;
          }
        }
      }
    },
  }
});
</script>
<style>
::selection {
  background: rgb(59 130 246 / 0.8);
  color: #FFF;
}
</style>
