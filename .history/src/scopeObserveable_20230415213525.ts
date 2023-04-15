let _current_scope: symbol
let _hook_map = new Map<symbol, Map<string, Set<() => void>>>()

export function withObserveableScope<F extends Function>(func: F): F {
  _current_scope = Symbol()
  return func
}

type DefineObserver<Name extends string> = {
  [FN in `on${Capitalize<Name>}`]: (callback: () => void) => void
}

type Dispatcher<Name extends string> = {
  dispatch: (name: Name) => void
}

export function defineObserver<const Name extends string>(...names: Name[]) {
  // @ts-ignore
  const record: DefineObserver<Name> = {}
  const dispatcher: Dispatcher<Name> = {
    dispatch(name) {
      const set = _hook_map.get(_current_scope)?.get?.(name)
      if (set) {
        for (const callback of set) {
          callback()
        }
      }
    }
  }

  function _capitalize<S extends string>(string: S): Capitalize<S> {
    const [a, ...reset] = string
    // @ts-ignore
    return a.toUpperCase() + reset
  }


  for (const name of names) {
    const k = `on${_capitalize(name)}`
    debugger
    record[`on${_capitalize(name)}`] = (callback) => {
      const map = _hook_map.get(_current_scope) ?? new Map<Name, Set<() => void>>()
      _hook_map.set(_current_scope, map)
      const set = map.get(name) ?? new Set<() => void>()
      map.set(name, set)
      set.add(callback)
    }
  }

  return {
    ...dispatcher,
    ...record
  }
}
