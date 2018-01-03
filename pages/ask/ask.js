// pages/ask/ask.js
import _ from '../../utils/underscore.js';
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
  onLoad: function (qo) {
    console.log("ask------onLoad--------", qo);
    this.isChecking = false;
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
      cd:10,
    })

    //wx.showToast({ title:'答题者'});

    // 如果为空则为答题者 
    // if (_.isEmpty(qo)){
      
    // }else{ //帮助者

    // }

      app.fetchData({
        func: 'answer.get_answer_info',
        u_level: qo.cid
      }).then(data=>{
        console.log("ask--------->fetchData------->answer.get_answer_info",data);
        
        this.sid = setInterval(()=>{
          let oldCd = this.data.cd;
          if(oldCd < 1){
            clearInterval(this.sid);
            wx.showToast({ title: '答题已超时' });
          }else{
            this.setData({
              cd: --oldCd
            });
          }

        },1000);

        this.setData({
          answer:data
        });

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

  checkAsk:function(e){
    let qid = e.target.dataset.qid;
    this.isChecking = true;
    //TODO check-question 接口 核对
    app.fetchData({

    });
  }
})