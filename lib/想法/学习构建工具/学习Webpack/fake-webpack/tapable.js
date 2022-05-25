const { AsyncSeriesHook, AsyncParallelHook } = require("tapable");

const hook = new AsyncSeriesHook([])

hook.tap('sync1', () => {
  console.log('sync1')
})

hook.tapAsync('async1', (cb) => {
  console.log('async1 begin')
  setTimeout(() => {
    console.log('async1')
    cb()
  }, 1000)
})

hook.tapPromise('promise1', () => {
  return new Promise(resolve => {
    console.log('promise1 begin')
    setTimeout(() => {
      console.log('promise1')
      resolve()
    }, 1000)
  })
})

hook.callAsync(err => {
  console.warn(err)
})