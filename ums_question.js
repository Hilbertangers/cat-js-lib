var arr = [
  ['002', 21, '20180520'],
  ['003', 21, '20180520'],
  ['002', 21, '20180519'],
  ['001', 21, '20180420'],
]

let arrSort = (arr) => {
  let newArr = []
  // 获取sort返回
  newArr = arr.sort((a, b) => {
      // 判断渠道号是否重复
      if (a[0] - b[0] !== 0) {
          // 不重复的按渠道号排序
          return a[0] - b[0]
      } else {
          // 重复的按日期大小排序
          return a[2] - b[2]
      }
  })
  // 返回结果
  return newArr
}
arrSort(arr)
// 0 1 1 2 3 5

function fibonacci(n) {
  const arr = [0, 1];
  for (let i = 2; i <= n - 1; i++) {
    arr[i] = arr[i-2] + arr[i-1];
  }
  console.log(arr.join(''))
  return arr[n - 1];
}


fibonacci(2)

/**
*
* @param {*} hexCharCodeStr
* @returns
*/
function hex2Ascll(hexCharCodeStr) {
  var trimedStr = hexCharCodeStr.trim();
  var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
  var len = rawStr.length;
  if (len % 2 !== 0) {
    console.log('存在非法字符')
    return "";
  }
  var curCharCode;
  var resultStr = [];
  for (var i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16);
    resultStr.push(String.fromCharCode(curCharCode));
  }
  console.log(resultStr.join(""))
  return resultStr.join("");
}

function handleInfo(arr) {
  let name = arr[0];
  let amount = arr[1];
  let point = arr[2];
  let result = ['', '', ''];

  if (name) {
      result[0] = `渠道商名称：${hex2Ascll(name)}`
  }

  if (amount) {
      result[1] = `优惠金额：${amount}`
  }

  if (point) {
      result[2] = `积分：${point}`
  }
  console.log(result.join('\n'))
  return result.join('\n')
}

handleInfo(['2141', '10', '99'])



function isShuiXianHua(param_1) {
  let num = param_1
  let a = parseInt(num/100)
  let b = parseInt(num%100/10)
  let c = parseInt(num%100%10)
  let sum = Math.pow(a, 3) + Math.pow(b, 3)+Math.pow(c, 3)
  if (sum === num) {
      console.log('yes')
  } else {
      console.log('no')
  }
  return sum === num
}
isShuiXianHua(154)


function test1(params_1) {
  let str = params_1.split('')
  for (let i = 0;i < str.length; i++) {
      if (str[i].charCodeAt() >= 65 && str[i].charCodeAt() <= 90) {
          str[i] = str[i].toLowerCase()
      } else {
          str[i] = str[i].toUpperCase()
      }
  }
  console.log(str.join(''))
  return str.join('')
}

test1('abE')

function main(params_1) {
  let dateStr = params_1
  let weekDay = ['星期日','星期一', '星期二','星期三','星期四','星期五','星期六',]
  let myDate = new Date(Date.parse(dateStr))
  console.log(weekDay[myDate.getDay()]);
}
main('2018-07-25')
