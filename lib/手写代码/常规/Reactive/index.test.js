function isObject(val) {
  return val !== null && typeof val === "object";
}

let targetMap = new WeakMap();
let activeEffect;

function track(target, key) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  // 建立副作用函数到包含他的集合的映射
  activeEffect.deps.add(dep);
  dep.add(activeEffect);
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;

  let dep = depsMap.get(key);
  if (!dep) return

  // 拿到触发时的副作用函数，防止后续重复添加导致死循环
  dep.forEach((effect) => {
    // 防止副作用函数中更改依赖，自己触发自己，爆栈。
    if (effect === activeEffect) return;
    if (effect.options.scheduler) {
      // 如果有scheduler，那么运行
      effect.options.scheduler();
    } else {
      effect();
    }
  });
}

function reactive(target) {
  if (!isObject(target)) {
    return;
  }
  const proxyValue = new Proxy(target, {
    get: (target, key) => {
      track(target, key); // 收集依赖
      const result = Reflect.get(target, key);
      // 如果get的结果是一个对象，那么把它变成响应式的再返回。
      if (isObject(result)) {
        return reactive(result);
      }
      return result;
    },
    set: (target, key, value) => {
      const result = Reflect.set(target, key, value);
      if (result !== value) {
        trigger(target, key); //  触发更新
      }
      return result;
    },
  });
  return proxyValue;
}

function effect(fn, options = {}) {
  function reactiveEffect() {
    activeEffect = reactiveEffect;

    // 运行之前，先清除依赖。
    const { deps } = activeEffect;
    if (deps) {
      deps.forEach((dep) => {
        dep.delete(activeEffect);
      });
    }
    const result = fn();
    // 运行后需要重置为空
    activeEffect = undefined;
    return result;
  }

  // 源码用数组优化空间，这里简单用set。
  reactiveEffect.deps = new Set();

  reactiveEffect.options = options;
  if (!options.lazy) {
    // 不自动运行一次收集依赖。
    reactiveEffect();
  }

  return reactiveEffect;
}

function computed(fn) {
  let obj = {};
  let cache;
  let dirty = true; // 可能会有新的变化
  const effectFn = effect(fn, {
    lazy: true,
    scheduler: () => {
      // 对应依赖发生变化，更新标志。
      dirty = true;
      trigger(obj, "value");
    },
  });
  Object.defineProperty(obj, "value", {
    get: () => {
      if (dirty) {
        dirty = false;
        // 依赖发生变化，更新cache
        console.warn("依赖变化，更新cache");
        cache = effectFn();
      }
      track(obj, "value");
      return cache;
    },
  });
  return obj;
}

// 1. node变成响应式
// 2. 当node属性变更会调用传入computed的回调函数
// 3. 需要缓存值，如果相同则不再计算
const node = reactive({
  leftChildren: 1,
  // rightChildren: 0
});
console.log(node.leftChildren, node.rightChildren); // 1 undefined

const children = computed(() => {
  console.log("computed");
  return node.leftChildren + (parseInt(node.rightChildren) || 0);
});
console.log(children.value, "should get: 1"); // 1

node.leftChildren = 10;
console.log(children.value, "should get: 10"); // 10

node.rightChildren = 2;
console.log(children.value, "should get: 12"); // 12

node.rightChildren = 2;
console.log(children.value, "should get: 12"); // 12
