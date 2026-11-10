<template>
<!--  v-if="selectRechargeChannel"-->
  <div class="recharge-two-wapper" >
    <actionList @submit="changeActiveActionIndex" :list="bankAll.action_list" :active="activeActionIndex" v-if="isActionList"></actionList>
    <template v-else>
      <div class="title-wapper" @click="back">
<!--        <i class="el-icon el-icon-back"></i>-->
        <span>{{ $t("充值") }}
<!--          - -->
<!--        {{-->
<!--            selectRechargeChannel?.pay_name || selectRechargeChannel?.bank_name-->
<!--          }}-->
        </span>
      </div>
      <div class="first" v-if="!isSecond">
        <div class="title-icon-wapper">

        </div>
        <div class="input-label" v-if="(selectRechargeChannel?.pay_max_amout ||selectRechargeChannel?.max_amcount)>0">
          {{dw }}
          {{
            calc(
                selectRechargeChannel?.pay_min_amout ||
                selectRechargeChannel?.min_amcount
            )
          }} ~ {{dw }}{{
            calc(
                selectRechargeChannel?.pay_max_amout ||
                selectRechargeChannel?.max_amcount
            )
          }}
          <div class="label-link" v-if="
            $t('recharge_video_' + selectRechargeChannel?.id) !='recharge_video_' + selectRechargeChannel?.id " :href="$t('recharge_video_' + selectRechargeChannel?.id)"
              @click="eduParentEvent($t('recharge_video_' + selectRechargeChannel?.id))">
          <span>{{ $t("充值教程") }}</span><span class="el-icon-arrow-right"></span>
          </div>
        </div>
        <div class="input-wapper">
          <el-input
              class="input"
              type="number"
              v-model="value"
              :placeholder="$t('请输入充值金额')"
          >
            <span class="prefix-icon" slot="prefix">{{ dw }}</span>
            <span class="prefix-icon suffix-icon" slot="suffix" v-if="giftAmount"
            >{{ $t("赠送") }} + {{ dw }} {{ numFormat(giftAmount) }}</span
            >
          </el-input>
        </div>

        <div class="num-list">
          <div class="num-item" v-for="(item, index) in numList" :key="index"
              @click="tabNum(item.num)">
            <!-- <img src="@/assets/images/hot-icon2.png" class="hot-icon" alt="" v-if="item.isHot"> -->
            <template v-if="!checked">
              <div class="hot-wapper" v-if="item.giftAmount">
                + {{ dw }}{{ item.giftAmount }}
              </div>
              <div class="hot-wapper" v-else-if="item.giftRatio">
                + {{ item.giftRatio }}%
              </div>
              <div class="hot-wapper" v-else-if="item.isHot">HOT</div>
            </template>
            {{ dw }}{{ item.num }}
          </div>
        </div>


        <!-- 活动选择框 -->
        <div class="action-input num-item" v-if="isAction && $t('recharge_activity')!='hide'"
             @click="isActionList = true">
          <div class="action-input-content">{{ activeAction.news_title }}</div>
          <i class="el-icon el-icon-caret-right"></i>
        </div>

        <!-- 参与活动提示 -->
        <el-checkbox v-model="checked" class="checkbox" v-else-if="$t('recharge_activity')!='hide'">
        <span :class="checked ? 'checked-ac' : 'checked'">{{
            $t("不参与本次优惠活动")
          }}</span>
        </el-checkbox>

        <div class="zh-input-wapper"
             v-if="value && bankAll.currency_code!=selectRechargeChannel?.currencyApi.currency_code">
          <el-input
              class="input"
              :value="numFormat(value)+bankAll.currency_code"
              :readonly="true"
              :placeholder="$t('请输入充值金额')"
          >
          </el-input>
          <el-input
              class="input"
              :value="calc(value, true)+selectRechargeChannel?.currencyApi.currency_code"
              :readonly="true"
              :placeholder="$t('请输入充值金额')"
          >
            <!-- <span class="suffix-btn" slot="suffix">{{
              selectRechargeChannel?.currencyApi.currency_code
            }}</span> -->
          </el-input>
        </div>

