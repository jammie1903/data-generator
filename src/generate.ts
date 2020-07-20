import Chance from 'chance'
import { Factory, FactoryInstance, TYPE, Random, GenerationResult } from './types'

function isFactory(obj: any): obj is Factory<any, any, any> {
  return obj[TYPE] === 'factory'
}

function isFactoryInstance(obj: any): obj is FactoryInstance<any, any> {
  return !!obj[TYPE]
}

function callFactory(factory: FactoryInstance<any, any>, chance: Chance.Chance, random: Random) {
  switch(factory[TYPE]) {
    case 'chance':
      return (factory as FactoryInstance<'chance', any>)(chance)
    case 'custom':
      return (factory as FactoryInstance<'custom', any>)(random)
    default: return null
  }
}

function process(schema: any, chance: Chance.Chance, random: Random): any {
  if(isFactory(schema)) {
    schema = schema()
  }
  
  if(isFactoryInstance(schema)) {
    return callFactory(schema, chance, random)
  }

  if (Array.isArray(schema)) {
    return schema.map(item => process(item, chance, random))
  }

  if (typeof schema !== 'object') return schema

  const returnValue: Record<string, any> = {}
  Object.keys(schema).forEach(key => {
    returnValue[key] = process(schema[key], chance, random)
  })
  return returnValue
}

const CHANCE_REFERENCE = Symbol()

type Seed = number | string | Random | Chance.Chance | null

export default function generate<T>(schema: T, seed?: Seed): GenerationResult<T> {
  let chance: Chance.Chance
  let random: Random

  if(seed && !!(seed as Chance.Chance).d100) {
    chance = seed as Chance.Chance

    random = () => (chance as any).random() as number
    (random as any)[CHANCE_REFERENCE] = chance
  } else if(seed && (seed as any)[CHANCE_REFERENCE]) {
    random = seed as Random
    chance = (seed as any)[CHANCE_REFERENCE]
  } else { 
    chance = typeof seed === 'number' || typeof seed === 'string' ? new Chance(seed) : new Chance()

    random = () => (chance as any).random() as number
    (random as any)[CHANCE_REFERENCE] = chance
  }

  return process(schema, chance, random)
}