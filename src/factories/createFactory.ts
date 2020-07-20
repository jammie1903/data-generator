import {
  ChanceGeneratorParameters,
  ChanceGeneratorReturnType,
  Factory,
  FactoryFn,
  FactoryInstance,
  FactoryInstanceFn,
  GeneratorFn,
  GeneratorFnArg,
  GeneratorType,
  TYPE,
} from '../types'

export default function createFactory<Type extends GeneratorType, ReturnType, Params extends any[] = any[]>(type: Type, generator: GeneratorFn<Type, Params, ReturnType>): Factory<Type, Params, ReturnType> {
  const factory: FactoryFn<Type, Params, ReturnType> = (...params: Params) => {
    const factoryInstance: FactoryInstanceFn<Type, ReturnType> = (args: GeneratorFnArg<Type>) => {
      return generator(args, ...params as Params)
    }
    (factoryInstance as FactoryInstance<Type, ReturnType>)[TYPE] = type
    return (factoryInstance as FactoryInstance<Type, ReturnType>)
  }
  (factory as Factory<Type, Params, ReturnType>)[TYPE] = 'factory'
  return factory as Factory<Type, Params, ReturnType>
}

function isFunction<T extends keyof Chance.Chance>(arg: any): arg is (...args: ChanceGeneratorParameters<T>) => ChanceGeneratorReturnType<T> {
  return typeof arg === 'function'
}

export function chanceFactory<T extends keyof Chance.Chance>(type: T) : Factory<'chance', ChanceGeneratorParameters<T>, ChanceGeneratorReturnType<T>> {
  const func = (chance: Chance.Chance, ...o: ChanceGeneratorParameters<T>): ChanceGeneratorReturnType<T> => {
    const generator = chance[type]
    if(isFunction<T>(generator)) {
      return generator.apply(chance, o) as ChanceGeneratorReturnType<T>
    }
    throw new Error(`${type} was not a recognised change function`)
  }

  return createFactory('chance', func)
}
