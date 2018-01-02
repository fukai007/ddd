//index.js
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
      this.setData({
        userInfo: data,//app.globalData.userInfo,
        hasUserInfo: true
      })
      app.globalData.userInfo = data;
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
    let levelId = e.target.dataset.levelId;

    app.toPage('ask', { cid: levelId},'to'); //跳转到答题页面
  }
})
