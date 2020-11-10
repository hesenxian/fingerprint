
const db = wx.cloud.database()
const ttCollection = db.collection('tt')


Page({
  data: {
   
  },

  datasubmit:function(e){
    ttCollection.add({
      data: {
        F_id: e.detail.value.F_id,
        no: e.detail.value.no,
        name: e.detail.value.name,
        sex: e.detail.value.sex,
        department: e.detail.value.department,
        class: e.detail.value.class,
        status: "未签到",
        reason: "",
        absence: parseInt(0),
        statusLevel:parseInt(0)
      }
    }).then(res => {
      wx.showToast({
        title: '新增学生成功',
      })
    })
  }
})