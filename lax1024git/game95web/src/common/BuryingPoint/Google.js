
// google 
class Google{
  constructor(){
    this.id = process.env.VUE_APP_GOOGLE_TAG_ID
    if(this.id){
      this.init()
    }
    this.gtag = null
  }
  init(){
    const scriptEl = document.createElement("script")
    scriptEl.src = `https://www.googletagmanager.com/gtag/js?id=${this.id}`
    document.body.appendChild(scriptEl)
    scriptEl.addEventListener("load",()=>{
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      this.gtag = gtag
      gtag('js', new Date());
      gtag('config', this.id);
      gtag('event', 'page_view');
    })
  }
  // 完成注册
  register(){
    this.gtag && this.gtag('event', 'sign_up');
  }
  // 监听充值
  recharge(price,currency){
    this.gtag && this.gtag('event', 'purchase',{
      currency,
      value:price
    });
  }
}


export default Google;