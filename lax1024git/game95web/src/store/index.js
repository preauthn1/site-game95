import Vue from 'vue'
import Vuex from 'vuex'
import fiveBessings from './fiveBessings'
import msg from './msg'
import system from './system'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        channel:null,
        env:localStorage.getItem("env"),
        menuList:null,//底部菜单选项
        loginVisible:false,
        walletGetData:0,
        isWallet:false,
        windowWidth:window.innerWidth,
        isLoginStatu: false, //Login Status
        userToken: '', //User Token
        userTokenKey: '', //User Token Key
        bottonLoading: false, //botton loading status
        userAvatar: '',
        rechargeCarName: '', //recharge name
        withdrawCarName: '', //withdraw name
        messageStatus: false, //msg shou status
        messageUnreadCount: 0,
        moduleLoading: false, //module loading
        betsPropsList: [],
        loading: {
            wallet: false,
            message: false,
            submit: false,
            buyfund: false,
        },
        userInfo: null,
        safePwdTipShow: false,
        pwdTestShow: false,
        wheelTipShow: false,
        siteUnit:process.env.VUE_APP_UNIT,
        registType:process.env.VUE_APP_REGIST_TYPE,
        mediaShow:process.env.VUE_APP_MEDIA_SHOW,
		rechargeOrder:process.env.VUE_APP_RECHARGE_ORDERBY,
		accountBetShow:process.env.VUE_APP_BETRECORD_SHOW,
		siteLogo:process.env.VUE_APP_SITE_LOGO,
		showUserId:process.env.VUE_APP_SHOW_USER_ID,
		wtIntNum:parseInt(process.env.VUE_APP_WT_INTNUM),
        activityShow:parseInt(process.env.VUE_APP_ACTIVITY_SHOW),
        shareStyle:parseInt(process.env.VUE_APP_SHARE_STYLE),
		vndIcon:require('@/assets/images/php.svg'),
		defaulAvatar:require('@/assets/images/default-avatar.png'),
        blanceStatus:true,
        skeletonShow:true,
        keepPages: '',
        // 货币图标
        currencyIcon:process.env.VUE_APP_CURRENCY_ICON,
        currencyUint:process.env.VUE_APP_CURRENCY_UINT,
        Openback:false,
    },
    mutations: {
        setEnv(state,env){
            localStorage.setItem("env",env)
            state.env = env
        },
        setChannel(state,data){
            state.channel = data
        },
        menuList(state,data){
            state.menuList = data
        },
        // 设置钱包是否显示
        setIsWallet(state,data){
            state.isWallet = data
        },
        setWindowWidth(state){
            state.windowWidth = window.innerWidth
        },
        $vuexSetMessageUnreadCount(state, count) {
            if (count == -1) {
                state.messageUnreadCount--;
            } else {
                state.messageUnreadCount = count;
            }
        },
        $vuexSetLoginState(state, pathName) {
            state.isLoginStatu = pathName;
        },
        $vuexSetLoadingState(state, loading) {
            if (typeof loading === 'object') {
                for (const key in loading) {
                    if (Object.hasOwnProperty.call(loading, key) && Object.hasOwnProperty.call(state.loading, key)) {
                        state.loading[key] = loading[key];
                    }
                }
            }
        },
        $vuexSetLoadingWalletState(state, loading) {
            state.loading.wallet = loading;
        },
        $vuexSetUserTokenState(state, pathName) {
            state.userToken = pathName;
        },
        $vuexSetUserTokenKeyState(state, pathName) {
            state.userTokenKey = pathName;
        },
        $vuexSetBottonLoadingState(state, pathName) {
            state.bottonLoading = pathName;
        },
        $vuexSetUserAvatarState(state, pathName) {
            state.userAvatar = pathName;
        },
        $vuexSetRechargeCarNameState(state, pathName) {
            state.rechargeCarName = pathName;
        },
        $vuexSetMessageStatusState(state, pathName) {
            state.messageStatus = pathName;
        },
        $vuexSetModuleLoadingState(state, pathName) {
            state.moduleLoading = pathName;
        },
        $vuexSetWithdrawCarNameState(state, pathName) {
            state.withdrawCarName = pathName;
        },
        $vuexSetBetsPropsListState(state, pathName) {
            state.betsPropsList = pathName;
        },
        $vuexUserInfo(state, val) {
            state.userInfo = val;
        },
        $vuexSetSafePwdTipShowState(state, pathName) {
            state.safePwdTipShow = pathName;
        },
        $vuexSetPwdTestShowState(state, pathName) {
            state.pwdTestShow = pathName;
        },
        $vuexSetWheelTipShowState(state, pathName) {
            state.wheelTipShow = pathName;
        },
        $vuexSetBlanceShowState(state, pathName) {
            state.blanceStatus = pathName;
        },
        $vuexSetSkeletonShowState(state, pathName) {
            state.skeletonShow = pathName;
        },
        changeKeepPages(state, status) {
			state.keepPages = status;
		},
		keepThisPage(state, status) {
			const arr = state.keepPages.split(",");
			arr.push(status);
			state.keepPages = arr + "";
		},
		removeThisPage(state, status) {
			const arr = state.keepPages.split(",");
			const index = arr.findIndex(x => x === status);
			if (index > 0) {
				arr.splice(index, 1);
			}
			state.keepPages = arr + "";
		}
    },
	getters: {
		getKeepPages(state) {
			return state.keepPages;
		}
	},
    modules:{
        fiveBessings,
        msg,
        system,
    }
})

export default store
