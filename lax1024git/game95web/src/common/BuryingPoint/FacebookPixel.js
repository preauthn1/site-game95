// Pixel埋点
class Pixel{
  constructor(key){
    this.fbq = null
    this.key = key
    this.init(key)
  }

  isPixel(){
    return this.key
  }
  // 完成注册
  register(){
    if(this.isPixel()){
      this.fbq&&this.fbq('track', 'CompleteRegistration');
    }
  }

  init(key){
    if(this.isPixel()){
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      this.fbq = window.fbq
      this.fbq&&this.fbq('init', key);
      this.fbq&&this.fbq('track', 'PageView');
    }
  }
    
  // 监听首冲完成
  initialCharge(price,currency){
    if(this.isPixel()){
      this.fbq&&this.fbq('track', 'Purchase',{currency, value: price});
    }
  }
}
export default Pixel;