<template>
	<el-dialog :visible.sync="dialogVisible" custom-class="custom-dialog auth-qr" :modal-append-to-body="false">
    <div class="auth-qr__head">
      <h1 class="auth-qr__title">{{ $t('2FA Activation') }}</h1>
      <p class="auth-qr__desc">{{ $t('Install the') }}
        <a href="https://support.google.com/accounts/answer/1066447" target="_blank">{{ $t('Google Authenticator') }}</a>
        {{ $t('or a similar application. Activate 2FA to protect your account and data.') }}
      </p>
      <a :href="$t('safety-2fa-url')" class="auth-qr__link">{{ $t('How to set and use 2FA?') }}</a>
    </div>
    <div class="auth-qr__body">
      <div class="auth-qr__title-info">
        <p>{{ $t('Scan the QR-code using the app or enter the secret key manually.') }}</p>
        <img :src="qrcodeUrl" alt="qr" class="auth-qr__image show_small_qr">
      </div>
      <div class="auth-qr__qr-wrapper">
        <div class="auth-qr__main">
         <div class="input input_md top-input" readonly="readonly">
            <div class="input__inner input__inner_readonly">
              <input autocomplete="off" :value="codeText" onclick="this.select()" readonly="readonly" class="input__tag" />
              <button v-clipboard:copy="codeText" v-clipboard:success="getQueryUrl" type="button" class="button button_sm button_blue button_center button_only-icon">
                <span class="button__inner">
                  <span class="button__icon">
                    <svg focusable="false" aria-hidden="true" class="">
                      <use xlink:href="@/assets/fonts/svg-sprite.svg#icon-copy" class="svg-use"></use>
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
          <p class="auth-qr__warning">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAllBMVEUAAABGTlNFSEs7QUVSWmFSWmE7QUVSWmE7QUU6QkRQWmA8QEQ7QUVSWmI6QERRWmBSWmI5QEc6QEVQWWD/12ToxmJSWmE7QUVCR0poamL/yFqekWLStmHOm09TUEbJsGO+qGP0zmK0oWKTiWKdfUtsXkjzwFqrl1jOqVeThlb/uVLzslJ7c1LnqlFYWU7Ckk2phEyRd0vtm0TZAAAAFHRSTlMAIBDv35+f77+AYEDPr6+Qf3BgUATAo9oAAACsSURBVBjTfZDXEoMgEEUV1MT0sqBgiTW9/v/PhcA6Sh48L3fmzDD3Ls4YZMmjgPxJX6RpHtjO5QzgHM0t6dWg+EyHbiYYJBc4xrvBY68C4DFAQ/uujQAjZR72LQVKyKjbzamhk7LFrj1nKBUPnOUl0EvZLHCOltVJxy3e/uYUoClLHfJNiToaDOJp8tqGzuSAMrmblC+qpYXMqLMWKbPI1A8SnyMRsiL6TAslvvMKFQmq8uvjAAAAAElFTkSuQmCC" alt="warning" class="auth-qr__warning-img">
            {{ $t('保存此代码，如果无法访问身份验证器，这将是重新获得对您帐户的访问权限的唯一方法。') }}
          </p>
          <label class="checkbox m-hide">
            <input @click="onSaved" type="checkbox">
            <span>
              <span class="auth-qr__checkbox-label">{{ $t("我已经保存了恢复代码") }}</span>
            </span>
          </label>
        </div>
        <img :src="qrcodeUrl" alt="qr" class="auth-qr__image"></div>
        <label class="checkbox pc-hide">
            <input @click="onSaved" type="checkbox">
            <span>
              <span class="auth-qr__checkbox-label">{{ $t("我已经保存了恢复代码") }}</span>
            </span>
        </label>
    </div>
     
    <div class="auth-qr__footer">
      <div class="auth-qr__verify-block">
        <h5 class="auth-qr__verify-label" :class="isSaved ? 'active_label': ''">{{ $t('Verification code from app') }}</h5>
        <div class="code-inputs">
          <div class="input input_md">
            <div class="input__inner">
              <input index="0" :disabled="!isSaved" maxlength="1" ref="inps0" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
            </div>
          </div>
          <div class="input input_md">
            <div class="input__inner">
              <input index="1" :disabled="!isSaved" maxlength="1" ref="inps1" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
            </div>
          </div>
          <div class="input input_md">
            <div class="input__inner">
              <input index="2" :disabled="!isSaved" maxlength="1" ref="inps2" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
            </div>
          </div>
          <div class="input input_md">
            <div class="input__inner">
              <input index="3" :disabled="!isSaved" maxlength="1" ref="inps3" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
            </div>
          </div>
          <div class="input input_md">
            <div class="input__inner">
              <input index="4" :disabled="!isSaved" maxlength="1" ref="inps4" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
            </div>
          </div>
          <div class="input input_md">
            <div class="input__inner">
              <input index="5" :disabled="!isSaved" maxlength="1" ref="inps5" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
            </div>
          </div>
        </div>
      </div>
      <button @click="enable2Fa" type="button" :disabled="!isSaved" class="button auth-qr__button full_btn button_lg button_red button_center button_fullwidth" data-v-74766dac="">
        <span class="button__inner">
          <span class="button__text">{{ $t('启用 2FA') }}</span>
        </span>
      </button>
      <p class="auth-qr__footer-text">{{ $t('如果您有任何问题或困难，请向在线客服的支持帮助') }}</p>
    </div>
  </el-dialog>
