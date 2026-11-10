import db from '../Db';
import md5 from './md5'
import helper from "@/common/helper";



const maxAge = 600*1000; //数据有效期


// 存入数据
export async function addData(data, res, dbData) {
  if(res.data.code!=1) return
  const resDataNew = {
    id: md5.hexMD5(JSON.stringify(data)+helper.getLang()),
    data: JSON.stringify(res),
    time:new Date().getTime()
  }
  try {
    if (dbData) {
      await db.updateDB(resDataNew)
    } else {
      await db.addData(resDataNew)
    }

  } catch (error) {
    // console.log(error)
  }
}

// 接口获取数据
export async function getDBData(data,next) {
  try {
    let dbData = await db.getDataByKey(md5.hexMD5(JSON.stringify(data)+helper.getLang()))
    if(!dbData) return
    // 判断数据是否过期,过期删除数据
    if(maxAge+dbData.time - new Date().getTime()>0){
      return dbData
    }else{
      await db.deleteDB(dbData.id)
      return null
    }
  } catch (error) {
    // console.log(error)
  }

}