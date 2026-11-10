<template>
  <div>
    <!-- 密码 弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      v-if="$store.state.userInfo"
      :visible.sync="pwdVisible"
      :before-close="pwdModalClose"
      custom-class="custom-dialog modal-change"
    >
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t("更改密码") }}</h1>
        </div>
      </div>
      <el-form ref="form" label-position="left" class="form" :model="pwdform" label-width="160px" >
        <el-form-item :label="$t('旧密码')" v-if="$store.state.userInfo.ispass">
          <el-input
            v-model="pwdform.newPwd"
            type="password"
            :placeholder="$t('请输入旧密码')"
            show-password
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('密码')">
          <el-input
            v-model="pwdform.comfirmNewPwd"
            type="password"
            :placeholder="$t('请输入密码')"
            show-password
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('确认密码')" >
          <el-input
            v-model="pwdform.curPassword"
            type="password"
            :placeholder="$t('重复输入密码')"
            show-password
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>
      <button :loading="$store.state.bottonLoading" @click="pwdSubmit" class="setting_button">{{$t('确认')}}</button>
    </el-dialog>
    <verify ref="verify" @enter="verifyEnter"></verify>
  </div>
</template>

<script>
import { my_editinfo_api } from "@/api/user";
import verify from "@/components/verify.vue";
import svgIcon from "@/components/svg.vue";
export default {
  data() {
    return {
      pwdVisible: false,
      verify_code: "",
      pwdform: {
        newPwd: "",
        comfirmNewPwd: "",
        curPassword: "",
      },
    };
  },
  components: { verify , svgIcon },
  methods: {
    showPwdModal() {
      this.pwdVisible = true;
    },
    pwdModalClose(done) {
      if (
        this.$route.query.modal === "paypwd" ||
        this.$route.query.modal === "loginpwd"
      ) {
        window.location.href = window.location.href
          .replace("?modal=paypwd", "")
          .replace("&modal=paypwd", "")
          .replace("?modal=loginpwd", "")
          .replace("&modal=loginpwd", "");
      }
      done();
    },
    async pwdSubmit() {
      if (this.$store.state.userInfo.ispass && this.pwdform.newPwd == "") {
        this.errorTips("请输入旧密码");
        return false;
      }
      if (this.pwdform.comfirmNewPwd == "") {
        this.errorTips("请输入密码");
        return false;
      }
      if (this.pwdform.curPassword == "") {
        this.errorTips("请输入重复密码");
        return false;
      }
      if (this.pwdform.comfirmNewPwd.length < 6) {
        this.errorTips("密码长度不能低于6位字符");
        return;
      }
      if (this.pwdform.comfirmNewPwd != this.pwdform.curPassword) {
        this.errorTips("密码不一致");
        return false;
      }
      this.$store.commit("$vuexSetBottonLoadingState", true);
      let param = {
        old_password: this.pwdform.newPwd,
        password: this.pwdform.comfirmNewPwd,
        verify_code: this.verify_code,
      };
      await my_editinfo_api(param).then((res) => {
        if (res && res.data.code == 1) {
          this.updateUserInfo();
          this.pwdform.newPwd = "";
          this.pwdform.comfirmNewPwd = "";
          this.pwdform.curPassword = "";
          this.pwdVisible = false;
          this.successTips(res.data.msg);
          this.verifyClose();
        } else if (
          res &&
          (res.data.code == 110 || res.data.code == 120 || res.data.code == 130)
        ) {
          this.verify_code && this.errorTips(res.data.msg);
          this.verifyShow("login_password_check", res.data.code);
        } else {
          this.verifyClose();
          this.errorTips(res.data.msg);
        }
        this.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },
    verifyShow(type, code) {
      this.verify_code = "";
      this.$refs.verify.show(type, code);
    },
    verifyClose() {
      this.verify_code = "";
      this.$refs.verify.close();
    },
    verifyEnter(code, type) {
      this.verify_code = code;
      if (type === "login_password_check") {
        this.verify_code && this.pwdSubmit();
      }
    },
  },
};
</script>

<style lang="less">
/* linear-gradient(to right, #7F5512, #221F1D); */
.setting_button{
  margin-top: 50px;
  padding: 10px;
  width: 100%;
  text-align: center;
  background: #FF7D1E;
  color: #fff; 
  border-radius: 5px;
}
.el-form-item__label{
  color: #fff ;
}
.form{
  margin-top: 8px;
}
</style>
