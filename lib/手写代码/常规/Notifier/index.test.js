const Notifier = require("./index");

describe(`观察者模式测试`, () => {
  it(`测试add/remove/notify方法`, () => {
    const log = [];
    class Observer {
      constructor(name) {
        this.name = name;
      }
      update() {
        log.push(this.name);
      }
    }
    const n = new Notifier();
    const louis = new Observer('louis');
    const tom = new Observer('tom');
    n.add(louis);
    n.add(tom);
    n.notify();
    n.remove(tom);
    n.notify();
    expect(log).toEqual(['louis', 'tom', 'louis']);
  });
});
