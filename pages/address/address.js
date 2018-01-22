// pages/address/address.js

import { makePar, extend } from '../../utils/util.js';
var app = getApp();

var addressm ={

  /**
   * 页面的初始数据
   */
  data: {
     addressInfo :{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  saveAddressInfo:function(e){
    let inputType = e.currentTarget.dataset.inputtype;
    let value = e.detail.value;
    let addressInfo  = this.data.addressInfo;
    addressInfo[inputType] = value;
    this.setData({addressInfo});
  },
  onAddressSubmit:function(){
      //TODO 保存收货地址
      app.fecthData({

      })
  }
}

var addressmh = extend(addressm, {});

Page(addressmh);