<!--        <el-button v-if="!qrcodeData" style="margin:0" class="button_blue button_fullwidth btn"-->
<!--            @click="submit" :loading="loading">-->
<!--          <div class="btn-content">-->
<!--            <span>{{ $t("充值") }}</span>-->
<!--            <div>-->
<!--              <span>{{ calc(this.value, true) }}</span>-->
<!--              <span class="btn-dw">{{selectRechargeChannel?.currencyApi.currency_code }}</span>-->
<!--              <i class="el-icon el-icon-arrow-right"></i>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-button>-->
        <div class="topup-btn-box">
          <el-button class="topup-btn" v-if="!qrcodeData" style="margin:0" @click="submit" :loading="loading">{{ $t("充值") }}</el-button>
        </div>
        <div class="tip">
          <div class="tip-title">{{ $t("提示") }}</div>
          <div class="tip-item" v-if="$t('recharge_tip1')!='recharge_tip1'">1.{{ $t("recharge_tip1") }}</div>
          <div class="tip-item" v-else>
            {{ $t("最低充值金额为") }}:
            {{
              numFormat(
                  selectRechargeChannel?.pay_min_amout ||
                  selectRechargeChannel?.min_amcount
              )
            }}
            {{ selectRechargeChannel?.currencyApi.currency_code }}
          </div>

          <div class="tip-item" v-if="$t('recharge_tip2')!='recharge_tip2'">2.{{ $t("recharge_tip2") }}</div>
          <div class="tip-item" v-else>
            {{ $t("最高充值金额为") }}:
            {{
              numFormat(
                  selectRechargeChannel?.pay_max_amout ||
                  selectRechargeChannel?.max_amcount
              )
            }}
            {{ selectRechargeChannel?.currencyApi.currency_code }}
          </div>
          <div class="tip-item" v-if="$t('recharge_tip3')!='recharge_tip3'">3.{{ $t("recharge_tip3") }}</div>
          <div
              class="tip-item"
              v-else-if="
            this.bankAll.currency_symbol !=
              selectRechargeChannel?.currencyApi.currency_symbol
          "
          >
            {{ $t("今日汇率") }}：1{{
              selectRechargeChannel?.currencyApi.currency_code
            }}
            = {{ numFormat(selectRechargeChannel?.currencyApi.recharge_rate) }}
            {{ bankAll.currency_code }}
          </div>
        </div>
