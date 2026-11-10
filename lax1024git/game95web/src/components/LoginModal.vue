<template>
  <div>
    <!-- #1bb83d -->
    <el-dialog :modal-append-to-body="false" :visible.sync="$store.state.loginVisible" @closed="LoginLoadingClose"
      :before-close="LoginRegClose" custom-class="custom-dialog modal-intro modal-login">
      <div class="modal__container">
        <div class="modal-intro__intro">
          <div class="modal-intro__bg">
            <div class="modal-intro__intro-title">
              {{ $t('首存優惠') }}
              <span class="modal-intro__intro-title--yellow">{{ $t('送53800TWD') }}</span>
            </div>
            <div class="login-atlas">
              <img src="@/assets/images/login-atlas/underlay.png" alt="">
              <img class="img-treasure absolute" src="@/assets/images/login-atlas/treasure.png" alt="">
              <img class="img-ingot absolute" src="@/assets/images/login-atlas/ingot.png" alt="">
              <img class="img-pirate absolute" src="@/assets/images/login-atlas/pirate.png" alt="">
              <img class="img-golden-bull absolute" src="@/assets/images/login-atlas/golden-bull.png" alt="">
              <img class="img-pigeon absolute" src="@/assets/images/login-atlas/pigeon.png" alt="">
              <img class="img-rabbit absolute" src="@/assets/images/login-atlas/rabbit.png" alt="">
              <img class="img-tigger absolute" src="@/assets/images/login-atlas/tigger.png" alt="">
            </div>
          </div>

        </div>
        <div class="modal-intro__content">
          <div class="modal-login__head">
            <button type="button" size="sm" class="button-tab button-tab_sm button-tab_blue"
              :class="loginTab == 1 ? 'active' : ''" @click="onLoginRegModal(1)">
              <span>{{ $t('登录') }}</span>
            </button>
            <button type="button" size="sm" class="button-tab button-tab_sm button-tab_blue"
              :class="loginTab == 2 ? 'active' : ''" @click="onLoginRegModal(2)">
              <span>{{ $t('注册') }}</span>
            </button>
          </div>
          <div class="modal-login__body" v-if="loginTab == 1">
            <el-form ref="form" :model="loginform">
              <el-form-item>
                <el-input v-model="loginform.username" :placeholder="$t('输入手机号/邮箱')" clearable>
                  <span slot="prefix">
                    <svgIcon icon="icon-user" widthName="20" heightName="20"></svgIcon>
                  </span>
                </el-input>
              </el-form-item>
              <!-- passWord -->
              <el-form-item>
                <el-input show-password v-model="loginform.password" :placeholder="$t('输入你的密码')" clearable>
                  <span slot="prefix">
                    <svgIcon icon="icon-locked-new" widthName="20" heightName="20"></svgIcon>
                  </span>
                </el-input>
              </el-form-item>
              <!-- verificationCode -->
              <el-form-item v-show="code_check == 1 || code_check == 2" class="ver-piccode-item">
                <el-input v-model="loginform.verificationCode" :placeholder="$t('输入图形验证码')" clearable>
                  <span slot="prefix">
                    <span class="iconfont icon-yanzhengma"></span>
                  </span>
                  <span slot="suffix" @click="getCaptcha">
                    <el-image class="captchaImageClass" :src="captchaImage" fit="cover"></el-image>
                  </span>
                </el-input>
              </el-form-item>
              <div class="forget-link">
                <a href="javascript:;" @click="onForget">{{ $t('找回密码?') }}</a>
              </div>
              <el-form-item>
                <el-button class="button_fullwidth button_blue" @click="onSubmit" :loading="LoginLoading">{{ $t('登录')
                }}</el-button>
              </el-form-item>
            </el-form>
            <div class="login-variants" v-if="third_login && third_login.length > 0">
              <span class="login-variants__label">{{ $t('Or Login with') }}</span>
              <div class="login-variants__row">
                <div class="variant" v-for="(item, index) in third_login" :key="`third_login${index}`"
                  @click="getThirdLoginUrl(item.id)">
                  <div class="variant__tooltip">{{ $t(item.name) }}</div>
                  <button class="variant__btn bg_gmail">
                    <img width="24" height="24" :src="item.icon" />
                  </button>
                </div>
              </div>
            </div>
            <p class="hint">
              {{ $t('By accessing the site, I confirm that I am 18 years old and I have read the') }}
              <a @click="showTC(5)" href="javascript:;">{{ $t('Terms of Service') }}</a>
            </p>
          </div>
          <div class="modal-login__body" v-if="loginTab == 2">
            <el-form ref="form" :model="registform">
              <el-form-item :class="phone_bind == 3 ? 'register-username' : ''" v-if="account_type == 2">
                <el-input v-model="registform.username" :placeholder="$t('输入电子邮箱')" clearable>
                  <span slot="prefix">
                    <svgIcon icon="icon-email-new" widthName="20" heightName="20"></svgIcon>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item :class="phone_bind == 3 ? 'register-username' : ''" v-else-if="account_type == 1">
                <el-input class="qhClass-input" v-model="registform.username" :placeholder="$t('输入手机号码')" clearable>
                  <div slot="prefix">
                    <el-select size="small" v-model="selecQu" :placeholder="$t('请选择')" class="qhClass">
                      <el-option v-for="item in idc" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                    </el-select>
                  </div>
                </el-input>
              </el-form-item>
              <div class="forget-link" v-if="phone_bind == 3">
                <a href="javascript:;" v-if="account_type == 2" @click="account_type = 1">{{ $t('手机注册') }}</a>
                <a href="javascript:;" v-if="account_type == 1" @click="account_type = 2">{{ $t('邮箱注册') }}</a>
              </div>
              <div class="has-code-item" v-if="phone_check == 1">
                <el-form-item>
                  <el-input v-model="registform.phoneCode" :placeholder="$t('输入验证码')" clearable
                    auto-complete="new-password">
                    <span slot="prefix">
                      <span class="iconfont icon-yanzhengma"></span>
                    </span>
                    <span slot="suffix">
                      <el-button class="test_emil" type="primary" :disabled="reg_canClick"
                        @click="account_type == 1 ? sendPhoneCode() : sendEmailCode()">{{ reg_content }}</el-button>
                    </span>
                  </el-input>
                </el-form-item>
              </div>

              <el-form-item v-if="is_reg_type == 1">
                <el-input v-model="registform.inputPhone" type="tel" :placeholder="$t('输入手机号码')" clearable>
                  <span slot="prefix">
                    <i class="iconfont icon-phone"></i>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item v-if="is_reg_type == 2">
                <el-input v-model="registform.inputEmail" :placeholder="$t('输入电子邮箱')" clearable>
                  <span slot="prefix">
                    <svgIcon icon="icon-email-new" widthName="20" heightName="20"></svgIcon>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input show-password v-model="registform.password" :placeholder="$t('输入你的密码')" clearable
                  auto-complete="new-password">
                  <span slot="prefix">
                    <svgIcon icon="icon-locked-new" widthName="20" heightName="20"></svgIcon>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="registform.promotion" :placeholder="$t('推广码')" clearable :readonly="share_code_status" v-show="!share_code_status">
                  <span slot="prefix">
                    <svgIcon icon="icon-promocode" widthName="20" heightName="20"></svgIcon>
                  </span>
                </el-input>
              </el-form-item>

              <!-- verificationCode -->
              <el-form-item v-show="code_check == 1 || code_check == 3" class="ver-piccode-item">
                <el-input v-model="registform.verificationCode" :placeholder="$t('输入图形验证码')" clearable>
                  <span slot="prefix">
                    <span class="iconfont icon-yanzhengma"></span>
                  </span>
                  <span slot="suffix" @click="getCaptcha">
                    <el-image class="captchaImageClass" :src="captchaImage" fit="cover"></el-image>
                  </span>
                </el-input>
              </el-form-item>

              <div class="forget-link">
                <el-checkbox v-model="Termschecked">
                  {{ $t('I confirm that I am 18 years old and I have read the') }}
                  <a @click="showTC(5)" href="javascript:;">{{ $t('Terms of Service') }}</a>
                </el-checkbox>
                <span v-if="!Termschecked && TermscheckedErrorMsg" style="color:red;">{{ $t(TermscheckedErrorMsg)
                }}</span>
              </div>
              <el-form-item>
                <el-button class="button_fullwidth button_blue" @click="createSubmit" :loading="registerLoading">{{
                  $t('注册') }}</el-button>
              </el-form-item>
            </el-form>
            <div class="login-variants" v-if="third_login && third_login.length > 0">
              <span class="login-variants__label">{{ $t('Or Login with') }}</span>
              <div class="login-variants__row">
                <div class="variant" v-for="(item, index) in third_login" :key="`third_login${index}`"
                  @click="getThirdLoginUrl(item.id)">
                  <div class="variant__tooltip">{{ $t(item.name) }}</div>
                  <button class="variant__btn bg_gmail">
                    <img width="24" height="24" :src="item.icon" />
                  </button>
                </div>
              </div>
            </div>
            <!-- <p class="hint">
              {{ $t('By accessing the site, I confirm that I am 18 years old and I have read the') }}
              <a
                @click="showTC(5)"
                href="javascript:;"
              >{{ $t('Terms of Service') }}</a>
            </p> -->
          </div>
          <div class="modal-login__footer">
            <p v-if="loginTab == 1">
              {{ $t('你没有帐号吗?') }}
              <button @click="loginTab = 2">{{ $t('注册') }}</button>
            </p>
            <p v-else>
              {{ $t('Do you have an account?') }}
              <button @click="loginTab = 1">{{ $t('登录') }}</button>
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 条款弹窗 -->
    <el-dialog :visible.sync="tcVisible" custom-class="custom-dialog">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ tcTitle }}</h1>
        </div>
      </div>
      <div class="news__body" v-html="tcContent"></div>
    </el-dialog>
    <twoFa ref="twofa" @enter="twoFaEnter"></twoFa>
    <forget ref="forget" @back="show(0)"></forget>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import twoFa from "@/components/twoFa.vue";
