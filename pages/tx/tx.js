// pages/accountMain/accountMain.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getM:0,
    mover:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (po) {
      this.setData({
        saveM: po.m/100
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //mover
  changeGetM:function(e){
    let m = e.detail.value;
    let saveM = this.data.saveM 
    //if (m > saveM)
    this.setData({
      getM: m
    });
  },
  getMoneyToMe: function () {
    app.fetchData({
      func:'withdrawals.withdrawals',
      money: this.data.getM*100
    })
  }
})