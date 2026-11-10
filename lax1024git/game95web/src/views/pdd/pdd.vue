<template>
    <div v-loading="pageLoading">
        <div class="title-wapper">
            {{ data.title }}
        </div>

        <div class="notify-wrap">
            <img src="@/assets/images/pdd-logo.png" alt="">
            <div class="withdrawLogs">
                <div class="van-notice-bar__wrap">
                    <div class="van-notice-bar__content" :style="{ 'animation-duration': `${noticeArr.length * 1.5}s` }">
                        <span v-for="(item, index) in noticeArr" :key="index">{{ `${item.username} ${$t('成功提现')}
                                                    ${data.current_symbol}${item.amount}` }} </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="turn-wapper">
            <div class="date-and-invite">
                <div class="countdown">
                    {{ $t('倒计时') }}
                    <span>{{ formattedTime }}</span>
                </div>
                <el-button class="btn1 btn2" @click="showShare">
                    <span>{{ $t("邀请好友帮忙提款") }}</span>
                    <span class="share-btn">
                        <i class="el-icon el-icon-share"></i>
                    </span>
                </el-button>
            </div>

            <div class="turntable-wapper">
                <turntable :data="data" @tabBtn="turntable" ref="turntable" :border2Show="false"></turntable>
            </div>

            <div class="turn-content">
                <div class="cashMain-card">
                    <div class="turn-content-title-wapper">
                        <span class="turn-content-title">{{ data.current_symbol }}
                            <animate-number from="0" :to="data.awarded_amount" :key="data.awarded_amount" duration="1500"
                                easing="easeOutQuad"
                                :formatter="formatNumber"></animate-number></span>
                        <el-button class="btn1" :loading="btnLoding" @click="withdrawal">
                           <div class="pix-btn-icon-wapper">
                             <img src="@/assets/images/pdd/pix2.png" style="width: 1.4em;" class="pix-btn-icon">
                             <span>{{ $t("去取出") }}</span>
                           </div>
                        </el-button>
                    </div>
                    <div class="jdt-wapper">
                        <div class="jdt-txt">
                            <span>{{ formatNumber(numFormat(data.awarded_amount / data.amount * 100 || 0)) }}%</span>
                        </div>
                        <div class="progress">
                            <div class="progress-content"
                                :style="`width: ${numFormat(data.awarded_amount / data.amount * 100 || 0)}%;`">
                            </div>
                        </div>
                        <span>{{ $t("您还需要") }} <span class="num">{{ data.current_symbol }} <animate-number
                                    :formatter="formatNumber" from="0"
                                    :to="numFormat((data.amount - data.awarded_amount) || 0)" duration="1500"
                                    :key="data.amount - data.awarded_amount" easing="easeOutQuad" from-color="#FFD488"
                                    to-color="#FFD488"></animate-number></span> {{
                                        $t("才能提款") }} </span>
                    </div>
                </div>


            </div>
        </div>
        <div class="order-wapper">
            <div class="tabs">
                <div :class="['tabs-item', cur == 0 ? 'tabs-item-active' : '']" @click="cur = 0">{{ $t("报告") }}</div>
                <div :class="['tabs-item', cur == 1 ? 'tabs-item-active' : '']" @click="cur = 1">{{ $t("参考资料") }}</div>
                <div :class="['tabs-item', cur == 2 ? 'tabs-item-active' : '']" @click="cur = 2">{{ $t("规则") }}</div>
            </div>
            <div class="list-wapper" v-if="cur == 0">
                <none style="margin: 0;" v-if="!data.withdrawal_user_list.length"></none>
                <div v-else class="list-content"
                    :style="{ 'animation-duration': `${data.withdrawal_user_list.length * 1.2}s` }">
                    <div class="list-item" v-for="item, index in data.withdrawal_user_list" :key="index">
                        <span>{{ item.username }}</span>
                        <span>{{ $t('刚刚提现') }}</span>
                        <span>{{ data.current_symbol }} {{ item.amount }}</span>
                    </div>
                </div>

            </div>
            <div class="list-wapper over-y-scroll" v-if="cur == 1">
                <none style="margin: 0;" v-if="!data.user_invite_record.length"></none>
                <div class="list-item" v-for="item, index in data.user_invite_record" :key="index">
                    <span>{{ item.invite_username }}</span>
                    <span>{{ $t('成功助力') }}</span>
                    <span>{{ data.current_symbol }} {{ item.amount }}</span>
                </div>
            </div>
            <div class="rule html" v-html="data.introduce" v-if="cur == 2"></div>
        </div>
        <share :data="data" ref="share"></share>
        <take-out v-if="takeOutShow" :dataInfo="data" @showShare="showShare" @close="closeDialog"></take-out>
    </div>
