export function queue<T>(...initValues: T[]) {
  const _values = Array<T>()

  const clear = () => {
    _values.length = 0
  }
}
