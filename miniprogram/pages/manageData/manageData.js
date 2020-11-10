const db = wx.cloud.database()
const ttCollection = db.collection('tt')
const _ = db.command



Page({
  data: {
    page: 0,
  },

  onShow: function (e) {
    ttCollection.orderBy("no", "asc").field({
      no: true,
      name: true,
      class: true,
      absence: true
    }).get().then(res => {
      this.setData({
        tt: res.data
      })
    })
  },

  onPullDownRefresh: function () {        //上拉刷新    
    ttCollection.orderBy("no", "asc").field({
      no: true,
      name: true,
      class: true,
      absence: true
    }).get().then(res => {
      this.setData({
        tt: res.data
      }, res => {
        wx.stopPullDownRefresh()
      })
    })
  },

  onReachBottom: function () {      //触底加载
    let page = this.data.page + 20;
    ttCollection.skip(page).orderBy("no", "asc").field({
      no: true,
      name: true,
      class: true,
      view: true
    }).get().then(res => {
      let new_data = res.data
      let old_data = this.data.tt
      this.setData({
        tt: old_data.concat(new_data),   //原有数据与新数据进行整合
        page: page
      }, res => {
        console.log(res)
      })
    })
  },

  dataModify: function (e) {          //点击跳转修改页
    var _docId = e.currentTarget.dataset.id;
    this.setData({
      docId: _docId
    });
    wx.navigateTo({
      url: "../modifyData/modifyData?key=" + this.data.docId,
    })
  },

  dataQuery: function (e) {           //精确筛选
    var xh = e.detail.value.query
    ttCollection.where({
      no: xh
    }).get().then(res => {
      this.setData({
        tt: res.data
      })
    })
  },

  dataReset: function (e) {
    ttCollection.orderBy("no", "asc").field({
      no: true,
      name: true,
      class: true,
      absence: true
    }).get().then(res => {
      this.setData({
        tt: res.data
      })
    })
  }
})