<!--        <safe class="safe"></safe>-->
      </div>

      <!-- 第二步 -->
      <div class="second" v-else>
        <div v-if="selectRechargeChannel?.type==1">
          <div class="code-wapper">
            <div class="qr-wapper">
              <img
                  v-if="selectRechargeChannel?.bank_qrcode"
                  :src="selectRechargeChannel?.bank_qrcode"
                  class="vue-qr"
              />
              <vue-qr
                  v-else
                  class="vue-qr"
                  :margin="10"
                  :auto-color="true"
                  :dot-scale="1"
                  :text="selectRechargeChannel?.bank_number || qrcodeData.address"
              />
            </div>
            <div class="code-input">
              <span>{{ selectRechargeChannel?.bank_number || qrcodeData.address }}</span>
              <div
                  class="copy-icon"
                  v-clipboard:copy="selectRechargeChannel?.bank_number"
                  v-clipboard:success="onCopy"
              >
                <img src="@/assets/images/copy3.png"/>
              </div>
            </div>
            <div class="djs">{{ djs }}</div>
          </div>
        </div>

        <!-- 线下充值银行卡信息展示 -->
        <div class="bank-wapper">
          <template v-if="selectRechargeChannel?.type==1">
            <div class="bank-item">
              <div class="bank-title">
                {{ $t("付款金额") }}
              </div>
              <el-input
                  class="input"
                  :value="calc(value, true)+' '+selectRechargeChannel?.currencyApi.currency_code"
                  :readonly="true"
                  :placeholder="$t('请输入充值金额')"
              >
                <!-- <span class="suffix-btn" slot="suffix">{{
                  selectRechargeChannel?.currencyApi.currency_symbol
                }}</span> -->
              </el-input>
              <div
                  class="copy-icon-input"
                  v-clipboard:copy="calc(value, true)"
                  v-clipboard:success="onCopy"
              >
                <img src="@/assets/images/copy3.png"/>
              </div>
            </div>
            <div class="bank-item">
              <div class="bank-title">
                {{ $t("到账金额") }}
              </div>
              <el-input
                  class="input"
                  :value="numFormat(value)+' '+bankAll.currency_code"
                  :readonly="true"
                  :placeholder="$t('请输入充值金额')"
              >
                <!-- <span class="suffix-btn" slot="suffix">{{ dw }}</span> -->
              </el-input>
              <div
                  class="copy-icon-input"
                  style="opacity: 0;"
              >
                <img src="@/assets/images/copy3.png"/>
              </div>
            </div>
          </template>
          <template v-else>

            <div class="bank-item" v-if="selectRechargeChannel?.bank_name">
              <div class="bank-title">
                {{
                  $t(
                      selectRechargeChannel?.currencyApi.name == "USDT"
                          ? "链名称"
                          : "银行名称"
                  )
                }}
              </div>
              <div class="bank-content">
                <span>{{ selectRechargeChannel?.bank_name }}</span>
                <div
                    v-clipboard:copy="selectRechargeChannel?.bank_name"
                    v-clipboard:success="onCopy"
                    class="copy-icon-wapper"
                >
                  <img
                      src="@/assets/images/copy4.png"
                      alt=""
                      class="copy-icon4"
                  />
                </div>
              </div>
            </div>
            <div class="bank-item" v-if="selectRechargeChannel?.bank_number">
              <div class="bank-title">
                {{
                  $t(
                      selectRechargeChannel?.currencyApi.name == "USDT"
                          ? "钱包地址"
                          : "银行账户"
                  )
                }}
              </div>
              <div class="bank-content">
                <span>{{ selectRechargeChannel?.bank_number }}</span>
                <div
                    v-clipboard:copy="selectRechargeChannel?.bank_number"
                    v-clipboard:success="onCopy"
                    class="copy-icon-wapper"
                >
                  <img
                      src="@/assets/images/copy4.png"
                      alt=""
                      class="copy-icon4"
                  />
                </div>
              </div>
            </div>
            <div class="bank-item" v-if="selectRechargeChannel?.bank_khm">
              <div class="bank-title">{{ $t("户名") }}</div>
              <div class="bank-content">
                <span>{{ selectRechargeChannel?.bank_khm }}</span>
                <div
                    v-clipboard:copy="selectRechargeChannel?.bank_khm"
                    v-clipboard:success="onCopy"
                    class="copy-icon-wapper"
                >
                  <img
                      src="@/assets/images/copy4.png"
                      alt=""
                      class="copy-icon4"
                  />
                </div>
              </div>
            </div>
            <div class="bank-item" v-if="selectRechargeChannel?.bank_open">
              <div class="bank-title">{{ $t("开户行") }}</div>
              <div class="bank-content">
                <span>{{ selectRechargeChannel?.bank_open }}</span>
                <div
                    v-clipboard:copy="selectRechargeChannel?.bank_open"
                    v-clipboard:success="onCopy"
                    class="copy-icon-wapper"
                >
                  <img
                      src="@/assets/images/copy4.png"
                      alt=""
                      class="copy-icon4"
                  />
                </div>
              </div>
            </div>
            <div class="bank-item">
              <div class="bank-title">
                {{
                  $t("付款金额")
                }}
              </div>
              <div class="bank-content">
                <span>{{ selectRechargeChannel?.currencyApi.currency_symbol }}  {{ calc(value, true) }}</span>
                <div
                    v-clipboard:copy="calc(value, true)"
                    v-clipboard:success="onCopy"
                    class="copy-icon-wapper"
                >
                  <img
                      src="@/assets/images/copy4.png"
                      alt=""
                      class="copy-icon4"
                  />
                </div>
              </div>
            </div>
            <div class="bank-item">
              <div class="bank-title">
                {{
                  $t("到账金额")
                }}
              </div>
              <div class="bank-content">
                <span>{{ dw }}  {{ numFormat(value) }}</span>
                <div
                    v-clipboard:copy="calc(value, true)"
                    v-clipboard:success="onCopy"
                    class="copy-icon-wapper"
                >
                  <img
                      src="@/assets/images/copy4.png"
                      alt=""
                      class="copy-icon4"
                  />
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 凭证 -->
        <div
            v-if="
            selectRechargeChannel?.pay_type == 0 ||
            selectRechargeChannel?.pay_type == 3 ||
            selectRechargeChannel?.pay_type == 4 ||
            selectRechargeChannel?.pay_type == 6" class="upload-input">
          <span class="upload-title">{{ $t("上传凭证") }}</span>
          <div class="upload-wapper">
            <el-upload
                class="avatar-uploader"
                :action="rootUrl + '/upload/img'"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :headers="uploadHeader"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
              <i class="el-icon-camera avatar-uploader-icon" v-else></i>
            </el-upload>
          </div>
        </div>
