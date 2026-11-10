// 文件i18n/index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import helper from "@/common/helper";


Vue.use(VueI18n) //会把$t挂到Vue.prototype上，以便在.js文件中使用importName.t()
const messages = helper.get('i18n_messages');
// 国际化
const i18n = new VueI18n({
    locale: helper.getLang(), // set locale
    messages
})

export default i18n