import forget from "@/components/forget.vue";
import getDevice from "@/common/getDevice"

import {
  login_api,
  captcha_api,
  login_register_api,
  rule_index_api
} from "@/api/index";
import {
  sendcode_mail_api,
  sendcode_index_api,
  login_get_third_login_api,
  login_get_third_login_url_api
} from "@/api/user";
export default {
  components: {
    svgIcon,
    twoFa,
    forget,
  },
  data() {
    return {
      tcVisible: false,
      tcContent: "",
      tcTitle: "",
      LoginLoading: false, //登录加载状态
      registerLoading: false, //注册加载状态
      captchaImage: "", //登录验证
      login_code_key: "", //登录key
      code_check: 0, //登录验证码状态
      loginOutLoading: false, //退出加载状态
      head_userInfo: null, //用户信息
      promotion_code: 0, //注册推广码是否开启
      account_type: this.$helper.get("rule").register_first_account_type == 'phone' ? 1 : 2, // 1手机， 2邮箱
      // 登录注册
      loginTab: 1,
      Termschecked: true,
      TermscheckedErrorMsg: '',
      Receivechecked: true,
      loginform: {
        username: "",
        email: "",
        password: "",
        verificationCode: "",
        google_code: ""
      },
      registform: {
        username: "",
        email: "",
        password: "",
        promotion: "",
        emailCode: "",
        phone: "",
        phoneCode: "",
        verificationCode: "",
        inputPhone: '',
        inputEmail: '',
      },
      reg_content: this.$t("获取验证码"),
      reg_totalTime: 60,
      reg_canClick: false,
      selecQu: "",
      idc: [],
      phone_check: 0,
      phone_bind: 0,
      third_login: [],
      google_code: "",
      is_reg_type: 2,
      share_code_status: false
    }
  },
  methods: {
    show(tab) {
      this.initForm()
      if (this.$store.state.loginVisible) {
        return;
      }
      this.$store.state.loginVisible = true;
      if (tab) {
        this.onLoginRegModal(tab);
      }
      let thirdLoginStatus = this.$helper.get("rule").thirdLoginStatus;
      if (thirdLoginStatus == 1) {
        this.getThirdLogin();
      }
    },
    initForm() {
      for (const key in this.loginform) {
        this.loginform[key] = ""
      }
      for (const key in this.registform) {
        this.registform[key] = ""
      }
      this.$forceUpdate()
    },
    onLoginRegModal(tab) {
      this.loginTab = tab
      if (this.loginTab == 2 && this.registform.promotion == '') {
        this.registform.promotion = this.$helper.get('share_code');
        this.registform.promotion && (this.share_code_status = true)
      }
    },
    LoginRegClose(done) {
      this.closeLoginReg();
      done();
    },
    LoginLoadingClose() {
      this.LoginLoading = false;
      this.registerLoading = false;
      this.$emit("close");
    },
    async createSubmit() {
      if (this.registform.username == "") {
        this.errorTips(this.account_type == 2 ? '输入你的电子邮箱' : '输入你的手机号码');
        return false;
      }

      if (this.registform.phoneCode == "" && this.phone_check == 1) {
        this.errorTips('输入你的验证码');
        return false;
      }

      if (this.registform.password == "") {
        this.errorTips('输入你的密码');
        return false;
      }

      if (
        this.registform.verificationCode == "" &&
        (this.code_check == 1 || this.code_check == 3)
      ) {
        this.errorTips('输入图形验证码', {
          showClose: false,
          duration: "2000",
          onClose: () => {
            this.getCaptcha();
          }
        });
        return false;
      }

      if (!this.Termschecked) {
        this.TermscheckedErrorMsg = 'Please accept the terms of service';
        return false;
      } else {
        this.TermscheckedErrorMsg = '';
      }
      this.registerLoading = true;
      let param = {
        account_type: this.account_type, // 2邮箱 1手机号码
        check_type:this.registform.phoneCode?this.account_type:0, //1为手机号，2邮箱 0 是没有验证码
        username: this.registform.username,
        password: this.registform.password,
        code_key: this.login_code_key,
        code_value: this.registform.verificationCode,
        areacode: this.selecQu,
        code: this.registform.phoneCode,
        rec_code: this.registform.promotion,
        phone: this.registform.inputPhone,
        mail: this.registform.inputEmail,
        acid: this.$helper.get('acid'),
        register_type:this.$route.query.register_type,
        device_type:getDevice()
      };
      await login_register_api(param).then(res => {
        if (res && res.data.code == 1) {
          this.closeLoginReg();
          this.$helper.set("tokenInfo", res.data.data);
          this.$store.commit("$vuexSetUserTokenState", res.data.data.token);
          this.$store.commit("$vuexSetUserTokenKeyState", res.data.data.userTokenKey);
          this.$store.state.loginVisible = false;
          this.updateUserInfo();
          this.$store.commit("$vuexSetLoginState", true);
          //上报注册, register 是固定值
          this.$buryingPoint.register()
          this.successTips('注册成功', {
            showClose: false,
            duration: "1000",
            onClose: () => {
              this.goUrl('/')
            }
          });
        } else {
          this.errorTips(res.data.msg, {
            showClose: false,
            duration: "2000",
            onClose: () => {
              this.getCaptcha();
            }
          });
        }
      });
      this.registerLoading = false;
    },
    // 获取登录、注册验证码
    async getCaptcha() {
      await captcha_api().then(res => {
        if (res && res.data.code == 1) {
          this.captchaImage = res.data.data.base64;
          this.login_code_key = res.data.data.key;
        }
      });
    },
    // 登录
    async onSubmit() {
      if (this.loginform.username == "") {
        this.errorTips("输入你的用户名");
        return false;
      }
      if (this.loginform.password == "") {
        this.errorTips("输入你的密码");
        return false;
      }
      if (this.code_check == 1 || this.code_check == 2) {
        if (this.loginform.verificationCode == "") {
          this.errorTips("输入图形验证码");
          return false;
        }
      }
      this.LoginLoading = true;

      const data = {
        account_type: this.account_type,
        username: this.loginform.username,
        password: this.loginform.password,
        code_key: this.login_code_key,
        code_value: this.loginform.verificationCode,
        google_code: this.loginform.google_code,
        device_type:getDevice()
      }
      await login_api(data).then(res => {
        if (res && res.data.code == 1) {
          this.updateUserInfo();
          this.closeLoginReg();
          this.$refs.twofa.close();
          this.$store.state.loginVisible = false;
          this.$helper.set("tokenInfo", res.data.data);
          this.$store.commit("$vuexSetUserTokenState", res.data.data.token);
          this.$store.commit(
            "$vuexSetUserTokenKeyState",
            res.data.data.userTokenKey
          );
          this.$store.commit("$vuexSetLoginState", true);
          this.$message({
            customClass: "successMessage",
            showClose: false,
            message: this.$t("登录成功"),
            center: true,
            type: "success",
            duration: "1000"
          });
        } else if (res && res.data.code == 109) {
          this.$refs.twofa.show("login_check");
        } else if (res && res.data.code == 110) {
          this.$refs.twofa.show("login_check");
          this.errorTips(res.data.msg);
        } else {
          this.errorTips(res.data.msg, {
            showClose: false,
            duration: "2000",
            onClose: () => {
              this.getCaptcha();
            }
          });
        }
        this.LoginLoading = false;
      });
    },
    // 获取手机验证码
    async sendPhoneCode() {
      if (this.reg_canClick) return;
      if (this.registform.username == "") {
        this.errorTips("手机不能为空");
        return;
      }
      await sendcode_index_api({
        qh: this.selecQu,
        phone: this.registform.username
      }).then(res => {
        if (res && res.data.code == 1) {
          this.reg_canClick = true;
          this.reg_content = this.reg_totalTime + "s";
          let clock = window.setInterval(() => {
            this.reg_totalTime--;
            this.reg_content = this.reg_totalTime + "s";
            if (this.reg_totalTime < 0) {
              window.clearInterval(clock);
              this.reg_content = this.$t("重新发送");
              this.reg_totalTime = 60;
              this.reg_canClick = false;
            }
          }, 1000);
          this.successTips(res.data.msg);
        } else {
          this.errorTips(res.data.msg);
        }
      });
    },
    sendEmailCode() {
      if (this.reg_canClick) return;
      if (this.registform.username == "") {
        this.errorTips("邮箱不能为空");
        return;
      }
      const mailReg = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_-]+).([a-zA-Z0-9_-]+)(.[a-zA-Z0-9_-]+)*$/;
      if (mailReg.test(this.registform.username)) {
        this.getMailCode();
      } else {
        this.errorTips("请输入正确的邮箱格式");
        return;
      }
    },
    // 发送邮箱验证码
    async getMailCode() {
      await sendcode_mail_api({
        email: this.registform.username
      }).then(res => {
        if (res && res.data.code == 1) {
          this.reg_canClick = true;
          this.reg_content = this.reg_totalTime + "s";
          let clock = window.setInterval(() => {
            this.reg_totalTime--;
            this.reg_content = this.reg_totalTime + "s";
            if (this.reg_totalTime < 0) {
              window.clearInterval(clock);
              this.reg_content = this.$t("重新发送");
              this.reg_totalTime = 60;
              this.reg_canClick = false;
            }
          }, 1000);
          this.successTips(res.data.msg);
        } else {
          this.errorTips(res.data.msg);
        }
      });
    },

    // 获取三方登录列表
    async getThirdLogin() {
      await login_get_third_login_api().then(res => {
        if (res && res.data.code == 1) {
          this.third_login = res.data.data;
        }
      });
    },
    async getThirdLoginUrl(id) {
      this.$helper.set("thirdLoginId", id);
      await login_get_third_login_url_api({ id }).then(res => {
        if (res && res.data.code == 1) {
          window.location.href = res.data.data.url;
        }
      });
    },

    fa2Show(type) {
      this.google_code = "";
      this.$refs.twofa.show(type);
    },
    fa2Close() {
      this.google_code = "";
      this.$refs.twofa.close();
    },
    twoFaEnter(code, type) {
      if (type === "login_check") {
        this.loginform.google_code = code;
        if (code) {
          this.onSubmit();
        }
        // this.$refs.twofa.close();
      }
    },

    onForget() {
      this.closeLoginReg();
      this.$store.state.loginVisible = false;
      this.$refs.forget.show();
    },


    showTC(type) {
      this.tcContent = "";
      this.tcTitle = "";
      const key = "tc_content_" + type + "_" + this.$helper.getLang();
      if (this.$helper.get(key)) {
        this.tcContent = this.$helper.get(key).content;
        this.tcTitle = this.$helper.get(key).title;
        this.tcVisible = true;
        return;
      }
      this.getRule(type);
    },
    getRule(type) {
      const self = this;
      const key = "tc_content_" + type + "_" + this.$helper.getLang();
      rule_index_api(type).then(response => {
        if (response && response.data.code == 1) {
          const data = response.data.data;
          if (data) {
            self.$helper.set(key, data);
            self.showTC(type);
          } else {
            this.errorTips("没有内容");
          }
        }
      });
    },

    mountChange() {
      this.idc = this.$helper.get("idc");
      if (this.idc.length > 0) {
        this.selecQu = this.idc[0].value;
      }
      // 分享码
      if (this.$route.query.share_code && this.registform.promotion=="") {
        this.$helper.set('share_code', this.$route.query.share_code);
        this.$nextTick(() => {
          this.registform.promotion = this.$route.query.share_code;
          this.registform.promotion && (this.share_code_status = true)

        })
      }
      let rule = this.$helper.get("rule");
      this.phone_check = rule.phone_check;
      this.phone_bind = rule.phone_bind;
      this.is_reg_type = rule.is_reg_type
      // 判断是否只开启某一个类型注册 默认为邮箱注册，如果只开启手机注册时需要改变默认类型
      if (this.phone_bind != this.account_type && this.phone_bind != 3) {
        this.account_type = this.phone_bind;
      }
      this.code_check = rule.code_check;
      this.promotion_code = rule.promotion_code;
      if (this.code_check == 1 || this.code_check == 3) {
        this.getCaptcha();
      }
    },
  },
  mounted() {
    this.mountChange();
  },
  watch:{
    "$store.state.channel":{
      handler:function(v){
        if(v){
          this.share_code_status = true
          this.registform.promotion = v.share_code;
          this.$forceUpdate()
        }
      },
      immediate:true
    }
  }
};
</script>

