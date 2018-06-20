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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.updateShareMenu({withShareTicket: true})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.fetchData({
      func: 'goods.get_goods_detail',
      g_id: this.options.gmid
    }).then(data => {
      this.setData({ gd: data, isfh: this.options.isfh});
    })
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
  onShareAppMessage: function (e) {
    let imageUrl = this.data.gd.g_img;
    let title = '不要钱！答题就拿走，挑战吧!';
    let path = this.route + '?gmid=' + this.options.gmid;



    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) {
        if (res.shareTickets){
          wx.getShareInfo({
            shareTicket:shareTicket,
            success:function (preShare){
              console.log("preShare--------->",preShare);
              app.fetchData({
                func:'resurrection_card.share_group',
                encryptedData:preShare.encryptedData,
                iv:preShare.iv
              }).then((data)=>{
                console.log('resurrection_card.share_group------------------------------------------->');
                app.fetchData({ func: 'user.get_userinfo' }).then(userInfo=>{
                  app.globalData.userInfo = userInfo
                  indexMP.setData({userInfo})
                })
              })
            },
            fail:function () {}
          })
        }
       },
      fail: function(res){}
    }
  },
  toga:function(){
    let gd = this.data.gd;
    let maxCount = gd.gean; // gd. 
    if (gd.is_participate > maxCount){
      wx.showToast({ title: `每日只限答 ${maxCount}次`, image: "../../images/error-a.png" });
    }else{
      app.toPage('askForGoods', {
        g_id: gd.g_id
      }, 'to');
    }
  },
  /**
   * 跳转到小程序 -2018-02-25 16:37:10
   */
  toOtherMPById:function(){
    let {appid,path} = this.data.gd;
    console.log(appid,path);
    app.fetchData({
      func: 'resurrection_card.click_mini_program'
    }).then(()=>{
      wx.showToast({ title: '赞助产品页赠 送一张复活卡',icon:'none'});
      setTimeout(()=>{
        wx.navigateToMiniProgram({ appId: appid, path })
      },500);

    }).catch(()=>{
      wx.showToast({ title: '只限领取一次', icon:'none' });
      setTimeout(()=>{
        wx.navigateToMiniProgram({ appId: appid, path })
      },500);
   })

  },
})
