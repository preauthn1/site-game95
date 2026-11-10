<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      custom-class="custom-dialog code-check-dialog custom-sm-dialog"
    >
      <div class="code-check-dialog__head" slot="title">
        <h2 class="code-check-dialog__title" v-if="bind_type == 1">{{ $t(isTest ? '验证手机' : '绑定手机') }}</h2>
        <h2 class="code-check-dialog__title" v-else>{{ $t(isTest ? '验证邮箱' : '绑定邮箱') }}</h2>
      </div>
      <div class="code-check-dialog__body">
        <el-form ref="form">
          <el-form-item v-if="bind_type == 2">
            <el-input v-model="mail" :placeholder="$t('输入电子邮箱')" :disabled="isTest || !!($store.state.userInfo && $store.state.userInfo.mail)">
              <span slot="prefix">
                <svgIcon icon="icon-email-new" widthName="20" heightName="20"></svgIcon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item v-else-if="bind_type == 1">
            <el-input class="qhClass-input" v-model="phone" :placeholder="$t('输入手机号码')" :disabled="isTest || !!($store.state.userInfo && $store.state.userInfo.yphone)">
              <div slot="prefix">
                <el-select
                  size="small"
                  v-model="selecQu"
                  :placeholder="$t('请选择')"
                  class="qhClass"
                >
                  <el-option
                    v-for="item in idc"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </el-input>
          </el-form-item>
          <div class="has-code-item">
            <el-form-item>
              <el-input v-model="code" :placeholder="$t('输入验证码')" clearable>
                <span slot="prefix">
                  <span class="iconfont icon-yanzhengma"></span>
                </span>
                <span slot="suffix">
                  <el-button
                    class="test_emil"
                    type="primary"
                    :disabled="sendCodeing"
                    @click="sendCode()"
                  >{{ $t(sendCodeText) }}</el-button>
                </span>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="code-check-dialog__footer">
        <!-- <button @click="submit" :disabled="isSubmit" type="button" class="button button_lg button_red button_center button_fullwidth">
          <span class="button__inner">
            <span class="button__text">{{ $t('提交') }}</span>
            </span>
        </button> -->
        <button  @click="submit" :disabled="isSubmit" class="setting_button">{{$t('提交')}}</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";

import {
  sendcode_mail_api,
  sendcode_index_api,
  my_editinfo_api
} from "@/api/user";
export default {
  components: {
    svgIcon,
  },
  data() {
    return {
      dialogVisible: false,
      sendCodeing: false,
      sendCodeLoading: false,
      sendCodeText: '发送验证码',
      sendCodeSec: 60,
      isSubmit: false,
      isTest: false,
      selecQu: "",
      idc: [],
      code: '',
      bind_type: 1, // 1 手机 2邮箱
      phone: '',
      mail: '',
      phone_check: 0,
    }
  },
  methods: {
    show(type,isTest) {
      this.phone = this.$store.state.userInfo.yphone
      this.mail = this.$store.state.userInfo.mail
      this.isTest = isTest
      this.bind_type = type;
      this.dialogVisible = true;
      this.isSubmit = false;
      this.code = '';
    },
    sendCode() {
      if (this.sendCodeing) return;
      if (this.bind_type == 2) {
        this.sendMailCode();
      } else if (this.bind_type == 1) {
        this.sendPhoneCode();
      } else {
        this.errorTips('操作有误');
      }
    },
    // 获取手机验证码
    async sendPhoneCode() {
      let _this = this;
      _this.sendCodeing = true;
      _this.sendCodeLoading = true;
      await sendcode_index_api({
        qh: this.selecQu,
        phone: this.phone,
        scene: this.isTest ? "verify" :"bind"
      }).then(res => {
          _this.sendCodeLoading = false;
        if (res && res.data.code == 1) {
          _this.countdown()
          _this.successTips(res.data.msg);
        } else {
          _this.sendCodeing = false;
          _this.errorTips(res.data.msg);
        }
      });
    },
    async sendMailCode() {
      let _this = this;
      _this.sendCodeing = true;
      _this.sendCodeLoading = true;
      let info = {
        email: this.mail,
        scene: this.isTest ? "verify" :"bind"
      }
      await sendcode_mail_api(info).then(res => {
        _this.sendCodeLoading = false;
        if (res && res.data.code == 1) {
          _this.countdown();
          _this.successTips(res.data.msg);
        } else {
          _this.sendCodeing = false;
          _this.errorTips(res.data.msg);
        }
      });
    },
    countdown() {
      this.sendCodeing = true;
      this.sendCodeText = this.sendCodeSec + "s";
      let clock = window.setInterval(() => {
        this.sendCodeSec--;
        this.sendCodeText = this.sendCodeSec + "s";
        if (this.sendCodeSec < 0) {
          window.clearInterval(clock);
          this.sendCodeText = this.$t("重新发送");
          this.sendCodeSec = 60;
          this.sendCodeing = false;
        }
      }, 1000);
    },

    async editinfoPost(data, callback) {
      let self = this;
      self.$store.commit("$vuexSetBottonLoadingState", true);
      await my_editinfo_api(data).then(res => {
        if (typeof callback === 'function') {
          callback(res && res.data.code == 1 ? 'success' : 'error', res);
        }
        if (res && res.data.code == 1) {
          self.successTips(res.data.msg);
        } else {
          self.errorTips(res.data.msg);
        }
        self.$store.commit("$vuexSetBottonLoadingState", false);
      });
    },
    submit() {
      if (this.isSubmit) {
        return;
      }

      let data = {
        verify_code: this.code
      };
      if (this.bind_type == 1) {
        data['phone'] = this.phone;
        data['qh'] = this.selecQu;
      } else if (this.bind_type == 2) {
        data['mail'] = this.mail;
      } else {
        return;
      }

      this.isSubmit = true;
      let self = this;
      this.editinfoPost(data, function() {
        self.phone = "";
        self.mail = "";
        self.dialogVisible = false;
        self.isSubmit = false;
        self.updateUserInfo();
      });

    },
  },
  mounted() {
    this.idc = this.$helper.get("idc");
    if (this.idc.length > 0) {
      this.selecQu = this.idc[0].value;
    }
    let rule = this.$helper.get("rule");
    this.phone_check = rule.phone_check;
  }
};
</script>

