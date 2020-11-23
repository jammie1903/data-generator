import createFactory from './createFactory'
import generate from '../generate'
import { Random } from 'types'

interface ArrayParams {
  minLength?: number
  maxLength?: number
}

const array = createFactory('custom', <T>(random: Random, schema: T, params: ArrayParams = {}) => {
  const {minLength = 1, maxLength = 100} = params
  const length = minLength + Math.floor(random() * (maxLength - minLength + 1))
  const array = []

  for(let i = 0; i < length; i++) {
    array.push(generate(schema, random))
  }

  return array
})

export default array
