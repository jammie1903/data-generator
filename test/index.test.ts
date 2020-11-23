import { generate, chance, array } from '../src';

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

  it('handles nested objects and literals', () => {
    const schema = {
      name: chance.name,
      dob: chance.birthday({ type: 'adult' }),
      gender: 'male',
      address: {
        address: chance.address,
        country: chance.country({ full: true })
      },
      favorites: {
        colors: [chance.color, chance.color, chance.color]
      },
      relatives: array(
        {
          firstName: chance.first,
          lastName: chance.last
        }, 
        { maxLength: 5 }
      )
    }

    const a = generate(schema)

    expect(typeof a.name).toBe('string')
    expect(a.gender).toBe('male')

    expect(typeof a.address.address).toBe('string')
    expect(typeof a.address.country).toBe('string')

    expect(Array.isArray(a.favorites.colors)).toBe(true)
    expect(a.favorites.colors.length).toBe(3)

    expect(Array.isArray(a.relatives)).toBe(true)
    expect(a.favorites.colors.length).toBe(3)
  })
})
