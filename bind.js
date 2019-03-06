Function.prototype.bind = function (context) {

    if (typeof this !== 'function') {
        throw new Error('error')
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var funBind = function () {
        var _ctx = this instanceof funBind ? this : context;
        var argsBind = Array.prototype.slice.call(argument);
        return self.apply(_ctx, args.concat(argsBind));
    }
    var fMiddle = function(){}
    fMiddle.prototype = this.prototype
    funBind.prototype = new fMiddle()
    return funBind;
}