<template>
 <!--  <div
    class="app"
    :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}`"
  >
    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick" /> -->
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="page-account">
            <accountTabsnew num="set"></accountTabsnew>
            <div class="page-account__body">  
              <el-row :gutter="15" type="flex" style="flex-wrap: wrap;">
                <el-col :span="12" class="col" :xs="24" v-if="rule.user_google_status==1">
                  <settingCart 
                  :state="$store.state.userInfo && $store.state.userInfo.goodsle_bind == 1" 
                  @btnClick="show2faModel"
                  title="2FA" 
                  iconName="icon-google-auth" 
                  class="setting-cart"
                  stateTxt="2FA 已激活"
                  stateTxtNot="2FA 未激活"
                  btnTxt="设置"
                  content="2FA_desc"></settingCart>
                </el-col>
                <!-- iconName="icon-locked-new"  -->
                <el-col :span="12" class="col" :xs="24">
                  <settingCart
                  @btnClick="showChangepassword"
                  :state="$store.state.isLoginStatu" 
                  stateImage = 'P'
                  title="登录密码" 
                  content="必须至少包含8个字符字母和字符的组合" 
                  class="setting-cart"></settingCart>
                </el-col>
                <!-- iconName="icon-email-new"  -->
                <el-col :span="12" class="col" :xs="24">
                  <settingCart
                  :state="($store.state.userInfo&&$store.state.userInfo.mail_bind_status) == 1" 
                  stateImage = 'E'
                  title="我的邮箱" 
                  content="设置电子邮件以随时访问平台"
                  placeholder="请绑定邮箱"
                  :stateTxtNot="($store.state.userInfo&&$store.state.userInfo.mail_bind_status)==2?'未验证':'未绑定'"
                  :inputValue="$store.state.userInfo&&$store.state.userInfo.mail2"
                  @inputBtnClick="showMailModel($store.state.userInfo.mail_bind_status==2)"
                  :isInputBtn="($store.state.userInfo&&$store.state.userInfo.mail_bind_status) != 1"
                  class="setting-cart"></settingCart>
                </el-col>
               <!--  iconName="icon-email-new"  -->
                <el-col :span="12" class="col" :xs="24">
                  <settingCart
                  :state="($store.state.userInfo&&$store.state.userInfo.phone_bind_status) == 1" 
                  stateImage = 'I'
                  title="我的手机" 
                  content="绑定手机号码以随时访问平台"
                  placeholder="请绑定手机"
                  :stateTxtNot="($store.state.userInfo&&$store.state.userInfo.phone_bind_status)==2?'未验证':'未绑定'"
                  @inputBtnClick="showPhoneModel($store.state.userInfo.phone_bind_status==2)"
                  :isInputBtn="($store.state.userInfo&&$store.state.userInfo.phone_bind_status) != 1"
                  :inputValue="$store.state.userInfo && $store.state.userInfo.phone ? `+${$store.state.userInfo.qh} ${$store.state.userInfo.phone}` : ''"
                  class="setting-cart"></settingCart>
                </el-col>
                
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    <!-- </div>
    <template v-if="j">
            <asidebar  @menuClick="menuClick" :flagShow="openedleft"></asidebar>
        </template>
    <template v-else>
        <asidebar v-if="i" @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar> -->
    <div
      class="app-overlay"
      v-if="isMobileFlag"
      :class="openedleft?'visible':''"
      @click="menuClick"
    ></div>

    <changePassword ref="changePassword"></changePassword>
    <two-fa-act ref="fa2act"></two-fa-act>
    <two-fa-set ref="fa2set"></two-fa-set>
    <bindPhone ref="bindPhone"></bindPhone>

  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
/* import accountTabs from "@/components/accountTabs.vue"; */
import settingCart from "@/components/settingCart.vue";
import changePassword from "@/components/changePassword.vue";
import twoFaAct from "@/components/twoFaAct.vue";
import twoFaSet from "@/components/twoFaSet.vue";
import bindPhone from "@/components/bindPhone.vue";
import accountTabsnew from "../../components/accountTabs_new.vue"
const size = window.innerWidth
let width_size = true
let app = true
if(size < 1024){
    width_size = false
    app = false
}
export default {
  name: "Home",
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    settingCart,
    changePassword,
    twoFaAct,
    twoFaSet,
    bindPhone,
    accountTabsnew
  },
  data() {
    return {
      i:width_size,
      j:app,
      windowWidth: document.documentElement.clientWidth,
      checkList: [],
      userLoginEQ: [],
      rule:{}
    };
  },
  methods: {
    /**
     * 显示修改或设置2fa得弹窗
     * @param {boole} state 状态 true是未设置显示fa2set弹窗
     * */ 
    show2faModel(state){
      if(!state){
        this.$refs.fa2act.show()
      }else{
        this.$refs.fa2set.show()
      }
    },

    /**
     * 显示修改按钮弹窗
     * */ 
    showChangepassword(){
      this.$refs.changePassword.showPwdModal()
    },

     /**
     * 显示邮箱弹窗
     * */ 
    showMailModel(isTest){
      this.$refs.bindPhone.show(2,isTest)
    },

    /**
     * 显示手机弹窗
     * */ 
    showPhoneModel(isTest){
      this.$refs.bindPhone.show(1,isTest)
    },

    menuClick() {
      this.i = !this.i
      this.openedleft = !this.openedleft;
    },
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
    },
  },
  mounted() {
    this.rule = this.$helper.get("rule");
  },
  created() {
    this.isPhone();
  }
};
</script>
<style scoped>
/* .wrapper__inner{
  background: #0A0605;
} */
.page-account__body {
  background: #191A1E;
  margin-top: 32px;
}
.col{
  margin-bottom: 22px;
}
.setting-cart{
  height: 100%;
}
</style>
