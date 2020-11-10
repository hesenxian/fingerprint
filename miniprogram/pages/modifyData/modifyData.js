const db = wx.cloud.database()
const ttCollection = db.collection('tt')
const _ = db.command


Page({
  data: {

  },

  onLoad: function (options) {                      //查询options.key
   ttCollection.where({
      _id:options.key
    }).get().then(res => {        
      this.setData({
        tt: res.data,
        docID:options.key
      })
    })
  },

  datasubmit: function (e) {     //提交修改数据
    ttCollection.where({
      _id: this.data.docID
    }).update({
      data: {
        F_id: e.detail.value.F_id,
        no: e.detail.value.no,
        name: e.detail.value.name,
        sex: e.detail.value.sex,
        department: e.detail.value.department,
        class: e.detail.value.class,
        status: e.detail.value.status,
        reason: e.detail.value.reason,
        absence: e.detail.value.absence
      }
    }).then(res => {
      wx.showToast({
        title: '更新成功',
      })
    })
  },

  deleteD:function(e){  //通过this.data.docID拿到要删除的文档ID
    ttCollection.doc(this.data.docID).remove().then(res =>{
      wx.showToast({
        title: '删除成功',
      })
      var timeOut = setTimeout(function () {   //定时秩序函数
        wx.navigateBack({
          url: '../manageData/manageData',
        })
    }, 1000)
    })             
  }
})