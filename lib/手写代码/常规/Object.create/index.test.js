const create = require('./index');

describe(`Object.create`, () => {
  it(`create null`, () => {
    expect(create(null).__proto__).toEqual(Object.create(null).__proto__);
   })
})