<template>
  <el-dialog
    :visible.sync="isForget"
    :modal-append-to-body="false"
    custom-class="custom-dialog custom-sm-dialog "
    @close="dialogClose"
  >
    <div class="custom-dialog-head" slot="title">
      <div class="header__title">
        <h1>{{$t('重置密码')}}</h1>
      </div>
    </div>
    <div class="custom-dialog-body">
      <el-radio-group v-model="account_type" style="margin-bottom: 15px;" size="mini">
        <el-radio-button label="2">{{ $t('邮箱') }}</el-radio-button>
        <el-radio-button label="1">{{ $t('手机') }}</el-radio-button>
      </el-radio-group>
      <el-form>
        <el-form-item v-if="account_type == '2'">
          <el-input v-model="email" :placeholder="$t('输入你的邮箱')">
            <template #prefix>
              <svgIcon icon="icon-email-new" widthNumber="20" heightNumber="20"></svgIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-else>
          <el-input
            class="qhClass-input"
            v-model="phone"
            :placeholder="$t('输入手机号码')"
            :maxlength="$t('phone_length')=='phone_length'?'':$t('phone_length')"
            clearable
          >
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
        <el-form-item>
          <el-input v-model="code" :placeholder="$t('输入你的验证码')" auto-complete="new-password">
            <span slot="prefix">
              <span class="iconfont icon-yanzhengma"></span>
            </span>
            <span slot="suffix">
              <el-button
                class="test_emil"
                type="primary"
                :disabled="sendCodeing"
                @click="account_type == 1 ? sendPhoneCode() : sendEmailCode()"
              >{{ $t(sendCodeText) }}</el-button>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="new_pwd" type="password" show-password :placeholder="$t('输入新密码')" auto-complete="new-password">
            <template #prefix>
              <svgIcon icon="icon-locked-new" widthNumber="20" heightNumber="20"></svgIcon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="new_pwd2" type="password" show-password :placeholder="$t('确认密码')" auto-complete="new-password">
            <template #prefix>
              <svgIcon icon="icon-locked-new" widthNumber="20" heightNumber="20"></svgIcon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
		<div class="btns-group">
      <button type="button" @click="back" class="button button_lg button_grey1 button_center button_only-icon">
        <span class="button__inner">
          <span class="button__icon">
            <svgIcon icon="icon-arrow-left" widthNumber="20" heightNumber="20"></svgIcon>
          </span>
        </span>
      </button>
      <button :loading="isSubmit" @click="submit" type="button" class="button button_lg button_blue button_center button_fullwidth">
        <span class="button__inner">
          <span class="button__text">{{ $t('重置密码') }}</span>
        </span>
      </button>
    </div>
  </el-dialog>
</template>

<script>
import svgIcon from "@/components/svg.vue";

import { sendcode_mail_api, sendcode_index_api, forget_mail_pwd, forget_phone_pwd } from "@/api/user";
export default {
  components: {
    svgIcon
  },
  data() {
    return {
      isForget: false,
      account_type: '2',
      email: '',
      phone: '',
      code: '',
      new_pwd:'',
      new_pwd2:'',
      sendCodeing: false,
      sendCodeLoading: false,
      sendCodeText: '发送验证码',
      sendCodeSec: 60,
      isSubmit: false,
      selecQu: "",
      idc: [],
    }
  },
  methods: {
    show() {
      this.isForget = true;
    },
    back() {
      this.isForget = false;
      this.$emit('back');
    },
    dialogClose() {
    },

    // 获取手机验证码
    async sendPhoneCode() {
      let _this = this;
      if (_this.sendCodeing) {
        return
      }
      if (this.phone == "") {
        this.errorTips("手机不能为空");
        return;
      }
      _this.sendCodeLoading = true;
      await sendcode_index_api({
        qh: this.selecQu,
        phone: this.phone,
        scene: 'forget'
      }).then(res => {
          _this.sendCodeLoading = false;
        if (res && res.data.code == 1) {
          this.countdown()
          this.successTips(res.data.msg);
        } else {
          this.errorTips(res.data.msg);
        }
      });
    },
    sendEmailCode() {
      if (this.sendCodeing) return;
      if (this.email == "") {
        this.errorTips('邮箱不能为空');
        return;
      }
      const mailReg = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_-]+).([a-zA-Z0-9_-]+)(.[a-zA-Z0-9_-]+)*$/;
      if (mailReg.test(this.email)) {
        this.getMailCode_two();
      } else {
        this.errorTips('请输入正确的邮箱格式');
        return;
      }
    },
    async getMailCode_two() {
      let _this = this;
      if (_this.sendCodeing) {
        return
      }
      _this.sendCodeing = true;
      _this.sendCodeLoading = true;
      let info = {
        email: _this.email,
        scene: 'forget'
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
    submit() {
      if (this.isSubmit) {
        return;
      }
      let _this = this
      if (_this.new_pwd == '' || _this.new_pwd2 == '' || _this.code == '' || (_this.email == '' && _this.phone == '')) {
        this.errorTips('请输入完整信息');
        return
      }
      if (_this.new_pwd.length < 6) {
        this.errorTips('密码长度不能低于6位字符');
        return;
      }
      if (_this.new_pwd != _this.new_pwd2) {
        this.errorTips('两次密码输入不一致');
        return;
      }
      this.isSubmit = true;
      let api = this.account_type == 1 ? forget_phone_pwd({
        phone: _this.phone,
        code: _this.code,
        password: _this.new_pwd,
      }) : forget_mail_pwd({
        mail: _this.email,
        mail_code: _this.code,
        password: _this.new_pwd,
      });
      api.then(response => {
        this.isSubmit = false;
        let res = response.data;
        if (res.code == 1) {
          _this.email = '';
          _this.phone = '';
          _this.code = '';
          _this.new_pwd = '';
          _this.new_pwd2 = '';
          _this.isForget = false;
          _this.successTips(res.msg);
        } else {
          _this.errorTips(res.msg);
        }
      });
    }
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
.custom-dialog-body ::v-deep .el-input__prefix{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  pointer-events: none;
}
.btns-group {
    display: grid;
    grid-column-gap: 8px;
    -moz-column-gap: 8px;
    column-gap: 8px;
    grid-template-columns: auto 1fr;
    margin-top: 24px;
}

.qhClass {
  max-width: 90px;
  margin-left: -16px;
}

.custom-dialog-body ::v-deep .el-form-item__content {
  line-height: 44px;
}
.custom-dialog-body .qhClass-input /deep/ .el-input__inner {
  padding-left: 100px !important;
}
.custom-dialog-body .qhClass /deep/ .el-input__inner {
  padding-left: 25px !important;
  border: 0 !important;
  background: none !important;
}
</style>
