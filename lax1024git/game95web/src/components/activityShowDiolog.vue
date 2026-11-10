<template>
  <el-dialog :visible.sync="dialogVisible" custom-class="custom-dialog" :modal-append-to-body="false">
    <div class="custom-dialog-head" slot="title">
      <div class="header__title">
        <h1>{{ content.c_title ? $t(content.c_title) : $t("活动详情") }}</h1>
      </div>
    </div>
    <div class="activity_content">
      <div>
        <img :src="content.c_img" class="mb-2.5 rounded-lg" alt="">
        <div v-if="content.t_apply_start_time" class="mb-2.5 text-lime-green">
          <span>活动时间：&nbsp;{{ content.t_apply_start_time }}&nbsp;-&nbsp;{{ content.t_apply_end_time }}</span>
        </div>
        <div v-if="content.c_detail" class="mb-2.5">
          <span class="text-white">{{ $t('活动内容') }}：</span>
          <div v-html="content.c_detail"></div>
        </div>
        <!-- <div class="ml-2.5">
          <span  class="text-white">{{ $t('活动规则') }}：</span>
          <span>hello</span>
        </div> -->
      </div>
      <div class="tomorrow-wapper" v-if="content.base_type==6">
        <div class="content-bg"></div>
        <img src="@/assets/images/bi-a.png" class="bi-img">
        <div class="t-title">{{ $t("明日可领取-活动") }}</div>
        <div class="t-num">{{ numFormat(content.jyj_price) }}</div>
      </div>
    </div>
    <template #footer>
      <!-- custom-dialog-bottom -->
      <div class="text-center">
        <div class="m-2.5">
          <el-button class="know_btn" @click="knownClick">{{
              content.jump_url ? $t("去了解") : $t("已知晓")
            }}
          </el-button>
        </div>
        <div class="m-2.5" v-if="content.base_type == 5 || content.auto_apply == 1">
          <el-button class="tolive_btn" @click="toLiveSuppert">{{ $t("联系客服") }}</el-button>
        </div>
        <div class="m-2.5" v-else>
          <el-button class="know_btn" v-if="!isApplay" @click="apply(content.id)">{{ $t("活动申请") }}</el-button>
          <el-button class="applied_for_btn" v-else>{{ $t("已申请") }}</el-button>
        </div>
      </div>
      <!-- <div class="custom-dialog-bottom">
        <el-button class="button_red" @click="knownClick">{{
          content.jump_url ? $t("去了解") : $t("已知晓")
        }}</el-button>
        <el-button
          class="button_blue"
          v-if="content.base_type == 5 || content.auto_apply == 1"
          @click="toLiveSuppert"
          >{{ $t("联系客服") }}</el-button>
        <template v-else>
          <el-button
            class="button_blue"
            v-if="!isApplay"
            @click="apply(content.id)"
            >{{ $t("活动申请") }}</el-button>
          <el-button class="btn_gray" v-else>{{ $t("已申请") }}</el-button>
        </template>
      </div> -->
    </template>
  </el-dialog>
</template>
<script>
import svgIcon from "@/components/svg.vue";
import {action_nologin_list_api, action_apply_api} from "@/api/action";

export default {
  components: {
    svgIcon,
  },
  props: ["content"],
  data() {
    return {
      dialogVisible: false,
      isApplay: false,
    };
  },
  methods: {
    /**
     * 点击已知晓的事件，content.jump_url存在就跳转
     * */
    knownClick() {
      console.log(this.content.jump_url);
      if (this.content.jump_url) {
        this.$router.push(this.content.jump_url);
      } else {
        this.dialogVisible = false;
      }
    },

    /**
     * 跳转客服
     * */
    toLiveSuppert() {
      const ua = navigator.userAgent;
      let service_url = this.$t("service_url");
      if (/android/i.test(ua) || /iphone|ipad|ipod/i.test(ua)) {
        service_url = this.$t("mobile_service_url");
        if (/android/i.test(ua)) {
          window.open(service_url, "_blank");
        } else {
          window.location.href = service_url;
        }
      } else {
        window.open(service_url, "_blank");
      }
    },

    show() {
      this.dialogVisible = true;
    },
    // 活动申请
    async apply(id) {
      // if(this.content.base_type==6){
      //   return
      // }
      let data = {
        action_id: id,
      };
      await action_apply_api(data).then((res) => {
        if (res && res.data.code == 1) {
          this.successTips(res.data.msg, {
            showClose: false,
            duration: "2000",
            onClose: () => {
              this.dialogVisible = false;
              this.isApplay = true;
            },
          });
        } else if (res && res.data.code == 1000) {
          this.errorTips(res.data.msg, {
            showClose: false,
            duration: "2000",
            onClose: () => {
              this.dialogVisible = false;
              this.showLoginReg(0);
            },
          });
        } else {
          this.errorTips(res.data.msg);
        }
      });
    },
  },
  mounted() {
    console.log(this.content, '这是详情数据')
  },
  watch: {},
};
</script>
<style scoped lang="less">
.tomorrow-wapper {
  padding-bottom: 29%;
  position: relative;
  margin-bottom: 10px;
}

.bi-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.content-bg {
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 16%;
  right: 0;
  background-color: #2F3A4D;
  border-radius: 20px;
}

.custom-dialog-bottom {
  width: 100%;
  display: block;
  text-align: center;
}

.el-button + .el-button {
  margin-left: 0px;
}

.t-title {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  text-align: center;
  font-size: 24px;
  color: #FAC979;
  text-shadow: 0px 4px 4px rgba(14, 15, 20, .8);
  filter: drop-shadow(0 0 10px #e86100);
  @media (max-width: 768px) {
    font-size: 14px;
  }
}

.know_btn {
  background: #FF7D1E;
  width: 100%;
  color: #FFFFFF;
}

.tolive_btn {
  background: #84F100;
  width: 100%;
  color: #FFFFFF;
}

.applied_for_btn {
  background: #656667;
  width: 100%;
  color: #FFFFFF;
}

:deep .el-dialog__body {
  padding: 2px 10px !important;
}

.custom-dialog-bottom .el-button {
  width: 50%;
  display: block;
  margin-bottom: 10px;
}

.t-num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 30px;
  color: #FAC979;
  text-shadow: 0px 4px 4px rgba(14, 15, 20, .8);
  filter: drop-shadow(0 0 10px #e86100);
  @media (max-width: 768px) {
    font-size: 20px;
  }
}

@media (min-width: 1200px) {
  ::v-deep .custom-dialog {
    max-width: 680px;
  }
}
.activity_content{
  max-height: 400px; 
  overflow-y: auto;
}
</style>
