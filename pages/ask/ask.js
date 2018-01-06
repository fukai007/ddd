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
    isShowHelpUI:false, //是否显示帮助显示浮层-2018-01-05 11:26
    answer:{},
    cd:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (qo) {
    console.log("ask------onLoad--------", qo);
    this.isWaiting = false;
    let that = this;
    app.fetchData({
      func: 'answer.get_answer_info',
      level: qo.cid
    }).then(data=>{
      console.log("ask--------->fetchData------->answer.get_answer_info",data);

      try {
        //在这里运行代码
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          answer: data,
          cd: data.answer_time,
          helpCD: data.help_time
        })
      }
      catch (err) {
        console.log(err);
      }
    }).then(()=>{
      this.ask_sid = setInterval(() => {
        let oldCd = this.data.cd;
        if (this.isWaiting) return;
        if (oldCd < 1) {
          clearInterval(this.ask_sid);
          clearInterval(this.hcd_sid);
          this.setData({ isOver: true });
          wx.showToast({ title: '时间到,您已放弃本次答题机会' });
        } else {
          this.setData({ cd: --oldCd });
        }
      }, 1000);
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
    //let par = `a_id=${this.data.answer.a_progress}`;
    let par = '';
    let title = `万能的圈圈让您发财`;
    let imageUrl = '';
    let path = 'pages/helper/helper?' + par;
    let that = this;

    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) {
        //如果成功则禁用转发功能 因为是一对一的
       // wx.hideShareMenu();
        console.log('ask--------------onShareAppMessage------->', path)
        that.setData({
          isShowHelpUI:true
        })
        that.startHelpCD();
      },
      fail: function (res) {
        // 转发失败
      }
    }    
  },

  /*
      @purpose 再次尝试在支付后
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
      @parm
          answer.q_id
  */
  tryIt:function(){
    let that = this;
    this.isWaiting = true;
    app.fetchData({ 
        func: 'resurrection.resurrection',
        a_id: this.data.answer.a_id
    }).then(data=>{
      data.timeStamp = data.timeStamp+'';
      data.success=function(){
        that.setData({
          isOver:false,
          cd:10
        });
        this.isWaiting = false;
      }
      data.fail = function(error){
        this.isWaiting = false;
        wx.showToast(支付失败);
      }
      try{
        wx.requestPayment(data);
      }catch(e){
          console.log(e);
      }
      
    })
  },
  
  /*
      @purpose 核对问题
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
  */
  checkAsk:function(e){
    console.log("ask----->checkAsk---------------->");
    if (this.isWaiting || this.data.isOver) return 
    let qid = e.target.dataset.qid;
    this.cur_qid = qid;
    this.isWaiting = true;
    //TODO check-question 接口 核对
    app.fetchData({
      func:'answer.check_answer',
      q_an: qid
    }).then(data=>{
      console.log("answer.check_answer-------->",data);
      switch (data.is_correct){
          case 1 :{
            //更新问题数据 、重置倒计时 、选了谁
            this.setData({ answer: data, cd: 10});
            this.isWaiting = false;
            this.cur_qid = false;
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
  },
    /*
      @purpose 开启帮助
      @createTIme 2018-01-06 08:47:58
      @author miles_fk
  */
  startHelpCD: function(){
    this.isWaiting = true;
    this.hcd_sid = setInterval(()=>{
      let time = this.data.helpCD-1;
      let  m,s;
      console.log(time);
      if (time < 0) {
        let sid = this.hcd_sid ;
        clearInterval(sid)//清除帮助倒计时器
        this.isWaiting = false;

        this.setData({
          cd: this.data.answer_time,
          helpCD: this.data.help_time,
          isShowHelpUI:false
        })

      }else{
        this.setData({
          helpCD: time
        })
        this.getFabulous();
      }
    },1000); 
    this.setData({
      isShowHelpUI:true
    })
  },
  getFabulous: function () {
    let a_id = this.data.answer.q_id;
      app.fetchData({
        func:'help.fabulous_num',
        a_id: a_id,
        noloadding:true
      }).then(data=>{
        this.setData({ tipInfo: data});
      });
  }
})


// this.hcd_sid = setInterval(()=>{
//   let time = this.data.helpCD-1000;
//   let  m,s;
//   console.log(time);
//   if (time >= 0) {
//     m = Math.floor(time / 1000 / 60 % 60);
//     s = Math.floor(time / 1000 % 60);
//   }
//   this.setData({
//     helpTime:{m,s},
//     helpCD: time
//   })
// },1000); 