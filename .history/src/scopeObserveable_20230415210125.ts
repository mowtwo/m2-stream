let _current_scope: symbol
const _current_scope_key = Symbol()

export function withObserveableScope<F extends Function>(func: F): F {
  _current_scope = Symbol()
  Reflect.set(func, _current_scope_key, _current_scope)
  return func
}
