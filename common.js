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
        var args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                fun.apply(this, args);
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
        var args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fun.apply(this, args);
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

isSubSet([1,2,3,6,8,8,10], [2,6,8])
