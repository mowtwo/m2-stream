import { defineObserver, withObserveableScope } from "./ScopeObserveable"

const {
  onError, onSuccess, dispatch
} = defineObserver(
  'error', 'success'
)

function useFetch(faild = false) {
  if (faild) {
    dispatch('error')
  } else {
    dispatch('success')
  }
}

export function test() {
  const fn1 = withObserveableScope(() => {
    onSuccess(() => {
      console.log('success fn1 1')
    })

    onSuccess(() => {
      console.log('success fn1 2')
    })

    onError(() => {
      console.log('error fn1')
    })

    useFetch()
    useFetch(true)
  })

  const fn2 = withObserveableScope(() => {
    onSuccess(() => {
      console.log('success fn2 1')
    })

    onSuccess(() => {
      console.log('success fn2 2')
    })

    onError(() => {
      console.log('error fn2')
    })

    useFetch()
    useFetch(true)
  })

  fn1()
  fn2()
}
