// pages/query/query.js

var app = getApp()
const db = wx.cloud.database()
const ttCollection = db.collection('tt')
const _ = db.command

Page({


  data: {
    tt:"tt",
    tab: 0,
    status: '未签到',
    total:0,
    absent:0,
    signed:0,
    height:0,
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '确定'}],
    docId:'docId'
    
   
  },

  


  onLoad: function (e) {
    var that = this 
    wx.getSystemInfo({   //得到选项卡高度
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight
            }); 
        } 
    }) 




    ttCollection.where({
      status:"已签到"
    }).count().then(res =>{
      this.setData({
        signed:res.total,
        
        
      })
    }),

      ttCollection.where({
        status:"未签到"
      }).count().then(res =>{
        this.setData({
          absent:res.total
          
        }) 
    }),

    
    
    wx.cloud.callFunction({
      name: "getAll"
    }).then(res => {
      console.log(res)
      this.setData({
        tt: res.result.data
      })
    })
  },

  tab_slide: function (e) {//滑动切换tab 
    var that = this;
    that.setData({ tab: e.detail.current });
  },

  tab_click: function (e) {//点击tab切换
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },


  fresh: function (e) {
    var that = this 
    wx.getSystemInfo({ 
        success: function (res) { 
            that.setData({ 
                clientHeight: res.windowHeight
            }); 
        } 
    }) 




    ttCollection.where({
      status:"已签到"
    }).count().then(res =>{
      this.setData({
        signed:res.total,
        
        
      })
    }),

      ttCollection.where({
        status:"未签到"
      }).count().then(res =>{
        this.setData({
          absent:res.total
          
        }) 
    }),

    ttCollection.count().then(res =>{
      this.setData({
        total:res.total,
        height:(res.total * 85)
      }) 
  }),
    
    wx.cloud.callFunction({
      name: "getAll"
    }).then(res => {
      console.log(res)
      this.setData({
        tt: res.result.data
      })
    })
  },

  openConfirm: function () {
    this.setData({
        dialogShow: true
    })
},

tapDialogButton(e) {
  this.setData({
      dialogShow: false,
      
  })
},

openConfirm: function () {      //弹窗函数，只能用于文字提示
  wx.showModal({
    title: '使用指南',
    content: '点击学生状态图标可修改签到状态，点击刷新按钮更新签到列表信息，点击停止按钮终止签到',
    confirmText: "确认",
    cancelText: "取消",
    success: function (res) {
      console.log(res);
      if (res.confirm) {
        console.log('用户点击主操作')
      } else {
        console.log('用户点击辅助操作')
      }
    }
  })
},


statusModify:function(event){

  
  var docId = event.currentTarget.dataset.id;


       
    
  
  wx.showActionSheet({
    itemList: ['已签到', '请假', '未签到'],
    success: function (res) {
       
      if(res.tapIndex == 0){
        wx.cloud.callFunction({
          name: "updateData0",
          data:{
            docId:docId
          }
        }).then(res => {
          wx.showToast({
            title: '更新成功',
          })
        })
      }
      if(res.tapIndex == 1){
        wx.cloud.callFunction({
          name: "updateData1",
          data:{
            docId:docId
          }
        }).then(res => {
          wx.showToast({
            title: '更新成功',
          })
        })
      }
      if(res.tapIndex == 2){
        wx.cloud.callFunction({
          name: "updateData2",
          data:{
            docId:docId
          }
        }).then(res => {
          wx.showToast({
            title: '更新成功',
          })
        })
      }
    }
  })

}




  

  





  
  

  







})