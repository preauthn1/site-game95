
import {user_log_api} from '../api/user.js'
class Watch {
  constructor(name,type) {
    this.timeId = null
    this.timeId2 = null
    this.type = type
    this.name = name + 'record'
    this.time = parseInt(localStorage.getItem(this.name)) || 0
    this.visibilitychangeFn = this.visibilitychange.bind(this)
    if(this.time&&this.time!=0){
     this.send() 
    }
  }
  open() {
    // 浏览器显示/显示
    window.addEventListener("visibilitychange",this.visibilitychangeFn)
    this.start()
  }
  close() {
    this.end()
    window.removeEventListener("visibilitychange",this.visibilitychangeFn)
  }
  visibilitychange(e) {
    const pageVisibility = document.visibilityState;
    // 页面变为不可见时触发
    if (pageVisibility == 'hidden') {
      this.end()
    }
    // 页面变为可见时触发
    if (pageVisibility == 'visible') {
      this.start()
    }
  }
  start() {
    this.end()
    const time = 1000
    this.timeId = setInterval(() => {
      this.setTime(this.time + time)
    }, time)
    this.timeId2 = setInterval(() => {
      this.send()
    }, 60000)
  }
  end() {
    clearInterval(this.timeId)
    clearInterval(this.timeId2)
    this.timeId = null
    this.timeId2 = null
  }
  setTime(time) {
    this.time = time
    localStorage.setItem(this.name, this.time)
  }
  async send() {
    const {data} = await user_log_api({
      type:this.type,
      data:this.time/1000,
      datetime:parseInt(new Date().getTime() / 1000)
    })
    if(data.code==1){
      this.setTime(0)
    }
  }
}


export default Watch;