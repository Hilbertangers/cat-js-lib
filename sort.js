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

console.log(quickSort2(testArr));
