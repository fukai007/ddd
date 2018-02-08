// pages/goodsMain/goodsMain.js
//index.js
import { makePar, extend } from '../../utils/util.js';
//获取应用实例
const app = getApp();

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
    let gmid = options.gmid;
    app.fetchData({
      func:'goods.get_goods_detail',
      g_id: gmid
    }).then(data=>{
      this.setData({gd:data});
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
    let imageUrl = this.data.gt.g_img;
    let title = '全场不要钱，答对就拿走，答的多拿的多';
    let path = 'pages/index/index?';
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) { },
      fail: function (res) { }
    }
  },
  toga:function(){
    app.toPage('askForGoods', {
      g_id: this.data.gd.g_id
    },'to');
  }
})
