let _current_scope: symbol
const _current_scope_key = Symbol()

export function withObserveableScope<F extends Function>(func: F): F {
  _current_scope = Symbol()
  Reflect.set(func, _current_scope_key, _current_scope)
  return func
}

type DefineObserver<Name extends string> = {
  [FN in keyof `on${Name}`]: (callback: () => void) => void
}

export function defineObserver<const Name extends string>(...names: Name[]) {

}

defineObserver('a', 'b')
