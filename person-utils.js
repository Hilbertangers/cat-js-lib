const os = require('os');

function getIPAdress() {
　　let interfaces = os.networkInterfaces();
　　for (var devName in interfaces) {
　　　　var iface = interfaces[devName];
　　　　　　for (var i = 0; i < iface.length; i++) {
　　　　　　　　let {family, internal, address} = iface[i];
　　　　　　　　if (family === 'IPv4' && !internal && /^172\.18/.test(address)) {
　　　　　　　　　　return address;
　　　　　　　　}
　　　　　　}
　　}
}

/**
 * 颜色线性插值
 * @param {String} a 开始颜色 色值
 * @param {*} b 结束颜色 色值
 * @param {*} amount 数组数量
 * @param {*} index 插值index
 */
export function interpolateColor (start, end, amount, index) {
    const ah = parseInt(start.replace(/#/g, ''), 16);
    const ar = ah >> 16;
    const ag = (ah >> 8) & 0xff;
    const ab = ah & 0xff;
    const bh = parseInt(end.replace(/#/g, ''), 16);
    const br = bh >> 16;
    const bg = (bh >> 8) & 0xff;
    const bb = bh & 0xff;
    const rr = ar + index * (br - ar) / amount;
    const rg = ag + index * (bg - ag) / amount;
    const rb = ab + index * (bb - ab) / amount;

    return (
        '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
    );
};

/**
 * 色值转换rgb
 * @param {String} color 色值
 */
export function HEXToRGB (color) {
    const ah = parseInt(color.replace(/#/g, ''), 16);
    const ar = ah >> 16;
    const ag = (ah >> 8) & 0xff;
    const ab = ah & 0xff;

    return `rgb(${ar}, ${ag}, ${ab})`;
};

/**
 * rgb添加opacity为rgba
 * @param {String} color rgb
 */
export function RGBToRGBA (color, alpha = 0.85) {
    return `rgba(${color.replace(/^rgb\(|\)$/g, '')}, ${alpha})`;
};

/**
 * hex添加透明度，有点问题有时间研究下
 * @param {String} color hex
 * @param {Number} alpha 0~1
 */
export function maskingColor (color, alpha = 0.85) {
    const ah = parseInt(color.replace(/#/g, ''), 16);
    const ar = (ah >> 16) * alpha + 255 * (1 - alpha);
    const ag = ((ah >> 8) & 0xff) * alpha + 255 * (1 - alpha);
    const ab = (ah & 0xff) * alpha + 255 * (1 - alpha);

    return (
        '#' + (((1 << 24) + (ar << 16) + (ag << 8) + ab) | 0).toString(16).slice(1)
    );
};

/**
 * 用于vue自定义指令：比率颜色自动变更
 * 深度优先遍历vnode中的第一个浮点数，以它为标准决定颜色
 */
export function rateColor (el, binding, vnode) {
    let findText = node => {
        if (!node || !node.children) return;
        let _stack = [];
        let text = '';
        _stack.unshift(node);

        while (_stack.length) {
            let _curNode = _stack.shift(); // 推出栈顶元素
            if (/^\s*(?:[-+]?\d+)(?:\.\d+)?\s*%?\s*$/g.test(_curNode.text)) {
                text = _curNode.text.replace(/^\s*|%?\s*$/g, '');
                break;
            }
            if (_curNode.children && _curNode.children.length > 0) {
                _stack = _curNode.children.concat(_stack);
            }
        }
        return text;
    };
    let val = findText(vnode);
    let colorMap = binding.value ? binding.value : { up: '#ce323a', down: '#2DB464', equal: '#666' };
    if (val) {
        let color = val => {
            if (val > 0) {
                return colorMap.up;
            } else if (val < 0) {
                return colorMap.down;
            } else {
                return colorMap.equal;
            }
        };
        el.style.color = color(Number(val));
    } else {
        el.style.color = '';
    }
};

export const clickOutside = {
    bind: function (el, binding, vnode) {
        el.event = function (event) {
            // 检查点击是否发生在节点之内（包括子节点）
            if (!(el == event.target || el.contains(event.target))) {
                // 如果没有，则触发调用
                // 若绑定值为函数，则执行
                if (typeof vnode.context[binding.expression] == 'function') {
                    vnode.context[binding.expression](event);
                }
            }
        };
        // 绑定事件
        // 设置为true，代表在DOM树中，注册了该listener的元素，会先于它下方的任何事件目标，接收到该事件。
        document.body.addEventListener('touchstart', el.event, true);
    },
    unbind: function (el) {
        // 解绑事件
        document.body.removeEventListener('touchstart', el.event, true);
    }
};

/**
 * 给函数方法添加可控的延时flag
 * @param {*} func 待执行函数
 */
export function funProcessControl (func) {
    let flag = true;
    return function () {
        let context = this;
        let args = arguments;
        if (flag) {
            flag = false;
            let result = func.apply(context, args);
            // 约定:func返回over代表请求执行结束
            Promise.resolve(result).then(res => {
                if (res === 'over') {
                    flag = true;
                }
            });
        }
    };
}

/**
 * Fuse bitap 里的精准定位
 * @param {*} text
 * @param {*} pattern
 */
export function strInclude(text, pattern) {
    let mask = 1 << (pattern.length - 1);
    let alphabet = {};
    let bitArr = Array(text.length);
    let result = false;
    bitArr[0] = 0;
    for (let i = 0; i < pattern.length; i++) {
        alphabet[pattern.charAt(i)] = 0;
    }
    for (let i = 0; i < pattern.length; i++) {
        alphabet[pattern.charAt(i)] |= (1 << i);
    }

    for (let i = 1; i <= text.length; i++) {
        let charMatch = alphabet[text.charAt(i)];

        bitArr[i] = ((bitArr[i - 1] << 1) | 1) & charMatch;

        if (bitArr[i] & mask) {
        result = true;
        break;
        }
    }

    return result;
};