</template>

<script>
import { get_2fa_qrcode, post_bind_google } from "@/api/user.js";
export default {
  data: function() {
    return {
      dialogVisible: false,
      text: [],
      inputValue: '',
      codeText: '',
      qrcodeUrl: '',
      isSaved: false
    }
  },
  methods: {
    show() {
      this.get_qrcode();
      this.dialogVisible =  true
    },
    onSaved() {
      this.isSaved = !this.isSaved;
      console.log(this.isSaved)
    },
    getQueryUrl() {
      this.successTips('复制成功');
    },
    changeInput(e) {
      if (e.srcElement.value.length == 6 && !isNaN(e.srcElement.value)) {
        let nums = e.srcElement.value.split(''), num;
        for(let i = 0; i < nums.length; i++) {
          num = nums[i];
          this.$refs['inps' + (i)].value = num;
        }
        this.text = nums;
        this.$refs.inps5.focus();
        return
      }
      const _this = this;
      let value = parseInt(e.srcElement.value);
      let index = parseInt(e.srcElement.getAttribute('index'));
      const inputType = e.inputType;
      if (!Number.isInteger(value) && inputType == 'insertText') {
        e.srcElement.value = '';
        this.text[index] = '';
        return;
      }
      if (value.toString().length > 1) {
        value = e.srcElement.value = value.toString().substring(value.toString().length - 1);
      }
      if (inputType == 'deleteContentBackward') {
        if (index <= 5 && index > 0) {
          this.$refs['inps' + (index - 1)].focus()
        }
      } else {
        if (value.toString().length > 0 && index < 5 && index >= 0) {
          this.$refs['inps' + (index + 1)].focus()
        }
      }

      this.text[index] = value
    },
    keyupInput(e) {
      if (e.code !== 'Backspace') {
        return;
      }
      if (e.srcElement.value === '') {
        let index = parseInt(e.srcElement.getAttribute('index'));
        this.text[index] = '';
        if (index <= 5 && index > 0) {
          this.$refs['inps' + (index - 1)].focus()
        }
      }
    },
    get_qrcode() {
      get_2fa_qrcode().then(response => {
        let res = response.data;
        if (res.code === 1) {
          this.codeText = res.secret;
          this.qrcodeUrl = res.data;
        }
      })
    },
    enable2Fa() {
      if (!this.isSaved) {
        return;
      }
      const code = this.text.join('');
      if (code.length != 6) {
        return;
      }
      let data = {
        code: code
      };
      post_bind_google(data).then(response => {
        let res = response.data;
        if (res.code === 1) {
          this.successTips(res.msg);
          this.updateUserInfo();
          this.dialogVisible = false;
        } else {
          this.errorTips(res.msg);
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.auth-qr{
  max-width: 530px;
}
.auth-qr__head {
}
.auth-qr__head .auth-qr__title {
    font-size: 32px;
}
.auth-qr__desc {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  margin-bottom: 5px;
  word-break: break-word;
}

.auth-qr__link {
    font-weight: 600;
    font-size: 11px;
    line-height: 16px;
}
.auth-qr__body {
    background: #1c2532;
    border-radius: 10px;
    width: 100%;
    padding: 16px;
    margin-top: 20px;
}
.auth-qr__image {
    width: 148px;
    height: 148px;
    border-radius: 10px;
    padding: 10px;
    background: #FFF;
}
.auth-qr__title-info p {
    font-size: 14px;
    line-height: 18px;
    color: #fff;
    font-weight: 600;
  word-break: break-word;
}

.auth-qr__title-info img {
    display: none;
}
.auth-qr__qr-wrapper {
    display: flex;
    align-items: center;
    grid-gap: 12px;
    gap: 12px;
    margin-top: 16px;
    @media (max-width:768px) {
      position: relative;
      padding-top: 60px;
      padding-bottom: 15px;
    }
}
.auth-qr__warning {
    margin-top: 8px;
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #93acd3;
    @media (max-width:768px) {
      min-height: 148px;
      margin: 0;
    }
}
.checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.checkbox input {
    min-width: 24px;
    height: 24px;
    margin-right: 8px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: #111923;
    pointer-events: none;
    transition: background-color .1s ease-in-out;
}
.checkbox input:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -3px;
    bottom: 0;
    margin: auto;
    width: 10px;
    height: 6px;
    visibility: hidden;
    transform: rotate(-45deg);
    border-radius: 1px;
    border-color: #000;
    border-style: solid;
    border-width: 0 0 2px 2px;
}
.checkbox input:checked {
    background-color: #1bb83d;
}
.checkbox input:checked:after {
    visibility: visible;
}
.checkbox span {
    color: #fff;
    font-weight: 600;
    display: inline-block;
    line-height: 1.2;
    transition: color .1s ease-in-out;
}
.auth-qr__checkbox-label {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
}

.auth-qr__verify-block {
    margin-top: 20px;
}
.auth-qr__verify-label {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 12px;
    color: #2a3546;
}
.auth-qr .active_label {
    color: #93acd3;
}
.code-inputs {
    display: flex;
    justify-content: space-around;
    grid-gap: 8px;
    gap: 8px;
}
.auth-qr .auth-qr__button {
    width: 143px;
    margin-right: 10px;
}
.auth-qr .auth-qr__button.full_btn {
    width: 100%;
    margin: 20px 0 0;
}
.auth-qr__footer-text {
    margin: 10px 0 0;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    color: #93acd3;
}

.auth-qr .code-inputs {
    display: flex;
    justify-content: space-around;
    grid-gap: 8px;
    gap: 8px;
}
.auth-qr .input {
    width: 100%;
    height: 44px;
    flex-grow: 1;
    
}
.top-input{
  @media (max-width:768px) {
    position: absolute;
    top: 0;
  }
}
.auth-qr .input__inner {
    position: relative;
    display: flex;
    align-items: center;
    border: 2px solid #2a3546;
    transition: color .1s ease-in-out,border-color .1s ease-in-out;
    overflow: hidden;
}

.auth-qr .input__tag {
    width: 0;
    flex: 1 1;
    display: block;
    font-weight: 600;
    color: #fff;
    outline: none;
    text-align: center;
}
.auth-qr .input_md .input__tag {
    line-height: 20px;
    padding: 0;
    border: none;
    height: 20px;
    font-size: 14px;
    background: transparent;
}
.auth-qr .fa2-code__body  .input__tag {
    height: 44px;
}
.pc-hide{
  @media (min-width:768px) {
    display: none;
  }
}
.m-hide{
  @media (max-width:768px) {
    display: none;
  }
}
</style>
