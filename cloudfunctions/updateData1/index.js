// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "finger-5gsskvbv71d22628"
})

const db = cloud.database()              
const ttCollection = db.collection("tt")
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var docId = event.docId
  return await ttCollection.where({
    _id: docId
  }).update({
    data:{
      status: "请假",
      statusLevel: parseInt(1)
    }
   
  })
}