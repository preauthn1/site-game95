class Db {
  constructor() {
    this.dbName = "cyb"
    this.version =  1
    this.storeName = "cyb"
    this.db = null
  }
  // 启动数据库
  open(){
    return new Promise((reslove,reject)=>{
      const onsuccess = (event)=> {
        this.db = event.target.result // 数据库对象
        reslove()
      }
      const onerror = (e) => {
        console.log('数据库打开报错',e)
        // reject('数据库打开报错')
      }
      const onupgradeneeded = (event) => {
        // 数据库创建或升级的时候会触发
        this.db = event.target.result // 数据库对象
        let objectStore
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          objectStore = this.db.createObjectStore(this.storeName, {
            keyPath: 'id'
          }) // 创建表
          // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
        }
      }
      let request = window.indexedDB.open(this.dbName, this.version)
      request.onsuccess = onsuccess
      request.onerror = onerror
      request.onupgradeneeded = onupgradeneeded
    })
  }
  
  // 添加数据
  addData(data) {
    let {db, storeName} = this
    return new Promise((resolve, reject) => {
      let request = db.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
      .objectStore(storeName) // 仓库对象
      .add(data)
      request.onsuccess = function (event) {
        resolve()
      }
      request.onerror = function (event) {
        reject('数据写入失败')
        // throw new Error(event.target.error)
      }
    })


    
  }

  // 根据id获取数据
  getDataByKey(key) {
    let {db, storeName} = this
    return new Promise((reslove,reject)=>{
      let transaction = db.transaction([storeName]) // 事务
      let objectStore = transaction.objectStore(storeName) // 仓库对象
      let request = objectStore.get(key)
      request.onerror = function (event) {
        reject('事务失败')
      }
      request.onsuccess = function (event) {
        reslove(request.result)
      }
    })
    
  }

  // 根据id修改数
  updateDB(data) {
    let {db, storeName} = this

    return new Promise((resolve, reject) => {
      let request = db.transaction([storeName], 'readwrite') // 事务对象
      .objectStore(storeName) // 仓库对象
      .put(data)

      request.onsuccess = function () {
        console.log('数据更新成功')
        resolve()
      }

      request.onerror = function () {
        reject('数据更新失败')
      }
    })
    
  }

  // 根据id删除数据
  deleteDB(id) {
    let {db, storeName} = this
    return new Promise((resolve, reject) => {
      let request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)
      request.onsuccess = function () {
        resolve()
      }
      request.onerror = function () {
        reject('数据删除失败')
      }
    })
    
  }

}

const db = new Db()
export default db;