<!--        <el-button-->
<!--            class="button_blue button_fullwidth"-->
<!--            @click="isSecond = false"-->
<!--            style="background-color: #4D535B;margin-top:20px;"-->
<!--        >-->
<!--          <span class="btn-txt">{{ $t("上一步") }}</span>-->
<!--          <img class="btn-icon" src="@/assets/images/sahngyibu.png"/>-->
<!--        </el-button>-->
<!--        <el-button-->
<!--            class="button_blue button_fullwidth"-->
<!--            @click="submit"-->
<!--            style="margin:0;margin-top:10px;"-->
<!--            :loading="loading"-->
<!--        >-->
<!--          <span class="btn-txt">{{ $t("已完成支付") }}</span>-->
<!--          <img class="btn-icon" src="@/assets/images/wancheng.png"/>-->
<!--        </el-button>-->
        <div class="topup-btn-box">
          <el-button class="topup-btn" style="margin:0;background: #656667" @click="isSecond = false">{{ $t("上一步") }}</el-button>
        </div>
        <div class="topup-btn-box">
          <el-button class="topup-btn" style="margin-top: 12px" @click="submit" :loading="loading">{{ $t("已完成支付") }}</el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {upload_api} from "@/api/index.js";
import safe from "./safe.vue";
import helper from "@/common/helper";
import {recharge_apply_api} from "@/api/user";
import VueQr from "vue-qr";
import actionList from './actionList.vue';

