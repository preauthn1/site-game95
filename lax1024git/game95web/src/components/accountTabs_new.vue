<template>
    <div class="account_setting">
        <router-link to="/account" :class="[`account_a`, active == 'a' ? `active01` : ``]" aria-current="page">
            <div class="account_content">
                <span>
                    <img src="../assets/images/account/myaccount.png" class="account_img" :alt="$t('我的账户')" />
                </span>
                <span :class="[`account_name`, active == 'a' ? `active02` : ``]">{{ $t('我的账户') }}</span>
            </div>
        </router-link>

        <router-link to="/transactions" :class="[`account_a`, active == 't' ? `active01` : ``]" aria-current="page">
            <div class="account_content">
                <span>
                    <img src="../assets/images/account/transaction.png" class="account_img" :alt="$t('交易')" />
                </span>
                <span :class="[`account_name`, active == 't' ? `active02` : ``]">{{ $t('交易') }}</span>
            </div>
        </router-link>
        <router-link to="/game-history" :class="[`account_a`, active == 'g' ? `active01` : ``]" aria-current="page">
            <div class="account_content">
                <span>
                    <img src="../assets/images/account/history.png" class="account_img" :alt="$t('游戏历史')" />
                </span>
                <span :class="[`account_name`, active == 'g' ? `active02` : ``]">{{ $t('游戏历史') }}</span>
            </div>
        </router-link>
        <router-link to="setting" :class="[`account_a`, active == 'set' ? `active01` : ``]" aria-current="page">
            <div class="account_content">
                <span>
                    <img src="../assets/images/account/setting.png" class="account_img" :alt="$t('账户设置')" />
                </span>
                <span :class="[`account_name`, active == 'set' ? `active02` : ``]">{{ $t('账户设置') }}</span>
            </div>
        </router-link>
        <router-link to="/sessions" :class="[`account_a`, active == 'ses' ? `active01` : ``]" aria-current="page">
            <div class="account_content">
                <span>
                    <img src="../assets/images/gree-menu.png" class="account_img" :alt="$t('登录日志')" />

                </span>
                <span :class="[`account_name`, active == 'ses' ? `active02` : ``]">{{ $t('登录日志') }}</span>
            </div>

        </router-link>
    </div>
</template>

<script>
export default {
    name: 'accountTabsNew',
    props: ["num"],
    data() {
        return {
            active: this.num
        }
    },
    created() {
        console.log(this.active)
    }
}

</script>

<style scoped lang="less">
.account_setting {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .active01 {
        border: 1px solid #FF7D1E;
    }

    .account_a {
        height: 44px;
        background: #282f5a;
        text-decoration: none;
        border-radius: 8px;

        .account_content {
            display: flex;
            padding: 5px;
            margin-top: 3px;
            justify-content: center;

            .account_img {
                width: 30px;
                height: 30px;
            }

            .account_name {
                margin: auto 5px;
                color: #fff;
            }

            .active02 {
                color: #84F100;
            }
        }

    }
}
</style>
