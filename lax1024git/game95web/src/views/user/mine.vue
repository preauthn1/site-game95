<template>
    <div>     
        <div class="mine" v-if="$store.state.isLoginStatu && $store.state.userInfo">
            <div class="avatar01">
                <img v-if="$store.state.userInfo.head_img" v-lazy="$store.state.userInfo.head_img"
                     class="img_avatar01 w-20 h-auto object-fill" />
                <img v-else src="../../assets/images/default_head.png"
                    class="img_avatar01 w-9 h-auto object-fill" />
                <div class="avatar01_message" style="">
                    <span class="avatar01_message_name">{{$store.state.userInfo.real_name?$store.state.userInfo.real_name:$t('未设置')}}</span>
                    <div class="flex avatar01_message_id">ID：{{ $store.state.userInfo.rec_code }}
                        <div class="ml-2" v-clipboard:copy="$store.state.userInfo.rec_code" v-clipboard:success="onCopy">
                        <svgIcon icon="icon-copy" ></svgIcon>
                      </div>
                    </div>
                </div>
            </div>
            <div class="user_vip" @click="handlejunp">
                <img src="../../assets/images/user_vip.png" class="user_vip_img" alt="">
                <span class="user_vip_name">
                    {{ $store.state.userInfo.level_name }}</span>
                <div class="arrow">
                    <img src="../../assets/images/user_arrow.png" class="arrow_img" alt="">
                </div>
            </div>
            <div class="profile-menu">
                <div class="vertical-menu">
                    <ul class="vertical-menu__inner">
                        <li class="vertical-menu__item" v-if="isMobile">
                            <button class="vertical-menu__link" @click="showMsg">
                                <svgIcon icon="icon-bell-full"></svgIcon>
                                <span>{{ $t('站内信息') }}</span>
                                <i class="vertical-menu__notify" v-if="$store.state.messageUnreadCount > 0">{{
                                    $store.state.messageUnreadCount }}</i>
                            </button>
                        </li>
                        <li class="vertical-menu__item">
                            <button class="vertical-menu__link" @click="accountChange">
                                <svgIcon icon="icon-account"></svgIcon>
                                <span>{{ $t('帐户') }}</span>
                                <div class="arrow">
                                    <img src="../../assets/images/user_arrow.png" class="arrow_img" alt="">
                                </div>
                            </button>
                        </li>
                        <li class="vertical-menu__item">
                            <button class="vertical-menu__link" @click="url('/transactions')">
                                <svgIcon icon="icon-transaction"></svgIcon>
                                <span>{{ $t('交易') }}</span>
                                <div class="arrow">
                                    <img src="../../assets/images/user_arrow.png" class="arrow_img" alt="">
                                </div>
                            </button>
                        </li>
                        <li class="vertical-menu__item" @click="url('/game-history')">
                            <button class="vertical-menu__link">
                                <svgIcon icon="icon-history"></svgIcon>
                                <span>{{ $t('游戏历史') }}</span>
                                <div class="arrow">
                                    <img src="../../assets/images/user_arrow.png" class="arrow_img" alt="">
                                </div>
                            </button>
                        </li>
                        <li class="vertical-menu__item">
                            <button class="vertical-menu__link" @click="url('/sessions')">
                                <svgIcon icon="icon-sessions"></svgIcon>
                                <span>{{ $t('登录日志') }}</span>
                                <div class="arrow">
                                    <img src="../../assets/images/user_arrow.png" class="arrow_img" alt="">
                                </div>
                            </button>
                        </li>
                        <li class="vertical-menu__item">
                            <button class="vertical-menu__link" @click="cardClick">
                                <svgIcon icon="icon-transaction"></svgIcon>
                                <span>{{ $t('卡片管理') }}</span>
                                <div class="arrow">
                                    <img src="../../assets/images/user_arrow.png" class="arrow_img" alt="">
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <el-button type="button" :loading="loginOutLoading" style="background: #656667; margin-bottom: 100px;"
                class="button button_sm button_grey1 button_center" @click="loginOut">
                <span style="color: #fff;" class="button__text ">{{ $t('登出') }}</span>
            </el-button>
        </div>
    </div> 
