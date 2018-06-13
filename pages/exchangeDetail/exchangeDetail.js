// pages/exchangeDetail/exchangeDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.fetchData({
        func:'exchange_goods.detail',
        eg_id: options.eg_id
      }).then(data=>{
          this.setData({
            egImg: data.eg_detail_img,
          });
      });
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
  /**
 * 兑换商品
 */
  exchangeGoods: function (e) {
  //app.toPage('exchangeDetail', { eg_id: id }, 'to');

    app.fetchData({
      func: 'exchange_goods.pay',
      eg_id: this.options.eg_id
    }).then(data => {
      console.log('exchangeGoods---------data-------------------->', data);
      app.toPage('address', { ga_id: data.egl_id, gr_type: 2 });
    })
  }
})