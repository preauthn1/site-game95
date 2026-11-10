<template>
  <el-drawer
    :visible.sync="drawer"
    direction="btt"
    :with-header="false"
    :modal="true"
    :wrapperClosable="true"
    v-if="dev != 'pc' && $store.state.env != 'app'"
  >
    <div class="d-content">
      <div class="title-wapper">
        <span>{{ $t("应用程序") }}</span>
        <span @click="hide">{{ $t("不再提示") }}</span>
      </div>
      <div class="content-txt" v-if="dev == 'android'">
        {{
          $t(
            "此网站具有应用程序功能，下载并安装Android应用程序，您可以全屏使用它。"
          )
        }}
      </div>
      <div class="content-txt" v-if="dev == 'ios'">
        {{
          $t(
            "此网站具有应用程序功能，下载并安装IOS应用程序，您可以全屏使用它。"
          )
        }}
      </div>
      <div class="d-btn">
        <!-- <div class="btn-item" v-if="dev == 'ios'">
          <img src="@/assets/images/share-icon.png" alt="" class="down-icon" />
          <span>{{ $t("按下“共享”按钮") }}</span>
        </div>
        <div class="btn-item" v-if="dev == 'ios'">
          <img src="@/assets/images/add-icon.png" alt="" class="down-icon" />
          <span>{{ $t("按“添加到主屏幕”") }}</span>
        </div> -->
        <div class="btn-item" @click="download">
          <img
            src="@/assets/images/download-icon.png"
            alt=""
            class="down-icon"
          />
          <span v-if="!iosFlag">{{ $t("下载浣熊APP") }}</span>
          <span v-else-if="iosFlag=='loading'">{{ $t("下载中...") }}</span>
          <span v-else-if="iosFlag=='ok'">{{ $t("安装浣熊APP") }}</span>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      dev: "",
      iosFlag:""
    };
  },
  mounted() {
    this.dev = this.judgeClient();
    this.show();

  },
  methods: {
    hide() {
      localStorage.setItem("downloadTime", "hide");
      this.drawer = false;
    },
    show() {
      let time = new Date().getTime();
      const downloadTime = localStorage.getItem("downloadTime");
      if (downloadTime == "hide") return;
      if (downloadTime && Math.abs(downloadTime - time) < 86400000) return;
      if (this.dev == "android") {
        this.drawer = true;
        localStorage.setItem("downloadTime", time);
      }
    },
    download() {
      if (this.dev == "android") {
        window.location.href = this.$helper.get("rule").android_download_url;
      } else {
        if(this.iosFlag==""){
          this.iosFlag = "loading"
          window.location.href = this.$helper.get("rule").ios_download_url;
          setTimeout(()=>{
            this.iosFlag = "ok"
          },3000)
        }else if(this.iosFlag=="ok"){
          window.location.href = "https://www.pgyer.com/app/getProvisionFile"
        }
      }
    },
    judgeClient() {
      let client = "";
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //判断iPhone|iPad|iPod|iOS
        client = "ios";
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //判断Android
        client = "android";
      } else {
        client = "pc";
      }
      return client;
    },
  },
};
</script>

<style scoped>
::v-deep .el-drawer {
  background-color: rgba(255, 255, 255, 0.1) !important;
  margin: 13px !important;
  width: calc(100vw - 26px) !important;
  backdrop-filter: blur(20px);
  border-radius: 14px;
  height: auto !important;
}

.title-wapper {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 15px 13px;
  border-bottom: 1px solid #9b9da1;
}
.title-wapper span:first-child {
  font-size: 21px;
}
.title-wapper span:last-child {
  font-size: 14px;
  color: #60a3ff;
}
.content-txt {
  margin: 0 23px;
  padding: 19px 0 24px;
  border-bottom: 1px solid #9b9da1;
  font-size: 12px;
}
.d-btn {
  padding: 16px 45px 16px;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  justify-content: center;
}
.btn-item {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}
.down-icon {
  width: 23px;
  margin-right: 23px;
}
</style>
