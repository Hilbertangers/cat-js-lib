// 09. 用两个栈实现队列
// https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/
class CQueue {
  stack1: number[];
  stack2: number[];
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  appendTail(value: number): void {
    this.stack1.push(value);
    return null;
  }

  deleteHead() {
    if (!this.stack1.length && !this.stack2.length) {
      return -1;
    }
    if (this.stack2.length) {
      return this.stack2.pop();
    } else {
      while(this.stack1.length) {
        this.stack2.push(this.stack1.pop());
      }
      return this.stack2.pop();
    }
  }
}

/**
* Your CQueue object will be instantiated and called as such:
* var obj = new CQueue()
* obj.appendTail(value)
* var param_2 = obj.deleteHead()
*/

// 30.包含min函数的栈
// https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/
class MinStack {
  stack: number[];
  minIndexList: number[];
  constructor() {
    this.stack = [];
    this.minIndexList = [];
  }

  push(x: number): void {
    this.stack.push(x);
    const index = this.stack.length - 1;
    if (index === 0) {
      this.minIndexList.push(index);
    } else {
      const _index = this.stack[this.minIndexList[index - 1]] > x ? index : this.minIndexList[index - 1];
      this.minIndexList.push(_index)
    }
  }

  pop(): void {
    this.stack.pop();
    this.minIndexList.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  min(): number {
    const index = this.minIndexList[this.minIndexList.length - 1]
    return this.stack[index];
  }
}
