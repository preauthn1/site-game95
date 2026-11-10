import {system_info,system_info_new} from '@/api/index.js'
import helper from '@/common/helper.js';
import store from '@/store';
export default async ({i18n})=>{
  const [res,resNew] = await Promise.all([system_info(),system_info_new()])
  if (res.data.code == 1) {
    store.commit("system/updateSystem",{system:res.data,systemNew:resNew.data})
    const messages = res.data.lang;
    for (let lang in messages) {
        i18n.mergeLocaleMessage(lang, {...messages[lang],...resNew.data.lang[lang]});
    }
    if (res.data.locale && !helper.getLang()) {
        i18n.locale = res.data.locale;
        helper.setLang(res.data.locale);
        helper.set('i18n_icon', res.data.locale_flag);
    }
    helper.set('alllang', res.data.alllang);
    helper.set('idc', res.data.idc.map(item=>({...item,label:`+${item.label}`})));
    helper.set('i18n_messages', messages);
    helper.set('rule', {...res.data.data,...resNew.data.site});
    helper.setHeadInfo(resNew.data.site);
  }
}