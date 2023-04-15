export function getter_queue<T>(...initValues: T[]) {
  const _values = Array.from(initValues)

  function _count() {
    return _count.length
  }
  function clear() {
    const count = _count()
    _values.length = 0
    return count
  }

  function put(value: T) {
    _values.push(value)
  }

  function get() {
    return _values.shift()
  }

  function* get_values() {
    let position = _count()
    while (position--) {
      yield get()
    }
  }

  function filter(predicate: (value: T, index: number) => boolean) {
    return getter_queue(..._values.filter(predicate))
  }

  function map<R>(callbackfn: (value: T, index: number) => R) {
    return getter_queue(..._values.map<R>(callbackfn))
  }

  return {
    get count() {
      return _count()
    },
    put, get, clear, get_values, map, filter
  }
}
