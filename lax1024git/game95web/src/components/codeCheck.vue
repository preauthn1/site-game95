<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      custom-class="custom-dialog code-check-dialog custom-sm-dialog"
    >
      <div class="code-check-dialog__head" slot="title">
        <h2 class="code-check-dialog__title">{{ $t('验证码') }}</h2>
      </div>
      <div class="code-check-dialog__body" v-if="$store.state.userInfo.mail2 || $store.state.userInfo.yphone">
        <el-form ref="form">
          <el-form-item v-if="$store.state.userInfo.mail2">
            <el-input :value="$store.state.userInfo.mail2" :placeholder="$t('输入电子邮箱')" :disabled="true">
              <span slot="prefix">
                <svgIcon icon="icon-email-new" widthName="20" heightName="20"></svgIcon>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item v-else-if="$store.state.userInfo.yphone">
            <el-input :disabled="true"
              class="qhClass-input"
              :value="$store.state.userInfo.yphone"
              :placeholder="$t('输入手机号码')"
            >
              <div slot="prefix">
                <el-select :disabled="true"
                  size="small"
                  v-model="$store.state.userInfo.qh"
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
        <button @click="enter" :disabled="isEnter" type="button" class="button button_lg button_red button_center button_fullwidth">
          <span class="button__inner">
            <span class="button__text">{{ $t('提交') }}</span>
            </span>
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";

import {
  sendcode_mail_api,
  sendcode_index_api,
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
      isEnter: false,
      selecQu: "",
      idc: [],
      code: '',
      type: '',
    }
  },
  methods: {
    show(type) {
      this.type = type;
      this.dialogVisible = true;
      this.isEnter = false;
      this.code = '';
    },
    sendCode() {
      if (this.sendCodeing) return;
      if (this.$store.state.userInfo.mail) {
        this.sendMailCode();
      } else if (this.$store.state.userInfo.phone) {
        this.sendPhoneCode();
      } else {
        this.errorTips('请先绑定邮箱或手机号码');
      }
    },
    // 获取手机验证码
    async sendPhoneCode() {
      let _this = this;
      _this.sendCodeing = true;
      _this.sendCodeLoading = true;
      await sendcode_index_api({
        qh: this.selecQu,
        phone: this.$store.state.userInfo.yphone,
        scene: 'verify'
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
        email: this.$store.state.userInfo.mail,
        scene: 'verify'
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

    enter() {
      if (this.isEnter) {
        return;
      }
      this.isEnter = true;

      this.$emit("enter", this.code, this.type);
    },
  },
  mounted() {
    this.idc = this.$helper.get("idc");
    if (this.idc.length > 0) {
      this.selecQu = this.idc[0].value;
    }
  }
};
</script>

<style scoped>

.code-check-dialog {
  max-width: 360px !important;
}
.code-check-dialog__head {
    margin-bottom: 24px;
    position: relative;
}
.code-check-dialog__title {
  font-size: 24px;
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
