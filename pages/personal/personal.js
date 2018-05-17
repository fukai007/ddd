//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'a',
    isLoadding:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("app------data-->",app.globalData);
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
    app.fetchData({
      func:'exchange_goods.log'
    }).then(data=>{
      this.setData({
        price: data.price,
        elist: data.log,
        pimg: app.globalData.userInfo.avatarUrl,
        isLoadding:false
      });
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
  onShareAppMessage: function () {
    
  },

  toex: function () {
    app.toPage('exchange', {}, 'to'); //跳转到账户页面
  },

  /**
   * 切换至兑换记录模式&&请求数据-2018-05-17 16:44:26
   */
  setTypeA:function(){
    if (this.data.isLoadding) return ;


    this.setData({type:'a'})
    app.fetchData({
      func: 'exchange_goods.log'
    }).then(data => {
      this.setData({
        price: data.price,
        elist: data.log,
        pimg: app.globalData.userInfo.avatarUrl,
        isLoadding: false
      });
    })

  },
   /**
   * 切换至获奖记录模式&&请求数据-2018-05-17 16:44:26
   */
  setTypeB: function () { 
    if (this.data.isLoadding) return;

    this.setData({ type: 'b' }) 

    app.fetchData({
      func: 'goods.send_prize_log'
    }).then(data => {
      this.setData({
        plist: data.log,
        isLoadding: false
      });
    }).catch(()=>{
      this.setData({ isLoadding: false }) 
    })

  },
})