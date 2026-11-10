<template>
  <div class="container"></div>
</template>
<script>
import { login_third_login_api } from "@/api/user";
import { my_info_api } from "@/api/index";
export default {
  props: {
    third_id: {
      type: String,
      default: '0'
    },
  },
  data() {
    return {};
  },
  mounted() {
    var thirdLoginId = this.$helper.get("thirdLoginId");
    if (!thirdLoginId && this.third_id > 0) {
      thirdLoginId = this.third_id
    }
    var href = window.location.href;
    var paramStr = href.split("?");
    var params = null
    if (paramStr[1]) {
      params = paramStr[1].split("&");
    }
    if (params) {
      for (var i = 0; i < params.length; i++) {
        var param = params[i];
        let ind = param.indexOf("=");
        if (ind > 0) {
          let key = param.substring(0, ind);
          let val = param.substring(ind + 1);
          if (key == "code") {
            this.third_login(thirdLoginId, decodeURI(val));
            break;
          }
        }
      }
    } else {
      this.goUrl('/')
    }
  },
  methods: {
    async third_login(id, code) {
      var res_code = this.$helper.get("share_code") || "";
      await login_third_login_api({
        id,
        code,
        res_code
      }).then(res => {
        if (res.data.code == 1) {
          this.$helper.rm("share_code");
          this.$helper.rm("userInfo");
          this.$helper.set("tokenInfo", res.data.data);
          this.$store.commit("$vuexSetUserTokenState", res.data.data.token);
          this.$store.commit(
            "$vuexSetUserTokenKeyState",
            res.data.data.token_key
          );
          this.$message({
            customClass: "successMessage",
            showClose: false,
            message: this.$t("登录成功"),
            center: true,
            type: "success",
            duration: "1000",
            onClose: () => {
              this.$store.commit("$vuexSetLoginState", true);
              this.getUserInfo();
            }
          });
        } else {
          this.errorTips(res.data.msg);
          window.setTimeout(() => {
            this.goUrl('/')
          }, 1000)
        }
      });
    },
    async getUserInfo() {
      await my_info_api().then(res => {
        if (res && res.data.code == 1) {
          this.$helper.set("userInfo", res.data.data);
          this.$store.commit("$vuexUserInfo", res.data.data);
          this.goUrl('/')
        }
      });
    },
  }
};
</script>