<style scoped>
.setting_button{
  margin-top: 50px;
  padding: 10px;
  width: 100%;
  text-align: center;
  background: #FF7D1E;
  color: #fff; 
  border-radius: 5px;
}
.code-check-dialog {
  max-width: 360px !important;
}
.code-check-dialog__head {
    margin-bottom: 24px;
    position: relative;
}
.code-check-dialog__title {
  font-size: 24px;
  text-align: center;
}
.code-check-dialog__desc {
  display: block;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #93acd3;
}
.code-check-dialog .el-dialog__body {
  padding: 10px 20px 30px;
}
.code-check-dialog__body {
    margin-bottom: 24px;
}
.code-check-dialog__subtitle {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 4px;
}
.code-check-dialog .code-inputs {
    display: flex;
    justify-content: space-around;
    grid-gap: 8px;
    gap: 8px;
}
.code-check-dialog .input {
    width: 100%;
    height: 44px;
    flex-grow: 1;
}
.code-check-dialog .input__inner {
    position: relative;
    display: flex;
    align-items: center;
    border: 2px solid #2a3546;
    transition: color .1s ease-in-out,border-color .1s ease-in-out;
    overflow: hidden;
}
.code-check-dialog .input_md .input__inner {
    padding: 0;
}
.code-check-dialog .input__tag {
    width: 0;
    flex: 1 1;
    display: block;
    font-weight: 600;
    color: #fff;
    outline: none;
    text-align: center;
}
.code-check-dialog .input_md .input__tag {
    line-height: 20px;
    padding: 0;
    border: none;
    height: 20px;
    font-size: 24px;
}
.code-check-dialog .code-check-dialog__body  .input__tag {
    height: 44px;
}
.code-check-dialog__body .el-form-item__label {
  color:#fff;
}

.test_emil {
  height: 38px;
  line-height: 10px;
  padding: 15px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: -3px;
  border-radius: 7px;
}

.qhClass {
  max-width: 90px;
  margin-left: -16px;
}

.code-check-dialog ::v-deep .el-form-item__content {
  line-height: 44px;
}
.code-check-dialog .qhClass-input ::v-deep .el-input__inner {
  padding-left: 100px !important;
}
.code-check-dialog .qhClass ::v-deep .el-input__inner {
  padding-left: 25px !important;
  border: 0 !important;
  background: none !important;
}
.has-code-item {
  margin-bottom: 16px;
}
.has-code-item ::v-deep .el-input__suffix-inner {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
</style>
