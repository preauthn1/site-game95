import {bank_my_api, recharge_get_all_api, withdraw_limit_api} from "@/api/user";

export const WalletMixin = {
    data() {
        return {
            withdrawal_rules: "",
            user_withdrawal_amount: "",
            dep_address2: '',
            loginOutLoading: false, //退出加载状态
            head_userInfo: null, //用户信息
            msgShow: false,
            isShow: false,
            userShow: false,
            ver_withdrawal_first:0,
            // switch
            walletCur: 0,
            walletTabs: [
                {
                    icon: "icon-arrow-down-full",
                    name: "充值"
                },
                {
                    icon: "icon-arrow-up-full",
                    name: "提现"
                }
                // {
                //   icon: "icon-wallet-account",
                //   name: "地址薄"
                // }
            ],
            // recharge slect
            dialogVisible: false,
            dep_address: "",
            dep_qrcode: "",
            dwToggle: "USDT",
            // withdraw
            withdrawAddress: "",
            Amount: "",
            Balance: "0.0",

            /* profile */
            dialogVisible2: false,
            // details
            detOptions: [
                {
                    value: this.$t("所有"),
                    label: this.$t("所有"),
                    settlement: 0
                },
                {
                    value: this.$t("已结算"),
                    label: this.$t("已结算"),
                    settlement: 1
                },
                {
                    value: this.$t("未结算"),
                    label: this.$t("未结算"),
                    settlement: 2
                }
            ],
            detValue: this.$t("所有"),
            detShow: false,
            bankAll: null, //所有平台收款信息
            allBankInfo: [], //组合线上线下银行卡
            allBank: [], //银行卡
            allUsdt: [], //USDT
            allWallet: [], //电子钱包
            allPix: [], //PIX
            allRechangeChannel: {},
            rechargeList: [],
            depositType: 0,
            rechargeListValue: "",
            rechargeFilter: false,
            rechargeCarFilter: false,
            rechargeCarType: "",
            showRechargeRate: 0, //是否显示汇率
            bankId: 0,
            usdt_type: "",
            rechargeType: 0,
            usdt_bank_name: "",
            depositInfo: null,
            rechargePrice: "", //充值金额
            payInfo: "", //线上充值渲染表单
            withdrawList: [],
            withdrawListValue: "",
            wtRpersent: "",
            service_charge: "",
            usdt_charge: "",
            mShowStatus: null,
            wtBankList: [],
            wtAllBank: [],
            wtAllUsdt: [],
            wtAllWallet: [],
            wtAllPix: [],
            allWithdrawChannel: [],
            isDataShow: null,
            isUsdt: null,
            withdrawFilter: false,
            withdrawCarFilter: true,
            currency_defa: 0,
            currency_type: 0,
            withdrawal_rate: 0,
            wtBankid: 0,
            wtRnum: 0, //今日剩余数量
            wtMinimum: 0, //最低提现金额
            wtHighest: 0, //最高提现金额
            curWithdrawInfo: null,
            withdrawPrice: "",
            // ========================
            // 卡片管理
            // 假数据
            dialogVisibleCard: false,
            bankshow: false,
            KaihuName: "",
            BankName: "",
            BankNumber: "",
            elecshow: false,
            elecName: "",
            elecNumber: "",
            usdtshow: false,
            usdtUrl: "",
            caterange: [],
            usdtNameValue: "",
            pixshow: false,
            pixName: "",
            pixType: [],
            pixTypeValue: "",
            allCurrency: null,
            bankCurrencyId: '',
            pixNumber: "",
            activeTab: "",
            swiperCard: {
                slidesPerView: "auto",
                slidesPerGroup: 3,
                spaceBetween: 16
            },
            teamStatprofitCount0: "0.00",
            teamStatprofitCount1: "0.00",
            teamStatprofitCount2: "0.00",
            gameStatistics: {
                total_price: "0.00",
                total_winprice: "0.00",
                total_loss: "0.00"
            },
            head_currentPage: 1,
            listTotal: 0,
            gameOrderList: [],
            gameOrderListPage: 1,
            settlement: 0,
            paytype: [],
            withdrawFlag: true, //判断是否有卡片
            myBankList: [],
            myBank: [],
            myUsdt: [],
            myWallet: [],
            myPix: [],
            bankFinancial: 0,
            isBankOpen: 0,
            BankIsBankOpen: "",
            BankFinancialNumber: "",
            addAct: "",
            verify_code: "",
            addBankCarI: null,
            withdrawPwdQ: "",
            isOnlineRecharge: false,
            isUsdtRecharge: false,
            updateStatus: false,
            bankNameList: [],
        }
    },
    methods: {
        getWithdrawLimit() {
            withdraw_limit_api().then(res => {
                if (res && res.data.code == 1) {
                    // withdrawal_rules提现规则，1才有可提现金额
                    // user_withdrawal_amount：可提现金额
                    this.service_charge = res.data.data.service_charge;
                    this.usdt_charge = res.data.data.usdt_charge;
                    this.wtRnum = res.data.data.day_limit;
                    this.wtMinimum = res.data.data.min_amount;
                    this.wtHighest = res.data.data.max_amount;
                    this.withdrawal_rules = res.data.data.withdrawal_rules;
                    this.user_withdrawal_amount = res.data.data.user_withdrawal_amount;
                    this.ver_withdrawal_first = res.data.data.ver_withdrawal_first
                }
            });
        },
        getWithdrawList() {
            this.withdrawList = [];
            this.wtBankList = [];
            this.wtAllBank = [];
            this.wtAllUsdt = [];
            this.wtAllWallet = [];
            this.wtAllPix = [];
            this.allWithdrawChannel = [];

            bank_my_api({ bank_type: "all" }).then(res => {
                if (res && res.data.code == 1) {
                    this.wtBankList = res.data.data;
                    for (let i in this.wtBankList) {
                        if (!this.allWithdrawChannel[this.wtBankList[i].bank_type]) {
                            this.allWithdrawChannel[
                                this.wtBankList[i].bank_type
                                ] = new Array();
                        }
                        this.allWithdrawChannel[this.wtBankList[i].bank_type].push(
                            this.wtBankList[i]
                        );
                        // 获取银行卡
                        if (this.wtBankList[i].bank_type == 0) {
                            this.wtAllBank.push(this.wtBankList[i]);
                            this.wtAllBank.forEach(item => {
                                item.img = require("../assets/images/bankcard.svg")
                            });
                            if (this.wtAllBank.length > 0) {
                                this.withdrawFlag = false;
                            } else {
                                this.withdrawFlag = true;
                            }
                        }
                        // 获取USDT
                        if (this.wtBankList[i].bank_type == 1) {
                            this.wtAllUsdt.push(this.wtBankList[i]);
                            this.wtAllUsdt.forEach(item => {
                                if (item.bank_name.includes("TRC")) {
                                    item.img = require("../assets/images/TRC20.png")
                                }
                            })
                        }
                        // 获取电子钱包
                        if (this.wtBankList[i].bank_type == 2) {
                            this.wtAllWallet.push(this.wtBankList[i]);
                        }
                        // 获取PIX
                        if (this.wtBankList[i].bank_type == 3) {
                            this.wtAllPix.push(this.wtBankList[i]);
                        }

                    }
                    this.$nextTick(() => {
                        if (this.wtAllPix.length > 0) {
                            this.withdrawList.unshift({
                                name: this.$t("PIX"),
                                keys: "pix",
                                img: require("../assets/images/bankcard.svg"),
                                mShowStatus: 3
                            });
                            this.wtRpersent = this.service_charge + "%";
                            this.mShowStatus = 3;
                        }
                        if (this.wtAllWallet.length > 0) {
                            this.withdrawList.unshift({
                                name: this.$t("电子钱包"),
                                keys: "wallet",
                                img: require("../assets/images/bankcard.svg"),
                                mShowStatus: 2
                            });
                            this.wtRpersent = this.service_charge + "%";
                            this.mShowStatus = 2;
                        }
                        if (this.wtAllBank.length > 0) {
                            this.withdrawList.unshift({
                                name: this.$t("银行卡"),
                                img: require("../assets/images/bankcard.svg"),
                                keys: "bank",
                                mShowStatus: 0
                            });
                            this.wtRpersent = this.service_charge + "%";
                            this.mShowStatus = 0;
                        }
                        if (this.wtAllUsdt.length > 0) {
                            this.withdrawList.unshift({
                                name: this.$t("USDT"),
                                keys: "usdt",
                                img: require("../assets/images/usdt.svg"),
                                mShowStatus: 1
                            });
                            this.wtRpersent = this.usdt_charge + "%";
                            this.mShowStatus = 1;
                        }
                    });

                    if (this.withdrawList.length > 0) {
                        this.isDataShow = 1;
                        if (
                            this.currency_type == 0 &&
                            (this.withdrawList[0].keys == "bank" ||
                                this.withdrawList[0].keys == "pix" ||
                                this.withdrawList[0].keys == "wallet")
                        ) {
                            this.isUsdt = 0;
                        } else if (
                            this.currency_type == 1 &&
                            (this.withdrawList[0].keys == "bank" ||
                                this.withdrawList[0].keys == "pix" ||
                                this.withdrawList[0].keys == "wallet")
                        ) {
                            this.isUsdt = 1;
                        } else if (
                            this.currency_type == 0 &&
                            this.withdrawList[0].keys == "usdt"
                        ) {
                            this.isUsdt = 1;
                        } else if (
                            this.currency_type == 1 &&
                            this.withdrawList[0].keys == "usdt"
                        ) {
                            this.isUsdt = 0;
                        }
                    } else {
                        this.isDataShow = 0;
                    }
                }
                this.$store.commit("$vuexSetModuleLoadingState", false);
            });
        },
        rechargeListChange(e) {
            this.dep_address = "";
            this.rechargeCarFilter = false;
            this.$store.commit("$vuexSetRechargeCarNameState", "");
            this.dwToggle = e
            for (let i in this.rechargeList) {
                if (this.rechargeList[i].name == e) {
                    this.rechargeFilter = true;
                    this.depositType = this.rechargeList[i].depositType;
                    this.rechargeListValue = this.rechargeList[i].name;
                    if (this.allRechangeChannel[this.depositType].length > 1) {
                        if (this.depositType == 1) {
                            if (this.allRechangeChannel[this.depositType][1]) {
                                this.rechargeListTypeChange(
                                    this.allRechangeChannel[this.depositType][1],
                                    this.depositType
                                );
                            }
                        } else {
                            if (this.allRechangeChannel[this.depositType][0]) {
                                this.rechargeListTypeChange(
                                    this.allRechangeChannel[this.depositType][0],
                                    this.depositType
                                );
                            }
                        }
                    } else {
                        if (this.allRechangeChannel[this.depositType][0]) {
                            this.rechargeListTypeChange(
                                this.allRechangeChannel[this.depositType][0],
                                this.depositType
                            );
                        }
                    }
                    break;
                }
            }
        },
        rechargeListTypeChange(e, i) {
            this.rechargeCarFilter = true;
            // 是否为线上收款
            // 线上类型为：1，2，5，7
            // 线下类型为：0，3，4，6
            this.isOnlineRecharge = e.pay_type == 1 || e.pay_type == 2 || e.pay_type == 7 || e.pay_type == 5;
            // 2 为线上USDT充值。 3为线下充值
            this.isUsdtRecharge = e.pay_type == 2 || e.pay_type == 3;
            // 卡片选择
            if (this.isOnlineRecharge) {
                this.$store.commit("$vuexSetRechargeCarNameState", e.pay_name);
            } else {
                this.$store.commit("$vuexSetRechargeCarNameState", e.bank_name);
            }
            // 获取卡片信息
            this.bankId = e.id;
            this.usdt_type = e.usdt_type;
            this.rechargeType = e.pay_type;
            this.usdt_bank_name = e.bank_name;
            this.depositInfo = e;
            this.dep_address = ''
        },
        async rechargeGetAll() {
            this.allBank = [];
            this.allUsdt = [];
            this.allWallet = [];
            this.allPix = [];
            this.rechargeList = [];
            this.allRechangeChannel = {};
            await recharge_get_all_api().then(res => {
                if (res && res.data.code == 1) {
                    this.bankAll = res.data.data;
                    // 根据接口拼接线上线下数据
                    this.allBankInfo = res.data.data.offline.concat(res.data.data.online);
                    for (let i in this.allBankInfo) {
                        if (!this.allRechangeChannel[this.allBankInfo[i].type]) {
                            this.allRechangeChannel[this.allBankInfo[i].type] = new Array();
                        }
                        this.allRechangeChannel[this.allBankInfo[i].type].push(
                            this.allBankInfo[i]
                        );
                        // 获取银行卡
                        if (this.allBankInfo[i].type == 0) {
                            this.allBank.push(this.allBankInfo[i]);
                            this.allBank.forEach(item => {
                                item.img = require("../assets/images/bankcard.svg")
                            });
                        }
                        // 获取USDT
                        if (this.allBankInfo[i].type == 1) {
                            this.allUsdt.push(this.allBankInfo[i]);
                            this.allUsdt.forEach(item => {
                                if (item.pay_name) {
                                    if (item.pay_name.includes("TRC")) {
                                        item.img = require("../assets/images/TRC20.png")
                                    }
                                }
                                if (item.bank_name) {
                                    if (item.bank_name.includes("ERC20")) {
                                        item.img = require("../assets/images/erc20.svg")
                                    }
                                }
                            });
                        }
                        // 获取电子钱包
                        if (this.allBankInfo[i].type == 2) {
                            this.allWallet.push(this.allBankInfo[i]);
                        }
                        // 获取PIX
                        if (this.allBankInfo[i].type == 3) {
                            this.allPix.push(this.allBankInfo[i]);
                        }
                    }
                    this.$nextTick(() => {
                        if (this.allPix.length > 0) {
                            this.rechargeList.unshift({
                                name: this.$t("PIX"),
                                uname: "pix",
                                img: require("../assets/images/bankcard.svg"),
                                depositType: 3
                            });
                            this.depositType = 3;
                        }
                        if (this.allWallet.length > 0) {
                            this.rechargeList.unshift({
                                name: this.$t("电子钱包"),
                                uname: "wallet",
                                img: require("../assets/images/bankcard.svg"),
                                depositType: 2
                            });
                            this.depositType = 2;
                        }
                        if (this.$store.state.rechargeOrder == 2) {
                            if (this.allUsdt.length > 0) {
                                this.rechargeList.unshift({
                                    name: this.$t("USDT"),
                                    uname: "usdt",
                                    img: require("../assets/images/usdt.svg"),
                                    depositType: 1
                                });
                                this.depositType = 1;
                            }
                            if (this.allBank.length > 0) {
                                this.rechargeList.unshift({
                                    name: this.$t("银行卡"),
                                    uname: "bank",
                                    img: require("../assets/images/bankcard.svg"),
                                    depositType: 0
                                });
                                this.depositType = 0;
                            }
                        } else {
                            if (this.allBank.length > 0) {
                                this.rechargeList.unshift({
                                    name: this.$t("银行卡"),
                                    uname: "bank",
                                    img: require("../assets/images/bankcard.svg"),
                                    depositType: 0
                                });
                                this.depositType = 0;
                            }
                            if (this.allUsdt.length > 0) {
                                this.rechargeList.unshift({
                                    name: this.$t("USDT"),
                                    uname: "usdt",
                                    img: require("../assets/images/usdt.svg"),
                                    depositType: 1
                                });
                                this.depositType = 1;
                            }
                        }
                        if (this.rechargeList.length > 0) {
                            this.rechargeListChange(this.rechargeList[0].name);
                        }
                        this.currency_defa = res.data.data.currency_defa; //货币类型
                    });
                }
            }).catch(function (error) {
                this.errorTips(error);
            });
        },
    },

}
