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
  activeEffect.deps.add(dep);
  dep.add(activeEffect);
}

function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;
  let dep = depsMap.get(key);
  if (!dep) return;
  dep.forEach((effect) => {
    if (effect === activeEffect) return;
    if (effect.options.scheduler) {
      effect.options.scheduler();
    } else {
      effect();
    }
  });
}

function reactive(target) {
  if (!isObject(target)) return;
  const proxyValue = new Proxy(target, {
    get: (target, key) => {
      track(target, key);
      const result = Reflect.get(target, key);
      return isObject(result) ? reactive(result) : result;
    },
    set: (target, key, value) => {
      const result = Reflect.set(target, key, value);
      if (result !== value) {
        trigger(target, key);
      }
      return result;
    },
  });
  return proxyValue;
}

function effect(fn, options = {}) {
  function reactiveEffect() {
    activeEffect = reactiveEffect;
    const { deps } = activeEffect;
    deps?.forEach((dep) => {
      dep.delete(activeEffect);
    });
    const result = fn();
    activeEffect = undefined;
    return result;
  }
  reactiveEffect.deps = new Set();
  reactiveEffect.options = options;
  if (!options.lazy) {
    reactiveEffect();
  }
  return reactiveEffect;
}

function computed(fn) {
  let obj = {};
  let cache;
  let dirty = true;
  const effectFn = effect(fn, {
    lazy: true,
    scheduler: () => {
      dirty = true;
      trigger(obj, "value");
    },
  });
  Object.defineProperty(obj, "value", {
    get: () => {
      if (dirty) {
        dirty = false;
        cache = effectFn();
      }
      track(obj, "value");
      return cache;
    },
  });
  return obj;
}

const node = reactive({
  leftChildren: 1,
  // rightChildren: 0
});
console.log(node.leftChildren, node.rightChildren); // 1 undefined

const children = computed(() => {
  return node.leftChildren + (parseInt(node.rightChildren) || 0);
});
console.log(children.value, "should get: 1"); // 1

node.leftChildren = 10;
console.log(children.value, "should get: 10"); // 10

node.rightChildren = 2;
console.log(children.value, "should get: 12"); // 12

node.rightChildren = 2;
console.log(children.value, "should get: 12"); // 12
