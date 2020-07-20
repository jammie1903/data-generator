import { generate, chance } from '../src';

describe('generators', () => {
  it('uses chance functions correctly', () => {
    const schema = {
      name: chance.name(),
      age: chance.age
    }
    const a = generate(schema, 1)
    const b = generate(schema, 1)
    const c = generate(schema, 3)

    expect(typeof a.name).toBe('string')
    expect(typeof a.age).toBe('number')

    expect(a.name).toBe(b.name)
    expect(a.age).toBe(b.age)

    expect(a.name).not.toBe(c.name)
    expect(a.age).not.toBe(c.age)
  })
})
