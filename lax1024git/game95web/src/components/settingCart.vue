<template>
    <div class="set-cart-wapper">
      <div class="set-title-wapper">
        <svgIcon v-if="iconName" :icon="iconName" widthName="24" heightName="24"></svgIcon>
        <img :src="imagesMap.get(stateImage)" :class="stateImage==='E'?'image_setting01':'image_setting'" alt="">
        <!-- <img v-else-if="stateImage == 'E'" :src="emailimage" class="image_setting01" alt="">
        <img v-else="stateImage == 'I'" :src="phoneimage" class="image_setting" alt=""> -->
        <!-- <img :src="[stateImage == 'E' ? `${emailimage}`:``]" style="padding: 5px;" alt="">
        <img :src="[stateImage == 'I' ? `${phoneimage}`:``]" style="padding: 5px;" alt=""> -->
        <div class="set-title">{{ $t(title) }}</div>
        <svgIcon icon="icon-check-small" v-if="state" class="icon-check-small" widthName="24" heightName="24"></svgIcon>
        <svgIcon icon="icon-cross-small" v-else class="icon-cross-small" widthName="24" heightName="24"></svgIcon>
        <div class="state-txt" :style="{ color: !state ? '#DD1B30' : '#16C15E' }">{{ $t(state ? stateTxt : stateTxtNot) }}</div>
      </div>
      <div class="set-content-txt" v-if="content">
        {{ $t(content) }}
      </div>
      <el-button @click="btnClick" class="button_background" v-if="!placeholder"
        :class="['button_fullwidth', !state ? 'button_red' : 'button_blue']">{{
          $t(state ? btnTxt : btnTxtNot)
        }}</el-button>
      <el-input v-else :placeholder="$t(placeholder)" readonly :value="inputValue">
        <div class="suffix-right" slot="suffix" v-if="isInputBtn">
          <button type="button" class="button button_sm button_grey1 button_center button_only-icon"
            @click="inputBtnClick">
            <svgIcon icon="icon-edit" widthName="20" heightName="20"></svgIcon>
          </button>
        </div>
      </el-input>
    </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
export default {
  components: { svgIcon },
  props: {
    // 图标名字
    iconName: {
      default: "",
    },

    // 状态设置或未设置
    state: {
      default: true,
    },

    // 状态文字显示
    stateTxt: {
      default: "已验证",
    },

    // 状态文字显示
    stateTxtNot: {
      default: "未绑定",
    },

    // 按钮文字
    btnTxt: {
      default: "修改",
    },

    // 按钮文字
    btnTxtNot: {
      default: "启用",
    },

    // 内容
    content: {
      default: "",
    },

    // input placeholder 
    placeholder: {
      default: "",
    },

    // 标题
    title: {
      default: "",
    },

    // input value
    inputValue: {
      default: ""
    },

    // 是否显示input里面的按钮
    isInputBtn: {
      default: true
    },
    stateImage: {
      default:''
    }
  },
  data(){
    return{
      imagesMap:new Map([
        ['P',require('@/assets/images/setting/password.png')],
        ['E',require('@/assets/images/setting/email.png')],
        ['I',require('@/assets/images/setting/phone.png')],
      ]),
    }
  },
  methods: {
    /**
     * 按钮点击事件
     * */
    btnClick() {
      this.$emit("btnClick", this.state)
    },

    /**
     * input里面的按钮点击事件
     * */
    inputBtnClick() {
      this.$emit("inputBtnClick", this.state)
    }
  }
};
</script>

<style scoped>
.set-cart-wapper {
  margin:10px;
  background:#0A0605;
  border-radius: 17px;
  padding: 27px 23px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.set-title-wapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 16px;
}

.set-title {
  flex: 1;
  margin: 0 4px;
}

.icon-check-small {
  fill: #16C15E;
}

.state-txt {
  color: #ed1d49;
  font-weight: normal;
}
.image_setting{
  padding:5px;
  margin-bottom: 3px;
}
.image_setting01{
  padding:5px;
}

.set-content-txt {
  color: #727272;
  font-size: 12px;
  margin-bottom: 17px;
  flex: 1;
}

.icon-cross-small {
  fill: #ed1d49;
}

.button_background {
  background: #FFA905;
}

.el-button {
  color: #fff;
}
</style>
