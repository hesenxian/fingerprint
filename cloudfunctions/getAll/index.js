// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"finger-5gsskvbv71d22628"
})

const db = cloud.database()                //此处不能写成cloud.database()
const ttCollection = db.collection("tt")
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  return await db.collection("tt").orderBy("statusLevel","desc").orderBy("no", "asc").field({
    no: true,
    name: true,
    status: true,
    absence:true

  }).get()
}