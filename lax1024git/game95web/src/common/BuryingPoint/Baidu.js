
// 百度
class Baidu{
  constructor(){
    this.id = process.env.VUE_APP_BAIDU_ID
    if(this.id){
      this.init()
    }
  }
  init(){
    const _this = this;
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = `https://hm.baidu.com/hm.js?${_this.id}`;
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  }
}


export default Baidu;