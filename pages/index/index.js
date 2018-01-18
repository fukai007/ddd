//index.js
import { makePar, extend } from '../../utils/util.js';
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo:{
      u_level:0
    },
    levelList:[
      {
        levelName: '出生水平',
        levelInfo: 'xxxxx',
        levelId: 0,
      },
      {
        levelName: '幼儿园水平',
        levelInfo: 'xxxxx',
        levelId: 1,
      },
      {
        levelName: '小学水平',
        levelInfo: 'xxxxx',
        levelId: 2,
      },
      {
        levelName: '初中水平',
        levelInfo: 'xxxxx',
        levelId: 3,
      },
      {
        levelName: '高中水平',
        levelInfo: 'xxxxx',
        levelId: 4,
      },
      {
        levelName: '大学水平',
        levelInfo: 'xxxxx',
        levelId: 5,
      }
    ]
  },
  onLoad: function () {
    app.fetchData({func:'user.get_userinfo'}).then(data=>{
      console.log("data-------->user.get_userinfo",data)
      let oldUserInfo = app.globalData.userInfo
      let newUserInfo = extend(oldUserInfo,data);
      app.globalData.userInfo = newUserInfo
      this.setData({
        userInfo: newUserInfo,//app.globalData.userInfo,
        hasUserInfo: true
      })
      return newUserInfo
    }).then(info=>{
      //let info = app.globalData.userInfo;
      app.fetchDataBase({
        func: 'user.save_userinfo',
        openid: app.globalData.openId,
        ...info
      });

      return app.fetchData({
        func:'user.get_user_prize'
      })
    }).then(data=>{
      console.log("data---------------------->", data);
      let {is_receive} = data;
      if (is_receive){
        wx.showModal({
          title: '温馨提示',
          content: '奖学金已派发，点击确认进我的账户查看(或者提现)',
          success: function(res){
            if (res.confirm) {
              app.toPage('accountMain', {}, 'to'); //跳转到答题页面
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      return data;
    }).catch(error=>{
      console("data-------->user.get_user_prize", error)
    });
    this.setUserInfo();
    //app.wxLogin();
  },
  /*
    @purpose 定时器-获得userInfo
    @creatTime 2018-01-02 21:09:22
    @author miles_fk
  */
  setUserInfo:function(){
    let that = this;
    let sid = setInterval(function(){
      let info = app.globalData.userInfo;
      if (info.nickName){
        that.setData({
          userInfo: info,//app.globalData.userInfo,
        })
        clearInterval(sid);
      }
    },500);
  },
  /*
    @purpose 跳转到答题页面
    @creatTime 2018-01-02 21:09:22
    @author miles_fk
  */
  toAsk:function(e){
    // toPage: function (pageName, paro, gotoType)
    let that = this;
    let levelId = e.target.dataset.levelid;
    let ticket = this.data.userInfo.u_ticket;
    console.log("levelId--------------------------------->", levelId);
    if (ticket == 0){
      wx.showModal({
        title: '请购买入场券',
        content: '购买后从幼儿园开始',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.getTicket();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      setTimeout(function () {
        app.toPage('ask', { cid: levelId }, 'to'); //跳转到答题页面
      }, 500);
    }
  },
  toRule:function(){
    app.toPage('askRule', {}, 'to'); //跳转到答题页面
  },
  toac:function(){
    app.toPage('accountMain', {}, 'to'); //跳转到答题页面
  },
  getTicket(){
    app.fetchData({
      func:'resurrection.resurrection'
    }).then(data=>{
      if (data.payType === 'balance') {
        wx.showToast({
          title: '余额支付成功',
        })
        app.toPage('ask', { cid: 1 })
        return;
      }else{
        data.timeStamp = data.timeStamp + '';
        data.success = function () {
          // that.setData({isOver:false,cd:10 });
          // wx.showShareMenu() //允许分享
          // that.isWaiting = false; //取消等待
          // this.isQuestionShare = false;
          app.toPage('ask', { cid: 1 })
        }
        data.fail = function (error) {
          that.isWaiting = false;
          wx.showToast(支付失败);
        }
        try {
          wx.requestPayment(data);
        } catch (e) {
          console.log(e);
        }
      }

    })
  }
})
