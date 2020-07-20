import createFactory from './createFactory'
import generate from '../generate'
import { Random } from 'types'

interface ArrayParams {
  minLength?: number
  maxLength?: number
}

export default createFactory('custom', <T>(random: Random, schema: T, {minLength = 1, maxLength = 100}: ArrayParams) => {
  const length = minLength + Math.floor(random() * (maxLength - minLength + 1))
  const array = []

  for(let i = 0; i < length; i++) {
    array.push(generate(schema, random))
  }

  return array
})
