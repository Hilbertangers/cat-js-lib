function Dad () {
    this.name = '爸爸'
    this.firstName = '张'
}

function Son () {
    Dad.call(this)
    this.name = '儿子'
}
// 寄生
var fun = function () {}
fun.prototype = Dad.prototype;
Son.prototype = new fun();

