/**
 * 数组乱序算法
 * @param {*} arr
 */
function shuffle (arr) {
    for (let i = arr.length; i > 0 ; i--) {
        let swapIndex = Math.floor(Math.random() * i)
        [a[i], a[swapIndex]] = [a[swapIndex], a[i]]
    }
}
/**
 * 节流
 */
function throttle (fun, wait) {
    var timeout;
    return function () {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                fun.apply(this, arguments);
            }, wait);
        }
    }
}

/**
 * 去抖
 * @param {*} fun
 * @param {*} wait
 */
function debouce (fun, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fun.apply(this, arguments);
        }, wait);
    }
}

/**
 * 判断arr2是否是arr1的子集，都是有序有重复的
 * @param {*} arr1
 * @param {*} arr2
 */
function isSubSet (arr1, arr2) {
    let i = 0, j = 0;
    let startFlag = false;
    if (arr2.length > arr1.length) return false;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] > arr2[j]) {
            console.log(2)
            return '2';
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else {
            i++;
            j++;
        }
    }
    console.log(j >= arr2.length ? "1" : '2');
    return j >= arr2.length ? "1" : '2';
}

// isSubSet([1,2,3,6,8,8,10], [2,6,8])

/**
 * 获取arr中某数val，特点是val前面的数字比他小，后面的数字比他大
 * @param {*} arr
 */
function getMiddleValue (arr) {
    let left_max = [arr[0]];
    let right_min = [];
    right_min[arr.length - 1] = arr[arr.length - 1];
    for (let i = 1; i < arr.length; i++) {
        left_max[i] = arr[i] >= left_max[i-1] ? arr[i] : left_max[i-1];
    }
    for (let i = arr.length - 2;i >=0; i--) {
        right_min[i] = arr[i] <= right_min[i+1] ? arr[i] : right_min[i+1];
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= left_max[i] && arr[i] <= right_min[i]) {
            console.log(i, arr[i]);
        } else {
            console.log(-1);
            // return -1
        }
    }
}

getMiddleValue([9,7,8,11,5,6,66,45,110,100,99]);


/**
 * 二分
 * @param {*} array
 * @param {*} low
 * @param {*} high
 * @param {*} target
 */
function bsearchWithoutRecursion(array,low,high,target)
{
    while(low <= high)
    {
        var mid = Math.floor((low + high)/2);
        if (array[mid] > target){
            high = mid - 1;
        }else if (array[mid] < target){
            low = mid + 1;
        }else{
            return mid;
        }
    }
    return -1;
}


/**
 * 全排列
 * @param {*} string
 * 插空法 abc
 * 取出a，剩余"bc", 并形成三个间隔_b_c_
 */
function permutations(string) {
    if (string.length == 1) {
        return [string]
    } else {
        let result = []
        let preResult = permutations(string.slice(1))
        for (let i = 0; i < preResult.length; i++) {
            for (let j = 0; j < preResult[i].length + 1; j++) {
                let temp = preResult[i].slice(0, j) + string[0] + preResult[i].slice(j)
                result.push(temp)
            }
        }
        return result;
    }
}
