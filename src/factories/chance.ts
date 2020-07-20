import Chance from 'chance'
import { chanceFactory } from './createFactory'
import { Factory, ChanceGeneratorParameters, ChanceGeneratorReturnType } from '../types'

type ChanceGenerators = {
  [key in keyof Chance.Chance]: Factory<'chance', ChanceGeneratorParameters<key>, ChanceGeneratorReturnType<key>>
}

const chanceGenerators: ChanceGenerators = Object.keys(Chance.prototype).reduce(
  (acc: any, type: string) => {
    const key = type as keyof Chance.Chance
    acc[key] = chanceFactory(key)
    return acc
  }
, {} as any) as ChanceGenerators

export default chanceGenerators
