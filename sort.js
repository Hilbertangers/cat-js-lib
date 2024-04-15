function swap (arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
/**
 * 冒泡
 * @param {*} arr
 */
function bubbleSort1 (arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}

/**
 * 冒泡优化版
 * @param {*} arr
 */
function bubbleSort2 (arr) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        for (let i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(arr, i, i + 1);
            }
        }
        --right;
        for (let j = right; j > left; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j--);
            }
        }
        ++left;
    }
    return arr;
}

/**
 * 快排简单版
 * @param {*} arr
 */
function quickSort (arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr.pop();
    let left = arr.filter(item => item < pivot);
    let right = arr.filter(item => item >= pivot);
    return quickSort(left).concat([pivot], quickSort(right));
}

/**
 * 快排-原地分区版(空间复杂度为O(logn))
 * @param {*} arr
 */
function quickSort2 (arr) {
    function sort (arr, left, right) {
        if (left > right) return
        let pivotIndex = partition(arr, left, right)
        sort(arr, left, pivotIndex - 1)
        sort(arr, pivotIndex + 1, right)
    }

    function partition (arr, left, right) {
        let index = left
        let pivot = arr[right]
        for (let i = left; i < right; i++) {
            if (arr[i] < pivot) {
                swap(arr, index, i)
                index++
            }
        }
        swap(arr, index, right)
        return index;
    }

    sort(arr, 0, arr.length - 1)
    return arr;
}

/**
 * 归并排序
 * @param {*} arr
 */
function mergeSort (arr) {
    if (arr.length <= 1) return arr;
    let midIndex = Math.floor(arr.length / 2);
    let left = arr.slice(0, midIndex);
    let right = arr.slice(midIndex);
    return merge(mergeSort(left), mergeSort(right));
}

function merge (left, right) {
    var stash = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            stash.push(left.shift());
        } else {
            stash.push(right.shift());
        }
    }

    return stash.concat(left, right);
}

function mergeSort (arr) {
    if (arr.length > 0) return arr;
    let middleIndex = Math.floor(arr.length / 2);
    let left = arr.slice(0, middleIndex)
    let right = arr.slice(middleIndex)
    return merge(mergeSort(left), mergeSort(right))
}
function merge (left, right) {
    let stash = []
    while(left.length && right.length) {
        if (left[0] >= right[0]) {
            stash.push(right.shift())
        } else {
            stash.push(left.shift())
        }
    }
    return stash.concat(left, right)
}

/**
 * 插入排序
 * @param {*} arr
 */
function insertSort (arr) {
    for (let i = 1;i < arr.length; i++) {
        for (let j = i - 1; j>=0 && arr[j+1] < arr[j];j--) {
            swap(arr,j,j+1);
        }
    }
}

let testArr = [5, 2, 9, 6, 5, 5, 55, 66, 77, 13, 33, 46];

console.log(bubbleSort1(testArr));



var arr = [
    ['002', 21, '20180520'],
    ['003', 21, '20180520'],
    ['002', 21, '20180519'],
    ['001', 21, '20180420'],
]

let arrSort = (arr) => {
    let newArr = []
    newArr = arr.sort((a, b) => {
        if (a[0] - b[0] !== 0) {
            return a[0] - b[0]
        } else {
            return a[2] - b[2]
        }
    })
    console.log("🚀 ~ file: sort.js:160 ~ newArr=arr.sort ~ newArr:", newArr)
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
