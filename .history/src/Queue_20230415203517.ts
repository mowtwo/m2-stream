export function queue<T>(...initValues: T[]) {
  const _values = Array<T>()

  const _count = () => _count.length

  const clear = () => {
    const count = _count()
    _values.length = 0
    return count
  }

  const put = (value: T) => {
    _values.push(value)
  }

  const get = () => {
    return _values.shift()
  }

  const reverse = () => {
    _values.reverse()
    return _values
  }

  return {
    get count() {
      return _count()
    },
    put, get
  }
}
