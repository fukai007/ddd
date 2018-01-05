//index.js
import { makePar, extend } from '../../utils/util.js';
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo:{
      u_level:2
    },
    levelList:[
      {
        levelName : '幼儿园水平',
        levelInfo : 'xxxxx',
        levelId : 1,
      },
      {
        levelName: '小学水平A',
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
    }).catch(error=>{
      console("data-------->user.get_userinfo", error)
    });
    //app.wxLogin();
  },
  /*
    @purpose 跳转到答题页面
    @creatTime 2018-01-02 21:09:22
    @author miles_fk
  */
  toAsk:function(e){
    // toPage: function (pageName, paro, gotoType) 
    let levelId = e.target.dataset.levelid;

    app.toPage('tg', { cid: levelId},'to'); //跳转到答题页面
  }
})
