<template>
  <div class="g-remove-check-code">
    <div
      class="g-remove-check-code_content"
      @keyup="fnCheckCodeKeyup"
      @keydown="fnCheckCodeKeydown"
      @paste="fnCheckCodeKeyPaste"
      @input="fnCheckCodeInputEvent"
    >
      <input
        :class="{'g-code-input_color': aCheckCodeInputComputed[0] !== ''}"
        max="9"
        min="0"
        maxlength="1"
        data-index="0"
        autocomplete="new-password"
        v-model.trim.number="aCheckCodeInputComputed[0]"
        type="password"
        ref="firstInputRef"
      />
      <input
        :class="{'g-code-input_color': aCheckCodeInputComputed[1] !== ''}"
        max="9"
        min="0"
        maxlength="1"
        data-index="1"
        autocomplete="new-password"
        v-model.trim.number="aCheckCodeInputComputed[1]"
        type="password"
      />
      <input
        :class="{'g-code-input_color': aCheckCodeInputComputed[2] !== ''}"
        max="9"
        min="0"
        maxlength="1"
        data-index="2"
        autocomplete="new-password"
        v-model.trim.number="aCheckCodeInputComputed[2]"
        type="password"
      />
      <input
        :class="{'g-code-input_color': aCheckCodeInputComputed[3] !== ''}"
        max="9"
        min="0"
        maxlength="1"
        data-index="3"
        autocomplete="new-password"
        v-model.trim.number="aCheckCodeInputComputed[3]"
        type="password"
      />
      <input
        :class="{'g-code-input_color': aCheckCodeInputComputed[4] !== ''}"
        max="9"
        min="0"
        maxlength="1"
        data-index="4"
        autocomplete="new-password"
        v-model.trim.number="aCheckCodeInputComputed[4]"
        type="password"
      />
      <input
        :class="{'g-code-input_color': aCheckCodeInputComputed[5] !== ''}"
        max="9"
        min="0"
        maxlength="1"
        data-index="5"
        autocomplete="new-password"
        v-model.trim.number="aCheckCodeInputComputed[5]"
        type="password"
      />
    </div>
    <p class="g-remove-check-code_tip">{{$t('请输入提现密码')}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aCheckCodeInput: ["", "", "", "", "", ""], // 存储输入验证码内容
      aCheckCodePasteResult: [] // 粘贴的验证码
    };
  },
  computed: {
    // 验证码计算属性
    aCheckCodeInputComputed() {
      if (this.aCheckCodePasteResult.length === 6) {
        return this.aCheckCodePasteResult;
      } else if (
        this.aCheckCodeInput &&
        Array.isArray(this.aCheckCodeInput) &&
        this.aCheckCodeInput.length === 6
      ) {
        return this.aCheckCodeInput;
      } else if (/^\d{6}$/.test(this.aCheckCodeInput.toString())) {
        return this.aCheckCodeInput.toString().split("");
      } else {
        return new Array(6);
      }
    }
  },
  methods: {
    // 输入验证码，更新验证码数据
    fnCheckCodeKeyup(e) {
      let index = e.target.dataset.index * 1;
      let el = e.target;
      // 解决输入e的问题
      el.value = el.value.replace(/Digit|Numpad/i, "").slice(0, 1);
      if (/Digit|Numpad/i.test(e.code)) {
        // 必须在这里赋值，否则输入框会是空值
        this.aCheckCodeInput.splice(
          index,
          1,
          e.code.replace(/Digit|Numpad/i, "")
        );
        el.nextElementSibling && el.nextElementSibling.focus();
        if (index === 5) {
          if (this.aCheckCodeInput.join("").length === 6)
            document.activeElement.blur();
        }
        if (this.aCheckCodeInput.join("").length === 6) {
          document.activeElement.blur();
          this.$emit("finish", this.aCheckCodeInput.join(""));
        }
      }
    },
    // 输入验证码，检测位置变化
    fnCheckCodeKeydown(e) {
      let index = e.target.dataset.index * 1;
      let el = e.target;
      if (e.key === "Backspace") {
        if (this.aCheckCodeInput[index].length > 0) {
          this.aCheckCodeInput.splice(index, 1, "");
        } else {
          if (el.previousElementSibling) {
            el.previousElementSibling.focus();
            this.aCheckCodeInput[index - 1] = "";
          }
        }
      } else if (e.key === "Delete") {
        if (this.aCheckCodeInput[index].length > 0) {
          this.aCheckCodeInput.splice(index, 1, "");
        } else {
          if (el.nextElementSibling) {
            el.nextElementSibling.focus();
            this.aCheckCodeInput[++index] = "";
          }
        }
      } else if (e.key === "Home") {
        el.parentElement.children[0] && el.parentElement.children[0].focus();
      } else if (e.key === "End") {
        el.parentElement.children[this.aCheckCodeInput.length - 1] &&
          el.parentElement.children[this.aCheckCodeInput.length - 1].focus();
      } else if (e.key === "ArrowLeft") {
        if (el.previousElementSibling) el.previousElementSibling.focus();
      } else if (e.key === "ArrowRight") {
        if (el.nextElementSibling) el.nextElementSibling.focus();
      }
    },
    // 输入验证码，解决一个输入框输入多个字符的问题
    fnCheckCodeInputEvent(e) {
      let index = e.target.dataset.index * 1;
      let el = e.target;
      el.value = el.value.replace(/Digit|Numpad/i, "").slice(0, 1);
      this.aCheckCodeInput[index] = el.value;
    },
    // 验证码粘贴
    fnCheckCodeKeyPaste(e) {
      e.clipboardData.items[0].getAsString(str => {
        if (str.toString().length === 6) {
          this.aCheckCodePasteResult = str.split("");
          document.activeElement.blur();
          this.aCheckCodeInput = this.aCheckCodeInputComputed;
          this.aCheckCodePasteResult = [];
          this.$emit("finish", this.aCheckCodeInput.join(""));
        } else {
          // 如果粘贴内容不合规，清除所有内容
          this.aCheckCodeInput = ["", "", "", "", "", ""];
        }
      });
    },
    // 清除输入框内容
    clearInput() {
      this.aCheckCodeInput = ["", "", "", "", "", ""];
    }
  }
};
</script>
<style>
.g-remove-check-code {
  width: 100%;
  padding: 4px 0 8px 0;
}

.g-remove-check-code .g-remove-check-code_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  padding: 28px 0 28px 0;
  margin: 0 auto;
}

.g-remove-check-code .g-remove-check-code_content input {
  width: 50px;
  height: 50px;
  font-size: 36px;
  text-align: center;
  border: none;
  outline: none;
  border: solid 1px #2a3546;
  border-radius: 4px;
  -moz-appearance: textfield;
  background: #161f2c;
}

@media(max-width:640px){
	.g-remove-check-code .g-remove-check-code_content{
		width:100%
	}
	.g-remove-check-code .g-remove-check-code_content input {
	  width:46px;
	  height: 46px;
	  font-size: 32px;
	}
}
.g-remove-check-code .g-remove-check-code_content input.g-code-input_color {
  color: #fff;
  border-color: #5290ff;
}

.g-remove-check-code
  .g-remove-check-code_content
  input::-webkit-outer-spin-button,
.g-remove-check-code
  .g-remove-check-code_content
  input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

.g-remove-check-code .g-remove-check-code_tip {
  font-size: 14px;
  color: #999;
  text-align: center;
}
</style>