</template>
  
<script>
import turntable from "@/components/pdd/turntable.vue"
import share from "@/components/pdd/share.vue"
import takeOut from '@/components/pdd/takeOut.vue';
import { pdd_getData_api, pdd_withdrawal_api, pdd_turntable_api } from '@/api/pdd.js'
export default {
    components: { turntable, share, takeOut },
    data() {
        return {
            noticeArr: [],
            swiperOpt: {
                autoplay: true,
                slidesPerView: "auto",
                spaceBetween: 33,
                breakpoints: {
                    768: {
                        spaceBetween: 23,

                    },
                    1200: {
                        spaceBetween: 33,
                    }
                }
            },
            pageLoading: true,
            data: { awarded_amount: 0, user_invite_record: [], withdrawal_user_list: [] },
            timeId: null,
            timer: null,
            cur: 0,
            tLoading: false,
            btnLoding: false,
            countdown: 0,
            takeOutShow: false,
            fdcc: 30
        }
    },
    async mounted() {
        await this.getData()
        // this.timeId = setInterval(() => {
        //     this.data.remain_time--
        //     this.$forceUpdate()
        // }, 1000)

    },
    beforeDestroy() {
        clearInterval(this.timeId)
    },
    methods: {
        closeDialog() {
            this.takeOutShow = false
        },
        startCountdown() {
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.timer);
                }
            }, 1000);
        },
        showShare() {
            if (!this.$store.state.isLoginStatu) {
                this.showLoginReg(0);
                return;
            }
            if (this.judgeClient() == "pc") {
                // this.$copyText(this.data.invite_url).then(() => {
                //     this.successTips('链接复制成功，请发送对应的好友');
                // })
                this.$refs.share.show()
            } else {
                this.$refs.share.show()
            }
        },
        judgeClient() {
            let client = "";
            if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //判断iPhone|iPad|iPod|iOS
                client = "ios";
            } else if (/(Android)/i.test(navigator.userAgent)) {
                //判断Android
                client = "android";
            } else {
                client = "pc";
            }
            return client;
        },
        initTime(time) {
            if (time < 0) {
                return "00:00:00"
            }
            const h = parseInt(time / 3600)
            const m = parseInt(time % 3600 / 60)
            const s = time % 60
            return `${h.toString().padStart(2, 0)}:${m.toString().padStart(2, 0)}:${s.toString().padStart(2, 0)}`
        },
        async getData() {
            const { data } = await pdd_getData_api()
            if (data.code == 1) {
                if (data.data.amount) {
                    this.pageLoading = false
                    this.data = data.data
                    this.noticeArr = data.data.withdrawal_user_list
                    this.countdown = data.data.remain_time
                    this.startCountdown();
                } else {
                    this.data.awarded_amount = 0
                    this.data.amount = 0
                }
            }
            this.pageLoading = false
        },
        // 抽奖
        async turntable() {
            if (!this.$store.state.isLoginStatu) {
                this.showLoginReg(0);
                return;
            }
            if (this.tLoading) return
            if(!this.data.id) return
            this.tLoading = true
            const { data } = await pdd_turntable_api({ id: this.data.id })
            if (data.code == 1) {
                this.$refs.turntable.run(() => {
                    this.tLoading = false
                    this.getData()
                }, data.data.amount,data.data.type)
            } else {
                this.tLoading = false
                this.errorTips(data.msg);
            }
        },
        // 取款
        async withdrawal() {
            if (!this.$store.state.isLoginStatu) {
                this.showLoginReg(0);
                return;
            }
            console.log(this.data.awarded_amount, this.data.amount);
            if(this.data.awarded_amount != this.data.amount){
                return this.takeOutShow = true
            }
            this.btnLoding = true
            const { data } = await pdd_withdrawal_api({ id: this.data.id })
            this.btnLoding = false
            if (data.code == 1) {
                this.successTips(`${this.$t('恭喜您，提现钱包金额')} ${this.data.amount}`);
                this.getData()
            } else {
                // this.takeOutShow = true
                this.errorTips(data.msg);
            }
        }
    },
    watch:{
        "$store.state.isLoginStatu"(){
            this.getData()
        }
    },
    computed: {
        formattedTime() {
            const hours = Math.floor(this.countdown / 3600);
            const minutes = Math.floor((this.countdown % 3600) / 60);
            const seconds = this.countdown % 60;
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    },
}
</script>
  
<style lang="less" scoped src="@/assets/css/pdd.less"></style>