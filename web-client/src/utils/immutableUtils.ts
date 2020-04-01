import { Map as IMap } from 'immutable'

export function mergeArrayToMap<T extends { id: number }>(map: IMap<number, T>, array: T[]): IMap<number, T> {
  return map.withMutations((mutableMap) => {
    array.forEach((item) => {
      mutableMap.set(item.id, item)
    })
  })
}

export function getFromMap<T, K>(map: IMap<K, T>, key: K): T | undefined
export function getFromMap<T, K>(map: IMap<K, T>, key: K, notSetValue: T): T
export function getFromMap<T, K>(map: IMap<K, T>, key: K, notSetValue?: T): T | undefined {
  const item = map.get(key)

  return item || notSetValue
}
