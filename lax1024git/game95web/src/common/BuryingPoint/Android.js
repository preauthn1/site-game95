// 安卓埋点
class Android{
  constructor(){
    this.android = window.Android
  }
  // 完成注册
  register(){
    this.android && this.android.onEvent && this.android.onEvent('register', null);
  }
  // 监听充值
  recharge(price,currency){
    this.android && this.android.onPurchase && this.android.onPurchase( price , currency , '');
  }
  // 监听首次充值
  initialCharge(price,currency){
    this.android && this.android.onFirstDepos && this.android.onFirstDepos( price , currency , '');
  }
}


export default Android;