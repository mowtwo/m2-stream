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
  onSuccess(() => {
    console.log('success 1')
  })

  onSuccess(() => {
    console.log('success 2')
  })

  onError(() => {
    console.log('error')
  })

  useFetch()
  useFetch(true)
}