export default {
  data() {
    return {
      activeActionIndex: 0,
      isActionList: false,
      timeId: null,
      djs: "10:00",
      uploadHeader: {usertoken: "", usertokenkey: ""},
      rootUrl: process.env.VUE_APP_API_URL,
      // numList:[50,100,200,500,1000,2000,5000,10000],
      loading: false,
      imageUrl: "",
      value: "",
      value2: "",
      checked: false,
      qrcodeData: null,
      isSecond: false,
    };
  },
  mounted() {
    this.isPhone();
    let {token, token_key} = helper.get("tokenInfo");
    this.uploadHeader.usertoken = token;
    this.uploadHeader.usertokenkey = token_key;
    console.log(this.selectRechargeChannel, this.uploadHeader);
  },
  components: {safe, VueQr, actionList},
  props: {
    hide: {
      default: null,
    },
    depositInfo: {
      default: () => {
      },
    },
    selectRechargeChannel: {
      default: {},
    },
    bankAll: {
      default: () => {
      },
    },
  },
  computed: {
    isAction() {
      return this.bankAll.action_list.length && this.bankAll.action_is_force_join == 1
    },
    activeAction() {
      if (this.bankAll.action_list.length) {
        return this.bankAll.action_list[this.activeActionIndex]
      }
    },
    dw() {
      return this.bankAll.currency_symbol;
    },

    /**
     * 计算赠送金额
     * */

    giftAmount() {
      if (!this.value || this.checked) return 0;
      const list = this.isAction ? this.activeAction.reg_json : this.bankAll.recharge_action_reg_json;
      const data = list.find((item) => {
        return (
            Number(this.value) <= Number(item.max_reg) &&
            Number(this.value) >= Number(item.min_reg)
        );
      });
      if (!data) return 0;
      if (data.type == 1) {
        return Number(data.bl_or_amount);
      } else if (data.type == 2) {
        return (this.value * data.bl_or_amount) / 100;
      }
    },

    /**
     * 格式化数字列表，寻找数字是否在热门里面
     * @returns {Array} 格式化好的数据
     * */

    numList() {

      const recharge_amount_discount = this.bankAll.recharge_amount_discount;
      const {
        bank_recharge_list,
        hot_bank_recharge_list,
      } = this.bankAll.recharge_amount_sitting;
      return bank_recharge_list.map((item) => {
        const discount = recharge_amount_discount.find(
            (discountItem) => item == discountItem.amount
        );
        let giftRatio = 0,
            giftAmount = 0;
        if (discount) {
          if (discount.type == 1) {
            giftAmount = discount.bl_or_amount;
          } else {
            giftRatio = discount.bl_or_amount;
          }
        }
        // 如果是首冲的话，重新计算赠送金额
        if (this.isAction) {
          giftAmount = 0
          giftRatio = 0
          if (this.activeAction) {
            const regNum = this.activeAction.reg_json.find(regItem => {
              return parseFloat(item) <= parseFloat(regItem.max_reg) && parseFloat(item) >= parseFloat(regItem.min_reg)
            })
            if (regNum) {
              if (regNum.type == 1) {
                giftAmount = regNum.bl_or_amount;
              } else {
                giftRatio = regNum.bl_or_amount;
              }
            }
          }
          return {
            num: item,
            isHot: hot_bank_recharge_list.includes(item),
            giftRatio, //活动赠送金额比例
            giftAmount, //活动赠送金额
          };
        } else {
          return {
            num: item,
            isHot: hot_bank_recharge_list.includes(item),
            giftRatio, //活动赠送金额比例
            giftAmount, //活动赠送金额
          };
        }
      });
    },
  },
  // mounted() {
  //   this.$log.add("wallet_select_channel", this.selectRechargeChannel);
  // },
  methods: {
    changeActiveActionIndex(index) {
      this.activeActionIndex = index
    },
    djsInit() {
      this.djs = "10:00"
      this.timeId = setInterval(() => {
        let s = this.djs.split(":")[0] * 60 + this.djs.split(":")[1] * 1
        s--
        if (s <= 0) {
          s = 600
        }
        this.djs = `${parseInt(s / 60)}:${s % 60}`
      }, 1000)
    },
    calc(num, isRes, isNumFormat) {
      const numChange = isRes
          ? num / this.selectRechargeChannel?.currencyApi.recharge_rate
          : num * this.selectRechargeChannel?.currencyApi.recharge_rate;
      if (isNumFormat) {
        return numChange.toFixed(3);
      } else {
        return this.numFormat(numChange);
      }
    },
    onInput(e) {
      this.value = this.clearIntegerNum(e)
    },
    onCopy: function () {
      this.successTips("Copy success");
    },
    uploadSuccess(e) {
      if (e.code == 1) {
        this.imageUrl = e.data.file;
      }
    },
    /**
     * 提交表单
     * */

    async submit() {

      const self = this;
      if (!this.value) {
        this.$message({
          showClose: true,
          message: this.$t("请输入充值金额"),
          type: "error",
        });
        return;
      }

      // 判断是否显示二维码信息
      if (this.selectRechargeChannel?.bank_number && this.isSecond == false) {
        this.isSecond = true
        return
      }

      // 判断是否为usdt第二步是的话隐藏
      if (this.qrcodeData && this.isSecond) {
        this.hide()
        return
      }

      // 验证凭证
      let pay_type = this.selectRechargeChannel?.pay_type;
      if (pay_type == 0 || pay_type == 3 || pay_type == 4 || pay_type == 6) {
        if (!this.imageUrl) {
          this.$message({
            showClose: true,
            message: this.$t("请上传充值凭证"),
            type: "error",
          });
          return;
        }
      }
      let form = {
        type: this.selectRechargeChannel?.pay_type,
        bank_sk_id: this.selectRechargeChannel?.id,
        apply_price: this.calc(this.value, true, true),
        credentials: this.imageUrl, //充值凭证（图片） type=0,3,4,6时必传
        usdt_type: this.selectRechargeChannel?.usdt_type,
        not_auto_action: this.isAction ? this.activeAction.id : (this.checked ? 1 : 0),
      };
      // this.$log.add("recharge_click", form);
      this.loading = true;
      let res = await recharge_apply_api(form);
      this.loading = false;
      if (res.data.code == 1) {
        if (res.data.data.is_qrcode == 1) {
          this.qrcodeData = res.data.data;
          this.isSecond = true
        } else if (res.data.data.handle_type == "navto") {
          self.loading = true;
          window.setTimeout(() => {
            self.loading = false;
          }, 3000);
          window.location.assign(res.data.data.pay_url);
          // this.$log.add("jump_three", { url: res.data.data.pay_url });
          // if (this.isMobileFlag) {
          //   this.$router.push({
          //     path:"/iframe-page",
          //     query:{
          //       src:res.data.data.pay_url,
          //       loadingImg:this.selectRechargeChannel?.icon
          //     }
          //   })
          //   this.hide&&this.hide()
          // } else {
          //   window.open(res.data.data.pay_url)
          // }
        } else {
          this.$message({
            showClose: true,
            message: this.$t("提交成功，等待后台审核"),
            type: "success",
          });
          this.hide && this.hide();
        }
      } else {
        this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      }
    },

    /**
     * 返回上一步
     * */

    back() {
      this.$emit("back");
    },

    /**
     * 数值按钮点击事件
     * @param {Number} num 点击的数字
     * */

    tabNum(num) {
      this.value = num;
    },
    eduParentEvent(val) {
      this.$emit("custom-event", val);
    },
  },
  beforeDestroy() {
    clearInterval(this.timeId)
  },
  watch: {
    value() {
      this.qrcodeData = null;
    },
    isSecond(v) {
      if (v) {
        this.djsInit()
      } else {
        this.qrcodeData = null
        clearInterval(this.timeId)
      }
    }
  },
};
</script>

