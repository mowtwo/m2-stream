export function queue<T>(...initValues: T[]) {
  const _values = Array<T>()

  const _count = () => _count.length

  const clear = () => {
    const count = _count()
    _values.length = 0
    return count
  }
}
