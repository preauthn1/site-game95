<template>
    <div v-if="showPopup" class="reward-popup" @click.self="closePopup">
        <div class="popup-content">
            <div class="withdrawAlert">
                <span>{{ $t('很快就能取出') }}</span>
                <div @click="closePopup" style="cursor: pointer;color:#FFF">
                    <i class="el-icon-close el-icon"></i>
                </div>

            </div>
            <div class="main-content">
                <div class="cash">
                    <div class="text">{{ $t("即将支付的金额") }}</div>
                    <div class="cashContent"><animate-number :formatter="formatNumber" from="0"
                            :to="dataInfo.awarded_amount" duration="1500" :key="dataInfo.awarded_amount"
                            easing="easeOutQuad" 
                            class="cashContent-amount"></animate-number> {{dataInfo.current_symbol}}</div>
                </div>
                <ul class="withdrawInfo">
                    <li>
                        <span>{{ $t('收款账户') }}</span>
                        <span>{{ $store.state.userInfo.mail2 ? $store.state.userInfo.mail2 : $store.state.userInfo.yphone }}</span>
                    </li>
                    <li>
                        <span>{{ $t('收款方式') }}</span>
                        <span>{{ $t('余额') }}</span>
                    </li>
                </ul>
                <div class="line"></div>
                <ul class="progress-t">
                    <li class="icon-share">{{ $t('付款请求已提交') }}</li>
                    <li>{{ $t("您还需要") }} {{ formatNumber(numFormat((dataInfo.amount - dataInfo.awarded_amount) || 0)) }} {{$t("才能提款") }}</li>
                    <li class="active">{{`${dataInfo.amount} ${dataInfo.current_symbol}`}} {{ $t("将支付到您的余额") }}</li>
                </ul>
                <button class="close-btn" @click="showShare">{{ $t("邀请朋友来帮助") }}</button>
            </div>

        </div>
    </div>
</template>
    
<script>
export default {
    props: {
        dataInfo: {
            required: true
        }
    },
    data() {
        return {
            showPopup: true
        };
    },
    methods: {
        closePopup() {
            this.showPopup = false;
            this.$emit('close');
        },
        showShare() {
            this.$emit('showShare');
        }

    }
};
</script>
    
<style lang="less" scoped>
.reward-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    padding: 0 30px;
}

.popup-content {
    position: relative;
    width: 100%;
    max-width: 410px;
    background: #0D131C;
    border-radius: 12px;
}

.withdrawAlert {
    font-size: 18px;
    color: #2283F6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #161F2C;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;

}

.cs-btn {
    width: 16px;
    height: 16px;
    object-fit: fill;
 
    z-index: 99;
}

.main-content {
    padding: 0 18px 24px;
}

.cash {
    padding: 12px 0 8px;
    text-align: center;
}

.text {
    color: #FFF;
    font-size: 18px;
    padding-top: 2px;
}

.cashContent {
    margin-top: 4px;
    color: #db1de7;
    font-size: 32px;
    font-weight: bold;
}

.cashContent-amount {
    color: #db1de7;
    font-size: 32px;
    font-weight: bold;
}

.withdrawInfo {
    color: #e6e6e6;
    font-size: 12px;
}

.withdrawInfo>li {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "SWISSC";

    span {
        &:last-child {
            color: #00B8FE;
        }
    }
}

.line {
    margin-top: 10px;
    border: 1px dashed #e5e5e5;
}

.progress-t {
    font-size: 14px;
    padding: 13px 0;
    padding-left: 16px;
    background: #2C3749;
    border-radius: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: left;
    position: relative;
    margin-top: 12px;

    &::after {
        content: "";
        position: absolute;
        height: calc(100% - 70px);
        border-left: 1px dotted #2283F6;
        top: 26px;
        left: 21px;
    }

    li {
        margin-bottom: 16px;
        color: #2283F6;
        display: flex;
        &::before {
            content: "\e693";
            font-family: 'iconfont' !important;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #2283F6;
            color: #000;
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            line-height: 12px;
            margin-right: 10px;
        }

        &:last-child {
            &::before {
                content: "";
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: #a4a4a4;
                margin-left: 2px;
                margin-right: 10px;
            }
        }
    }

    .active {
        color: #a4a4a4;
    }
}

.close-btn {
    width: 100%;
    padding: 8px 16px;
    background: #2283F6;
    border-radius: 100vh;
    margin: 20px auto 0;
}
</style>