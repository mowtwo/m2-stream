import { getter_queue } from './Queue'
import './style.css'

type StreamEvent =
  | 'data'
  | 'close'


type StreamEventItem =
  | [key: 'data', handler: (chunk: any, next: () => void) => void]
  | [key: 'close', handler: () => void]

function stream() {
  let closed = false
  let queue = getter_queue<StreamEventItem>()

  function dispatch(event: 'close'): void
  function dispatch(event: 'data', chunk: any): void
  function dispatch(event: StreamEvent, chunk?: any): void {
    if (event === 'close') {
      closed = true
      queue = queue.filter(([key]) => key === 'close')
    }
    const values = queue.get_values()
    debugger
    for (const item of queue.get_values()) {
      if (item) {
        const [key, handler] = item
        if (key !== event) {
          queue.put(item)
          continue
        }
        if (key === 'close') {
          handler.call(undefined)
        } else {
          if (closed) {
            continue
          }
          handler.call(undefined, chunk!, () => {
            queue.put(item)
          })
        }
      }
    }
  }

  function on(event: 'close', handler: () => void): void
  function on(event: 'data', handler: (chunk: any, next: () => void) => void): void
  function on(event: StreamEvent, handler: (...args: any[]) => void): void {
    queue.put([event, handler])
  }


  return {
    dispatch,
    on
  }
}
const s = stream()

s.on('data', (chunk, next) => {
  console.log('infinite', chunk)
  next()
})

s.on('data', (chunk) => {
  console.log('once', chunk)
})

s.on('close', () => {
  console.log('close 1')
})

s.on('close', () => {
  console.log('close 2')
})

s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 1)
s.dispatch('data', 2)
s.dispatch('close')
s.dispatch('data', 2)
