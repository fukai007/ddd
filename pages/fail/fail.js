// pages/fail/fail.js
import { makePar, extend } from '../../utils/util.js';
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
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.fetchData({
      func: 'user.get_user_level'
    }).then(data => {
      //data.bonus = (data.bonus / 100 || 0).toFixed(2);
      this.setData({
        info: data
      })
      console.log('dx---------->', data);
    });
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
    let imageUrl = 'https://wmygb.crazydoggy.cn/images/share-big-bg.jpeg';
    let title = '不要钱，答题就拿走，挑战吧';
    let path = 'pages/index/index?';
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) { },
      fail: function (res) { }
    }
  },
  
  /**
   * 用户点击home
   */
  toIndex: function () {
    app.toPage('index');
  },
  formSubmit: function (e) {
    let formId = e.detail.formId;
    console.log("formSubmit-formId---------info-------->", formId, this.data.info)
    app.fetchData({
      func: 'notice.send_next_match',
      form_id: formId,
      keyword1: this.data.info.next_match_str,
      keyword2: this.data.info.next_start_time,
      n_time: this.data.info.next_match_time
    }).then(() => {
      wx.showToast({ title: '订阅成功' });
    })
  },


})