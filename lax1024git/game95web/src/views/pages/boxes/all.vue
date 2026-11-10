<template>
  <div class="all-boxes">
	<el-skeleton v-if="!userFund && fundList.length == 0" :count="3" animated :throttle="500">
		<template slot="template">
			<h3 class="all-boxes__title flex-center">
			  <el-skeleton-item variant="text" style="width: 80px; margin-right: 20px;" />
			  <span style="width: 120px;"><el-skeleton-item variant="text"  /></span>
			</h3>
			<div class="all-boxes__available-box" style="background-color: #161f2c; border-radius: 12px;">
			  <div class="box box--close" >
			    <div class="box__box-view" style="display: flex;align-items: flex-end;justify-content: center;padding-bottom: 20px;">
			      <el-skeleton-item variant="image" style="width: 120px; height: 120px;border-radius: 12px;" />
			    </div>
			    <div class="box__preview" style="flex: 1;">
					<div class=" moblie-margin" style="width:120px; margin-bottom: 10px;">
						<p style="margin-bottom: 10px;"><el-skeleton-item variant="p"  /></p>
						<p><el-skeleton-item variant="h3"  /></p>
					</div>
			      <div class=" moblie-margin" style="width: 120px;">
			        <p style="margin-bottom: 10px;"><el-skeleton-item variant="p"  /></p>
			        <p><el-skeleton-item variant="h3"  /></p>
			      </div>
			    </div>
			    <div class="box__info">
			      <div class="box__actions">
			        <div class="box__period-block">
			          <p class="box__period-label"><el-skeleton-item variant="text"  /></p>
			          <div class="box__periods">
			            <el-skeleton-item variant="p"  />
			          </div>
			        </div>
			        <div style="margin-left: 20px; text-align: right;">
			          <el-skeleton-item variant="button"  style="margin-right:20px;"/> 
					  <el-skeleton-item variant="button"  />
			        </div>
			      </div>
			      <div style="display: flex; justify-content: space-between;">
					  <el-skeleton-item variant="text"  style="width: 60px;"/>
					  <el-skeleton-item variant="text" style="width: 60px;" />
				  </div>
			    </div>
			  </div>
			</div>
		</template>
	</el-skeleton>
    <h3 id="all-boxes" v-if="userFund" class="all-boxes__title">
      {{$t('活期')}} &nbsp;&nbsp;
      <span class="all-boxes__title_ts">{{ $t('活期副标题') }}</span>
    </h3>
    <div class="all-boxes__available-box">
      <div class="box box--close" v-if="userFund">
        <div
          class="box__gradient box__gradient-lg"
          style="background-image: linear-gradient(to right, rgb(22, 217, 212), rgb(28, 37, 50) 36%);"
        ></div>
        <div
          class="box__gradient box__gradient-md"
          style="background-image: linear-gradient(rgb(22, 217, 212), rgb(28, 37, 50) 110px);"
        ></div>
        <div
          class="box__gradient box__gradient-sm"
          style="background-image: linear-gradient(to left bottom, rgb(22, 217, 212), rgb(28, 37, 50) 35%);"
        ></div>
        <div class="box__box-view">
          <img src="../../../assets/images/bg.5779b0f.png" alt class="scale-up-center" />
          <img
            src="../../../assets/images/bg.5779b0f.png"
            alt
            class="scale-up-center"
            style="animation-delay: 2.5s;"
          />
          <span>
            <img src="../../../assets/images/box.3345386.png" alt />
            <img src="../../../assets/images/boxLight.4056212.png" alt class="box__anim-light" />
          </span>
          <img src="../../../assets/images/up.c7a735a.png" alt class="scale-up-side" />
          <img
            src="../../../assets/images/up.c7a735a.png"
            alt
            class="scale-up-side"
            style="animation-delay: 3.5s;"
          />
        </div>
        <div class="box__preview">
          <h3 class="box__title pc-margin">{{$t('存储您的钱包')}}</h3>
          <div class="box__price-block moblie-margin">
            <div class="box__price-info">
              <p class="box__price-label">{{$t('总余额')}}</p>
              <span class="box__price">
                <span
                  style="color: #fff"
                  class="font-digits"
                >{{ numFormat(userFund.live_fund_money?userFund.live_fund_money:0,true) }}</span>
              </span>
            </div>
          </div>
          <div class="box__price-block moblie-margin">
            <div class="box__price-info">
              <p class="box__price-label">{{$t('累计收益')}}</p>
              <span class="box__price">
                <span
                  style="color: #fff"
                  class="font-digits"
                >{{ numFormat(userFund.total_income?userFund.total_income:0,true) }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="box__info">
          <div class="box__actions">
            <div class="box__period-block">
              <p class="box__period-label">{{$t('请输入金额')}}</p>
              <div class="box__periods">
                <el-input v-model="priceInput"></el-input>
              </div>
            </div>
            <div class="box__lg-button-block">
              <el-button
                class="button_red button_center button_fullwidth"
                @click="userTransferIn"
              >{{$t('转入')}}</el-button>
              <el-button
                class="button_red button_center button_fullwidth"
                @click="userTransferOut"
              >{{$t('转出')}}</el-button>
            </div>
          </div>
          <div class="box__details">
            <div class="box__detail">
              <span class="box__available">
                {{$t('年化利率')}}:
                <span
                  class="box__total"
                >≈{{userFund.interest?(userFund.interest * 365).toFixed(2):0}}%</span>
              </span>
              <button type="button" class="box__detail-button">
                {{$t('上次收益')}}
                <span class="box__total">{{ numFormat(userFund.day_income?userFund.day_income:0,true) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 id="all-boxes" class="all-boxes__title" v-if="fundList.length > 0">
        {{$t('定期')}}&nbsp;&nbsp;
        <span class="all-boxes__title_ts">{{ $t('定期副标题') }}</span>
      </h3>
      <div
        class="box"
        v-for="(item,index) in fundList"
        :key="index"
        :class="item.show?'box--open':'box--close'"
      >
        <div
          class="box__gradient box__gradient-lg"
          style="background-image: linear-gradient(to right, rgb(22, 217, 212), rgb(28, 37, 50) 36%);"
        ></div>
        <div
          class="box__gradient box__gradient-md"
          style="background-image: linear-gradient(rgb(22, 217, 212), rgb(28, 37, 50) 110px);"
        ></div>
        <div
          class="box__gradient box__gradient-sm"
          style="background-image: linear-gradient(to left bottom, rgb(22, 217, 212), rgb(28, 37, 50) 35%);"
        ></div>
        <div class="box__box-view">
          <img src="../../../assets/images/bg.5779b0f.png" alt class="scale-up-center" />
          <img
            src="../../../assets/images/bg.5779b0f.png"
            alt
            class="scale-up-center"
            style="animation-delay: 2.5s;"
          />
          <span>
            <img src="../../../assets/images/box.3345386.png" alt />
            <img src="../../../assets/images/boxLight.4056212.png" alt class="box__anim-light" />
          </span>
          <img src="../../../assets/images/up.c7a735a.png" alt class="scale-up-side" />
          <img
            src="../../../assets/images/up.c7a735a.png"
            alt
            class="scale-up-side"
            style="animation-delay: 3.5s;"
          />
        </div>
        <div class="box__preview">
          <h3 class="box__title">{{$t(item.name)}}</h3>
          <div class="box__price-block">
            <div class="box__price-info">
              <p class="box__price-label">{{$t('起购金额')}}</p>
              <span class="box__price">
                <span style="color: #fff" class="font-digits">{{ numFormat(item.min_money,true) }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="box__info">
          <div class="box__actions">
            <div class="box__period-block">
              <p class="box__period-label">{{$t('投资金额')}}</p>
              <div class="box__periods">
                <el-input type="number" @input="calculate(item)" v-model="item.priceInput"></el-input>
              </div>
            </div>
            <div class="box__period-block">
              <p class="box__rate-label">{{$t('年化利率')}}</p>
              <div class="el-input__inner" v-if="item.fund_interest_type == 1">≈{{(item.interest * 365).toFixed(2)}} %</div>
              <div class="el-input__inner" v-else>≈{{(item.interest / item.few_days * 365).toFixed(2)}} %</div>
            </div>
            <div class="box__button-block">
              <el-button
                class="button_red button_center button_fullwidth"
                :loading="$store.state.loading.buyfund"
                @click="BuyFund(item)"
              >{{$t('购买')}}</el-button>
            </div>
          </div>
          <div class="box__details">
            <div class="box__detail">
              <span class="box__available">
                {{$t('周期')}}:
                <span class="box__total">{{item.few_days}}{{$t('天')}}</span>
              </span>
              <button v-if="item.income" type="button" class="box__detail-button">
                {{$t('预计收益')}}:
                <span class="box__total">{{ numFormat(item.income,true) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="all-boxes__my-box">
      <h3 id="my-boxes" class="all-boxes__title">{{$t('我的盒子')}}</h3>
      <div class="empty" is-boxes="true">
        <span>{{$t('暂无数据')}}</span>
      </div>
    </div>-->
    <el-dialog
      v-if="buyItem"
      :visible.sync="purchaseConfirmationDialogVisible"
      :modal-append-to-body="false"
      custom-class="custom-dialog"
    >
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ $t('提示') }}</h1>
        </div>
      </div>
      <div class="custom-dialog-body" style="padding-bottom:20px;">
        <h4>{{ $t('确认购买该基金？') }}</h4>
        <p>{{ $t('基金名称') }}: {{ $t(buyItem.name) }}</p>
        <p>{{ $t('周期') }}: {{ buyItem.few_days }} {{ $t('天') }}</p>
        <p v-if="buyItem.fund_interest_type == 1">{{ $t('年化利率') }}: ≈{{(buyItem.interest * 365).toFixed(2)}} %</p>
        <p v-else>{{ $t('年化利率') }}: ≈{{buyItem.interest / buyItem.few_days * 365}} %</p>
        <p>{{ $t('购买金额') }}: {{ numFormat(buyItem.priceInput,true) }} </p>
        <p>{{ $t('预计收益') }}: {{ numFormat(buyItem.income,true) }} </p>

      </div>
      <div class="custom-dialog-bottom" style=" position: relative;">
        <el-button class="btn_gray" @click="purchaseConfirmationDialogVisible = false">{{ $t('取消') }}</el-button>
        <el-button :loading="$store.state.loading.buyfund" class="button_red" type="primary" @click="onBuy">
          {{ $t('确认购买') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

import svgIcon from "@/components/svg.vue";
import {
  savings_funds_lists_api,
  savings_funds_fund_apply_api,
  savings_funds_get_my_fund_api,
  savings_funds_transfer_in_fund_api,
  savings_funds_transfer_out_fund_api
} from "@/api/fund";
export default {
  components: {
    svgIcon
  },
  data() {
    return {
      priceInput: "",
      pwdFund: "",
      fundList: [],
      price: [],
      userFund: null,
      fundType: 0,
      purchaseConfirmationDialogVisible: false,
      isConfirm: false,
      buyItem: null,
    };
  },
  methods: {
    calculate(item) {
      if (item.priceInput) {
        if (item.fund_interest_type == 1) {
          item.income = (item.priceInput * item.interest * item.few_days / 100).toFixed(5);
        } else {
          item.income = (item.priceInput * item.interest / 100).toFixed(5);
        }
      } else {
        item.income = 0;
      }
    },
    onBuy() {
      if (this.buyItem) {
        this.isConfirm = true;
        this.BuyFund(this.buyItem);
      } else {
        this.purchaseConfirmationDialogVisible = false;
      }
    },
    req() {
      let apiUrl = "";
      if (this.fundType == 1) {
        apiUrl = savings_funds_transfer_in_fund_api;
      } else if (this.fundType == 2) {
        apiUrl = savings_funds_transfer_out_fund_api;
      } else {
        this.postBuyFund(this.buyItem);
        return;
      }

      this.postTranster(apiUrl);
    },
    //   基金转入
    userTransferIn() {
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        return;
      }
      if (this.priceInput == "") {
        this.errorTips("请输入金额");
        return;
      }
      this.fundType = 1;
      this.req();
    },
    //   基金转出
    userTransferOut() {
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        return;
      }
      if (this.priceInput == "") {
        this.errorTips('请输入金额');
        return;
      }
      this.fundType = 2;
      this.req();
    },

    async postTranster(apiUrl) {
      let data = {
        type: 1,
        price: this.priceInput
      };
      await apiUrl(data).then(res => {
        if (res && res.data.code == 1) {
          this.getUserFundBox();
          this.fundType == 1 ? this.reduceUserBalance(this.priceInput) : this.addUserBalance(this.priceInput);
          this.priceInput = "";
          this.successTips(res.data.msg);
        } else {
          this.errorTips(res.data.msg);
        }
      });
    },

    // 购买定期
    BuyFund(item) {
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        return;
      }

      if (item.priceInput == "") {
        this.errorTips('请输入金额');
        return;
      }

      if (item.priceInput < parseFloat(item.min_money)) {
        this.errorTips('基金购买金额不得小于基金最小购入金额');
        return;
      }

      if (item.priceInput > parseFloat(item.max_money)) {
        this.errorTips('基金购买金额不得大于基金最大购入金额');
        return;
      }

      if (!this.isConfirm) {
        this.buyItem = item;
        this.purchaseConfirmationDialogVisible = true;
        return;
      }

      this.fundType = 3;
      this.req();

    },

    // 提交定期
    async postBuyFund(item) {
      this.$store.commit("$vuexSetLoadingState", {buyfund:true});
      const data = {
        fund_id: item.id,
        price: item.priceInput
      }
      await savings_funds_fund_apply_api(data).then(res => {
        this.$store.commit("$vuexSetLoadingState", {buyfund:false});
        this.isConfirm = false;
        this.purchaseConfirmationDialogVisible = false;
        if (res && res.data.code == 1) {
          this.reduceUserBalance(item.priceInput);
          for (let i in this.fundList) {
            if (this.fundList[i].id == item.id) {
              this.fundList[i].income = "";
              this.fundList[i].priceInput = "";
              break;
            }
          }
          this.successTips(res.data.msg);
        } else {
          this.errorTips(res.data.msg);
        }
      });
    },
    async getUserFundBox() {
      await savings_funds_get_my_fund_api({ type: 1 }).then(res => {
        if (res && res.data.code == 1) {
          this.userFund = res.data.data;
        }
      });
    },
    async getSavingsFundsLists() {
      let parma = {
        fund_type: 2,
        type: "all"
      };
      await savings_funds_lists_api(parma).then(res => {
        if (res && res.data.code == 1) {
          let arr = res.data.data;
          for (let i in arr) {
            arr[i].income = "";
            arr[i].priceInput = "";
          }
          this.fundList = arr;
        }
      });
    }
  },
  mounted() {
    this.getUserFundBox();
    this.getSavingsFundsLists();
  }
};
</script>
<style scoped>
.all-boxes__title {
  text-transform: capitalize;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  margin-top: 32px;
}
@media (max-width:768px) {
  .all-boxes__title {
    margin-top: var(--padding);
  }
}
.all-boxes__free-box-load {
  position: relative;
  height: 160px;
  margin-bottom: 40px;
}

.free-box {
  position: relative;
  height: 160px;
  border-radius: 14px;
  padding: 24px 32px 32px;
  margin-bottom: 40px;
}

@media (max-width: 1000px) {
  .free-box {
    height: 208px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box {
    height: 208px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box {
    height: 208px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box {
    height: 208px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box {
    height: 208px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box {
    height: 208px;
  }
}

@media (max-width: 767px) {
  .free-box {
    height: 425px;
    padding: 24px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box {
    height: 425px;
    padding: 24px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box {
    height: 425px;
    padding: 24px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box {
    height: 425px;
    padding: 24px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box {
    height: 425px;
    padding: 24px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box {
    height: 425px;
    padding: 24px;
  }
}


.free-box__ball-pink {
  position: absolute;
  left: -30px;
  top: 10px;
  z-index: 1;
}

@media (max-width: 1000px) {
  .free-box__ball-pink {
    top: auto;
    bottom: 0;
    left: 200px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__ball-pink {
    top: auto;
    bottom: 0;
    left: 200px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__ball-pink {
    top: auto;
    bottom: 0;
    left: 200px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__ball-pink {
    top: auto;
    bottom: 0;
    left: 200px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__ball-pink {
    top: auto;
    bottom: 0;
    left: 200px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__ball-pink {
    top: auto;
    bottom: 0;
    left: 200px;
  }
}

@media (max-width: 767px) {
  .free-box__ball-pink {
    bottom: 180px;
    left: auto;
    right: -5px;
    transform: rotate(30deg);
    z-index: 4;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__ball-pink {
    bottom: 180px;
    left: auto;
    right: -5px;
    transform: rotate(30deg);
    z-index: 4;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__ball-pink {
    bottom: 180px;
    left: auto;
    right: -5px;
    transform: rotate(30deg);
    z-index: 4;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__ball-pink {
    bottom: 180px;
    left: auto;
    right: -5px;
    transform: rotate(30deg);
    z-index: 4;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__ball-pink {
    bottom: 180px;
    left: auto;
    right: -5px;
    transform: rotate(30deg);
    z-index: 4;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__ball-pink {
    bottom: 180px;
    left: auto;
    right: -5px;
    transform: rotate(30deg);
    z-index: 4;
  }
}

.free-box__ball-blue {
  position: absolute;
  top: 55px;
  left: -35px;
}

@media (max-width: 1000px) {
  .free-box__ball-blue {
    top: auto;
    bottom: 10px;
    left: 160px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__ball-blue {
    top: auto;
    bottom: 10px;
    left: 160px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__ball-blue {
    top: auto;
    bottom: 10px;
    left: 160px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__ball-blue {
    top: auto;
    bottom: 10px;
    left: 160px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__ball-blue {
    top: auto;
    bottom: 10px;
    left: 160px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__ball-blue {
    top: auto;
    bottom: 10px;
    left: 160px;
  }
}

@media (max-width: 767px) {
  .free-box__ball-blue {
    bottom: 215px;
    left: auto;
    right: 35px;
    transform: rotate(18deg);
    z-index: 3;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__ball-blue {
    bottom: 215px;
    left: auto;
    right: 35px;
    transform: rotate(18deg);
    z-index: 3;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__ball-blue {
    bottom: 215px;
    left: auto;
    right: 35px;
    transform: rotate(18deg);
    z-index: 3;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__ball-blue {
    bottom: 215px;
    left: auto;
    right: 35px;
    transform: rotate(18deg);
    z-index: 3;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__ball-blue {
    bottom: 215px;
    left: auto;
    right: 35px;
    transform: rotate(18deg);
    z-index: 3;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__ball-blue {
    bottom: 215px;
    left: auto;
    right: 35px;
    transform: rotate(18deg);
    z-index: 3;
  }
}

.free-box__ball-trans {
  position: absolute;
  top: 105px;
  left: -25px;
}

@media (max-width: 1000px) {
  .free-box__ball-trans {
    top: 55px;
    left: 220px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__ball-trans {
    top: 55px;
    left: 220px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__ball-trans {
    top: 55px;
    left: 220px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__ball-trans {
    top: 55px;
    left: 220px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__ball-trans {
    top: 55px;
    left: 220px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__ball-trans {
    top: 55px;
    left: 220px;
  }
}

@media (max-width: 767px) {
  .free-box__ball-trans {
    top: auto;
    bottom: 150px;
    left: auto;
    right: 35px;
    transform: rotate(-100deg);
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__ball-trans {
    top: auto;
    bottom: 150px;
    left: auto;
    right: 35px;
    transform: rotate(-100deg);
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__ball-trans {
    top: auto;
    bottom: 150px;
    left: auto;
    right: 35px;
    transform: rotate(-100deg);
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__ball-trans {
    top: auto;
    bottom: 150px;
    left: auto;
    right: 35px;
    transform: rotate(-100deg);
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__ball-trans {
    top: auto;
    bottom: 150px;
    left: auto;
    right: 35px;
    transform: rotate(-100deg);
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__ball-trans {
    top: auto;
    bottom: 150px;
    left: auto;
    right: 35px;
    transform: rotate(-100deg);
  }
}

.free-box__new-label {
  position: absolute;
  top: -3px;
  right: -7px;
  width: 80px;
  height: 60px;
  background: url(../../../assets/images/new-label.abce381.png) no-repeat;
  background-size: contain;
}

.free-box__level-label {
  width: 95px;
  background: url(../../../assets/images/level-label.b339381.png) no-repeat;
  background-size: contain;
  padding: 0 5px;
}

.free-box__green-label,
.free-box__level-label {
  position: absolute;
  top: 0;
  left: 0;
  height: 23px;
  font-weight: 700;
  display: flex;
  text-transform: uppercase;
  align-items: center;
  font-size: 10px;
  line-height: 16px;
}

.free-box__green-label {
  width: 90px;
  background: url(../../../assets/images/green-label.a1211ee.png) no-repeat;
  background-size: contain;
  font-style: italic;
  padding: 0 7px 3px;
}

.free-box__racoon {
  position: absolute;
  width: 191px;
  height: 185px;
  bottom: 0;
  left: 30%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 2;
}

@media (max-width: 1000px) {
  .free-box__racoon {
    left: 35%;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__racoon {
    left: 35%;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__racoon {
    left: 35%;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__racoon {
    left: 35%;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__racoon {
    left: 35%;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__racoon {
    left: 35%;
  }
}

@media (max-width: 767px) {
  .free-box__racoon {
    left: auto;
    bottom: auto;
    top: -20px;
    right: 0;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__racoon {
    left: auto;
    bottom: auto;
    top: -20px;
    right: 0;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__racoon {
    left: auto;
    bottom: auto;
    top: -20px;
    right: 0;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__racoon {
    left: auto;
    bottom: auto;
    top: -20px;
    right: 0;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__racoon {
    left: auto;
    bottom: auto;
    top: -20px;
    right: 0;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__racoon {
    left: auto;
    bottom: auto;
    top: -20px;
    right: 0;
  }
}

.free-box__boost-label {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAA8CAMAAACac46aAAAAOVBMVEVMaXFlUBH/2nn61HC5kyLTphn/23oEBAQAAAAEAwL/uQL/3T/+1TH/xhr/zCb/wQ/nvCX/1mr8zEuek/pRAAAACnRSTlMAYI7Qndo+D0MoVUUTlwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAuBJREFUWIXlltmyqyAQRTWiLYb5/z/2FpPMionmPNytpciQ1btpUw6D0/JalmUZfq6XdJqm6fXSQfyYG2uP4cEgJimlUoypXUUQj8SwKCkVo5xTI2bUCuLGRAAoqRjfdnGtKIinEgEwKUW3qngIIouhSMTralUCAGqC8yBoRyJ6NwN6wVkQ9NvNAIDxMvjTRCxRBACAVVJcX8VwUpXTkoCne8A9MaAEfH2TPwyC0l+CEyH4MzAEMr6rujo0puD7q6slDH+Ta4FhJ/8UPFfA/C/Ao6su/vC5oQjsy5pyN5iJc9/rQquM7MPxPXnkerYFF38hvKGt0qo+b2fd2zZWwNpytszE2auOqdshuOncjYTxcmZ7LdeDydu0V5di9GFxHhe1ry79oUkp96e/2RW1M/xe6NlHoinxggIMeJKKBMtPmUclGGlwQ+5Tm3WO03ANF60GWBJGG0dzwA1Xnw3RnsyNGHD6wYdHKYmxbH0X10b38fRwZ6ZBk7fJVZeUihAzXl7TJqlNqU4Pd2I607fJplpX15s8KlaA/SZrMDO2nznE3AI/a5kJ1AQb9Ju83/piWvlhes0tntCYnBxElGBX1kqTDb1ovNMecjqv6CZEiLyo/Z+mjHz5Rmk5nlAuyPMTMiLEjCvgPdd3ybg1cVoJa7gCHtWNYG0xktBCax2MlVLf4lKeYEJYphZacQk2m4yUIh+Zc/toYURoXqF5XA14qIDXWemX5CJWkAbKE+d5RmhcLbcCBryOsxBd5ANnHoa0xlEDvZpgS26ge5xVYGfcwebakoXwr6BmHeDmU1iMxVWus7yOqO0ph52xUiyGOthYxutu+lIWj3hO0OZayxqNtK3PYBEqp0KVG5J9WbiOg1xDS9YzvsOaFe7CDqdkXIflxkKH+UEYDpkJOWLXfWWw9HGwx0WBR3dkce8xq66zEu0/XMti9KwnWmPf8SK1YW7PvvV2oGzHbvV1Jg36GWz4H/QPPWDpeT1nEEsAAAAASUVORK5CYII=)
    no-repeat;
  background-size: contain;
  width: 110px;
  height: 50px;
  padding: 6px 4px 0 12px;
  z-index: 3;
  color: #282828;
  font-weight: 900;
  display: flex;
  align-items: flex-start;
  font-family: Montserrat;
  font-style: italic;
}

@media (max-width: 767px) {
  .free-box__boost-label {
    bottom: -15px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__boost-label {
    bottom: -15px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__boost-label {
    bottom: -15px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__boost-label {
    bottom: -15px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__boost-label {
    bottom: -15px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__boost-label {
    bottom: -15px;
  }
}

.free-box__boost-char {
  font-weight: 900;
  font-size: 24px;
  line-height: 20px;
  margin-right: -2px;
}

.free-box__boost-value {
  font-weight: 900;
  font-size: 30px;
  line-height: 30px;
}

.free-box__boost-text {
  font-weight: 900;
  font-size: 14px;
  line-height: 30px;
  margin-left: 2px;
}

.free-box__coins-block {
  overflow: hidden;
  position: absolute;
  width: 100%;
  right: 20px;
  top: 25px;
  bottom: 15px;
}

.free-box__anim-coin {
  width: 20px;
  position: absolute;
  -webkit-animation: splash-data-v-7281dc89 0.7s linear infinite;
  animation: splash-data-v-7281dc89 0.7s linear infinite;
  visibility: hidden;
}

.free-box__bgs-coins {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(2%) translateX(0);
}

.free-box .free-box__bgs-coin1 {
  background: none;
}

.free-box .free-box__bgs-coin2 {
  background-position: -3630px 180px;
}

.free-box .free-box__bgs-coin3 {
  background-position: -3439px 180px;
}

.free-box .free-box__bgs-coin4 {
  background-position: -3248px 180px;
}

.free-box .free-box__bgs-coin5 {
  background-position: -3057px 180px;
}

.free-box .free-box__bgs-coin6 {
  background-position: -2866px 180px;
}

.free-box .free-box__bgs-coin7 {
  background-position: -2675px 180px;
}

.free-box .free-box__bgs-coin8 {
  background-position: -2484px 180px;
}

.free-box .free-box__bgs-coin9 {
  background-position: -2293px 180px;
}

.free-box .free-box__bgs-coin10 {
  background-position: -2102px 180px;
}

.free-box .free-box__bgs-coin11 {
  background-position: -1911px 180px;
}

.free-box__image,
.free-box__image-hand {
  position: absolute;
  width: 100%;
  height: 100%;
}

.free-box__image-hand {
  z-index: 2;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.free-box__bnb {
  background: radial-gradient(
    50.44% 1903.19% at 38.32%,
    at 93.75%,
    #e8ac14 0,
    #895d09 100%
  );
  background: radial-gradient(
    50.44% 1903.19% at 38.32% 93.75%,
    #e8ac14 0,
    #895d09 100%
  );
}

@media (max-width: 1000px) {
  .free-box__bnb {
    background: radial-gradient(
      58.16% 1548.63% at 46.74%,
      at 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
    background: radial-gradient(
      58.16% 1548.63% at 46.74% 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__bnb {
    background: radial-gradient(
      58.16% 1548.63% at 46.74%,
      at 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
    background: radial-gradient(
      58.16% 1548.63% at 46.74% 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__bnb {
    background: radial-gradient(
      58.16% 1548.63% at 46.74%,
      at 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
    background: radial-gradient(
      58.16% 1548.63% at 46.74% 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__bnb {
    background: radial-gradient(
      58.16% 1548.63% at 46.74%,
      at 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
    background: radial-gradient(
      58.16% 1548.63% at 46.74% 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__bnb {
    background: radial-gradient(
      58.16% 1548.63% at 46.74%,
      at 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
    background: radial-gradient(
      58.16% 1548.63% at 46.74% 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__bnb {
    background: radial-gradient(
      58.16% 1548.63% at 46.74%,
      at 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
    background: radial-gradient(
      58.16% 1548.63% at 46.74% 61.56%,
      #e8ac14 0,
      #895d09 100%
    );
  }
}

@media (max-width: 576px) {
  .free-box__bnb {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
  }
}

@media (max-width: 808px) {
  .opened-left-panel .free-box__bnb {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
  }
}

@media (max-width: 901px) {
  .opened-right-panel .free-box__bnb {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .free-box__bnb {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .free-box__bnb {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .free-box__bnb {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #ebbe34 0,
      #a3730c 100%
    );
  }
}

.free-box__btc {
  background: radial-gradient(
    50.44% 1903.19% at 38.32%,
    at 93.75%,
    #764ced 0,
    #063a7d 100%
  );
  background: radial-gradient(
    50.44% 1903.19% at 38.32% 93.75%,
    #764ced 0,
    #063a7d 100%
  );
}

@media (max-width: 1000px) {
  .free-box__btc {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__btc {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__btc {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__btc {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__btc {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__btc {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 767px) {
  .free-box__btc {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__btc {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__btc {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__btc {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__btc {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__btc {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

.free-box__bfg {
  background: radial-gradient(
    23.11% 149.06% at 38.32%,
    at 54.69%,
    #ff8a00 0,
    #9f1b1b 100%
  );
  background: radial-gradient(
    23.11% 149.06% at 38.32% 54.69%,
    #ff8a00 0,
    #9f1b1b 100%
  );
}

@media (max-width: 1000px) {
  .free-box__bfg {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__bfg {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__bfg {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__bfg {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__bfg {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__bfg {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 767px) {
  .free-box__bfg {
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__bfg {
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__bfg {
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__bfg {
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__bfg {
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__bfg {
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff8a00 0,
      #9f1b1b 100%
    );
  }
}

.free-box__bfg.free-box__bfg--black-friday {
  background: radial-gradient(
    34.69% 279.37% at 37.69%,
    at 100%,
    #6a0000 0,
    #290000 46.23%,
    #000 100%
  );
  background: radial-gradient(
    34.69% 279.37% at 37.69% 100%,
    #6a0000 0,
    #290000 46.23%,
    #000 100%
  );
}

@media (max-width: 1000px) {
  .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      34.53% 278.12% at 45.83%,
      at 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      34.53% 278.12% at 45.83% 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      34.53% 278.12% at 45.83%,
      at 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      34.53% 278.12% at 45.83% 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      34.53% 278.12% at 45.83%,
      at 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      34.53% 278.12% at 45.83% 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      34.53% 278.12% at 45.83%,
      at 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      34.53% 278.12% at 45.83% 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel
    .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      34.53% 278.12% at 45.83%,
      at 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      34.53% 278.12% at 45.83% 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel
    .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      34.53% 278.12% at 45.83%,
      at 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      34.53% 278.12% at 45.83% 100%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 767px) {
  .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      90.09% 69.53% at 100%,
      at 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      90.09% 69.53% at 100% 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      90.09% 69.53% at 100%,
      at 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      90.09% 69.53% at 100% 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      90.09% 69.53% at 100%,
      at 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      90.09% 69.53% at 100% 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      90.09% 69.53% at 100%,
      at 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      90.09% 69.53% at 100% 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel
    .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      90.09% 69.53% at 100%,
      at 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      90.09% 69.53% at 100% 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel
    .free-box__bfg.free-box__bfg--black-friday {
    background: radial-gradient(
      90.09% 69.53% at 100%,
      at 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
    background: radial-gradient(
      90.09% 69.53% at 100% 8.47%,
      #6a0000 0,
      #290000 46.23%,
      #000 100%
    );
  }
}

.free-box__baby {
  padding: 16px 32px 18px;
  background: radial-gradient(
    31.55% 203.52% at 34.93%,
    at 54.69%,
    #ffbb54 0,
    #dc7700 100%
  );
  background: radial-gradient(
    31.55% 203.52% at 34.93% 54.69%,
    #ffbb54 0,
    #dc7700 100%
  );
}

@media (max-width: 1000px) {
  .free-box__baby {
    background: radial-gradient(
      31.55% 203.52% at 34.93%,
      at 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      31.55% 203.52% at 34.93% 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__baby {
    background: radial-gradient(
      31.55% 203.52% at 34.93%,
      at 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      31.55% 203.52% at 34.93% 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__baby {
    background: radial-gradient(
      31.55% 203.52% at 34.93%,
      at 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      31.55% 203.52% at 34.93% 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__baby {
    background: radial-gradient(
      31.55% 203.52% at 34.93%,
      at 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      31.55% 203.52% at 34.93% 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__baby {
    background: radial-gradient(
      31.55% 203.52% at 34.93%,
      at 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      31.55% 203.52% at 34.93% 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__baby {
    background: radial-gradient(
      31.55% 203.52% at 34.93%,
      at 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      31.55% 203.52% at 34.93% 54.69%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 767px) {
  .free-box__baby {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__baby {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__baby {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__baby {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__baby {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__baby {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ffbb54 0,
      #dc7700 100%
    );
  }
}

.free-box__bsw {
  padding: 16px 32px 18px;
  background: radial-gradient(
    23.11% 149.06% at 38.32%,
    at 54.69%,
    #ff000f 0,
    #0048d2 100%
  );
  background: radial-gradient(
    23.11% 149.06% at 38.32% 54.69%,
    #ff000f 0,
    #0048d2 100%
  );
}

@media (max-width: 1000px) {
  .free-box__bsw {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__bsw {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__bsw {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__bsw {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__bsw {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__bsw {
    background: radial-gradient(
      25.14% 87.02% at 44.44%,
      at 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      25.14% 87.02% at 44.44% 54.69%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 767px) {
  .free-box__bsw {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__bsw {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__bsw {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__bsw {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__bsw {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__bsw {
    padding: 40px 24px 24px;
    height: 465px;
    background: radial-gradient(
      83.99% 64.82% at 80.18%,
      at 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
    background: radial-gradient(
      83.99% 64.82% at 80.18% 10.12%,
      #ff000f 0,
      #0048d2 100%
    );
  }
}

.free-box__funfury {
  background: radial-gradient(
    50.44% 1903.19% at 38.32%,
    at 93.75%,
    #0075ff 0,
    #003573 100%
  );
  background: radial-gradient(
    50.44% 1903.19% at 38.32% 93.75%,
    #0075ff 0,
    #003573 100%
  );
}

@media (max-width: 1000px) {
  .free-box__funfury {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__funfury {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__funfury {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__funfury {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__funfury {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__funfury {
    background: radial-gradient(
      50.44% 1903.19% at 38.32%,
      at 93.75%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      50.44% 1903.19% at 38.32% 93.75%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 767px) {
  .free-box__funfury {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__funfury {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__funfury {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__funfury {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__funfury {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__funfury {
    background: radial-gradient(
      70.88% 55.62% at 50%,
      at 6.7%,
      #764ced 0,
      #063a7d 100%
    );
    background: radial-gradient(
      70.88% 55.62% at 50% 6.7%,
      #764ced 0,
      #063a7d 100%
    );
  }
}

.free-box__win {
  padding: 24px 32px 32px;
  background: radial-gradient(
    92.73% 598.13% at 36.92%,
    at 82.81%,
    #418dff 0,
    #112a56 15.3%,
    #091228 22.69%,
    #03000e 33.68%,
    #000 67.64%
  );
  background: radial-gradient(
    92.73% 598.13% at 36.92% 82.81%,
    #418dff 0,
    #112a56 15.3%,
    #091228 22.69%,
    #03000e 33.68%,
    #000 67.64%
  );
}

@media (max-width: 1000px) {
  .free-box__win {
    background: radial-gradient(
      147.27% 317.07% at 48.75%,
      at 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      147.27% 317.07% at 48.75% 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__win {
    background: radial-gradient(
      147.27% 317.07% at 48.75%,
      at 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      147.27% 317.07% at 48.75% 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__win {
    background: radial-gradient(
      147.27% 317.07% at 48.75%,
      at 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      147.27% 317.07% at 48.75% 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__win {
    background: radial-gradient(
      147.27% 317.07% at 48.75%,
      at 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      147.27% 317.07% at 48.75% 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__win {
    background: radial-gradient(
      147.27% 317.07% at 48.75%,
      at 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      147.27% 317.07% at 48.75% 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__win {
    background: radial-gradient(
      147.27% 317.07% at 48.75%,
      at 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      147.27% 317.07% at 48.75% 105.53%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 767px) {
  .free-box__win {
    background: radial-gradient(
      219.44% 159.16% at 101.37%,
      at -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      219.44% 159.16% at 101.37% -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__win {
    background: radial-gradient(
      219.44% 159.16% at 101.37%,
      at -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      219.44% 159.16% at 101.37% -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__win {
    background: radial-gradient(
      219.44% 159.16% at 101.37%,
      at -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      219.44% 159.16% at 101.37% -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__win {
    background: radial-gradient(
      219.44% 159.16% at 101.37%,
      at -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      219.44% 159.16% at 101.37% -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__win {
    background: radial-gradient(
      219.44% 159.16% at 101.37%,
      at -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      219.44% 159.16% at 101.37% -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__win {
    background: radial-gradient(
      219.44% 159.16% at 101.37%,
      at -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
    background: radial-gradient(
      219.44% 159.16% at 101.37% -3.06%,
      #418dff 0,
      #112a56 15.3%,
      #091228 22.69%,
      #03000e 33.68%,
      #000 67.64%
    );
  }
}

.free-box__alu {
  padding: 24px 32px 32px;
  background: radial-gradient(
    92.25% 595% at 37.4%,
    at 75.31%,
    #833b40 0,
    #752944 9.87%,
    #4a0f3d 14.72%,
    #0c000e 30.57%,
    #020003 56.77%,
    #000 100%
  );
  background: radial-gradient(
    92.25% 595% at 37.4% 75.31%,
    #833b40 1.16%,
    #752944 9.87%,
    #4a0f3d 14.72%,
    #0c000e 30.57%,
    #020003 56.77%,
    #000 100%
  );
}

@media (max-width: 1000px) {
  .free-box__alu {
    background: radial-gradient(
      134.66% 412.74% at 47.01%,
      at 110.82%,
      #833b40 0,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      134.66% 412.74% at 47.01% 110.82%,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__alu {
    background: radial-gradient(
      134.66% 412.74% at 47.01%,
      at 110.82%,
      #833b40 0,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      134.66% 412.74% at 47.01% 110.82%,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__alu {
    background: radial-gradient(
      134.66% 412.74% at 47.01%,
      at 110.82%,
      #833b40 0,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      134.66% 412.74% at 47.01% 110.82%,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__alu {
    background: radial-gradient(
      134.66% 412.74% at 47.01%,
      at 110.82%,
      #833b40 0,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      134.66% 412.74% at 47.01% 110.82%,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__alu {
    background: radial-gradient(
      134.66% 412.74% at 47.01%,
      at 110.82%,
      #833b40 0,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      134.66% 412.74% at 47.01% 110.82%,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__alu {
    background: radial-gradient(
      134.66% 412.74% at 47.01%,
      at 110.82%,
      #833b40 0,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      134.66% 412.74% at 47.01% 110.82%,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 767px) {
  .free-box__alu {
    background: radial-gradient(
      237.2% 212.35% at 105.03%,
      at 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      237.2% 212.35% at 105.03% 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__alu {
    background: radial-gradient(
      237.2% 212.35% at 105.03%,
      at 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      237.2% 212.35% at 105.03% 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__alu {
    background: radial-gradient(
      237.2% 212.35% at 105.03%,
      at 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      237.2% 212.35% at 105.03% 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__alu {
    background: radial-gradient(
      237.2% 212.35% at 105.03%,
      at 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      237.2% 212.35% at 105.03% 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__alu {
    background: radial-gradient(
      237.2% 212.35% at 105.03%,
      at 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      237.2% 212.35% at 105.03% 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__alu {
    background: radial-gradient(
      237.2% 212.35% at 105.03%,
      at 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
    background: radial-gradient(
      237.2% 212.35% at 105.03% 0,
      #833b40 1.16%,
      #752944 9.87%,
      #4a0f3d 14.72%,
      #0c000e 30.57%,
      #020003 56.77%,
      #000 100%
    );
  }
}

.free-box__wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;
}

@media (max-width: 767px) {
  .free-box__wrapper {
    display: block;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__wrapper {
    display: block;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__wrapper {
    display: block;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__wrapper {
    display: block;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__wrapper {
    display: block;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__wrapper {
    display: block;
  }
}

.free-box__info {
  height: 100%;
  max-width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.free-box__info:nth-child(2) {
  justify-content: center;
}

@media (max-width: 1000px) {
  .free-box__info {
    max-width: 35%;
    justify-content: normal;
    grid-gap: 25px;
    gap: 25px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__info {
    max-width: 35%;
    justify-content: normal;
    grid-gap: 25px;
    gap: 25px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__info {
    max-width: 35%;
    justify-content: normal;
    grid-gap: 25px;
    gap: 25px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__info {
    max-width: 35%;
    justify-content: normal;
    grid-gap: 25px;
    gap: 25px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__info {
    max-width: 35%;
    justify-content: normal;
    grid-gap: 25px;
    gap: 25px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__info {
    max-width: 35%;
    justify-content: normal;
    grid-gap: 25px;
    gap: 25px;
  }
}

@media (max-width: 767px) {
  .free-box__info {
    grid-gap: 10px;
    gap: 10px;
    max-width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__info {
    grid-gap: 10px;
    gap: 10px;
    max-width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__info {
    grid-gap: 10px;
    gap: 10px;
    max-width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__info {
    grid-gap: 10px;
    gap: 10px;
    max-width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__info {
    grid-gap: 10px;
    gap: 10px;
    max-width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__info {
    grid-gap: 10px;
    gap: 10px;
    max-width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: space-between;
  }
}

.free-box__link {
  order: 1;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 125%;
  letter-spacing: -0.02em;
  color: hsla(0, 0%, 100%, 0.8);
}

.free-box__link:hover {
  color: #fff;
}

@media (max-width: 1000px) {
  .free-box__link {
    order: 3;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__link {
    order: 3;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__link {
    order: 3;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__link {
    order: 3;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__link {
    order: 3;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__link {
    order: 3;
  }
}

@media (max-width: 767px) {
  .free-box__link {
    order: 2;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__link {
    order: 2;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__link {
    order: 2;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__link {
    order: 2;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__link {
    order: 2;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__link {
    order: 2;
  }
}

.free-box__title {
  position: relative;
  order: 2;
  align-items: center;
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  margin: 0;
}

@media (max-width: 1000px) {
  .free-box__title {
    font-size: 29px;
    order: 1;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__title {
    font-size: 29px;
    order: 1;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__title {
    font-size: 29px;
    order: 1;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__title {
    font-size: 29px;
    order: 1;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__title {
    font-size: 29px;
    order: 1;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__title {
    font-size: 29px;
    order: 1;
  }
}

@media (max-width: 767px) {
  .free-box__title {
    z-index: 2;
    margin-bottom: 65px;
    max-width: 169px;
    font-size: 25px;
    line-height: 29px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__title {
    z-index: 2;
    margin-bottom: 65px;
    max-width: 169px;
    font-size: 25px;
    line-height: 29px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__title {
    z-index: 2;
    margin-bottom: 65px;
    max-width: 169px;
    font-size: 25px;
    line-height: 29px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__title {
    z-index: 2;
    margin-bottom: 65px;
    max-width: 169px;
    font-size: 25px;
    line-height: 29px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__title {
    z-index: 2;
    margin-bottom: 65px;
    max-width: 169px;
    font-size: 25px;
    line-height: 29px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__title {
    z-index: 2;
    margin-bottom: 65px;
    max-width: 169px;
    font-size: 25px;
    line-height: 29px;
  }
}

.free-box__box-type {
  text-transform: uppercase;
}

.free-box__currency-ico {
  width: 48px;
  height: 48px;
  margin-right: 12px;
  position: relative;
}

.free-box__profit-title {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
  opacity: 0.5;
}

.free-box__profit-currency,
.free-box__profit-sum .font-digits {
  font-size: 18px;
  line-height: 24px;
}

.free-box__profit-currency {
  font-weight: 500;
  opacity: 0.7;
  text-transform: uppercase;
  margin-left: 5px;
}

.free-box__sum-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 435px;
  max-width: 100%;
}

@media (max-width: 767px) {
  .free-box__sum-block {
    width: 100%;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__sum-block {
    width: 100%;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__sum-block {
    width: 100%;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__sum-block {
    width: 100%;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__sum-block {
    width: 100%;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__sum-block {
    width: 100%;
  }
}

.free-box__withdraw-sum {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
}

@media (max-width: 1000px) {
  .free-box__withdraw-sum {
    font-size: 20px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__withdraw-sum {
    font-size: 20px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__withdraw-sum {
    font-size: 20px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__withdraw-sum {
    font-size: 20px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__withdraw-sum {
    font-size: 20px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__withdraw-sum {
    font-size: 20px;
  }
}

@media (max-width: 767px) {
  .free-box__withdraw-sum {
    font-size: 24px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__withdraw-sum {
    font-size: 24px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__withdraw-sum {
    font-size: 24px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__withdraw-sum {
    font-size: 24px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__withdraw-sum {
    font-size: 24px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__withdraw-sum {
    font-size: 24px;
  }
}

.free-box__withdraw-currency {
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  opacity: 0.7;
  margin-left: 5px;
  white-space: nowrap;
}

@media (max-width: 1000px) {
  .free-box__withdraw-currency {
    font-size: 18px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__withdraw-currency {
    font-size: 18px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__withdraw-currency {
    font-size: 18px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__withdraw-currency {
    font-size: 18px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__withdraw-currency {
    font-size: 18px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__withdraw-currency {
    font-size: 18px;
  }
}

@media (max-width: 767px) {
  .free-box__withdraw-currency {
    font-size: 24px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__withdraw-currency {
    font-size: 24px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__withdraw-currency {
    font-size: 24px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__withdraw-currency {
    font-size: 24px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__withdraw-currency {
    font-size: 24px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__withdraw-currency {
    font-size: 24px;
  }
}

.free-box__profit {
  display: flex;
  align-items: center;
}

@media (max-width: 767px) {
  .free-box__profit {
    margin-top: 26px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__profit {
    margin-top: 26px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__profit {
    margin-top: 26px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__profit {
    margin-top: 26px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__profit {
    margin-top: 26px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__profit {
    margin-top: 26px;
  }
}

.free-box__profit--first {
  order: 3;
}

@media (max-width: 1000px) {
  .free-box__profit--first {
    order: 2;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__profit--first {
    order: 2;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__profit--first {
    order: 2;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__profit--first {
    order: 2;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__profit--first {
    order: 2;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__profit--first {
    order: 2;
  }
}

@media (max-width: 767px) {
  .free-box__profit--first {
    margin-top: 0;
    order: 3;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .free-box__profit--first {
    margin-top: 0;
    order: 3;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .free-box__profit--first {
    margin-top: 0;
    order: 3;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .free-box__profit--first {
    margin-top: 0;
    order: 3;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .free-box__profit--first {
    margin-top: 0;
    order: 3;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .free-box__profit--first {
    margin-top: 0;
    order: 3;
  }
}

.free-box__button {
  min-width: 135px;
}

@media (max-width: 1000px) {
  .free-box__button {
    width: 100%;
    order: 3;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__button {
    width: 100%;
    order: 3;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__button {
    width: 100%;
    order: 3;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__button {
    width: 100%;
    order: 3;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__button {
    width: 100%;
    order: 3;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__button {
    width: 100%;
    order: 3;
  }
}

.free-box__progress {
  width: 100%;
  height: 28px;
  margin: 20px 0;
}

.free-box__progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.free-box__progress-label {
  opacity: 0.5;
}

.free-box__progress-label,
.free-box__remaining {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
}

@media (max-width: 1000px) {
  .free-box__remaining {
    display: none;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .free-box__remaining {
    display: none;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .free-box__remaining {
    display: none;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .free-box__remaining {
    display: none;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .free-box__remaining {
    display: none;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .free-box__remaining {
    display: none;
  }
}

.free-box__current-sum {
  letter-spacing: -0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
}

.free-box__need-sum {
  opacity: 0.5;
}

.free-box__progress-bar {
  line-height: 0;
}

@-webkit-keyframes splash-data-v-7281dc89 {
  0% {
    visibility: visible;
    top: -20px;
  }

  to {
    visibility: visible;
    top: 150px;
  }
}

@keyframes splash-data-v-7281dc89 {
  0% {
    visibility: visible;
    top: -20px;
  }

  to {
    visibility: visible;
    top: 150px;
  }
}

.free-box__alu .free-box__need-sum,
.free-box__alu .free-box__profit-currency,
.free-box__alu .free-box__profit-title,
.free-box__alu .free-box__progress-label,
.free-box__alu .free-box__withdraw-currency {
  color: #9fe5ff;
  opacity: 1;
}

.free-box__win .free-box__need-sum,
.free-box__win .free-box__profit-currency,
.free-box__win .free-box__profit-title,
.free-box__win .free-box__progress-label,
.free-box__win .free-box__withdraw-currency {
  color: #ffdc52;
  opacity: 1;
}

.box {
  min-height: 160px;
  display: flex;
  justify-content: space-between;
  border-radius: 14px;
  margin-bottom: 24px;
  padding: 20px 32px;
  transition: all 0.5s;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

@media (max-width: 1000px) {
  .box {
    height: 210px;
    display: block;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box {
    height: 210px;
    display: block;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box {
    height: 210px;
    display: block;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box {
    height: 210px;
    display: block;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box {
    height: 210px;
    display: block;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box {
    height: 210px;
    display: block;
  }
}

@media (max-width: 767px) {
  .box {
    height: 500px;
    padding: 41px 20px 20px;
    margin-bottom: var(--padding);
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box {
    height: 500px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box {
    height: 500px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box {
    height: 500px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box {
    height: 500px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box {
    height: 500px;
    padding: 41px 20px 20px;
  }
}

.box:last-child {
  margin-bottom: 0;
}

.box--open {
  height: 220px;
  transition: all 0.5s;
}

.box--open.box--my {
  height: 240px;
}

@media (max-width: 1000px) {
  .box--open.box--my {
    height: 300px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box--open.box--my {
    height: 300px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box--open.box--my {
    height: 300px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box--open.box--my {
    height: 300px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box--open.box--my {
    height: 300px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box--open.box--my {
    height: 300px;
  }
}

@media (max-width: 767px) {
  .box--open.box--my {
    height: 500px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box--open.box--my {
    height: 500px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box--open.box--my {
    height: 500px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box--open.box--my {
    height: 500px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box--open.box--my {
    height: 500px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box--open.box--my {
    height: 500px;
  }
}

@media (max-width: 1000px) {
  .box--open {
    height: 270px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box--open {
    height: 270px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box--open {
    height: 270px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box--open {
    height: 270px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box--open {
    height: 270px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box--open {
    height: 270px;
  }
}

@media (max-width: 767px) {
  .box--open {
    height: 490px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box--open {
    height: 490px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box--open {
    height: 490px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box--open {
    height: 490px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box--open {
    height: 490px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box--open {
    height: 490px;
  }
}

.box--my {
  height: 200px;
  padding: 25px 32px;
}

@media (max-width: 1000px) {
  .box--my {
    height: 250px;
    display: block;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box--my {
    height: 250px;
    display: block;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box--my {
    height: 250px;
    display: block;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box--my {
    height: 250px;
    display: block;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box--my {
    height: 250px;
    display: block;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box--my {
    height: 250px;
    display: block;
  }
}

@media (max-width: 767px) {
  .box--my {
    height: 450px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box--my {
    height: 450px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box--my {
    height: 450px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box--my {
    height: 450px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box--my {
    height: 450px;
    padding: 41px 20px 20px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box--my {
    height: 450px;
    padding: 41px 20px 20px;
  }
}

.box__gradient {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

@media (max-width: 1000px) {
  .box__gradient-lg {
    display: none;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box__gradient-lg {
    display: none;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box__gradient-lg {
    display: none;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box__gradient-lg {
    display: none;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box__gradient-lg {
    display: none;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box__gradient-lg {
    display: none;
  }
}

.box__gradient-md {
  display: none;
}

@media (max-width: 1000px) {
  .box__gradient-md {
    display: block;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box__gradient-md {
    display: block;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box__gradient-md {
    display: block;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box__gradient-md {
    display: block;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box__gradient-md {
    display: block;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box__gradient-md {
    display: block;
  }
}

@media (max-width: 767px) {
  .box__gradient-md {
    display: none;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__gradient-md {
    display: none;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__gradient-md {
    display: none;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__gradient-md {
    display: none;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__gradient-md {
    display: none;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__gradient-md {
    display: none;
  }
}

.box__gradient-sm {
  display: none;
}

@media (max-width: 767px) {
  .box__gradient-sm {
    display: block;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__gradient-sm {
    display: block;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__gradient-sm {
    display: block;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__gradient-sm {
    display: block;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__gradient-sm {
    display: block;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__gradient-sm {
    display: block;
  }
}

@media (max-width: 1000px) {
  .box__preview {
    display: flex;
    justify-content: space-between;
    padding-left: 160px;
    margin-bottom: 10px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box__preview {
    display: flex;
    justify-content: space-between;
    padding-left: 160px;
    margin-bottom: 10px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box__preview {
    display: flex;
    justify-content: space-between;
    padding-left: 160px;
    margin-bottom: 10px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box__preview {
    display: flex;
    justify-content: space-between;
    padding-left: 160px;
    margin-bottom: 10px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box__preview {
    display: flex;
    justify-content: space-between;
    padding-left: 160px;
    margin-bottom: 10px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box__preview {
    display: flex;
    justify-content: space-between;
    padding-left: 160px;
    margin-bottom: 10px;
  }
}

@media (max-width: 767px) {
  .box__preview {
    display: block;
    padding: 0;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__preview {
    display: block;
    padding: 0;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__preview {
    display: block;
    padding: 0;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__preview {
    display: block;
    padding: 0;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__preview {
    display: block;
    padding: 0;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__preview {
    display: block;
    padding: 0;
  }
}

.box__title {
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  margin: 0 0 10px;
  max-width: 275px;
  overflow: hidden;
}

.pc-margin {
  margin-bottom: 15px !important;
}

@media (max-width: 767px) {
  .box__title {
    margin-bottom: 35px;
    height: 72px;
    max-width: 200px;
    white-space: pre-wrap;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__title {
    margin-bottom: 35px;
    height: 72px;
    max-width: 200px;
    white-space: pre-wrap;
  }

  .pc-margin {
    margin-bottom: 0 !important;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__title {
    margin-bottom: 35px;
    height: 72px;
    max-width: 200px;
    white-space: pre-wrap;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__title {
    margin-bottom: 35px;
    height: 72px;
    max-width: 200px;
    white-space: pre-wrap;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__title {
    margin-bottom: 35px;
    height: 72px;
    max-width: 200px;
    white-space: pre-wrap;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__title {
    margin-bottom: 35px;
    height: 72px;
    max-width: 200px;
    white-space: pre-wrap;
  }
}

.box__price-block {
  display: flex;
  align-items: center;
}

@media (max-width: 767px) {
  .box__price-block {
    margin-bottom: 24px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__price-block {
    margin-bottom: 24px;
  }

  .moblie-margin {
    margin-bottom: 12px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__price-block {
    margin-bottom: 24px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__price-block {
    margin-bottom: 24px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__price-block {
    margin-bottom: 24px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__price-block {
    margin-bottom: 24px;
  }
}

.box__profit-block {
  display: flex;
  align-items: center;
}

.box__currency-ico {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 48px;
  height: 48px;
  margin-right: 12px;
}

.box__price-label,
.box__profit-label {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  opacity: 0.5;
  margin-bottom: 4px;
}

.box__profit-label {
  color: #93acd3;
}

.box__price .font-digits {
  font-size: 18px;
  line-height: 24px;
}

.box__profit .font-digits {
  font-size: 24px;
  line-height: 32px;
}

.box__price-currency {
  font-size: 18px;
  line-height: 24px;
}

.box__price-currency,
.box__profit-currency {
  font-weight: 600;
  opacity: 0.5;
  margin-left: 5px;
  text-transform: uppercase;
}

.box__profit-currency {
  font-size: 24px;
  line-height: 32px;
  color: #93acd3;
}

.box__actions {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-bottom: 16px;
  border-bottom: 1px solid #2a3546;
  flex-wrap: wrap;
}

@media (max-width: 1000px) {
  .box__actions {
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box__actions {
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box__actions {
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box__actions {
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box__actions {
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box__actions {
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
}

@media (max-width: 1000px) {
  .box--my .box__actions {
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box--my .box__actions {
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box--my .box__actions {
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box--my .box__actions {
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box--my .box__actions {
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box--my .box__actions {
    padding-bottom: 12px;
    margin-bottom: 12px;
  }
}

.box__progress-bar {
  width: 100%;
  line-height: 1;
  margin-top: 25px;
}

.box__progress-details {
  display: flex;
  justify-content: space-between;
}

.box__progress-label {
  font-weight: 600;
  color: #93acd3;
}

.box__progress-label,
.box__progress-value span {
  font-size: 12px;
  line-height: 16px;
}

.box__info {
  width: 500px;
}

@media (max-width: 1000px) {
  .box__info {
    padding-left: 160px;
    width: auto;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box__info {
    padding-left: 160px;
    width: auto;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box__info {
    padding-left: 160px;
    width: auto;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box__info {
    padding-left: 160px;
    width: auto;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box__info {
    padding-left: 160px;
    width: auto;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box__info {
    padding-left: 160px;
    width: auto;
  }
}

@media (max-width: 767px) {
  .box__info {
    padding: 0;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__info {
    padding: 0;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__info {
    padding: 0;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__info {
    padding: 0;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__info {
    padding: 0;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__info {
    padding: 0;
  }
}

.box__period-label {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #93acd3;
  margin: 0 0 8px;
}

.box__periods {
  display: flex;
  width: 180px;
}

.box__periods button:first-child {
  margin-right: 5px;
}

.box__period-block {
  flex: 1;
  margin-right: 10px;
}
.box__button-block {
  width: 20%;
}

@media (max-width: 767px) {
  .box__period-block {
    margin-right: 10px;
    margin-bottom: 20px;
    max-width: 60%;
  }
  .box__period-block:nth-child(2) {
    margin-right: 0px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__period-block {
    margin-right: 20px;
    max-width: 60%;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__period-block {
    margin-right: 20px;
    max-width: 60%;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__period-block {
    margin-right: 20px;
    max-width: 60%;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__period-block {
    margin-right: 20px;
    max-width: 60%;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__period-block {
    margin-right: 20px;
    max-width: 60%;
  }
}

.box__rate-block {
  margin-right: 20px;
}

.box__rate-block .input {
  width: 88px;
}

@media (max-width: 767px) {
  .box__rate-block {
    margin-right: 0;
    max-width: 36%;
  }

  .box__rate-block .input {
    width: 100%;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__rate-block {
    margin-right: 0;
    max-width: 36%;
  }

  .box__rate-block .input {
    width: 100%;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__rate-block {
    margin-right: 0;
    max-width: 36%;
  }

  .box__rate-block .input {
    width: 88px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__rate-block {
    margin-right: 0;
    max-width: 36%;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__rate-block {
    margin-right: 0;
    max-width: 36%;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__rate-block {
    margin-right: 0;
    max-width: 36%;
  }
}

.box__rate-label {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #93acd3;
  margin: 0 0 8px;
  max-width: 100px;
}

.box__rate {
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  padding: 5px 21px;
  border: 1px solid #2a3546;
  border-radius: 10px;
  white-space: nowrap;
  width: 95px;
  text-align: center;
}

@media (max-width: 767px) {
  .box__rate {
    width: 100px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__rate {
    width: 100px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__rate {
    width: 100px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__rate {
    width: 100px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__rate {
    width: 100px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__rate {
    width: 100px;
  }
}
.box__button-block {
  display: flex;
  align-items: flex-end;
  width: 175px;
}

.box__button-block span {
  text-transform: capitalize;
}

@media (max-width: 767px) {
  .box__button-block {
    max-width: 100%;
    width: 100%;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__button-block {
    max-width: 100%;
    width: 100%;
    margin-top: 25px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__button-block {
    max-width: 100%;
    width: 100%;
    margin-top: 25px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__button-block {
    max-width: 100%;
    width: 100%;
    margin-top: 25px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__button-block {
    max-width: 100%;
    width: 100%;
    margin-top: 25px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__button-block {
    max-width: 100%;
    width: 100%;
    margin-top: 25px;
  }
}

.box__detail {
  display: flex;
  justify-content: space-between;
}

.box__valid {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #55657e;
}

.box__valid-days {
  color: #fff;
}

.box__available {
  margin: 0;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
}

@media (max-width: 576px) {
  .box__available {
    font-size: 10px;
  }
}

@media (max-width: 808px) {
  .opened-left-panel .box__available {
    font-size: 10px;
  }
}

@media (max-width: 901px) {
  .opened-right-panel .box__available {
    font-size: 10px;
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .box__available {
    font-size: 10px;
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .box__available {
    font-size: 10px;
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .box__available {
    font-size: 10px;
  }
}

.box__total {
  color: #55657e;
}

.box__detail-button {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  padding: 0;
}

@media (max-width: 576px) {
  .box__detail-button {
    font-size: 10px;
  }
}

@media (max-width: 808px) {
  .opened-left-panel .box__detail-button {
    font-size: 10px;
  }
}

@media (max-width: 901px) {
  .opened-right-panel .box__detail-button {
    font-size: 10px;
  }
}

@media (max-width: 916px) {
  .opened-contests-panel .box__detail-button {
    font-size: 10px;
  }
}

@media (max-width: 1133px) {
  .opened-left-panel.opened-right-panel .box__detail-button {
    font-size: 10px;
  }
}

@media (max-width: 1148px) {
  .opened-left-panel.opened-contests-panel .box__detail-button {
    font-size: 10px;
  }
}

.box__icon-arrow {
  margin-left: 3px;
  transition: all 0.3s;
}

.box--open .box__icon-arrow {
  transform: rotate(180deg);
}

.box__detail-more {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 0;
}

.box__detail-more p {
  margin: 0 0 5px;
}

.box__detail-more p,
.box__issue-date span,
.box__max {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
}

.box__max {
  margin: 5px 0 0;
}

.box__detail-label {
  color: #55657e;
}

.box__detail-value {
  white-space: nowrap;
}

.box__box-view {
  position: absolute;
  height: 200px;
  width: 200px;
  left: 30%;
  top: -45px;
  z-index: 1;
  transform: translate(-25%);
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.box__box-view img {
  position: absolute;
  height: 100%;
  width: 100%;
}

.box__box-view img.box__toys {
  z-index: 1;
  bottom: -10px;
  left: 50%;
  transform: translate(-50%);
  max-width: 110px;
  height: auto;
}

@media (max-width: 1000px) {
  .box__box-view {
    left: 0;
    top: 0;
    transform: translateY(-15%);
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box__box-view {
    left: 0;
    top: 0;
    transform: translateY(-15%);
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box__box-view {
    left: 0;
    top: 0;
    transform: translateY(-15%);
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box__box-view {
    left: 0;
    top: 0;
    transform: translateY(-15%);
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box__box-view {
    left: 0;
    top: 0;
    transform: translateY(-15%);
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box__box-view {
    left: 0;
    top: 0;
    transform: translateY(-15%);
  }
}

@media (max-width: 767px) {
  .box__box-view {
    left: auto;
    right: 0;
    top: 0;
    transform: translate(15%, -25%);
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box__box-view {
    left: auto;
    right: 0;
    top: 0;
    transform: translate(15%, -25%);
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box__box-view {
    left: auto;
    right: 0;
    top: 0;
    transform: translate(15%, -25%);
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box__box-view {
    left: auto;
    right: 0;
    top: 0;
    transform: translate(15%, -25%);
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box__box-view {
    left: auto;
    right: 0;
    top: 0;
    transform: translate(15%, -25%);
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box__box-view {
    left: auto;
    right: 0;
    top: 0;
    transform: translate(15%, -25%);
  }
}

.box--my .box__box-view {
  top: -25px;
}

@media (max-width: 1000px) {
  .box--my .box__box-view {
    top: 30px;
  }
}

@media (max-width: 1232px) {
  .opened-left-panel .box--my .box__box-view {
    top: 30px;
  }
}

@media (max-width: 1325px) {
  .opened-right-panel .box--my .box__box-view {
    top: 30px;
  }
}

@media (max-width: 1340px) {
  .opened-contests-panel .box--my .box__box-view {
    top: 30px;
  }
}

@media (max-width: 1557px) {
  .opened-left-panel.opened-right-panel .box--my .box__box-view {
    top: 30px;
  }
}

@media (max-width: 1572px) {
  .opened-left-panel.opened-contests-panel .box--my .box__box-view {
    top: 30px;
  }
}

@media (max-width: 767px) {
  .box--my .box__box-view {
    top: 10px;
  }
}

@media (max-width: 999px) {
  .opened-left-panel .box--my .box__box-view {
    top: 10px;
  }
}

@media (max-width: 1092px) {
  .opened-right-panel .box--my .box__box-view {
    top: 10px;
  }
}

@media (max-width: 1107px) {
  .opened-contests-panel .box--my .box__box-view {
    top: 10px;
  }
}

@media (max-width: 1324px) {
  .opened-left-panel.opened-right-panel .box--my .box__box-view {
    top: 10px;
  }
}

@media (max-width: 1339px) {
  .opened-left-panel.opened-contests-panel .box--my .box__box-view {
    top: 10px;
  }
}

.box__box-open .box__drop-coin {
  width: 20px;
  height: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%) scale(0.8);
}

.box__anim-light {
  -webkit-animation: anim-light-data-v-2a5fbe62 2s linear infinite;
  animation: anim-light-data-v-2a5fbe62 2s linear infinite;
}

.box__dprop-0 {
  -webkit-animation: dprop0-data-v-2a5fbe62 0.3s linear both;
  animation: dprop0-data-v-2a5fbe62 0.3s linear both;
}

.box__dprop-1 {
  -webkit-animation: dprop1-data-v-2a5fbe62 0.3s linear both;
  animation: dprop1-data-v-2a5fbe62 0.3s linear both;
}

.box__dprop-2 {
  -webkit-animation: dprop2-data-v-2a5fbe62 0.3s linear both;
  animation: dprop2-data-v-2a5fbe62 0.3s linear both;
}

.box__dprop-3 {
  -webkit-animation: dprop3-data-v-2a5fbe62 0.3s linear both;
  animation: dprop3-data-v-2a5fbe62 0.3s linear both;
}

.box__dprop-4 {
  -webkit-animation: dprop4-data-v-2a5fbe62 0.3s linear both;
  animation: dprop4-data-v-2a5fbe62 0.3s linear both;
}

.box__dprop-5 {
  -webkit-animation: dprop5-data-v-2a5fbe62 0.3s linear both;
  animation: dprop5-data-v-2a5fbe62 0.3s linear both;
}

.box__dprop-6 {
  -webkit-animation: dprop6-data-v-2a5fbe62 0.3s linear both;
  animation: dprop6-data-v-2a5fbe62 0.3s linear both;
}

.scale-up-center {
  -webkit-animation: scale-up-center-data-v-2a5fbe62 5s linear infinite;
  animation: scale-up-center-data-v-2a5fbe62 5s linear infinite;
  opacity: 0;
}

.scale-up-side {
  -webkit-animation: scale-up-center-data-v-2a5fbe62 7s linear infinite;
  animation: scale-up-center-data-v-2a5fbe62 7s linear infinite;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.all-boxes__title_ts{
  font-size: 12px;
  color: #93acd3;
}
.box__lg-button-block{
  display: flex;
  align-items: flex-end;
  width: 240px;
}




@-webkit-keyframes splash-data-v-2a5fbe62 {
  0% {
    top: -20px;
  }

  to {
    top: 90px;
  }
}

@keyframes splash-data-v-2a5fbe62 {
  0% {
    top: -20px;
  }

  to {
    top: 90px;
  }
}

@-webkit-keyframes anim-light-data-v-2a5fbe62 {
  0% {
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0.4;
  }
}

@keyframes anim-light-data-v-2a5fbe62 {
  0% {
    opacity: 0.4;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0.4;
  }
}

@-webkit-keyframes scale-up-side-data-v-2a5fbe62 {
  0% {
    transform: scaleX(0.5);
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  to {
    transform: scaleX(1.2);
    opacity: 0;
  }
}

@keyframes scale-up-side-data-v-2a5fbe62 {
  0% {
    transform: scaleX(0.5);
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  to {
    transform: scaleX(1.2);
    opacity: 0;
  }
}

@-webkit-keyframes scale-up-center-data-v-2a5fbe62 {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  to {
    transform: scale(1.2);
    opacity: 0;
  }
}

@keyframes scale-up-center-data-v-2a5fbe62 {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  25% {
    opacity: 1;
  }

  to {
    transform: scale(1.2);
    opacity: 0;
  }
}

@-webkit-keyframes dprop0-data-v-2a5fbe62 {
  to {
    left: 40%;
    top: 30%;
  }
}

@keyframes dprop0-data-v-2a5fbe62 {
  to {
    left: 40%;
    top: 30%;
  }
}

@-webkit-keyframes dprop1-data-v-2a5fbe62 {
  to {
    left: 50%;
    top: 25%;
  }
}

@keyframes dprop1-data-v-2a5fbe62 {
  to {
    left: 50%;
    top: 25%;
  }
}

@-webkit-keyframes dprop2-data-v-2a5fbe62 {
  to {
    left: 65%;
    top: 25%;
  }
}

@keyframes dprop2-data-v-2a5fbe62 {
  to {
    left: 65%;
    top: 25%;
  }
}

@-webkit-keyframes dprop3-data-v-2a5fbe62 {
  to {
    left: 33%;
    top: 38%;
  }
}

@keyframes dprop3-data-v-2a5fbe62 {
  to {
    left: 33%;
    top: 38%;
  }
}

@-webkit-keyframes dprop4-data-v-2a5fbe62 {
  to {
    left: 57%;
    top: 37%;
  }
}

@keyframes dprop4-data-v-2a5fbe62 {
  to {
    left: 57%;
    top: 37%;
  }
}

@-webkit-keyframes dprop5-data-v-2a5fbe62 {
  to {
    left: 70%;
    top: 35%;
  }
}

@keyframes dprop5-data-v-2a5fbe62 {
  to {
    left: 70%;
    top: 35%;
  }
}

@-webkit-keyframes dprop6-data-v-2a5fbe62 {
  to {
    left: 60%;
    top: 25%;
  }
}

@keyframes dprop6-data-v-2a5fbe62 {
  to {
    left: 60%;
    top: 25%;
  }
}
</style>
