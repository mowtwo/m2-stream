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

  return {
    get count() {
      return _count()
    },
    put, get, clear, get_values
  }
}