</template>
<script>
import svgIcon from "@/components/svg.vue";
import {
    my_logout_api
} from "@/api/index";
export default {
    components: {
        svgIcon,
    },
    props: {
        flagShow: {
            type: Boolean,
            default: true
        },
        isMobile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loginOutLoading: false, //退出加载状态
        };
    },
    methods: {
        handlejunp(){
            this.url("/rank-system")
        },
        calc(num1, num2) {
            const num = parseInt(num1 / num2 * 100) || 0
            return (num > 100 ? 100 : num)
        },
        accountChange() {
            this.url("/account");
        },
        cardClick() {
            this.$store.state.Openback = true  
        },
        onCopy: function () {
            this.successTips('Copy success');
        },
        url(url) {
            this.$router.push({
                path: url
            });
        },
        // 退出
        async loginOut() {
            this.loginOutLoading = true;
            this.$helper.rm("userInfo");
            await my_logout_api().then(res => {
                if (res && res.data.code == 1) {
                    this.userShow = false;
                    this.$helper.rm("tokenInfo");
                    this.$helper.rm("userInfo");
                    this.$store.commit("$vuexSetLoginState", false);
                    this.$store.commit("$vuexUserInfo", null);
                    this.$message({
                        customClass: "successMessage",
                        showClose: false,
                        message: this.$t("已成功退出当前账号"),
                        center: true,
                        type: "success",
                        duration: "1000",
                        onClose: () => {
                            this.goUrl('/');
                        }
                    });
                } else {
                    this.errorTips("失败");
                }
                this.loginOutLoading = false;
                this.$helper.rm("tipStorage");
            });
        },

    },
};
</script>

<style scoped lang="less">
.mine {
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media (min-width:750px){
        justify-content: center;
        max-width: 50%;
        margin: 0px auto;
    }
    .avatar01 {
        display: flex;
        margin-top: 19px;
        margin-bottom: 30px;
        .img_avatar01{
            border-radius: 50%;
            border: 2px solid #FF9E03;
        }
        .avatar01_message{
            .avatar01_message_name{
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 26px;
                color: #FFFFFF;
            }
            .avatar01_message_id{
                font-family: PingFang SC;
                font-weight: 400;
                color: #A5A5A5;
            }
            display: flex;
            width: 100%; 
            flex-direction: column; 
            justify-content: center; 
            margin-left: 10px;
        }
        
    }
    .user_vip{
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        background: #191A1E;
        margin-bottom: 34px;
        .user_vip_img{
            width: 25px;
            height: auto; 
            object-fit: contain;
        }
        .user_vip_name{
            margin-left: 10px;
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 20px;
            color: #FF9802;
        }
    }
}
.arrow{
    width: 100%; 
    display: flex; 
    justify-content: flex-end;
    .arrow_img{
        width: 10px;
        height: 20px;
        margin-top: 4px;
    }
}

.profile-menu {
    margin-bottom: 34px;
    background: #191A1E;
    border-radius: 10px;
}

.vertical-menu {
    padding: 6px 2px;
}

.vertical-menu__link {
    position: relative;
    -moz-appearance: none;
    -webkit-appearance: none;
    text-decoration: none;
    align-items: center;
    display: inline-flex;
    vertical-align: middle;
    justify-content: flex-start;
    font-weight: 600;
    line-height: 1.5;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    font-size: 14px;
    border-radius: 10px;
    padding: 10px;
    color: #93acd3;
    width: 100%;
    transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
}

.vertical-menu__link svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.vertical-menu__link.active,
.vertical-menu__link:focus,
.vertical-menu__link:hover {
    color: #fff;
}
.vertical-menu__notify {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    margin-left: 4px;
    color: #fff;
}

</style>