<style scoped>
.recharge-two-wapper {
  //background-image: linear-gradient(to bottom, #01316c, #111923, #111923 122px);
  //border-radius: 10px;
  //color: #fff;
  //padding: 0 58px 59px;
  //overflow: auto;
  //max-height: 90vh;
}
.upload-input{
  display: flex;
}
.title-wapper {
  padding: 20px 0;
  position: relative;
  cursor: pointer;
  display: inline-block;
}

.copy-icon-wapper {
  cursor: pointer;
}

.copy-btn {
  display: none;
}

.el-icon-back {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translate(-10px, -50%);
  font-size: 20px;
  margin-bottom: 54px;
}

.input-wapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

/* .input {
  width: 254px;
} */
.input2 {
  width: 135px;
}

.el-icon-d-arrow-right {
  font-size: 20px;
}

.prefix-icon {
  transform: translate(-5px, 10px);
  color: #fff;
  line-height: 44px;
}

.input-label {
  margin-bottom: 14px;
  font-size: 14px;
}

.num-item {
  //width: 99px;
  width: 24%;
  height: 36px;
  line-height: 36px;
  background-color: #141414;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 13px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.num-item:not(:nth-child(4n)) {
  margin-right: 1%;
}

.hot-wapper {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #FF7D1E;
  line-height: 1em;
  border-radius: 0 0 0 100vh;
  padding: 4px 10px;
  padding-left: 14px;
  font-size: 12px;
  transform: scale(0.8);
  transform-origin: top right;
}

.num-item:hover {
  background-color: #2c3642;
}

.num-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.btn {
  padding: 18px 0;
  overflow: hidden;
}

.btn-content {
  display: flex;
  width: 439px;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 16px;
}

.btn-dw {
  margin-left: 10px;
}

.el-icon-arrow-right {
  margin-left: 4px;
}

.tip-item {
  //color: #829cc5;
  //margin-left: 19px;
  //font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #535353;
}

.tip-title {
  margin-top: 19px;
  margin-bottom: 11px;
}

.tip {
  margin-bottom: 50px;
}

.bank-item {
  display: flex;
  align-items: center;
  margin-bottom: 11px;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: #FFFFFF;
}

.bank-content {
  height: 42px;
  background-color: #141414;
  flex: 1;
  margin-left: 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 17px;
  flex-shrink: 0;
  border: 1px solid #464546;
}

.bank-content span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  width: 0;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 12px;
  color: #FEFEFF;
}

.copy-icon4 {
  width: 18px;
  cursor: pointer;
}

.bank-title {
  min-width: 65px;
}

.bank-wapper {
  margin-bottom: 30px;
}

.vue-qr {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.code-wapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;
  position: relative;
  align-items: center;
}

.code-input {
  width: 80%;
  background: #111923;
  border: 2px solid #2c3748;
  border-radius: 9px;
  color: #829cc5;
  font-size: 14px;
  padding: 8px;
  position: relative;
  min-height: 5em;
}

.copy-icon {
  width: 34px;
  height: 34px;
  position: absolute;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
  z-index: 999;
}

.copy-icon img {
  width: 100%;
}

.qr-wapper {
  width: 299px;
  height: 299px;
  flex-shrink: 0;
  margin-bottom: 30px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #4C4D4F;
  width: 91px;
  height: 91px;
  line-height: 91px;
  text-align: center;
  border: 2px dashed #4C4D4F;
  border-radius: 4px;
}

.avatar {
  width: 91px;
  height: 91px;
  display: block;
  object-fit: cover;
}

.upload-title {
  margin-bottom: 12px;
  display: block;
}

