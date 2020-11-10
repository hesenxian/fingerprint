// pages/work/work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    uid: '7ae0c4a6083e818db527ed24bc5b755f',//物联网密钥
    topic: "agito01"
  },
  add:function(){
    wx.navigateTo({
      url: '../addData/addData',
    })
  },

  check:function(){
    wx.navigateTo({
      url: '../checkAttendance/checkAttendance',
    })
  },

  manage:function(){
    wx.navigateTo({
      url: '../manageData/manageData',
    })
  },

  enrollclick: function() {                                //”关闭“按钮处理函数函数
    var that = this                                         //当点击关闭按钮，更新开关状态为关闭
    that.setData({
      powerstatus:"关闭"
    })     
     wx.request({                          //控制接口
      url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
      method:"POST",
      data: {
        uid: that.data.uid,
        topic: that.data.topic,
        msg:"enroll"
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
       
        wx.showToast({
          title:'录入指纹',
          icon:'success',
          duration:1000
        })
      }
    })
  },

  deleteIDclick: function() {                                //”关闭“按钮处理函数函数
      var that = this                                         //当点击关闭按钮，更新开关状态为关闭
      that.setData({
        powerstatus:"关闭"
      })     
       wx.request({                          //控制接口
        url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
        method:"POST",
        data: {
          uid: that.data.uid,
          topic: that.data.topic,
          msg:"deleteID"
        },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success (res) {
          wx.showToast({
            title:'删除指纹',
            icon:'success',
            duration:1000
          })
        }
      })
  },  

  emptyDatabaseclick: function() {                                //”关闭“按钮处理函数函数
        var that = this                                         //当点击关闭按钮，更新开关状态为关闭
        that.setData({
          powerstatus:"关闭"
        })     
         wx.request({                          //控制接口
          url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
          method:"POST",
          data: {
            uid: that.data.uid,
            topic: that.data.topic,
            msg:"emptyDatabase"
          },
          header: {
            'content-type': "application/x-www-form-urlencoded"
          },
          success (res) {
            wx.showToast({
              title:'清空指纹',
              icon:'success',
              duration:1000
            })
          }
        })
  }, 

})

