// pages/exchange/exchange.js
import { makePar, extend } from '../../utils/util.js';
const app = getApp();

var exchangem = {
  /**
   * 页面的初始数据
   */
  data: {
    volume: 0,
    array: [
      // { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: false },
      // { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 3, isConversion: true },
      // { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: true },
      // { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: false },
      // { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: true }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.fetchData({
      func: 'exchange_goods.all'
    }).then(data => {
      this.setData({
        volume: data.price,
        array: data.list
      });
    })
  },
  /**
   * 兑换商品
   */
  exchangeGoods: function (e) {
    var id = e.currentTarget.dataset.id;  
    app.fetchData({
      func: 'exchange_goods.pay',
      eg_id: id
    }).then(data => {
      console.log('exchangeGoods---------data-------------------->',data);
      app.toPage('address', { ga_id: data.egl_id, gr_type: 2});
    })
  }
}
var exchangeh = extend(exchangem, {});
Page(exchangeh);