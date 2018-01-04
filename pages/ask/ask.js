// pages/ask/ask.js
import _ from '../../utils/underscore.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOver: false,
    isPassAll:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (qo) {
    console.log("ask------onLoad--------", qo);
    this.isWaiting = false;
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
      cd:10, //单位是秒
      helpCD:3600000, //单位是毫秒
      helpTime:{m:60,s:0}
    })

    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    this.hcd_sid = setInterval(()=>{
      let time = this.data.helpCD-1000;
      let  m,s;
      console.log(time);
      if (time >= 0) {
        m = Math.floor(time / 1000 / 60 % 60);
        s = Math.floor(time / 1000 % 60);
      }
      this.setData({
        helpTime:{m,s},
        helpCD: time
      })
    },1000); 

    //wx.showToast({ title:'答题者'});

    // 如果为空则为答题者 
    // if (_.isEmpty(qo)){
      
    // }else{ //帮助者

    // }

      app.fetchData({
        func: 'answer.get_answer_info',
        u_level: qo.cid
      }).then(data=>{
        //console.log("ask--------->fetchData------->answer.get_answer_info",data);
        this.ask_sid = setInterval(()=>{
            let oldCd = this.data.cd;
            if(this.isWaiting) return ;
            if(oldCd < 1){
              clearInterval(this.ask_sid);
              clearInterval(this.hcd_sid);
              this.setData({ isOver:true});
              wx.showToast({ title: '时间到,您已放弃本次答题机会' });
            }else{
              this.setData({cd: --oldCd });
            }
        },1000);

        this.setData({answer:data});
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
      clearInterval(this.hcd_sid);
      clearInterval(this.ask_sid);
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
    let par = `a_id=${this.data.answer.a_progress}`;
    let title = `万能的圈圈让您发财`;
    let imageUrl = '';
    let path = 'pages/helper/helper?' + par;

    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) {
        //如果成功则禁用转发功能 因为是一对一的
       // wx.hideShareMenu();
        console.log('ask--------------onShareAppMessage------->', path)
      },
      fail: function (res) {
        // 转发失败
      }
    }    
  },

  checkAsk:function(e){
    console.log("ask----->checkAsk---------------->");
    if (this.isWaiting || this.data.isOver) return 
    let qid = e.target.dataset.qid;
    this.isWaiting = true;
    //TODO check-question 接口 核对
    app.fetchData({
      func:'answer.check_answer',
      q_an: qid
    }).then(data=>{
      console.log("answer.check_answer-------->",data);
      switch (data.is_correct){
          case 1 :{
            //更新问题数据 和 重置倒计时
            this.setData({ answer: data, cd: 10});
            this.isWaiting = false
            break;
          }
          case 2:{
            wx.showToast({ title: '答题失败' });
            clearInterval(this.hcd_sid);
            clearInterval(this.ask_sid);
            this.setData({isOver:true})
            break;
          }
          case 3:{
            wx.showToast({ title: '恭喜你过关了' });
            clearInterval(this.hcd_sid);
            clearInterval(this.ask_sid);
            break;
          }
      }
    });
  }
})