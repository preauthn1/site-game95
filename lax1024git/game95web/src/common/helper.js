// import { createLogger } from "vuex";

const tokenKey = "token";
const i18nKey = "i18n_lang"
const prefix = "ft_"
export default {
    openLink(url){
        if(url.startsWith('http')){
            location.href = url
        }else{
            this.$router.push(url)
        }
    },
    set(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(prefix + key, value);
    },
    get(key) {
        const value = localStorage.getItem(prefix + key);
        try {
            return JSON.parse(value);
        } catch (error) {
            return value
        }
    },
    rm(key) {
        localStorage.removeItem(prefix + key);
    },
    clear() {
        localStorage.clear();
    },
    getWebUrl() {
        return window.location.protocol + '//' + window.location.host
    },
    getApiUrl() {
        const autoUrl = window.location.protocol + "//api." + this.parseDomain(window.location.host);
        const apiUrl = process.env.NODE_ENV === 'production' && process.env.VUE_APP_URL_NOT_AUTO !== 'true' ? autoUrl : process.env.VUE_APP_API_BASE_URL;
        // return apiUrl;
        return process.env.VUE_APP_API_BASE_URL;
    },
    setToken(token) {
        this.set(tokenKey, token);
    },
    getToken() {
        return this.get(tokenKey);
    },
    forgetToken() {
        this.rm(tokenKey);
        this.rm('userinfo');
    },
    getLang() {
        return this.get(i18nKey);
    },
    setLang(lang) {
        this.set(i18nKey, lang);
    },
    setHeadInfo({website_favicon,website_desktop_logo,website_name}) {
        // website_name：网站名称
        // website_favicon：浏览器icon
        // website_pc_logo：PC端 LOGO
        // website_desktop_logo：桌面logo
        // website_mobile_logo：移动端 LOGO（100*100） 
        website_favicon && this.createMetaLink('icon', website_favicon);
        website_desktop_logo && this.createMetaLink('apple-touch-icon-precomposed', website_desktop_logo);
        website_desktop_logo && this.createMetaLink('apple-touch-icon', website_desktop_logo);
        website_name && this.createMeta('apple-mobile-web-app-title', website_name);
        website_name && (  document.title = website_name )      
    },

    createMetaLink(rel, href) {
        const links = [...document.getElementsByTagName("link")]
        const el = links.find(item=>item.rel==rel)
        if(el){
            el.href = href
            return
        }
        var link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    createMeta(name, content) {
        const metas = [...document.getElementsByTagName("meta")]
        const el = metas.find(item=>item.name==name)
        if(el){
            el.content = content
            return
        }
        var meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.getElementsByTagName('head')[0].appendChild(meta);
    },
    parseDomain(str) {
        if (!str) return '';
        if (str.indexOf('://') != -1) str = str.substr(str.indexOf('://') + 3);
        var topLevel = ['com', 'net', 'org', 'gov', 'edu', 'mil', 'biz', 'name', 'info', 'mobi', 'pro', 'travel',
          'museum', 'int', 'areo', 'post', 'rec', 'game'
        ];
        var domains = str.split('.');
        if (domains.length <= 1) return str;
        if (!isNaN(domains[domains.length - 1])) return str;
        var i = 0;
        while (i < topLevel.length && topLevel[i] != domains[domains.length - 1]) i++;
        if (i != topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
        else {
          i = 0;
          while (i < topLevel.length && topLevel[i] != domains[domains.length - 2]) i++;
          if (i == topLevel.length) return domains[domains.length - 2] + '.' + domains[domains.length - 1];
          else return domains[domains.length - 3] + '.' + domains[domains.length - 2] + '.' + domains[domains.length -
            1];
        }
    },
    parseMsg(str) {
        const strs = str.split("&");
        const pms = [];
        let pm;
        for (let i = 0; i < strs.length; i++) {
        pm = strs[i].split("=");
        if (pm.length == 2) {
            pms[pm[0]] = pm[1];
        }
        }
        return pms;
    },
    getQueryParams(queryParam) {
        let url = "";
        for (const key in queryParam) {
          if (Object.hasOwnProperty.call(queryParam, key)) {
            // console.log(queryParam, queryParam[key])
            const val = queryParam[key];
            // console.log(val, key)
            if (val !== "") {
              url += "&" + key + "=" + encodeURIComponent(val);
            }
          }
        }
        return url.substring(1);
    }
  
}
