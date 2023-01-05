function _new () {
    let obj = new Object()
    let _construction = [].shift.call(arguments)
    // prototype
    obj._proto_ = _construction.prototype
    // this
    let result = _construction.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
