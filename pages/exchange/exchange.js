// pages/exchange/exchange.js
import { makePar, extend } from '../../utils/util.js';

var exchangem = {
  data: {
    array: [
      { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: false },
      { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 3, isConversion: true },
      { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: true },
      { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: false },
      { name: '疯狂的小狗', text: '疯狂小狗精品狗粮', num: 2, isConversion: true }
    ]
  }
}
var exchangeh = extend(exchangem, {});
Page(exchangeh);