export const TYPE = Symbol('type')
export type GeneratorType = 'custom' | 'chance'
export type Random = () => number

export type GeneratorFnArg<T extends GeneratorType> = T extends 'custom' ? Random : T extends 'chance' ? Chance.Chance : never
export type GeneratorFn<Type extends GeneratorType, Params extends any[], ReturnType> = (args: GeneratorFnArg<Type>, ...options: Params) => ReturnType

export type FactoryInstanceFn<Type extends GeneratorType, ReturnType> = (args: GeneratorFnArg<Type>) => ReturnType
export type FactoryInstance<Type extends GeneratorType, ReturnType> = FactoryInstanceFn<Type, ReturnType> & { [TYPE]: Type }

export type FactoryFn<Type extends GeneratorType, Params extends any[], ReturnType> = (...params: Params) => FactoryInstance<Type, ReturnType>
export type Factory<Type extends GeneratorType, Params extends any[], ReturnType> = (FactoryFn<Type, Params, ReturnType>) & { [TYPE]: 'factory' }

export type ChanceGeneratorReturnType<T extends keyof Chance.Chance> = Chance.Chance[T] extends (...args: any[]) => infer P ? P : never
export type ChanceGeneratorParameters<T extends keyof Chance.Chance> = Chance.Chance[T] extends (...args: infer P) => any ? P : never

export type GenerationResult<T> = {
  [k in keyof T]: T[k] extends FactoryInstance<any, infer R> ? R 
  : T[k] extends {} ? GenerationResult<T[k]>
  : T[k] extends [infer F] ? GenerationResult<F>
  : T[k]
}
