1. 构造响应式对象
  initState => initData => defineReactive

2. 依赖收集
  mountComponent => new Watcher() => vm._render() 触发响应对象的getter => Dep.target.addDep(this) => Watcher内部的deps添加dep
  <br >
  依赖清空：
  数据更新时，会再次调用vm._render(),需要清空Watcher。<br>
  使用空间置换。watcher内部有两个依赖数组，deps和newDeps

3. 派发更新
  setting => dep.notify => 循环subs数组（上面的deps）=> 放入nextTick更新数组 => 更新
