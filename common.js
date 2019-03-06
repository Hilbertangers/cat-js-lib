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

