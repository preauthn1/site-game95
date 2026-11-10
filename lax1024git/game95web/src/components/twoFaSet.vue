<template>
	<el-dialog :visible.sync="dialogVisible" custom-class="custom-dialog fa2-code" :modal-append-to-body="false">
    <div class="fa2-code__head" slot="title">
      <h2 class="fa2-code__title">{{ $t('开启2FA设置') }}</h2>
      <p class="fa2-code__desc">
        {{ $t('设置不同操作开启验证') }}
      </p>
    </div>
    <div class="fa2-code__body">
      <el-form ref="form" :model="checks" label-width="120px">
        <el-form-item :label="$t(item.label)" v-for="(item, index) in labels" :key="index">
          <el-switch v-model="checks[item.key]" />
        </el-form-item>
      </el-form>
    </div>
    <div class="fa2-code__body">
      <h5 class="fa2-code__subtitle">{{ $t('Verification code from app') }}</h5>
      <div class="code-inputs">
        <div class="input input_md">
          <div class="input__inner">
            <input index="0" maxlength="1" ref="inps0" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
          </div>
        </div>
        <div class="input input_md">
          <div class="input__inner">
            <input index="1" maxlength="1" ref="inps1" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
          </div>
        </div>
        <div class="input input_md">
          <div class="input__inner">
            <input index="2" maxlength="1" ref="inps2" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
          </div>
        </div>
        <div class="input input_md">
          <div class="input__inner">
            <input index="3" maxlength="1" ref="inps3" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
          </div>
        </div>
        <div class="input input_md">
          <div class="input__inner">
            <input index="4" maxlength="1" ref="inps4" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
          </div>
        </div>
        <div class="input input_md">
          <div class="input__inner">
            <input index="5" maxlength="1" ref="inps5" type="number" @keydown="keyupInput"  @input="changeInput" inputmode="numeric" onclick="this.select()" class="input__tag" />
          </div>
        </div>
      </div>
    </div>
    <div class="fa2-code__footer">
      <button @click="saveSet" :disabled="isReq" type="button" class="button button_lg button_red button_center button_fullwidth">
        <span class="button__inner">
          <span class="button__text">{{ $t('保存设置') }}</span>
          </span>
      </button>
    </div>
  </el-dialog>
</template>

<script>
import { post_google_check } from "@/api/user.js";
export default {
  data: function() {
    return {
      dialogVisible: false,
      isReq: false,
      text: [],
      inputValue: '',
      checks: {
        login_check: false,
        login_password_check: false,
        withdrawal_password_check: false,
        bankcard_check: false,
        withdrawal_check: false,
      },
      labels: [
        { label: '登录', key: 'login_check'},
        { label: '修改登录密码', key: 'login_password_check'},
        // { label: '修改交易密码', key: 'withdrawal_password_check'},
        { label: '添加提现账户', key: 'bankcard_check'},
        { label: '提现', key: 'withdrawal_check'},
      ]
    }
  },
  methods: {
    show() {
      this.dialogVisible =  true
      this.isReq = false;
      this.$nextTick(() => {
        this.$refs.inps0.value = ''
        this.$refs.inps1.value = ''
        this.$refs.inps2.value = ''
        this.$refs.inps3.value = ''
        this.$refs.inps4.value = ''
        this.$refs.inps5.value = ''
      })
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
      this.text[index] = value;
    },
    keyupInput(e) {
      if (e.code !== 'Backspace') {
        return;
      }
      if (e.srcElement.value === '') {
        let index = parseInt(e.srcElement.getAttribute('index'));
        if (index <= 5 && index > 0) {
          this.$refs['inps' + (index - 1)].focus()
        }
        this.text[index] = '';
      }
    },

    saveSet() {
      if (this.isReq) {
        return;
      }
      const code = this.text.join('');
      if (code.length != 6) {
        return;
      }
      this.isReq = true;
      let checks = {};
      for (const key in this.checks) {
        if (Object.hasOwnProperty.call(this.checks, key)) {
          checks[key] = this.checks[key] ? 1 : 0;
        }
      }
      let data = {
        code: code,
        checks: checks
      };
      post_google_check(data).then(response => {
        let res = response.data;
        this.isReq = false;
        if (res.code === 1) {
          this.successTips(res.msg);
          this.updateUserInfo();
          this.dialogVisible = false;
        } else {
          this.errorTips(res.msg);
        }
      })
    }

  },
  mounted() {
    for (const key in this.checks) {
      if (Object.hasOwnProperty.call(this.checks, key)) {
        this.checks[key] = this.$store.state.userInfo[key] == 1 ? true : false;
      }
    }
    // console.log(this.$store.state.userInfo)
  }
}
</script>
<style>
.fa2-code {
  max-width: 360px !important;
}
.fa2-code__head {
    margin-bottom: 24px;
    position: relative;
}
.fa2-code__title {
  font-size: 24px;
}
.fa2-code__desc {
  display: block;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #93acd3;
}
.fa2-code .el-dialog__body {
  padding: 10px 20px 30px;
}
.fa2-code__body {
    margin-bottom: 24px;
}
.fa2-code__subtitle {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 4px;
}
.fa2-code .code-inputs {
    display: flex;
    justify-content: space-around;
    grid-gap: 8px;
    gap: 8px;
}
.fa2-code .input {
    width: 100%;
    height: 44px;
    flex-grow: 1;
}
.fa2-code .input__inner {
    position: relative;
    display: flex;
    align-items: center;
    border: 2px solid #2a3546;
    transition: color .1s ease-in-out,border-color .1s ease-in-out;
    overflow: hidden;
}
.fa2-code .input_md .input__inner {
    padding: 0;
}
.fa2-code .input__tag {
    width: 0;
    flex: 1 1;
    display: block;
    font-weight: 600;
    color: #fff;
    outline: none;
    text-align: center;
}
.fa2-code .input_md .input__tag {
    line-height: 20px;
    padding: 0;
    border: none;
    height: 20px;
    font-size: 24px;
}
.fa2-code .fa2-code__body  .input__tag {
    height: 44px;
}
.fa2-code__body .el-form-item__label {
  color:#fff;
}
</style>