<style scoped>
.button-tab {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button-tab span {
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
}

.button-tab {
  -moz-appearance: none;
  -webkit-appearance: none;
  text-decoration: none;
  align-items: center;
  display: inline-flex;
  vertical-align: middle;
  justify-content: flex-start;
  font-weight: 600;
  line-height: 1.5;
  position: relative;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;
  border: 2px solid transparent;
  color: #93acd3;
  background-color: transparent;
}

.button-tab:active,
.button-tab:focus {
  outline: none;
}

.button-tab:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.button-tab i {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5em;
  width: 1.5em;
}

.button-tab i svg {
  transition: fill 0.1s ease-in-out;
}

.button-tab.loading {
  color: transparent !important;
  pointer-events: none;
  transition: all 0s !important;
}

.button-tab.loading i {
  opacity: 0;
}

.button-tab.loading:after {
  position: absolute;
  content: "";
  display: block;
  -webkit-animation: spinAround-data-v-7f052bfc 0.5s linear infinite;
  animation: spinAround-data-v-7f052bfc 0.5s linear infinite;
  border-radius: 50%;
  border: 2px solid transparent;
  height: 1em;
  width: 1em;
  left: calc(50% - 0.5em);
  top: calc(50% - 0.5em);
}

.button-tab.fullwidth {
  display: flex;
  width: 100%;
  justify-content: center;
}

.button-tab i svg {
  fill: #fff;
}

.button-tab:focus,
.button-tab:hover {
  background-color: #0b6ada;
  color: #fff;
}

.button-tab:focus i svg,
.button-tab:hover i svg {
  fill: #fff;
}

.button-tab:active {
  background-color: #0a64ce;
  color: #f9f9f9;
}

.button-tab:active i svg {
  fill: #f9f9f9;
}

.button-tab:disabled {
  background-color: #6cafff;
  border-color: transparent;
  box-shadow: none;
  color: hsla(0, 0%, 100%, 0.7);
}

.button-tab:disabled i svg {
  fill: hsla(0, 0%, 100%, 0.7);
}

.button-tab.loading:after {
  border-color: transparent transparent #fff #fff !important;
}

.button-tab i svg {
  fill: #93acd3;
}

.button-tab.active,
.button-tab:active,
.button-tab:focus,
.button-tab:hover {
  color: #fff;
  background-color: transparent;
}

.button-tab.active i svg,
.button-tab:active i svg,
.button-tab:focus i svg,
.button-tab:hover i svg {
  fill: #fff;
}

.button-tab.active,
.button-tab:disabled {
  cursor: default;
  background-color: #3a07f2;
  opacity: 1;
}
a{
  color:#1bb83d;
}
.button-tab:disabled:not(.active) {
  background-color: transparent;
}


.button-tab_sm {
  font-size: 12px;
  border-radius: 10px;
  padding: 5px 10px;
  border-radius: 3rem;
}

.button-tab_sm i:first-child:not(:last-child) {
  margin-left: -5px;
}

.button-tab_sm i:last-child:not(:first-child) {
  margin-right: -5px;
}

.button-tab_sm i:first-child:last-child {
  margin-left: -5px;
  margin-right: -5px;
}

.button-tab_sm i img,
.button-tab_sm i svg {
  width: 100%;
  height: 100%;
}

.button-tab_sm i~span {
  margin-left: 4px;
}

/* 登录注册 */

.modal-intro:before {
  display: none;
}

.modal-intro .modal__container {
  padding: 0;
  display: flex;
}

.modal-intro__intro {
  width: 330px;
  min-height: 550px;
  text-align: center;
  background: linear-gradient(180deg, #2c64be, #473ac0, #030c3e);
}

.modal-intro__bg {
  padding: 40px 20px 0;
  /* background-image: url(../assets/images/bg-intro-bonus.png); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-end;
}

@media (max-width: 720px) {
  .modal-intro__intro {
    display: none;
  }
}

.modal-intro__intro-title {
  font-weight: 900;
  font-size: 16px;
  line-height: 110%;
  letter-spacing: 0.02em;
  /* text-transform: uppercase; */
  color: #ffffff;
}

.modal-intro__intro-title--yellow {
  color: #ffffff;
}

.modal-intro__content {
  padding: 32px;
  width: 366px;
}

@media (max-width: 720px) {
  .modal-intro__content {
    width: 100%;
  }
}

@media (max-width: 400px) {
  .modal-login .modal-intro__content {
    padding: 30px;
  }
}

.modal-login__head {
  margin-bottom: 24px;
}

.modal-login__body {
  flex: 1 1;
}

.modal-login__body .hint {
  font-size: 11px;
  color: #55657e;
  line-height: 1.2;
  margin-top: 16px;
}

.modal-login__bonus {
  position: relative;
  margin-bottom: 20px;
}

.modal-login__bonus-text {
  position: absolute;
  left: 30px;
  right: 30px;
  top: 18px;
  text-align: center;
  font-weight: 900;
  font-size: 22px;
  line-height: 110%;
  letter-spacing: 0.02em;
  /* text-transform: uppercase; */
}

.modal-login__bonus-text--yellow {
  color: #fed700;
  white-space: nowrap;
}

.modal-login__inputs {
  margin-bottom: 16px;
}

.modal-login .checkbox,
.modal-login__inputs .input:not(:last-child) {
  margin-bottom: 10px;
}

.modal-login__footer p {
  margin: 0;
  font-size: 11px;
}

.modal-login__footer button {
  padding: 0;
  border: 0;
  color: #3a07f2;
  text-decoration: underline;
}

.modal-login__footer button:hover {
  text-decoration: none;
}

.captcha,
form [type="submit"] {
  margin-top: 16px;
}

form label span {
  font-size: 11px;
  color: #55657e;
  line-height: 1.2;
}

form a {
  font-size: 11px;
}

.login-variants {
  margin-top: 24px;
}

.login-variants__row {
  display: flex;
  transition: opacity 0.1s ease-in-out;
  margin-top: 8px;
}

.login-variants__row:hover .variant__btn {
  opacity: 0.5;
}

.login-variants__row .variant__btn:hover {
  opacity: 1;
}

.login-variants__label {
  color: #55657e;
  font-size: 11px;
}

.login-variants button {
  margin-right: 8px;
}

.variant {
  position: relative;
  flex-wrap: wrap;
}

.variant,
.variant__btn {
  display: flex;
  justify-content: center;
}

.variant__btn {
  width: 44px;
  height: 44px;
  text-align: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
}

.variant__btn.bg_telegram {
  background-color: #37aee2;
  padding: 0;
}

.variant__btn.bg_gmail {
  background-color: #fff;
}

.variant__btn.bg_tron {
  background-color: #ec0928;
}

.variant__btn.bg_tron svg {
  width: 30px;
  height: 30px;
}

.variant__btn.bg_metamask {
  background-color: #fff;
}

.variant__btn.bg_binance {
  background-color: #1e2025;
}

.variant__btn.bg_coin98 {
  background-color: #d9b432;
}

.variant__btn svg {
  transform: translateZ(0);
}

.variant__tooltip {
  pointer-events: none;
  position: absolute;
  bottom: calc(100% + 8px);
  font-weight: 500;
  font-size: 9px;
  color: #55657e;
  background-color: #202a39;
  border-radius: 100px;
  padding: 2px 5px;
  opacity: 0;
  transform: translateY(50%);
  white-space: nowrap;
  margin-left: -8px;
  transition: transform 0.1s ease-in-out;
}

.variant:hover .variant__tooltip {
  opacity: 1;
  transform: translateY(0);
}

.forget-link {
  margin-bottom: 16px;
}

.modal-login__footer {
  margin-top: 10px;
  color: #ffffff;
}

.modal__container {
  position: relative;
  z-index: 2;
  padding: 0;
  color: #fff;
  height: 100%;
}


.captchaImageClass {
  width: 100px;
  height: 38px;
  cursor: pointer;
  margin-top: 3px;
  margin-right: -3px;
  border-radius: 0 7px 7px 0;
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


.modal-login__body /deep/ .el-form-item__content {
  line-height: 44px;
}

.modal-login .qhClass-input /deep/ .el-input__inner {
  padding-left: 100px !important;
}

.modal-login .qhClass /deep/ .el-input__inner {
  padding-left: 25px !important;
  border: 0 !important;
  background: none !important;
}

.has-code-item {
  margin-bottom: 16px;
}

.has-code-item /deep/ .el-input__suffix-inner {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.register-username {
  margin-bottom: 5px;
}

.ver-piccode-item /deep/ .el-input__suffix-inner {
  display: flex;
  align-items: center;
  flex-flow: row-reverse;
}

.ver-piccode-item /deep/ .el-input__suffix-inner>span {
  line-height: 1;
}

.login-atlas {
  position: relative;
  width: 85%;
  margin-bottom: 15px;
  z-index: 20;
  user-select: none;
}

.absolute {
  position: absolute;
  user-select: none;
}

.img-treasure {
  left: -4%;
  bottom: 18%;
  width: 100%;
  z-index: 18;
}

.img-ingot {
  width: 18%;
  left: 33%;
  bottom: 35%;
  z-index: 19;
}


.img-rabbit {
  width: 38%;
  left: 48.5%;
  bottom: 18%;
  z-index: 17;
}

.img-pirate {
  width: 75%;
  left: -13%;
  bottom: 17.5%;
  z-index: 16;
}

.img-golden-bull {
  width: 99%;
  left: 27%;
  bottom: 15%;
  z-index: 15;
}

.img-pigeon {
  width: 83%;
  left: -4%;
  bottom: 36%;
  z-index: 14;
}



.img-tigger {
  width: 80%;
  left: 1%;
  bottom: 51%;
  z-index: 13;
}
</style>
