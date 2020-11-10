//获取应用实例
         
var util= require('../../utils/util.js')

Page({
   data: {
    flag: "none",
    uid: '7ae0c4a6083e818db527ed24bc5b755f',//物联网密钥
    topic: "agito01",
    device_status: "离线", //默认离线
    powerstatus:"关闭" ,  //默认关闭
    currentTime: "",
    currentDate: "",
    Week:"",
    requestResult: '',    
    value:'',   
    valueTest:'',
    valueIsShow: false,    
    ispassword: true,
    showDialog:false    //设置是否弹窗
  },

  fingerprintclick: function() {                     //”打开“按钮处理函数函数
    var that = this
    that.setData({
      powerstatus:"开启"
    })
        wx.request({                                   //控制接口
          url: 'https://api.bemfa.com/api/device/v1/data/1/', //api接口，详见接入文档
          method:"POST",
          data: {  //请求字段，详见巴法云接入文档，http接口
            uid: that.data.uid,
            topic: that.data.topic,
            msg:"fingerprint"   //发送消息                                                            
          },
          header: {
            'content-type': "application/x-www-form-urlencoded"
          },
          success (res) {
            wx.navigateTo({
              url: '../checkAttendance/checkAttendance',
            })
            wx.showToast({
              title:'签到开始',
              icon:'success',
              duration:1000
            })
          }
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

  quitclick: function() {                                //”关闭“按钮处理函数函数
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
            msg:"quit"
          },
          header: {
            'content-type': "application/x-www-form-urlencoded"
          },
          success (res) {
            wx.showToast({
              title:'签到结束',
              icon:'success',
              duration:1000
            })
          }
        })
  }, 

  onLoad: function () {
    var that = this
    wx.request({                          //请求设备状态,设备断开不会立即显示离线，离线1分钟左右才判断真离线
      url: 'https://api.bemfa.com/api/device/v1/status/', //状态api接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,
        topic: that.data.topic,
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
        if(res.data.status === "online"){
          that.Data({
            device_status:"在线"
          })
        }else{
          that.setData({
            device_status:"离线"
          })
        }
      }
    })      
          wx.request({                                           //请求询问设备开关/状态
            url: 'https://api.bemfa.com/api/device/v1/data/1/', //get接口，详见巴法云接入文档
            data: {
              uid: that.data.uid,
              topic: that.data.topic,
            },
            header: {
              'content-type': "application/x-www-form-urlencoded"
            },
            success (res) {
              if(res.data.msg === "on"){
                that.setData({
                  powerstatus:"关闭"
                })
              }
            }
          })
  
    setInterval(function () {                      //设置定时器，每五秒请求一下设备状态
      var _currentTime = util.formatTime(new Date()).split(" ")[1];     //时间
      that.setData({
       currentTime: _currentTime,
       flag: "block"
     });
     var _currentDate = util.formatTime(new Date()).split(" ")[0];      //日期
     that.setData({
      currentDate: _currentDate,
      
      flag: "block"
    });
    
     var _WeekByDate = util.getWeekByDate(new Date());                   //周几
      that.setData({
       Week: _WeekByDate,
       flag: "block"
     });

      wx.request({
        url: 'https://api.bemfa.com/api/device/v1/status/',  //get 设备状态接口，详见巴法云接入文档
        data: {
          uid: that.data.uid,
          topic: that.data.topic,
        },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success (res) {
          if(res.data.status === "online"){
            that.setData({
              device_status:"在线"
            })
          }else{
            that.setData({
              device_status:"离线"
            })
          }
        }
      })
      wx.request({                                  //请求询问设备开关/状态
        url: 'https://api.bemfa.com/api/device/v1/data/1/', //get接口，详见巴法云接入文档
        data: {
          uid: that.data.uid,
          topic: that.data.topic,
        },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        success (res) {
          if(res.data.msg === "on"){
            that.setData({
              powerstatus:"开启"
            })
          }
        }
      })
    }, 1000)
  },

  onEnter: function (e) {   
    let valueTest = this.data.valueTest   
    console.log(valueTest)    
    if(valueTest == '0'){     
        this.setData({
          showDialog: !this.data.showDialog     //关闭验证弹窗
        })
     }    
     else{     
      wx.showToast({        
       title: 'wrong',        
       icon: 'none',        
       duration: 2000      
       })    
      }         
     },/* 设置if进行条件判断，用valueTest的值对密码是否正确进行判定，此处valueTest值为‘0’时实现跳转，否则提示输入失败，重新输入 */
     
  toggleValue() {   
    this.setData({     
     valueIsShow: !this.data.valueIsShow,      
     ispassword: !this.data.ispassword    
     })  
    },    /* 此处设置是否显示密码，返回wxml，返回值false和true */
 
    saveInputValue:function(e) {   
      let value = e.detail.value 
      console.log(value)    
      if (value == '1') {/* 等号后面即为设定的密码 */       
       this.data.valueTest = '0'    
       }    
      else{     
       this.data.valueTest = ''    
       } 
     }, 
     onShow: function () {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    },
});

