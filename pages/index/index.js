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
    }).then(()=>{
      return app.fetchData({
        func:'user.get_user_prize'
      })
    }).then(data=>{
      let {} = data;
      console.log("data---------------------->",data);
      if (is_receive){
        wx.showModal({
          title: '提示',
          content: '这是一个模态弹窗',
          success: function (res) {
            if (res.confirm) {
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
    console.log("levelId--------------------------------->", levelId);
    setTimeout(function(){
        app.toPage('ask', { cid: levelId }, 'to'); //跳转到答题页面
    },400);
    
  }
})
