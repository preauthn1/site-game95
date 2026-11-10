
// 单例模式实现对socket路由的封装，方便全局使用
// getInstance 获取实例对象
// SocketRouter.getInstance.addRouter 添加路由 id 请设置唯一值，方便移除
// SocketRouter.getInstance.removeRouter 移除路由 id 请设置唯一值，方便移除
// SocketRouter.getInstance.start 根据名字寻找路由并执行，请注册在消息收到通知的时候

class SocketRouter {
  static __instance = new SocketRouter();

  static getInstance(){
    return this.__instance
  }

  constructor(){
   this.router = [];
  }

  addRouter(name,callBack){
    this.router.push({name,callBack})
  }

  removeRouter(name,callBack){
    this.router = this.router.filter(item=>!(item.callBack==callBack && item.name == name))
  }

  start(name,data){
    this.router.filter(item=>item.name==name).forEach((item)=>{
      item.callBack && item.callBack(data)
    })
  }

}
export default SocketRouter.getInstance();