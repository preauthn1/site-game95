
import { my_info_api } from "@/api/index";

let common = {
    data() {
        return {
            windowWidth: document.documentElement.clientWidth,
            openedleft: true,
            openedcontests: false,
            isMobileFlag: false, // 响应式
        }
    },
    methods: {
        goUrl(url) {
            this.$router.push({ path: url })
        },
        back() {
            this.$router.go(-1)
        },
        _isMobile() {
            let flag = navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            );
            return flag;
        },
        getMobileOperatingSystem() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            if (/android/i.test(userAgent)) {
                return "Android";
            }

            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return "iOS";
            }

            return "unknown";
        },
        ellipsis(str, first, last) {
            var strC = String(str);
            var len = strC.length;
            var xx = strC.substring(first, len - last);
            var str1 = strC.replace(xx, "...");
            return str1
        },
        platUrl(url) {
            const ua = navigator.userAgent.toLowerCase();
            if (this._isMobile()) {
                if (ua.indexOf('android') != -1) {
                    window.open(url, '_blank');
                } else if (ua.indexOf('iphone') != -1) {
                    window.location.href = url;
                } else {
                    window.location.href = url;
                }
            } else {
                window.open(url, '_blank');
            }
        },
        // 时间戳转化位日期格式
        timestampToTime(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            // return Y + M + D + h + m + s;
            return M + D + h + m + s;
        },
        // 时间戳转化位日期格式
        timestampToTime1(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            // return Y + M + D + h + m + s;
            return M + D;
        },
        // 时间戳转化位日期格式
        timestampToTime2(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());// + ':';
            // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            // return Y + M + D + h + m + s;
            return h + m;
        },
        // 时间戳转化位日期格式 Y-m-d
        timestampToTime3(timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            return Y  + M  +  D;
        },
        // 是否滑动到底部
        scrollBottom() {
            let scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight;
            if (scrollTop + clientHeight >= scrollHeight) {
                // console.log("到底啦");
            }
        },
        // 去重，根据字段 arr: 数据  val: 字段名称
        unique(arr, val) {
            const res = new Map();
            return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
        },
        // 根据字段排序
        handle(property) {
            return function(a, b) {
                const val1 = a[property];
                const val2 = b[property];
                return val1 - val2;
            }
        },
        handle2(property) {
            return function(a, b) {
                const val1 = a[property];
                const val2 = b[property];
                return val2 - val1;
            }
        },
        // 开始监视底部事件
        createBottom() {
            window.addEventListener('scroll', this.scrollBottom);
        },
        // 销毁监视底部事件
        destroyedBottom() {
            window.removeEventListener("scroll", this.scrollBottom); //页面离开后销毁监听事件
        },
        clearNoNum(value) {
            value = value + ''; //转为字符串
            value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
            value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
            value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            value = value.replace(/^()*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
            if (value.indexOf(".") < 0 && value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                value = parseFloat(value);
            }
            return value
        },
		clearIntegerNum (value) {
            value = value + ''; //转为字符串
            value = value.replace(/[^0-9.]/g,"");
            if (value != "") { 
                value = parseInt(value);
            }
            return value
        },
        showLoginReg(data) {
            if (this.$route.query.modal === 'LoginRegistration') {
                return;
            }
            this.$router.replace({
                path: this.$route.path,
                query: {
                    modal: 'LoginRegistration',
                    data: 'tab-' + data
                }
            });
        },
        closeLoginReg() {
            if (this.$route.query.modal === 'LoginRegistration') {
                window.location.href = window.location.href.replace('?modal=LoginRegistration&data=tab-0', '')
                    .replace('&modal=LoginRegistration&data=tab-0', '')
                    .replace('?modal=LoginRegistration&data=tab-1', '')
                    .replace('&modal=LoginRegistration&data=tab-1', '');
            }
        },
        tips(msg, title="通知", duration=2 , icon="⚔️") {
            const iconInit = icon=="⚔️"?icon:`<img src="${icon}"/ >`
            this.$notify({
                customClass: "noticeClass",
                dangerouslyUseHTMLString: true,
                duration: duration*1000 || 2000,
                message:`
                <div class="notice-bar">
                    <div class="bar-ico">${iconInit}</div>
                    <div class="flex_bd">
                        <div class="notice-tit">${this.$t(title)}</div>
                        <div class="notice-desc">${this.$t(msg)}</div>
                    </div>
                </div>
                `
            });
        },
        errorTips(msg, options) {
			let opts = {
				center: true,
				customClass: "errorMessage",
				message: this.$t(msg),
				type: "error"
			};
			if (options) {
			    opts = Object.assign(opts, options);
			}
			this.$message(opts);
        },
        successTips(msg, options) {
            let opts = {
                center: true,
                customClass: "successMessage",
                message: this.$t(msg),
                type: "success"
            };
            if (options) {
                opts = Object.assign(opts, options);
            }
            this.$message(opts);
        },

        updateUserInfo() {
            my_info_api().then(res => {
            if (res && res.data.code == 1) {
                this.$helper.set("userInfo", res.data.data);
                this.$store.commit("$vuexUserInfo", res.data.data);
            }
            });
        },

        reduceUserBalance(amount) {
            if (!this.$store.state.userInfo) {
                return;
            }
            this.$store.state.userInfo.balance *= 1;
            this.$store.state.userInfo.balance -= parseFloat(amount);
            this.$store.state.userInfo.balance1 = this.$store.state.userInfo.balance.toLocaleString('pt-BR');
            this.$helper.set("userInfo", this.$store.state.userInfo);
        },
        addUserBalance(amount) {
            if (!this.$store.state.userInfo) {
                return;
            }
            this.$store.state.userInfo.balance *= 1;
            this.$store.state.userInfo.balance += parseFloat(amount);
            this.$store.state.userInfo.balance1 = this.$store.state.userInfo.balance.toLocaleString('pt-BR');
            this.$helper.set("userInfo", this.$store.state.userInfo);
        },
        isPhone() {
            if (document.body.clientWidth < 992) {
                this.isMobileFlag = true;
                this.openedleft = false;
                this.openedcontests = false;
            } else {
                this.isMobileFlag = false;
            }
            let self = this;
            window.addEventListener('resize', () => {
                window.fullWidth = document.documentElement.clientWidth;
                self.windowWidth = window.fullWidth; // 宽
                if (self.windowWidth < 992) {
                    self.isMobileFlag = true;
                    self.openedleft = false;
                    self.openedcontests = false;
                } else {
                    self.isMobileFlag = false;
                }
            });
        },
        /**
         * 本地化数字
         * @param {float} val
         * @returns
         */
        numFormat(val,isflag,minimumFractionDigits=2) {
           
          let selfUnit = ''
            if(isflag){
              selfUnit = this.$store.state.siteUnit;
            }
            if (isNaN(val)) {
                return selfUnit + val;
            }
            return selfUnit + parseFloat(val).toLocaleString('pt-BR',{ minimumFractionDigits });
        },
        noDecimalsFormat(num,isflag) {
           let val = num.split('/')
            let selfUnit = ''
              if(isflag){
                selfUnit = this.$store.state.siteUnit;
              }
              return selfUnit + val[0].replace(/,(.*)/, '') + '/' + val[1].replace(/,(.*)/, '')
          },
        formatNumber(number) {
            let cache = parseFloat(number).toFixed(2)
            return cache;
        },
        // 解决iOS下select需要点击2次的问题
        elSelectOnFocus() {
            document.activeElement.blur();
        },
    },
    onLoad() {},
    mounted() {},
    created() {
        this.isPhone();
    },
    watch: {}
}

export default common
