import Android from "./Android"
import Pixel from "./FacebookPixel"
import KwaiPixel from "./KwaiPixel"
import Google from "./Google"
import Baidu from "./Baidu"
import {system_channel_api} from '@/api/index.js'
import QueryString from "qs"
import store from '@/store'
import helper from '@/common/helper.js';
// 埋点
class BuryingPoint{
  constructor(){
    // 安卓埋点
    this.android = new Android()

    // facebook埋点 不传key默认不执行，免报错
    this.pixel = new Pixel()

    // kwai 埋点
    this.kwaiPixel = new KwaiPixel()

    // google
    this.google = new Google()

    // Baidu
    this.baidu = new Baidu()

    // 初始化
    this.init()
  }
  register(){
    this.android.register()
    this.pixel.register()
    this.kwaiPixel.register()
    this.google.register()
  }
  recharge({price,currency}){
    this.android.recharge(price,currency)
    this.kwaiPixel.recharge(price,currency)
    this.google.recharge(price,currency)
  }
  initialCharge({price,currency}){
    this.pixel.initialCharge(price,currency)
    this.kwaiPixel.initialCharge(price,currency)
    this.android.initialCharge(price,currency)
  }
  async init(){
    const query = QueryString.parse(location.hash.split("?")[1])
    if(!query.acid) {
      const acid = localStorage.getItem("channelAcid")
      if(acid){
        query.acid = acid
      }else{
        return
      }
    }
    localStorage.setItem("channelAcid",query.acid)
    const { data } = await system_channel_api(query.acid)

    if(data.code==1){
      store.commit("setChannel",data.data)
      helper.set('share_code', data.data.share_code)
      if(data.data.type=='facebook'){
        this.pixel = new Pixel(data.data.code)
      }else if(data.data.type=='kwai'){
        this.kwaiPixel = new KwaiPixel(data.data.code)
      }
    }
  }
}
export default BuryingPoint;