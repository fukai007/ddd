const SERVER = 'https://wxapp.haizeihuang.com/wannengdequan_php/'; 
const fetchErrorInfo = '服务器忙请稍后再试\n谢谢您的理解';
import { makePar } from './utils/util';
import { Promise } from './utils/es6-promise.min';
import _ from './utils/underscore.js';

let endpoint={
  getOpenId: 'user.get_openid',
}


//app.js
App({
  onLaunch: function (){
  },
  globalData: {
    userInfo: null
  },
  /*
      @purpose  微信登录
      @createTime 2017-09-03 09:14
      @author  miles_fk

  */
  wxLogin: function () {
    var that = this;
    var whiteList = this.globalData.whiteList;
    var wxLoginPromise = new Promise(function (resolve, reject) {
      wx.login({ //微信登录接口-微信提供的  res.code 到后台换取 openId, sessionKey, unionId
        success: function (res) {
          console.log("wxLogin------->wx.login----------------->", res);
          //decryptMpCode  解code的 测试  mpLogin
          that.fetchDataBase({ code: res.code, func:endpoint.getOpenId}, function (loginRes) {
            console.log("wxLogin------->wx.login------------mpLogin--loginRes--->", loginRes);
            let data = loginRes;
            that.globalData.openid = data.openid;
            that.globalData.session_key = data.session_key; //存储 微信会话key
            that.globalData.union_id = data.union_id;  // 微信端用户唯一id
            resolve();
          })
        },
        fail: function (e) {
          wx.showToast({ title: e.errMsg || fetchErrorInfo, image: "../../images/error-a.png" });
          reject({ isError: true });
        },
        complete: function (e) { }
      })
    });
    return wxLoginPromise
  },  
  /*
    @purpose  请求数据基础包裹请求数据和判断登录
    @createTime 2017-09-03 09:14
    @author  miles_fk
*/
  fetchData: function (qo) {
    wx.showLoading({ title: '数据加载中' });
    let that = this;
    var fetchDataPromise = new Promise(function (resolve, reject) {
      if (that.globalData.openid) { //已登录不需要重新请求 logIn
        qo.openid = that.globalData.openid;
        that.fetchDataBase(qo, resolve);
      } else {
        that.wxLogin().then((value) => { //登录成功执行业务请求接口
          qo.openid = that.globalData.openid || 0;
          that.fetchDataBase(qo, resolve);
        }).catch((err) => {//失败则执行 失败方案
          reject(err)
        })
      }
    });

    return fetchDataPromise
  },
      /*
      @purpose  请求数据基础函数
      @createTime 2017-09-03 09:14
      @author  miles_fk
      fetchDataBase: (endpoint, qo, okcb, fallcb) 现在不需要 endpoint 根据参数区分
  */
  fetchDataBase: (qo, okcb, fallcb) => {
    //console.log("fetchDataBase------start----------------->", endpoint,qo);
    //var that = this;
    wx.request(
      Object.assign({
        url: SERVER,
        data: qo,
        method: 'POST',
        //header: {'content-type': 'application/json'},
        header:{
         'content-type':'application/x-www-form-urlencoded'
        },
        success: res => {
          wx.hideLoading();
          let that  = getApp();
          let code = res.data.code;
          //console.log("fetchDataBase--success--------------->", res);
          let rd = res.data.response;

          //TODO 0  为没有错误
          if ((code != void 0) && code == 0) {        
            okcb(rd);
          } else {
            let errInfo = res.data.errmsg || fetchErrorInfo;
            wx.hideLoading();
            wx.showToast({ title: errInfo, image: "../../images/error-a.png" });
            console.log("fetchDataBase---errInfo----------endpoint------->", endpoint, errInfo);
          }
        },
        fail: function(res) {
          let errInfo = fetchErrorInfo || res.errMsg;
          if(res.data){
            errInfo = res.data.errmsg ;
          }else{
            wx.showToast({ title: errInfo, image: "../../images/error-a.png" });
          }
        },
        complete:function(e){
            console.log("fetchDataBase--complete----->");
        }
      })
    )
  },
  /*
    @purpose 基础 跳转函数
    @createTime 2017-09-03 09:14
    @author  miles_fk
    @par
      pageName 跳转地址
      par 携带的参数
      gotoType 调用那个api to --> navigateTo
*/
  toPage: function (pageName, paro, gotoType) {
    if (pageName == "") return;
    let url = "";
    console.log('toPage---paro-------->', paro);
    if (paro) {
      let ps = makePar(paro);
      url = `/pages/${pageName}/${pageName}${ps}`
    } else {
      url = `/pages/${pageName}/${pageName}`
    }

    //console.log('toPage---url-------->',url);

    let rpo = {
      url: url,
      fail: function (e) {
        console.log("wx.navigate-fail------>", e);
      },
      complete: function (e) {
        console.log("wx.navigate-complete------>", e);
      }
    }
    switch (gotoType) {
      case "to":
        wx.navigateTo(rpo)
        break;
      case "rel":
        wx.reLaunch(rpo)
        break;
      default:
        wx.redirectTo(rpo)
    }
  },
})



    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           // if (this.userInfoReadyCallback) {
    //           //   this.userInfoReadyCallback(res)
    //           // }
    //         }
    //       })
    //     }
    //   },
    //   fail: error => console.log("wx.getUserInfo----------->error", error)
    // })