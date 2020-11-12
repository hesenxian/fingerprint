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
  var tapIndex = event.tapIndex
  if (tapIndex == 0) {
    ttCollection.where({
      _id: docId
    }).update({
      data: {
        status: "已签到",
        statusLevel: parseInt(0)
      }
    })
  }
  if (tapIndex == 1) {
    ttCollection.where({
      _id: docId
    }).update({
      data: {
        status: "请假",
        statusLevel: parseInt(1)
      }
    })
  }
  if (tapIndex == 2) {
    ttCollection.where({
      _id: docId
    }).update({
      data: {
        status: "未签到",
        statusLevel: parseInt(2)
      }
    })
  }



  return 
}