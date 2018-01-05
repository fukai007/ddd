// pages/fua/fua.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cd: 99, 
    isOver:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let a_id = options.a_id;
    app.fetchData({
      func:'help.get_helper',a_id
    }).then(data=>{
        this.setData({
          answer:data
        })
        this.startCd(data);
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
    if(this.data.isOver) return ;

    let qid = e.target.dataset.qid;

    this.setData({
      isOver: true,
      sqid:qid
    });
  },

  startCd: function (qd){
    this.data.cd = qd.help_time || 99;
    this.ask_sid =  setInterval(() => {
      let oldCd = this.data.cd;
      if (oldCd < 1) {
        clearInterval(this.ask_sid);
        this.setData({isOver:true});
        wx.showToast({ title: '答题已超时' });
      } else {
        this.setData({ cd: --oldCd });
      }
    }, 1000);
  },

  toIndex:function(){
      app.toPage('index',{});
  }

})