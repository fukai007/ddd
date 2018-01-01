Date.prototype.add = function (strInterval, Number) {
  let dtTmp = this;
  switch (strInterval) {
    case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
    case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
    case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
    case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
    case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
    case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
  }
}

/*
   @purpose 生成配送起始时间
   @createTime 2017-07-13 10:19
   @author miles_fk
*/
let makeStartTime = (now) => {
  let weekCount = now.getDay();
  let curHours = now.getHours();// 0 ~ 23
  switch (weekCount) {
    case 1: {//周一
      now = now.add('d', 2); //跳到周三
      console.log('case 3: //周三---->跳到周六...................');
      break;
    }
    case 2: {//周二
      if (curHours > 9) {
        now = now.add('d', 4); //跳到周六
        console.log('case 3: //周二---->跳到周六...................');
      } else {
        now = now.add('d', 1); //跳到周三
        console.log('case 3: //周二---->跳到周三...................');
      }
      break;
    }
    case 3: {
      now = now.add('d', 3); //跳到周六   //oldCode now  =  now.add('d',3);
      console.log('case 3: //周三---->跳到周六...................');
      break;
    }
    case 4: {//周四
      now = now.add('d', 2); //跳到周六
      console.log('case 3: //周三---->跳到周六...................');
      break;
    }
    case 5://周五
      if (curHours > 9) {
        now = now.add('d', 5); //跳到下周三   //oldCode now  =  now.add('d',3);
        console.log('case 5: //周五---->跳到下周日...................');
      } else {
        now = now.add('d', 1); //跳到周六
        console.log('case 5: //周五---->跳到下周六...................');
      }
      break;
    case 6: //周六
      now = now.add('d', 4); //跳到下周三 // now  =  now.add('d',2);
      console.log('case 6: //周六---->跳到下周三...................');
      break;
    case 0: //周日
      now = now.add('d', 3); //如果是周日跳转到下一周的周三
      console.log('case 6: //周日.---->如果是周日跳转到下一周的周三..................');
      break;
    default:
  }
  return now
}


const paddingLeft = (value, paddingValue) => (paddingValue + value).slice(- paddingValue.length)


/*
   @purpose 生成配送时间
   @createTime 2017-07-13 10:19
   @author miles_fk
*/

let makeWeekDayCascadeList = () => {
  let now = new Date();
  //let onDayTime =  24 * 60 * 60 * 1000; //一天的时间
  // let originalMoment = now.clone();  now.format('YYYY-MM-DD')
  let dateObject = [];
  /*
     PS
       1、周三、周五需要判断是否大于10点
       2、周六不需要，直接跳到下周三
       3、从周三开始
  */
  now = makeStartTime(now);


  let startYear = now.getFullYear();
  let startMonth = now.getMonth() + 1;
  let weekWordList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  for (let i = 0; i < 52; i++) {
    for (let j = 0; j < 3; j++) {
      let curYear = now.getFullYear(); //当前年
      let curMonth = now.getMonth(); //当前月
      let curWeekCount = now.getDay();//当前星期几

      //console.log('curWeekCount-1-after-6', curWeekCount);
      let curMonthIndex;
      let curRealMonth = curMonth + 1; //真是的月份

      //判断是否为本年
      if (curYear != startYear) {//不是本年则以月份为 index,防止覆盖上一年对应的数组下班数据
        curMonthIndex = curMonth;
      } else {    //是本年 则 以差值 为 index
        curMonthIndex = curRealMonth - startMonth; //当前月份InIndex
      }

      let curDay = now.getDate();  //当前日期
      let yearIndex = curYear - startYear;
      let curYearObject = dateObject[yearIndex];//获得年对象


      // 当前年对象是否存在
      if (!curYearObject) {
        dateObject.push({
          value: curYear,
          label: curYear + '年',
          children: []
        });
      }
      //获取本月对象
      let curMonthObject = dateObject[yearIndex].children[curMonthIndex] || null;
      if (!curMonthObject) {//判断是否有本月数据
        dateObject[yearIndex].children.push({
          value: curRealMonth,
          label: curRealMonth + '月',
          children: []
        });
      }
      //设置 真实数据
      dateObject[yearIndex].children[curMonthIndex].children.push({
        value: curYear + '-' + paddingLeft(curRealMonth, '00') + '-' + paddingLeft(curDay, '00'),
        label: curDay + `日 (${weekWordList[curWeekCount]})`
      });
      //console.log('for---->curWeekCount',curWeekCount );


      if (curWeekCount == 3) {
        now = now.add('d', 2); //如果是周三 则加到周五
      }

      if (curWeekCount == 0) {
        break;//如果周日跳出循环
      } else {
        now = now.add('d', 1);
      }
    }
    now = now.add('d', 3);
  }
  console.log('dateObject-------------->', dateObject);
  return dateObject;
}



module.exports = {
  makeWeekDayCascadeList
}
