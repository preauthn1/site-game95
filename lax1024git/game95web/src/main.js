import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwindcss.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BuryingPoint from './common/BuryingPoint/index.js'
import VueI18n from 'vue-i18n'
import axios from 'axios';
import langKey from './utils/langKey';
import VueLuckyCanvas from '@lucky-canvas/vue'
import cybImg from '@/components/cybImg.vue'
import none from '@/components/none.vue'
import QueryString from "qs"


// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueClipboard from 'vue-clipboard2';
// import style
import 'swiper/swiper-bundle.css';
import VueLazyload from "vue-lazyload";
import "./assets/fonts/iconfont.css";
import "./assets/fonts/fonts.css";
import "./assets/css/css.css";

import "./assets/css/common.less";
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/display.css';
// loading
import $loading from '@/components/loading/loading.js'
// google analytics
import VueGtag from 'vue-gtag'
import LazyYoutube from "vue-lazytube";
// import javascript
import mine from '@/common/common.js';
import helper from '@/common/helper.js';
import updateLangAndSystem from '@/common/updateLangAndSystem.js';
import { socketClient } from "./utils/socket";
import VueAnimateNumber from 'vue-animate-number'
import db from '@/Db'


Vue.component("cybImg",cybImg)
Vue.component("none",none)
axios.defaults.baseURL = helper.getApiUrl();
Vue.prototype.$EventBus = new Vue();
Vue.prototype.$https = axios;
Vue.prototype.$langKey = langKey;
Vue.prototype.$helper = helper;
Vue.prototype.$buryingPoint = new BuryingPoint()
Vue.prototype.$ws = new socketClient();
Vue.mixin(mine);
Vue.use(VueI18n);
Vue.use(ElementUI,{locale});
Vue.use(VueAwesomeSwiper);
Vue.use(VueClipboard);
// Vue.use(request);
Vue.use(VueAnimateNumber);
Vue.use(VueLuckyCanvas)
Vue.use($loading)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
    preload: 1.3, // 表示lazyload元素距离底部距离百分比
    loading: require('../src/assets/images/loading.jpg'), // 正在加载时显示的图片路径
    error: require('../src/assets/images/loading.jpg'), // 图片加载失败时显示的图片路径
    attempt: 5, // 图片加载失败后重试次数，默认3
})
Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_GA_ID}
}, router);
Vue.use(LazyYoutube);
const query = QueryString.parse(location.hash.split("?")[1])
helper.set('share_code', query.share_code || "");
(async ()=>{
    // 打开前端数据库
    await db.open()
    var i18n_messages = helper.get('i18n_messages');
    var i18n_lang = helper.getLang();
    const i18n = new VueI18n({
        locale: i18n_lang ? i18n_lang : 'CN', // 设置语言环境
        fallbackLocale: i18n_lang ? i18n_lang : 'CN', // 设置语言环境
        silentTranslationWarn: true,
        messages:i18n_messages// 设置语言环境信息
    })
    if(!i18n_messages) await updateLangAndSystem({i18n})
    new Vue({ router , store , i18n , render: h => h(App) }).$mount('#app')
    if(i18n_messages) await updateLangAndSystem({i18n})
})()