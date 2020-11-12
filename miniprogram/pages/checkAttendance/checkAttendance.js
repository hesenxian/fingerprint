
var app = getApp()
const db = wx.cloud.database()
const ttCollection = db.collection('tt')
const _ = db.command

Page({
  data: {
    tt: "tt",
    tab: 0,
    status: '未签到',
    total: 0,
    absent: 0,
    signed: 0,
    dialogShow: false,
    buttons: [{ text: '取消' }, { text: '确定' }],
    docId: 'docId',
    leave:0
  },




  onLoad: function (e) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
          //得到选项卡高度
        });
      }
    })

    ttCollection.count().then(res => {  //得到总人数
      this.setData({
        total: res.total,
      })
    })

    ttCollection.where({    //得到已签到人数
      status: "已签到"
    }).count().then(res => {
      this.setData({
        signed: res.total,
      })
    }),

      ttCollection.where({  //得到缺勤人数
        status: "未签到"
      }).count().then(res => {
        this.setData({
          absent: res.total,
        })
      }),

      ttCollection.where({  //得到请假人数
        status: "请假"
      }).count().then(res => {
        this.setData({
          leave: res.total,
        })
      }),

      wx.cloud.callFunction({    //得到学生信息
        name: "getAll"
      }).then(res => {
        console.log(res)
        this.setData({
          tt: res.result.data
        })
      })
  },

  onShow: function () {
    var that = this
    var interval = setInterval(function () {  //页面展示时每3秒自动刷新
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            clientHeight: res.windowHeight
          });
        }
      })

      ttCollection.where({
        status: "已签到"
      }).count().then(res => {
        that.setData({
          signed: res.total,
        })
      }),

        ttCollection.where({
          status: "未签到"
        }).count().then(res => {
          that.setData({
            absent: res.total,
          })
        }),

        ttCollection.where({  //得到请假人数
          status: "请假"
        }).count().then(res => {
          that.setData({
            leave: res.total,
          })
        }),

        wx.cloud.callFunction({
          name: "getAll"
        }).then(res => {
          that.setData({
            tt: res.result.data
          })
        })
      //需不断调用的操作
    }, 3000)
  },

  onHide:function(){
    clearInterval(interval)   //页面隐藏时取消定时器
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



  openConfirm: function () {   //打开提示
    this.setData({
      dialogShow: true
    })
  },

  tapDialogButton(e) {     //关闭提示
    this.setData({
      dialogShow: false,
    })
  },

  openConfirm: function () {    //弹窗函数，内容只能有文字
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


  statusModify: function (event) {
    var docId = event.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['已签到', '请假', '未签到'],
      success: function (res) {
        wx.cloud.callFunction({
          name: "updateData",
          data: {
            docId: docId,
            tapIndex: res.tapIndex
          }
        }).then(res => {
          wx.showToast({
            title: '更新成功',
          })
        })
      }
    })
  }























})