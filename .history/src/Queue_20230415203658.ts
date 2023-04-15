export function queue<T>(...initValues: T[]) {
  const _values = Array<T>(...initValues)

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

  return {
    get count() {
      return _count()
    },
    put, get, reverse, clear
  }
}
