const getType = obj => Object.prototype.toString.call(obj).slice(8, -1)

const deepCopy = (parent) => {
    const _copy = (parent) => {
        if (typeof parent !== 'object') {
            return parent
        }
        let child = null
        switch (getType(parent)) {
            case 'Array':
                child = []
            case 'RegExp':
                child = new RegExp(parent.source, parent.flag)
                if (parent.lastIndex) {
                    child.lastIndex = parent.lastIndex
                }
            case 'Date':
                child = new Date(parent.getTime())
            case 'Symbol':
                child = Symbol(String(parent).slice(7, -1))
            default:
                let proto = Object.getPrototypeOf(parent)
                child = Object.create(proto)
        }
        for (let i in parent) {
            child[i] = _copy(parent[i])
        }
        return child
    }
    return _copy(parent)
}