.upload-wapper {
  padding: 14px 18px;
  //border: 2px solid #2c3748;
  border-radius: 14px;
  margin-bottom: 14px;
}

::v-deep .el-icon-loading {
  position: relative;
  left: 16px;
  top: 4px;
}

.suffix-icon {
  font-size: 12px;
  color: #00ff40;
  animation: suffixIco 1s infinite;
}

.copy-icon1 {
  width: 16px;
  height: 16px;
  margin-left: 14px;
  margin-bottom: 6px;
  cursor: pointer;
}

@keyframes suffixIco {
  0% {
    text-shadow: 0 0 0 #00ff40;
  }
  50% {
    text-shadow: 0 0 10px #00ff40;
  }
  100% {
    text-shadow: 0 0 0 #00ff40;
  }
}

/* .input ::v-deep .el-input__inner {
  padding-right: 100px;
} */
.checkbox {
  margin-bottom: 20px;
}

@media screen and (max-width: 555px) {
  .recharge-two-wapper {
    height: 100%;
    //padding-left: 27px;
    //padding-right: 27px;
    padding-bottom: calc(46px + 44px);
  }

  .btn-content {
    width: calc(100vw - 54px);
    font-weight: normal;
  }

  .el-icon-d-arrow-right {
    margin: 0 4px;
  }

  .input2 {
    width: 145px;
  }

  .title-wapper {
    //margin-left: 16px;
  }

  .recharge-two-wapper {
    border-radius: 0;
    background: #0A0605;
  }

  .num-item {
    width: calc(25% - 7px);
    height: 46px;
    border-radius: 5px;
    line-height: 46px;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .num-item:not(:nth-child(4n)) {
    margin-right: 8px;
  }

  .btn {
    padding: 12px 0;
  }

  .qr-wapper {
    width: 163px;
    height: 163px;
    flex-shrink: 0;
  }

  .code-input {
    font-size: 12px;
  }

  .copy-btn {
    background-color: #1bb83d;
    position: absolute;
    bottom: -5px;
    width: calc(100% - 103px - 9px);
    font-size: 12px;
    height: 29px;
    text-align: center;
    line-height: 29px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .copy-btn img {
    width: 1em;
    margin-right: 8px;
  }

  .copy-icon-xs {
    width: 14px;
    position: absolute;
    left: 13px;
  }
}

::v-deep .el-checkbox__inner {
  border-radius: 50%;
  border-color: #84F100 !important;
  border: 2px solid #84F100;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #da0043 !important;
  border-color: #da0043 !important;
  border: 1px solid #da0043;
}

.checked {
  color: #84F100;
}

.checked-ac {
  color: #da0043;
}

.code-title {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.label-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin-left: 5px;
  color: #3a07f2;
  line-height: 1;
  cursor: pointer;
}

.label-link .el-icon-arrow-right {
  animation: rightpulse 1s ease-in-out alternate infinite;
}

@keyframes rightpulse {
  0% {
    transform: translateX(1px);
  }
  100% {
    transform: translateX(0);
  }
}

.btn-icon {
  width: 1em;
  margin-left: 10px;
}

.btn-txt {
  display: inline-block;
  min-width: 6em;
}

.suffix-btn {
  display: block;
  background: #3a495f;
  border-radius: 8px;
  margin-top: 4px;
  height: 36px;
  width: 76px;
  line-height: 36px;
  color: #fff;
}

.zh-input-wapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.zh-input-wapper .input:last-child {
  margin-left: 4px;
}

.djs {
  color: red;
  font-size: 26px;
  margin-top: 10px;
}

.copy-icon-input {
  width: 44px;
  flex-shrink: 0;
  margin-left: 10px;
  cursor: pointer;
}


.action-input {
  background-color: #3A495F;
  margin-bottom: 20px;
  height: 55px;
  text-align: center;
  border-radius: 10px;
  width: 100%;
  white-space: wrap;
  line-height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  padding-right: 26px;
  position: relative;

}

.el-icon-caret-right {
  position: absolute;
  right: 10px;
}

.action-input-content {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 这里是超出几行省略 */
}

@media (max-width: 768px) {
  .action-input {
    height: 44px;
  }
}

.safe {
  margin-top: 60px;
}
.topup-btn-box{
  display: flex;
  justify-content: center;
}
.topup-btn{
  background: #FF7D1E;
  height: 52px;
  width: 420px;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
}
</style>
