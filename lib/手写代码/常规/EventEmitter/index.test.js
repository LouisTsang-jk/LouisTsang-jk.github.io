const EventEmitter = require("./index");

describe(`发布订阅测试`, () => {
  it(`发布订阅测试`, () => {
    const baseEvent = new EventEmitter();
    let obj = {
      a: 0,
      b: 0
    };
    function increase (key) {
      obj[key]++;
    }
    baseEvent.on('increase', () => increase('a'));
    baseEvent.once('increase', () => increase('b'));
    baseEvent.emit('increase');
    baseEvent.emit('increase');
    const expectRes = {
      a: 2,
      b: 1
    }
    expect(obj).toEqual(expectRes);
   })
})