<template>
    <div v-if="showPopup" class="reward-popup" @click.self="closePopup">
        <div class="popup-content">
            <div class="withdrawAlert">
                <span>很快就能取出</span>
                <div @click="closePopup">
                    <img class="cs-btn" src="@/assets/images/b-close.png" alt="">
                </div>
                
            </div>
            <div class="main-content">
                <div class="cash">
                    <div class="text">即将支付的总金额</div>
                    <div class="cashContent">{{ dataInfo.awarded_amount }} BRL</div>
                </div>
                <ul class="withdrawInfo">
                    <li>
                        <span>提款账户</span>
                        <span>5525970718365</span>
                    </li>
                    <li>
                        <span>付款方式</span>
                        <span>Pix</span>
                    </li>
                </ul>
                <div class="line"></div>
                <ul class="progress-t">
                    <li>付款请求已提交</li>
                    <li>提现还需{{ numFormat((dataInfo.amount - dataInfo.awarded_amount) || 0) }}</li>
                    <li class="active">100 RS将支付到您的PLX帐户</li>
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
        showShare(){
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
    background: #c6c6c6 linear-gradient(0deg, #0b4721, #11652f 99%);
    border-radius: 5px;
}

.withdrawAlert {
    font-size: 18px;
    color: #f5a31f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #0e5125;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

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
    color: #e5e5e5;
    font-size: 18px;
    padding-top: 2px;
}

.cashContent {
    margin-top: 4px;
    color: #fff500;
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

    span {
        &:last-child {
            color: rgb(245, 163, 31);
        }
    }
}

.line {
    margin-top: 10px;
    border: 1px dashed #e5e5e5;
}

.progress-t {
    font-size: 9px;
    padding: 13px 0;
    padding-left: 16px;
    background: #1d1e22;
    border-radius: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: left;
    position: relative;
    margin-top: 12px;

    li {
        margin-bottom: 16px;
        color: #009d7f;
    }

    .active{
        color: #a4a4a4;
    }
}

.close-btn {
  width: 100%;
  padding: 8px 16px;
  background: rgb(0, 157, 127);
  border: 2px solid rgb(0, 157, 127)#1454AF;
  border-radius: 3px;
  margin: 20px auto 0;
}
</style>